import { redirect } from "next/navigation";
import { callOwnerTenant } from "@/lib/geekapi";
import { describeCalendarCheck } from "@/lib/calendar/status";
import { describeBookingSettings } from "@/lib/receptionist/controls";
import { ui } from "@/lib/ui";
import { connectCalendarAction, disconnectCalendarAction, setBookingAction } from "./actions";
import { ActionButton } from "@/components/action-button";
import { ConfirmButton } from "./confirm-button";

/**
 * The Google Calendar card, read from GeekAPI on the server while the page streams. It carries two facts and keeps them apart: whether
 * Google still answers for this business's calendar, and whether the owner has asked for callers to be able to book into it. Connecting
 * a calendar is how an owner lets the receptionist see when they are free; letting a stranger on the telephone put something in it is a
 * separate decision, off until they make it, so the card never says the receptionist books when it does not.
 */
export async function CalendarSection() {
  const [check, setting] = await Promise.all([
    callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/calendar/check`, { method: "GET" }),
    callOwnerTenant((tenantId) => `/api/v1/tenants/${tenantId}/receptionist/booking`, { method: "GET" }),
  ]);
  if (check.status === 401 || setting.status === 401) redirect("/login");
  const state = describeCalendarCheck(check.status, check.body);
  const booking = describeBookingSettings(setting.status, setting.body);

  return (
    <section className={ui.card} aria-labelledby="calendar-heading">
      <h2 id="calendar-heading" className={ui.h2}>
        Google Calendar
      </h2>

      {state.kind === "connected" && (
        <>
          <p className={ui.status.ok}>Connected</p>
          <p className={`${ui.muted} mb-4`}>Your receptionist can see when you are free.</p>
        </>
      )}
      {state.kind === "not_connected" && (
        <>
          <p className={ui.status.warn}>Not connected</p>
          <p className={`${ui.muted} mb-4`}>
            Connect your Google Calendar so the receptionist can see when you are free. Whether callers may book is a separate choice
            below, and it stays off until you turn it on.
          </p>
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
          <p className={`${ui.muted} mb-4`}>
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
      {(state.kind === "connected" || state.kind === "reconnect") && (
        <ConfirmButton
          action={disconnectCalendarAction}
          label="Disconnect Google Calendar"
          pendingLabel="Disconnecting…"
          title="Disconnect your calendar?"
          consequence={
            "Your receptionist will no longer see when you are free, and callers will no longer be able to book. Booking is turned off " +
            "at the same time, and stays off until you connect a calendar and turn it on again. Nothing already in your calendar changes."
          }
          confirmLabel="Disconnect it"
          keepLabel="Keep it connected"
        />
      )}

      <div className="mt-6 border-t border-line pt-4">
        <h3 className="mb-2 text-lg font-extrabold">Booking appointments</h3>

        {booking.kind === "problem" && (
          <>
            <p className={ui.status.bad}>Could not read whether booking is on</p>
            <p className={ui.muted}>
              {booking.message}
              {booking.code ? ` (${booking.code})` : ""}
            </p>
          </>
        )}

        {booking.kind === "settings" && booking.enabled && (
          <>
            <p className={ui.status.ok}>On</p>
            <p className={`${ui.muted} mb-4`}>
              Callers can book an appointment and your receptionist puts it in your Google Calendar.
            </p>
            {!booking.calendarConnected && (
              <p className={`${ui.status.warn} mb-4`} role="alert">
                Your calendar is not answering, so no appointment can be made until it is connected again. Your receptionist takes a
                message meanwhile.
              </p>
            )}
            <ConfirmButton
              action={setBookingAction.bind(null, false)}
              label="Turn booking off"
              pendingLabel="Turning booking off…"
              title="Turn booking off?"
              consequence={
                "Callers will no longer be able to book an appointment. Your receptionist takes a message instead, and you call them " +
                "back. Appointments already in your calendar are not touched. You can turn booking on again whenever you want."
              }
              confirmLabel="Turn it off"
              keepLabel="Keep booking on"
            />
          </>
        )}

        {booking.kind === "settings" && !booking.enabled && (
          <>
            <p className={ui.status.warn}>Off</p>
            <p className={`${ui.muted} mb-4`}>
              Your receptionist does not book anything. It takes a message instead, and you call the caller back. Booking stays off
              until you turn it on here.
            </p>
            {!booking.calendarConnected && (
              <p className={`${ui.muted} mb-4`}>Connect your Google Calendar first: booking cannot be turned on without one.</p>
            )}
            <ActionButton action={setBookingAction.bind(null, true)} label="Turn booking on" pendingLabel="Turning booking on…" />
          </>
        )}
      </div>
    </section>
  );
}
