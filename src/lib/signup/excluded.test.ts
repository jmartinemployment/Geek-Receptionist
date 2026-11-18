import { test } from "node:test";
import assert from "node:assert/strict";
import { EXCLUDED_CODES, EXCLUDED_INDUSTRIES, answersThrough, isExcludedCode } from "./excluded";

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
    "Is the business a health plan?",
    "Is the business a healthcare clearinghouse?",
    "Does the business handle patient health information for a healthcare provider or health plan?",
    "Is the business a securities broker-dealer?",
    "Is the business an investment adviser?",
    "Is the business a commodity futures or derivatives business?",
    "Is the business a Third-Party Marketing Organization (TPMO) involved in Medicare Advantage or Part D marketing and sales?",
  ]);
});

test("a yes is sent with the noes before it and nothing after it", () => {
  assert.deepEqual(answersThrough("investment_adviser", true), [
    { industry: "hipaa_healthcare_provider", question: "Is the business a healthcare provider?", answer: false },
    { industry: "hipaa_health_plan", question: "Is the business a health plan?", answer: false },
    { industry: "hipaa_clearinghouse", question: "Is the business a healthcare clearinghouse?", answer: false },
    { industry: "hipaa_business_associate", question: "Does the business handle patient health information for a healthcare provider or health plan?", answer: false },
    { industry: "securities_broker_dealer", question: "Is the business a securities broker-dealer?", answer: false },
    { industry: "investment_adviser", question: "Is the business an investment adviser?", answer: true },
  ]);
});

test("the last question answered no is all eight answered no", () => {
  const all = answersThrough("medicare_tpmo", false);
  assert.equal(all.length, 8);
  assert.ok(all.every((a) => a.answer === false));
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
