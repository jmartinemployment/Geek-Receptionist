import { SCHEDULER_LABEL, SCHEDULER_URL } from "@/data/home/links";
import { ui } from "@/lib/ui";

function summary() {
  return (
    <p className="pt-5 text-2xl text-white shadow-text">
      Pick a time on the GeekAtYourSpot scheduler for a free consultation, and ask anything about putting an AI receptionist on your phone.
    </p>
  );
}

export default function ClosingBand() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#024873] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center">
            <h2 id="talk-first" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
              Want to talk it through first?
            </h2>
            {summary()}
            <div className="pt-8">
              <a id="talk-first-scheduler" href={SCHEDULER_URL} className={ui.button}>
                {SCHEDULER_LABEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#024873] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">
            <div className="col-span-7 col-start-1 w-full">
              <h2 id="talk-first-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                Want to talk it through first?
              </h2>
              {summary()}
              <div className="pt-8">
                <a id="talk-first-scheduler-lg" href={SCHEDULER_URL} className={ui.button}>
                  {SCHEDULER_LABEL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
