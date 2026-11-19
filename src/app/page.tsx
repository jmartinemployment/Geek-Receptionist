import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/shared/shared-hero-section";
import  UnifiedPlatformSection  from "@/components/home/Unified-Platform";
/** The home page: the hero, whose button jumps to the scheduler below it. The sections between were cleared on 2026-11-18 for Jeff to rebuild. */
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
