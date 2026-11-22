"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { ui } from "@/lib/ui";
import { Captcha } from "@/components/captcha";
import { Dialog } from "@/components/dialog";
import { DAYS, TIMEZONES } from "@/lib/signup/hours";
import { EXCLUDED_GROUPS, EXCLUDED_INDUSTRIES } from "@/lib/signup/excluded";
import { PRIVACY_URL, TERMS_PARTS, TERMS_URL } from "@/lib/signup/declaration";
import {
  activateAction,
  connectBucketAction,
  connectGoogleAction,
  crewLayoutAction,
  proveConnectionAction,
  recordingAction,
  scheduleAction,
  termsAction,
  captchaAction,
  createLoginAction,
  eligibilityAction,
  companyAction,
  forgetRobotCheckAction,
  greetingAction,
  whoAction,
  hoursAction,
  knowledgeAction,
  messagesAction,
  questionsAction,
  type SignupFormState,
} from "./actions";

const field =
  "rounded border border-line bg-wash px-3 py-2 text-ink placeholder:text-muted focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-white";
const label = "font-semibold";

function Refusal({ error }: { error: string | null }) {
  return error ? (
    <p className={ui.status.bad} role="alert">
      {error}
    </p>
  ) : null;
}

const start = (fields: Record<string, string> = {}): SignupFormState => ({ error: null, fields });

/** The robot check form, for the white dialog: dark text and the light box. Ticking the box sends it; there is no second click. */
function RobotForm({ captchaSiteKey }: { captchaSiteKey: string }) {
  const [state, action, pending] = useActionState(captchaAction, start());
  const form = useRef<HTMLFormElement>(null);

  return (
    <form ref={form} action={action} className="flex flex-col gap-2">
      {state.error ? (
        <p className="font-semibold text-[#b3261e]" role="alert">
          {state.error}
        </p>
      ) : null}
      <p>Confirm you&rsquo;re not a robot to start.</p>
      <Captcha siteKey={captchaSiteKey} answered={state} theme="light" onSolved={() => form.current?.requestSubmit()} />
      {pending ? <p role="status">Checking…</p> : null}
    </form>
  );
}

/** The robot check as a dialog, opened by the Continue button. */
function RobotDialog({ captchaSiteKey, onClose }: { captchaSiteKey: string; onClose: () => void }) {
  return (
    <Dialog title="Robot check" onClose={onClose}>
      <RobotForm captchaSiteKey={captchaSiteKey} />
    </Dialog>
  );
}

