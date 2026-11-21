import { SCHEDULER_HERO_LINK_ID } from "@/components/shared/scheduler/scheduler-id";

export default function HeroSection() {
  return (
    <header className="min-h-screen w-full bg-[#0B162A]">
      <div className="container">
        <div className="grid min-h-screen grid-cols-12 place-items-center">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm text-shadow-black">
              AI Receptionist&nbsp;
              <br />
              Call, Text, Email&nbsp;
              <br />
              <span className="text-[#C83803]">Chat</span>
            </h1>
            <p className="pt-3 text-lg sm:text-xl lg:text-2xl text-white text-shadow-xs text-shadow-black">
              Your business, always available. Geek Receptionist answers calls 24/7, manages appointments, follows up with customers by text, and delivers consistent service using your business information.
            </p>
            <div className="pt-6 lg:pt-8">
              <a href="/contact" id={SCHEDULER_HERO_LINK_ID} className="btn btn-primary">
                Get Your Free AI Assessment
              </a>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:flex items-center justify-center min-h-screen">
          </div>
        </div>
      </div>
    </header>
  );
}
