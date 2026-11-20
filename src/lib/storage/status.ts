export type StorageState =
  | { kind: "connected" }
  | { kind: "not_connected" }
  | { kind: "reconnect"; message: string }
  | { kind: "problem"; message: string; code: string | null };

/**
 * What the owner is told about the storage their call records are written to, from GeekAPI's answer to storage/check. Every status
 * GeekAPI documents has its own state, and anything else is a problem that names its code, so an answer this app does not know is
 * shown and never read as "connected".
 */
export function describeStorageCheck(status: number, body: { error?: unknown; code?: unknown } | null): StorageState {
  const code = typeof body?.code === "string" ? body.code : null;
  const message = typeof body?.error === "string" && body.error.trim() !== "" ? body.error : null;

  if (status === 200) return { kind: "connected" };
  if (status === 404 && code === "storage_not_connected") return { kind: "not_connected" };
  if (status === 409 && code === "reauthorization_required") {
    return { kind: "reconnect", message: message ?? "Google no longer accepts this connection. Connect your Drive again." };
  }
  if (status === 401) return { kind: "problem", message: "Your sign-in has ended. Sign in again.", code };
  return { kind: "problem", message: message ?? `The storage connection could not be checked (status ${status}).`, code };
}

/** The words shown when connecting the storage failed. GeekAPI's codes, each in plain words; an unknown code shows GeekAPI's own message. */
export function describeStorageFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "no_approval":
      return "Google sent no approval. Start the connection again.";
    case "state_expired":
      return "That approval took too long. Start the connection again.";
    case "state_invalid":
      return "That approval did not come from this sign-in. Start the connection again.";
    case "tenant_forbidden":
      return "That approval was started for a different account. Sign in as the account that started it, or start again.";
    case "authorization_denied":
      return "Drive access was declined, so call records have nowhere to go.";
    case "scope_not_granted":
      return "Drive access must be allowed for call records to be written. Start again and leave the permission ticked.";
    case "refresh_token_missing":
      return "Google did not give a lasting connection. Start again.";
    case "code_exchange_failed":
      return "That approval was already used or has expired. Start the connection again.";
    case "tenant_not_active":
      return "Storage can be connected once your subscription is active.";
    default:
      return message ?? "The storage could not be connected.";
  }
}