/** The orange Continue button under the hero's summary. It opens the robot check; passing it takes the visitor on to the first question. */
export function RobotCheckButton({ captchaSiteKey }: { captchaSiteKey: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={ui.button} onClick={() => setOpen(true)}>
        Continue
      </button>
      {open ? <RobotDialog captchaSiteKey={captchaSiteKey} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

/**
 * The eight excluded-industry questions on one screen, under three headings. Each is still its own yes or no with its own stored
 * words (Jeff, 2026-11-18: "more enforceable to ask each separately"), so nothing arrives selected and none is taken as a no for being
 * left blank: the visitor answers all eight or the form does not send. The words above them say what the screen is for and nothing
 * about how most businesses answer, because telling someone that most people say no, in front of a regulated screening, nudges the
 * answer. A yes to any of them ends the signup in a dialog naming the industry, and closing it forgets the robot check.
 */
export function EligibilityForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(eligibilityAction, start());
  const [closed, setClosed] = useState<SignupFormState | null>(null);
  const [, afterClose] = useTransition();
  const close = () => {
    setClosed(state);
    afterClose(forgetRobotCheckAction);
  };

  return (
    <form id={`signup-form${idSuffix}`} data-pending={pending} action={action} className="flex flex-col gap-6">
      {state.refused ? null : <Refusal error={state.error} />}

      <div className="flex flex-col gap-6 md:block md:columns-2 md:gap-x-10 md:[&>fieldset]:mb-6">
        <fieldset className="flex min-w-0 break-inside-avoid flex-col gap-1">
          <legend className="mb-1 font-display text-lg font-bold">Location</legend>
          <p className={label}>Is the business located in the United States?</p>
          <div className="flex gap-6">
            {(["yes", "no"] as const).map((answer) => (
              <label key={answer} htmlFor={`country-${answer}${idSuffix}`} className="flex items-center gap-2">
                <input
                  id={`country-${answer}${idSuffix}`}
                  type="radio"
                  name="country"
                  value={answer}
                  required
                  defaultChecked={state.fields.country === answer}
                  className="size-4 accent-[#c83803]"
                />
                {answer === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>

        {EXCLUDED_GROUPS.map((group) => (
          <fieldset key={group.heading} className="flex min-w-0 break-inside-avoid flex-col gap-4">
            <legend className="mb-1 font-display text-lg font-bold">{group.heading}</legend>
            {group.codes.map((code) => (
              <fieldset key={code} className="flex min-w-0 flex-col gap-1">
                <legend className={label}>{EXCLUDED_INDUSTRIES[code].question}</legend>
                <div className="flex gap-6">
                  {(["yes", "no"] as const).map((answer) => (
                    <label key={answer} htmlFor={`${code}-${answer}${idSuffix}`} className="flex items-center gap-2">
                      <input
                        id={`${code}-${answer}${idSuffix}`}
                        type="radio"
                        name={code}
                        value={answer}
                        required
                        defaultChecked={state.fields[code] === answer}
                        className="size-4 accent-[#c83803]"
                      />
                      {answer === "yes" ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </fieldset>
        ))}
      </div>

      <button className={`${ui.button} lg:hidden`} type="submit" disabled={pending}>
        {pending ? "One moment…" : "Continue"}
      </button>

      {state.refused && closed !== state ? (
        <Dialog title={state.refused === "country" ? "Not available outside the United States" : EXCLUDED_INDUSTRIES[state.refused].dialogTitle} onClose={close}>
          <p className="mb-4" role="alert">
            {state.error}
          </p>
          <button type="button" className={ui.button} onClick={close}>
            Close
          </button>
        </Dialog>
      ) : null}
    </form>
  );
}

/** A labelled text box for the first two screens, with the dark theme's field style. */
function Box({ name, label: labelText, id, state, extra = {} }: {
  name: string;
  label: string;
  id: (name: string) => string;
  state: SignupFormState;
  extra?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <label htmlFor={id(name)} className={label}>{labelText}</label>
      <input id={id(name)} name={name} maxLength={300} defaultValue={state.fields[name] ?? ""} className={field} {...extra} />
    </div>
  );
}

/** A two-letter state box and a zip box, side by side with a city beside them, as an address is written. */
function CityStateZip({ city, state, zip, zipLabel, id, form }: {
  city: string;
  state: string;
  zip: string;
  zipLabel: string;
  id: (name: string) => string;
  form: SignupFormState;
}) {
  return (
    <div className="flex gap-3">
      <Box name={city} label="City" id={id} state={form} extra={{ required: true, autoComplete: "address-level2" }} />
      <div className="flex w-20 flex-col gap-1">
        <label htmlFor={id(state)} className={label}>State</label>
        <input id={id(state)} name={state} required maxLength={2} placeholder="FL" autoComplete="address-level1" defaultValue={form.fields[state] ?? ""} className={`${field} uppercase`} />
      </div>
      <div className="flex w-28 flex-col gap-1">
        <label htmlFor={id(zip)} className={label}>{zipLabel}</label>
        <input id={id(zip)} name={zip} required maxLength={10} inputMode="numeric" autoComplete="postal-code" defaultValue={form.fields[zip] ?? ""} className={field} />
      </div>
    </div>
  );
}

/**
 * The first screen, in the right pane beside "Hi, I am Lily / What's Your Name": the person alone (Jeff, 2026-11-21: First Name, Middle
 * Initial, Last Name, Address, City, State, Zip Code, Telephone, Email). Nothing is verified here. The declaration shows these again, so
 * nobody types them twice.
 */
export function WhoForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(whoAction, start());
  const id = (name: string) => `${name}${idSuffix}`;

  return (
    <form id={`signup-form${idSuffix}`} data-pending={pending} action={action} className="flex flex-col gap-3 text-left">
      <Refusal error={state.error} />
      <div className="flex gap-3">
        <Box name="firstName" label="First name" id={id} state={state} extra={{ required: true, autoComplete: "given-name" }} />
        <div className="flex w-20 flex-col gap-1">
          <label htmlFor={id("middleInitial")} className={label}>M.I.</label>
          <input id={id("middleInitial")} name="middleInitial" maxLength={2} autoComplete="additional-name" defaultValue={state.fields.middleInitial ?? ""} className={field} />
        </div>
        <Box name="lastName" label="Last name" id={id} state={state} extra={{ required: true, autoComplete: "family-name" }} />
      </div>
      <Box name="address" label="Address" id={id} state={state} extra={{ required: true, autoComplete: "street-address" }} />
      <CityStateZip city="city" state="state" zip="zip" zipLabel="Zip code" id={id} form={state} />
      <Box name="phone" label="Telephone" id={id} state={state} extra={{ required: true, type: "tel", inputMode: "tel", autoComplete: "tel-national", placeholder: "(561) 555-0101" }} />
      <Box name="email" label="Email" id={id} state={state} extra={{ required: true, type: "email", autoComplete: "email" }} />
      <button className={`${ui.button} mt-2 w-fit lg:hidden`} type="submit" disabled={pending}>
        {pending ? "One moment…" : "Continue"}
      </button>
    </form>
  );
}

/**
 * The second screen, in the right pane: the business alone, kept apart from the person (Jeff, 2026-11-21: "split off business from
 * personal"). Business Name, Business Address, City, State, Zip, Business Telephone, Business Email, and the website, which is optional.
 */
export function CompanyForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(companyAction, start());
  const id = (name: string) => `${name}${idSuffix}`;

  return (
    <form id={`signup-form${idSuffix}`} data-pending={pending} action={action} className="flex flex-col gap-3 text-left">
      <Refusal error={state.error} />
      <Box name="businessName" label="Business name" id={id} state={state} extra={{ required: true, autoComplete: "organization" }} />
      <Box name="businessDescription" label="What it does" id={id} state={state} extra={{ required: true, maxLength: 120, placeholder: "Plumbing and heating" }} />
      <Box name="businessAddress" label="Business address" id={id} state={state} extra={{ required: true }} />
      <CityStateZip city="businessCity" state="businessState" zip="businessZip" zipLabel="Zip" id={id} form={state} />
      <Box name="businessPhone" label="Business telephone" id={id} state={state} extra={{ required: true, type: "tel", inputMode: "tel", placeholder: "(561) 555-0101" }} />
      <Box name="businessEmail" label="Business email" id={id} state={state} extra={{ required: true, type: "email" }} />
      <Box name="businessWebsite" label="Business website (leave empty if there is none)" id={id} state={state} extra={{ type: "url", placeholder: "https://" }} />
      <button className={`${ui.button} mt-2 w-fit lg:hidden`} type="submit" disabled={pending}>
        {pending ? "One moment…" : "Continue"}
      </button>
    </form>
  );
}

/**
 * The acceptance screen, as any SaaS signup has it (Jeff, 2026-11-22: "make the screen acceptable"): one paragraph with the two documents
 * linked, and one button, in the hero's left pane, that says it is the acceptance. Not agreeing is not continuing; there is no second
 * answer to give. What is accepted is stored word for word (`TERMS_STATEMENT`), so the paragraph below is that statement with its
 * document names made into links, and the two are changed together.
 */
export function TermsForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(termsAction, start());

  return (
    <form id={`signup-form${idSuffix}`} data-pending={pending} action={action} className="flex flex-col gap-4 text-left">
      <Refusal error={state.error} />
      <p className="text-sm leading-snug">
        {TERMS_PARTS.before}
        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-[#c83803] underline-offset-4 hover:text-white">
          Terms of Service
        </a>
        {TERMS_PARTS.between}
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-[#c83803] underline-offset-4 hover:text-white">
          Privacy Policy
        </a>
        {TERMS_PARTS.after}
      </p>
      <button className={`${ui.button} w-fit lg:hidden`} type="submit" disabled={pending}>
        {pending ? "One moment…" : "Agree and continue"}
      </button>
    </form>
  );
}

const textarea = `${field} min-h-24`;
const hint = `${ui.muted} text-sm`;

/** The submit button every receptionist step ends with, so none of them is louder or quieter than the next. */
function StepButton({ pending, label = "Save and continue" }: { pending: boolean; label?: string }) {
  return (
    <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

/**
 * One closed question, drawn as the same block every time: the question, then its choices, each with the one fact about itself the
 * owner is choosing on. Nothing here is marked as recommended. Jeff, 2026-11-20: "I am not comfortable making decisions on behalf of
 * others." A preset is the choice that arrives already selected, and selecting another is one click.
 */
export function Choice({
  name,
  legend,
  help,
  helpClass,
  selected,
  onChange,
  options,
}: {
  name: string;
  legend: string;
  help?: string;
  helpClass?: string;
  selected: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string; detail?: string }[];
}) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-2">
      <legend className={`${label} mb-1`}>{legend}</legend>
      {help ? <p className={helpClass ?? hint}>{help}</p> : null}
      {options.map((option) => (
        <label key={option.value} className="flex items-start gap-3">
          <input type="radio" name={name} value={option.value} defaultChecked={selected === option.value} onChange={() => onChange?.(option.value)} className="mt-1.5 size-4 accent-[#c83803]" />
          <span>
            {option.label}
            {option.detail ? <span className={`${hint} block`}>{option.detail}</span> : null}
          </span>
        </label>
      ))}
    </fieldset>
  );
}

/**
 * Your greeting: the sentence your receptionist opens with. The keypad before it speaks is on every call and is not asked, and whether
 * the call is recorded is the Recording screen's question.
 *
 * The greeting it already has is the one GeekAPI wrote from this business's name (`ReceptionistDefaults.GreetingTemplate`; the same
 * words live there, change both together). Leaving the box empty keeps it, and no greeting is sent at all.
 */
export function GreetingForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(greetingAction, start());

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`greeting${idSuffix}`} className={label}>
          How should your receptionist answer the phone?
        </label>
        <p id={`greetingHint${idSuffix}`} className={hint}>
          Leave this empty to keep the greeting it already has: &ldquo;Thank you for calling [your business]. I&rsquo;m the AI
          receptionist. How can I help you today?&rdquo;
        </p>
        <textarea
          id={`greeting${idSuffix}`}
          name="greeting"
          rows={3}
          maxLength={600}
          aria-describedby={`greetingHint${idSuffix}`}
          defaultValue={state.fields.greeting ?? ""}
          className={textarea}
        />
      </fieldset>

      <StepButton pending={pending} />
    </form>
  );
}

/**
 * When you're open. The hours are the only hours the receptionist may give a caller; a business that gives none has its receptionist
 * say it does not have them and offer to take a message, which is why "not yet" is a real answer here and not a skipped step.
 */
export function HoursForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(hoursAction, start({ hoursShape: "set", timezone: "America/New_York" }));

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <Choice
        name="hoursShape"
        legend="When are you open?"
        selected={state.fields.hoursShape ?? "set"}
        options={[
          { value: "set", label: "These hours", detail: "Fill in the week below." },
          { value: "always", label: "Open at all times" },
          {
            value: "none",
            label: "I would rather not give hours yet",
            detail: "Your receptionist will say it does not have your hours and offer to take a message. It will never guess them.",
          },
        ]}
      />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`timezone${idSuffix}`} className={label}>
          Which time zone are your hours in?
        </label>
        <select id={`timezone${idSuffix}`} name="timezone" defaultValue={state.fields.timezone ?? "America/New_York"} className={`${field} w-full sm:w-64`}>
          {TIMEZONES.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-3">
        <legend className={`${label} mb-1`}>Your week</legend>
        <p className={hint}>A closing time earlier than the opening time is a day that runs through the night.</p>
        {DAYS.map((day) => (
          <div key={day} className="flex flex-wrap items-center gap-2">
            <span className="w-24 capitalize">{day}</span>
            <label className="flex items-center gap-2">
              <input type="checkbox" name={`closed-${day}`} className="size-4 accent-[#c83803]" />
              <span className={hint}>Closed</span>
            </label>
            <label htmlFor={`open-${day}${idSuffix}`} className="sr-only">
              {day} opening time
            </label>
            <input id={`open-${day}${idSuffix}`} name={`open-${day}`} type="time" defaultValue="09:00" className={`${field} w-32`} />
            <span className={hint}>to</span>
            <label htmlFor={`close-${day}${idSuffix}`} className="sr-only">
              {day} closing time
            </label>
            <input id={`close-${day}${idSuffix}`} name={`close-${day}`} type="time" defaultValue="17:00" className={`${field} w-32`} />
          </div>
        ))}
      </fieldset>

      <StepButton pending={pending} />
    </form>
  );
}

/**
 * What it should ask. Both answers may be empty, and an empty answer is sent as the answer it is: no questions beyond what the caller
 * came to say, and no word that marks a call as an emergency.
 */
export function QuestionsForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(questionsAction, start());

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`questions${idSuffix}`} className={label}>
          What should your receptionist ask every caller?
        </label>
        <p id={`questionsHint${idSuffix}`} className={hint}>
          One question per line. Leave it empty to have it ask nothing beyond what the caller came to say.
        </p>
        <textarea
          id={`questions${idSuffix}`}
          name="questions"
          rows={5}
          maxLength={2000}
          placeholder={"What is the address?\nIs anyone there now?"}
          aria-describedby={`questionsHint${idSuffix}`}
          defaultValue={state.fields.questions ?? ""}
          className={textarea}
        />
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`keywords${idSuffix}`} className={label}>
          What words mean a call cannot wait?
        </label>
        <p id={`keywordsHint${idSuffix}`} className={hint}>
          Separated by commas. Leave it empty if no word should mark a call as an emergency.
        </p>
        <input
          id={`keywords${idSuffix}`}
          name="keywords"
          maxLength={400}
          placeholder="flooding, no heat, gas smell"
          aria-describedby={`keywordsHint${idSuffix}`}
          defaultValue={state.fields.keywords ?? ""}
          className={field}
        />
      </fieldset>

      <StepButton pending={pending} />
    </form>
  );
}

/**
 * What it should know. Until a business answers this, its receptionist runs on the script Geek @ Your Spot LLC wrote for its own
 * callers — free consultations, three South Florida counties, its own price answer — with this business's name in it. These answers
 * replace it: GeekAPI assembles the prompt from them, and an answer left empty is left out of the prompt rather than filled in.
 */
export function KnowledgeForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(knowledgeAction, start());
  const value = (name: string) => state.fields[name] ?? "";

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <p className={ui.muted}>
        Your receptionist may only tell a caller what you tell it here. Anything you leave out, it says it does not know and offers to
        take a message — it never guesses.
      </p>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`receptionistName${idSuffix}`} className={label}>
          What should your receptionist call itself?
        </label>
        <p id={`nameHint${idSuffix}`} className={hint}>
          Leave it empty and it will say it is your AI receptionist.
        </p>
        <input
          id={`receptionistName${idSuffix}`}
          name="receptionistName"
          maxLength={60}
          aria-describedby={`nameHint${idSuffix}`}
          defaultValue={value("receptionistName")}
          className={field}
        />
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`whatTheBusinessDoes${idSuffix}`} className={label}>
          What does your business do?
        </label>
        <textarea
          id={`whatTheBusinessDoes${idSuffix}`}
          name="whatTheBusinessDoes"
          required
          rows={4}
          maxLength={2000}
          placeholder="What you sell or do, in the words you would use on the phone."
          defaultValue={value("whatTheBusinessDoes")}
          className={textarea}
        />

        <label htmlFor={`whoItServes${idSuffix}`} className={label}>
          Who do you serve?
        </label>
        <textarea
          id={`whoItServes${idSuffix}`}
          name="whoItServes"
          rows={3}
          maxLength={2000}
          placeholder="The customers you take, and the area you cover."
          defaultValue={value("whoItServes")}
          className={textarea}
        />

        <label htmlFor={`howItPrices${idSuffix}`} className={label}>
          What do you charge?
        </label>
        <textarea
          id={`howItPrices${idSuffix}`}
          name="howItPrices"
          rows={3}
          maxLength={2000}
          placeholder="Prices a caller may be told, or that someone will quote the job."
          defaultValue={value("howItPrices")}
          className={textarea}
        />

        <label htmlFor={`whatToDoWithACaller${idSuffix}`} className={label}>
          What should it do with a caller?
        </label>
        <textarea
          id={`whatToDoWithACaller${idSuffix}`}
          name="whatToDoWithACaller"
          rows={3}
          maxLength={2000}
          placeholder="Take a message, book a visit, send them to your website — whatever the call is for."
          defaultValue={value("whatToDoWithACaller")}
          className={textarea}
        />
      </fieldset>

      <StepButton pending={pending} />
    </form>
  );
}

