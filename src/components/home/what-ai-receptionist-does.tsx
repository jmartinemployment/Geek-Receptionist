import Link from "next/link";

export default function WhatAIReceptionistDoesSection() {
  return (
    <>
      <section className="min-h-screen bg-[#023059] text-white py-5 lg:hidden">
      </section>
      <section className="min-h-screen bg-[#023059] text-white py-5 hidden lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">

            <div className="col-span-12">
              <h2 id="" className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm  text-shadow-black text-center">
                What an AI &nbsp;<br />
                <span className="text-[#C83803]">Receptionist Does</span>
              </h2>
              <p className="pt-3 text-2xl text-white text-shadow-xs text-shadow-black">
                An AI receptionist answers your business calls, communicates naturally with customers, and takes action by scheduling appointments, routing calls, and sending follow-ups. Here's how Geek Receptionist manages every interaction from the moment a call comes in.
              </p>
            </div>
            <div className="col-span-12">
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <article className="border-t border-neutral-200 pt-6">
                  <h3 className="mt-3 text-xl font-normal tracking-[-0.015em] text-neutral-950">
                    Answers every call, 24/7
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                    Nights, weekends, holidays, and lunch rushes. Callers hear a natural voice on the first ring instead of hold music or voicemail.
                  </p>
                </article>
                <article className="border-t border-neutral-200 pt-6">
                  <div className="font-mono text-xs tracking-[0.2em] text-[#2563eb]">02
                  </div><h3 className="mt-3 text-xl font-normal tracking-[-0.015em] text-neutral-950">
                    Books appointments on your live calendar</h3><p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                    It checks real availability, books the slot, and texts a confirmation, so the appointment is set before the call ends.
                  </p></article><article className="border-t border-neutral-200 pt-6">
                  <div className="font-mono text-xs tracking-[0.2em] text-[#2563eb]">03
                  </div>
                  <h3 className="mt-3 text-xl font-normal tracking-[-0.015em] text-neutral-950">
                    Qualifies leads and routes calls
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                    It asks your qualifying questions, then transfers urgent calls to the right person or sends a real-time alert with the full transcript.
                  </p>
                </article>
                <article className="border-t border-neutral-200 pt-6">
                  <div className="font-mono text-xs tracking-[0.2em] text-[#2563eb]">
                    04
                  </div>
                  <h3 className="">
                    Follows up by text and email
                  </h3>
                  <p className="">
                    After the call it sends the quote, link, or reminder the caller asked for, and picks the thread back up when they reply.
                  </p>
                </article>
                <article className="">
                  <div className="">
                    05</div>
                  <h3 className="">
                    Remembers every caller
                  </h3>
                  <p className="">
                    Most AI receptionists start from zero on every call. Frontdesk saves each conversation to the customer record, so the next call starts with context.
                  </p>
                </article>
                <article className="">
                  <div className="">
                    06</div><h3 className="mt-3 text-xl font-normal tracking-[-0.015em] text-neutral-950">
                    Speaks 20+ languages</h3>
                  <p className="">
                    Callers are answered in the language they speak, without extra staff or a translation service.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}