"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_COOKIE } from "@/lib/auth/cookies";
import { publicOrigin } from "@/lib/auth/same-origin";
import type { ActionState } from "@/lib/action-state";
import { callOwnerTenant, type TenantCall } from "@/lib/geekapi";
import { codeOf } from "@/lib/return-trip";
import { clearSessionCookies, signOut } from "@/services/owner-auth";

const CHARGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Sign out. GeekAPI ends the sign-in the refresh token belongs to, then both cookies are cleared. When GeekAPI could not end it, the
 * cookies are still cleared, because the owner asked to leave this browser, and the signed-out page says so rather than claiming it ended.
 */
export async function signOutAction(): Promise<ActionState> {
  const jar = await cookies();
  const refresh = jar.get(REFRESH_COOKIE)?.value;
  const ended = refresh ? await signOut(refresh) : { ok: true as const };
  clearSessionCookies(jar);
  redirect(ended.ok ? "/signed-out" : "/signed-out?notice=not_ended");
}

/** Connect Google Calendar: GeekAPI gives the Google approval address for this owner's tenant, and the browser is sent there. */
export async function connectCalendarAction(): Promise<ActionState> {
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/oauth/mcp/google_calendar/authorize`, { method: "GET" });
  const target = leaveFor(result, "authorizationUrl");
  if (typeof target !== "string") return target;
  redirect(target);
}

/**
 * Connect Google Drive: GeekAPI gives the Google approval address for this owner's tenant, and the browser is sent there. The approval
 * asks for one permission, which reaches only the folder this application creates.
 */
export async function connectStorageAction(): Promise<ActionState> {
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/oauth/mcp/google_drive/authorize`, { method: "GET" });
  const target = leaveFor(result, "authorizationUrl");
  if (typeof target !== "string") return target;
  redirect(target);
}

/**
 * Pay now, for one unpaid overage: GeekAPI makes a PayPal order for exactly what is owed and the browser is sent to PayPal to approve it.
 * PayPal sends the owner back to /billing/paid, built from this site's own origin, never from anything the browser sent. The charge is
 * bound to the button on the server; GeekAPI checks again that it is this tenant's and still owed.
 */
export async function payOverageAction(chargeId: string): Promise<ActionState> {
  if (!CHARGE_ID.test(chargeId)) return { error: "That overage could not be read. Reload the page." };

  const origin = publicOrigin(await headers());
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/billing/overage-charges/${chargeId}/pay`, {
    method: "POST",
    body: { returnUrl: `${origin}/billing/paid?charge=${chargeId}`, cancelUrl: `${origin}/dashboard` },
  });
  const target = leaveFor(result, "approvalUrl");
  if (typeof target !== "string") return target;
  redirect(target);
}

/** The https address in GeekAPI's answer to send the browser to, or the failure to show. A signed-out owner goes to /login. */
function leaveFor(result: TenantCall, field: string): string | ActionState {
  if (result.status === 401) redirect("/login");
  const address = result.body?.[field];
  if (result.status === 200 && typeof address === "string" && address.startsWith("https://")) return address;
  const error = typeof result.body?.error === "string" ? result.body.error : `GeekAPI answered ${result.status}.`;
  const code = typeof result.body?.code === "string" ? ` (${result.body.code})` : "";
  return { error: `${error}${code}` };
}

/** What the bucket form hands back: the sentence to show, and what the owner typed, never a key or a secret. */
export type BucketState = ActionState & { provider: string; bucket: string; keyPrefix: string; region: string };

const BUCKET_PROVIDERS = ["aws_s3", "google_cloud_storage"];

/**
 * The permission the owner must grant for the bucket they are typing, built by GeekAPI beside the code that writes, so what is shown
 * and what is needed cannot drift. It is read before anything is saved, because the owner needs it to make the key at all.
 */
export async function bucketPolicyAction(provider: string, bucket: string, keyPrefix: string): Promise<string> {
  if (!BUCKET_PROVIDERS.includes(provider) || bucket.trim() === "") throw new Error("unusable");
  const query = new URLSearchParams({ provider, bucket: bucket.trim(), keyPrefix: keyPrefix.trim() });
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/storage/policy?${query}`, { method: "GET" });
  const policy = (result.body as { policy?: unknown } | null)?.policy;
  if (result.status < 200 || result.status >= 300 || typeof policy !== "string") throw new Error("unusable");
  return policy;
}

/**
 * Save the owner's own bucket. The keys go to GeekAPI once, over the server, and are never put back on the page: a failure keeps the
 * bucket, region and folder so the owner does not retype them, and drops the key and the secret so neither is held in the browser.
 */
export async function connectBucketAction(_state: BucketState, form: FormData): Promise<BucketState> {
  const text = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const typed = { provider: text("provider"), bucket: text("bucket"), keyPrefix: text("keyPrefix"), region: text("region") };
  const refuse = (error: string): BucketState => ({ error, ...typed });

  if (!BUCKET_PROVIDERS.includes(typed.provider)) return refuse("Choose Amazon S3 or Google Cloud Storage.");
  if (typed.bucket === "") return refuse("A bucket name is required.");
  if (typed.region === "") return refuse("A region is required.");
  if (text("accessKeyId") === "" || text("secretAccessKey") === "") return refuse("Both the access key and the secret are required.");

  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/storage/bucket`, {
    method: "PUT",
    body: { ...typed, accessKeyId: text("accessKeyId"), secretAccessKey: text("secretAccessKey") },
  });
  if (result.status === 401) redirect("/login");
  if (result.status >= 200 && result.status < 300) redirect("/dashboard?notice=bucket_connected");

  return refuse(describeBucketFailure(codeOf(result.body, result.status)));
}

/** GeekAPI's codes for a bucket that could not be saved, each in plain words. */
function describeBucketFailure(code: string | null): string {
  switch (code) {
    case "tier_required":
      return "Writing to your own bucket is part of Standard and above. Google Drive works on every plan.";
    case "invalid_request":
      return "Those bucket details could not be used. Check the bucket, region and keys.";
    case "not_found":
      return "This account could not be found. Sign in again.";
    default:
      return "The bucket could not be saved. Try again in a moment.";
  }
}
