import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SIGNUP_COOKIE = "rp_signup";

/**
 * The first questions of /signup the visitor has already got past, in the order they are asked: the robot check, who they are, their
 * business. The country question and the eight excluded-industry questions share one screen, which creates the business when they are
 * all answered, so they have no gate: the signup cookie is what says they were. The cookie is signed
 * with the reCAPTCHA secret, so a visitor cannot write "captcha" into it and skip the check. The industry answers are sent to
 * GeekAPI when the eligibility screen is submitted; it stores every one forever and refuses a yes, and the portal does not rely on that:
 * a yes ends the signup on this side too.
 */
export const GATES_COOKIE = "rp_gates";

export const GATES = ["captcha", "who", "company"] as const;
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
 * What the first two screens asked, kept apart (Jeff, 2026-11-21: "split off business from personal"): who is talking to us, then the
 * business they are asking for, before anything is verified or created. Each is held in its own signed httpOnly cookie for a day so the
 * declaration can show it again without the visitor typing it twice. It is the visitor's own words, unconfirmed, and nothing trusts it:
 * GeekAPI checks the emails and the phones again when the business is submitted. Both are signed with the same key as the gates, so a
 * forged value reads as none.
 */
export const WHO_COOKIE = "rp_who";
export const COMPANY_COOKIE = "rp_company";

/** The person: the first screen. */
export type Who = {
  firstName: string;
  middleInitial: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
};

/** The business: the second screen. */
export type Company = {
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
};

const WHO_FIELDS = [
  "firstName", "middleInitial", "lastName", "address", "city", "state", "zip", "phone", "email",
] as const satisfies readonly (keyof Who)[];

const COMPANY_FIELDS = [
  "businessName", "businessDescription", "businessAddress", "businessCity", "businessState", "businessZip", "businessPhone", "businessEmail", "businessWebsite",
] as const satisfies readonly (keyof Company)[];

/** A cookie's value for these fields: their words as base64url, a dot, and the signature of those words. */
function signFields(value: object, key: string): string {
  const body = Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
  return `${body}.${createHmac("sha256", key).update(body).digest("hex")}`;
}

