# Microsoft Entra `/adminconsent` endpoint contract (multi-tenant SaaS)

Research date: 2026-11-21. All quotes are verbatim from Microsoft Learn pages fetched today; each page's
`ms.date` (authored) and `updated_at` (site metadata) are noted where available. Primary pages:

- v2 protocol reference: https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent (ms.date 2023-11-08, updated_at 2026-06-15)
- Developer consent guide: https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer (ms.date 2025-05-21, updated_at 2026-11-10)
- Auth code flow: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow (ms.date 2026-01-09, updated_at 2026-06-15)
- Tenant-wide admin consent how-to: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent (ms.date 2025-03-25, updated_at 2026-08-27)
- Scopes/.default: https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc (ms.date 2025-07-24, updated_at 2026-09-30)
- Consent experience: https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience (ms.date 2025-02-27, updated_at 2026-06-15)
- Permissions/consent overview: https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview (ms.date 2025-03-18, updated_at 2026-06-25)
- Graph app-only walkthrough (v1 /adminconsent): https://learn.microsoft.com/en-us/graph/auth-v2-service (ms.date 2025-08-29)
- Consent error troubleshooting: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-sign-in-unexpected-user-consent-error (ms.date 2025-02-27, updated_at 2026-06-15)

**Bottom line for the consuming design:** the gate-clearer model is CONFIRMED. The documented
success redirect carries only `admin_consent`, `tenant`, `scope`, `state` — no authorization code, no
access token, no refresh token for anyone. Microsoft's developer guide says that after the success
redirect "your application is granted the permissions it requested. Next, you can request a token for
the resource you want" — and the token request it then shows is an ordinary `grant_type=authorization_code`
exchange, which presupposes a normal `/authorize` sign-in. Tenant-wide consent is a recorded grant
(an `oauth2PermissionGrant` with `consentType: AllPrincipals` for delegated permissions); delegated
tokens are still minted only by a user completing the authorization-code flow afterwards.

## Key question 1: The request — URL shape and parameters (v2 vs v1, state round-trip)

### Takeaway
The v2 endpoint is `https://login.microsoftonline.com/{tenant}/v2.0/adminconsent` with required
`client_id`, `redirect_uri`, `scope` and recommended `state`; the v1 endpoint
`https://login.microsoftonline.com/{tenant}/adminconsent` takes no `scope` (it consents to everything
statically registered). `state` is explicitly round-tripped on both. The v2 doc says use a tenant ID or
`organizations`, never `common`.

### Cited Findings
- Documented v2 URL template, verbatim from the protocol reference:
  ```
  https://login.microsoftonline.com/{tenant}/v2.0/adminconsent
          ?client_id=00001111-aaaa-2222-bbbb-3333cccc4444
          &scope=https://graph.microsoft.com/Calendars.Read https://graph.microsoft.com/Mail.Send
          &redirect_uri=http://localhost/myapp/permissions
          &state=12345
  ```
  — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- v2 parameter table, verbatim (Parameter / Condition / Description):
  - `tenant` — Required — "The directory tenant that you want to request permission from. Can be provided in GUID or friendly name format OR generically referenced with `organizations` as seen in the example. Do not use 'common', as personal accounts cannot provide admin consent except in the context of a tenant. To ensure best compatibility with personal accounts that manage tenants, use the tenant ID when possible."
  - `client_id` — Required — "The **Application (client) ID** that the Microsoft Entra admin center – App registrations experience assigned to your app."
  - `redirect_uri` — Required — "The redirect URI where you want the response to be sent for your app to handle. It must exactly match one of the redirect URIs that you registered in the app registration portal."
  - `state` — Recommended — "A value included in the request that will also be returned in the token response. It can be a string of any content you want. Use the state to encode information about the user's state in the app before the authentication request occurred, such as the page or view they were on."
  - `scope` — Required — "Defines the set of permissions being requested by the application. This can be either static (using `/.default`) or dynamic scopes. This can include the OIDC scopes (`openid`, `profile`, `email`)."
  — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- `/.default` semantics on this endpoint, verbatim: "If you've used a static (`/.default`) value, it will function like the v1.0 admin consent endpoint and request consent for all scopes found in the required permissions (both user and app). In order to request app permissions, you must use the `/.default` value." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- The v1 endpoint (no `v2.0/` segment, no `scope` parameter), verbatim from the Graph app-only walkthrough:
  ```
  GET https://login.microsoftonline.com/{tenant}/adminconsent
  ?client_id=6731de76-14a6-49ae-97bc-6eba6914391e
  &state=12345
  &redirect_uri=https://localhost/myapp/permissions
  ```
  with `tenant` "Required — The tenant that you want to request permission from. The value can be in GUID or a friendly name format. If you don't know which tenant the user belongs to and you want to let them sign in with any tenant, use `common`." — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service)
