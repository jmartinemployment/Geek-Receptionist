const FACTS = [
  { id: "fact-says-ai", title: "Says it is an AI", text: "Every caller is told at the start." },
  { id: "fact-flat-price", title: "Flat monthly price", text: "Four plans, each with its minutes included." },
  { id: "fact-no-trial", title: "No free trial", text: "Paid up front through PayPal." },
  { id: "fact-own-number", title: "Its own number", text: "You choose the area code." },
];

function facts(idSuffix: string) {
  return FACTS.map((fact) => (
    <li key={fact.id} id={`${fact.id}${idSuffix}`} className="border-l-2 border-[#C83803] pl-4">
      <p className="text-2xl font-bold text-white shadow-text">{fact.title}</p>
      <p className="pt-1 text-base text-white shadow-text">{fact.text}</p>
    </li>
  ));
}

/** The row of plain facts under the hero. It has no heading of its own, so it is a band and not a full-height section. */
export default function FactsStrip() {
  return (
    <>
      <section aria-label="Geek-Receptionist at a glance" className="w-full bg-[#012840] py-10 text-white lg:hidden">
        <div className="container">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">{facts("")}</ul>
        </div>
      </section>

      <section aria-label="Geek-Receptionist at a glance" className="hidden bg-[#012840] py-12 text-white lg:block">
        <div className="container">
          <ul className="grid grid-cols-4 gap-x-8">{facts("-lg")}</ul>
        </div>
      </section>
    </>
  );
}
