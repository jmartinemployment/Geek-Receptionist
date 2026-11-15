export type CalendarState =
  | { kind: "connected" }
  | { kind: "not_connected" }
  | { kind: "reconnect"; message: string }
  | { kind: "problem"; message: string; code: string | null };

/**
 * What the owner is told about their calendar, from GeekAPI's answer to calendar/check. Every status GeekAPI documents has its own
 * state, and anything else is a problem that names its code, so an answer this app does not know is shown and never read as "connected".
 */
export function describeCalendarCheck(status: number, body: { error?: unknown; code?: unknown } | null): CalendarState {
  const code = typeof body?.code === "string" ? body.code : null;
  const message = typeof body?.error === "string" && body.error.trim() !== "" ? body.error : null;

  if (status === 200) return { kind: "connected" };
  if (status === 404 && code === "calendar_not_connected") return { kind: "not_connected" };
  if (status === 409 && code === "reauthorization_required") {
    return { kind: "reconnect", message: message ?? "Google no longer accepts this calendar connection. Connect the calendar again." };
  }
  if (status === 401) return { kind: "problem", message: "Your sign-in has ended. Sign in again.", code };
  return { kind: "problem", message: message ?? `The calendar could not be checked (status ${status}).`, code };
}

/** The words shown when finishing the connection failed. GeekAPI's codes, each in plain words; an unknown code shows GeekAPI's own message. */
export function describeCompleteFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "state_expired":
      return "That approval took too long. Start the connection again.";
    case "state_invalid":
      return "That approval did not come from this sign-in. Start the connection again.";
    case "tenant_forbidden":
      return "That approval was started for a different account. Sign in as the account that started it, or start again.";
    case "authorization_denied":
      return "Calendar access was declined. The receptionist cannot book without it.";
    case "scope_not_granted":
      return "Every calendar permission must be allowed so the receptionist can check availability and book. Start again and leave all of them ticked.";
    case "refresh_token_missing":
      return "Google did not give a lasting connection. Start again.";
    case "code_exchange_failed":
      return "That approval was already used or has expired. Start the connection again.";
    case "tenant_not_active":
      return "A calendar can be connected once your subscription is active.";
    default:
      return message ?? "The calendar could not be connected.";
  }
}
