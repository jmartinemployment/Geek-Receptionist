/**
 * The words a person agrees to at the end of the signup, and what is said when they decline (plans/attestation-and-terms.md). GeekAPI holds
 * the same statement (`SignupStatements` in OnboardingEligibility.cs) and refuses a signup whose
 * words differ from its own, so what is stored beside the person is what they were shown. Change both together.
 *
 * The Terms are accepted before any connection is made, so they say so on their face: "subject to" the required systems being
 * verified, no payment before that, and the business's own decision when a system cannot be connected (Jeff, 2026-11-21).
 */
export const TERMS_STATEMENT =
  "I agree to the Geek-Receptionist Subscription Terms, subject to Geek-Receptionist verifying a connection to each system the business requires. " +
  "No payment is taken before that connection is verified, and if a required system cannot be connected I may continue without it or stop.";

/** The existing disclosure about AI answering and recording. GeekAPI takes it as a plain yes, not as words, as before. */
export const AI_DISCLOSURE_STATEMENT = "Calls to this business may be answered and recorded by an AI receptionist that tells callers so.";

/** The two agreements, by the form field each is answered in. */
export const AGREEMENTS = ["complianceAttested", "terms"] as const;
export type Agreement = (typeof AGREEMENTS)[number];

/** What is said when a person answers No to an agreement: the signup stops, and nothing is created. */
export const DECLINED: Record<Agreement, { title: string; message: string }> = {
  complianceAttested: {
    title: "Callers are told it is an AI receptionist",
    message: "Geek-Receptionist answers calls with an AI receptionist that tells callers so, so it cannot be set up without this. Nothing was created.",
  },
  terms: {
    title: "The Terms were not accepted",
    message: "Geek-Receptionist cannot be set up without the Subscription Terms being accepted. Nothing was created.",
  },
};

export const isAgreement = (value: string): value is Agreement => (AGREEMENTS as readonly string[]).includes(value);
