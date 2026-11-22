"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { publicOrigin } from "@/lib/auth/same-origin";
import { clearGates, clearSignup, passGate, readCompany, readGates, readSignup, readWho, withConfigStepDone, withTermsAccepted, writeCompany, writeSignup, writeWho, type ConfigStep } from "@/lib/signup/state";
import { isConsentMode } from "@/lib/receptionist/controls";
import { DAYS, alwaysOpenHours, businessHoursOf, noHours, type DayHours } from "@/lib/signup/hours";
import { verifyCaptcha } from "@/lib/captcha";
import { refusalOf, signupMessage } from "@/lib/signup/messages";
import { TERMS_STATEMENT } from "@/lib/signup/declaration";
import { EXCLUDED_CODES, EXCLUDED_INDUSTRIES, industryAnswers, type ExcludedCode } from "@/lib/signup/excluded";
import { postOnboarding } from "@/services/onboarding";
import { setSessionCookies, signIn, visitorIpFrom } from "@/services/owner-auth";

/**
 * What a signup step hands back. `refused` names the excluded industry a yes was given to, or `country` when the business is not in the United States;
 * either ends the signup.
 */
export type SignupFormState = { error: string | null; fields: Record<string, string>; refused?: ExcludedCode | "country" };

const TIERS = new Set(["STARTER", "STANDARD", "PRO", "PREMIUM"]);

const text = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

/** Before step 1: the robot check, a dialog over the first step. Google's answer is checked here, once; a pass is remembered and the form goes on. */
export async function captchaAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const outcome = await verifyCaptcha(form.get("g-recaptcha-response"), visitorIpFrom(await headers()));
  if (outcome !== "ok") return { error: signupMessage(outcome), fields: {} };
  await passGate("captcha");
  redirect("/signup?start=1");
}

/** The longest any answer at the first two screens is accepted; a longer one is refused, never cut short. */
const WHO_MAX = 300;
const US_STATE = /^[A-Za-z]{2}$/;
const US_ZIP = /^\d{5}(-\d{4})?$/;

/** A website is optional, but one that is given is a full http or https address with a dotted host; GeekAPI checks it the same way. */
function isWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

/**
 * The first screen: who is talking to us, before anything is verified or created (Jeff, 2026-11-21: First Name, Middle Initial, Last
 * Name, Address, City, State, Zip Code, Telephone, Email). Everything but the middle initial is required. A state must be two letters and
 * a zip five digits or ZIP+4, and each is refused otherwise, never fixed up. Nothing else is checked here: the telephone and email are
 * confirmed after payment, and GeekAPI checks their shape again when the business is submitted. What was typed is held in a signed
 * cookie so the declaration can show it again.
 */
export async function whoAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = {
    firstName: text(form, "firstName"),
    middleInitial: text(form, "middleInitial"),
    lastName: text(form, "lastName"),
    address: text(form, "address"),
    city: text(form, "city"),
    state: text(form, "state").toUpperCase(),
    zip: text(form, "zip"),
    phone: text(form, "phone"),
    email: text(form, "email"),
  };
  if (!(await readGates()).has("captcha")) return { error: signupMessage("signup_expired"), fields };

  const { middleInitial, ...required } = fields;
  if (Object.values(required).some((value) => value.length === 0)) return { error: "Fill in every answer except the middle initial.", fields };
  if (Object.values(fields).some((value) => value.length > WHO_MAX)) return { error: `Each answer must be ${WHO_MAX} characters or fewer.`, fields };
  if (middleInitial.length > 2) return { error: "The middle initial is one letter.", fields };
  if (!US_STATE.test(fields.state)) return { error: "A state is its two-letter code, such as FL.", fields };
  if (!US_ZIP.test(fields.zip)) return { error: "A zip code is five digits, such as 33432.", fields };

  await writeWho(fields);
  await passGate("who");
  redirect("/signup?start=1");
}

/**
 * The second screen, kept apart from the person's (Jeff, 2026-11-21: "split off business from personal"): Business Name, What it does
 * (added 2026-11-22, when the declaration that used to ask it was removed), Business Address, City, State, Zip, Business Telephone, Business Email, and the business's website, which is optional. The same rules as the
 * first screen, and the website must be a full http or https address when one is given.
 */
