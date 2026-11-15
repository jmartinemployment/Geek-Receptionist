import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, cookieOpts } from "@/lib/auth/cookies";
import { authConfig } from "@/lib/config";
import { accessCookieMaxAge, isSessionDeadResponse } from "@/services/auth-tokens";

/**
 * Refreshes the access token before the request reaches any Server Component.
 *
 * Cookies cannot be written during Server Component rendering, so the refresh cannot live in
 * `getAccessToken`. GeekOAuth rotates refresh tokens, so a refresh whose replacement is not stored
 * leaves the browser holding a revoked token. Proxy runs before rendering and can set response
 * cookies, so the refresh belongs here (the same arrangement as the other Geek apps).
 */
export async function proxy(request: NextRequest) {
  const hasAccess = Boolean(request.cookies.get(ACCESS_COOKIE)?.value);
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;

  if (hasAccess || !refresh) return NextResponse.next();

  let tokens: {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  try {
    const res = await fetch(authConfig.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: authConfig.clientId,
        refresh_token: refresh,
      }).toString(),
      cache: "no-store",
    });
    if (!res.ok) {
      // Only an answer that says the refresh token is spent or revoked ends the session. A 5xx or
      // any other refusal is not proof, and clearing the cookie would sign the person out of a
      // session GeekOAuth could still honour once it is back. Same rule as getAccessTokenWithRefresh.
      if (!isSessionDeadResponse(await res.text())) return NextResponse.next();
      // Clear it so the next hop is a clean sign-in rather than another doomed refresh.
      const dead = NextResponse.next();
      dead.cookies.set(REFRESH_COOKIE, "", cookieOpts.clear);
      dead.cookies.set(ACCESS_COOKIE, "", cookieOpts.clear);
      return dead;
    }
    tokens = await res.json();
  } catch {
    // A network failure is not proof the session is dead, so the cookie is left alone. The request
    // goes on with no access token: a page sends the browser to sign-in, where an unreachable
    // GeekOAuth shows itself, and the API proxy answers 401 with its message.
    return NextResponse.next();
  }

  // Hand the new token to this same request so the render sees it without a round trip.
  const headers = new Headers(request.headers);
  const jar = request.cookies;
  jar.set(ACCESS_COOKIE, tokens.access_token);
  if (tokens.refresh_token) jar.set(REFRESH_COOKIE, tokens.refresh_token);
  headers.set("cookie", jar.toString());

  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(ACCESS_COOKIE, tokens.access_token, {
    ...cookieOpts.access,
    maxAge: accessCookieMaxAge(tokens.expires_in),
  });
  if (tokens.refresh_token) {
    response.cookies.set(REFRESH_COOKIE, tokens.refresh_token, cookieOpts.refresh);
  }
  return response;
}

export const config = {
  // Only paths that need a session. Static assets, the auth routes and the signed-out page must not trigger a refresh: /api/auth/token in
  // particular sets these cookies itself.
  matcher: ["/", "/dashboard/:path*", "/oauth/:path*", "/api/calendar/:path*"],
};
