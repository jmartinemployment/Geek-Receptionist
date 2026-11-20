# Plan: client settings live on the tenant, not in the environment

## Context

Geek-Receptionist is a multi-tenant AI phone receptionist. One business's settings had been living as Railway
environment variables on the GeekAPI service — `COMPANY_NAME`, `OWNER_CELL`, `TWILIO_NUMBER`, `CALL_MODE` — read into
a process-wide singleton (`ReceptionistOptions`) that cannot hold a second business at all. Jeff, 2026-11-20:
*"PLATFORM CREDENTIALS ARE ACCEPTABLE, NOT USER/CLIENT SETTINGS AND I AM A CLIENT/USER!"* Those four were deleted from
Railway, along with `GOOGLE_CALENDAR_ID`, which no C# read.

Deleting the variables did not finish the job. The **code** still reads those names, so the configuration path still
exists and can be refilled; and the sixteen per-business settings the product does have (`VoiceReceptionistConfig`)
are written once by `ReceptionistDefaults.ConfigFor` and, for fourteen of them, can never be changed by anyone,
because no route writes them. The product asks a business nothing about how its receptionist behaves.

This plan closes both halves: the environment stops being a place client settings can live, and the onboarding form
becomes the place they do live. Jeff, 2026-11-20: *"Any and/or every setting needs to be included in the onboarding
multi-step form. The application may have preset defaults, but I am not comfortable making decisions on behalf of
others."*

**Status, 2026-11-20 (afternoon).** B has started: `ReceptionistConfigAnswers.cs` and `ReceptionistConfigStep.cs` exist
in GeekBackend, untracked. No route, no B2, no tests, nothing else begun. The sections below were re-read against the code
after the external review's full thread, and eight places where the plan was wrong or silent are now recorded in place,
each with the file that shows it.

**Explicitly not a goal:** keeping the company line 561-865-6990 answering during this work. Jeff, 2026-11-20:
*"I DO NOT CARE WHETHER AN UNPUBLISHED NUMBER GOES UNANSWERED DURING DEVELOPMENT."* No step is ordered around
protecting it, and no temporary restoration of the deleted variables is proposed.

## Approach

Four pieces. A and D delete; B and C build. None of them depends on keeping a number alive.

### A. Delete the environment configuration path

`ReceptionistOptions` is the only thing in the product that reads a business's settings from the environment. It and
the services built on it go:

* `GeekAPI/Services/Receptionist/ReceptionistOptions.cs` — the record itself. It reads **eleven** client variables,
  not the four that were deleted: also `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_API_KEY_SID`,
  `TWILIO_API_KEY_SECRET` (one business's Twilio account — the platform's parent account is the separate
  `TWILIO_MASTER_*` pair in `TwilioOptions.cs:20-21`), plus `RING_SECONDS`, `SCREEN_CALLS` and
  `VALIDATE_TWILIO_SIGNATURE`
* `ReceptionistEndpoints.cs` — `/api/receptionist/twilio/*`, registration and the `ReceptionistStatus` gate
* `TwilioSignatureFilter.cs`, `Sms.cs`, `InboundSms.cs`, `MissedCallService` — the company line's behaviour
* the two registration sites in `GeekAPI/Program.cs`: `AddReceptionist(builder.Configuration)` at `:238` and
  `app.MapReceptionist()` at `:438`. (`:236` is the comment above the first, and the method is `MapReceptionist`, not
  `MapReceptionistEndpoints` — this plan named both wrongly before.)
* `GeekBackend.Tests/Receptionist/VoiceWebhookTests.cs` and `ConsentAndRelayTests.cs` (the latter names `CALL_MODE` twice)
* the prose: `docs/Geek-Receptionist.md` carries all twelve variable names, `Architecture.md` carries
  `TWILIO_ACCOUNT_SID`, and `OnboardingController.cs`'s doc comment carries `BILLING_EXEMPT_EMAIL`. A surviving name is
  read as a live claim, so these come out with the code rather than after it.

**No dead startup binding is left behind.** Checked, because the review asked: there is no `ValidateOnStart`, no
`IValidateOptions`, no `AddOptions` binding and no health check or hosted service on any of these types.
`ReceptionistOptions.FromConfiguration` throws, `AddReceptionist` catches and registers `ReceptionistStatus(false, ...)`,
and `MapReceptionist` is the only reader of that status. Removing the two `Program.cs` lines removes the whole path.