export async function companyAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = {
    businessName: text(form, "businessName"),
    businessDescription: text(form, "businessDescription"),
    businessAddress: text(form, "businessAddress"),
    businessCity: text(form, "businessCity"),
    businessState: text(form, "businessState").toUpperCase(),
    businessZip: text(form, "businessZip"),
    businessPhone: text(form, "businessPhone"),
    businessEmail: text(form, "businessEmail"),
    businessWebsite: text(form, "businessWebsite"),
  };
  const passed = await readGates();
  if (!passed.has("captcha") || !passed.has("who")) return { error: signupMessage("signup_expired"), fields };

  const { businessWebsite, ...required } = fields;
  if (Object.values(required).some((value) => value.length === 0)) return { error: "Fill in every answer except the website.", fields };
  if (Object.values(fields).some((value) => value.length > WHO_MAX)) return { error: `Each answer must be ${WHO_MAX} characters or fewer.`, fields };
  if (fields.businessDescription.length > 120) return { error: "What the business does is 120 characters or fewer.", fields };
  if (!US_STATE.test(fields.businessState)) return { error: "A state is its two-letter code, such as FL.", fields };
  if (!US_ZIP.test(fields.businessZip)) return { error: "A zip code is five digits, such as 33432.", fields };
  if (businessWebsite.length > 0 && !isWebsite(businessWebsite)) return { error: signupMessage("business_website_invalid"), fields };

  await writeCompany(fields);
  await passGate("company");
  redirect("/signup?start=1");
}

/**
 * What closing a refusal dialog (not in the United States, an excluded industry) does: the robot check is forgotten, so the next visit starts from it again. It runs
 * on close, not with the answer, because clearing the cookie re-renders the page back to the hero and the dialog would vanish with it.
 */
export async function forgetRobotCheckAction(): Promise<void> {
  await clearGates();
}

/**
 * The eligibility screen: is the business in the United States, then the eight excluded-industry questions, each its own yes or no
 * (Jeff, 2026-11-21: the country question moves onto this screen). Every one must be answered; none is taken as a no for being left
 * blank. A No to the country ends the signup at once, said in a dialog, and GeekAPI is not told: no answer about industries is kept for
 * a business that is not here. Otherwise the business is created, waiting for payment, and the form goes on. A yes to any of them is the end of it: GeekAPI
 * is told at once, all eight answers as given, and keeps them forever; then the refusal of the first industry answered yes is said.
 * If GeekAPI could not store them the visitor is still stopped, and is told what failed.
 */
export async function eligibilityAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields: Record<string, string> = {};
  const country = form.get("country");
  if (country === "yes" || country === "no") fields.country = country;
  const yes = new Set<ExcludedCode>();
  let unanswered = fields.country === undefined;
  for (const code of EXCLUDED_CODES) {
    const answer = form.get(code);
    if (answer === "yes" || answer === "no") fields[code] = answer;
    else unanswered = true;
    if (answer === "yes") yes.add(code);
  }

  const gates = await readGates();
  if (!gates.has("captcha") || !gates.has("who") || !gates.has("company")) return { error: signupMessage("signup_expired"), fields };
  if (unanswered) return { error: "Answer yes or no to every question.", fields };
  if (country === "no") return { error: signupMessage("country_not_supported"), fields, refused: "country" };

  const refused = EXCLUDED_CODES.find((code) => yes.has(code));
  if (refused) {
    const kept = await postOnboarding("/api/v1/onboarding/industry-refusals", { answers: industryAnswers(yes) }, await headers());
    if (kept.status !== 200) return { error: refusalOf(kept.body, kept.status), fields };
    return { error: EXCLUDED_INDUSTRIES[refused].refusal, fields, refused };
  }
  // Every answer is a no. The person and the business, which the first two screens asked and signed into cookies, are sent now, and the
  // business becomes a tenant waiting for payment. The Terms are not accepted yet: they come after the receptionist's setup, before the plan.
  const who = await readWho();
  const company = await readCompany();
  if (!who || !company) return { error: signupMessage("signup_expired"), fields };

  const answer = await postOnboarding("/api/v1/onboarding/validate-eligibility", {
    businessName: company.businessName,
    businessDescription: company.businessDescription,
    countryCode: "US",
    stateCode: company.businessState,
    contactEmail: company.businessEmail,
    contactPhone: company.businessPhone,
    industryAnswers: industryAnswers(new Set()),
    attestorName: [who.firstName, who.middleInitial, who.lastName].filter(Boolean).join(" "),
    businessAddress: `${company.businessAddress}, ${company.businessCity}, ${company.businessState} ${company.businessZip}`,
    declarantAddress: `${who.address}, ${who.city}, ${who.state} ${who.zip}`,
    declarantPhone: who.phone,
    declarantEmail: who.email,
    businessWebsite: company.businessWebsite,
  }, await headers());

  const tenantId = answer.body?.tenantId;
  if (answer.status !== 200 || typeof tenantId !== "string") return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup({ tenantId, contactEmail: company.businessEmail });
  redirect("/signup");
}

