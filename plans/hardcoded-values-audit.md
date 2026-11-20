# Hardcoded values across the Receptionist — audit, 2026-11-20

Four parallel audits: the call path, the voice services, the storage layer, and this portal. What follows is
what survived cross-checking, ordered by what it costs.

**A note on method, because it changed the result.** The first portal brief told the auditor that Geek @ Your
Spot's own name, number and marketing copy were not findings, on my assumption that the vendor's website is
allowed to name the vendor. Jeff rejected the filter: it pre-decided the conclusion. Re-run without it, the
marketing pages produced the single most visible defect in this document (M1 below). The lesson is the one this
codebase already records about dead-path claims — an exclusion is only worth the evidence behind it, and I had
none.

---

## 1. The product never asks a business how its receptionist should behave

This is the finding. Everything else is smaller.

A tenant's receptionist runs on **sixteen** settings. Signup asks about **none** of them: its fields are
business name, description, country, state, contact email and phone, the compliance attestation, the eight
excluded-industry answers, then tier and PayPal ids (`OnboardingEligibility.cs:25-33`,
`SubscriptionActivation.cs:23-29`). Not one describes what the receptionist does.

So every value comes from `ReceptionistDefaults.ConfigFor` (`:111-121`) or, for six it does not set, from the
record's own parameter defaults (`VoiceRecords.cs:214-224`). And **fourteen of the sixteen can never be changed
afterwards.** Only consent mode and booking have routes — both built this week. The other fourteen — greeting,
system prompt, business hours, qualifying questions, transfer mode, transfer target, caller-id mode, emergency
keywords, recording disclosure, message email, destination email, include transcript, abandoned-call notices,
knowledge run id — are written once at activation and nothing in either service can write them again.

`ReceptionistDefaults` is therefore not a set of defaults. It is the configuration, for every tenant,
permanently.

### What those permanent values are

`ScriptTemplate` (`ReceptionistDefaults.cs:23-70`) is Geek @ Your Spot's own working sales script, handed to
every paying client with three tokens substituted:

- "You are **Lily** … set them up for a **free consultation**" — the receptionist's name and its entire goal
- "**Who we serve:** Small businesses in **Miami-Dade, Broward, and Palm Beach**"
- the three-category service catalogue, the methodology, the pricing answer
- "**Consultations are held between 9 AM and 4 PM**" — an appointments window, in prose, while `BusinessHours`
  is left `{}` in the field that is actually read

The substitution makes it worse rather than better: a Portland dentist's receptionist says it is a business in
Oregon working in dentistry, and then says its service area is Miami-Dade and that it sells ad-spend
optimization.

### The combination that ships today

At the defaults, `MessageEmailEnabled` is false and `BookingEnabled` is false, so
`TenantCallController.cs:181-185` computes `deliverAlways = false` and leaves the call-record request `null`.
A tenant who completes signup and pays gets a receptionist that **answers the phone and sends the owner
nothing** — no email, no bucket write, no Drive file. The call is metered and billed. Under Zero Data Retention
the platform keeps no copy by design, so that record is the only one there would ever be. The default is not
"notifications off"; it is "the call never happened." No signup question could have prevented it and no
dashboard control can fix it.

---

## 2. Fixed in this pass

**`0078` named a table that does not exist.** It altered `geek_voice.mcp_connections`; the table is
`geek_voice.tenant_mcp_connections` (`0060:84`). A missing table raises 42P01, and `SqlMigrationRunner` calls
`StopApplication()` and rethrows — so this would not have failed one migration, it would have **stopped
GeekRepository from starting**, taking `0079`, `0080` and `0081` with it. Applying the migrations was step one
of making the product testable; it would have taken the service down.

The constraint name was wrong the same way. `0060` declares the CHECK inline, so Postgres names it
`tenant_mcp_connections_provider_check`; dropping `mcp_connections_provider_check` matched nothing. Had only the
table name been corrected, the original CHECK would have survived beside the new one and `google_drive` would
still have been refused by the database while every layer above accepted it.

**The consent fix was undone on the read path.** `VoiceRepository.cs:860` defaulted `ConsentMode` to
`passive_disclosure` — the value removed from `0077` this morning. Every string beside it is `= ""`, which fails
its CHECK; this one carried a *valid* value, so a row read without the column passed `ValidateConfig` and was
written back by `SaveConfigAsync` as the weaker mode, silently, on the setting that decides whether a robocall
is answered and billed.

**Three tests now enforce all of it** (`VoiceMigrationIntegrityTests.cs`): every `geek_voice` ALTER/DROP names a
table a migration creates; a migration replacing an inline CHECK drops the name Postgres actually gave it; and
every MCP provider the C# accepts is one the database accepts. A migration is the one kind of code here with no
compiler and no caller — these are the nearest thing it can have.

---

## 3. Still open, backend

