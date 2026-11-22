# Connecting a customer's Google Drive to receive recordings: screens, wording, failure handling

Research date: 2026-11-22. Pages were fetched on this date; vendor flows may have changed since. Several vendors (Otter, Gong, Loom, Calendly, RingCentral, Twilio, Zoom native) could not be confirmed from their own documentation; see Gaps.

## 1. How do vendors connect a customer's Google Drive (steps and screens)?

### Takeaway
The confirmed pattern (Fireflies, Dialpad) is: a "Connect" button on an integrations/settings page, then Google sign-in and consent, then the customer chooses what to send (and sometimes which Google account), then the vendor writes into vendor-named folders it creates itself. The customer is not asked to pick a folder in either confirmed case. Zoom, Otter, Gong, Loom, Calendly, RingCentral and Twilio could not be confirmed from first-party docs.

### Cited Findings
- Fireflies: open the Integrations page, search "Google Drive", click Connect, sign in with Google and grant permissions. — [Fireflies guide](https://guide.fireflies.ai/articles/3132328743-how-to-integrate-fireflies-with-google-drive)
- Fireflies then shows toggles: "Save meeting transcript", "Save meeting recording", "Save meeting summary"; optional "Additional Options" filters (Meeting Title, Host, Participants, Meeting Type; filters need Business/Enterprise); formats PDF/DOCX/JSON/CSV/SRT; click "Save" to activate; multiple configurations allowed. — [Fireflies guide](https://guide.fireflies.ai/articles/3132328743-how-to-integrate-fireflies-with-google-drive)
- Fireflies writes to vendor-named folders: "Fireflies Transcripts", "Fireflies Summaries", "Fireflies Recordings". The article does not describe the customer choosing a folder. — [Fireflies guide](https://guide.fireflies.ai/articles/3132328743-how-to-integrate-fireflies-with-google-drive)
- Fireflies offers "Push past meetings" (date range of last 7/14/30/60/90 days or custom; scope choices; "Push") and admin "Team Permissions" (Apply to entire workspace / Restrict non-admin usage), plus "Disconnect". — [Fireflies guide](https://guide.fireflies.ai/articles/3132328743-how-to-integrate-fireflies-with-google-drive)
- Fireflies syncs automatically after each meeting ends once enabled (per search summary of Fireflies' own guide/blog). — [Fireflies blog](https://fireflies.ai/blog/fireflies-google-drive-integration/)
- Dialpad (personal recordings): select "Connect Google Drive" from the Recordings tab in Inbox, choose your Google Workspace account, select Continue; then in Dialpad.com "Show Advanced options" > "Cloud Backup" > "Save Recordings to Google Drive". (Wording from search-result summary of Dialpad's page; the page itself returned 403 to direct fetch.) — [Dialpad Record a Call](https://help.dialpad.com/docs/record-a-call)
- Dialpad's Google Workspace page, per search summary, says it needs read, create and edit permission for Drive, "only operates within two specific folders": "Dialpad Recordings" and "Dialpad Voicemails", and "does not delete any files or folders from your Google Drive". Direct fetch returned 403, so this is a secondhand summary of the page. — [Dialpad Google Workspace](https://help.dialpad.com/docs/sync-and-integrate-with-google-workspace)
- Dialpad's admin bulk backup for contact centers goes to Google Cloud Storage, not Drive: Company Admin plus a Google Cloud Storage account, grant a Dialpad service account write access to a bucket; "If a backup fails, Dialpad will send your Office Admin an email" (search summary). — [Dialpad Bulk Backup](https://help.dialpad.com/docs/bulk-backup-for-call-recordings)
- Zoom: no first-party "save cloud recordings to Google Drive" article was found. Third-party Marketplace app "Google Drive for Zoom by Splain" moves recordings to a "Zoom Recording" folder; a university IT guide describes manual download and upload. — [Splain on Zoom Marketplace](https://m.zoom.us/apps/5jjvtAZIQy-m-XkbchJMHg); [Univ. of San Diego](https://www.sandiego.edu/its/documents/zoom_cloudrecording_cleanup.pdf)
- Otter: only Zapier-hosted templates were found (Drive folder to Otter import, Otter recording to Drive file); no Otter help-center article. — [Zapier Otter+Drive](https://zapier.com/apps/google-drive/integrations/otterai/255651073/create-files-from-new-otterai-recordings-in-google-drive)

### Inferences
- A vendor-created, vendor-named folder (Fireflies, Dialpad) avoids a folder picker and avoids needing broad Drive access; this fits a narrow scope such as drive.file, though neither vendor's help page states which OAuth scope it uses.
- Fireflies exposes content toggles before first sync, and Dialpad separates "connect" from "turn on saving" (two steps); both are possible shapes for a signup step.

### Gaps
- Zapier's own Google Drive connect article: the page tried (help.zapier.com/.../8496292155405) was unrelated; flow unconfirmed.
- Gong, Loom, Calendly, RingCentral, Twilio Flex/recordings, native Zoom, Otter: no first-party Drive-connect documentation found or fetched. Not confirmed.
- Exact button text on Google's account chooser and any in-product "folder picker" at these vendors: not documented in pages fetched.

## 2. How do they show the connection works, and what happens when it breaks?

### Takeaway
Of the vendors confirmed, none documents a test file, "connected as" line, folder link or last-upload time in the pages retrieved. Break handling in the docs found is mostly "disconnect, remove the app in your Google account, reconnect", with Pipedrive the clearest example and Dialpad notifying an admin by email on bulk-backup failure.

### Cited Findings
- Fireflies' Drive article has no troubleshooting, reconnect, or "last synced" content (fetched page states none). — [Fireflies guide](https://guide.fireflies.ai/articles/3132328743-how-to-integrate-fireflies-with-google-drive)
- Pipedrive (Drive document storage, not recordings, but a clear reconnect pattern): upload error text "Could not connect to Google Drive. Reconnect and try again"; fix: Disconnect in Tools and Apps > Documents, remove Pipedrive permissions from the Google Account, clear cache/cookies, confirm third-party cookies and pop-ups are allowed, "+ Add a New Account", enable all required permissions. Also: check which Google account is connected and disconnect/reconnect if wrong; confirm correct permissions on the target folder. — [Pipedrive help](https://intercom.help/pipedrive/en/articles/14529883-how-can-i-troubleshoot-and-resolve-google-drive-integration-issues-in-pipedrive)
- Teamwork: a 401 "Not Authorized" usually means the token expired; fix is to disable and re-enable the Google Drive integration (search summary). — [Teamwork](https://support.teamwork.com/projects/addons-and-integrations/reconnecting-your-google-drive-integration)
- Formstack: `invalid_grant` means stored credentials are no longer valid; fix is to log in again (search summary). — [Formstack](https://help.formstack.com/hc/en-us/articles/44593159533843)
- Why a connection can silently stop, per Google: user revoked access; refresh token unused for six months; "The user changed passwords and the refresh token contains Gmail scopes" (not relevant to a Drive-only scope); 100 live refresh tokens per account per client ID (oldest invalidated); Testing-status projects get tokens "expiring in 7 days"; time-limited grants; admin sets a service to Restricted (error `admin_policy_enforced`). — [Google OAuth 2.0 docs](https://developers.google.com/identity/protocols/oauth2)
- Storage full: Google API returns 403 with reason `storageQuotaExceeded` ("The user's Drive storage quota has been exceeded"); Workspace users have a 750 GB per 24 hours upload cap, a different error; trash counts toward quota for Workspace accounts. Service accounts have no personal Drive storage, so saving to a service account's My Drive returns 403. — [Google Drive usage limits](https://developers.google.com/workspace/drive/api/guides/limits); [Google Workspace storage limits](https://knowledge.workspace.google.com/admin/drive/storage-and-upload-limits-for-google-workspace)
- Folder deleted: no vendor documentation found for this case.

### Inferences
- A product that stores the file id/folder id and a last-successful-upload timestamp can distinguish the above failure classes (auth revoked, quota, admin policy, folder gone) and show a distinct reconnect or fix message for each; no vendor page found does this explicitly, so this is design inference, not observed practice.
- Fireflies' own help page documents no reconnect path, so a reconnect design would be original work rather than copied convention.

### Gaps
- No vendor page found showing a "connected as name@email", test file, folder link or last upload time. Not confirmed for any vendor.
- Deleted-folder handling: not documented by any vendor found.
- Google's own statement on what happens to apps when a user deletes the folder (drive.file access to files vs folders): not researched.

## 3. What does Google's consent screen show for drive.file?

### Takeaway
Google's Docs API scope page (via search result) gives the description "See, edit, create, and delete only the specific Google Drive files you use with this app." The Drive scopes guide gives a different table description. drive.file is classed non-sensitive, so no verification warning is forced by this scope alone.

### Cited Findings
- Consent-screen description for `https://www.googleapis.com/auth/drive.file`: "See, edit, create, and delete only the specific Google Drive files you use with this app." (as returned in search snippet from Google's Docs API auth page; the page itself was not fetched). — [Google Docs API scopes](https://developers.google.com/docs/api/auth)
- Google's Drive scope table describes drive.file as "Create new Drive files, or modify existing files, that you open with an app or that the user shares with an app", "while using the Google Picker API or the app's file picker." — [Drive API scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Classification: `drive.file`, `drive.appdata`, `drive.install` are non-sensitive ("provide the smallest scope of authorization"); `drive` and `drive.readonly` are restricted. — [Drive API scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Google recommends the Google Picker so users choose which files to share with the app. — [Drive API scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Granular consent: checkboxes appear only when an app requests more than one non-Sign-In scope (or Sign-In plus a non-Sign-In scope). With a single non-Sign-In scope, users approve or deny the whole request with no checkboxes. Apps "can't assume users grant all requested scopes" and must check granted scopes. — [Google granular permissions](https://developers.google.com/identity/protocols/oauth2/resources/granular-permissions)
- Unverified-app screen: Google says an app "might display an 'unverified app' screen before it displays the consent screen"; verification is aimed at sensitive/restricted scopes; internal-domain apps and Personal-mode apps are exempt. Exact warning text and the "Advanced" link were not on the fetched page. — [Google unverified apps](https://support.google.com/cloud/answer/7454865)

### Inferences
- With drive.file as the only non-sign-in scope, the customer sees one approve/deny decision with no checkboxes (follows from the granular-permissions rule above).
- Because drive.file is non-sensitive, Google's verification requirement for sensitive/restricted scopes should not apply to it; the app's consent screen branding setup was not researched and could still show warnings.
- Per the scope definition, files the app creates are accessible to the app; a pre-existing customer folder would be accessible only if the customer opens/shares it with the app (e.g. via Picker). This is inference from the scope definition, not tested.

### Gaps
- The drive.file wording came through a search snippet of the Docs API page and was not verified on a fetched page; the Drive page's own table wording differs. Treat the quoted consent sentence as likely but confirm in the Google Cloud console before use.
- Screenshot of the actual screen: not obtained.

## 4. What do vendors say about where recordings are stored, who owns them, and retention?

### Takeaway
Fireflies is the only vendor with ownership/retention statements retrieved: customer owns data, configurable retention, US cloud default, enterprise can use their own storage. Dialpad says it does not delete files in the customer's Drive. Others not confirmed.

### Cited Findings
- "You retain full ownership of your recordings and transcripts." Fireflies is a custodian. — [Fireflies security guide](https://guide.fireflies.ai/articles/7434774675-responsible-and-secure-meeting-notetaking-with-fireflies)
- "Fireflies does not use your meeting data to train AI models." — [Fireflies security guide](https://guide.fireflies.ai/articles/7434774675-responsible-and-secure-meeting-notetaking-with-fireflies)
- Retention is configurable per content type: "give Video, Audio, Transcript, and Summary each their own retention period"; "You can always delete meetings manually." — [Fireflies security guide](https://guide.fireflies.ai/articles/7434774675-responsible-and-secure-meeting-notetaking-with-fireflies)
- Default storage in US AWS and GCP; Enterprise "Private Storage" on the customer's own S3 or Google Cloud Storage bucket (search summary). — [Fireflies data storage](https://guide.fireflies.ai/articles/9596505232)
- Dialpad: does not delete files or folders from the customer's Drive (secondhand summary, direct fetch 403). — [Dialpad Google Workspace](https://help.dialpad.com/docs/sync-and-integrate-with-google-workspace)
- One Slack listing says Fireflies saves data for a minimum of 12 months, conflicting with the configurable-retention guide; not resolved. — [Slack listing](https://slack.com/apps/A0HPQ0RDG-fireflies-ai)

### Inferences
- Common phrasing to adapt: customer owns the files; vendor is custodian; vendor does not delete from the customer's Drive; retention is the customer's choice. Whether this product keeps any copy is a product decision outside this research (the project's zero-data-retention rule governs).

### Gaps
- Otter, Gong, Zoom, Loom, Calendly, RingCentral, Twilio storage/ownership statements: not retrieved.
- Dialpad's exact quotes: not verified on the page itself.

## 5. Common reasons the connection attempt fails, and vendor fixes

### Takeaway
Documented causes: Workspace admin blocks the app, wrong Google account, browser extensions/cache, blocked pop-ups and third-party cookies, Advanced Protection, and expired/revoked authorization. Fixes are "ask admin to trust the app", "use the right account", "allow cookies/pop-ups", "retry in a private window", "revoke and reconnect".

### Cited Findings
- Admin block: apps without an admin setting are handled via Admin console > Security > API controls > Manage App Access; access levels Trusted, Specific Google data, Limited, Blocked. Users of a blocked app are "notified that the app is blocked"; admins can set a custom message. Admins can enable "Allow users to request access to unconfigured third-party apps"; requests appear under "Apps pending review". Changes "can take up to 24 hours but usually happen sooner." — [Google Workspace admin knowledge base](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)
- Blocking is per OAuth client ID; Limited level allows only unrestricted scopes (search summary of same help family). — [Google Admin Help](https://support.google.com/a/answer/60757)
- Replit's page: "This app is blocked" is typically a Workspace OAuth setting issue; admin adds the vendor's client ID as Trusted and waits 5-10 minutes. A `@gmail.com` account "cannot change the OAuth policy yourself"; if the account is not in the Workspace, use another account; "Browser extensions or cached data can interfere with the OAuth flow", retry in Incognito/Private. Pop-ups and unverified-app warning not covered. — [Replit docs](https://docs.replit.com/features/troubleshooting/debugging-google-connectors.md)
- Pipedrive: allow third-party cookies and pop-ups; use Chrome with the correct Google account signed in; if on Google's Advanced Protection Program, confirm it allows third-party app connections; use a dedicated Google account to avoid conflicts; enable all required permissions during setup. — [Pipedrive help](https://intercom.help/pipedrive/en/articles/14529883-how-can-i-troubleshoot-and-resolve-google-drive-integration-issues-in-pipedrive)
- If a user unchecks a scope on a multi-scope consent screen, the app must detect it and disable the feature. — [Google granular permissions](https://developers.google.com/identity/protocols/oauth2/resources/granular-permissions)
- Testing-status OAuth apps: refresh tokens expire after 7 days unless scopes are only name/email/profile. — [Google OAuth 2.0 docs](https://developers.google.com/identity/protocols/oauth2)

### Inferences
- The signup step should plan for the "managed Google account blocked by admin" case with wording that tells a small-business owner to forward a specific client ID/app name to their Workspace admin, and should offer a path to connect a personal or different Google account.
- Because the product's consent request would be a single scope, a "partial grant" state should not occur; a "denied" state should.

### Gaps
- Exact Google "This app is blocked" and unverified-app screen text and the "Advanced" > "Go to ... (unsafe)" path: not confirmed in the Google pages fetched.
- Pop-up blocker and third-party-cookie guidance from Google or from Zapier/Fireflies/Otter/Gong/Loom/Calendly: not found; only Pipedrive was found.
- Whether Safari/ITP or Chrome third-party-cookie changes affect a redirect-based (full page) OAuth flow versus a pop-up flow: not researched.
