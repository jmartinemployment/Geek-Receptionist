/** The two ways a caller can be greeted before the receptionist engages. GeekAPI holds the same two codes; change both together. */
export const CONSENT_MODES = ["strict_keypress", "passive_disclosure"] as const;

export type ConsentMode = (typeof CONSENT_MODES)[number];

export type ConsentSettings =
  | { kind: "settings"; mode: ConsentMode }
  | { kind: "problem"; message: string; code: string | null };

/** Whether a value GeekAPI sent is one of the two modes this page knows how to describe to an owner. */
export function isConsentMode(value: unknown): value is ConsentMode {
  return typeof value === "string" && (CONSENT_MODES as readonly string[]).includes(value);
}

/**
 * What the owner is told about how their callers are greeted, from GeekAPI's answer to receptionist/consent. A mode this page cannot
 * describe is a problem that names its code, never rendered as one of the two: an owner shown the wrong one of these would be told
 * something false about what every caller hears, and a mode is not a thing that can be guessed from a blank.
 */
export function describeConsentSettings(status: number, body: { error?: unknown; code?: unknown } | null): ConsentSettings {
  const code = typeof body?.code === "string" ? body.code : null;
  const message = typeof body?.error === "string" && body.error.trim() !== "" ? body.error : null;
  const mode = (body as { mode?: unknown } | null)?.mode;

  if (status === 200 && isConsentMode(mode)) return { kind: "settings", mode };
  if (status === 401) return { kind: "problem", message: "Your sign-in has ended. Sign in again.", code };
  if (status === 200) return { kind: "problem", message: "GeekAPI did not say how your callers are greeted.", code };
  return { kind: "problem", message: message ?? `How your callers are greeted could not be read (status ${status}).`, code };
}

/** The words shown when the greeting could not be changed. GeekAPI's codes, each in plain words; an unknown code shows GeekAPI's own message. */
export function describeConsentFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "invalid_request":
      return "That could not be read. Reload the page and try again.";
    case "not_found":
      return "This account could not be found. Sign in again.";
    case "store_unavailable":
      return "That could not be saved just now. Your callers are greeted the way they were; try again in a moment.";
    default:
      return message ?? "How your callers are greeted could not be changed. Nothing was altered; try again in a moment.";
  }
}

export type BookingSettings =
  | { kind: "settings"; enabled: boolean; requested: boolean; calendarConnected: boolean }
  | { kind: "problem"; message: string; code: string | null };

/**
 * What the owner is told about booking, from GeekAPI's answer to receptionist/booking. Three facts are read, because they can all come
 * apart: whether booking is on, whether the business asked for it at signup, and whether a call could actually book. An answer this app
 * cannot read is a problem that names its code: it is never shown as on and never shown as off, because either would be a claim about
 * what happens on the next call that nothing checked.
 *
 * <p>
 * `requested` is the signup form's answer, kept because booking could not be switched on there: no business has a calendar during
 * signup. It is what lets this page say "your yes is waiting on a calendar" rather than showing booking plainly off to an owner who
 * remembers asking for it.
 * </p>
 */
export function describeBookingSettings(status: number, body: { error?: unknown; code?: unknown } | null): BookingSettings {
  const code = typeof body?.code === "string" ? body.code : null;
  const message = typeof body?.error === "string" && body.error.trim() !== "" ? body.error : null;
  const enabled = (body as { enabled?: unknown } | null)?.enabled;
  const requested = (body as { requested?: unknown } | null)?.requested;
  const calendarConnected = (body as { calendarConnected?: unknown } | null)?.calendarConnected;

  if (status === 200 && typeof enabled === "boolean" && typeof requested === "boolean" && typeof calendarConnected === "boolean") {
    return { kind: "settings", enabled, requested, calendarConnected };
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
