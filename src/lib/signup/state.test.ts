import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSignup, stepOf } from "./state";

const tenantId = "22222222-2222-2222-2222-222222222222";

test("each step follows from what is already done", () => {
  assert.equal(stepOf(null), "business");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test" }), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1", subscriptionApproved: false }), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true }), "payment_method");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1" }), "number");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1", phoneNumber: "+15615550100" }), "login");
});

test("a cookie this app did not write is a fresh start", () => {
  assert.equal(parseSignup(undefined), null);
  assert.equal(parseSignup("not json"), null);
  assert.equal(parseSignup(JSON.stringify({ tenantId: "x", contactEmail: "a" })), null);
});

test("only well-formed ids are read back", () => {
  const state = parseSignup(JSON.stringify({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1<script>", subscriptionApproved: "yes", phoneNumber: "5615550100" }));
  assert.equal(state?.subscriptionId, undefined);
  assert.equal(state?.subscriptionApproved, false);
  assert.equal(state?.phoneNumber, undefined);
});
