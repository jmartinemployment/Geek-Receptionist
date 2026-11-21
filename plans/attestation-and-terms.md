# Plan: finishing the attestation, and putting a contract behind it

**What this is for: today the eight excluded-industry answers are a very well-kept record of a statement nobody is bound
by.** The record itself is strong — `geek_voice.signup_industry_answers` holds the exact words shown, the answer, the
timestamp, the IP and the country, a trigger refuses every UPDATE, DELETE and TRUNCATE, and the tenant cannot be deleted
while its answers exist (`ON DELETE RESTRICT`, migration `0068`). What is missing is at both ends of it: **nobody states
the answers are true**, and **nothing says what happens if they are false**.

Two gaps, found 2026-11-21:

- **No attestor.** A visitor answers eight questions. No one is named, no one claims authority to answer for the
  business, and no one says the answers are true. The step-3 checkbox is about AI disclosure and recording
  (*"Calls to this business may be answered and recorded by an AI receptionist that tells callers so"*), not industry.
  The questions are also asked before the business is identified, so a refused visitor's rows are tied to an IP address
  and nothing else.
- **No contract.** The only Terms are geekatyourspot.com's, linked in the Receptionist's footer. Their own description
  says they govern *"your use of the Geek @ Your Spot LLC website, our free consultations, and the information we
  publish"* — website, consultations, published information. Their sections are agreement, not-advice, tools and links,
  consultations, text messages, using the site, liability, governing law and contact. Nothing on subscriptions,
  eligibility, representations, suspension, termination or indemnity. **And signup never asks anyone to accept them.**
  A visitor pays PayPal, gets a phone number and an owner login without agreeing to anything.

## Stage 1: the document, which is not code

The Receptionist needs its own subscription terms, separate from the website's. Four clauses are what give the
attestation teeth, and they are short:

1. **Representation** — the business is none of the eight, and the person who answered was authorised to answer for it.
2. **Continuing obligation** — it must stay true, and they must tell us promptly if it stops being true. This is the
   clause that covers a business that *becomes* a HIPAA business associate next year; nothing asks again after signup.
3. **Consequence** — immediate suspension or termination, without refund, if it was false or stops being true.
4. **Indemnity** — they cover claims arising from the false statement. This is the one that matters if PHI reaches the
   system because someone lied.

**Zero Data Retention makes this a standard SaaS agreement — Jeff, 2026-11-21: *"ZDR turned this application into a
standard SaaS legal template."*** There are no transcripts, no audio and no call content held, only billing and usage
metadata, so none of the machinery a data-holding product needs is in scope: no business associate agreement, no data
processing addendum of substance, no retention schedule, no deletion-on-request flow over content that was never kept.
A standard SaaS subscription template plus the four clauses above is the whole document. Where call content goes is the
client's own setting and their own bucket, which the terms point at rather than govern.

**What ZDR does not remove is the exclusion list itself.** It ends retention, not transit: audio still passes through
in real time, and HIPAA and FINRA care about that too. So the four clauses stay exactly as above — they are the reason
this document is being written, and they are the part a template will not have.

**I am not a lawyer and these exclusions are HIPAA- and FINRA-adjacent: the words come from one.** The shape above is
what is being asked for, which is most of the cost. I can draft the full set for review.

The document needs **a version identifier and a date**, because acceptance is stored by version and a later version must
not be read as the one somebody accepted. Everything below needs only that string and the page's address, so stages 2–4
are not blocked on the drafting.

## Stage 2: finish the attestation — a named person says the answers are true

**Where: step 3, the business step.** It is where the business is identified, it is the last screen before a tenant
exists, and it is already where all eight answers are sent (`answersThrough("medicare_tpmo", false)` in
`businessAction`). Nothing moves.

- **Portal** — `BusinessForm` gains the name and title of the person answering (today no person's name is collected
  until the login step, at the very end) and one checkbox: *authorised to answer for this business, and the answers
  given are true*. Separate from the AI-disclosure checkbox, which stays as it is: two distinct assents, two distinct
  checkboxes, neither pre-ticked.
- **GeekAPI** — `ValidateEligibilityRequest` gains `AttestorName`, `AttestorTitle` and `AnswersAttested`. **Fail
  closed**: missing, blank or false is `400` and no tenant is created, the same way `ComplianceAttested` already works.