- The enterprise-apps how-to shows the same v1 shape as the one admins build by hand: "The tenant-wide admin consent URL follows the following format: `https://login.microsoftonline.com/{organization}/adminconsent?client_id={client-id}`" where "`{organization}` is the tenant ID or any verified domain name of the tenant you want to consent the application in. You can use the value `organizations` that causes the consent to happen in the home tenant of the user you sign in with." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Admin consent requires the static permission list to be registered: "Admin consent done on behalf of an organization requires the static permissions registered for the app. Set those permissions in the Microsoft Entra app registration portal if you need an admin to give consent on behalf of the entire organization." — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer); likewise "application developers must list all permissions in the `RequiredResourceAccess` property in the application manifest" for the admin consent flow to work properly — [application-consent-experience](https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience)

### Inferences
- `state` round-tripping is contractual on both versions (it appears in both request and response tables), so an unauthenticated callback can carry its own signed correlation value in `state` — the same pattern the portal uses for `rp_gates`.
- The v1 page's advice to use `common` conflicts with the v2 page's "Do not use 'common'"; for the v2 endpoint the v2 page is authoritative. For a SaaS signup where the signed-in owner's `tid` is already known, passing the tenant GUID is the documented best-compatibility choice.

### Gaps
- No Microsoft page states a documented maximum length or format constraint for `state` on this endpoint.

## Key question 2: The success redirect — exact query parameters

### Takeaway
Success is a GET redirect to `redirect_uri` with exactly `admin_consent=True`, `tenant` (GUID),
`scope` (v2 only), and `state`. No code, no token. Microsoft explicitly warns never to trust the
returned `tenant` value for authentication or authorization — directly relevant to an unauthenticated
callback route.

### Cited Findings
- v2 success example, verbatim:
  ```
  http://localhost/myapp/permissions
      ?admin_consent=True
      &tenant=aaaabbbb-0000-cccc-1111-dddd2222eeee
      &scope=https://graph.microsoft.com/Calendars.Read https://graph.microsoft.com/Mail.Send
      &state=12345
  ```
  — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- v2 success parameter table, verbatim: `tenant` — "The directory tenant that granted your application the permissions it requested, in GUID format."; `state` — "A value included in the request that also will be returned in the token response. … The state is used to encode information about the user's state in the app before the authentication request occurred, such as the page or view they were on."; `scope` — "The set of permissions that were granted access to, for the application."; `admin_consent` — "Will be set to `True`." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- The warning attached to that table, verbatim: "Never use the **tenant ID** value of the `tenant` parameter to authenticate or authorize users. The tenant ID value can be updated and sent by bad actors to impersonate a response to your app. This can cause your application to be exposed to security incidents." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- v1 success example (no `scope`), verbatim: `https://localhost/myapp/permissions?admin_consent=True&tenant=38d49456-54d4-455d-a8d6-c383c71e0a6d&state=12345#` — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service); same shape in the developer guide: `GET http://localhost/myapp/permissions?tenant=aaaabbbb-0000-cccc-1111-dddd2222eeee&state=state=12345&admin_consent=True` — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)

### Inferences
- Because the callback is unauthenticated and the `tenant` parameter is explicitly declared forgeable, the callback may use `tenant` only as a hint (e.g., to look up a pending onboarding record via signed `state`); the authoritative record of consent should come from the owner's subsequent authenticated sign-in (the `tid` claim of a validated token) or a Graph query of `oauth2PermissionGrants` — not from the redirect.
- `admin_consent=True` alone is not proof of success: see Key question 3 — Microsoft's own error example also carries `admin_consent=True`. The callback must branch on the presence of `error` first.

