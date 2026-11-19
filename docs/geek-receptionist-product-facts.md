# Geek-Receptionist: product facts for writing

An operator-supplied source document for Content Creator, written 2026-11-18 from the product specification
(GeekBackend `docs/Geek-Receptionist.md`) and the approved SaaS plan (`plans/saas-plan.md`). Every fact below is
marked **Live** (built and running today), **Launch** (approved for the first release, not built yet) or
**Later** (approved for a later release). Copy must never describe a Launch or Later feature as available today.

## The product

- Geek-Receptionist is an AI phone receptionist for US small businesses, made by Geek @ Your Spot LLC, an AI
  consulting company in Delray Beach, Florida. Website: https://geek-receptionist.geekatyourspot.com
- **Status:** pre-launch. No customers yet. The site is not yet indexed by search engines.
- Positioning: "The AI receptionist that stores no call recordings or transcripts."
- The receptionist always tells callers it is an AI.
- The AI answers Geek @ Your Spot's own line, (561) 865-6990, after the caller presses 1. It only talks: it cannot
  yet book, take a message, transfer or send anything to the owner. **Live since 2026-11-18; no real call had reached
  it by 2026-11-19.**

## Privacy: what is and is not kept

- No call recordings, no transcripts and no call content are stored by Geek-Receptionist. **Live.** What the AI's
  providers keep is not yet confirmed: the AI model's provider (OpenAI today) keeps what it is sent for up to 30 days
  unless it approves zero retention for the account, which it has not, and the phone company (Twilio) may keep the
  text the AI speaks in its logs for up to 30 days.
- Kept for billing only: call start and end time, duration, caller ID and the phone company's call ID, used to count
  minutes against the plan and charge overage. **Live** (minutes are recorded from each finished call).
- A client who wants recordings kept may later send them to the client's own Amazon S3 or Google Cloud Storage
  bucket, switched on by the client. **Later; off by default.**
- Each AI model and speech provider is to be confirmed to keep no data and not train on calls. None is confirmed yet;
  OpenAI does not train on what it is sent.
- The AI model is swappable: it is chosen by a setting, not fixed in the product. **Live.**
- Among the products compared (RingCentral AI Receptionist, GoTo Connect AI Receptionist, Synthflow, Beside, My AI
  Front Desk, Rosie, Vapi), none sold to small businesses stores no call content by default; only Vapi, a developer
  platform, offers zero data retention.

## Consent on every call

- Before the AI hears anything, the caller hears, and must press 1 to continue: "Thank you for calling [business].
  You will be interacting with our AI receptionist. Your audio will be temporarily recorded and processed to provide
  this service, but we do not retain call recordings or transcripts. To consent and continue, press 1. To decline,
  press 2." No key press, no AI. **Live since 2026-11-18, on Geek @ Your Spot's line and every client number; not
  yet tested on a real call.**

## Who can sign up

- Businesses located in the United States. **Live.**
- Excluded, each asked as its own yes-or-no question at signup, with every answer kept permanently: **Live.**
  1. Healthcare providers (HIPAA)
  2. Health plans (HIPAA)
  3. Healthcare clearinghouses (HIPAA)
  4. Businesses that handle patient health information for a healthcare provider or health plan (HIPAA business
     associates)
  5. Securities broker-dealers
  6. Investment advisers
  7. Commodity futures and derivatives businesses
  8. Third-Party Marketing Organizations (TPMOs) involved in Medicare Advantage or Part D marketing and sales
- Why: these businesses can be required by law to keep call recordings, which conflicts with storing none.

## Pricing

- Paid up front each month through PayPal. No free trial. **Live.**
- Every call is rounded up to the whole minute. Minutes over the plan cost $0.50 each, charged after the month ends.

| Plan | Price a month | Included minutes |
|---|---|---|
| Starter | $30 | 90 |
| Standard | $48 | 250 |
| Pro | $148 | 1,000 |
| Premium | $298 | 2,000 |

- Comparison: Rosie charges $49 for 250 minutes, $149 for 1,000 and $299 for 2,000; RingCentral AI Receptionist $49
  for 100 minutes; My AI Front Desk $99 for 200 minutes (each read from the vendor's pricing page 2026-11-18).

## Signup and the owner's dashboard

- Self-service signup on the website: a robot check, the US question, the eight excluded-industry questions, the
  business details, a plan, PayPal, then a local phone number in the business's area code and the owner's login.
  **Live.**
- Owner dashboard with billing status and a Google Calendar connection. **Live.**

## What the receptionist does (Launch unless marked)

1. Answers 24/7 with the owner's greeting, business hours and after-hours behaviour.
2. Keypad consent before the AI is connected (above).
3. Books appointments into the owner's calendar: Google Calendar first (the connection is **Live**), a no-calendar
   option, then Outlook, Apple iCloud, Calendly and Cal.com.
4. Answers FAQs from the owner's own answers and website.
5. Warm and cold transfer to a person; waterfall transfer through the owner's numbers in turn. A call the AI cannot
   take rings a person or plays a message, never voicemail.
6. Keeps the owner's existing number by call forwarding.
7. Emails the owner a short summary of what each call was about (made in memory, not stored) and alerts the owner by
   email and text for every call.
8. Texts an appointment confirmation after the caller agrees on the call and replies YES.
9. Takes messages, emailed to the owner and never stored.
10. 10+ voices and a custom agent name and greeting.
11. A website chat widget answering from the same FAQ, with chats not stored.
12. Zapier, so the owner can send each call's details to their own apps.

Later: Spanish and other languages, spam and robocall screening, call analytics from billing records, number
porting, CRM connections, outbound reminder calls, reseller and white-label.

## Things copy must not say

- That the AI books appointments, takes messages, transfers calls or sends anything to the owner today: it only talks.
- That no one keeps any call content: Geek-Receptionist keeps none, but its AI and phone providers may keep some for
  up to 30 days (above).
- That call content is saved, recorded or available to review.
- "HIPAA compliant": healthcare and HIPAA businesses are excluded, not served.
- That there is a free trial.
- Anything legal about recording-consent law: those questions are with an attorney.
