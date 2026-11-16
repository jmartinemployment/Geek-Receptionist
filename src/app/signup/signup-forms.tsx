"use client";

import { useActionState } from "react";
import { ui } from "@/lib/ui";
import { activateAction, businessAction, createLoginAction, type SignupFormState } from "./actions";

const field =
  "rounded-md border border-line bg-paper px-3 py-2 text-ink focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent";
const label = "font-semibold";

function Refusal({ error }: { error: string | null }) {
  return error ? (
    <p className={ui.status.bad} role="alert">
      {error}
    </p>
  ) : null;
}

const start = (fields: Record<string, string> = {}): SignupFormState => ({ error: null, fields });

export function BusinessForm() {
  const [state, action, pending] = useActionState(businessAction, start());
  const value = (name: string) => state.fields[name] ?? "";

  return (
    <form action={action} className="flex flex-col gap-2">
      <Refusal error={state.error} />
      <label htmlFor="businessName" className={label}>Business name</label>
      <input id="businessName" name="businessName" required autoComplete="organization" defaultValue={value("businessName")} className={field} />
      <label htmlFor="industryVertical" className={label}>What the business does</label>
      <input id="industryVertical" name="industryVertical" required placeholder="Plumbing, landscaping, HVAC…" defaultValue={value("industryVertical")} className={field} />
      <div className="grid grid-cols-[6rem_1fr] gap-2">
        <label htmlFor="stateCode" className={label}>State</label>
        <label htmlFor="county" className={label}>County</label>
        <input id="stateCode" name="stateCode" required maxLength={2} placeholder="FL" autoComplete="address-level1" defaultValue={value("stateCode")} className={`${field} uppercase`} />
        <input id="county" name="county" placeholder="Palm Beach" defaultValue={value("county")} className={field} />
      </div>
      <label htmlFor="contactEmail" className={label}>Email</label>
      <input id="contactEmail" name="contactEmail" type="email" required autoComplete="email" defaultValue={value("contactEmail")} className={field} />
      <label htmlFor="contactPhone" className={label}>Business phone</label>
      <input id="contactPhone" name="contactPhone" type="tel" required autoComplete="tel" placeholder="+15615550101" defaultValue={value("contactPhone")} className={field} />
      <p className={`${ui.muted} text-sm`}>With the country code, as +1 and ten digits.</p>
      <label className="mt-2 flex items-start gap-2">
        <input type="checkbox" name="complianceAttested" required className="mt-1.5" />
        <span>
          The business is in the United States and is not a healthcare provider, and calls to it may be answered and recorded by an AI
          receptionist that tells callers so.
        </span>
      </label>
      <button className={`${ui.button} mt-3`} type="submit" disabled={pending}>
        {pending ? "Checking…" : "Continue"}
      </button>
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
