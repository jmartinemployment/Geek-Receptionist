"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";

/**
 * A Continue button that lives outside its form, in the hero's left pane, and submits the form in the right pane by its id (Jeff, 2026-11-21:
 * "Remove Continue from right pane(s). Use left pane"). A button outside a form cannot ask the form whether it is pending, so the form
 * says so on its own `data-pending` attribute and this watches it: while an answer is being sent the button is disabled, so a second click
 * cannot send the same declaration twice.
 */
export function SubmitFromLeft({ form, pendingLabel = "One moment…" }: { form: string; pendingLabel?: string }) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const target = document.getElementById(form);
    if (!target) return;
    const read = () => setPending(target.getAttribute("data-pending") === "true");
    read();
    const watcher = new MutationObserver(read);
    watcher.observe(target, { attributes: true, attributeFilter: ["data-pending"] });
    return () => watcher.disconnect();
  }, [form]);

  return (
    <button type="submit" form={form} className={ui.button} disabled={pending}>
      {pending ? pendingLabel : "Continue"}
    </button>
  );
}
