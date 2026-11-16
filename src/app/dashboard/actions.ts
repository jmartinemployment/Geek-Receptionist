"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_COOKIE } from "@/lib/auth/cookies";
import { publicOrigin } from "@/lib/auth/same-origin";
import type { ActionState } from "@/lib/action-state";
import { callOwnerTenant, type TenantCall } from "@/lib/geekapi";
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
