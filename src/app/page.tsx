import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { ui } from "@/lib/ui";

export default async function Home() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <main className={ui.center}>
      <h1 className={ui.h1}>Geek-Receptionist</h1>
      <div className="flex flex-wrap justify-center gap-3">
        <Link className={ui.button} href="/signup">
          Set up a receptionist
        </Link>
      </div>
    </main>
  );
}
