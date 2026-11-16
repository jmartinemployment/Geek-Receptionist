"use client";

import { useEffect, useState } from "react";
import type { Notice } from "@/lib/notices";

/**
 * The message from a return trip to Google or PayPal, shown without blocking the page. The code is taken out of the address bar at once,
 * so a reload or a shared link does not show it again. Good news goes after eight seconds; a failure stays until it is closed.
 */
export function NoticeToast({ notice }: { notice: Notice }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    if (notice.tone !== "ok") return;
    const timer = window.setTimeout(() => setOpen(false), 8000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  if (!open) return null;

  return (
    <div
      role={notice.tone === "ok" ? "status" : "alert"}
      className={`fixed inset-x-4 bottom-4 z-10 mx-auto flex max-w-xl items-start gap-3 rounded-lg border bg-paper p-4 shadow-lg ${
        notice.tone === "ok" ? "border-ok" : "border-bad"
      }`}
    >
      <p className={`flex-1 ${notice.tone === "ok" ? "text-ok" : "text-bad"} font-semibold`}>{notice.text}</p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded px-2 text-muted focus-visible:outline-3 focus-visible:outline-accent"
        aria-label="Close message"
      >
        Close
      </button>
    </div>
  );
}