**Not deleted:** `GeekAPI/Services/Receptionist/Relay/*` (`ReceptionistRelaySession`, `LlmReceptionistModel`,
`RelayTickets`, `ReceptionistConsent`), registered separately by `AddReceptionistRelay()` (`Program.cs:240`). These
live in the same folder but are the tenant path's conversation engine, used by `TenantCallController`. The deletion
is surgical, not by directory.

**Moved, not deleted — the tenant path calls into the file being removed.** `ReceptionistEndpoints.cs` holds three
static helpers `TenantCallController` uses (`Unanswered`/`UnansweredText` at `:235,:243`, `HandshakeUrl` at `:298`;
called from `TenantCallController.cs:100,129,174,210`), and its `RoutePrefix` constant is what
`ApiKeyMiddleware.cs:45` exempts from `X-API-Key`. The helpers move to a small static class beside
`TenantCallController` (e.g. `GeekAPI/Services/Voice/Calls/CallTwiml.cs`); the middleware exemption for the old
prefix is removed with the routes it exempted. `Relay/ReceptionistConsent.cs:186-199` `CompanyConfig` and the
`CompanyStateCode = "FL"` / `CompanyIndustry` constants exist only for the company line and are deleted with it.

**What is genuinely lost:** missed-call text-back and inbound SMS, and `CallMode.Dial` (ring a human first, with
keypad screening). The tenant path never rings a human and has no SMS at all — activation hard-codes
`smsEnabled: false` and refuses `EnableSmsNotifications: true` (`SubscriptionActivation.cs:75-76`). This is a real
capability going away, not a migration, and it is named here rather than discovered later.

**And with it, transfer — which the tenant path never had.** The only Twilio `<Dial>` in the codebase is the company
line's (`ReceptionistEndpoints.cs:101-108`, dialling `o.OwnerCell` from the environment). On the tenant path
`TransferTargetNumber` is never dialled: it is read once as a boolean, `transferConfigured` at
`TenantCallController.cs:189`, which only chooses which failure sentence the relay speaks
(`ReceptionistRelaySession.cs:77,275`). So after A, no code anywhere transfers a caller to a person. This bears on C's
Q7d and is flagged there, not decided here.

**Surfaced while mapping this, not caused by it:** the tenant SMS webhook has never worked. `TwilioProvisioner.cs:147`
points every tenant number at `/api/receptionist/twilio/sms/incoming/{tenantId}`; `ReceptionistEndpoints.cs:223`
maps that route *without* the `{tenantId}` segment. It 404s for every tenant today. Deleting the path regresses
nothing for tenants; the dead URL in the provisioner comes out with it.

After this, none of the eleven variable names exists in the code and none can be refilled.

### B. The missing writer: one onboarding route that saves a config

Fourteen of the sixteen settings in `VoiceReceptionistConfig` have no write path anywhere. Only `ConsentSettingController`
and `BookingSettingController` exist, each writing one field behind an owner's token. So no answer a signup form
collects can currently be stored.

* `GeekAPI/Services/Voice/Onboarding/ReceptionistConfigAnswers.cs` — **written, untracked.** Fifteen optional fields
  (null = not asked on this step, so the current answer stands; `""` / `[]` = the business answered "none"), with
  `AnswersAnything` refusing an empty step and `AppliedTo(config)` doing the merge. **`KnowledgeRunId` is deliberately
  not a field**: it is a crawl, not an answer, and a form field accepting any run id would point one business's
  receptionist at another business's pages. The knowledge flow sets it.
* `GeekAPI/Services/Voice/Onboarding/ReceptionistConfigStep.cs` — **written, untracked.** `ApplyAsync` reads the tenant,
  gates on `pending_payment` with `ActivationFailureCodes.TenantNotPending`, reads the config, merges and saves.
* **Still to write:** the `POST api/v1/onboarding/receptionist-config` action on `OnboardingController`
  (`[RequireApiKey]`, rate-limited and `[Route("api/v1/onboarding")]` already on the class, so the action inherits both),
  the DI registration in `VoiceServiceRegistration.AddVoiceOnboarding`, and B2's controller.
* **Gate: tenant must be `pending_payment`.** The caller is the portal's server key, not a signed-in owner, so this
  must not be able to touch a running business; once active, settings change through the owner's own token. This also
  fixes the step's place in the flow — the questions sit after `business` and before `plan`, so a business sees what
  it is configuring before it is asked to pay.
