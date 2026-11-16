import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { ui } from "@/lib/ui";

export default async function Home() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <main className={ui.center}>
      <h1 className={ui.h1}>Geek-Receptionist</h1>
      <p className={ui.muted}>Sign in to manage your receptionist and connect your calendar.</p>
      <Link className={ui.button} href="/login">
        Sign in
      </Link>
    </main>
  );
}
