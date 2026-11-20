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

## Railway holds no client settings, checked 2026-11-20

Asked whether any client setting had been removed from Railway. Nothing was removed, and nothing could have been: every
Railway call made in this work was a read (`list-projects`, `list-services`, `list-deployments`, `get-logs`,
`list-variables`). No variable has been set, renamed or deleted.

What is there now, production environment:

* **GeekRepository** — sixteen variables, all infrastructure: `DATABASE_URL`, `MONGO_CRAWLER_URL`, the two API keys, the
  Railway-injected names. No receptionist or client setting of any kind.
* **GeekAPI** — the company line's four are present and untouched: `COMPANY_NAME`, `OWNER_CELL`, `TWILIO_NUMBER`,
  `CALL_MODE`. `RING_SECONDS` and `SCREEN_CALLS` are not set and never were; `ReceptionistOptions.FromConfiguration`
  reads them as `config["RING_SECONDS"] ?? "18"` and `config["SCREEN_CALLS"] ?? "true"`, so their absence is a code
  default doing its job, not a missing variable.

Those four are Geek @ Your Spot's own line, which is the single-tenant shortcut the audit flagged — one company's settings
in a process-wide singleton that cannot hold a second business. The audit *proposed* retiring them once Geek @ Your Spot
signs up as a real tenant and its number moves onto the tenant path. That is a proposal in a document, not something done,
and the order matters: the tenant exists first, the variables go last, and the company line never stops answering in
between. No Railway variable gets changed without Jeff saying so.

## Two things to settle before any of it is built

**Where in the flow.** These questions cannot go before `plan`, because an abandoned signup would throw the answers away,
and they cannot go after `login`, because that is the dashboard. The place that works is between `number` and `login`: the
tenant exists, the phone number is bought, and the owner has not yet been handed an account. That is a recommendation, not
a decision.

**What they post to.** There is no route that writes a whole config. `SaveConfigAsync` takes the entire record and
`ConsentSettingController` / `BookingSettingController` each write one field by reading the config, changing one value and
saving it back. A form step needs either a config route under `api/v1/onboarding` (server key, no owner token yet) or one
per question in the same shape as the two that exist. That is mine to build once the questions are settled.
