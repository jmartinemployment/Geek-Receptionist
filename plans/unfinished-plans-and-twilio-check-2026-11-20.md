# Unfinished plans, and what the Twilio check settled — 2026-11-20

Research from the "code unfinished plans" pass. Nothing here is a decision. It records what was read, what was built, and what is still open, so the next person does not redo the reading.

## 1. Where each plan stands

| Plan | Status | Why it stops |
|---|---|---|
| `implementing-languages.md` Stage 1 (caller reaches their own language, keypad branch) | Not built | The bilingual opening is a reviewed sentence and a wording decision, Jeff's |
| `implementing-languages.md` Stage 2 (three holes: 2a error action, 2b choices, 2c voice) | **2b built** (`b2601d4e`, GeekBackend). 2a and 2c open | 2a needs the Connect `action` parameter names confirmed (§2). 2c needs the en-US default voice confirmed (§2) |
| `implementing-languages.md` Stages 3–5 | Not started | Each follows Stage 1 and 2 |
| `implementing-outbound-calling.md` | Blocked before Stage 1 | The consent premise (47 CFR 64.1200(a)(1)) is unverified. The plan requires reading it from the FCC or Federal Register before code. The machine-answer behaviour is Jeff's |
| `connecting-client-systems.md` Stage 1–2 | Landed | — |
| `connecting-client-systems.md` Stage 3 (second provider) | Blocked | The Outlook route is under research (`c76ecfa`, `477b76a`). Which provider is a market decision |
| `connecting-client-systems.md` Stage 4 | Landed (`cb8ec518`) | — |
| `connecting-client-systems.md` Stage 5 (names) | Half done (`f3ad93d1`) | `CalendarToolbox` keeps its name until a second provider exists. A `calendar_not_connected` sibling for a CRM is still to add |
| `connecting-client-systems.md` Stage 6 (signup questions) | Not built | Wording is Jeff's |
| `signup-form-questions.md` | Not built | Sixteen settings, each a question for the client. Jeff gives form changes one at a time |
| `hardcoded-values-audit.md` §3 (backend B1–B10) | Open | B5 (stored settings nothing reads), B9 (ZDR columns on `call_logs`), B10 (overage rate in three places) need decisions or a migration review before code |
| `hardcoded-values-audit.md` §4 (portal M1–M8) | Open | M1 and M4 need a wording decision. M3 waits for one price schedule home |
| `client-settings-off-the-environment.md` | Partly landed | Appointments step left out pending Jeff's call (the `BookingEnabled` question) |

## 2. What the Twilio check settled, and what it did not

Source: `https://www.twilio.com/docs/voice/twiml/connect/conversationrelay`, read 2026-11-20. The page is about 109,000 characters. The fetch returned the first 100,000, so anything after that was not read.

**Settled from the page:**
- `<Connect>` `action` is "the URL that Twilio will request when the `<Connect>` verb ends". It takes the call information and ConversationRelay's return parameters.
- Error 64101 (invalid `transcriptionProvider`/`speechModel` or `ttsProvider`/`voice` pair) ends the session and is reported to the `<Connect>` `action` URL.
- The `voice` attribute's ElevenLabs default is listed as `UgBBYS2sOqTuMpoF3BR0`, with no per-language breakdown on the attribute row.

**Not settled:**
- **The error parameter names.** The example payload was cut off at `"CallStatus": "in-pro`. `ErrorCode` and `ErrorMessage` are assumed from the plan, not read. Do not code 2a against them until the example is read in full.
- **Whether the action URL also fires on a normal end.** The page does not say here whether a clean end is distinguishable from an error. Without that, a handler that speaks the closing message would play it after every ordinary call.
- **64106.** Not in the part read.
- **The en-US default voice.** The per-language default-voice table was in the unread 9,000 characters or was not reached. The plan's `UgBBYS2sOqTuMpoF3BR0` is the attribute default, not confirmed as en-US's default. Setting it explicitly could change how every current en-US call sounds.

**To settle these:** read the final 9,075 characters of the same page (`offset: 100000`), or the Twilio ConversationRelay error-code page. Then code 2a and 2c.

## 3. What was built, for reference

- `b2601d4e` (GeekBackend): `choices.languages` is offered on the owner's settings read, from `ReceptionistLanguages.All`, as code and English name. Test: `ReceptionistConfigTests` asserts the offered codes equal `ReceptionistLanguages.Codes`. 78 of 78 passed in a clean worktree at HEAD.
- `4099d378` (GeekBackend): `ApiKeyMiddleware` logs a development bearer that fails to decode, instead of silently refusing it. The nine test construction sites pass a `NullLogger`. Full suite: 4,752 of 4,752 passed.
