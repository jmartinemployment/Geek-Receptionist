# Geek-Receptionist

A plan for review. Written 2026-11-19. Pre-launch.

## The Opportunity & Core Architecture (Zero-Knowledge ZDR)

Small businesses miss calls they cannot answer. Most AI receptionists record, transcribe, and store customer
conversations inside the vendor's cloud by default — creating privacy exposure, compliance overhead, and third-party
data lock-in.

The proposed platform operates strictly as a transient, zero-knowledge conduit. Geek-Receptionist never retains call
audio, transcripts, or conversation content, nor can the platform operator view or access client conversations. All
conversational data exists only in volatile memory (RAM) during an active call and is purged immediately upon call
completion. If a client wants call summaries, transcripts, or logs saved, the platform facilitates direct delivery
into client-owned infrastructure (Google Drive, Google Cloud Storage, AWS S3, email, or external calendars) using
write-only or narrowly scoped permissions.

## Target Market & Industry Guardrails

Sold by Geek @ Your Spot LLC (Delray Beach, Florida) by monthly subscription to US small businesses.

The plan proposes excluding business categories where statutory recording or retention obligations conflict with a
zero-retention model:

- The four HIPAA-regulated categories (healthcare provider, health plan, healthcare clearinghouse, business associate)
- Securities broker-dealers, investment advisers, and commodity futures or derivatives dealers
- Medicare Advantage or Part D third-party marketers

Answering yes to any screening question halts signup and permanently logs the exclusion answer for compliance records.

## Proposed Pricing & Metering Rules

A four-tier monthly subscription model is proposed with upfront PayPal billing and no free trial (mitigated by a
pre-payment browser test call during setup).

| Tier     | Monthly Price | Included Minutes |
|----------|---------------|-----------------|
| Starter  | $30           | 90              |
| Standard | $48           | 250             |
| Pro      | $148          | 1,000           |
| Premium  | $298          | 2,000           |

Overage rate: $0.50 per minute, billed in whole-minute increments.

Twilio baseline cost estimate: approximately $0.085 per minute (before premium voice) plus $1.15 per month per
phone number.

Edge-case metering rules (proposed):

- **Consent declines and abandoned intros:** Calls ending at or before the consent gate are not billed to the client
  (absorbed as minor platform overhead).
- **Spam and short-call grace threshold:** Calls disconnecting under 10–15 seconds with no meaningful speech, or
  flagged by carrier spam filtering, are excluded from billable minutes up to a reasonable monthly cap (e.g. 20 short
  calls per month). Calls exceeding the threshold are rounded up to the full minute.
- **Post-transfer bridged minutes:** Minutes incurred after a call transfers to the owner count toward the client's
  monthly allowance, since Twilio continues billing the subaccount while bridging the line.
- **Website chat metering:** 1 completed chat session (or every 10 AI chat turns) counts as 1 billable minute
  against the client's monthly allowance. Text LLM inference costs a fraction of voice telephony, so this keeps
  billing simple while improving gross margin on chat sessions.

Proposed tier feature gating:

- **Starter ($30 / 90 min):** Core Receptionist, Booking, Email/Zapier summaries, Google Drive connector
  (one-click OAuth only). AWS S3 and GCS connectors excluded to avoid cloud-permission support overhead on
  low-tier accounts.
- **Standard ($48 / 250 min) and above:** Unlocks AWS S3 and GCS write-only connectors, multi-agent routing
  (Triage, Booking, Support, Sales agents), and waterfall transfers.

## Streamlined Onboarding Flow (Proposed)

Four logical stages allow the owner to reach the live browser test call within minutes.

### Stage 1: Eligibility & Business Profile (Steps 1–3)

1. Screening and location: robot check, US country confirmation, and the eight excluded-industry screening questions.
2. Core business details: name, description, state, contact email, business phone, compliance attestation, website
   URL, and Google Business listing.
3. Automated knowledge ingestion: GeekAPI reads the website and Google listing to pre-fill services, hours, service
   area, prices, and FAQs. The owner reviews and accepts, edits, or drops each item — nothing saves until accepted.
   Owners can upload menus or price lists, or enter details manually if a site cannot be scraped.