- **Store** — a new table, not a column. `signup_industry_answers` is append-only by trigger, has no person columns, and
  its rows for a refused visitor are written before any of this exists. So `geek_voice.signup_attestations` (migration
  `0087`): `id`, `tenant_id`, `attestor_name`, `attestor_title`, `attested_at`, `ip_address`, `visitor_country`,
  `terms_version`, `terms_accepted_at`. Same forever-trigger as `0068`, written in the same transaction as the tenant.

**A refused visitor is not attested, and that is correct.** Someone who answers yes is refused at the eligibility
questions and never reaches step 3, so their row stays what it is today: an answer, not an attestation. Stated here
because it will otherwise look like a gap and get "fixed".

## Stage 3: accepting the Terms, which nothing currently does

**Recommended placement: the same step 3 screen, as a second required checkbox** — no new screen, it is where a person
is being identified, and it is before anything is configured or paid for. The alternative is its own screen before the
plan, which is more ceremony for the same assent. **Placement and wording are Jeff's.**

Stored on the same `signup_attestations` row: `terms_version` and `terms_accepted_at`. One submission, one row, two
assents. A Terms page has to exist at a stable address before this ships, because a checkbox pointing at nothing is
worse than no checkbox.

## Stage 4: giving the continuing obligation somewhere to land

Stage 1's second clause says they must tell us when it stops being true. **If there is no way to tell us, the clause is
decorative.** The minimum is a line on the dashboard saying so, with a route that reaches a person. Re-attestation on a
schedule — annually, or at renewal — is the fuller answer and is a decision, not a detail: it is Jeff's call whether a
paying customer is asked again.

## Stage 5: the eligibility questions as one screen — **built, 2026-11-21**

Jeff, 2026-11-21: *"a quite long, intimidating list of excluded industries. Asking a client to read a massive 'do not'
list creates onboarding friction."* True, and the friction is the **eight screens**, not the eight answers. The rule
set on 2026-11-18 — *"more enforceable to ask each separately"* — is about separate **answers**, not separate screens.
Eight yes/no rows on one page, none pre-selected, is still eight affirmative acts and eight rows with their own question
strings; the record is unchanged.

**Built 2026-11-21.** `EligibilityForm` and `eligibilityAction`; `rp_gates` now carries `captcha`, `country` and one
`industries` gate instead of ten; `EXCLUDED_GROUPS` and `industryAnswers` replace `answersThrough`. A yes to any row sends
all eight answers to `industry-refusals` (GeekAPI and the repository both accept any set with at least one yes, checked
before building) and opens the refusal dialog naming the first industry answered yes; closing it forgets the robot check,
as before. Every row is `required` and the action refuses a missing answer, so a blank is never taken as a no. The
signup went from twenty screens to thirteen. Nothing in GeekAPI changed.

One screen, three groups: **Healthcare (HIPAA)** — provider, health plan, clearinghouse, handles PHI for one;
**Financial services** — broker-dealer, investment adviser, commodity futures or derivatives; **Medicare** — Advantage
or Part D TPMO. Three headings read as three things.

Framing carries more than length, and the obvious framing is the wrong one. *"Most businesses answer no to all of
these"* is reassuring and is exactly what must not be said: telling someone that most people answer no, immediately
before a HIPAA and FINRA screening, minimises the gravity of the question and can be read as nudging the answer. Stay
matter-of-fact — *"To check eligibility, confirm whether the business operates in any of these regulated sectors"* —
and let the three headings do the work of making it look short.

**Portal-only.** GeekAPI needs no change: `ExcludedIndustries.Read` already accepts any subset, `industry-refusals`
already takes the whole set, and step 3 already sends all eight noes. It collapses `rp_gates`' eight gates to one and
replaces eight branches in `page.tsx` with one form. Nothing in `excluded.ts` or `OnboardingEligibility.cs` moves.

**Not folded into this plan's other stages:** the attestation checkbox stays at step 3 even if this lands, because at
the eligibility screen the business has not been named yet.

**What this stage must not become:** collapsing the four HIPAA questions into one. That reaches five questions by
trading away exactly what 2026-11-18 bought — one answer covering four claims.

## Stage 6: the appointments step promises a calendar we may not support

Jeff, 2026-11-21, on the yes option of the appointments step (`AppointmentsForm`, `signup-forms.tsx`): *"You connect
your Google Calendar the first time you sign in, and booking switches on then. Isn't quite right."*

It is not. Read it as a business that runs on Outlook reads it:

