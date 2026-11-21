import { notFound } from "next/navigation";
import { EXCLUDED_GROUPS, EXCLUDED_INDUSTRIES } from "@/lib/signup/excluded";

/**
 * A layout preview of the declaration planned in plans/attestation-and-terms.md (stages 2, 3 and 5), so Jeff can see the page in the
 * running app before it is built into /signup. Nothing on it is sent anywhere: it has no action and no submit button. It exists only
 * outside production, so it can never be reached on the live site, and it is deleted when the declaration is built into the signup.
 */
export const dynamic = "force-dynamic";

const sheetField =
  "w-full border-0 border-b border-slate-400 bg-transparent px-0 py-1 font-serif text-base text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f5fae]";
const sheetLabel = "font-sans text-sm text-slate-600";
const radio = "size-4 accent-[#c83803]";

function Part({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-slate-300 pt-6 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-lg font-semibold text-slate-900">
        <span className="mr-2 text-slate-500">{number}.</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Line({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:items-end sm:gap-4">
      <label htmlFor={id} className={sheetLabel}>
        {label}
      </label>
      <input id={id} name={id} type={type} autoComplete="off" className={sheetField} />
    </div>
  );
}

function YesNo({ name, yes = "Yes", no = "No" }: { name: string; yes?: string; no?: string }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 font-sans text-base text-slate-900">
      {[
        { value: "yes", text: yes },
        { value: "no", text: no },
      ].map((option) => (
        <label key={option.value} htmlFor={`${name}-${option.value}`} className="flex items-center gap-2">
          <input id={`${name}-${option.value}`} type="radio" name={name} value={option.value} className={radio} />
          {option.text}
        </label>
      ))}
    </div>
  );
}

export default function DeclarationPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#0B162A] px-4 py-10 text-white">
      <div className="mx-auto mb-6 max-w-3xl rounded border border-[#f0673a] px-4 py-3 text-sm">
        <strong>Layout preview.</strong> Nothing on this page is sent or saved. It shows the declaration planned in
        plans/attestation-and-terms.md. The wording is a draft and has not been reviewed by a lawyer.
      </div>

      <article
        aria-label="Declaration of eligibility, draft"
        className="mx-auto grid max-w-3xl gap-6 rounded-sm bg-white p-6 text-slate-900 shadow-xl sm:p-10"
      >
        <header className="grid gap-1 border-b-2 border-slate-900 pb-4 text-center">
          <p className="font-sans text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Geek-Receptionist</p>
          <h1 className="font-serif text-2xl font-semibold tracking-wide text-slate-900 uppercase">Declaration of eligibility</h1>
        </header>

        <Part number={1} title="The declarant">
          <Line id="declarant-name" label="Full name" />
          <Line id="declarant-title" label="Title" />
        </Part>

        <Part number={2} title="The business">
          <Line id="business-name" label="Business name" />
          <Line id="business-address" label="Address" />
          <Line id="business-phone" label="Phone" type="tel" />
          <Line id="business-email" label="Email" type="email" />
          <Line id="business-password" label="Choose a password" type="password" />
        </Part>

        <Part number={3} title="Eligibility">
          <p className="font-serif text-base leading-relaxed">
            To check eligibility, confirm whether the business operates in any of these regulated sectors.
          </p>
          {EXCLUDED_GROUPS.map((group) => (
            <fieldset key={group.heading} className="grid gap-1">
              <legend className="mb-1 font-sans text-xs font-bold tracking-widest text-slate-500 uppercase">{group.heading}</legend>
              {group.codes.map((code) => (
                <div key={code} className="grid gap-2 border-t border-slate-200 py-3 first:border-t-0">
                  <p className="font-serif text-base">{EXCLUDED_INDUSTRIES[code].question}</p>
                  <YesNo name={code} />
                </div>
              ))}
            </fieldset>
          ))}
        </Part>

        <Part number={4} title="Declaration">
          <p className="font-serif text-base leading-relaxed">
            I declare that I am authorised to answer for this business and that the answers given in this document are true to the best of my
            knowledge.
          </p>
          <YesNo name="declaration" />
        </Part>

        <Part number={5} title="Subscription Terms">
          <p className="font-serif text-base leading-relaxed">I agree to the Geek-Receptionist Subscription Terms.</p>
          <p className="border-l-4 border-[#c83803] bg-orange-50 px-4 py-3 font-serif text-base leading-relaxed">
            <strong>Subject to</strong> Geek-Receptionist verifying a connection to each system the business requires. No payment is taken
            before that connection is verified, and if a required system cannot be connected I may continue without it or stop.
          </p>
          <YesNo name="terms" yes="Agree" no="Do not agree" />
        </Part>

        <footer className="border-t border-slate-400 pt-4 font-sans text-sm text-slate-600">
          A No, or a Do not agree, stops the signup and creates no tenant. Each statement is stored with the exact words shown, the time and
          the visitor&rsquo;s address, and is kept.
        </footer>
      </article>
    </div>
  );
}
