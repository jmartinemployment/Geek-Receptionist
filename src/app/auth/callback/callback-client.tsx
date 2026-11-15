"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export function AuthCallbackClient() {
  const params = useSearchParams();
  const [exchangeError, setExchangeError] = useState<string | null>(null);
  // An authorization code is single-use. `useSearchParams()` returns a fresh object per render, so
  // an effect keyed on it can fire twice and POST the same code again; the second exchange fails and
  // its error would overwrite a sign-in that succeeded. Exchange exactly once per code.
  const exchanged = useRef<string | null>(null);

  const code = params.get("code");
  const state = params.get("state");
  const oauthError = params.get("error");
  const errorDescription = params.get("error_description");

  const paramError = oauthError
    ? errorDescription || oauthError
    : code
      ? null
      : "Missing authorization code";

  useEffect(() => {
    if (!code || oauthError) return;
    if (exchanged.current === code) return;
    exchanged.current = code;

    (async () => {
      try {
        const res = await fetch("/api/auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, state }),
        });
        if (!res.ok) {
          const text = await res.text();
          let message = text || `Sign-in failed (${res.status})`;
          try {
            const body = JSON.parse(text) as { error?: string };
            if (body.error) message = body.error;
          } catch {
            // Not JSON: the text is shown as it came.
          }
          setExchangeError(message);
          return;
        }
        window.location.assign("/dashboard");
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        setExchangeError(`Sign-in failed: could not reach this app's server (${detail}).`);
      }
    })();
  }, [code, state, oauthError]);

  const error = paramError ?? exchangeError;

  if (error) {
    return (
      <main className="center">
        <h1>Sign-in failed</h1>
        <p className="muted">{error}</p>
        <a className="button" href="/api/auth/start">
          Try again
        </a>
      </main>
    );
  }

  return <main className="center muted">Completing sign-in…</main>;
}
