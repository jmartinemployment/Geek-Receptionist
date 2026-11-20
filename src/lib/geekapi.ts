import { getAccessToken, getAuthError } from "@/lib/auth/session";
import { apiConfig } from "@/lib/config";
import { tenantIdFromAccessToken } from "@/lib/session-claims";

export type TenantCall = { status: number; body: { error?: unknown; code?: unknown } & Record<string, unknown> | null };

/**
 * One call to a GeekAPI route of the signed-in owner's own tenant. The tenant comes from the owner's token and never from the browser's
 * request, and the owner's own Bearer is the only credential sent; when GeekAPI refuses it, no other is tried. Answers 502 when the
 * sign-in could not be renewed because GeekAPI was unreachable or refused for another reason, 401 when there is no session, 403 when
 * the sign-in carries no tenant, 502 when GeekAPI cannot be reached, and otherwise GeekAPI's own status and body.
 */
export async function callOwnerTenant(
  route: (tenantId: string) => string,
  init: { method: "GET" | "POST" | "PUT" | "DELETE"; body?: unknown },
): Promise<TenantCall> {
  const authError = await getAuthError();
  if (authError) {
    return { status: 502, body: { error: "Your sign-in could not be renewed with GeekAPI. Try again shortly.", code: authError } };
  }

  const token = await getAccessToken();
  if (!token) return { status: 401, body: { error: "Your sign-in has ended. Sign in again.", code: "signed_out" } };

  const tenantId = tenantIdFromAccessToken(token);
  if (!tenantId) {
    return { status: 403, body: { error: "This sign-in is not linked to a business.", code: "tenant_unverified" } };
  }

  let response: Response;
  try {
    response = await fetch(new URL(route(tenantId), apiConfig.baseUrl), {
      method: init.method,
      headers: {
        authorization: `Bearer ${token}`,
        ...(init.body === undefined ? {} : { "content-type": "application/json" }),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { status: 502, body: { error: `Could not reach GeekAPI: ${detail}`, code: "api_unreachable" } };
  }

  let body: TenantCall["body"] = null;
  try {
    const parsed: unknown = await response.json();
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) body = parsed as TenantCall["body"];
  } catch {
    body = null;
  }
  return { status: response.status, body };
}
