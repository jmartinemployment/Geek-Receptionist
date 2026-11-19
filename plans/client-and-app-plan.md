# Geek-Receptionist: how clients and the app work (plan for review)

Written 2026-11-19. Status: proposal for review. What is marked **Decided** is Jeff's and is not open to review. What is marked
**Proposed** is. Market evidence comes from `plans/ai-receptionist-research/README.md`: 52 products, read from the vendors' own
pages on 2026-11-19, with a source for every fact.

## For the reviewer

You are reviewing the plan for an AI phone receptionist sold by monthly subscription to US small businesses. Please:

1. Do not reopen anything marked **Decided** or listed in section 2. If you think one is wrong, say so in one line under
   "Risks" and do not build any other answer on changing it.
2. For each **Proposed** item: keep, change or drop, with one sentence why.
3. Name anything a small-business owner would expect that is missing, with a product that offers it today.
4. Name the risks: legal (call recording and AI disclosure across US states, texting rules), cost, abuse (for example the
   free browser test), and every place where the promise to keep no call content could be broken.
5. Mark every fact you add as checked (with its source) or unchecked.

Answer with one section per numbered point above, in bullets. Do not rewrite the plan.

## 1. The product

Geek-Receptionist answers a small business's phone with an AI receptionist that answers questions, takes messages, books
appointments and transfers calls. It is sold by Geek @ Your Spot LLC (Delray Beach, Florida). It is pre-launch, with no clients.

What sets it apart: it keeps no call recordings, transcripts or call content by default. In the research only IONOS keeps no
content by default; Juney, Reception.ai and Allo offer it on a higher plan or through support, and every other product
records by default (research 5.8, 5.9).

**Positioning:** "The AI receptionist that stores no call recordings or transcripts." A finished, no-code receptionist for small
businesses that answers, books and transfers, with no call content stored by default, consent before the AI engages, and an
exclusion of industries whose rules require call recordings to be kept. No small-business product in the market research offers
that by default; only Vapi does, and Vapi is a developer platform rather than an owner-ready product. RingCentral AIR is the
benchmark for the owner's feature set. Market research covers 52 products in
`plans/ai-receptionist-research/README.md`.

## 2. Fixed decisions (Jeff)

- **A product for client businesses.** Geek @ Your Spot is client number one, on the same signup, data and call path as every
  client. Its own line has no special code and no per-business settings in Railway variables (2026-11-19).
- **A neutral base template** that the client's own answers in the signup form fill in. No client starts with another
  business's script (2026-11-19).
- **US businesses only.** Eight yes-or-no excluded-industry questions: HIPAA as four (healthcare provider, health plan,
  healthcare clearinghouse, business associate), securities broker-dealer, investment adviser, commodity futures or
  derivatives, and Medicare Advantage or Part D third-party marketing. Every answer is kept forever, and a yes ends the signup.
- **No free trial and no starting credit.** Paid up front, monthly, through PayPal. Starter $30 for 90 minutes, Standard $48
  for 250, Pro $148 for 1,000, Premium $298 for 2,000; $0.50 a minute over; each call rounded up to the whole minute. Priced $1
  under Rosie with the same minutes. Do not recommend fewer minutes.
- **Keypad consent on every call** before the AI hears anything, word for word: "Thank you for calling [business]. You will be
  interacting with our AI receptionist. Your audio will be temporarily recorded and processed to provide this service, but we
  do not retain call recordings or transcripts. To consent and continue, press 1. To decline, press 2." Not optional.
- **Zero data retention by default.** We keep no recordings, transcripts or call content. We keep call metadata (times,
  duration, caller ID, call ID) for billing. A client who wants call content kept sends it to its own Amazon S3 or Google Cloud
  bucket (a later release). Never voicemail: a voicemail is a recording kept.
- **The receptionist always says it is an AI.**
- **Voice:** Twilio ConversationRelay. Calls stream over a WebSocket to our backend. The AI model sits behind an interface and
  is chosen by a setting (`LlmProviders__DefaultProvider`; unset is refused, never a default). Each provider must be confirmed
  for no training and no retention before any privacy claim is made.
- **A Twilio subaccount per tenant.** Geek @ Your Spot's own account is billing-exempt.
- **Call engine: Vapi-style agent squads (Jeff, 2026-11-17).** The session runs one agent at a time; each agent has one
  fixed system prompt and its own tool set and cannot use a tool it was not given. A silent handoff moves the live call to
  the next agent with no audio gap and the same voice; the previous agent's tool calls and results are dropped from the
  conversation. Up to four agent types: Receptionist (answers questions), Triage (routes), Booking (calendar), Support
  (transfer to a person). Modelled on Vapi's squads (docs.vapi.ai, read 2026-11-17). Semantic Kernel runs the tool loop;
  auto-invoke is off so our code decides what happens.
