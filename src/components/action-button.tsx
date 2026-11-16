"use client";

import { useActionState } from "react";
import { idle, type ActionState } from "@/lib/action-state";
import { ui } from "@/lib/ui";

/**
 * One button that runs one Server Action, with no page reload: it shows its pending wording while the server works, and the action's
 * failure stays on screen under it until the next try. An action that succeeds sends the browser on with redirect().
 */
export function ActionButton({
  action,
  label,
  pendingLabel,
  quiet = false,
}: {
  action: () => Promise<ActionState>;
  label: string;
  pendingLabel: string;
  quiet?: boolean;
}) {
  const [state, run, pending] = useActionState(action, idle);

  return (
    <form action={run}>
      <button className={quiet ? ui.quietButton : ui.button} type="submit" disabled={pending}>
        {pending ? pendingLabel : label}
      </button>
      {state.error ? (
        <p className={`${ui.status.bad} mt-2`} role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
