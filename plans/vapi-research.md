# Vapi.ai Research

Written 2026-11-19 from Vapi's own pages. Sources cited per section.
Anything not found in the pages read is marked **not found**.

Sources read:
- `https://vapi.ai/` — marketing homepage
- `https://vapi.ai/pricing` — pricing page
- `https://vapi.ai/privacy` — privacy policy (last updated 2023-09-09)
- `https://docs.vapi.ai/introduction` — platform intro
- `https://docs.vapi.ai/quickstart/introduction` — quickstart intro
- `https://docs.vapi.ai/quickstart/phone` — phone call quickstart
- `https://docs.vapi.ai/assistants/overview` — assistant configuration
- `https://docs.vapi.ai/squads` — squads overview
- `https://docs.vapi.ai/squads/passing-data-between-assistants` — data between agents
- `https://vapi.ai/blog/introducing-squads` — squads design blog post
- `https://docs.vapi.ai/security-and-privacy/zero-data-retention` — ZDR page
- `https://docs.vapi.ai/security-and-privacy/hipaa` — HIPAA page
- `https://docs.vapi.ai/security-and-privacy/data-flow` — data flow page
- `https://docs.vapi.ai/assistants/call-recording` — call recording page
- `https://docs.vapi.ai/server-url` — webhooks / server URLs
- `https://docs.vapi.ai/providers/voice/overview` — voice providers
- `https://docs.vapi.ai/llms.txt` — documentation index
- Web search results for ZDR and sub-processor scope

---

## 1. What Vapi Is

Vapi is a developer platform for building voice AI agents that make and receive phone calls.
Source: `docs.vapi.ai/quickstart/introduction`

It operates as an **orchestration layer** sitting between three provider modules:
1. **Speech-to-text (STT):** converts the caller's audio to text
2. **Large language model (LLM):** reads the transcript and produces a response
3. **Text-to-speech (TTS):** converts the response back to audio

Each module is independently swappable. Developers choose from supported providers
(OpenAI, Anthropic, Deepgram, ElevenLabs, etc.) or bring their own servers.
Source: `docs.vapi.ai/introduction`

The platform claims 1 billion calls handled, 2.5M+ agents launched, 99.9% uptime for
enterprise, and latency under 500 ms. Named enterprise customers: Amazon Ring, Intuit,
ServiceTitan, New York Life, Kavak.
Source: `vapi.ai` homepage

---

## 2. Zero Data Retention (ZDR) Architecture

This is the section Jeff cited as where he learned and embraced his ZDR position.

### What Vapi's ZDR Does

ZDR is an **organisation-wide switch** that stops Vapi from retaining call content after
a call ends. It applies to every call in the organisation.
Source: `docs.vapi.ai/security-and-privacy/zero-data-retention`

**What is NOT retained under ZDR:**
- Call recordings
- Transcripts
- Messages (conversation turns)
- Call summaries
- Detailed call logs

**What IS retained under ZDR:**
- Call history (the call occurred, start/end time)
- Cost and billing data
- Latency metrics
- Usage metadata

Source: `docs.vapi.ai/security-and-privacy/zero-data-retention`

### Critical ZDR Behaviour: Webhooks Are the Only Exit

Under ZDR, Vapi removes recording and artifact URLs from the retained call record.
The API and Dashboard show blank URLs even when files reached your custom storage bucket.

The end-of-call-report webhook payload (`message.artifact`) contains the transcript and
recording URLs **at the moment the call ends**. That payload is not retrievable later
under ZDR. The docs say explicitly: "Save the end-of-call-report webhook payload in
your own application when it arrives."
Source: `docs.vapi.ai/security-and-privacy/zero-data-retention`

This is directly analogous to Geek-Receptionist's design: data exits to the owner's
destination in the same post-call window, then RAM clears. Vapi formalised this pattern.

### ZDR and Provider-Level Retention

Vapi's terms say: "where supported by the applicable Model Provider and service plan,
we will also enable the corresponding zero-retention or no-storage controls that such
Model Provider makes available."

For **customer-managed providers** (bring-your-own-key or custom server), Vapi
**disclaims responsibility**: "Vapi does not make any independent representation or
warranty regarding the model training, data retention, or data use practices of any
Optional Provider or Customer-Managed Provider."

