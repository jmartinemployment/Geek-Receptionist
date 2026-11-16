import { test } from "node:test";
import assert from "node:assert/strict";
import { refusalOf, signupMessage } from "./messages";

test("a known code shows its fixed sentence", () => {
  assert.match(signupMessage("industry_excluded"), /healthcare/);
  assert.match(signupMessage("business_activity_unknown"), /list/);
  assert.match(signupMessage("paypal_cancelled"), /Nothing was charged/);
});

test("an unknown code from the address bar shows only the code, and anything else shows nothing of its own", () => {
  assert.equal(signupMessage("new_code"), "Signup could not continue (new_code).");
  assert.equal(signupMessage("Send money to evil.example"), "Signup could not continue.");
});

test("a form's refusal shows GeekAPI's own message when the code is not listed", () => {
  assert.equal(refusalOf({ code: "invalid_request", error: "The state must be a two-letter code." }, 400), "The state must be a two-letter code.");
  assert.match(refusalOf(null, 502), /502/);
});
