import { readSignup, writeSignup } from "@/lib/signup/state";
import { sendTo } from "@/lib/return-trip";

/**
 * Where PayPal sends the visitor after they approve the subscription. PayPal names the subscription in `subscription_id`; it must be the
 * one this signup started, and it is recorded as approved. Whether it is paid is checked with PayPal at activation, never assumed here.
 */
export async function GET(request: Request) {
  const state = await readSignup();
  if (!state?.subscriptionId) return sendTo(request, "/signup", { error: "signup_expired" });

  const returned = new URL(request.url).searchParams.get("subscription_id");
  if (returned !== state.subscriptionId) return sendTo(request, "/signup", { error: "paypal_mismatch" });

  await writeSignup({ ...state, subscriptionApproved: true });
  return sendTo(request, "/signup");
}