/**
 * The acceptance of the Terms (Jeff, 2026-11-22: a standard SaaS acceptance, and after the receptionist's setup, before the plan):
 * continuing is agreeing, to the Terms of Service and Privacy Policy of Geek @ Your Spot LLC and to calls being answered by
 * an AI receptionist that tells callers so. There is no second answer, so there is nothing to read as a yes or a no. GeekAPI stores the
 * exact sentence (`TERMS_STATEMENT`) with when and from where, once and forever, refuses any other words, and refuses to start a
 * subscription for a business that has not accepted them, so this cookie's `termsAccepted` is a convenience and never the proof.
 */
export async function termsAction(): Promise<SignupFormState> {
  const fields: Record<string, string> = {};
  const state = await readSignup();
  if (!state) return { error: signupMessage("signup_expired"), fields };

  const answer = await postOnboarding("/api/v1/onboarding/terms-acceptance", { tenantId: state.tenantId, statement: TERMS_STATEMENT }, await headers());
  if (answer.status !== 200) return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup(withTermsAccepted(state));
  redirect("/signup");
}

/**
 * One receptionist step, saved. The answers go to GeekAPI, which writes them on this business's settings row and refuses them once the
 * business is active; only when it has saved them is the step recorded as done, so a step that failed is asked again rather than skipped.
 *
 * <p>Nothing a visitor typed is kept in the cookie — only which step was answered.</p>
 */
async function saveConfigStep(
  step: ConfigStep,
  answers: Record<string, unknown>,
  fields: Record<string, string>,
): Promise<SignupFormState> {
  const state = await readSignup();
  if (!state) return { error: signupMessage("signup_expired"), fields };

  const answer = await postOnboarding(
    "/api/v1/onboarding/receptionist-config",
    { tenantId: state.tenantId, answers },
    await headers(),
  );
  if (answer.status !== 200) return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup(withConfigStepDone(state, step));
  redirect("/signup");
}

/** The lines of a textarea as a list, with the blank ones dropped. An empty list is the answer "none", which is a real answer. */
const lines = (form: FormData, name: string): string[] =>
  text(form, name)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

/** Your greeting: what a caller hears first, whether they press a key for it, and whether they are told about recording. */
export async function greetingAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const greeting = text(form, "greeting");
  const consentMode = text(form, "consentMode");
  const fields = { greeting, consentMode };

  if (!isConsentMode(consentMode)) return { error: "Choose what your callers hear before your receptionist speaks.", fields };

  return saveConfigStep(
    "greeting",
    {
      // Left blank is the other answer the question offers: keep the greeting this receptionist already has, which no field changes.
      ...(greeting.length > 0 ? { greetingMessage: greeting } : {}),
      consentMode,
      recordingDisclosureEnabled: text(form, "recordingDisclosure") === "yes",
    },
    fields,
  );
}