/**
 * After the call. Nothing of a call is kept: no recording, no transcript, no copy on our side. So whatever reaches you here is the only
 * record of it, and a call you ask for nothing about leaves nothing behind.
 */
export function MessagesForm({ email, idSuffix }: { email: string; idSuffix: string }) {
  const [state, action, pending] = useActionState(messagesAction, start({ wantsEmail: "yes", destinationEmail: email }));

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <p className={ui.muted}>
        Your receptionist keeps no recording and no transcript of a call. An email sent when the call ends is the only record there is.
      </p>

      <Choice
        name="wantsEmail"
        legend="How do you want to hear about a caller?"
        selected={state.fields.wantsEmail ?? "yes"}
        options={[
          { value: "yes", label: "Email me when a call ends" },
          { value: "no", label: "Send me nothing", detail: "Nothing is kept and nothing is sent, so a finished call leaves no record at all." },
        ]}
      />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`destinationEmail${idSuffix}`} className={label}>
          Where should it go?
        </label>
        <input
          id={`destinationEmail${idSuffix}`}
          name="destinationEmail"
          type="email"
          autoComplete="email"
          defaultValue={state.fields.destinationEmail ?? email}
          className={field}
        />

        <label className="mt-2 flex items-start gap-3">
          <input type="checkbox" name="includeTranscript" className="mt-1.5 size-4 accent-[#c83803]" />
          <span>
            Include what was said
            <span className={`${hint} block`}>The email carries the conversation. Nothing is stored because of this; the email is still the only copy.</span>
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input type="checkbox" name="notifyOnAbandonedCalls" className="mt-1.5 size-4 accent-[#c83803]" />
          <span>
            Tell me about calls where nobody spoke
            <span className={`${hint} block`}>A call that connected and ended without the caller saying anything.</span>
          </span>
        </label>
      </fieldset>

      <StepButton pending={pending} />
    </form>
  );
}

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/** A button that runs its own action from inside the step's form, with the pending word shown while it runs. */
function ActionButton({ action, pending, children, busy }: { action: (formData: FormData) => void; pending: boolean; children: React.ReactNode; busy: string }) {
  return (
    <button type="submit" formAction={action} disabled={pending} className={`${ui.button} self-start`}>
      {pending ? busy : children}
    </button>
  );
}

