import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { captchaSiteKey, verifyCaptcha } from "./captcha";

const realFetch = globalThis.fetch;
let sent: { url: string; body: URLSearchParams }[] = [];

function google(status: number, body: unknown) {
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    sent.push({ url: String(input), body: init?.body as URLSearchParams });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
}

describe("the reCAPTCHA check", () => {
  beforeEach(() => {
    sent = [];
    process.env.RECAPTCHA_SITE_KEY = "site-key";
    process.env.RECAPTCHA_SECRET_KEY = "secret-key";
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    delete process.env.RECAPTCHA_SITE_KEY;
    delete process.env.RECAPTCHA_SECRET_KEY;
  });

  it("asks Google once with the secret, the answer and the visitor's address, and passes what Google passes", async () => {
    google(200, { success: true });

    assert.equal(await verifyCaptcha("token-1", "203.0.113.9"), "ok");
    assert.equal(sent.length, 1);
    assert.equal(sent[0].url, "https://www.google.com/recaptcha/api/siteverify");
    assert.equal(sent[0].body.get("secret"), "secret-key");
    assert.equal(sent[0].body.get("response"), "token-1");
    assert.equal(sent[0].body.get("remoteip"), "203.0.113.9");
  });

  it("fails what Google fails", async () => {
    google(200, { success: false, "error-codes": ["timeout-or-duplicate"] });
    assert.equal(await verifyCaptcha("token-1", null), "captcha_failed");
  });

  it("fails an unticked box without asking Google", async () => {
    google(200, { success: true });
    assert.equal(await verifyCaptcha(null, null), "captcha_failed");
    assert.equal(await verifyCaptcha("", null), "captcha_failed");
    assert.equal(sent.length, 0);
  });

  for (const unset of ["RECAPTCHA_SITE_KEY", "RECAPTCHA_SECRET_KEY"]) {
    it(`refuses, never passes, when ${unset} is not set`, async () => {
      delete process.env[unset];
      google(200, { success: true });
      assert.equal(await verifyCaptcha("token-1", null), "captcha_not_configured");
      assert.equal(sent.length, 0);
    });
  }

  it("is unavailable, never passed, when Google cannot be reached or answers badly", async () => {
    globalThis.fetch = (async () => {
      throw new Error("ENOTFOUND");
    }) as typeof fetch;
    assert.equal(await verifyCaptcha("token-1", null), "captcha_unavailable");
    google(500, {});
    assert.equal(await verifyCaptcha("token-1", null), "captcha_unavailable");
  });

  it("reads the site key, treating blank as unset", () => {
    assert.equal(captchaSiteKey(), "site-key");
    process.env.RECAPTCHA_SITE_KEY = "  ";
    assert.equal(captchaSiteKey(), null);
  });
});
