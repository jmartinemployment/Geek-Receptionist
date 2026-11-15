import { Suspense } from "react";
import { CalendarCallbackClient } from "./callback-client";

export default function CalendarCallbackPage() {
  return (
    <Suspense fallback={<main className="center muted">Finishing the connection…</main>}>
      <CalendarCallbackClient />
    </Suspense>
  );
}
