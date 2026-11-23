# Stable, hard-to-forge identity for an operator's machine and a Railway service (as of 2026-11-23)

Scope note: comparison only, no recommendation. Claims in "Cited Findings" come from pages fetched or surfaced by search this session. Search-tool summaries (not full fetches) are flagged where relied on.

## 1. mTLS client certificate (OS keychain / hardware token): how it works for SSH-adjacent and database access, failure modes

### Takeaway
Databases can authenticate a client certificate directly (Postgres `cert`/`clientcert`, MongoDB MONGODB-X509), so the cert subject becomes the identity independent of IP. Plain SSH does not use X.509; its equivalent is OpenSSH certificates (section 4).

### Cited Findings
- Postgres `cert` authenticates by SSL client certificate instead of a password; the certificate CN is the database user name by default (`clientname=CN`), or the full DN with `clientname=DN` plus a `pg_ident.conf` map — [PostgreSQL pg_hba.conf docs](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
- Postgres `clientcert=verify-full` requires a CA-trusted cert whose CN matches the user/map and can be combined with another auth method such as SCRAM, giving cert plus password — [PostgreSQL pg_hba.conf docs](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
- `hostssl` records match only SSL connections; if SSL is not enabled on the server, a `hostssl` record is ignored with a logged warning — [PostgreSQL pg_hba.conf docs](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
- MongoDB X.509 auth: server verifies the client cert against a CA, then maps the cert `subject` to a user in `$external`; each unique certificate maps to exactly one user; requires `requireTLS` and a CA file; page covers standalone instances, replica sets/sharded clusters need separate member-auth setup — [MongoDB x.509 client auth](https://www.mongodb.com/docs/manual/tutorial/configure-x509-client-authentication/)
- MongoDB: with `allowInvalidCertificates` an invalid cert can still open a TLS connection but is insufficient for authentication — [MongoDB x.509 client auth](https://www.mongodb.com/docs/manual/tutorial/configure-x509-client-authentication/)
- Secure Enclave keys (per search-surfaced Apple-adjacent material; Apple page body did not load, see Gaps): P-256 only, generated inside the enclave, private key not exportable — unverified from the source in this session.

### Inferences
- Because identity is the cert subject plus CA signature, a dynamic home IP is irrelevant to this method (inference from how the mechanisms above work).
- Failure modes (inference, not sourced except where noted): private key stored as a file in a keychain without hardware backing can be copied; a lost/rotated CA or expired cert locks the client out; revocation needs CRL/OCSP or a short cert lifetime (the Postgres and Mongo pages fetched did not describe revocation); the Mongo page's one-cert-one-user mapping and subject-format rules mean cert reissue requires a server-side user change.
- Server-side failure mode that is sourced: a Postgres `hostssl` rule silently not matching when SSL is off.

### Gaps
- Apple documentation on Secure Enclave / keychain non-exportable client-certificate identities could not be retrieved (page body empty); the specifics of using a Secure Enclave key as a TLS client identity in a non-Safari client (e.g. an Electron app, a DB driver) are unverified.
- No source retrieved on Postgres/Mongo certificate revocation behavior.
- Whether Railway's TCP proxy passes TLS client certificates through to a database untouched was not checked.

## 2. WireGuard and Tailscale: device identity, ACL scope, Railway service as a node

### Takeaway
Both identify a device by a public key; WireGuard restricts only by IP ranges per key, Tailscale adds user/tag-based ACLs, SSH rules and posture checks. A Railway service can join a tailnet (userspace mode, tagged ephemeral key), and Railway publishes templates doing so.

### Cited Findings
- WireGuard's central idea is cryptokey routing: public keys associated with lists of allowed tunnel IPs; peers are identified by their static public key — [WireGuard](https://wireguard.com/) and [NDSS 2017 paper](https://www.ndss-symposium.org/wp-content/uploads/2017/09/ndss2017_04A-3_Donenfeld_paper.pdf) (the exact whitepaper wording was reported via search summary, not read in full)
- AllowedIPs acts as a routing key on send and as an ACL on receive (source IP of a decrypted packet must be in that peer's allowed IPs) — [Ubuntu WireGuard docs](https://ubuntu.com/server/docs/explanation/intro-to-wireguard-vpn/) and [Black Hat 2018 slides](https://www.Wireguard.com/talks/blackhat2018-slides.pdf) (via search summary)
- Tailscale: machine key identifies the physical device to the coordination server; node keys authorize network access; private keys never leave the device; removing a device in the admin console revokes its node key — [Tailscale node keys](https://tailscale.com/docs/concepts/node-keys), [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity) (via search summary)
- Tailscale ACLs consider both user and node identity; posture assertions can be required per rule via `srcPosture`; attribute availability varies by plan — [Tailscale device posture](https://tailscale.com/docs/features/device-posture) (via search summary)
- Tailnet Lock requires a trusted node to sign any new node's key before it can join — [Tailnet Lock](https://tailscale.com/docs/features/tailnet-lock.md) (via search summary)
- Tailscale SSH: authenticates over WireGuard using node keys, no client SSH key needed; `ssh` ACL rules have `action` accept/check, src/dst users/groups/tags, `users` list; port 22 only; check mode re-auths via the IdP; tagged devices cannot be the source in check mode; any OS user on the client can connect; separate SSH keys must be removed separately — [Tailscale SSH docs](https://tailscale.com/docs/features/tailscale-ssh)
- Containers without `/dev/net/tun` can run `tailscaled` in userspace mode as a SOCKS5/HTTP proxy that apps connect through; HTTP proxy handles only HTTP(S), SOCKS5 any traffic; docs recommend ephemeral nodes and auth keys there; the page does not cover inbound connections — [Tailscale userspace networking](https://tailscale.com/docs/concepts/userspace-networking)
- Tags must be declared in `tagOwners`; ephemeral tagged auth keys auto-remove the device when the container stops; persisting state (`TS_STATE_DIR`) avoids re-auth — [Tailscale Docker params](https://tailscale.com/docs/features/containers/docker/docker-params), [Tailscale containers docs](https://tailscale.com/docs/features/containers) (via search summary)
- Railway's guides say the Tailscale Forwarder template replaces the deprecated Subnet Router template (the old router advertised the shared fd12::/16 range so only one router per tailnet worked); the forwarder joins the tailnet as a machine and forwards ports to services on Railway's private network; targets must listen on `::` — [Railway: set up a Tailscale forwarder](https://docs.railway.com/guides/set-up-a-tailscale-forwarder)
- A community "Tailscale Subnet Router" template runs userspace mode, requires a reusable ephemeral tagged auth key and optionally a volume at `/var/lib/tailscale` — [Railway template](https://railway.com/deploy/tailscale-subnet-router)

### Inferences
- A Railway service's tailnet identity would be a tag (e.g. a tag owned by an admin) plus node key, not a Railway-issued credential; the trust anchor is the auth key stored in Railway variables (inference; the same stored-secret weakness exists as with any key in env vars).
- Ephemeral nodes plus no persisted state mean a new node identity each deploy; with a volume the identity persists (inferred from the sources above).
- Raw WireGuard on Railway was not researched; whether a Railway container permits a kernel WireGuard interface is unknown.

### Gaps
- Inbound connectivity to a userspace-mode Tailscale node (e.g. a database reached from a Railway service in the other direction) is not covered by the fetched page.
- Which Tailscale plans include device posture/Tailnet Lock was not verified; pricing not checked.
- Official wireguard.com whitepaper text was not read directly.

## 3. Cloudflare Tunnel / Access with service tokens or mTLS

### Takeaway
Cloudflare Access can authenticate a machine with a service token (HTTP headers) or a client certificate (mTLS), and a tunnel keeps the origin from exposing a public port. Documentation retrieved covers HTTP; raw database/TCP use was not confirmed.

### Cited Findings
- Service tokens: a Client ID and Client Secret sent as `CF-Access-Client-Id` / `CF-Access-Client-Secret` headers; policy action must be Service Auth; secret shown once; tokens support up to five tags; rotation grace 1 hour to 30 days; leaked tokens can't be re-enabled until rotated; strict service-token auth (401/403 instead of login redirect) is default for organizations created on or after 2026-10-05 — [Cloudflare service tokens](https://developers.cloudflare.com/cloudflare-one/identity/service-tokens/)
- That page documents only HTTP usage and does not say whether service tokens work for non-HTTP protocols — same source
- Access mTLS: client certificates checked at TLS handshake against an uploaded CA, usable for device authentication or as second factor; needs an Access policy with Valid Certificate or Common Name rule; Free plan lacks mTLS but has service tokens (Enterprise or pay-as-you-go required); applies to an Access application on a hostname; forwarded `cert_rfc9440` fields are populated even if validation fails, so check `cf.tls_client_auth.cert_verified` — [Cloudflare Access mTLS](https://developers.cloudflare.com/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/)
- SSH through Cloudflare: `cloudflared access ssh` as a `ProxyCommand`; client and server need `cloudflared`; user logs in through an IdP in the browser; origin is published via a tunnel as an SSH service — [Cloudflare SSH with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/)

### Inferences
- The identity Cloudflare checks is a bearer secret (service token) or a client cert held by the device; a service token is only as hard to forge as the secret is hard to steal, same class as any env-var secret.
- For a Railway service, a service token or client cert would be stored as a Railway variable (inference).

### Gaps
- Whether `cloudflared access tcp` / Access for Infrastructure works for Postgres/Mongo, and with service tokens or mTLS, was not confirmed by a fetched page (the SSH page did not cover it).
- Free-tier limits and current pricing not checked.

## 4. SSH certificates and hardware-backed keys, password login disabled

### Takeaway
OpenSSH supports FIDO-backed keys (`ed25519-sk`) whose private key stays on the authenticator, and CA-signed certificates with expiry, principals and source-address limits. macOS Secure Enclave SSH is available only via third-party/community setups in the sources found.

### Cited Findings
- `ssh-keygen -t ed25519-sk` creates keys backed by a FIDO authenticator that must be attached at use; the key file holds only a handle; the per-device private key can't be exported; `resident` stores the handle on the device (typically needs PIN); `verify-required` demands PIN per signature; `no-touch-required` keys are refused by sshd by default — [OpenBSD ssh-keygen(1)](https://man.openbsd.org/ssh-keygen.1)
- Certificates: `-s` signs with a CA; `-n` principals, `-V` validity (default is epoch to far future, so a validity must be set), `-I` identity logged and usable for revocation; options include `force-command` and `source-address`; CA key can live on a PKCS#11 token or in ssh-agent — [OpenBSD ssh-keygen(1)](https://man.openbsd.org/ssh-keygen.1)
- macOS: Apple's CryptoTokenKit page points to `sc_auth(8)` for token associations and I found no Apple page covering SSH with Secure Enclave; community write-ups describe using `sc_auth`/CryptoTokenKit and `ssh-keychain.dylib` with `SSH_SK_PROVIDER`; an Apple Developer Forums thread reports a CTK extension cannot implement PKCS#11 for SSH; another forum post says macOS's bundled OpenSSH lacked FIDO support (8.6p1) and as of January 2025 a manually compiled libfido2 security-key provider was still needed — [Apple Developer Forums thread 698683](https://developer.apple.com/forums/thread/698683), [thread 723264](https://developer.apple.com/forums/thread/723264), [Apple CryptoTokenKit](https://developer.apple.com/documentation/cryptotokenkit.md) (via search summary; community sources, may be outdated)
- Tailscale SSH is a separate mechanism (section 2) that needs no local SSH key.

### Inferences
- With a hardware-backed key, a stolen laptop file system does not yield the key (follows from the "cannot be exported" statement); the attacker needs the physical token (and PIN if `verify-required`).
- Keys/certs are independent of source IP, so a dynamic home IP is not a problem; `source-address` on a cert would re-introduce an IP dependency.
- Disabling password login is an `sshd_config` setting; I did not fetch the sshd_config man page this session, so exact option names are not sourced here.

### Gaps
- No Apple primary doc on Secure Enclave-backed SSH; third-party tool maturity (e.g. sshenc, SeKey, gists) unverified and their security not audited.
- sshd_config settings for disabling password/keyboard-interactive login and `TrustedUserCAKeys` / `AuthorizedPrincipalsFile` not fetched.
- Whether current macOS ships FIDO-capable OpenSSH as of late 2026 not verified (sources are 2022-2025).

## 5. Which options can give a Railway container an identity (no Railway workload identity token)

### Takeaway
Railway staff confirmed no workload identity OIDC tokens are provided to running services, so every option below gives the container a secret it holds (auth key, token, cert) or an outbound IP, not a platform-attested identity.

### Cited Findings
- Railway reply, 2026-04-29: "We do not currently provide workload identity OIDC tokens to running services"; its only OIDC is "Login with Railway" (user-facing OAuth); the variables reference lists no identity token among injected variables — [Railway Station thread](https://station.railway.com/questions/does-railway-provide-workload-oidc-token-67d87e3d)
- Other threads request this as a feature; one user reports an expected `RAILWAY_OIDC_TOKEN` not appearing (user report, not official) — [Railway Station: workload identity feedback](https://station.railway.com/feedback/workload-identity-oidc-tokens-for-runn-0d7b63ac) (via search summary)
- Railway Static Outbound IPs: Pro plan, outbound only, three IPs load-balanced per service, region-specific (change if region moves), redeploy required; a staff forum statement says they're shared not dedicated (forum statement, unverified) — [Railway static outbound IPs](https://docs.railway.com/networking/static-outbound-ips) (via search summary)
- Tailscale node (userspace, tagged ephemeral key) — [Tailscale userspace networking](https://tailscale.com/docs/concepts/userspace-networking); Railway forwarder/subnet templates — [Railway forwarder guide](https://docs.railway.com/guides/set-up-a-tailscale-forwarder)
- Cloudflare service token or Access mTLS client cert for HTTP endpoints — [service tokens](https://developers.cloudflare.com/cloudflare-one/identity/service-tokens/), [Access mTLS](https://developers.cloudflare.com/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/)
- Postgres/Mongo client certificate presented by the service — [Postgres](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html), [MongoDB](https://www.mongodb.com/docs/manual/tutorial/configure-x509-client-authentication/)

### Inferences
- Comparison of what each gives a Railway container (inference): static outbound IP = network-location identity (shared, IP can be used by others on that pool per the staff statement); Tailscale = key-based node identity with tag ACLs, secret in a variable; Cloudflare token = bearer secret; client cert = key held in container (no hardware backing on Railway). None is attested by Railway; all reduce to "who can read this service's variables" (Railway project members/tokens).
- Hardware-backed keys (FIDO, Secure Enclave) apply to the person's machine, not to a container.

### Gaps
- Railway docs for the RAILWAY_* injected variables and any newer announcement than 2026-04-29 not checked directly; the thread is a forum reply (Railway-labeled), not a docs page.
- Whether Railway's private networking or TCP proxy offers any caller-identity feature was not researched.
- Raw WireGuard, SPIFFE/mTLS via a mesh, and secrets-manager-based options on Railway not researched.
