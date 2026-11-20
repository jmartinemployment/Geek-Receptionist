import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/home/hero-section";
import { ui } from "@/lib/ui";
import WhatAIReceptionistDoesSection from "@/components/home/what-ai-receptionist-does";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <WhatAIReceptionistDoesSection />
      <SchedulerShell />
    </>
  );
}
