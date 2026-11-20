import assert from "node:assert/strict";
import { test } from "node:test";

import {
  DEFAULT_LANGUAGE,
  RECEPTIONIST_LANGUAGES,
  describeLanguageFailure,
  isReceptionistLanguage,
} from "./languages";

test("the default is one of the offered languages", () => {
  assert.ok(isReceptionistLanguage(DEFAULT_LANGUAGE));
});

test("the default is ConversationRelay's own default, so storing it changes no call", () => {
  assert.equal(DEFAULT_LANGUAGE, "en-US");
});

test("every offered language has a code and a name a business would recognise", () => {
  assert.ok(RECEPTIONIST_LANGUAGES.length > 0);
  for (const language of RECEPTIONIST_LANGUAGES) {
    assert.match(language.code, /^[a-z]{2}-[A-Z]{2}$/);
    assert.ok(language.name.trim().length > 0);
  }
});

test("a locale we have no reviewed wording for is not an offered language", () => {
  for (const code of ["es-ES", "fr-FR", "en-GB", "multi", "", "en", "xx-XX"]) {
    assert.equal(isReceptionistLanguage(code), false, code);
  }
});

test("the refusal explains that a language waits on its wording, not on the software", () => {
  const message = describeLanguageFailure("language_not_offered", null);
  assert.match(message, /reviewed/);
  assert.ok(!message.includes("undefined"));
});

test("an unknown code falls back to GeekAPI's own message, and to a sentence when there is none", () => {
  assert.equal(describeLanguageFailure("something_new", "GeekAPI said this."), "GeekAPI said this.");
  assert.match(describeLanguageFailure(null, null), /Nothing was altered/);
});