- The sentence names **Google Calendar** as if it were the only calendar there is. The business either takes it to mean
  *their* calendar, or takes it to mean they are expected to move to Google.
- Either way they answer yes, pay at [4]–[6], sign in, and meet a dashboard card headed **Google Calendar** offering
  Google and nothing else (`calendar-section.tsx`). **They find out after the money is spent.**
- Nothing is technically broken: `BookingRequested` is recorded, `BookingEnabled` stays off, and the receptionist takes
  a message, which is the designed default. What is broken is that booking was sold to someone who cannot have it.

This is the connector plan's own rule — *"No provider offered before it works"* — pointing at the signup form instead
of at the provider enum. The three unconnectable names in that enum are one version of the mistake; this sentence is
the other, and it is the one a paying customer meets.

**Storage already has the answer calendar does not.** Call records go to Google Drive **or** a bring-your-own
S3-compatible or GCS bucket (`storage-section.tsx`, `BucketForm`), so an unsupported drive is not a dead end. Calendar
can have no equivalent under connectors-only: S3 is a generic API many vendors implement, and there is no generic
calendar protocol we are allowed to speak. CalDAV is not a loophole — a CalDAV client is the piece that talks to a
vendor, which is the thing this architecture exists to avoid.

**Two fixes, and the small one should not wait for the large one.**

- **Now, and cheap — done 2026-11-21:** the yes option now says a Google Calendar can be connected today, that a
  business keeping its calendar elsewhere gets a message-taking receptionist that does not book, and that it takes
  messages until a calendar is connected. The wording is a draft of mine; Jeff said the old sentence "isn't quite
  right" and the new one has not been shown to him.
- **Properly:** Stage 6 of `plans/connecting-client-systems.md` — ask *"which calendar does your business use?"* before
  they pay, offering only what can actually be connected plus "something else", which records the answer and promises
  nothing. It stops the promise, tells the business what to expect while they can still walk away, and makes every
  "something else" a demand signal. That plan holds *"which provider is a market decision and yours"* for Stage 3;
  this is how that decision gets data rather than a guess.

## Stage 7: the rule, and the order it breaks

**Jeff, 2026-11-21, verbatim: *"The rule is simple: never take a dollar until you have verified you can connect to
every system the customer requires."*** This decides the question Stage 6 left open, and decides it
harder than any of the three options there: not a warning, not a recorded note, and not a refusal based on what we
*support* — a **verified connection** to each system the customer says they need, proved before they are charged.

Note what "verified" rules out. Knowing that a vendor is in the registry is not verification; neither is the business
naming their calendar on a form. The connector plan already draws this line — *"a provider whose contract check has
never run is not supported; it is merely written"* — and this rule extends it from the provider to the customer: their
own account, their own consent, one real call that worked.

**And it is a qualification gate, not a feature question. Jeff, 2026-11-21: *"99.99% of businesses need their
receptionist connected to their existing systems, so compatibility isn't an edge case; it's the core qualification
gate."*** That puts compatibility in the same class as the country question and the eight industry questions — a thing
asked at the front, which decides whether this visitor can be a customer at all, rather than a detail settled late.
Everywhere this plan and the connector plan treat an unsupported calendar as a footnote on the appointments step, they
have it the wrong way round: **the appointments step is the footnote, and compatibility is the gate.**

So the work splits in two, and the halves sit at different points in the flow:

| | Qualification | Verification |
|---|---|---|
| Asks | do we support what this business runs? | does *this* business's own account connect? |
| Costs | one screen, no connection, no account | an OAuth round trip per system |
| Sits | at the front, with country and industry | after the login, before the plan |
| A no means | not yet — and it is the demand signal | this one cannot be sold today |

**A no here is not the same kind of no as an excluded industry, and must not be built as one.** An excluded industry is
permanent and is refused forever. An unsupported calendar is *"not yet"*, and it is the single most valuable thing the
signup can learn: it names the provider to build next, with a count behind it. `signup_industry_answers` is the wrong
shelf for it — that table's rows are refusals kept for compliance. This wants its own record, and the business wants an
answer better than a closed door: tell them what their systems mean today, and keep the address if they want telling
when it changes.

**The order we have is the opposite of the order the rule needs.**

