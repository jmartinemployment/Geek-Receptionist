import { callOwnerTenant } from "@/lib/geekapi";
import { codeOf, sendTo } from "@/lib/return-trip";

const CHARGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ORDER_ID = /^[A-Za-z0-9]{1,64}$/;

/**
 * Where PayPal sends the owner after they approve paying an overage. PayPal adds its order as `token`; it goes once to GeekAPI with the
 * charge, on the server, which takes the payment and records it, before any page is drawn. Opening the address again finds the overage
 * already paid, so it never charges twice.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const chargeId = params.get("charge") ?? "";
  const orderId = params.get("token") ?? "";
  if (!CHARGE_ID.test(chargeId) || !ORDER_ID.test(orderId)) return sendTo(request, "/dashboard", { payment_error: "payment_unreadable" });

  const result = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/billing/overage-charges/${chargeId}/complete`, {
    method: "POST",
    body: { orderId },
  });
  if (result.status === 401) return sendTo(request, "/login");
  if (result.status === 200) {
    return sendTo(request, "/dashboard", { notice: result.body?.status === "active" ? "payment_restored" : "payment_recorded" });
  }
  return sendTo(request, "/dashboard", { payment_error: codeOf(result.body, result.status) });
}
