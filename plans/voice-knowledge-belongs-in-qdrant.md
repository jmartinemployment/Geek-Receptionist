# The voice knowledge base duplicates infrastructure that already runs

Verified 2026-11-19 by direct reading of both repositories at HEAD. Jeff raised it: "Why did you
select Postgres when you had Hostinger VPS QDrant, embedding already built?"

## What is actually there

**Geek-Crawler-Rag, running on the Hostinger VPS, already has every piece.**

| Piece | Where |
|---|---|
| Embedding model | `config.py:58` — `BAAI/bge-small-en-v1.5` |
| Embedder | `local_embedding.py`, `llama_engine.py:260` |
| Vector store | `qdrant_store.py`, hybrid dense + BM25 sparse |
| Batching, failure handling | `embedding_batching.py`, `embedding_circuit.py`, `embedding_sanitize.py` |
| Owner-scoped index for GeekAPI | `POST /v1/context/assets/index` — *"Index one GeekAPI-authoritative revision over the authenticated service boundary"* |
| Owner-scoped retrieval | `POST /v1/context/assets/query` |
| Revocation | `POST /v1/context/assets/delete` — tombstones one owner-scoped resource |
| Switched on | `config.py:149` — `context_asset_indexing_enabled: bool = True` |

Every one of those routes is behind `require_api_key` and scoped by `ownerUserId`.

**Geek-Receptionist's voice knowledge base, in Postgres, has none of it.**

`geek_voice.knowledge_documents` and `geek_voice.knowledge_chunks` (migration `0060`, 2026-11-14)
hold `vector(384)` columns and a cosine search, `SearchVoiceKnowledgeCommand` takes a
`QueryEmbedding`, and `VoiceEmbedding.Dimensions = 384` carries the comment *"The size of an
embedding: BAAI/bge-small-en-v1.5"* — the same model, named, that the other repo is already
running.

There is no embedder anywhere in GeekAPI. `grep -rn "IEmbedding\|EmbedAsync\|bge-small"` across
every `.cs` file returns that one comment and nothing else. So nothing can turn a caller's question
into a vector, and `SearchKnowledgeAsync` has never been called from a call and cannot be.

## What this means

The storage was built twice and the working half was not used. The Postgres copy has never served a
single query and has no path by which it could. It is not "unfinished" — it is a second
implementation of something that already works, which is the exact failure this codebase has a
standing rule about: two implementations of one thing are what drift, and the one nobody runs is the
one that silently lies about what the product does.

## The correction

Voice knowledge goes through Geek-Crawler-Rag's context-asset routes, with `ownerUserId` set to the
tenant id. A business's accepted information (services, hours, service area, prices, FAQs, uploaded
menus and price lists, website content) is an operator-supplied asset, which is precisely what those
routes exist for. Qdrant stays the only vector store and `bge-small` stays the only embedder.

The Postgres knowledge tables and `SearchVoiceKnowledgeCommand` are then removed rather than left
dormant, because a surviving name is read as a live claim — the rule that `5a72445` was written to
enforce.

## One thing to settle before building it

`/v1/context/assets/index` authenticates each revision with an HMAC-SHA256 signature over canonical
bytes (`context_models.py:188-206`), keyed by `signature_key_id` from
`context_manifest_signing_keys`. Implementing the C# side means writing a second canonicalisation
that must agree with the Python one byte for byte, forever. That is the same shape as the corpus
drift this project has already been bitten by once.

Two ways to avoid a matched pair of canonicalisations:

1. Geek-Crawler-Rag exposes a plainer owner-scoped index/query for first-party callers, authenticated
   by the service API key it already requires, with no per-revision manifest signature.
2. The canonical form is defined once, in a shared fixture both sides test against, so a drift fails
   a test rather than a call.

Needs Jeff's call, because it changes what the RAG Library exposes.

## What is not affected

RAG stays Library-only: retrieval and verification, never generation. Nothing here adds a generate
path, and the receptionist's answers are produced GeekAPI-side from retrieved, owner-scoped text.
