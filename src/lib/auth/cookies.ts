export const REFRESH_COOKIE = "rp_refresh";
export const ACCESS_COOKIE = "rp_access";

/** The request header proxy.ts sets when it could not refresh the sign-in for a reason other than the sign-in having ended. */
export const AUTH_ERROR_HEADER = "x-rp-auth-error";

const secure = process.env.NODE_ENV === "production";

const base = { httpOnly: true, secure, sameSite: "lax" as const, path: "/" };

export const cookieOpts = {
  /** maxAge in seconds, from when GeekAPI says the token stops being accepted. */
  until: (expiresAt: string, now: number = Date.now()) => ({ ...base, maxAge: secondsUntil(expiresAt, now) }),
  clear: { ...base, maxAge: 0 },
};

/**
 * The access cookie is dropped a minute before the token expires, so a page never sends GeekAPI a token that lapses on the way and the
 * proxy refreshes first. Never under 30 seconds, and 0 when the date cannot be read, so a broken answer leaves no cookie behind.
 */
export function accessCookieSeconds(expiresAt: string, now: number = Date.now()): number {
  const seconds = secondsUntil(expiresAt, now);
  return seconds === 0 ? 0 : Math.max(30, seconds - 60);
}

function secondsUntil(expiresAt: string, now: number): number {
  const at = Date.parse(expiresAt);
  if (Number.isNaN(at)) return 0;
  return Math.max(0, Math.floor((at - now) / 1000));
}
