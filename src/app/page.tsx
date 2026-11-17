import Link from "next/link";
import { redirect } from "next/navigation";
import HeroSection from "@/components/shared/shared-hero-section";
import { getAccessToken } from "@/lib/auth/session";
import { ui } from "@/lib/ui";

export default async function Home() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <HeroSection
      title="Geek-Receptionist"
      summary="An AI receptionist that answers your business calls and tells every caller it is an AI."
      action={
        <Link href="/signup" className={ui.button}>
          Set up a receptionist
        </Link>
      }
    />
  );
}