This means provider-level ZDR (e.g. OpenAI's `store: false`) requires separate
verification per provider. It is not covered by enabling Vapi's ZDR switch alone.
Source: Vapi terms of service, via web search result `docs.vapi.ai/security-and-privacy/zero-data-retention`

### ZDR Plan Availability

| Plan | ZDR Available |
|---|---|
| No Success / Usage-only | No |
| Core ($29/mo) | Yes |
| Pro ($999+/mo) | Yes |
| Premier (custom) | Yes, plus custom configuration |

ZDR is not available as a standalone add-on on the usage-only tier. It requires at
minimum the Core success package.
Source: `vapi.ai/pricing`

### ZDR + Custom Storage

ZDR alone means no data is kept anywhere — not at Vapi, not at a custom bucket.
To retain recordings or transcripts (in the client's own storage), the customer must:
1. Connect a custom storage bucket (S3, GCP, Cloudflare R2, Azure Blob, Supabase)
2. Enable recording/transcription/logging in `assistants/call-recording` with custom storage on
3. Use the region matching the API key

Under ZDR with custom storage:
- Audio lands at the configured recording path
- Call JSON (transcript, messages, available analysis) lands at `<credential-prefix>/vapi/call/<call-id>.json`
- Detailed logs land at the configured logging path as `.jsonl.gz`

Vapi's call record shows blank artifact URLs. The files are in the bucket; Vapi simply
does not keep the URLs.
Source: `docs.vapi.ai/security-and-privacy/zero-data-retention`

### ZDR vs HIPAA

ZDR and HIPAA mode are mutually exclusive. You must disable one before enabling
the other. HIPAA stores data in Vapi's private HIPAA-compliant storage (unless you
configure custom storage). ZDR stores no data at all in Vapi's systems.
Source: `docs.vapi.ai/security-and-privacy/hipaa`, `docs.vapi.ai/security-and-privacy/zero-data-retention`

### Monitoring Under ZDR

Monitoring (evals, scorecard, monitor evaluations) is unavailable under ZDR. Logs
required for evaluations are not retained.
Source: web search result referencing `docs.vapi.ai/observability/monitoring-quickstart`

---

## 3. Data Flow Per Call Stage

Source: `docs.vapi.ai/security-and-privacy/data-flow`

| Stage | What Happens | What Is Retained (Default) | What Is Retained (ZDR) |
|---|---|---|---|
| Transport (SIP/telephony/WebSocket/WebRTC) | Streams raw audio | Signaling metadata only | Same |
| STT | Audio → text, real time | Transcripts in call logs | Nothing |
| Orchestration | Endpointing, interruptions, noise/voice filter, barge-in, backchanneling, filler injection | Ephemeral — nothing stored | Ephemeral |
| LLM | Text → response | Responses in call logs | Nothing |
| TTS | Response → spoken audio | Call recordings | Nothing |

**What passes through Vapi regardless of configuration:**
- Raw audio streams (routed, not stored)
- Transcribed text (used for routing, then logged by default)
- LLM responses (used for filler injection, then logged by default)
- Emotion metadata (passed to LLM context, ephemeral)
- Call signaling (metadata only)

**Orchestration always runs on Vapi infrastructure.** You cannot bring your own
orchestration layer. The orchestration stage's processing is stated as ephemeral.

**Data residency:** Orchestration runs on US or EU infrastructure. EU region requires
the Premier plan.

---

## 4. Pricing and Plans

Source: `vapi.ai/pricing`

### Success Packages

| Package | Monthly Cost | Vapi Hosting Rate | Retention | ZDR | Concurrency | Orgs | Phone Numbers |
|---|---|---|---|---|---|---|---|
| No Success Package | $0 | $0.05/min | 14 days | No | 4 concurrent | 2 | 1 |
| Core | $29 prepaid | $0.05/min | 30 days | Yes | 10 concurrent | 2 | 5 |
| Pro | $999 min + 10% of Vapi hosting | $0.05/min | 180 days | Yes + RBAC | 30 concurrent | 10 | 10 |
| Premier | Custom (direct sales) | Custom | Custom | Yes + RBAC + SSO | Custom | Custom | Custom |

### Per-Minute Provider Rates (passed through at cost)

| Component | Provider | Rate |
|---|---|---|
| Transcriber | Deepgram | ~$0.0095–0.0099/min |
| LLM | OpenAI (various) | $0.0077–$0.0452/min |
| Voice | ElevenLabs | $0.0146–$0.0238/min |
| Telephony | Twilio inbound | $0.008/min |
| Telephony | Twilio outbound | $0.014/min |
| Telephony | Telnyx | $0.0055/min |
| Telephony | Vonage | $0.00814/min |
| Telephony | Vapi SIP, WebSocket, Daily WebRTC | Free |

All model costs are passed through at cost with no markup.

### Add-Ons (Any Package)

- Additional concurrency: $10/line/month
- Additional organisations: $20/org/month
- HIPAA compliance: $2,000/month

**HIPAA and ZDR are mutually exclusive**, so a HIPAA client cannot also use ZDR.

### Free Credits

The No Success Package includes $5 in free credits. No minimum minutes required.
No dedicated trial tier.

### Cost Estimate Context for Geek-Receptionist

A typical AI receptionist call using Deepgram + OpenAI gpt-4o-mini + ElevenLabs + Twilio
inbound would cost roughly:
- Deepgram: ~$0.0097/min
- OpenAI gpt-4o-mini: ~$0.0077/min
- ElevenLabs: ~$0.0146/min
- Twilio inbound: $0.008/min
- Total: ~$0.040/min Vapi-side + $0.05/min Vapi hosting = ~$0.09/min

Geek-Receptionist's current plan estimates $0.085/min (Twilio baseline, before premium
voice), which is consistent with these Vapi-transparent rates.

