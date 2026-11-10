# Geek-Receptionist

Missed-call text-back for small businesses: the first feature of the Geek @ Your Spot AI Receptionist.

When a call goes unanswered, the caller gets a text within seconds in the business's name, the owner gets a notification, and the caller can leave a voicemail (the owner is texted the recording link).

## How it works

```
Caller ──► Twilio number ──► POST /twilio/voice/incoming
                                │
             CALL_MODE=Dial     │      CALL_MODE=Forwarded
   ring OWNER_CELL (RING_SECONDS)│      (client's own line already rang and forwarded here)
   owner presses a key? ─ yes ─► connected, nothing sent
             │ no / voicemail / busy          │
             ▼                                ▼
   text caller (once per REPEAT_TEXT_MINUTES) + notify owner + offer voicemail
```

| Endpoint | Purpose |
|----------|---------|
| `POST /twilio/voice/incoming` | Call arrives: ring the owner (Dial) or treat as missed (Forwarded) |
| `POST /twilio/voice/screen` | Whisper to the owner: "press any key to accept" |
| `POST /twilio/voice/screen-accepted` | Owner accepted; call connects |
| `POST /twilio/voice/dial-complete` | Owner leg ended: decide missed vs answered |
| `POST /twilio/voice/voicemail-complete` | Text the owner the recording link |
| `GET /health` | Railway health check |

**Call screening** (`SCREEN_CALLS=true`) matters: without it, the owner's own cell voicemail "answers" the call, Twilio reports it as completed, and the missed call is never texted.

All `/twilio/*` requests must carry a valid `X-Twilio-Signature`; anything else gets 403. Configuration is validated at startup and the service refuses to start with a list of every problem.

## Architecture

Product service, per the platform rules in GeekBackend `Architecture.md`: product logic lives in its own backend, not in GeekAPI. Today it is **stateless** (in-memory repeat-caller window and screening state). When call history or multiple clients need persistence, add a `geek_voice` schema in GeekRepository and reach it through GeekAPI `api/voice/internal/*`, the same way Geek SEO does.

## Run locally

```bash
cp .env.example .env   # fill in values
dotnet test GeekReceptionist.slnx
dotnet run --project src/GeekReceptionist.Api
```

To receive real calls locally, expose the port (e.g. `ngrok http 5000`) and set `PUBLIC_BASE_URL` to the tunnel URL. The signature check depends on it matching exactly.

## Deploy (Railway)

1. New Railway service from this repo (uses `Dockerfile` via `railway.toml`).
2. Set the variables from `.env.example`. `PUBLIC_BASE_URL` = the service's public https domain.
3. In the Twilio Console → Phone Numbers → your number → **Voice: A call comes in** → Webhook, `POST`, `https://<PUBLIC_BASE_URL>/twilio/voice/incoming`.
4. Call the number from another phone and don't answer.

## Before texting real customers

- **A2P 10DLC registration is required** for SMS from a US local number. Unregistered texts are blocked (Twilio error 30034, which the owner notification will show). Register the brand + campaign in Twilio Console → Messaging → Regulatory Compliance. Each client business needs its own registration; approval typically takes 1–3 weeks.
- **Trial accounts** can only text verified numbers and prefix "Sent from your Twilio trial account". Upgrade before recording a demo.
- Twilio handles STOP / HELP opt-outs automatically on the number.

## Client setup (Forwarded mode)

Clients keep their existing number. On their line, enable **conditional call forwarding (no answer)** to the client's Twilio number (codes vary by carrier), deploy an instance with `CALL_MODE=Forwarded`, `COMPANY_NAME` and `OWNER_CELL` set for that client.

## Roadmap

- Persist calls and texts (`geek_voice` schema via GeekAPI) and a dashboard
- Multi-tenant: one deployment, client looked up by the called number
- AI voice answering (the full AI Receptionist)
