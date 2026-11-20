import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  describeBookingFailure,
  describeBookingSettings,
  describeConsentFailure,
  describeConsentSettings,
  describeDisconnectFailure,
  isConsentMode,
} from "./controls";

test("booking on, with a calendar behind it, is read as all three", () => {
  assert.deepEqual(describeBookingSettings(200, { enabled: true, requested: true, calendarConnected: true } as never), {
    kind: "settings",
    enabled: true,
    requested: true,
    calendarConnected: true,
  });
});

test("booking off is a setting the owner can see, not a problem", () => {
  const state = describeBookingSettings(200, { enabled: false, requested: false, calendarConnected: false } as never);
  assert.equal(state.kind, "settings");
  assert.equal(state.kind === "settings" && state.enabled, false);
});

test("a business that asked for booking at signup and has no calendar yet is all three facts, apart", () => {
  const state = describeBookingSettings(200, { enabled: false, requested: true, calendarConnected: false } as never);
  assert.equal(state.kind, "settings");
  assert.equal(state.kind === "settings" && state.enabled, false);
  assert.equal(state.kind === "settings" && state.requested, true);
  assert.equal(state.kind === "settings" && state.calendarConnected, false);
});

test("booking on with no calendar behind it is kept as two separate facts", () => {
  const state = describeBookingSettings(200, { enabled: true, requested: true, calendarConnected: false } as never);
  assert.equal(state.kind, "settings");
  assert.equal(state.kind === "settings" && state.enabled, true);
  assert.equal(state.kind === "settings" && state.calendarConnected, false);
});

test("a 200 that does not say whether booking is on is a problem, never on and never off", () => {
  // An answer missing any of the three is a problem: a missing `requested` would be shown as a business that never asked.
  for (const body of [null, {}, { enabled: "true", requested: true, calendarConnected: true }, { enabled: true }, { enabled: true, calendarConnected: true }]) {
    assert.equal(describeBookingSettings(200, body as never).kind, "problem", JSON.stringify(body));
  }
});

test("a failing answer is never read as a setting", () => {
  for (const status of [400, 401, 403, 404, 409, 500, 502, 503]) {
    assert.equal(describeBookingSettings(status, { enabled: true, requested: true, calendarConnected: true } as never).kind, "problem", String(status));
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

test("each consent mode GeekAPI holds is read back as that mode and neither is treated as the fallback", () => {
  assert.deepEqual(describeConsentSettings(200, { mode: "strict_keypress" } as never), { kind: "settings", mode: "strict_keypress" });
  assert.deepEqual(describeConsentSettings(200, { mode: "passive_disclosure" } as never), {
    kind: "settings",
    mode: "passive_disclosure",
  });
});

test("a 200 whose body names no mode this page knows is a problem, never drawn as either mode", () => {
  for (const body of [null, {}, { mode: "" }, { mode: "keypress" }, { mode: "STRICT_KEYPRESS" }, { mode: true }, { modes: [] }]) {
    assert.equal(describeConsentSettings(200, body as never).kind, "problem", JSON.stringify(body));
  }
});

test("a 200 naming a mode this page does not know keeps GeekAPI's code so an operator can see which one", () => {
  const state = describeConsentSettings(200, { mode: "spoken_warning", code: "store_unavailable" } as never);
  assert.equal(state.kind === "problem" && state.code, "store_unavailable");
});

test("a failing answer is never read as a consent mode", () => {
  for (const status of [400, 401, 403, 404, 409, 500, 502, 503]) {
    assert.equal(describeConsentSettings(status, { mode: "strict_keypress" } as never).kind, "problem", String(status));
  }
});

test("an ended sign-in on the consent read says so without leaking a status number", () => {
  const state = describeConsentSettings(401, null);
  assert.equal(state.kind === "problem" && state.message, "Your sign-in has ended. Sign in again.");
});

test("a consent problem names the status when GeekAPI sent no words, and uses its words when it did", () => {
  const silent = describeConsentSettings(503, null);
  assert.match(silent.kind === "problem" ? silent.message : "", /503/);
  const spoken = describeConsentSettings(409, { error: "GeekAPI said this." } as never);
  assert.equal(spoken.kind === "problem" && spoken.message, "GeekAPI said this.");
});

test("only the two modes are modes", () => {
  assert.equal(isConsentMode("strict_keypress"), true);
  assert.equal(isConsentMode("passive_disclosure"), true);
  for (const value of ["", "keypress", "Strict_Keypress", null, undefined, 1, {}]) {
    assert.equal(isConsentMode(value), false, JSON.stringify(value) ?? "undefined");
  }
});

test("a greeting that could not be saved says the callers are greeted the way they were", () => {
  assert.match(describeConsentFailure("store_unavailable", null), /greeted the way they were/);
  assert.match(describeConsentFailure(null, null), /Nothing was altered/);
  assert.equal(describeConsentFailure("something_new", "GeekAPI said this."), "GeekAPI said this.");
});
