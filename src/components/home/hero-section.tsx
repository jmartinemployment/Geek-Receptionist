import { SCHEDULER_HERO_LINK_ID } from "@/components/shared/scheduler/scheduler-id";

export default function HeroSection() {
  return (
    <>
      <header className="min-h-screen w-full bg-[#0B162A] lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 place-items-center">
            <div className="col-span-1">
              <h1 className="font-[var(--font-sora)] text-[12vw] font-black leading-[0.95] text-white shadow-text sm:text-6xl md:text-7xl">
                One Platform. Every Voice&nbsp;
                <br />
                <span className="text-[#C83803]">Agent</span>
              </h1>
              <p className="pt-3 text-xl text-white shadow-text">
                Your business, always available. Geek Receptionist answers calls 24/7, manages appointments, follows up with customers by text, and delivers consistent service using your business information.
              </p>
              <div className="pt-6">
                <a href="#consultationAppointment2xl"
                  id={SCHEDULER_HERO_LINK_ID}
                  className="btn btn-primary"
                >
                  Get Your Free AI Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="hidden min-h-screen bg-[#0B162A] lg:block">
        <div className="container min-h-screen">
          <div className="grid min-h-screen grid-cols-12 place-items-center">
            <div className="col-span-7">
              <h1 className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm  text-shadow-black">
                AI Receptionist&nbsp;
                <br />
                Call, Text, Email&nbsp;< br />
                <span className="text-[#C83803]">Chat</span>
              </h1>
              <p className="pt-3 text-2xl text-white test-shadow-sm text-shadow-black">
                Your business, always available. Geek Receptionist answers calls 24/7, manages appointments, follows up with customers by text, and delivers consistent service using your business information.
              </p>
              <div className="pt-8">
                <a href="#consultationAppointment2xl"
                  id={`${SCHEDULER_HERO_LINK_ID}-lg`}
                  className="btn btn-primary" >
                  Get Your Free AI Assessment
                </a>
              </div>
            </div>
            <div className="col-span-5 flex items-center justify-center min-h-screen">
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
