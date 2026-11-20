# Speaking more than one language

Jeff, 2026-11-20: *"From a marketing standpoint i need to incorporate different laguages, do deep research on everything one
would want to know about adding 20 or so different languages."*

Research. Nothing here is approved and nothing is built. The sections below are being filled as each piece is verified; this
one is the part that could be checked directly, by reading our own code.

## Where we are today: one language, and nobody chose it

`ReceptionistConsent.Connect` builds `new ConversationRelay(url: relayUrl, welcomeGreeting: greeting)` and sets nothing else.
No `language`, `ttsLanguage`, `transcriptionLanguage`, `voice` or `ttsProvider` ever reaches Twilio, so every call runs on
ConversationRelay's default. `VoiceReceptionistConfig` has no language field — zero occurrences of the word — so there is
nothing for an owner to set, nothing for the form to ask, and nothing for the relay to read. The same is true of the voice,
while "10+ voices and custom agent name" sits on the approved launch list.

It is the **seventeenth setting**, and it is a client question like the other sixteen: a business in Hialeah may want Spanish
first, a business in Boston may not want the option at all. That is not ours to answer.

## What in our own code is English, and which kind of English it is

This distinction decides most of the work. Some of these strings are spoken to a caller; others are instructions to the
model. Only the first kind has to be translated — a model can be told in English to conduct the call in Spanish.

### Spoken to the caller, hardcoded, English

| String | Where | How it is spoken |
|---|---|---|
| `DisclosureText(business)` | `ReceptionistConsent.cs:30` | ConversationRelay's `welcomeGreeting`, passed at `TenantCallController.cs:119`. Every passive-disclosure call opens with it |
| `ConsentText(business)` | `ReceptionistConsent.cs:34` | Twilio `<Say>` inside `<Gather>` — a different TTS path from ConversationRelay |
| `UnansweredText(business)` | `CallTwiml.cs:30` | `<Say>` |
| `FailureWithoutTransfer` | `ReceptionistRelaySession.cs:46` | Sent over the WebSocket mid-call when the model fails |

### Instructions to the model, English, and fine that way

The whole of `SystemPrompt`'s scaffolding (`ReceptionistConsent.cs:78-130`) — the greeting echo, the opening-hours block, the
never-guess rule, the qualifying-questions preamble — plus `KnowledgeToolbox`'s refusal strings (`:118-121`, which read
"Take a message instead of answering" and are addressed to the model, not the caller) and `LlmReceptionistModel`'s tool
descriptions. These stay English. What they need is one added instruction naming the language the call is to be conducted in.

### Already in whatever language the owner typed

The greeting, the qualifying questions, the five knowledge fields behind `PromptFrom`, and the business-hours notes are all
owner-supplied free text. A Spanish-speaking owner can already type Spanish into them today, and the model would broadly
follow. Nothing validates them as English and nothing should start.

## The finding that costs the most, and it is not a technical one

**The two consent strings are legally reviewed wording, so each new language is a new legal review — not a new string.**

`ReceptionistConsent`'s own documentation says the wording is *"the plan's passive disclosure, word for word"* and
*"Jeff's approved wording, word for word"*, and the class comment records that *"the plan notes the final wording is subject
to Florida counsel's review under Fla. Stat. 934.03."* That is a one-party-consent recording statute, and the disclosure is
what the product relies on.

So a Spanish call cannot simply be given a machine translation of the English disclosure. What is said to a Spanish-speaking
caller about recording and retention is the same legal act as what is said to an English-speaking one, and if it is wrong in
Spanish it is wrong in the way that matters. Twenty languages means twenty of these reviewed, and the review is counsel's
time, not ours.

That reframes the whole exercise: **the engineering is a config value and one prompt line; the cost is legal translation of
two sentences, times twenty.** A plan that budgets for the first and not the second has the proportions backwards.

**An intermediate was proposed here and is withdrawn.** It read: ship the conversation in many languages while keeping the
consent gate in English until each language's wording is reviewed. Jeff, 2026-11-20: *"Thats lame, and one could claim one
didn't understand."* He is right, and the objection is fatal rather than aesthetic. Consent that was not understood is not
consent, and a disclosure spoken in a language the caller does not speak is **worse** than none: it leaves a record that
looks like a disclosure and would not survive the caller saying "I did not understand it." The proposal kept the mechanism
and discarded the only thing the mechanism exists for.

So the legal translation is not deferrable and not engineerable around. **A language we offer is a language whose disclosure
has been reviewed in that language.** Twenty languages is twenty reviewed disclosures, up front, and that is the honest price
of the marketing claim.

