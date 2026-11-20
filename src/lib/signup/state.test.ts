import { test } from "node:test";
import assert from "node:assert/strict";
import { CONFIG_STEPS, parseGates, parseSignup, signGates, stepOf, withConfigStepDone, type Gate } from "./state";

const tenantId = "22222222-2222-2222-2222-222222222222";

test("each step follows from what is already done", () => {
  assert.equal(stepOf(null, new Set()), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["country", "hipaa_healthcare_provider"])), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["captcha"])), "country");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "hipaa_healthcare_provider"])), "country");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country"])), "hipaa_healthcare_provider");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan"])), "hipaa_clearinghouse");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate"])), "securities_broker_dealer");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate", "securities_broker_dealer"])), "investment_adviser");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate", "securities_broker_dealer", "investment_adviser"])), "commodity_futures_derivatives");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives"])), "medicare_tpmo");
  // A later industry answered no does not let an earlier one be skipped.
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate", "medicare_tpmo"])), "securities_broker_dealer");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate", "securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives", "medicare_tpmo"])), "business");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test" }, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider"])), "greeting");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1", subscriptionApproved: false }, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider"])), "greeting");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", configDone: CONFIG_STEPS.slice(), subscriptionApproved: false }, new Set<Gate>()), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true }, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider"])), "payment_method");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1" }, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider"])), "number");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1", phoneNumber: "+15615550100" }, new Set<Gate>(["captcha", "country", "hipaa_healthcare_provider"])), "login");
});

test("the receptionist questions are asked in order, each once, and only before anything is paid", () => {
  const base = { tenantId, contactEmail: "o@example.test" };
  const none = new Set<Gate>();

  assert.equal(stepOf({ ...base, configDone: [] }, none), "greeting");
  assert.equal(stepOf({ ...base, configDone: ["greeting"] }, none), "hours");
  assert.equal(stepOf({ ...base, configDone: ["greeting", "hours"] }, none), "questions");
  assert.equal(stepOf({ ...base, configDone: ["greeting", "hours", "questions"] }, none), "knowledge");
  assert.equal(stepOf({ ...base, configDone: ["greeting", "hours", "questions", "knowledge"] }, none), "messages");
  assert.equal(stepOf({ ...base, configDone: ["greeting", "hours", "questions", "knowledge", "messages"] }, none), "appointments");

  // A later step answered does not let an earlier one be skipped.
  assert.equal(stepOf({ ...base, configDone: ["messages", "knowledge"] }, none), "greeting");

  // Once a subscription is approved GeekAPI refuses these answers, so a visitor is never sent back to them with nowhere to go.
  assert.equal(stepOf({ ...base, subscriptionApproved: true }, none), "payment_method");
});

test("one step answered twice is still one step done", () => {
  const state = { tenantId, contactEmail: "o@example.test", configDone: ["greeting" as const] };
  assert.deepEqual(withConfigStepDone(state, "greeting").configDone, ["greeting"]);
  assert.deepEqual(withConfigStepDone(state, "hours").configDone, ["greeting", "hours"]);
  assert.deepEqual(withConfigStepDone({ tenantId, contactEmail: "o@example.test" }, "hours").configDone, ["hours"]);
});

test("only steps this app asks are read back from the cookie", () => {
  const state = parseSignup(JSON.stringify({ tenantId, contactEmail: "o@example.test", configDone: ["hours", "greeting", "transfer", 7] }));
  // In the order they are asked, never the order the cookie happened to list, and nothing this app does not ask.
  assert.deepEqual(state?.configDone, ["greeting", "hours"]);
  assert.equal(parseSignup(JSON.stringify({ tenantId, contactEmail: "o@example.test", configDone: "greeting" }))?.configDone, undefined);
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
