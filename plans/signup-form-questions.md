# The signup form's remaining questions

Jeff, 2026-11-20, choosing what comes first: *"I would probably choosen the Multi-Step onboarding form to finish before
dashboard."* So the form is the work, and the dashboard write path waits.

## The rule this list is built under

Jeff, 2026-11-20: *"Any and/or every setting needs to be included in the onboarding multi-step form. The application may have
preset defaults, but I am not comfortable making decisions on behalf of others."*

So the count is sixteen for sixteen. A setting that the form does not ask is a decision we made for the client, whatever the
value happens to be — and that holds for the safe-looking ones too: `RecordingDisclosureEnabled` is true for everyone,
`ConsentMode` is `strict_keypress` for everyone, `TransferMode` is `voicemail_only` for everyone. Each of those is a choice,
made by us, that the client never saw.

A preset stays, and is **the answer already filled in** on the step, with the client free to change it. The difference is
whether they were shown it. Nothing may be configured silently because the value seems sensible.

Two of the sixteen are not a question with answer choices and need a shape of their own:

* **`SystemPromptTemplate`** is a document, not a setting. The form asks for its parts — what the business does, who it
  serves, how it prices, what it wants the receptionist to do — and assembles the prompt from those answers. Handing the
  client a text box containing Lily's script and asking them to edit it would be the same decision in a different costume.
* **`KnowledgeRunId`** is a crawl, not an answer. The question is "should your receptionist answer from your website?" with
  the site address; the run is what we do with the yes.

## The list

This is the list of questions for him to change, reorder or throw out. Nothing here is a decision. It reconciles two lists
that had drifted apart: the twelve questions kept in GeekBackend `docs/Geek-Receptionist-zero-data-retention.md` section 9,
and the sixteen settings `VoiceReceptionistConfig` actually holds. Four settings are in neither list and are named below.

## Where the form stands today

`stepOf` (`src/lib/signup/state.ts:70`) runs: captcha → country → eight excluded-industry questions → business → plan →
payment_method → number → login.

The `business` step collects business name, description, country, state, contact email and phone. **No step asks how the
receptionist should behave.** All sixteen settings are written by `ReceptionistDefaults.ConfigFor`, and fourteen of them
have no write route anywhere afterwards — only consent (`ConsentSettingController`) and booking (`BookingSettingController`)
exist, both built this week.

## The settings, and whether anything asks

| Setting | Starts as | Asked at signup | In section 9 |
|---|---|---|---|
| `GreetingMessage` | template with the business name | no | Q7 |
| `SystemPromptTemplate` | **Lily's script, written for Geek @ Your Spot** | no | **no** |
| `BusinessHours` | `{}` | no | Q7 |
| `QualifyingQuestions` | `[]` | no | Q7 |
| `TransferMode` | `voicemail_only` | no | Q7 |
| `TransferTargetNumber` | null | no | Q7 |
| `TransferCallerIdMode` | `original_caller` | no | **no** |
| `EmergencyKeywords` | `[]` | no | Q7 |
| `RecordingDisclosureEnabled` | true | no | **no** |
| `ConsentMode` | `strict_keypress` | no | **no** (dashboard card exists) |
| `MessageEmailEnabled` | false | no | Q6 |
| `MessageDestinationEmail` | null | no | Q6 |
| `IncludeTranscript` | false | no | Q6 |
| `NotifyOnAbandonedCalls` | false | no | Q6 |
| `BookingEnabled` | false | no | Q8 (dashboard card exists) |
| `KnowledgeRunId` | null | no | **no** |

`SystemPromptTemplate` is the one that matters most and the one no list covered. Every tenant's receptionist currently says
it is Lily, offers free consultations between 9 AM and 4 PM, and serves Miami-Dade, Broward and Palm Beach — because that is
one company's sales script, shipped as the default for all of them.

## Proposed questions

Section 9's numbering is kept so the two documents can be read together. A, B, C and D are new, for the four settings
section 9 never covered.

**A. What does your business do, in a few sentences?** Free text. This replaces the Lily script's Reference Information —
what you sell, who you serve, how you price. Without it the receptionist describes a South Florida AI consultancy.

**B. What should your receptionist call itself?** A name you choose / Just "the AI receptionist". Today it is Lily for
everyone.

**Q7a. How should it answer the phone?** The greeting sentence, with the business name filled in and the recording notice
already on the end.

**Q7b. When are you open?** Days and hours, or "always".

