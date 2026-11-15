import { NextResponse } from "next/server";
import { callOwnerTenant } from "@/lib/geekapi";

/** Hands Google's answer (the one-time code, the sealed state, or the error) to GeekAPI with the owner's own token. */
export async function POST(request: Request) {
  let input: { code?: unknown; state?: unknown; error?: unknown };
  try {
    input = (await request.json()) as typeof input;
  } catch {
    return NextResponse.json({ error: "The approval could not be read.", code: "invalid_request" }, { status: 400 });
  }

  const text = (value: unknown, max: number) => (typeof value === "string" && value.length <= max ? value : null);
  const result = await callOwnerTenant(
    (tenantId) => `/api/v1/tenants/${tenantId}/oauth/mcp/google_calendar/complete`,
    { method: "POST", body: { code: text(input.code, 2048), state: text(input.state, 4096), error: text(input.error, 256) } },
  );
  return NextResponse.json(result.body ?? { error: "GeekAPI answered with something unexpected.", code: "api_unexpected" }, { status: result.body ? result.status : 502 });
}
