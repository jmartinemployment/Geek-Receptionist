/** The states of connecting a Google Drive (see drive-connect-layout.tsx). */
export const DRIVE_STATES = ["explain", "waiting", "denied", "blocked", "trouble", "testing", "connected", "failed", "lost", "disconnect"] as const;

export type DriveState = (typeof DRIVE_STATES)[number];

export function isDriveState(value: unknown): value is DriveState {
  return typeof value === "string" && (DRIVE_STATES as readonly string[]).includes(value);
}
