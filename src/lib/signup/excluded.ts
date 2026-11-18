/**
 * The industries that cannot sign up, each asked about in its own question (Jeff, 2026-11-18: "more enforceable to ask each
 * separately"). The codes and the questions are the same ones GeekAPI holds (ExcludedIndustries); GeekAPI refuses an answer whose
 * question differs from its own, and stores every answer forever, so the two lists change together.
 * GeekBackend docs/Geek-Receptionist.md section 5, item 1.
 */
export const EXCLUDED_CODES = [
  "healthcare",
  "veterinary",
  "securities_broker_dealer",
  "investment_adviser",
  "commodity_futures_derivatives",
  "medicare_sales",
  "telemarketing",
] as const;

export type ExcludedCode = (typeof EXCLUDED_CODES)[number];

export const EXCLUDED_INDUSTRIES: Record<ExcludedCode, { question: string; dialogTitle: string; refusal: string }> = {
  healthcare: {
    question: "Is the business a healthcare business?",
    dialogTitle: "Not available for healthcare businesses",
    refusal: "Geek-Receptionist cannot be used by healthcare businesses. Healthcare businesses are HIPAA-covered entities, and we exclude them outright.",
  },
  veterinary: {
    question: "Is the business a veterinary business?",
    dialogTitle: "Not available for veterinary businesses",
    refusal: "Geek-Receptionist cannot be used by veterinary businesses. We exclude them outright.",
  },
  securities_broker_dealer: {
    question: "Is the business a securities broker-dealer?",
    dialogTitle: "Not available for securities broker-dealers",
    refusal: "Geek-Receptionist cannot be used by securities broker-dealers. We exclude them outright.",
  },
  investment_adviser: {
    question: "Is the business an investment adviser?",
    dialogTitle: "Not available for investment advisers",
    refusal: "Geek-Receptionist cannot be used by investment advisers. We exclude them outright.",
  },
  commodity_futures_derivatives: {
    question: "Is the business a commodity futures or derivatives business?",
    dialogTitle: "Not available for commodity futures or derivatives businesses",
    refusal: "Geek-Receptionist cannot be used by commodity futures or derivatives businesses. We exclude them outright.",
  },
  medicare_sales: {
    question: "Is the business a Medicare sales organization?",
    dialogTitle: "Not available for Medicare sales organizations",
    refusal: "Geek-Receptionist cannot be used by Medicare sales organizations. We exclude them outright.",
  },
  telemarketing: {
    question: "Is the business a telemarketing business?",
    dialogTitle: "Not available for telemarketing businesses",
    refusal: "Geek-Receptionist cannot be used by telemarketing businesses. We exclude them outright.",
  },
};

export const isExcludedCode = (value: unknown): value is ExcludedCode =>
  typeof value === "string" && (EXCLUDED_CODES as readonly string[]).includes(value);

/** One question as GeekAPI stores it: the industry, the words shown, and the answer. */
export type IndustryAnswer = { industry: ExcludedCode; question: string; answer: boolean };

/** The questions up to and including this one, each answered no except this one, which takes the answer given. */
export function answersThrough(code: ExcludedCode, answer: boolean): IndustryAnswer[] {
  const upTo = EXCLUDED_CODES.slice(0, EXCLUDED_CODES.indexOf(code) + 1);
  return upTo.map((industry) => ({ industry, question: EXCLUDED_INDUSTRIES[industry].question, answer: industry === code ? answer : false }));
}