/** When you're open: the hours the receptionist may give a caller, or none at all. */
export async function hoursAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const timezone = text(form, "timezone");
  const shape = text(form, "hoursShape");
  const fields = { timezone, hoursShape: shape };

  const rows: DayHours[] = DAYS.map((day) => ({
    day,
    closed: form.get(`closed-${day}`) === "on",
    open: text(form, `open-${day}`),
    close: text(form, `close-${day}`),
  }));

  const outcome =
    shape === "always" ? alwaysOpenHours(timezone)
    : shape === "none" ? noHours()
    : shape === "set" ? businessHoursOf(timezone, rows)
    : { ok: false as const, message: "Say whether you keep set hours, are open at all times, or would rather not give hours yet." };

  if (!outcome.ok) return { error: outcome.message, fields };
  return saveConfigStep("hours", { businessHours: outcome.hours }, fields);
}

/** What it should ask: the questions every caller is asked, and the words that mean a call cannot wait. */
export async function questionsAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const questions = text(form, "questions");
  const keywords = text(form, "keywords");

  return saveConfigStep(
    "questions",
    {
      // An empty list is "ask nothing of your callers beyond what they came to say", and is sent as the answer it is.
      qualifyingQuestions: lines(form, "questions"),
      emergencyKeywords: keywords
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word.length > 0),
    },
    { questions, keywords },
  );
}

/**
 * What it should know: the business in its own words, from which GeekAPI assembles its receptionist's prompt. The parts are sent, never
 * an assembled prompt: the business's name, state and industry are already on its record and are not asked for twice.
 */
export async function knowledgeAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = {
    receptionistName: text(form, "receptionistName"),
    whatTheBusinessDoes: text(form, "whatTheBusinessDoes"),
    whoItServes: text(form, "whoItServes"),
    howItPrices: text(form, "howItPrices"),
    whatToDoWithACaller: text(form, "whatToDoWithACaller"),
  };

  if (fields.whatTheBusinessDoes.length === 0) {
    return { error: "Say what your business does, so your receptionist can tell a caller.", fields };
  }

  return saveConfigStep("knowledge", { knowledge: fields }, fields);
}

/** After the call: whether a finished call reaches the business, where, and how much of it. */
export async function messagesAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const wants = text(form, "wantsEmail") === "yes";
  const destination = text(form, "destinationEmail");
  const fields = { wantsEmail: wants ? "yes" : "no", destinationEmail: destination };

  if (wants && destination.length === 0) return { error: "Enter the email address a finished call should be sent to.", fields };

  return saveConfigStep(
    "messages",
    {
      messageEmailEnabled: wants,
      // Empty clears the address when nothing is to be sent; leaving the field out would keep an address nothing uses.
      messageDestinationEmail: wants ? destination : "",
      includeTranscript: wants && form.get("includeTranscript") === "on",
      notifyOnAbandonedCalls: wants && form.get("notifyOnAbandonedCalls") === "on",
    },
    fields,
  );
}

/**
 * Appointments: whether this business wants its receptionist to book into its calendar.
 *
 * <p>
 * This answers `bookingRequested` and never `bookingEnabled`. Booking itself is refused without a calendar that works, and no business
 * has one during signup — connecting a calendar is a Google sign-in that needs the owner's token, and the login is the last step. So a
 * yes here is the business's answer on the record; the first sign-in asks for the calendar and GeekAPI switches booking on when it
 * arrives. Sending `bookingEnabled` would have the visitor refused for answering honestly.
 * </p>
 */
export async function appointmentsAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const wants = text(form, "wantsBooking");
  if (wants !== "yes" && wants !== "no") {
    return { error: "Say whether your receptionist should book appointments.", fields: { wantsBooking: wants } };
  }

  return saveConfigStep("appointments", { bookingRequested: wants === "yes" }, { wantsBooking: wants });
}

