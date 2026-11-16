"use client";

import { useActionState } from "react";
import { Captcha } from "@/components/captcha";
import { ui } from "@/lib/ui";
import { signInAction, type SignInState } from "./actions";

const start: SignInState = { error: null, email: "" };

const field =
  "rounded-md border border-line bg-paper px-3 py-2 text-ink focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent";

export function LoginForm({ captchaSiteKey }: { captchaSiteKey: string }) {
  const [state, action, pending] = useActionState(signInAction, start);

  return (
    <form action={action} className={`${ui.card} flex w-full max-w-sm flex-col gap-2 text-left`} aria-describedby={state.error ? "login-error" : undefined}>
      {state.error ? (
        <p id="login-error" className={ui.status.bad} role="alert">
          {state.error}
        </p>
      ) : null}
      <label htmlFor="email" className="font-semibold">
        Email
      </label>
      <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.email} className={field} />
      <label htmlFor="password" className="font-semibold">
        Password
      </label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      <Captcha siteKey={captchaSiteKey} answered={state} />
      <button className={`${ui.button} mt-2`} type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
