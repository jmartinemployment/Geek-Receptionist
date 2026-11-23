# Threats and limits of Vercel OIDC tokens vs a stored static API key (server-to-server to a backend), as of Nov 2026

## Who can mint or obtain a Vercel OIDC token; preview vs production; what stops a malicious PR deployment

### Takeaway
Vercel issues the token to the running workload (build, function, or a developer via CLI), and the `sub`/`environment` claim says which environment it came from. A preview deployment gets a token whose environment is `preview`, so the backend can refuse it, but only if the backend checks the claim. Vercel's own "validate" example is the only place the docs show this check; nothing is enforced for you.

### Cited Findings
- Tokens are issued in three places. Builds: a new token is put in `VERCEL_OIDC_TOKEN`. Functions: the token arrives in the `x-vercel-oidc-token` request header. Local dev: `vercel env pull` writes `VERCEL_OIDC_TOKEN` to `.env.local`. — [Access Other Clouds and APIs](https://vercel.com/docs/oidc/access-other-services)
- `sub` is `owner:[TEAM_SLUG]:project:[PROJECT_NAME]:environment:[ENVIRONMENT]`, where environment is `development`, `preview`, `production`, or a Custom Environment slug. Separate claims: `owner`, `owner_id`, `project`, `project_id`, `environment`, `custom_environment_id`, and `user_id` (set when environment is `development`, the user who was issued the token). — [OIDC reference](https://vercel.com/docs/oidc/reference)
- Vercel's example for validating in your own API checks `issuer`, `audience` and `subject` with `jose.jwtVerify`, with `[ENVIRONMENT]` substituted. — [Connect to your own API](https://vercel.com/docs/oidc/api)
- Vercel's strict AWS trust policy pins `sub` to `...environment:production` and `aud`. The same page also shows a looser policy using `StringLike` with `project:*` for `preview` and `production`, which it describes as allowing "any project matched by the `*`". — [Connect to AWS](https://vercel.com/docs/oidc/aws)
- Vercel's docs say "you can separate your development, preview and production environments on your cloud provider" (quoted via search-result summary; the exact page was not re-read). — [search result for OIDC docs](https://vercel.com/docs/oidc)
- Renaming a team or project changes the claims in the token, which can break or alter trust policies. — [OIDC reference](https://vercel.com/docs/oidc/reference)
- Team issuer mode is marked "Recommended"; global mode uses a generic issuer `https://oidc.vercel.com`. A custom-audience token always uses the team issuer. — [Access Other Clouds and APIs](https://vercel.com/docs/oidc/access-other-services), [OIDC reference](https://vercel.com/docs/oidc/reference)
- Palo Alto Unit 42 (vendor-neutral, does not mention Vercel): wildcard patterns such as `repo:my_org/*` let any repo in the org satisfy a policy; claims users can choose (workflow name, branch, environment name) should not be the basis of access; CircleCI at first issued OIDC tokens with the target repo's identity to fork-based pull requests and later disabled that by default. — [Unit 42](https://unit42.paloaltonetworks.com/oidc-misconfigurations-in-ci-cd/)

### Inferences
- Anyone who can run code in a deployment of the project gets the token for that deployment's environment. A pull request whose preview deployment builds and runs will receive a `preview` token. The OIDC claim cannot be forged, but it also does not stop the PR code from using its own legitimate token. What stops it is the backend rejecting `environment != production` (and pinning `project`/`owner`). Not stated in a source as a combined statement; deduced from the claims table and the `sub` format.
- Team members with the ability to run a deployment or run `vercel env pull` can obtain `development`-environment tokens (the docs say development tokens carry `user_id`). If the backend accepts only `production`, these are refused. Inference.
- The docs explain `sub` as an exact match; the Vercel-specific part of a trust rule is the backend's own code. A backend that checks only `iss` and `aud` accepts any project in the team (team issuer) or any Vercel team (global issuer, default `aud` is team-specific, so partly mitigated). Inference from the example code.
- Whether production-targeted deployments can be created by anyone other than someone with deploy rights on the project is a Vercel permissions question not covered by these docs.

### Gaps
- Whether Vercel issues the `production` environment claim to a preview deployment: no doc says it can; the docs say the claim reflects the deployment's environment. I found no source that tests or contradicts this.
- Whether fork-PR preview deployments (from outside contributors) receive OIDC tokens or environment variables at all: not found in the pages read. Needs a check of Vercel's deployment-protection / git-fork docs.
- Vercel team-role permissions (who can trigger a production deployment, add a Custom Environment, or pull the development token): not found.

## What an attacker can do with one stolen token, and for how long

### Takeaway
A stolen token is usable only until `exp`, but that is hours, not minutes, and it is a bearer token: anyone holding it can replay it against any backend that accepts it, with the same environment and project claims.

### Cited Findings
- Build tokens expire after one hour; function tokens for `preview` and `production` after two hours; `development` tokens after 12 hours. — [OIDC reference](https://vercel.com/docs/oidc/reference)
- Vercel does not generate a fresh token per function execution; a token is reused for the first part of its two-hour life and then replaced. — [Access Other Clouds and APIs](https://vercel.com/docs/oidc/access-other-services)
- Vercel's own blog says "A stolen token stops working when it expires". (Vendor claim, no independent evidence.) — [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- Custom audience scopes a token "to the one service meant to receive it". — same blog post; mechanism in [Connect to your own API](https://vercel.com/docs/oidc/api)
- Unit 42: `aud` values can be predictable and spoofable, so should not be the only boundary. — [Unit 42](https://unit42.paloaltonetworks.com/oidc-misconfigurations-in-ci-cd/)

### Inferences
- Window is up to about 2 hours for production function tokens (12 hours for a leaked developer token), versus unlimited for a static key until someone rotates it. Replay inside the window cannot be prevented by the token itself; no doc I read mentions sender-constrained tokens (DPoP/mTLS) or a `jti` replay check.
- A backend that issues its own short-lived session after verifying the token can shorten the exposure further. Design suggestion, not from a source.
- Backend-side logging of `sub`, `iat`, `owner`, `project_id` per call gives forensic attribution that a shared static key does not. Inference.

### Gaps
- No source on revoking a single Vercel OIDC token before `exp`; none found.
- No source on `jti` or replay protection.

## If Vercel itself is breached: does OIDC help or hurt versus a static key in env vars

### Takeaway
No source tests this. Reasoned from the architecture: OIDC removes a secret that can be read from storage (the April 2026 attacker decrypted stored env vars), but a platform attacker who can run code as your project, or who controls the signing key, can still obtain valid tokens. So it narrows the harm; it does not remove it.

### Cited Findings
- In Vercel's April 2026 incident, the attacker entered via a third-party AI tool (Context.ai) used by a Vercel employee, took over the employee's Google Workspace and then Vercel account, and "enumerated and decrypted non-sensitive environment variables." Vercel said sensitive environment variables are "protected from being read in the future," and told customers to treat non-sensitive variables as potentially exposed and rotate them. Incident closed October 16, 2026. — [Vercel bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)
- That bulletin does not mention OIDC (per the fetch summary; I did not read the full text myself). Vercel's remedies listed: MFA, rotating, sensitive env vars, review activity logs and recent deployments, Deployment Protection at Standard or higher. — [Vercel bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)
- Vercel's blog argues encryption at rest does not help "when malicious code can read credentials in production" and recommends OIDC. It does not mention the April 2026 incident. — [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- Railway October 2026 incident, primary report: the attacker read encrypted environment variables from the database; a subset was decrypted using credentials taken from the CI environment; some CI artifacts held further API access. Impact up to 1.85% of workspaces (about 100,000). Railway says the full keys were envelope encrypted and recommends users revoke and reapply sensitive variables. — [Railway preliminary report](https://blog.railway.com/p/preliminary-report-october-security-incident)
- The static IP docs say Vercel's static egress IPs are shared by a small group of customers, so "other customers' traffic can come from the same addresses" and backend authentication must stay in place. — [Static IPs](https://vercel.com/docs/networking/static-ips)

### Inferences
- Helps: a platform breach that only reads stored data (as in both incidents) finds nothing durable to steal for the Vercel-to-backend call, because the token is not stored; a token captured from logs or memory expires in hours. A static key in env vars is exactly what both attackers decrypted.
- Does not help: an attacker with Vercel account takeover (April 2026 path) can deploy code or pull a `development` token and obtain tokens that pass any check not narrower than the account's reach; a breach of Vercel's signing keys or issuer would let an attacker forge tokens with any claims, and the backend would trust them. No source found describing Vercel's signing-key protection.
- Can hurt: the backend now trusts a third party's issuer and its JWKS endpoint availability; the OIDC trust lives in Vercel, whose compromise is the very scenario. Inference.
- Still worth keeping beside it: the backend's other secrets (e.g. keys to Stripe, Google) remain static env vars and are not covered by this pattern.

### Gaps
- No source evaluates Vercel OIDC under a platform breach; no Vercel statement on OIDC in the incident context.
- No information on how Vercel protects its OIDC signing keys or whether any were exposed. (Vercel's April bulletin as summarised only reports env-var decryption.)
- Whether the Railway attacker could have reached any equivalent identity layer: not applicable; Railway has no equivalent mechanism in the sources.

## Comparable Vercel incident and what Vercel said about OIDC

### Takeaway
Yes: Vercel's April 2026 incident exposed decrypted non-sensitive environment variables. The incident bulletin itself does not mention OIDC; Vercel's separate blog promotes OIDC and sensitive variables.

### Cited Findings
- See previous section for incident facts. — [Vercel bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)
- Trend Micro and GitGuardian published write-ups; one blog says Vercel changed the default so new variables are sensitive by default (unverified against Vercel docs). Trend Micro versions disagree on when the intrusion at Context.ai began (about June 2024 vs about February 2026). — [Trend Micro](https://www.trendmicro.com/en_us/research/26/d/vercel-breach-oauth-supply-chain/), [GitGuardian](https://blog.gitguardian.com/vercel-april-2026-incident-non-sensitive-environment-variables-need-investigation-too)
- Vercel's changelog "Death to long-lived static credentials" and a 2026 Marketplace policy: by Nov 30, 2026, vendors without OIDC support get a "Not secure" label; by January 2027 they are delisted. — [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)

### Inferences
- Vercel's push toward OIDC comes after the incident; no source ties the two causally.

### Gaps
- I did not read the Trend Micro or GitGuardian pages in full; only search summaries.
- The full set of what the attacker could reach beyond env vars: per Vercel, investigation closed; details not read in depth.

## Vercel's recommendation for backend-to-backend auth; static IPs vs OIDC

### Takeaway
Vercel recommends OIDC federation to replace long-lived credentials, and says an IP allowlist proves where a request came from, not who sent it. Vercel's static IPs are shared and cannot be limited to an environment.

### Cited Findings
- "Long-lived credentials ... are a security risk: if one leaks, anyone who has it can use it until you notice and rotate it." OIDC tokens "identify the workload itself." — [OIDC Federation](https://vercel.com/docs/oidc)
- "An IP allowlist confirms where a request came from, but not who sent it. Keep your backend's authentication ... in place after you add the static IPs." If your backend runs on AWS, GCP or Azure, "consider OIDC federation instead of Static IPs." — [Static IPs](https://vercel.com/docs/networking/static-ips)
- Static IPs: shared pool, two IPs per region, a small group of customers shares them; apply to every environment including preview; cannot be isolated to one environment; Routing Middleware never uses them; $100/month per project on Pro; Secure Compute gives dedicated IPs (Enterprise). — [Static IPs](https://vercel.com/docs/networking/static-ips)
- Without Static IPs, Vercel does not publish a fixed range to allowlist. — [Static IPs](https://vercel.com/docs/networking/static-ips)
- Vercel's "own API" guide: validate with JWKS, `issuer`, `audience`, `subject`; use team issuer; can use custom audience. — [Connect to your own API](https://vercel.com/docs/oidc/api)
- Vercel's blog lists drawbacks: setup complexity, added latency of token exchange on the request path, incomplete provider support. — [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- Helper library detail: `getVercelOidcToken()` cannot be called at module level in functions because the token lives in the request header; do not cache the returned token. — [OIDC reference](https://vercel.com/docs/oidc/reference)

### Inferences
- A static-IP allowlist alone is weak for this use: other tenants share the same IP pair, and preview deployments share it with production. OIDC with `environment:production` pinned is stronger on both counts. Inference from the two docs.
- Vercel's docs lean on AWS/GCP/Azure examples; the "own API" path (the one that applies to GeekAPI) is thinner: no guidance on replay, token caching on the backend, or clock skew.

### Gaps
- Vercel's recommendation specific to a non-cloud own backend (e.g. an app on Railway): only the generic "Connect to your own API" page found.

## Known real-world issues or write-ups on Vercel OIDC federation misconfiguration

### Takeaway
I found no advisory or CVE specific to Vercel OIDC. Evidence is generic OIDC-misconfiguration research plus Vercel's own examples that show broad `project:*` patterns.

### Cited Findings
- No Vercel-specific advisory was found in one search; the lead material is Unit 42 research on permissive `aud`/`sub` conditions and wildcards in CI/CD. — [Unit 42](https://unit42.paloaltonetworks.com/oidc-misconfigurations-in-ci-cd/)
- A third-party shadcn OIDC guide page for Vercel reportedly notes omitting the environment lets preview and production share access (from a search-result summary only; page not fetched). — [shadcn OIDC Vercel](https://oidc.shadcn.com/docs/providers/vercel)
- Vercel community threads about trusted-source rules and preview tokens exist but are support questions, not advisories. — [community.vercel.com thread](https://community.vercel.com/t/default-this-project-trusted-source-rule-does-not-admit-a-development-token-to-preview/46719)
- Snowflake 2026 release note shows a trailing `*` in an OIDC subject becoming a prefix wildcard, as an example of wildcard risk (not Vercel). — [Snowflake BCR-2461](https://docs.snowflake.com/release-notes/bcr-bundles/2026_08/bcr-2461)

### Inferences
- Likely misconfigurations to avoid: accepting any `sub` for the team; `project:*`; omitting `environment`; accepting global issuer with default `aud` without pinning `owner`/`project_id`; matching on project name rather than `project_id` (names can change, per the rename note). The first four follow the cited general research; the last is deduced from the Vercel rename note.

### Gaps
- No Vercel-specific CVE, advisory or incident report on OIDC misconfiguration found; only one search was done on this, so absence is weak evidence.
- Whether Vercel allows wildcards in its own OIDC policy objects: not checked.
- NIST / OWASP workload identity guidance: not searched within the call budget.
