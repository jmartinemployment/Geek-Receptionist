import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { loginMessage } from "@/lib/auth/login-messages";

export const dynamic = "force-dynamic";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string | string[] }> }) {
  if (await getAccessToken()) redirect("/dashboard");
  const { error } = await searchParams;
  const message = loginMessage(typeof error === "string" ? error : null);

  return (
    <main className="center">
      <h1>Sign in to Geek-Receptionist</h1>
      {message ? (
        <p className="status bad" role="alert">
          {message}
        </p>
      ) : null}
      <form className="card form" action="/api/auth/sign-in" method="post">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
        <button className="button" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
