import { ui } from "@/lib/ui";

/**
 * The states of connecting a Google Drive, laid out from the research in plans/connecting-google-drive-for-recordings.md. Layout only:
 * every button is inert and nothing here calls Google or GeekAPI. A visitor sees `explain`; the other states are reached in development
 * with ?driveState=, so each can be looked at.
 */
export const DRIVE_STATES = ["explain", "waiting", "denied", "blocked", "trouble", "testing", "connected", "failed", "lost", "disconnect"] as const;

export type DriveState = (typeof DRIVE_STATES)[number];

export function isDriveState(value: unknown): value is DriveState {
  return typeof value === "string" && (DRIVE_STATES as readonly string[]).includes(value);
}

const Button = ({ children, quiet }: { children: React.ReactNode; quiet?: boolean }) => (
  <button type="button" disabled className={quiet ? `${ui.quietButton} self-start` : `${ui.button} self-start`}>
    {children}
  </button>
);

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3 border-l-2 border-[#f0673a] pl-4">
    <p className="font-semibold text-white">{title}</p>
    {children}
  </div>
);

const Text = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-white">{children}</p>;

export function DriveConnectLayout({ state }: { state: DriveState }) {
  switch (state) {
    case "explain":
      return (
        <Panel title="Connect your Google Drive">
          <Text>
            We create a folder named &ldquo;Geek-Receptionist Logs&rdquo; in your Google Drive and save what you choose there. The files are yours
            and stay in your Drive.
          </Text>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm text-white">What should be saved?</legend>
            {["Audio recordings", "Transcripts", "Summaries"].map((what) => (
              <label key={what} className="flex items-center gap-3">
                <input type="checkbox" disabled className="size-4" />
                {what}
              </label>
            ))}
          </fieldset>
          <Text>Sign in with the Google account whose Drive should hold them. A Google Workspace account may need its administrator&rsquo;s approval.</Text>
          <Button>Connect Google Drive</Button>
        </Panel>
      );
    case "waiting":
      return (
        <Panel title="Finishing your connection with Google…">
          <Text>This takes a few seconds. Do not close this page.</Text>
        </Panel>
      );
    case "denied":
      return (
        <Panel title="Nothing was connected">
          <Text>Google did not get your approval, so nothing was connected. You can try again.</Text>
          <Button>Connect Google Drive</Button>
        </Panel>
      );
    case "blocked":
      return (
        <Panel title="Your Google Workspace administrator has blocked this app">
          <Text>Send your administrator the app name and the client ID below. A change can take up to 24 hours to apply.</Text>
          <Text>App name: Geek-Receptionist</Text>
          <Text>Client ID: shown here</Text>
          <Text>Or connect with a different Google account.</Text>
          <Button>Connect a different account</Button>
        </Panel>
      );
    case "trouble":
      return (
        <Panel title="Google would not finish the connection">
          <Text>Check that pop-ups are allowed for this site and that third-party cookies are not blocked, then try again. A private window often helps.</Text>
          <Text>If Google shows a warning that the app is not verified, choose Advanced to continue.</Text>
          <Button>Try again</Button>
        </Panel>
      );
    case "testing":
      return (
        <Panel title="Creating your folder and testing it…">
          <Text>Checking the folder. Writing a small file. Reading it back. Removing it.</Text>
        </Panel>
      );
    case "connected":
      return (
        <Panel title="Connected">
          <Text>Connected as owner@example.com</Text>
          <Text>Folder: Geek-Receptionist Logs (opens in Google Drive)</Text>
          <Text>Last test: passed, today at 3:00 PM</Text>
          <div className="flex gap-3">
            <Button quiet>Test again</Button>
            <Button quiet>Disconnect</Button>
          </div>
        </Panel>
      );
    case "failed":
      return (
        <Panel title="The test did not pass">
          <Text>Your Google Drive is full. Free some space in Google Drive, then test again.</Text>
          <Text>If the folder was deleted or moved to the trash, connect again to make a new one.</Text>
          <Text>If we were not allowed to write to it, connect again and approve the access.</Text>
          <Button>Test again</Button>
        </Panel>
      );
    case "lost":
      return (
        <Panel title="Your Google Drive is no longer connected">
          <Text>
            Access was withdrawn in Google, was not used for six months, or your administrator changed what apps may do. Recordings that could not
            be saved are named in your call history.
          </Text>
          <Button>Reconnect</Button>
        </Panel>
      );
    case "disconnect":
      return (
        <Panel title="Disconnect Google Drive?">
          <Text>Files already in your Drive stay there. New recordings will stop being saved. If you reconnect later, test it before relying on it.</Text>
          <div className="flex gap-3">
            <Button quiet>Disconnect</Button>
            <Button quiet>Keep it connected</Button>
          </div>
        </Panel>
      );
  }
}
