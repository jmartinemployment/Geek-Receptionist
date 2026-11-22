import { notFound } from "next/navigation";
import {
  AppointmentsForm,
  EligibilityForm,
  GreetingForm,
  HoursForm,
  KnowledgeForm,
  LoginForm,
  MessagesForm,
  NumberForm,
  CompanyForm,
  QuestionsForm,
  TermsForm,
  WhoForm,
} from "@/app/signup/signup-forms";
import { PaymentMethodStep, PlanStep } from "@/app/signup/steps";

/**
 * Every signup screen, in the order the approved plan (plans/attestation-and-terms.md) puts them, on one page, so Jeff can judge the
 * order by looking at it (2026-11-21: "I can't tell you where it goes until I see"). Each is the component /signup renders, not a
 * copy. Nothing here creates a signup. A screen the plan describes but that is not built is shown as a labelled gap, never faked.
 * Outside production only; delete it when the order is settled.
 */
export const dynamic = "force-dynamic";

type Screen = { title: string; note?: string; body: React.ReactNode };

function Frame({ index, screen }: { index: number; screen: Screen }) {
  return (
    <section className="mx-auto mb-14 max-w-3xl">
      <p className="mb-1 text-sm tracking-widest text-[#9db0cf] uppercase">Screen {index}</p>
      <h2 className="mb-1 font-display text-2xl font-bold">{screen.title}</h2>
      {screen.note ? <p className="mb-4 text-sm text-[#9db0cf]">{screen.note}</p> : <div className="mb-4" />}
      {screen.body}
    </section>
  );
}

function Marker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl rounded bg-[#c83803] px-4 py-3 text-center font-display text-sm font-bold tracking-widest uppercase">
      {children}
    </div>
  );
}

function NotBuilt({ children }: { children: React.ReactNode }) {
  return <div className="rounded border border-dashed border-[#9db0cf] px-4 py-6 text-[#9db0cf]">Not built yet. {children}</div>;
}

const before: Screen[] = [
  {
    title: "Hi, I am Lily. What’s Your Name?",
    note: "The left pane reads “Hi, I am Lily / What’s Your Name?”; this is the right pane: the person alone. Nothing is verified here.",
    body: <WhoForm idSuffix="-p0" />,
  },
  {
    title: "Nice to meet you. Tell me about your business",
    note: "The left pane reads “Nice to meet you, <first name> / Tell me about your business” (my wording, a draft); this is the right pane: the business alone.",
    body: <CompanyForm idSuffix="-p0b" />,
  },
  { title: "Check eligibility", note: "The country question first, then eight questions about regulated sectors, each its own Yes or No, none pre-selected.", body: <EligibilityForm idSuffix="-p2" /> },
  { title: "Your greeting", body: <GreetingForm idSuffix="-p4" /> },
  { title: "When you’re open", body: <HoursForm idSuffix="-p5" /> },
  { title: "What it should ask", body: <QuestionsForm idSuffix="-p6" /> },
  { title: "What it should know", body: <KnowledgeForm idSuffix="-p7" /> },
  { title: "After the call", body: <MessagesForm email="owner@example.com" idSuffix="-p8" /> },
  { title: "Appointments", body: <AppointmentsForm /> },
  {
    title: "Connect and verify each system the business uses",
    note: "Stage 7 of the plan: before any payment.",
    body: <NotBuilt>This is the pending login and the connect-and-verify step. Today the calendar is connected after payment, from the dashboard.</NotBuilt>,
  },
];

const after: Screen[] = [
  {
    title: "Terms",
    note: "After the six setup steps and before the plan: one paragraph with the two documents linked, and the acceptance is the left pane's Agree and continue.",
    body: <TermsForm idSuffix="-p9" />,
  },
  { title: "Choose a plan", body: <PlanStep /> },
  { title: "Save a payment method", body: <PaymentMethodStep tier="STANDARD" /> },
  { title: "Your receptionist’s number", body: <NumberForm idSuffix="-p13" /> },
  {
    title: "Confirm your email and phone",
    note: "Stage 8 of the plan: after payment.",
    body: <NotBuilt>Neither confirmation exists yet.</NotBuilt>,
  },
  { title: "Your login", body: <LoginForm email="owner@example.com" idSuffix="-p15" /> },
];

export default function SignupScreens() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#0B162A] px-4 py-10 text-white">
      <div className="mx-auto mb-12 max-w-3xl rounded border border-[#f0673a] px-4 py-3 text-sm">
        <strong>Every signup screen, in the plan’s order.</strong> These are the real forms. Nothing here creates a signup. Screens marked
        “Not built yet” are in the plan and do not exist.
      </div>

      {before.map((screen, i) => (
        <Frame key={screen.title} index={i + 1} screen={screen} />
      ))}

      <Marker>The money line: nothing above this is charged</Marker>

      {after.map((screen, i) => (
        <Frame key={screen.title} index={before.length + i + 1} screen={screen} />
      ))}
    </div>
  );
}
