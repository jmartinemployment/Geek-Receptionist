# Outbound calling, against collections as the first use case

Jeff, 2026-11-20: *"I do not wish to exclude outboard calls"*, then *"Outbound calls - One Use Case example Collections"*.

This is research, not a plan to build. Nothing here is approved and no code exists: there is no call origination anywhere in
this product. It exists because collections is the heaviest-regulated outbound case there is, and because the constraints
below are not ones to discover after the code is written. Every rule quoted is from its primary source; where only vendor
blogs were available it says so, in those words.

## The one finding that governs everything else

**An AI voice is an "artificial voice" under the TCPA, so every outbound call needs the called party's prior express
consent.** FCC 24-17, CG Docket No. 23-362, Declaratory Ruling, adopted 2 February 2024, released 8 February 2024, read
from the Commission's own PDF:

> we confirm that the TCPA's restrictions on the use of artificial or prerecorded voice encompass current AI technologies
> that generate human voices. As a result, calls that use such technologies fall under the TCPA and the Commission's
> implementing rules, and therefore require the prior express consent of the called party to initiate such calls absent an
> emergency purpose or exemption.

Read that against collections specifically. A debt existing is not consent. A debtor who gave their number to the original
creditor years ago has not consented to an AI voice calling them. So the gate on every outbound call is a **consent record
for that person, for AI calls** — and the product cannot place the call without finding one. That is a check before dialling,
not a disclosure during the call, and it is the difference between a feature and a liability.

The inbound product never needed this: somebody dialled us.

## Regulation F, from the regulation

12 CFR 1006.14 and 1006.6, read at Cornell's current text. These apply to **debt collectors** under the FDCPA — a tenant
collecting its own debts is generally not one, a tenant collecting for others is. The product cannot tell which from a
signup form, so it has to ask.

| Rule | The text |
|---|---|
| **7-in-7** | § 1006.14(b)(2)(i): presumed to comply if it does not call a particular person about **a particular debt** more than **seven times within seven consecutive days** |
| **After a conversation** | § 1006.14(b)(2)(i)(B): no call **within seven consecutive days after having had a telephone conversation** about that debt; the conversation day is day one |
| **Exceeding either** | § 1006.14(b)(2)(ii): presumed **violation** of § 1006.14(b)(1) and FDCPA § 806(5) |
| **Per debt, not per person** | § 1006.14(b)(4): the counts are per particular debt. Student loans serviced under one account number count as one |
| **What does not count** | § 1006.14(b)(3): calls placed with the person's consent **given directly to the collector**, within seven days of it; calls **not connected to the dialed number**; calls to the third parties in § 1006.6(d)(1)(ii)–(vi) |
| **Hours** | § 1006.6(b)(1): before **8:00 a.m. and after 9:00 p.m. local time at the consumer's location** is inconvenient absent knowledge to the contrary |
| **Stop means stop** | § 1006.6(c): written notice refusing to pay or to cease communication, and the collector **must not communicate further about that debt** |

Two of these correct what the vendor blogs said. A call that rings unanswered and **does not connect does not count** toward
7-in-7 — several blogs said it did. And the count is per debt, which blogs disagreed on; the regulation says "particular
debt" and defines it.

The hours rule is the quiet one: it is the **consumer's** local time, not the tenant's. A Florida business calling a debtor
in Oregon may not dial at 8:30 a.m. Eastern. So the product needs the debtor's location, or it cannot honour this.

## What this does to Zero Data Retention, stated concretely

Jeff's ZDR line is that no call content is persisted, and that survives: none of the below is anything anybody said.

But to place **one** compliant collections call, something must hold, per debtor per debt, and *between* calls:

1. the phone number and which debt it is for;
2. a **consent record** for AI calls, with when and how it was given (TCPA);
3. the debtor's location or time zone (the 8 a.m.–9 p.m. rule);
4. **timestamped counts of calls in the last seven days** (7-in-7);
5. **the date of the last telephone conversation** about that debt (the seven-day quiet period);
6. any cease-communication or stop request — and this one **cannot expire**. A stop request you deleted is a stop request
   you will violate.

