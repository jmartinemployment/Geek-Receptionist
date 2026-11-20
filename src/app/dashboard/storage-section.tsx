import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeStorageCheck } from "@/lib/storage/status";
import { ui } from "@/lib/ui";
import { connectStorageAction } from "./actions";
import { ActionButton } from "@/components/action-button";

/** The Google Drive card: where this owner's call records are written, read from GeekAPI on the server while the page streams. */
export async function StorageSection() {
  const check = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/storage/check`, { method: "GET" });
  if (check.status === 401) redirect("/login");
  const state = describeStorageCheck(check.status, check.body);

  return (
    <section className={ui.card} aria-labelledby="storage-heading">
      <h2 id="storage-heading" className={ui.h2}>
        Call records
      </h2>

      {state.kind === "connected" && (
        <>
          <p className={ui.status.ok}>Connected</p>
          <p className={ui.muted}>
            Each call is written to a Geek-Receptionist Logs folder in your own Google Drive. We keep no copy and cannot read them back.
          </p>
        </>
      )}
      {state.kind === "not_connected" && (
        <>
          <p className={ui.status.warn}>Not connected</p>
          <p className={`${ui.muted} mb-4`}>
            Connect your Google Drive to keep a record of every call in a folder you own. Without it, records are emailed to you instead.
          </p>
        </>
      )}
      {state.kind === "reconnect" && (
        <>
          <p className={ui.status.warn}>Needs to be connected again</p>
          <p className={`${ui.muted} mb-4`}>{state.message}</p>
        </>
      )}
      {state.kind === "problem" && (
        <>
          <p className={ui.status.bad}>Could not check your call records</p>
          <p className={ui.muted}>
            {state.message}
            {state.code ? ` (${state.code})` : ""}
          </p>
        </>
      )}

      {(state.kind === "not_connected" || state.kind === "reconnect") && (
        <ActionButton
          action={connectStorageAction}
          label={state.kind === "reconnect" ? "Connect again" : "Connect Google Drive"}
          pendingLabel="Opening Google…"
        />
      )}
    </section>
  );
}