/** What a connection that was shown to work says, with the button to show it again. */
function Proof({ text, provider, action, pending }: { text: string; provider: string; action: (formData: FormData) => void; pending: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name="provider" value={provider} />
      <p className="text-white" role="status">{text}</p>
      <ActionButton action={action} pending={pending} busy="Testing…">Test it again</ActionButton>
    </div>
  );
}

/**
 * Recording. Do you want to record: if yes, is there a Google Drive to record to: if yes, connect it; if no, is there an Amazon S3
 * drive: if yes, its details, then connect. A connection is shown to work (a small file is written to it) before the screen moves on.
 * A no to recording asks nothing more.
 */
export function RecordingConnectionForm({ proved }: { proved: readonly string[] }) {
  const [state, action, pending] = useActionState(recordingAction, start());
  const [googleState, connectGoogle, connecting] = useActionState(connectGoogleAction, start());
  const [bucketState, connectBucket, saving] = useActionState(connectBucketAction, start());
  const [proofState, prove, proving] = useActionState(proveConnectionAction, start());

  const driveProved = proved.includes("google_drive");
  const s3Proved = proved.includes("aws_s3");
  const [record, setRecord] = useState(driveProved || s3Proved ? "yes" : "");
  const [drive, setDrive] = useState(driveProved ? "yes" : s3Proved ? "no" : "");
  const [s3, setS3] = useState(s3Proved ? "yes" : "");

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error ?? googleState.error ?? bucketState.error ?? proofState.error} />
      <Choice
        name="answer"
        legend="Do you want to record conversations?"
        help="Note: Caller must consent at the beginning of call."
        helpClass="text-sm text-white"
        selected={record}
        onChange={setRecord}
        options={YES_NO}
      />

      {record === "yes" ? (
        <Choice name="drive" legend="Do you have a Google Drive to record them to?" selected={drive} onChange={setDrive} options={YES_NO} />
      ) : null}
      {record === "yes" && drive === "yes" ? (
        driveProved ? (
          <Proof text="Connected. A test file was written to your Google Drive." provider="google_drive" action={prove} pending={proving} />
        ) : (
          <>
            <input type="hidden" name="provider" value="google_drive" />
            <ActionButton action={connectGoogle} pending={connecting} busy="Opening Google…">Connect Google Drive</ActionButton>
          </>
        )
      ) : null}

      {record === "yes" && drive === "no" ? (
        <Choice name="s3" legend="Do you have an Amazon S3 drive to record them to?" selected={s3} onChange={setS3} options={YES_NO} />
      ) : null}
      {record === "yes" && drive === "no" && s3 === "yes" ? (
        s3Proved ? (
          <Proof text="Connected. A test file was written to your Amazon S3 bucket." provider="aws_s3" action={prove} pending={proving} />
        ) : (
          <>
            {[
              ["bucket", "Bucket"],
              ["region", "Region"],
              ["accessKeyId", "Access key"],
              ["secretAccessKey", "Secret"],
            ].map(([name, text]) => (
              <label key={name} className="flex flex-col gap-1">
                <span className={label}>{text}</span>
                <input name={name} type={name === "secretAccessKey" ? "password" : "text"} autoComplete="off" defaultValue={name === "secretAccessKey" ? "" : bucketState.fields[name] ?? ""} className={field} />
              </label>
            ))}
            <ActionButton action={connectBucket} pending={saving} busy="Connecting…">Connect Amazon S3</ActionButton>
          </>
        )
      ) : null}

      <StepButton pending={pending} label="Continue" />
    </form>
  );
}

