import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { CONFIG_STEPS, parseGates, parseSignup, parseWho, signGates, signWho, stepOf, withConfigStepDone, type Gate } from "./state";

const tenantId = "22222222-2222-2222-2222-222222222222";

test("each step follows from what is already done", () => {
  const all = new Set<Gate>(["captcha", "who", "country", "industries"]);
  assert.equal(stepOf(null, new Set()), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["who", "country", "industries"])), "captcha");
  // Who the visitor is comes straight after the robot check, before any question about the business.
  assert.equal(stepOf(null, new Set<Gate>(["captcha"])), "who");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "country", "industries"])), "who");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "who"])), "country");
  // The eight industry answers are one gate: a later gate does not let an earlier one be skipped.
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "who", "industries"])), "country");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "who", "country"])), "industries");
  assert.equal(stepOf(null, all), "business");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test" }, all), "greeting");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1", subscriptionApproved: false }, all), "greeting");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", configDone: CONFIG_STEPS.slice(), subscriptionApproved: false }, new Set<Gate>()), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true }, all), "payment_method");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1" }, all), "number");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1", phoneNumber: "+15615550100" }, all), "login");
});

test("who the visitor said they are is signed, and a forged or altered value reads as nobody", () => {
  const who = {
    firstName: "Pat", middleInitial: "", lastName: "Rivera", address: "9 Ocean Blvd", city: "Delray Beach", state: "FL", zip: "33444", phone: "(561) 555-0199", email: "pat@example.test",
    businessName: "Boca Cool HVAC", businessAddress: "12 Palm Way", businessCity: "Boca Raton", businessState: "FL", businessZip: "33432", businessPhone: "(561) 555-0101", businessEmail: "office@bocacool.example",
  };
  const signed = signWho(who, "secret-one");
  assert.deepEqual(parseWho(signed, "secret-one"), who);
  assert.equal(parseWho(signed, "secret-two"), null);
  assert.equal(parseWho(undefined, "secret-one"), null);
  assert.equal(parseWho("nodot", "secret-one"), null);
  const dot = signed.lastIndexOf(".");
  const forged = Buffer.from(JSON.stringify({ ...who, firstName: "Someone" }), "utf8").toString("base64url") + signed.slice(dot);
  assert.equal(parseWho(forged, "secret-one"), null);
  // Validly signed, but not sixteen pieces of text.
  const partial = Buffer.from(JSON.stringify({ firstName: "Pat" }), "utf8").toString("base64url");
  const sig = createHmac("sha256", "secret-one").update(partial).digest("hex");
  assert.equal(parseWho(`${partial}.${sig}`, "secret-one"), null);
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