- **Model settings enforce ZDR on every call:** `store: false` and no `user` id on every OpenAI call. Semantic Kernel is
  given no logger because it logs chat content at Trace. OpenAI keeps what it is sent for up to 30 days unless Zero Data
  Retention is approved for the account; that approval (or a different provider) is required before any tenant moves to
  the new engine.
- **Calendars:** Google first (its connector is built), then Outlook, Apple iCloud, Calendly and Cal.com.
- **Texts** need each client's A2P 10DLC campaign approved. A caller gets a confirmation text only after replying YES.
- **No CRM** in this plan.
- **Launch list** (2026-11-18): answer 24/7 with the owner's greeting, hours and after-hours behaviour; keypad consent;
  booking; FAQs from the owner's answers and website; warm and cold transfer, waterfall transfer through the owner's numbers;
  keep the owner's number by call forwarding; a per-call summary email made in memory and not stored; text confirmation with a
  YES reply; email and text alerts for every call; 10+ voices and a custom name and greeting; messages emailed and never
  stored; a website chat widget answering from the same FAQ with chats not stored; Zapier.
- **Answered 2026-11-19 in this re-plan:**
  1. Build and test, then pay.
  2. Setup reads the client's website and Google listing; the owner checks every part; nothing is saved until accepted.
  3. The owner switches each ability on. The AI offers only abilities that are on and ready.
  4. The client chooses the type of connection: forward an existing number to the new number, or use the new number as the
     business's number.

## 3. Signup and setup, step by step

Steps 1 to 3 are built. Steps 4 to 9 are new. Steps 10 to 12 are built and move after setup.

1. **Robot check, and "Is the business in the United States?"** Built.
2. **The eight excluded-industry questions.** Built.
3. **Business details:** name, what the business does in the owner's words, state, contact email, business phone and the
   attestation. Built. **Proposed:** add the website address, the Google listing (optional) and the service area.
4. **Read the business (Decided).** We read the website and the Google listing and pre-fill services, hours, service area,
   prices the site states, and common questions and answers. The owner checks each part and accepts, edits or drops it.
   Nothing is saved until it is accepted (Beside: "Nothing is saved until you review and accept"). Where a site cannot be read,
   the owner types it (Newo warns "Some websites block automated reading"). **Proposed:** documents can also be uploaded, such as
   a menu or a price list; nearly every phone system in the research allows 5 to 10 MB.
5. **Identity.** **Proposed:** the receptionist's name, its voice (from ConversationRelay's standard voices) and its greeting,
   which the base template suggests with the business's name and the owner may edit. It always says it is an AI.
