const STEPS = [
  { id: "step-business", title: "Tell us about your business", text: "A few short questions and a business form." },
  { id: "step-plan", title: "Choose a plan", text: "Pick one of the four plans and pay the first month through PayPal." },
  { id: "step-number", title: "Get your number", text: "Choose an area code and your receptionist gets its own number." },
  { id: "step-sign-in", title: "Sign in", text: "Create your sign-in, then connect Google Calendar from your dashboard." },
];

function steps(idSuffix: string) {
  return STEPS.map((step, index) => (
    <li key={step.id} className="border-t-2 border-white pt-4">
      <p aria-hidden="true" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-none text-white shadow-text">
        {index + 1}
      </p>
      <h3 id={`${step.id}${idSuffix}`} className="pt-3 font-[var(--font-sora)] text-2xl font-black text-white shadow-text">
        {step.title}
      </h3>
      <p className="pt-2 text-base text-white shadow-text">{step.text}</p>
    </li>
  ));
}

export default function HowItWorks() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#0B162A] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center gap-y-8">
            <h2 id="how-it-works" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
              How do you set it up?
            </h2>
            <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2">{steps("")}</ol>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#0B162A] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 content-center gap-x-4 gap-y-10">
            <div className="col-span-12">
              <h2 id="how-it-works-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                How do you set it up?
              </h2>
            </div>
            <ol className="col-span-12 grid grid-cols-4 gap-x-8">{steps("-lg")}</ol>
          </div>
        </div>
      </section>
    </>
  );
}