### What the objection forces, which is an ordering problem

If the disclosure must be understood, it must be in the caller's language. But today it is the **first thing on the call** —
`DisclosureText` is passed as ConversationRelay's `welcomeGreeting` (`TenantCallController.cs:119`), spoken before the caller
has said a word. There is nothing to detect a language from yet. That is the real design constraint, and it was invisible
while the intermediate was on the table.

The ways out, none of them chosen here:

1. **The tenant picks.** One language per receptionist, set in the form. A bilingual business buys a second number or we
   support a per-number language. Simplest, no detection, and the disclosure is always the reviewed one.
2. **A language menu before the disclosure.** *"For English press 1. Para español, oprima 2."* Then the reviewed disclosure
   in that language. The mechanism already exists — `strict_keypress` mode runs a `<Gather>` today — but it puts a keypress
   in front of every caller, which is a decision about how a business greets its customers and therefore Jeff's.
3. **A bilingual disclosure.** Both languages spoken up front. Works for two, not for twenty, and doubles the opening.
4. **Detect, then disclose.** A neutral opening, detect the language from the caller's first words, then the reviewed
   disclosure. Requires live detection — whether ConversationRelay's `multi` code does this, and how reliably, is one of the
   things still out for verification — and it means the caller speaks before being disclosed to, which may itself be the
   problem being solved.

Option 1 costs nothing to decide and is the tenant's call, which is where this product puts such questions anyway. It is also
the one that makes the per-language legal review arrive incrementally — a language is reviewed before it is offered, and no
tenant can select one that has not been.

## Two language settings, not one

Worth knowing before anything is designed: the consent gate and the conversation are different Twilio features with separate
TTS.

- `ConsentText` goes through `<Say>` inside `<Gather>`, which has its own `language` and `voice` attributes.
- `DisclosureText` and everything after it go through `<ConversationRelay>`, with its own language attributes.

Set one and not the other and a call greets in Spanish then converses in English, or the reverse. They have to be set from
the same stored value.

## What Twilio actually supports (Twilio docs, read 2026-11-20)

**There is no "supported languages" page.** Confirmed against Twilio's own sitemap. What exists is a default-voice table, and it is
explicitly only "the languages that have [defaults]" — `ca-ES` is documented elsewhere as a usable session language while being absent
from it. So **the complete set of accepted language codes is not published**, which matters: we cannot build a list of 20 from Twilio's
documentation alone.

**The default-voice table: `multi` plus 36 locales**, each with both a TTS voice and a transcription provider, so all 36 are speakable
*and* transcribable out of the box. Default TTS provider is ElevenLabs (30 of 36; Google for kn-IN, ml-IN, mr-IN, pt-PT, te-IN, th-TH);
default STT is Deepgram (31 of 36; Google for kn-IN, ml-IN, mr-IN, ta-IN, te-IN).

The 36: `bg-BG cs-CZ da-DK de-DE en-AU en-GB en-IN en-US es-ES es-US fi-FI fr-CA fr-FR hi-IN hu-HU id-ID it-IT ja-JP kn-IN ko-KR ml-IN
mr-IN nl-BE nl-NL pl-PL pt-BR pt-PT ro-RO ru-RU sv-SE ta-IN te-IN th-TH tr-TR uk-UA vi-VN`.

**Spanish is covered twice and well** — `es-US` and `es-ES` both have ElevenLabs voices and Deepgram `nova-3-general`. For a US
product that is the one that matters.

### The attributes, and what unset means

| Attribute | Default | Note |
|---|---|---|
| `language` | **`en-US`** | Sets `ttsLanguage` and `transcriptionLanguage` together. **This is the answer to what we were running on.** |
| `ttsLanguage` / `transcriptionLanguage` | fall back to `language` | Independent and overridable; we now set both explicitly |
| `ttsProvider` | `ElevenLabs` | choices `Google`, `Amazon`, `ElevenLabs` |
| `transcriptionProvider` | `Deepgram` — **or `Google` for accounts that used ConversationRelay before 12 September 2025** | worth checking which side this account falls on |
| `voice` | the language's default, else `UgBBYS2sOqTuMpoF3BR0` | |

**Invalid combinations fail closed and loudly**: an unsupported `transcriptionProvider`/`speechModel` or `ttsProvider`/`voice` pair means
ConversationRelay *does not connect to our WebSocket* and the session ends with **error 64101**, reported to the `<Connect>` `action`
URL — which we do not set. An unsupported language/voice pair is **64106**.

### `multi` is real detection, and it costs us the provider choice

