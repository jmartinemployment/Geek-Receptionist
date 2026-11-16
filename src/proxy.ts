import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, AUTH_ERROR_HEADER, REFRESH_COOKIE } from "@/lib/auth/cookies";
import { clearSessionCookies, refreshSession, sessionEnded, setSessionCookies } from "@/services/owner-auth";

/**
 * Renews the owner's access token with GeekAPI before the request reaches any page or route, because cookies cannot be written while a
 * Server Component renders. GeekAPI spends a refresh token once and hands back a new one, so the replacement is always stored.
 *
 * Only GeekAPI saying the refresh token is unknown, expired or already used ends the session here. Anything else (GeekAPI unreachable,
 * a 5xx, an unset key) is not proof the sign-in is over: the cookies are left alone and the reason is passed on in a request header, so
 * the page or route reports it instead of reading it as "signed out".
 */
export async function proxy(request: NextRequest) {
  const hasAccess = Boolean(request.cookies.get(ACCESS_COOKIE)?.value);
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (hasAccess || !refresh) return withoutAuthError(request);

  const outcome = await refreshSession(refresh);

  if (!outcome.ok) {
    if (sessionEnded(outcome)) {
      const ended = withoutAuthError(request, (jar) => {
        jar.delete(ACCESS_COOKIE);
        jar.delete(REFRESH_COOKIE);
      });
      clearSessionCookies(ended.cookies);
      return ended;
    }
    const headers = new Headers(request.headers);
    headers.set(AUTH_ERROR_HEADER, outcome.code);
    return NextResponse.next({ request: { headers } });
  }

  const { session } = outcome;
  const response = withoutAuthError(request, (jar) => {
    jar.set(ACCESS_COOKIE, session.accessToken);
    jar.set(REFRESH_COOKIE, session.refreshToken);
  });
  setSessionCookies(response.cookies, session);
  return response;
}

/**
 * Passes the request on with the auth-error header removed, so a browser can never send one of its own, and with the request's cookies
 * changed by <paramref name="change"/> so this same request sees a fresh token without a round trip.
 */
function withoutAuthError(request: NextRequest, change?: (jar: NextRequest["cookies"]) => void): NextResponse {
  const headers = new Headers(request.headers);
  headers.delete(AUTH_ERROR_HEADER);
  if (change) {
    change(request.cookies);
    headers.set("cookie", request.cookies.toString());
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Only paths that need a session. The sign-in and sign-out routes and the login and signed-out pages set or clear these cookies
  // themselves and must not trigger a refresh.
  matcher: ["/", "/dashboard/:path*", "/oauth/:path*", "/api/calendar/:path*", "/billing/:path*", "/api/billing/:path*"],
};