| | Today | What the rule requires |
|---|---|---|
| 1 | money (`activate-subscription`, [6]) | connect, and prove it |
| 2 | tenant becomes `active` | money |
| 3 | owner login (`CreateLoginAsync` refuses `409 tenant_not_active`) | |
| 4 | connect (`BeginAsync` refuses the same way; `CompleteAsync` needs the owner's Bearer) | |

Three gates, each sound on its own, chain into "no connection before payment":

- `McpConnectionService.BeginAsync` refuses a tenant that is not `active`.
- `CompleteAsync` refuses unless the approving owner's `tenant_id` matches the one sealed in the OAuth state. That is
  the check that stops someone starting a connection for their own tenant and getting a stranger to approve it, and it
  needs an owner token to compare against.
- `OwnerAuthService.CreateLoginAsync` refuses `409 tenant_not_active`, and the tenant becomes active only by spending
  the dollar at [6].

**The smallest move is the owner login.** Let it be created against a `pending_payment` tenant after step 3, so the
owner can sign in, connect each system they require and have it verified, and only then be asked to pay. `BeginAsync`'s
status check moves with it; the state-sealing and tenant-match checks do not change at all, because they were never
about payment.

### Decided, 2026-11-21: an unpaid tenant gets a pending login

Jeff: *"I can read your statement two ways, a user gets a login but technically it is not. More appropriate would be a
pending login or something to that effect."* Right, and the name matters here for the reason this project already
states: a surviving name is read as a live claim. "A real login" claimed more than this gives. A **pending login** is a
credential that can sign in and do one job, connecting and verifying the systems the business requires and moving on
to payment, and nothing else. It becomes a full login when the subscription is active and, per Stage 8, once the
contact details are confirmed.

The flow: step 3 creates the tenant (`pending_payment`), writes the attestation and creates the pending login, and
signs the owner in to a setup-and-connect surface; the owner connects and verifies each required system; only then the
plan, PayPal and `activate-subscription`, which flips the tenant `active`, provisions the number and makes the login
a full one. Expired rather than left to sit, below.

**The cost boundary holds, verified rather than assumed.** `TwilioProvisioner.ProvisionAsync` has exactly one caller,
`SubscriptionActivation`, the `activate-subscription` route. An unpaid tenant therefore has no inbound number, and no
number means no telephony and no model spend.

**A pending login stays narrow by construction, not by a list. This replaces an earlier version of this section that
was wrong.** That version said the moment the login gate moved, nine tenant controllers became reachable by a tenant
that had paid nothing, and that the work was adding a status check to each. Checked 2026-11-21 against the code:
`OwnerTenantClaim.Refuse` is called on **every route of the eight owner controllers** (Billing 3 of 3, BookingSetting
2 of 2, Calendar 1 of 1, ConsentSetting 2 of 2, Disconnect 2 of 2, McpOAuth 2 of 2, ReceptionistConfig 2 of 2,
Storage 3 of 3), and it refuses a token carrying no `tenant_id` claim with `403 tenant_unverified`. Its own comment
says why: *"a login that was never given a tenant can touch no tenant's data."* The ninth controller,
`TenantCallController`, is Twilio's webhooks (`voice`, `consent-result`, `relay`, `call-status`), not an owner route,
so an owner token does not reach it at all.

So the pending login's access token is minted with a **different claim and no `tenant_id`**, and all eight
controllers already refuse it, with no edit. Only the routes a pending login genuinely needs are taught to accept the
pending claim: McpOAuth's two (authorize and complete) and whatever reports verification status. The default is deny
and the allowlist is a handful of routes, which is the reverse of adding a status check to eight controllers and
hoping none was missed. It is also the shape the existing code asks for: its own note says a different kind of login
must be given a different claim, because the tenant routes check only that `tenant_id` matches.

What still changes, and what was not checked:

- Two status checks are still the only ones in the product and both move: `OwnerAuthService.CreateLoginAsync:92`
  (create the login against a `pending_payment` tenant) and `McpConnectionService.BeginAsync:34` (allow it).
- The token minter picks the claim from the tenant's status at mint time. An access token minted before activation
  stays pending until it expires, 15 minutes, and a refresh after activation mints a full one. That fails closed.
- `SignInAsync` refuses only `cancelled` today, so a `pending_payment` login already signs in. That was unreachable
  and becomes real, and `expired` needs its own refusal beside it.
- **Not verified:** the portal reads the tenant from the token's `tenant_id` (`session-claims.ts`, `callOwnerTenant`),
  so the setup surface needs to read the pending claim instead. I have not read those files for this change.

**Expiry: soft, not a delete.** A `pending_payment` tenant gets an `expires_at`, and on expiry its OAuth credentials are
revoked and deleted and its status becomes `expired`, while the tenant row, its `signup_industry_answers` and its
`signup_attestations` stay exactly where they are. Deleting the row is not an option and the reason is already in the
schema: `0068` is `ON DELETE RESTRICT` and append-only by trigger, and Stage 2's table is the same. A soft expiry costs
nothing those constraints protect.

What that needs, none of it free:

- **`expired` is a fifth status.** `tenants.status` is `CHECK (status IN ('pending_payment','active','suspended','cancelled'))`
  in migration `0060`, with `VoiceTenantStatuses.All` mirroring it. A fifth value is a migration, the code list, a
  sign-in refusal beside the `cancelled` one, and a portal change — `src/proxy.ts` currently treats `403
  account_cancelled` as "session ended", and an expired owner needs the same treatment with its own sentence.
- **Expiry must release the email.** A tenant has one owner login and the email is unique, so an abandoned signup that
  created a login *burns that address*: the same owner retrying hits `409 owner_exists`. Today the abandoned-signup
  problem is only a lost cookie; moving the login earlier makes it a hard block on retry. Expiry is what unblocks it,
  which makes the release part of the feature rather than housekeeping.
- **The window is 14 days (Jeff, 2026-11-21: seven is probably right, "but it hurts nothing to double").** Seven is
  the usual figure and it is defensible, but this product's own research cuts against it: `reports/Outlook calendar booking without licensing.md` found that on a
  default-policy Microsoft tenant the owner **cannot self-consent to a calendar scope at all** — an administrator must.
  A business whose admin is a part-time contractor will not clear that in a week, and the expiry would delete the
  connection work they had done.

### The gate is the authorization, not a question — and most of it is already built

Jeff, 2026-11-21: *"Unreliable is a known truth, the authorization is a hard gate."* Right, and it follows from the
Outlook research rather than from preference. Asking *"are you an administrator?"* fails in both directions: an owner
who believes they are an admin passes the question and hits a wall at Microsoft, and an owner who does not know they
have consent rights is turned away before trying. **The token exchange is the only thing that actually knows.** So the
gate is a successful authorization with the scopes we need, for each system the business requires.

**Three parts of that are already in this codebase and must not be rebuilt:**

- **Strict scope checking.** `GoogleCalendarOAuth.Read` already compares the granted `scope` against
  `connection.Scopes` and refuses `scope_not_granted` on any shortfall, with the provider's own
  `PartialGrantMessage`. It is registry-driven, so it covers a new provider the moment that provider has an entry. A
  second hand-written scope comparison per vendor is exactly the per-vendor glue this estate forbids.
- **Refresh-token presence.** Already refused as `refresh_token_missing`, and `RotatesRefreshToken` already handles the
  vendor that returns a new one each time.
- **The live probe.** `list_calendars` through the gateway is already used as a real call before booking is switched on
  (`BookingSettingController:126`, `ReceptionistConfigWriter:135`). Verification reuses that, rather than a Graph call
  written into GeekAPI — which would be a vendor API client in the receptionist path, forbidden by the connector plan.

**What the verified state is: derived, not stored.** A separate `PendingTenant` entity with its own
`AwaitingOAuth → PendingAdminConsent → VerifiedForCheckout` machine would be a second source of truth beside the tenant
status we already have and the connection rows in `tenant_mcp_connections`, which already carry active and
reauthorization-required. "Ready for checkout" is *the business has an active connection for every system it said it
requires* — a derivation, the same way `VoiceMcpProviders.Calendars` is derived from each provider's `Booking` rather
than hand-kept. One state to drift is better than four.

**The one genuinely new state, and it is worth having: parked on admin consent.** When Microsoft answers
`consent_required` / `AADSTS90094`, that is not a failed connection to dead-end on — the Outlook research already
established admin consent is the *normal* path on a default-policy tenant, not the error path. The business is blocked
from checkout, correctly, but should be given the admin-consent address to hand to whoever can approve it, and a way
back in when they have. **This is what the expiry window above must be sized for**: not "how long before an abandoned
signup is tidied away" but "how long does a small business need to get its administrator to click a link". A single
longer window answers both; several different TTLs answer neither better.

**One thing that does not fit the existing design and needs deciding:** the administrator approving out of band is
**not the owner**, so their return cannot come through `CompleteAsync` — that route refuses unless the approving
owner's `tenant_id` matches the one sealed in the state, which is the check that stops a stranger approving someone
else's connection. An admin-consent return arrives with no owner session at all. It needs its own route and its own
binding, and it must not be built by relaxing the tenant-match rule.

**Checked, because it would have been copied:** the addresses in the advice are mangled —
`https://microsoftonline.com{tenant_id}/adminconsent`, a probe against `https://microsoft.com`, and stripping a
`https://microsoft.com` scope prefix. The real ones are `https://login.microsoftonline.com/{tenant}/adminconsent`, a
Graph call under `https://graph.microsoft.com/`, and the prefix to strip is `https://graph.microsoft.com/`. It also
says "post-Stripe webhook"; billing here is PayPal.

### Parking on admin consent: what it costs here, and the one line of code that is wrong for it

Two things about Microsoft's admin consent workflow bear directly on the design, and one of them lands on code that
exists today.

**`CompleteAsync` calls every failure a decline, and that is wrong for this case.** Its error branch logs the value and
returns one code for all of them:

> *"The calendar connection was declined."* — `McpFailureCodes.AuthorizationDenied`

An owner blocked by tenant policy did not decline anything. They would be told they refused their own connection, and
the thing they actually need — the address to hand their administrator — would never appear. This is the fail-loud rule
in its less obvious form: the failure is surfaced, loudly, and is **the wrong failure**. Parking needs that branch to
tell a decline apart from a consent block, per provider, and the registry entry is where that belongs, not an `if` in
the service.

**`prompt=consent` must not be sent to Microsoft, and the registry already says so.** The advice warns that leaving it
on re-prompts for admin approval even after tenant-wide consent exists. `McpProviders` anticipated this: Google's
`ExtraAuthorizationParameters` carries `access_type=offline` and `prompt=consent` because without them a second Google
connection returns no refresh token, and the doc comment already states *"Microsoft needs neither, because it returns
one whenever `offline_access` is among the scopes."* It is per-provider data, so Microsoft's entry simply does not
carry it. Nothing to fix; worth knowing it was not an accident.

**The admin's return needs a route of its own, on the API-key path.** Already noted above that the approving
administrator is not the owner, so `CompleteAsync`'s tenant-match check cannot be used and must not be relaxed. Two
further specifics:

- **The state is already solved.** `McpOAuthState` seals the tenant and provider together, AES-GCM, bound to its
  purpose so one sealed value cannot be opened as another. The admin-consent return reuses it. No new signing scheme.
- **Tenant-wide consent is not a token.** The `/adminconsent` endpoint grants the application consent across the
  tenant; it mints no access or refresh token for anybody. **The owner must still complete an ordinary connection
  afterwards** to get their own delegated tokens. So the admin's return marks the block cleared and tells the owner to
  come back — it never completes the connection itself. A design that treats the admin callback as the end of the flow
  would leave the tenant with consent and no stored token, and nothing would be connected.

**Resuming:** a silent re-authorization (`prompt=none`) is the clean way to ask "has it been approved yet" without
showing the owner a login screen, and a plain "check again" button beats polling for a wait measured in days. Worth
noting that the admin may approve inside the Entra portal instead of through our link, in which case our route never
fires and the re-check is the only thing that notices.

**Settled by deep research, 2026-11-21 — `reports/Entra admin consent for calendar OAuth.md`.** Four researchers
read the primary Microsoft pages (raw HTML, no truncation); the report carries every quote and URL, and keeps what is
NOT CONFIRMED marked as such. The gate reduces to four rules, each grounded there:

1. **A redirect without a `code` is a failure.** The authorize redirect carries `error` + `error_description` + `state`
   and nothing else; `error_subcode` appears in no reference page and is never branched on.
2. **`access_denied` parks, with copy that covers both meanings.** Microsoft documents the "Need admin approval"
   screens but *never states which `error` value reaches the redirect_uri* when the user exits them — community
   evidence says `access_denied`, same as a plain decline. The redirect cannot tell "you declined" from "your admin
   must approve", so the parked copy says both. `interaction_required` / `login_required` / `consent_required` →
   retry interactively; anything else → fail loud. The two meanings stay **one outcome by design**: no
   `error_subcode` matching and no `AADSTS`-in-description matching, even "defensively" — Microsoft forbids reacting
   to either, and half the proposed markers were never observed anywhere. What covers the gap instead is a standing
   affordance on the Microsoft connect card — *"my administrator must approve this"* — that produces the
   admin-consent link without requiring another failed round trip. AADSTS numbers are regex-extracted into logs for
   operators, nothing more.
3. **`/adminconsent` may optimistically unpark and never verifies.** Its success redirect carries no code and no token
   for anyone; its *error* redirect also carries `admin_consent=True`, so the callback branches on `error` first; its
   `tenant` value is documented as forgeable. The request names the tenant GUID or `organizations`, never `common`,
   and should cover `openid profile offline_access` beside the calendar scope so the later sign-in is prompt-free.
4. **Payment follows only a redeemed authorization code that returned a refresh token.** The resume probe
   (`prompt=none` + `login_hint`, browser-borne — no server-to-server consent check exists for a delegated-only
   vendor) is a session-AND-consent test: `login_required` means "no session here", not "no consent". A silent
   redemption with `offline_access` mints the refresh token itself, so the probe that confirms consent completes the
   connection. `prompt=consent` is never sent to Microsoft — it forces the dialog even after tenant-wide consent.

Corrections to what this section said before the research: `AADSTS900941` and `900942` are both **absent** from the
error reference page (the full 370-row table was read; 900941 lives only on the troubleshoot page, 900942 was found on
no Microsoft page at all). And the parked TTL is sized blind: no primary source states a range or default for the
tenant's consent-request window, the vendor cannot read it, a reviewer's **Block** is terminal and indistinguishable
from a slow admin — so the parked state is **re-enterable**, not one-shot, and the TTL (14 days, decided) governs only
housekeeping, never a hard refusal to try again.

**Decided, 2026-11-21 — the park is passive, and refusal at the block is rejected.** Jeff, verbatim: *"park
passively, never pursue. No nurture emails, no follow-up motion, no countdown pressure. They come back with approval
or they quietly expire. The deliberately-hardened org self-selects out by never returning; the plumber self-selects
in by clicking their own link."* The reasoning that settled it: the wire cannot distinguish a deliberately hardened
organization from a small business on Microsoft's default policy — the same `access_denied` comes from both, and the
managed default excludes every calendar scope from end-user consent, so the blocked path is the *normal* path for the
target market, whose owner is usually the admin. Refusing at the block would refuse that majority. Parking already
honours the never-take-a-dollar rule — a parked tenant has paid nothing, holds no number, and soft-expires.

What "passive" rules out, so it is not rebuilt as a feature: no outbound contact of any kind from the parked state —
no nurture sequence, no reminder, no countdown, and not the "your admin approved, come finish" email the earlier
advice had the `/adminconsent` callback dispatch. This matches the standing no-notification-channel decision of
2026-11-19. The owner's one resume surface is the connect card itself: it says the connection is waiting on their
administrator, offers the admin-consent link again, and offers "check again" — and the owner finds it by coming back
on their own.

**Decided, 2026-11-21 — the window is 14 days, and instructions come before parking.** Jeff: 7 days is probably right
for the target audience, *"but it hurts nothing to double to 14"* — and, more importantly: *"providing Joe step by
step instructions to immediately enable is probably our best course of action."* That reshapes the surface from
wait-and-retry to teach-first, and the research says it works at two moments:

1. **At connect, before any block.** On a managed-policy tenant an owner who *is* an administrator sees Microsoft's
   own consent screen with a **"Consent on behalf of your organization"** checkbox — tick it and there is no block,
   no park, no second trip. The connect card says so in advance, in plain words, with the reassurance the Outlook
   report says the owner needs spelled out: approving as the administrator does **not** give the receptionist reach
   into anyone else's mailbox or calendar — it still acts only as whoever signed in. The owner will otherwise assume
   the opposite and balk at their own checkbox.
2. **At the parked screen, for the owner who hit the block anyway.** Step by step, two branches: *if you are the
   administrator* (in a small business, you probably are) — open this link, sign in with your Microsoft account,
   select Accept, come back here, press "check again"; *if you are not* — send the link to whoever manages your
   Microsoft 365, and come back when they say it is done. The link is the tenant's `/adminconsent` address; the
   reassurance line appears here too.

Teaching first does not soften the gate: the dollar still waits for a redeemed code, and the park stays passive —
the instructions are on the card when the owner is looking at it, never sent after them. Exact wording is Jeff's,
with the rest of the signup copy.

**Decided, 2026-11-21 — when a required system cannot be connected, the visitor decides, told plainly.** Jeff:
*"clearly we cannot satisfy the user's desire, best to communicate via modal dialogs and put the decision back where
it belongs."* Neither a silent refusal nor a silent pass-through: a modal says what cannot happen — their system is
not one we can connect today, so booking (or the CRM ability) will not work — and what still can: the receptionist
answers, takes messages, and does everything that does not need that system. The visitor then chooses: continue
without it, or stop. The decision goes back to the person it belongs to, which is this product's standing rule about
clients applied to the sale itself.

Mechanics that follow from it: the modal is the signup's existing refusal idiom (the country and excluded-industry
dialogs already work this way), the "something else" answer is still recorded as the demand signal either way, and
the never-take-a-dollar rule holds in both branches — a visitor who continues without booking has nothing left to
verify for that system, so the sale matches what was actually proved. Wording is Jeff's, with the rest of the signup
copy.

