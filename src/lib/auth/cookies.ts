export const REFRESH_COOKIE = "rp_refresh";
export const ACCESS_COOKIE = "rp_access";
export const PKCE_COOKIE = "rp_pkce_verifier";
export const STATE_COOKIE = "rp_oauth_state";

const secure = process.env.NODE_ENV === "production";

export const cookieOpts = {
  pkce: { httpOnly: true, secure, sameSite: "lax" as const, path: "/", maxAge: 600 },
  refresh: { httpOnly: true, secure, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 30 },
  access: { httpOnly: true, secure, sameSite: "lax" as const, path: "/", maxAge: 60 * 5 },
  clear: { httpOnly: true, path: "/", maxAge: 0 },
};
