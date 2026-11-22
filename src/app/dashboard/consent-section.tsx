import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { CONSENT_MODES, describeConsentSettings, type ConsentMode } from "@/lib/receptionist/controls";
import { ui } from "@/lib/ui";
import { setConsentAction } from "./actions";
import { ActionButton } from "@/components/action-button";

/**
 * The two modes in the owner's own words. They are held in one table and drawn by one block of markup below, so neither can end up with
 * more room, more sentences or a louder colour than the other. Jeff, 2026-11-20: "Client configurable. I don't feel comfortable making
 * that decision for others." This card does not make it either: there is no recommended mode here, and each description carries the same
 * two facts about its own mode — what the caller has to do, and what reaches the receptionist and is billed because of it.
 */
const CHOICES: Record<ConsentMode, { heading: string; experience: string; trade: string; choose: string; choosing: string }> = {
  strict_keypress: {
    heading: "Callers press a key",
    experience:
      "A caller hears a short notice that this line is answered by an AI assistant, and presses a key before your " +
      "receptionist speaks. Pressing it is something the caller did, rather than something taken from their not hanging up.",
    trade:
      "Some callers will not press it, and those calls end there. A machine dialling you cannot press it either, so it never reaches " +
      "your receptionist — and this product bills by the minute, so a robocall stopped here is a minute you are not billed for.",
    choose: "Ask callers to press a key",
    choosing: "Changing…",
  },
  passive_disclosure: {
    heading: "Your receptionist carries straight on",
    experience:
      "A caller hears a short notice that this line is answered by an AI assistant, and your receptionist carries " +
      "straight on. Nothing is asked of the caller, and nobody is turned away by a keypad they would not use.",
    trade:
      "Nothing else is turned away either. A machine dialling you stays on the line exactly as a person does and reaches your " +
      "receptionist — and this product bills by the minute, so every robocall it answers is a minute billed to you.",
    choose: "Let your receptionist carry straight on",
    choosing: "Changing…",
  },
};

/**
 * How this business's callers are greeted before the receptionist engages, read from GeekAPI on the server while the page streams. It is
 * a fork and not a switch: every caller hears one of the two, there is no off, and neither mode grants or withdraws anything. So both are
 * shown side by side in the same shape, the live one is marked rather than praised, and changing to either is one plain act.
 *
 * An answer this page cannot read is a problem naming its code. It is never drawn as one of the two modes, because that would tell the
 * owner something about every call they take that nothing checked.
 */
export async function ConsentSection() {
  const setting = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/receptionist/consent`, { method: "GET" });
  if (setting.status === 401) redirect("/login");
  const consent = describeConsentSettings(setting.status, setting.body);

  return (
    <section className={ui.card} aria-labelledby="consent-heading">
      <h2 id="consent-heading" className={ui.h2}>
        What callers hear first
      </h2>

      {consent.kind === "problem" && (
        <>
          <p className={ui.status.bad}>Could not read what your callers hear</p>
          <p className={ui.muted}>
            {consent.message}
            {consent.code ? ` (${consent.code})` : ""}
          </p>
        </>
      )}

      {consent.kind === "settings" && (
        <>
          <p className={`${ui.muted} mb-4`}>
            Every call starts with one of these two. There is no third way and no off: the only question is which one your callers get,
            and it is yours to answer.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONSENT_MODES.map((mode) => {
              const choice = CHOICES[mode];
              const live = consent.mode === mode;
              return (
                <div
                  key={mode}
                  className={`flex flex-col rounded border p-4 ${live ? "border-accent" : "border-line"}`}
                  aria-current={live ? "true" : undefined}
                >
                  <h3 className="mb-2 text-lg font-extrabold">{choice.heading}</h3>
                  <p className={`${ui.muted} mb-2`}>{choice.experience}</p>
                  <p className={`${ui.muted} mb-4`}>{choice.trade}</p>
                  <div className="mt-auto">
                    {live ? (
                      <p className="font-semibold">This is what your callers hear now.</p>
                    ) : (
                      <ActionButton action={setConsentAction.bind(null, mode)} label={choice.choose} pendingLabel={choice.choosing} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
