import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { EXCLUDED_CODES, type ExcludedCode } from "./excluded";

export const SIGNUP_COOKIE = "rp_signup";

/**
 * The first questions of /signup the visitor has already got past, in the order they are asked: the robot check, the country
 * question, then the eight excluded-industry questions. The cookie is signed
 * with the reCAPTCHA secret, so a visitor cannot write "captcha" into it and skip the check. Each excluded industry has its own
 * gate, named by its code, which is a no to that industry's question. Country is only a bookmark, which GeekAPI decides again when
 * the business is submitted. The industry answers are sent to GeekAPI from these gates; it stores every one forever and refuses
 * an excluded industry and a missing answer.
 */
export const GATES_COOKIE = "rp_gates";

export const GATES = ["captcha", "country", ...EXCLUDED_CODES] as const;
export type Gate = (typeof GATES)[number];

const gateKey = (): string | null => {
  const value = (process.env.RECAPTCHA_SECRET_KEY ?? "").trim();
  return value.length > 0 ? value : null;
};

/** The cookie's value for these gates: their names, a dot, and the signature of the names. */
export function signGates(gates: readonly Gate[], key: string): string {
  const names = gates.join(",");
  return `${names}.${createHmac("sha256", key).update(names).digest("hex")}`;
}

/** The gates a cookie value carries, or none when it is missing, not signed by this key, or altered. */
export function parseGates(raw: string | undefined, key: string): ReadonlySet<Gate> {
  if (!raw) return new Set();
  const dot = raw.lastIndexOf(".");
  if (dot < 0) return new Set();
  const names = raw.slice(0, dot);
  const given = Buffer.from(raw.slice(dot + 1), "hex");
  const expected = createHmac("sha256", key).update(names).digest();
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return new Set();
  return new Set(GATES.filter((gate) => names.split(",").includes(gate)));
}

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

export type SignupStep = "captcha" | "country" | ExcludedCode | "business" | "plan" | "payment_method" | "number" | "login";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID = /^[A-Za-z0-9-]{1,64}$/;

/** The step a visitor is on, from what is already done. */
export function stepOf(state: SignupState | null, gates: ReadonlySet<Gate>): SignupStep {
  if (!state) {
    if (!gates.has("captcha")) return "captcha";
    if (!gates.has("country")) return "country";
    for (const code of EXCLUDED_CODES) if (!gates.has(code)) return code;
    return "business";
  }
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

export async function readGates(): Promise<ReadonlySet<Gate>> {
  const key = gateKey();
  if (!key) return new Set();
  return parseGates((await cookies()).get(GATES_COOKIE)?.value, key);
}

/** Writes the gates for a day. Server Actions and Route Handlers only; it needs the reCAPTCHA secret to sign with. */
async function writeGates(passed: ReadonlySet<Gate>): Promise<void> {
  const key = gateKey();
  if (!key) throw new Error("RECAPTCHA_SECRET_KEY is not set, so the signup's progress cannot be signed.");
  (await cookies()).set(GATES_COOKIE, signGates(GATES.filter((g) => passed.has(g)), key), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

/** Remembers for a day that the visitor got past these questions. */
export async function passGate(...gates: Gate[]): Promise<void> {
  await writeGates(new Set([...(await readGates()), ...gates]));
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

const gone = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 0 };

/** Forgets the robot check and the questions passed, so the next visit starts from the robot check again. */
export async function clearGates(): Promise<void> {
  (await cookies()).set(GATES_COOKIE, "", gone);
}

export async function clearSignup(): Promise<void> {
  (await cookies()).set(SIGNUP_COOKIE, "", gone);
  await clearGates();
}
