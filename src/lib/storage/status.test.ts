import { strict as assert } from "node:assert";
import { test } from "node:test";
import { describeStorageCheck, describeStorageFailure } from "./status";

test("a working connection is connected", () => {
  assert.deepEqual(describeStorageCheck(200, { connected: true }), { kind: "connected" });
});

test("a business that has connected nothing is told so, not shown an error", () => {
  assert.deepEqual(describeStorageCheck(404, { code: "storage_not_connected" }), { kind: "not_connected" });
});

test("a withdrawn approval asks to connect again", () => {
  const state = describeStorageCheck(409, { code: "reauthorization_required", error: "Google no longer accepts this." });
  assert.equal(state.kind, "reconnect");
  assert.equal(state.kind === "reconnect" && state.message, "Google no longer accepts this.");
});

test("an answer this app does not know is a problem that names its code, never connected", () => {
  const state = describeStorageCheck(500, { code: "store_unavailable", error: "The store is down." });
  assert.equal(state.kind, "problem");
  assert.equal(state.kind === "problem" && state.code, "store_unavailable");
});

test("a 404 that is not the not-connected code is still a problem", () => {
  assert.equal(describeStorageCheck(404, { code: "not_found" }).kind, "problem");
});

test("an ended sign-in says so without leaking a status number", () => {
  const state = describeStorageCheck(401, null);
  assert.equal(state.kind, "problem");
  assert.equal(state.kind === "problem" && state.message, "Your sign-in has ended. Sign in again.");
});

test("a declined approval is about records having nowhere to go, not about booking", () => {
  const words = describeStorageFailure("authorization_denied", null);
  assert.match(words, /Drive access was declined/);
  assert.doesNotMatch(words, /book/i);
});

test("a partly granted approval says to leave the permission ticked", () => {
  assert.match(describeStorageFailure("scope_not_granted", null), /leave the permission ticked/);
});

test("a code this app does not know shows GeekAPI's own words", () => {
  assert.equal(describeStorageFailure("something_new", "GeekAPI said this."), "GeekAPI said this.");
});

test("a code this app does not know, with no words, still says something", () => {
  assert.equal(describeStorageFailure(null, null), "The storage could not be connected.");
});
