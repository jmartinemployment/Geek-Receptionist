# Google OAuth 2.0 for multi-tenant SaaS using the drive.file scope

Research date: 2026-11-22. None of the Google pages fetched showed a publication or last-updated date; they were read live on this date.

## Scope classification and app verification

### Takeaway
drive.file is classified non-sensitive. Non-sensitive scopes need no sensitive/restricted scope review and no security assessment; the security assessment applies only to restricted-scope data. A lighter "brand verification" is still needed to show app name/logo on the consent screen and for production use.

### Cited Findings
- drive.file is listed under "Non-sensitive scopes" (with drive.appdata, drive.install); sensitive = drive.apps.readonly only; restricted = drive, drive.readonly and others. Non-sensitive scopes "only require basic" OAuth app verification. — [Drive API scopes guide](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- drive.file: create/modify files the user opens with the app or shares via Google Picker / the app's own picker (per-file access). — [same](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- "Since drive.file is non-sensitive, it allows for a more streamlined verification process." — [same](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Security assessment: "If you store restricted scope data on servers (or transmit), then you must go through a security assessment." Only specific app types may use restricted Drive scopes. — [same](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)
- Apps using only non-sensitive scopes need not complete full verification; to display app name and logo on the consent screen they must complete "brand verification". Sensitive/restricted scopes require OAuth app verification; restricted need annual re-verification; some config changes to a verified app can require re-verification. — [Cloud Console help](https://support.google.com/cloud/answer/13463073)
- Sensitive scope verification "can take up to 10 days". Verification not needed for: personal/small known group use, Testing-status dev projects, service accounts on own data, internal-only Workspace use. — [Sensitive scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)
- Production apps need a public homepage on a verified domain you own, describing the app and linking terms of service and privacy policy; verified brand info; consent-screen scopes must match requested scopes; use separate Cloud projects for dev/staging/prod. — [OAuth policies](https://developers.google.com/identity/protocols/oauth2/policies)

### Inferences
- Triggers for verification: sensitive/restricted scopes, and (for branding) wanting name/logo shown. User count matters via the 100-user cap on unverified apps (below), so a production app with many tenants should complete brand verification even though no scope review is needed.
- A Drive-recordings app using only drive.file (files it creates or the user picks) avoids the restricted-scope security assessment. If the same OAuth client also requests Calendar scopes (sensitive), the whole app is subject to sensitive-scope verification (see last section).

### Gaps
- Exact brand-verification steps/timing and the list of required branding fields (app name, logo, support email, authorized domains, privacy policy) were not retrievable: the Cloud help page content was truncated; it points to https://support.google.com/cloud/answer/13464321 (Verification Requirements), not read.
- Whether brand verification is strictly mandatory for a non-sensitive-only production app (versus only to show name/logo): sources are worded as the latter; not confirmed further.

## Consent screen: Testing vs In production

### Takeaway
Testing: max 100 listed test users, authorizations and offline refresh tokens expire after 7 days. In production: any Google user can authorize; an unverified-warning screen with a 100-new-user lifetime cap applies when scopes lack approval.

### Cited Findings
- Testing: up to 100 test users; users see a warning; authorizations expire 7 days after consent, including offline refresh tokens. Exception: apps requesting only email/profile/openid. — [Cloud Console help](https://support.google.com/cloud/answer/15549945)
- In production (after "Publish app"): any Google Account can authorize; verification may still be required for name/logo or sensitive/restricted scopes. — [same](https://support.google.com/cloud/answer/15549945)
- Unverified-app screen apps are limited to 100 new users total over the project's lifetime; cannot be reset; verified apps with only approved scopes are not capped. — [same](https://support.google.com/cloud/answer/15549945)
- Refresh token 7-day expiry applies to external user type + Testing status. — [OAuth 2.0 overview](https://developers.google.com/identity/protocols/oauth2)

### Inferences
- Whether a production app with only drive.file (non-sensitive) shows the unverified-warning screen at all is not stated in fetched text; the cap is described as tied to scopes not approved. Treat as unconfirmed; see Gaps.

### Gaps
- Not confirmed whether non-sensitive-only production apps show the "unverified app" screen or count against the 100 cap.
- Required consent screen fields (app name, logo, privacy policy URL, authorized domains) not read from a primary source.

## Redirect URIs

### Takeaway
HTTPS required (localhost exempt), exact match including scheme, case and trailing slash, no wildcards, no fragments.

### Cited Findings
- Must use HTTPS (localhost exempt); no raw IPs except localhost; TLD on public suffix list; no userinfo, path traversal, fragments, wildcards, open redirects; "scheme, case, and trailing slash must match a registered URI exactly". — [OAuth web-server guide](https://developers.google.com/identity/protocols/oauth2/web-server)
- Redirect URIs/JS origins may only refer to domains you own or are authorized to use; use the web client type for web apps. — [OAuth policies](https://developers.google.com/identity/protocols/oauth2/policies)

### Inferences
- Reuse of one redirect URI for several flows/providers is not prohibited in the text read; URIs are per OAuth client, so flow differentiation must use the `state` parameter. Unconfirmed from docs.

### Gaps
- Adding URIs after the fact and propagation delay: not documented in fetched pages.
- Reuse of one URI across providers/flows: not explicitly addressed.

## Refresh tokens

### Takeaway
Use access_type=offline; a refresh token comes back mainly on first consent; use prompt=consent to re-obtain. Tokens die on revocation, 6 months unused, token cap, admin policy, Testing 7 days.

### Cited Findings
- access_type=offline returns a refresh token on first code exchange; generally only on first authorization; to get a new one for an already-granted user use prompt=consent or have user revoke. Lost refresh token means repeating consent. — [OAuth web-server guide](https://developers.google.com/identity/protocols/oauth2/web-server)
- Reasons a refresh token stops working: user revoked; unused six months; password change while token has Gmail scopes; user's live-token cap reached; time-based access expired; admin set a requested service to Restricted (error `admin_policy_enforced`); Google Cloud session-length control. Plus the 7-day Testing rule. — [OAuth 2.0 overview](https://developers.google.com/identity/protocols/oauth2)
- Limit: 100 refresh tokens per Google Account per OAuth client ID; the oldest is invalidated silently when exceeded; service accounts exempt. — [same](https://developers.google.com/identity/protocols/oauth2)
- Google also limits tokens per user across all clients. — [OAuth web-server guide](https://developers.google.com/identity/protocols/oauth2/web-server)
- invalid_grant: on refresh or incremental auth, typically expired/invalidated token, or account deleted/disabled; fix is re-authentication and new consent. — [same](https://developers.google.com/identity/protocols/oauth2/web-server)
- Apps needing revocation notices can integrate Cross-Account Protection; store tokens encrypted; revoke/delete when no longer needed. — [OAuth policies](https://developers.google.com/identity/protocols/oauth2/policies)

### Inferences
- A SaaS should treat invalid_grant (and admin_policy_enforced) as "connection broken": mark the tenant's Drive connection disconnected, stop uploads, surface an operator/owner-visible reconnect prompt, and never silently drop recordings. Also store the newest refresh token and avoid re-prompting consent on every login (repeated prompt=consent mints extra tokens toward the 100 cap).
- Password-change revocation is tied to Gmail scopes, so it should not apply to a drive.file-only token (inference from the wording).

### Gaps
- Whether Google rotates refresh tokens on use: not stated in fetched text.

## Google Workspace admin controls

### Takeaway
Admins can block or limit third-party apps per OU. drive.file is not on the high-risk Drive scope list, so a Restricted Drive setting still lets users grant it if the admin allows non-high-risk scopes.

### Cited Findings
- Four access levels per app per OU: Trusted, Specific Google data, Limited, Blocked. Services can be set Restricted (only Trusted/Specific apps access them); switching to Restricted stops previously installed untrusted apps and revokes tokens. — [Workspace admin help](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)
- Drive high-risk scope list includes drive, drive.readonly, drive.metadata; drive.file is not named and not on it. When Drive is restricted, admins can allow users to grant non-high-risk scopes ("user-selected files in Drive"). — [same](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)
- Blocked users are told the app is blocked (admin may add custom message, else default). Unconfigured apps: default allow all; or allow only basic sign-in; or block until configured; users can request access (Apps pending review). Changes up to 24 hours. — [same](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)
- Restricting Drive also restricts the Google Forms API. — [same](https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data)

### Inferences
- A Workspace customer must have their admin set the app (by OAuth client ID) to Trusted/allowed, or allow unconfigured apps; the SaaS should give customers its client ID and the scopes list.

### Gaps
- Exact consent-screen wording shown to blocked users and the default "app blocked" text: not captured.
- Whether a "Block all unconfigured" policy blocks a non-sensitive drive.file-only app: the page says unconfigured apps are blocked; assumed yes, not separately confirmed.

## Incremental authorization and sharing a client with Google Calendar

### Takeaway
Use include_granted_scopes=true to add Drive to an existing grant. Sharing the Calendar client means the project already has sensitive scopes, so verification for Calendar scopes governs the whole consent screen.

### Cited Findings
- include_granted_scopes=true makes the new token cover previously granted scopes; refreshing returns the combined set; revoking a combined token revokes all its scopes; previously granted scopes may trigger an unverified warning if the app isn't approved for all of them. — [OAuth web-server guide](https://developers.google.com/identity/protocols/oauth2/web-server)
- Request additional scopes via incremental authorization with a justification shown to the user; if a scope is denied, disable the related feature. — [OAuth policies](https://developers.google.com/identity/protocols/oauth2/policies)
- Calendar event read is an example sensitive scope requiring review. — [Sensitive scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)

### Inferences
- Combined token means revoking Drive in a user's account may revoke Calendar too if tokens were merged; a separate OAuth client (or separate token storage per feature) isolates failure and verification scope. A separate client for Drive-only would let it sit entirely in the non-sensitive tier. This is a design judgment, not a Google statement.

### Gaps
- Google's guidance on one client vs several for different scopes: not found.
