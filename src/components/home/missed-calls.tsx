const ANSWERS = [
  { id: "missed-answers", text: "Answers the call on its own number." },
  { id: "missed-says-ai", text: "Tells the caller it is an AI." },
  { id: "missed-asks", text: "Asks the questions you wrote for it." },
  { id: "missed-simple", text: "Answers simple questions about your business." },
];

function paragraphs() {
  return (
    <>
      <p className="pt-5 text-2xl text-white shadow-text">
        You are on a job, with a customer, or closed for the day, and the phone rings anyway. A caller who reaches voicemail can hang up and call the next business.
      </p>
      <p className="pt-3 text-2xl text-white shadow-text">Geek-Receptionist picks up, so the caller talks to something that can help.</p>
    </>
  );
}

function answers(idSuffix: string) {
  return (
    <div className="w-full rounded-sm border border-white/10 bg-[#03020d] p-6 shadow-box">
      <h3 className="font-[var(--font-sora)] text-2xl font-black text-white shadow-text">On every call it</h3>
      <ul className="list-disc list-outside space-y-2 pl-5 pt-3 text-base text-white shadow-text">
        {ANSWERS.map((answer) => (
          <li key={answer.id} id={`${answer.id}${idSuffix}`}>
            {answer.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MissedCalls() {
  return (
    <>
      <section className="min-h-screen w-full bg-[#023059] py-5 text-white lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 content-center gap-y-8">
            <div className="col-span-1">
              <h2 id="missed-calls" className="font-[var(--font-sora)] text-[8vw] font-black leading-[0.95] text-white shadow-text sm:text-4xl md:text-5xl">
                What happens to the calls you miss?
              </h2>
              {paragraphs()}
            </div>
            <div className="col-span-1">{answers("")}</div>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#023059] py-5 text-white lg:block">
        <div className="container">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">
            <div className="col-span-7">
              <h2 id="missed-calls-lg" className="font-[var(--font-sora)] text-[3.5rem] font-black leading-[0.95] text-white shadow-text">
                What happens to the calls you miss?
              </h2>
              {paragraphs()}
            </div>
            <div className="col-span-5 w-full">{answers("-lg")}</div>
          </div>
        </div>
      </section>
    </>
  );
}
