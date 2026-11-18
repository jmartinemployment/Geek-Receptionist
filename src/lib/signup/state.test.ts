import { test } from "node:test";
import assert from "node:assert/strict";
import { parseGates, parseSignup, signGates, stepOf, type Gate } from "./state";

const tenantId = "22222222-2222-2222-2222-222222222222";

test("each step follows from what is already done", () => {
  assert.equal(stepOf(null, new Set()), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["country", "healthcare"])), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["captcha"])), "country");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "healthcare"])), "country");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country"])), "healthcare");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare"])), "veterinary");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary"])), "securities_broker_dealer");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer"])), "investment_adviser");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser"])), "commodity_futures_derivatives");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives"])), "medicare_sales");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales"])), "telemarketing");
  // A later industry answered no does not let an earlier one be skipped.
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "telemarketing"])), "veterinary");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales", "telemarketing"])), "profession");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales", "telemarketing", "profession"])), "business");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales", "telemarketing", "profession", "professional"])), "addendum");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales", "telemarketing", "profession", "professional", "addendum"])), "business");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "healthcare", "veterinary", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_sales", "telemarketing", "professional", "addendum"])), "profession");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test" }, new Set<Gate>(["captcha", "country", "healthcare"])), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1", subscriptionApproved: false }, new Set<Gate>(["captcha", "country", "healthcare"])), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true }, new Set<Gate>(["captcha", "country", "healthcare"])), "payment_method");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1" }, new Set<Gate>(["captcha", "country", "healthcare"])), "number");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1", phoneNumber: "+15615550100" }, new Set<Gate>(["captcha", "country", "healthcare"])), "login");
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

test("a gates cookie only counts when this server signed it", () => {
  const signed = signGates(["captcha", "country"], "secret-one");
  assert.deepEqual([...parseGates(signed, "secret-one")], ["captcha", "country"]);
  assert.equal(parseGates(signed, "secret-two").size, 0);
  assert.equal(parseGates(signed.replace("captcha,country", "captcha,country,healthcare"), "secret-one").size, 0);
  assert.equal(parseGates("captcha.00", "secret-one").size, 0);
  assert.equal(parseGates("captcha", "secret-one").size, 0);
  assert.equal(parseGates(undefined, "secret-one").size, 0);
});
