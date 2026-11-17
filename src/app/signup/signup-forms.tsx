"use client";

import { useActionState } from "react";
import { ui } from "@/lib/ui";
import { Captcha } from "@/components/captcha";
import type { BusinessActivity } from "@/services/onboarding";
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

/** The chart's sectors in its own order, each with its codes, for the list's groups. */
function bySector(activities: BusinessActivity[]): [string, BusinessActivity[]][] {
  const sectors = new Map<string, BusinessActivity[]>();
  for (const activity of activities) sectors.set(activity.sector, [...(sectors.get(activity.sector) ?? []), activity]);
  return [...sectors.entries()];
}

/** Step 1: the robot check on its own, before anything is asked. */
export function RobotForm({ captchaSiteKey }: { captchaSiteKey: string }) {
  const [state, action, pending] = useActionState(captchaAction, start());

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <Captcha siteKey={captchaSiteKey} answered={state} />
      <button className={`${ui.button} mt-1 self-start`} type="submit" disabled={pending}>
        {pending ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}

export function BusinessForm({ activities }: { activities: BusinessActivity[] }) {
  const [state, action, pending] = useActionState(businessAction, start());
  const value = (name: string) => state.fields[name] ?? "";

  return (
    <form action={action} className="flex flex-col gap-6">
      <Refusal error={state.error} />

      <fieldset className="flex min-w-0 flex-col gap-2">
        <label htmlFor="businessName" className={label}>Business name</label>
        <input id="businessName" name="businessName" required autoComplete="organization" defaultValue={value("businessName")} className={field} />
        <label htmlFor="businessActivityCode" className={label}>What the business does</label>
        <select id="businessActivityCode" name="businessActivityCode" required defaultValue={value("businessActivityCode")} className={field}>
          <option value="" disabled>
            Choose what the business does
          </option>
          {bySector(activities).map(([sector, codes]) => (
            <optgroup key={sector} label={sector}>
              {codes.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <legend className="mb-1 font-display text-lg font-bold">Where it is and how to reach you</legend>
        <label htmlFor="stateCode" className={label}>State</label>
        <input id="stateCode" name="stateCode" required maxLength={2} placeholder="FL" autoComplete="address-level1" defaultValue={value("stateCode")} className={`${field} w-24 uppercase`} />
        <label htmlFor="contactEmail" className={label}>Email</label>
        <input id="contactEmail" name="contactEmail" type="email" required autoComplete="email" aria-describedby="emailHint" defaultValue={value("contactEmail")} className={field} />
        <p id="emailHint" className={`${ui.muted} text-sm`}>You will sign in with this email.</p>
        <label htmlFor="contactPhone" className={label}>Business phone</label>
        <input id="contactPhone" name="contactPhone" type="tel" required autoComplete="tel-national" inputMode="tel" placeholder="(561) 555-0101" aria-describedby="phoneHint" defaultValue={value("contactPhone")} className={field} />
        <p id="phoneHint" className={`${ui.muted} text-sm`}>A US number, typed any way you like.</p>
      </fieldset>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="complianceAttested" required className="mt-1.5 size-4 accent-[#c83803]" />
        <span>
          This business is not a healthcare, veterinary, legal, accounting, tax, payroll, financial, insurance or education business,
          and calls to it may be answered and recorded by an AI receptionist that tells callers so.
        </span>
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

export function NumberForm() {
  const [state, action, pending] = useActionState(activateAction, start());

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <label htmlFor="areaCode" className={label}>Area code for your receptionist&rsquo;s number</label>
      <input id="areaCode" name="areaCode" required inputMode="numeric" pattern="[2-9][0-9]{2}" maxLength={3} placeholder="561" defaultValue={state.fields.areaCode ?? ""} className={`${field} w-28`} />
      <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
        {pending ? "Setting up your number…" : "Get my number"}
      </button>
      {pending ? <p className={ui.muted} role="status">This takes up to a minute. Keep this page open.</p> : null}
    </form>
  );
}

export function LoginForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(createLoginAction, start({ email }));

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <label htmlFor="displayName" className={label}>Your name</label>
      <input id="displayName" name="displayName" required autoComplete="name" defaultValue={state.fields.displayName ?? ""} className={field} />
      <label htmlFor="email" className={label}>Email to sign in with</label>
      <input id="email" name="email" type="email" required autoComplete="username" defaultValue={state.fields.email ?? email} className={field} />
      <label htmlFor="password" className={label}>Password</label>
      <input id="password" name="password" type="password" required autoComplete="new-password" className={field} />
      <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
        {pending ? "Creating your login…" : "Create login and open dashboard"}
      </button>
    </form>
  );
}
