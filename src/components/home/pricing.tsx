import { PLANS, formatMinutes, formatOverageRate } from "@/data/home/plans";

function cards(idSuffix: string) {
  return PLANS.map((plan) => (
    <li key={plan.code} className="w-full rounded-sm border border-white/10 bg-[#03020d] p-6 shadow-box">
      <article aria-labelledby={`plan-${plan.code.toLowerCase()}${idSuffix}`}>
        <h3 id={`plan-${plan.code.toLowerCase()}${idSuffix}`} className="font-[var(--font-sora)] text-2xl font-black text-white shadow-text">
          {plan.name}
        </h3>
        <p className="pt-4 text-white shadow-text">
          <span className="font-[var(--font-sora)] text-[3.5rem] font-black leading-none">${plan.priceUsd}</span>
          <span className="text-base"> a month</span>
        </p>
        <hr className="my-4 w-full border-t-1 border-[#C83803]" />
        <ul className="list-disc list-outside space-y-2 pl-5 text-base text-white shadow-text">
          <li>{formatMinutes(plan.minutes)} minutes included</li>
          <li>{formatOverageRate()} for each extra minute</li>
        </ul>
      </article>
    </li>
  ));
}

function terms() {
  return (
    <p className="text-base text-white shadow-text">
      Every plan is paid up front each month through PayPal. There is no free trial. Each call is rounded up to the whole minute.
    </p>
  );
}

export default function Pricing() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#8C4E2A] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center gap-y-8">
            <h2 id="pricing" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
              How much does it cost?
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{cards("")}</ul>
            {terms()}
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#8C4E2A] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 content-center gap-x-4 gap-y-10">
            <div className="col-span-12">
              <h2 id="pricing-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                How much does it cost?
              </h2>
            </div>
            <ul className="col-span-12 grid grid-cols-4 gap-4">{cards("-lg")}</ul>
            <div className="col-span-12">{terms()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
