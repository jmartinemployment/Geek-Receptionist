"use client";

import { useActionState, useRef, useState } from "react";
import { Dialog } from "@/components/dialog";
import { idle, type ActionState } from "@/lib/action-state";
import { ui } from "@/lib/ui";

// The dialog is a white panel, so the two buttons in it are drawn for a light background: keeping things as they are is the plain
// accent button the whole site uses, and the withdrawal is outlined in the failure colour so the two never read as the same choice.
const withdrawButton =
  "inline-flex items-center justify-center rounded border border-bad px-4 py-2 font-medium text-bad transition-colors hover:bg-bad hover:text-white " +
  "disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent";

/**
 * A button that takes something away, with the dialog this product requires in front of it (Jeff, 2026-11-20: "A modal dialog should
 * alert client to confirm this was intended action"). Nothing is asked of GeekAPI until the owner confirms in the dialog, which says in
 * the owner's own words what will stop happening.
 *
 * Keeping things as they are is the easy path: it is the button focus lands on when the dialog opens, and Escape, a click beside the
 * panel and the button itself all do it. The withdrawal is the deliberate second act. The form that runs the Server Action lives inside
 * the dialog rather than in the page, because the dialog is drawn into the body and the page behind it is inert while it is open.
 *
 * A failure is shown in the dialog, where the owner is, so it is never a silent nothing; closing after one leaves it under the button.
 */
export function ConfirmButton({
  action,
  label,
  pendingLabel,
  title,
  consequence,
  confirmLabel,
  keepLabel,
}: {
  action: () => Promise<ActionState>;
  label: string;
  pendingLabel: string;
  title: string;
  consequence: string;
  confirmLabel: string;
  keepLabel: string;
}) {
  const [state, run, pending] = useActionState(action, idle);
  const [asking, setAsking] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const close = () => {
    setAsking(false);
    opener.current?.focus();
  };

  return (
    <>
      <button ref={opener} type="button" className={ui.quietButton} onClick={() => setAsking(true)} disabled={pending}>
        {pending ? pendingLabel : label}
      </button>
      {state.error && !asking ? (
        <p className={`${ui.status.bad} mt-2`} role="alert">
          {state.error}
        </p>
      ) : null}
      {asking ? (
        <Dialog title={title} onClose={close}>
          <p className="mb-4">{consequence}</p>
          {state.error ? (
            <p className="mb-4 font-semibold text-bad" role="alert">
              {state.error}
            </p>
          ) : null}
          <form action={run} className="flex flex-wrap gap-3">
            <button type="button" autoFocus className={ui.button} onClick={close}>
              {keepLabel}
            </button>
            <button type="submit" className={withdrawButton} disabled={pending}>
              {pending ? pendingLabel : confirmLabel}
            </button>
          </form>
        </Dialog>
      ) : null}
    </>
  );
}
