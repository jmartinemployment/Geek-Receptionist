import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeCalendarCheck } from "@/lib/calendar/status";
import { ui } from "@/lib/ui";
import { connectCalendarAction } from "./actions";
import { ActionButton } from "./action-button";

/** The Google Calendar card, read from GeekAPI on the server while the page streams. */
export async function CalendarSection() {
  const check = await callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/calendar/check`, { method: "GET" });
  if (check.status === 401) redirect("/login");
  const state = describeCalendarCheck(check.status, check.body);

  return (
    <section className={ui.card} aria-labelledby="calendar-heading">
      <h2 id="calendar-heading" className={ui.h2}>
        Google Calendar
      </h2>

      {state.kind === "connected" && (
        <>
          <p className={ui.status.ok}>Connected</p>
          <p className={ui.muted}>Your receptionist can see when you are free and book appointments.</p>
        </>
      )}
      {state.kind === "not_connected" && (
        <>
          <p className={ui.status.warn}>Not connected</p>
          <p className={`${ui.muted} mb-4`}>Connect your Google Calendar so the receptionist can check your availability and book appointments.</p>
        </>
      )}
      {state.kind === "reconnect" && (
        <>
          <p className={ui.status.warn}>Needs to be connected again</p>
          <p className={`${ui.muted} mb-4`}>{state.message}</p>
        </>
      )}
      {state.kind === "problem" && (
        <>
          <p className={ui.status.bad}>Could not check your calendar</p>
          <p className={ui.muted}>
            {state.message}
            {state.code ? ` (${state.code})` : ""}
          </p>
        </>
      )}

      {(state.kind === "not_connected" || state.kind === "reconnect") && (
        <ActionButton
          action={connectCalendarAction}
          label={state.kind === "reconnect" ? "Connect again" : "Connect Google Calendar"}
          pendingLabel="Opening Google…"
        />
      )}
    </section>
  );
}
