import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEVICE_COOKIE } from "@/lib/auth/cookies";
import { cameFromThisSite, publicOrigin } from "@/lib/auth/same-origin";
import { setSessionCookies, signIn, visitorIpFrom } from "@/services/owner-auth";

/**
 * The login form's POST. The email and password go once to GeekAPI's sign-in, from this server, with the device token this browser kept
 * from an earlier sign-in, if any; on success the tokens are set as httpOnly cookies and the browser goes to /dashboard. On any refusal the browser goes back to /login with GeekAPI's code only, which
 * the page turns into a fixed message, so nothing typed is ever echoed into a page.
 */
export async function POST(request: Request) {
  const origin = publicOrigin(request);
  if (!cameFromThisSite(request)) return back(origin, "cross_site");

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return back(origin, "invalid_request");
  }
  const email = form.get("email");
  const password = form.get("password");
  if (typeof email !== "string" || typeof password !== "string" || email.trim().length === 0 || password.length === 0) {
    return back(origin, "invalid_request");
  }

  const device = (await cookies()).get(DEVICE_COOKIE)?.value ?? null;
  const outcome = await signIn(email, password, visitorIpFrom(request.headers), device);
  if (!outcome.ok) return back(origin, outcome.code);

  const response = NextResponse.redirect(new URL("/dashboard", origin), 303);
  setSessionCookies(response.cookies, outcome.session);
  return response;
}

function back(origin: string, code: string): NextResponse {
  const url = new URL("/login", origin);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url, 303);
}
