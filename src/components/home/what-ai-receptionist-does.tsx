import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDays,
  faEnvelope,
  faLanguage,
  faPhone,
  faRoute,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

type Feature = {
  icon: IconDefinition;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: faPhone,
    title: "Answers Every Call 24/7",
    body: "Nights, weekends, holidays, and lunch rushes. Callers hear a natural voice on the first ring instead of hold music or voicemail.",
  },
  {
    icon: faCalendarDays,
    title: "Books Appointments",
    body: "It checks real availability, books the slot, and texts a confirmation, so the appointment is set before the call ends.",
  },
  {
    icon: faRoute,
    title: "Qualifies Leads & Routes Calls",
    body: "It asks your qualifying questions, then transfers urgent calls to the right person or sends a real-time alert with the full transcript.",
  },
  {
    icon: faEnvelope,
    title: "Follows Up by Text & Email",
    body: "After the call it sends the quote, link, or reminder the caller asked for, and picks the thread back up when they reply.",
  },
  {
    icon: faLanguage,
    title: "Speaks 20+ Languages",
    body: "Callers are answered in the language they speak, without extra staff or a translation service.",
  },
  {
    icon: faShieldHalved,
    title: "Zero Data Retention (ZDR)",
    body: "No transcripts, audio, or call content are kept by us — only the billing and usage metadata your account needs. Where call records go is your setting, not our default.",
  },
];

export default function WhatAIReceptionistDoesSection() {
  return (
    <section className="min-h-screen bg-[#023059] text-white py-5">
      <div className="container">
        <h2 className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm text-shadow-black text-center">
          What an AI &nbsp;<br />
          <span className="text-[#C83803]">Receptionist Does</span>
        </h2>
        <p className="pt-3 text-lg sm:text-xl lg:text-2xl text-white text-shadow-xs text-shadow-black">
          An AI receptionist answers your business calls, communicates naturally with customers, and takes action by scheduling appointments, routing calls, and sending follow-ups. Here&apos;s how Geek Receptionist manages every interaction from the moment a call comes in.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="h-full">
              <Card className="pt-0 h-full bg-[#CBCBCB] shadow-xl">
                <CardHeader className="bg-[#0B162A] min-h-24 flex items-center justify-center">
                  <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                    <FontAwesomeIcon
                      icon={feature.icon}
                      width={48}
                      height={48}
                      className="text-white"
                    />
                    <h3 className="text-[#FFF] text-2xl font-bold text-center text-shadow-sm text-shadow-black">
                      {feature.title}
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-2 mt-0">
                  <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
