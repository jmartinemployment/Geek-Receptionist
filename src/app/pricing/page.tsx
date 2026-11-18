import type { Metadata } from "next";
import HeroSection from "@/components/shared/shared-hero-section";

export const metadata: Metadata = { title: "Pricing | Geek-Receptionist" };

/** Pricing: a blank page reached from the menu (Jeff, 2026-11-18). Its content is not written yet. */
export default function Pricing() {
  return <HeroSection title="Pricing" summary="" />;
}