## Stage 8: who we are talking to comes first, and nothing is confirmed until it is paid for

Jeff, 2026-11-21: ask *"who we are talking to first, & business name, address, and both telephone, email
confirmations"*; then, on the cost of confirming before payment, *"that incurs charges and no way I know whether I will
ever get paid"*, and, settling it, *"the rest holds true, who are we talking to, confirmation after payment."*

**Two rules, one for each direction of money.** Never take a dollar until every required connection is verified
(Stage 7). Never spend a dollar until the dollar is in hand. The existing order already keeps the second: the number is
bought only at `activate-subscription`, after PayPal clears. This stage extends it to confirmation.

**Collected first, unverified.** The person's name and title, the business name, its address, and the contact phone and
email are asked for at the front, before the eligibility questions. Today the phone and email are only format-checked
(`UsPhone.ToE164`, `IsEmailAddress`) and no address is captured anywhere: `tenants` holds `state_code` and `county`
and nothing else. So this adds an address column, and Stage 2's attestor name and title ride the same screen. A
refused visitor now leaves a name and a business, not just an IP address. That means personal details held, forever,
on people we turned away, and Jeff accepted it.

**Confirmed after payment: both the email and the phone.** Neither is confirmed before the plan, because a phone code
is a per-message charge to whoever asks for one and an open "text me a code" box is how bots run up an SMS bill. I
have not checked Twilio's or Resend's prices; the argument does not depend on the amount, only on the money not
being in hand. Eligibility stays ahead of everything else because it costs nothing, and we never pay to confirm
someone we are about to refuse.