---

## 5. Assistants

Source: `docs.vapi.ai/assistants/overview`

### Core Configuration

Every assistant has:
- **Name:** a label
- **First message:** what the assistant says when the call starts
- **System prompt:** identity, response guidelines, guardrails, workflow
- **Model:** `{provider, model, reasoningEffort, messages[systemPrompt]}`

### Model Intelligence Presets

Three bundles of STT + LLM + TTS:
- **Balanced:** general purpose
- **High Intelligence:** slower, more capable LLM
- **Ultra Fast:** lowest latency

### Templates

| Template | Purpose | Preset |
|---|---|---|
| Customer Support (Alex) | Resolves product issues | Balanced |
| Lead Qualification (Morgan) | Qualifies and routes to sales | High Intelligence |
| Appointment Scheduler (Riley) | Books, reschedules, cancels | Ultra Fast |
| Info Collector (Jamie) | Gathers accurate customer information | Balanced |

Templates are single-purpose assistants. The docs do not use "single-job agent" but
the design intent is the same: one assistant, one clear task.

### Versioning and Traffic Splitting

Saving creates a draft. Publishing creates a new version with configurable traffic
split. This is the mechanism for A/B testing prompts.

### Phone Numbers

- **Free Vapi numbers:** inbound only, any US area code, free, 2–3 minutes to activate
- **Imported numbers (Twilio, Telnyx, DIDWW):** inbound + outbound

---

## 6. Squads (Multi-Agent Design)

This is the architecture Jeff referenced as the model for single-job agents.
Sources: `docs.vapi.ai/squads`, `docs.vapi.ai/squads/passing-data-between-assistants`,
`vapi.ai/blog/introducing-squads`

### What a Squad Is

A squad is a set of specialized assistants that hand off to each other during one
conversation. Each assistant covers one part of a workflow. Context carries across
handoffs. The design intent: "break complex workflows into multiple specialized
assistants" to reduce hallucination, cost, and latency vs. one large assistant.

The blog post describes the motivation:
- Single agents "can only safely handle a small number of tasks" before losing context
  or behaving inconsistently
- Adding features to one prompt leads to "thousands of conflicting instructions"
- Squads compose specialized assistants that hand off while keeping context

### Single-Job Agent Philosophy

Squads "enable you to build specialized assistants that excel in one area each."
Vapi's recommended best practice: **1–3 goals per assistant maximum**.

Example squad structure (from the blog):
- Greeting agent: qualifies and routes callers
- Scheduling agent: books appointments
- Support agent: handles complaints
- Payment agent: takes card details (with no-context handoff)

A common pattern uses one "traffic controller" assistant that routes callers to
specialists and receives them back.

### Handoff Mechanics

Handoffs are defined via **Handoff Tools** — a tool type with:
```
type: "handoff"
destinations: [ { type: "assistant", assistantId, description: "trigger condition" } ]
function: { name }
```

The trigger condition description tells the LLM when to hand off. It appears in both
the prompt and the tool description.

Handoffs are described as designed to be seamless: "no audio artifacts, dead air, or
clipped words." Callers get one phone number, one conversation thread, one transcript.

### Context Engineering Plans

Each handoff independently controls what history passes to the next assistant:

| Plan | What Passes | Use Case |
|---|---|---|
| `all` | Full conversation including tool call results (default) | General continuity |
| Last N messages | Only the most recent N turns | Reduce tokens, limit scope |
| `none` | No prior messages | Sensitive domains (e.g. payment collection) |
| `previousAssistantMessages` | History before the current assistant's session | Partial isolation |

Recommendation for payment flows: use `none` or `previousAssistantMessages` to
prevent card numbers from leaking into subsequent assistants' context.

### Three Ways to Pass Data Between Agents

