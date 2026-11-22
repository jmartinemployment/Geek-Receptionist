import { test } from "node:test";
import assert from "node:assert/strict";
import { PRIVACY_URL, TERMS_PARTS, TERMS_STATEMENT, TERMS_URL } from "./declaration";

test("the statement is the exact words GeekAPI holds", () => {
  assert.equal(
    TERMS_STATEMENT,
    "By continuing, I agree to the Terms of Service and the Privacy Policy of Geek @ Your Spot LLC, and that calls to this business may be answered by an AI receptionist that tells callers so.",
  );
});

test("the statement names the company and the AI receptionist, and no longer says 'subject to'", () => {
  assert.match(TERMS_STATEMENT, /Geek @ Your Spot LLC/);
  assert.match(TERMS_STATEMENT, /AI receptionist/);
  assert.doesNotMatch(TERMS_STATEMENT, /subject to/);
});

test("the parts around the two links join back into the statement", () => {
  assert.equal(`${TERMS_PARTS.before}Terms of Service${TERMS_PARTS.between}Privacy Policy${TERMS_PARTS.after}`, TERMS_STATEMENT);
});

test("both documents are real https addresses", () => {
  for (const address of [TERMS_URL, PRIVACY_URL]) assert.equal(new URL(address).protocol, "https:");
});