**Q7c. What should it ask every caller?** Up to five questions, free text, one per line.

**Q7d. What should it do when someone needs a person?** Take a message / Transfer to a number (then: which number).

**C. When it transfers, whose number should show on your phone?** The caller's / Your receptionist's number. Only asked
after a transfer number is given.

**Q7e. What words mean a call is an emergency?** Free text, comma separated. Blank is a valid answer.

**D. Should callers hear that the call may be recorded?** Yes, always / No. Currently always yes, and it is a legal question
in two-party-consent states, so the wording of the choices is yours.

**Q6. How do you want to hear about a caller?** Section 9 says the choices are not known. Jeff, 2026-11-19: *"None"*, built
inert. The code can send an end-of-call email to an address the business gives, with or without the transcript, with or
without the calls where nobody spoke. Still his to word.

**Q8–Q12.** Booking, unchanged from section 9: whether it books, what a caller must give first, how long an appointment is,
what it is called, which calendar.

**Q1–Q5.** Storage, unchanged from section 9.

**E. Should your receptionist answer questions from your website?** Yes, and here is the address / No. The yes is what
sets `KnowledgeRunId`; the no leaves the receptionist with no lookup tool rather than one that finds nothing.

That is sixteen of sixteen. None is left for us to decide.

## Client settings removed from Railway, 2026-11-20

Jeff, 2026-11-20: *"REMOVE CLIENT SETTINGS FROM RAILWAY, THIS IS NOT ACCEPTABLE, NOT EVENTUALLY NOW!"* Done, on the
GeekAPI service, production environment. Four variables deleted:

* `COMPANY_NAME` — the business's name
* `OWNER_CELL` — the number its receptionist rings
* `TWILIO_NUMBER` — the number its callers dial
* `CALL_MODE` — whether callers dial it directly or are forwarded to it

`RING_SECONDS` and `SCREEN_CALLS` were never set: `ReceptionistOptions.FromConfiguration` reads them as
`config["RING_SECONDS"] ?? "18"` and `config["SCREEN_CALLS"] ?? "true"`, so there was nothing to delete.

**Kept, because they are platform credentials and not one business's settings:** `TWILIO_ACCOUNT_SID`,
`TWILIO_AUTH_TOKEN`, `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`, `TWILIO_MASTER_ACCOUNT_SID`,
`TWILIO_MASTER_AUTH_TOKEN`. These are how GeekAPI provisions a subaccount and a number for every tenant that signs up;
deleting them would stop signup from working for everyone. **GeekRepository holds no client setting of any kind** —
sixteen variables, all infrastructure.

**Two that are arguably a business's and were left alone, named rather than quietly decided:** `GOOGLE_CALENDAR_ID`,
the calendar the portal's booking page writes consultations to, and `BILLING_EXEMPT_EMAIL`, the address that signs up
without paying. Both are Geek @ Your Spot's own rather than a tenant's, and both belong to subsystems outside the
receptionist's config. Say the word and they go too.

### What this costs, stated plainly

The company line 561-865-6990 was configured by those four variables and by nothing else. With them gone,
`FromConfiguration` fails, `AddReceptionist` catches it and registers `ReceptionistStatus(false, ...)`, and the Twilio
webhooks answer 503. GeekAPI itself is unaffected and keeps serving everything else — that catch exists so a Twilio
mistake cannot take the API down.

The running container still holds the old values in memory, because deleting a variable through the CLI did not
trigger a redeploy. So the line answers until GeekAPI next deploys, and the next push is what ends it. That is a
grace period, not a reprieve: the settings are out of Railway now, as instructed, and the line goes quiet on the next
deploy unless it is a tenant by then.

### What has to happen for the line to answer again

It becomes a tenant, which is the migration the audit proposed and this makes urgent:

1. Run the exempt signup for Geek @ Your Spot (`BILLING_EXEMPT_EMAIL`), which creates the tenant row and its config.
2. Attach the existing Twilio number as its telephony row. **This is the only step that needs new code** — every other
   path buys a new number, and this one adopts a number that already exists.
3. Point the Twilio number's webhook at the tenant route instead of `/api/receptionist/twilio`.
4. Delete the code that reads a business's settings from the environment, so this cannot come back: `ReceptionistOptions`
   and the company-line services built on it. Until that is deleted, the variable names are still live in the code and
   someone can set them again.

Step 4 is the one that makes the removal permanent rather than a cleared field.
