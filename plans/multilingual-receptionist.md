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

An honest intermediate exists, and it is worth putting to Jeff rather than deciding: ship the *conversation* in many
languages while keeping the *consent gate* in the languages whose wording has been reviewed, starting with Spanish. A caller
who hears the disclosure in English and then speaks Spanish to the receptionist is still disclosed to; a caller who hears a
machine-translated legal sentence is in a worse position than either.

## Two language settings, not one

Worth knowing before anything is designed: the consent gate and the conversation are different Twilio features with separate
TTS.

- `ConsentText` goes through `<Say>` inside `<Gather>`, which has its own `language` and `voice` attributes.
- `DisclosureText` and everything after it go through `<ConversationRelay>`, with its own language attributes.

Set one and not the other and a call greets in Spanish then converses in English, or the reverse. They have to be set from
the same stored value.

## Still being verified

Four things were sent out for checking and are not yet back: ConversationRelay's actual language list and whether its `multi`
code does live detection; whether a non-English minute costs more than an English one; which twenty languages US census data
would actually choose; and what competitors advertise, Rosie in particular. Each gets its own section here when it lands,
with its sources.
