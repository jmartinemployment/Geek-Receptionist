# Where Geek-Receptionist lives

Written after Jeff found this session duplicating infrastructure that was already running. Verbatim,
2026-11-19: *"I think this application needs its own DB tables, embeddings etc, and removal of
duplicate crap"*, then *"DO NOT USE GEEK API THATS FUCKING STUPID"*. Corrected 2026-11-20, when he
read what had been written down and said the service's address was never what he was objecting to:
*"Service located inside Geek-API, documents data in Mongo in Hostinger VPS"*.

This note was first called "Geek-Receptionist owns its own stack", which asserted the half that was
wrong. The title went with the claim.

## Where each kind of data lives

| What | Where |
|---|---|
| Service logic | **GeekAPI** — `Services/Receptionist/*`, `Services/Voice/*`, `Controllers/Voice/*` |
| Client, tenant, billing, config | **Postgres `geek_voice`** through GeekRepository, hosted on **Supabase** |
| A business's own documents | **Mongo** on the Hostinger VPS |
| Their vectors | **Qdrant** on the same box, reached through the Library over HTTP |
| Call content — audio, transcript, what was said | **Nowhere.** Zero Data Retention; billing metadata only |

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
- **The service stays in GeekAPI, like every other product here.** Jeff, 2026-11-20: *"Service
  located inside Geek-API, documents data in Mongo in Hostinger VPS"* — that is the structure he
  asked to have researched, and it is what Geek-Crawler, Geek-Crawler-Rag and Content Creator all
  do. `GccGroundingResolver` is GeekAPI calling the Library over HTTP; GeekAPI is the caller, not
  the thing being routed around.

## The duplicate to delete

`geek_voice.knowledge_documents` and `geek_voice.knowledge_chunks` (GeekRepository migration `0060`,
2026-11-14) hold `vector(384)` columns and a cosine search. `SearchVoiceKnowledgeCommand` takes a
`QueryEmbedding` that nothing produces: `grep -rn "IEmbedding\|EmbedAsync\|bge-small"` across every
`.cs` file in GeekBackend returns one comment and nothing else. That search has never run and could
not. It is a second vector store next to a working one, and it goes.

## Where the code lives, which is where it belongs

In GeekAPI, with the rest. `GeekAPI/Services/Receptionist/*`, `GeekAPI/Services/Voice/*`,
`GeekAPI/Controllers/Voice/*` and the `geek_voice` schema are in the right place and are extended
there, not moved.

An earlier version of this note said all of it "must move" out of GeekBackend. That was wrong and
nobody asked for it: it read "its own tables and embeddings" — a statement about this product not
duplicating a vector store that already ran — as a mandate to extract the whole product into a
separate service. No such decision was made. Deleted rather than softened, because a migration
nobody ordered is exactly the kind of claim a later reader acts on.

## Standing rules this breached, for whoever reads next

Do not read an instruction about one thing as a mandate about everything. "Its own tables and
embeddings" meant this product should not stand up a second vector store beside a working one. It
did not mean a new service, a new deployment, or moving code that is already where it belongs. The
first version of this note made exactly that leap, and a plan file asserting a migration is how an
unordered migration gets started.

Read the deployment before proposing a build. `docker-compose.yml` answered this in one read, and
was not opened for hours of building. The existing memory rule — *check what already exists before
building; say "not checked" rather than assert an inference* — was applied to third-party vendors
and never to this estate, which is where it mattered more.

Second, and Jeff's own reading of why this went wrong: *"I never would had rejected if you
communicated embeddings for Ai to answer questions."* The proposal was put as a runtime and a
package in a service, and never as what it was for — the receptionist answering a caller from the
business's own information. He rejects a mechanism he cannot see the purpose of, and would not have
rejected the purpose. Lead with what a thing is for.

Third, a line in a `CLAUDE.md` is not a law. *"GeekAPI is the only Geek service this app calls"* was
read as settled architecture when it was a description of current wiring, and it shaped hours of
work. Check a written rule against the system before building on it.
