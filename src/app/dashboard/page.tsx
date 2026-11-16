import { redirect } from "next/navigation";
import { getAccessToken, getAuthError } from "@/lib/auth/session";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeCalendarCheck } from "@/lib/calendar/status";
import { CalendarCard } from "./calendar-card";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const authError = await getAuthError();
  if (authError) {
    return (
      <main className="center">
        <h1>Your sign-in could not be renewed</h1>
        <p className="status bad" role="alert">
          GeekAPI did not answer the renewal ({authError}). You are still signed in; reload this page shortly.
        </p>
      </main>
    );
  }
  if (!(await getAccessToken())) redirect("/login");

  const check = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/calendar/check`, { method: "GET" });
  if (check.status === 401) redirect("/login");
  const state = describeCalendarCheck(check.status, check.body);

  return (
    <main>
      <div className="row">
        <h1>Your receptionist</h1>
        <form action="/api/auth/sign-out" method="post">
          <button className="button quiet" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <CalendarCard state={state} />
    </main>
  );
}