Two independent things under one code. **STT side:** Twilio detects the caller's language per utterance and puts it in `lang` on each
prompt message — *"`lang` will only include the primary language tag… for example `"lang"="en"` not `"lang"="en-US"`"*, so a `multi`
session cannot distinguish en-US from en-GB. **TTS side:** `multi` as the `lang` on a text token makes ElevenLabs detect the language
**from the text we send**, not from the caller.

The constraint, verbatim: *"Automatic language detection (`multi` mode) requires specific providers: `transcriptionProvider` must be
`Deepgram` for STT, and `ttsProvider` must be `ElevenLabs` for TTS. Using other providers with `multi` mode will result in an error and
end the ConversationRelay session."* And **`multi` has no failover backup at all** — requesting failover for it without naming a backup
rejects the call.

### Mid-call switching exists, and is more capable than we need

A `{"type":"language","ttsLanguage":…,"transcriptionLanguage":…}` message switches either or both — Twilio's own example *speaks Swedish
while recognising English*. It applies immediately: *"If the caller is speaking, recognition restarts and the caller's speech in progress
is discarded."* Updates are atomic, ten consecutive invalid messages close the connection, and a language added mid-call gets **no
defaults filled in** — every part (`ttsProvider`, `voice`, `transcriptionProvider`, `speechModel`) must be given in full.

### Three gotchas worth knowing before building further

1. **Declare every language in TwiML with its voice, or the voice changes gender across a switch.** Twilio's own example: switching
   en-GB male to es-ES *"may result in a female voice"*. The default table bears it out — `da-DK` and `multi` share a voice ID, as do
   `bg-BG` and `ru-RU`.
2. **The whole generative voice tier is Public Beta, including every ElevenLabs voice** — which is the default. *"The Twilio Service
   Level Agreement doesn't cover Public Beta products"*, and third-party voices *"might change without prior notice"*.
3. **SSML `<phoneme>` works only on `en-US`, and not at all on ElevenLabs v3/v4.** That is the obvious tool for making the AI pronounce
   a business's name correctly, and it does not exist outside English on the default provider.

## What it costs (vendor pricing pages, October 2026 stamp)

**ConversationRelay is $0.07/min, flat, with no language dimension on any published page** — identical on the US and UK pages. US
inbound local is $0.0085/min plus $1.15/mo per number. Sum of published line items: **$0.0785/min**, against our $0.50/min overage.

**No Twilio page prices anything by language.** Not TTS, not STT, not the relay. The answer to "does Spanish cost more than English" is
**no, not on any published rate.**

But two real exceptions, and they both land on our consent gate:

1. **Voice-tier availability differs by language, so the cheapest voice you can pick is dearer in some languages.** This bites the
   `<Say>` path — which is exactly where `ConsentText` is spoken. Free Basic voices exist for only a handful of locales (`fr-FR`,
   `de-DE`, `it-IT`, `es-MX`, `es-ES`, `es-US`); **Filipino (`fil-PH`) has only Neural voices**, so its floor is $0.0032/100 chars where
   English and Spanish have a free option.
2. **Per-character billing in 100-character blocks** means a more character-dense translation costs more at the same rate. Twilio
   publishes no per-language character counts.

**The biggest hole: no Twilio page says what the $0.07 actually covers** — whether TTS and STT are included or billed on top. That is
the difference between $0.0785/min and $0.0785 plus two unknowns. Also unpublished: any per-provider TTS or STT price through
ConversationRelay, whether ElevenLabs is a premium over Polly/Google, and whether `multi` costs more than a pinned language.

**One vendor does charge more for multilingual, but only bought direct:** Deepgram's own pricing is $0.0058/min multilingual Nova-3
streaming vs $0.0048 monolingual. Through ConversationRelay that is invisible to us because Twilio does not itemise it.

**The LLM side: no language price multiplier exists.** Anthropic's pricing page does acknowledge the mechanism — *"How many tokens the
same text produces depends on the model's tokenizer, the language, and the type of content"* — but publishes no per-language figure. The
commonly-quoted multipliers are blog material and are not reproduced here. The measurable route is `POST /v1/messages/count_tokens` run
against our own prompt and a real transcript per language. That is a test we can run, not research.

## What the competition actually sells, and it is not twenty

This is the finding most relevant to the marketing question, and it cuts against the premise.

**The receptionist products sell two languages. The developer platforms sell a big number.**

