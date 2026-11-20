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

## Outbound calling, asked as a connection to the client's own store

Jeff, 2026-11-20: *"Outbound calling I envision connecting to client/users data store. The Multi-step form should ask
exactly in that manner."*

That is an architecture decision as well as a form decision, and it is the one the research document had left open: **we hold
no list of who to call.** The person, the number, the reason and the time live in the client's system, and the product reads
them when a call is due. No queue, no ledger, no contact history here. Written up in `outbound-calling.md`; the consequence
for this document is that the questions below ask about *their* store rather than asking them to type a list into ours.

**What can actually be connected today, verified rather than listed.** `VoiceMcpProviders` names five providers, and only two
have any code behind them: `GoogleConnections.All` is Google Calendar and Google Drive. `outlook`, `cal_com` and `hubspot`
are strings in an enum with no OAuth, no client and no tool — a grep for each outside that enum returns nothing. So the form
can offer a Google Calendar today and must not list the other three, or it promises connections that do not exist. Drive is
where call records are written, not a source of people to call: a read source and a write target are different questions and
should not be merged into one.

### The proposed questions, for Jeff to change, reorder or throw out

Nothing here is decided. They follow the shape of the six approved steps: the owner's words, one closed question where there
is a closed answer.

**O1. Should your receptionist make calls, as well as answer them?** Yes / No. A no ends this section and nothing below is
asked.

**O2. What should it call about?** Choose any: confirm an appointment · remind someone of an appointment · follow up after a
visit · chase an unpaid invoice. Each one is a reason the receptionist states at the start of the call, and the only thing it
does on that call.

**O3. Where do we read that from?** Your Google Calendar / Somewhere else. Only Google Calendar can be connected today;
"somewhere else" takes a note of what they use and asks nothing it cannot honour. **We keep no copy of your customers.**

**O4. Connect it now.** The same Google sign-in the appointments step uses. Until it is connected nothing is called, and the
dashboard says so rather than queuing.

**O5. When should each call go out?** Per reason chosen in O2: the day before · the morning of · a set number of days after ·
only when you ask. Needs a time zone, and it is the customer's that governs the legal window, not the business's.

**O6. Where is your do-not-call list?** In the system above / You will tell us one by one / You do not have one. This is the
one that cannot fail silently: a request not to be called again has to outlive the call it was made on, and if their store
holds it we must be able to read it before every call. An honest answer of "you do not have one" is a reason not to turn
outbound on, not a default to work around.

**O7. May it say what the invoice is for, and how much?** Yes / Only that there is an unpaid invoice. Asked only if they chose
invoices in O2. Whoever answers the phone may not be the person who owes the money.

**O8. What language should it speak?** See the language question below — it is not outbound-specific and is the seventeenth
setting.

### Two constraints from the research that bear on questions already live

- **The receptionist's name.** A creditor collecting its own debts becomes a debt collector under 15 U.S.C. § 1692a(6) if it
  uses a name suggesting a third party collects. The existing "What should your receptionist call itself?" is free text with
  no constraint, so a tenant chasing its own invoices could name its way into the FDCPA.
- **No pitching on an outbound call.** 47 CFR 64.1200(a)(2) needs signed written consent for a call carrying an advertisement
  or constituting telemarketing; (a)(1) needs only prior express consent for everything else. One upsell sentence moves the
  call between them. So the outbound prompt cannot reuse the inbound one, and the owner-supplied "What should it do with a
  caller?" and "What do you charge?" have to be re-scoped for outbound.

## The seventeenth setting: what language it speaks

Jeff asked, 2026-11-20: *"How Many languages can we speak?"*

**Today: one, and nobody chose it.** `ReceptionistConsent.Connect` builds `new ConversationRelay(url, welcomeGreeting)` and
sets nothing else, so no `language`, `ttsLanguage` or `transcriptionLanguage` reaches Twilio and every call runs on
ConversationRelay's default. `VoiceReceptionistConfig` has no language field at all — zero occurrences — so there is nothing
for a tenant to set and nothing for the form to ask. The same is true of the voice: no `voice` attribute is set either, while
"10+ voices and custom agent name" is on the approved launch list.

**What is available without new infrastructure:** Twilio's default-voice table for ConversationRelay lists **37 language
codes**, including regional variants (`en-US`, `en-GB`, `fr-CA`) and a `multi` code, each with a default ElevenLabs, Google or
Deepgram voice. Twilio also states that ElevenLabs v4 "supports 90+ languages with native accents" — that is a claim about
the text-to-speech model, not about ConversationRelay, and the page does not give an overall ConversationRelay figure. Not
verified: ConversationRelay's default language when the attribute is absent, what the `multi` code does, and whether the
language can change mid-call.

So the answer is a configuration value this product does not yet carry. It is the seventeenth setting, it belongs on
`receptionist_configs` beside the other sixteen, and it is a question for the client like the rest: a business in Hialeah may
want Spanish first and a business in Boston may not want the option at all.