/** Scheduling. A yes needs a calendar that was shown to work: Google Calendar is asked for its calendars before the screen moves on. */
export function ScheduleConnectionForm({ proved }: { proved: readonly string[] }) {
  const [state, action, pending] = useActionState(scheduleAction, start());
  const [googleState, connectGoogle, connecting] = useActionState(connectGoogleAction, start());
  const [proofState, prove, proving] = useActionState(proveConnectionAction, start());

  const calendarProved = proved.includes("google_calendar");
  const [answer, setAnswer] = useState(calendarProved ? "yes" : "");

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error ?? googleState.error ?? proofState.error} />
      <Choice name="answer" legend="Do you want to schedule appointments?" selected={answer} onChange={setAnswer} options={YES_NO} />
      {answer === "yes" ? (
        calendarProved ? (
          <Proof text="Connected. Your calendar answered." provider="google_calendar" action={prove} pending={proving} />
        ) : (
          <>
            <input type="hidden" name="provider" value="google_calendar" />
            <ActionButton action={connectGoogle} pending={connecting} busy="Opening Google…">Connect your calendar</ActionButton>
          </>
        )
      ) : null}
      <StepButton pending={pending} label="Continue" />
    </form>
  );
}

/** Crew location tools. Laid out for review: the question is asked and the screen moves on, nothing is saved or connected. */
export function CrewConnectionForm() {
  const [state, action, pending] = useActionState(crewLayoutAction, start());
  const [answer, setAnswer] = useState("");

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />
      <Choice name="answer" legend="Do you have crew location tools?" selected="" onChange={setAnswer} options={YES_NO} />
      {answer === "yes" ? (
        <button type="button" disabled className={`${ui.button} self-start`}>
          Connect
        </button>
      ) : null}
      <StepButton pending={pending} label="Continue" />
    </form>
  );
}