* Validation is not duplicated. `ValidateConfig` (`GeekRepository/Repositories/Voice/VoiceRepository.cs:718-730`) holds
  the rules — greeting and prompt not blank, hours and questions valid JSON of the right shape, transfer and caller-id
  modes known, `TransferTargetNumber` E.164 if present, no blank emergency keyword, a real `MailAddress` when message
  email is on, a known consent mode — and `SaveConfigAsync` refuses with its own code. It checks nothing on the four
  booleans or the GUID, which is correct: there is nothing to check.
* **No database access is added to GeekAPI, and no repository change is needed either.** `IVoiceStore` in GeekAPI is
  `HttpVoiceRepository` (`GeekAPI/HttpClients/HttpVoiceRepository.cs:44-48`), which `PUT`s
  `internal/v1/tenants/{tenantId}/config` to `VoiceTenantController`, behind the internal-service policy. The upsert
  behind it writes **all sixteen** columns (`VoiceRepository.cs:326-353`), insert list and `DO UPDATE SET` alike, so
  every field a form can answer already has a column and a write. The review's worry that GeekRepository might not
  expose all sixteen is answered: it does.
* The route accepts **any subset** of the fields, so whether the portal asks one setting per screen or groups them is a
  form decision, not a route constraint.

#### B2. The same writer for an owner who has already paid

An active tenant's owner has no way to change fourteen of the settings either, and B's gate refuses active tenants
on purpose. So the same service gets a second door: `GET`/`PUT /api/v1/tenants/{tenantId}/receptionist/config`,
owner-token authenticated, in the shape of `ConsentSettingController`
(`[Authorize(AuthenticationSchemes = ReceptionistAuth.Scheme)]` on the class, the full path on each action,
`OwnerTenantClaim.Refuse(User, tenantId)` as the first line of both, errors through `CalendarController.StatusFor`).
Same merge via `ReceptionistConfigAnswers.AppliedTo`, same validation, different gate. Built in the same pass as B
because it is the same code; without it, every answer given at signup is permanent.

One defect in the controller being copied, so it is not copied: `BookingSettingController`'s PUT returns
`calendarConnected = true` unconditionally (`:98`), including when booking is being turned off. B2 returns what it read.

### C. The questions become form steps

Portal, per question, following the machinery already there: add to the `SignupStep` union and the `STEPS` array
(`src/app/signup/page.tsx:15-22`), add the ordering branch in `stepOf` (`src/lib/signup/state.ts:70`), add a form
component beside `BusinessForm`/`NumberForm` (`src/app/signup/signup-forms.tsx`), add a Server Action beside
`businessAction` (`src/app/signup/actions.ts`) posting to the route from B, add any new failure code's sentence to
`src/lib/signup/messages.ts`. **The cookie records step progress only, never an answer.** Answers are written to
`receptionist_configs` by the route from B as each step is submitted; the cookie gains one small field saying which
config steps are done, so a refresh resumes in the right place. A greeting, a description or a list of questions
would overflow a 4 KB cookie and silently break resumption; the database already holds them.

Sixteen settings, sixteen questions, listed with proposed wording in
`Geek-Receptionist/plans/signup-form-questions.md`. **Wording and order are Jeff's, one short instruction at a time.**
Nothing in C is built ahead of him saying it.

**One question cannot be asked honestly yet.** Q7d offers "Transfer to a number", and after A nothing dials
(see A). Asking it would promise a capability the product does not have and store a number no code reads. Either transfer
is built on the tenant path first — separate work, not in this plan — or Q7d ships with the message choice only until it
is. Jeff's call; the form is not built ahead of it either way.

**The review's grouping suggestion, recorded rather than taken.** It proposes three or four thematic steps — call
handling, greeting and voice, notifications, booking and consent — each showing the preset already filled in, instead of
sixteen consecutive screens, on the grounds that a sixteen-step wizard before payment loses small-business owners. The
route accepts any subset of fields, so this costs nothing to adopt and nothing to decline. It changes no code in C and no
setting goes unasked under it. It is Jeff's to take.

### D. Delete the billing exemption

