import { describeCompleteFailure } from "@/lib/calendar/status";
import { describePaymentFailure } from "@/lib/billing/status";
import { describeStorageFailure } from "@/lib/storage/status";

export type Notice = { tone: "ok" | "bad"; text: string };

export type NoticeParams = {
  notice?: string | string[];
  calendar_error?: string | string[];
  storage_error?: string | string[];
  payment_error?: string | string[];
};

const CODE = /^[a-z0-9_]{1,64}$/;

const NOTICES: Record<string, string> = {
  calendar_connected: "Your calendar is connected. The receptionist can now see when you are free and book appointments.",
  storage_connected: "Your Google Drive is connected. Call records are written to a Geek-Receptionist Logs folder in your own Drive.",
  bucket_connected: "Your bucket is connected. Call records are written there from now on.",
  payment_recorded: "Thank you, your payment is recorded.",
  signup_complete: "Welcome. Your receptionist is set up and answering on your new number.",
  payment_restored: "Thank you, your payment is recorded and your receptionist is active and answering calls again.",
};

const one = (value: string | string[] | undefined) => (typeof value === "string" && CODE.test(value) ? value : null);

/**
 * The one-time message the dashboard shows after Google or PayPal sent the owner back, from the address bar. Only codes are read and only
 * fixed sentences are shown, so a link cannot make the page say something of its author's choosing.
 */
export function noticeFrom(params: NoticeParams): Notice | null {
  const calendarError = one(params.calendar_error);
  if (calendarError) return { tone: "bad", text: `The calendar was not connected. ${describeCompleteFailure(calendarError, null)}` };
  const storageError = one(params.storage_error);
  if (storageError) return { tone: "bad", text: `Your Drive was not connected. ${describeStorageFailure(storageError, null)}` };
  const paymentError = one(params.payment_error);
  if (paymentError) return { tone: "bad", text: `The payment was not recorded. ${describePaymentFailure(paymentError)}` };
  const notice = one(params.notice);
  if (notice && Object.hasOwn(NOTICES, notice)) return { tone: "ok", text: NOTICES[notice] };
  return null;
}
