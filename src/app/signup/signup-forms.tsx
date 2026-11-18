"use client";

import { useActionState, useRef, useState } from "react";
import { ui } from "@/lib/ui";
import { Captcha } from "@/components/captcha";
import { Dialog } from "@/components/dialog";
import { activateAction, businessAction, captchaAction, createLoginAction, type SignupFormState } from "./actions";

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

export function BusinessForm({ idSuffix }: { idSuffix: string }) {
  const [state, action, pending] = useActionState(businessAction, start());
  const value = (name: string) => state.fields[name] ?? "";

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`businessName${idSuffix}`} className={label}>Business name</label>
        <input id={`businessName${idSuffix}`} name="businessName" required autoComplete="organization" defaultValue={value("businessName")} className={field} />
        <label htmlFor={`businessDescription${idSuffix}`} className={label}>What the business does</label>
        <input id={`businessDescription${idSuffix}`} name="businessDescription" required maxLength={120} placeholder="Plumbing and heating" defaultValue={value("businessDescription")} className={field} />
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <legend className="mb-1 font-display text-lg font-bold">Where it is and how to reach you</legend>
        <label htmlFor={`stateCode${idSuffix}`} className={label}>State</label>
        <input id={`stateCode${idSuffix}`} name="stateCode" required maxLength={2} placeholder="FL" autoComplete="address-level1" defaultValue={value("stateCode")} className={`${field} w-24 uppercase`} />
        <label htmlFor={`contactEmail${idSuffix}`} className={label}>Email</label>
        <input id={`contactEmail${idSuffix}`} name="contactEmail" type="email" required autoComplete="email" aria-describedby={`emailHint${idSuffix}`} defaultValue={value("contactEmail")} className={field} />
        <p id={`emailHint${idSuffix}`} className={`${ui.muted} text-sm`}>You will sign in with this email.</p>
        <label htmlFor={`contactPhone${idSuffix}`} className={label}>Business phone</label>
        <input id={`contactPhone${idSuffix}`} name="contactPhone" type="tel" required autoComplete="tel-national" inputMode="tel" placeholder="(561) 555-0101" aria-describedby={`phoneHint${idSuffix}`} defaultValue={value("contactPhone")} className={field} />
        <p id={`phoneHint${idSuffix}`} className={`${ui.muted} text-sm`}>A US number, typed any way you like.</p>
      </fieldset>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="complianceAttested" required className="mt-1.5 size-4 accent-[#c83803]" />
        <span>Calls to this business may be answered and recorded by an AI receptionist that tells callers so.</span>
      </label>
      <div className="flex flex-col gap-2">
        <button className={ui.button} type="submit" disabled={pending}>
          {pending ? "Checking…" : "Continue"}
        </button>
        <p className={`${ui.muted} text-sm`}>Nothing is charged in this step. You choose a plan next.</p>
      </div>
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
