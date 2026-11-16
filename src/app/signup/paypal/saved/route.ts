import { headers } from "next/headers";
import { readSignup, writeSignup } from "@/lib/signup/state";
import { codeOf, sendTo } from "@/lib/return-trip";
import { postOnboarding } from "@/services/onboarding";

/**
 * Where PayPal sends the visitor after they approve saving their PayPal account. The setup token this signup started is handed to
 * GeekAPI, which turns it into the payment token overage charges use, once, before anything is drawn.
 */
export async function GET(request: Request) {
  const state = await readSignup();
  if (!state?.setupTokenId) return sendTo(request, "/signup", { error: "signup_expired" });

  const returned = new URL(request.url).searchParams.get("approval_token_id");
  if (returned !== null && returned !== state.setupTokenId) return sendTo(request, "/signup", { error: "vault_token_invalid" });

  const answer = await postOnboarding("/api/v1/onboarding/paypal/vault/complete", { tenantId: state.tenantId, setupTokenId: state.setupTokenId }, await headers());
  const vaultTokenId = answer.body?.paypalVaultTokenId;
  if (answer.status !== 200 || typeof vaultTokenId !== "string") return sendTo(request, "/signup", { error: codeOf(answer.body, answer.status) });

  await writeSignup({ ...state, vaultTokenId });
  return sendTo(request, "/signup");
}
