# Group 1: standalone AI receptionists (A): signup, setup and the client's experience

All vendor pages were read on 2026-11-19. Each fact has its source URL. "Not found" means the pages read do not say.
Facts from other sites are marked **third-party**. Pages saved by the Internet Archive are marked **archived**, with
the date they were saved. Where a vendor's own pages disagree, the entry is marked **Contradiction**.

Each product has eight points: the seven requested, then "8. Features", which lists every feature the vendor names
with its tier and any add-on price. A feature matrix comes before the patterns.

`plans/saas-plan.md` §1 already covers Rosie's, My AI Front Desk's and Beside's feature tables and headline prices.
Those are repeated here only where the setup and configuration points need them.

Covered: Rosie, My AI Front Desk, Beside, Goodcall, Dialzara, Upfirst, Simple Phones, Smith.ai (AI Receptionist),
Abby Connect.
Left out because neither sells an AI receptionist:
- **Ruby.** Its AI is an aid to its human receptionists. https://www.ruby.com/ai/ says "The person still leads the
  conversation", describes an "AI receptionist" as "software that answers or routes calls on its own", and says "All our
  AI features are included at no extra cost in every Ruby plan." https://www.ruby.com/pricing/ lists only human plans:
  50 minutes for $250, 100 for $395, 200 for $720 and 500 for $1,725.