### Stage 2: Persona, Abilities & Bring Your Own Storage (Steps 4–6)

4. Receptionist identity: name, voice selection, and opening greeting.
5. Modular abilities and destinations. The owner toggles each on; the AI is given instructions and tools only for
   enabled abilities:
   - **Answer questions:** strictly from accepted business information.
   - **Take messages:** dispatches structured summaries via email (and optional Zapier webhook) from RAM without
     platform storage.
   - **Book appointments:** connects via OAuth to the client's Google Calendar or Microsoft 365. Checks live
     availability, confirms slots directly with the calendar API, and stores only the event ID and outcome flag.
     Failed bookings route automatically as messages.
   - **Call logs and transcripts (BYOS):** optional write-only connectors routing summaries or transcripts
     (YYYY/MM/DD/call-{timestamp}-{last4}.{md|json}) directly into client-owned storage:
     - Google Drive: one-click OAuth using the restricted drive.file scope, limiting access to a single newly created
       Geek-Receptionist Logs folder.
     - AWS S3 / Google Cloud Storage: guided setup providing a copy-pasteable minimal IAM policy (s3:PutObject or
       storage.objectCreator on a single bucket prefix) with zero read, list, or delete rights.
   - **Transfer to a person:** configures warm or cold waterfall transfer numbers and unanswered fallback behaviour.
   - **Text confirmation:** dispatches SMS only after an approved A2P 10DLC campaign is active and the caller opts
     in; email confirmation until then.
6. Guardrails and call routing: prohibited topics, strict pricing adherence, out-of-area handling, required caller
   collection checklist, and answering schedule (every call, missed calls only, or after hours only).

### Stage 3: Pre-Payment Validation (Step 7)

7. Live browser test call: before paying, the owner tests the configured receptionist directly in the browser using
   the same consent step, prompt, and tools as a live phone call. Proposed guardrails: 2 test calls capped at 90
   seconds each (3 minutes total); the allowance is tied to a verified contact email via a 6-digit OTP before the
   browser dialer launches; IP rate limit of 2 test sessions per IP per 24 hours. GeekAPI terminates the WebSocket
   at 90 seconds with a spoken prompt: "Your preview test time is complete — select a plan to take your receptionist
   live."

### Stage 4: Activation & Number Provisioning (Steps 8–10)

8. Plan selection and PayPal checkout.
9. Number provisioning and connection: purchases a local area-code number on the client's Twilio subaccount. The
   client forwards an existing line or publishes the new number directly. Number porting deferred to a later phase.
10. Dashboard access: owner login.

## How a Call Works (Zero-Knowledge Execution)

1. **Inbound and spam pre-filter:** Twilio receives the call, checks tenant standing and monthly cap, applies carrier
   spam filtering, and checks answering-hour rules.
2. **Upfront consent gate (two-mode tenant setting):**
   - **Default — passive disclosure:** a crisp 4-second opening before the AI greets the caller: "Hi, you've
     reached [Business Name]'s AI assistant. Calls are processed in real time and not recorded. How can I help you
     today?" Staying on the line after an unmistakable upfront announcement satisfies implied consent for real-time
     processing while maximising caller retention.
   - **Strict mode — active DTMF gate (optional toggle):** retains a "press 1 to continue, press 2 to decline"
     gate for risk-averse owners or specific call types.
   - Florida attorney review of the passive script against Fla. Stat. § 934.03 is required before launch.
3. **Ephemeral ConversationRelay session:** WebSocket connects to GeekAPI. Instructions are assembled in memory from
   the client's accepted profile and enabled tools. Upstream STT, TTS, and LLM providers are verified for zero data
   retention (store: false, no training, no logging).
4. **Single-agent execution and silent handoffs:** modelled on Vapi's squad design, the session runs one focused
   specialist agent at a time (Receptionist, Triage, Booking, Support, Sales) with at most four tool rounds per turn.
   Silent handoffs rebuild context without spoken filler. Caller barge-in immediately cancels in-flight audio.
