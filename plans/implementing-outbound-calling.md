# Plan: implementing outbound calling

Jeff, 2026-11-20: *"Create a plan to implement ... another for outbound calls."*

**What this is for:** a tenant's customers get called the day before their appointment, and the tenant's unpaid invoices get
chased, without this company ever holding a list of anybody's customers.

The research is `outbound-calling.md` — the TCPA ruling that makes an AI voice an artificial voice, Regulation F's counts and
hours, the four cases Jeff named, and why "non-marketing" is the whole ballgame. It is not repeated. This is the build, and
the order is chosen so the lightest case proves the mechanism and the heaviest case is last.

## The architecture decision this is built on

Jeff, 2026-11-20: *"Outbound calling I envision connecting to client/users data store. The Multi-step form should ask exactly
in that manner."*

**We hold no list of who to call.** The person, the number, the reason and the time live in the client's system, and the
product reads them when a call is due. That is the bring-your-own-storage posture already used for call records, applied to
outbound, and it is what keeps Zero Data Retention intact through Stages 1–4. It also means the first question the form asks
is about *their* store, not a list for them to type into ours.

## Nothing exists today

There is **no call origination anywhere in this product**. Nothing dials. What does exist, and is reusable:

- `TwilioProvisioner` — creates the tenant's **subaccount**, buys the number, sets its webhooks. An outbound call must be
  placed from that subaccount with that number, or the caller ID is wrong and the billing is somebody else's.
- `TenantCallController` — the inbound routes, the consent gate, the relay handshake, `RelayTickets`, and
  `TwilioCallStatusRecorder` for billing. **The conversation itself needs nothing new:** `ReceptionistRelaySession` runs a
  call once connected and does not care who dialled.
- `CalendarTools` over MCP — already reads and writes the tenant's Google Calendar for booking.

So this is a new call-initiation path and a new gate in front of it, joining the existing relay at the moment someone
answers.

## Blocked before Stage 1, and these are not mine to close

**1. The consent premise, which every case rests on.** What satisfies *prior express consent* under 47 CFR 64.1200(a)(1) —
specifically, whether a number given when booking an appointment, or given to a creditor in the course of business, is itself
prior express consent for an AI call about that matter. The FCC has long been *understood* to take that position for debt
collection calls to numbers the debtor provided, but that was not read first-hand. **It is the one assumption the whole
feature stands on and it is unverified.** It gets read from the FCC or the Federal Register before code, not after.

Settled already, and worth not re-opening: none of Jeff's four cases needs *written* consent, because (a)(2)'s written
standard reaches only calls carrying an advertisement or constituting telemarketing, and none of them does — **as long as the
AI does not pitch**. Stage 2 is where that stops being a sentence and becomes a constraint.

**2. The form questions.** O1–O8 in `signup-form-questions.md` are proposals in Jeff's shape, not decisions. Stage 4 cannot
be built from a guess about which reasons a tenant may call for, where the list is read from, or when calls fire.

## Stage 1: the mechanism, proved on the confirmation call

Jeff, 2026-11-20: *"Call to confirm"*. **This case needs no new retained store, which is exactly why it goes first.** The
appointment is already in the tenant's Google Calendar, which this product already reads. Who to call and why comes from
their system at call time; the outcome is written back to their event; nothing is held between calls and no new table exists
for anyone to find.

What gets built:

- **`OutboundCallPlacer`** — places the call through Twilio's Calls API using the tenant's **subaccount credentials and its
  own number**, exactly as `TwilioProvisioner` provisioned them. Its TwiML URL, status callback and `machineDetection` are
  set per call.
- **`OutboundCallController`**, a new route beside the inbound ones, authenticated by `X-Twilio-Signature` against the same
  subaccount token the inbound routes use. It answers:
  - **the TwiML request** when the call connects — the outbound opening, then `<Connect><ConversationRelay>` with the
    tenant's language, the same way the inbound path does after consent;
  - **the status callback** — billed by `TwilioCallStatusRecorder`, which already exists, and recording *no answer*, *busy*
    and *machine* as themselves rather than as a completed call.
- **The outbound opening**, and it is not the inbound disclosure. An outbound call must say who is calling, that it is an AI,
  and why it is calling, before anything else. It is reviewed wording in each language, so it belongs in
  `ReceptionistLanguages` beside the other four sentences (see `implementing-languages.md`), not assembled from them.