| Product | Claim, as they write it | Tier | Detection? |
|---|---|---|---|
| **Rosie** | **"English & Spanish on every call"** — and **no "N+ languages" claim exists anywhere on their site** | All three plans ($49/$149/$299), *"no extra cost"* | **Yes**, explicitly: *"Rosie recognises the caller's language and can easily continue the conversation in English or Spanish without confusion"* |
| Smith.ai | English + Spanish | AI: included. **Human: "Dedicated Spanish line — $1.00" per call** | *"automatically detects whether the caller is speaking English or Spanish"* — though **their own support article says the AI "will conduct all conversations in English"**, vendor docs against vendor marketing |
| Ruby | "Bilingual virtual receptionists" | *"included in all Ruby plans at no additional cost"* | No — humans, and the mechanism is a transfer (*"un momento, por favor"*) |
| Goodcall | Product pages say **English or Spanish**; their own SEO blog says **"20+ languages"** | — | Neither claimed on any product page |
| Retell | **"English, Spanish and 55+ languages at one per-minute rate, no bilingual surcharge"**, all 55 listed | $0.07–$0.31/min | Yes |
| Bland | *"Speaks the languages below"*, 26 named, no total | $0.12–$0.14/min | Yes, intra-utterance: *"start a sentence in English and finish it in Spanish"* |
| Synthflow | "40+" on one docs page, 33 listed on another | Annual enterprise only | Yes, with **unusually blunt caveats** |
| Vapi | **Zero language copy on the site**; numbers only in per-provider docs | $0–$29+/mo | Both, as a config flag |

**Three things follow for the marketing decision.**

1. **Rosie — the product we are priced against — ships two languages and markets them hard.** Matching Rosie means Spanish, not twenty.
   Twenty would be competing with Retell and Bland, who are developer platforms at $0.07–$0.31/min, not $49/month receptionists.
2. **Retell attacks the surcharge directly and names the practice**: traditional services offer *"Usually English, with Spanish as a paid
   add-on."* Smith.ai's published **$1.00/call Spanish line** is exactly that practice. Including Spanish at no extra cost is a real
   differentiator against the human services, and merely table stakes against Rosie.
3. **Synthflow's own docs warn against the thing a big number implies.** Their multilingual pipeline *"is less accurate per language than
   single-language models"*; *"Don't rely on auto-detect to separate close variants"* — a Cantonese+Mandarin agent *"will mix them up
   frequently no matter which voice or ASR provider you pick"* — and they advise **"one agent per language and route callers to the right
   one."** That is a competitor telling you that twenty languages on one number is worse than one language per number.

### What buyers say: no evidence found, and that is the honest answer

**Smith.ai's Trustpilot page — 4.2/5 across 377 reviews — does not mention Spanish, bilingual or language once.** The only match on the
page is Smith.ai's own company description. Reddit, G2 and Capterra all blocked automated reading (403 / blocked user agent), so this is
an absence of evidence rather than evidence of absence — but the one readable buyer corpus is silent on language.

Meanwhile searching the topic returns an almost unbroken wall of vendor SEO making a revenue argument ("a missed Spanish-speaking call is
a lost customer", citing 44.9M US Spanish speakers at home) — **made by sellers, to create the criterion.** The honest read:
**multilingual is a heavily-marketed comparison-table column, and no independent evidence was found that buyers rank or complain about
it.** That does not make it worthless — a column you lack is a column a competitor uses — but it argues for Spanish done properly over
twenty done thinly.

## Still being verified

US census data on which languages Americans actually speak at home, and with limited English proficiency, was sent for checking and has
not come back. That is the piece that would turn "twenty" from a round number into a ranked list, so it gets its own section when it
lands.

## What is now built

The seventeenth setting, implemented 2026-11-20 on Jeff's instruction — *"II WILL BE DESIGNED AND IMPLEMENTED"*:

- `receptionist_configs.language`, defaulting to `en-US` so no existing call changes.
- `ReceptionistLanguages` (GeekAPI), holding **every sentence a caller hears** per language rather than a list of locale codes — because
  two of those sentences are reviewed wording, so a language is offerable only once it has them. There is nowhere to put a machine
  translation.
- Both relay halves set explicitly (`ttsLanguage`, `transcriptionLanguage`), the `<Say>` consent gate carrying its own language, the
  closing message and the mid-call failure line all language-aware.
- A code with no reviewed wording is refused at every point it could be used — `language_not_offered` from the writer, a refused prompt
  build, and no path anywhere that falls back to English.
- Codes in GeekApplication (so the repository validates), words in GeekAPI (where callers are spoken to), and a test asserting the two
  lists are identical.

**Adding Spanish is now: two reviewed sentences, one entry in two files.** Nothing else. The engineering question is closed; what remains
is counsel's translation of the disclosure and the consent script, and Jeff's decision on which languages to pay for that in.
