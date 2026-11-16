import { callOwnerTenant } from "@/lib/geekapi";
import { codeOf, sendTo } from "@/lib/return-trip";

/**
 * Where Google sends the owner back after the calendar approval (the address registered on the Google OAuth client). Google's one-time
 * code, the sealed state and any error go once to GeekAPI with the owner's own token, on the server, before any page is drawn; the owner
 * then lands on the dashboard, which says whether the calendar is connected.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const text = (name: string, max: number) => {
    const value = params.get(name);
    return value && value.length <= max ? value : null;
  };
  const code = text("code", 2048);
  const state = text("state", 4096);
  const error = text("error", 256);
  if (!code && !error) return sendTo(request, "/dashboard", { calendar_error: "no_approval" });

  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/oauth/mcp/google_calendar/complete`, {
    method: "POST",
    body: { code, state, error },
  });
  if (result.status === 401) return sendTo(request, "/login");
  if (result.status >= 200 && result.status < 300) return sendTo(request, "/dashboard", { notice: "calendar_connected" });
  return sendTo(request, "/dashboard", { calendar_error: codeOf(result.body, result.status) });
}
