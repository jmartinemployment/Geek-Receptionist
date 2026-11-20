# Geek-Receptionist owns its own stack

Decided by Jeff, 2026-11-19, after he found this session building into GeekAPI and duplicating
infrastructure that was already running. Verbatim: *"I think this application needs its own DB
tables, embeddings etc, and removal of duplicate crap"*, then *"DO NOT USE GEEK API THATS FUCKING
STUPID"*.

## What is already running, verified by reading the deployment

`Geek-Crawler-Rag/docker-compose.yml` on the Hostinger VPS:

| Piece | Where | Notes |
|---|---|---|
| Vector store | **Qdrant v1.13.4**, port 6333 | 3 GB cap, `MAX_SEARCH_THREADS=1`, persistent volume |
| Embedder | **`BAAI/bge-small-en-v1.5`**, in-process fastembed/ONNX | `local_embedding.py`; offloaded with `asyncio.to_thread` |
| API | port 8080, 2 GB cap | `require_api_key` on every route |
| Mongo | colocated on the same box | |
| TLS / routing | Caddy | `deploy/Caddyfile` |

**Nothing about embeddings or vector search needs building.** It is deployed, it is capped, and it
has been running. A proposal to add ONNX Runtime to a .NET service, or to ship a 127 MB model in a
container image, was made earlier in this session and is wrong: it was reaching for a build without
reading the deployment.

## The architecture

- **Geek-Receptionist is its own application.** Its own service, its own database tables, its own
  Qdrant collection, its own embeddings.
- **It uses the infrastructure that exists** — the VPS, that Qdrant, that embedding model. Its own
  *data* in it, not its own copy of it.
- **It does not use the crawler's corpus or its signed-manifest asset routes.** Those are built
  around crawl provenance; a phone receptionist should not inherit either.
- **GeekAPI is out of the path.** Not the embedder's home, not the call loop's home.

## The duplicate to delete

`geek_voice.knowledge_documents` and `geek_voice.knowledge_chunks` (GeekRepository migration `0060`,
2026-11-14) hold `vector(384)` columns and a cosine search. `SearchVoiceKnowledgeCommand` takes a
`QueryEmbedding` that nothing produces: `grep -rn "IEmbedding\|EmbedAsync\|bge-small"` across every
`.cs` file in GeekBackend returns one comment and nothing else. That search has never run and could
not. It is a second vector store next to a working one, and it goes.

## What is on the wrong side of the line

Everything built for this product in this session lives in GeekBackend and must move, not grow:

- `GeekAPI/Services/Receptionist/*` — the ConversationRelay session, the agent loop, consent,
  the end-of-call record.
- `GeekAPI/Services/Voice/*` — telephony, billing, onboarding, MCP calendar, storage connectors.
- `GeekAPI/Controllers/Voice/*` — the tenant call, OAuth, calendar and storage routes.
- `GeekRepository` — the `geek_voice` schema and `VoiceRepository`.

The portal's `CLAUDE.md` still describes the current wiring, which is real today: the Next.js app
calls GeekAPI and nothing else. That is a statement of where the code is, not of where it belongs.

## Standing rules this breached, for whoever reads next

Read the deployment before proposing a build. `docker-compose.yml` answered this in one read, and
was not opened for hours of building. The existing memory rule — *check what already exists before
building; say "not checked" rather than assert an inference* — was applied to third-party vendors
and never to this estate, which is where it mattered more.
