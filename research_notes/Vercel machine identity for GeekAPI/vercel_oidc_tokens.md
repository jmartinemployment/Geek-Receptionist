# Vercel OIDC token (machine identity), as of late 2026

## How does a Function / route handler obtain the token, and on which plans and environments?

### Takeaway
In a deployed Function the token arrives as the `x-vercel-oidc-token` request header, and `getVercelOidcToken()` from `@vercel/oidc` reads it. Vercel documents the feature as available on all plans.

### Cited Findings
- "Secure backend access with OIDC federation is available on all plans" — [Access Other Clouds and APIs](https://vercel.com/docs/oidc/access-other-services); same line on [Connect to your own API](https://vercel.com/docs/oidc/api) and [Reference](https://vercel.com/docs/oidc/reference)
- In builds: Vercel generates a new token and assigns it to the `VERCEL_OIDC_TOKEN` environment variable — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- In Vercel Functions: the token is set on the `x-vercel-oidc-token` header of the Function's `Request` — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- Local development: `vercel link` then `vercel env pull` writes `VERCEL_OIDC_TOKEN` to `.env.local`; a linked project (or `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`) is required — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- `getVercelOidcToken()` from `@vercel/oidc` 4.0.0+ in Node.js checks, in order: the request context's `x-vercel-oidc-token` header; the file named by `VERCEL_OIDC_TOKEN_FILE`, if set; then `VERCEL_OIDC_TOKEN`. A set but unreadable or empty file throws (no fallback). Docs say do not cache the returned token — [Reference](https://vercel.com/docs/oidc/reference)
- The Edge Runtime entry point uses the request header or `VERCEL_OIDC_TOKEN` and does not read `VERCEL_OIDC_TOKEN_FILE` — [Reference](https://vercel.com/docs/oidc/reference)
- Docs note: in Function environments you cannot call `getVercelOidcToken()` at module level, because the token is only in the `Request` header — [Reference](https://vercel.com/docs/oidc/reference)
- Package README (as summarized by the fetch tool, not read raw): `getVercelOidcToken(options?)` is async, takes `project`, `team`, `expirationBufferMs` (default 0), refreshes an expired token only in development; `getVercelOidcTokenSync()` returns the current token without refreshing — [vercel/vercel packages/oidc](https://github.com/vercel/vercel/tree/main/packages/oidc)
- Example route handler: `Authorization: Bearer ${await getVercelOidcToken()}` sent to an external API — [Connect to your own API](https://vercel.com/docs/oidc/api)

### Inferences
- For a Next.js route handler or server action, the call must be made inside the request, not at module load (follows from the module-level note).
- Development/preview/production all issue tokens: the `sub` and `exp` docs list `development`, `preview`, `production`, and custom environments.

### Gaps
- The `@vercel/oidc` source code itself was not read (only the README summary); refresh internals unverified.
- Whether the header is present in every invocation type (cron, server actions, middleware/proxy) is not stated on the pages read.

## Token contents, lifetime, refresh

### Takeaway
RS256 JWT with `iss`, `aud`, `sub` plus owner/project/environment claims. Function tokens last 2 hours, are reused and rotated by Vercel, and stay valid for the Function's maximum duration.

### Cited Findings
- Example header: `{"typ":"JWT","alg":"RS256","kid":"..."}` — [Reference](https://vercel.com/docs/oidc/reference)
- `iss`: team mode `https://oidc.vercel.com/[TEAM_SLUG]`; global mode `https://oidc.vercel.com`; with a custom audience the issuer is `https://oidc.vercel.com/[TEAM_SLUG]` in both modes — [Reference](https://vercel.com/docs/oidc/reference)
- `aud`: defaults to `https://vercel.com/[TEAM_SLUG]`; custom via `audience` option of `getVercelOidcToken()` — [Reference](https://vercel.com/docs/oidc/reference)
- `sub`: `owner:[TEAM_SLUG]:project:[PROJECT_NAME]:environment:[ENVIRONMENT]`; environment is `development`, `preview`, `production`, or a Custom Environment slug — [Reference](https://vercel.com/docs/oidc/reference)
- Also `iat`, `nbf`, `exp`; additional claims `owner` (team slug), `owner_id` (team id), `project` (name), `project_id`, `environment`, `custom_environment_id` (only for custom environments), `user_id` (only when environment is development: user issued the token) — [Reference](https://vercel.com/docs/oidc/reference)
- Expiry: build tokens 1 hour; function tokens for preview and production 2 hours; development tokens 12 hours — [Reference](https://vercel.com/docs/oidc/reference)
- "Vercel does not generate a fresh OIDC token for each execution." Function tokens have a 2 hour TTL; Vercel reuses a token for the first part of that time and then issues a new one; the token a Function receives stays valid for the Function's max duration — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- Renaming a team or project changes the claims (`sub`, `aud`, `iss` in team mode), which can break trust policies — [Reference](https://vercel.com/docs/oidc/reference)

### Inferences
- Slugs and names are mutable; `owner_id` and `project_id` are stable identifiers. A verifier that wants rename-proof checks could match those claims (the docs' own example only validates `sub`, `aud`, `iss`; the docs do not recommend ID matching).
- Because tokens are reused, they are bearer tokens valid for up to ~2h; no per-request uniqueness (no `jti` in the documented example).

### Gaps
- Exact reuse window before rotation is not specified ("first part of that time").
- No `jti` claim documented; replay protection is not addressed on pages read.

## Verification (JWKS, discovery, algorithm, checks)

### Takeaway
Standard OIDC: fetch discovery or JWKS from the issuer, verify RS256 signature by `kid`, check `iss`, `aud`, `sub`, `exp`. Vercel's own example uses `jose`. Audience can be customized.

### Cited Findings
- Discovery: `https://oidc.vercel.com/.well-known/openid-configuration` (global) or `https://oidc.vercel.com/[TEAM_SLUG]/.well-known/openid-configuration` (team); `jwks_uri` inside it; pick the JWK by the token header `kid` — [Reference](https://vercel.com/docs/oidc/reference)
- JWKS: `https://oidc.vercel.com/[TEAM_SLUG]/.well-known/jwks` (team) and `https://oidc.vercel.com/.well-known/jwks` (global) — [Connect to your own API](https://vercel.com/docs/oidc/api)
- Official verifier example: `jose.createRemoteJWKSet` plus `jose.jwtVerify(token, JWKS, {issuer, audience, subject})`, token read from `Authorization: Bearer` — [Connect to your own API](https://vercel.com/docs/oidc/api)
- Custom audience: pass `audience` to `getVercelOidcToken`; the validator must expect that `aud`; the token always uses the team issuer, so set the issuer to `https://oidc.vercel.com/[TEAM_SLUG]` even in Global mode — [Connect to your own API](https://vercel.com/docs/oidc/api)
- Live team discovery doc (fetched for `acme`, via a summarizing fetch tool): issuer `https://oidc.vercel.com/acme`, jwks_uri `https://oidc.vercel.com/acme/.well-known/jwks`, signing alg RS256, response type id_token, scope openid, claims include sub, aud, exp, iat, iss, nbf, project, project_id, owner, owner_id, environment — [oidc.vercel.com/acme discovery](https://oidc.vercel.com/acme/.well-known/openid-configuration)
- Live global discovery doc: issuer `https://oidc.vercel.com`, jwks `https://oidc.vercel.com/.well-known/jwks`, RS256 — [global discovery](https://oidc.vercel.com/.well-known/openid-configuration)
- Global JWKS had 2 RSA keys, alg RS256, use sig (one kid `mrk-<32hex>`, one UUID) — [global JWKS](https://oidc.vercel.com/.well-known/jwks)

### Inferences
- A non-AWS/GCP/Azure backend (such as GeekAPI in .NET) needs only a standard JWT bearer validator (issuer, audience, signing keys from JWKS, lifetime) plus a check that `sub` (or `owner_id`/`project_id`/`environment`) equals the expected Vercel project and `production`. The `jose` example maps directly to any OIDC-capable library.
- Setting a custom `audience` (for example GeekAPI's own URL) is advisable so a token minted for another purpose is not accepted; this is inference, though the docs show the option for "your own API".
- Verifier should pin `environment` (`production` only) since preview and development tokens are also issued and valid under the same project.
- The discovery doc claims list omits `custom_environment_id` and `user_id`; the docs list those separately.

### Gaps
- Key rotation cadence and JWKS caching guidance not stated.
- Whether the discovery doc for a team slug that does not exist returns 404 was not tested; `acme` returned a document.

## Limits, caveats, replay, revocation

### Takeaway
Docs mention TTLs and rename effects but say nothing about rate limits, replay or revocation on the pages read.

### Cited Findings
- Builds receive a token via env var; Functions only via the request header (not at module level) — [Reference](https://vercel.com/docs/oidc/reference), [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- Refresh in `@vercel/oidc` happens only in development — [README summary](https://github.com/vercel/vercel/tree/main/packages/oidc)
- Don't cache the helper's returned token — [Reference](https://vercel.com/docs/oidc/reference)

### Inferences
- No revocation mechanism is documented; a leaked function token is usable until `exp` (up to 2h). Short TTL plus audience and `environment` pinning are the available mitigations.
- Replay: no nonce or `jti`; use TLS and treat as bearer token.

### Gaps
- No rate limits, cold-start behavior, or revocation/replay statements found on the pages fetched. The linked blog posts and changelog ("OIDC Federation now generally available", "Death to long-lived static credentials") were not read.

## Issuer modes and recommendation

### Takeaway
Two modes, set per project; Vercel marks Team as Recommended.

### Cited Findings
- Team (Recommended): issuer bespoke to the team, e.g. `https://oidc.vercel.com/acme`. Global: generic `https://oidc.vercel.com` — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- Changed in the dashboard: project, Settings, Security, "Secure backend access with OIDC federation", toggle Team or Global, Save — [Access Other Clouds](https://vercel.com/docs/oidc/access-other-services)
- Tokens with a custom audience always use the team issuer — [Connect to your own API](https://vercel.com/docs/oidc/api)

### Inferences
- Switching mode changes `iss` and the JWKS URL, so a verifier should pin one issuer; with the team issuer plus custom audience, both mode settings yield the same `iss`, which removes the mode as a variable.

### Gaps
- Default mode for newly created projects not stated on the pages read.
- Separate (newer) pages exist: /docs/oidc/issuer-mode returned 404; Vercel also has OIDC policies and Vercel Connect/KMS pages, not researched.
