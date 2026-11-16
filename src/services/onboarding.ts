import { apiConfig, geekApiKey } from "@/lib/config";
import { visitorIpFrom } from "@/services/owner-auth";

export type OnboardingAnswer = { status: number; body: Record<string, unknown> | null };

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
