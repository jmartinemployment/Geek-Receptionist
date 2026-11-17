import { redirect } from "next/navigation";
import HeroSection from "@/components/shared/shared-hero-section";
import { getAccessToken } from "@/lib/auth/session";

export default async function Home() {
  if (await getAccessToken()) redirect("/dashboard");

  return (
    <HeroSection
      title="Geek-Receptionist"
      summary="An AI receptionist that answers your business calls and tells every caller it is an AI."
      action={{ href: "/signup", label: "Set up a receptionist" }}
    />
  );
}
