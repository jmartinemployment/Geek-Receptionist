/**
 * The message the login page shows for a refusal code. The page shows only these fixed sentences, never text from the address bar, so
 * a link cannot make the page say something of its author's choosing. A code not listed here gets the general sentence with the code,
 * so a refusal is never shown as nothing.
 */
const MESSAGES: Record<string, string> = {
  invalid_credentials: "That email and password do not match a login.",
  invalid_request: "Enter your email and your password.",
  rate_limited: "Too many attempts from this address. Try again later.",
  too_many_failed_sign_ins: "Too many failed sign-ins for this email. Try again in an hour, or sign in from a browser you have signed in from before.",
  cross_site: "That sign-in did not come from this site. Sign in here.",
  owner_auth_not_configured: "Sign-in is not available right now. GeekAPI has no signing key set.",
  portal_not_configured: "Sign-in is not available right now. This site has no GeekAPI key set.",
  api_unreachable: "Sign-in is not available right now. GeekAPI could not be reached.",
  api_unexpected: "Sign-in is not available right now. GeekAPI's answer could not be read.",
  store_unavailable: "Sign-in is not available right now. The account store could not be reached.",
};

export function loginMessage(code: string | null): string | null {
  if (!code) return null;
  if (Object.hasOwn(MESSAGES, code)) return MESSAGES[code];
  return /^[a-z0-9_]{1,64}$/.test(code) ? `Sign-in failed (${code}).` : "Sign-in failed.";
}
