# Plan: implementing languages, so the page can say it

Jeff, 2026-11-20: *"Create a plan to implement languages"*, then the correction this document was rewritten under:
***"I told you languages is for marketing & can't say and not do."***

**What this is for: the sales page sells a receptionist that speaks the caller's language, so a caller who speaks that
language has to get it.** Not a setting an owner could turn on. The claim is made to the caller, so the capability has to
reach the caller, and that single sentence reorders everything below.

The first version of this plan got that backwards. It staged the owner's language setting first and *how a caller reaches
their own language* last, as an open question — which would have left the page's claim unsupported for as long as it took to
answer. That is the say-and-not-do, built into a plan. The ordering here is the correction.

Research behind it, not repeated: `multilingual-receptionist.md` (Twilio's real limits, the census, the dialect decisions)
and `multilingual-language-access-law.md`.

## The claim is the specification

**`src/components/home/what-ai-receptionist-does.tsx:143` says "Speaks 20+ Languages".** The product speaks one, `en-US`.

That is the gap this plan closes, and it is the thing to plan *from*. Everything below is scoped by what the page says,
rather than the page being written later to describe whatever got built.

**The good news is the window is open.** The site is `noindex, nofollow` by default, there are no customers, and the card is
in an uncommitted working copy. Nothing has been published to anybody. So this is a draft claim to be made true before
launch, not a live misrepresentation to be withdrawn — provided it is true *before* `ALLOW_INDEXING` is set.

**The rule that follows, and it is a release gate rather than an opinion:** the number on that card may not exceed the number
of languages in `ReceptionistLanguages`. One list is the marketing claim, the other is the registry, and the registry is the
one that answers a phone.

### Advertising it is what creates the duty

Worth knowing, because it is the legal shape of "can't say and not do". The multi-state sweep found **no US law requiring a
private business to answer its phone in a non-English language** — so every language here is a product decision.

But advertising the capability is a different act from having it. NYC's debt-collection rule defines language access services
to include *"a service that interprets phone conversations in real time"* (6 RCNY § 5-77), so **advertising multilingual
calling can make it an enforceable representation** for a tenant collecting there. And generally, a capability advertised and
not delivered is a deceptive-advertising question under the FTC Act and state UDAP statutes — for us about our tenants, and
for our tenants about their callers. The claim does not merely describe the product; it creates an obligation that the
product did not otherwise have.

## What the claim costs, and it is not engineering

The engineering shipped on 2026-11-20. `receptionist_configs.language` stores a code, `ReceptionistLanguages` holds **every
sentence a caller hears** in each language, both relay halves and the `<Say>` consent gate read from it, and a code with no
reviewed wording is refused everywhere with no fallback to English. **Adding a language is one entry in three files plus
tests.**

So the bill for "20+" is wording, and it is four sentences per language:

| Slot | What it is | Who signs it off |
|---|---|---|
| `Disclosure` | the welcome greeting on a passive-disclosure call | **counsel** — it is the recording notice under Fla. Stat. 934.03 |
| `Consent` | `<Say>` inside `<Gather>` on a strict-keypress call | **counsel** — same, plus it instructs a keypress that must be unambiguous |
| `Unanswered` | spoken when the call cannot be taken at all | a competent translator |
| `Failure` | sent when the model fails mid-call | a competent translator |

**Twenty languages is 40 counsel-reviewed legal sentences and 40 translated operational ones.** That is the real number
behind the card, and it is the only part of this that cannot be engineered away — by design, because it is the rule that
makes a machine translation of a consent disclosure impossible to ship.

**What the census says about the number itself**, so the bill is paid deliberately: of 27.4M people in the US who cannot
conduct a call in English, **Spanish alone is 63%**, **seven languages are 80%**, and **ten are 84%** — the curve is flat
after that. Twenty is a marketing number, not a coverage requirement. Whether to pay for twenty, ten or seven is Jeff's, and
the page is written to whichever is paid for. Twilio is not the constraint either way: its default-voice table carries 36
locales plus `multi`, all speakable and transcribable.

## Stage 1: how a caller reaches their own language — first, because the claim is made to them

A tenant-level setting does not support the card. A Spanish-speaking caller who dials a business whose owner picked English
hears English, and the page promised otherwise. So the caller-facing mechanism is the deliverable, and there are three ways:

| Option | What the caller does | Serves two languages on one number? |
|---|---|---|
| One language per number | nothing — the business chose | **No.** Supports "available in 20+", never "speaks to your caller" |
| **Keypad branch** | "para español, oprima dos" before the consent gate | **Yes**, with both disclosures intact |
| `multi` auto-detection | nothing — Twilio detects per utterance | **Not on its own** — see below |

**`multi` cannot carry the disclosure, which is what rules it out as the whole answer.** It detects the language of the
conversation, and the consent disclosure is spoken *before the caller has said anything*. So auto-detection can choose the
language of what follows the gate but never of the gate itself — which is precisely the arrangement Jeff rejected: *"Thats
lame, and one could claim one didn't understand."* It also forces `Deepgram` + `ElevenLabs`, has **no failover backup at
all**, and reports only a primary tag (`"en"`, not `"en-US"`).

**So the build is the keypad branch**, and `multi` is at most an addition after the gate, never a replacement for it. What it
needs that no existing wording covers: **the bilingual opening is its own reviewed sentence**, not two existing ones played
back to back — it is the first thing every caller hears, in every language the tenant offers, and at three or more languages
it is a menu that has to stay short enough to listen to. That is a wording decision with a product limit inside it, and it is
worth knowing before the number on the card is chosen: **twenty languages do not fit in one spoken menu.**

That last point is the one place the claim and the mechanism genuinely collide, and it resolves cleanly: a *tenant* offers
the two or three languages its callers speak, chosen at signup; the *product* offers twenty to choose from. The card can
truthfully say the receptionist speaks 20+ languages once twenty are reviewed and any tenant can pick from them. It cannot
say every caller to every line is understood in twenty.

## Stage 2: three holes that make a second language fail quietly

Independent of which language comes next, and each is invisible today only because there is one language and no explicit
voice. All three land before a second language does.

**2a. `<Connect>` has no `action` URL, so Twilio's language errors are never seen.** An unsupported
`transcriptionProvider`/`speechModel` or `ttsProvider`/`voice` pair means ConversationRelay **never connects to our
WebSocket** and ends with **error 64101**; a bad language/voice pair is **64106**. Both are reported to the `<Connect>`
`action` URL, which `ReceptionistConsent.Connect` does not set. Today nothing can produce them. The moment a second language
exists, a misconfiguration is a caller hearing silence and an operator seeing a normal call record.

**2b. The dashboard cannot offer a language it is not told about.** `ReceptionistConfigController.Answered` returns a
`choices` block — `transferModes`, `transferCallerIdModes`, `consentModes` — and `language` is not in it. The PUT already
accepts `Language` and the writer already refuses an unreviewed code, so only the read path lies. Add
`languages = ReceptionistLanguages.All` (code and English name, not the wording).

**2c. No `voice` is set, so the default moves when the language does.** Twilio's own documentation shows a switch from en-GB
male to es-ES *"may result in a female voice"*, and the default table bears it out — `da-DK` and `multi` share a voice ID, as
do `bg-BG` and `ru-RU`. A business that picked a voice in English and hears a different gender in Spanish was never asked.
`Language` gains a `Voice` member alongside its sentences. Note this is not the "10+ voices and custom agent name" launch
item — that is a per-tenant choice, and it will have to be expressed as *voice per language*, because a voice ID does not
survive a language change.

## Stage 3: Spanish, and it is the one that moves the number most

**It is `es-US`, never `es-ES`.** Twilio offers both with an ElevenLabs voice and Deepgram `nova-3-general`, so it is free to
choose, and the census decides: of 69.98M Hispanic or Latino people (ACS 2025, Table B03001) **56.9% are of Mexican origin
and 1.5% are Spaniards**. Castilian — *vosotros*, *distinción* — is the one variety the US market does not call for.

The change in full, once the four sentences exist:

1. `ReceptionistLanguages.cs` — one `Language` entry with the reviewed sentences and its voice; add to `ByCode`, `All`, `Codes`.
2. `VoiceRecords.cs` — add `"es-US"` to `VoiceLanguages.All`, so GeekRepository validates it.
3. `src/lib/receptionist/languages.ts` — add `{ code: "es-US", name: "Spanish (United States)" }`.
4. Tests — the drift test fails on step 1 without step 2, which is the point; assert the Spanish wording verbatim the way the
   English is asserted, so reviewed text cannot be edited without a test objecting.

No migration: `0085` deliberately has no CHECK constraint, because two lists drifting is how the last format migration broke.

## Stage 4: the owner picks which of them their line offers

Now worth asking, and not before — `languages.ts` says so itself: a step whose only option is the one already stored asks a
visitor to confirm something they cannot change.

- **Signup**, with the other receptionist questions, before PayPal. `ReceptionistConfigAnswers.Language` and
  `ApplyDuringSignupAsync` already carry it. With Stage 1 built the question is no longer "which language" but "which
  languages", and that wording is Jeff's.
- **Dashboard**, a section like `consent-section.tsx`, reading `choices.languages` from 2b and showing
  `describeLanguageFailure` on refusal. That failure text is already written.

Worth saying on both: changing this changes every word a caller hears, including the recording notice. An owner who thinks
they are picking an accent is picking the language of a legal disclosure.

## Stage 5: languages 3 to N, each on its own decision

After Spanish the seven that reach 80% are Chinese, Vietnamese, Korean, Tagalog, Arabic and Haitian Creole. Three are not a
simple registry entry and must not be costed as one:

- **Chinese is two languages.** Mandarin and Cantonese are not mutually intelligible in speech, and **2.1M people reported
  only "Chinese"** — the variety cannot be inferred, so it has to be asked in the Stage 1 menu.
- **Haitian Creole is not French** (`hat` belongs to no macrolanguage), the markets barely overlap, and its LEP rate is nearly
  double French's. For a South Florida product it outranks French decisively: **FL 461,611, 4.73% of the Miami metro**.
- **Arabic has no spoken standard.** Of 1.3M speakers, **1,257,000 said "Arabic" and exactly 373 said "Standard Arabic."** A
  receptionist speaking MSA sounds like a newsreader, and MSA recognition performs poorly on dialectal speech.

## The acceptance test, which is also the release gate

**A caller who speaks language X dials a tenant offering X and is disclosed to, consented from, and conversed with entirely
in X.** Until that passes for a language, the language is not offered. Until it passes for N languages, the card does not say
N, and `ALLOW_INDEXING` does not go on with a number the registry cannot back.

That is the whole of "can't say and not do", expressed as something that can be checked.

## Order

1. Jeff picks the number the card will carry, knowing it is 2 counsel-reviewed sentences per language.
2. Stage 2a–2c — three silent failures, independent of any language.
3. Stage 1 — the keypad branch and its bilingual opening. Before Spanish, because it decides what the opening wording is.
4. Procure the Spanish four, plus the opening.
5. Stage 3 — Spanish.
6. Stage 4 — the form step and the dashboard section, in Jeff's words.
7. Stage 5 — language by language, until the registry matches the card.

## What is deliberately not here

- **No machine translation at any hop.** There is nowhere in the type to put one, and that is the design.
- **No mid-call language switching.** Twilio supports it; a language added mid-call gets **no defaults filled in**, so every
  part must be sent in full. Not needed for a keypad branch chosen before the call starts.
- **No per-language pricing.** ConversationRelay is $0.07/min flat with no language dimension on any published page. If a
  language ever costs more it is because its only voice sits in a dearer tier — a voice decision, not a language one.
- **No `<phoneme>` outside English.** It works only on `en-US`, and not at all on ElevenLabs v3/v4 — so "make it pronounce
  our business name right" has no tool in Spanish, and nobody should promise one.
