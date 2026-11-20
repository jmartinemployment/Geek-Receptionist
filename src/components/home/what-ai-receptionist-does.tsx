import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEnvelope,
  faLanguage,
  faPhone,
  faRoute,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export default function WhatAIReceptionistDoesSection() {
  return (
    <>
      <section className="min-h-screen bg-[#023059] text-white py-5 lg:hidden">
      </section>
      <section className="min-h-screen bg-[#023059] text-white py-5 hidden lg:block">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <h2 id="" className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm  text-shadow-black text-center">
                What an AI &nbsp;<br />
                <span className="text-[#C83803]">Receptionist Does</span>
              </h2>
              <p className="pt-3 text-2xl text-white text-shadow-xs text-shadow-black">
                An AI receptionist answers your business calls, communicates naturally with customers, and takes action by scheduling appointments, routing calls, and sending follow-ups. Here&apos;s how Geek Receptionist manages every interaction from the moment a call comes in.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faPhone}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Answers Every Call 24/7
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      Nights, weekends, holidays, and lunch rushes. Callers hear a natural voice on the first ring instead of hold music or voicemail.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Books Appointments
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      It checks real availability, books the slot, and texts a confirmation, so the appointment is set before the call ends.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faRoute}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Qualifies Leads &amp; Routes Calls
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      It asks your qualifying questions, then transfers urgent calls to the right person or sends a real-time alert with the full transcript.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Follows Up by Text &amp; Email
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      After the call it sends the quote, link, or reminder the caller asked for, and picks the thread back up when they reply.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faLanguage}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Speaks 20+ Languages
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      Callers are answered in the language they speak, without extra staff or a translation service.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
            <div className="col-span-4">
              <article>
                <Card className="pt-0 mt-5 bg-[#CBCBCB] shadow-xl">
                  <CardHeader className="bg-[#0B162A] h-24 flex items-center justify-center">
                    <CardTitle className="flex flex-col items-center justify-center pt-1 my-0">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:translate-x-1 text-white"
                      />
                      <h3 className="text-[#FFF] text-2xl font-bold text-shadow-sm text-shadow-black">
                        Zero Data Retention (ZDR)
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2 mt-0">
                    <p className="pt-0 mt-0 text-base text-black text-shadow-xs font-medium text-shadow-black">
                      No transcripts, audio, or call content are kept by us — only the billing and usage metadata your account needs. Where call records go is your setting, not our default.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
