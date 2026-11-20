# Geek-Receptionist handoff — 2026-11-19

Read `plans/receptionist-owns-its-stack.md` first. It holds the architecture decision this handoff
is written under, and the reason it was made.

## The one thing to know

**Geek-Receptionist is its own application.** Its own service, its own database tables, its own
Qdrant collection and embeddings — rather than those being built into GeekAPI by default.

**This is not all-or-nothing.** Jeff, 2026-11-19: *"It's not all vps or all GeekAPI"*. Which pieces
stay shared is not decided; settle each with him rather than reading a blanket rule into it. What
was rejected was duplicating infrastructure that already runs, and proposing where to put a thing
without saying what it was for.

**Qdrant and the embedder are already deployed** on the Hostinger VPS: Qdrant v1.13.4 on 6333 and
`BAAI/bge-small-en-v1.5` running in-process in the RAG API, behind Caddy, alongside Mongo. Nothing
about embeddings or vector search needs building. Read `Geek-Crawler-Rag/docker-compose.yml` before
proposing otherwise.

## Built this session, and where it is

All of it is in **GeekBackend**, all of it tested, all of it pushed to `main`. Suite: **4378 tests
green** (`GccRequestThatFitsTests` has a long-standing timing flake that passes on rerun).

| What | Where | Commit |
|---|---|---|
| End-of-call record, delivered by email | `GeekAPI/Services/Voice/Email/EmailCallSummaryDelivery.cs` | `8af6ba70` |
| Two-mode consent gate (passive disclosure default, strict keypress optional) | `ReceptionistConsent`, migration `0077` | `7d51c38f` |
| Spoken mid-call failure fallbacks | `ReceptionistRelaySession` | `54edde9a` |
| Tool outcome flags; a call the AI never answered is no longer billed | `CallOutcomes`, `TwilioCallStatusRecorder` | `aae11f05` |
| Failed bookings route as messages | `CallSummaryPlan.DeliverAlways` | `564bd499` |
| BYOS groundwork: record object, write-only port, shared Google token path | `Services/Voice/Storage/*`, migration `0078` | `bccc1a30` |
| Google Drive writer + dead-letter fallback to email | `GoogleDriveCallRecordStorage` | `8ac65b39` |
| Drive OAuth connection + `storage/check` | `GoogleConnections`, `StorageController` | `4b412c03` |
| S3 / GCS writer, hand-written SigV4, migration `0079` | `S3CompatibleCallRecordStorage`, `AwsSignatureV4` | `a6f99d17` |
| Minimal IAM policy generator, bucket save, tier gate | `StorageSetupPolicy`, `StorageController` | `238edfef` |
| Business hours finally reach the receptionist's prompt | `ReceptionistConsent.BusinessHoursText` | `9622e25f` |

Portal side (this repo): the Drive card and bucket form on the dashboard (`dc5403f`, `61fc74a`),
61 tests green, typecheck clean, lint unchanged at five pre-existing warnings.

## Delete, do not preserve

`geek_voice.knowledge_documents` and `geek_voice.knowledge_chunks` (GeekRepository migration `0060`)
are a second vector store with no embedder. `SearchVoiceKnowledgeCommand` takes a `QueryEmbedding`
nothing produces. That search has never run and cannot. Qdrant already does this job.

## Not built, and why

- **Short-call grace threshold.** The plan gives a range ("10–15 seconds", "e.g., 20 short calls per
  month"), not a number. Needs Jeff's figure.
- **Transfer bridge and post-transfer bridged minutes.** Both wait on the ConversationRelay
  `Connect` action-URL behaviour, which the plan itself lists as one of three undocumented Twilio
  behaviours Phase 1 must prove on a test number first. The caller is told to hold; the bridge is
  not built.
- **Notification channel beyond email.** Jeff said "None" on 2026-11-19, subject to change. The
  call-record mechanism is built and inert; do not build delivery or re-propose email.
- **Signup form steps.** Jeff drives these one short instruction at a time. Do not add them.

## Open, needs Jeff

1. Whether the voice code is extracted from GeekBackend now or later, and into what.
2. The short-call billing threshold, in seconds, and the monthly cap.
3. Google Cloud console: the OAuth client needs `{PORTAL_BASE_URL}/oauth/mcp/google_drive/callback`
   registered and `drive.file` added to the consent screen, or the Drive Connect button returns a
   redirect-URI mismatch. `drive.file` is not a restricted scope, so no verification review.
4. Migrations `0075`–`0079` are written and not yet applied to a live database.

## How this went wrong, so it does not again

This session built for hours inside GeekAPI and proposed adding an ONNX embedder to it, while
Qdrant and `bge-small` were already running on the VPS. The cause was reading documents instead of
the system: `CLAUDE.md` and the plan's "What Needs to Be Built" list were treated as the map, and
`docker-compose.yml` — which answers it in one read — was never opened. **Read the deployment
before proposing a build.**