5. **In-memory dispatch, fallbacks, and purge:**
   - If the AI fails mid-call: when a transfer number is configured, the caller hears "I'm having a quick
     connection issue on my end — please hold for just a moment while I connect you directly with our team," then
     transfers immediately via `<Dial>`. When no transfer number is configured, the caller hears "I'm having trouble
     completing that request right now. Please leave your name, phone number, and a brief message after the tone,
     and our team will call you right back," followed by voicemail routed to email/BYOS, or a polite hang-up if
     voicemail is disabled.
   - Upon hang-up, GeekAPI builds the call summary in RAM, pushes concurrently to enabled destinations (email,
     Zapier, Google Drive, S3/GCS), and purges memory.
   - **Dead-letter email fallback:** if a write to Google Drive, S3, or Zapier fails (expired token, revoked key,
     full quota), the payload routes immediately to the owner's contact email before RAM is cleared, accompanied by a
     dashboard alert.
   - Only non-content metadata (timestamp, duration, billable minutes, and tool outcome flags) is saved to the
     platform database.

## After the Call & Dashboard

- **Instant notifications:** per-call summary email with a one-click link to add unanswered questions to setup;
  optional owner SMS alert after A2P approval; optional Zapier webhook push.
- **Metadata-only recaps:** daily or weekly email digests showing call counts, minutes used, and bookings made —
  zero call content.
- **Client dashboard:** editable setup with pre-save browser test call; forwarding status; usage meter with 50%, 75%
  and 100% alerts; optional hard monthly spending cap routing overflow calls to the owner; metadata-only call log;
  billing management; storage connector health checks. Multi-user and multi-location support planned for later phases.

## Website Chat (Companion Channel)

An embeddable single-script chat widget powered by the same accepted business information, rules, and abilities
(answering, booking, messaging). Conversations run ephemerally with zero platform storage and push summaries via the
same email and BYOS pipeline.

## Call Engine & Build Phases

Infrastructure: GeekAPI hosted on Railway with graceful deployment draining so active WebSocket calls are not dropped
during deploys. One isolated Twilio subaccount per client.

- **Phase 1 (Core loop and Twilio verification):** single Receptionist agent. Prove three undocumented Twilio
  behaviours on a test number first: Connect action URL TwiML execution, WebSocket upgrade URL signature validation,
  and subaccount auth token signing. Signup remains closed until Phase 1 passes live call testing. Before any
  tenant moves to the new engine: confirm ZDR flags on all upstream providers (store: false on LLM/STT/TTS),
  disable Twilio call recording and speech logs at the subaccount level, execute Twilio's AI/ML Features Addendum,
  and set Railway container drain to 600 seconds (SIGTERM stops new WebSocket upgrades; existing calls finish on
  the old container).
- **Phase 2 (Multi-agent and live events):** Triage and Booking agents with silent handoffs; real-time dashboard call
  status events via SignalR.
- **Phase 3 (Expanded routing):** Support agent with cold transfer and Sales agent.

## Geek @ Your Spot as Client Number One

Geek @ Your Spot LLC signs up through the same self-serve onboarding flow as any external client, with only a
billing exemption. The company line (865-6990) migrates onto standard client routes and all company-specific code
paths and environment variables are removed.

## What Needs to Be Built

- Signup stages 1–4 (steps 3–9 are new).
- Website reading service.
- Call engine: WebSocket intake, per-tenant voice webhook, ConversationRelay session, agent loop, tools, metadata logger.
- BYOS connectors: Google Drive OAuth, S3 and GCS write-only credential setup, pre-flight checks, dead-letter
  fallback, periodic health checks.
- Email sender.
- Dashboard expansion.
- Browser test call (Twilio Voice JavaScript SDK).
- Migration of Geek @ Your Spot's line to the client routes.

## Remaining Pre-Launch Actions

- Florida attorney review of the passive consent script against Fla. Stat. § 934.03 before go-live.
- Confirm ZDR agreements with chosen LLM, STT and TTS providers before any live call.
- Execute Twilio's AI/ML Features Addendum; disable call recording and speech logs at the subaccount level.
- Set Railway container drain to 600 seconds on the GeekAPI service.
- Finalise the call model, Twilio voice and speech providers, and handoff and simultaneous-call limits.
