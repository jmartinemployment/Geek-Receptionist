/**
 * The industries that cannot sign up, each asked about in its own question (Jeff, 2026-11-18: "more enforceable to ask each
 * separately"). Separately means its own answer, not its own screen: since 2026-11-21 the eight share one screen under three headings
 * (Jeff: eight screens of "do not" were an intimidating list), and each is still its own yes or no, sent and kept as its own answer.
 * Exactly these five (Jeff, 2026-11-18); veterinary and telemarketing are no longer excluded.
 * HIPAA is asked as four questions, one each (Jeff, 2026-11-18), so the five industries are eight questions; the single `hipaa`
 * question is retired, and GeekAPI accepts only these eight. The codes and the questions are the same ones GeekAPI holds (ExcludedIndustries); GeekAPI refuses an answer whose
 * question differs from its own, and stores every answer forever, so the two lists change together.
 * GeekBackend docs/Geek-Receptionist.md section 5, item 1.
 */
export const EXCLUDED_CODES = [
  "hipaa_healthcare_provider",
  "hipaa_health_plan",
  "hipaa_clearinghouse",
  "hipaa_business_associate",
  "securities_broker_dealer",
  "investment_adviser",
  "commodity_futures_derivatives",
  "medicare_tpmo",
] as const;

export type ExcludedCode = (typeof EXCLUDED_CODES)[number];

export const EXCLUDED_INDUSTRIES: Record<ExcludedCode, { question: string; dialogTitle: string; refusal: string }> = {
  hipaa_healthcare_provider: {
    question: "Is the business a healthcare provider?",
    dialogTitle: "Not available for healthcare providers",
    refusal: "Geek-Receptionist cannot be used by healthcare providers. We exclude them outright.",
  },
  hipaa_health_plan: {
    question: "Is the business a health insurer, HMO or other health plan?",
    dialogTitle: "Not available for health insurers, HMOs or health plans",
    refusal: "Geek-Receptionist cannot be used by health insurers, HMOs or other health plans. We exclude them outright.",
  },
  hipaa_clearinghouse: {
    question: "Is the business a healthcare clearinghouse?",
    dialogTitle: "Not available for healthcare clearinghouses",
    refusal: "Geek-Receptionist cannot be used by healthcare clearinghouses. We exclude them outright.",
  },
  hipaa_business_associate: {
    question: "Does the business handle patient health information for a healthcare provider or health plan?",
    dialogTitle: "Not available for HIPAA business associates",
    refusal: "Geek-Receptionist cannot be used by businesses that handle patient health information for a healthcare provider or health plan. We exclude them outright.",
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

/**
 * The headings the form shows the eight questions under, in the order GeekAPI holds them. Every code is in exactly one group: three
 * headings read as three things where eight screens read as eight.
 */
export const EXCLUDED_GROUPS: readonly { heading: string; codes: readonly ExcludedCode[] }[] = [
  { heading: "Healthcare", codes: ["hipaa_healthcare_provider", "hipaa_health_plan", "hipaa_clearinghouse", "hipaa_business_associate"] },
  { heading: "Financial services", codes: ["securities_broker_dealer", "investment_adviser", "commodity_futures_derivatives"] },
  { heading: "Medicare", codes: ["medicare_tpmo"] },
];

/** All eight questions as GeekAPI stores them, in its order: a yes for each industry named, a no for every other. */
export function industryAnswers(yes: ReadonlySet<ExcludedCode>): IndustryAnswer[] {
  return EXCLUDED_CODES.map((industry) => ({ industry, question: EXCLUDED_INDUSTRIES[industry].question, answer: yes.has(industry) }));
}
