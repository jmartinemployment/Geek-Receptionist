# Geek-Receptionist

Pre-launch. Written 2026-11-19.

## The product

An AI phone receptionist sold by Geek @ Your Spot LLC (Delray Beach, Florida) by monthly subscription to US small
businesses. The receptionist answers a business's phone, answers questions from the business's own information, takes
messages, books appointments and transfers calls. No recordings, transcripts or call content are stored. The caller's
words exist only during the call. Every call begins with a keypad consent step before the AI engages. The receptionist
always identifies itself as an AI.

## Who it is for

US small businesses. Eight categories are excluded at signup and their answers are stored permanently:

- Healthcare providers, health plans, healthcare clearinghouses and business associates (the four HIPAA categories)
- Securities broker-dealers
- Investment advisers
- Commodity futures or derivatives dealers
- Medicare Advantage or Part D third-party marketers

A yes to any of these ends the signup.

## Pricing

No free trial. Paid monthly through PayPal, up front.

| Tier     | Price | Included minutes |
|----------|-------|-----------------|
| Starter  | $30   | 90              |
| Standard | $48   | 250             |
| Pro      | $148  | 1,000           |
| Premium  | $298  | 2,000           |

Overage: $0.50 per minute. Each call rounded up to the whole minute.

Unit cost: Twilio ConversationRelay $0.07/min, inbound call $0.0085/min, number $1.15/month. Total approximately
$0.085/min before premium voice.

## Signup and setup

Steps 1–3 are built. Steps 4–9 are new. Steps 10–12 are built and move to after setup.

1. Robot check and country confirmation.
2. Eight excluded-industry questions.
3. Business details: name, what the business does, state, contact email, business phone, attestation, website address,
   Google listing.
4. Read the business. The website and Google listing are read and pre-fill services, hours, service area, prices and
   common questions. The owner reviews each item and accepts, edits or drops it. Nothing saves until accepted. Where a
   site cannot be read, the owner types the information. Documents such as a menu or price list can be uploaded.
5. Identity. The receptionist's name, voice and opening greeting.
6. Abilities. The owner switches each on. The AI is told only about abilities that are on and ready.
   - **Answer questions:** always on. Answers only from information the owner accepted.
   - **Take messages:** needs an email address. Messages are emailed and not stored.
   - **Book appointments:** needs a calendar connected. Setup asks for appointment types, lengths, available hours,
     notice required, booking horizon, buffer between appointments and what to collect from the caller. The AI checks
     availability before offering a time and does not confirm a booking until the calendar accepts it. A booking that
     fails becomes a message.
   - **Transfer to a person:** needs one or more numbers. Setup asks when to transfer, warm or cold, the order of
     numbers for waterfall transfer and what happens if nobody answers.
   - **Text confirmation:** requires an approved A2P campaign. Until then, confirmation is by email. Texts go only
     after the caller replies YES.
7. Rules. What the receptionist must never say or do. Prices only from accepted information. Callers outside the
   service area are told so. A question it cannot answer becomes a message when messages are on. A checklist of what
   to collect on every call.
8. Which calls the AI answers: every call; ring the owner first and answer only missed calls; or after hours only.
9. A test call in the browser before payment. The owner talks to the receptionist through the same consent step and AI
   as a real call. Nothing is stored. A fixed allowance prevents it becoming free use.
10. Plan and payment through PayPal.
11. A phone number is bought in the client's area code. The client chooses the connection: forward an existing number
    to the new number, or use the new number as the business's number. Number porting comes later.
12. Owner login.

## How a call works

1. The caller dials the client's number, or is forwarded from the client's existing number.
2. The client's standing is checked.
3. Keypad consent, word for word: "Thank you for calling [business]. You will be interacting with our AI receptionist.
   Your audio will be temporarily recorded and processed to provide this service, but we do not retain call recordings
   or transcripts. To consent and continue, press 1. To decline, press 2." No key or pressing 2 ends the call.
4. ConversationRelay connects. The AI's instructions are built from the client's accepted information, the abilities
   that are on, the rules and the collection checklist. The session runs one agent at a time.
