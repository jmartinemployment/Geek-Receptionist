# Outbound calling, against the use cases Jeff has named

Jeff, 2026-11-20: *"I do not wish to exclude outboard calls"*, then *"Outbound calls - One Use Case example Collections"*,
then *"Joe's TV owes me 10K"*, then *"Call to confirm"*. Two use cases, and the second is much the lighter.

**Read the two sections at the end before the middle ones.** The regulatory weight below is third-party *consumer*
collections. Neither case Jeff has named is that: one is his own commercial invoice, the other is an appointment
confirmation. The heavy sections stay because they are what a *tenant* doing consumer collections would face, and the form
would have to find out which kind a tenant is.

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

The fork: **do we hold that ledger, or does the tenant's own system hold it and we ask at call time?** The second is the
bring-your-own-storage posture applied to outbound and keeps the product's claim intact; it needs the tenant to have a system
worth asking, and it makes us dependent on their answer being right when the consequence of a wrong one is a federal
violation. The first means storing consumer debt contact history, a heavier retention commitment than the one currently
documented.

**It is only open for third-party consumer collections.** For the confirmation case it is already answered — the appointment
lives in the tenant's calendar — and for a first-party commercial invoice most of the ledger is not required at all. Both are
below.

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

## Case 1: a first-party commercial invoice — "Joe's TV owes me 10K"

Jeff, 2026-11-20. This is the case he actually has, and almost none of the above reaches it.

**It is not an FDCPA debt, so Regulation F does not apply.** 15 U.S.C. § 1692a(5) defines a debt as an obligation *"of a
consumer"* from a transaction for *"personal, family, or household purposes."* Joe's TV is a business and the invoice is
commercial, so it is outside the Act — and Reg F implements the Act. No 7-in-7, no 8 a.m.–9 p.m. presumption, no Reg F
cease-communication duty. Separately, § 1692a(6) reaches people collecting debts *"owed or due another"*, and this is his own
money, so he is a creditor rather than a debt collector on two independent grounds.

**The trap is in the same paragraph, and it is a naming decision.** § 1692a(6) ends: the term *"includes any creditor who, in
the process of collecting his own debts, uses any name other than his own which would indicate that a third person is
collecting or attempting to collect such debts."* So a receptionist that introduces itself as a recovery or collections
agency pulls a first-party creditor into the FDCPA — and the whole of Reg F with it — by its name alone.

That lands on a field this product already has. The signup form asks *"What should your receptionist call itself?"*
(`src/app/signup/signup-forms.tsx`, the knowledge step), free text, no constraint. Lily or Dana is fine; "Acme Recovery
Services" is a tenant volunteering for a federal statute. If outbound collections is built, that field needs a constraint or
at least a warning for tenants doing it, and the assembled prompt must not let the receptionist describe itself as a
third-party collector either.

**The TCPA still applies, and it turns on what kind of line Joe answers.** Read from 47 U.S.C. § 227(b)(1):

- **(b)(1)(B)** prohibits an artificial or prerecorded voice *"to any residential telephone line"* without prior express
  consent. It does not reach business lines.
- **(b)(1)(A)(iii)** reaches *"any telephone number assigned to a paging service, cellular telephone service, specialized
  mobile radio service"*, and any service where the called party is charged — **regardless of whether the line is business or
  residential** — and (b)(1)(A) requires prior express consent for a call using an artificial or prerecorded voice.

So an AI call to Joe's TV's **landline** is not caught by either clause. An AI call to Joe's **mobile** is caught by
(b)(1)(A)(iii) and needs prior express consent, business number or not. In practice most small businesses answer a mobile, so
the mobile path is the one to design for, and the product cannot tell which a number is without a lookup.

**Not verified:** whether a number the debtor gave the creditor in the course of business constitutes prior express consent
for calls about that debt. The FCC has long been understood to take that position for debt-collection calls to numbers the
debtor provided, but that was not read first-hand and it is the load-bearing assumption for this whole case. It is the next
thing to check, before any code.

## Case 2: a call to confirm — the one to build first

Jeff, 2026-11-20: *"Call to confirm"*. An appointment confirmation, and it is the lightest outbound case there is.

**It needs no new retained store, which is why it should go first.** The appointment is already in the tenant's Google
Calendar, which this product already reads over MCP for booking. So *who to call and why* comes from the tenant's own system
at call time: read the event, call the number on it, confirm or rebook, write the outcome back to the event. Nothing is held
between calls, and no new table exists for a regulator or a reader to find. That is the bring-your-own-storage shape the
product already uses, applied to outbound — and it is what `use-cases-against-zero-data-retention.md` already filed
pre-appointment reminders under: *"compatible only if the state lives in the client's system."* So this case is consistent
with what is written rather than an exception to it.

It is also not debt collection, so the FDCPA and Reg F are irrelevant to it entirely.

**What it still needs:** the TCPA consent basis, same as any outbound AI call to a mobile. Here the story is strongest in the
product: the customer gave the number when booking, for the purpose of that appointment, and where they booked through the
receptionist itself they had already heard the AI disclosure and consented to it before speaking. Whether that is sufficient
prior express consent is the same unverified question as above, and it is worth settling once for both cases.

**What it shares with case 1, and is the reason to build it first:** the mechanism. Placing a call, identifying the business,
disclosing the AI, honouring a request not to be called again, and handing the conversation to the relay that already exists.
Build that once for confirmations, where the retained state is nobody's but the tenant's, and the collections cases are the
same machinery plus a ledger — rather than the ledger being the first thing built.

## Sources

Primary: [FCC 24-17 Declaratory Ruling](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf) ·
[12 CFR 1006.14](https://www.law.cornell.edu/cfr/text/12/1006.14) ·
[12 CFR 1006.6](https://www.law.cornell.edu/cfr/text/12/1006.6) ·
[15 U.S.C. 1692a](https://www.law.cornell.edu/uscode/text/15/1692a) ·
[47 U.S.C. 227](https://www.law.cornell.edu/uscode/text/47/227).
Secondary, and the reason the section above exists:
[Reg F 2026 operator's guide](https://www.sedric.ai/arm-resources/cfpb-reg-f-2026-operators-guide) ·
[AI voice agents and the TCPA, October 2026](https://econsent.org/posts/ai-voice-agents-tcpa-rules-october-2026/).
