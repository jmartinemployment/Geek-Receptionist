"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { publicOrigin } from "@/lib/auth/same-origin";
import { clearGates, clearSignup, dropGates, passGate, readGates, readSignup, writeSignup } from "@/lib/signup/state";
import { verifyCaptcha } from "@/lib/captcha";
import { refusalOf, signupMessage } from "@/lib/signup/messages";
import { EXCLUDED_CODES, EXCLUDED_INDUSTRIES, answersThrough, isExcludedCode, type ExcludedCode } from "@/lib/signup/excluded";
import { postOnboarding } from "@/services/onboarding";
import { setSessionCookies, signIn, visitorIpFrom } from "@/services/owner-auth";

export type SignupFormState = { error: string | null; fields: Record<string, string> };

const TIERS = new Set(["STARTER", "STANDARD", "PRO", "PREMIUM"]);

const text = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

/** Before step 1: the robot check, a dialog over the first step. Google's answer is checked here, once; a pass is remembered and the form goes on. */
export async function captchaAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const outcome = await verifyCaptcha(form.get("g-recaptcha-response"), visitorIpFrom(await headers()));
  if (outcome !== "ok") return { error: signupMessage(outcome), fields: {} };
  await passGate("captcha");
  redirect("/signup?start=1");
}

/** Step 1: is the business in the United States. A yes is remembered and the form goes on; a no is the end of it, said at once. */
export async function countryAction(inUnitedStates: boolean): Promise<{ error: string | null }> {
  if (!(await readGates()).has("captcha")) return { error: signupMessage("signup_expired") };
  if (!inUnitedStates) return { error: signupMessage("country_not_supported") };
  await passGate("country");
  redirect("/signup?start=1");
}

/**
 * What closing a refusal dialog (not in the United States, an excluded industry) does: the robot check is forgotten, so the next visit starts from it again. It runs
 * on close, not with the answer, because clearing the cookie re-renders the page back to the hero and the dialog would vanish with it.
 */
export async function forgetRobotCheckAction(): Promise<void> {
  await clearGates();
}

/**
 * Step 2, once for each excluded industry, in order: is the business that kind of business. A no is remembered and goes on to the
 * next. A yes is the end of it: GeekAPI is told at once, with the noes before it, and keeps them forever; then the refusal is said.
 * If GeekAPI could not store the yes the visitor is still stopped, and is told what failed.
 */
export async function excludedIndustryAction(code: ExcludedCode, isExcluded: boolean): Promise<{ error: string | null }> {
  if (!isExcludedCode(code)) return { error: signupMessage("signup_expired") };
  const gates = await readGates();
  const before = EXCLUDED_CODES.slice(0, EXCLUDED_CODES.indexOf(code));
  if (!gates.has("country") || !before.every((earlier) => gates.has(earlier))) return { error: signupMessage("signup_expired") };

  if (isExcluded) {
    const kept = await postOnboarding("/api/v1/onboarding/industry-refusals", { answers: answersThrough(code, true) }, await headers());
    return { error: kept.status === 200 ? EXCLUDED_INDUSTRIES[code].refusal : refusalOf(kept.body, kept.status) };
  }
  await passGate(code);
  redirect("/signup?start=1");
}

/**
 * Between steps 2 and 3: is the business a legal, accounting, tax, payroll, finance, insurance or education business. A no goes on to the business; a
 * yes goes to the addendum first.
 */
export async function professionAction(isProfessional: boolean): Promise<{ error: string | null }> {
  const gates = await readGates();
  if (!EXCLUDED_CODES.every((code) => gates.has(code))) return { error: signupMessage("signup_expired") };
  if (isProfessional) await passGate("profession", "professional");
  else await passGate("profession");
  redirect("/signup?start=1");
}

/** Only after a yes to that question: the professional services addendum. Agreeing is remembered and sent to GeekAPI with the business. */
export async function addendumAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  if (!(await readGates()).has("professional")) return { error: signupMessage("signup_expired"), fields: {} };
  if (form.get("addendumSigned") !== "on") return { error: signupMessage("addendum_not_agreed"), fields: {} };
  await passGate("addendum");
  redirect("/signup?start=1");
}

/** Back from the addendum, or from the business, to the professional services question, which is then asked again. */
export async function professionBackAction(): Promise<{ error: string | null }> {
  await dropGates("profession", "professional", "addendum");
  redirect("/signup?start=1");
}

/** Step 3: the business and the compliance statement, once the robot check and the questions are passed. GeekAPI's gate decides; a business that passes becomes a tenant waiting for payment. */
export async function businessAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = {
    businessName: text(form, "businessName"),
    businessDescription: text(form, "businessDescription"),
    stateCode: text(form, "stateCode").toUpperCase(),
    contactEmail: text(form, "contactEmail"),
    contactPhone: text(form, "contactPhone"),
  };
  const attested = form.get("complianceAttested") === "on";

  const gates = await readGates();
  if (!gates.has("captcha") || !gates.has("country") || !EXCLUDED_CODES.every((code) => gates.has(code)) || !gates.has("profession")) return { error: signupMessage("signup_expired"), fields };
  if (gates.has("professional") && !gates.has("addendum")) return { error: signupMessage("signup_expired"), fields };
  const addendumSigned = gates.has("addendum");

  const visitor = await headers();
  const answer = await postOnboarding("/api/v1/onboarding/validate-eligibility", {
    businessName: fields.businessName,
    businessDescription: fields.businessDescription,
    countryCode: "US",
    stateCode: fields.stateCode,
    contactEmail: fields.contactEmail,
    contactPhone: fields.contactPhone,
    complianceAttested: attested,
    addendumSigned,
    industryAnswers: answersThrough("telemarketing", false),
    professionalServices: gates.has("professional"),
  }, visitor);

  const tenantId = answer.body?.tenantId;
  if (answer.status !== 200 || typeof tenantId !== "string") return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup({ tenantId, contactEmail: fields.contactEmail });
  redirect("/signup");
}

/** Step 4: the plan. GeekAPI starts a PayPal subscription to it for this tenant and the visitor approves it in PayPal. */
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

/** Step 5: saving the visitor's PayPal account for overage charges, approved in PayPal. */
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
 * Step 6: the area code. GeekAPI checks the subscription and the saved payment method with PayPal, then buys the number in that area
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

/** Step 7: the owner's login. The password goes to GeekAPI once to make the login and once to sign in, and is never kept or shown. */
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
