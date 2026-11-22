import Link from "next/link";
import { ActionButton } from "@/components/action-button";
import { SchedulerShell } from "@/components/shared/scheduler/scheduler-shell";
import HeroSection from "@/components/shared/shared-hero-section";
import { readGates, readSignup, readWho, stepOf, type SignupStep } from "@/lib/signup/state";
import { signupMessage } from "@/lib/signup/messages";
import { ui } from "@/lib/ui";
import { startOverAction } from "./actions";
import { SubmitFromLeft } from "@/components/submit-from-left";
import { PaymentMethodStep, PlanStep } from "./steps";
import { captchaSiteKey } from "@/lib/captcha";
import { isDriveState } from "./drive-connect-layout";
import {
  TermsForm,
  CompanyForm,
  EligibilityForm,
  RecordingConnectionForm,
  ScheduleConnectionForm,
  CrewConnectionForm,
  GreetingForm,
  HoursForm,
  KnowledgeForm,
  LoginForm,
  MessagesForm,
  NumberForm,
  QuestionsForm,
  RobotCheckButton,
  WhoForm,
} from "./signup-forms";

export const dynamic = "force-dynamic";

const STEPS: { step: SignupStep; title: string }[] = [
  { step: "who", title: "Tell us who you are" },
  { step: "company", title: "Tell us about your business" },
  { step: "industries", title: "Check eligibility" },
  // The receptionist's own settings, in the owner's words rather than the field names. Approved by Jeff, 2026-11-20.
  { step: "recording", title: "Recording" },
  { step: "schedule", title: "Scheduling" },
  { step: "crew", title: "Crew location tools" },
  { step: "hours", title: "When you’re open" },
  { step: "questions", title: "What it should ask" },
  { step: "knowledge", title: "What it should know" },
  { step: "messages", title: "After the call" },
  { step: "greeting", title: "Your greeting" },
  { step: "terms", title: "Terms" },
  { step: "plan", title: "Choose a plan" },
  { step: "payment_method", title: "Save a payment method" },
  { step: "number", title: "Your receptionist's number" },
  { step: "login", title: "Your login" },
];

const CODE = /^[a-z0-9_]{1,64}$/;

/** Self-service signup, rendered on the server from where this browser's signup stands. Each step is a Server Action; no step reloads the page. */
export default async function Signup({ searchParams }: { searchParams: Promise<{ error?: string | string[]; start?: string | string[]; driveState?: string | string[] }> }) {
  const state = await readSignup();
  const gateStep = stepOf(state, await readGates());
  const siteKey = captchaSiteKey();
  const title = "Set up your receptionist";
  const summary = "Answer a few questions, choose a plan and get a phone number for your receptionist.";

  const { error, start, driveState: requestedDriveState } = await searchParams;
  // Development only: ?driveState= shows one state of connecting a Google Drive. A visitor in production never sees it.
  const driveState = process.env.NODE_ENV !== "production" && isDriveState(requestedDriveState) ? requestedDriveState : null;

  // Every visit opens on the hero: the robot beside the text and the orange Continue. Continue opens the robot check when it has not been
  // passed, and takes the visitor on to the first question when it has. Once a business exists the visitor is already past it.
  const started = state !== null || (start === "1" && gateStep !== "captcha");
  if (!started) {
    return (
      <>
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
        <SchedulerShell />
      </>
    );
  }

  const step = gateStep === "captcha" ? "who" : gateStep;
  const who = await readWho();
  const index = STEPS.findIndex((s) => s.step === step);
  const refusal = typeof error === "string" && CODE.test(error) ? signupMessage(error) : null;

  // The steps are written once and rendered in both hero blocks, as geekatyourspot.com writes a section's body, so every id takes the block's suffix.
  const body = (s: string) => (
    <div className="w-full text-left">
      <section className="mb-4" aria-labelledby={`step-heading${s}`}>
        <h2 id={`step-heading${s}`} className={step === "who" || step === "company" || step === "industries" || step === "terms" ? "sr-only" : ui.h2}>
          {STEPS[index].title}
        </h2>
        {refusal ? (
          <p className={`${ui.status.bad} mb-3`} role="alert">
            {refusal}
          </p>
        ) : null}

        {step === "who" && <WhoForm idSuffix={s} />}
        {step === "company" && <CompanyForm idSuffix={s} />}

        {step === "industries" && <EligibilityForm idSuffix={s} />}

        {step === "terms" && <TermsForm idSuffix={s} />}

        {step === "recording" && <RecordingConnectionForm driveState={driveState} />}
        {step === "schedule" && <ScheduleConnectionForm />}
        {step === "crew" && <CrewConnectionForm />}
        {step === "greeting" && <GreetingForm idSuffix={s} />}
        {step === "hours" && <HoursForm idSuffix={s} />}
        {step === "questions" && <QuestionsForm idSuffix={s} />}
        {step === "knowledge" && <KnowledgeForm idSuffix={s} />}
        {step === "messages" && state && <MessagesForm email={state.contactEmail} idSuffix={s} />}

        {step === "plan" && <PlanStep />}

        {step === "payment_method" && <PaymentMethodStep tier={state?.tier} />}

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
              {state.phoneNumber ? (
                <>
                  Your receptionist answers at <span className="font-semibold">{state.phoneNumber}</span>. Create the login you will use to manage it.
                </>
              ) : (
                <>This account is not billed. Create the login you will use to manage it.</>
              )}
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
    <>
      <HeroSection
        largeGridClassName="grid min-h-screen grid-cols-12 items-center"
        summaryTone={step === "who" || step === "company" || step === "industries" ? "orange" : "white"}
        title={step === "who" ? "Hi, I am Lily" : step === "company" ? `Nice to meet you${who?.firstName ? `, ${who.firstName}` : ""}` : step === "industries" ? "Check Eligibility" : title}
        summary={step === "who" ? "What’s Your Name?" : step === "company" ? "Tell me about your business" : step === "industries" ? "Zero Data Retention (ZDR) prohibits offering our services to some industries." : summary}
        action={(suffix) =>
          // The four screens that are filled in have their Continue here, in the left pane, and it submits the form beside it. The phone
          // block has no left pane, so each form keeps its own button there, and this returns nothing for it.
          step === "who" || step === "company" || step === "industries" || step === "terms" ? (
            suffix === "-lg" ? <SubmitFromLeft key={step} form={`signup-form${suffix}`} label={step === "terms" ? "Agree and continue" : "Continue"} /> : null
          ) : (
            <button type="button" disabled className={ui.button} style={{ cursor: "not-allowed" }}>
              Continue
            </button>
          )
        }
      >
        {body}
      </HeroSection>
      <SchedulerShell />
    </>
  );
}
