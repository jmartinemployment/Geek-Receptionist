import { test } from "node:test";
import assert from "node:assert/strict";
import { noticeFrom } from "./notices";

test("a known notice shows its fixed sentence", () => {
  assert.deepEqual(noticeFrom({ notice: "calendar_connected" })?.tone, "ok");
  assert.match(noticeFrom({ notice: "payment_restored" })!.text, /answering calls again/);
});

test("an error code shows its fixed sentence and wins over a notice", () => {
  const shown = noticeFrom({ notice: "payment_recorded", payment_error: "payment_not_completed" });
  assert.equal(shown?.tone, "bad");
  assert.match(shown!.text, /nothing was taken/);
  assert.match(noticeFrom({ calendar_error: "authorization_denied" })!.text, /declined/);
});

test("anything that is not a known code shows nothing of its own", () => {
  assert.equal(noticeFrom({ notice: "unknown_notice" }), null);
  assert.equal(noticeFrom({ notice: "<script>" }), null);
  assert.equal(noticeFrom({ payment_error: "Pay us at evil.example" }), null);
  assert.equal(noticeFrom({ notice: ["calendar_connected", "x"] }), null);
});
