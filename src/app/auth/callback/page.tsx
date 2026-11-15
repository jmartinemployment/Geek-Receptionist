import { Suspense } from "react";
import { AuthCallbackClient } from "./callback-client";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<main className="center muted">Completing sign-in…</main>}>
      <AuthCallbackClient />
    </Suspense>
  );
}
