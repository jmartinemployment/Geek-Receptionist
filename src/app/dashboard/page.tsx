import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAccessToken, getAuthError } from "@/lib/auth/session";
import { noticeFrom, type NoticeParams } from "@/lib/notices";
import { ui } from "@/lib/ui";
import { signOutAction } from "./actions";
import { ActionButton } from "@/components/action-button";
import { BillingSection } from "./billing-section";
import { CalendarSection } from "./calendar-section";
import { CardSkeleton } from "./card-skeleton";
import { NoticeToast } from "./notice-toast";

export const dynamic = "force-dynamic";

/**
 * The owner's dashboard, rendered on the server. The heading arrives at once and each card streams in as GeekAPI answers it, so a slow
 * answer for one never holds up the other.
 */
export default async function Dashboard({ searchParams }: { searchParams: Promise<NoticeParams> }) {
  const authError = await getAuthError();
  if (authError) {
    return (
      <main className={ui.center}>
        <h1 className={ui.h1}>Your sign-in could not be renewed</h1>
        <p className={ui.status.bad} role="alert">
          GeekAPI did not answer the renewal ({authError}). You are still signed in; reload this page shortly.
        </p>
      </main>
    );
  }
  if (!(await getAccessToken())) redirect("/login");

  const notice = noticeFrom(await searchParams);

  return (
    <main className={ui.page}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className={`${ui.h1} mb-0`}>Your receptionist</h1>
        <ActionButton action={signOutAction} label="Sign out" pendingLabel="Signing out…" quiet />
      </div>
      <Suspense fallback={<CardSkeleton label="your subscription" />}>
        <BillingSection />
      </Suspense>
      <Suspense fallback={<CardSkeleton label="your calendar" />}>
        <CalendarSection />
      </Suspense>
      {notice ? <NoticeToast notice={notice} /> : null}
    </main>
  );
}
