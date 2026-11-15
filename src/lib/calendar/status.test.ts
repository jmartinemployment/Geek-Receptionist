import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { describeCalendarCheck, describeCompleteFailure } from "./status";

describe("describeCalendarCheck", () => {
  it("connected only for a 200", () => {
    assert.deepEqual(describeCalendarCheck(200, { connected: true } as never), { kind: "connected" });
  });

  it("not connected for 404 calendar_not_connected, but a 404 with any other code is a problem", () => {
    assert.deepEqual(describeCalendarCheck(404, { code: "calendar_not_connected" }), { kind: "not_connected" });
    assert.equal(describeCalendarCheck(404, { code: "not_found" }).kind, "problem");
    assert.equal(describeCalendarCheck(404, null).kind, "problem");
  });

  it("reconnect for 409 reauthorization_required, with GeekAPI's words when it sent some", () => {
    const state = describeCalendarCheck(409, { code: "reauthorization_required", error: "Connect the calendar again." });
    assert.deepEqual(state, { kind: "reconnect", message: "Connect the calendar again." });
    assert.equal(describeCalendarCheck(409, { code: "reauthorization_required" }).kind, "reconnect");
    assert.equal(describeCalendarCheck(409, { code: "conflict" }).kind, "problem");
  });

  it("never reads an unknown or failing answer as connected", () => {
    for (const status of [201, 204, 400, 401, 403, 500, 502, 503]) {
      assert.equal(describeCalendarCheck(status, { connected: true } as never).kind, "problem", String(status));
    }
  });

  it("names the code and the status when there are no words", () => {
    const state = describeCalendarCheck(503, { code: "gateway_unavailable" });
    assert.equal(state.kind, "problem");
    if (state.kind === "problem") {
      assert.equal(state.code, "gateway_unavailable");
      assert.match(state.message, /503/);
    }
  });
});

describe("describeCompleteFailure", () => {
  it("has plain words for every code GeekAPI documents", () => {
    for (const code of ["state_expired", "state_invalid", "tenant_forbidden", "authorization_denied", "scope_not_granted", "refresh_token_missing", "code_exchange_failed", "tenant_not_active"]) {
      const words = describeCompleteFailure(code, "raw message");
      assert.notEqual(words, "raw message", code);
      assert.ok(words.length > 20, code);
    }
  });

  it("shows GeekAPI's own message for a code it does not know, and a fallback when there is none", () => {
    assert.equal(describeCompleteFailure("oauth_unavailable", "Google could not be reached."), "Google could not be reached.");
    assert.equal(describeCompleteFailure(null, null), "The calendar could not be connected.");
  });
});
