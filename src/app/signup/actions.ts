"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { publicOrigin } from "@/lib/auth/same-origin";
import { clearSignup, readSignup, writeSignup } from "@/lib/signup/state";
import { refusalOf, signupMessage } from "@/lib/signup/messages";
import { postOnboarding } from "@/services/onboarding";
import { setSessionCookies, signIn, visitorIpFrom } from "@/services/owner-auth";

export type SignupFormState = { error: string | null; fields: Record<string, string> };

const TIERS = new Set(["STARTER", "STANDARD", "PRO", "PREMIUM"]);

const text = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

/** Step 1: the business and the compliance statement. GeekAPI's gate decides; a business that passes becomes a tenant waiting for payment. */
export async function businessAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = {
    businessName: text(form, "businessName"),
    businessActivityCode: text(form, "businessActivityCode"),
    stateCode: text(form, "stateCode").toUpperCase(),
    county: text(form, "county"),
    contactEmail: text(form, "contactEmail"),
    contactPhone: text(form, "contactPhone"),
  };
  const attested = form.get("complianceAttested") === "on";

  const answer = await postOnboarding("/api/v1/onboarding/validate-eligibility", {
    businessName: fields.businessName,
    businessActivityCode: fields.businessActivityCode,
    countryCode: "US",
    stateCode: fields.stateCode,
    county: fields.county || null,
    contactEmail: fields.contactEmail,
    contactPhone: fields.contactPhone,
    complianceAttested: attested,
    addendumSigned: false,
  }, await headers());

  const tenantId = answer.body?.tenantId;
  if (answer.status !== 200 || typeof tenantId !== "string") return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup({ tenantId, contactEmail: fields.contactEmail });
  redirect("/signup");
}

/** Step 2: the plan. GeekAPI starts a PayPal subscription to it for this tenant and the visitor approves it in PayPal. */
export async function choosePlanAction(tier: string): Promise<{ error: string | null }> {
  const state = await readSignup();
  if (!state) return { error: signupMessage("signup_expired") };
  if (!TIERS.has(tier)) return { error: signupMessage("tier_unknown") };

  const origin = publicOrigin(await headers());
  const answer = await postOnboarding("/api/v1/onboarding/paypal/subscription", {
    tenantId: state.tenantId,
    tierCode: tier,
    returnUrl: `${origin}/signup/paypal/subscribed`,
    cancelUrl: `${origin}/signup?error=paypal_cancelled`,
  }, await headers());

  const subscriptionId = answer.body?.subscriptionId;
  const approvalUrl = answer.body?.approvalUrl;
  if (answer.status !== 200 || typeof subscriptionId !== "string" || typeof approvalUrl !== "string" || !approvalUrl.startsWith("https://")) {
    return { error: refusalOf(answer.body, answer.status) };
  }

  await writeSignup({ ...state, tier, subscriptionId, subscriptionApproved: false, setupTokenId: undefined, vaultTokenId: undefined });
  redirect(approvalUrl);
}

/** Step 2, second half: saving the visitor's PayPal account for overage charges, approved in PayPal. */
export async function savePaymentMethodAction(): Promise<{ error: string | null }> {
  const state = await readSignup();
  if (!state?.subscriptionApproved) return { error: signupMessage("signup_expired") };

  const origin = publicOrigin(await headers());
  const answer = await postOnboarding("/api/v1/onboarding/paypal/vault", {
    tenantId: state.tenantId,
    returnUrl: `${origin}/signup/paypal/saved`,
    cancelUrl: `${origin}/signup?error=paypal_cancelled`,
  }, await headers());

  const setupTokenId = answer.body?.setupTokenId;
  const approvalUrl = answer.body?.approvalUrl;
  if (answer.status !== 200 || typeof setupTokenId !== "string" || typeof approvalUrl !== "string" || !approvalUrl.startsWith("https://")) {
    return { error: refusalOf(answer.body, answer.status) };
  }

  await writeSignup({ ...state, setupTokenId });
  redirect(approvalUrl);
}

/**
 * Step 3: the area code. GeekAPI checks the subscription and the saved payment method with PayPal, then buys the number in that area
 * code and sets up the receptionist on it. This is the step that spends money.
 */
export async function activateAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = { areaCode: text(form, "areaCode") };
  const state = await readSignup();
  if (!state?.vaultTokenId || !state.subscriptionId || !state.tier) return { error: signupMessage("signup_expired"), fields };

  const answer = await postOnboarding("/api/v1/onboarding/activate-subscription", {
    tenantId: state.tenantId,
    tierCode: state.tier,
    paypalSubscriptionId: state.subscriptionId,
    paypalVaultTokenId: state.vaultTokenId,
    preferredAreaCode: fields.areaCode,
    enableSmsNotifications: false,
  }, await headers());

  const phoneNumber = answer.body?.assignedPhoneNumber;
  if (answer.status !== 200 || typeof phoneNumber !== "string") return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup({ ...state, phoneNumber });
  redirect("/signup");
}

/** Step 4: the owner's login. The password goes to GeekAPI once to make the login and once to sign in, and is never kept or shown. */
export async function createLoginAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = { email: text(form, "email"), displayName: text(form, "displayName") };
  const password = form.get("password");
  const state = await readSignup();
  if (!state?.phoneNumber) return { error: signupMessage("signup_expired"), fields };
  if (typeof password !== "string" || password.length === 0) return { error: "Choose a password.", fields };

  const created = await postOnboarding("/api/v1/onboarding/create-owner-login", {
    tenantId: state.tenantId,
    email: fields.email,
    password,
    displayName: fields.displayName,
  }, await headers());
  if (created.status !== 201) return { error: refusalOf(created.body, created.status), fields };

  // The login exists now; signing in is a separate call, and a failure here sends the owner to /login rather than claiming success.
  const visitor = await headers();
  const outcome = await signIn(fields.email, password, visitorIpFrom(visitor), null);
  await clearSignup();
  if (!outcome.ok) redirect("/login");
  setSessionCookies(await cookies(), outcome.session);
  redirect("/dashboard?notice=signup_complete");
}

/** Start over: forget this browser's signup. The tenant GeekAPI made stays waiting for payment and is never charged. */
export async function startOverAction(): Promise<{ error: string | null }> {
  await clearSignup();
  redirect("/signup");
}
