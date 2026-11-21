import { test } from "node:test";
import assert from "node:assert/strict";
import { EXCLUDED_CODES, EXCLUDED_GROUPS, EXCLUDED_INDUSTRIES, industryAnswers, isExcludedCode } from "./excluded";

test("there are eight questions for the five excluded industries, each with its own code, in the order GeekAPI holds them", () => {
  assert.deepEqual([...EXCLUDED_CODES], [
    "hipaa_healthcare_provider",
    "hipaa_health_plan",
    "hipaa_clearinghouse",
    "hipaa_business_associate",
    "securities_broker_dealer",
    "investment_adviser",
    "commodity_futures_derivatives",
    "medicare_tpmo",
  ]);
  assert.deepEqual(EXCLUDED_CODES.map((code) => EXCLUDED_INDUSTRIES[code].question), [
    "Is the business a healthcare provider?",
    "Is the business a health insurer, HMO or other health plan?",
    "Is the business a healthcare clearinghouse?",
    "Does the business handle patient health information for a healthcare provider or health plan?",
    "Is the business a securities broker-dealer?",
    "Is the business an investment adviser?",
    "Is the business a commodity futures or derivatives business?",
    "Is the business a Third-Party Marketing Organization (TPMO) involved in Medicare Advantage or Part D marketing and sales?",
  ]);
});

test("all eight answers are sent in GeekAPI's order, a yes for each industry named and a no for every other", () => {
  const sent = industryAnswers(new Set(["investment_adviser", "hipaa_health_plan"]));
  assert.deepEqual(sent.map((a) => a.industry), [...EXCLUDED_CODES]);
  assert.deepEqual(sent.filter((a) => a.answer).map((a) => a.industry), ["hipaa_health_plan", "investment_adviser"]);
  assert.ok(sent.every((a) => a.question === EXCLUDED_INDUSTRIES[a.industry].question));
});

test("no yes at all is all eight answered no", () => {
  const all = industryAnswers(new Set());
  assert.equal(all.length, 8);
  assert.ok(all.every((a) => a.answer === false));
});

test("the three headings hold every industry exactly once, in the order GeekAPI holds them", () => {
  assert.deepEqual(EXCLUDED_GROUPS.map((g) => g.heading), ["Healthcare", "Financial services", "Medicare"]);
  assert.deepEqual(EXCLUDED_GROUPS.flatMap((g) => [...g.codes]), [...EXCLUDED_CODES]);
});

test("only the eight codes are industries", () => {
  assert.ok(isExcludedCode("medicare_tpmo"));
  assert.ok(isExcludedCode("hipaa_business_associate"));
  assert.ok(!isExcludedCode("hipaa"));
  assert.ok(!isExcludedCode("veterinary"));
  assert.ok(!isExcludedCode("telemarketing"));
  assert.ok(!isExcludedCode("astrology"));
  assert.ok(!isExcludedCode(undefined));
});
