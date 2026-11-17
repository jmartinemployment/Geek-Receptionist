import type { Metadata } from "next";
import FaqSection from "@/components/home/faq-section";
import HowItWorks from "@/components/home/how-it-works";
import MissedCalls from "@/components/home/missed-calls";
import Pricing from "@/components/home/pricing";
import WhatItDoes from "@/components/home/what-it-does";
import { SCHEDULER_ID } from "@/components/shared/scheduler/scheduler-id";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/shared/shared-hero-section";
import { FAQS } from "@/data/home/faq";
import { SCHEDULER_LABEL, SITE_URL } from "@/data/home/links";
import { PLANS } from "@/data/home/plans";
import { JsonLd, faqPageSchema, organizationSchema, serviceSchema } from "@/lib/seo/json-ld";
import { ui } from "@/lib/ui";

const TITLE = "Geek-Receptionist | AI Receptionist for Local Small Businesses";
const DESCRIPTION =
  "An AI receptionist that answers your business calls, asks the questions you wrote for it, answers simple questions, and tells every caller it is an AI. Four flat monthly plans.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Geek-Receptionist",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/images/home-hero.avif`, width: 1024, height: 1024, alt: "The Geek-Receptionist robot" }],
  },
};

/**
 * The public home page, in geekatyourspot.com's outline: the hero, one full-height section per h2, then the scheduler. Everyone sees it,
 * signed in or not; it reads no cookie, so it is built once and served as a file.
 */
export default function Home() {
  return (
    <>
      <JsonLd id="ld-organization" data={organizationSchema()} />
      <JsonLd id="ld-service" data={serviceSchema(PLANS, DESCRIPTION)} />
      <JsonLd id="ld-faq" data={faqPageSchema(FAQS)} />

      <HeroSection
        title="Geek-Receptionist"
        summary="An AI receptionist that answers your business calls and tells every caller it is an AI."
        image="/images/home-hero.avif"
        imgAlt="The Geek-Receptionist robot"
        largeTitle
        action={
          <a href={`#${SCHEDULER_ID}`} className={ui.button}>
            {SCHEDULER_LABEL}
          </a>
        }
      />
      <MissedCalls />
      <WhatItDoes />
      <HowItWorks />
      <Pricing />
      <FaqSection />
      <SchedulerShell />
    </>
  );
}
