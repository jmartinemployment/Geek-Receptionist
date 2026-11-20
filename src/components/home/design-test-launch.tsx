import Link from "next/link";

export default function DesignTestLaunchSection() {
  return (
    <>
      <section className="min-h-screen bg-[#023059] text-white py-5 lg:hidden">
      </section>
      <section className="min-h-screen bg-[#023059] text-white py-5 hidden lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">
            <div className="col-span-5 flex items-center justify-center">

            </div>
            <div className="col-span-7">
              <h2 id="" className="text-white text-[12vw] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-shadow-sm  text-shadow-black">
                Design, Test, and Launch &nbsp; <br />
                <span className="text-[#C83803]">Minutes</span>
              </h2>
              <p className="pt-3 text-2xl text-white text-shadow-xs text-shadow-black">
                Everything you need to configure and launch your voice agents. Customize voices, design conversations, connect telephony, and integrate your systems without managing the underlying infrastructure.              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}