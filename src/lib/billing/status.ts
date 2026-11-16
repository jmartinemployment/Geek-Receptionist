export type UnpaidOverage = { id: string; periodStart: string; periodEnd: string; overageMinutes: number; amountUsd: number };

export type BillingState =
  | { kind: "active"; tier: string; renewsOn: string }
  | {
      kind: "suspended";
      answeringUntil: string;
      answeringStopped: boolean;
      /** PayPal no longer takes the monthly payment: the owner fixes the payment method in PayPal itself. */
      subscriptionHeld: boolean;
      unpaid: UnpaidOverage[];
    }
  | { kind: "problem"; message: string; code: string | null };

const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const isId = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

function unpaidFrom(value: unknown): UnpaidOverage[] | null {
  if (!Array.isArray(value)) return null;
  const list: UnpaidOverage[] = [];
  for (const item of value) {
    const c = item as Record<string, unknown> | null;
    if (!c || !isId(c.id) || !isText(c.periodStart) || !isText(c.periodEnd) || typeof c.overageMinutes !== "number" || typeof c.amountUsd !== "number") {
      return null;
    }
    list.push({ id: c.id, periodStart: c.periodStart, periodEnd: c.periodEnd, overageMinutes: c.overageMinutes, amountUsd: c.amountUsd });
  }
  return list;
}

/**
 * What the owner is told about their subscription, from GeekAPI's answer to billing. An answer this app does not recognise is a
 * problem that says so; it is never read as "active".
 */
export function describeBilling(status: number, body: Record<string, unknown> | null): BillingState {
  const code = typeof body?.code === "string" ? body.code : null;
  if (status !== 200 || !body) {
    const message = isText(body?.error) ? body.error : `Your billing could not be read (status ${status}).`;
    return { kind: "problem", message, code };
  }

  const unpaid = unpaidFrom(body.unpaid);
  if (body.status === "active" && isText(body.tier) && isText(body.currentPeriodEnd)) {
    return { kind: "active", tier: body.tier, renewsOn: body.currentPeriodEnd };
  }
  if (body.status === "suspended" && isText(body.answeringUntil) && typeof body.answeringStopped === "boolean" && isText(body.subscriptionStatus) && unpaid) {
    return {
      kind: "suspended",
      answeringUntil: body.answeringUntil,
      answeringStopped: body.answeringStopped,
      subscriptionHeld: body.subscriptionStatus !== "ACTIVE",
      unpaid,
    };
  }
  return { kind: "problem", message: "GeekAPI answered with a billing state this page does not know.", code: "api_unexpected" };
}

/** A date as the owner reads it, in US English. */
export function day(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function dollars(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

/** The words shown when a payment did not complete. GeekAPI's codes in plain words; an unknown code shows GeekAPI's own message. */
export function describePaymentFailure(status: number, code: string | null, message: string | null): string {
  if (status === 401) return "Your sign-in ended before the payment was recorded. Sign in again; if PayPal took the payment, it will show as paid.";
  switch (code) {
    case "charge_not_owed":
      return "This overage is already paid.";
    case "payment_not_completed":
      return "PayPal did not complete the payment, so nothing was taken. Try again from your dashboard.";
    case "billing_unavailable":
      return "PayPal could not be reached. Nothing is recorded as paid yet; try again shortly.";
    default:
      return message ?? `The payment could not be completed (status ${status}).`;
  }
}
