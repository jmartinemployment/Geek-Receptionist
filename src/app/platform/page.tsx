import type { Metadata } from "next";
import HeroSection from "@/components/shared/shared-hero-section";

export const metadata: Metadata = { title: "Platform | Geek-Receptionist" };

/** Platform: a blank page reached from the menu (Jeff, 2026-11-18). Its content is not written yet. */
export default function Platform() {
  return <HeroSection title="Platform" summary="" />;
}