| | What | Where |
|---|---|---|
| B1 | The company line is a second receptionist for one named business: state `"FL"`, industry, name, owner's mobile, ring seconds and screening in six constants and six process-wide env vars, addressed by the sentinel `"company"` because that business has no tenant id | `ReceptionistConsent.cs:186-199`, `ReceptionistOptions.cs:34-47`, `RelayTickets.cs:30` |
| B2 | Being the thinner code path, it is also the **only** business whose receptionist cannot book, cannot look anything up, has no roles and leaves no call record — capability decided by which code answered the phone | `ReceptionistEndpoints.cs:184, 219, 293` |
| B3 | The receptionist tells every caller "we do not retain call recordings or transcripts" — untrue for a tenant with `IncludeTranscript` on, whose transcript is written to their bucket. The keypress path's greeting says the opposite: "this call may be recorded" | `ReceptionistConsent.cs:30, 34`; `ReceptionistDefaults.cs:21` |
| B4 | On failure the caller is told to "hold while we connect you directly with our team" — nothing transfers, the code hangs up on the next line; or to "leave a message after the tone", and there is no tone and no voicemail anywhere under ZDR | `ReceptionistRelaySession.cs:38-43, 272-280` |
| B5 | Four settings are stored and validated and read by nothing: `EmergencyKeywords`, `RecordingDisclosureEnabled`, `TransferCallerIdMode`, and `TransferTargetNumber` (read only to pick which failure sentence to say) | `VoiceRepository.cs:333, 366, 726`; `TenantCallController.cs:189` |
| B6 | `CompanyCallerQuestions` — one business's fifteen areas and forty-five questions, naming Florida three times, in the product's assembly. Correctly gated to the exempt tenant; wrong location | `CompanyCallerQuestions.cs:18-107` |
| B7 | The platform validator special-cases tenant #1's question shape by name, in its own comment | `VoiceRepository.cs:777-792` |
| B8 | The record that **is** the PUT body has seven optional parameters, so a partial save silently revokes booking, email or the knowledge scope with a 200 — under a doc comment at `:203` promising "there are no defaults to fall back on" | `VoiceRecords.cs:214-224` |
| B9 | ZDR is asserted but not enforced on `call_logs`: `transcript_json`, `call_summary` and `recording_url` still exist. `0076` made exactly this critique of `appointments` and dropped them; the same fix was never applied here | `0060:136-139` |
| B10 | The $0.50 overage rate is both a schema DEFAULT and a C# constant; the four tier codes live in three places | `0060:36, 39`; `VoiceTierSchedule.cs:14` |

---

## 4. Still open, portal

**One claim to discard first.** The portal audit's verdict says the app "reads everything from GeekAPI per
tenant". That is true of the dashboard and false of the product, and it should not be allowed to stand as
reassurance. The business running today is configured by six environment variables — `COMPANY_NAME`,
`OWNER_CELL`, `TWILIO_NUMBER`, `CALL_MODE`, `RING_SECONDS`, `SCREEN_CALLS` (`ReceptionistOptions.cs:34-47`) —
registered as a process-wide singleton (`ReceptionistEndpoints.cs:50`). Six Railway variables for one business;
sixty for ten, and because they are per-process they cannot coexist at all, so the second tenant needs a second
deployment. That is the standing "no Railway vars per business" rule broken at N=1. It is not a tidy exception
on the way to a per-tenant store — it is the demonstration that the configured path and the scalable path are
different code, and only the unscalable one has ever answered a real call.

**Product paths.** Prices, included minutes, the overage rate, the bucket tier gate, the consent modes, the
bucket providers and the Drive folder name are all transcribed from values GeekAPI owns, with nothing failing if
they drift. In three cases — consent modes, Drive folder, the tier refusal sentence — **GeekAPI already sends
the authoritative value in the very response the page reads and discards** (`ConsentSettingController.cs:50`,
`StorageController.cs:37, 82-89`). The price list is the worst: `signup/page.tsx:25-30` against
`VoiceTierSchedule.cs:17-22`, with no route serving the schedule, so changing a price means the page advertises
one number while the buyer is charged another and the signup still succeeds.

**Marketing pages** — the half my first brief wrongly excluded:

- **M1.** `scheduler-shell.tsx:42` tells every visitor the vendor is a "South Florida technology consultancy
  serving small businesses in Miami-Dade, Broward, and Palm Beach". It renders on nine pages **including
  `/signup`**, directly above a form that asks "Is Business located in United States?" and refuses non-US
  businesses. A prospect in Ohio reads a disqualification the product does not apply. One file, one edit, but
  somebody has to decide the wording.
- **M2.** The home page sells "One Platform. Every Voice Agent", "Design, Test, and Launch in Minutes",
  "Customize voices, design conversations, connect telephony". The dashboard has four cards and no voice picker,
  conversation designer or integration surface.
- **M3.** `/pricing` is a blank stub, linked from the navbar and footer. The only prices in the app sit behind
  the captcha, the country question and all eight industry questions. Write prices there *after* the schedule
  has one home, not before — otherwise it becomes a fifth uncoordinated copy.
- **M4.** One offer has five names: "Free AI Assessment", "Free Consultation", "AI Consultation slot",
  "Your Consultation Is Booked", "AI Strategy Call" — across five files. A visitor meets three of them while
  booking one thing.
- **M5.** "Geek @ Your Spot" is written out sixteen times across six files and "Geek-Receptionist" in eight page
  titles, with no central source — there is no `src/data/` in this repo at all.
- **M7.** Clean result worth recording: no company phone number or email is published anywhere in `src/**`. The
  "change one number, edit dozens of files" risk does not exist yet. `/contact` is blank, so the single source
  should exist before that page is written.
- **M8.** This repo's own CLAUDE.md cites `lib/seo/json-ld.tsx` and `data/home/*`. Neither exists, and there is
  no structured data anywhere here. By this project's standard, a claim is worth the grep that backs it.

---

## 5. What this says about the ordering

Every capability built this week — knowledge retrieval, orchestration, roles, booking opt-in, storage opt-in,
disconnects, consent mode — was added to a product with no way for a business to configure any of it, and the
one business that could not be configured at all was the vendor's own. The gap was not visible from inside any
of those features, because each one read config correctly. It was only visible by asking who writes the config,
and the answer is: activation, once, from a constant.
