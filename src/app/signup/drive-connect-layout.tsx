"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import type { DriveState } from "./drive-states";

/**
 * The states of connecting a Google Drive, laid out from the research in plans/connecting-google-drive-for-recordings.md. Layout only:
 * nothing here calls Google or GeekAPI. In development the buttons walk from state to state, so what comes next can be seen; in
 * production every button is inert and a visitor only ever sees `explain`. ?driveState= opens a given state in development.
 */
const ActionButton = ({ demo, quiet, onClick, children }: { demo: boolean; quiet: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" disabled={!demo} onClick={onClick} className={quiet ? `${ui.quietButton} self-start` : `${ui.button} self-start`}>
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
  const demo = process.env.NODE_ENV !== "production";
  const [view, setView] = useState<DriveState>(state);

  // In development the two working states move on by themselves, as the real ones would once Google and the test had answered.
  useEffect(() => {
    if (!demo || (view !== "waiting" && view !== "testing")) return;
    const timer = setTimeout(() => setView(view === "waiting" ? "testing" : "connected"), 1500);
    return () => clearTimeout(timer);
  }, [demo, view]);

  const button = (label: string, to: DriveState, quiet = false) => (
    <ActionButton demo={demo} quiet={quiet} onClick={() => setView(to)}>
      {label}
    </ActionButton>
  );

  switch (view) {
    case "explain":
      return (
        <Panel title="Connect your Google Drive">
          <Text>
            We create a folder named &ldquo;Geek-Receptionist Logs&rdquo; in your Google Drive and save what you choose there. The files are yours
            and stay in your Drive.
          </Text>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              ["audio", "Save audio recordings?"],
              ["transcript", "Save transcripts?"],
              ["summary", "Save summaries?"],
            ].map(([name, question]) => (
              <fieldset key={name} className="flex flex-col gap-2">
                <legend className="mb-1 font-semibold text-white">{question}</legend>
                {[
                  ["yes", "Yes"],
                  ["no", "No"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-start gap-3">
                    <input type="radio" name={`save_${name}`} value={value} className="mt-1.5 size-4 accent-[#c83803]" />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          </div>
          <Text>
            Sign in with the Google account whose Drive should hold them.
            <br />
            Note: A Google Workspace account may need its administrator&rsquo;s approval.
          </Text>
          {button("Connect Google Drive", "waiting")}
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
          {button("Connect Google Drive", "waiting")}
        </Panel>
      );
    case "blocked":
      return (
        <Panel title="Your Google Workspace administrator has blocked this app">
          <Text>Send your administrator the app name and the client ID below. A change can take up to 24 hours to apply.</Text>
          <Text>App name: Geek-Receptionist</Text>
          <Text>Client ID: shown here</Text>
          <Text>Or connect with a different Google account.</Text>
          {button("Connect a different account", "waiting")}
        </Panel>
      );
    case "trouble":
      return (
        <Panel title="Google would not finish the connection">
          <Text>Check that pop-ups are allowed for this site and that third-party cookies are not blocked, then try again. A private window often helps.</Text>
          <Text>If Google shows a warning that the app is not verified, choose Advanced to continue.</Text>
          {button("Try again", "waiting")}
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
            {button("Test again", "testing", true)}
            {button("Disconnect", "disconnect", true)}
          </div>
        </Panel>
      );
    case "failed":
      return (
        <Panel title="The test did not pass">
          <Text>Your Google Drive is full. Free some space in Google Drive, then test again.</Text>
          <Text>If the folder was deleted or moved to the trash, connect again to make a new one.</Text>
          <Text>If we were not allowed to write to it, connect again and approve the access.</Text>
          {button("Test again", "testing")}
        </Panel>
      );
    case "lost":
      return (
        <Panel title="Your Google Drive is no longer connected">
          <Text>
            Access was withdrawn in Google, was not used for six months, or your administrator changed what apps may do. Recordings that could not
            be saved are named in your call history.
          </Text>
          {button("Reconnect", "waiting")}
        </Panel>
      );
    case "disconnect":
      return (
        <Panel title="Disconnect Google Drive?">
          <Text>Files already in your Drive stay there. New recordings will stop being saved. If you reconnect later, test it before relying on it.</Text>
          <div className="flex gap-3">
            {button("Disconnect", "explain", true)}
            {button("Keep it connected", "connected", true)}
          </div>
        </Panel>
      );
  }
}
