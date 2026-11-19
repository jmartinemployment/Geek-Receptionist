import Link from "next/link";
import Image from "next/image";

export default function UnifiedPlatformSection() {
  return (
    <>
      <section className="min-h-screen bg-[#023059] text-white py-5 lg:hidden">
      </section>
      <section className="min-h-screen bg-[#023059] text-white py-5 hidden lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">
            <div className="col-span-5 flex items-center justify-center">
              <Image
                width="460"
                height="460"
                src="/images/accounting/use-cases/accounts-payable/Transforming-Financial-Operations-Automated-Accounts-Payable.avif"
                alt="A finance professional approves an invoice on a tablet in front of a wall screen showing an automated accounts payable dashboard." />
            </div>
            <div className="col-span-7">
              <h2 id="transforming-financial-operations-with-accounts-payable-lg" className="text-white lg:text-[3.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
                One platform. Every voice agent.
              </h2>
              <p className="pt-3 text-base font-normal text-white text-shadow-sm">
                Intelligent orchestration, real-time visibility, and enterprise-grade control built to scale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}