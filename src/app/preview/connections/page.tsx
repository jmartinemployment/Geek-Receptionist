import { notFound } from "next/navigation";
import { Choice } from "@/app/signup/signup-forms";
import { ui } from "@/lib/ui";

/**
 * The connection questions, laid out for review before any of them is built. Nothing on this page saves, connects or calls GeekAPI,
 * and no answer is selected. Outside production only; delete it when the screens are real.
 */
export const dynamic = "force-dynamic";

const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

function Frame({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <section className="mx-auto mb-14 flex max-w-3xl flex-col gap-4">
      <p className="text-sm tracking-widest text-[#9db0cf] uppercase">Screen {index}</p>
      {children}
    </section>
  );
}

function Connect({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm tracking-widest text-[#f0673a] uppercase">If yes</p>
      <button type="button" disabled className={`${ui.button} self-start`}>
        {children}
      </button>
    </div>
  );
}

export default function ConnectionScreens() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#0B162A] px-4 py-10 text-white">
      <Frame index={1}>
        <Choice name="record" legend="Do you need to record conversations?" selected="" options={yesNo} />
        <Choice
          name="drive"
          legend="Do you have a Google Drive or an Amazon S3 drive to record them to?"
          selected=""
          options={yesNo}
        />
        <Connect>Connect</Connect>
      </Frame>

      <Frame index={2}>
        <Choice name="schedule" legend="Do you want to schedule appointments?" selected="" options={yesNo} />
        <Connect>Connect your calendar</Connect>
      </Frame>

      <Frame index={3}>
        <Choice name="crew" legend="Do you have crew location tools?" selected="" options={yesNo} />
        <Connect>Connect</Connect>
      </Frame>
    </div>
  );
}
