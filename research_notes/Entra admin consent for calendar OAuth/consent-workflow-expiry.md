# Entra admin consent workflow: configuration, expiry window, and requester/approver experience

Researched 2026-11-21. Every citation below is a primary Microsoft Learn page unless marked
secondary. Page dates are the `ms.date` / `updated_at` values embedded in each page's metadata as
served on 2026-11-21.

## Does any primary Microsoft source state the allowed range or default for the consent-request expiry window?

### Takeaway
No. No primary Microsoft page states a minimum, maximum, or default for the expiry window. The
Graph API documents `requestDurationInDays` only as "Specifies the duration the request is active
before it automatically expires if no decision is applied" — type Int32, no range, no default, and
(unlike the other policy properties) no "Required." marker on the resource page. The secondary
claim "configurable up to 365 days, commonly 7 or 30" is NOT CONFIRMED by any primary source; the
widely circulated 30-day figure comes from hardening guidance (CIS, ASD), not from Microsoft.

### Cited Findings
- Graph v1.0 resource page, Properties table, verbatim: "requestDurationInDays | Int32 | Specifies the duration the request is active before it automatically expires if no decision is applied." No min/max/default stated; the row carries no "Required." marker, while `isEnabled`, `notifyReviewers`, `remindersEnabled`, and `reviewers` each end with "Required." (page ms.date 2024-07-22, updated_at 2024-11-27) — [adminConsentRequestPolicy resource type](https://learn.microsoft.com/en-us/graph/api/resources/adminconsentrequestpolicy)
- The Graph beta page's Properties table is word-for-word identical for `requestDurationInDays`; beta adds no constraints and no extra properties (updated_at 2024-12-06) — [adminConsentRequestPolicy (beta)](https://learn.microsoft.com/en-us/graph/api/resources/adminconsentrequestpolicy?view=graph-rest-beta)
- Portal doc, verbatim, the entire description of the setting: "**Consent request expires after (days)** - Specify how long requests stay valid." No range, no default (ms.date 2024-12-29, updated_at 2026-02-19) — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- The same portal doc's reminder example uses a 3-day window: "For example, if you configure the consent request to expire in three days, the first reminder email is sent out on the second day, and the last expiration email is sent out almost immediately the consent request expires." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- The Graph update example body uses `"requestDurationInDays": 5` (ms.date 2024-04-04, updated_at 2024-11-27) — [Update adminConsentRequestPolicy](https://learn.microsoft.com/en-us/graph/api/adminconsentrequestpolicy-update)
- The Graph GET example response shows a live tenant policy with `"isEnabled": true, "notifyReviewers": false, "remindersEnabled": false, "requestDurationInDays": 0, "version": 0` — so 0 is a value the service actually returns; its semantics are nowhere documented (updated_at 2025-07-23) — [Get adminConsentRequestPolicy](https://learn.microsoft.com/en-us/graph/api/adminconsentrequestpolicy-get)
- Graph conceptual overview, verbatim, on what the policy configures: "Configure how long a pending request is valid before it expires and the principals who are notified of pending requests." Again no range (ms.date 2022-09-28) — [Microsoft Entra consent requests](https://learn.microsoft.com/en-us/graph/api/resources/consentrequests-overview)
- Secondary (not Microsoft): the CIS Microsoft 365 benchmark and the Australian Signals Directorate Blueprint for Secure Cloud both recommend setting "Consent request expires after (days)" to 30 — [ASD Blueprint: Admin consent settings](https://blueprint.asd.gov.au/configuration/entra-id/applications/enterprise-applications/consent-and-permissions/admin-consent-settings/); [Tenable rendering of CIS M365 v3.1.0](https://tenable.com/audits/items/CIS_Microsoft_365_v3.1.0_E3_Level_1.audit:fe8bac07e37155e9828cdfa49a603f56)
- Secondary (not Microsoft): the Maester EIDSCA.CR04 test treats ≤30 days as the recommended value and a code comment notes an unset value means the tenant is on a Microsoft-decided default that "could change" — [Maester EIDSCA.CR04](https://0a0b8e86.maester.pages.dev/docs/tests/EIDSCA.CR04)
- The PowerShell cmdlet reference for `Update-MgPolicyAdminConsentRequestPolicy` lists "Default value: 0" for the `-RequestDurationInDays` parameter — this is the auto-generated cmdlet parameter placeholder (every Int32 parameter defaults to 0 when omitted), not a documented service default — [Update-MgPolicyAdminConsentRequestPolicy](https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/update-mgpolicyadminconsentrequestpolicy)

### Inferences
- The "up to 365 days" claim in the earlier secondary summary has no primary backing anywhere I could find; treat it as unverified. If the real portal input ceiling matters, it would have to be read off the Entra admin center form itself (client-side validation), which no doc records.
- For sizing a vendor-side "parked awaiting admin consent" TTL: the tenant's window is admin-chosen and invisible to the vendor; observed/documented reference points are 0 (GET example), 3 (portal example), 5 (update example), and 30 (CIS/ASD recommended). A vendor TTL meaningfully longer than 30 days outlives the request window of any tenant following standard hardening guidance; conversely nothing documented stops a tenant choosing a much longer window.
- Because the Update API is a `PUT` and its doc says "The following table shows the properties that are required when you update the adminConsentRequestPolicy" listing `isEnabled`, `notifyReviewers`, `remindersEnabled`, `requestDurationInDays`, and `reviewers`, an update is a full replace — all five must be supplied together.

### Gaps
- No primary source states the allowed minimum/maximum for `requestDurationInDays` or the "Consent request expires after (days)" portal field. NOT CONFIRMED: the "365 max" claim.
- No primary source states what `requestDurationInDays: 0` means (no expiry? service default?). The GET example shows it on an enabled policy, undocumented.
- No primary source states a service-side default value applied when the workflow is first enabled.

## What do the Graph request resources (`userConsentRequest` / `appConsentRequest`) say about expiry?

### Takeaway
Expiry is surfaced only as a status value: `userConsentRequest.status` can be `Expired`. There is
no `expiryDateTime` property on either resource in v1.0 — only `createdDateTime` and
`completedDateTime` — so the expiry moment must be computed as createdDateTime + the policy's
`requestDurationInDays`.

### Cited Findings
- `userConsentRequest.status`, verbatim: "The status of the user's app consent request. The possible values are: `Initializing`, `InProgress`, `Expired`, and `Completed`. Supports `$filter` (`eq` only) and `$orderby`." (ms.date 2024-07-22, updated_at 2025-12-03) — [userConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/userconsentrequest)
- `userConsentRequest` properties are: `approvalId`, `completedDateTime` ("The date and time when the **status** of the request was marked as `Completed`"), `createdBy`, `createdDateTime`, `customData` ("Not used."), `id`, `reason` ("The user's justification for requiring access to the app."), `status`. No expiry property exists — [userConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/userconsentrequest)
- `appConsentRequest` properties are only `appDisplayName`, `appId`, `id`, `pendingScopes` ("A list of pending scopes waiting for approval. Required."), plus the `userConsentRequests` relationship ("A list of pending user consent requests."). No expiry or status property on the app-level object (updated_at 2024-11-27) — [appConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/appconsentrequest)
- The app-level "Filter by current user" method, verbatim: "Read the properties of appConsentRequest objects for which the current user is the reviewer and the status of the user consent request is `InProgress`." — [appConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/appconsentrequest)
- Approval/denial cannot be done via Graph, verbatim: "The current APIs are limited to configuring the workflow and reading the list of requests. At this time, there aren't any methods available to programmatically approve or deny a request. However, the contents of the request can be used to recreate a URL which can be used to grant admin consent and approve a request." — [Microsoft Entra consent requests](https://learn.microsoft.com/en-us/graph/api/resources/consentrequests-overview); confirmed by the portal doc: "You can't approve or deny consent requests using Microsoft Graph." — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)

### Inferences
- A vendor polling Graph (with ConsentRequest.Read.All) could watch its app's `userConsentRequests` flip from `InProgress` to `Completed`/`Expired`, but could not compute a precise expiry time ahead of the flip without also reading the tenant's `adminConsentRequestPolicy` (Policy.Read.All) — both reads require permissions inside the customer tenant, so in practice a third-party SaaS vendor cannot see any of this and must size its parked TTL blind.

### Gaps
- No `expiryDateTime` anywhere in v1.0; NOT CONFIRMED whether the beta `userConsentRequest` adds one (the beta adminConsentRequestPolicy adds nothing; the beta userConsentRequest page was not fetched).

## Is the workflow enabled or disabled by default on a tenant?

### Takeaway
No primary page states "disabled by default" verbatim, but both portal docs describe it as a
feature an admin must turn on (Global Administrator required), and the overview frames it as
something "an admin can grant users" by "turning on the admin consent workflow" — i.e., off until
enabled. Treat "disabled by default" as a well-supported inference, not a quoted fact.

### Cited Findings
- Overview, verbatim: "When user consent is turned off, an admin can grant users the ability to make requests for gaining access to applications by turning on the admin consent workflow." (ms.date 2024-11-29, updated_at 2026-06-15) — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Configure doc, verbatim: "You must be a Global Administrator to turn on the admin consent workflow." And the enable step: "Under **Admin consent requests**, select **Yes** for **Users can request admin consent to apps they are unable to consent to**." Also: "Select **Save**. It can take up to an hour for the workflow to become enabled." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- Graph resource, verbatim: "Represents the policy for enabling or disabling the Microsoft Entra admin consent workflow. ... There is a single **adminConsentRequestPolicy** per tenant." — [adminConsentRequestPolicy resource type](https://learn.microsoft.com/en-us/graph/api/resources/adminconsentrequestpolicy)
- Secondary: the CIS Microsoft 365 benchmark has a control titled "Ensure the admin consent workflow is enabled," which only makes sense if tenants commonly have it off — [Tenable rendering of CIS M365](https://tenable.com/audits/items/CIS_Microsoft_365_v3.1.0_E3_Level_1.audit:fe8bac07e37155e9828cdfa49a603f56)
- Secondary: the Maester EIDSCA checks record Microsoft's default for the policy's enablement as disabled — [Maester EIDSCA.CR04](https://0a0b8e86.maester.pages.dev/docs/tests/EIDSCA.CR04)

### Inferences
- Default is disabled: a brand-new tenant's users hit the hard block (next question) until a Global Administrator opts in. For the Geek-Receptionist flow this means "the customer's admin never even sees a request queue" is the common case — the first-run experience for many tenants is the dead-end prompt, not a pending request.

### Gaps
- NOT CONFIRMED verbatim: no Microsoft sentence of the form "the admin consent workflow is disabled by default."

## What does the requesting user experience — workflow enabled vs disabled?

### Takeaway
Disabled: the user hits a consent prompt they cannot act on and, per Microsoft, "might be unable to
use the application" — a dead end unless they know an admin out-of-band. Enabled: the same prompt
gains a request path ("users can request consent directly through the prompt"), the request goes by
email to designated reviewers, and the user is notified of the outcome. The request carries a
user-supplied justification (`reason` on `userConsentRequest`).

### Cited Findings
- Workflow off, verbatim: "When users attempt to sign in, they might see a consent prompt like the one in the following screenshot. ... If the user doesn't know who can grant them access, they might be unable to use the application. This situation also requires administrators to create a separate workflow to track requests for applications if they're open to receiving them." (the prompt text itself is shown only as a screenshot) — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Workflow on, verbatim: "When you configure the admin consent workflow, your users can request consent directly through the prompt." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Configure doc, verbatim: "When a user tries to access an application but is unable to provide consent, they can send a request for admin approval. The request is sent via email to admins who are designated as reviewers. A reviewer takes action on the request, and the user is notified of the action." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- The justification is a first-class field, verbatim: "reason | String | The user's justification for requiring access to the app." — [userConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/userconsentrequest)
- Graph requests exist "only when the admin consent workflow is enabled," verbatim: "The user can create a consent request when an app or a permission requires admin authorization and only when the [admin consent workflow] is enabled." — [userConsentRequest](https://learn.microsoft.com/en-us/graph/api/resources/userconsentrequest) and identically on [appConsentRequest](https://learn.microsoft.com/en-us/graph/api/resources/appconsentrequest)
- Microsoft's positioning of the workflow for restricted tenants, verbatim: "Consider enabling the admin consent workflow to allow users to request administrator approval directly from the consent screen." (ms.date 2025-07-20) — [Manage consent to applications and evaluate consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-consent-requests)

### Inferences
- Multiple users requesting the same app fold into one `appConsentRequest` with several `userConsentRequests` ("An app consent request may have one or more user consent requests representing multiple requests from the same or multiple users" — [consentrequests-overview](https://learn.microsoft.com/en-us/graph/api/resources/consentrequests-overview)), and the review-page wording "all requestors are notified" confirms outcome notifications fan out to every requester of that app.

### Gaps
- The exact on-screen dialog wording ("Approval required" / "Need admin approval" / justification box label) is carried only in screenshots on the Microsoft pages, not in quotable text. NOT CONFIRMED verbatim.

## Is the requesting user notified by email when the admin approves?

### Takeaway
Yes — provided the tenant left notifications on. Approval, denial, block, and expiry each trigger a
requester email; but requester emails ride the same toggle as reviewer emails, so a tenant that
disabled reviewer notifications has silently disabled requester notifications too.

### Cited Findings
- Verbatim: "Requestors receive email notifications when: They submit a new request for access. Their request expires. Their request is denied or blocked. Their request is approved." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Verbatim: "When an administrator responds to a request, the user receives an email alert that says the request is processed." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Verbatim: "Once a request is approved, all requestors are notified that their request for access is granted." (ms.date 2025-04-08, updated_at 2026-03-19) — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- The coupling caveat, verbatim: "**Selected users will receive email notifications for requests** - Enable or disable email notifications to the reviewers when a request is made. If this option is disabled, email notifications to the requesters when a request is made and reviewed are also disabled." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- Reviewer-side notifications, verbatim: "If email notifications are configured, all reviewers receive the notifications when: A new request is created. A request expires. A request is nearing the expiration date." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Reminder timing, verbatim: "The first about-to-expire reminder email is likely sent out in the middle of the configured 'Consent request expires after (days).'" — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)

### Inferences
- A vendor cannot rely on the user being told their request was approved: the tenant may have turned off `notifyReviewers`, which drags requester emails down with it. The vendor's own "retry/connect" surface is the only reliable prompt for the user to come back.

### Gaps
- None material.

## After approval, what happens when the user retries the app?

### Takeaway
Approval = the reviewer grants tenant-wide admin consent, which by default opens the app to every
user in the tenant (unless user assignment is required). No Microsoft page narrates the retry
moment itself ("the user signs in again and it works") — that step is implied, not documented.

### Cited Findings
- Verbatim: "**Approve the request**. To approve a request, grant admin consent to the application. Once a request is approved, all requestors are notified that their request for access is granted. Approving a request allows all users in your tenant to access the application unless otherwise restricted with user assignment." — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- Verbatim: "By default, granting tenant-wide admin consent to an application allows all users to access the application unless otherwise restricted. To restrict which users can sign-in to an application, configure the app to require user assignment and then assign users or groups to the application." (ms.date 2025-03-25, updated_at 2026-08-27) — [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Verbatim: "Important: Granting tenant-wide admin consent may revoke permissions that have already been granted tenant-wide for that application. Permissions that users have already granted on their own behalf aren't affected." — [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- The admin-consent URL a vendor can also drive directly, verbatim format: "`https://login.microsoftonline.com/{organization}/adminconsent?client_id={client-id}`" — [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)

### Inferences
- After approval the user's next OAuth attempt against the vendor app succeeds without any further prompt (consent now exists tenant-wide). Nothing pushes a signal to the vendor; the vendor learns only when the user (prompted by the approval email, if sent, or by the vendor's own nudge) comes back and completes the OAuth round trip. This is the event that should un-park a "parked awaiting admin consent" record.

### Gaps
- NOT CONFIRMED: no primary sentence describing the user's post-approval retry experience ("the user can now sign in"). The chain is assembled from the approval-grants-consent and consent-allows-all-users quotes above.

## What happens to an expired request — must the user re-initiate?

### Takeaway
Expiry closes the request (status `Expired`), the requester and reviewers are emailed, and the
request drops out of the actionable queue into history. No primary page says in words that the user
must submit a new request, but nothing revives an expired one and re-requesting is explicitly
permitted after a deny, so re-initiation is the only documented path.

### Cited Findings
- Verbatim: "...the last expiration email is sent out almost immediately the consent request expires." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- Requester is told, verbatim: "Requestors receive email notifications when: ... Their request expires." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Expired requests are history, not queue, verbatim: "**My pending**: This tab shows any active requests... **All (Preview)**: This tab shows all requests, active or expired, that exist in the tenant." — [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview); and "The 'My Pending' tab is where actions can be taken on admin consent requests. The 'All (Preview)' tab is to view the history of the admin consent request only." — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- Re-requesting after a deny is allowed, verbatim: "Denying a request won't prevent users from requesting admin consent to the application again in the future." (contrast Block: "Users won't be able to request admin consent to the application in the future.") — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- Status model confirms a terminal `Expired` state distinct from `Completed` — [userConsentRequest resource type](https://learn.microsoft.com/en-us/graph/api/resources/userconsentrequest)

### Inferences
- An expired request is terminal; the user re-triggers the flow by attempting the app again and submitting a fresh request. For TTL sizing: a vendor-side parked record that outlives the tenant's request window is not wasted — the user can always start a new request — but the vendor should treat its parked state as re-enterable rather than one-shot.

### Gaps
- NOT CONFIRMED verbatim: "an expired request must be re-initiated by the user." Assembled from the terminal status + history-only tab + re-request-after-deny quotes.

## Which roles can review/approve admin consent requests?

### Takeaway
Reviewers are admin-designated users, groups, or role-holders, but designation grants no power:
blocking/denying is open to any reviewer, while approving requires the reviewer to independently
hold a role that can grant admin consent for what was requested. For apps requesting Microsoft
Graph application permissions the configure doc says only Global Administrators can approve (the
grant-admin-consent doc's parallel list says Privileged Role Administrator — the two pages differ).

### Cited Findings
- Verbatim: "**Who can review admin consent requests** - Select users, groups, or roles that are designated as reviewers for admin consent requests. Reviewers can view, block, or deny admin consent requests, but only Global Administrators can approve admin consent requests for apps requesting for Microsoft Graph app roles (application permissions)." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- Verbatim: "To approve requests, a reviewer must have the [permissions required] to grant admin consent for the application requested. Simply designating them as a reviewer doesn't elevate their privileges." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- The roles that can grant tenant-wide admin consent, verbatim: "Privileged Role Administrator, for granting consent for apps requesting any permission, for any API. / Cloud Application Administrator, AI Administrator, or Application Administrator, for granting consent for apps requesting any permission for any API, *except* Microsoft Graph app roles (application permissions). / A custom directory role that includes the [permission to grant permissions to applications], for the permissions required by the application." — [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Reviewing in the portal, verbatim: "Sign in to the Microsoft Entra admin center as at least a [Cloud Application Administrator] who is a designated reviewer." — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- Reviewer options beyond approve, verbatim: "**Deny**: ... This action does not provide feedback to the user who made the request. **Block**: This option not only denies the current request but also prevents future requests for the same application... Blocking a request creates a service principal object for the application in your tenant in a disabled state." — [Review and take action on admin consent requests](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/review-admin-consent-requests)
- Configuring the policy via Graph requires, verbatim: least-privileged permission "Policy.ReadWrite.ConsentRequest" and one of the built-in roles "Cloud Application Administrator / Application Administrator" — [Update adminConsentRequestPolicy](https://learn.microsoft.com/en-us/graph/api/adminconsentrequestpolicy-update); reading requests via Graph requires "ConsentRequest.Read.All, ConsentRequest.ReadWrite.All" with least-privileged directory role "Global Reader, Cloud App Administrator, Application Administrator" — [Microsoft Entra consent requests](https://learn.microsoft.com/en-us/graph/api/resources/consentrequests-overview)
- CONTRADICTION between two current primary pages on new-reviewer scope. Configure doc (updated_at 2026-02-19), verbatim: "Any new reviewers aren't able to act on existing or expired admin consent requests." Overview doc (updated_at 2026-06-15), verbatim: "Reviewers can view and act on all pending admin consent requests in the tenant, including requests that were created before they were designated as reviewers. Any request that's still pending remains visible to newly assigned reviewers, so they can review and take action on existing requests based on their assigned permissions." The overview page is the more recently updated of the two — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow); [Overview of admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/admin-consent-workflow-overview)
- Also note the configure-doc note (verbatim) on removed reviewers: "a reviewer retains the ability to review requests that were made while they were designated as a reviewer and will receive expiration reminder emails for those requests after they're removed from the reviewers list." — [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)

### Inferences
- For a receptionist app requesting only delegated Calendar permissions (no Graph application permissions), any designated reviewer holding Cloud Application Administrator, AI Administrator, or Application Administrator can approve — Global Administrator is not needed for our shape of request.
- The Global-Administrator-only claim on the configure page vs Privileged-Role-Administrator on the grant page is a documentation inconsistency affecting only application-permission requests; it doesn't touch the delegated-permission case relevant here.

### Gaps
- The configure-vs-overview contradiction on whether new reviewers can act on pre-existing requests is unresolved between two live pages; and the configure-vs-grant pages disagree on which role approves Graph app-role requests. Both flagged rather than silently resolved.
