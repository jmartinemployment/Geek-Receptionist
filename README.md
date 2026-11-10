# Geek-Receptionist

> **Moved (2026-11-10):** this service now runs inside **GeekAPI** in the [GeekBackend](https://github.com/jmartinemployment/GeekBackend) repo, under `/api/receptionist/twilio/*` on `api.geekatyourspot.com`. Code: `GeekAPI/Services/Receptionist/`. Docs: [`docs/RECEPTIONIST.md`](https://github.com/jmartinemployment/GeekBackend/blob/main/docs/RECEPTIONIST.md). This repo is kept as history only; do not deploy it or change code here.

AI receptionist for small businesses. Missed calls get an instant text back in the business's name, owners get notified, callers can leave voicemail. .NET 10 + Twilio, deployed on Railway.

> **Status:** v0, missed-call text-back. AI voice answering is next on the [roadmap](#roadmap).

---

## What it does

A plumber is under a sink when the phone rings. Normally the caller hits voicemail and calls the next company on Google. With Geek-Receptionist:

1. **Within seconds the caller gets a text** in the business's name: *"Hi, this is Dag Plumbing. Sorry we missed your call - we're on a job right now. We'll call you back shortly. Feel free to reply here with what you need. Reply STOP to opt out."*
2. **The owner gets a text** saying who called and that the auto-reply went out.
3. **The caller can leave a voicemail**, and the owner is texted the recording link.
4. **When the caller replies** ("leak under the kitchen sink, 123 Main St"), the reply is forwarded to the owner's cell.

The owner calls back when they're off the job. The customer stopped shopping because someone answered.

## How it works

```
Caller ──► Twilio number ──► POST /twilio/voice/incoming
                                │
           CALL_MODE=Dial       │        CALL_MODE=Forwarded
   ring OWNER_CELL for          │        (client's own line rang first and
   RING_SECONDS                 │         forwarded the unanswered call here)
   owner presses a key? ─ yes ─► connected, nothing sent
           │ no / voicemail / busy                 │
           ▼                                       ▼
   text the caller (once per REPEAT_TEXT_MINUTES) + notify owner + offer voicemail

Caller replies by text ──► POST /twilio/sms/incoming ──► text forwarded to owner
                                                        (attachments deleted, never forwarded)
```

### Two modes

| Mode | Use it when | What happens on a call |
|------|-------------|------------------------|
| `Dial` (default) | Demos, or a business using the Twilio number as its main number | Rings the owner's cell first; only unanswered calls trigger the text |
| `Forwarded` | A client keeping their existing business number | Their carrier forwards unanswered calls here; every call that arrives is a missed call |

### Call screening

With `SCREEN_CALLS=true` (default), the owner hears *"Call for Dag Plumbing. Press any key to accept."* when they pick up. This matters: without it, the owner's own cell voicemail "answers" the call, Twilio reports it as completed, and the missed call never gets a text.

## Safety by design

| Rule | Why |
|------|-----|
| **One fixed message, only to someone who just called** | Informational reply to an inbound call, not marketing. Clients cannot send free-form texts or upload lists. |
| **Only US/Canada (+1) numbers are texted** | Blocks SMS-pumping fraud from international premium numbers |
| **Same caller texted at most once per window** (default 10 min) | No spamming repeat callers |
| **Inbound attachments are deleted, never forwarded** | The service only ever moves words, never images or files |
| **Every webhook must carry a valid Twilio signature** | Forged requests get `403` |
| **Bad configuration stops the service at startup** | Lists every problem; no silent defaults |
| **Failures are reported to the owner** | If a text can't be sent (e.g. A2P not approved yet), the owner is told the exact Twilio error and to call back |

Twilio handles `STOP` / `HELP` opt-out keywords automatically.

---

## Setup

### 1. Twilio

1. **Buy a local number** (Console → Phone Numbers → Buy a number), e.g. a 561 area code.
2. **Register for A2P 10DLC.** Required before texting US phones from a local number; unregistered texts are blocked (Twilio error `30034`).
   - Trust Hub → **Primary Customer Profile**: choose **ISV** (you'll register clients under you).
   - **Brand**: Low Volume Standard, legal name and EIN exactly as on Sunbiz.
   - **Messaging Service**: add your number to it.
   - **Campaign**: use case *Customer Care*. Opt-in description: *"The consumer calls the business's phone number. If the call is unanswered, they receive a single text replying to their call. Reply STOP to opt out."* Use the actual caller text as the sample message.
   - Approval usually takes 1–3 weeks. Calls and voicemail work in the meantime; texts will fail and the owner is told.
3. **Upgrade from trial** before recording a demo. Trial accounts can only text verified numbers and prefix every message with "Sent from your Twilio trial account".
4. **Lock texting to the US/Canada** at the account level too: Messaging → Settings → Geo permissions.
5. **Create a Standard API key** (Console → Account → API keys & tokens → Create API key, type *Standard*). Copy the SID and secret; the secret is shown only once. The service calls Twilio with this key, and uses the auth token only to verify incoming webhooks. If the key leaks, revoke it and create a new one without touching the auth token.

### 2. Deploy to Railway

1. New Project → Deploy from GitHub repo → `Geek-Receptionist`. `railway.toml` builds from the `Dockerfile` and health-checks `/health`.
2. Settings → Networking → **Generate Domain**. This is your `PUBLIC_BASE_URL`.
3. Variables: set everything in the table below.
4. Deploy. The log line `Geek-Receptionist starting for <Company>: mode Dial, ...` means configuration passed.

### 3. Point the Twilio number at the service

Console → Phone Numbers → your number:

| Section | Setting | Value |
|---------|---------|-------|
| **Voice** | A call comes in → Webhook, HTTP POST | `https://<PUBLIC_BASE_URL>/twilio/voice/incoming` |
| **Messaging** | A message comes in → Webhook, HTTP POST | `https://<PUBLIC_BASE_URL>/twilio/sms/incoming` |

**If the number is in a Messaging Service (required for A2P), the Service decides where incoming texts go, not the number.** In the Messaging Service → **Integration → Incoming Messages**, choose **"Defer to sender's webhook"** so the number's Messaging webhook above is used. If the Service is set to drop incoming messages, caller replies are discarded without being logged and never reach the owner.

In the same Messaging Service, turn on **Smart Encoding** (Content settings) so curly quotes and long dashes don't double the cost of a text.

> ⚠️ **Never delete the Messaging Service.** Deleting it deletes the A2P 10DLC Campaign and immediately stops all texting; re-registering takes days. Remove numbers from it instead.

### 4. Test it

1. From a second phone, call the Twilio number.
2. Let your cell ring without answering (or answer and don't press a key).
3. The calling phone gets the text within seconds; you get "missed call from … Auto-text sent."
4. Reply to the text from the calling phone; the reply arrives on your cell.
5. Call again, leave a voicemail; you get the recording link.

---

## Configuration

| Variable | Required | Default | Description |
|----------|:--------:|---------|-------------|
| `TWILIO_ACCOUNT_SID` | ✓ | | Account (or client subaccount) SID |
| `TWILIO_AUTH_TOKEN` | ✓ | | Auth token. Used **only** to verify `X-Twilio-Signature` on incoming webhooks; never used to call Twilio |
| `TWILIO_API_KEY_SID` | ✓ | | Standard API key SID (`SK…`), created in the same account or subaccount. Used for every outbound call to Twilio |
| `TWILIO_API_KEY_SECRET` | ✓ | | Secret for that API key (shown once at creation) |
| `TWILIO_NUMBER` | ✓ | | The Twilio number callers reach and texts come from (E.164, e.g. `+15615550199`) |
| `OWNER_CELL` | ✓ | | Owner's cell (E.164): rung in Dial mode, receives all notifications |
| `COMPANY_NAME` | ✓ | | Used in the caller text, screening prompt and notifications |
| `PUBLIC_BASE_URL` | ✓ | | Public https URL of this service, no trailing slash. Must match what Twilio calls or signatures fail |
| `CALL_MODE` | | `Dial` | `Dial` or `Forwarded` |
| `RING_SECONDS` | | `18` | How long to ring the owner (5–60). Keep it shorter than the owner's carrier voicemail pickup |
| `SCREEN_CALLS` | | `true` | Owner must press a key to accept |
| `CALLER_TEXT` | | *(see above)* | Text sent to missed callers; `{company}` is replaced |
| `REPEAT_TEXT_MINUTES` | | `10` | Don't text the same caller again within this window (0–1440) |
| `VALIDATE_TWILIO_SIGNATURE` | | `true` | Only set `false` for local testing without Twilio |
| `PORT` | | | Set by Railway automatically |

---

## Onboarding a client

Each client gets their own Twilio **subaccount** and their own Railway service (one deployment per client until multi-tenant lands).

1. **Collect at signup:** legal business name, EIN, business address, website, owner's name, email and cell.
2. **Twilio:** create a subaccount named for the client → buy a local number in it → register their **Secondary Customer Profile, Brand and Campaign** in that subaccount. Start this the day they sign; it's the longest step.
3. **Railway:** duplicate the service; set the subaccount's SID, auth token, a Standard API key created **in that subaccount**, and its number, `COMPANY_NAME`, `OWNER_CELL`, and `CALL_MODE=Forwarded`.
4. **Twilio number webhooks:** as in [step 3](#3-point-the-twilio-number-at-the-service), with the client's service URL; the client's Messaging Service must be set to **Defer to sender's webhook**.
5. **Their phone:** turn on **conditional call forwarding (no answer)** from their existing line to their Twilio number. Codes vary by carrier; do this on-site and test before you leave.
6. **Customize** `CALLER_TEXT` with their wording (and a booking link if they have one).

### Keep it compliant

- The caller text stays **informational and one-time**: no promotions, no follow-up campaigns, no list uploads.
- Clients never get Twilio access or a way to send free-form messages.
- Voicemail prompt makes recording obvious (Florida requires all-party consent to record calls); don't add silent call recording.

---

## Development

```bash
dotnet test GeekReceptionist.slnx              # 20 integration tests, no Twilio account needed
dotnet run --project src/GeekReceptionist.Api  # needs the variables above
```

To receive real calls locally, expose the port with a tunnel (e.g. `ngrok http 5000`) and set `PUBLIC_BASE_URL` to the tunnel URL.

### Endpoints

| Method | Path | Called by | Purpose |
|--------|------|-----------|---------|
| POST | `/twilio/voice/incoming` | Twilio | Call arrives: ring owner (Dial) or treat as missed (Forwarded) |
| POST | `/twilio/voice/screen` | Twilio | Whisper to owner: press a key to accept |
| POST | `/twilio/voice/screen-accepted` | Twilio | Owner accepted; call connects |
| POST | `/twilio/voice/dial-complete` | Twilio | Owner leg ended: missed or answered |
| POST | `/twilio/voice/voicemail-complete` | Twilio | Text owner the recording link |
| POST | `/twilio/sms/incoming` | Twilio | Forward reply text to owner; delete attachments |
| GET | `/health` | Railway | Health check |

### Project layout

```
src/GeekReceptionist.Api/
  Program.cs                 Webhook endpoints and TwiML
  ReceptionistOptions.cs     Environment configuration + startup validation
  MissedCallService.cs       Missed-call handling, repeat-caller window, screening state
  InboundSms.cs              Reply forwarding, attachment deletion
  Sms.cs                     Twilio SMS sender
  TwilioSignatureFilter.cs   X-Twilio-Signature validation
tests/GeekReceptionist.Tests/  WebApplicationFactory integration tests (fake SMS, signed requests)
```

### Architecture

A product service under the Geek platform rules (GeekBackend `Architecture.md`): product logic lives in its own backend, not in GeekAPI. It is **stateless** today (in-memory repeat-caller and screening state, reset on restart). When call history needs to persist, add a `geek_voice` schema in GeekRepository and reach it through GeekAPI `api/voice/internal/*`, the same pattern as Geek SEO.

---

## Roadmap

- [ ] Call and text history (`geek_voice` schema via GeekAPI) with an owner dashboard
- [ ] Multi-tenant: one deployment, client identified by the number called
- [ ] Business-hours rules (different text after hours)
- [ ] **AI voice receptionist:** answer the call, capture the job details, book or escalate; text-back remains the fallback

## License

MIT. See [LICENSE](LICENSE).
