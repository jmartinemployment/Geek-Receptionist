import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { getBusinessActivities } from "./onboarding";

const realFetch = globalThis.fetch;
let seen: { url: string; headers: Record<string, string> }[] = [];

function answer(status: number, body: unknown) {
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    seen.push({ url: String(input), headers: init?.headers as Record<string, string> });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
}

const plumbing = { code: "238220", name: "Plumbing, heating, & air-conditioning contractors", sector: "Construction of Buildings", group: "Specialty Trade Contractors" };

describe("the business activity codes from GeekAPI", () => {
  beforeEach(() => {
    seen = [];
    process.env.GEEK_BACKEND_API_KEY = "test-key";
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    delete process.env.GEEK_BACKEND_API_KEY;
  });

  it("asks GeekAPI once, with the key, and returns its list", async () => {
    answer(200, { source: "Schedule C 2025", activities: [plumbing] });

    assert.deepEqual(await getBusinessActivities(), { ok: true, activities: [plumbing] });
    assert.equal(seen.length, 1);
    assert.match(seen[0].url, /\/api\/v1\/onboarding\/business-activities$/);
    assert.equal(seen[0].headers["x-api-key"], "test-key");
  });

  it("is a failure, never an empty list, when the key is not set", async () => {
    delete process.env.GEEK_BACKEND_API_KEY;
    answer(200, { activities: [plumbing] });

    assert.deepEqual(await getBusinessActivities(), { ok: false, code: "portal_not_configured" });
    assert.equal(seen.length, 0);
  });

  for (const [what, status, body] of [
    ["a refusal", 503, { error: "down" }],
    ["an empty list", 200, { activities: [] }],
    ["a code that is not six digits", 200, { activities: [{ ...plumbing, code: "2382" }] }],
    ["no list at all", 200, { source: "x" }],
  ] as const) {
    it(`is a failure when GeekAPI answers ${what}`, async () => {
      answer(status, body);
      assert.deepEqual(await getBusinessActivities(), { ok: false, code: "api_unreachable" });
    });
  }

  it("is a failure when GeekAPI cannot be reached", async () => {
    globalThis.fetch = (async () => {
      throw new Error("connect ECONNREFUSED");
    }) as typeof fetch;
    assert.deepEqual(await getBusinessActivities(), { ok: false, code: "api_unreachable" });
  });
});