/** Step 4: the plan. GeekAPI starts a PayPal subscription to it for this tenant and the visitor approves it in PayPal. */
export async function choosePlanAction(tier: string): Promise<{ error: string | null }> {
  const state = await readSignup();
  if (!state) return { error: signupMessage("signup_expired") };
  if (!TIERS.has(tier)) return { error: signupMessage("tier_unknown") };

  const origin = publicOrigin(await headers());
  const answer = await postOnboarding("/api/v1/onboarding/paypal/subscription", {
    tenantId: state.tenantId,
    tierCode: tier,
    returnUrl: `${origin}/signup/paypal/subscribed`,
    cancelUrl: `${origin}/signup?error=paypal_cancelled`,
  }, await headers());

  const subscriptionId = answer.body?.subscriptionId;
  const approvalUrl = answer.body?.approvalUrl;
  if (answer.status !== 200 || typeof subscriptionId !== "string" || typeof approvalUrl !== "string" || !approvalUrl.startsWith("https://")) {
    return { error: refusalOf(answer.body, answer.status) };
  }

  await writeSignup({ ...state, tier, subscriptionId, subscriptionApproved: false, setupTokenId: undefined, vaultTokenId: undefined });
  redirect(approvalUrl);
}

/** Step 5: saving the visitor's PayPal account for overage charges, approved in PayPal. */
export async function savePaymentMethodAction(): Promise<{ error: string | null }> {
  const state = await readSignup();
  if (!state?.subscriptionApproved) return { error: signupMessage("signup_expired") };

  const origin = publicOrigin(await headers());
  const answer = await postOnboarding("/api/v1/onboarding/paypal/vault", {
    tenantId: state.tenantId,
    returnUrl: `${origin}/signup/paypal/saved`,
    cancelUrl: `${origin}/signup?error=paypal_cancelled`,
  }, await headers());

  const setupTokenId = answer.body?.setupTokenId;
  const approvalUrl = answer.body?.approvalUrl;
  if (answer.status !== 200 || typeof setupTokenId !== "string" || typeof approvalUrl !== "string" || !approvalUrl.startsWith("https://")) {
    return { error: refusalOf(answer.body, answer.status) };
  }

  await writeSignup({ ...state, setupTokenId });
  redirect(approvalUrl);
}

/**
 * Step 6: the area code. GeekAPI checks the subscription and the saved payment method with PayPal, then buys the number in that area
 * code and sets up the receptionist on it. This is the step that spends money.
 */
export async function activateAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = { areaCode: text(form, "areaCode") };
  const state = await readSignup();
  if (!state?.vaultTokenId || !state.subscriptionId || !state.tier) return { error: signupMessage("signup_expired"), fields };

  const answer = await postOnboarding("/api/v1/onboarding/activate-subscription", {
    tenantId: state.tenantId,
    tierCode: state.tier,
    paypalSubscriptionId: state.subscriptionId,
    paypalVaultTokenId: state.vaultTokenId,
    preferredAreaCode: fields.areaCode,
    enableSmsNotifications: false,
  }, await headers());

  const phoneNumber = answer.body?.assignedPhoneNumber;
  if (answer.status !== 200 || typeof phoneNumber !== "string") return { error: refusalOf(answer.body, answer.status), fields };

  await writeSignup({ ...state, phoneNumber });
  redirect("/signup");
}

/** Step 7: the owner's login. The password goes to GeekAPI once to make the login and once to sign in, and is never kept or shown. */
export async function createLoginAction(_previous: SignupFormState, form: FormData): Promise<SignupFormState> {
  const fields = { email: text(form, "email"), displayName: text(form, "displayName") };
  const password = form.get("password");
  const state = await readSignup();
  if (!state?.phoneNumber) return { error: signupMessage("signup_expired"), fields };
  if (typeof password !== "string" || password.length === 0) return { error: "Choose a password.", fields };

  const created = await postOnboarding("/api/v1/onboarding/create-owner-login", {
    tenantId: state.tenantId,
    email: fields.email,
    password,
    displayName: fields.displayName,
  }, await headers());
  if (created.status !== 201) return { error: refusalOf(created.body, created.status), fields };

  // The login exists now; signing in is a separate call, and a failure here sends the owner to /login rather than claiming success.
  const visitor = await headers();
  const outcome = await signIn(fields.email, password, visitorIpFrom(visitor), null);
  await clearSignup();
  if (!outcome.ok) redirect("/login");
  setSessionCookies(await cookies(), outcome.session);
  redirect("/dashboard?notice=signup_complete");
}

/** Start over: forget this browser's signup. The tenant GeekAPI made stays waiting for payment and is never charged. */
export async function startOverAction(): Promise<{ error: string | null }> {
  await clearSignup();
  redirect("/signup");
}
