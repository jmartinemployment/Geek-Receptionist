"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEVICE_COOKIE } from "@/lib/auth/cookies";
import { loginMessage } from "@/lib/auth/login-messages";
import { verifyCaptcha } from "@/lib/captcha";
import { setSessionCookies, signIn, visitorIpFrom } from "@/services/owner-auth";

/**
 * The login form, behind the robot check. The email and password go once to GeekAPI's sign-in, from this server, with the device token this browser kept from an
 * earlier sign-in, if any; on success the tokens are set as httpOnly cookies and the owner goes to /dashboard without a page reload. A
 * refusal comes back as one of the login page's fixed sentences, with the email typed so the owner does not type it again; the password
 * is never sent back.
 */
export type SignInState = { error: string | null; email: string };

export async function signInAction(_previous: SignInState, form: FormData): Promise<SignInState> {
  const email = form.get("email");
  const password = form.get("password");
  const typed = typeof email === "string" ? email : "";
  if (typeof email !== "string" || typeof password !== "string" || email.trim().length === 0 || password.length === 0) {
    return { error: loginMessage("invalid_request"), email: typed };
  }

  const visitorIp = visitorIpFrom(await headers());
  const captcha = await verifyCaptcha(form.get("g-recaptcha-response"), visitorIp);
  if (captcha !== "ok") return { error: loginMessage(captcha), email: typed };

  const jar = await cookies();
  const outcome = await signIn(email, password, visitorIp, jar.get(DEVICE_COOKIE)?.value ?? null);
  if (!outcome.ok) return { error: loginMessage(outcome.code), email: typed };

  setSessionCookies(jar, outcome.session);
  redirect("/dashboard");
}