- **The outbound prompt, built separately from the inbound one.** See Stage 2 — this is the constraint, not a detail.

**One question in here is Jeff's and must not be defaulted: what happens when a machine answers.** Twilio's answering-machine
detection can tell us; what we do about it cannot be guessed. Leaving an AI voicemail is a different act from speaking to a
person — it is a recording, it may not reach the right person, and on a collections call it risks disclosing a debt to
whoever plays it back. Hang up, leave a message, or call back later are three different products. The code gets built to
*know* a machine answered and to do nothing else until he says.

## Stage 2: the prompt that cannot pitch

**One upsell sentence moves a call from (a)(1) to (a)(2)**, retrospectively, for a call already placed. A reminder that ends
with "while I have you, would you like our maintenance plan?" is a call made for the purpose of encouraging a purchase: it
is telemarketing, and the consent standard behind it becomes a signed written agreement the tenant does not have.

That lands directly on existing code. `ReceptionistDefaults.PromptFrom` assembles the prompt from what the business typed,
and two of its free-text fields are live hazards on an outbound call:

- **"What should it do with a caller?"** — an owner writing *"offer them our maintenance plan"* converts their own reminder
  calls into telemarketing, and nothing in the product notices.
- **"What do you charge?"** — legitimate on an inbound call, an advertisement if the AI volunteers it on an outbound one.

So **the outbound call does not reuse the inbound prompt.** It gets its own assembly: state the business, state the reason
for the call, do the one thing, answer what is asked, offer nothing. The owner-supplied parts are re-scoped rather than
passed through — and where a field cannot be safely re-scoped it is omitted from the outbound prompt entirely, which is the
fail-closed reading.

**The second free-text hazard is the receptionist's name,** and it belongs to the invoice case. 15 U.S.C. § 1692a(6) pulls a
creditor collecting its own debts into the FDCPA — and all of Regulation F with it — if it *"uses any name other than his own
which would indicate that a third person is collecting."* The signup form's *"What should your receptionist call itself?"* is
free text with no constraint. Lily is fine; "Acme Recovery Services" is a tenant volunteering for a federal statute by typing
a name. A tenant that turns on invoice calls needs that field constrained or warned, and the assembled prompt must not let
the receptionist describe itself as a third-party collector either.

## Stage 3: the pre-dial gate, which refuses rather than warns

Every outbound call passes one gate, and **it fails closed: no answer means no call.** Built as a single service with no
path around it, because a gate with a bypass is a logged warning.

| Check | Where the answer comes from | On no answer |
|---|---|---|
| Consent on record for AI calls | the tenant's store, read at call time | refuse |
| Inside 8:00 a.m. – 9:00 p.m. **at the called party's location** | the called party's time zone | refuse, reschedule |
| Not on the do-not-call list | the tenant's store (Stage 5) | refuse, permanently |
| Reason is one the tenant turned on | the config | refuse |

The hours rule is the quiet one: it is the **consumer's** local time, not the tenant's. A Florida business calling a customer
in Oregon may not dial at 8:30 a.m. Eastern. So the product needs the called party's location or time zone, or it cannot
honour the rule — and a tenant whose store does not carry it cannot have outbound turned on for interstate numbers. That is a
refusal, not a default to the tenant's own zone.

Regulation F's **7-in-7** and the **seven-day post-conversation quiet period** are deliberately *not* in this table. They
apply to FDCPA debt collectors, and Jeff's own case is not one (a commercial invoice he is owed, from a business, is outside
15 U.S.C. § 1692a(5) entirely). They arrive with the ledger in Stage 6, and only for tenants who answer that they collect
debts owed to others.

## Stage 4: reading the tenant's store, and the scheduler that holds nothing

**Depends on `connecting-client-systems.md`.** This stage was first written around Google Calendar because that is the only
connectable thing, which quietly narrowed outbound to appointment reminders: follow-up, reactivation and invoice calls read
from a **CRM**, and no CRM connects today. The dependency is named here rather than discovered later.

**Only Google Calendar can be connected today, and the form must not offer what does not exist.** `VoiceMcpProviders` names
five providers; `outlook`, `cal_com` and `hubspot` are strings in an enum with no OAuth, no client and no tool. Google
Calendar and Google Drive are the two with code — and Drive is where call *records* are written, not a source of people to
call. A read source and a write target are different questions and must not be merged into one.

