import type { Faq } from "@/data/home/faq";
import { SITE_URL } from "@/data/home/links";
import type { Plan } from "@/data/home/plans";

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_ID = "https://geekatyourspot.com/#organization";

/** One ld+json block. A "<" in the data is written as its escape, so text can never close the script tag. */
export function JsonLd({ id, data }: { id: string; data: JsonLdObject }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Geek @ Your Spot LLC",
    url: "https://geekatyourspot.com",
    logo: `${SITE_URL}/images/GeekAtYourSpot.svg`,
  };
}

export function serviceSchema(plans: Plan[], description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Geek-Receptionist",
    serviceType: "AI receptionist",
    description,
    url: SITE_URL,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "United States" },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.priceUsd.toFixed(2),
      priceCurrency: "USD",
      description: `${plan.minutes} minutes included each month`,
    })),
  };
}

export function faqPageSchema(faqs: Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
