import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";

export default async function Home() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <main className="center">
      <h1>Geek-Receptionist</h1>
      <p className="muted">Sign in to manage your receptionist and connect your calendar.</p>
      <a className="button" href="/login">
        Sign in
      </a>
    </main>
  );
}
