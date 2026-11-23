/** Words that make a variable name a secret. A `NEXT_PUBLIC_` variable is inlined into the JavaScript every visitor downloads. */
const SECRET_WORDS = ["SECRET", "PASSWORD", "TOKEN", "PRIVATE", "API_KEY", "APIKEY", "CREDENTIAL"];

/** Public by design, so a name here may carry one of the words above. Add an exact name only with the reason beside it. None needs it today. */
export const PUBLIC_ALLOWED: ReadonlySet<string> = new Set<string>();

/** Every `NEXT_PUBLIC_` name that looks like a secret and is not allowed. */
export function secretLookingPublicNames(names: Iterable<string>, allowed: ReadonlySet<string> = PUBLIC_ALLOWED): string[] {
  const found: string[] = [];
  for (const name of names) {
    if (!name.startsWith("NEXT_PUBLIC_")) continue;
    if (allowed.has(name)) continue;
    if (SECRET_WORDS.some((word) => name.includes(word))) found.push(name);
  }
  return found.sort();
}