`BILLING_EXEMPT_EMAIL` is one client's email in Railway deciding that client's billing, which is the same defect as
the four already deleted. It is also broken on its own terms: `ActivateWithoutBillingAsync` writes neither a
subscription nor a telephony row (`VoiceRepository.cs:154-194`), while every inbound call calls `GetStandingAsync`,
which joins `tenant_subscriptions` and fails without a row (`VoiceBillingRepository.cs:405-418`). An exempt tenant's
phone can never be answered. The path does not work and has never been exercised.

**It is worse than not working: it overwrites settings before it refuses.** `BillingExemption.cs:48-53` saves
`ReceptionistDefaults.ConfigFor(...)` over the tenant's config **first**, and the only `pending_payment` gate is inside
`ActivateWithoutBillingAsync` afterwards. So calling it a second time for an already-active exempt tenant resets that
business's consent mode, booking flag, knowledge run and the rest to the defaults, and *then* returns 409. A route that
mutates a live business on its way to refusing is the opposite of fail-closed, and it is the last argument for deleting
this rather than repairing it.

Deleted: `BillingExemptionOptions` and `BillingExemption` (`GeekAPI/Services/Voice/Onboarding/BillingExemption.cs`),
the `billing-exemption` route (`OnboardingController.cs:55`), `IVoiceBillingExemption` and its repository
implementation and internal route, and the portal's `billingExempt` branch in `stepOf` and `businessAction`.

Geek @ Your Spot signs up at `/signup` like any client, pays like any client, and is handed a new number by the path
that already works. Jeff, 2026-11-20: *"I AM A CLIENT/USER!"*

### E. The same defect on Vercel: the portal's scheduler

The inventory found four per-business values in the portal's environment, all in the booking scheduler copied from
geekatyourspot.com, none in the README's variables table:

| Variable | Read at | What it is |
|---|---|---|
| `GOOGLE_CALENDAR_ID` | `src/services/google-calendar.service.ts:90,:362` | one business's calendar |
| `GOOGLE_CALENDAR_OWNER_EMAIL` | `src/services/booking-confirmation.service.ts:103` | one business's owner |
| `NEXT_PUBLIC_FROM_EMAIL` | `booking-confirmation.service.ts:102` | one business's sender, shipped to the browser |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY(_B64)` | `google-calendar.service.ts:31,48,60` | a credential authorised against that one calendar |

Beside them, `"Geek @ Your Spot LLC"` is the hardcoded display name in the same function, and
`scheduler-shell.tsx:42` renders the South Florida service-area copy on nine pages including `/signup` (M1 in the
hardcoded-values audit).

This scheduler books *consultations with Geek @ Your Spot* — the vendor's own sales calendar — and is the one
subsystem that bypasses GeekAPI. The receptionist product already has the per-tenant version of this:
`tenant_mcp_connections` with `google_calendar`, OAuth per business, `BookingEnabled` per config. So the fix is
**not** to move these five values into a table; it is to **delete the scheduler subsystem** (`components/shared/scheduler/`,
`lib/actions/{hold-slot,create-booking}.ts`, `services/google-calendar.service.ts`,
`services/booking-confirmation.service.ts`, `/api/calendar/available-slots`, `/booking-confirmed`) and remove its
five variables from Vercel. Once Geek @ Your Spot is a tenant, its consultation booking is its receptionist's booking,
like every other client's.

This is a product decision about the sales page — it removes "book a consultation" from `/` until the tenant exists —
and is included so the plan is complete, **flagged for Jeff rather than decided**.

### F. Encrypt the per-business PII the config and tenant rows hold

Jeff, 2026-11-20: *"the variables are client data, shouldn't they be encrypted?"*

What is already encrypted (credentials): `tenant_telephony.twilio_auth_token_encrypted`, both OAuth tokens in
`tenant_mcp_connections`, and both bucket keys in `storage_connections` — `access_key_id_encrypted` and
`secret_access_key_encrypted` (migration 0079), sealed in `StorageController.cs:91,93` before the HTTP hop and opened in
`S3CompatibleCallRecordStorage.cs:45,47`. All through `VoiceCredentialProtector`, AES-256-GCM, keyed by
`VOICE_ENCRYPTION_KEY`. GeekRepository stores ciphertext it never decrypts; the key lives in GeekAPI.

What is not (PII, plaintext today): `receptionist_configs.transfer_target_number`,
`receptionist_configs.message_destination_email`, `tenants.contact_email`, `tenants.contact_phone`.

