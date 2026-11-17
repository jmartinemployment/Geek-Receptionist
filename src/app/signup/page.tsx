import { ActionButton } from "@/components/action-button";
import HeroSection from "@/components/shared/shared-hero-section";
import { readGates, readSignup, stepOf, type SignupStep } from "@/lib/signup/state";
import { signupMessage } from "@/lib/signup/messages";
import { ui } from "@/lib/ui";
import { choosePlanAction, countryAction, healthcareAction, savePaymentMethodAction, startOverAction } from "./actions";
import { captchaSiteKey } from "@/lib/captcha";
import { getBusinessActivities } from "@/services/onboarding";
import { BusinessForm, LoginForm, NumberForm, RobotForm } from "./signup-forms";

export const dynamic = "force-dynamic";

const STEPS: { step: SignupStep; title: string }[] = [
  { step: "captcha", title: "Robot check" },
  { step: "country", title: "Your country" },
  { step: "healthcare", title: "Your industry" },
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

/** Self-service signup, rendered on the server from where this browser's signup stands. Each step is a Server Action; no step reloads the page. */
export default async function Signup({ searchParams }: { searchParams: Promise<{ error?: string | string[] }> }) {
  const state = await readSignup();
  const step = stepOf(state, await readGates());
  const index = STEPS.findIndex((s) => s.step === step);
  const { error } = await searchParams;
  const refusal = typeof error === "string" && CODE.test(error) ? signupMessage(error) : null;
  const activities = step === "business" ? await getBusinessActivities() : null;
  const siteKey = captchaSiteKey();

  return (
    <HeroSection title="Set up your receptionist" summary="Answer a few questions, choose a plan and get a phone number for your receptionist.">
      <div className="w-full">
        <ol className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Signup steps">
          {STEPS.map((s, i) => (
            <li key={s.step} aria-current={i === index ? "step" : undefined} className={i === index ? "font-semibold text-ink" : i < index ? "text-ok" : "text-muted"}>
              {i + 1}. {s.title}
            </li>
          ))}
        </ol>

        <section className="mb-4 rounded-md border border-line p-5" aria-labelledby="step-heading">
          <h2 id="step-heading" className={ui.h2}>
            {STEPS[index].title}
          </h2>
          {refusal ? (
            <p className={`${ui.status.bad} mb-3`} role="alert">
              {refusal}
            </p>
          ) : null}

          {step === "captcha" &&
            (siteKey ? (
              <RobotForm captchaSiteKey={siteKey} />
            ) : (
              <p className={ui.status.bad} role="alert">
                {signupMessage("captcha_not_configured")}
              </p>
            ))}

          {step === "country" && (
            <>
              <p className={`${ui.muted} mb-4`}>Is the business in the United States?</p>
              <div className="flex flex-wrap gap-3">
                <ActionButton action={countryAction.bind(null, true)} label="Yes, in the United States" pendingLabel="One moment…" />
                <ActionButton action={countryAction.bind(null, false)} label="No, in another country" pendingLabel="One moment…" quiet />
              </div>
            </>
          )}

          {step === "healthcare" && (
            <>
              <p className={`${ui.muted} mb-4`}>Is the business a healthcare or veterinary business?</p>
              <div className="flex flex-wrap gap-3">
                <ActionButton action={healthcareAction.bind(null, false)} label="No, it is not" pendingLabel="One moment…" />
                <ActionButton action={healthcareAction.bind(null, true)} label="Yes, it is" pendingLabel="One moment…" quiet />
              </div>
            </>
          )}

          {step === "business" && activities && (activities.ok ? (
            <BusinessForm activities={activities.activities} />
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
              <NumberForm />
            </>
          )}

          {step === "login" && state && (
            <>
              <p className="mb-4">
                Your receptionist answers at <span className="font-semibold">{state.phoneNumber}</span>. Create the login you will use to manage it.
              </p>
              <LoginForm email={state.contactEmail} />
            </>
          )}
        </section>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {state && step !== "login" ? <ActionButton action={startOverAction} label="Start over" pendingLabel="Starting over…" quiet /> : null}
        </div>
      </div>
    </HeroSection>
  );
}
