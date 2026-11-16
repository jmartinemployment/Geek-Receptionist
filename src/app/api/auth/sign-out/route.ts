import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { REFRESH_COOKIE } from "@/lib/auth/cookies";
import { cameFromThisSite, publicOrigin } from "@/lib/auth/same-origin";
import { clearSessionCookies, signOut } from "@/services/owner-auth";

/**
 * The sign-out button's POST. GeekAPI ends the sign-in the refresh token belongs to, then both cookies are cleared. When GeekAPI could
 * not end it, the cookies are still cleared, because the owner asked to leave this browser, and the signed-out page says the sign-in
 * may still be open elsewhere rather than claiming it was ended.
 */
export async function POST(request: Request) {
  const origin = publicOrigin(request);
  if (!cameFromThisSite(request)) return NextResponse.redirect(new URL("/dashboard", origin), 303);

  const jar = await cookies();
  const refresh = jar.get(REFRESH_COOKIE)?.value;
  const ended = refresh ? await signOut(refresh) : { ok: true as const };

  const target = new URL("/signed-out", origin);
  if (!ended.ok) target.searchParams.set("notice", "not_ended");
  const response = NextResponse.redirect(target, 303);
  clearSessionCookies(response.cookies);
  return response;
}