6. **Abilities (Decided: the owner switches each on; the AI is told only of abilities that are on and ready).**
   - **Answer questions:** always on. It answers only from the facts the owner accepted.
   - **Take messages:** needs an email address. The message is emailed and never stored.
   - **Book appointments:** needs Google Calendar connected and a calendar chosen. **Proposed:** setup asks for the appointment
     types and their length, the days and hours that can be booked (business hours by default), the notice needed and how far
     ahead, a buffer between appointments, and what to collect from the caller. The AI offers only times the calendar shows
     free (as Dapta does) and never says a booking is made until the calendar has accepted it (Voksha "never claims an
     appointment it did not make"). A booking that fails becomes a message, never a promise.
   - **Transfer to a person:** needs one or more numbers. **Proposed:** setup asks when to transfer (the caller asks, emergency
     words, chosen topics), warm or cold, the order of numbers for waterfall transfer, and what happens when nobody answers: a
     message, never voicemail.
   - **Text the caller a confirmation:** only once the client's A2P campaign is approved, and only after the caller replies YES.
     Email confirmation until then.
7. **Rules. Proposed,** taken from the market's best:
   - What the receptionist must never say or do, a short list the owner writes (Phonely, Allo, Reception.ai's "Strict rules",
     SkipCalls).
   - Prices only from what the owner accepted; otherwise "the owner will confirm" (Juney, Newo, Marlie, Lindy, LobbyStack).
   - Callers outside the service area are told so (Avoca, Housecall Pro, Podium).
   - A question it cannot answer becomes a message when messages are on (Juney, Lindy, Reception.ai). Otherwise it says it
     does not know.
   - A checklist of what to collect on every call, such as name, phone and reason (Allo, SkipCalls, Juney, Marlie, Phonely,
     RingCentral, GoTo, CallRail, Voksha, Smith.ai).
   - Voksha's two prompts: "what you do not do" and "the two questions everyone asks".
8. **Which calls the AI answers. Proposed, open for Jeff:** every call; or ring the owner's phone first for a set number of
   seconds and answer only the calls the owner misses (Juney, Reception.ai, SkipCalls, Allo, LobbyStack, Beside, Goodcall); or
   after hours only (Voksha suggests starting after hours). It is the same choice Geek @ Your Spot's own line has today.
9. **A test call in the browser (Decided: before payment).** The owner talks to the receptionist from the browser, through the
   same consent step and AI as a real call. Nothing is stored. **Proposed:** a fixed allowance, for example three calls of up to
   three minutes, so it cannot become free use (free tests: Upfirst, IONOS, Voksha with two per agent, Dapta). Not checked: how a
   browser call reaches Twilio. Twilio's Voice JavaScript SDK is to be read before building.
10. **Plan and PayPal.** Built; moves here.
11. **The number is bought in the client's area code and answers at once (Decided). The client chooses the type of
    connection (Decided):**
    - **Forward an existing number** to the new number. **Proposed:** forwarding instructions for the owner's own phone company
      on screen (Juney, IONOS, Reception.ai, Newo; LobbyStack covers 51 carriers; My AI Front Desk gives a QR code); the first
      forwarded call is detected and shown as connected (LobbyStack, Juney); and a warning about forwarding loops (Jobber,
      Housecall Pro, Slang).
    - **Use the new number** as the business's number. Nothing to forward. (Housecall Pro tells owners its number "should not
      be used in any marketing"; ours is meant to be usable either way.)
    - Porting an existing number in comes later.
12. **Owner login.** Built.

**Proposed, after launch: a setup assistant.** Many products let the owner change setup by chatting with an AI that proposes
each change for the owner to approve (Goodcall, Beside, My AI Front Desk, IONOS, Marlie "You approve each change", Aircall's
assistant "never publishes by itself").

## 4. How a call works

1. The caller dials the client's number, or the client's own number forwarded to it.
2. We check the client's standing (paid up) and which calls the AI takes (step 8).
3. Keypad consent, word for word. No key, or 2: the closing message.
4. ConversationRelay connects the AI. Its instructions are built for this client on every call from five parts only: the base
   template, the facts the owner accepted, the abilities that are on and ready, the rules, and the collection checklist.
   The session runs one agent at a time (Receptionist in Phase 1; Triage, Booking and Support in later phases).
5. The AI may request a tool only for an ability that is on and ready. Our loop decides whether to run it; at most four
   tool rounds per caller turn. A tool that cannot complete tells the agent it failed; the agent never invents a result.
   A booking whose outcome is unknown is recorded as unknown — never a promise and never silently retried.
6. **A silent handoff:** the model calls a handoff function to move the call to the next agent. In one step that cannot be
   interrupted, the conversation is rebuilt for the new agent; the previous agent's tool calls and results are dropped.
   Nothing is spoken. The new agent answers the caller's last words in the same voice.
7. **Interruption:** if the caller talks over the speech, the reply in flight is cancelled and the conversation keeps only
   what was actually heard. A handoff already completed stands; one not yet completed is abandoned and the current agent
   takes the caller's words.
8. **Open for Jeff:** what the caller hears if the AI fails partway (model or network). Options: ring a person, play a
   short message, or both. Never silence and never voicemail.
9. When the call ends, the per-call email is built in memory and sent, and nothing of the call is kept. Twilio's status
   report records the time, length and billable minutes.

## 5. After the call

- **The per-call email (Decided).** What the call was about, the caller's details and message, any booking, any transfer.
  Built in memory, never stored. **Proposed:** the owner chooses every call or only calls that need action (Avoca, Slang,
  CallRail, Jobber, Upfirst, My AI Front Desk, Smith.ai, Juney and Reception.ai filter their alerts).
- **A text alert to the owner for every call (Decided).** It needs our own A2P campaign amended.
- **Proposed: questions it could not answer** go in that call's email with an "add an answer" link to the setup page. The
  knowledge grows and we keep nothing. Reception.ai, LobbyStack, RingCentral, Aircall, Tidio and BotPenguin keep a stored list
  instead.
- **Proposed: a daily or weekly recap** built only from call metadata: number of calls, minutes used, bookings made. Never
  content (Beside, Dialzara, Smith.ai, Juney, SkipCalls and IONOS send recaps). Whether "booking made" may be kept with a call's
  metadata is for Jeff.
- **Zapier (Decided).** At the end of each call the same details as the email go to the owner's own Zap. We store nothing.
- **Booked appointments live only in the owner's calendar.** Today `geek_voice.appointments` has columns for the caller's name,
  phone, email, address and issue. **Proposed:** drop them and keep only the calendar event's id and time, or nothing.

## 6. The owner's dashboard

Today it shows billing and the Google Calendar connection, and nothing else. **Proposed:**
- Every setup page from section 3, editable, with a test call before saving. Changes apply on save (Dialzara and Smith.ai
  apply at once; Rosie needs Publish; Goodcall has rollback).
- The phone number and whether forwarding is working.
- Usage: minutes used this month, with emails at 50, 75 and 100 percent (My AI Front Desk), and an optional monthly spending
  cap after which calls ring the owner instead (SkipCalls has a spending limit, Echowin a cap; LobbyStack forwards to a number
  when the allowance runs out). Otherwise overage at $0.50 a minute.
- Call history from metadata only: time, length, minutes billed. No content.
- Billing (built). An exempt client's billing card shows an error today because it has no subscription row; to be fixed.
- Users: one owner login at launch, more users later. The market treats seats as a plan limit, not the price.
- Locations: each location is its own receptionist and number, as the market sells extra locations as extra agents.

## 7. Website chat (launch item 14)

- The same accepted facts, abilities and rules as the phone receptionist. Reception.ai's widget "is the receptionist itself";
  My AI Front Desk's chatbot "answers questions using your AI receptionist's knowledge base"; Echowin, Newo and Dialpad run
  chat as a channel of the same agent.
- Installed by pasting one script before `</body>`, with an "email my developer" option (all the chatbots studied).
- A test area before going live (four of the five chatbots studied).
- Chats are not stored. None of the chatbots studied offers this, so it carries the same difference as the phone line. A
  message or booking made in chat is delivered the same way as one made on a call.
- **Open for Jeff:** included in every plan, as Rosie includes website chat free on all plans, or drawn from the same
  allowance.
- **Later:** more text channels: replies to texts, Facebook Messenger, Instagram and WhatsApp, as Manychat, Dapta, Newo and
  Sophiie offer.

## 8. Plans and what each includes

The four tiers by minutes are decided. **Open for Jeff:** whether abilities differ by tier. The common pattern puts messages
and the post-call note on the entry plan and booking and live transfer as the first upsell (Juney, Marlie, IONOS, Allo, Rosie,
Dialzara, Voksha). Others give every feature on every plan and price by usage only (Jobber, Housecall Pro, CallRail,
RingCentral, Quo, Aircall, JustCall, Zoom). Rosie, the price reference, has booking links at $49, and direct booking and
transfer from $149.

**Proposed:** spam calls and calls under 15 seconds are not billed. Spam is not billed at Juney, Newo, SkipCalls, Jobber,
Upfirst, Goodcall, LobbyStack and Voksha; short calls are not billed at Quo, Aircall, Upfirst and CallRail (under 15 seconds) and
LobbyStack (under 10). Spam screening itself is in the next release.

**Next release:** Spanish then other languages; spam and robocall screening; analytics from call metadata only (call volume,
bookings, busiest times); number porting; recording to the client's own S3 or GCS bucket for clients who want it.

**Later:** CRM connectors (Geek-CRM when it is ready); outbound reminder calls; reseller and white-label for agencies.
Healthcare and HIPAA-regulated businesses stay excluded permanently.

## 8a. Unit economics

Twilio costs (read from Twilio's pricing pages 2026-11-18):
- ConversationRelay: $0.07/min. The page does not say which speech-to-text and text-to-speech it includes; voice is billed
  separately.
- Inbound call on a local number: $0.0085/min; local number $1.15/month.
- Model (text only, since ConversationRelay sends text): about $0.001–$0.005/min (not checked; depends on prompt and FAQ size).
- Outbound SMS: $0.0083/segment plus a carrier fee of $0.0035–$0.005/message.
- Premium voice (e.g. ElevenLabs): about $0.04–$0.08 per 1,000 characters (not checked).
- **Total: about $0.08–$0.085/min** before any premium voice, plus $1.15/month per number.

Cost if every included minute is used (at $0.085/min + $1.15 for the number, before PayPal fee and premium voice):

| Tier | Price | Included minutes | Cost at full use |
|---|---|---|---|
| Starter | $30 | 90 | ~$8.80 |
| Standard | $48 | 250 | ~$22.40 |
| Pro | $148 | 1,000 | ~$86.15 |
| Premium | $298 | 2,000 | ~$171.15 |

Market for comparison: RingCentral $49/100 min, My AI Front Desk $99/200 min, Rosie $49/$149/$299 for 250/1,000/2,000 min.
Our upper tiers are priced $1 under Rosie with the same minutes. Margins are raised later.

## 9. Geek @ Your Spot as client number one

- Jeff signs up through the same form with contact@geekatyourspot.com. The billing exemption skips PayPal; nothing else is
  different.
- Its line, 865-6990, moves onto the client routes and gets its own telephony record. Its settings come from its own setup
  answers. The company-only routes, the settings fixed in code (state "FL", the industry line, `CompanyCallerQuestions`) and
  the per-business Railway variables (`COMPANY_NAME`, `OWNER_CELL`, `CALL_MODE`, `RING_SECONDS`, `SCREEN_CALLS`, `TWILIO_NUMBER`)
  are removed. Railway keeps only platform settings: the Twilio main account, PayPal, the AI provider, encryption keys and
  addresses.
- Geek @ Your Spot's own script and caller questions become its own setup answers, not anyone's default.
- 865-6990 is not advertised (Jeff, 2026-11-19), so it stays as it is until it moves.

## 10. What changes in the code (outline; detailed after the review)

- **Signup stays closed to new clients until Phase 1 of the call engine is complete and tested.**
- **Data:** client settings for accepted facts, identity, abilities and what each needs, rules, the collection checklist and
  which calls the AI takes. Several already have columns in `receptionist_configs` that nothing reads today (hours, transfer
  mode and number, emergency keywords). The default script leaves `ReceptionistDefaults`. The content columns left in
  `call_logs` and `appointments` are dropped; deleting rows already stored needs Jeff's go-ahead.
- **Signup:** new steps 4 to 9 between business details and payment. Signup progress lives in cookies today, so setup answers
  must be saved against the pending client before payment.
- **Reading the website:** a new service. Whether Geek-Crawler-v2 can serve it is not checked.
- **Call time:** build the AI's instructions from the client's settings on every call; give the model only the tools for
  ready abilities; add the message, booking and transfer tools. Booking uses the Google Calendar connector that is already
  built (`list_events`, `suggest_time`, `create_event`). GeekAPI has no email sender today; one is needed.
- **Browser test call:** not checked. Twilio's Voice JavaScript SDK is to be read first.
- **Build phases (blueprint, 2026-11-17):**
  - **Phase 1:** Receptionist agent only, equal to today's. Before building the rest: prove three Twilio behaviours on a
    test number — that TwiML returned from the `<Connect>` action URL is run (transfer and every failure message depend on
    it); which URL form signs the WebSocket upgrade; and that a subaccount's number is signed with the subaccount's token.
    These are not documented in Twilio's public docs.
  - **Phase 2:** Triage and Booking agents with silent handoffs; migration 0069 (`tenant_agents` table); the SignalR hub
    and dashboard live call events (`callStarted`, `callAgentChanged`, `callFailed`, `callCompleted` — ids, codes and
    times only, no caller content).
  - **Phase 3:** Support agent with cold transfer to a person; Sales agent. Each waits on its form questions (what the
    receptionist should do, when and to what number to transfer, where new-customer details go).
- **Railway draining time:** Railway's default gives a stopping instance 0 seconds. Live calls are cut on each deploy
  today. A draining grace period is needed on the GeekAPI service so a stopping instance can say one sentence and hand
  each call back before stopping. This needs Jeff's go-ahead as a Railway service change.
- **The company line:** onto the client routes, then its special code and variables are deleted.

## 11. Questions still open for Jeff (asked one at a time after the review)

1. Which calls the AI answers (section 3, step 8).
2. What a caller hears if the AI fails partway (section 4).
3. The browser test allowance (section 3, step 9).
4. Whether abilities differ by tier, and how website chat is counted (sections 7 and 8).
5. Whether spam and short calls are billed (section 8).
6. Whether "booking made" may be kept with a call's metadata (section 5).
7. The wording of the neutral base template, drafted for Jeff's approval.

The seven client questions kept in `GeekBackend/docs/Geek-Receptionist-zero-data-retention.md` section 9 stay parked until Jeff
says the form has reached them.