1. **Handoff arguments:** Custom `function.parameters` on the handoff tool. The model
   fills them in the same tool call; each is saved as a named variable. Lowest latency,
   highest reliability. Best for critical values.

2. **Destination schema extraction:** `variableExtractionPlan.schema` on the destination.
   Vapi runs a separate LLM request against the outgoing assistant's conversation and
   saves top-level properties before the destination starts. **Adds latency**; best-effort
   (failure does not block the handoff).

3. **Tool-result aliases:** Aliases on a tool that returns data. Selects specific JSON
   fields to save as variables. The raw response is not saved automatically.

Variables from any method are readable in destination prompts via Liquid templates
(`{{variableName}}`). Variables persist across all subsequent handoffs in the squad.

### Versioning

Squads support versioning. Members can be pinned to specific assistant versions. Squad
version can be selected per outbound call.

### Note on GPT-Live

Squads are not supported on GPT-Live (Vapi's real-time OpenAI mode). Squads is the
recommended replacement for Vapi's older Workflows product.

---

## 7. Call Recording and Custom Storage

Source: `docs.vapi.ai/assistants/call-recording`

### What Gets Recorded

Controlled by `artifactPlan` (the top-level `recordingEnabled` is deprecated):
- Audio recording: enabled/disabled, format `wav;l16` or `mp3`
- Video recording: Dashboard toggle for web calls

### Storage Options

**Default (Vapi cloud):**
- Encrypted at rest and in transit
- Access controlled through API credentials
- Retention period by plan (14 days / 30 days / 180 days / custom)

**Custom storage (AWS S3, GCP Cloud Storage, Cloudflare R2, Azure Blob, Supabase):**
- `recordingUseCustomStorageEnabled: true` in `artifactPlan`
- `recordingPath` for the folder prefix
- Credential array with provider-specific keys

### Recording and Squads

Recording pauses while an assistant with `recordingEnabled: false` is active and
resumes when an enabled assistant takes over. This is the documented pattern for
preventing card numbers from being captured.

---

## 8. Webhooks and Server URLs

Source: `docs.vapi.ai/server-url`

Server URLs are publicly accessible HTTP endpoints that receive real-time call data
and can send a reply back to Vapi (unlike traditional one-way webhooks).

### Event Types

| Event | Direction | Purpose |
|---|---|---|
| Status Updates | Vapi → server | Call state changes |
| Transcript Updates | Vapi → server | Real-time transcription |
| Function Calls | Vapi → server, server → Vapi | Tool execution (bidirectional) |
| Assistant Requests | Vapi → server, server → Vapi | Dynamic assistant config per call |
| End of Call Report | Vapi → server | Call summary data on hang-up |
| Hang Notifications | Vapi → server | Alert when assistant fails to reply |

### End-of-Call Report

The report's `message.artifact` contains transcript and recording URLs. Under ZDR,
this payload is the **only** opportunity to capture these before they are unavailable.
The docs say to save it in your own application immediately upon receipt.
Source: `docs.vapi.ai/security-and-privacy/zero-data-retention`

### Local Development

Vapi CLI: `vapi listen --forward-to localhost:3000/webhook` with an ngrok tunnel.

---

## 9. Integrations and Provider Flexibility

Source: `vapi.ai` homepage, `docs.vapi.ai/llms.txt`

### STT Providers
Deepgram, Gladia, AssemblyAI, Azure (custom transcriber also supported)

### LLM Providers
OpenAI, Anthropic, Google Gemini, Groq, Perplexity, plus custom OpenAI-compatible
server (bring your own fine-tuned model or proxy)

### TTS / Voice Providers (15 total)
Vapi Voices, Azure, Cartesia, Deepgram, ElevenLabs, Hume, Inworld, LMNT, MiniMax,
Neuphonic, OpenAI, Rime AI, Smallest AI, WellSaid, xAI
Source: `docs.vapi.ai/providers/voice/overview`

### Telephony
Twilio, Telnyx, DIDWW, Vonage, Five9, Genesys, Avaya, plus SIP trunking

### Business Tool Integrations (from homepage)
Salesforce, HubSpot, Zendesk, GoHighLevel, Google Calendar, Slack, Zapier, Make,
Notion, Google Sheets, AWS S3, GCP, Langfuse, Apollo.io, Clay

### Bring Your Own Keys (BYOK)
Vapi calls the provider using the customer's key. The customer is billed directly by
the provider. Vapi's per-minute rates above still apply for the Vapi hosting component.

---

## 10. Compliance Coverage

Source: `vapi.ai` homepage, `vapi.ai/pricing`, `docs.vapi.ai/security-and-privacy/hipaa`

| Compliance | Availability | Notes |
|---|---|---|
| SOC 2 Type II | All plans | Stated on homepage |
| ZDR | Core, Pro, Premier | Org-wide switch |
| HIPAA | Add-on, $2,000/month | Mutually exclusive with ZDR |
| PCI | Available (plan unclear) | Docs page exists: `/security-and-privacy/pci` |
| RBAC | Pro, Premier | Role-based access control |
| SSO (OAuth2) | Premier | SAML/SSO; enterprise only |
| EU data residency | Premier | EU region option |
| Static IP addresses | Available (plan unclear) | Docs page exists: `/security-and-privacy/static-ip-addresses` |

---

## 11. Privacy Policy: What Vapi Retains by Default

Source: `vapi.ai/privacy` (last updated 2023-09-09)

By default (without ZDR), Vapi retains for platform customers:
- **Call metadata:** phone numbers, duration, times, status
- **Call recordings:** if the customer enables recording
- **Transcripts and conversation logs:** yes, by default
- **Assistant config:** prompts, knowledge base content, dialog flows
- **Credentials:** API keys, webhook URLs (encrypted)

**Call recordings, transcripts, and logs may be used to train AI models** in accordance
with applicable laws. The policy does not name specific providers used for training.

**Retention period:** "as long as needed for the stated purposes." For calls, it is
"customer-configurable and subject to applicable laws." Data is deleted on request.

The ZDR product eliminates the retention described above. The 2023 privacy policy
predates ZDR's introduction and does not mention it; ZDR is documented separately in
the product docs.

---

## 12. What Vapi Does Not Cover (Gaps Relevant to Geek-Receptionist)

These are items not found in the pages read:

- **Provider-level ZDR mechanics:** Vapi says it enables provider ZDR "where supported"
  but does not document which providers support it or what parameters are sent
  (e.g. OpenAI's `store: false`). This requires per-provider verification.

- **Twilio subaccounts:** The docs do not describe whether Vapi uses one Twilio account
  or per-customer subaccounts. For Geek-Receptionist (which needs isolated subaccounts
  per client), this is not a Vapi concern — Vapi's Twilio integration accepts imported
  numbers from customer-owned Twilio accounts, so each client brings their own number.

- **Consent-recording integration:** The docs mention an "enterprise recording consent
  plan" that records only after consent is granted, but this is an enterprise feature.
  For the consent gate design (press-1 confirmation), this is Geek-Receptionist's own
  implementation, not Vapi's.

- **Call duration billing:** Vapi does not describe a short-call grace threshold. That
  is a Geek-Receptionist metering rule applied before billing clients.

- **Spam filtering:** Not found in Vapi's docs. Carrier spam filtering would be at the
  Twilio level, not Vapi's.

- **WebSocket-based custom call engine (ConversationRelay):** Geek-Receptionist uses
  Twilio ConversationRelay + GeekAPI WebSocket instead of Vapi as the orchestration
  layer. The Vapi research is relevant as an architectural reference model, not as the
  chosen platform.

---

## 13. Key Lessons for Geek-Receptionist Design

These are the patterns from Vapi's own design that directly inform Geek-Receptionist:

1. **ZDR is an org-wide switch, not a per-call setting.** Every call in the organization
   is covered. This is cleaner than per-call config.

2. **The webhook end-of-call payload is the only ZDR exit point.** After the call ends
   and the payload is dispatched, the content is gone. Geek-Receptionist's design of
   pushing to BYOS destinations in the same post-call window matches this exactly.

3. **Dead-letter fallback is necessary.** Vapi doesn't describe one, which means a
   failed bucket write silently loses data. Geek-Receptionist's dead-letter email
   fallback is a correctness improvement over what Vapi documents.

4. **Single-job agents with 1–3 goals per assistant** is Vapi's own recommendation.
   The squad design (Receptionist → Triage → Booking → Support → Sales) follows this.

5. **Context control per handoff.** Not one global setting — each handoff decides how
   much history to pass. For Geek-Receptionist: Booking agent should receive caller
   intent and name but not every prior turn; a hypothetical Payment agent would receive
   nothing.

6. **Provider-level ZDR requires separate signed agreements.** Vapi's switch covers
   Vapi's own storage. Each upstream provider (LLM, STT, TTS) needs its own ZDR
   addendum. This is Geek-Receptionist open question #4 verbatim.

7. **Recording pause on agent switch.** Vapi's pattern of pausing recording when a
   specific agent is active (e.g. payment) is a useful design primitive for
   Geek-Receptionist if it ever needs to handle sensitive data mid-call.
