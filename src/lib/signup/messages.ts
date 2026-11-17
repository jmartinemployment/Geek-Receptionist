/**
 * The sentence shown for each refusal in /signup. Only these fixed sentences are shown for a code that arrives in the address bar after
 * a trip to PayPal, never text from the address itself. A form's own refusal also shows GeekAPI's message when the code is not listed,
 * so a refusal is never shown as nothing.
 */
const MESSAGES: Record<string, string> = {
  country_not_supported: "Geek-Receptionist is available to US businesses only.",
  visitor_country_not_supported: "Signup is open only from the United States.",
  visitor_unverified: "Your location could not be verified, so signup cannot continue from here.",
  captcha_failed: "Tick “I’m not a robot” and try again.",
  captcha_not_configured: "Signup is not available right now. This site has no reCAPTCHA key set.",
  captcha_unavailable: "Google’s robot check could not be reached. Try again shortly.",
  business_activity_unknown: "Choose what the business does from the list.",
  contact_phone_not_us: "Enter the business's US phone number, ten digits, such as (561) 555-0101.",
  industry_excluded:
    "Geek-Receptionist cannot be used by healthcare or veterinary businesses. Healthcare businesses are HIPAA-covered entities, and we exclude them outright.",
  industry_addendum_not_available: "Geek-Receptionist is not yet available for legal, financial, accounting or education businesses.",
  attestation_required: "Confirm the compliance statement to continue.",
  rate_limited: "Too many signup attempts from this address. Try again in an hour.",
  tier_unknown: "Choose one of the four plans.",
  billing_not_configured: "Payments are not set up on our side yet. Nothing was charged.",
  billing_unavailable: "PayPal could not be reached. Nothing was charged; try again shortly.",
  subscription_not_found: "That PayPal subscription is not this signup's. Choose a plan again.",
  subscription_not_active: "PayPal has not activated the subscription. Approve it in PayPal again.",
  subscription_unpaid: "PayPal has not taken the first month's payment yet. Wait a minute and try again.",
  plan_mismatch: "That PayPal plan does not match the plan chosen. Choose a plan again.",
  vault_token_invalid: "PayPal did not save your payment method. Save it again.",
  paypal_cancelled: "You left PayPal before finishing. Nothing was charged; continue when you are ready.",
  paypal_mismatch: "PayPal sent back a different subscription than the one started. Choose a plan again.",
  area_code_invalid: "Enter a three-digit US area code.",
  tenant_not_pending: "This signup is already finished. Sign in instead.",
  telephony_provisioning_failed: "A phone number could not be set up in that area code. Nothing was kept; try another area code.",
  retell_provisioning_failed: "The receptionist could not be set up. Nothing was kept; try again.",
  owner_exists: "This business, or this email, already has a login. Sign in instead.",
  tenant_not_active: "The subscription is not active yet, so a login cannot be made.",
  portal_not_configured: "Signup is not available right now. This site has no GeekAPI key set.",
  api_unreachable: "Signup is not available right now. GeekAPI could not be reached.",
  store_unavailable: "Signup is not available right now. The account store could not be reached.",
  signup_expired: "This signup's progress was lost. Start again.",
};

export function signupMessage(code: string | null, fallback: string | null = null): string {
  if (code && Object.hasOwn(MESSAGES, code)) return MESSAGES[code];
  if (fallback) return fallback;
  return code && /^[a-z0-9_]{1,64}$/.test(code) ? `Signup could not continue (${code}).` : "Signup could not continue.";
}

export function refusalOf(body: Record<string, unknown> | null, status: number): string {
  const code = typeof body?.code === "string" ? body.code : null;
  const error = typeof body?.error === "string" ? body.error : null;
  return signupMessage(code, error ?? `GeekAPI answered ${status}.`);
}
