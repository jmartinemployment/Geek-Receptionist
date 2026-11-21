# Microsoft Graph calendar API — OAuth2, app registration and consent for a third-party SaaS

Research date: 2026-11-20. Every claim below is from a Microsoft Learn page unless explicitly marked
otherwise. Where a Learn page's own `ms.date` / `updated_at` is old, that is noted, because a stale
page is not the same as a verified current fact.

## Which delegated scopes are needed to list calendars, read free/busy, and create/update events

### Takeaway

For "read the owner's availability and book an appointment on their calendar", the delegated scope
set is **`Calendars.ReadWrite` + `offline_access`** (plus `openid`/`profile` if you want an ID
token). `getSchedule` works on `Calendars.ReadBasic` or higher; `findMeetingTimes` is the odd one
out — it requires the **`.Shared`** variant (`Calendars.Read.Shared` minimum) and is **not supported
for personal Microsoft accounts**.

### Cited Findings

- **List calendars** (`GET /me/calendars`, `GET /users/{id|userPrincipalName}/calendars`,
  `GET /me/calendarGroups/{id}/calendars`): delegated (work or school) least privileged
  `Calendars.ReadBasic`; higher privileged `Calendars.ReadWrite`, `Calendars.Read`,
  `Calendars.Read.Shared`. Delegated (personal Microsoft account): the same list. Application:
  `Calendars.ReadBasic` / `Calendars.Read` / `Calendars.ReadWrite` — [List calendars, Graph v1.0](https://learn.microsoft.com/en-us/graph/api/user-list-calendars?view=graph-rest-1.0)
- **Free/busy via `getSchedule`** (`POST /me/calendar/getSchedule`,
  `POST /users/{id|userPrincipalName}/calendar/getSchedule`): delegated (work or school) least
  privileged `Calendars.ReadBasic`; higher `Calendars.Read`, `Calendars.ReadWrite`. **Delegated
  (personal Microsoft account): "Not supported."** Application: `Calendars.ReadBasic` /
  `Calendars.Read` / `Calendars.ReadWrite` — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- `getSchedule` takes `schedules` (a collection of **SMTP addresses** of users, distribution lists
  or resources), `startTime`, `endTime`, and `availabilityViewInterval` (default 30 min, min 5, max
  1440). It returns a `scheduleInformation` collection per address with an `availabilityView` string
  (0=free/workingElsewhere, 1=tentative, 2=busy, 3=oof), `scheduleItems`, and the mailbox's
  `workingHours` (daysOfWeek, startTime, endTime, timeZone) — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- `getSchedule` fails with error code `5006` ("The result set contains too many calendar entries.
  The allowed size is 1000") when a queried time slot contains more than 1000 entries — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- **`findMeetingTimes`** (`POST /me/findMeetingTimes`, `POST /users/{id|upn}/findMeetingTimes`):
  delegated (work or school) least privileged **`Calendars.Read.Shared`**, higher
  **`Calendars.ReadWrite.Shared`**. Delegated (personal Microsoft account): **"Not supported."**
  Application: **"Not supported."** — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- `findMeetingTimes` defaults: meeting duration 30 minutes if unspecified; `activityDomain` defaults
  to `work` (user's configured work hours, default Mon–Fri 08:00–17:00 in the mailbox time zone);
  `minimumAttendeePercentage` defaults to 50%. Confidence is computed as the average chance of
  attendance (free=100%, unknown=49%, busy=0%). It is also **not available in the China/21Vianet
  national cloud** — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- **Create event** (`POST /me/events`, `POST /users/{id|upn}/events`, `POST /me/calendar/events`,
  `POST /me/calendars/{id}/events`): delegated (work or school) **`Calendars.ReadWrite`**; delegated
  (personal Microsoft account) **`Calendars.ReadWrite`**; application **`Calendars.ReadWrite`**.
  Returns `201 Created` — [Create event](https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0)
- Microsoft's own least-privilege guidance uses exactly this scenario: "Even though getting the
  user's calendar data requires *Calendars.Read*, updating the calendar with scheduled jobs requires
  a higher privileged permission, *Calendars.ReadWrite*. In this case, the app should request
  *Calendars.ReadWrite*." — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- **`offline_access`**: "On the Microsoft identity platform (requests made to the v2.0 endpoint),
  your app must explicitly request the `offline_access` scope, to receive refresh tokens." It
  appears on the consent page as **"Maintain access to data you have given it access to."** The page
  also says "If any delegated permission is granted, offline_access is implicitly granted" — but
  still requires it in the `scope` parameter to actually get a refresh token back — [Scopes and permissions](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)
- Scope strings may omit the resource: "if the resource identifier is omitted in the scope
  parameter, the resource is assumed to be Microsoft Graph. For example, `scope=User.Read` is
  equivalent to `https://graph.microsoft.com/User.Read`" — [Scopes and permissions](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)
- `.default` and dynamic scopes cannot be mixed: "`scope=https://graph.microsoft.com/.default
  Mail.Read` results in an error" — [Scopes and permissions](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)

### Inferences

- The minimal production scope string for a booking SaaS on work/school accounts is
  `offline_access openid profile https://graph.microsoft.com/Calendars.ReadWrite` (or the bare
  `Calendars.ReadWrite`). `Calendars.ReadWrite` is a superset of everything `getSchedule` and the
  list-calendars call need, so no second calendar scope is required.
- `findMeetingTimes` is a *convenience* API, not a required one. Because it forces the `.Shared`
  scope family (a strictly broader grant, worded to the owner as "Read and write user **and shared**
  calendars") and is unsupported on consumer accounts, a vendor is better off computing slots itself
  from `getSchedule` + `workingHours`. That keeps the consent prompt narrower, which matters for a
  self-serve small-business flow.
- `getSchedule` returns the mailbox's configured working hours in the same call as free/busy, so the
  vendor does not need a separate `MailboxSettings.Read` grant to know business hours.

### Gaps

- I did not verify on an official page whether `Calendars.ReadWrite` alone (no `.Shared`) suffices
  to call `getSchedule` against *another* user's SMTP address in the same tenant (e.g. the owner's
  staff). The getSchedule page lists `/users/{id}/calendar/getSchedule` as a valid path but does not
  spell out the cross-mailbox delegated behaviour; Exchange free/busy sharing rules apply underneath.
- The Graph permissions reference page is ~579 KB and the fetch covered only the first 100 KB, so
  permission *IDs* (GUIDs) for the Calendars scopes were not captured.

## Single-tenant vs multi-tenant vs multi-tenant + personal Microsoft accounts

### Takeaway

A SaaS serving many unrelated small businesses needs **`AzureADMultipleOrgs`** ("Multiple Entra ID
tenants"), or **`AzureADandPersonalMicrosoftAccount`** if it must also serve owners whose "Outlook
calendar" is a free Outlook.com/Hotmail/live.com account. Choosing the personal-account variant
halves the permission budget (30 instead of 400) and rules out some Graph surface.

### Cited Findings

- The four **Supported account types** in the registration blade, verbatim:
  - **Single tenant only - \<your tenant\>** — "For *single-tenant* apps for use only by users (or
    guests) in *your* tenant."
  - **Multiple Entra ID tenants** — "For *multitenant* apps when you want users in *any* Microsoft
    Entra tenant to be able to use your application. Ideal for software-as-a-service (SaaS)
    applications that you intend to provide to multiple organizations."
  - **Any Entra ID Tenant + Personal Microsoft accounts** — "For *multitenant* apps that support
    both organizational and personal Microsoft accounts (for example, Skype, Xbox, Live, Hotmail)."
  - **Personal accounts only** — "For apps used only by personal Microsoft accounts."
  — [How to register an app in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- Microsoft's default recommendation on that page is "We recommend **Single tenant only** for most
  applications" — i.e. multi-tenant is a deliberate opt-out of the default — [quickstart-register-app](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- **Permission budget by `signInAudience`** (this is a hard platform limit, not a guideline):

  | signInAudience | Allowed users | Max permissions the app can request | Max consented in a single request |
  |---|---|---|---|
  | `AzureADMyOrg` | Users from the org where the app is registered | 400 | ~155 delegated / ~300 application |
  | `AzureADMultipleOrgs` | Users from any Microsoft Entra organization | 400 | ~155 delegated / ~300 application |
  | `PersonalMicrosoftAccount` | Consumer users (Outlook.com, Live.com) | 30 | 30 |
  | `AzureADandPersonalMicrosoftAccount` | Consumer users **and** users from any Entra org | 30 | 30 |

  — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- **Application (app-only) permissions are not supported for `PersonalMicrosoftAccount`.** The
  supported `signInAudience` values for application permissions are `AzureADMyOrg`,
  `AzureADMultipleOrgs`, `AzureADandPersonalMicrosoftAccount`; delegated permissions support all
  four — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- Publisher verification is explicitly aimed at this app shape: "Publisher verification primarily is
  for developers who build **multitenant apps** that use OAuth 2.0 and OpenID Connect" — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- Apps registered *using a Microsoft account* (rather than an Entra work/school account) **cannot be
  publisher verified**: "Apps that are registered by using a Microsoft account can't be publisher
  verified." — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- "Once created, you can't move the application object between different tenants." — [quickstart-register-app](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

### Inferences

- The authority endpoints follow from the audience: `/common` for
  `AzureADandPersonalMicrosoftAccount`, `/organizations` for `AzureADMultipleOrgs`, `/consumers` for
  `PersonalMicrosoftAccount`, `/{tenantId}` for `AzureADMyOrg`. This mapping is well established but
  I did **not** find it stated on the pages I fetched in this session — treat it as unverified here.
- The 30-permission cap on `AzureADandPersonalMicrosoftAccount` is not a practical constraint for a
  calendar booking app (it needs 3–5 scopes), so supporting consumer accounts costs nothing in
  budget terms. The real cost is functional: no `getSchedule`, no `findMeetingTimes` (see next
  section).
- Because the app registration lives in the vendor's own tenant and cannot be moved, the vendor must
  register in the Entra tenant it intends to keep — and must register from a work/school account if
  it ever wants the verified-publisher badge.

### Gaps

- The Learn page I fetched uses the newer portal labels ("Multiple Entra ID tenants") and does not
  print the underlying `signInAudience` manifest values alongside them. The manifest values are
  confirmed from the permissions-overview table above, not from the registration page.

## Do personal Outlook.com / Hotmail / live.com (MSA) accounts work for calendar?

### Takeaway

Partly. Consumer accounts **can** list calendars and create/update events with
`Calendars.ReadWrite`, but they **cannot** use `getSchedule` or `findMeetingTimes` — the two APIs a
booking product would naturally reach for. Availability on a consumer account must be derived by
reading events directly.

### Cited Findings

- `getSchedule`: delegated personal Microsoft account = **"Not supported."** — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- `findMeetingTimes`: delegated personal Microsoft account = **"Not supported."** — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- List calendars: personal Microsoft account is supported at `Calendars.ReadBasic` and above — [List calendars](https://learn.microsoft.com/en-us/graph/api/user-list-calendars?view=graph-rest-1.0)
- Create event: personal Microsoft account is supported at `Calendars.ReadWrite` — [Create event](https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0)
- Permission-level personal-account support, from the Graph permissions reference (delegated,
  "Admin consent required" / personal-account support):

  | Permission | Delegated display text | Admin consent required | Personal MS accounts |
  |---|---|---|---|
  | `Calendars.ReadBasic` | Read basic details of user calendars | No | Yes |
  | `Calendars.Read` | Read user calendars | No | Yes |
  | `Calendars.Read.Shared` | Read user and shared calendars | No | Yes |
  | `Calendars.ReadWrite` | Have full access to user calendars | No | Yes |
  | `Calendars.ReadWrite.Shared` | Read and write user and shared calendars | No | **not marked as supported** |

  `Calendars.ReadBasic.All` is application-only, display text "Read basic details of calendars in
  all mailboxes", **admin consent required: Yes** — [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- "All delegated permissions are valid for work or school accounts, but **not all are valid for
  personal Microsoft accounts**. Use the Microsoft Graph permissions reference to identify delegated
  permissions that are valid for personal Microsoft accounts." — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- The Graph **known issues** page has only one Calendar entry, and it is not MSA-specific: "An app
  with delegated permissions returns `HTTP 403 Forbidden` when attempting to attach large files to
  an Outlook message or event that is in a shared or delegated mailbox. With delegated permissions,
  createUploadSession succeeds only if the message or event is in the signed-in user's mailbox." —
  [Known issues with Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/known-issues)

### Inferences

- On a consumer account, availability must be computed client-side from
  `GET /me/calendarView?startDateTime=…&endDateTime=…` (or `/me/events`) using `showAs`. That is
  more code, it reads *subjects and bodies* rather than only free/busy, and there is no
  server-provided `workingHours` equivalent — which matters for a zero-data-retention posture,
  because `calendarView` returns meeting content the product does not want to hold.
- The absence of an MSA marker on `Calendars.ReadWrite.Shared` in the permissions reference is
  consistent with `findMeetingTimes` being MSA-unsupported, since that API requires the `.Shared`
  family.
- Practically: a small business whose "Outlook calendar" is a free Outlook.com account is a
  *different integration path* from one on Microsoft 365 Business. A vendor can support both from a
  single `AzureADandPersonalMicrosoftAccount` registration, but needs two availability code paths.

### Gaps

- The permissions reference marks MSA support with an icon; the fetch rendered it as a sentence for
  four of the five Calendars scopes and as nothing for `Calendars.ReadWrite.Shared`. "Not marked" is
  not the same as a documented "Not supported", so that row should be confirmed by reading the live
  page before relying on it.
- No official page found stating whether a consumer Outlook.com mailbox exposes `workingHours` or
  `mailboxSettings` at all.

## Does delegated `Calendars.ReadWrite` need a Global Administrator, or can the owner self-consent?

### Takeaway

**By the permission's own flag, no admin is required** — `Calendars.ReadWrite` is delegated with
"Admin consent required: **No**", so a normal user can consent for their own mailbox. But the
permission flag is only half the answer: the tenant's user-consent policy and risk-based step-up
can still force admin approval, and I could **not** resolve from an official page what the current
default is for a newly created tenant. This is the single biggest unresolved risk for a self-serve
small-business flow.

### Cited Findings

- `Calendars.ReadWrite`, delegated: **Admin consent required = No** (as are
  `Calendars.ReadBasic`, `Calendars.Read`, `Calendars.Read.Shared`, `Calendars.ReadWrite.Shared`) —
  [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- "Before an application can access your organization's data, a user must grant the application
  permissions to do so… **By default, all users are allowed to consent to applications for
  permissions that don't require administrator consent.** For example, by default, a user can
  consent to allow an app to access their mailbox but can't consent to allow an app unfettered
  access to read and write to all files in your organization." — [Configure how users consent to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent) (page `ms.date` 2025-06-15, `updated_at` 2026-08-04)
- Microsoft's own recommendation contradicts that default: "we recommend that you allow user consent
  only for applications that have been published by a **verified publisher**." — [Configure how users consent to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)
- The three built-in choices an admin picks between:
  1. *Disable user consent* — "Users can't grant permissions to applications."
  2. *Users can consent to applications from verified publishers or your organization, but only for
     permissions you select* (policy id **`microsoft-user-default-low`**) — "All users can consent
     only to applications published by a verified publisher and applications that are registered in
     your tenant. Users can consent only to the permissions classified as *low impact*. You must
     classify permissions to select which permissions users are allowed to consent to."
  3. *Users can consent to all applications* (policy id **`microsoft-user-default-legacy`**) — "all
     users to consent to any permission that doesn't require admin consent, for any application."
  — [Overview of user and admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview) and [Configure how users consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)
- The permission-type comparison table carries the warning explicitly: "User consent availability
  also depends on your tenant's app consent policies. **Even when admin consent isn't required for a
  permission by default, your organization's policies may still restrict user consent.**" — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- Separate trap: "Applications that require users to be assigned to the application must have their
  permissions consented by an administrator, **even if the user consent policies for your directory
  would otherwise allow a user to consent** on behalf of themselves." — [Configure how users consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)
- Permission classifications: "Three permission classifications are supported: 'Low,' 'Medium'
  (preview), and 'High' (preview). Currently, **only delegated permissions that don't require admin
  consent can be classified**." The page's worked example classifies `openid`, `profile`, `email`,
  `offline_access` ("the minimum permissions needed to do basic sign-in") and `User.ReadBasic.All`.
  An admin classifies permissions with Application Administrator or Cloud Application Administrator
  — [Configure permission classifications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-permission-classifications)
- **Conflicting evidence on the new-tenant default.** A Microsoft Entra blog post (the "June 2022
  train" change announcements) states that starting **September 30, 2022**, Microsoft would enforce
  that all new tenants "Follow the Latest Microsoft Recommendation" as the new default consent
  setting, and that "End users will no longer be able to grant consent to multi-tenant apps" —
  [Microsoft Entra change announcements — June 2022 train](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/microsoft-entra-change-announcements---june-2022-train/2967455). This is contradicted, or at least not
  reflected, by the current Learn pages, which still say "By default, all users are allowed to
  consent to applications for permissions that don't require administrator consent" and list only
  three built-in options with no "Microsoft managed" one — [Configure how users consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent); [Overview of user and admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview)
- When a user cannot consent, the **admin consent workflow** (if the admin enabled it) shows an
  "Approval required" window where the user types a justification and selects "Request approval";
  designated reviewers are notified and the user is emailed on approve/deny/block. If the workflow
  is *not* enabled, the user just gets an error — [Overview of user and admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview)
- Changing the tenant setting is not retroactive: "Any updates to user consent settings only affect
  future consent operations… Existing consent grants remain unchanged" — [Configure how users consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)
- Configuring user consent requires **Privileged Role Administrator** (and Global Administrator if
  done through the Entra admin center) — [Configure how users consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)

### Inferences

- If a tenant is on `microsoft-user-default-low` (the "verified publishers, selected permissions"
  policy), **being a verified publisher is not sufficient** — `Calendars.ReadWrite` must *also* have
  been classified "low impact" by that tenant's own admin. Nothing in the docs suggests
  `Calendars.ReadWrite` is low-impact by default; the only permissions the classification page
  names are the four sign-in scopes. So on such a tenant the owner cannot self-consent to calendar
  write access no matter what the vendor does.
- Therefore the honest decision-grade statement is: **on a tenant left at "Users can consent to all
  applications", the owner self-consents in a few clicks and no admin is involved; on a tenant moved
  to the verified-publisher/low-impact policy, an admin must act.** A SaaS must build the
  admin-approval path regardless, because it cannot see the tenant's policy before the attempt.
- The failure mode is a specific, catchable error — see `AADSTS90094` in the next section — so the
  product can detect "this tenant needs an admin" at runtime and say so, rather than failing blank.

### Gaps

- **Unresolved and important:** what the default user-consent policy is for a tenant created in,
  say, 2026. The 2022 blog says new tenants follow "the latest Microsoft recommendation"; the
  current Learn pages describe an unrestricted default and never mention a managed/recommended
  option. I could not find a current Learn page stating the new-tenant default, and I am not
  willing to pick one of the two. This should be settled by creating a throwaway M365 trial tenant
  and reading **Entra ID > Enterprise apps > Consent and permissions > User consent settings**, or
  by `GET /v1.0/policies/authorizationPolicy` and reading
  `defaultUserRolePermissions.permissionGrantPoliciesAssigned`.
- No official page found listing a *default* set of low-impact-classified permissions. The
  classification page implies the list starts empty and the admin populates it ("Remember to
  classify permissions to select which permissions users are allowed to consent to"), but does not
  say so outright.

## Publisher verification and risk-based step-up consent

### Takeaway

Risk-based step-up consent is **on by default** and blocks user consent to newly registered
multi-tenant apps that are *not* publisher verified and that ask for more than basic sign-in —
which is exactly this product's shape. Publisher verification is **free**, requires no license, and
is claimed to take minutes once the prerequisites exist, but it requires a verified Microsoft AI
Cloud Partner Program (ex-MPN) account with a Partner One ID. For a SaaS vendor this is effectively
mandatory, not optional.

### Cited Findings

- "Beginning **November 2020**, if risk-based step-up consent is enabled, users **can't consent to
  most newly registered multitenant apps that aren't publisher verified**. The policy applies to
  apps that were **registered after November 8, 2020**, which use OAuth 2.0 to request permissions
  that extend beyond the basic sign-in and read user profile, and which request consent from users
  in tenants that aren't the tenant where the app is registered." — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- "This step-up capability is **enabled by default**, but it results in a behavior change only when
  user consent is enabled." — [Configure risk-based step-up consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-risk-based-step-up-consent)
- The exact error shown to a user when it triggers and no admin consent workflow is configured:
  **"AADSTS90094: \<clientAppDisplayName\> needs permission to access resources in your organization
  that only an admin can grant. Request an admin to grant permission to this app before you can use
  it."** An audit event is logged with category "ApplicationManagement", activity "Consent to
  application", status reason **"Risky application detected"** — [Configure risk-based step-up consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-risk-based-step-up-consent)
- It is controlled by the directory setting **`BlockUserConsentForRiskyApps`** (Boolean) on the
  "Consent Policy Settings" directory settings template
  `dffd5d46-495d-40a9-8e21-954ff55e198a`, changeable only via the Microsoft Graph PowerShell **beta**
  module by a Privileged Role Administrator — [Configure risk-based step-up consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-risk-based-step-up-consent)
- **Publisher verification requirements**, verbatim list:
  - a **Partner One ID** for a valid Microsoft AI Cloud Partner Program (CPP, formerly MPN) account
    that has completed verification, and the CPP account must be the **partner global account
    (PGA)** — "The CPP account you use for publisher verification can't be your partner **location**
    Partner One ID."
  - "The app that's to be publisher verified must be registered by using a Microsoft Entra work or
    school account. Apps that are registered by using a Microsoft account can't be publisher
    verified."
  - the Entra tenant where the app is registered must be associated with the PGA
  - the app must have a **publisher domain** set, and "the app's publisher domain can't be
    \*.onmicrosoft.com to be publisher verified"
  - the email domain used during CPP verification must match the publisher domain or be a
    DNS-verified custom domain on the tenant
  - the person doing it needs **Application Administrator or Cloud Application Administrator** in
    Entra ID **and** CPP Partner Admin or Account Admin in Partner Center
  - they must sign in with **multifactor authentication**
  - the publisher must accept the Microsoft identity platform for developers Terms of Use
  — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- Cost: "**Microsoft doesn't charge developers for publisher verification. No license is required to
  become a verified publisher.**" and "Developers who have already met these requirements can be
  verified in minutes." — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- Benefits: a blue *verified* badge in the Entra consent prompt and on the enterprise apps page, and
  "Smoother enterprise adoption. Organization admins can configure user consent policies that
  include publisher verification status as primary policy criteria." — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- Publisher verification is **not supported in national clouds** — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- Verification is explicitly *not* a quality or compliance signal: "The blue *verified* badge doesn't
  imply or indicate quality criteria… Publisher verification is the first step" toward Microsoft 365
  Publisher Attestation and Microsoft 365 App Certification — [Publisher verification overview](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)

### Inferences

- Against the "can the owner do this themselves in a few clicks, without buying anything" test:
  without publisher verification, **no** — a multi-tenant app registered today asking for
  `Calendars.ReadWrite` is precisely "newly registered multitenant app, not publisher verified,
  permissions beyond basic sign-in, consenting from a foreign tenant", so the owner hits
  AADSTS90094 and has to find an admin. With publisher verification, **yes on a default-policy
  tenant**, and still no on a tenant running the verified-publisher/low-impact policy without a
  classification for `Calendars.ReadWrite`.
- The CPP/Partner One ID prerequisite is the real cost: it is free in money but it is an
  organisational enrolment with its own identity verification, so it should be started early rather
  than discovered at launch.
- A one-person business whose Microsoft 365 tenant has exactly one account *is* a Global
  Administrator, so "needs an admin" is sometimes a non-event. It bites at the 5–20 person end where
  the owner is a licensed user but someone else (or an outsourced IT firm) holds the admin role.

### Gaps

- The publisher verification overview page carries `ms.date: 2024-08-13`. Nothing newer was found
  contradicting it, but the CPP program's own enrolment requirements change and were not checked.
- I did not verify how long CPP/Partner Center verification itself takes for a brand-new partner
  (the "verified in minutes" claim is explicitly about the *publisher verification step*, for
  developers who **already** meet the prerequisites).

## Restrictions on an app creating events on a user's behalf

### Takeaway

Two hard constraints: (1) **invitations are always sent** when an event has attendees and this
"can't be configured"; (2) app-only (application) permission for calendars is tenant-wide by
default, needs a Global Administrator or Privileged Role Administrator, and scoping it to one
mailbox now means Exchange **RBAC for Applications**, which has replaced ApplicationAccessPolicy and
requires PowerShell. For a self-serve SMB product, app-only is the wrong model.

### Cited Findings

- "When you create an event that includes attendees, **the server sends invitations to all
  attendees. This ensures consistency between the organizer's and attendees' views of the event and
  can't be configured.**" — [Create event](https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0)
- "By default, the **allowNewTimeProposals** property is set to true when an event is created, which
  means invitees can propose a different date/time for the event." — [Create event](https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0)
- Delegated access is bounded by the user: "the application can't access anything the signed-in user
  couldn't access… in a delegated scenario, the privileges that an app has to act on behalf of a
  user is determined by the Microsoft Graph permissions that the app has been granted *and* the
  user's own permissions." — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- Application permissions: "The application can access *any* data that the permission is associated
  with… **Only Privileged Role Administrator and Global Administrator can consent to application
  permissions.**" and "From a least-privilege perspective, the delegated permission model is the
  recommended approach whenever it meets the application's requirements." — [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
- **RBAC for Applications in Exchange Online** "extends the current RBAC model in Exchange Online
  and it **replaces Application Access Policies**." Supported application role
  **`Application Calendars.ReadWrite`** (MS Graph, `Calendars.ReadWrite`) — "Allows the app to
  create, read, update, and delete events of all calendars without a signed-in user"; and
  `Application Calendars.Read` for read-only. Scope is a **Management Scope** (recipient filter) or
  an **Administrative Unit** — [RBAC for Applications in Exchange Online](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)
- Who can configure it: "You need to be a member of the **Organization Management** role group…
  In Microsoft Entra ID, you need the **Exchange Administrator** role to assign these permissions."
  Configuration is `New-ServicePrincipal` + `New-ManagementScope` + `New-ManagementRoleAssignment`
  in Exchange Online PowerShell, with `Test-ServicePrincipalAuthorization` to verify — [RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)
- The scoping trap, stated by Microsoft: "the assigned permissions are a **union** operation on the
  permissions from Microsoft Entra ID and the permissions assigned in Exchange Online RBAC… it's
  important that you remove the assignment of `Mail.Read` from Microsoft Entra ID. Otherwise, the
  union of an unscoped grant from Microsoft Entra and a resource-scoped grant in Application RBAC
  results in **no effective resource scoping**." — [RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)
- Other RBAC-for-Applications limits: up to 10,000 applications per organization; permission changes
  are cached "between 30 minutes and 2 hours"; "Exclusive management scopes don't restrict app
  access"; Autodiscover can't be used with RBAC Application roles; supported protocols are MS Graph
  and EWS only — [RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)
- Known delegated restriction on shared/delegated mailboxes: attaching large files to an event in a
  shared or delegated mailbox returns `403 Forbidden`; `createUploadSession` succeeds only for the
  signed-in user's own mailbox — [Known issues](https://learn.microsoft.com/en-us/graph/known-issues)
- Room/equipment resources: an Exchange admin can give a resource a mailbox; the app invites it as
  an attendee with `type: "resource"`, and "the server accepts or rejects the meeting request based
  on the free/busy schedule of the resource" — [Create event](https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0)

### Inferences

- The unconditional invitation send is a **product constraint, not a technical detail**: if the
  receptionist books a caller onto the owner's calendar and puts the caller's email in `attendees`,
  Exchange emails that caller a meeting invite from the owner, with the owner's event subject, and
  the caller can propose a new time. If that is not wanted, the event must be created with **no
  attendees** (caller details in `body`/`subject` only) and the confirmation sent by the product's
  own channel.
- App-only + ApplicationAccessPolicy/RBAC is how a vendor avoids per-user refresh tokens, but it
  costs: Global Admin consent, then an Exchange Administrator running PowerShell to scope it, then
  remembering to *remove* the Entra-level grant or the scoping is void. That is multiple steps, two
  admin roles and a terminal — it fails the "a few clicks, self-serve" test outright.
- Delegated + `offline_access` is the only model where the business owner can complete the
  connection unaided, which is consistent with how Google Calendar integrations are done in this
  codebase's sibling product.

### Gaps

- I did not find an explicit retirement *date* for `New-ApplicationAccessPolicy`. The RBAC page says
  RBAC "replaces Application Access Policies" and gives migration steps, but still documents
  interoperability between the two, so Application Access Policies appear to be superseded rather
  than removed as of the page's 2025-11-25 `ms.date`.
- Nothing was found about Graph-level throttling limits for calendar writes; that was out of scope
  but will matter for a booking product.

## Refresh token lifetime, rotation and revocation

### Takeaway

**90 days** for a confidential-client web app, **24 hours** if the redirect URI is registered as
`spa`. Tokens are rotated on every use, and the old one is *not* auto-revoked, so the app must
delete it itself. For a confidential client, an end-user password change does **not** kill the
token; an admin password reset from the Entra or M365 admin center, or an explicit revoke, does.

### Cited Findings

- Default refresh token lifetimes: "**24 hours** for single-page applications. **24 hours** for apps
  that use email one-time passcode authentication flow. **90 days for** all other scenarios." —
  [Refresh tokens in the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens) (`ms.date` 2025-11-05)
- "Refresh tokens **replace themselves with a fresh token upon every use**. The Microsoft identity
  platform **doesn't revoke old refresh tokens** when used to fetch new access tokens. Securely
  delete the old refresh token after acquiring a new one." — [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- "Refresh tokens sent to a redirect URI registered as `spa` expire after 24 hours. Additional
  refresh tokens acquired using the initial refresh token **carry over that expiration time**, so
  apps must be prepared to rerun the authorization code flow using an interactive authentication to
  get a new refresh token every 24 hours." This is due to browser third-party-cookie restrictions —
  [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- "Refresh tokens are bound to a combination of user and client, but **aren't tied to a resource or
  tenant**. A client can use a refresh token to acquire access tokens across any combination of
  resource and tenant where it has permission to do so." — [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- **Revocation table — confidential client token column** (the relevant one for a server-side SaaS):
  password expires → **stays alive**; password changed by user → **stays alive**; user does SSPR →
  **stays alive**; admin resets password (Azure portal) → **stays alive**; admin resets password
  (**Microsoft Entra admin center**) → **revoked**; admin resets password (**M365 admin center**) →
  **revoked**; user revokes their refresh tokens → **revoked**; **admin revokes all refresh tokens
  for a user** → **revoked**; single sign-out → **stays alive** — [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- "they can be revoked by the sign-in service at any time before their expiration. Your app should
  handle such revocations gracefully by redirecting the user to an interactive sign-in prompt" —
  [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- "Refresh tokens are **not revoked for B2B users in their resource tenant**. The token needs to be
  revoked in the home tenant." — [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- Corroborating figure on the scopes page: "The refresh token has a longer expiry than the access
  token and is **typically valid for 90 days**"; access token "valid for around one hour" — [Scopes and permissions](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)

### Inferences

- A server-side (confidential client) integration that refreshes at least once every 90 days keeps
  working indefinitely without the owner touching it — the rolling 90-day window resets on each use.
  A business that goes quiet for three months loses the connection and must reconnect.
- Because the platform does not invalidate the old refresh token on use, a naive implementation that
  stores both old and new, or that retries a failed refresh with the old token, can end up with two
  live chains — and conversely, a crash between "receive new token" and "persist new token" strands
  the connection. Persist the new token before using the new access token.
- The `spa` 24-hour rule is a reason to run this flow **server-side** and never register the booking
  redirect URI as a SPA: a 24-hour expiry with mandatory interactive re-auth is unusable for
  unattended booking.
- The revocation table's inconsistency (Azure portal reset = alive, Entra/M365 admin center reset =
  revoked) means the product must treat `invalid_grant` on refresh as an expected, recoverable state
  and prompt the owner to reconnect — not as an error to retry.

### Gaps

- The page does not state how Conditional Access policy evaluation or a sign-in risk event affects
  an already-issued refresh token; the revocation table covers only credential and admin actions.
- Nothing found on whether consumer (MSA) refresh tokens follow the same 90-day rule; the page does
  not break the table down by account type, only by client/token class.
