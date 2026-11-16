import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { clearSessionCookies, readSession, refreshSession, sessionEnded, setSessionCookies, signIn, signOut, visitorIpFrom } from "./owner-auth";
import { ACCESS_COOKIE, DEVICE_COOKIE, REFRESH_COOKIE, accessCookieSeconds } from "@/lib/auth/cookies";
import { loginMessage } from "@/lib/auth/login-messages";
import { publicOrigin } from "@/lib/auth/same-origin";

const session = {
  accessToken: "a.b.c",
  accessTokenExpiresAt: "2026-11-16T00:15:00Z",
  refreshToken: "r1",
  refreshTokenExpiresAt: "2026-12-16T00:00:00Z",
  tenantId: "5b1f6f0e-7d0a-4c1e-9d55-3a8f2c9e1b44",
  email: "owner@example.com",
  deviceToken: "d.e.f",
  deviceTokenExpiresAt: "2027-02-14T00:00:00Z",
};

type Seen = { url: string; headers: Record<string, string>; body: unknown };
let seen: Seen[] = [];
const realFetch = globalThis.fetch;

function answer(status: number, body: unknown) {
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    seen.push({ url: String(input), headers: init?.headers as Record<string, string>, body: init?.body ? JSON.parse(String(init.body)) : null });
    return new Response(status === 204 ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
}

describe("owner sign-in against GeekAPI", () => {
  beforeEach(() => {
    seen = [];
    process.env.GEEK_BACKEND_API_KEY = "test-key";
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    delete process.env.GEEK_BACKEND_API_KEY;
  });

  it("sends the email, the password, the key and the visitor's address once, and reads the session", async () => {
    answer(200, session);
    const outcome = await signIn("owner@example.com", "pw", "203.0.113.9");
    assert.deepEqual(outcome, { ok: true, session });
    assert.equal(seen.length, 1);
    assert.match(seen[0].url, /\/api\/v1\/owner-auth\/sign-in$/);
    assert.equal(seen[0].headers["x-api-key"], "test-key");
    assert.equal(seen[0].headers["x-visitor-ip"], "203.0.113.9");
    assert.deepEqual(seen[0].body, { email: "owner@example.com", password: "pw" });
  });

  it("sends the device token this browser kept, and leaves it out when there is none", async () => {
    answer(200, session);
    await signIn("owner@example.com", "pw", null, "d.e.f");
    assert.deepEqual(seen[0].body, { email: "owner@example.com", password: "pw", deviceToken: "d.e.f" });
  });

  it("refuses a session without a device token or with an unreadable device date", async () => {
    assert.equal(readSession({ ...session, deviceToken: "" }), null);
    assert.equal(readSession({ ...session, deviceTokenExpiresAt: "never" }), null);
  });

  it("passes GeekAPI's code on for a refusal", async () => {
    answer(401, { error: "That email and password do not match a login.", code: "invalid_credentials" });
    const outcome = await signIn("owner@example.com", "wrong", null);
    assert.deepEqual(outcome, { ok: false, status: 401, code: "invalid_credentials", error: "That email and password do not match a login." });
  });

  it("refuses without calling GeekAPI when the key is not set", async () => {
    delete process.env.GEEK_BACKEND_API_KEY;
    answer(200, session);
    const outcome = await signIn("owner@example.com", "pw", null);
    assert.equal(outcome.ok, false);
    assert.equal(!outcome.ok && outcome.code, "portal_not_configured");
    assert.equal(seen.length, 0);
  });

  it("calls an unreachable GeekAPI a refusal, not an ended session", async () => {
    globalThis.fetch = (async () => {
      throw new TypeError("fetch failed");
    }) as typeof fetch;
    const outcome = await refreshSession("r1");
    assert.equal(!outcome.ok && outcome.code, "api_unreachable");
    assert.equal(sessionEnded(outcome), false);
  });

  it("ends the session only for an unknown, expired or reused refresh token, or a cancelled account", async () => {
    answer(401, { error: "x", code: "refresh_token_reused" });
    assert.equal(sessionEnded(await refreshSession("r1")), true);
    answer(401, { error: "x", code: "refresh_token_invalid" });
    assert.equal(sessionEnded(await refreshSession("r1")), true);
    answer(503, { error: "x", code: "owner_auth_not_configured" });
    assert.equal(sessionEnded(await refreshSession("r1")), false);
    answer(401, { error: "x", code: "something_else" });
    assert.equal(sessionEnded(await refreshSession("r1")), false);
    answer(403, { error: "x", code: "account_cancelled" });
    assert.equal(sessionEnded(await refreshSession("r1")), true);
    answer(403, { error: "x", code: "something_else" });
    assert.equal(sessionEnded(await refreshSession("r1")), false);
  });

  it("refuses an answer it cannot read rather than using half of it", async () => {
    answer(200, { ...session, accessTokenExpiresAt: "not a date" });
    assert.equal(((await signIn("a@b.co", "pw", null)) as { code: string }).code, "api_unexpected");
    assert.equal(readSession({ ...session, refreshToken: "" }), null);
  });

  it("reports whether GeekAPI ended the sign-in on sign-out", async () => {
    answer(204, null);
    assert.deepEqual(await signOut("r1"), { ok: true });
    answer(503, { error: "down", code: "store_unavailable" });
    assert.equal(((await signOut("r1")) as { ok: boolean }).ok, false);
  });
});

describe("helpers", () => {
  it("sets the device cookie with the session and keeps it when the session is cleared", () => {
    const written = new Map<string, string>();
    const jar = { set: (name: string, value: string) => written.set(name, value) };
    setSessionCookies(jar, session);
    assert.equal(written.get(DEVICE_COOKIE), "d.e.f");
    clearSessionCookies(jar);
    assert.equal(written.get(ACCESS_COOKIE), "");
    assert.equal(written.get(REFRESH_COOKIE), "");
    assert.equal(written.get(DEVICE_COOKIE), "d.e.f");
  });

  it("drops the access cookie a minute early, never under 30 seconds, and leaves none for a bad date", () => {
    const now = Date.parse("2026-11-16T00:00:00Z");
    assert.equal(accessCookieSeconds("2026-11-16T00:15:00Z", now), 840);
    assert.equal(accessCookieSeconds("2026-11-16T00:00:40Z", now), 30);
    assert.equal(accessCookieSeconds("nonsense", now), 0);
  });

  it("takes the visitor's address from the first forwarded entry", () => {
    assert.equal(visitorIpFrom(new Headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" })), "203.0.113.9");
    assert.equal(visitorIpFrom(new Headers({ "x-real-ip": "198.51.100.4" })), "198.51.100.4");
    assert.equal(visitorIpFrom(new Headers()), null);
  });

  it("shows only fixed sentences on the login page", () => {
    assert.equal(loginMessage("invalid_credentials"), "That email and password do not match a login.");
    assert.match(loginMessage("too_many_failed_sign_ins")!, /Too many failed sign-ins for this email/);
    assert.equal(loginMessage("odd_code"), "Sign-in failed (odd_code).");
    assert.equal(loginMessage("<script>alert(1)</script>"), "Sign-in failed.");
    assert.equal(loginMessage("constructor"), "Sign-in failed (constructor).");
    assert.equal(loginMessage(null), null);
  });

  it("builds return addresses from the visitor's own origin, preferring Vercel's forwarded host", () => {
    assert.equal(publicOrigin(new Headers({ host: "x.vercel.app", "x-forwarded-host": "receptionist.geekatyourspot.com", "x-forwarded-proto": "https" })), "https://receptionist.geekatyourspot.com");
    assert.equal(publicOrigin(new Headers({ host: "localhost:3010" })), "http://localhost:3010");
    assert.equal(publicOrigin(new Headers({ host: "receptionist.geekatyourspot.com" })), "https://receptionist.geekatyourspot.com");
  });
});
