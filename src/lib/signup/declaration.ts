/**
 * What a person accepts when the signup creates their business, as one sentence with two documents named in it (Jeff, 2026-11-22: a
 * standard SaaS acceptance; the long "subject to" Terms and the sheet that showed them are gone). The sentence is held as the parts
 * around its two links so the screen can link them, and `TERMS_STATEMENT` is those parts joined, which is the exact words GeekAPI holds
 * (`SignupStatements.Terms` in OnboardingEligibility.cs) and refuses any other of, so what is stored beside the person is what they
 * were shown. Change both together.
 *
 * The documents are the ones geekatyourspot.com already publishes. They do not yet say anything about a subscription, its billing or
 * refunds; Subscription Terms are still to be written, and when they are, only the two addresses here change.
 */
export const TERMS_URL = "https://geekatyourspot.com/terms-and-conditions";
export const PRIVACY_URL = "https://geekatyourspot.com/privacy-policy";

export const TERMS_PARTS = {
  before: "By continuing, I agree to the ",
  between: " and the ",
  after: " of Geek @ Your Spot LLC, and that calls to this business may be answered by an AI receptionist that tells callers so.",
} as const;

export const TERMS_STATEMENT = `${TERMS_PARTS.before}Terms of Service${TERMS_PARTS.between}Privacy Policy${TERMS_PARTS.after}`;
