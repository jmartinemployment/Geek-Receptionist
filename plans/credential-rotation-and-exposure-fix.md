# Credential rotation and exposure fix after the Railway incident (2026-11-23)

Rule (Jeff): any secret that lived in Railway on or before 2026-10-21 is treated as compromised. Every Railway and Vercel variable must change. No key is shared between platforms or callers. Only GeekAPI reaches GeekRepository, and nothing connects to a database directly. No secret is ever prefixed `NEXT_PUBLIC_`. Every key is scoped to the minimum endpoints, with a hard monthly spend limit at the provider.

Background: Railway disclosed on 2026-10-21 that variables were decrypted for a subset of workspaces (up to about 1.85%, roughly 100,000 accounts). Not verified: whether Jeff's workspace was in scope. Sources: the Hacker News article and Railway's notice (see `plans/securing-connections-research.md`).

## Done (2026-11-23)
- Inventory of every variable by name on all Railway services (GeekAPI, GeekRepository, geek-mcp-gateway, GeekOAuth, its Postgres) and all seven Vercel projects. Values are never read.
- Rotated `REPO_API_KEY`, `GEEK_REPOSITORY_API_KEY`, `MCP_GATEWAY_API_KEY` on GeekAPI, GeekRepository and the gateway, generated in the shell and not printed, then redeployed all three. Deployments succeeded; GeekAPI to GeekRepository calls returned 200 with the new key. The other two keys were not seen exercised in the logs.
- Audit of database exposure: `plans/database-access-audit.md`.

## Open exposures (fix in this order)
1. **GeekOAuth Postgres public TCP proxy** `zephyr.proxy.rlwy.net:16101` (service Postgres, port 5432). GeekOAuth uses the private host, so the proxy is unused. Delete it (blocked for the assistant; Jeff deletes it in Railway or adds a permission rule for `mcp__railway__delete-tcp-proxy`). Then rotate that Postgres password.
2. **Mongo on the VPS, port 27017 open to the internet** (a login is required). Close it with the WireGuard tunnel in `plans/database-access-audit.md`. Needs VPS access.
3. **SSH password login enabled** on the VPS. Set `PasswordAuthentication no`, root by key only, hardware-backed keys.
4. **Geek-SEO and content-writer Supabase credentials**: revoke the role, remove the settings, confirm nothing is deployed.

## Rotation waves
- **Wave 1, done:** the three internal Railway keys above.
- **Wave 2, internal keys with a second holder, assistant can do once the second side is reachable:**
  - `GEEK_CRAWLER_RAG_API_KEY` (GeekAPI and the RAG API on the VPS): needs the VPS.
  - `GEEK_PLATFORM_ADMIN_KEY`, `CLIENT_SECRET_GEEKAPI` (GeekAPI and GeekOAuth): check who holds each first.
  - `GEEK_BACKEND_API_KEY`: shared today by GeekAPI and three Vercel projects. Change GeekAPI to accept one named key per caller first; do not give the same new value to all three.
- **Wave 3, provider secrets, Jeff creates the new value in each console, the assistant sets it in Railway or Vercel without printing it:** Twilio (auth tokens and API key secret), PayPal client secret, Google client secrets, Anthropic and OpenAI keys, DataForSEO, Meta app secret, GitHub token, Resend, SMTP, Ideogram, Google API key, the object-store key. Use a separate key per service, scoped to the minimum, with a monthly cap.
- **Wave 4, sealing and signing keys, needs a code change first:** `VOICE_ENCRYPTION_KEY`, `GEEK_SOCIAL_ENCRYPTION_KEY`, `GEEK_GTM_ENCRYPTION_KEY`, `GEEK_SEO_ENCRYPTION_KEY`, signing keys (`RECEPTIONIST_JWT_SIGNING_KEY`, the snapshot and manifest keys). Rotating without dual-key decryption makes sealed data unreadable. Find what each protects before touching it.
- **Databases:** rotate the Supabase password and the Mongo and Postgres credentials after the network exposure is closed.

## Structural changes
- Portal to GeekAPI: replace the stored key with Vercel's OIDC token; GeekAPI pins `owner_id`, `project_id`, `environment == production` and its own audience. Research: `plans/vercel-machine-identity-for-geekapi.md`. Railway issues no workload identity, so GeekAPI and GeekRepository still hold stored secrets.
- Mongo path: WireGuard with wireproxy, fail-loud entrypoint, no registration API. Details: `plans/database-access-audit.md`.
- Add a build check that fails if a `NEXT_PUBLIC_` name looks secret (SECRET, PASSWORD, TOKEN, PRIVATE, API_KEY), with an allowlist for the intentionally public keys. Today no secret has the prefix.
- Repeatable infrastructure audit (ports, public database proxies, shared variables, SSH methods, key holders), since `/security-review` only reads git diffs.

## Verification after each wave
Deployment status is not health (a deploy can succeed and crash-loop). After every redeploy read the service's logs for a ready line and a successful call that uses the new key, and check the callers' logs.
