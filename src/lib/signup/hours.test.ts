import { test } from "node:test";
import assert from "node:assert/strict";
import { DAYS, alwaysOpenHours, businessHoursOf, noHours, type DayHours } from "./hours";

const week = (overrides: Partial<Record<string, Partial<DayHours>>> = {}): DayHours[] =>
  DAYS.map((day) => ({ day, closed: false, open: "09:00", close: "17:00", ...overrides[day] }));

test("a week of hours becomes the shape the receptionist reads", () => {
  const outcome = businessHoursOf("America/New_York", week({ sunday: { closed: true } }));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;

  assert.deepEqual(outcome.hours, {
    timezone: "America/New_York",
    days: [
      { day: "monday", open: "09:00", close: "17:00" },
      { day: "tuesday", open: "09:00", close: "17:00" },
      { day: "wednesday", open: "09:00", close: "17:00" },
      { day: "thursday", open: "09:00", close: "17:00" },
      { day: "friday", open: "09:00", close: "17:00" },
      { day: "saturday", open: "09:00", close: "17:00" },
      { day: "sunday", closed: true },
    ],
  });
});

test("a closed day carries no times, and an open day's times are not dropped", () => {
  const outcome = businessHoursOf("America/Chicago", week({ monday: { closed: true, open: "", close: "" } }));
  assert.equal(outcome.ok, true);
  if (!outcome.ok || !("days" in outcome.hours)) return;
  assert.deepEqual(outcome.hours.days[0], { day: "monday", closed: true });
});

test("a day runs through the night when it closes before it opens", () => {
  const outcome = businessHoursOf("America/New_York", week({ friday: { open: "18:00", close: "02:00" } }));
  assert.equal(outcome.ok, true);
});

test("hours that are not hours are refused, never stored without them", () => {
  for (const bad of ["", "9am", "25:00", "09:60", "9:00"]) {
    const outcome = businessHoursOf("America/New_York", week({ monday: { open: bad } }));
    assert.equal(outcome.ok, false, `${bad} was accepted`);
  }
});

test("a time zone is required, and only the US zones this app offers", () => {
  assert.equal(businessHoursOf("", week()).ok, false);
  assert.equal(businessHoursOf("Europe/London", week()).ok, false);
  assert.equal(alwaysOpenHours("Mars/Olympus").ok, false);
});

test("a week closed every day is refused, because it gives no hours at all", () => {
  const closed = DAYS.map((day) => ({ day, closed: true, open: "", close: "" }));
  assert.equal(businessHoursOf("America/New_York", closed).ok, false);
});

test("open at all times is every day, said so, with the note that explains it", () => {
  const outcome = alwaysOpenHours("Pacific/Honolulu");
  assert.equal(outcome.ok, true);
  if (!outcome.ok || !("days" in outcome.hours)) return;
  assert.equal(outcome.hours.days.length, 7);
  assert.deepEqual(outcome.hours.days[0], { day: "monday", open: "00:00", close: "23:59" });
  assert.equal(outcome.hours.notes, "This business is open at all times.");
});

test("no hours given is an empty object, which the receptionist is told it has none", () => {
  const outcome = noHours();
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.deepEqual(outcome.hours, {});
});
