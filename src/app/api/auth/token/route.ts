import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  PKCE_COOKIE,
  REFRESH_COOKIE,
  STATE_COOKIE,
  cookieOpts,
} from "@/lib/auth/cookies";
import { accessCookieMaxAge, exchangeAuthorizationCode } from "@/services/auth-tokens";

/** Exchanges the authorization code from GeekOAuth for tokens, kept in httpOnly cookies. */
export async function POST(request: Request) {
  const { code, state } = (await request.json()) as { code?: string; state?: string };
  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const jar = await cookies();
  const verifier = jar.get(PKCE_COOKIE)?.value;
  const expectedState = jar.get(STATE_COOKIE)?.value;
  if (!verifier || !expectedState) {
    return NextResponse.json({ error: "Sign-in session expired. Start again." }, { status: 400 });
  }
  if (state !== expectedState) {
    return NextResponse.json(
      { error: "The sign-in answer does not match the sign-in this browser started. Start again." },
      { status: 400 },
    );
  }

  try {
    const tokens = await exchangeAuthorizationCode(code, verifier);
    const res = NextResponse.json({ ok: true });
    if (tokens.refresh_token) {
      res.cookies.set(REFRESH_COOKIE, tokens.refresh_token, cookieOpts.refresh);
    }
    res.cookies.set(ACCESS_COOKIE, tokens.access_token, {
      ...cookieOpts.access,
      maxAge: accessCookieMaxAge(tokens.expires_in),
    });
    res.cookies.set(PKCE_COOKIE, "", cookieOpts.clear);
    res.cookies.set(STATE_COOKIE, "", cookieOpts.clear);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token exchange failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
