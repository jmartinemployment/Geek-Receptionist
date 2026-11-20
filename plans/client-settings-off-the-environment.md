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
* the registration site in `GeekAPI/Program.cs:236`
* `GeekBackend.Tests/Receptionist/VoiceWebhookTests.cs` and any test naming the deleted variables

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

**Surfaced while mapping this, not caused by it:** the tenant SMS webhook has never worked. `TwilioProvisioner.cs:147`
points every tenant number at `/api/receptionist/twilio/sms/incoming/{tenantId}`; `ReceptionistEndpoints.cs:223`
maps that route *without* the `{tenantId}` segment. It 404s for every tenant today. Deleting the path regresses
nothing for tenants; the dead URL in the provisioner comes out with it.

After this, none of the eleven variable names exists in the code and none can be refilled.

### B. The missing writer: one onboarding route that saves a config

Fourteen of the sixteen settings in `VoiceReceptionistConfig` have no write path anywhere. Only `ConsentSettingController`
and `BookingSettingController` exist, each writing one field behind an owner's token. So no answer a signup form
collects can currently be stored.

* New `GeekAPI/Services/Voice/Onboarding/ReceptionistConfigStep.cs` — a request record whose every field is optional
  (null = not asked on this step, so the current answer stands; `""` / `[]` = the business answered "none"), and a
  service that reads the tenant, reads the config, writes the answered fields over it and saves.
* New route on the existing `OnboardingController` (`[RequireApiKey]`, rate-limited, portal-server-facing).
* **Gate: tenant must be `pending_payment`.** The caller is the portal's server key, not a signed-in owner, so this
  must not be able to touch a running business; once active, settings change through the owner's own token. This also
  fixes the step's place in the flow — the questions sit after `business` and before `plan`, so a business sees what
  it is configuring before it is asked to pay.
* Validation is not duplicated. `IVoiceStore.SaveConfigAsync` already holds the rules (transfer mode needing a number,
  email shape, consent mode) and its refusal is returned with its own code.

### C. The questions become form steps

Portal, per question, following the machinery already there: add to the `SignupStep` union and the `STEPS` array
(`src/app/signup/page.tsx:15-22`), add the ordering branch in `stepOf` (`src/lib/signup/state.ts:70`), add a form
component beside `BusinessForm`/`NumberForm` (`src/app/signup/signup-forms.tsx`), add a Server Action beside
`businessAction` (`src/app/signup/actions.ts`) posting to the route from B, add any new failure code's sentence to
`src/lib/signup/messages.ts`. The cookie needs one field recording which config questions are answered, so a refresh
resumes in the right place.

Sixteen settings, sixteen questions, listed with proposed wording in
`Geek-Receptionist/plans/signup-form-questions.md`. **Wording and order are Jeff's, one short instruction at a time.**
Nothing in C is built ahead of him saying it.

### D. Delete the billing exemption

`BILLING_EXEMPT_EMAIL` is one client's email in Railway deciding that client's billing, which is the same defect as
the four already deleted. It is also broken on its own terms: `ActivateWithoutBillingAsync` writes neither a
subscription nor a telephony row (`VoiceRepository.cs:154-194`), while every inbound call calls `GetStandingAsync`,
which joins `tenant_subscriptions` and fails without a row (`VoiceBillingRepository.cs:405-418`). An exempt tenant's
phone can never be answered. The path does not work and has never been exercised.

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

### Out of scope, stated rather than assumed

Adopting the existing number 561-865-6990 onto the tenant path is **not** in this plan. It needs code that does not
exist (Twilio's buy call and webhook configuration are fused in one request — `TwilioProvisioner.cs:136-151` — and
there is no update-an-existing-number call anywhere), plus a telephony write path that does not exist
(`ActivateTenantAsync` is the only INSERT, requires `pending_payment` and demands PayPal values). It is a separate
piece of work, and Jeff has said the number going unanswered during development does not matter.

## Order

A, B, D are independent of each other. C depends on B. E depends on Jeff's decision. Suggested: **B, D, A, E, then C
as wording arrives** — B first because it is the only piece that unblocks anything else; A after D because it is
the largest diff and reviews best on its own; E only once decided.

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
* A grep proving the deleted variable names return zero hits across every `.cs` file — the same bar `5a72445` set for
  the Markdown retirement: a surviving name is read as a live claim.
* `railway variable list --service GeekAPI --environment production` showing no per-business value remains: the
  seven not yet deleted (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`,
  `BILLING_EXEMPT_EMAIL`; `RING_SECONDS` and `SCREEN_CALLS` were never set) are deleted by Jeff — the permission
  system refuses to let the assistant delete credentials — after A and D land, since until then they are still read.
* If E is approved: `vercel env ls` for the portal showing the five scheduler variables gone.
* End to end: run `/signup` against the deployed GeekAPI, answer the steps that exist, and read the saved config back
  through the owner's dashboard to confirm the answers persisted.
