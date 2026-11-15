import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { createPkcePair } from "@/lib/auth/pkce";
import { PKCE_COOKIE, STATE_COOKIE, cookieOpts } from "@/lib/auth/cookies";
import { authConfig } from "@/lib/config";

/** Start GeekOAuth Authorization Code + PKCE. */
export async function GET() {
  const { verifier, challenge } = createPkcePair();
  const state = randomBytes(16).toString("base64url");
  const url = new URL(authConfig.authorizeUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", authConfig.clientId);
  url.searchParams.set("redirect_uri", authConfig.redirectUri);
  url.searchParams.set("scope", authConfig.scope);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("state", state);
  // Always show GeekOAuth credentials: the SSO cookie alone must not sign in silently.
  url.searchParams.set("prompt", "login");

  const res = NextResponse.redirect(url.toString());
  res.cookies.set(PKCE_COOKIE, verifier, cookieOpts.pkce);
  // Kept beside the verifier so the callback can check the state it comes back with.
  res.cookies.set(STATE_COOKIE, state, cookieOpts.pkce);
  return res;
}
