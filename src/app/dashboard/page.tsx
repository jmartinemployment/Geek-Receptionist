import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeCalendarCheck } from "@/lib/calendar/status";
import { CalendarCard } from "./calendar-card";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!(await getAccessToken())) redirect("/api/auth/start");

  const check = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/calendar/check`, { method: "GET" });
  if (check.status === 401) redirect("/api/auth/start");
  const state = describeCalendarCheck(check.status, check.body);

  return (
    <main>
      <div className="row">
        <h1>Your receptionist</h1>
        <form action="/api/auth/logout" method="post">
          <button className="button quiet" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <CalendarCard state={state} />
    </main>
  );
}
