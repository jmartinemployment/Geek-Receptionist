"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { describePaymentFailure } from "@/lib/billing/status";

type Outcome =
  | { kind: "working" }
  | { kind: "done"; restored: boolean }
  | { kind: "failed"; message: string; signedOut: boolean };

/**
 * Where PayPal sends the owner after they approve paying an overage. PayPal adds the order as `token`; this page takes it out of the
 * address bar at once and hands it, with the charge, to this app's server, which asks GeekAPI to take and record the payment. It is
 * sent once; opening the page again finds the overage already paid.
 */
export function PaidClient() {
  const params = useSearchParams();
  const [outcome, setOutcome] = useState<Outcome>({ kind: "working" });
  const sent = useRef(false);

  const chargeId = params.get("charge");
  const orderId = params.get("token");

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    window.history.replaceState(null, "", window.location.pathname);

    if (!chargeId || !orderId) return;

    (async () => {
      try {
        const response = await fetch("/api/billing/complete", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ chargeId, orderId }),
        });
        const body = (await response.json().catch(() => null)) as { status?: unknown; error?: unknown; code?: unknown } | null;
        if (response.ok) {
          setOutcome({ kind: "done", restored: body?.status === "active" });
          return;
        }
        setOutcome({
          kind: "failed",
          message: describePaymentFailure(response.status, typeof body?.code === "string" ? body.code : null, typeof body?.error === "string" ? body.error : null),
          signedOut: response.status === 401,
        });
      } catch (err) {
        setOutcome({ kind: "failed", message: `Could not reach this app's server (${err instanceof Error ? err.message : String(err)}).`, signedOut: false });
      }
    })();
  }, [chargeId, orderId]);

  const shown: Outcome = !chargeId || !orderId ? { kind: "failed", message: "PayPal sent no payment to record.", signedOut: false } : outcome;

  if (shown.kind === "working") return <main className="center muted">Recording your payment…</main>;

  if (shown.kind === "done") {
    return (
      <main className="center">
        <h1>Thank you, your payment is recorded</h1>
        <p className="muted">
          {shown.restored ? "Your receptionist is active and answering calls." : "Your dashboard shows anything still to settle."}
        </p>
        <a className="button" href="/dashboard">
          Back to your dashboard
        </a>
      </main>
    );
  }

  return (
    <main className="center">
      <h1>The payment was not recorded</h1>
      <p className="muted" role="alert">
        {shown.message}
      </p>
      <a className="button" href={shown.signedOut ? "/login" : "/dashboard"}>
        {shown.signedOut ? "Sign in" : "Back to your dashboard"}
      </a>
    </main>
  );
}
