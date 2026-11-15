import { NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, cookieOpts } from "@/lib/auth/cookies";
import { authConfig } from "@/lib/config";

/** Clear the app session, then end GeekOAuth SSO so the next sign-in shows credentials. */
export async function POST() {
  const logout = new URL(`${authConfig.authUrl}/connect/logout`);
  logout.searchParams.set("post_logout_redirect_uri", authConfig.postLogoutRedirectUri);
  logout.searchParams.set("client_id", authConfig.clientId);

  const res = NextResponse.redirect(logout.toString(), 303);
  res.cookies.set(REFRESH_COOKIE, "", cookieOpts.clear);
  res.cookies.set(ACCESS_COOKIE, "", cookieOpts.clear);
  return res;
}