### Gaps
- Casing: both docs show `True` (capital T). No doc states whether the value can ever be lowercase; treat the comparison case-insensitively. NOT CONFIRMED either way.

## Key question 3: The failure redirect — error / error_description / error_subcode

### Takeaway
The v2 reference documents `error`, `error_description`, `state`, and — notably — `admin_consent=True`
on the error redirect too; its example error is `error=consent_required` with an AADSTS65004
description. The developer guide shows a second shape: `error=permission_denied&error_description=The+admin+canceled+the+request`.
`error_subcode=cancel` is NOT documented in any Microsoft Learn protocol reference; it shows up in
real redirects (Microsoft Q&A) alongside `error=access_denied` and AADSTS65004, produced by the admin
consent *workflow* (user clicking "Back to app" after submitting an approval request), a flow whose
AADSTS65004 behavior Microsoft does document — without naming the `error_subcode` parameter.

### Cited Findings
- v2 error example, verbatim (note `admin_consent=True` present even on error):
  ```
  http://localhost/myapp/permissions
          ?admin_consent=True
          &error=consent_required
          &error_description=AADSTS65004%3a+The+resource+owner+or+authorization+server+denied+the+request.%0d%0aTrace+ID%3a+...%0d%0aCorrelation+ID%3a+...%0d%0aTimestamp%3a+2019-09-24+18%3a34%3a26Z
          &state=12345
  ```
  — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- v2 error parameter table, verbatim: `error` — "An error code string that can be used to classify types of errors that occur, and can be used to react to errors."; `error_description` — "A specific error message that can help a developer identify the root cause of an error."; `state` — (round-tripped, same text as success); `admin_consent` — "Will be set to `True` to indicate that this response occurred on an admin consent flow." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- Developer guide decline example, verbatim: "If the admin doesn't approve the permissions for your app, the failed response looks like this: `GET http://localhost/myapp/permissions?error=permission_denied&error_description=The+admin+canceled+the+request`" — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)
