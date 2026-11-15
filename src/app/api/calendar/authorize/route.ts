import { NextResponse } from "next/server";
import { callOwnerTenant } from "@/lib/geekapi";

/** Asks GeekAPI for the Google address that approves this owner's calendar. The tenant is the owner's own, from their token. */
export async function GET() {
  const result = await callOwnerTenant(
    (tenantId) => `/api/v1/tenants/${tenantId}/oauth/mcp/google_calendar/authorize`,
    { method: "GET" },
  );
  return NextResponse.json(result.body ?? { error: "GeekAPI answered with something unexpected.", code: "api_unexpected" }, { status: result.body ? result.status : 502 });
}
