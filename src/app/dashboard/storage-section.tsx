import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeStorageCheck } from "@/lib/storage/status";
import { ui } from "@/lib/ui";
import { bucketPolicyAction, connectStorageAction, disconnectBucketAction, disconnectStorageAction } from "./actions";
import { BucketForm } from "./bucket-form";
import { ActionButton } from "@/components/action-button";
import { ConfirmButton } from "./confirm-button";

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
          <p className={`${ui.muted} mb-4`}>
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
      {(state.kind === "connected" || state.kind === "reconnect") && (
        <ConfirmButton
          action={disconnectStorageAction}
          label="Disconnect Google Drive"
          pendingLabel="Disconnecting…"
          title="Disconnect your Google Drive?"
          consequence={
            "Call records will no longer be written to your Google Drive. The records already in your Geek-Receptionist Logs folder " +
            "stay where they are and remain yours. You can connect your Drive again at any time."
          }
          confirmLabel="Disconnect it"
          keepLabel="Keep it connected"
        />
      )}

      <details className="mt-6">
        <summary className="cursor-pointer font-semibold">Use my own S3 or Cloud Storage bucket instead</summary>
        <p className={`${ui.muted} mt-2 mb-4`}>
          Part of Standard and above. Records are written with a key that may only add a file: it cannot read, list or delete anything
          in your bucket.
        </p>
        <BucketForm policyFor={bucketPolicyAction} />

        <div className="mt-6 border-t border-line pt-4">
          <p className={`${ui.muted} mb-3`}>
            A bucket you saved earlier is not shown above: this page cannot yet read back which bucket is in use, only save a new one.
            Removing it stops anything being written there.
          </p>
          <ConfirmButton
            action={disconnectBucketAction}
            label="Remove my bucket"
            pendingLabel="Removing…"
            title="Remove your bucket?"
            consequence={
              "Call records will no longer be written to your bucket, and the access key and secret you saved are deleted. The files " +
              "already in your bucket stay where they are. You can save a bucket again at any time."
            }
            confirmLabel="Remove it"
            keepLabel="Keep my bucket"
          />
        </div>
      </details>
    </section>
  );
}
