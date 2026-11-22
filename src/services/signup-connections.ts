import { postOnboarding, type OnboardingAnswer } from "@/services/onboarding";

/**
 * Connecting a calendar, a Drive folder or a bucket while a business is still signing up, and showing that the connection works. Each is
 * one call to GeekAPI's onboarding routes, with the business named from the signup cookie. GeekAPI refuses a business that is not waiting
 * for payment, so none of this can touch a paying business.
 */

/** The address Google's approval screen is at, which is the only place a visitor is ever sent from here. */
export async function beginGoogleConnection(tenantId: string, provider: string, visitor: Headers): Promise<{ url: string } | { error: OnboardingAnswer }> {
  const answer = await postOnboarding("/api/v1/onboarding/connections/authorize", { tenantId, provider }, visitor);
  const url = answer.body?.authorizationUrl;
  if (answer.status === 200 && typeof url === "string" && url.startsWith("https://accounts.google.com/")) return { url };
  return { error: answer };
}

/** Spends Google's one-time code for the business. */
export function completeGoogleConnection(tenantId: string, provider: string, approval: { code: string | null; state: string | null; error: string | null }, visitor: Headers) {
  return postOnboarding("/api/v1/onboarding/connections/complete", { tenantId, provider, ...approval }, visitor);
}

/** Uses the connection: the calendar lists its calendars, a Drive folder or a bucket is written one small file. */
export function proveConnection(tenantId: string, provider: string, visitor: Headers) {
  return postOnboarding("/api/v1/onboarding/connections/check", { tenantId, provider }, visitor);
}

export type BucketDetails = { bucket: string; region: string; accessKeyId: string; secretAccessKey: string };

export function saveBucket(tenantId: string, details: BucketDetails, visitor: Headers) {
  return postOnboarding("/api/v1/onboarding/connections/bucket", { tenantId, provider: "aws_s3", ...details }, visitor);
}
