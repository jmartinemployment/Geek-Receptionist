import { strict as assert } from "node:assert";
import { test } from "node:test";
import { describeBookingFailure, describeBookingSettings, describeDisconnectFailure } from "./controls";

test("booking on, with a calendar behind it, is read as both", () => {
  assert.deepEqual(describeBookingSettings(200, { enabled: true, calendarConnected: true } as never), {
    kind: "settings",
    enabled: true,
    calendarConnected: true,
  });
});

test("booking off is a setting the owner can see, not a problem", () => {
  const state = describeBookingSettings(200, { enabled: false, calendarConnected: false } as never);
  assert.equal(state.kind, "settings");
  assert.equal(state.kind === "settings" && state.enabled, false);
});

test("booking on with no calendar behind it is kept as two separate facts", () => {
  const state = describeBookingSettings(200, { enabled: true, calendarConnected: false } as never);
  assert.equal(state.kind, "settings");
  assert.equal(state.kind === "settings" && state.enabled, true);
  assert.equal(state.kind === "settings" && state.calendarConnected, false);
});

test("a 200 that does not say whether booking is on is a problem, never on and never off", () => {
  for (const body of [null, {}, { enabled: "true", calendarConnected: true }, { enabled: true }]) {
    assert.equal(describeBookingSettings(200, body as never).kind, "problem", JSON.stringify(body));
  }
});

test("a failing answer is never read as a setting", () => {
  for (const status of [400, 401, 403, 404, 409, 500, 502, 503]) {
    assert.equal(describeBookingSettings(status, { enabled: true, calendarConnected: true } as never).kind, "problem", String(status));
  }
});

test("an ended sign-in says so without leaking a status number", () => {
  const state = describeBookingSettings(401, null);
  assert.equal(state.kind === "problem" && state.message, "Your sign-in has ended. Sign in again.");
});

test("a problem names the code and the status when GeekAPI sent no words", () => {
  const state = describeBookingSettings(503, { code: "store_unavailable" });
  assert.equal(state.kind === "problem" && state.code, "store_unavailable");
  assert.match(state.kind === "problem" ? state.message : "", /503/);
});

test("being refused for want of a calendar says to connect one and what happens meanwhile", () => {
  const words = describeBookingFailure("calendar_required", "Connect a calendar that works before the receptionist can book into it.");
  assert.match(words, /Connect a Google Calendar/);
  assert.match(words, /takes a message/);
});

test("a booking code this app does not know shows GeekAPI's own words, and says nothing was altered when there are none", () => {
  assert.equal(describeBookingFailure("something_new", "GeekAPI said this."), "GeekAPI said this.");
  assert.match(describeBookingFailure(null, null), /Nothing was altered/);
});

test("a disconnect that failed says the connection is still there", () => {
  assert.match(describeDisconnectFailure(null, null), /still connected/);
  assert.equal(describeDisconnectFailure("http_503", "GeekAPI said this."), "GeekAPI said this.");
});
