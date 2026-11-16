import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { ui } from "@/lib/ui";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function Login() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <main className={ui.center}>
      <h1 className={ui.h1}>Sign in to Geek-Receptionist</h1>
      <LoginForm />
    </main>
  );
}
