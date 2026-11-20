# The thirteen use cases, against what is built and against ZDR

Jeff put thirteen AI-receptionist use cases to this session on 2026-11-20 and asked whether any were
implemented, then observed: *"ZDR policy may prohibt some items."* He was right, and the line is
sharper than it first looks.

**Zero Data Retention does not forbid most of these. It forbids *us* holding the state they need.**
That distinction decides every row below.

## What is actually built, verified by reading the code

Answer an inbound call over ConversationRelay, take consent, work out what the caller wants, answer
questions from the business's own indexed site, book into Google Calendar, take a message, and write
a call record to the client's own Drive or bucket. That is all.

**Corrected 2026-11-20: "transfer to a configured number" was in that list and is not built.** This
document's whole job is to say what is real, and it carried the one claim that mattered most to a
caller. Nothing in the codebase dials: the only Twilio `<Dial>` was the company line's and went with
it. `TransferMode` and `TransferTargetNumber` save with a 200 and are honoured by nothing. Worse,
until `833dae87` a business with a number stored had its caller told *"please hold for just a moment
while I connect you directly with our team"* on a mid-call failure, and the next thing sent ended the
call. The sentence is gone; the capability was never there. Transfer is approved for Standard and
above (`client-and-app-plan.md:30,62`, waterfall transfers) and is unbuilt, not shipped.

Findings worth keeping:

- **No call origination exists in the codebase.** Nothing places a call, inbound-only is what is
  written today, and that single absence accounts for five of the thirteen.
- **`EmergencyKeywords` is stored, validated and round-tripped, and read by nothing.** No
  call-handling code touches it. An owner could fill it in and no call would change. It reads as a
  live feature and is not one.
- **SMS exists but is not wired to tenant calls.** `TwilioSmsSender` works and the company line uses
  it; the tenant call path has no reference to it.
- Of the four MCP providers named in `VoiceMcpProviders`, only **Google Calendar and Google Drive**
  have an OAuth path. Outlook, Cal.com and HubSpot are names in a list, so "connects to a CRM" has
  nothing to connect to.

## The three categories

**Compatible as they stand — nothing persists.** Emergency and after-hours triage; order, delivery
and dispatch status; live inventory and service-area checks; language detection. Each reads the
client's system mid-call and speaks the answer. The call stays anonymous to us.

**Compatible only if the state lives in the client's system.** Pre-appointment reminders, no-show
recovery, post-visit check-ins, dormant reactivation, speed-to-lead, estimator briefs, structured
notes. We would be a scheduler that reads *their* calendar or CRM at run time and writes results
back to *their* destination, holding nothing between calls. The bring-your-own-storage work is the
precedent: it is the same shape.

**In conflict.** Waitlists (a stored list of callers waiting for a slot), self-built spam blocklists
(retained caller identifiers), MMS photos (Twilio keeps the media), and payment tied to a caller.

Retry queues were listed here too, as "someone's number held overnight", and that contradicted the
decision three paragraphs down, where Jeff allowed the narrow retry-after-failure case. The decision
is the later one and it wins; the row is removed rather than left for someone to cite against it.

### The structural point under all of section 3

An inbound call is anonymous to us: somebody dialled, we answered, we forgot. Outbound inverts it.
We must know who to call, and why, *before* a call exists. Every outbound use case holds a person's
number and a reason by definition.

**This was written as a reason not to do outbound. That conclusion is withdrawn — Jeff, 2026-11-20:
*"I do not wish to exclude outboard calls."*** The observation above stands as a description: outbound
does need a number and a reason held before the call, and that is a genuine exception to Zero Data
Retention. What does not follow is that it is therefore out of scope. It is in scope, and the
exception gets written into the policy document by name — the same treatment the retry-after-failure
case already got in the decisions below, which is the precedent this paragraph had already been
overtaken by.

So the design constraint is *how little is held and for how long*, not whether outbound exists: a
number and a reason code, held until the call succeeds or expires, and nothing of what was said. Where
a client's own system can hold the list instead, it does. No outbound code exists yet, and nothing
here authorises a particular use case — the thirteen are still sorted as they are below.

## Decisions, Jeff, 2026-11-20

- **Waitlists: no. Photos: no.** Dropped, not deferred.
- **Spam screening: worth doing, but not yet** — keypress only for now, and revisit with real call
  volume to measure against. Of the resources considered: the mail and IP tools (Spamhaus, CrowdSec,
  CleanTalk) do not apply, because Twilio is our edge and there is no IP to score. NumlookupAPI's
  free tier is 250 requests a month, which is eight calls a day. The two that would work are
  **Twilio Lookup with Nomorobo** (synchronous, in the call path already, about half a cent a call)
  and the **FTC reported-number dataset** (free, daily batch, consumer complaints rather than a
  score, so noisier and always a day stale). Neither was verified against its vendor's current
  documentation, and that check comes first if this is ever built. Expect either to catch the lazy
  half: most robocalling spoofs its number, so a blocklist is weak by construction.
- **Retry after a failure: viable.** Jeff: *"While the typical flow we do not make calls, a failure
  makes this sound like a viable solution."* The narrow case — a booking that failed, a call that
  dropped mid-booking, a record that could not be delivered. It holds the caller's number and a
  reason code until it succeeds or expires, and nothing of what was said. That is a real exception
  to Zero Data Retention, so it is to be written into the policy document by name rather than
  quietly added.
- **Payment collection: interesting, and the heaviest item here.** It stays outside PCI scope if we
  only send a hosted processor link and never touch card data, and it survives ZDR if the processor
  is the system of record and we ask it rather than store anything. But the money is the client's,
  so every tenant needs its own connected Stripe or PayPal account at onboarding, plus A2P messaging
  to callers. Two substantial subsystems, and it puts this company adjacent to money movement.
  Strong later, poor next. The copay framing is moot: signup refuses healthcare outright.

## The open one, which is Jeff's

**Strict keypress is off for every tenant and cannot be turned on.** `ReceptionistDefaults` sets
`passive_disclosure`, and no route changes `ConsentMode` — the gap booking had until this morning.
The keypress is what makes an autodialer give up, so choosing "keypress only" currently means no
screening at all. Making it the default would also put a key-press in front of every legitimate
caller, which is a decision about how a business's customers are greeted and therefore his.
