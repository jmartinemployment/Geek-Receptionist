import { cookies } from "next/headers";

export const SIGNUP_COOKIE = "rp_signup";

/**
 * Where a visitor is in /signup, kept in an httpOnly cookie between steps and across the trips to PayPal. It holds ids only (the tenant
 * and what PayPal made for it), never a password, and every one is checked again by GeekAPI and PayPal before anything is bought.
 */
export type SignupState = {
  tenantId: string;
  contactEmail: string;
  tier?: string;
  subscriptionId?: string;
  subscriptionApproved?: boolean;
  setupTokenId?: string;
  vaultTokenId?: string;
  phoneNumber?: string;
};

export type SignupStep = "business" | "plan" | "payment_method" | "number" | "login";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID = /^[A-Za-z0-9-]{1,64}$/;

/** The step a visitor is on, from what is already done. */
export function stepOf(state: SignupState | null): SignupStep {
  if (!state) return "business";
  if (!state.subscriptionApproved) return "plan";
  if (!state.vaultTokenId) return "payment_method";
  if (!state.phoneNumber) return "number";
  return "login";
}

/** The cookie's state, or null when there is none or it is not what this app wrote: a cookie that does not read is a fresh start. */
export function parseSignup(raw: string | undefined): SignupState | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.tenantId !== "string" || !UUID.test(v.tenantId) || typeof v.contactEmail !== "string") return null;
  const id = (field: string) => (typeof v[field] === "string" && ID.test(v[field] as string) ? (v[field] as string) : undefined);
  return {
    tenantId: v.tenantId,
    contactEmail: v.contactEmail,
    tier: id("tier"),
    subscriptionId: id("subscriptionId"),
    subscriptionApproved: v.subscriptionApproved === true,
    setupTokenId: id("setupTokenId"),
    vaultTokenId: id("vaultTokenId"),
    phoneNumber: typeof v.phoneNumber === "string" && /^\+[1-9]\d{6,14}$/.test(v.phoneNumber) ? v.phoneNumber : undefined,
  };
}

export async function readSignup(): Promise<SignupState | null> {
  return parseSignup((await cookies()).get(SIGNUP_COOKIE)?.value);
}

/** Writes the signup's state for a day: long enough to finish, short enough not to linger. Server Actions and Route Handlers only. */
export async function writeSignup(state: SignupState): Promise<void> {
  (await cookies()).set(SIGNUP_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearSignup(): Promise<void> {
  (await cookies()).set(SIGNUP_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}
