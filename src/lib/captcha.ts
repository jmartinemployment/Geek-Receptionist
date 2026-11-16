/**
 * Google reCAPTCHA, the "I'm not a robot" checkbox, on signup's first step and on sign-in. The key is made in Google Cloud: its Key ID
 * is RECAPTCHA_SITE_KEY, which the page shows, and its legacy secret (Integration tab, Use Legacy Key) is RECAPTCHA_SECRET_KEY, which
 * stays on this server. Either unset refuses the form rather than letting it through without a check. Each answer is checked once, by
 * Google's siteverify, and is never retried: Google spends a token on its first check.
 */

export type CaptchaOutcome = "ok" | "captcha_failed" | "captcha_not_configured" | "captcha_unavailable";

const read = (name: string): string | null => {
  const value = (process.env[name] ?? "").trim();
  return value.length > 0 ? value : null;
};

/** The site key the page renders the checkbox with, or null when it is not set. */
export function captchaSiteKey(): string | null {
  return read("RECAPTCHA_SITE_KEY");
}

/** Asks Google whether the checkbox answer the form carried is good, from this server, with the visitor's address when it is known. */
export async function verifyCaptcha(token: FormDataEntryValue | null, visitorIp: string | null): Promise<CaptchaOutcome> {
  const secret = read("RECAPTCHA_SECRET_KEY");
  if (!secret || !captchaSiteKey()) return "captcha_not_configured";
  if (typeof token !== "string" || token.length === 0) return "captcha_failed";

  const body = new URLSearchParams({ secret, response: token });
  if (visitorIp) body.set("remoteip", visitorIp);

  let response: Response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", body, cache: "no-store" });
  } catch {
    return "captcha_unavailable";
  }
  if (!response.ok) return "captcha_unavailable";

  try {
    const answer = (await response.json()) as { success?: unknown };
    return answer.success === true ? "ok" : "captcha_failed";
  } catch {
    return "captcha_unavailable";
  }
}