/** The fields a cookie value carries, or null when it is missing, not signed by this key, altered, or not all text. */
function parseFields<T>(raw: string | undefined, fields: readonly string[], key: string): T | null {
  if (!raw) return null;
  const dot = raw.lastIndexOf(".");
  if (dot < 0) return null;
  const body = raw.slice(0, dot);
  const given = Buffer.from(raw.slice(dot + 1), "hex");
  const expected = createHmac("sha256", key).update(body).digest();
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  let value: unknown;
  try {
    value = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  if (!fields.every((field) => typeof v[field] === "string")) return null;
  return Object.fromEntries(fields.map((field) => [field, v[field] as string])) as T;
}

export const signWho = (who: Who, key: string): string => signFields(who, key);
export const parseWho = (raw: string | undefined, key: string): Who | null => parseFields<Who>(raw, WHO_FIELDS, key);
export const signCompany = (company: Company, key: string): string => signFields(company, key);
export const parseCompany = (raw: string | undefined, key: string): Company | null => parseFields<Company>(raw, COMPANY_FIELDS, key);

/**
 * The steps that ask how this business's receptionist should behave, in the order they are asked, between the business step and the
 * plan: a business sees what it is configuring before it is asked to pay for it. Jeff, 2026-11-20: *"Any and/or every setting needs to
 * be included in the onboarding multi-step form. The application may have preset defaults, but I am not comfortable making decisions on
 * behalf of others."*
 *
 * Each one's answers go straight to GeekAPI, which writes them on the business's receptionist_configs row. The cookie records only
 * which of these steps have been submitted, so a refresh resumes in the right place: a greeting, a prompt and a list of questions would
 * overflow a 4 KB cookie and break resumption silently, and the row already holds them.
 */
export const CONFIG_STEPS = ["recording", "schedule", "crew", "hours", "questions", "knowledge", "messages", "greeting"] as const;

export type ConfigStep = (typeof CONFIG_STEPS)[number];

/** The connections a visitor can make during signup, and show to work. The names GeekAPI uses for them. */
export const CONNECTIONS = ["google_calendar", "google_drive", "aws_s3"] as const;

export type Connection = (typeof CONNECTIONS)[number];

export function isConfigStep(value: unknown): value is ConfigStep {
  return typeof value === "string" && (CONFIG_STEPS as readonly string[]).includes(value);
}

/**
 * Where a visitor is in /signup, kept in an httpOnly cookie between steps and across the trips to PayPal. It holds ids only (the tenant
 * and what PayPal made for it) and which receptionist steps are answered, never an answer and never a password, and every one is
 * checked again by GeekAPI and PayPal before anything is bought.
 */
export type SignupState = {
  tenantId: string;
  contactEmail: string;
  configDone?: ConfigStep[];
  /** The Terms were accepted, which GeekAPI recorded and checks again before PayPal opens (Jeff, 2026-11-22). A fact, never an answer. */
  termsAccepted?: boolean;
  /** The connections that were shown to work: GeekAPI used each one and it answered. A convenience for the screen; GeekAPI holds the truth. */
  proved?: Connection[];
  tier?: string;
  subscriptionId?: string;
  subscriptionApproved?: boolean;
  setupTokenId?: string;
  vaultTokenId?: string;
  phoneNumber?: string;
};

export type SignupStep =
  | "captcha"
  | "who"
  | "company"
  | "industries"
  | ConfigStep
  | "terms"
  | "plan"
  | "payment_method"
  | "number"
  | "login";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID = /^[A-Za-z0-9-]{1,64}$/;

/** The step a visitor is on, from what is already done. */
export function stepOf(state: SignupState | null, gates: ReadonlySet<Gate>): SignupStep {
  if (!state) {
    if (!gates.has("captcha")) return "captcha";
    if (!gates.has("who")) return "who";
    if (!gates.has("company")) return "company";
    return "industries";
  }
  // The receptionist questions, while nothing has been paid for. They are asked only here, and never after the subscription is
  // approved: GeekAPI refuses them once the business is active, so a visitor sent back to them then would have nowhere to go.
  if (!state.subscriptionApproved) {
    const done = state.configDone ?? [];
    for (const step of CONFIG_STEPS) if (!done.includes(step)) return step;
    // The Terms come after the setup and before the plan: nothing is chosen or paid for until they are accepted.
    if (!state.termsAccepted) return "terms";
    return "plan";
  }
  if (!state.vaultTokenId) return "payment_method";
  if (!state.phoneNumber) return "number";
  return "login";
}

/** This signup with one more receptionist step answered. The same step twice is still one step done, not two. */
export function withConfigStepDone(state: SignupState, step: ConfigStep): SignupState {
  const done = state.configDone ?? [];
  return done.includes(step) ? state : { ...state, configDone: [...done, step] };
}

/** This signup with one more connection shown to work. The same one twice is still one. */
export function withProved(state: SignupState, connection: Connection): SignupState {
  const proved = state.proved ?? [];
  return proved.includes(connection) ? state : { ...state, proved: [...proved, connection] };
}

/** This signup once the Terms are accepted. */
export function withTermsAccepted(state: SignupState): SignupState {
  return { ...state, termsAccepted: true };
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
    configDone: Array.isArray(v.configDone) ? CONFIG_STEPS.filter((step) => (v.configDone as unknown[]).includes(step)) : undefined,
    tier: id("tier"),
    subscriptionId: id("subscriptionId"),
    termsAccepted: v.termsAccepted === true,
    proved: Array.isArray(v.proved) ? CONNECTIONS.filter((connection) => (v.proved as unknown[]).includes(connection)) : undefined,
    subscriptionApproved: v.subscriptionApproved === true,
    setupTokenId: id("setupTokenId"),
    vaultTokenId: id("vaultTokenId"),
    phoneNumber: typeof v.phoneNumber === "string" && /^\+[1-9]\d{6,14}$/.test(v.phoneNumber) ? v.phoneNumber : undefined,
  };
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24,
};

/** Who the first screen was told, or null: no cookie, no key to check it with, or one this app did not sign. */
export async function readWho(): Promise<Who | null> {
  const key = gateKey();
  if (!key) return null;
  return parseWho((await cookies()).get(WHO_COOKIE)?.value, key);
}

/** What the second screen was told about the business, or null for the same reasons. */
export async function readCompany(): Promise<Company | null> {
  const key = gateKey();
  if (!key) return null;
  return parseCompany((await cookies()).get(COMPANY_COOKIE)?.value, key);
}

/** Remembers for a day who the visitor said they are. Server Actions only; it needs the reCAPTCHA secret to sign with. */
export async function writeWho(who: Who): Promise<void> {
  const key = gateKey();
  if (!key) throw new Error("RECAPTCHA_SECRET_KEY is not set, so the signup's progress cannot be signed.");
  (await cookies()).set(WHO_COOKIE, signWho(who, key), cookieOptions);
}

/** Remembers for a day what the visitor said about the business. Server Actions only. */
export async function writeCompany(company: Company): Promise<void> {
  const key = gateKey();
  if (!key) throw new Error("RECAPTCHA_SECRET_KEY is not set, so the signup's progress cannot be signed.");
  (await cookies()).set(COMPANY_COOKIE, signCompany(company, key), cookieOptions);
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
  (await cookies()).set(WHO_COOKIE, "", gone);
  (await cookies()).set(COMPANY_COOKIE, "", gone);
}

export async function clearSignup(): Promise<void> {
  (await cookies()).set(SIGNUP_COOKIE, "", gone);
  await clearGates();
}
