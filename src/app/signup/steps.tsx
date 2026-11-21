import { ActionButton } from "@/components/action-button";
import { ui } from "@/lib/ui";
import { choosePlanAction, countryAction, forgetRobotCheckAction, savePaymentMethodAction } from "./actions";

export const PLANS = [
  { code: "STARTER", name: "Starter", price: 30, minutes: 90 },
  { code: "STANDARD", name: "Standard", price: 48, minutes: 250 },
  { code: "PRO", name: "Pro", price: 148, minutes: 1000 },
  { code: "PREMIUM", name: "Premium", price: 298, minutes: 2000 },
];

/** The country question: a yes goes on, a no says so in a dialog and forgets the robot check. */
export function CountryStep() {
  return (
    <div className="flex flex-nowrap justify-center gap-3">
      <ActionButton action={countryAction.bind(null, true)} label="Yes" pendingLabel="One moment…" />
      <ActionButton action={countryAction.bind(null, false)} label="No" pendingLabel="One moment…" quiet dialogTitle="Not available outside the United States" onDialogClose={forgetRobotCheckAction} />
    </div>
  );
}

/** The four plans, each ending in PayPal. */
export function PlanStep() {
  return (
    <>
      <p className={`${ui.muted} mb-4`}>
        Billed monthly through PayPal. Minutes over your plan are $0.50 each, charged at the end of the month to the PayPal account
        you save next.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <li key={plan.code} className="flex flex-col gap-2 rounded-md border border-line p-4">
            <p className="font-semibold">{plan.name}</p>
            <p>
              <span className="text-2xl font-semibold">${plan.price}</span> a month
            </p>
            <p className={ui.muted}>{plan.minutes.toLocaleString("en-US")} minutes included</p>
            <ActionButton action={choosePlanAction.bind(null, plan.code)} label={`Choose ${plan.name}`} pendingLabel="Opening PayPal…" />
          </li>
        ))}
      </ul>
    </>
  );
}

/** Saving the PayPal account for overage minutes; nothing is charged. */
export function PaymentMethodStep({ tier }: { tier: string | undefined }) {
  return (
    <>
      <p className={`${ui.muted} mb-4`}>
        Your {tier ? tier.charAt(0) + tier.slice(1).toLowerCase() : ""} subscription is approved. Now save your PayPal
        account for minutes over your plan. Nothing is charged now.
      </p>
      <ActionButton action={savePaymentMethodAction} label="Save PayPal for overage minutes" pendingLabel="Opening PayPal…" />
    </>
  );
}
