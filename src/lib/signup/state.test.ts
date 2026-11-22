import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { CONFIG_STEPS, parseCompany, parseGates, parseSignup, parseWho, signCompany, signGates, signWho, stepOf, withConfigStepDone, type Gate } from "./state";

const tenantId = "22222222-2222-2222-2222-222222222222";

test("each step follows from what is already done", () => {
  const all = new Set<Gate>(["captcha", "who", "company"]);
  assert.equal(stepOf(null, new Set()), "captcha");
  assert.equal(stepOf(null, new Set<Gate>(["who", "company"])), "captcha");
  // Who the visitor is comes straight after the robot check, then their business, before any question about eligibility.
  assert.equal(stepOf(null, new Set<Gate>(["captcha"])), "who");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "company"])), "who");
  assert.equal(stepOf(null, new Set<Gate>(["captcha", "who"])), "company");
  // The country question and the eight sectors are one screen with no gate: answering them creates the business, and the signup state says so.
  assert.equal(stepOf(null, all), "industries");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test" }, all), "recording");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionId: "I-1", subscriptionApproved: false }, all), "recording");
  // The Terms come after the six setup steps and before the plan, and nothing is chosen until they are accepted.
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", configDone: CONFIG_STEPS.slice(), subscriptionApproved: false }, new Set<Gate>()), "terms");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", configDone: CONFIG_STEPS.slice(), termsAccepted: true, subscriptionApproved: false }, new Set<Gate>()), "plan");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true }, all), "payment_method");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1" }, all), "number");
  assert.equal(stepOf({ tenantId, contactEmail: "o@example.test", subscriptionApproved: true, vaultTokenId: "T1", phoneNumber: "+15615550100" }, all), "login");
});

test("termsAccepted survives the cookie and only a literal true counts", () => {
  const read = (extra: object) => parseSignup(JSON.stringify({ tenantId, contactEmail: "o@example.test", ...extra }));
  assert.equal(read({ termsAccepted: true })?.termsAccepted, true);
  assert.equal(read({ termsAccepted: "yes" })?.termsAccepted, false);
  assert.equal(read({})?.termsAccepted, false);
});

const person = { firstName: "Pat", middleInitial: "", lastName: "Rivera", address: "9 Ocean Blvd", city: "Delray Beach", state: "FL", zip: "33444", phone: "(561) 555-0199", email: "pat@example.test" };
const business = {
  businessName: "Boca Cool HVAC", businessDescription: "Heating and air conditioning", businessAddress: "12 Palm Way", businessCity: "Boca Raton", businessState: "FL", businessZip: "33432",
  businessPhone: "(561) 555-0101", businessEmail: "office@bocacool.example", businessWebsite: "https://bocacool.example",
};

test("who the visitor said they are is signed, and a forged or altered value reads as nobody", () => {
  const signed = signWho(person, "secret-one");
  assert.deepEqual(parseWho(signed, "secret-one"), person);
  assert.equal(parseWho(signed, "secret-two"), null);
  assert.equal(parseWho(undefined, "secret-one"), null);
  assert.equal(parseWho("nodot", "secret-one"), null);
  const dot = signed.lastIndexOf(".");
  const forged = Buffer.from(JSON.stringify({ ...person, firstName: "Someone" }), "utf8").toString("base64url") + signed.slice(dot);
  assert.equal(parseWho(forged, "secret-one"), null);
  // Validly signed, but not nine pieces of text.
  const partial = Buffer.from(JSON.stringify({ firstName: "Pat" }), "utf8").toString("base64url");
  const sig = createHmac("sha256", "secret-one").update(partial).digest("hex");
  assert.equal(parseWho(`${partial}.${sig}`, "secret-one"), null);
});

test("the business is signed apart from the person, and one cookie can never be read as the other", () => {
  const signed = signCompany(business, "secret-one");
  assert.deepEqual(parseCompany(signed, "secret-one"), business);
  assert.equal(parseCompany(signed, "secret-two"), null);
  assert.equal(parseCompany(undefined, "secret-one"), null);
  // Each is validly signed but is not the other's eight or nine fields.
  assert.equal(parseWho(signed, "secret-one"), null);
  assert.equal(parseCompany(signWho(person, "secret-one"), "secret-one"), null);
});

test("the receptionist questions are asked in order, each once, and only before anything is paid", () => {
  const base = { tenantId, contactEmail: "o@example.test" };
  const none = new Set<Gate>();

  const order = ["recording", "schedule", "crew", "hours", "questions", "knowledge", "messages", "greeting"] as const;
  order.forEach((step, i) => assert.equal(stepOf({ ...base, configDone: order.slice(0, i) as unknown as typeof CONFIG_STEPS[number][] }, none), step));
  assert.deepEqual([...CONFIG_STEPS], [...order]);

  // A later step answered does not let an earlier one be skipped.
  assert.equal(stepOf({ ...base, configDone: ["messages", "knowledge"] }, none), "recording");

  // Once a subscription is approved GeekAPI refuses these answers, so a visitor is never sent back to them with nowhere to go.
  assert.equal(stepOf({ ...base, subscriptionApproved: true }, none), "payment_method");
});

test("one step answered twice is still one step done", () => {
  const state = { tenantId, contactEmail: "o@example.test", configDone: ["hours" as const] };
  assert.deepEqual(withConfigStepDone(state, "hours").configDone, ["hours"]);
  assert.deepEqual(withConfigStepDone(state, "questions").configDone, ["hours", "questions"]);
  assert.deepEqual(withConfigStepDone({ tenantId, contactEmail: "o@example.test" }, "hours").configDone, ["hours"]);
});

test("only steps this app asks are read back from the cookie", () => {
  const state = parseSignup(JSON.stringify({ tenantId, contactEmail: "o@example.test", configDone: ["hours", "greeting", "transfer", 7] }));
  // In the order they are asked, never the order the cookie happened to list, and nothing this app does not ask.
  assert.deepEqual(state?.configDone, ["hours", "greeting"]);
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
  const signed = signGates(["captcha", "company"], "secret-one");
  assert.deepEqual([...parseGates(signed, "secret-one")], ["captcha", "company"]);
  assert.equal(parseGates(signed, "secret-two").size, 0);
  assert.equal(parseGates(signed.replace("captcha,company", "captcha,company,healthcare"), "secret-one").size, 0);
  assert.equal(parseGates("captcha.00", "secret-one").size, 0);
  assert.equal(parseGates("captcha", "secret-one").size, 0);
  assert.equal(parseGates(undefined, "secret-one").size, 0);
});