F encrypts those four at the same boundary and with the same protector, so the repository stays blind and GeekAPI
has the clear value where it needs it — an address to send to now, a number to dial once transfer exists. What this
costs: `ValidateConfig`'s shape checks (E.164, email) move to GeekAPI before encryption, since the repository can no
longer read the value. Migration adds the ciphertext columns, a one-time backfill encrypts existing rows, the plaintext
columns are dropped — three migrations, applied in order, each idempotent. **Not** the behavioural flags, hours, greeting
or prompt: they are read on every call and are not secrets.

#### The blind index was approved on a premise the code does not support

Jeff approved F as *"contact_email (with a deterministic HMAC-SHA256 blind-index column for owner-login lookups)"*, and
the plan said `contact_email` "is also the owner-login lookup key". **It is not.** Owner login reads a different table:
`geek_voice.owner_logins.email` (migration 0061, unique index `uq_voice_owner_logins_email`, looked up by
`VoiceOwnerRepository.FindOwnerLoginByEmailAsync`). `tenants.contact_email` has **no index at all** — the only index on
`geek_voice.tenants` is the primary key — and appears in **no `WHERE` clause** in either repository. Its one non-storage
use is the in-memory compare at `BillingExemption.cs:41`, which D deletes.

So a blind index on it would be a column nothing reads, added to serve a lookup that happens somewhere else. That is the
dead-identifier failure the parent `CLAUDE.md` is built around: it would be grepped later and read as evidence that owner
login goes through `tenants`. **The blind index is dropped from F.** Four fields encrypted, no index column.

The real plaintext-PII-used-as-a-lookup-key is `owner_logins.email`, which is unique-indexed and queried on every
sign-in. Encrypting *that* is what would need a deterministic HMAC. It is named here and **not** done: it is the login
path, it was not what Jeff approved, and it is a separate decision.

#### Two gaps in the protector that F has to close first

* **The sealed value carries no version, so the key can never be rotated.** `VoiceCredentialProtector` stores
  nonce(12) + tag(16) + ciphertext as one base64 string with nothing identifying the key or format, and `Unprotect`
  tries the single current key — its own error says a changed key cannot read what the old key wrote. The review asked
  for a `key_version`. F adds a one-byte format version at the front of the sealed blob and checks it on open, refusing
  an unknown version rather than guessing. Multi-key rotation itself is not built here; the byte is what makes it
  possible later. Pre-launch, so existing sealed rows are re-sealed or their test tenants deleted, not read through a
  dual-key fallback.
* **The bucket keys are sealed under borrowed purposes.** The purpose string is GCM associated data, which is what keeps
  one kind of secret from opening as another — but `StorageController` reuses `VoiceSecretPurposes.McpAccessToken` and
  `McpRefreshToken` for the two bucket keys. So an OAuth ciphertext from `tenant_mcp_connections` would open as a bucket
  credential, and the reverse. F adds `StorageAccessKeyId` and `StorageSecretAccessKey` and switches both the write and
  the read site. This is the answer to "verify storage_connections follows the same pattern": the columns are ciphertext,
  the purposes are wrong.

#### Logs were audited rather than assumed

The review asked that no PII reach the logs. Checked across GeekAPI and GeekRepository: no log statement in the Voice,
Onboarding or OwnerAuth code carries a contact email, contact phone, transfer number or destination email, and those
files say so in their own comments. The four statements that do log a phone number are all company-line SMS code
(`Sms.cs:27,34`, `InboundSms.cs:77,79`) and are deleted by A. No logging work is needed; this is recorded so it is not
re-audited.

Moving the key into GeekRepository, as the external review suggested, would be a new architecture decision — it
reverses which service is trusted with plaintext — and is not part of this plan.

### Out of scope, stated rather than assumed

Adopting the existing number 561-865-6990 onto the tenant path is **not** in this plan. It needs code that does not
exist (Twilio's buy call and webhook configuration are fused in one request — `TwilioProvisioner.cs:136-151` — and
there is no update-an-existing-number call anywhere), plus a telephony write path that does not exist
(`ActivateTenantAsync` is the only INSERT, requires `pending_payment` and demands PayPal values). It is a separate
piece of work, and Jeff has said the number going unanswered during development does not matter.

## Order

