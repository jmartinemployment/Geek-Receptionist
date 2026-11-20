# Plan: implementing languages, from one to several

Jeff, 2026-11-20: *"Create a plan to implement languages."*

**What this is for:** a business in Hialeah should be able to buy a receptionist that answers in Spanish, and a business in
Boston should never be asked about it. This plan is how that becomes true, in the order the pieces have to land.

The research behind it is `multilingual-receptionist.md` (Twilio's real limits, the census ranking, the dialect decisions)
and `multilingual-language-access-law.md` (no US law requires a private business to answer in another language, so every
language here is a product decision and not a compliance one). Neither is repeated. This document is only the build.

## What is already built, and therefore not in this plan

The seventeenth setting shipped on 2026-11-20. `receptionist_configs.language` stores a code; `ReceptionistLanguages`
(GeekAPI) holds **every sentence a caller hears** in each language; both relay halves, the `<Say>` consent gate, the closing
message and the mid-call failure line all read from it; a code with no reviewed wording is refused everywhere it could be
used and nothing falls back to English. Codes live in `GeekApplication.VoiceLanguages`, words in GeekAPI, and a test asserts
the two lists are identical.

So **the engineering question "how does a second language reach a caller" is closed.** What is open is everything around it:
the wording itself, the owner's ability to pick, the caller's ability to be served, and three holes that would let a second
language fail quietly.

## The gate, and it is not engineering

A language exists in this product when four sentences exist in it, reviewed:

| Slot | What it is | Why review, not translation |
|---|---|---|
| `Disclosure` | the ConversationRelay welcome greeting on a passive-disclosure call | it is the recording notice under Fla. Stat. 934.03 — a legal act, not a string |
| `Consent` | spoken by `<Say>` inside `<Gather>` on a strict-keypress call | same, plus it instructs a keypress that has to be unambiguous |
| `Unanswered` | spoken when the call cannot be taken at all | the caller must know to call back, not think they were hung up on |
| `Failure` | sent over the relay when the model fails mid-call | promises only what this product can do — the one that already went wrong once in English |

**Everything below Stage 1 is blocked on these four sentences existing in the target language, and that is Jeff's to procure,
not mine to generate.** A machine translation of a consent disclosure is the thing `ReceptionistLanguages` was built to make
impossible; nothing in this plan weakens that.

## Stage 1: close three holes that would make a second language fail quietly

These are independent of which language comes next and should land before one does. All three are currently invisible
failures, which is the shape this project does not ship.

**1a. `<Connect>` has no `action` URL, so Twilio's language errors are never seen.** An unsupported
`transcriptionProvider`/`speechModel` or `ttsProvider`/`voice` pair means ConversationRelay **does not connect to our
WebSocket** and ends the session with **error 64101**; an unsupported language/voice pair is **64106**. Twilio reports both
to the `<Connect>` `action` URL — which `ReceptionistConsent.Connect` does not set. Today, with one language and default
everything, nothing can produce them. The moment a second language or any explicit voice is set, a misconfiguration becomes
a caller hearing silence and an operator seeing a normal-looking call record. Set the `action` URL, log the error code
against the tenant, and treat 64101/64106 as a failed call rather than a completed one.

**1b. The dashboard cannot offer a language it is not told about.** `ReceptionistConfigController.Answered` returns a
`choices` block — `transferModes`, `transferCallerIdModes`, `consentModes` — so a page never carries its own copy of a list.
`language` is not in it. The PUT already accepts `Language` and the writer already refuses an unreviewed code, so the write
path is done and only the read path lies: a dashboard built today would have to hardcode the list and would drift from
GeekAPI the first time a language is added. Add `languages = ReceptionistLanguages.All` (code and English name, not the
wording) to `choices`.

**1c. No `voice` is set, and the default moves when the language does.** We set `ttsLanguage` and `transcriptionLanguage`
and leave `voice` unset, so each language gets Twilio's default voice for it. That is correct for one language and wrong for
several: Twilio's own documentation shows a switch from en-GB male to es-ES *"may result in a female voice"*, and the default
table bears it out — `da-DK` and `multi` share a voice ID, as do `bg-BG` and `ru-RU`. A business that picked a voice in
English and hears a different gender in Spanish was not asked. So `Language` gains a `Voice` member alongside its four
sentences, chosen per language rather than inherited, and it is set explicitly on the relay. **Note what this is not:** it is
not the "10+ voices and custom agent name" line on the launch list — that is a separate per-tenant choice, and it will have to
be expressed as *voice per language*, because a voice ID does not survive a language change.

## Stage 2: add Spanish — the mechanical change, once the wording exists

**It is `es-US`, never `es-ES`.** Twilio offers both with an ElevenLabs voice and Deepgram `nova-3-general`, so it is a free
choice, and the census decides it: of 69.98M Hispanic or Latino people (ACS 2025, Table B03001) **56.9% are of Mexican
origin and 1.5% are Spaniards**. Castilian — *vosotros*, *distinción* — is the one variety the US market does not call for.
This is already recorded in `ReceptionistLanguages`' own doc comment, because that is the file someone opens to do this.

The change, in full:

1. `GeekAPI/Services/Receptionist/Relay/ReceptionistLanguages.cs` — one `Language` entry with the four reviewed sentences
   and (after 1c) its voice; add it to `ByCode`, `All` and `Codes`.
2. `GeekApplication/Models/Voice/VoiceRecords.cs` — add `"es-US"` to `VoiceLanguages.All`, so GeekRepository validates it.
3. `src/lib/receptionist/languages.ts` — add `{ code: "es-US", name: "Spanish (United States)" }`.
4. Tests: the existing drift test binds `VoiceLanguages.All` to `ReceptionistLanguages.Codes` and will fail on step 1 without
   step 2, which is the point. Add the Spanish wording assertions the way the English ones are asserted — verbatim, so a
   reviewed sentence cannot be edited without a test saying so.

No migration. `0085` added the column with no CHECK constraint deliberately: two lists drifting is how the last format
migration broke, and the one list that governs is the code's.

**Deliberately not in this stage:** nothing decides that a tenant gets Spanish. Adding it to the registry makes it
*offerable*. Stage 3 is what offers it.

## Stage 3: the owner chooses — and the question is Jeff's

`src/lib/receptionist/languages.ts` says there is deliberately no signup step yet, because a step whose only option is the one
already stored asks a visitor to confirm something they cannot change. **That reasoning expires the moment Stage 2 lands.**

Two places, and they are not the same question:

- **Signup.** The seventeenth setting, shown with the other receptionist questions, before PayPal. Proposed wording sits in
  `signup-form-questions.md` as the language section; it is a proposal and Jeff changes, reorders or throws it out. The
  mechanics are the same as every other step: `ReceptionistConfigAnswers.Language` already exists and
  `ApplyDuringSignupAsync` already writes it.
- **Dashboard.** An owner changing it afterwards. The PUT exists; what is missing is a section like `consent-section.tsx`,
  reading `choices.languages` from Stage 1b and showing `describeLanguageFailure` on a refusal. The failure text is already
  written.

**What changes about the call when they change it:** everything a caller hears, including the recording notice. That is worth
saying on the page, because an owner who thinks they are picking an accent is picking the language of a legal disclosure.

## Stage 4: how a caller reaches their own language — the decision this plan cannot make

Stages 1–3 give a tenant **one** language. A business in Miami may want to serve English and Spanish callers on the same
number, and there are exactly three ways, with different costs and different failure modes. **This is a question about how a
business's customers are greeted, so it is a form question for Jeff and not a default.** Set out so it can be answered:

| Option | What the caller does | What it costs us | What it costs the caller |
|---|---|---|---|
| **One language per number** | nothing — the business picked | nothing; built after Stage 3 | an English caller to a Spanish line is stuck |
| **Keypad branch** | "para español, oprima dos" before the consent gate | a second `<Gather>` branch; both prompts must be reviewed in both languages | one keypress, and a bilingual opening every caller hears |
| **`multi` auto-detection** | nothing — Twilio detects per utterance | **forces `Deepgram` + `ElevenLabs`**, has **no failover backup at all**, and reports only the primary tag (`"en"`, not `"en-US"`) | nothing, when it works |

The trap in the third is the one worth stating plainly: `multi` detects the *conversation's* language, and the consent
disclosure is spoken **before** anyone has said anything. So auto-detection cannot choose the language of the disclosure —
only of what follows it — and that is the exact arrangement Jeff already rejected: *"Thats lame, and one could claim one
didn't understand."* If `multi` is ever used, the gate still has to be answered some other way, which collapses it back into
option 2 with extra moving parts.

Option 2 is the only one that serves two languages with both disclosures intact. It needs the bilingual opening reviewed as
its own piece of wording, not assembled from two existing ones.

## Stage 5: beyond Spanish, if the numbers say so

From ACS 2025 Table B16001, ranked by people who **cannot conduct a call in English** (27.4M total):

**Spanish alone covers 63%. Seven languages cover 80%. Ten cover 84%, and the curve is flat after that** — so "twenty
languages" is a marketing number, not a product requirement. After Spanish the seven are Chinese, Vietnamese, Korean,
Tagalog, Arabic and Haitian Creole.

Three of those are not a simple registry entry and should not be costed as one:

- **Chinese is two languages.** Mandarin and Cantonese are not mutually intelligible in speech, and **2.1M people reported
  only "Chinese"**, so the variety cannot be inferred — it has to be detected or asked at the start of the call.
- **Haitian Creole is not French** (`hat` belongs to no macrolanguage), the markets barely overlap, and its LEP rate is nearly
  double French's. For a South Florida product it outranks French decisively — **FL 461,611, 4.73% of the Miami metro**.
- **Arabic has no spoken standard.** Of 1.3M speakers, **1,257,000 said "Arabic" and exactly 373 said "Standard Arabic."** A
  receptionist speaking MSA sounds like a newsreader, and MSA recognition performs poorly on dialectal speech.

Each added language is four reviewed sentences plus one voice decision. The marginal engineering is near zero by design; the
marginal cost is translation review, and that is the number to decide on.

## What is deliberately not here

- **No machine translation anywhere, at any hop.** There is nowhere in the type to put one, and that is the design.
- **No mid-call language switching.** Twilio supports it (`{"type":"language",...}`), it is more capable than this product
  needs, and a language added mid-call gets **no defaults filled in** — every part must be sent in full. Not now.
- **No per-language pricing.** No published Twilio rate has a language dimension: ConversationRelay is $0.07/min flat. If a
  language ever costs more it will be because its only available voice is in a dearer tier, which is a voice decision.
- **SSML `<phoneme>` is not an option outside English** — it works only on `en-US` and not at all on ElevenLabs v3/v4. So
  "make it pronounce our business name right" has no tool in Spanish, and nobody should promise one.

## Order

1. Stage 1a, 1b, 1c — independent of any language, and each closes a silent failure.
2. Jeff procures the four Spanish sentences.
3. Stage 2 — one entry in three files plus tests.
4. Stage 3 — the form step and the dashboard section, from Jeff's wording.
5. Stage 4 — only once he has answered how a caller picks.
6. Stage 5 — language by language, each on its own decision.

## Verification, at each stage

GeekBackend's suite is green at 4,730 and the drift test fails loudly if the two code lists part. The portal is green at 98.
Neither number is the test that matters here: **the test that matters is that a call placed to a tenant set to a language
with no reviewed wording never reaches a caller**, and that is already asserted at the writer, the prompt build and
`Find`. Stage 1a adds the only path not yet covered — Twilio refusing the session before our WebSocket opens.
