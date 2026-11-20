import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/home/hero-section";
import { ui } from "@/lib/ui";
import VoiceAgentsInMinutesSection from "@/components/home/voice-agents-in-minutes";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <VoiceAgentsInMinutesSection />
      <SchedulerShell />
    </>
  );
}