- AADSTS65004 is officially documented as an expected consent-workflow error delivered to the redirect URI: "**AADSTS65004**: User declined to consent to access the app. This error occurs during the admin consent workflow. After a user submits an admin consent approval for an application, another dialog appears with a **Back to app** button. When the user selects the button, Microsoft Entra ID sends an AADSTS65004 error to the redirect URI specified in the original authentication request. This error is an expected part of the admin consent workflow. After the administrator review, and after the user approves the submitted admin consent, the user needs to begin a new authentication process with the application." — [application-sign-in-unexpected-user-consent-error](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-sign-in-unexpected-user-consent-error)
- Observed (community-reported, not official docs) redirect containing `error_subcode=cancel`, verbatim from a Microsoft Q&A thread: `https://my-app.com/oauth/authorized?error=access_denied&error_subcode=cancel&state={state}d&error_description=AADSTS65004%3a+User+declined+to+consent+to+access+the+app` — [Microsoft Q&A: How to handle "Admin Consent" in oauth flow?](https://learn.microsoft.com/en-us/answers/questions/2237594/how-to-handle-admin-consent-in-oauth-flow)
- Related documented consent errors a tenant user can hit before/around admin consent, verbatim: "**AADSTS90093**: `clientAppDisplayName` is requesting one or more permissions that you aren't authorized to grant. Contact an administrator…"; "**AADSTS90094**: `clientAppDisplayName` needs permission to access resources in your organization that only an admin can grant. Ask an admin to grant permission to this app before you can use it."; "**AADSTS900941**: Administrator consent is required. App is considered risky. (AdminConsentRequiredDueToRiskyApp)" — [application-sign-in-unexpected-user-consent-error](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-sign-in-unexpected-user-consent-error)
- On the ordinary `/authorize` endpoint the documented decline error is `access_denied` — "Resource owner denied consent. The client application can notify the user that it can't continue unless the user consents." — [v2-oauth2-auth-code-flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)

### Inferences
- The error vocabulary across the three documented/observed shapes is not consistent (`consent_required`, `permission_denied`, `access_denied`), so the callback should treat any request with a non-empty `error` as failure, log `error` + `error_description` + `error_subcode` if present, and show one fixed operator-facing message — never branch on an exhaustive error enum Microsoft does not publish.
- `error_subcode=cancel` should be handled as an optional extra parameter, not relied upon: it is real traffic but undocumented, so its presence/value can change without notice.

### Gaps
- "Microsoft documents error_subcode=cancel somewhere": NOT CONFIRMED. Two web searches (one restricted to learn.microsoft.com) found no official protocol page naming `error_subcode`; it appears only in Microsoft Q&A threads and third-party posts. If a plan asserts it is documented, that assertion should be corrected.
- No official page enumerates the complete set of possible `error` values on the admin consent redirect.

## Key question 4: Does /adminconsent issue any token? What exactly is granted?

### Takeaway
Confirmed: the endpoint records consent and issues no token or code to anyone. Microsoft's developer
guide states that after the success redirect the app is "granted the permissions it requested" and the
*next* step is to "request a token"; the token request shown is an ordinary authorization-code
exchange. The Graph walkthrough makes the same split structurally (Step 2: admin consent → Step 3:
request an access token). What is recorded is a tenant-wide grant: for delegated permissions an
`oauth2PermissionGrant` with `consentType: AllPrincipals`; for application permissions an
`appRoleAssignment`.

### Cited Findings
- "After you receive a successful response from the admin consent endpoint, your application is granted the permissions it requested. Next, you can request a token for the resource you want." — immediately followed by a `POST …/oauth2/v2.0/token` example with `"grant_type": "authorization_code"` and a `code` parameter — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)
- The Graph app-only walkthrough is explicitly sequenced, verbatim: "1. Configure Microsoft Graph application permissions on the app. 2. Request administrator consent. 3. Request an access token. 4. Call Microsoft Graph by using the access token." and, after consent: "Once Microsoft Entra ID records the administrator consent, the app can request tokens without having to request consent again." — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service)
- What tenant-wide admin consent is, verbatim: "When you grant tenant-wide admin consent to an application, you give the application access to the permissions requested on behalf of the whole organization." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- The durable artifact of consent, verbatim from the comparison table: "Result of consent (specific to Microsoft Graph): [OAuth2PermissionGrant] (delegated) / [appRoleAssignment] (application)" — [permissions-consent-overview](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview); and the programmatic equivalent grants delegated consent with "`ConsentType` = `AllPrincipals`, indicating that you're consenting on behalf of all users in the tenant" — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Delegated access still requires the user leg, verbatim: "Delegated access requires delegated permissions. Both the client and the user must be authorized separately to make the request." — [permissions-consent-overview](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview)
- A Microsoft-badged Q&A answer (community-grade, consistent with the docs): "After obtaining administrator consent, when the user logs in to the application using the **`/authorize`** endpoint, there will no longer be a pop-up window 'Administrator approval required', but an authorization code will be returned directly in the browser address bar. Next, you can use the authorization code to redeem an access token." — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/2237594/how-to-handle-admin-consent-in-oauth-flow)
- Admin consent survives permission-list changes only until the list changes, verbatim: "When you change the configured permissions, you must also repeat the admin consent process. Changes made in the app registration portal aren't reflected until an authorized administrator such as a privileged role administrator reconsents to the app." — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service)
- Caveat on re-granting, verbatim: "Granting tenant-wide admin consent may revoke permissions that have already been granted tenant-wide for that application. Permissions that users have already granted on their own behalf aren't affected." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)

### Inferences
- The documented response parameter tables (Key question 2) contain no `code`, `access_token`, `refresh_token` or `id_token`, which together with the "Next, you can request a token" passage confirms the endpoint is purely a consent recorder. The gate-clearer design — record the gate cleared, then run the ordinary authorization-code flow for the signed-in owner to mint delegated tokens — matches the documentation exactly.
- No single sentence in current docs reads "the admin consent endpoint does not return tokens"; the confirmation is by the documented response shape plus the documented next step. That is strong but compositional — worth stating in the plan as such rather than as a quoted prohibition.

### Gaps
- None material. (The explicit-negative sentence noted above does not exist in current docs; marked here so nobody quotes one.)

## Key question 5: redirect_uri — registration and validation differences vs /authorize

### Takeaway
The v2 admin consent endpoint requires an exact match with a registered redirect URI — the same rule
as `/authorize`. The only divergence found is on the v1 page, which says the URI "can have additional
path segments." No doc describes any other validation difference.

