import { apiConfig, geekApiKey } from "@/lib/config";
import { visitorIpFrom } from "@/services/owner-auth";

export type OnboardingAnswer = { status: number; body: Record<string, unknown> | null };

/** One IRS Principal Business Activity code, as GeekAPI serves it from the 2025 Schedule C chart. */
export type BusinessActivity = { code: string; name: string; sector: string; group: string | null };

export type BusinessActivities = { ok: true; activities: BusinessActivity[] } | { ok: false; code: string };

const isActivity = (value: unknown): value is BusinessActivity => {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Record<string, unknown>;
  return typeof a.code === "string" && /^\d{6}$/.test(a.code) && typeof a.name === "string" && typeof a.sector === "string";
};

/**
 * The codes the first signup step offers, from GeekAPI, which also decides the rules on them, so the list and the rules are one
 * source. Kept for a day, since the chart changes once a year. An unset key, an unreachable GeekAPI or an answer that is not the list
 * is a failure with its code, never an empty list a visitor could not choose from.
 */
export async function getBusinessActivities(): Promise<BusinessActivities> {
  const key = geekApiKey();
  if (!key) return { ok: false, code: "portal_not_configured" };

  let response: Response;
  try {
    response = await fetch(new URL("/api/v1/onboarding/business-activities", apiConfig.baseUrl), {
      headers: { "x-api-key": key },
      redirect: "manual",
      next: { revalidate: 86400 },
    });
  } catch {
    return { ok: false, code: "api_unreachable" };
  }
  if (response.status !== 200) return { ok: false, code: "api_unreachable" };

  try {
    const body: unknown = await response.json();
    const activities = (body as { activities?: unknown })?.activities;
    if (!Array.isArray(activities) || activities.length === 0 || !activities.every(isActivity)) return { ok: false, code: "api_unreachable" };
    return { ok: true, activities };
  } catch {
    return { ok: false, code: "api_unreachable" };
  }
}

/**
 * One call to a GeekAPI onboarding route for a visitor who has no account yet: from this server, with GeekAPI's key, and with the
 * visitor's own address and the country Vercel resolved for it, which GeekAPI requires and believes only with the key. Nothing is
 * retried; an unset key or an unreachable GeekAPI is an answer with its own code, never a success.
 */
export async function postOnboarding(path: string, body: unknown, visitor: Headers): Promise<OnboardingAnswer> {
  const key = geekApiKey();
  if (!key) return { status: 503, body: { error: "Signup is not configured on this site.", code: "portal_not_configured" } };

  const ip = visitorIpFrom(visitor);
  const country = visitor.get("x-vercel-ip-country")?.trim();
  let response: Response;
  try {
    response = await fetch(new URL(path, apiConfig.baseUrl), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        ...(ip ? { "x-visitor-ip": ip } : {}),
        ...(country ? { "x-visitor-country": country } : {}),
      },
      body: JSON.stringify(body),
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { status: 502, body: { error: `Could not reach GeekAPI: ${detail}`, code: "api_unreachable" } };
  }

  try {
    const parsed: unknown = await response.json();
    return { status: response.status, body: typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null };
  } catch {
    return { status: response.status, body: null };
  }
}
