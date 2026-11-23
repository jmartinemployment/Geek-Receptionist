# Database access audit, 2026-11-23

Rule (Jeff): GeekRepository talks only to and accepts connections only from GeekAPI; nothing else connects to a database directly.

## Verified
- Only GeekAPI holds `REPO_URL`; Geek-SEO's own code says it must not. GeekRepository refuses callers without `REPO_API_KEY`.
- GeekRepository and geek-mcp-gateway have no public domain and no TCP proxy on Railway (private network only).
- VPS `2.24.101.90`: Qdrant 6333 and the RAG API 8080 refuse outside connections. SSH 22 is open and offers `publickey` and `password` (password login is enabled; consider key-only).
- Mongo 27017 on the VPS accepts connections from the internet. An unauthenticated `listDatabases` was refused (error 13, requires authentication), so a credential is required. The exposure is the open port, not an open database.

## Violations of the rule
- Mongo 27017 is open to the internet; the September notes called it an accepted risk (master-plan P5) and it was never closed. It is open because GeekRepository on Railway reaches it across the public internet.
- `Geek-SEO/content-writer` and the dead Geek-SEO hold a Postgres connection string (`CONTENT_WRITER_DATABASE_URL` / `DATABASE_URL`, same Supabase instance as GeekRepository, schema `geek_seo`). Geek-SEO is dead: revoke its database login, remove its settings.
- Geek-Crawler-Rag connects to Mongo and Qdrant directly, and its scripts do the same from a laptop.

## Not verified
- Supabase network restrictions (dashboard: Database settings, Network Restrictions).
- The VPS firewall (`ufw status verbose`, `docker ps`); no tool here can read it and no SSH key is available.
- Whether Geek-SEO or content-writer is still deployed anywhere.

## Options to close Mongo (a decision for Jeff)
1. Firewall Mongo to Railway's static outbound IPs. Railway's static outbound IPs need the Pro plan, are shared with other workloads (per Railway staff in the forum), and the addresses changed when the feature was toggled (forum report). Allowlisting an address is not a strong identity.
2. A private tunnel (WireGuard or Tailscale) between Railway and the VPS.
3. A managed Mongo with allowlists or private links.
Sources: docs.railway.com/networking/static-outbound-ips; Railway Station forum threads.