### Cited Findings
- v2 adminconsent, verbatim: "The redirect URI where you want the response to be sent for your app to handle. It must exactly match one of the redirect URIs that you registered in the app registration portal." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- /authorize, verbatim: "The `redirect_uri` of your app, where authentication responses can be sent and received by your app. It must exactly match one of the redirect URIs you registered in the Microsoft Entra admin center, except it must be URL-encoded." — [v2-oauth2-auth-code-flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
- v1 adminconsent (Graph walkthrough), verbatim: "It must match one of the redirect URIs that you registered in the portal. It must be URL encoded and it can have additional path segments." — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service); the same walkthrough's prerequisites also list "A redirect URI for the service to receive admin consent responses *if* the app implements functionality to request administrator consent." — i.e., the consent callback can be its own registered URI, separate from the token-response URI.
- The response arrives as a browser GET redirect in every documented example (query parameters on the redirect URI); no `response_mode` parameter is documented for this endpoint. — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)

### Inferences
- Registering a dedicated `/adminconsent`-callback route as one of the app's redirect URIs (distinct from the OAuth sign-in callback) is explicitly anticipated by Microsoft's own prerequisites, and keeps the unauthenticated gate-clearing handler separate from the code-bearing handler.

### Gaps
- Whether the v2 endpoint also tolerates "additional path segments" (the v1 page's wording) is NOT CONFIRMED; the v2 page says "exactly match." Build to the stricter v2 rule.
- No doc states whether a `spa`-typed redirect URI is acceptable for /adminconsent; untested and NOT CONFIRMED. Use a `web` redirect URI.

## Key question 6: Unknown tenant (common/organizations) and which admin roles can consent

### Takeaway
When the tenant is unknown, use `organizations` (v2) — `common` is explicitly ruled out on v2 because
personal accounts cannot grant admin consent; the sign-in itself resolves the tenant. The roles that
can grant tenant-wide consent are Privileged Role Administrator (anything), and Cloud Application
Administrator / AI Administrator / Application Administrator (anything except Microsoft Graph
application permissions), plus suitable custom roles. The protocol page itself only says "a tenant
administrator" must sign in; Entra enforces the authorization server-side.

### Cited Findings
- v2 tenant guidance, verbatim: "Can be provided in GUID or friendly name format OR generically referenced with `organizations` as seen in the example. Do not use 'common', as personal accounts cannot provide admin consent except in the context of a tenant. To ensure best compatibility with personal accounts that manage tenants, use the tenant ID when possible." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent)
- "`{organization}` is the tenant ID or any verified domain name of the tenant you want to consent the application in. You can use the value `organizations` that causes the consent to happen in the home tenant of the user you sign in with." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Enforcement at sign-in, verbatim: "At this point, Microsoft Entra ID requires a tenant administrator to sign in to complete the request. The administrator is asked to approve all the permissions that you have requested in the `scope` parameter." — [v2-admin-consent](https://learn.microsoft.com/en-us/entra/identity-platform/v2-admin-consent); and "With requests to the `/adminconsent` endpoint, Microsoft Entra ID enforces that only an authorized administrator can sign in to complete the request." — [auth-v2-service](https://learn.microsoft.com/en-us/graph/auth-v2-service)
- Role prerequisites, verbatim: "To grant tenant-wide admin consent, you need: A Microsoft Entra user account with one of the following roles: Privileged Role Administrator, for granting consent for apps requesting any permission, for any API. Cloud Application Administrator, AI Administrator, or Application Administrator, for granting consent for apps requesting any permission for any API, *except* Microsoft Graph app roles (application permissions). A custom directory role that includes the permission to grant permissions to applications, for the permissions required by the application." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- The in-prompt "consent on behalf of your organization" checkbox (on an ordinary /authorize consent prompt, not /adminconsent) is narrower, verbatim: "The check box only shows for at least the Privileged Role Administrator role, so Cloud Admin and App Admin don't see this checkbox." — [application-consent-experience](https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience)
- Multi-tenant apps specifically, verbatim: "In case the application requesting the permission is a multitenant application, its application registration only exists in the tenant where it was created, therefore permissions can't be configured in the local tenant. If the application requests permissions that require admin consent, the administrator needs to consent on behalf of the users. To consent to these permissions, the administrators need to sign in to the application themselves, so the admin consent sign-in experience is triggered." — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)
- Side effect of tenant-wide consent, verbatim: "By default, granting tenant-wide admin consent to an application allows all users to access the application unless otherwise restricted." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)

