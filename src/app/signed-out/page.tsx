import Link from "next/link";
import { ui } from "@/lib/ui";

export default async function SignedOut({ searchParams }: { searchParams: Promise<{ notice?: string | string[] }> }) {
  const { notice } = await searchParams;

  return (
    <div className={ui.center}>
      <h1 className={ui.h1}>You are signed out</h1>
      {notice === "not_ended" ? (
        <p className={`${ui.status.warn} max-w-prose`} role="alert">
          This browser is signed out, but GeekAPI could not be reached to end the sign-in itself. It ends on its own within 30 days, or
          the next time it is used after you sign in again.
        </p>
      ) : null}
      <Link className={ui.button} href="/login">
        Sign in again
      </Link>
    </div>
  );
}
