# Google Drive API v3 as storage for call recordings (drive.file, server-side writes per customer)

Research date 2026-11-22. Google's docs were fetched via a summarizing fetch tool, so quotes are paraphrases of the page text. Items marked "not documented" were not found on the pages read.

## 1. Upload methods, size, resumable restart

### Takeaway
Use resumable upload for the recordings (1-100 MB). Simple and multipart stop at 5 MB. A resumable session is restarted with an empty PUT carrying `Content-Range: bytes */<total>`; the session URI lasts one week.

### Cited Findings
- Simple (`uploadType=media`) is for files of 5 MB or less, no metadata. Multipart (`uploadType=multipart`) sends file plus metadata in one request, also 5 MB or less; a retry resends the whole file. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Resumable (`uploadType=resumable`) is for files over 5 MB or flaky connections, and the guide calls it "a good choice for most applications" since it only costs one extra request. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Flow: POST to `/upload` URI with `uploadType=resumable` (metadata in the body); the `Location` response header is the session URI; then PUT data to it, in one request or in chunks. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Chunks must be multiples of 256 KB (256 x 1024 bytes) except the last; use the largest practical chunk; read the `Range` header to find the next byte and do not assume the server received everything sent. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Resume: empty PUT to session URI with `Content-Range: */<total size>`. 200/201 = done; 308 = continue from the `Range` header; 404 = session expired, restart from scratch. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Session URI expires after one week. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Retry rules: 5xx and connection interruptions: resume/retry; 403 rate limit: retry; other 4xx during a resumable upload: restart with a new session URI. No backoff timing is given on this page. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- Maximum file size 5,120 GB (5 TB) for media upload; endpoints: upload `POST https://www.googleapis.com/upload/drive/v3/files`, metadata-only `POST https://www.googleapis.com/drive/v3/files`; any valid MIME type accepted. — [files.create](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create); [Limits](https://developers.google.com/workspace/drive/api/guides/limits) (5 TB upload max)
- files.create requires one of drive, drive.appdata or drive.file. — [files.create](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create)

### Inferences
- A 30-minute dual-channel recording (roughly 1-100 MB) is far above the 5 MB simple/multipart cutoff, so resumable is the only sensible choice; the small transcript/summary files (under 5 MB) could use multipart, but using resumable for everything keeps one code path.
- Server must store the session URI per upload (needed to resume for up to a week), upload in 256 KB-multiple chunks (e.g. 8 MiB) or a single PUT, check status after any failure, and restart with a fresh session on 404/other 4xx.

### Gaps
- No documented maximum for resumable chunk size, and no documented backoff timing on the uploads page (the general limits page gives the formula, see section 3).

## 2. drive.file scope: folders, visibility, deletion, revocation

### Takeaway
drive.file is non-sensitive and lets the app create files/folders and access only files it created or the user opened/shared via Picker. Google documents little beyond that; behavior on folder delete/move and on revoke is not officially documented.

### Cited Findings
- drive.file: "Create new Drive files, or modify existing files, that you open with an app or that the user shares with an app while using the Google Picker API or the app's file picker." Classified non-sensitive (basic OAuth verification only); Google recommends it for most uses. `drive` and `drive.readonly` are restricted. — [Choose scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Creating a folder is `files.create` with mimeType `application/vnd.google-apps.folder`; omitting `parents` puts the item in My Drive root; a file has exactly one parent. — [Folders](https://developers.google.com/workspace/drive/api/guides/folder)
- `files.get` returns `isAppAuthorized` (output only): whether the requesting app created or opened the file. — [files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)
- Folder `capabilities.canAddChildren` tells whether the current user can add children. — [files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)
- Delete: `files.delete` permanently deletes (bypasses trash) a file the user owns; for shared drives the user must be organizer on the parent; deleting a folder deletes descendants the user owns. Accepts drive.file scope. — [files.delete](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/delete)
- Trash is reversible and auto-purged after 30 days; trashing/deleting requires owner (or organizer/fileOrganizer in shared drives); writers cannot trash/delete. The page text and its table disagree on whether non-owners may trash. — [Trash or delete](https://developers.google.com/workspace/drive/api/guides/delete)
- Folder moves: `files.update` with `addParents`/`removeParents`. — [Folders](https://developers.google.com/workspace/drive/api/guides/folder)
- Community (not Google docs): a 2019 Apps Script forum reply says drive.file does not give access to other files inside a picked folder; another report says Files.list under drive.file returns only folders created by the same script. — [Google Apps Script community](https://groups.google.com/g/google-apps-script-community/c/_W-NKbttfbo) (search-result summaries only, unverified)
- Revocation: Google's help page says removing an app's access means the app can no longer access the Google Account; it does not say whether files created stay. — [Google Account help](https://support.google.com/accounts/answer/13533235). A 2015 Stack Overflow report describes an app losing sight of its own drive.file files after the user disconnected and re-authorized; a 2019 Apps Script thread has conflicting reports. draw.io says disconnecting leaves its files in Drive. — [SO question](https://kaweah.freedombox.rocks/kiwix/content/stackoverflow.com_en_all_2023-11/questions/30172915/user-disconnecting-app-in-drive-causes-loss-of-data-under-file-scope); [draw.io](https://drawio.com/doc/faq/google-drive-revoke-access)

### Inferences
- The recordings are the customer's files in their Drive; they should remain after revocation (draw.io, consistent with ownership by the user), but whether the app regains access to them after reconnect is unverified. Plan to treat a reconnect as potentially unable to see old files, and test.
- Because folder id lookups use `files.get` and the app created the folder, finding it again by stored id is the safe route; a name search (`files.list` with `q`) under drive.file is only expected to return app-authorized items. If the customer deletes/trashes the folder, `files.get` returns 404 or `trashed: true`; if moved, the id still works (ids do not change on move). These last points are inferred from the API model, not stated by Google.
- Deleting with drive.file: delete is allowed by scope, but only on files the app created/opened and the user owns, so a create-then-delete test file works.

### Gaps
- Official documentation of what happens to app-created files/visibility on revoke: not found.
- Official statement on whether files.list under drive.file is limited to app-authorized files, and on whether picking a folder grants child listing: not found (only community posts).
- What the app sees if the customer deletes or moves the folder: not documented.

## 3. Quota, errors, rate limits, backoff

### Takeaway
Files count against the owning user's storage; a full Drive gives 403 `storageQuotaExceeded`. Rate limits are generous (325,000 units/min/user, files.create costs 50) and exponential backoff is the prescribed retry. 750 GB/day per user upload cap.

### Cited Findings
- Quotas: 1,000,000 units per minute per project; 325,000 units per minute per user per project; `files.create`/`update` = 50 units; list = 100; get = 5. Per-day billing threshold 400,000,000 units per project (cannot be raised); exceeding quota "planned to incur charges" later in 2026; projects created on/after 2026-05-01 use the new quotas. No daily request cap if per-minute limits are respected. — [Usage limits](https://developers.google.com/workspace/drive/api/guides/limits)
- Users can upload 750 GB per day across My Drive and shared drives (also applies to copies); at the limit, uploads/copies are blocked for 24 hours. Max upload file 5 TB. — [Usage limits](https://developers.google.com/workspace/drive/api/guides/limits)
- Quota exceeded returns 403 (user rate limit) or 429 (backend). Backoff: wait `min((2^n) + random_number_milliseconds, maximum_backoff)`, random up to 1,000 ms, max backoff typically 32 or 64 s. — [Usage limits](https://developers.google.com/workspace/drive/api/guides/limits)
- Errors: 403 `storageQuotaExceeded` ("user reaches their storage limit"; fix is user frees/buys storage; service accounts have no quota and cannot own files); 403 `userRateLimitExceeded`; 403 `rateLimitExceeded`; 403 `dailyLimitExceeded`; 403 `sharingRateLimitExceeded`; 429 `rateLimitExceeded`; 404 `notFound` (no read access or missing); 500/502/503/504 back off and retry. — [Handle errors](https://developers.google.com/workspace/drive/api/guides/handle-errors)
- Items: each user max 500 million created items; each My Drive folder max 500,000 items; max 100 nested folder levels (`myDriveHierarchyDepthLimitExceeded`). Trashed items still count toward item limits; only permanent delete frees them. — [Folders](https://developers.google.com/workspace/drive/api/guides/folder)

### Inferences
- Retry 429, 5xx, `rateLimitExceeded`, `userRateLimitExceeded` with backoff. Do NOT retry `storageQuotaExceeded`; surface it as a "Drive full" connection error to the owner (fail loud). `notFound` on the folder id means the folder is gone or access lost: surface it, do not recreate silently.
- 500,000 items per folder: at e.g. 50 calls/day x 2-3 files, a single folder would take years to fill; date subfolders are optional.
- Service-account storage is not usable; the customer's OAuth user must own the files.

### Gaps
- Whether a Workspace admin storage cap or per-user org quota adds a different error code: not documented on pages read.
- The Drive MCP server page lists inverted per-user vs per-project numbers; it is not relevant to the REST API and was not relied on.

## 4. Shared drives and Workspace

### Takeaway
Writing into a shared drive needs `supportsAllDrives=true` on calls and the user must be a member with add rights; whether drive.file reaches an existing shared drive folder is not documented.

### Cited Findings
- `supportsAllDrives=true` signals the app handles shared drive items; without it on `files.list`, shared drive items are excluded; supported on `files.create`, `permissions`, etc. `includeItemsFromAllDrives` and `driveId` apply to listing. — [Shared drives support](https://developers.google.com/workspace/drive/api/guides/enable-shareddrives)
- Shared drives follow different ownership models than My Drive; the page gives no detail. A `files.get` 404 may need `supportsAllDrives`. `driveId` is populated on shared-drive items; `ownedByMe` is not populated for shared drive items. — [Shared drives support](https://developers.google.com/workspace/drive/api/guides/enable-shareddrives); [files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)
- Moving a My Drive folder into a shared drive via `addParents` fails with `teamDrivesFolderMoveInNotSupported`. — [Folders](https://developers.google.com/workspace/drive/api/guides/folder)
- `ignoreDefaultVisibility` on create ignores domain default visibility; permissions still inherit from parent folders. — [files.create](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create)
- Community summaries: a shared drive's settings override file-level sharing and a user can lose access to a file they created if shared drive permissions change. — [Search summary of Google help](https://support.google.com/a/users/answer/12380484) (unverified)

### Gaps
- Role needed to create files in a shared drive, 500,000 item cap of shared drives, file ownership (shared drive owns files, not users, from general Drive knowledge): not stated on the pages read.
- Whether drive.file works with shared drives, and Workspace admin controls on third-party app access (admin can block apps; see [Workspace Updates](https://workspace.google.com/blog/product-announcements/enhancing-security-controls-for-google-drive-third-party-apps)): not confirmed.

## 5. Google Picker with drive.file

### Takeaway
Yes: the web Picker is the documented way to have the user hand the app a file under drive.file. Needs API key, Cloud project number as App ID, OAuth token, browser JS. Folder selection exists (`setSelectFolderEnabled`); that picking a folder lets the app write into it is likely but not confirmed in docs.

### Cited Findings
- Web Picker is a client-side JavaScript library (PickerBuilder); the user must be signed in; the Picker view token comes from the drive.file scope. Web can use other scopes, desktop/mobile only drive.file. — [Picker overview](https://developers.google.com/workspace/drive/picker/guides/overview); [Web picker](https://developers.google.com/workspace/drive/picker/guides/web-picker)
- Requirements: enable the Google Picker API in the Cloud project; API key via `setDeveloperKey()` (if restricted to websites, also allow `https://docs.google.com/*` or "API developer key is invalid"); Cloud project number via `setAppId()`; OAuth token via `setOAuthToken()`; load `api.js` then `gapi.load('picker', ...)`; Google Identity Services `google.accounts.oauth2.initTokenClient` to get tokens. — [Web picker](https://developers.google.com/workspace/drive/picker/guides/web-picker)
- Callback returns `action` and a `docs` array on `google.picker.Action.PICKED`, with id/URL etc. — [Web picker](https://developers.google.com/workspace/drive/picker/guides/web-picker)
- `DocsView.setSelectFolderEnabled(enabled: boolean)` lets the user select folders. — [Reference](https://developers.google.com/workspace/drive/picker/reference/picker.docsview.setselectfolderenabled)
- The Picker cannot organize, move or copy files. — [Web picker](https://developers.google.com/workspace/drive/picker/guides/web-picker)

### Inferences
- The app ID (project number) is what ties the pick to the app so drive.file access is granted; this is the documented purpose of `setAppId`, not a separately stated guarantee.
- Picker runs in the customer's browser (the portal), then the folder id is sent to the server, which stores it and writes with the customer's refresh token.
- Alternative without Picker: server creates its own folder (e.g. "Geek Receptionist Recordings") in the customer's My Drive; simpler, no API key.

### Gaps
- Official statement that picking a folder grants create-in-folder (and what else is visible): not found. Shared drive selection in the Picker (`Feature.SUPPORT_DRIVES`): not confirmed on pages fetched.

## 6. Metadata and idempotency

### Takeaway
Set name, mimeType, parents, description, and `appProperties` (a call id) on create; pre-generate the file id with `files.generateIds` so a retried create returns 409 rather than a duplicate.

### Cited Findings
- Pre-generated IDs let you retry safely after an indeterminate error or timeout; if the first attempt succeeded the retry returns 409 Conflict, and no duplicate is created. Not supported for most Google Workspace file types or conversion uploads. — [Manage uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)
- `files.generateIds`: GET `/drive/v3/files/generateIds`, params `count`, `space` (drive/appDataFolder), `type`; returns `ids[]`; accepts drive.file. Max count and ID validity period not stated. — [generateIds](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/generateIds)
- `appProperties` are private to the requesting app and readable only with authenticated OAuth requests; `properties` are visible to all apps. Limits per file: 100 total, 30 public, 30 private per app, each key+value up to 124 bytes UTF-8. Both can be used in search `q`. — [Properties](https://developers.google.com/workspace/drive/api/guides/properties); [files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)
- Include a file extension in `name`; Drive infers one from MIME type otherwise. `md5Checksum` and `size` are returned (binary files) and could verify the upload. `description` is a short text, no limit stated. — [File guide](https://developers.google.com/workspace/drive/api/guides/file); [files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)

### Inferences
- Suggested: generate the id when the call record is created and persist it; `appProperties` = {callId, tenantId, kind (audio/transcript/summary)} (each value under 124 bytes minus key) so a search `appProperties has {key='callId' and value='...'}` can find orphaned partial files; compare `md5Checksum` against local to confirm.
- Same call id retried after success gets 409: treat as success after a `files.get` check of `size`/`md5Checksum`.

### Gaps
- Whether the 409 behavior also applies within resumable session creation specifically (page speaks generally): not separately stated.

## 7. Connection test

### Takeaway
Lightest meaningful test: create the recordings folder (or a tiny text file inside it) then permanently delete the test file with `files.delete`; drive.file permits both for app-created files. Official guidance on a "test" does not exist.

### Cited Findings
- `files.create` and `files.delete` both accept drive.file. — [files.create](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create); [files.delete](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/delete)
- `files.delete` bypasses trash, so no clutter or item-count residue; trash otherwise lingers 30 days and counts toward item limits. — [files.delete](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/delete); [Folders](https://developers.google.com/workspace/drive/api/guides/folder)
- Quota cost of create is 50 units; trivial. — [Usage limits](https://developers.google.com/workspace/drive/api/guides/limits)

### Inferences
- Test sequence: (1) `files.get` the stored folder id (fields `id,trashed,capabilities/canAddChildren`) to prove the folder exists and is writable; (2) create a small file (e.g. 1 byte) with `appProperties {purpose: connectionTest}` in that folder; (3) `files.get` it back; (4) `files.delete`. Keep the folder (no clutter). Avoid creating then deleting a folder each time; the folder is needed anyway.
- If delete returns 403, leave the test file and report it (fail loud) rather than silently ignoring.
- Test also checks `about.get` `storageQuota` (needs an appropriate scope; not confirmed for drive.file) to warn of low space: not verified.

### Gaps
- Whether `about.get` works with drive.file: not checked.
