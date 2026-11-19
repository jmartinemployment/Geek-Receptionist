import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/shared/shared-hero-section";
import { ui } from "@/lib/ui";
import UnifiedPlatformSection from "@/components/home/unified-platform";
export default function Home() {
  return (
    <>
      <HeroSection
        title="Geek-Receptionist"
        summary="An AI receptionist that answers your business calls and tells every caller it is an AI."
        image="/images/home-hero.avif"
        imgAlt="The Geek-Receptionist robot"
        largeTitle
        action={
          <a href={`#${SCHEDULER_ID}`} className={ui.button}>
            Get Your Free AI Assessment
          </a>
        }
      />
      <UnifiedPlatformSection />
      <SchedulerShell />
    </>
  );
}
