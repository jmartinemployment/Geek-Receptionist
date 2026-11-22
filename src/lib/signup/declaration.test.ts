import { test } from "node:test";
import assert from "node:assert/strict";
import { AGREEMENTS, DECLINED, TERMS_STATEMENT, isAgreement } from "./declaration";

test("the Terms are the exact words GeekAPI holds", () => {
  assert.equal(
    TERMS_STATEMENT,
    "I agree to the Geek-Receptionist Subscription Terms, subject to Geek-Receptionist verifying a connection to each system the business requires. No payment is taken before that connection is verified, and if a required system cannot be connected I may continue without it or stop.",
  );
});

test("the Terms are subject to the required connections being verified, because they are accepted before any is made", () => {
  assert.match(TERMS_STATEMENT, /subject to/);
  assert.match(TERMS_STATEMENT, /No payment is taken before that connection is verified/);
});

test("every agreement says what happens when a person declines it, and each names that nothing was created", () => {
  for (const agreement of AGREEMENTS) {
    assert.ok(DECLINED[agreement].title.length > 0);
    assert.match(DECLINED[agreement].message, /Nothing was created\.$/);
  }
});

test("only the two agreements are agreements", () => {
  assert.ok(isAgreement("terms"));
  assert.ok(!isAgreement("declaration"));
  assert.ok(isAgreement("complianceAttested"));
  assert.ok(!isAgreement("password"));
});
