import Link from "next/link";
import { ActionButton } from "@/components/action-button";
import HeroSection from "@/components/shared/shared-hero-section";
import { readGates, readSignup, stepOf, type SignupStep } from "@/lib/signup/state";
import { signupMessage } from "@/lib/signup/messages";
import { ui } from "@/lib/ui";
import { choosePlanAction, countryAction, forgetRobotCheckAction, healthcareAction, savePaymentMethodAction, startOverAction } from "./actions";
import { captchaSiteKey } from "@/lib/captcha";
import { getBusinessActivities } from "@/services/onboarding";
import { BusinessForm, LoginForm, NumberForm, RobotCheckButton } from "./signup-forms";

export const dynamic = "force-dynamic";

const STEPS: { step: SignupStep; title: string }[] = [
  { step: "country", title: "Is Business located in United States?" },
  { step: "healthcare", title: "Is the business a healthcare or veterinary business?" },
  { step: "business", title: "Your business" },
  { step: "plan", title: "Choose a plan" },
  { step: "payment_method", title: "Save a payment method" },
  { step: "number", title: "Your receptionist's number" },
  { step: "login", title: "Your login" },
];

const PLANS = [
  { code: "STARTER", name: "Starter", price: 30, minutes: 90 },
  { code: "STANDARD", name: "Standard", price: 48, minutes: 250 },
  { code: "PRO", name: "Pro", price: 148, minutes: 1000 },
  { code: "PREMIUM", name: "Premium", price: 298, minutes: 2000 },
];

const CODE = /^[a-z0-9_]{1,64}$/;

/** The words of a yes-or-no question wrap at this width, so the block they make is narrower than the column and can sit centered in it. */
const QUESTION_WIDTH = "mx-auto max-w-[17.5rem]";

/** Self-service signup, rendered on the server from where this browser's signup stands. Each step is a Server Action; no step reloads the page. */
export default async function Signup({ searchParams }: { searchParams: Promise<{ error?: string | string[]; start?: string | string[] }> }) {
  const state = await readSignup();
  const gateStep = stepOf(state, await readGates());
  const siteKey = captchaSiteKey();
  const title = "Set up your receptionist";
  const summary = "Answer a few questions, choose a plan and get a phone number for your receptionist.";

  const { error, start } = await searchParams;

  // Every visit opens on the hero: the robot beside the text and the orange Continue. Continue opens the robot check when it has not been
  // passed, and takes the visitor on to the first question when it has. Once a business exists the visitor is already past it.
  const started = state !== null || (start === "1" && gateStep !== "captcha");
  if (!started) {
    return (
      <HeroSection
        title={title}
        summary={summary}
        image="/images/home-hero.avif"
        imgAlt="A Geek @ Your Spot LLC robot action figure in its package, holding a laptop with a rising chart, beside icons for chat, automation, reporting and a small business storefront."
        action={
          gateStep !== "captcha" ? (
            <Link href="/signup?start=1" className={ui.button}>
              Continue
            </Link>
          ) : siteKey ? (
            <RobotCheckButton captchaSiteKey={siteKey} />
          ) : (
            <p className={ui.status.bad} role="alert">
              {signupMessage("captcha_not_configured")}
            </p>
          )
        }
      />
    );
  }

  const step = gateStep === "captcha" ? "country" : gateStep;
  const compact = step === "country" || step === "healthcare";
  const index = STEPS.findIndex((s) => s.step === step);
  const refusal = typeof error === "string" && CODE.test(error) ? signupMessage(error) : null;
  const activities = step === "business" ? await getBusinessActivities() : null;

  // The steps are written once and rendered in both hero blocks, as geekatyourspot.com writes a section's body, so every id takes the block's suffix.
  // The two yes-or-no questions take only the width their own words need, centered in the column with the text centered; the forms use all of it.
  const body = (s: string) => (
    <div className={compact ? "mx-auto w-fit max-w-full text-center" : "w-full text-left"}>
      <section className="mb-4" aria-labelledby={`step-heading${s}`}>
        <h2 id={`step-heading${s}`} className={`${ui.h2} ${compact ? QUESTION_WIDTH : ""}`}>
          {STEPS[index].title}
        </h2>
        {refusal ? (
          <p className={`${ui.status.bad} mb-3`} role="alert">
            {refusal}
          </p>
        ) : null}

        {step === "country" && (
          <div className="flex flex-nowrap justify-center gap-3">
            <ActionButton action={countryAction.bind(null, true)} label="Yes" pendingLabel="One moment…" />
            <ActionButton action={countryAction.bind(null, false)} label="No" pendingLabel="One moment…" quiet dialogTitle="Not available outside the United States" onDialogClose={forgetRobotCheckAction} />
          </div>
        )}

        {step === "healthcare" && (
          <div className="flex flex-nowrap justify-center gap-3">
            <ActionButton action={healthcareAction.bind(null, true)} label="Yes" pendingLabel="One moment…" dialogTitle="Not available for healthcare or veterinary businesses" />
            <ActionButton action={healthcareAction.bind(null, false)} label="No" pendingLabel="One moment…" quiet />
          </div>
        )}

        {step === "business" && activities && (activities.ok ? (
          <BusinessForm activities={activities.activities} idSuffix={s} />
        ) : (
          <p className={ui.status.bad} role="alert">
            {signupMessage(activities.code)}
          </p>
        ))}

        {step === "plan" && (
          <>
            <p className={`${ui.muted} mb-4`}>
              Billed monthly through PayPal. Minutes over your plan are $0.50 each, charged at the end of the month to the PayPal account
              you save next.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PLANS.map((plan) => (
                <li key={plan.code} className="flex flex-col gap-2 rounded-md border border-line p-4">
                  <p className="font-semibold">{plan.name}</p>
                  <p>
                    <span className="text-2xl font-semibold">${plan.price}</span> a month
                  </p>
                  <p className={ui.muted}>{plan.minutes.toLocaleString("en-US")} minutes included</p>
                  <ActionButton action={choosePlanAction.bind(null, plan.code)} label={`Choose ${plan.name}`} pendingLabel="Opening PayPal…" />
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "payment_method" && (
          <>
            <p className={`${ui.muted} mb-4`}>
              Your {state?.tier ? state.tier.charAt(0) + state.tier.slice(1).toLowerCase() : ""} subscription is approved. Now save your PayPal
              account for minutes over your plan. Nothing is charged now.
            </p>
            <ActionButton action={savePaymentMethodAction} label="Save PayPal for overage minutes" pendingLabel="Opening PayPal…" />
          </>
        )}

        {step === "number" && (
          <>
            <p className={`${ui.muted} mb-4`}>
              Choose the area code your callers will dial. We check your payment with PayPal, then get a local number and set up your
              receptionist on it.
            </p>
            <NumberForm idSuffix={s} />
          </>
        )}

        {step === "login" && state && (
          <>
            <p className="mb-4">
              Your receptionist answers at <span className="font-semibold">{state.phoneNumber}</span>. Create the login you will use to manage it.
            </p>
            <LoginForm email={state.contactEmail} idSuffix={s} />
          </>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        {state && step !== "login" ? <ActionButton action={startOverAction} label="Start over" pendingLabel="Starting over…" quiet /> : null}
      </div>
    </div>
  );

  return (
    <HeroSection
      title={title}
      summary={summary}
      action={
        <button type="button" disabled className={ui.button} style={{ cursor: "not-allowed" }}>
          Continue
        </button>
      }
    >
      {body}
    </HeroSection>
  );
}
