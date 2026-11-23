# Credential rotation and exposure fix after the Railway incident (2026-11-23)

Rule (Jeff): any secret that lived in Railway on or before 2026-10-21 is treated as compromised. Every Railway and Vercel variable must change. No key is shared between platforms or callers. Only GeekAPI reaches GeekRepository, and nothing connects to a database directly. No secret is ever prefixed `NEXT_PUBLIC_`. Every key is scoped to the minimum endpoints, with a hard monthly spend limit at the provider.

Background: Railway disclosed on 2026-10-21 that variables were decrypted for a subset of workspaces (up to about 1.85%, roughly 100,000 accounts). Not verified: whether Jeff's workspace was in scope. Sources: the Hacker News article and Railway's notice (see `plans/securing-connections-research.md`).

## Done (2026-11-23)
- Inventory of every variable by name on all Railway services (GeekAPI, GeekRepository, geek-mcp-gateway, GeekOAuth, its Postgres) and all seven Vercel projects. Values are never read.
- Rotated `REPO_API_KEY`, `GEEK_REPOSITORY_API_KEY`, `MCP_GATEWAY_API_KEY` on GeekAPI, GeekRepository and the gateway, generated in the shell and not printed, then redeployed all three. Deployments succeeded; GeekAPI to GeekRepository calls returned 200 with the new key. The other two keys were not seen exercised in the logs.
- Audit of database exposure: `plans/database-access-audit.md`.
- GeekOAuth Postgres public TCP proxy (`zephyr.proxy.rlwy.net:16101`) deleted; a fresh listing shows none. Its password is not yet rotated.
- VPS access exists: `~/.ssh/hostinger_rag_ed25519` as root (the one authorized key, `cursor-rag-backfill`, last changed 2026-10-13). VPS audit since 2026-10-26 (the rotated logs start there): every accepted login was that key and none by password; 229 failed password attempts from the internet, no success; no unexpected users, cron or recently changed files; Mongo's log (2026-11-11 on) shows only the local RAG API, GeekRepository (.NET) and the laptop, with no authentication failures. **Unexplained, so the key was replaced (2026-11-23):** six accepted logins on 2026-10-26 13:49-13:54 UTC with that key from `20.115.146.234` and `135.232.224.103` (Azure ranges), each lasting about a second; Jeff could not say they were his. A new ed25519 key (`geek-vps-2026-11-23`, no passphrase) was added, tested from a fresh connection, and the old key removed from `authorized_keys`; the old key is refused. The new key lives at `~/.ssh/hostinger_rag_ed25519` (same path, so the Rag scripts keep working); the old one is archived as `~/.ssh/revoked-hostinger_rag_ed25519-2026-11-23`. Still to do: a passphrase or hardware-backed key, and check whether hPanel holds another root key (the panel can inject one).
- SSH password login is off (`/etc/ssh/sshd_config.d/00-hardening.conf`; `50-cloud-init.conf` was overriding the `no` in `60-`), root by key only; verified from a fresh connection with a second session held open.
- Mongo is behind WireGuard with TLS (cutover 2026-11-23 10:11): `mongo:7.0` publishes only on `10.8.0.1` (tunnel) and `172.16.0.1` (the Docker bridge, which the RAG API uses; this host's bridge is `172.16.0.1`, not `172.17.0.1`), `requireTLS` with `--tlsCAFile` and `--tlsAllowConnectionsWithoutCertificates` (Mongo 7 refuses TLS with no chain of trust). The port is no longer open on the public IP. CA and server certificate in `~/geek-secrets/mongo-pki` (the CA key stays there; the server certificate expires 2027-11-23). Compose backups: `/docker/*/docker-compose.yml.pre-tls`. The RAG API runs against it and is healthy. GeekRepository's Railway variables are set (`WG_*`, `MONGO_CA_PEM`, `MONGO_CRAWLER_URL` now `127.0.0.1:27017` with TLS); the old URL is in `~/geek-secrets/rollback/`.
- Wave 2, RAG: `GEEK_CRAWLER_RAG_API_KEY` rotated on GeekAPI and the RAG API. The RAG's index-status webhook was sending the shared `GEEK_BACKEND_API_KEY`; it now sends GeekAPI's per-caller key `GEEK_API_KEY_GEEK_CRAWLER_RAG`.

## Open exposures
1. **UDP 51820 does not reach the VPS, so the Mongo tunnel is down and GeekRepository cannot reach Mongo (blocked 2026-11-23).** GeekRepository sends handshake initiations and the VPS receives none; from the laptop neither UDP nor ICMP arrives, while TCP does. The VPS itself is fine (listening, `INPUT` accepts, `wg0` up). The cause is upstream of the box, most likely Hostinger's VPS firewall (hPanel, VPS, Security, Firewall): allow UDP 51820 from any. No connected tool reaches that firewall. Until it is open, anything that reads Mongo through GeekRepository fails loudly. Rollback if needed: restore `/docker/mongodb/docker-compose.yml.pre-tls` and set `MONGO_CRAWLER_URL` from `~/geek-secrets/rollback/geekrepository-mongo-url.old`, which reopens the public port.
2. **Mongo password: rotated 2026-11-23 10:18** (`crawler_admin`; the old one is refused). Holders updated: the Mongo and RAG compose files and GeekRepository's `MONGO_CRAWLER_URL`. **Laptop scripts still hold the old one and will fail until they use the new one** (read it from `/docker/mongodb/docker-compose.yml`, `MONGO_INITDB_ROOT_PASSWORD`; in a URL it must be percent-encoded if it has special characters, and the Mongo password shown in compose is the raw one; the old URL in `~/geek-secrets/rollback/` carries the dead password). One shared root user serves all three holders; separate users per service are better. Lesson from the first attempt: the stored URL carried a percent-encoded copy that does not authenticate when typed directly, and the Railway variable was changed before the Mongo change had been confirmed, so a failed step left a wrong password in Railway for a few minutes. Confirm the database change before touching the holders.
3. **Rotate the GeekOAuth Postgres password** now that its proxy is gone.
4. **Geek-SEO and content-writer Supabase credentials**: revoke the role, remove the settings, confirm nothing is deployed (the role name is not in any local `.env`; it has to come from Supabase).
5. **`/etc/cron` `@reboot /opt/start-mongodb.sh`** on the VPS starts a host `mongod` that is not installed; dead, remove it.

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

## Added gaps (from Jeff's review notes, 2026-11-23)
- **Revoke sessions and tokens:** rotating `CLIENT_SECRET_GEEKAPI`, `RECEPTIONIST_JWT_SIGNING_KEY` and the Google and Meta secrets does not invalidate tokens already issued. Purge refresh tokens in GeekOAuth Postgres and bump the key ids so tokens taken on 2026-10-21 stop working.
- **Audit logs from 2026-10-20 to now:** Railway deployment and build logs, Vercel logs, and the VPS `/var/log/auth.log`, `authorized_keys` and outbound connections.
- **Webhook signing secrets** (Wave 3): Twilio, PayPal, Meta, GitHub and Resend. A stolen webhook secret lets an attacker forge payment or message events against GeekAPI.
- **Wave 4 re-encryption:** after dual-key decryption (old and new key) is deployed, run a batch job that re-encrypts every row to the new key, then delete the old key from Railway entirely.
- **Git and build-log hygiene:** check git history, `plans/`, and test scripts for pre-incident keys, and that Railway and Vercel build logs do not echo variables.
- **Vercel OIDC migration:** GeekAPI validates `iss` (team issuer), `aud`, pinned `owner_id`, `project_id` and `environment`, with minimal clock skew; remove `GEEK_BACKEND_API_KEY` from Vercel as soon as the OIDC path is verified so callers cannot fall back to the static key.
- **SSH lockout:** keep a second session open and confirm key login before disabling passwords.
- The Mongo and VPS steps are detailed in `plans/mongo-wireguard-runbook.md`.
