import type { ReactNode } from "react";

type Feature = { id: string; title: string; text: string; icon: ReactNode };

const stroke = { fill: "none", stroke: "#C83803", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Plain geometric marks, one per card. They are decoration: the card's heading says what it is. */
const FEATURES: Feature[] = [
  {
    id: "feature-answers",
    title: "Answers the call",
    text: "Every call to your receptionist's number is picked up, so no caller is left with voicemail.",
    icon: (
      <>
        <rect x="9" y="3" width="14" height="26" rx="2" {...stroke} />
        <line x1="14" y1="24" x2="18" y2="24" {...stroke} />
      </>
    ),
  },
  {
    id: "feature-says-ai",
    title: "Says it is an AI",
    text: "The receptionist tells every caller that it is an AI. Nobody is led to think they reached a person.",
    icon: (
      <>
        <circle cx="16" cy="16" r="12" {...stroke} />
        <line x1="16" y1="14" x2="16" y2="22" {...stroke} />
        <line x1="16" y1="10" x2="16" y2="10.01" {...stroke} />
      </>
    ),
  },
  {
    id: "feature-asks",
    title: "Asks your questions",
    text: "You write the questions. The receptionist asks each caller, so you know what the call was about.",
    icon: (
      <>
        <rect x="4" y="5" width="24" height="17" rx="2" {...stroke} />
        <polyline points="10,22 10,28 17,22" {...stroke} />
        <line x1="9" y1="11" x2="23" y2="11" {...stroke} />
        <line x1="9" y1="16" x2="18" y2="16" {...stroke} />
      </>
    ),
  },
  {
    id: "feature-simple",
    title: "Answers simple questions",
    text: "Hours, location and the services you offer. Callers get the everyday answers without waiting for you.",
    icon: (
      <>
        <circle cx="16" cy="16" r="12" {...stroke} />
        <polyline points="16,9 16,16 21,19" {...stroke} />
      </>
    ),
  },
  {
    id: "feature-books",
    title: "Books appointments",
    text: "Connect your Google Calendar and the receptionist can check when you are free and book the appointment.",
    icon: (
      <>
        <rect x="4" y="6" width="24" height="22" rx="2" {...stroke} />
        <line x1="4" y1="12" x2="28" y2="12" {...stroke} />
        <line x1="10" y1="3" x2="10" y2="8" {...stroke} />
        <line x1="22" y1="3" x2="22" y2="8" {...stroke} />
        <polyline points="11,20 15,24 22,16" {...stroke} />
      </>
    ),
  },
  {
    id: "feature-flat-price",
    title: "Costs the same each month",
    text: "Each plan includes its minutes. Extra minutes have one rate, the same on every plan.",
    icon: (
      <>
        <rect x="4" y="8" width="24" height="16" rx="2" {...stroke} />
        <circle cx="16" cy="16" r="4" {...stroke} />
      </>
    ),
  },
];

function cards(idSuffix: string) {
  return FEATURES.map((feature) => (
    <li key={feature.id} className="w-full rounded-sm border border-white/10 bg-[#03020d] p-6 shadow-box">
      <article aria-labelledby={`${feature.id}${idSuffix}`}>
        <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" focusable="false">
          {feature.icon}
        </svg>
        <h3 id={`${feature.id}${idSuffix}`} className="pt-4 font-[var(--font-sora)] text-2xl font-black text-white shadow-text">
          {feature.title}
        </h3>
        <p className="pt-2 text-base text-white shadow-text">{feature.text}</p>
      </article>
    </li>
  ));
}

export default function WhatItDoes() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#BF5934] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center gap-y-8">
            <h2 id="what-it-does" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
              What does Geek-Receptionist do on a call?
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{cards("")}</ul>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#BF5934] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 content-center gap-x-4 gap-y-10">
            <div className="col-span-12">
              <h2 id="what-it-does-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                What does Geek-Receptionist do on a call?
              </h2>
            </div>
            <ul className="col-span-12 grid grid-cols-3 gap-4">{cards("-lg")}</ul>
          </div>
        </div>
      </section>
    </>
  );
}
