import { readSignup, withProved, writeSignup, type Connection } from "@/lib/signup/state";
import { codeOf, sendTo } from "@/lib/return-trip";
import { completeGoogleConnection, proveConnection } from "@/services/signup-connections";

/**
 * Where Google sends a visitor back to when they approved a connection during signup. The one-time code and the sealed state go once to
 * GeekAPI for the business in the signup cookie, the connection is then used (so it is shown to work, not just saved), and the visitor
 * lands on /signup. Returns null when there is no signup in progress, so the owner's own return trip handles it.
 */
export async function finishSignupConnection(request: Request, provider: Extract<Connection, "google_calendar" | "google_drive">): Promise<Response | null> {
  const state = await readSignup();
  if (!state) return null;

  const params = new URL(request.url).searchParams;
  const text = (name: string, max: number) => {
    const value = params.get(name);
    return value && value.length <= max ? value : null;
  };
  const approval = { code: text("code", 2048), state: text("state", 4096), error: text("error", 256) };
  if (!approval.code && !approval.error) return sendTo(request, "/signup", { error: "no_approval" });

  const completed = await completeGoogleConnection(state.tenantId, provider, approval, request.headers);
  if (completed.status !== 200) return sendTo(request, "/signup", { error: codeOf(completed.body, completed.status) });

  const proved = await proveConnection(state.tenantId, provider, request.headers);
  if (proved.status !== 200) return sendTo(request, "/signup", { error: codeOf(proved.body, proved.status) });

  await writeSignup(withProved(state, provider));
  return sendTo(request, "/signup");
}
