"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { describeCompleteFailure } from "@/lib/calendar/status";

type Outcome = { kind: "working" } | { kind: "done" } | { kind: "failed"; message: string; signedOut: boolean };

/**
 * Where Google sends the owner's browser after the approval. It reads the one-time code, the sealed state and any error from the
 * address, takes them out of the address bar and history at once, and hands them to this app's server, which passes them to GeekAPI
 * with the owner's own token. The code works once, so it is sent exactly once.
 */
export function CalendarCallbackClient() {
  const params = useSearchParams();
  const [outcome, setOutcome] = useState<Outcome>({ kind: "working" });
  const sent = useRef(false);

  const code = params.get("code");
  const state = params.get("state");
  const googleError = params.get("error");

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    window.history.replaceState(null, "", window.location.pathname);

    if (!code && !googleError) return;

    (async () => {
      try {
        const response = await fetch("/api/calendar/complete", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ code, state, error: googleError }),
        });
        const body = (await response.json().catch(() => null)) as { error?: unknown; code?: unknown } | null;
        if (response.ok) {
          setOutcome({ kind: "done" });
          return;
        }
        const failureCode = typeof body?.code === "string" ? body.code : null;
        const message = typeof body?.error === "string" ? body.error : null;
        const signedOut = response.status === 401;
        setOutcome({
          kind: "failed",
          message: signedOut ? "Your sign-in ended before the connection finished. Sign in and connect again." : describeCompleteFailure(failureCode, message),
          signedOut,
        });
      } catch (err) {
        setOutcome({ kind: "failed", message: `Could not reach this app's server (${err instanceof Error ? err.message : String(err)}).`, signedOut: false });
      }
    })();
  }, [code, state, googleError]);

  const shown: Outcome =
    !code && !googleError ? { kind: "failed", message: "Google sent no approval. Start the connection again.", signedOut: false } : outcome;

  if (shown.kind === "working") return <main className="center muted">Finishing the connection…</main>;

  if (shown.kind === "done") {
    return (
      <main className="center">
        <h1>Your calendar is connected</h1>
        <p className="muted">The receptionist can now see when you are free and book appointments.</p>
        <a className="button" href="/dashboard">
          Back to your dashboard
        </a>
      </main>
    );
  }

  return (
    <main className="center">
      <h1>The calendar was not connected</h1>
      <p className="muted" role="alert">
        {shown.message}
      </p>
      <a className="button" href={shown.signedOut ? "/api/auth/start" : "/dashboard"}>
        {shown.signedOut ? "Sign in" : "Back to your dashboard"}
      </a>
    </main>
  );
}