Approved by Jeff, 2026-11-20: *"Execute the plan in the agreed order (B -> D -> A -> C, deferring E until Geek @ Your
Spot LLC is onboarded as a tenant)."* F was approved in the same message ("Tier 2 (Encrypt): TransferTargetNumber,
MessageDestinationEmail, and on tenants: contact_phone and contact_email (with a deterministic HMAC-SHA256 blind-index
column for owner-login lookups)") and goes straight after B because it touches the rows B writes. The four fields stand;
the blind-index clause does not, for the reason recorded under F — the lookup it was for happens in another table.

Order: **B (with B2) → F → D → A → C as wording arrives. E deferred.**

Two guardrails carried from the review into the work:

* **`IncludeTranscript` (#12) must not become retention.** It already means "include the in-RAM transcript in the
  end-of-call email the business opted into", and nothing is persisted (`CallSummaryRequest`). The form step and the
  owner route expose it with that meaning and no other; no code path may write a transcript anywhere because the flag
  is on.
* **BYOS and calendar credentials stay in companion tables.** `storage_connections` (0079) and `tenant_mcp_connections`
  hold the secrets, encrypted in GeekAPI; `VoiceReceptionistConfig` never carries one. Any onboarding or dashboard step
  for them writes to those tables, never to an environment variable or a cookie. F's audit of `0079` confirms every
  credential column there is ciphertext.

## Why this is the shape, in one line

A variable per business per setting is sixteen variables per client, and the platform has sixteen settings today and
will have more. Jeff, 2026-11-20: moving them off Railway *"BECAUSE THAT WOULD/COULD RESULT IN MILLIONS OF VARIABLES"*.
The database already has the row for this (`geek_voice.receptionist_configs`, written by `SaveConfigAsync`); the
missing pieces are the writer (B), the questions (C), and deleting the two places that still read a business from the
environment (A, D, E).

## Verification

* `dotnet build` clean for GeekAPI and GeekRepository; `dotnet test GeekBackend.Tests` green (4,644 tests today).
* New tests for B: each field written in isolation leaves the other fifteen untouched; `""` clears a nullable answer
  and null leaves it; an active tenant is refused; a bad consent mode is refused with `SaveConfigAsync`'s own code.
* A grep proving the deleted variable names return zero hits across every `.cs`, `.ts`, `.tsx`, `.json`, `.md` and
  `.env*` file in both repos — the same bar `5a72445` set for the Markdown retirement: a surviving name is read as a
  live claim. No commented-out code, no stubbed fallback, no doc comment describing the old path.
* New tests for F: a value sealed under one purpose refuses to open under another, specifically a bucket key against the
  MCP purposes; an unknown format-version byte is refused rather than parsed; a config round-trips its transfer number
  and destination email through GeekAPI with the repository holding only ciphertext.
* `TwilioSignatureFilter` is deleted only because `TenantTwilioWebhook.VerifyAsync` (`Services/Voice/Calls/`) already
  checks every tenant POST, confirmed by reading it rather than assumed: the token is the tenant's own subaccount token,
  decrypted from `TwilioAuthTokenEncrypted` through the protector, not `TWILIO_AUTH_TOKEN`; the signature is validated by
  Twilio's `RequestValidator` over `PUBLIC_BASE_URL` plus the request path and query; the form's `AccountSid` must equal
  the stored subaccount SID or the request is refused `AccountMismatch`; a missing signature header and an unset
  `PUBLIC_BASE_URL` are both refusals, the latter a 503. There is no bypass flag — `VALIDATE_TWILIO_SIGNATURE` reaches
  only the company-line filter being deleted. The tenant path's check is strictly stronger than the one being removed,
  and the review's suggestion to validate against `TWILIO_MASTER_*` would reject every legitimate call, because Twilio
  signs a subaccount's webhook with that subaccount's token.
* `railway variable list --service GeekAPI --environment production` showing no per-business value remains: the
  seven not yet deleted (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`,
  `BILLING_EXEMPT_EMAIL`; `RING_SECONDS` and `SCREEN_CALLS` were never set) are deleted by Jeff — the permission
  system refuses to let the assistant delete credentials — after A and D land, since until then they are still read.
* If E is approved: `vercel env ls` for the portal showing the five scheduler variables gone.
* End to end: run `/signup` against the deployed GeekAPI, answer the steps that exist, and read the saved config back
  through the owner's dashboard to confirm the answers persisted.
