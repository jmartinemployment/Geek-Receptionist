import { notFound } from "next/navigation";
import { BusinessForm, EligibilityForm } from "@/app/signup/signup-forms";

/**
 * The real signup screens, shown without the robot check and the gates in front of them, so Jeff can see them in the running app
 * (2026-11-21: "I need to see actual screens"). Each is the same component /signup renders, not a copy. Submitting either is refused
 * by GeekAPI-side gates because no signup has been started here. Outside production only; delete it when the order is settled.
 */
export const dynamic = "force-dynamic";

export default function SignupScreens() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#0B162A] px-4 py-10 text-white">
      <div className="mx-auto mb-10 max-w-3xl rounded border border-[#f0673a] px-4 py-3 text-sm">
        <strong>Screens preview.</strong> These are the real signup forms, shown out of order. Nothing here creates a signup.
      </div>

      <section className="mx-auto mb-16 max-w-3xl">
        <p className="mb-2 text-sm tracking-widest text-[#9db0cf] uppercase">Screen: eligibility</p>
        <h2 className="mb-4 font-display text-2xl font-bold">Check eligibility</h2>
        <EligibilityForm idSuffix="-preview-a" />
      </section>

      <section className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm tracking-widest text-[#9db0cf] uppercase">Screen: declaration (step 3 today)</p>
        <h2 className="mb-4 font-display text-2xl font-bold">Your business</h2>
        <BusinessForm idSuffix="-preview-b" />
      </section>
    </div>
  );
}
