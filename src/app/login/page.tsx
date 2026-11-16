import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { loginMessage } from "@/lib/auth/login-messages";
import { captchaSiteKey } from "@/lib/captcha";
import { ui } from "@/lib/ui";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function Login() {
  if (await getAccessToken()) redirect("/dashboard");
  const siteKey = captchaSiteKey();

  return (
    <main className={ui.center}>
      <h1 className={ui.h1}>Sign in to Geek-Receptionist</h1>
      {siteKey ? (
        <LoginForm captchaSiteKey={siteKey} />
      ) : (
        <p className={ui.status.bad} role="alert">
          {loginMessage("captcha_not_configured")}
        </p>
      )}
    </main>
  );
}
