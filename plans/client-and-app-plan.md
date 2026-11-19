# Geek-Receptionist

A plan for review. Written 2026-11-19. Pre-launch.

## The opportunity

Small businesses miss calls they cannot answer. AI receptionists exist to handle these calls, but every product in
the market records and stores call content by default. The plan is to build an AI phone receptionist that answers,
books, messages and transfers — with no call recordings or transcripts stored unless the client opts in.

## The business

Sold by Geek @ Your Spot LLC (Delray Beach, Florida) by monthly subscription to US small businesses. The plan is to
exclude categories of business where call recording obligations may conflict with a no-retention model: the four
HIPAA-regulated categories (healthcare provider, health plan, healthcare clearinghouse, business associate), securities
broker-dealers, investment advisers, commodity futures or derivatives dealers, and Medicare Advantage or Part D
third-party marketers. These exclusions are a proposal for review.

## Pricing

A subscription model is proposed with four tiers by included minutes and no free trial. Draft pricing:

| Tier     | Price | Included minutes |
|----------|-------|-----------------|
| Starter  | $30   | 90              |
| Standard | $48   | 250             |
| Pro      | $148  | 1,000           |
| Premium  | $298  | 2,000           |

Proposed overage of $0.50 per minute, each call rounded to the whole minute, payment through PayPal. The tier
structure, prices, overage rate and no-trial approach are all open to review.

Twilio cost estimate: approximately $0.085 per minute before premium voice, plus $1.15 per month per number.

## Signup and setup

A 12-step flow is proposed. The owner builds and tests the receptionist before paying, then pays and goes live.

1. Robot check and country confirmation.
2. Industry exclusion questions.
3. Business details: name, description, state, contact email, phone, attestation, website and Google listing.
4. The plan reads the business's website and Google listing to pre-fill services, hours, prices and common questions.
   The owner reviews and accepts each item. Nothing saves until accepted. Documents such as a menu or price list can
   also be uploaded.
5. The receptionist's identity: name, voice and opening greeting.
6. Abilities the owner switches on individually. The AI is told only about abilities that are on and ready.
   - Answer questions: from accepted information only.
   - Take messages: needs an email address; messages emailed and not stored.
   - Book appointments: needs a calendar connected; setup asks for appointment types, lengths, available hours, notice
     required, booking horizon, buffer and what to collect. The AI checks availability before offering a time and does
     not confirm until the calendar accepts. A failed booking becomes a message.
   - Transfer to a person: needs one or more numbers; setup asks when to transfer, warm or cold, waterfall order and
     what happens if nobody answers.
   - Text confirmation: requires an approved A2P campaign; email until then; texts go only after the caller replies YES.
7. Rules: what the receptionist must never say or do; prices only from accepted information; out-of-area callers
   directed accordingly; a collection checklist for every call.
8. Which calls the AI answers: every call, missed calls only, or after hours only.
9. A browser test call before payment.
10. Plan selection and payment.
11. A phone number bought in the client's area code. The client chooses the connection: forward an existing number, or
    use the new number directly. Number porting is a later addition.
12. Owner login.

## How a call works

A consent step is proposed before the AI engages. The caller is told they are speaking with an AI, that their audio
is processed but not retained, and is given the choice to continue or decline. Draft script: "Thank you for calling
[business]. You will be interacting with our AI receptionist. Your audio will be temporarily recorded and processed
to provide this service, but we do not retain call recordings or transcripts. To consent and continue, press 1. To
decline, press 2."

The AI's instructions are built on each call from the accepted information, the abilities that are on, the rules and
the collection checklist.

A session that runs one agent at a time is proposed, modelled on Vapi's squad design, with silent handoffs between
specialist agents (answering, booking, support). If the AI fails mid-call, the plan is to transfer the caller or end
the call with a message.

When the call ends, nothing of it is kept. Time, length and billable minutes are recorded for billing.

## After the call

A per-call email is proposed, built in memory from the call details and sent to the owner. Not stored. A text alert
to the owner is also proposed. If the owner has connected a Zapier account, the same details go to their Zap.

A daily or weekly recap from metadata only — call count, minutes, bookings made — is proposed. What, if anything, is
retained beyond the billing record is an open question.

## The dashboard

Proposed: editable setup pages with a test call before saving; phone number and forwarding status; usage with alerts
at 50, 75 and 100 percent; an optional monthly spending cap; call history from metadata only; billing; multiple users
and multiple locations.

## Website chat

Proposed: a chat widget using the same information and abilities as the phone receptionist, installed with one
script, with chats not stored.

## The call engine

The plan proposes Twilio ConversationRelay over a WebSocket to GeekAPI. The AI model is set by configuration with no
default. The provider's data retention policy is verified before any privacy claim is made. One Twilio subaccount per
client.

Three build phases are proposed:
1. A single Receptionist agent. Three Twilio behaviours are proved on a test number before the rest is built.
2. Triage and Booking agents with silent handoffs. Dashboard live call events.
3. Support agent with cold transfer; Sales agent.

Signup stays closed to new clients until Phase 1 is tested on a real call.

## Geek @ Your Spot as client number one

The plan is for the owner to sign up through the same form as any client, with only a billing exemption. The
existing company-specific code paths and Railway variables are replaced by the standard client setup.

## What needs to be built

Signup steps 4–9; a website reading service; the call engine; an email sender; dashboard expansion; a browser test
call; migration of the company line to the client routes.

## Open questions

1. Which calls the AI answers.
2. What the caller hears if the AI fails mid-call.
3. The browser test call allowance.
4. Whether abilities differ by pricing tier, and how website chat is counted.
5. Whether spam calls and very short calls are billed.
6. The wording of the consent prompt and the base template.
7. The AI provider and their data retention policy; the call model; Twilio voice providers; handoff and call limits;
   whether minutes after a transfer are billable; Railway draining time.
