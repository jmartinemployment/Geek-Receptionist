import { test } from "node:test";
import assert from "node:assert/strict";
import { EXCLUDED_CODES, EXCLUDED_INDUSTRIES, answersThrough, isExcludedCode } from "./excluded";

test("there are five excluded industries, each with its own question, in the order GeekAPI holds them", () => {
  assert.deepEqual([...EXCLUDED_CODES], [
    "hipaa",
    "securities_broker_dealer",
    "investment_adviser",
    "commodity_futures_derivatives",
    "medicare_tpmo",
  ]);
  assert.deepEqual(EXCLUDED_CODES.map((code) => EXCLUDED_INDUSTRIES[code].question), [
    "Is the business a HIPAA covered entity or business associate, such as a healthcare provider, health plan or a business that handles patient health information for one?",
    "Is the business a securities broker-dealer?",
    "Is the business an investment adviser?",
    "Is the business a commodity futures or derivatives business?",
    "Is the business a Third-Party Marketing Organization (TPMO) involved in Medicare Advantage or Part D marketing and sales?",
  ]);
});

test("a yes is sent with the noes before it and nothing after it", () => {
  assert.deepEqual(answersThrough("investment_adviser", true), [
    { industry: "hipaa", question: "Is the business a HIPAA covered entity or business associate, such as a healthcare provider, health plan or a business that handles patient health information for one?", answer: false },
    { industry: "securities_broker_dealer", question: "Is the business a securities broker-dealer?", answer: false },
    { industry: "investment_adviser", question: "Is the business an investment adviser?", answer: true },
  ]);
});

test("the last question answered no is all five answered no", () => {
  const all = answersThrough("medicare_tpmo", false);
  assert.equal(all.length, 5);
  assert.ok(all.every((a) => a.answer === false));
});

test("only the five codes are industries", () => {
  assert.ok(isExcludedCode("medicare_tpmo"));
  assert.ok(!isExcludedCode("veterinary"));
  assert.ok(!isExcludedCode("telemarketing"));
  assert.ok(!isExcludedCode("astrology"));
  assert.ok(!isExcludedCode(undefined));
});
