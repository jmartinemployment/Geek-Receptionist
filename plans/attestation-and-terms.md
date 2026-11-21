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
or Part D TPMO. Three headings read as three things. Framing carries more than length: *"Most businesses answer no to
all of these"* makes it eligibility rather than accusation.

**Portal-only.** GeekAPI needs no change: `ExcludedIndustries.Read` already accepts any subset, `industry-refusals`
already takes the whole set, and step 3 already sends all eight noes. It collapses `rp_gates`' eight gates to one and
replaces eight branches in `page.tsx` with one form. Nothing in `excluded.ts` or `OnboardingEligibility.cs` moves.

**Not folded into this plan's other stages:** the attestation checkbox stays at step 3 even if this lands, because at
the eligibility screen the business has not been named yet.

**What this stage must not become:** collapsing the four HIPAA questions into one. That reaches five questions by
trading away exactly what 2026-11-18 bought — one answer covering four claims.

## Order, and what blocks what

1. Stage 5 (portal-only, no dependencies) or Stage 2's portal and API halves — either can go first.
2. Stage 1's version string and address, before Stage 3 ships.
3. Stage 3 with it.
4. Stage 4 after the Terms exist, since it enforces one of their clauses.

## Noticed while reading, not part of this plan

`geek_voice.tenants` still carries `requires_addendum`, `addendum_signed_at` and `addendum_ip_address` (migration
`0060`), with `ck_voice_tenants_addendum_pair`. The professional-services question and its addendum were removed by Jeff
on 2026-11-18. A surviving column is read as a live claim — this project's own rule — so it is worth deciding whether
they go. **Not touched without being asked**: they are Jeff's, and the same shape is not the same problem.
