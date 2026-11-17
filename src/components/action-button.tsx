"use client";

import { useActionState, useState, useTransition } from "react";
import { Dialog } from "@/components/dialog";
import { idle, type ActionState } from "@/lib/action-state";
import { ui } from "@/lib/ui";

/**
 * One button that runs one Server Action, with no page reload: it shows its pending wording while the server works, and the action's
 * failure stays on screen under it until the next try. An action that succeeds sends the browser on with redirect(). With a dialogTitle
 * the failure opens in a dialog under that title instead of sitting under the button; each try that fails opens it again. Closing the dialog runs onDialogClose, if given.
 */
export function ActionButton({
  action,
  label,
  pendingLabel,
  quiet = false,
  dialogTitle,
  onDialogClose,
}: {
  action: () => Promise<ActionState>;
  label: string;
  pendingLabel: string;
  quiet?: boolean;
  dialogTitle?: string;
  onDialogClose?: () => Promise<void>;
}) {
  const [state, run, pending] = useActionState(action, idle);
  const [closed, setClosed] = useState<ActionState | null>(null);
  const [, afterClose] = useTransition();
  const close = () => {
    setClosed(state);
    if (onDialogClose) afterClose(onDialogClose);
  };

  return (
    <form action={run}>
      <button className={quiet ? ui.quietButton : ui.button} type="submit" disabled={pending}>
        {pending ? pendingLabel : label}
      </button>
      {state.error && !dialogTitle ? (
        <p className={`${ui.status.bad} mt-2`} role="alert">
          {state.error}
        </p>
      ) : null}
      {state.error && dialogTitle && closed !== state ? (
        <Dialog title={dialogTitle} onClose={close}>
          <p className="mb-4" role="alert">
            {state.error}
          </p>
          <button type="button" className={ui.button} onClick={close}>
            Close
          </button>
        </Dialog>
      ) : null}
    </form>
  );
}