5. The AI requests a tool only for an ability that is on. At most four tool rounds per caller turn. A tool that cannot
   complete tells the agent it failed; the agent does not invent a result. A booking with an unknown outcome is
   recorded as unknown — never a promise.
6. A silent handoff moves the call to the next agent when needed. The conversation is rebuilt for the new agent; the
   previous agent's tool calls are dropped. Nothing is spoken during the handoff.
7. If the caller speaks over the AI, the reply in flight is cancelled and the conversation keeps only what was
   actually heard.
8. If the AI fails partway, the caller hears a fixed message, is transferred to the owner's number if one is set, or
   the call ends. Never silence.
9. When the call ends, nothing of it is kept. Twilio records the time, length and billable minutes.

## After the call

- A per-call email is built in memory from the call — caller information, message, booking, transfer — and sent.
  Not stored.
- A text alert goes to the owner for every call.
- Questions the AI could not answer go in the email with a link to add an answer to setup.
- A daily or weekly recap from metadata only: call count, minutes used, bookings made. No call content.
- If the owner has connected a Zapier account, the same details as the email are sent to their Zap.
- Bookings live in the owner's calendar. The appointments record keeps the booking outcome and calendar event ID only.

## The dashboard

- All setup pages, editable, with a test call before saving.
- The phone number and forwarding status.
- Usage: minutes used this month, with alerts at 50, 75 and 100 percent. An optional monthly cap after which calls
  ring the owner instead of the AI.
- Call history from metadata only: time, length, minutes billed.
- Billing.
- One owner login at launch; more users later.
- Each location is its own receptionist and number.

## Website chat

The same information, abilities and rules as the phone receptionist. Installed by pasting one script. A test area
before going live. Chats are not stored.

## The call engine

Calls run over a WebSocket to GeekAPI using Twilio ConversationRelay. The AI model sits behind an interface and is
set by configuration; no model is a default. Each provider must be confirmed for no data training and no retention
before any privacy claim is made. Each call uses `store: false` and no user identifier.

One Twilio subaccount per client. The session runs one agent at a time — single-job agents, each with a fixed
prompt and its own tools, modelled on Vapi's squad design (docs.vapi.ai, 2026-11-17). Handoffs between agents are
silent.

Build phases:
1. Receptionist agent only. Before the rest is built, three Twilio behaviours are proved on a test number: that TwiML
   returned from the Connect action URL is run; which URL form signs the WebSocket upgrade; and that a subaccount's
   number is signed with the subaccount's token. These are not in Twilio's public docs.
2. Triage and Booking agents with silent handoffs. Dashboard live call events.
3. Support agent with cold transfer; Sales agent.

Signup stays closed to new clients until Phase 1 is complete and tested.

A draining grace period is needed on the GeekAPI Railway service so live calls are not cut on each deploy.

## Geek @ Your Spot as client number one

Signs up through the same form as any client. The billing exemption skips PayPal; nothing else is different. The
company line 865-6990 moves onto the client routes with its own setup answers. The company-specific code paths and
Railway variables are removed.

## What needs to be built

- Signup steps 4–9.
- Website reading service.
- Call engine: WebSocket intake, per-tenant voice webhook, ConversationRelay session, agent loop, tools, recorder.
- Email sender.
- Dashboard expansion.
- Browser test call (Twilio Voice JavaScript SDK to be read first).
- Migration of Geek @ Your Spot's line to the client routes.

## Open questions

1. Which calls the AI answers (step 8 of setup).
2. What the caller hears if the AI fails partway.
3. The browser test call allowance.
4. Whether abilities differ by pricing tier, and how website chat is counted.
5. Whether spam calls and very short calls are billed.
6. The wording of the neutral base template.

Before Phase 1: OpenAI Zero Data Retention approval or a different provider; the call model and Twilio voice
providers; Twilio's AI features addendum; the handoff limit and simultaneous-call cap; whether minutes after a
transfer to a person are billable; Railway draining time.
