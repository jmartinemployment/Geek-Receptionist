/**
 * The professional services addendum: what a legal, accounting, tax, payroll, finance, insurance or education business agrees to before
 * its signup goes on. The signup asks the question and shows this as its own step; GeekAPI decides again from what the business does
 * when the business is submitted, and refuses one that needs the addendum and has not agreed to it (addendum_required).
 */
export const ADDENDUM_QUESTION = "Is the business a legal, accounting, tax, payroll, finance, insurance or education business?";

export const ADDENDUM_TITLE = "Professional services addendum";

/** The addendum's paragraphs, as shown above its checkbox. */
export const ADDENDUM_TERMS: readonly string[] = [
  "The receptionist is an AI. It answers calls to this business, takes messages and records calls, and tells callers that it is an AI. It does not give legal, accounting, tax, financial, insurance or educational advice, and this business will not rely on it for any.",
  "This business stays responsible for its own professional, confidentiality and record-keeping duties to its clients, students and regulators, including whether its calls may be answered by an AI and recorded.",
  "This business will not use the receptionist to take privileged, confidential or regulated information beyond what is needed to pass on a message.",
];

export const ADDENDUM_AGREEMENT = "I have read this addendum and agree to it for this business.";
