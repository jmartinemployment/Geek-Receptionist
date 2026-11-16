import { NextResponse } from "next/server";
import { callOwnerTenant } from "@/lib/geekapi";
import { cameFromThisSite, publicOrigin } from "@/lib/auth/same-origin";

const CHARGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Asks GeekAPI for a PayPal order that pays one of the owner's unpaid overages. PayPal sends the owner back to this site's
 * /billing/paid after approving and to the dashboard after cancelling; the addresses are built from this site's own origin, never from
 * the request body. Refused unless the request came from a page of this site.
 */
export async function POST(request: Request) {
  if (!cameFromThisSite(request)) {
    return NextResponse.json({ error: "This request did not come from this site.", code: "cross_site" }, { status: 403 });
  }

  let input: { chargeId?: unknown };
  try {
    input = (await request.json()) as typeof input;
  } catch {
    return NextResponse.json({ error: "The request could not be read.", code: "invalid_request" }, { status: 400 });
  }
  if (typeof input.chargeId !== "string" || !CHARGE_ID.test(input.chargeId)) {
    return NextResponse.json({ error: "Choose an overage to pay.", code: "invalid_request" }, { status: 400 });
  }

  const origin = publicOrigin(request);
  const chargeId = input.chargeId;
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/billing/overage-charges/${chargeId}/pay`, {
    method: "POST",
    body: { returnUrl: `${origin}/billing/paid?charge=${chargeId}`, cancelUrl: `${origin}/dashboard` },
  });
  return NextResponse.json(result.body ?? { error: "GeekAPI answered with something unexpected.", code: "api_unexpected" }, { status: result.body ? result.status : 502 });
}
