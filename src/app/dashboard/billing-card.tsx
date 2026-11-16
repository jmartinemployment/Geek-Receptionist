"use client";

import { useState } from "react";
import { day, dollars, type BillingState } from "@/lib/billing/status";

export function BillingCard({ state }: { state: BillingState }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pay(chargeId: string) {
    setBusy(chargeId);
    setError(null);
    try {
      const response = await fetch("/api/billing/pay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chargeId }),
      });
      const body = (await response.json().catch(() => null)) as { approvalUrl?: unknown; error?: unknown } | null;
      if (!response.ok || typeof body?.approvalUrl !== "string") {
        setError(typeof body?.error === "string" ? body.error : `The payment could not be started (status ${response.status}).`);
        setBusy(null);
        return;
      }
      window.location.assign(body.approvalUrl);
    } catch (err) {
      setError(`The payment could not be started: ${err instanceof Error ? err.message : String(err)}`);
      setBusy(null);
    }
  }

  return (
    <section className="card" aria-labelledby="billing-heading">
      <h2 id="billing-heading">Subscription</h2>

      {state.kind === "active" && (
        <>
          <p className="status ok">Active</p>
          <p className="muted">
            {state.tier.charAt(0) + state.tier.slice(1).toLowerCase()} plan. Your current month ends {day(state.renewsOn)}.
          </p>
        </>
      )}

      {state.kind === "suspended" && (
        <>
          <p className="status bad">Suspended</p>
          <p role="alert">
            {state.answeringStopped
              ? "Your receptionist has stopped answering calls. It answers again as soon as this is settled."
              : `Your receptionist keeps answering until ${day(state.answeringUntil)}, then stops until this is settled.`}
          </p>

          {state.subscriptionHeld && (
            <p className="muted">
              PayPal could not take your monthly payment. Update the payment method for this subscription in your PayPal account
              (Settings, then Automatic payments). Your receptionist is restored within the hour after PayPal takes the payment.
            </p>
          )}

          {state.unpaid.map((charge) => (
            <div className="row" key={charge.id}>
              <p>
                {dollars(charge.amountUsd)} for {charge.overageMinutes} minutes over your plan, {day(charge.periodStart)} to {day(charge.periodEnd)}
              </p>
              <button className="button" type="button" onClick={() => pay(charge.id)} disabled={busy !== null}>
                {busy === charge.id ? "Opening PayPal…" : "Pay now"}
              </button>
            </div>
          ))}
        </>
      )}

      {state.kind === "problem" && (
        <>
          <p className="status bad">Could not read your subscription</p>
          <p className="muted">
            {state.message}
            {state.code ? ` (${state.code})` : ""}
          </p>
        </>
      )}

      {error && (
        <p className="status bad" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
