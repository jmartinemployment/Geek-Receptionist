import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, REFRESH_COOKIE, cookieOpts } from "@/lib/auth/cookies";
import { accessCookieMaxAge, isSessionDeadError, refreshAccessToken } from "@/services/auth-tokens";

/**
 * Read-only session lookup, safe in Server Components. Cookies cannot be written while a Server Component renders, so the refresh
 * happens in proxy.ts ahead of the render.
 */
export const getAccessToken = cache(async (): Promise<string | null> => {
  const jar = await cookies();
  return jar.get(ACCESS_COOKIE)?.value ?? null;
});

/**
 * The refreshing variant, for Route Handlers only, where writing cookies is allowed. Returns null only when there is no session to use:
 * no refresh cookie, or GeekOAuth refused it as spent or revoked. Any other refresh failure (GeekOAuth unreachable, a 5xx) is thrown,
 * so the caller reports it instead of reading it as "signed out".
 */
export async function getAccessTokenWithRefresh(): Promise<string | null> {
  const jar = await cookies();
  const existing = jar.get(ACCESS_COOKIE)?.value;
  if (existing) return existing;

  const refresh = jar.get(REFRESH_COOKIE)?.value;
  if (!refresh) return null;

  try {
    const tokens = await refreshAccessToken(refresh);
    // GeekOAuth rotates refresh tokens: persist the replacement or the stored one is revoked.
    if (tokens.refresh_token) jar.set(REFRESH_COOKIE, tokens.refresh_token, cookieOpts.refresh);
    jar.set(ACCESS_COOKIE, tokens.access_token, { ...cookieOpts.access, maxAge: accessCookieMaxAge(tokens.expires_in) });
    return tokens.access_token;
  } catch (error) {
    if (isSessionDeadError(error)) {
      jar.set(REFRESH_COOKIE, "", cookieOpts.clear);
      jar.set(ACCESS_COOKIE, "", cookieOpts.clear);
      return null;
    }
    throw error;
  }
}

export async function requireAccessToken(): Promise<string> {
  const token = await getAccessToken();
  if (!token) redirect("/api/auth/start");
  return token;
}