- **AnswerConnect.** Its homepage (https://www.answerconnect.com/) reads "Pledge People, Not Bots" and "We pledge to
  keep every customer interaction human." Its /pricing URL returned 404.

---

## 1. Rosie (heyrosie.com)

**1. Who it is for, sales model and pricing**
- For small businesses. Professional is aimed at "Solo owners and small businesses"; 2,000+ businesses are claimed.
  Self-serve signup at https://heyrosie.com/admin/register. White-glove onboarding with a dedicated specialist is
  included only on Growth ($299). (https://heyrosie.com/pricing)
- Priced per account by minutes: Professional $49 (250 min), Scale $149 (1,000), Growth $299 (2,000). Annual billing
  gives "2 months free", but annual prices are not listed. (https://heyrosie.com/pricing)
- Overage rate: not found. The pricing FAQ asks "What happens if I go over my minutes?" but the answer is not in the
  page's markup. The forwarding article says "we'll always notify you by email before you get close to any overage
  charges". (https://heyrosie.com/support/en/articles/11058354-get-rosie-to-answer-your-calls-set-up-call-forwarding)
- Add-ons: Website Texting is $50/mo with 25 conversations, then $1 per conversation. Website Chat is free.
- Trial: "7-day free trial. Cancel anytime." "Your first charge will occur at the end of your trial period."
  (https://heyrosie.com/support/en/articles/9717437-when-will-i-be-billed). Whether a card is needed: not found.

**2. Signup and setup flow**
- The homepage gives three steps (https://heyrosie.com/):
  1. "Add your site or Google Business Profile to train Rosie." It "automatically learns your business' hours,
     services, and basic information in seconds."
  2. "Review and customize your information. Confirm key business information, customize your greeting, add FAQs, and
     more — then give Rosie a call to test her responses and accuracy."
  3. "Once you're happy with the setup, forward your calls to Rosie and she'll start right away."
- The pricing FAQ (JSON-LD on https://heyrosie.com/pricing) says: "We scan your website to train Rosie immediately. Then
  you just confirm your data is accurate, add any FAQs and message requirements and you're good to go." Help with setup
  is by chat inside the Admin.
- The Business Information tab
  (https://heyrosie.com/support/en/articles/13722191-business-information-setting-up-your-agent) has these sections:
  - Training Sources: the Google Business Profile and the website, used at account creation and when retraining.
  - Business Details: name, name pronunciation, address, primary phone, email, and a first-person overview.
  - Core Services.
  - Agent Knowledge: facts in the first person, not call-handling instructions.
  - Business Hours: per day, with closed days.
  - Service Areas.
  - FAQs: up to 20.
- Changes apply only after Publish: "Rosie won't use your updated information until it's been published." A retrain
  overwrites the scanned fields but not a custom overview. (same article)
- Which steps come before payment: not found. The signup page is a JavaScript app and its steps could not be read.
- US businesses only: "Right now Rosie only supports US businesses and does not issue international phone numbers."
  (https://heyrosie.com/support/en/articles/9721881-why-can-i-only-get-a-us-phone-number-for-my-account)
- Time until live: "It's quick!" No figure is given. Whether the AI answers before setup is finished: not found. A test
  call before going live: yes (step 2 above).

**3. How the receptionist is configured**
- Template: none named. The agent starts from the scanned Google profile and website.
- On all plans: custom agent name and greeting, 10+ voices, English and Spanish on every call, and a custom FAQ.
  Training from uploaded documents is on Growth only. (https://heyrosie.com/pricing)
- After hours: "You can enable Rosie for after hours and/or overflow only when you set up conditional call forwarding."
  (pricing FAQ)
- Transfers, under Agent Settings → Transfer Calls
  (https://heyrosie.com/support/en/articles/16548766-call-transfers-cold-warm-and-waterfall):
  - Each scenario has a name and description, a type (cold, warm or waterfall), and a number. Waterfall takes up to 5
    numbers, rung for 30 s each.
  - Each scenario has its own availability: always, business hours, a custom schedule, or off.
  - Rosie makes one transfer attempt per call, transfers only if the caller agrees, and offers a message if no one
    answers. "She never invents a number."
  - Up to 20 scenarios. Professional shows an upgrade prompt, Scale gets cold and warm, and Growth adds waterfall.
- Message taking, through "Message Scenarios"
  (https://heyrosie.com/support/en/articles/15171354-message-scenarios-have-rosie-collect-the-right-info-from-every-caller):
  - Each scenario has a name and a briefing of up to 500 characters ("The brief is not a question list").
  - If no scenario matches, Rosie "falls back to taking a standard message with name and phone number, and reason for
    calling".
  - Scenarios per plan: 2, 5 or unlimited.
- Booking
  (https://heyrosie.com/support/en/articles/12872287-scheduling-google-calendar-integration,
  https://heyrosie.com/support/en/articles/12998658-scheduling-integrations):
  - Scale and above, with Google Calendar, Calendly, Acuity or Appointlet. Professional can only text a booking link.
  - "V1 always schedules to your default calendar."
  - Times are offered from Rosie's business hours checked against Google free/busy; Rosie offers 2–3 options.
  - Rosie collects first and last name and email (both required) plus custom questions.
  - "Rosie does not send a separate confirmation text."
  - Not available yet: different appointment types, and rescheduling or cancelling (both listed as "Coming Soon").
  - A business cannot use booking links and direct booking together.
- Limits on what the AI may promise: "She never invents a number" (transfers). The FAQ guide says not to paste URLs,
  because Rosie reads them letter by letter
  (https://heyrosie.com/support/en/articles/9717426-how-to-use-the-faq-feature-for-best-results). Nothing else found.

**4. Phone number**
- New number: choose an area code (https://heyrosie.com/pricing).
- Forwarding: unconditional, or conditional (busy, no answer, unreachable) set up with carrier codes. Google Voice and
  Dialpad must verify the Rosie number first. iPhone Live Voicemail must be turned off. (forwarding article above)
- Porting: not found.

**5. After each call**
- Email and/or text notifications with "a brief overview of the call" and a link to the call
  (https://heyrosie.com/support/en/articles/9899243-how-to-set-up-email-and-text-notifications). Summaries, transcripts
  and recordings are on all plans.
- CRM: each conversation is logged with its summary and a link. "Some CRMs also receive call recordings, which are
  playable for 30 days." (https://heyrosie.com/support/en/articles/16419280-crm-integrations)
- Retention (https://heyrosie.com/legal/privacy):
  - "Each Subscriber determines how data is used and how long it is retained."
  - Caller data is kept "until the Subscriber deletes it or instructs us to do so."
  - Account data is deleted 30 days after cancellation.
  - Deidentified data may be used to "train our AI technology".
- Consent: "The Subscriber is solely responsible for providing Callers with notice and obtaining their consent." No
  in-product consent setting was found.

**6. Owner's dashboard and app**
- The web "Admin" has Agent Settings (FAQs, Transfer Calls), Business Information, Conversations (captured message
  details), Integrations, and Account (notification toggles, Billing through the Stripe portal). There are native iOS and
  Android apps. (articles above)
- Multiple users: not found. Multiple locations: not found. Only one CRM per account.

**7. Integrations**
- Calendars: Google Calendar, Calendly, Acuity, Appointlet.
- Zapier.
- 19 CRMs, "included on every Rosie plan": Workiz, AgencyZoom, Follow Up Boss, GoHighLevel, Housecall Pro, HubSpot,
  Jobber, JobNimbus, JobTread, Kickserv, Kommo, noCRM.io, Nutshell, Pipedrive, RepairShopr, ServiceM8, Zoho Bigin,
  Zoho CRM, and Shopify order lookup. (https://heyrosie.com/support/en/collections/19718187-crm-automation)

**8. Features** (from https://heyrosie.com/pricing unless another source is given)
- On all plans:
  - 24/7 answering; simultaneous call handling; automatic spam detection.
  - Website chat widget (free).
  - Training from the Google profile and website; custom FAQ.
  - 10+ voices; custom agent name and greeting; English and Spanish on every call.
  - Choice of area code.
  - Call summaries, transcripts and recordings; email and text notification of each call.
  - Native iOS and Android apps.
  - Zapier.
  - Texting booking links to callers.
- Varies by plan:
  - Message-taking scenarios: Professional 2, Scale 5, Growth unlimited.
  - Scale and up: direct calendar booking; warm transfers; live transfers; texts to callers during the call.
  - Growth only: waterfall transfers; training from uploaded documents; white-glove onboarding; priority email and
    chat support.
- Add-on: Website Texting, $50/mo with 25 conversations, then $1 each.
- CRM entry for 19 CRMs, "included on every Rosie plan"
  (https://heyrosie.com/support/en/articles/16419280-crm-integrations).
- Not found: outbound calls, call analytics, multiple numbers or locations, toll-free, team seats, webhooks or API,
  white-label (the FAQ asks about an agency program but its answer is not on the page), HIPAA.

---

## 2. My AI Front Desk ("Frontdesk") (myaifrontdesk.com)

**1. Who it is for, sales model and pricing** (https://www.myaifrontdesk.com/pricing)
- Business-in-a-Box: for "growing small businesses", 1–10 interactions a day. $99/mo, or $79/mo billed annually.
  Included each month:

  | Item | Allowance |
  |---|---|
  | Voice | 200 minutes |
  | Chatbot | 100 conversations |
  | SMS | 400 |
  | Email drafts | 500 |
  | Form submissions | 300 |
  | Outbound calls | 20 a day, a hard cap |
  | Overage pool | 1,000 credits ($10 worth); unused credits expire monthly |
  | Notification recipients | 3 |
  | Seats | Unlimited viewing seats, 2 editor seats |
  | Logs kept | The last 200 |

- Overage: 25 credits a minute ($0.25). Auto-reload costs $10 for 1,000 credits.
- Partner/Enterprise: custom pricing; voice from 7 credits a minute; custom data retention; white-glove onboarding ("We
  set everything up for you").
- Self-serve. "A dedicated Customer Success Manager is assigned to your account"
  (https://www.myaifrontdesk.com/help/getting-started/overview).
- Trial: 7 days, "No credit card required" (pricing page and help overview).
- The earlier pass recorded an unchecked $0.12-a-minute figure and a 1,000-credit buffer. The 1,000-credit pool is
  confirmed; the pricing page itself gives $0.25 a minute.

**2. Signup and setup flow** (https://www.myaifrontdesk.com/help/getting-started/overview)
- Signup has five steps, none of them payment:
  1. "Enter your email."
  2. "Business details": "Tell us your business name and type so the AI can represent you accurately."
  3. "Quick setup questions": "Answer a few questions about how you want calls handled."
  4. "Receptionist details": "Name your AI receptionist and provide basic configuration."
  5. "Email verification" with a one-time code.
- The number: "During onboarding" the owner chooses a country and enters a preferred area code, then uses Fetch
  Numbers or Get Random Number (https://www.myaifrontdesk.com/help/settings/phone-numbers). Non-US numbers need
  documents and approval.
- After signup:
  1. "Complete the setup checklist under Receptionist > Configure."
  2. "Test your receptionist in the Playground."
  3. "Set up notifications."
  4. "Forward your business phone number to your Frontdesk number, or share the number directly."
- The setup checklist counts "Completed X/Y"; an item counts as done when it has content. Items in order
  (https://www.myaifrontdesk.com/help/getting-started/setup-wizard):
  1. Greeting Phrase.
  2. Custom Commands: separate prompts for voice and for text.
  3. Business Information: text, a website URL or documents.
  4. Common Questions.
  5. Languages.
  6. Voice.
  7. Transfer Call.
  8. Send Text Message.
  9. Intake Form.
  10. Schedule an Appointment.
  11. Post-call text.
  12. Smart Call Analysis (on by default).
  13. Developer Automations.
  14. Advanced Settings (not counted in progress).
  15. Notifications.
- Testing, in the Playground (https://www.myaifrontdesk.com/help/getting-started/testing):
  - "Join Audio": in the browser; texts and transfers don't work.
  - "Receive Call": the AI calls your testing number; capped at 15 minutes.
  - "Share Demo": a link anyone can use.
  - Test calls need "available voice credits".
- A vendor-published onboarding checklist (https://llms.myaifrontdesk.com/ai-front-desk-onboarding-setup-checklist)
  has 10 steps: number or forwarding → voice (100+) and area code → "chattiness" 1–10 → hours, locations and routing →
  knowledge base (top 20 FAQs) → calendars and booking rules → CRM → notifications → scenario tests with "QA sign-off"
  → usage caps and launch to "100% of traffic or a subset".
- Time until live: "Go live in under 5 minutes" (overview); "Setup in 5 minutes" (pricing).
- Whether the AI answers before setup is finished: not found. The number is provisioned "When you set up your
  receptionist".

**3. How the receptionist is configured**
- Template: business type is asked at signup. Industry templates: not found.
- Knowledge base (https://www.myaifrontdesk.com/help/ai-receptionist/knowledge-base):
  - Text: up to 100,000 characters per entry.
  - URL crawl: up to 3 URLs per entry, auto-sync or "Sync Now".
  - Documents: PDF, DOCX or TXT up to 20 MB.
  - Q&A pairs.
  - A token cap applies overall. The pricing page lists "Knowledge base: 20 pages" for Business.
- Transfers (https://www.myaifrontdesk.com/help/ai-receptionist/call-transfers):
  - Each scenario has a description, a number and an extension.
  - Cold transfers use the caller's number. Hot transfers use the AI's number and add whisper, backup numbers, blast
    numbers and "Continue AI After Failed Call Transfer".
  - Each scenario has an Availability setting: business hours, weekends or a custom schedule.
  - "up to 100 scenarios across all workflow types".
  - **Possible contradiction:** the pricing page lists "Agent actions: 2 of each" for Business.
- Booking (https://www.myaifrontdesk.com/help/scheduling/overview): Google Calendar only is named. "Services" are the
  appointment types. There are per-day Available Hours, a business timezone, and a public booking link.
- Advanced settings (https://www.myaifrontdesk.com/help/ai-receptionist/advanced-settings):
  - Recording and call controls: Record Calls on/off; Record Transferred Calls; voicemail; Maximum Call Duration;
    "Temporary Disable".
  - Spam and routing: robocall detection; blocked numbers; bypass-to-human numbers; extension digits; "Time Control"
    windows that transfer to a number.
  - Other: Max Usage Limit with emails at 50/75/100%; choice of AI model; pronunciation guides; caller rating survey.
- After hours: only "Time Control" was found.
- Limits on what the AI may promise: not found.

**4. Phone number**
- New number by area code (above).
- Forwarding: iPhone and Android "Instant Setup" by QR code, which "will immediately forward all calls from the
  registered number"; manual dialling; landline and VoIP through the carrier
  (https://www.myaifrontdesk.com/help/settings/call-forwarding). The phone-numbers page says to choose "forward when
  busy" or "forward when unanswered". Google Voice integration.
- Porting: not found.

**5. After each call**
- Notifications (https://www.myaifrontdesk.com/help/notifications/settings):
  - Email, and SMS ("may require a Pro subscription").
  - Triggers: call, voicemail, text, robocall, chatbot, calendar, custom scenario, intake.
  - Content you can switch on or off: transcript, AI summary, intake data, workflow results, link. A recording link is
    not mentioned.
  - Several notifications can be set per event, each with comma-separated recipients.
- Call log (https://www.myaifrontdesk.com/help/calls-and-logs/call-logs): recording player, transcript, AI summary, a
  1–5 call score, sentiment, extracted data, and cost. Export to file, and share by link.
- Retention: "last 200 logs" on Business (pricing).
- Consent: not found. A vendor blog mentions "custom retention schedules" and redaction, with no figures
  (https://www.myaifrontdesk.com/blog/ai-call-recordings-retention-and-deletion-explained/).

**6. Owner's dashboard and app** (https://www.myaifrontdesk.com/help/getting-started/dashboard)
- The dashboard shows 7-day metrics (calls answered, texts, "Revenue Impact" at $25 a call), agent cards, recent
  activity, and the CSM's card with a Calendly link.
- Sidebar: Ask Frontdesk (an AI assistant for configuration), Receptionist, Chatbot, Web Forms, Call Log Inbox, CRM,
  Outbound, Calendar, Tickets, Notify Me, Analytics, Settings.
- "Add More Receptionist" needs an active subscription.
- Seats: unlimited viewers, 2 editors (pricing). The Team Management help page returned HTTP 410.
- Multiple locations: the vendor checklist mentions "multi-location routing". No other detail found.

**7. Integrations** (https://www.myaifrontdesk.com/help/integrations)
- Zapier, Google Calendar, custom webhooks, API workflows, Gmail, Shopify, AppFolio, HubSpot, GoHighLevel, Housecall
  Pro, and MCP for Claude and ChatGPT.

**8. Features** (from https://www.myaifrontdesk.com/pricing unless another source is given)
- Business-in-a-Box, with monthly allowances:
  - Voice 200 min; outbound calls 20 a day (hard cap).
  - SMS 400; website chatbot 100 conversations; website forms 300 submissions; AI email drafts 500.
  - Sequence automation workflows, unlimited.
  - Knowledge base 20 pages; agent actions "2 of each".
  - Notifications to 3 recipients.
  - A verified outbound number.
  - Zapier.
  - Unlimited viewing seats, 2 editor seats.
  - The last 200 logs kept.
- Partner/Enterprise:
  - Custom amounts of everything above; unlimited emails.
  - Custom outbound caller ID.
  - API access; custom integrations and work.
  - Dedicated account manager; Slack channel; white-glove onboarding.
  - Custom data retention.
- Overage and add-on prices:
  - Voice and web voicebot 25 credits a minute ($0.25).
  - SMS 4 credits ($0.04); chatbot 5 credits per conversation ($0.05); form lead 4 credits ($0.04).
  - Auto-reload $10 per 1,000 credits.
- Also listed on the pricing page, tier not given: "20+ languages", an "AI-native CRM", "Dashboards & Reporting".
- In the help center, tier not given:
  - Robocall detection and blocklists; voicemail; recording toggle.
    (https://www.myaifrontdesk.com/help/ai-receptionist/advanced-settings)
  - Intake forms; text workflows; post-call texts; call scoring and sentiment.
  - Tickets; a public booking link; "Add More Receptionist" (price not found).
  - MCP for Claude and ChatGPT.
  - Help sections exist for Website Builder and Business Builder.
- White-label: the call-log help says a tab "is hidden for white-label accounts", so white-label accounts exist
  (https://www.myaifrontdesk.com/help/calls-and-logs/call-logs). Its tier and price: not found.
- Not found: native mobile app, toll-free, HIPAA (the earlier pass recorded a HIPAA/BAA claim; not seen on the pages
  read today), voice count on the pricing page (the vendor checklist says 100+).

---

## 3. Beside (beside.com)

**1. Who it is for, sales model and pricing** (https://www.beside.com/phone/pricing)
- A business phone app with the AI receptionist built in. Self-serve.
- Web plans are per business:
  - Baseline: $29/mo, 30 AI calls a month. "No trial. Billing starts immediately."
  - Unlimited: $99/mo, unlimited AI calls. "Seven days free with a payment method", so a card is required.
  - Both include one line and team access for up to 20 seats. Extra lines are $4.99/mo each.
- In-app plans (Android and Canada) are per seat: $29.99/mo or $199.99/yr, one line per seat.
- Overage: not found.
- **Contradiction:** https://help.beside.com/en/articles/16828870-set-up-your-beside-phone-line says new signups get "a
  free 30-day trial of Beside Phone before choosing a plan". It also names the plans "Standard and Pro", not Baseline
  and Unlimited.

**2. Signup and setup flow** (https://help.beside.com/en/articles/14588748-get-started-with-beside-in-5-minutes)
1. Download the app (or use app.beside.com), create an account, and complete onboarding: "takes less than a minute".
2. Get a business number with your preferred area code. Choose to use the new number, forward your existing number, or
   port it. Forwarding is recommended as "instant and reversible".
3. Set up forwarding in the app (Settings → line → Call Forwarding): "usually activates within a few seconds".
4. Activate the Receptionist (Settings → line → Receptionist). Turn on Calls (Texts and Emails are optional), add the
   business name, what you do and your hours, and customize the greeting.
5. "You're live": "If you don't pick up, your Receptionist answers." Each call gets a transcript and AI summary, plus a
   Daily Recap each evening.
- Payment step: not covered by the guide.
- Training (https://help.beside.com/en/articles/12292213-train-your-ai-receptionist): a website scan proposes
  values. "Nothing is saved until you review and accept a change - scanning your website never overwrites your
  knowledge silently."
- Testing is done in the mobile app with "Test Receptionist", by simulated call or text
  (https://help.beside.com/en/articles/12292876-test-your-receptionist). Whether tests count against AI calls: not
  found.
- Identity verification: KYC with a government photo ID and a selfie, "triggered automatically for all users",
  "right after signing up" or later. Until it is done the owner is "blocked from making calls or sending texts", but
  incoming calls still work. (https://help.beside.com/en/articles/11624225-why-identity-verification-is-required)
- Whether the AI answers before setup is finished: answering starts once the Receptionist is toggled on and forwarding
  is active. No other gate was found.

**3. How the receptionist is configured**
- Knowledge, per line (https://help.beside.com/en/articles/12292213-train-your-ai-receptionist):
  - Business details: preferred name, role, company, industry.
  - Contact info.
  - FAQ / Company Knowledge.
  - Operating hours: Open, Closed or "By appointment", with ranges, closed dates and emergency coverage.
  - Products and services: name, price, billing period.
- Template: none found. Industry is a field.
- Name and greeting: the Welcome Greeting is "the only place" that controls the introduction
  (https://help.beside.com/en/articles/13298151-set-your-receptionist-s-name-and-identity).
- Voice and language: 20 voices plus voice clones. Calls start in English; callers can switch to Spanish, French,
  Portuguese or Russian (https://help.beside.com/en/articles/12785394-customize-your-receptionist-s-voice-and-language).
- Who it answers, and how
  (https://help.beside.com/en/articles/10028622-set-up-your-ai-receptionist-to-answer-calls):
  - Missed calls from everyone, or only from unsaved numbers. The mobile app adds more options.
  - Ringing Mode: about a 25 s ring, or immediate.
  - AI calls are capped at 10 minutes.
  - After hours: the Receptionist's closing tells callers when the business opens again.
- Transfers (https://help.beside.com/en/articles/14645335-set-up-call-transfer-for-your-receptionist):
  - A Transfer Call action is attached to a "call reason" scenario.
  - Destination: one team member or external phone per rule; no queues.
  - On failure: busy or no answer goes to the recipient's voicemail; a failed transfer gets an apology and alternatives.
- Booking (https://help.beside.com/en/articles/11525406-book-appointments-with-your-ai-receptionist):
  - Calendars: Google and Outlook in the phone apps; Google, Calendly, Housecall Pro, GoHighLevel and Follow Up Boss on
    agent.beside.com.
  - Length: 30 min by default. Start times fall on the hour or half hour.
  - Availability: one From/To range of days and hours; minimum notice of 4 h by default (30 min to 1 week); buffers on
    mobile.
  - Confirmation text template; email if captured.
- Limits on what the AI may promise:
  - Without confirmed hours, "the Receptionist does not tell callers whether you're open or closed".
  - It is "built to avoid claiming or implying it is a person"
    (https://help.beside.com/en/articles/18185806-is-beside-an-ai-know-who-you-are-talking-to).
  - It does not know anything outside its knowledge base.

**4. Phone number**
- New number with an area code, forwarding, or porting ("transfer an eligible number"). Forwarding and porting are done
  in the mobile app only. (pricing page; set-up-line article)

**5. After each call**
- A summary and transcript for each call; Calls list labels (Missed, Receptionist handled, You answered); a Daily Recap.
  Missed-call text-back is on by default for new Beside numbers.
  (https://help.beside.com/en/articles/18185813-answer-every-call-with-your-ai-receptionist)
- Push, email or text alerts to the owner: not found in the articles read.
- Recording (https://help.beside.com/en/articles/9882829-recording-consent-and-caller-notifications):
  - Beside "automatically records and transcribes your calls".
  - The "Recording Consent" toggle (line → General → Compliance & Privacy) plays a "may be recorded" message.
  - The user is responsible: "You must inform and obtain consent from everyone on the call."
  - If a caller asks not to be recorded, "Beside keeps no recording of that call": no transcript, no summary, nothing
    sent to integrations.
- Retention period: not found.

**6. Owner's dashboard and app**
- The mobile apps and app.beside.com (the web holds seats, billing and AI Call Flow).
- Each invited member uses a seat. Roles can be set. Line access is assigned per member. Each line has its own
  Receptionist, transfer rules and members. (https://help.beside.com/en/articles/14628751-set-up-beside-for-your-organization-admin-guide)
- Locations: not described as a separate concept.

**7. Integrations**
- The calendars listed above. Zapier or webhooks: not found.

**8. Features**
- The pricing page (https://www.beside.com/phone/pricing) says "Both plans include the same Phone features." Baseline
  and Unlimited differ only in AI Receptionist calls (30 vs unlimited) and in the trial.
- Included in both:
  - One business line, with calls and texts in one app.
  - English, Spanish, French and Portuguese for calls and texts.
  - Team access, up to 20 seats.
  - Forwarding, porting or a new number.
- Add-on: extra lines at $4.99/mo each.
- In-app plan: $29.99/mo or $199.99/yr per seat, one line per seat.
- On the product page (https://www.beside.com/phone), tier not given: transcripts, call summaries, a daily recap, iOS
  and Android apps plus web, team lines in one place, a shared Beside login.
- In the help center, tier not given:
  - Text Receptionist: AI replies to texts.
  - Drafting email replies.
  - Remembering repeat callers.
  - Missed-call text-back.
  - Recording with a consent-message toggle.
  - Voice clone (English only).
  - Calendar booking.
  - (https://help.beside.com/en/collections/19443627-receptionist-get-started,
    https://help.beside.com/en/articles/12785394-customize-your-receptionist-s-voice-and-language)
- Not found: spam blocking, website chat, outbound AI calls, Zapier or webhooks, a CRM entry beyond the agent.beside.com
  booking connectors, call analytics, toll-free, white-label, HIPAA.

---

## 4. Goodcall (goodcall.com)

**1. Who it is for, sales model and pricing** (https://www.goodcall.com/pricing, https://www.goodcall.com/faq)
- From "a solo operator who misses calls while on the job" up to "several locations or a team". Self-serve: an AI
  builder called "Gabi" builds the agent. Enterprise is sales-led.
- Priced **per unique customer**: one caller number, counted once a month. Spam and wrong numbers don't count. "We
  never meter minutes, calls or tokens."

  | Plan | Price | Customers | Over plan | Workers | Tools | Team members | Call history |
  |---|---|---|---|---|---|---|---|
  | Starter | $79/mo | 100 | 79¢ each | 5 | 1 | 1 | 30 days |
  | Growth | $129/mo | 500 | 26¢ each | 10 | 5 | 5 | 90 days |
  | Scale | $299/mo | 2,000 | 15¢ each | 20 | 15 | 10 | Unlimited |

- Test runs are metered as "AI usage" (about 100, 500 and 2,000 by plan), with $5 top-ups.
- A local number is included. BAA on Scale and Enterprise.
- No trial: "You get a free demo agent instead... You only start paying when you add a phone number and pick a plan."
  "When am I charged?" "When you add a phone number, then monthly on that date." Whether a card is needed earlier: not
  found.
- **Contradiction:** the FAQ says "Is there an annual plan? No. Every plan bills monthly." The help article
  https://help.goodcall.com/en/articles/13168924-goodcall-plan-and-pricing-update (effective 2025-12-01) says an annual
  plan "Saves an additional 15%".

**2. Signup and setup flow** (https://www.goodcall.com/how-it-works, FAQ)
1. "Talk to Gabi" (https://ai.goodcall.com/agent/onboard). "You describe it. Gabi builds it." Tell it what you do, what
   you charge, and what you need from callers.
2. Add your website or price list (or a PDF), your hours, holidays and closures, and how to say the business name.
3. Test. "Call your phone agent from your browser"; "Gabi also writes practice callers... and runs them"; share a link
   with the team.
4. Publish. "Publishing makes your setup live for test calls in the app" only. "Not yet" for real callers.
5. Pick a number in the app ("about two minutes"). Billing starts here.
6. Forward your line (guides for 24 carriers) or publish the new number. Choose "Ring my phone first" (unanswered calls
   only) or "Send every call".
- The FAQ's own order: "Get your Goodcall number, call it yourself to test your agent, then turn on forwarding."
- Later changes: "nothing changes for callers until you publish. Changed your mind? Roll back."
- Cancel or downgrade: the agent stays as a free demo agent and only the number is released.
- The AI cannot answer real callers before a number is bought.

**3. How the receptionist is configured**
- "You control its greeting, instructions, questions, and escalation contacts."
- "Workers" are the specialists inside the agent: lead collection, answering from business info, Google Calendar
  booking. The operator and greeter workers don't count against the limit.
- Six voices. English only.
- Questions: "asks your questions, in your order, and won't finish until it has the ones you need. It spells back
  names, numbers and emails."
- Transfers: to an escalation contact; "retries busy lines", then tries the next contact, up to three. Directory
  contacts are unlimited.
- Hours: "set your hours and holidays". Separate after-hours behaviour: not found.
- Limits on what the AI may promise: changed by telling Gabi, for example "Want it to stop quoting prices... Tell
  Gabi."
- AI disclosure: "Callers are told they're speaking with an AI assistant."

**4. Phone number**
- New local US number. Forwarding: all calls or unanswered; Google Voice and Ooma forward all calls only.
- Porting: "Not yourself yet."
- Not offered: toll-free, Canadian or international numbers. The number can send texts but cannot receive replies.

**5. After each call**
- "It texts and emails you, while the caller is still on the line" (the lead).
- "Every call is recorded and transcribed so you can review it in the app." Calls are tagged and outcomes tracked.
- Retention: by plan (30 days, 90 days, unlimited).
- Recording consent: not found.

**6. Owner's dashboard and app**
- The web app at ai.goodcall.com: call records, Settings → Billing, a console of workers.
- Team members by plan (1, 5, 10), each with a role and per-agent access.
- Locations: "separate agents for different locations", each on its own plan.

**7. Integrations**
- Native: Google Calendar, Google Sheets, HighLevel.
- Zapier ("10,000 other apps"). Any API, MCP server or code block counts as one "external tool".

**8. Features** (https://www.goodcall.com/pricing, https://www.goodcall.com/faq, https://www.goodcall.com/)
- By plan (Starter / Growth / Scale):
  - Workers: 5 / 10 / 20.
  - External tools: 1 / 5 / 15.
  - AI usage (test runs): base / 5× / 20×.
  - Team members: 1 / 5 / 10.
  - Call history: 30 days / 90 days / unlimited.
  - BAA: Scale and Enterprise only.
  - Enterprise adds volume pricing, onboarding and an SLA.
- On all plans:
  - A local number.
  - Unlimited "agent-powered edits" (changes made by Gabi); roll back to the last version.
  - Unlimited directory (transfer) contacts.
  - Every call recorded and transcribed.
  - Custom metrics ("booked appointments or missed leads"); call tagging.
  - Six voices.
- Add-on: AI usage top-ups, $5 at a time.
- Tier not given:
  - Sending texts to callers ("can't receive replies yet").
  - Transfers with retries and up to 3 contacts.
  - Taking a message, sending a self-service link, or scheduling a callback.
  - Google Calendar booking.
  - Google Sheets, HighLevel, Zapier, API or MCP tools.
  - Agency client access through team roles and per-agent access.
  - "Compliance: SOC 2, HIPAA" (homepage).
- Spam and wrong numbers are "not counted" for billing; a named spam-blocking feature was not found.
- Languages: "English, today."
- No: toll-free, Canadian or international numbers.
- Not found: outbound calls, website chat, native mobile app, white-label, two-way texting.
- Oddity: the Goodcall homepage reads "Rosie answers on a local number you pick", naming a competitor's product.
  (https://www.goodcall.com/)

---

## 5. Dialzara (dialzara.com)

**1. Who it is for, sales model and pricing** (https://dialzara.com/pricing)
- For small businesses. Self-serve trial, plus "White Glove Setup: Included with every paid plan (1:1 onboarding call
  with a prompt engineer)".
- Priced per minute, monthly, with no setup fee:

  | Plan | Price | Minutes | Over plan |
  |---|---|---|---|
  | Business Lite | $29 | 60 | $0.48/min |
  | Business Pro | $99 | 220 | $0.45/min |
  | Business Plus | $199 | 500 | $0.40/min |
  | Business Elite | $349 | 1,000 | $0.35/min |
  | Done for You | $1,500+ | Quoted | Quoted |

- What each plan adds:
  - Plus: "Self-editable prompt".
  - Elite: "Initial Prompt Setup Included", blind and warm transfer, multi-agent and multi-location.
- Extra numbers: US local $3/mo, toll-free $5/mo (https://dialzara.com/faqs/).
- Trial: 7 days on every voice plan (FAQ). Card: not found on vendor pages. SpotSaaS (**third-party**) says "no credit
  card required".
- **Contradiction:** pricing lists blind and warm transfer only on Elite and Done for You. The FAQ says "you can also
  enable live-call transfer to a human teammate on request", and the features page lists "Human transfer on demand"
  under the base receptionist.

**2. Signup and setup flow**
- The features page's "How It Works" (https://dialzara.com/features):
  1. "Create your agent: Sign up and tell our AI Configurator about your business. It builds your agent in minutes."
  2. "Customize: Set your greeting, scripts, routing rules, calendar sync, and notification preferences."
  3. "Go live: Forward your business line to Dialzara. Your AI receptionist starts answering immediately."
- Other onboarding tools (features page): "Industry starter templates: Pre-built prompts for 88+ industries";
  "Website-to-knowledge-base import"; "Test-call training loop: Make test calls, flag wrong answers in the dashboard,
  and the AI re-trains live".
- The help guide (**archived**, saved 2025-03-27; the live https://guide.dialzara.com returned HTTP 525 on 2026-11-19;
  http://web.archive.org/web/2025/https://guide.dialzara.com/training-guide-and-greeting-phrase-do-this-first):
  1. "The first time you login, we'll ask you some basic questions about you and your business. The information you
     provide will be used to automatically generate a greeting phrase and a baseline training guide."
  2. Edit the greeting: end with a closed question, and spell names phonetically.
  3. Review the training guide.
  4. "Place a test call... Repeat this process until satisfied", then forward.
- **Contradiction on time to go live:** the FAQ says "typically live in under 30 minutes"; the features page says
  "Live in under 3 days. Most businesses set up in a single afternoon."
- Which steps come before payment: not found.

**3. How the receptionist is configured**
- Greeting, a written prompt or "training guide", and example calls. "Updates take effect immediately." Business
  context covers FAQs, policies, hours, services and prices, with per-agent overrides. (features page)
- Routing: by topic, caller type, time of day or VIP status; after-hours fallback "takes detailed messages and texts
  you a summary".
- Booking: Google and Outlook; round-robin; confirmations and reminders by SMS or email; reschedule and cancel in the
  call.
- Other: custom qualifying questions; 10 languages with automatic detection; a custom voice.
- Archived transfer setup (**archived**,
  http://web.archive.org/web/2025/https://guide.dialzara.com/transfering-calls): enable Transfer Calls, give a number
  and a pre-transfer message, then paste a provided block of instructions into the training guide.
- Limits on what the AI may promise: the archived guide's sample prompt ends "Do not answer questions not related to
  this training guide." The website chatbot has "Topic guardrails". For the voice agent, nothing else was found.

**4. Phone number**
- Three routes (**archived** guide): promote the new AI number, forward ("as many numbers as you need"), or port
  ("2-4 weeks").
- Porting (https://dialzara.com/porting): needs a Letter of Authorization and a bill or proof of ownership; messaging
  may not work for up to 3 business days after the port; "forwarding works during port" (features).
- **Contradiction:** the FAQ says "Number porting is free". The porting page states no fee and says "Only numbers from
  the continental United States can be ported"; the features page says "Port your existing US/Canada business number at
  no charge."

**5. After each call**
- "By default, Dialzara will send you an email and a text message notification every time your AI phone attendant
  takes a call" (**archived** integrations guide).
- The features page lists a summary, transcript and extracted lead fields, sent by SMS, email, a signed webhook or the
  CRM, plus an optional daily digest.
- "Recordings and transcripts are saved automatically". Retention: "Each customer controls their own retention window
  from the dashboard", commonly 30, 90 or 365 days (FAQ). Export or delete at any time.
- Recording consent for inbound calls: not found. Consent tooling is described only for outbound and SMS.

**6. Owner's dashboard and app**
- Activity log; a shared inbox with notes and @mentions; analytics per agent.
- Roles: owner, manager, agent, read-only.
- Multiple agents, "one per location, brand, or department", on higher plans (Elite and above per pricing).

**7. Integrations**
- Native CRMs (not named), an embedded Zapier, Make, webhooks, API access.
- Slack and Microsoft Teams alerts. Google and Outlook calendars.

**8. Features** (https://dialzara.com/pricing, https://dialzara.com/features)
- Business Lite and up:
  - 24/7 answering; appointment booking; lead qualification; call routing.
  - Voicemail transcription.
  - CRM and calendar integration.
  - 10 languages; a custom AI voice.
- By plan:
  - Pro adds priority support.
  - Plus adds a "Self-editable prompt".
  - Elite adds: initial prompt setup; priority support and SLA; blind and warm transfer; multi-agent and multi-location;
    advanced integrations and API.
  - Done for You adds ongoing prompt engineering and custom integrations.
- Add-ons and other products:
  - AI SMS Agent: $19/mo platform fee plus $0.05 per AI message, carrier fees passed through, 10DLC registration
    handled. The page also says "Free with any inbound voice plan."
  - AI Website Chatbot: $39/mo alone. With a voice plan, 100 sessions/mo are free, then $0.15 each. The features page
    says "Free Website Chatbot: Included with every plan."
  - Outbound Voice: $750 (1,500 contacts), $1,000 (2,000), $1,500 (3,000).
  - Numbers: US local $3/mo, toll-free $5/mo.
  - White Label / Partner: custom pricing.
- Features page, tier not given:
  - Spam detection with allow and block lists.
  - Caller memory.
  - AI Configurator; industry starter templates.
  - Round-robin booking; confirmations and reminders; reschedule and cancel.
  - Intent and VIP routing; after-hours message fallback.
  - Summaries by SMS, email and webhook; daily digest.
  - Shared inbox with notes; Slack and Teams alerts.
  - Conversation analytics.
  - Role-based seats: owner, manager, agent, read-only.
  - Website-to-knowledge-base import.
  - Free porting.
  - Encrypted storage; export and delete.
  - "Regulated-use configurations on request", for example healthcare, through sales.
- Not found: native mobile app; a HIPAA or BAA claim (only "on request").

---

## 6. Upfirst (upfirst.ai)

**1. Who it is for, sales model and pricing** (https://upfirst.ai/pricing)
- For small businesses. Self-serve, with a "free 30-minute onboarding call". White-glove onboarding on Scale and
  Enterprise.
- Priced **per call**:

  | Plan | Calls a month | Monthly | Annual (per month) | Over plan |
  |---|---|---|---|---|
  | Starter | 30 | $24.95 | $20 | $1.50/call |
  | Premium | 90 | $59.95 | $48 | $1/call |
  | Pro | 300 | $159.95 | $128 | 75¢/call |
  | Scale | 600 | $299 | $240 | 70¢/call |

- Not billed: spam, calls under 15 s, and calls where the caller never speaks.
- Extra agents: $9.95/mo each. Team access "is NOT billed per seat"
  (https://help.upfirst.ai/en/articles/15606397-how-to-invite-team-members-to-your-upfirst-account).
- Trial: 14 days or 100 calls, whichever comes first, plus 25 texts. "We don't ask for a credit card, so you're never
  billed automatically when your trial ends."

**2. Signup and setup flow**
- Vendor setup guide (https://upfirst.ai/docs/setup-guide.md):
  - The owner goes through "every sign-up step until they have picked their Upfirst phone number... Picking the number
    doesn't change their current business line."
  - "New accounts already have a greeting, some knowledge, and sometimes skills, created from what the owner entered at
    sign-up."
  - The pricing FAQ says you "enter your website" and it trains the receptionist.
- The guide's information checklist: common reasons for calling and how to handle each; top questions; service area;
  hours and after-hours handling; prices "they're comfortable sharing"; transfer people, their numbers and when; links
  worth texting callers.
- Setup can be done by ChatGPT or Claude through Upfirst's MCP connector (https://upfirst.ai/, setup guide). Some
  settings are dashboard-only: notifications, calendar, voice, language, timezone, tags, custom fields.
- Testing:
  - Web calls are free, but "test calls from the dashboard turn off texts and transfers" (setup guide).
  - A real test call comes from your own phone. "Test calls are always free" when made from the business number set in
    Account settings (https://help.upfirst.ai/en/articles/12911299-am-i-billed-for-test-calls).
- Go live: forward the business line, all calls or missed only, "then have them call their business number from
  another phone to confirm Upfirst answers."
- Whether the AI answers before setup is finished: the number answers once picked. Upfirst says accidental calls to it
  are "probably a mistaken dial" and calls "under 15 seconds" are not billed
  (https://help.upfirst.ai/en/articles/12685832-i-haven-t-started-forwarding-calls-to-upfirst-why-did-i-receive-a-call).

**3. How the receptionist is configured**
- Greeting and goodbye, with greetings by date and time; tone; speech rate; hold music; spam blocking. 40+ voices,
  35+ languages.
- "Training" entries (https://help.upfirst.ai/en/articles/11574454-how-to-use-training):
  - Each entry is written by hand or imported from a single webpage ("only reads the page you paste").
  - Each is agent-specific or shared.
  - No limit on amount.
- Hours (https://help.upfirst.ai/en/articles/14601927-setting-up-hours-of-operation-with-time-based-knowledge): two
  training entries, "Open" and "Closed", each restricted by time.
- Transfers (https://help.upfirst.ai/en/articles/11544566-how-to-set-up-call-transfers-with-upfirst):
  - A condition, destinations with ring time, and fallback numbers.
  - Cold or warm. "Restrict transfers by time".
  - When no one answers: voicemail or "Take a message".
- Texts: fixed SMS "skills" of up to 306 characters (setup guide).
- Booking: Google Calendar, Outlook, Calendly, Acuity, Clio, Square, with an appointment type.
- Rules (setup guide): "Never invent a fact, price, or policy. If you don't know it, ask." These are instructions to the
  setup assistant. The guide also recommends the emergency line: "tell the caller to hang up and call 9-1-1."

**4. Phone number**
- A number comes with every plan, picked at signup. Help articles cover changing area code and toll-free numbers.
- Forwarding from cell, landline or VoIP with "no porting required". Porting "at no extra charge" (pricing).

**5. After each call**
- Email and/or SMS per recipient with "An easy-to-skim summary" and "A full transcript"
  (https://help.upfirst.ai/en/articles/10318292-set-up-email-and-text-notifications).
- Conditions such as "Only email me if it's a new lead". Recipients can be chosen per agent. Custom fields and tags
  are extracted from the transcript.
- Recording (https://help.upfirst.ai/en/articles/10388882-call-recording-what-you-need-to-know):
  - "Call recording is a mandatory feature of our service... call recording cannot be disabled."
  - The greeting should say "This call is being recorded." The article explains one-party and all-party consent.
  - Retention period: not found. Deletion is by request to support.
- **Contradiction to note:** the pricing page lists "zero data retention" on all plans, explained as "our AI providers
  don't store it". Upfirst itself keeps recordings, and recording cannot be turned off.

**6. Owner's dashboard and app**
- app.upfirst.ai: calls, a text inbox, contacts, analytics, tags and comments. It can be added to the phone home screen
  as a web app.
- Roles: Owner (full) and Member (view and comment, "cannot edit the receptionist's setup").
- Multiple agents, each with its own name and number, $9.95 each. Shared training suits multiple locations
  (https://help.upfirst.ai/en/articles/17176416-how-to-add-multiple-agents-to-your-account).

**7. Integrations**
- Zapier, Make, "Custom Actions" (any API, with OAuth), Clio Grow and Manage, the calendars above, and an MCP server.

**8. Features** (https://upfirst.ai/pricing, https://upfirst.ai/features)
- On all plans:
  - 24/7 answering; simultaneous calls.
  - Two-way texting.
  - 35+ languages; 40+ voices.
  - Warm and waterfall transfers.
  - Appointment scheduling.
  - Call summaries, recordings and transcription; smart notifications.
  - Spam blocking.
  - Knowledge base.
  - A phone number.
  - Call analytics.
  - Zapier and API integrations.
  - Team access.
  - "Zero data retention" (stated as "our AI providers don't store it").
  - Onboarding.
- By plan:
  - Scale and Enterprise: white-glove onboarding and done-for-you integrations.
  - Enterprise: volume discounts, priority support, BAAs for HIPAA.
  - Pro and Scale: a priority support queue.
- Add-on: additional agents at $9.95/mo each.
- Features page, tier not given:
  - Caller information collection with custom fields.
  - Texting links to callers.
  - Spam and sales-call detection with hang-up.
  - Recognizing repeat callers; per-contact instructions.
  - 1-800 numbers; call screening; order taking; voicemail assistant and voicemail transcription.
- Toll-free: "If you prefer a toll-free number, we can set one up for you"; price not stated
  (https://help.upfirst.ai/en/articles/12685812-can-i-get-a-toll-free-number-with-upfirst).
- Other help-center features: AI replies to texts, contact import, call tags, DTMF, bypass-AI contacts, and an
  installable web app.
- Not found: outbound AI calls, website chat, native mobile app, white-label.

---

## 7. Simple Phones (simplephones.ai)

**1. Who it is for, sales model and pricing** (https://www.simplephones.ai/)
- Priced per call: "starts at $97/mo for 100 calls/mo". Other tiers: not found. The /pricing URL serves the homepage.
- Over the limit: "If you cancel your plan, or you exceed the number of calls per month for your tier, your phone
  numbers will be released."
- Trial: "Start a 14-day free trial and create an AI agent instantly." Card: not found.
- Self-serve to start; later changes are made by Simple Phones staff on request.

**2. Signup and setup flow**
- "When you sign up for Simple Phones, you are prompted to create an AI agent. Fill out the form with your business
  name, description, and website, and click Create."
  (https://help.simplephones.ai/basics/creating-an-agent.md)
- "When you create an agent, it is assigned a random phone number. If someone calls that number, the agent will answer
  with a default greeting" (https://help.simplephones.ai/basics/inbound-calls.md). So the AI answers at once, before
  any customizing.
- Changes are made by a "change request" in the dashboard, which the team carries out. The homepage says "you can
  request customizations for free on an ongoing basis".
- Testing: "test your agent without calling it via a chat screen in your dashboard" (homepage).
- Time until live: "create an AI agent in 60 seconds" (homepage).

**3. How the receptionist is configured**
- Base agent: a default greeting and menu ("book a call", "leave a message"). Anything else goes to an LLM. The help
  page names "OpenAI's GPT-3", which suggests the docs are old.
- Website or FAQ crawl, on request (https://help.simplephones.ai/basics/crawling.md).
- Routing: by default "the agent will tell them to leave a message". Transfers, time-of-day rules and alerts are added
  by the team (https://help.simplephones.ai/basics/routing.md).
- 20 languages and accents. Voices are chosen from a list.
- Industry templates, hours setup, and limits on what the AI may promise: not found.

**4. Phone number**
- An assigned number in 25 countries; some need documents. Forward missed calls or all calls. Porting: not found.

**5. After each call**
- Log of caller, duration and transcript. Texts, emails or webhooks to the team.
- Recording, retention and consent: not found.

**6. Owner's dashboard and app**
- Logs, a chat test and change requests. "On the Basic plan, you can create one agent"; upgrade for more agents or
  numbers. Users and locations: not found.

**7. Integrations**
- Zapier through webhooks, which are configured by staff. Custom CRM work by the team. An API for numbers, calls,
  transcripts and outbound calls (https://help.simplephones.ai/llms.txt).

**8. Features** (https://www.simplephones.ai/; no tiers beyond "$97/mo for 100 calls" and "the Basic plan" were found)
- The homepage feature list:
  - Inbound calls.
  - Outbound calls ("follow up with customers... make cold calls").
  - Logging (caller, duration, transcript, and a chat test screen).
  - Customization (booking, calculations, FAQs).
  - Routing: escalation to numbers, plus texts, emails or webhooks to team members.
  - Voices: languages and accents.
  - Crawling of the website and FAQ documents.
  - Service: changes carried out by staff.
- Elsewhere on the homepage: numbers in 25 countries; 20 languages; custom builds on request ("price calculator, custom
  knowledge base, or a searchable directory").
- More agents, languages or international numbers need an upgrade from Basic; the price is not found
  (https://help.simplephones.ai/basics/creating-an-agent.md).
- Not found: spam blocking, texting callers, website chat, recordings, analytics, CRM entry other than custom work,
  team seats, toll-free, white-label, HIPAA, mobile app.

---

## 8. Smith.ai: AI Receptionist plans

**1. Who it is for, sales model and pricing**
- Law firms first (legal headlines, legal caller types), plus many other industries (https://smith.ai/ai-receptionist).
- Priced **per call** (https://smith.ai/pricing/ai-receptionist):
  - Free: $0 for 25 calls, then $3.00 per call. "Free forever... Not a trial." "A credit card is required at signup,
    but overages are off by default" (https://smith.ai/ai-receptionist).
  - Pro: $150 for 75 calls ($2.50 over), $270 for 150, or $500 for 300. Includes dedicated onboarding and an account
    manager.
  - Enterprise: $500 for 300, $800 for 500, or $1,000+. Includes "Full-service setup", multi-location, and human
    quality control.
- Month-to-month with 30 days' notice to cancel. Human receptionists are an add-on charged per call.

**2. Signup and setup flow**
- Help-center signup
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199597-how-do-i-sign-up-for-ai-receptionist-):
  1. Pick a plan on the pricing page.
  2. Enter general information.
  3. Set a password.
  4. "Tell us about your business" (shown to callers).
  5. Confirm the plan.
  6. Enter payment details and press **Pay**.
  7. "Success! You now have an active AI Receptionist account"; create the receptionist.
  8. Continue to Dashboard to customize.
- **Payment comes before the receptionist is built.**
- Product page: "Set up your AI Receptionist in ~15 minutes": create the account → define goals and scenarios → run
  simulated test calls → apply recommended fixes → "turn on live calls".
- Preview: call the number shown at the top of Call History, then mark the call as a test
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199600-how-to-preview-your-ai-receptionist).
- **Contradiction:** the help center says "You will be allotted 5 test calls per month"
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000200044-how-do-i-avoid-being-billed-for-test-calls-).
  The pricing page lists 25, 75, 150 or 300 test calls a month, plus simulated calls, by plan.

**3. How the receptionist is configured**
- Business Info has four fields: name, website, address, opening hours. "Changes will be applied immediately upon
  saving."
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199595-how-to-set-up-your-business-information)
- Other settings: greeting, FAQs, location directions, follow-up messages.
- "Caller types" act as a template
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199596-who-is-calling-you-and-what-are-caller-types-):
  - Types: default; potential new clients; existing clients; sales; and legal types (other law office, government,
    case-related third party, opposing party, media, incarcerated caller).
  - Each type sets contact info to collect, qualifications, custom data, and a call action.
- Lead qualification: up to 10 locations, 10 services and 3 yes/no questions
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199598-how-to-qualify-new-leads).
- Transfers: transfer destinations, a direct-transfer list, blocked numbers.
- "Quality Studio": goals, scenarios and an "AQI" score.
- Booking: Calendly is the only scheduler named (https://smith.ai/ai-receptionist).
- Limits on what the AI may promise: not found.

**4. Phone number**
- A "Dedicated phone number" on every plan. A help folder covers forwarding from many providers (Google Voice, 8x8,
  CallRail, Dialpad, RingCentral, and others).
- Forwarding must pass caller ID: "you must enable Caller ID in your phone system's routing software". Without it, spam
  calls are charged.
- Porting: the folder is titled "Number Forwarding & Porting", but no porting article was read. Not found.

**5. After each call**
- By email only
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000199599-how-to-update-your-notification-settings):
  - An instant summary after each call, a daily summary, and a voicemail summary with transcript and audio link.
  - A global recipient list, plus extra recipients per caller type. Slack routing is a separate article.
- "Call recordings and transcripts are only kept on the Smith.ai system for 90 days"
  (https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000200039-call-recording-transcription).
- Recording consent: not found.

**6. Owner's dashboard and app**
- app.smith.ai: Call History, Call Details, Business Info, Caller Instructions, Settings → Notifications, Quality
  Studio.
- Users or seats: not found. Multiple locations: Enterprise only.

**7. Integrations**
- Clio Manage and Grow, Salesforce, HubSpot, Calendly, Slack, CallRail, Zapier and Make.

**8. Features** (https://smith.ai/pricing/ai-receptionist, https://smith.ai/ai-receptionist)
- Free and up:
  - "Quality Studio — test before going live".
  - 24/7 call handling.
  - "Recording, transcription & summaries".
  - "Lead qualification & call routing".
  - "Native integrations (Clio, Zapier & more)".
  - A dedicated phone number.
  - Spam filtering: spammers don't count, and up to 10% of calls can be removed from the bill.
- Pro adds: dedicated onboarding; an account manager; live phone, email and chat support; "Custom SMS branding".
- Enterprise adds:
  - Full-service setup and optimization; "Custom AI prompting".
  - "Unlimited bespoke integrations".
  - "Multi-location support & synchronization".
  - "AI fine-tuning & human quality control".
  - Priority support.
- Add-on: human receptionists from the "Live Agent Network", charged per call; the price is not on the AI page.
- Tier not given:
  - Warm transfers; Calendly scheduling.
  - Salesforce and HubSpot.
  - "Bilingual answering"; "Call intelligence & analytics" (feature links).
  - Automated follow-up messages and retainer agreements sent during intake (help articles).
- Not found: outbound calls, website chat for the AI plan, native mobile app, toll-free, white-label, HIPAA.

---

## 9. Abby Connect: AI receptionist within combined human and AI plans

**1. Who it is for, sales model and pricing**
- One service, human and AI: "Abby is one service, and you choose how each call is handled." Any plan can be used for
  AI only (https://www.abby.com/pricing/?service=ai).
- Prices (https://help.abby.com/en/articles/15361527-abby-service-plans-pricing-overview):

  | Plan | Price | Abby Minutes | Over plan |
  |---|---|---|---|
  | Starter | $164 | 50 | $3.29 per Abby Minute |
  | Essential | $329 | 100 | $3.29 |
  | Professional | $599 | 200 | $2.99 |
  | Growth | $1,380 | 500 | $2.76 |

- An AI minute counts as half an Abby Minute. HIPAA accounts are human-only.
- Trial: "14 days or until all 500 trial minutes are used". Payment details are taken at signup and charged
  automatically when the trial ends. No setup fee.

**2. Signup and setup flow** (https://help.abby.com/en/articles/15361569-signing-up)
1. Get Started.
2. Business and contact info: email (which becomes the login), name, phone, company, industry.
3. Choose a plan.
4. **Payment**.
5. **Schedule an onboarding**.
6. Activation email.
7. Finish in the portal (my.abby.com): confirm business info, call answering and routing, team members and contacts,
   Knowledge Base, and phone number.
- The AI page says "our team captures your greeting, the questions callers ask most" on "a short onboarding call"
  (https://www.abby.com/products/ai-receptionist).
- Go live: "Place a test call from a different phone. Once Abby answers correctly and follows your call handling,
  you're live." (https://help.abby.com/en/articles/15648459-how-abby-receives-your-calls)

**3. How the receptionist is configured**
- "Business information, FAQs, and call handling instructions."
- Warm transfer to Abby's US-based human receptionists or to your own team.
- Booking into "hundreds of scheduling platforms", with Google Calendar, Calendly and Acuity named. Custom answering
  hours. English and Spanish. (AI page; pricing page)
- Templates and limits on what the AI may promise: not found.

**4. Phone number**
- Three routes: forward to the Abby number ("fastest go-live"), port ("takes time and requires documentation"), or
  publish the Abby number.

**5. After each call**
- "The transcript, AI summary, sentiment score and recording arrive by text, email and in the AbbyGO app."
- Retention and consent: not found.

**6. Owner's dashboard and app**
- The my.abby.com portal and the AbbyGO app; call or text back from the portal; team members. Locations: vague.

**7. Integrations**
- "1,000+", naming Salesforce, HubSpot, Zoho CRM, Slack and QuickBooks.

**8. Features** (https://www.abby.com/pricing/?service=ai, https://help.abby.com/en/articles/15361570-abby-add-ons,
https://www.abby.com/products/ai-receptionist)
- On all plans:
  - Caller Insights.
  - The AbbyGO app; self-serve call controls.
  - Onboarding ("White Glove Onboarding Process").
  - 1,000+ integrations.
  - Encrypted recordings.
  - Custom call handling; custom answering hours.
  - Bilingual answering, English and Spanish.
  - Flexible contacts; custom transfer tunes.
  - Call blocking; voicemail solutions; custom solutions.
- Human receptionists only: a "Dedicated Receptionist Team" and "HIPAA Compliance Options".
- Add-ons:
  - Additional companies or locations: $85/mo each.
  - Additional phone numbers: $10/mo each.
  - Email fax: $9.95/mo per number.
  - Voicemail boxes: included.
  - Live Web Chat is a separate service with its own pricing.
- AI receptionist abilities: answering, screening, warm transfer to Abby's humans or your team, messages, booking, and
  transcript, summary, sentiment and recording by text, email and app.
- Not found: outbound AI calls, texting callers, toll-free, white-label.

---

## Feature matrix

Each cell gives the tier the product offers the feature on. "All" means every plan. "Tier?" means the vendor lists
the feature but does not say which plan has it. "No" means the vendor says it does not offer it. "Not found" means
the pages read do not say. Every cell is sourced in that product's point 8 (or points 3 to 7).

Tier names:

| Product | Tiers, low to high |
|---|---|
| Rosie | Professional / Scale / Growth |
| Frontdesk | Business-in-a-Box (Business) / Partner |
| Beside | Baseline / Unlimited |
| Goodcall | Starter / Growth / Scale |
| Dialzara | Lite / Pro / Plus / Elite |
| Upfirst | Starter / Premium / Pro / Scale / Enterprise |
| Smith.ai | Free / Pro / Enterprise |

### Answering, languages and voices

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| 24/7 answering | All | Tier? | Not found | All | All | All | Not found | All | All |
| Simultaneous calls | All | Not found | Not found | Not found | Not found | All | Not found | Not found | Not found |
| Spam blocking | All | Tier? | Not found | Not billed; blocking not found | Tier? | All | Not found | All | All ("call blocking") |
| Languages | EN+ES, all | 20+, tier? | EN/ES/FR/PT, all | English only | 10, all | 35+, all | 20, tier? | "Bilingual", tier? | EN+ES, all |
| Voice choice | 10+, all | Tier? (vendor checklist: 100+) | 20 + clone, tier? | 6 | Custom voice, all | 40+, all | Tier? | Not found | Not found |
| Voicemail | Not found | Tier? | Fallback voicemail, tier? | Not found | Transcription, all | Tier? | Not found | Voicemail summary, tier? | Boxes included |
| Caller memory | Not found | Toggle, tier? | Tier? | Not found | Tier? | Tier? | Not found | Not found | Not found |

### Calls the AI handles

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Message taking / intake | All (2/5/unl. scenarios) | Intake forms, tier? | Tier? | Tier? | Lead qualification, all | All | Base agent | Free and up | Tier? |
| Direct calendar booking | Scale and up | Google, tier? | Tier? | Google, tier? | All | All | Tier? | Calendly, tier? | Tier? |
| Warm transfer | Scale and up | "Hot", tier? | Tier? | Transfer yes; warm not found | Elite and up (FAQ contradicts) | All | Transfer on request; warm not found | Tier? | Tier? |
| Sequential (waterfall) transfer | Growth | Backup and blast, tier? | No (one per rule) | Up to 3, tier? | Not found | All | Not found | Not found | Not found |
| Human receptionist backup | Not found | Not found | Not found | Not found | Not found | Not found | Not found | Per-call add-on | All (human minute = 1 Abby Minute) |
| Outbound AI calls | Not found | 20/day Business; custom Partner | Not found | Not found | Add-on $750–$1,500/mo | Not found | Tier? | Not found | Not found |

### Texting and chat

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Texts to callers | Links all; in-call Scale and up | 400/mo Business | Missed-call text-back, tier? | Send-only, tier? | SMS Agent $19 + $0.05/msg ("free with voice plan") | All | Not found | SMS branding Pro and up | Not found |
| AI replies to texts | Website Texting add-on $50/mo | Tier? | Tier? | No | SMS Agent | All | Not found | Not found | Not found |
| Website chat | All (free) | 100 convos, Business | Not found | Not found | $39/mo; 100 free with a voice plan | Not found | Not found | Not found | Separate human service |

### Training the receptionist

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Train from website | All (and Google profile) | URL crawl, tier? | Tier? | Tier? | Tier? | One page at a time, all | Crawl on request | Not found | Not found |
| Train from documents | Growth | Tier? | Not found | PDF, tier? | Tier? | Not found | Tier? | Not found | Not found |
| Setup help (AI or human) | Growth white-glove | CSM all; white-glove Partner | Not found | Gabi, all | Configurator; 1:1 call all paid | 30-min call all; white-glove Scale and up | Staff change requests | Onboarding Pro and up | Onboarding call, all |

### Records and reporting

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Call recording | All | Toggle, tier? | Default on, consent toggle | All | All | All (mandatory) | Not found | All (90 days) | All |
| Transcript and summary | All | Tier? | Tier? | Transcript all; summary not found | Tier? | All | Transcript | All | Tier? |
| Call analytics | Not found | "Dashboards & Reporting", tier? | Daily recap | Custom metrics, tier? | Tier? | All | Not found | Tier? | Caller Insights, all |

### Integrations

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Native CRM entry | 19 CRMs, all | Built-in CRM and named CRMs, tier? | Booking connectors only | HighLevel, Sheets, tier? | All | Clio, tier? | Custom work | Clio from Free; Salesforce/HubSpot tier? | Tier? |
| Zapier | All | All | Not found | Tier? | Tier? | All | Through webhooks | Free and up | Not found |
| Webhooks / API | Not found | Webhooks tier?; API Partner | Not found | API/MCP tools, tier? | Webhooks tier?; API Elite and up | All | Tier? | Not found | Not found |

### Account, numbers and compliance

| Feature | Rosie | Frontdesk | Beside | Goodcall | Dialzara | Upfirst | Simple Phones | Smith.ai | Abby |
|---|---|---|---|---|---|---|---|---|---|
| Native mobile app | iOS/Android, all | Not found | iOS/Android | Not found | Not found | No (installable web app) | Not found | Not found | AbbyGO, all |
| Team seats | Not found | 2 editors + unlimited viewers (Business) | Up to 20 (web); per seat in-app | 1 / 5 / 10 | Roles; count not found | Owner/Member, not billed per seat | Not found | Not found | Tier? |
| More agents or locations | Not found | Price not found | Extra line $4.99/mo | Separate agent on its own plan | Elite and up | $9.95/mo each | Above Basic; price not found | Enterprise | $85/mo each |
| Extra phone numbers | Not found | Not found | $4.99/mo per line | Not found | Local $3/mo | One per agent | Above Basic | Not found | $10/mo each |
| Toll-free number | Not found | Not found | Not found | No | $5/mo | On request; price not found | Not found | Not found | Not found |
| White-label / reseller | Not found | Exists; tier not found | Not found | Not found (agency access by roles) | Custom pricing | Not found | Not found | Not found | Not found |
| HIPAA / BAA | Not found | Not found today | Not found | BAA Scale and up | On request | BAA Enterprise | Not found | Not found | Human-only plans |

## Patterns across these products

**P1. Two ways to order signup, and the split falls on when the card is taken.**
- *Build first, pay later (no card):*
  - My AI Front Desk: five signup steps with no payment; "No credit card required".
  - Upfirst: no card; the trial ends without auto-billing.
  - Goodcall: a free demo agent; pay only when you add a number.
  - Simple Phones: an agent created "instantly" in the trial; card not stated.
- *Pay first:*
  - Smith.ai: Pay comes before the receptionist exists, and the card is required even on Free.
  - Abby: payment, then the onboarding call.
  - Beside: Baseline bills at once; Unlimited needs a card for its trial.
- Rosie bills at trial end; whether a card is taken earlier: not found.

**P2. A short signup form plus an automatic read of the business, then the owner reviews it.** The agent is
pre-filled from a few fields and the business's own pages, and the owner confirms or edits.
- Rosie: website plus Google Business Profile, then "confirm your data is accurate".
- Beside: a website scan where "Nothing is saved until you review and accept".
- Upfirst: website, plus what was entered at signup.
- Simple Phones: name, description, website.
- Dialzara: "basic questions" that auto-generate the greeting and training guide.
- My AI Front Desk: business name and type, call-handling questions, receptionist name.
- Smith.ai: "Tell us about your business".

Per-industry templates appear only at Dialzara ("88+ industries") and in Smith.ai's caller types, which are law-firm
oriented. Four vendors offer an AI assistant that builds the agent by conversation: Goodcall (Gabi), Dialzara (AI
Configurator), My AI Front Desk (Ask Frontdesk), and Upfirst (through ChatGPT or Claude).

**P3. Every vendor offers a test before go-live, but tests are counted differently.**
- Browser or web call: My AI Front Desk, Goodcall, Upfirst.
- Call the number yourself: Rosie, Smith.ai, Upfirst, Abby, Dialzara.
- In-app test: Beside. Chat test: Simple Phones.
- Simulated or AI-written practice callers: Goodcall, Smith.ai.
- How tests are counted:
  - Free: Upfirst.
  - Metered "AI usage": Goodcall.
  - Must be marked as a test, limited per month: Smith.ai.
  - Need voice credits: My AI Front Desk.

**P4. The go-live switch is the owner's forwarding (or publishing the number), not the vendor.**
- The number is given out at or near signup at My AI Front Desk, Upfirst, Rosie, Beside and Simple Phones.
- At Goodcall the number comes only at payment; "Publishing makes your setup live for test calls" only.
- Simple Phones answers at once with a default greeting before any customizing. Rosie and Goodcall require an explicit
  Publish before changes reach callers.
- Most offer a choice between answering every call and answering only missed calls: Goodcall, Upfirst, Rosie, Simple
  Phones, My AI Front Desk. Beside defaults to ringing the owner first. Forwarding is presented as the fast,
  reversible default (Beside, Goodcall, Abby, Upfirst). Porting is slower or not self-serve: Dialzara takes 2–4 weeks;
  Goodcall says "Not yourself yet".

**P5. Price by usage per business; seats are a plan limit, not the price.**
- Per minute: Rosie, My AI Front Desk, Dialzara, Abby (where an AI minute is half an Abby Minute).
- Per call: Upfirst, Simple Phones, Smith.ai, Beside Baseline (30 AI calls).
- Per unique caller: Goodcall.
- Unlimited flat: Beside Unlimited.
- Only Beside's in-app plan is priced per seat. Seats are capped instead: Goodcall 1/5/10, My AI Front Desk 2
  editors, Beside up to 20. Upfirst says team access "is NOT billed per seat".
- Extra locations are extra agents or lines: Upfirst $9.95 per agent, Beside $4.99 per line, Goodcall a separate agent
  on its own plan, Dialzara Elite and above, Smith.ai Enterprise.

**P6. Recording is on by default and consent is left to the owner. Retention is short or customer-set.**
- Recorded by default: Goodcall ("Every call"), Dialzara, Beside, Rosie, Smith.ai, Abby. Upfirst's is mandatory and
  cannot be disabled. My AI Front Desk is the only one with a plain on/off toggle.
- Consent: Rosie's privacy policy, Beside and Upfirst put notice and consent on the subscriber. Beside alone has a
  consent-message toggle, and it honours a caller's request not to be recorded.
- Retention:
  - Smith.ai: 90 days.
  - Goodcall: 30 days, 90 days or unlimited by plan.
  - My AI Front Desk: the last 200 logs.
  - Dialzara: customer-set, 30/90/365 days.
  - Rosie: subscriber-determined; CRM recordings play for 30 days.
- None offers a no-recording, no-transcript default.
- AI disclosure: explicit at Goodcall; built into Beside's default greeting; recommended by Upfirst.

**P7. After each call: an email and/or text summary, with configurable recipients and conditions.**
- Email and SMS summary: Rosie, My AI Front Desk, Upfirst, Dialzara (on by default), Goodcall (sent during the call),
  Abby. Smith.ai sends email only.
- Rule-based routing of summaries: Upfirst ("Only if..." conditions), My AI Front Desk (by trigger), Smith.ai (by caller
  type).
- Daily recap: Beside, Dialzara, Smith.ai.
- Transcripts and recordings are viewed in the dashboard or app, not in the notification itself (Rosie, Smith.ai, My
  AI Front Desk).

**P8. Limits on what the AI may say are mostly left to the owner's own instructions.** Built-in limits found:
- Beside will not state whether the business is open without confirmed hours, and will not claim to be human.
- Rosie never invents a transfer number.
- Goodcall can be told to stop quoting prices.
- Upfirst's setup guide says "Never invent a fact, price, or policy".
- Dialzara's sample prompt says "Do not answer questions not related to this training guide."

No vendor publishes a fixed list of things the AI must never promise.
