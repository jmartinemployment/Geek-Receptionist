export type BookingSettings =
  | { kind: "settings"; enabled: boolean; calendarConnected: boolean }
  | { kind: "problem"; message: string; code: string | null };

/**
 * What the owner is told about booking, from GeekAPI's answer to receptionist/booking. Both facts are read, because "booking is on" and
 * "a call could actually book" are different things and an owner needs to see when they have come apart. An answer this app cannot read
 * is a problem that names its code: it is never shown as on and never shown as off, because either would be a claim about what happens
 * on the next call that nothing checked.
 */
export function describeBookingSettings(status: number, body: { error?: unknown; code?: unknown } | null): BookingSettings {
  const code = typeof body?.code === "string" ? body.code : null;
  const message = typeof body?.error === "string" && body.error.trim() !== "" ? body.error : null;
  const enabled = (body as { enabled?: unknown } | null)?.enabled;
  const calendarConnected = (body as { calendarConnected?: unknown } | null)?.calendarConnected;

  if (status === 200 && typeof enabled === "boolean" && typeof calendarConnected === "boolean") {
    return { kind: "settings", enabled, calendarConnected };
  }
  if (status === 401) return { kind: "problem", message: "Your sign-in has ended. Sign in again.", code };
  if (status === 200) return { kind: "problem", message: "GeekAPI did not say whether booking is on.", code };
  return { kind: "problem", message: message ?? `Whether booking is on could not be read (status ${status}).`, code };
}

/** The words shown when booking could not be turned on or off. GeekAPI's codes, each in plain words; an unknown code shows GeekAPI's own message. */
export function describeBookingFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "calendar_required":
      return "Connect a Google Calendar that works before booking can be turned on. Until then your receptionist takes a message instead of booking.";
    case "invalid_request":
      return "That could not be read. Reload the page and try again.";
    case "not_found":
      return "This account could not be found. Sign in again.";
    case "tenant_not_active":
      return "Booking can be turned on once your subscription is active.";
    default:
      return message ?? "Booking could not be changed. Nothing was altered; try again in a moment.";
  }
}

/** The words shown when a connection could not be withdrawn. GeekAPI's codes, each in plain words; an unknown code shows GeekAPI's own message. */
export function describeDisconnectFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "invalid_request":
      return "That could not be read. Reload the page and try again.";
    case "not_found":
      return "This account could not be found. Sign in again.";
    default:
      return message ?? "That could not be disconnected. It is still connected; try again in a moment.";
  }
}
