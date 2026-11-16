import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { day, describeBilling, dollars } from "@/lib/billing/status";
import { ui } from "@/lib/ui";
import { payOverageAction } from "./actions";
import { ActionButton } from "./action-button";

/** The Subscription card, read from GeekAPI on the server while the page streams. */
export async function BillingSection() {
  const billing = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/billing`, { method: "GET" });
  if (billing.status === 401) redirect("/login");
  const state = describeBilling(billing.status, billing.body);

  return (
    <section className={ui.card} aria-labelledby="billing-heading">
      <h2 id="billing-heading" className={ui.h2}>
        Subscription
      </h2>

      {state.kind === "active" && (
        <>
          <p className={ui.status.ok}>Active</p>
          <p className={ui.muted}>
            {state.tier.charAt(0) + state.tier.slice(1).toLowerCase()} plan. Your current month ends {day(state.renewsOn)}.
          </p>
        </>
      )}

      {state.kind === "suspended" && (
        <>
          <p className={ui.status.bad}>Suspended</p>
          <p className="mb-3" role="alert">
            {state.answeringStopped
              ? "Your receptionist has stopped answering calls. It answers again as soon as this is settled."
              : `Your receptionist keeps answering until ${day(state.answeringUntil)}, then stops until this is settled.`}
          </p>
          {state.subscriptionHeld && (
            <p className={`${ui.muted} mb-3`}>
              PayPal could not take your monthly payment. Update the payment method for this subscription in your PayPal account
              (Settings, then Automatic payments). Your receptionist is restored within the hour after PayPal takes the payment.
            </p>
          )}
          <ul className="flex flex-col gap-3">
            {state.unpaid.map((charge) => (
              <li key={charge.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                <p>
                  {dollars(charge.amountUsd)} for {charge.overageMinutes} minutes over your plan, {day(charge.periodStart)} to {day(charge.periodEnd)}
                </p>
                <ActionButton action={payOverageAction.bind(null, charge.id)} label="Pay now" pendingLabel="Opening PayPal…" />
              </li>
            ))}
          </ul>
        </>
      )}

      {state.kind === "problem" && (
        <>
          <p className={ui.status.bad}>Could not read your subscription</p>
          <p className={ui.muted}>
            {state.message}
            {state.code ? ` (${state.code})` : ""}
          </p>
        </>
      )}
    </section>
  );
}