export function NumberForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(activateAction, start());

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <label htmlFor={`areaCode${idSuffix}`} className={label}>Area code for your receptionist&rsquo;s number</label>
      <input id={`areaCode${idSuffix}`} name="areaCode" required inputMode="numeric" pattern="[2-9][0-9]{2}" maxLength={3} placeholder="561" defaultValue={state.fields.areaCode ?? ""} className={`${field} w-28`} />
      <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
        {pending ? "Setting up your number…" : "Get my number"}
      </button>
      {pending ? <p className={ui.muted} role="status">This takes up to a minute. Keep this page open.</p> : null}
    </form>
  );
}

export function LoginForm({ email, idSuffix }: { email: string; idSuffix: string }) {
  const [state, action, pending] = useActionState(createLoginAction, start({ email }));

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <label htmlFor={`displayName${idSuffix}`} className={label}>Your name</label>
      <input id={`displayName${idSuffix}`} name="displayName" required autoComplete="name" defaultValue={state.fields.displayName ?? ""} className={field} />
      <label htmlFor={`email${idSuffix}`} className={label}>Email to sign in with</label>
      <input id={`email${idSuffix}`} name="email" type="email" required autoComplete="username" defaultValue={state.fields.email ?? email} className={field} />
      <label htmlFor={`password${idSuffix}`} className={label}>Password</label>
      <input id={`password${idSuffix}`} name="password" type="password" required autoComplete="new-password" className={field} />
      <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
        {pending ? "Creating your login…" : "Create login and open dashboard"}
      </button>
    </form>
  );
}
