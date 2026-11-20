/**
 * The opening hours a business gives on /signup, turned into the one shape the receptionist reads
 * (GeekAPI `ReceptionistConsent.BusinessHoursText`): a time zone, a row per day, and a note. GeekAPI holds the same shape; change both
 * together.
 *
 * Hours are the business's own answer and nothing here supplies one. A business that gives none gets `{}`, which the receptionist is
 * told plainly — it says it does not have the hours and offers to take a message, rather than guessing them.
 */

/** The week in the order it is asked and spoken, lower case because that is what the receptionist is given. */
export const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export type Day = (typeof DAYS)[number];

/** The US time zones, by the IANA name the receptionist is told and the words an owner recognises. */
export const TIMEZONES: { id: string; label: string }[] = [
  { id: "America/New_York", label: "Eastern" },
  { id: "America/Chicago", label: "Central" },
  { id: "America/Denver", label: "Mountain" },
  { id: "America/Phoenix", label: "Arizona (no daylight saving)" },
  { id: "America/Los_Angeles", label: "Pacific" },
  { id: "America/Anchorage", label: "Alaska" },
  { id: "Pacific/Honolulu", label: "Hawaii" },
];

export type DayHours = { day: Day; closed: boolean; open: string; close: string };

export type BusinessHours = { timezone: string; days: { day: Day; open?: string; close?: string; closed?: true }[]; notes?: string };

export type HoursOutcome = { ok: true; hours: BusinessHours | Record<string, never> } | { ok: false; message: string };

const TIME = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

const isTimezone = (value: string): boolean => TIMEZONES.some((zone) => zone.id === value);

/**
 * The rows of the form as the receptionist reads them. A time that is not a time is refused rather than dropped: a day stored without
 * its hours is a day the receptionist cannot speak, and the business would never be told.
 *
 * <p>A day's close may be earlier than its open, which is a business open through the night and not a mistake.</p>
 */
export function businessHoursOf(timezone: string, rows: readonly DayHours[]): HoursOutcome {
  if (!isTimezone(timezone)) return { ok: false, message: "Choose the time zone your hours are in." };

  const days: BusinessHours["days"] = [];
  for (const row of rows) {
    if (row.closed) {
      days.push({ day: row.day, closed: true });
      continue;
    }
    if (!TIME.test(row.open) || !TIME.test(row.close)) {
      return { ok: false, message: `Give an opening and a closing time for ${row.day}, or mark it closed.` };
    }
    days.push({ day: row.day, open: row.open, close: row.close });
  }

  if (days.length !== DAYS.length) return { ok: false, message: "Answer for every day of the week." };
  if (days.every((day) => day.closed === true)) return { ok: false, message: "A business closed every day of the week has no hours to give." };
  return { ok: true, hours: { timezone, days } };
}

/** Open at all times, said as every day from midnight to one minute to midnight, with the note that says why. */
export function alwaysOpenHours(timezone: string): HoursOutcome {
  if (!isTimezone(timezone)) return { ok: false, message: "Choose the time zone your hours are in." };
  return {
    ok: true,
    hours: {
      timezone,
      days: DAYS.map((day) => ({ day, open: "00:00", close: "23:59" })),
      notes: "This business is open at all times.",
    },
  };
}

/** No hours given. The receptionist is told it has none and must say so rather than guess. */
export function noHours(): HoursOutcome {
  return { ok: true, hours: {} };
}