**The mechanism is not chosen, and one free signal may already exist.** PayPal verifies the payer's name and email
when the subscription is approved. Whether GeekAPI keeps that has not been checked; if it does, part of "who are we
talking to" is proven for nothing. For the phone, the options are an SMS code or a call from the number just bought,
and either is paid for by a sale already made.

**Settled, 2026-11-21: the pending login sits on an unconfirmed email.** Stage 7 gives an unpaid tenant a pending
login so the owner can connect before paying, and Stage 8 confirms the email and phone only after payment, so the
two meet. Jeff's answers decide it: confirmation after payment, and the credential is a pending login, not a full
one. The cost is accepted as named: a pending login can do one job, nothing is sent to the address and nothing is
spent, and what remains is that anyone can reserve someone else's address for the 14-day window (`owner_exists` on
the unique index), which expiry releases. The login proves a password, not a mailbox, until the confirmation after
payment, which is what makes it a full login. The alternative, a free email code before payment, was offered and is
not taken.

## Order, and what blocks what

1. ~~Stage 6's rewording~~ — done.
2. ~~Stage 5~~ — done.
3. Stage 2's portal and API halves, the next buildable thing; it needs no decision.
4. Stage 7's reorder, which changes what every stage below sits in and needs the unpaid-login surface built first.
5. ~~Stage 8's decision on the unpaid login's unconfirmed email~~ — settled.
6. Stage 1's version string and address, before Stage 3 ships.
7. Stage 3 with it.
8. Stage 4 after the Terms exist, since it enforces one of their clauses.
9. Stage 6's signup question and Stage 7's verification step, which are the same screen once the order moves.

## Noticed while reading, not part of this plan

`geek_voice.tenants` still carries `requires_addendum`, `addendum_signed_at` and `addendum_ip_address` (migration
`0060`), with `ck_voice_tenants_addendum_pair`. The professional-services question and its addendum were removed by Jeff
on 2026-11-18. A surviving column is read as a live claim — this project's own rule — so it is worth deciding whether
they go. **Not touched without being asked**: they are Jeff's, and the same shape is not the same problem.
