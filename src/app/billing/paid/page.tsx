import { Suspense } from "react";
import { PaidClient } from "./paid-client";

export default function PaidPage() {
  return (
    <Suspense fallback={<main className="center muted">Recording your payment…</main>}>
      <PaidClient />
    </Suspense>
  );
}
