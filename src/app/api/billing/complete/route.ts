import { NextResponse } from "next/server";
import { callOwnerTenant } from "@/lib/geekapi";
import { cameFromThisSite } from "@/lib/auth/same-origin";

const CHARGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ORDER_ID = /^[A-Za-z0-9]{1,64}$/;

/** Hands the PayPal order the owner approved to GeekAPI, which takes the payment and records it. Refused unless it came from this site. */
export async function POST(request: Request) {
  if (!cameFromThisSite(request)) {
    return NextResponse.json({ error: "This request did not come from this site.", code: "cross_site" }, { status: 403 });
  }

  let input: { chargeId?: unknown; orderId?: unknown };
  try {
    input = (await request.json()) as typeof input;
  } catch {
    return NextResponse.json({ error: "The request could not be read.", code: "invalid_request" }, { status: 400 });
  }
  if (typeof input.chargeId !== "string" || !CHARGE_ID.test(input.chargeId) || typeof input.orderId !== "string" || !ORDER_ID.test(input.orderId)) {
    return NextResponse.json({ error: "PayPal's answer could not be read.", code: "invalid_request" }, { status: 400 });
  }

  const chargeId = input.chargeId;
  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/billing/overage-charges/${chargeId}/complete`, {
    method: "POST",
    body: { orderId: input.orderId },
  });
  return NextResponse.json(result.body ?? { error: "GeekAPI answered with something unexpected.", code: "api_unexpected" }, { status: result.body ? result.status : 502 });
}
