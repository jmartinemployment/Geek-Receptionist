import { secretLookingPublicNames } from "../src/lib/build/public-env";

/** Fails the build when any NEXT_PUBLIC_ variable in this build's environment is named like a secret. Names only: no value is read or printed. */
const bad = secretLookingPublicNames(Object.keys(process.env));
if (bad.length > 0) {
  console.error(`[check-public-env] These NEXT_PUBLIC_ variables are named like secrets and would be shipped to every visitor's browser: ${bad.join(", ")}.`);
  console.error("[check-public-env] Rename them without the NEXT_PUBLIC_ prefix, or, if one is public by design, add its exact name to PUBLIC_ALLOWED with the reason.");
  process.exit(1);
}
console.log("[check-public-env] ok: no NEXT_PUBLIC_ variable is named like a secret");
