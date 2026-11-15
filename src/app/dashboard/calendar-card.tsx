"use client";

import { useState } from "react";
import type { CalendarState } from "@/lib/calendar/status";

export function CalendarCard({ state }: { state: CalendarState }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/calendar/authorize", { cache: "no-store" });
      const body = (await response.json()) as { authorizationUrl?: unknown; error?: unknown };
      if (!response.ok || typeof body.authorizationUrl !== "string") {
        setError(typeof body.error === "string" ? body.error : `Could not start the connection (status ${response.status}).`);
        setBusy(false);
        return;
      }
      window.location.assign(body.authorizationUrl);
    } catch (err) {
      setError(`Could not start the connection: ${err instanceof Error ? err.message : String(err)}`);
      setBusy(false);
    }
  }

  return (
    <section className="card" aria-labelledby="calendar-heading">
      <h2 id="calendar-heading">Google Calendar</h2>

      {state.kind === "connected" && (
        <>
          <p className="status ok">Connected</p>
          <p className="muted">Your receptionist can see when you are free and book appointments.</p>
        </>
      )}

      {state.kind === "not_connected" && (
        <>
          <p className="status warn">Not connected</p>
          <p className="muted">Connect your Google Calendar so the receptionist can check your availability and book appointments.</p>
        </>
      )}

      {state.kind === "reconnect" && (
        <>
          <p className="status warn">Needs to be connected again</p>
          <p className="muted">{state.message}</p>
        </>
      )}

      {state.kind === "problem" && (
        <>
          <p className="status bad">Could not check your calendar</p>
          <p className="muted">
            {state.message}
            {state.code ? ` (${state.code})` : ""}
          </p>
        </>
      )}

      {state.kind !== "connected" && state.kind !== "problem" && (
        <button className="button" type="button" onClick={connect} disabled={busy}>
          {busy ? "Opening Google…" : state.kind === "reconnect" ? "Connect again" : "Connect Google Calendar"}
        </button>
      )}
      {error && (
        <p className="status bad" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
