/**
 * The languages a receptionist can be set to speak. GeekAPI holds the same codes in `ReceptionistLanguages`, together with every
 * sentence a caller hears in each one; change both together.
 *
 * Only the languages whose caller-facing wording has been reviewed are here, and that is the point rather than a limitation. Two of
 * those sentences are the consent disclosure, reviewed under Fla. Stat. 934.03, so a language is offerable only once it has them.
 * Jeff, 2026-11-20, on offering the conversation in a language whose consent gate was still English: "Thats lame, and one could claim
 * one didn't understand." A disclosure the caller did not understand is worse than none, because it leaves a record that looks like
 * one — so this list grows by a reviewed translation, never by a locale code.
 *
 * There is deliberately no signup step for this yet. One reviewed language is not a choice, and a step whose only option is the one
 * already stored asks a visitor to confirm something they cannot change. The column is stored and defaulted regardless, so the step
 * is additive when a second language arrives: add the entry here and in GeekAPI, then the question is worth asking.
 */
export const RECEPTIONIST_LANGUAGES = [{ code: "en-US", name: "English (United States)" }] as const;

export type ReceptionistLanguage = (typeof RECEPTIONIST_LANGUAGES)[number]["code"];

/** ConversationRelay's own default for an unset language attribute, and this product's. */
export const DEFAULT_LANGUAGE: ReceptionistLanguage = "en-US";

export function isReceptionistLanguage(value: unknown): value is ReceptionistLanguage {
  return typeof value === "string" && RECEPTIONIST_LANGUAGES.some((l) => l.code === value);
}

/** The words shown when a language could not be saved. GeekAPI's codes, each in plain words. */
export function describeLanguageFailure(code: string | null, message: string | null): string {
  switch (code) {
    case "language_not_offered":
      return "Your receptionist cannot be set to that language yet. We only offer a language once everything it says to a caller — including the recording notice — has been reviewed in it.";
    case "invalid_request":
      return "That could not be read. Reload the page and try again.";
    case "not_found":
      return "This account could not be found. Sign in again.";
    default:
      return message ?? "The language could not be changed. Nothing was altered; try again in a moment.";
  }
}
