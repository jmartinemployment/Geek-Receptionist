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

## Stage 5: the eligibility questions as one screen — awaiting a go-ahead

Jeff, 2026-11-21: *"a quite long, intimidating list of excluded industries. Asking a client to read a massive 'do not'
list creates onboarding friction."* True, and the friction is the **eight screens**, not the eight answers. The rule
set on 2026-11-18 — *"more enforceable to ask each separately"* — is about separate **answers**, not separate screens.
Eight yes/no rows on one page, none pre-selected, is still eight affirmative acts and eight rows with their own question
strings; the record is unchanged.

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

- **Now, and cheap:** reword the yes option to say what is true today, without naming Google as the only calendar and
  without promising booking to a business whose calendar we cannot reach.
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

### Decided, 2026-11-21: an unpaid tenant may hold a real login

Gated on status, and expired rather than left to sit. The flow becomes: step 3 creates the tenant
(`pending_payment`), writes the attestation, creates the owner login and signs them in; the owner connects and verifies
each required system on an authenticated dashboard; only then the plan, PayPal and `activate-subscription`, which flips
the tenant `active` and provisions the number.

**The cost boundary holds, verified rather than assumed.** `TwilioProvisioner.ProvisionAsync` has exactly one caller,
`SubscriptionActivation` — the `activate-subscription` route. An unpaid tenant therefore has no inbound number, and no
number means no telephony and no model spend. A login is an identity bound to a `tenant_id`, not a licence to burn
minutes.

**But "runtime and provisioning endpoints already fail closed on active" is not true here, and this is the real work.**
There are exactly **two** status checks in the whole product, and this change removes both of them:

- `OwnerAuthService.CreateLoginAsync:92`
- `McpConnectionService.BeginAsync:34`

Nothing else anywhere checks `VoiceTenantStatuses.Active`, because until now an unpaid tenant could not sign in, so no
other route ever needed to. `SignInAsync` refuses only `cancelled`; `suspended` and `pending_payment` both get in. So
the moment the login gate moves, **nine tenant controllers become reachable by a tenant that has paid nothing** —
Billing, BookingSetting, Calendar, ConsentSetting, Disconnect, McpOAuth, ReceptionistConfig, Storage and TenantCall.
None of them spends money today, which is why this is work rather than an emergency, but the gate they relied on is the
one being removed. **The task is not "move one check"; it is "move one check and add the ones that were never needed."**

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
- **The window is Jeff's, and seven days may be short.** Seven is the usual figure and it is defensible, but this
  product's own research cuts against it: `reports/Outlook calendar booking without licensing.md` found that on a
  default-policy Microsoft tenant the owner **cannot self-consent to a calendar scope at all** — an administrator must.
  A business whose admin is a part-time contractor will not clear that in a week, and the expiry would delete the
  connection work they had done.

**Still open under the rule:** what signup does when a required system cannot be connected at all — no supported
provider, or the connection fails. The rule says the dollar is not taken. Whether that reads as "you cannot sign up" or
as "sign up without booking, which is the message-taking receptionist", is a product answer, not a technical one.

## Order, and what blocks what

1. Stage 6's rewording, which depends on nothing and removes a promise being made to visitors today.
2. Stage 7's decision on the unpaid-login surface, because Stage 7 reorders what every stage below sits in.
3. Stage 5 (portal-only, no dependencies) or Stage 2's portal and API halves — either can go next.
4. Stage 1's version string and address, before Stage 3 ships.
5. Stage 3 with it.
6. Stage 4 after the Terms exist, since it enforces one of their clauses.
7. Stage 6's signup question and Stage 7's verification step, which are the same screen once the order moves.

## Noticed while reading, not part of this plan

`geek_voice.tenants` still carries `requires_addendum`, `addendum_signed_at` and `addendum_ip_address` (migration
`0060`), with `ck_voice_tenants_addendum_pair`. The professional-services question and its addendum were removed by Jeff
on 2026-11-18. A surviving column is read as a live claim — this project's own rule — so it is worth deciding whether
they go. **Not touched without being asked**: they are Jeff's, and the same shape is not the same problem.
