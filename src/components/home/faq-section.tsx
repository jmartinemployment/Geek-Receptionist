import { FAQS } from "@/data/home/faq";

/** Each question opens and closes with the browser's own details element, so nothing here needs script. */
function questions(idSuffix: string) {
  return FAQS.map((faq) => (
    <div key={faq.id}>
      <hr className="my-6 w-full border-t-1 border-[#C83803]" />
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
          <h3 id={`${faq.id}${idSuffix}`} className="font-[var(--font-sora)] text-2xl font-black text-white shadow-text">
            {faq.question}
          </h3>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" className="shrink-0 transition-transform group-open:rotate-45">
            <line x1="12" y1="4" x2="12" y2="20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="12" x2="20" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </summary>
        <p className="pt-3 text-base text-white shadow-text">{faq.answer}</p>
      </details>
    </div>
  ));
}

export default function FaqSection() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#024059] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center">
            <h2 id="frequently-asked-questions" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div>{questions("")}</div>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#024059] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 content-center gap-x-4">
            <div className="col-span-12">
              <h2 id="frequently-asked-questions-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="col-span-12">{questions("-lg")}</div>
          </div>
        </div>
      </section>
    </>
  );
}
