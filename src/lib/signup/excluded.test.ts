import { test } from "node:test";
import assert from "node:assert/strict";
import { EXCLUDED_CODES, EXCLUDED_INDUSTRIES, answersThrough, isExcludedCode } from "./excluded";

test("there are seven excluded industries, each with its own question, in the order GeekAPI holds them", () => {
  assert.deepEqual([...EXCLUDED_CODES], [
    "healthcare",
    "veterinary",
    "securities_broker_dealer",
    "investment_adviser",
    "commodity_futures_derivatives",
    "medicare_sales",
    "telemarketing",
  ]);
  assert.deepEqual(EXCLUDED_CODES.map((code) => EXCLUDED_INDUSTRIES[code].question), [
    "Is the business a healthcare business?",
    "Is the business a veterinary business?",
    "Is the business a securities broker-dealer?",
    "Is the business an investment adviser?",
    "Is the business a commodity futures or derivatives business?",
    "Is the business a Medicare sales organization?",
    "Is the business a telemarketing business?",
  ]);
});

test("a yes is sent with the noes before it and nothing after it", () => {
  assert.deepEqual(answersThrough("securities_broker_dealer", true), [
    { industry: "healthcare", question: "Is the business a healthcare business?", answer: false },
    { industry: "veterinary", question: "Is the business a veterinary business?", answer: false },
    { industry: "securities_broker_dealer", question: "Is the business a securities broker-dealer?", answer: true },
  ]);
});

test("the last question answered no is all seven answered no", () => {
  const all = answersThrough("telemarketing", false);
  assert.equal(all.length, 7);
  assert.ok(all.every((a) => a.answer === false));
});

test("only the seven codes are industries", () => {
  assert.ok(isExcludedCode("medicare_sales"));
  assert.ok(!isExcludedCode("astrology"));
  assert.ok(!isExcludedCode(undefined));
});
