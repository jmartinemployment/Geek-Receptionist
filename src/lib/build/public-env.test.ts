import { test } from "node:test";
import assert from "node:assert/strict";
import { secretLookingPublicNames } from "./public-env";

test("a NEXT_PUBLIC_ name that looks like a secret is found", () => {
  const names = ["NEXT_PUBLIC_API_KEY", "NEXT_PUBLIC_SESSION_SECRET", "NEXT_PUBLIC_DB_PASSWORD", "NEXT_PUBLIC_ACCESS_TOKEN", "NEXT_PUBLIC_PRIVATE_KEY"];
  assert.deepEqual(secretLookingPublicNames(names), [...names].sort());
});

test("ordinary public names and server-only secrets are left alone", () => {
  assert.deepEqual(secretLookingPublicNames(["NEXT_PUBLIC_FROM_EMAIL", "GEEK_BACKEND_API_KEY", "RECAPTCHA_SECRET_KEY", "PATH"]), []);
});

test("only an allowed public name passes, and the allowance is by exact name", () => {
  const allowed = new Set(["NEXT_PUBLIC_MAPS_API_KEY"]);
  assert.deepEqual(secretLookingPublicNames(["NEXT_PUBLIC_MAPS_API_KEY"], allowed), []);
  assert.deepEqual(secretLookingPublicNames(["NEXT_PUBLIC_MAPS_API_KEY_2"], allowed), ["NEXT_PUBLIC_MAPS_API_KEY_2"]);
});

test("nothing is allowed by default", () => {
  assert.deepEqual(secretLookingPublicNames(["NEXT_PUBLIC_RECAPTCHA_SECRET_KEY"]), ["NEXT_PUBLIC_RECAPTCHA_SECRET_KEY"]);
});
