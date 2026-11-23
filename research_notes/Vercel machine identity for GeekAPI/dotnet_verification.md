# Verifying Vercel OIDC JWTs in an ASP.NET Core (.NET 10) API on Railway, instead of a static X-API-Key

## 1. JwtBearer settings for an external issuer (Authority/MetadataAddress, issuer, audience, algorithms, skew, signed/expiry, JWKS caching and rotation)

### Takeaway
Vercel publishes standard OIDC discovery and a JWKS, so JwtBearer with `Authority` (or `MetadataAddress`) plus an explicit `ValidIssuer`/`ValidAudience` is the minimal pattern. Signature, expiry and signed-token requirements are on by default. Algorithm and `typ` restriction are NOT on by default, so set them explicitly. The ConfigurationManager caches keys and refreshes on unknown `kid`.

### Cited Findings
- Vercel discovery document is `https://oidc.vercel.com/.well-known/openid-configuration` (global issuer mode) or `https://oidc.vercel.com/[TEAM_SLUG]/.well-known/openid-configuration` (team mode); it contains `jwks_uri`; keys are selected by `kid`. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- JWKS URLs: `https://oidc.vercel.com/[TEAM_SLUG]/.well-known/jwks` (team) and `https://oidc.vercel.com/.well-known/jwks` (global). — [Vercel: Connect to your own API](https://vercel.com/docs/oidc/api)
- Example Vercel token header: `typ: JWT`, `alg: RS256`, `kid`. Docs say `typ` is `JWT` (so RFC 9068 `at+jwt` typing does not apply to Vercel tokens). — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Vercel's own verification example uses `jose.jwtVerify` with `issuer`, `audience` and `subject` all checked, JWKS fetched remotely; it returns 401 on any failure. — [Vercel: Connect to your own API](https://vercel.com/docs/oidc/api)
- `JwtBearerOptions.Authority` = authority for OpenIdConnect calls; `MetadataAddress` = discovery endpoint; `Audience` is passed into `TokenValidationParameters.ValidAudience` if that is empty; `ConfigurationManager` is "responsible for retrieving, caching, and refreshing the configuration from metadata". — [JwtBearerOptions](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions)
- `RequireHttpsMetadata` default true ("disabled only in development"); `RefreshOnIssuerKeyNotFound` enabled by default, "allows for automatic recovery in the event of a signature key rollover"; `IncludeErrorDetails` enabled by default and can be disabled to stop `error`/`error_description` in `WWW-Authenticate`; `MapInboundClaims` default true. — [JwtBearerOptions](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions)
- TokenValidationParameters defaults: `RequireSignedTokens` true; `RequireExpirationTime` true; `RequireAudience` true; `ValidIssuer`/`ValidAudience` default null; `ValidTypes` null means "typ" is not validated and all types accepted; `ValidAlgorithms` = "valid algorithms for cryptographic operations" (no default documented); `TryAllIssuerSigningKeys` default true (tried when no `kid` match or `kid` empty); `ValidateTokenReplay`/`TokenReplayCache` exist (opt-in); `LogValidationExceptions` default true; `ClockSkew` property exists and throws if < 0. — [TokenValidationParameters](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters), [ClockSkew](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters.clockskew)
- ConfigurationManager: `DefaultAutomaticRefreshInterval` 12 hours; `DefaultRefreshInterval` 5 minutes (min time before `RequestRefresh()` re-fetches); `MinimumAutomaticRefreshInterval` 5 min; `UseLastKnownGoodConfiguration` default true (LKG = a configuration "we were able to successfully validate a token against"). — [ConfigurationManager<T>](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.protocols.configurationmanager-1)
- Microsoft's checklist: validate signature, issuer, audience, expiration; "If any of these claims or values are incorrect, the API should return a 401". Explicit config example sets `ValidateIssuer`, `ValidateAudience`, `ValidateIssuerSigningKey`, `ValidIssuers`, `ValidAudiences`, `MapInboundClaims = false`. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- RFC 8725 3.1: libraries "MUST enable the caller to specify a supported set of algorithms and MUST NOT use any other algorithms"; each key MUST be used with exactly one algorithm. 3.11: explicit typing via `typ` RECOMMENDED for new uses. — [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- RFC 7519 4.1.4: implementers "MAY provide for some small leeway, usually no more than a few minutes" for clock skew. — [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)

### Inferences
- Illustrative minimal shape (not production code): `Authority = "https://oidc.vercel.com/<team>"`, `TokenValidationParameters { ValidIssuer = same, ValidAudience = "<our API audience>", ValidAlgorithms = ["RS256"], ValidTypes = ["JWT"], ClockSkew = TimeSpan.FromSeconds(30), RequireSignedTokens = true, RequireExpirationTime = true }`, `MapInboundClaims = false`. RS256 comes from the Vercel example token only; Vercel was not found to document an algorithm guarantee, so pin RS256 and treat a Vercel algorithm change as a deliberate update.
- Set the issuer explicitly rather than relying on discovery alone, so a metadata document cannot widen what is accepted (RFC 8725 3.8 requires validating issuer; Microsoft doc does so explicitly).
- A 12h automatic refresh plus refresh-on-unknown-`kid` (rate-limited by the 5 min `RefreshInterval`) means a Vercel key rotation is picked up on first token signed by the new key, with up to a 5 minute window of 401s possible if a refresh was just attempted. This is inferred from the documented defaults; not tested.
- Custom audience note: with a custom `audience`, Vercel sets the issuer to the team URL in both modes, so `ValidIssuer` must be the team URL. — see Q2 sources.

### Gaps
- Default numeric value of `ClockSkew` (the `DefaultClockSkew` field) is not stated on the fetched Learn pages; commonly cited as 5 minutes but NOT verified here. Set it explicitly.
- No Learn page fetched states `ValidAlgorithms` default; treat as unrestricted until set.
- Vercel docs fetched do not say which issuer mode is the default for a new project, nor whether Vercel documents key-rotation cadence or JWKS cache headers.
- OWASP JWT cheat sheet fetch returned 404; no OWASP citation obtained.

## 2. Authorizing by exact project/environment claim; shared issuer; confused deputy and audience reuse

### Takeaway
A valid signature + issuer + audience proves only "Vercel issued this", and in global mode many teams share the issuer. Authorization must additionally pin the exact `owner_id`/`project_id`/`environment` (or the full `sub`) with an ASP.NET policy; use a custom audience unique to this API so tokens minted for other purposes or for default `https://vercel.com/<team>` cannot be replayed to it.

### Cited Findings
- Claims in Vercel tokens: `iss`, `aud`, `sub` (`owner:[TEAM_SLUG]:project:[PROJECT_NAME]:environment:[ENVIRONMENT]`, environment is `development`, `preview`, `production` or a Custom Environment slug), `iat`, `nbf`, `exp`, plus `owner` (team slug), `owner_id` (team ID), `project` (name), `project_id`, `environment`, `custom_environment_id` (only for custom environments), `user_id` (when environment is `development`). — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Issuer is `https://oidc.vercel.com` in global mode and `https://oidc.vercel.com/[TEAM_SLUG]` in team mode; "When you pass a custom `audience`, the issuer is set to `https://oidc.vercel.com/[TEAM_SLUG]` in both issuer modes." Default `aud` is `https://vercel.com/[TEAM_SLUG]`. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- A function obtains a token for a custom audience with `getVercelOidcToken({ audience })`; the API must expect that audience and the team issuer. — [Vercel: Connect to your own API](https://vercel.com/docs/oidc/api)
- Renaming a team or project changes the `owner`/`project`/`sub` claim values, which "can affect your trust and access control policies"; `owner_id` and `project_id` are IDs (example shapes `team_...`, `prj_...`). — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Vercel's own AWS trust-policy examples constrain `aud` and `sub` together (global mode) rather than issuer alone. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Token lifetimes: build 1h; function tokens for preview and production 2h; development 12h. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- RFC 8725 3.8: application "MUST validate that the subject value corresponds to a valid subject" and issuer/keys correspond; 3.9: RP "MUST validate the audience value" and if absent or not associated with the recipient "MUST reject the JWT"; 2.7 substitution attacks and 2.8 cross-JWT confusion ("mitigations MUST be employed" when tokens issued for one purpose could be accepted for another). — [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- RFC 7519 4.1.3: "Each principal intended to process the JWT MUST identify itself with a value in the audience claim"; if not, "the JWT MUST be rejected." — [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)
- RFC 9068 4: resource server "MUST validate that the "aud" claim contains a resource indicator value" for itself, and reject otherwise. (RFC 9068 targets OAuth access tokens; Vercel tokens are not stated to be RFC 9068 tokens.) — [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html)
- ASP.NET: authorization policies/roles are the mechanism for "403 Forbidden" decisions beyond token validity; 401 for invalid token. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- Policy-attached schemes: `policy.AuthenticationSchemes.Add(...)` limits a policy to the identity produced by that handler; `[Authorize(AuthenticationSchemes=...)]` and policy schemes are combined as a union. — [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)

### Inferences
- Pitfall (shared issuer): in global mode, any Vercel customer's token passes signature + issuer checks. Only `aud` and the identity claims separate customers. With the default audience `https://vercel.com/<team>`, the audience contains the team slug but nothing about this API, so it is not API-specific. Recommended: team issuer mode or custom audience (which forces the team issuer), AND a claim policy requiring `owner_id == <our team id>`, `project_id == <portal project id>`, `environment == "production"`. Prefer immutable IDs over `sub`/`project`/`owner` names because names change on rename (Vercel doc) and slugs are comparatively guessable. The choice of IDs over names is inference from the rename passage.
- Pitfall (confused deputy / audience reuse): if the API accepted the default audience, a token the same Vercel project legitimately gets for another purpose (any 3rd-party it calls) could be presented here; and a token minted for GeekAPI could be presented to another service sharing the audience. Use a dedicated audience string unique to GeekAPI, never reuse it for other services, and never accept multiple audiences casually.
- Pitfall (environment): preview and development tokens are issued by the same issuer and same project; a policy checking project only would accept preview deployments (and, for development, a developer's local token, which carries `user_id`). Require `environment == production` unless previews are meant to call the API. Whether preview-deployment code from branches is trusted is a product decision.
- `ValidIssuer/ValidAudience` in .NET cover iss/aud; there is no `ValidSubject` among the TokenValidationParameters properties listed on Learn, so subject/project checks need a policy (`RequireClaim`/assertion) or an `OnTokenValidated` check. Set `MapInboundClaims=false` so claim names are `sub`, `project_id` etc. (inferred from the Microsoft doc's own setting and the documented mapping default of true).
- Compare claim strings with ordinal exact equality; do not do prefix/contains matching on `sub`.
- Custom Environment: `environment` is a slug and `custom_environment_id` is added; do not treat unknown environments as production.

### Gaps
- Not found: Vercel documentation that states the default issuer mode for new projects, or explicitly warns about global-mode cross-tenant acceptance. The cross-tenant risk above is inferred from the issuer-mode documentation, not a Vercel warning.
- Not verified: whether `owner_id`/`project_id` are always present in tokens for all token kinds (documented in "Additional claims" table; example token includes them).
- Whether ASP.NET `RequireClaim` is documented in the fetched pages: not confirmed here (policy docs 404 on one URL); verify against the policy-based authorization page before coding.

## 3. Running alongside the existing X-API-Key middleware during migration without a bypass

### Takeaway
Use two independent authentication paths that each produce an authenticated principal only on full success, then one authorization policy that accepts either. The risk is not the dual acceptance itself but (a) a key middleware that short-circuits or sets `User` before JWT checks, (b) fallbacks (a failed JWT silently trying the key, or vice versa) and (c) endpoints missing the policy.

### Cited Findings
- Multiple schemes: authorization middleware "approves access with any of the specified schemes in the order listed" and merges identities if several succeed; a single scheme specified runs only that handler. — [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)
- Default policy can list multiple schemes via `new AuthorizationPolicyBuilder(scheme1, scheme2).RequireAuthenticatedUser()` and `SetDefaultPolicy`. — [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)
- `SetFallbackPolicy(RequireAuthenticatedUser)` requires authentication for endpoints that have no policy from metadata. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- Policy schemes (`AddPolicyScheme`, `ForwardDefaultSelector`) can pick a scheme per request from the `Authorization` header. — [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)
- A custom scheme name does not change the header format; JwtBearer expects `Authorization: Bearer <token>` unless `OnMessageReceived` customizes extraction. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- Union semantic warning: attribute and policy schemes are "combined ... forms a union, and any listed scheme may authenticate the request." — [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)

### Inferences
- Suggested no-bypass structure (illustrative): convert the X-API-Key middleware into an `AuthenticationHandler` scheme "ApiKey" (reads only `X-API-Key`, constant-time compare, yields a principal with an explicit `auth_method=apikey` claim) alongside JwtBearer "Vercel" (reads only `Authorization: Bearer`). Default and fallback policy: `RequireAuthenticatedUser` over both schemes. Per-endpoint policy for tenant-sensitive routes can demand the Vercel claim policy once cut over.
- Bypass traps to avoid: (1) middleware that calls `next()` for unauthenticated requests on any path not on an explicit allowlist; (2) path-prefix or case-variant matching in the key middleware; (3) a presented-but-invalid Bearer token falling through to "no credentials, treat as anonymous OK"; (4) accepting a JWT where the API key was expected without applying the claim policy (so any Vercel customer's token authenticates); (5) endpoints outside the fallback policy; (6) dev-only `RequireHttpsMetadata=false` or disabled validation leaking into prod config.
- Migration ordering: deploy JWT scheme + claim policy first, with both accepted; log which method authenticated each request (method name only, never the secret/token); when logs show zero key use, remove the ApiKey scheme and its environment variable, and rotate the old key. This sequencing is inference, not from a source.
- Remove-the-key step should delete the handler and registration, not just leave the key unset: an unset key compared with an empty header must never match. (Inference; the portal's CLAUDE.md already notes unset key refuses the call.)

### Gaps
- No official source found that prescribes an API-key-to-JWT migration procedure; the above is design inference.

## 4. Failure handling: JWKS unreachable (fail closed) and logging without leaking tokens

### Takeaway
By design, an API that cannot obtain keys cannot verify and must reject (401, or 503 for the metadata-fetch failure case as a deliberate choice); the dangerous part is the LKG configuration cache, which keeps validating with previously fetched keys, which is benign for availability but means revoked/rotated-out keys can linger.

### Cited Findings
- Microsoft: failing validation = 401; the API "shouldn't redirect" and the consumer acquires tokens. A 401 must include `WWW-Authenticate` (RFC 9110). — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- RFC 7519 7.2: "If any of the listed steps fail, then the JWT MUST be rejected -- that is, treated by the application as an invalid input." — [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)
- `RefreshInterval`: minimum time between retrievals "in the event that a retrieval failed, or that a refresh was explicitly requested" (default 5 min). `UseLastKnownGoodConfiguration` default true. — [ConfigurationManager<T>](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.protocols.configurationmanager-1)
- `IncludeErrorDetails` default enabled returns `error`/`error_description` in `WWW-Authenticate`; can be disabled. — [JwtBearerOptions](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)  (see JwtBearerOptions page cited in Q1)
- `LogValidationExceptions` default true; `LogTokenId` default true ("token identifier claim" logged); `IncludeTokenOnFailedValidation` and `SaveSigninToken`/`SaveToken` exist and control retention of raw tokens. — [TokenValidationParameters](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters)
- `JwtBearerOptions.BackchannelTimeout` controls the metadata HTTP call timeout (default not stated on the fetched page). — [JwtBearerOptions](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions)
- RFC 8725 3.10: do not trust received claims; validate them and avoid injection when using them (logging/queries). — [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- Microsoft notes HTTP allows 404 instead of 401/403 to hide existence of resources. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)

### Inferences
- Fail closed: never wrap the JWKS/metadata fetch in a catch that substitutes an empty or permissive config, and never fall back to the API key for a request that presented a Bearer token. Repository rule (fail loud) applies: surface the metadata-fetch failure as an operator-visible log/health signal at Error level, not only a 401 to the caller.
- LKG tradeoff: LKG keeps verification working through a short Vercel outage using the last good keys (availability), but means a key Vercel withdrew could keep verifying until process restart or LKG lifetime ends. For this API the exposure is bounded by token `exp` (up to 2h). Decide explicitly whether to keep `UseLastKnownGoodConfiguration` true; the default is true.
- Startup: first request must be able to fetch metadata; consider a startup/health check that attempts discovery so a Railway deploy with a wrong authority is visible immediately rather than as runtime 401s. (Railway-specific outbound behavior not researched.)
- Logging rules: log `iss`, `aud`, `project_id`, `environment`, `kid`, validation failure category, and request id; never log the `Authorization` header, raw token, or `IncludeTokenOnFailedValidation` token objects; keep `SaveToken=false`; consider `IncludeErrorDetails=false` in production so callers learn nothing about which check failed. `LogTokenId` default logs `jti`, which is acceptable (an identifier, not the credential) but it is an identifier from an attacker-controlled token, so sanitize before use (RFC 8725 3.10).
- Redact headers in any request-logging middleware / Railway log drains.

### Gaps
- Exact exception types/HTTP status the JwtBearer handler yields when metadata retrieval fails (for example whether it surfaces as 401 vs 500) are not stated in the fetched docs; verify by testing with an unreachable authority.
- Documented default for `BackchannelTimeout` and LKG lifetime not captured.

## 5. Replay: do short-lived bearer tokens need extra protection (jti, TLS, audience binding)?

### Takeaway
Standards treat bearer tokens as replayable by anyone holding them; the required controls are TLS, short lifetime and audience restriction. Per-token `jti` tracking is an optional extra, and Vercel's tokens are not documented to carry `jti`, so it is not available as a control here.

### Cited Findings
- RFC 6750 5.3: "Clients MUST always use TLS ... when making requests with bearer tokens"; token servers SHOULD issue short-lived (one hour or less) tokens and tokens with an audience restriction. — [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)
- RFC 6750 5.2: "the lifetime of the token MUST be limited"; short-lived (one hour or less) reduces impact of leaks; include audience; restricting scope RECOMMENDED. — [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)
- RFC 7519 4.1.7: "The "jti" claim can be used to prevent the JWT from being replayed." — [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)
- RFC 9068 requires `jti` in JWT access tokens (REQUIRED, per 2.2). — [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html)
- Vercel's documented claim set (example token and tables) lists no `jti`. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Vercel function tokens for preview/production expire after two hours; development 12 hours; build 1 hour. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)
- Sender-constrained tokens (DPoP, mTLS) are the standards-based way to prevent a stolen bearer token being used by another party. — [Configure JWT bearer authentication](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication); [RFC 9449](https://datatracker.ietf.org/doc/html/rfc9449); [RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705)
- RFC 8725 does not have a replay-specific section; closest are 2.7 substitution and 2.8 cross-JWT confusion (mitigated by audience, issuer and typing). — [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- Microsoft.IdentityModel supports opt-in replay detection (`ValidateTokenReplay` with `TokenReplayCache`/`TokenReplayValidator`). — [TokenValidationParameters](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters)
- Vercel docs advise not caching the token returned by `getVercelOidcToken()` and note the token is delivered per request via `x-vercel-oidc-token` in functions. — [Vercel OIDC reference](https://vercel.com/docs/oidc/reference)

### Inferences
- Vercel's 2h function-token lifetime exceeds the RFC 6750 "one hour or less" SHOULD; the API cannot shorten it from the verifier side except by checking `iat`/`exp` (for example reject if `exp - iat` exceeds a bound, or `iat` older than N minutes). That is an optional hardening, inferred, and it would reject legitimately long-lived tokens still in use by a warm function, so evaluate against real traffic.
- Because there is no `jti`, replay tracking would have to key on a hash of the token until `exp`, which needs a shared store across Railway instances; given TLS-only transport and audience binding, the marginal benefit is low for a server-to-server call and the cost is a new stateful dependency. Not recommended as part of the minimal pattern (judgement).
- Minimal replay posture: HTTPS only on Railway edge (HSTS irrelevant for API clients, but reject plain HTTP and ensure `X-Forwarded-Proto` handling is correct), dedicated audience, project/environment pinning, short skew, no token logging. A stolen token is usable by anyone until `exp` (up to 2 hours); that residual risk is the accepted cost of bearer tokens.
- Residual compare: the existing static API key never expires, so even with the replay limits above the JWT is strictly a shorter exposure window (inference).

### Gaps
- Not found: any Vercel statement on `jti` presence or on support for DPoP/mTLS for its OIDC tokens (the claim tables show no `jti`; absence in docs is not proof of absence in tokens, so inspect a real token before deciding).
- Railway-side details (how TLS is terminated and what `X-Forwarded-*` the app sees) were not researched.
- OWASP JWT cheat sheet could not be retrieved (404), so OWASP is not cited.

## Source index
- [Vercel OIDC reference](https://vercel.com/docs/oidc/reference), [Vercel: Connect to your own API](https://vercel.com/docs/oidc/api), [Vercel OIDC overview](https://vercel.com/docs/oidc)
- [Configure JWT bearer authentication (Microsoft Learn)](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
- [JwtBearerOptions](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions), [TokenValidationParameters](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.tokens.tokenvalidationparameters), [ConfigurationManager<T>](https://learn.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.protocols.configurationmanager-1), [Authorize with a specific scheme](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/authorize-with-a-specific-scheme)
- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html), [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html), [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html), [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)
