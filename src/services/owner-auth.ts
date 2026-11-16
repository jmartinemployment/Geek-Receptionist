import { apiConfig, geekApiKey } from "@/lib/config";
import { ACCESS_COOKIE, DEVICE_COOKIE, REFRESH_COOKIE, accessCookieSeconds, cookieOpts } from "@/lib/auth/cookies";

/** What GeekAPI's sign-in and refresh answer. Every token goes into an httpOnly cookie and is never sent to the browser's page. */
export type OwnerSession = {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  tenantId: string;
  email: string;
  deviceToken: string;
  deviceTokenExpiresAt: string;
};

export type Refusal = { ok: false; status: number; code: string; error: string };
export type SessionOutcome = { ok: true; session: OwnerSession } | Refusal;

/** The codes with which GeekAPI says a refresh token can never be used again. Only these end a session; nothing else is proof. */
const ENDED_CODES = new Set(["refresh_token_invalid", "refresh_token_reused"]);

export function sessionEnded(outcome: SessionOutcome): boolean {
  return !outcome.ok && outcome.status === 401 && ENDED_CODES.has(outcome.code);
}

/** The device token is the one this browser kept from an earlier sign-in, when it has one; it lets the owner past the per-email cap. */
export function signIn(email: string, password: string, visitorIp: string | null, deviceToken: string | null = null): Promise<SessionOutcome> {
  return post("/api/v1/owner-auth/sign-in", deviceToken ? { email, password, deviceToken } : { email, password }, visitorIp);
}

export function refreshSession(refreshToken: string): Promise<SessionOutcome> {
  return post("/api/v1/owner-auth/refresh", { refreshToken }, null);
}

/** Ends the sign-in at GeekAPI. True when GeekAPI confirmed it; a refusal is returned so the caller can say it was not ended. */
export async function signOut(refreshToken: string): Promise<{ ok: true } | Refusal> {
  const result = await send("/api/v1/owner-auth/sign-out", { refreshToken }, null);
  if (!result.ok) return result;
  if (result.status === 204) return { ok: true };
  return refusal(result.status, result.body);
}

/** Writes the session's cookies. Anything with a cookies.set of this shape: a NextResponse's cookies or next/headers cookies(). */
export function setSessionCookies(
  jar: { set: (name: string, value: string, options: Record<string, unknown>) => unknown },
  session: OwnerSession,
): void {
  jar.set(REFRESH_COOKIE, session.refreshToken, cookieOpts.until(session.refreshTokenExpiresAt));
  jar.set(ACCESS_COOKIE, session.accessToken, { ...cookieOpts.until(session.accessTokenExpiresAt), maxAge: accessCookieSeconds(session.accessTokenExpiresAt) });
  jar.set(DEVICE_COOKIE, session.deviceToken, cookieOpts.until(session.deviceTokenExpiresAt));
}

/** Clears the sign-in. The device cookie stays: it signs nobody in, and it keeps this browser past the per-email cap next time. */
export function clearSessionCookies(jar: { set: (name: string, value: string, options: Record<string, unknown>) => unknown }): void {
  jar.set(REFRESH_COOKIE, "", cookieOpts.clear);
  jar.set(ACCESS_COOKIE, "", cookieOpts.clear);
}

async function post(path: string, body: unknown, visitorIp: string | null): Promise<SessionOutcome> {
  const result = await send(path, body, visitorIp);
  if (!result.ok) return result;
  if (result.status !== 200) return refusal(result.status, result.body);
  const session = readSession(result.body);
  if (!session) return { ok: false, status: 502, code: "api_unexpected", error: "GeekAPI's sign-in answer could not be read." };
  return { ok: true, session };
}

type Sent = { ok: true; status: number; body: unknown } | Refusal;

/** One call to GeekAPI with its key. Nothing is retried. An unset key or an unreachable GeekAPI is a refusal, never a signed-out answer. */
async function send(path: string, body: unknown, visitorIp: string | null): Promise<Sent> {
  const key = geekApiKey();
  if (!key) return { ok: false, status: 503, code: "portal_not_configured", error: "Sign-in is not configured on this site (GEEK_BACKEND_API_KEY)." };

  let response: Response;
  try {
    response = await fetch(new URL(path, apiConfig.baseUrl), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        ...(visitorIp ? { "x-visitor-ip": visitorIp } : {}),
      },
      body: JSON.stringify(body),
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { ok: false, status: 502, code: "api_unreachable", error: `Could not reach GeekAPI: ${detail}` };
  }

  let parsed: unknown = null;
  if (response.status !== 204) {
    try {
      parsed = await response.json();
    } catch {
      parsed = null;
    }
  }
  return { ok: true, status: response.status, body: parsed };
}

function refusal(status: number, body: unknown): Refusal {
  const record = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  return {
    ok: false,
    status,
    code: typeof record.code === "string" ? record.code : `http_${status}`,
    error: typeof record.error === "string" ? record.error : `GeekAPI answered ${status}.`,
  };
}

export function readSession(body: unknown): OwnerSession | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const fields = ["accessToken", "accessTokenExpiresAt", "refreshToken", "refreshTokenExpiresAt", "tenantId", "email", "deviceToken", "deviceTokenExpiresAt"] as const;
  for (const field of fields) if (typeof b[field] !== "string" || (b[field] as string).length === 0) return null;
  // A date that cannot be read would give a cookie no life at all, so the answer is refused rather than half-used.
  for (const field of ["accessTokenExpiresAt", "refreshTokenExpiresAt", "deviceTokenExpiresAt"] as const)
    if (Number.isNaN(Date.parse(b[field] as string))) return null;
  return {
    accessToken: b.accessToken as string,
    accessTokenExpiresAt: b.accessTokenExpiresAt as string,
    refreshToken: b.refreshToken as string,
    refreshTokenExpiresAt: b.refreshTokenExpiresAt as string,
    tenantId: b.tenantId as string,
    email: b.email as string,
    deviceToken: b.deviceToken as string,
    deviceTokenExpiresAt: b.deviceTokenExpiresAt as string,
  };
}

/**
 * The visitor's own address, for GeekAPI's per-visitor cap on sign-in. Vercel puts the client address first in x-forwarded-for and in
 * x-real-ip; locally there is neither and GeekAPI caps by the connection's address instead.
 */
export function visitorIpFrom(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = headers.get("x-real-ip")?.trim();
  return real ? real : null;
}
