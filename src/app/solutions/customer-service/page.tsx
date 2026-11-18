import type { Metadata } from "next";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/shared/shared-hero-section";

export const metadata: Metadata = { title: "Customer Service | Geek-Receptionist" };

/** Customer Service: a blank page reached from the menu (Jeff, 2026-11-18). Its content is not written yet; the scheduler follows the hero, as on every page. */
export default function CustomerService() {
  return (
    <>
      <HeroSection title="Customer Service" summary="" />
      <SchedulerShell />
    </>
  );
}