Items 4, 5 and 6 are retained state by construction, and 6 is permanent. That is a real exception and it goes into
`GeekBackend/docs/Geek-Receptionist-zero-data-retention.md` **by name**, the same treatment the retry-after-failure case
already got (`use-cases-against-zero-data-retention.md`). It is not a quiet addition.

The fork, and it decides the whole build: **do we hold that ledger, or does the tenant's own system hold it and we ask at
call time?** The second is the bring-your-own-storage posture applied to outbound and keeps the product's claim intact; it
needs the tenant to have a system worth asking, and it makes us dependent on their answer being right when the consequence
of a wrong one is a federal violation. The first is a real database of consumer debt contact history, which is a different
company than the one described on the sales page.

## Who is left to sell this to — a market question, not an outbound rule

**Nothing in this section is a constraint on outbound calling.** Outbound is governed by the TCPA and Regulation F above,
and by state law. What follows is who can be a tenant at all, which is the same question for inbound and settled already;
it is here only because it decides how much of the collections market this use case could reach, and that bears on whether
to build it. An earlier version of this section sat unlabelled and read as though HIPAA governed outbound calls. It does not.

**Medical debt is already refused, and that is most of third-party collections.** `/signup` asks *"Does the business handle
patient health information for a healthcare provider or health plan?"* (`src/lib/signup/excluded.ts:39`) and a yes ends the
signup. A medical-debt collector working for a provider is a HIPAA business associate and answers yes. That exclusion is
deliberate — Jeff chose the eight industry questions on 2026-11-18 — and it already does this work, whichever direction the
calls go.

What the form does **not** ask, and would have to: whether the business collects debts owed to others (FDCPA applies), and
whether it holds the state collection-agency licences its calls require. Not verified: which states require what. Those are
the tenant's licences, not ours, but a product that dials on their behalf should not pretend not to know the question exists.

## What would have to be built

Separable from the inbound path, which is why the design should not be bolted onto it:

- **Call origination** — nothing places a call today. Twilio's Calls API from the tenant's own subaccount and number.
- **A pre-dial gate** that refuses rather than warns: consent on record, inside 8 a.m.–9 p.m. at the debtor's location, under
  7-in-7, outside the post-conversation quiet week, not on the stop list. Fail closed: no consent record, no call.
- **The ledger** behind that gate (the fork above).
- **An AI disclosure at the start of the call.** Not verified whether the FCC has made this mandatory — secondary sources in
  November 2026 said three proposals were pending and none adopted as of October 2026. Our own consent gate already discloses
  on inbound; doing it on outbound is cheap and is the safe side of an unsettled rule.
- **The conversation itself needs nothing new.** `ReceptionistRelaySession` already runs a call once connected.

## Not verified, and to be checked before anything is built

Each of these came from compliance-vendor blogs, not a primary source, and the two searches disagreed with each other:

- **FCC consent-revocation rules said to take effect 25 November 2026** — five days after this was written. Must be read
  from the FCC or the Federal Register before it matters.
- **Whether the FCC has adopted AI-disclosure-at-call-start requirements**, or they remain proposals.
- **One-to-one consent** said to have been vacated by the Eleventh Circuit in 2025 and therefore unenforced federally, with
  some states enforcing their own. Not confirmed.
- **State rules stricter than Reg F**: Massachusetts and New York City announced changes in February 2026; Oregon HB 3865
  took effect 1 January 2026 and is said to narrow quiet hours to 8 p.m.–8 a.m. None read first-hand. Reg F does not preempt
  stricter state law, so these bind wherever they apply.
- **State debt-collector licensing**, per state.

## Sources

Primary: [FCC 24-17 Declaratory Ruling](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf) ·
[12 CFR 1006.14](https://www.law.cornell.edu/cfr/text/12/1006.14) ·
[12 CFR 1006.6](https://www.law.cornell.edu/cfr/text/12/1006.6).
Secondary, and the reason the section above exists:
[Reg F 2026 operator's guide](https://www.sedric.ai/arm-resources/cfpb-reg-f-2026-operators-guide) ·
[AI voice agents and the TCPA, October 2026](https://econsent.org/posts/ai-voice-agents-tcpa-rules-october-2026/).