### Inferences
- "Global Administrator" does not appear in the current prerequisites list (the list leads with Privileged Role Administrator). Older guidance and the auth-code-flow page still say to request admin-restricted scopes "directly from a Global Administrator"; a Global Administrator can activate/hold these rights in practice, but the roles the current how-to names are the ones above. A plan should name the documented roles, not just "Global Admin."
- For the receptionist flow, where the owner signs in first and `tid` is known, the request should use the tenant GUID (the documented best-compatibility option), with `organizations` as the only documented fallback when the tenant is unknown.

### Gaps
- No doc states explicitly whether Global Administrator by itself (without Privileged Role Administrator) sees the /adminconsent approval for Graph app roles under current role definitions; the how-to simply omits the role. NOT CONFIRMED either way — but this product needs delegated Calendars scopes, which the Cloud/App Administrator tier covers.

## Key question 7: After tenant-wide consent — is user consent skipped? Does prompt=consent re-prompt?

### Takeaway
Yes, consent is skipped: once the tenant-wide grant exists, users signing in through the ordinary
`/authorize` flow get no consent prompt unless consent is revoked or new permissions are requested.
And yes, `prompt=consent` is documented to force the consent dialog even when consent already exists —
so the post-consent authorization leg must NOT send `prompt=consent`.

### Cited Findings
- "Once an admin grants consent for the entire tenant, users aren't prompted again unless consent is revoked or new permissions are added." — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)
- "All users in that tenant don't see the consent dialog unless the application requires new permissions." — [application-consent-experience](https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience)
- The page's stated purpose, verbatim from its description: "Learn how to grant tenant-wide consent to an application so that end-users aren't prompted for consent when signing in to an application." — [grant-admin-consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent)
- Sign-in consent check, verbatim: "After sign-in, the Microsoft identity platform checks for existing user consent. If the user doesn't approve the requested permissions and an administrator doesn't approve them either, the platform prompts the user to grant consent." — [consent-types-developer](https://learn.microsoft.com/en-us/entra/identity-platform/consent-types-developer)
- `.default` behavior with existing consent, verbatim: "In this example, the user or a tenant administrator has granted the `Mail.Read` and `User.Read` Microsoft Graph permissions to the client. If the client requests `scope=https://graph.microsoft.com/.default`, no consent prompt is shown, regardless of the contents of the client application's registered permissions for Microsoft Graph. The returned token contains the scopes `Mail.Read` and `User.Read`." — [scopes-oidc](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc)
- `prompt=consent` forces a re-prompt even when consent exists, verbatim: "If consent exists, the returned token contains all scopes granted for that resource for the signed-in user. However, if no permission was granted for the requested resource (or if the `prompt=consent` parameter is provided), a consent prompt is shown for all required permissions configured on the client application registration, for all APIs in the list." — [scopes-oidc](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc); and the parameter definition: "`prompt=consent` triggers the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app." — [v2-oauth2-auth-code-flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
- Community confirmation of the trap, from the Q&A thread: the poster fixed their post-approval loop with "Looks like I just remove `prompt=consent` in my redirect to login with Microsoft. Since the user and the admin already gave consent." — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/2237594/how-to-handle-admin-consent-in-oauth-flow)

### Inferences
- The post-gate authorization-code request for the owner should omit `prompt` entirely (default behavior signs in and skips consent when the tenant-wide grant covers the requested scopes), request `offline_access` to receive the refresh token, and may use `/.default` or the specific scopes — both are documented to skip the prompt once the grant exists.
- A user whose in-flight admin-consent-workflow request later gets approved must start a new sign-in ("the user needs to begin a new authentication process with the application") — the callback cannot resume the original attempt.

### Gaps
- Whether `prompt=consent` on `/authorize` would show the plain user consent dialog or the admin-restricted error to a non-admin user in a tenant that already has tenant-wide consent is not spelled out; the docs only say the dialog is "shown for all required permissions." Not needed for the design (the flag is simply not sent).