**The scheduler is the place retention sneaks back in.** A scheduler that reads the tenant's calendar at the moment it runs
holds nothing between runs. A scheduler that keeps its own queue of who to call and when is the ledger by another name — and
it is the obvious way to build it. So the rule is explicit: **the schedule is a rule, not a list.** "The day before each
appointment in their calendar" is a rule; a row per customer with a due time is a list. The run reads, calls, writes the
outcome back to their event, and forgets.

What it may hold between runs, and nothing else: which tenants have outbound on, for which reasons, and when each rule last
ran — tenant-level facts, no customer in them.

## Stage 5: the do-not-call list, which cannot fail silently

**A request not to be called again has to outlive the call it was made on.** This is the one piece where "the client's store
holds it" is not automatically good enough, because the consequence of a wrong answer is calling someone who told us to stop.

Two things get built: the **read** before every call (Stage 3's third row), and the **write** when someone says it on a call.
A caller who says "don't call me again" during an outbound call must have that recorded somewhere that outlives the call, and
if the tenant's store is that somewhere then the write has to succeed or the call has to be reported as failed. A write we
could not make is not a call we completed.

If a tenant answers O6 with *"you do not have one"*, **that is a reason not to turn outbound on for them, not a default to
work around.** Nothing in this product should hold a stop list on their behalf as a convenience — that is the ledger again,
and it is the one piece of it that can never expire.

## Stage 6: the ledger, and only if a collections tenant ever needs it

Everything above serves confirmations, reminders, follow-ups and a first-party commercial invoice. **Third-party consumer
collections is the only case that needs more**, and it needs all of Regulation F: timestamped call counts per debt over
seven days, the date of the last conversation about that debt, and a permanent cease-communication record.

Items that are retained state by construction, and one of them is permanent. **The fork is whether we hold that ledger or the
tenant's system does** — and it does not have to be answered until a tenant who does third-party collections exists. Noting
what the market looks like first: **medical debt is already refused at signup** (a medical-debt collector working for a
provider is a HIPAA business associate and answers yes to an excluded-industry question), and that is most of third-party
collections. So this stage may never be reached, and nothing earlier should be shaped around it.

What the form would have to ask before it could be: whether the business collects debts owed to others, and whether it holds
the state collection-agency licences its calls require. Those are the tenant's licences, not ours — but a product that dials
on their behalf should not pretend not to know the question exists.

## The Zero Data Retention document changes, by name

ZDR survives Stages 1–5: none of what is held is anything anybody said. But outbound inverts the inbound bargain — an inbound
call is anonymous to us, somebody dialled and we forgot, while outbound must know who to call and why **before** a call
exists.

So `GeekBackend/docs/Geek-Receptionist-zero-data-retention.md` gains outbound **by name**, the same treatment the
retry-after-failure case already got, stating exactly what is held and for how long: at Stages 1–5, tenant-level settings and
nothing per customer; at Stage 6, the Regulation F ledger, if it is ever built. **It is not a quiet addition**, and it is
written before the first outbound call is placed, not after.

## Order

1. Read the FCC's own text on prior express consent for (a)(1) calls. Everything else waits on it.
2. Jeff answers O1–O8, and the machine-answered question in Stage 1.
3. Stage 1 — placement, the outbound controller, the opening wording, status handling. Proved on the confirmation case.
4. Stage 2 — the separate outbound prompt, and the two free-text hazards.
5. Stage 3 — the gate.
6. Stage 4 — the calendar read and the rule-based scheduler.
7. Stage 5 — the do-not-call read and write.
8. The ZDR document, before the first real call.
9. Stage 6 — only if a third-party collections tenant exists.

## What must not be built, and why it would be easy to

- **A queue of who to call.** It is the ledger wearing a scheduler's clothes, and it is the single change that would make the
  ZDR claim false.
- **One prompt for both directions.** It is a federal statute hiding in a free-text field.
- **A warning instead of a refusal** anywhere in Stage 3. A gate that warns is a gate that was passed.
- **Outbound on a tenant with no do-not-call source.** The absence of a list is an answer, not a blank to default.
