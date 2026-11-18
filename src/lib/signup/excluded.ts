/**
 * The industries that cannot sign up, each asked about in its own question (Jeff, 2026-11-18: "more enforceable to ask each
 * separately"). Exactly these five (Jeff, 2026-11-18); veterinary and telemarketing are no longer excluded. The codes and the questions are the same ones GeekAPI holds (ExcludedIndustries); GeekAPI refuses an answer whose
 * question differs from its own, and stores every answer forever, so the two lists change together.
 * GeekBackend docs/Geek-Receptionist.md section 5, item 1.
 */
export const EXCLUDED_CODES = [
  "hipaa",
  "securities_broker_dealer",
  "investment_adviser",
  "commodity_futures_derivatives",
  "medicare_tpmo",
] as const;

export type ExcludedCode = (typeof EXCLUDED_CODES)[number];

export const EXCLUDED_INDUSTRIES: Record<ExcludedCode, { question: string; dialogTitle: string; refusal: string }> = {
  hipaa: {
    question: "Is the business a HIPAA covered entity or business associate, such as a healthcare provider, health plan or a business that handles patient health information for one?",
    dialogTitle: "Not available for HIPAA covered entities or business associates",
    refusal: "Geek-Receptionist cannot be used by HIPAA covered entities or business associates. We exclude them outright.",
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
  medicare_tpmo: {
    question: "Is the business a Third-Party Marketing Organization (TPMO) involved in Medicare Advantage or Part D marketing and sales?",
    dialogTitle: "Not available for Medicare Advantage or Part D TPMOs",
    refusal: "Geek-Receptionist cannot be used by Third-Party Marketing Organizations (TPMOs) involved in Medicare Advantage or Part D marketing and sales. We exclude them outright.",
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
