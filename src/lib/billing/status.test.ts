import { test } from "node:test";
import assert from "node:assert/strict";
import { describeBilling, describePaymentFailure } from "./status";

const charge = { id: "55555555-5555-5555-5555-555555555555", periodStart: "2026-10-16T10:00:00Z", periodEnd: "2026-11-16T10:00:00Z", overageMinutes: 10, amountUsd: 5 };

test("an active subscription shows its tier and renewal day", () => {
  const state = describeBilling(200, { status: "active", tier: "STARTER", subscriptionStatus: "ACTIVE", currentPeriodEnd: "2026-12-16T10:00:00Z", unpaid: [] });
  assert.deepEqual(state, { kind: "active", tier: "STARTER", renewsOn: "2026-12-16T10:00:00Z" });
});

test("a suspension shows what is owed, until when the number answers, and whether PayPal holds the subscription", () => {
  const state = describeBilling(200, {
    status: "suspended", tier: "STARTER", subscriptionStatus: "SUSPENDED", currentPeriodEnd: "2026-11-16T10:00:00Z",
    answeringUntil: "2026-11-23T13:00:00Z", answeringStopped: false, unpaid: [charge],
  });
  assert.deepEqual(state, { kind: "suspended", answeringUntil: "2026-11-23T13:00:00Z", answeringStopped: false, subscriptionHeld: true, unpaid: [charge] });
});

test("an answer this page does not know is a problem, never active", () => {
  assert.equal(describeBilling(200, { status: "active" }).kind, "problem");
  assert.equal(describeBilling(200, { status: "suspended", answeringUntil: "x", answeringStopped: false, subscriptionStatus: "ACTIVE", unpaid: [{ id: "not-an-id" }] }).kind, "problem");
  assert.equal(describeBilling(200, { status: "cancelled" }).kind, "problem");
});

test("a refusal shows GeekAPI's message and code", () => {
  assert.deepEqual(describeBilling(503, { error: "down", code: "store_unavailable" }), { kind: "problem", message: "down", code: "store_unavailable" });
  assert.equal(describeBilling(502, null).kind, "problem");
});

test("each payment failure has its own words", () => {
  assert.match(describePaymentFailure(409, "charge_not_owed", null), /already paid/);
  assert.match(describePaymentFailure(402, "payment_not_completed", null), /nothing was taken/);
  assert.match(describePaymentFailure(401, null, null), /Sign in again/);
  assert.equal(describePaymentFailure(500, "other", "GeekAPI's words"), "GeekAPI's words");
});
