import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/home/hero-section";
import { ui } from "@/lib/ui";
import DesignTestLaunch from "@/components/home/design-test-launch";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <DesignTestLaunch />
      <SchedulerShell />
    </>
  );
}
