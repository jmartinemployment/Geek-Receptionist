# Group 2 (standalone B): newer standalone AI receptionists — client experience research

Researched 2026-11-19 for Geek-Receptionist. Facts are from the vendor's own pages unless marked
**(third-party)**. "Not found" means the pages read did not say; nothing is inferred. Pages were read
with WebFetch (which summarises) or downloaded and stripped to text with curl (verbatim); quotes in
"double quotes" are the vendor's wording.

---

## 1. Echowin (echo.win; echowin.ai did not load)

Note: `echowin.ai/pricing` failed to load; the product lives at `echo.win`.

**Positioning has moved away from "AI receptionist for small business".** Its own `llms.txt`
(https://echo.win/llms.txt) says: "Product type: self-serve AI agent builder for phone and chat, not
a managed answering service" and "Who it is for: builder-operators who configure their own phone and
chat agents, plus agencies who build agents for clients." It still sells receptionist use cases
(menu items "AI Receptionist", "After Hours"; industries Roofing, Auto Repair, Medical, etc.) and quotes
small-business operators (a car-wash partner, an 8-location Jiffy Lube operator) on
https://echo.win/pricing. It sits at the edge of the "skip developer platforms" rule; included because
it was assigned.

### 1. Who / sales model / pricing
- Self-serve. "Start Building Free … No credit card required … Build & test free … Go live in minutes"
  (https://echo.win/products/ai-phone-agent).
- **Pricing is per minute plus per number, no per-seat or per-business fee** (https://echo.win/pricing,
  read verbatim):
  - Pay as you go: "$0 To start", "$10/mo Per number", "$0.20 Per minute"; "$0.03/chat".
  - Monthly bundles ("Included minutes reset each billing cycle and don't carry over"): Bundle 1 $45/mo
    = 250 voice min (18¢/min); Bundle 2 $80/mo = 500 min (16¢); Bundle 3 $150/mo = 1,000 min (15¢);
    Bundle 4 $350/mo = 2,500 min (14¢). "Chat and SMS also draw from your bundle balance."
  - Transfers: "Transferred portions of calls are billed at half the per-minute rate."
  - Premium voices +$0.08/min (https://echo.win/llms.txt). Outbound SMS $0.02 per 160-char part;
    "Additional fees may apply for 10DLC registration."
  - Agency: Grey Label $149.99/mo (struck-through $299.99), White Label $499.99/mo (struck-through
    $999.99), "Billed for total usage across all accounts."
  - Volume: "Voice as low as $0.12 per minute" on custom contract.
  - "The free plan includes every platform feature. No feature gating." "Balance auto-reloads when you
    go live." "Set a monthly spending cap any time from your billing settings."
- Free credits — **the same page contradicts itself**: "$5 in free credits" in the plan card and
  "Get $10 free credits" in the footer call-to-action (https://echo.win/pricing).
- Card for trial: "No credit card required" (https://echo.win/products/ai-phone-agent). A third-party
  directory and an echo.win comparison page reportedly say a card is needed for the test balance
  (search-result summary, not read directly; **third-party / unverified**).
- Older tiered prices ($49.99, $109.99, $175.99/mo) appear only on directories (G2, Toolify, fitgap)
  **(third-party)**; the current vendor page has no tiers.

### 2. Signup and setup flow (https://echo.win/docs/quick-start)
Before signup, a public demo: "Drop in your website. We'll draft an AI phone agent for your business
— then talk to it right here in your browser." Fields: Business name, Website, Industry (optional).
"Free, no signup. 3 demos per day." (https://echo.win/hear-your-agent). Whether that draft carries into
a real account: not found.

Quick start, in order:
1. Create an account. "Upgrade to a paid plan" is listed as a prerequisite "to get phone number access."
2. **Create agent**: Agents → "New Agent" → name, language, time zone → "Create Agent". Wizard stages:
   "Basic Info, Instructions, and Launch". Instructions box comes pre-filled with a sample prompt
   containing a "[Company Name]" placeholder.
3. **Train**: plain-English instructions ("Write instructions as if you're training a new employee");
   add Knowledge Base items; enable tools (SMS, email, scheduling).
4. **Test**: built-in chat test and a voice test in the browser. A test call to a real number: not
   described.
5. **Deploy**: Deployment tab → "Connect" on Phone Calls → Numbers → "Add Number" → local number or
   port existing → assign number to agent. "Your AI agent is now live and ready to handle calls."
- Payment order: building and testing are free; payment is needed for a phone number (step 5).
- Business info gathering: typed instructions, knowledge base (pages, PDFs, FAQs). No business-info
  form or Google Business Profile import described in docs; the website-to-agent draft exists only in
  the public demo.
- Time to live: "Go live in minutes" (marketing). Whether the AI answers before setup is finished: not
  found (there is no number until step 5).
- Migration guide proposes a staged rollout: "Assessment (1-2 days) → Setup & Configuration →
  Parallel Testing → Full Migration → Optimization" (https://echo.win/docs/guides/migration-guide).

### 3. Receptionist configuration
- Template: a sample prompt with "[Company Name]"; industry/use-case "examples" pages
  (https://echo.win/llms.txt: "starting from an example and changing what you need").
- Name, language, time zone set at creation; "35+ HD voices", "70+ languages"
  (https://echo.win/products/ai-phone-agent). Greeting and business hours are written into the
  free-text instructions ("Include your greeting, business hours, procedures…").
- Agent automatically knows: current language, business name, current date, current time, and on
  phone, caller ID (https://echo.win/docs/awareness). A dedicated business-hours setting: not found;
  the awareness doc shows "Business Hours Check" done by instructions plus current time.
- Knowledge base (https://echo.win/docs/knowledgebase): individually selected web pages ("Manual
  reload to update content"), PDF uploads, Q&A pairs. No whole-site crawl or limits stated.
- Transfers (https://echo.win/docs/guides/call-routing): "Multi Transfer" tool with named
  destinations (department + number) plus instructions mapping keywords to destinations; "confirm the
  caller's intent before initiating a transfer"; fallback = take a message or schedule a callback.
  "Transfers currently support only US and Canada phone numbers."
- Booking (https://echo.win/docs/tools/scheduling): Google Calendar, Outlook, Wix Bookings, Square
  Appointments direct; Calendly-style link by SMS/email; anything via Zapier. Settings: default
  duration (15/30/60, per-service lengths), availability hours, minimum lead time (example 2 h),
  booking window (example 30 days). Agent must "Always repeat the date and time".
- Message taking: via the Send Email tool — "If someone calls for any team member, collect their
  details and send an email to the respective person"; plain-text email with CC/BCC
  (https://echo.win/docs/tools/send-email).
- Rules limiting promises: not found beyond instruction-writing advice.

### 4. Phone number
New local number or port ("Choose a local number or port your existing number",
https://echo.win/docs/quick-start); $10/mo each. US and Canada numbers only (older FAQ seen in
search, not re-verified). Call forwarding from an existing number: not found in the docs read.

### 5. After each call
- Transferred calls "keep full transcripts, sentiment analysis, AI summaries, and complete
  recordings, covering both the AI and human portions" (https://echo.win/docs/guides/call-routing).
- "Summary delivered to your inbox" (after-hours card, https://echo.win/products/ai-phone-agent);
  "Conversation logs and analytics", "Business Compass" metrics (https://echo.win/pricing).
- Retention: privacy policy only says "We retain personal information for as long as necessary for
  the purposes for which it was collected" and that data shared with third-party AI models "may be used
  to train and improve the models' performance" (https://echo.win/privacy).
- Recording disclosure: routing guide only says to "follow industry rules on call recording and data
  privacy during transfers." No built-in disclosure found.

### 6. Dashboard
"AI-native CRM", "Team and user management", workflows, conversation logs, Business Compass
(https://echo.win/pricing). Seats are not priced. Multi-location: no location object; Square booking
supports "multi-location support" (scheduling doc). Agency sub-accounts with a central number pool
("Subteams cannot purchase or manage their own phone numbers",
https://echo.win/docs/agency/phone-numbers).

### 7. Integrations
Google/Outlook/Cal.com/Wix/Square calendars; Zapier; n8n; webhooks ("Call API"); REST API, OpenAPI,
hosted MCP server; channels phone, web chat, SMS, WhatsApp, Slack, widget (https://echo.win/llms.txt,
https://echo.win/docs/quick-start).

### 8. Features
No plan tiers for features: one pay-as-you-go plan gives "Full unrestricted platform access"; only price
changes with bundles. Agency tiers and two paid extras below.
- Included for everyone (https://echo.win/pricing): unlimited agents and workflows; "Conversation logs
  and analytics"; "Business intelligence access"; "AI-native CRM"; "Team and user management";
  "Integrations and webhooks"; "Full API access and docs".
- Business Compass: "reads every call your agent handles and extracts metrics, intents, and trends —
  delivered straight to your inbox", "Included Free" (https://echo.win/products/ai-phone-agent).
- Voice (same page): custom voice cloning; "35+ clear, professional voices" with speed and tone
  control; interruption handling; "Unlimited parallel calls". Premium voices are an add-on at
  **+$0.08/min** (https://echo.win/llms.txt).
- Languages: "70+ languages" and, on the same page, "30+ Languages" (**contradiction** on
  https://echo.win/products/ai-phone-agent); it starts in Spanish and switches when the caller does.
- Outbound calls: "Inbound, outbound, or both"; "Outbound AI Dialer" with bulk call lists, voicemail
  drop or callbacks; reminder, collections and survey calls (same page).
- SMS: outbound SMS is an **add-on at $0.02 per 160-character part** (https://echo.win/pricing);
  SMS/email booking confirmations (phone agent page).
- Other channels: the same agent "can moonlight on website chat, WhatsApp, SMS, and Slack"; chat is
  $0.03/chat (pricing; phone agent page; https://echo.win/llms.txt).
- Agent tools: send email during calls, calendar booking (Google, Outlook, Cal.com), warm transfer,
  lead scoring, sentiment-aware escalation, "Captures caller details into your CRM"; "7,000+ apps via
  Zapier" (phone agent page).
- Transferred part of a call billed at half the per-minute rate (https://echo.win/llms.txt).
- White-label: Agency Grey Label $149.99/mo (list $299.99, "Limited time offer", mixed branding) and
  White Label $499.99/mo (list $999.99, "100% your brand"), with unlimited sub-accounts and client
  workspaces (https://echo.win/pricing).
- Free credits: "$5 in free credits" (pricing) vs "$10 free credits" (phone agent page),
  **contradiction**.
- Spam blocking: not found. Call screening has a guide (https://echo.win/docs/guides/call-screening, not
  read). Multi-location: not found. Multiple numbers: $10/mo each (pricing).

---

## 2. Phonely (phonely.ai)

### 1. Who / sales model / pricing
- "From Small Business to Government". Self-serve on Starter/Pro ("AI Agent Buildout: Starter
  Self-Serve; Pro Priority support; Enterprise Full Agent Buildout"); Enterprise is sales-led ("Book a
  Demo"; "our team works with you to build, configure, and optimize your AI agent")
  (https://www.phonely.ai/pricing).
- **Per organization subscription with included minutes, plus overage per minute**
  (https://www.phonely.ai/pricing, read verbatim):
  - Starter $50/mo monthly or $33/mo annual. Pro $150/mo monthly or $100/mo annual. Enterprise "as low
    as 5¢/min".
  - Phone numbers included: Starter "3 free", Pro "5 free".
  - "Post Transfer Rate" $0.02/min (Starter, Pro). Unlimited concurrent calls on all plans.
  - Direct website import: Starter "30 pages/ month", Pro unlimited.
  - Support: Starter "Email only", Pro "Priority email", Enterprise "Slack + Teams + Phone".
  - HIPAA BAA: Enterprise only.
- **The pricing page contradicts itself**: plan cards say Starter "200 mins ~100 calls" and Pro
  "650 mins ~300 calls"; the comparison table on the same page says Starter 250 and Pro 750 minutes.
  Starter overage is "$0.25/min" in the monthly table and "$0.35/min" in the annual table; Pro
  "$0.30/min" in both (so Pro's overage is listed higher than Starter-monthly's).
- Plan guidance (same page FAQ): Starter "anyone receiving up to 50 calls per month"; Pro "50–1000
  calls per month"; Enterprise "1000+ calls per month".
- Free usage: "Your first 100 minutes are completely free." (https://www.phonely.ai/,
  https://www.phonely.ai/product). Whether a card is required: not found. Page title says "Plans from
  Free to Enterprise" but no free plan is listed on the page.

### 2. Signup and setup flow
- Onboarding happens before the docs start: "Onboarding creates your organization, first agent, and a
  starter flow, then gives you a chance to call and customize that agent"
  (https://docs.phonely.ai/get-started/quick-start). The onboarding screens' fields are not documented
  (help.phonely.ai has no articles; its getting-started URL returns "Page Not Found").
- The **starter agent works out of the box**: "Answer business questions using connected knowledge;
  Collect the caller's name, phone number, and reason for calling when follow-up is needed; End the
  call …; Send a post-call email notification to the email used during onboarding." Docs warn: "Treat
  this as a working starting point, not a finished production agent." (same page)
- Marketing order (https://www.phonely.ai/product): step 1 choose voice; "step 2 Train Your Agent —
  Upload a knowledgebase, or connect your website"; "step 3 Connect your software".
- Documented order after onboarding (https://docs.phonely.ai/agent-design/overview, quick-start):
  1. Decide what the first call should accomplish (one outcome).
  2. Review knowledge added during onboarding; add documents/text/website pages.
  3. Review voice and Guidelines.
  4. Customize the starter flow (visual flow editor).
  5. Test the draft by Web Call / Web Chat in the browser; "Test from here" for one block.
  6. Fix "Flow Checklist" errors → **Publish** → retest against "Live". "If a flow has never been
     published, Phonely falls back to its draft." Use "a real inbound or outbound phone test when the
     behavior depends on the phone network".
  7. Review Call History and change the right layer (knowledge vs guidelines vs flow).
  "Before handling real calls, confirm the phone number, timezone, recording, and compliance settings."
- Payment order: not documented. API note: importing a number requires that "The agent must be on a
  paid plan" (https://docs.phonely.ai/api-reference/endpoint/import-number).
- Time to live: "70% of businesses getting started in less than 5 minutes" (https://www.phonely.ai/).

### 3. Receptionist configuration (docs.phonely.ai)
- Structure: Voice · Guidelines · Knowledge Base · Flows · Settings
  (https://docs.phonely.ai/agent-design/overview). Public "Templates" by use case exist
  (https://www.phonely.ai/template).
- **Guidelines sections** (https://docs.phonely.ai/agent-design/guidelines): Objective, Response Style
  (Personality: Direct/Formal/Persuasive/Friendly; "Humanize speech" fillers), **"Never Do — Strict
  actions, claims, or promises the agent must avoid"**, General Info, Rebuttals, Out of Scope, Custom.
  Example: "Do not invent availability or pricing."
- Greeting: "Greeting Message" on the First Flow; up to six answer routes from the greeting. "If call
  recording is enabled, the editor reminds you to include an appropriate recording disclosure in the
  greeting." (https://docs.phonely.ai/blocks/flow-blocks/start-flow)
- Voice: "1,000+ voice options across 50+ languages", voice cloning (pricing FAQ).
- Knowledge base (https://docs.phonely.ai/agent-knowledge-base/overview): Blank Document, Upload File
  (PDF, DOCX, TXT; 25 MiB), Add Website ("one public page or select pages from a site"; "does not
  refresh automatically"), Import External (LivePro). Sources can be Active/Inactive; Call Details shows
  "Referenced Knowledge Base".
- Business hours: **Time Filter** block with weekly ranges routing to Available/Unavailable; "It does
  not include date-specific exceptions such as holidays." (https://docs.phonely.ai/blocks/flow-control-and-routing/time-filter)
- Transfers (https://docs.phonely.ai/blocks/communication-blocks/transfer-call): cold or warm; multiple
  destinations each with a "Transition Condition"; warm transfer with on-hold chat/music, permission
  question to recipient, failover numbers, IVR/voicemail detection.
- Booking: Google Calendar "Check Availability" (Calendar ID, duration, available times, search period
  default 7 days, default 3 slots offered) and "Create an Appointment" (sends a Google invite)
  (https://docs.phonely.ai/integrations/google-calendar).
- Message taking: the starter flow collects name, number, reason; Email & SMS Notification block.
- Block list: blocked numbers per agent; org-wide do-not-call list (settings overview).

### 4. Phone number
Settings → Numbers holds "Phone numbers and the organization do-not-call list"
(https://docs.phonely.ai/settings/overview). Import of an existing **Twilio** number via API
(paid plan only). Buying a new number, call forwarding from a carrier line, porting: **not found** in
vendor docs. A third-party tutorial (aiindigo.com) says Phonely offers a dedicated number or forwarding
**(third-party, unverified)**.

### 5. After each call
- Email & SMS Notification block: email gets "A call report with the summary, call details,
  transcript, and a link to the call"; SMS gets "the caller number, call summary, and a link to the
  call". "Phonely controls the notification content." (https://docs.phonely.ai/blocks/communication-blocks/email-sms-notification)
- Call History: transcript, recording audio, highlights (summary, sentiment, topics, outcome,
  actions), block execution (https://docs.phonely.ai/call-history/overview). Recording can be uploaded
  to Google Drive (integration list).
- Recording is a per-agent setting: `is_recording_enabled`, `is_transfer_recorded`, `is_hipaa_enabled`
  (https://docs.phonely.ai/api-reference/v1/agents/get-settings). PII redaction offered (pricing FAQ).
- Retention period: not found in docs.

### 6. Dashboard
Home (Ask AI + call activity), Call History, Performance boards, Data Tables, Call Paths, Topics,
Sentiment, A/B testing, unit-test simulations, flow versions (docs index https://docs.phonely.ai/llms.txt).
Team roles: Owner, Admin, Member, Viewer, "Call history only"; "Team invitations require a plan that
supports additional members" (https://docs.phonely.ai/billing-and-usage/teams). Plan & Billing shows
minutes used and remaining (https://docs.phonely.ai/billing-and-usage/plans-and-billing-history).
Multiple agents per organization; multiple organizations per user. Locations as an object: not found.

### 7. Integrations
Google Calendar, Gmail, Google Sheets, Google Drive, Outlook, Slack, Make, Zapier, API Request block,
webhooks, Python Code block, public API v1 (https://docs.phonely.ai/integrations/overview, llms.txt).
"CRM integrations" from Pro (pricing).

### 8. Features
Plan table on https://www.phonely.ai/pricing (Starter / Pro / Enterprise; "yes" = check mark, "no" =
cross on that page):
- Minutes: 250 / 750 / talk to sales; overage $0.25 / $0.30 / $0.25 per min. (Section 1 notes other
  minute and overage figures on other Phonely pages.)
- Agent build: Self-Serve / Priority support / Full Agent Buildout. White-glove buildout, designated
  account manager, external client-facing QA reports, managed integration, custom telephony
  integration, phone payments, HIPAA (BAA signature), PCI compliance: **Enterprise only**.
- Outbound calling, branded caller ID, SIP trunking, A/B testing, "Build Your Own" integrations,
  internal Q/A: **Pro and Enterprise** (no on Starter).
- All plans: premium voices, voice cloning, custom knowledge base, transcript + AI analytics, email +
  SMS notifications, call transfer + routing, unlimited concurrent calls, SOC2 & GDPR.
- Website import: 30 pages/month on Starter; unlimited on Pro and Enterprise.
- AI SMS: "1/5 min" (Starter), "1/10 min" (Pro), custom (Enterprise). Unit meaning not stated.
- Phone numbers: 3 free (Starter), 5 free (Pro), custom (Enterprise).
- Post-transfer rate: $0.02/min (Starter and Pro).
- Support: email only / priority email / Slack + Teams + phone.
Feature pages (https://www.phonely.ai/features; https://www.phonely.ai/): call history with
recordings, transcripts and outcomes; call analytics dashboard (volumes, outcomes, dispositions, live
actions); warm transfers with context; escalation detection; "Talk Block"; AI workflow builder;
outbound AI SMS during and after calls; outbound AI email; REST APIs and webhooks to CRMs and ticketing
tools; "voice, chat, SMS"; "Respond in any language"; "1,000+ voices"; SOC 2, GDPR, CCPA, HIPAA and
PCI badges. Plan for these: not stated beyond the table above.
- Spam blocking, website chat widget plan, multi-location, white-label: not found.

---

## 3. Trillet (trillet.ai) — small-business product is now the Juney app (juney.ai)

Trillet sells three lines: a small-business receptionist, a white-label agency platform (Studio $99,
Agency $299) and an Enterprise managed service (https://trillet.ai/llms.txt). **The small-business
receptionist has become a phone app, "Juney"**: "Our AI receptionist is now an app: meet Juney"
(https://trillet.ai/receptionist); footer "© 2026 Juney. A Trillet product." (juney.ai). Juney's help
center is the most detailed setup documentation found in this group, so it is described in full.

**Vendor pages contradict each other on the small-business plan.** Trillet's `llms.txt` (says "Last
full audit: July 2026 … reconciliation … 30 September 2026") still describes "Basic $49 / 150
minutes", "$0.20 per minute" overage, "28-day money-back guarantee … not a free trial", calendars
"Cal.com, Google Calendar, GoHighLevel", and setup by "phone number and website URL … The agent goes
live immediately." The current pricing page (https://trillet.ai/pricing) and Juney's pages say
Starter $49 / 200 min, Pro $99 / 800 min, 7-day Pro trial, top-ups 100 min for $20, Google Calendar
only, on Pro. The Juney/pricing-page version is used below.

### 1. Who / sales model / pricing
- For: "the trades and other businesses on the move", US, UK, Australia, Canada; English only with
  Australian, American or British voices (https://juney.ai/llms.txt). Fully self-serve in the app.
  "For your own business, not resale." Enterprise "for several locations or a team … priced with you".
- **Per business (one app account), flat monthly fee with a minute allowance**
  (https://juney.ai/help/settings/juney-starter-and-juney-pro):
  - Starter $49/mo or $490/yr — 200 min/mo; **no free trial**, "you pay from the day you start".
  - Pro $99/mo or $990/yr — 800 min/mo; adds calendar booking, putting urgent calls through, caller
    memory, HIPAA mode, priority support.
  - Free trial: Pro only, "7 days free, with 50 minutes", once per Apple ID/Google account; billing is
    via App Store / Google Play (so the store holds the card).
  - Overage: no per-minute overage. Top-ups "100 minutes for $20", never expire. **"There's no
    automatic top-up: if you run out, Juney stops answering until you top up or your minutes reset."**
  - Calls the owner picks up via "Ring me first", blocked numbers and spam calls don't use minutes.
    Test calls after setup do use minutes; setup demo calls are free (3 max).
- Agency platform: 7-day trial, "Card required. You won't be charged until day 8"
  (https://trillet.ai/pricing).

### 2. Signup and setup flow (https://juney.ai/help/start-here/set-up-juney, updated Nov 8 2026)
"Setup runs as one continuous flow … each screen only leads to the next one." In order:
1. **Create account**: "answer a few quick questions about your business" → **choose plan** (Pro
   trial or pay for Starter, via the app store) → sign in with Apple / Google / email + 6-digit code.
   **Payment/plan choice comes before any business setup.**
2. **Tell Juney about your business**: your first and last name → **"Link your website"** — "Juney
   reads your site … you'll see the business name and address she found, and three check marks for
   what she picked up: hours (only if she found real listed hours), services and prices" → "That's
   mine, continue" or "Search again" / "Enter details manually". No website: Business name + "What I
   should know" free text (min 10 characters). Skippable. → **Pick voice** (country accents; no skip)
   → **Connect Google Calendar** (Pro only, skippable).
3. **Check what she learned** (each prefilled from the website, each skippable): Business name; Hours
   (per day, or closed); Services (name + price; blank = "Custom pricing" and she tells callers you'll
   confirm the price); FAQs (Q&A cards prefilled from the site).
4. **Set greeting**: prefilled, e.g. "Hi, you've reached *your business*, this is Juney, your AI
   assistant. I can book you in, take a message, or answer a quick question. How can I help?"
5. **Hear her in action**: "Demo call" — "a real call with Juney, exactly as a customer would hear
   her", live transcript; limited to 3 free demo calls; skippable.
6. **Switch your line on**: enter business number + carrier → copy/dial the carrier's forwarding
   code → "I've done it" → **Juney "places a quick, silent test call to your business number and checks
   that it reaches her"** (~30 s). Pass = "Call forwarding is on"; owner must tick "I'll switch
   forwarding off if I stop using Juney" before Done. Fail = "Calls aren't reaching us yet"
   (https://juney.ai/help/start-here/switch-your-line-on). Skippable ("I'll do this later").
7. **Excluded contacts** (optional): people Juney never answers for.
8. **Where notes go**: Push and/or Email (prefilled with signup email). "Juney doesn't text you the
   note."
- Time to live: "Get Juney answering your calls, in about five minutes" (https://juney.ai/help/start-here).
- AI answers before setup is finished: the agent can be live with every content screen skipped
  ("Skipping moves straight to voice, and Juney learns nothing about your business yet").
- First-week checklist: "call her yourself, check what she learned, set up your scenarios, set your
  hours and read her first notes" (https://juney.ai/llms.txt → tips-for-a-great-first-week).

### 3. Receptionist configuration ("Juney tab")
- No per-industry template in setup; website read + industry marketing pages; "Scenario examples"
  are ready-made scenarios to copy (emergencies, new jobs/quotes, changed bookings, booking links,
  sales calls, existing customers) (https://juney.ai/help/scenarios/scenario-examples).
- Name is fixed: the agent is "Juney". Voice from the country's accents + speaking speed. Greeting
  word for word, editable.
- **Services & prices**: "Juney only quotes the prices you list here. She never makes one up." Blank
  price → she says you'll confirm (https://juney.ai/help/juney-tab/teach-juney-your-services-and-prices).
- **FAQs**: "Juney says your answer word for word … Anything not on this list becomes a message for
  you instead." (https://juney.ai/help/juney-tab/add-answers-to-common-questions)
- **Scenarios** (https://juney.ai/help/scenarios/how-scenarios-work, set-up-a-scenario): three parts
  — "She picks up" (greeting), "Why they're calling" (reasons, each with example caller phrases), "She
  wraps up". Each reason can have one of each action: Asks them (questions; name is "Always asked"),
  Tells them (word for word), Puts them through (Pro; rings a number, announces caller, asks if
  they'll take it; no answer in 20 s → message), Texts them a link (fixed text template naming the
  business), Uses your calendar (Pro), Takes a message (default). Optional per-reason rule up to 300
  characters. "If nothing matches, she takes a message." Scenarios can also be created by chatting.
- **Hours** (https://juney.ai/help/juney-tab/set-your-business-hours): per-day hours; public
  holidays listed for your country with rule Closed / Normal / Emergencies only / Shorter hours;
  custom days off. Booking only offered inside hours.
- **Answering schedule**: "Juney, always; Juney during business hours; or Juney after hours only";
  when the schedule sends a call to voicemail, callers hear the voicemail greeting
  (https://juney.ai/llms.txt). "Ring me first": the app rings the owner ~15 s first.
- **Booking** (Pro): Google Calendar only; choose which writable calendar; fixed length 15/30/45/60
  or custom 15–240 min; only for scenarios with "Uses your calendar"
  (https://juney.ai/help/juney-tab/choose-what-juney-does-in-your-calendar). Starter texts a booking
  link instead.
- Change by chat: "Open the Chat tab and type what's changed … Small changes save straight away, with
  Undo. Bigger ones, like your hours or Answering schedule, show you a card to confirm first." Chat
  cannot change plan, forwarding, spam detection.
- Spam: Smart spam detection, blocked numbers, "Possible spam?" flag.

### 4. Phone number
**Forwarding only — "Your number doesn't change, and nothing is ported or moved."** Juney assigns a
"Juney number" (Settings → Your line). Carrier-specific codes for iPhone/Android, landline (US/Canada
`*72`), VoIP dashboard; uses **all-calls forwarding** (its blog argues conditional forwarding is "a
poor fit"). Line test by silent test call; "Take a break" = switch forwarding off
(https://juney.ai/help/start-here/switch-your-line-on, https://juney.ai/llms.txt). Porting: not offered.

### 5. After each call
- Note after every call: summary with caller details, transcript, recording (only if on). Push
  notification and/or email ("The full note, the moment she hangs up"); filters by call kind
  (Messages, Bookings, Transfers, Voicemails, Hang-ups, Spam); "Skip short calls" 5–120 s; "Needs you"
  calls always notify. Optional thank-you text to the caller
  (https://juney.ai/help/juney-tab/choose-where-your-call-notes-go).
- **Retention**: "Summaries, transcripts and recordings are kept for as long as you have your account.
  Deleting your account deletes all of them straight away."
  (https://juney.ai/help/settings/call-recordings-transcripts-and-your-privacy)
- **Recording is off by default.** When on, the greeting includes "This call may be recorded for
  quality purposes." by default; owner can change it, "or remove it after a warning"
  (https://juney.ai/help/settings/record-your-calls).
- **HIPAA mode (Pro)**: "Calls then aren't recorded, and no transcript or summary is kept. You'll
  still see who called and when." Applies from the moment it's turned on. Trillet's agency-side HIPAA
  mode: "It stops call recordings and transcripts being stored on Trillet's servers"
  (https://trillet.ai/pricing).
- AI disclosure: "We recommend clearly introducing Juney as your AI assistant" (https://juney.ai/llms.txt).

### 6. Dashboard (the app)
Tabs: Home (whether Juney is answering, minutes left, "Who answers" tile, daily/weekly recap), Calls
(filters Needs you / Voicemail / Test calls; call back), Chat, Juney tab, Settings. One owner login;
team seats and multiple locations: Enterprise only ("For several locations or a team")
(https://juney.ai/llms.txt). Settings are stored on the account, not the phone.

### 7. Integrations
Google Calendar (Pro). No CRM/Zapier on Juney; those are on the agency platform ("CRM integration:
Google Calendar only" for the small-business column, https://trillet.ai/pricing).

### 8. Features
**Juney (the small-business app)**, plan table on https://juney.ai/pricing (Starter $49 / Pro $99 /
Enterprise custom):
- All three plans: answers every call day or night "while you have minutes"; "Rings you first, if you
  want" (~15 s); learns the business from its website; own greeting, voice and scenarios; voicemail and
  after-hours cover; keeps the business number; sends a booking link by text; "A note after every call";
  "Follow-up text after calls" (texts the caller what happens next); change setup by chat; blocked
  numbers (use no minutes); excluded contacts; "Smart spam detection" (owner switches it on; spam it
  ends "uses no minutes", tagged Spam in Calls).
- **Pro and Enterprise only**: books into Google Calendar (and moves/cancels); "Puts urgent calls
  through" to a chosen number; "Remembers your regulars" (caller memory); HIPAA mode ("No recording,
  transcript or summary. Just who called and when"); priority support.
- **Enterprise only**: multiple locations on one account; pooled minutes; routing by location or
  person; teammates with roles and permissions; SSO; white label ("Optional"); CRM and booking
  integrations; learns from uploaded documents; "More languages (on request)"; SLA; data-region choice;
  security review; BAA; dedicated account manager; onboarding with the team; monthly invoicing (not
  through the app stores).
- Add-on: top-ups of 100 minutes for $20, any plan, never expire.
- Languages: English only on Starter and Pro, with Australian, American or British accent voices
  (https://juney.ai/llms.txt).
- Outbound calling, website chat, call analytics: not found for Juney.
**Trillet (the platform, https://trillet.ai/llms.txt)**:
- $49 AI Receptionist: "inbound-only", spam and telemarketer blocking, SMS and email appointment
  confirmations and reminders, SMS follow-up after calls, urgent-call SMS alerts, 52 languages; SMS
  **$0.02 per message** ($0.01 with own Twilio/Telnyx number). Test calls use plan minutes.
- White-label: Studio $99/mo (up to 3 client workspaces, 1,000 min, 3 free numbers, 2,000 workflow
  runs) and Agency $299/mo (unlimited workspaces, 3,000 min, 10 numbers, 10,000 runs, custom domain,
  branded emails, custom minute markup); overage $0.12/min plus telephony from $0.014/min; extra
  numbers $5/mo; outbound calling, campaigns, workflow automation, CRM and field-service integrations,
  HIPAA mode toggle per agent.

---

## 4. Callin.io (callin.io)

**Positioning: a European white-label voice-agent platform, not a US small-business receptionist.**
"Callin.io is a European white-label AI voice agent platform for SMEs, agencies and enterprises …
speech recognition tuned for Italian, Spanish and Portuguese … Operated by Replacing Humans LLC
(Sheridan, Wyoming, USA) with an Italian office" (https://callin.io/llms.txt). The pricing page is a
"Partner Program" page for agencies (https://callin.io/pricing). It is close to the "developer
platform sold per minute" category the brief says to skip; covered briefly because it was assigned.

### 1. Who / sales model / pricing
- Self-serve: "Create your account and access the platform right away. No application, no manual
  review" (https://callin.io/pricing).
- **Per minute, no subscription**: "$0.16 / min", "no monthly fee", "30 free minutes to start",
  "Unlimited clients", "5 concurrent calls"; high-volume custom plan "as low as $0.029 per minute"
  (https://callin.io/pricing, https://callin.io/llms.txt). Card for the free minutes: not found.
- Docs also mention "a monthly plan" with one free Italian number, and outbound calls on Callin numbers
  have a 1-minute minimum (https://support.callin.io/Create-AI-Agent/introduction). Monthly plan
  prices: not found on the pricing page (**the docs and pricing page do not match**: pricing page says
  "no tiers").
- Agencies resell with their own Stripe-billed subscription plans (https://support.callin.io/llms.txt,
  "Subscription Plans").

### 2. Signup and setup flow (https://support.callin.io/Create-AI-Agent/introduction, Create-Agent-Enchanced)
1. Create account (free minutes). 2. **Create agent**: "Start from Scratch" (name + agent stack) or
**"Browse our Templates"**: Industry (16 listed: Retail, Healthcare, Finance, Real Estate, Education,
Hospitality, Automotive, Professional Services, Technology, Government, Food & Beverage,
Manufacturing, Fitness, Legal, Non-Profit, Media) → Use case (per industry) → "Complete your agent":
Agent Name, Agent stack, **Website (optional) — "Callin.io only reads publicly available information
from it to personalize the agent"**, **Main Goal (up to 300 characters)**. Or describe the agent to
"Composer", an AI assistant. 3. Add knowledge base (files, web URLs). 4. Connect tools (calendar,
transfer, webhooks). 5. Assign a phone number. 6. Start calling.
- Testing: "Test Call — places a real call with the agent" and "Test AI agent" in the browser.
- Payment order, time to live, answering before setup: not found.

### 3. Receptionist configuration
- Editor tabs: Agent, Workflow, Knowledge Base, Conversation, Analytics, Tools, Call Action, Website
  widget, Advanced. Conversation Prompt template sections "Personality / Environment / Tone" plus
  rules such as "Don't invent answers. If the information is unclear, say so." Greeting Message with
  variables; "Allow Interruptions" — "turn it off" when the greeting carries "a recording disclaimer".
- Voices (ElevenLabs list, cloning); time zone per agent.
- Booking: Google Calendar or Cal.com via "Event Templates" (slot duration, reminders, overlap
  allowed or not, conflict handling, working hours Mon–Fri)
  (https://support.callin.io/Create-AI-Agent/Google-Calendar).
- Transfer: Tools → "Transfer to number" with "Human Transfer Rules"
  (https://support.callin.io/Create-AI-Agent/Call-Transfer).
- Business hours outside booking: not found as a setting. Ticket logging ("Issue & Complaint
  Tracking"), "Smart Opt-Out".

### 4. Phone number (https://support.callin.io/Create-AI-Agent/ConnectNumber)
Three ways: **call forwarding** to a Callin number ("the fastest and simplest way"), **porting**
("only appears for countries that use requests (outside the US and Canada). For the US and Canada,
the window shows the instant purchase instead"), or **BYOC SIP trunk** (Telnyx or any SIP/PBX). Also
import from Twilio.

### 5. After each call
- "Post-Call Summary Email" toggle with recipients/subject/message, summary language, post-call
  webhook (Call Action tab, https://support.callin.io/Create-AI-Agent/Create-Agent-Enchanced).
- **"Record Calls — On by default. Securely stores the transcripts and audio of every call"**; turn
  off "only if it's not compatible with your internal privacy" requirements (same page). Retention
  period: not found. GDPR/CCPA, DPA and SCCs available (https://callin.io/llms.txt).

### 6. Dashboard
Home (Total Usage), AI Agents list (test call, clone), Call History (filters, recording, transcript,
insights, export), Contacts, Campaigns, Tickets. Multiple agents. Seats: not found for direct users;
white-label console manages "customers and team members". Locations: via dynamic variables ("reuse
the same agent for different brands, locations").

### 7. Integrations
Google Calendar, Cal.com, GoHighLevel, Zoho, Zapier (invite-based), Make, n8n, webhooks, REST API,
MCP server (https://support.callin.io/Create-AI-Agent/introduction, https://callin.io/llms.txt).

### 8. Features
One public plan, so no feature gating by tier (https://callin.io/pricing/):
- **Pay-as-you-go ($0.16/min, no monthly fee)**: full white-label branding, custom domain, "White-label
  platform", unlimited clients, BYOC, CRM & workflow integrations, Zapier/n8n, "Neuron 1.0 + 10 more AI
  models", "7+ language support", **5 concurrent calls**, 30 free minutes.
- **Custom plan (sales)**: rates "as low as $0.029 per minute", more concurrent calls, expanded client
  capacity, advanced white-label configuration, custom integrations, priority support, custom SLA,
  dedicated onboarding.
- Languages: Italian, Spanish, Portuguese, English, French, German, Dutch, Hindi
  (https://callin.io/llms.txt); pricing page says "7+" (eight are listed in llms.txt).
- Outbound calls: contacts (manual or CSV) and outbound **Campaigns** with scheduling and "Campaigns
  Analytics" (https://support.callin.io/llms.txt).
- Call history with filter, export, recording, transcript and "insights"; audio download
  (https://support.callin.io/Create-AI-Agent/Call-Actions.md, listed in docs index).
- Tools (webhooks during a call), Actions (calendar, CRM, automation), Google Calendar booking, call
  transfer, Composer (AI assistant that builds, tests and fixes agents) (docs index).
- REST API, OpenAPI spec, read-only MCP server (https://callin.io/llms.txt).
- White-label app settings: name, domain, currency, language, server location, legal pages,
  minutes-warning email, own Stripe, "voice/SMS, email, live chat" integrations, UTM signup analytics
  (docs index).
- SMS to callers, spam blocking, website chat widget for the agent: not found.

---

## 5. Marlie AI (marlie.ai)

### 1. Who / sales model / pricing
- "a 24/7 AI phone agent for small service businesses … owner-run service businesses in 40
  industries" (https://marlie.ai/llms.txt). Self-serve signup with optional human help: free setup
  call, or "have the team build your agent with you (from $250 one-time, included with Premium)".
- **Per business, tiered by minutes AND by capabilities** (https://www.marlie.ai/pricing):
  - Basic $49/mo — 250 min, then $0.35/min. Messages with custom questions; "Sends text links to
    callers (1 action per call)"; "Email & SMS reports after each call, to 2 notification channels";
    "No call transfer", "No custom data fields", "No doc uploads".
  - Standard $99/mo — 500 min, then $0.35/min. Calendar booking, availability, reschedule; "Transfer
    calls to your team (1 number)"; 4 notification channels; up to 3 actions per call.
  - Pro $199/mo — 1,000 min, then $0.30/min. Checkout links (Shopify & Square); transfers by
    person/department; cancel bookings; up to 10 custom extraction fields; doc uploads/knowledge base;
    8 channels; unlimited actions; priority support (2-hour response).
  - Premium $399/mo — 2,000 min, then $0.25/min. "Ring your team one at a time — staff hear who's
    calling and accept by pressing 1"; "Multi-location and franchise setups, arranged for you by our
    team"; "Extra AI phone numbers, set up for you on request"; "Route call reports by what happened";
    unlimited channels; 25 custom fields; dedicated account manager; white-glove onboarding.
  - Enterprise: custom.
  - "Notification channels (emails or phones that get your call reports)" is a priced dimension.
- **Trial: 14 days, card required**: "Eligible new customers get 14 days free. Add a card at Stripe
  checkout; $0 is due today. Your first real phone test is available minutes later, and you can cancel
  before the first charge." (https://www.marlie.ai/faq). **Contradiction**: the same FAQ page footer
  and homepage also say "Try it for 2 weeks risk-free with our money-back guarantee"
  (https://www.marlie.ai/faq, https://www.marlie.ai/).

### 2. Signup and setup flow
- Homepage "Step 1 of 3 Create a free account — Eligible new customers add a card at checkout with $0
  due today. Step 2 of 3 Train your agent — Paste your website URL or Google Business listing. Marlie
  reads it and builds your custom AI receptionist automatically. Step 3 of 3 Forward your number —
  Marlie comes with its own phone number." (https://www.marlie.ai/)
- **Card is taken at step 1, before the agent is built.**
- FAQ: "We pull in your company-specific data from your website and Google Business profile … Our
  guided setup process helps you through a few quick settings and a test call, then you're ready to go
  live" (https://www.marlie.ai/faq).
- Time to live — **vendor contradicts itself**: "Most customers go from signup to a live AI
  receptionist in under 10 minutes" vs "Create your receptionist in 15 minutes"
  (https://www.marlie.ai/). Third-party reviews also report "intake questions" and a "guided test
  call" step (CloudTalk / others, **third-party**).
- Changes after setup: "Change your agent by typing a sentence to the AI Assistant in your dashboard.
  You approve each change." (https://marlie.ai/llms.txt)
- A help center with screen-by-screen steps: not found (only a prompting guide and API docs).

### 3. Receptionist configuration
- "Custom agent name, greeting, and personality"; voice choice and voice cloning ("train Marlie AI
  directly on your voice") (https://www.marlie.ai/pricing, /faq). Industry-specific "Basic post-call
  summaries for your industry".
- Prompt structure (https://www.marlie.ai/docs/prompting-guide): Personality, Environment, **Business
  Details** (location & service area, hours & after-hours protocols, "Pricing Structure … quote
  directly vs. callback", response times, special protocols), Tone, Goal, **Guardrails** (template:
  "Never quote prices (technician will discuss)", "One question per turn", "Keep calls under 2
  minutes"), Tools (`end_call`, `transfer_to_number`).
- Message taking "with your custom questions"; "Situation messages — extra texts your agent picks for
  specific situations" (Standard+); FAQs "Custom FAQs with always-on answers".
- Booking: Google Calendar, Outlook, Calendly, plus Housecall Pro, Jobber, Square, Shopify, HubSpot
  (https://marlie.ai/llms.txt). Appointment types/lengths: not found.
- Transfers gated by plan (none → 1 number → departments → sequential ring with press-1 accept).
- Bilingual English/Spanish answering (llms.txt solutions list).

### 4. Phone number
"We'll create a dedicated phone number for you when you sign up. Then you simply forward calls to your
Marlie AI number" — "No, you keep your existing phone setup"; no porting
(https://www.marlie.ai/faq). Conditional forwarding so "your phone rings first"; Google Voice and
OpenPhone forwarding guides (https://marlie.ai/llms.txt). "Choose your area code and caller ID
preferences" (pricing).

### 5. After each call
- "Call reports by email and text, with summaries and transcripts" to N notification channels by plan
  (https://www.marlie.ai/pricing). Custom extraction fields (Pro+), report routing by outcome
  (Premium).
- Recording — **the FAQ contradicts itself**: "Yes, all calls are recorded, transcribed, and securely
  stored" and "You have complete control over this feature and can opt in or out"
  (https://www.marlie.ai/faq). Consent: "with full transparency and consent in line with privacy laws"
  (same). How disclosure is done: not found. Retention period: not found; "Advanced compliance and
  call retention controls" listed under "What teams are asking for" (pricing page), i.e. not offered.

### 6. Dashboard
Call history with recordings, transcripts, downloads; AI Assistant to edit the agent by sentence with
approval; call intelligence analytics. Seats: not found. Multi-location: Premium, "arranged for you by
our team" (pricing).

### 7. Integrations
Google Calendar, Outlook, Calendly, Housecall Pro, Jobber, Square, Shopify, HubSpot, "8,000+ apps
through Zapier", public API (https://marlie.ai/llms.txt).

### 8. Features
Plan table on https://marlie.ai/pricing (Basic $49 / Standard $99 / Pro $199 / Premium $399; Enterprise
custom):
- **All plans**: AI answers 24/7 with simultaneous calls; custom message questions; "Screens out spam
  and robocalls"; sends text links to callers; basic industry post-call summaries; email and SMS call
  reports with summaries and transcripts; custom agent name, greeting, personality; custom FAQs;
  "Choose your area code and caller ID preferences"; "8,000+ integrations" (via Zapier).
- **Plan limits**: actions per call 1 / 3 / unlimited / unlimited; notification channels (emails or
  phones that get reports) 2 / 4 / 8 / unlimited; custom extraction fields none / none / 10 / 25.
- **Standard and up**: calendar booking, availability check, rescheduling; transfer to one team number;
  "Situation messages" (extra texts the agent picks).
- **Pro and up**: transfer to different people and departments (unlimited numbers); text secure
  checkout links (Shopify, Square; "more payment options in beta, on request"); list products and
  services; cancel bookings; custom post-call extraction; training-doc uploads and knowledge base;
  priority support (2-hour response).
- **Premium only**: ring the team one at a time ("staff hear who's calling and accept by pressing 1");
  multi-location and franchise setups "arranged for you by our team"; extra AI phone numbers on
  request; route call reports by outcome; custom CRM integrations; dedicated account manager and
  tuning sessions; white-glove onboarding.
- **Add-on**: agent built with the team "from $250 one-time, included with Premium"
  (https://marlie.ai/llms.txt).
- Solution pages with no plan stated (https://marlie.ai/llms.txt): bilingual English and Spanish
  answering; call recording and transcripts; call analytics ("Call intelligence"); text and email
  follow-up to callers; website lead answering ("24-7-website-chat"); 800-number answering; outbound
  call-backs; outbound sales and support calls; AI SDR.
- Enterprise: custom minute packages, unlimited locations, emergency and after-hours escalation
  workflows; "Advanced compliance and call retention controls" is listed under "What teams are asking
  for", not as a current feature (pricing page).
- White-label: not found.

---

## 6. Newo.ai (newo.ai)

Sold both direct ("Enter your website and Newo builds an agent that already knows your business",
https://newo.ai/) and through partners/agencies; most help-center setup articles are written for
partners creating an "AI Employee" for a customer.

### 1. Who / sales model / pricing (https://newo.ai/pricing; https://help.newo.ai/en/articles/13786146-billing-process-guide-for-partners)
- Industries: restaurants, dental, healthcare, home services, fitness, hospitality, contact centers.
- **Per agent per location, billed in "units" (≈ per conversation), not minutes**:
  - Pay As You Go $0/mo — "50 free units, once per new account"; then $1.75/unit; "No payment method
    to start".
  - AI Receptionist $299/mo — 200 units/month; then $1.50/unit.
  - Enterprise — custom; adds white-label, "Director Mode", custom reporting.
  - Unit: "Voice session, 30 seconds to 3 minutes = 1 unit"; ≤30 s = 0.2; longer calls "Billed in
    3-minute increments"; text session up to 15 agent messages = 0.5. "Spam disconnected within 30
    seconds, immediate hang-ups, and calls that never connect cost nothing." Units don't roll over.
  - "No setup costs", monthly billing, "cancellation effective immediately". "There are no annual
    plans" (billing guide) vs "Lower effective rates come only from an annual commitment" (pricing FAQ)
    — **vendor contradicts itself**.
- **Location rule contradicts itself on the same page**: the comparison table shows "Multi-location
  management ✓ Included" on every plan, while the FAQ says "A plan covers one agent at one location
  and cannot be split across agents or locations. Multi-location businesses are handled on Enterprise."
- Card: not needed to start; "a card is requested before the first billable unit" (billing guide).

### 2. Signup and setup flow (https://help.newo.ai/en/articles/12061900-create-an-ai-employee-for-a-new-customer-using-the-agent-creator)
1. **Agent Creator**: choose **Website** or **Google Maps** → enter the site or pick the business from
   Maps suggestions → "Train your AI". Cards appear for "name, address, opening hours, FAQs, and
   products and services. It also suggests a name and greeting for the AI Employee." Takes "a few
   minutes"; "Some websites block automated reading … Expect some gaps."
2. **Account form** (while training continues): Customer Full Name, Customer Emails, Customer Phone,
   accept Terms; (partner fields: AI phone country — Australia, Canada, Netherlands, UK, US — partner
   IDs, promo code). "Create and Continue".
3. **Optional call from "Adrian, the AI supervisor"** who "call[s] the number shown and help[s] you
   finish setting up" — or Skip.
4. **"Test your AI"** screen shows the AI Employee's own phone number, name and position → call it
   from your phone.
5. The result is "a **pre-production** AI Employee. It works, but it only knows what it found online.
   Review its details and add what's missing before it takes real customer calls."
6. After creation: "The new account has no payment method yet. To take the AI Employee live: Activate
   the account" (add payment method or send a payment link) → fill essential attributes (or "Vibe
   Mode" plain-language edits) → add chat widget → forward the business's calls.
- **Payment comes after the agent exists and has been test-called**; the billing page shows a
  "Temporary account" notice "warning that the account will be suspended if no subscription is chosen".
- Industry is detected at creation and is permanent: "The industry determines built-in conversation
  intelligence and scenario templates … do not change it … you must create a new AI Employee"
  (https://help.newo.ai/en/articles/15261692-configure-essential-attributes-for-your-ai-employee).

### 3. Receptionist configuration (essential attributes article above)
- Per-industry templates ("Industry Playbooks": restaurant, dental, beauty, hospitality, sales,
  catering, cleaning, home services, technology), each with extra attributes (e.g. home services:
  "ZIP codes served").
- Attributes: working hours (+ holidays), time zone, industry (locked), inbound greeting phrase,
  manager email (gets "leads, booking requests, call reports"), transfer enabled, **separate transfer
  numbers for working hours and non-working hours**, transfer criteria, per-scenario transfer numbers,
  in-session email/SMS with "allowed content" lists, calendar integration (disabled / Cal.com /
  Google), session-ended reports (content, criteria, routing).
- **Limits on promises**: "Explicit Constraint - Providing Prices" attribute, e.g. "Never provide exact
  pricing. Always let the customer know that a team member will confirm the final price." Note: it
  "does not restrict the AI Employee from mentioning prices entirely"
  (https://help.newo.ai/en/articles/14034684-configure-pricing-disclosure-behavior).
- Knowledge: "Active Knowledge Base" topics; append text or website text to RAG knowledge base.
- Bypass mode: a "bypass phone number" takes calls directly when the AI is bypassed.

### 4. Phone number
Each AI Employee gets its own number at creation (Twilio or Telnyx on Newo's account; or connect your
own SIP/Twilio/Telnyx). **Forwarding guide uses delayed (no-answer) forwarding**: "Your phone rings
twice (≈ 10 seconds) … The AI Employee answers on the third ring"; GSM `**61*number**10#`; Verizon
`*72` immediate or delayed via My Verizon (https://help.newo.ai/en/articles/13786154-call-forwarding).
Porting: not found.

### 5. After each call
- "Session ended report" by email/SMS to the manager, configurable content and routing
  (https://help.newo.ai/en/articles/14019476-configure-session-ended-reports, referenced).
- Sessions page: Is Lead, Is Opportunity, Lead Value, "ASR (Additional Secured Revenue)", agent
  success auto/human assessment, quality score
  (https://help.newo.ai/en/articles/13786200-dashboard-and-session-data-overview).
- HIPAA mode: PII replaced by `[REDACTED]` in reports; "the system automates redaction and deletion
  within the Newo.ai platform", but "does not automatically disconnect external integrations"
  (https://help.newo.ai/en/articles/13786139-hipaa-mode).
- Recording default, retention period, caller disclosure: not found.

### 6. Dashboard
Portal with Billing (states Active → Limited → Blocked → Deleted on failed payment; number released
only at Deleted), Sessions, Conversations, Settings/Attributes; Builder for technical edits.
Roles: Owner, Technical Owner, Account Manager, Viewer; only Owner invites
(https://help.newo.ai/en/articles/13786174-user-roles-and-permissions-members).

### 7. Integrations
Google Calendar, Cal.com, Calendly, GoHighLevel, Housecall Pro, Zoho CRM, Pipedrive, Yelp, Kommo,
Google Sheets, ManyChat/WhatsApp (help.newo.ai/llms.txt "Integrations", 40 articles).

### 8. Features
Plan comparison on https://newo.ai/pricing ("Same capabilities on every plan. The difference is
volume", then a table that does differ):
- **All plans (Pay As You Go $0, AI Receptionist $299/mo, Enterprise)**: inbound calling; web chat and
  social messaging; phone forwarding and call routing; multi-language support; integrations and
  reporting; "Multi-location management" (**contradicted** in the same page's FAQ: "A plan covers one
  agent at one location … Multi-location businesses are handled on Enterprise"); cross-channel memory;
  "Vibe Mode training".
- **Outbound calling**: not on Pay As You Go; included on AI Receptionist and Enterprise, but "*
  Outbound calling is not available by default. Contact Support to enable this feature."
- **Enterprise only**: white-label, "Director Mode", custom reporting.
- **Spam**: "Spam disconnected within 30 seconds, immediate hang-ups, and calls that never connect cost
  nothing."
- **Units** (one shared voice-and-text balance): voice session 30 s–3 min = 1 unit; ≤30 s or voicemail
  = 0.2; longer calls in 3-minute increments; text session up to 15 agent messages = 0.5 unit.
- Product menu items (same page's navigation): Inbound Voice Calls, Outbound Voice & SMS, Instant
  Callback, Lead Nurturing Agent, AI Call Center, SMS AI Agent, AI Chat Widget; Partner Program and
  White Label. Plans for each: only as in the table above.
- HIPAA redaction mode (section 5). Add-ons with prices: not found beyond per-unit overage.

---

## 7. Allo (withallo.com)

**A per-seat business phone system (in the Quo/OpenPhone, Aircall category) with an AI receptionist
add-on**, not a standalone receptionist. "Allo is a business phone system for teams under 250
people … Priced per seat" (https://www.withallo.com/allo-pricing.md).

### 1. Who / sales model / pricing (https://www.withallo.com/allo-pricing.md, generated 2026-11-19)
- Self-serve for Business; Ultra via sales; Solo "Not open to online sign-up yet".
- **Per seat per month**, each seat includes a number: Solo $10 yearly / $15 monthly (1 seat);
  Business $32 / $45; Ultra $100 / $120.
- **AI Receptionist add-on: "The price of a Business seat per agent ($32 … a month, billed yearly)"**,
  one agent per line (https://www.withallo.com/help/features/ai-receptionist). Minutes-based limits
  for the receptionist: not found.
- Extra number from $5/mo; Power Dialer $50/mo per team; HIPAA BAA $50/mo per workspace; SMS credits
  $5/seat/mo; 10DLC registration $24 one-time.
- **Trial: 3 days on Business, card required** — "Phone service is a regulated industry: asking for a
  valid card at signup is one of the ways we verify that accounts are authentic"; trial limits: no
  international calls, low SMS volume, outbound capped at 100 min per number per 24 h
  (https://www.withallo.com/help/billing/free-trial).
- **Vendor pages contradict each other**: the help article "Solo User" lists "Starter - $16/month
  (billed annually)" and "Business - $45/month" (https://www.withallo.com/help/get-started/solo-user),
  while the pricing file lists Solo $10/$15 and Business $32/$45; the recordings article says
  "Available on both Starter and Business plans" — a plan name the pricing file doesn't use.

### 2. Signup and setup flow
- Account: choose plan → create account (email, phone, Google or Apple) → **choose a business number**
  (US, Canada, France, UK, "50+ other countries on demand") → grant mic/notification permissions →
  make first call (https://www.withallo.com/help/get-started/solo-user). Card at signup (trial page).
- **Receptionist guided setup** (Agents → Set up; "Your progress saves as you go")
  (https://www.withallo.com/help/features/ai-receptionist):
  1. Name your agent. 2. Personality: voice (language then voice), tone (Friendly / Professional /
  Enthusiastic), answer length (Concise / Standard / Detailed). 3. **Pick its job — pre-built
  agents**: AI Receptionist, Customer support, Lead qualifier, Appointment setter, or blank. 4. Turn
  on tools: Answer questions, Transfer to a human, Book meetings. 5. **"Things to find out"**: starts
  with full name, reason for calling, best callback time; each question "Must get before hanging up"
  or "If it comes up". 6. Knowledge: websites, files (PDF/TXT, up to 3 files, 5 MB each), extra
  context. 7. Greeting and closing (playable in the agent's voice). 8. **When it picks up**: "Only
  missed calls (suggested)", "Every call", "Business hours only". 9. **Review its job** in four
  sections: "What should your agent do? / Who should your agent be? / How should your agent behave? /
  What shouldn't your agent do?" 10. **Test call from your computer, then "Go live"**.
- The receptionist is not live until "Go live" is clicked; "Unpublish" reverts to voicemail or external
  transfer.

### 3. Receptionist configuration
- Templates: four pre-built jobs (above). Name, voice, tone, answer length, greeting/closing.
  Languages: English (US/UK) and French only.
- Limits: the "What shouldn't your agent do?" section of the job.
- Transfer rules: "Transfer to" (teammate, inbox or external number) + "When" in plain language +
  optional message; warm transfer (beta) announces name and reason and connects only if accepted.
- Booking: Google Calendar (duration, default 30 min), Cal.com (event type), Calendly; rules for
  booking hours, blocked dates, buffer, minimum notice, how far out; one calendar per agent.
- Business hours: a "Business hours" step in the line's call flow
  (https://www.withallo.com/help/features/business-hours).
- "Missed callback reminders": emails the team if a promised callback hasn't happened by the time
  the caller asked for.

### 4. Phone number
New number per seat; free porting "in a few business days"
(https://www.withallo.com/help/phone-numbers/port-existing-number); or forward an existing number to
Allo (https://www.withallo.com/help/phone-numbers/connect-personal-number); in US/Canada outbound
calls show the personal number (caller ID masking).

### 5. After each call
- Calls tab with "AI Receptionist" filter: Summary, Transcript, **Recording**, collected details,
  suggested actions (help article above). Webhook `call.completed` includes summary and transcript.
- "Every call made through Allo is automatically recorded, transcribed, and summarized"
  (https://www.withallo.com/help/features/call-recordings). Solo plan: "30-day history" for summaries
  and transcripts; Business/Ultra "Unlimited" (pricing file). Other retention: not found.
- **Consent**: the owner adds a "Play announcement" step first in the call flow, e.g. "This call is
  recorded for quality and training purposes"; inbound only. **Privacy mode** ("Audio recording file
  (never stored)", transcript and summary kept) is enabled by contacting support, per line/user/org
  (https://www.withallo.com/help/features/call-recording-compliance).

### 6. Dashboard
Web, desktop and mobile apps; shared inbox, notes, @mentions, analytics, leaderboards; per-seat team
roles; multiple lines each with its own agent. Locations: not a concept found.

### 7. Integrations
HubSpot, Salesforce, Pipedrive, Attio, GoHighLevel, Jobber, JobNimbus, Follow Up Boss, Front,
Notion, Zapier, Make, REST API, webhooks, MCP; calendars Google/Cal.com/Calendly
(https://www.withallo.com/help/llms.txt).

### 8. Features
Full by-plan table at https://www.withallo.com/allo-pricing.md (Solo / Business / Ultra, per seat):
- **AI Receptionist is an add-on on every plan**: "The price of a Business seat per agent ($32 … a month,
  billed yearly)". Answers 24/7 "simultaneously across the team", books into the calendar, transfers,
  writes the call into the CRM; voices by ElevenLabs; English, French and Spanish "including", summary
  in the caller's language (https://www.withallo.com/product/ai-receptionist).
- **Spam**: "Basic spam filtering and Do Not Disturb are on every plan. Screening by the AI receptionist
  is an add-on" ($32) (https://www.withallo.com/product/spam-call-blocker).
- All plans: business number (1 per seat), free porting, mobile/desktop/web apps, unlimited national
  calls, **call recording**, IVR menus, business hours, busy mode/DND, call routing, voicemail,
  unlimited inbound SMS, **missed-call text-back**, internal CRM, native CRM sync (Attio, Folk, HubSpot,
  Odoo, Pipedrive, Salesforce, Sellsy, Streak, Zoho), 99.94% uptime, AES-256, GDPR.
- Solo limits: AI summaries and transcripts "30-day history" (unlimited on Business and Ultra); no
  outbound SMS, no API/webhooks, no Zapier/Make, no call analytics.
- **Business and Ultra**: outbound SMS ($5/mo/seat credit; US sending included); AI summary templates
  and custom templates; AI call tags synced to CRM; AI post-call actions; "Ask AI about your calls";
  Allo MCP server; call analytics and leaderboards; public API and webhooks; Zapier, Make and 1,000+
  apps; live chat support; account manager and custom onboarding from 5 seats (Business).
- **Ultra only**: parallel dialer; AI SDR, support agent, lead qualifier, CRM manager, sales coach,
  data analyst and "Create your own AI agent" (all "in beta"); custom analytics dashboards; custom AI
  voice for the IVR; Slack support; SLA; granular admin controls.
- **Add-ons**: Power Dialer $50/mo per team (Business, Ultra); extra phone number from $5/mo; HIPAA BAA
  $50/mo per workspace (Business, Ultra); A2P 10DLC registration $24 one-time; international calling
  pay-as-you-go.
- White-label, website chat widget, multi-location: not found.

---

## 8. Lindy (lindy.ai) — phone line of a general "AI employee"

**Lindy is no longer a receptionist product**; it is "an AI employee for your whole team … Teams work
with Lindy in Slack, iMessage, email and the browser" (https://www.lindy.ai/llms.txt). Receptionist
work is one "job" (https://www.lindy.ai/hire/receptionist), and the phone feature is a personal
assistant line with an option to answer other callers (https://docs.lindy.ai/features/phone-line).

### 1. Who / sales model / pricing (https://www.lindy.ai/pricing)
- Self-serve. **Per user (seat) per month, plus a shared credit pool**: "Every active user in your
  workspace is billed, from $49.99 a month for 5,000 credits each." Credit tiers from 5,000 ($49.99)
  to 1,750,000 ($9,999.50); top-up "$10 per 1,000 credits".
- **Same page, read again later on 2026-11-19, showed different prices**: "Team … $29.99 /mo 3,000
  credits / mo" and "Every active user in your workspace is billed, from $29.99 a month for 3,000
  credits each" (credit tiers 3,000 for $29.99 up to 1,750,000 for $9,999.50). The two readings
  contradict; which is current is not established.
- Phone: "Phone calls — From 25 credits per minute"; "Your Lindy's phone number itself is a separate
  monthly fee, billed with your plan" (https://docs.lindy.ai/account-billing/usage). Number fee
  amount: not found ("Check the current details in the app"). "A paid plan is required" for a number.
- Free: "$50 in credits for free", "Free credits last 7 days", "no credit card required"
  (https://www.lindy.ai/llms.txt, pricing). Enterprise adds HIPAA BAA, SSO.
- When credits run out: "Lindy pauses credit-using actions until your credits reset."

### 2. Signup and setup flow
- Quickstart: "Get Lindy into your team's Slack, then connect your own email, calendar, and phone. Two
  minutes." (https://docs.lindy.ai/llms.txt)
- Phone line (https://docs.lindy.ai/features/phone-line): 1. Verify your personal number (Settings →
  General). 2. Settings → Phone numbers → "Get a number", US or Canadian area code. 3. Call the Lindy
  number from your verified phone. Then "When others call": Instructions (how it introduces itself,
  what to ask, "what it may share"), Messages, Book meetings (select an active booking link).
- Setup is by briefing in plain English ("Brief it like a new hire"), not forms
  (https://www.lindy.ai/hire/receptionist). Business-info gathering from website/GBP: not found.

### 3. Receptionist configuration
- Free-text instructions; voice dropdown with samples; booking through a Lindy booking link.
- **Approval boundaries shown as a "typical setup"** (https://www.lindy.ai/hire/receptionist): "On its
  own: Answer calls and common questions; Book into the slots you open; Text confirmations and intake
  forms; Follow up on open quotes. Checks with you first: Quote a price that isn't on your list; Take a
  job outside your service area; Handle a complaint or an urgent problem; Anything a caller asks you for
  by name." "Answers from your info. Anything else becomes a message for you." Generally "Anything with
  outside impact waits for approval" (pricing FAQ).
- Business hours, transfers to staff: not found for the phone line. "Regional, usage, and
  calling-hours limits apply" (phone-line doc). Outside callers "cannot access your inbox, files,
  memory, or private conversations."

### 4. Phone number
New US/Canada number only. Forwarding from an existing business line or porting: not found. "Only I
can call", PIN, blocked numbers, Active switch (pausing does not stop the number fee).

### 5. After each call
"Calls are recorded, and you can review the associated chat or task afterward"; reports in chat /
Slack (phone-line doc). Retention, disclosure: not found. "Your data is … never used to train models"
(pricing FAQ).

### 6. Dashboard
Slack threads, iMessage, web app; seats managed by admins with per-seat credit allocations.

### 7. Integrations
"3,000+ integrations + MCP"; receptionist page shows Google Calendar, Calendly, HubSpot, Stripe, Gmail.

### 8. Features
Plans on https://www.lindy.ai/pricing (second reading, 2026-11-19): Free ($50 credits, 7 days) / Team
(from $29.99 per active user per month) / Enterprise (custom).
- **Team** adds to Free: monthly credits pooled across the team; top-ups at $10 per 1,000 credits;
  model choice per task; "Text Lindy anytime over iMessage"; "Computer use"; live onboarding.
- **Enterprise** adds: HIPAA compliance and signed BAA; SSO and SCIM; audit logs; shared usage and bonus
  credits; dedicated support.
- "Everything included" list (same page): Slack-native teammate; scheduled routines; workspace memory;
  40+ skills; meeting recording, notes and scheduling; inbox management and reply drafts ("Connect 2 to
  5 inboxes, depending on plan"); team files; "Computer use on Pro and Max" (**contradicts** the plan
  names Free/Team/Enterprise on the same page); 3,000+ integrations; MCP; approvals built in.
- **Phone line** (https://docs.lindy.ai/features/phone-line; https://docs.lindy.ai/account-billing/usage):
  US/Canada number (separate monthly fee, amount not found), calls "From 25 credits per minute",
  answering other callers, taking messages, booking through a Lindy booking link, call recording,
  blocked numbers, "Only I can call" with PIN. Receptionist job page lists texting confirmations and
  intake forms and following up on open quotes (https://www.lindy.ai/hire/receptionist).
- Spam blocking (beyond a manual blocked list), languages for calls, transfers to staff, website chat,
  multi-location, white-label, call analytics: not found.

---

## 9. Sophiie (sophiie.ai)

"an Australian AI receptionist and AI operating system built for trade and service businesses …
operates in Australia, New Zealand, the United Kingdom and the United States"
(https://www.sophiie.ai/llms.txt). Product bundles receptionist with quoting, invoicing, scheduling,
CRM, email responder, chatbot.

### 1. Who / sales model / pricing
- **Sales-led**: "Sophiie does not publish plan prices. Pricing is given on a demo call. Do not quote a
  price." (https://www.sophiie.ai/agents.md). The `/pricing` URL serves the homepage.
- The homepage nevertheless has "Get started" and "No credit card required" next to "Book a demo"
  (https://www.sophiie.ai/) — what "Get started" leads to (sign-in page `app.sophiie.ai/auth/sign-in`)
  and what is free: not found.
- Pricing model (per business/seat/minute): not found. "Phone Scribe needs a Sophiie number, so it is
  available on paid plans" (https://docs.sophiie.ai/docs/guides/how-to-use-phone-scribe).

### 2. Signup and setup flow
- Demo booking: name, business, contact details, industry → "a 30-minute demo, tailored to their
  business" (https://www.sophiie.ai/agents.md). A "Receive a call from Sophiie" form (First/Last name,
  email, phone, business name, industry) places a two-minute live demo call (https://www.sophiie.ai/).
- "Sophiie answers immediately once your call flow is live, then follows the routing and escalation
  rules you approve during onboarding." (https://www.sophiie.ai/solutions/ai-receptionist) — i.e.
  rules are approved in an onboarding with staff. A customer review on the same page: "The onboarding
  process was seamless and within the first day we captured calls after hours".
- Screen-by-screen self-serve setup: not found (docs.sophiie.ai covers integrations, Phone Scribe and
  the API; its "Welcome" guide has no setup steps).

### 3. Receptionist configuration
- "You can tune her tone, scripts, qualifying questions, escalation rules, and the details she
  collects"; "different greetings, FAQs, call routing options"; "specific call handling rules for
  different times of the day"; "Multi-business setups can be configured with separate greetings,
  service rules, and destinations" (https://www.sophiie.ai/solutions/ai-receptionist,
  https://www.sophiie.ai/services/ai-phone-answering).
- Warm or cold transfers to named team members. FAQs object in the API.
- Booking: Google Calendar, Outlook, Apple Calendar, ServiceM8, simPRO, Housecall Pro, Fergus, Ascora;
  API refuses a double-booking of an assigned team member with 409 unless `allowOverlap`
  (https://docs.sophiie.ai/llms.txt).
- Outbound "playbooks" lock "AI disclosure and text consent" from API edits (API reference).
- Limits on promises: not found.

### 4. Phone number
Each organisation gets "an AI assistant on its own phone number" (https://docs.sophiie.ai/llms.txt).
Customers forward to it — missed calls only (your phone rings first) or every call; Phone Scribe
requires forwarding every call. Cancelling forwarding: in-app for Australia; elsewhere "ask your phone
provider" (https://docs.sophiie.ai/docs/guides/how-to-use-phone-scribe). Porting: not found.

### 5. After each call
"Every call logged with transcript, key details, and recording, sent to your dashboard or CRM"
(https://www.sophiie.ai/services/ai-phone-answering). Option "Record the calls Sophiie transfers to
your team?" (Phone Scribe doc). Retention period, recording disclosure for inbound: not found.

### 6. Dashboard
Inquiries inbox with suggested actions, calendar/job board, quotes, invoices; web app and mobile app;
owner/admin roles ("Only an owner or admin can switch Phone Scribe on"); "Phone Scribe" lets staff
answer in the browser with Sophiie as fallback. Multi-business setups supported (FAQ above).

### 7. Integrations
Xero, QuickBooks, Google Calendar, Outlook, Apple Calendar, ServiceM8, simPRO, Housecall Pro, Fergus,
Ascora, Gmail, WhatsApp Business, Zapier, webhooks, REST API (https://www.sophiie.ai/llms.txt,
https://docs.sophiie.ai/llms.txt).

### 8. Features
No plans or prices are published: "Sophiie does not publish plan prices. Pricing is provided on a demo
call" (https://www.sophiie.ai/llms.txt). Tier for every feature below: not found. The homepage shows
"Get started" next to "Book a demo" and "No credit card required" (https://www.sophiie.ai/pricing,
which serves the homepage), alongside the llms.txt statement that a business "books a demo" to start.
- Lead management (site menu, same page): AI Receptionist; AI Phone Scribe ("You talk, she writes it
  up"); Speed to Lead (follow-up); Call Transfers (warm or cold); Email Responder; Chatbot (website).
- "One AI. Four channels": phone, text messaging (replies to customer texts and books), email, website
  chat (https://www.sophiie.ai/solutions/ai-receptionist.md). Multi-business setups with separate
  greetings and destinations (same page).
- Office and admin: bookings and crew scheduling; quoting and estimating; invoices and payments with
  overdue reminders; customer CRM; job management software; "Sophiie AI Agent"; mobile app
  (https://www.sophiie.ai/llms.txt).
- Growth: website ("Coming Q4 26"), Google Business Profile posts and review replies, social media,
  Meta and Google Ads, lead generation (site menu).
- REST API with OpenAPI spec (https://www.sophiie.ai/llms.txt).
- Spam blocking, languages, outbound calling, call analytics, white-label: not found.

---

# Additional products found (not in any assigned list)

## 10. Reception.ai (by ElevenLabs — reception.ai; docs at elevenlabs.io/docs/reception-ai)

"an AI phone receptionist for small and medium businesses. It answers inbound calls in over 70
languages, books appointments, takes orders and messages" (https://elevenlabs.io/docs/reception-ai/overview).

### 1. Who / sales model / pricing (https://elevenlabs.io/docs/reception-ai/billing/plans-and-pricing)
- Self-serve; US medical and dental practices are routed to "Talk to sales".
- **Per workspace, monthly credit pool (1 credit = 1 phone minute), plan limits on numbers, locations,
  seats and concurrency**:
  - Free trial $0, 14 days, 30 credits, 1 number, "No credit card required"; "Trial credits are a hard
    cap: when they run out, your receptionist stops answering until you upgrade."
  - Basic $29/mo ($24 annual) — 75 credits, 1 number, 1 location, 3 team members, 1 concurrent call,
    overage $0.40/min.
  - Plus $79/mo ($66 annual) — 275 credits, 3 numbers, 1 location, 5 members, 3 concurrent, $0.32/min.
  - Premium $199/mo ($166 annual) — 1,000 credits, 5 numbers, 20 locations, 10 members, 10
    concurrent, $0.22/min.
  - Credits: inbound phone 1.0/min, web 0.5/min, "Staff first call" 1.0/min, text 0.1/message.
- Cancellation: numbers released after a 14-day grace period; "Your data is kept in case you
  resubscribe." Failed payment → receptionist paused.

### 2. Signup and setup flow (https://elevenlabs.io/docs/reception-ai/quickstart)
Wizard at app.reception.ai, two paths:
- **"Scan my website" (recommended)**: enter URL (HTTPS) → accept ToS/Privacy → quick scan of "up to
  15 key pages … extracts services, pricing, durations, staff, hours, locations, and contact details",
  usually under a minute (booking/social links such as Yelp, Vagaro, Booksy, Calendly read as one
  page) → wizard asks for country, language or industry only if not detected → **pick phone number**
  (US/Canada 3-digit area code; skipped if the site listed a number with a supported area code) →
  **"Meet your receptionist"**: Agent name, voice, First message, then **talk to it in the browser** →
  **"Start free trial"** + "How did you hear about us?".
- **"Enter information manually"**: country → language → **industry** (salon or barbershop, nail and
  beauty, spa, medical, dental, veterinary, fitness, home services, photography, consulting,
  restaurant, auto service, tutoring, legal, real estate, other) → number → meet receptionist → trial.
- After the wizard: workspace, receptionist and booking page are created; **"US and Canadian
  businesses get a permanent local phone number and the receptionist starts answering immediately."**
  UK numbers wait for regulatory review.
- **No payment step at all before going live** (trial, no card). Home shows "a setup checklist based on
  what was imported" (hours, services, staff, voice/rules, rest of the site, Google Calendar).
- Onboarding progress saved 4 hours; the test receptionist expires 20 minutes after creation.

### 3. Receptionist configuration
- Agent name, voice (thousands; custom/cloned voices paid only, with consent confirmation), greeting
  ("Always finish the first message" for "a required disclosure"), 70+ languages with auto-switching
  only to configured languages, "Additional instructions" up to 8,000 chars ("Generate with AI")
  (https://elevenlabs.io/docs/reception-ai/receptionist/voice-and-personality).
- **Rules and procedures** (https://elevenlabs.io/docs/reception-ai/receptionist/rules-and-procedures):
  Rules apply on every call, up to 50, each **Strict** (default) or **Suggestion**; examples "Never
  provide medical advice", "Never discuss competitor products, pricing". Procedures (up to 20) run on a
  trigger; "Browse ready-made" catalog per business type; default procedures created per industry
  (book, group session, reschedule/cancel, order, take a message).
- Scheduling: services (pricing, durations), staff schedules, locations, hours, closures, time off,
  booking rules; booking page and web widget.
- **Who answers first**: Never (default) / Business hours / Always / Custom hours — staff phone rings
  10–60 s (default 15) with ring music, then the AI takes over with a handover message
  (https://elevenlabs.io/docs/reception-ai/receptionist/call-handling).
- Transfers: up to 100 rules (label, number, "When to transfer" in plain English, optional DTMF
  digits); trial can edit 10 rules/day; warm-style announced transfer only on Twilio numbers.
- Caller verification: "Secure mode" (only reveal client records when caller ID matches), one-time code
  tool, US spam protection (unverified callers press a key).
- Knowledge base: website scraping, file uploads, and an FAQ list built from "questions your
  receptionist couldn't" answer.
- Testing page: https://elevenlabs.io/docs/reception-ai/receptionist/testing (browser test before and
  after changes).

### 4. Phone number (https://elevenlabs.io/docs/reception-ai/phone-numbers/overview, call-handling)
New local US/Canada number "assigned instantly" (no toll-free); ~50 more countries via regulatory
request; bring your own Twilio/SIP; **forward an existing number** with carrier codes shown in-app
(no-answer, busy, unreachable, all calls). Native guides for RingCentral, Quo, Grasshopper, Dialpad,
Zoom Phone, Teams, Google Voice, Aircall, 8x8, Vonage, Nextiva, GoTo, Ooma, 3CX, FreePBX etc.
Porting: not found.

### 5. After each call
- Post-call summary by email (default on, to the owner; up to 10 addresses) or SMS; filter "every
  conversation" or only those with bookings/orders/messages/FAQ questions
  (https://elevenlabs.io/docs/reception-ai/features/notifications).
- Inbox labels each conversation with an intent and priority (incl. "Emergency"); "Needs attention"
  view (https://elevenlabs.io/docs/reception-ai/features/inbox).
- **Call privacy settings** (Settings → Privacy, same page): "Store call recordings — On. When off,
  only the written transcript is kept." "Auto-delete calls after a fixed period — Off. Recordings and
  transcripts stay until you delete them." Days to keep starts at 30; **0 = "Deleted soon after the
  call ends"**; option to apply to past calls. "Your clients, appointments, notes, and interaction
  history are always saved." **Changing privacy settings requires the Premium plan.**
- Caller SMS consent: offered on-call after a booking with "message and data rates may apply … reply
  STOP"; opted in only after the caller agrees. Recording disclosure: only the "Always finish the
  first message" hint; no default disclosure line found.

### 6. Dashboard
Home (status, today's activity, setup checklist), Inbox, Clients (built-in client list), Analytics,
Booking page, Quote requests, Orders, "Business assistant" (manage by chat), Team (3/5/10 seats by
plan), Locations (1/1/20 by plan), up to 10 receptionists per workspace.

### 7. Integrations
Google Calendar, Calendly, Cal.com, HubSpot, Salesforce, HighLevel, Pipedrive, Zoho, Keap, Close,
Follow Up Boss, Freshsales, Zapier (MCP), webhooks, MCP servers (https://elevenlabs.io/docs/reception-ai/llms.txt).

### 8. Features
Plan table at https://elevenlabs.io/docs/reception-ai/billing/plans-and-pricing (Trial / Basic $29 /
Plus $79 / Premium $199):
- Limits by plan: phone numbers 1 / 1 / 3 / 5; **locations 20 / 1 / 1 / 20**; knowledge sources 5 / 5 /
  10 / 20; assistant messages per day 150 / 150 / 300 / 500; **concurrent calls 1 / 1 / 3 / 10**;
  receptionists 10 on all; team members 3 / 3 / 5 / 10; custom voices — / 1 / 3 / 5 (not in trial)
  (https://elevenlabs.io/docs/reception-ai/receptionist/voice-and-personality).
- **All plans**: Zapier, webhooks and MCP, Google Calendar; "automatic booking, call summaries,
  transcripts, and access to thousands of voices in over 70 languages".
- **Premium only**: privacy settings (recording storage and auto-delete, section 5); transferring to a
  number outside the business's country (or bring your own Twilio number)
  (https://elevenlabs.io/docs/reception-ai/receptionist/call-handling).
- Credits: inbound phone minute 1.0; web widget or booking-page minute 0.5; "Staff first call" minute
  1.0; text message 0.1 per message (plans page).
- **Spam protection** "On for new businesses": unverified numbers are asked to press a key; plus blocked
  numbers and caller verification ("secure mode") (call-handling page).
- **SMS**: confirmations, reminders and updates to clients and staff; **"A Reception.ai number in the
  United States — Can send SMS: No. Connect a Twilio number to send SMS."**
  (https://elevenlabs.io/docs/reception-ai/features/notifications).
- Website: hosted booking page and a **web widget** that puts the receptionist on the business's site
  (https://elevenlabs.io/docs/reception-ai/features/booking-page).
- Other features in the docs index (https://elevenlabs.io/docs/reception-ai/llms.txt), plan not
  stated: inbox; built-in client list ("Clients"); quote requests; orders and shop (pickup/delivery);
  business assistant (chat); analytics (outcomes incl. spam, top topics); staff schedules; locations;
  services with intake questions; FAQ queue; bring-your-own number (Twilio, SIP) and connectors for
  RingCentral, Quo, Grasshopper, Dialpad, Zoom Phone, Teams, Google Voice, Aircall, 8x8, Vonage,
  Nextiva, GoTo, Ooma and others; CRMs (HubSpot, Salesforce, HighLevel, Zoho, Pipedrive, Clio, MyCase
  and more).
- Outbound calling campaigns: not found (only "staff answering first places an outbound call").
  White-label: not found.

---

## 11. SkipCalls (skipcalls.com)

App-first (iPhone/Android) plus web dashboard AI receptionist for service businesses; "4.5 · 15K+
downloads" (https://skipcalls.com/pricing).

### 1. Who / sales model / pricing (https://skipcalls.com/pricing)
- Self-serve. **Per account, flat monthly fee with a call allowance; receptionists and numbers capped
  by plan**:
  - Starter $29.99/mo or $249.99/yr — "200 calls a month (fair usage)", 1 AI agent, 1 number;
    calendar booking, summaries, text follow-ups, transfers and messages.
  - PRO $49.99/mo or $499.99/yr — 350 calls (fair usage), 3 agents, 3 numbers; voice cloning, AI text
    replies, website chat, email receptionist, API/webhooks/CRM, **team accounts**, lead alerts.
  - Business $129/mo or $1,290/yr — 1,000+ minutes, 10 agents, 10 numbers; extra minutes $0.19/min with
    an owner-set monthly spending limit.
  - Enterprise from 1,500 minutes/month, build-your-plan.
- Trial: "7-day free trial on monthly plans · card required"; "Yearly plans are charged at signup";
  plus "30-day money-back guarantee".
- **Vendor contradicts itself on limits**: the pricing page comparison table says "Unlimited Minutes —
  Yes" and the app plan says "Unlimited minutes for AI call answering", while the FAQ says "Are calls
  or minutes unlimited? No. Starter includes up to about 200 answered calls a month"
  (https://help.skipcalls.com/en/articles/13358251-frequently-asked-questions). Spam and very short
  calls don't count.

### 2. Signup and setup flow
- Start: card for trial (monthly) or pay yearly at signup; "You need an active free trial or plan to
  create a receptionist" (https://help.skipcalls.com/en/articles/13278598-how-to-create-your-first-ai-receptionist).
- **Payment comes before the receptionist is created.**
- Three ways to create (same article): **"Set up from your business (recommended)"** — Website URL
  *or* **Google Maps** (business name + city, pick from list) → SkipCalls "learns your services, hours,
  and service area and prepares your business profile and call instructions" → "Answer a few quick
  questions about what the receptionist should help callers with first" (tap a choice or type) → **"Try
  a call right in your browser"**; progress saved. Or "Pick Template" (incoming/outgoing templates), or
  blank.
- Getting-started order (https://help.skipcalls.com/en/articles/12990009-getting-started-with-your-ai-receptionist):
  1 create & personalize (voice, business name, hours, services, call handling); 2 Call Handling /
  Call Tasks + Business Profile + Knowledge Base; 3 connect optional features — **"Only promise actions
  that you have connected and configured"**; 4 connect existing number by carrier-specific forwarding;
  5 test: call the SkipCalls number directly, then call the normal business number from another phone
  and let it ring; review transcript and summary.
- Mobile app: "your first receptionist is created during setup".

### 3. Receptionist configuration
- Settings groups: Identity (name, voice, Active/Inactive), Call Script (greeting, goodbye,
  instructions, call length), Text & SMS, Email, Settings (call sounds, caller language, spam
  protection, **recording notice**), Tools (Knowledge Base), Transfer, Tasks and Scenarios/Skills,
  Booking, Embed, Lead Alert, Data Extraction, Lead Qualify, Testing, History (change log),
  Recognition Boost (names/special words).
- **Call Handling / Call Tasks**: on/off goals in four groups — Collect Information, Understand the
  Call, Take Action, Custom Tasks; "Best effort, not guaranteed"
  (https://help.skipcalls.com/en/articles/15638142-what-your-receptionist-asks-and-does-on-every-call-call-handling).
- Instructions advice: "use clear words like ALWAYS, NEVER, or MUST"; example "don't offer discounts".
- Call scenarios, warm vs cold transfer, multiple appointment types with different durations on one
  calendar, "Answer delay", "Send price estimates to callers", "Run several businesses from one
  account" (agent-setup collection titles, https://help.skipcalls.com/en/collections/17061398-agent-setup).
- **Call routing**: ring up to four of the owner's phones (with schedules) for 10/20/30 s before the AI
  answers (https://help.skipcalls.com/en/articles/17608249-call-routing-ring-your-phones-before-ai-answers).
- Languages: English and Spanish (pricing); multilingual mode replies in caller's language.

### 4. Phone number
SkipCalls number (US/Canada local or toll-free; UK, DE, FR, CH, AT, GR, IL, EE local). **Forwarding
only**: "SkipCalls does not replace your phone number … Most people forward only missed and busy
calls. You can also forward every call" (https://help.skipcalls.com/en/articles/11118013-faq-skipcalls).
Carrier guides (Google Voice, Google Fi, Ooma, Metro, Bell). Porting: not found. "Use your own phone
number for outbound caller ID" (PRO).

### 5. After each call
- Push notification for new calls/messages; email after each call (web notifications settings);
  "Daily Recap"; Lead Alerts call or text the team after important calls; data extraction and lead
  qualification results; follow-up texts to callers (FAQ, collection titles).
- "Recordings and transcripts are stored securely … You can delete individual calls yourself, or
  delete your whole account" (FAQ). Retention period: not found.
- **"Ask for Recording Consent"** setting (Receptionist Settings → Advanced → Call Recording): "your
  receptionist asks the caller for permission before continuing. If the caller does not agree, the
  receptionist will not continue the recorded conversation."
  (https://help.skipcalls.com/en/articles/15585473-ask-for-recording-consent). Owner-answered routed
  calls: "Both people hear a notice before a recorded conversation."

### 6. Dashboard
Mobile app + web (app.skipcalls.com): call history with transcript/recording, customers list,
messages inbox (text, email, web chat), outbound calls/campaigns, team accounts (PRO+), multiple
receptionists and businesses per account.

### 7. Integrations
Calendars (Google etc.; "Calendar Integration"), API, webhooks, CRM integrations on PRO
(https://help.skipcalls.com/en/collections/17061345-integrations — list not read in detail).

### 8. Features
Plans on https://skipcalls.com/pricing (Starter $29.99 / PRO $49.99 / Business $129 / Enterprise):
- **All plans**: dashboard access; 24/7 coverage; calendar booking; call summaries; "Spam filtering";
  **English and Spanish**. Starter also lists "Call summaries & text follow-ups" and "Call transfers &
  messages".
- Agents and numbers: Starter 1 AI agent · 1 number; PRO 3 · 3; Business 10 · 10; Enterprise chosen.
- **PRO and up**: premium voices and voice cloning; "AI text replies"; "Your number as caller ID on
  outgoing calls"; **"Website chat & Email Receptionist"**; "API, webhooks & CRM integrations" (the
  comparison table says "CRM Integration On PRO"); "Team accounts & lead alerts".
- **Business**: 1,000+ minutes; "Optional extra minutes at $0.19/min"; "You set the monthly spending
  limit"; described as "For busy teams and multiple locations".
- Mobile app Starter (iPhone and Android): "Unlimited minutes for AI call answering, spam call
  filtering, instant client notifications" (same page).
- Footer lists a "White Label AI Receptionist" page and a "Partner Program" (same page; not read, tier
  and price not found).
- Call analytics, outbound calling campaigns, multi-location management beyond "multiple locations" on
  Business: not found.

---

## 12. IONOS AI Receptionist (ionos.com, "AI Frontdesk" / Momentum AI)

Sold by the web-hosting company IONOS to small businesses; part of "AI Frontdesk" alongside an AI Chat
Assistant and AI Email Assistant. "IONOS provides the service as a reseller; the service is technically
operated by a technical subcontractor" (data-protection article below).

### 1. Who / sales model / pricing (https://www.ionos.com/momentum/ai-receptionist)
- Self-serve, add to cart. **Per contract (business), priced per call, not per minute**:
  - Flex $39/mo — "30 calls included, then $0.49 per call"; call forwarding "can be assigned one
    contact person".
  - Flex Pro $69/mo — "100 calls included, then $0.39 per call"; outbound follow-up calls, appointment
    scheduling, multiple transfer options.
  - Unlimited $99/mo — "Unlimited calls, no overage charges"; advanced API integrations.
  - "1 month free trial … Get started free, your plan renews monthly. Cancel anytime." FAQ also: "a
    30-day trial period … A dedicated test number is also available". Card for trial: not stated
    (cart checkout implies payment details; **not verified**).
- Third-party guides quote other (UK/Canadian) prices (**third-party**, not used).

### 2. Signup and setup flow
- Buy a contract → Menu → AI Frontdesk → Manage → first-run setup. **IONOS documents two different
  first-run flows, both marked valid for the same product**:
  - **Setup wizard, 4 steps** (https://www.ionos.com/help/ai/ai-frontdesk/getting-started/ai-frontdesk-setting-up-the-assistant-using-the-setup-wizard/):
    1 "Learn website content" (URL → Train, 2–3 min, or "I don't have a website"); 2 "Customize
    greeting"; 3 "Conversation summaries" (email address); 4 "Make a test call" in the browser (free).
    "Initial setup complete … Your AI phone assistant is now ready for use." The wizard cannot be
    reopened.
  - **Chat "Setup Assistant"** (https://www.ionos.com/help/ai/ai-frontdesk/getting-started/getting-started-with-the-ai-receptionist/):
    asks one question at a time with clickable suggested answers: website → company name, **sector**,
    **main goal** → assistant name (default "Rita") → greeting (drafted, confirm) → language and voice
    (the dialog's language becomes the assistant's language) → **take messages or forward calls**
    ("it recommends taking messages: this does not require a second phone number") → optional browser
    test call → "Finish setup" at any time. Each change shows a "Configuration updated" card with old vs
    new values.
- **The AI answers before the owner has decided how calls reach it**: "Your assistant has its own phone
  number and can be reached on this number as soon as the initial setup is complete"; the later "Go
  live" button "is not a technical activation process … Your assistant has been active since the initial
  setup" (https://www.ionos.com/help/ai/ai-frontdesk/availability-and-publishing/ai-frontdesk-routing-calls-to-your-assistant/).
- Payment before setup (contract required first).
- Time: "Up and running in under 15 minutes" (product page).

### 3. Receptionist configuration
- Greeting: **"the greeting must, by law, state that the call is being answered by an AI and refer to
  your privacy policy. The default greeting contains both"** (setup wizard article). (This reads as EU
  law; the help text is shared with IONOS's EU sites.)
- Knowledge from website + manual company knowledge; "Inquiries" = recurring conversation scenarios;
  language, voice, behavior; custom pronunciations.
- Escalated call forwarding to contacts ("Managing escalated call forwarding and contacts").
- Booking: Cal.com, Calendly, Google Calendar, Microsoft 365 (help index
  https://www.ionos.com/help/ai/ai-frontdesk-1/).
- Business hours: not found in the articles read.

### 4. Phone number (routing article above)
Assistant gets its own number at setup. "Go live" dialog: enter existing business number (or "I don't
have a phone number yet") → "Use assistant's own number" or "Forward my existing number" → line type
(Mobile / Landline incl. VoIP or router) → "Forward all calls" or "Forward when unanswered" (ring
duration default 15 s) → generated code `**21*number#` or `**61*number**ring#`. Article on passing the
original caller number through. Porting: not found.

### 5. After each call
- Email summary after every conversation; daily email summary option; call history with subject,
  summary, number, duration (https://www.ionos.com/help/ai/ai-frontdesk/summaries-and-notifications/ai-frontdesk-viewing-call-history/).
- **No recording by design** (https://www.ionos.com/help/ai/ai-frontdesk/privacy-and-legal-information/ai-frontdesk-an-overview-of-data-protection-and-data-processing/):
  "Are calls recorded? No. Calls are not recorded. The caller's consent to being recorded is therefore
  not required. … No audio is stored after the call. All that remains is a text-based summary of the
  conversation, together with the associated metadata." "Call data and transcripts are processed only
  while the call is in progress. They are deleted once the call summary has been sent. Summaries and
  associated metadata are stored for the duration of your active contract." Not used for AI training;
  processing "within the European Union"; staff access to summaries for support is access-logged.

### 6. Dashboard
AI Frontdesk web interface per contract: setup chat (stays available for changes), knowledge, behavior,
inquiries, call history (Today / 7 / 30 / 90 days), summaries; multiple contracts switchable. Seats and
locations: not found.

### 7. Integrations
Cal.com, Calendly, Google Calendar, Microsoft 365, "API integrations" (help index).

### 8. Features
Plans on https://www.ionos.com/momentum/ai-receptionist (Flex $39 / Flex Pro $69 / Unlimited $99):
- **All plans**: call history and email summaries ("number, duration, and content of your calls");
  "Customizable Receptionists" (greeting, language, call routing, responses); "Robust data privacy";
  1-month free trial.
- **Call forwardings to staff** ("Each forwarding can be assigned one contact person"): Flex 1; Flex
  Pro 5; Unlimited "unlimited forwardings to unlimited team members".
- **Flex Pro and Unlimited**: appointment scheduling with calendar integration (Google Calendar,
  Outlook, Cal.com, Calendly). The upsell box also lists "Outbound calls for automatic follow-ups" for
  Flex Pro; it is not repeated in Flex Pro's own feature list.
- **Unlimited only**: unlimited calls with no overage; "Advanced API integration" (e.g. CRM lookups);
  "Website widget — Call button on your website for direct contact with the AI Phone Assistant". The
  Flex Pro upsell box lists "Advanced API integration" as a reason to move to Unlimited, and the FAQ on
  the same page says Flex Pro has "multiple call transfer options" while "Unlimited Plan … plus
  advanced API integrations".
- **Separate products** (same page): AI Chat Assistant (website chat) and AI Email Assistant, prices
  not on this page. "Your personal consultant" and 24/7 phone, chat and email support "Only at IONOS".
- Help-center features (https://www.ionos.com/help/ai/ai-frontdesk-1/): daily summary email, custom
  pronunciations, "Inquiries" scenarios, passing the caller's number through on forwarding.
- No call recording by design (section 5). Spam blocking, SMS, languages list, multi-location,
  multiple numbers, white-label: not found.

---

## 13. Aira (getaira.io)

"an AI-powered phone answering service for small businesses … law firms, real estate agencies, medical
offices, salons, contractors" (https://www.getaira.io/brand-facts). No public help center found;
facts are from marketing pages.

### 1. Who / sales model / pricing
- Self-serve "Get started" plus "Book a consultation"; "Setup and integration support are included"
  (https://www.getaira.io/pricing).
- **Per business, priced per call with a monthly call allowance; seats limited by plan**
  (https://www.getaira.io/brand-facts; pricing page shows annual-billing equivalents):
  - Starter $24.95/mo ($19.96 annual) — 30 calls, 1 user, extra call $1.50.
  - Premium $59.95/mo ($47.96 annual) — 90 calls, 5 users, $1.00/call.
  - Pro $159.95/mo ($127.96 annual) — 300 calls, 20 users, inbound + outbound SMS, $0.75/call.
  - Scale $299/mo ($239.20 annual) — 600 calls, unlimited users, $0.70/call.
  - Add-ons: website build/hosting, "AI Search" (SEO).
- Free trial / card: not found.
- **Vendor pages contradict each other on languages**: "90+ languages" (https://www.getaira.io/llms.txt),
  "74 supported languages" (brand facts, features), "31 Languages supported"
  (https://www.getaira.io/agents/receptionist).

### 2. Signup and setup flow
- Homepage: "Three steps. Ten minutes. Live. 01 Connect your business — Paste your website. Aira reads
  your services, hours, FAQs, and brand voice in seconds. 02 Train and configure — Set intake questions,
  routing rules, and follow-up preferences. 03 Forward your number — Keep your existing number. Aira
  answers when you can't." (https://www.getaira.io/)
- Receptionist page gives a different order: "1 Pick a number or connect yours … 2 Customize your agent
  — Add details about your business, write a custom greeting, and set call handling preferences. 3 Sit
  back" (https://www.getaira.io/agents/receptionist). "10 min Guided setup".
- Test call: "Browser-based test calls" on every plan (https://www.getaira.io/pricing). Payment
  order and whether it answers before setup is finished: not found.

### 3. Receptionist configuration
- Knowledge base topics marked "Auto" (learned from website) or "Manual"
  (https://www.getaira.io/features). Custom greeting, intake questions, "Intent- and
  business-hours-based call routing", "Direct and warm transfers with flexible ring strategies",
  "Custom AI answering schedule", 200+ voices (brand facts, pricing table).
- Booking — **pages differ**: "Aira texts callers your scheduling link during the call" (features) vs
  "Appointment scheduling with calendar sync" (brand facts). Calendars: Google, Outlook, Calendly,
  Clio.
- Built-in CRM and lead pipeline; spam controls. Limits on promises: not found.

### 4. Phone number
"Forward your phone calls to Aira or select a new number with your area code"; free phone number in the
plan table; Google Voice integration (receptionist page, pricing). Porting: not found.

### 5. After each call
"After every conversation, Aira sends you a text and email with exactly what happened: who called, why,
what they need, and the next step. Full recordings and transcripts included." (receptionist page).
Retention, disclosure: not found ("AI Calling Compliance" guide exists at
https://www.getaira.io/resources/ai-calling-compliance, not read).

### 6. Dashboard
Mobile app access, team invitations (Premium+), CRM, call history. Locations: not found.

### 7. Integrations
Google Calendar, Google Voice, Calendly, Outlook, Clio, Shopify, Google Ads, webhooks, Zapier (brand facts).

### 8. Features
Comparison table on https://www.getaira.io/pricing (Starter / Premium / Pro / Scale). Rows with no
dash read as included on all four plans (the page shows icons, read here as text):
- **All plans**: 24/7 answering; custom answering schedule; 74+ languages; 200+ voices; free phone
  number; lead qualification and intake; business knowledge base; call forwarding from an existing
  number; flexible team call routing; direct and warm transfers; call recordings, transcripts and
  summaries; call notifications; inbound messaging (SMS); CRM and lead management; unified call and
  message inbox; appointment booking and management; booking links sent during calls; appointment
  confirmations and reminders; calendar integrations; **spam protection and caller verification**;
  workflow and follow-up automation; AI replies to customer messages; automatic review requests;
  knowledge import; Google Voice integration; "9,000+ app integrations"; setup and integration support;
  **browser-based test calls**; mobile app access.
- **Pro and Scale only**: outbound messaging ("Send text messages after carrier verification").
- **Premium and up**: team invitations and shared access (Starter shows "−"). Users 1 / 5 / 20 /
  unlimited; calls 30 / 90 / 300 / 600.
- **Add-ons** (price not shown, "Add-on"): website design, copy, hosting and updates; "AI Search"
  (SEO and AI-search visibility, "Done for you"). The separate AI SEO Agent is "from $299/mo"
  (https://www.getaira.io/llms.txt).
- "Automation skills when available" and "Automation and direct connections depend on account
  availability" (https://www.getaira.io/brand-facts).
- Brand facts lists Shopify, Google Ads, webhooks and Zapier (same page); "9,000+ app integrations" on
  the pricing table vs "Zapier" elsewhere.
- Outbound calling, website chat, multi-location, white-label: not found.

---

## 14. Alivo (alivo.ai)

"an AI-powered CRM built for home service businesses" with AI agents that answer calls and follow up
(https://help.alivo.ai/readme). Marketing targets roofing contractors. **Fully sales-led, white-glove
setup** — included as the counter-example to self-serve.

### 1. Who / sales model / pricing
- "Book a demo — A 30-minute live walkthrough, built around your lead sources and your CRM"
  (https://www.alivo.ai/pricing serves the demo page). Prices, trial, seat/location model: not found.

### 2. Signup and setup flow (https://help.alivo.ai/getting-started-guide/what-to-expect-during-onboarding)
"from signing up to live in 14 days, and the 90 days of help that follow":
1. **Onboarding form, ~20 minutes** before Call 1: "your CRM and phone details, and the lead sources
   you use"; also "what work you do, what areas you serve, and how you want calls and leads handled".
2. **Call 1 (days 1–3)** with a dedicated onboarding specialist: review scripts, kick off integrations.
3. **Days 3–12**: "Alivo builds your account, you approve scripts, integrations get tested."
4. **Call 2 (by day 14), go-live**: meet the agents, team training. "Your job is to share your details
   up front, approve your scripts, and show up for training."
5. Calls 3–6 (days 14–90) to refine scripts; email support after day 90.
- **Agents never talk to a customer before the owner approves the scripts**: "your agents arrive ready
  to work, built from what you tell us and approved by you before they ever talk to a customer"
  (https://help.alivo.ai/getting-started-guide/setting-up-your-ai-agents).

### 3. Receptionist configuration (same article)
Preset named agents: Lilly (AI Receptionist: answers, qualifies, books inspections, routes), Evan
(follow-up texts to web leads), Alex (chases unsigned estimates), Jenna (review requests). Each agent:
goal and destination, scripts (text and call), knowledge and FAQs, follow-ups, call forwarding to staff
(warm transfer that briefs the rep), voice (speed, background ambience). Scheduling rules synced to the
calendar are set up by Alivo.

### 4. Phone number (https://help.alivo.ai/getting-started-guide/getting-your-calls-forwarding-into-alivo)
Each phone agent gets its own Alivo number. Recommended **conditional (no-answer) forwarding — "Your
Team Answers First"**; immediate forwarding for after-hours lines. Test by calling the business line
from another phone. Alternative: make Alivo the business phone system and use its call-flow builder.
Porting: not found.

### 5. After each call
Per-person notification settings by event (text, email, both, neither), business-hours hold option,
in-app feed. Recommended defaults on: "Reply (AI Off)", "Assistance Needed", "Goal Met", "Left
Voicemail" (https://help.alivo.ai/getting-started-guide/setting-up-your-notifications). Dialer: "every
call saved automatically" (docs index). Retention, disclosure: not found.

### 6. Dashboard
CRM pipeline, conversations, tasks, landing pages, dialer, reporting; per-person settings under
"Settings and Team"; "Multi-Location Support" (site menu).

### 7. Integrations
CRMs (setup guides), Angi Leads/Ads, inbound webhook, calendars (https://help.alivo.ai/llms.txt).

### 8. Features
No plans or prices are published (section 1), so tier: not found for every feature. Features named in
the help center index (https://help.alivo.ai/llms.txt):
- Four preset AI agents: receptionist (Lilly), follow-up texting to web leads (Evan), estimate
  follow-up by text and phone (Alex), Google review requests (Jenna); "First Message" by text, call or
  email to a new lead.
- Website lead capture: **chat widget** ("starts a text conversation, not a live chat session"),
  booking widget, hosted landing pages, "Smart Text Link".
- Call features: call-flow builder (team first, then AI or voicemail); call recording settings for
  inbound and outbound calls; browser **dialer** for outbound and inbound calls.
- Scheduling: routing forms, location-based scheduling with drive-time optimization; Zoom links.
- CRM: built-in CRM with pipelines, automations, custom fields; integrations with JobNimbus, AccuLynx,
  Rooflink, Housecall Pro, Contractors Cloud, Jobber, Leap; custom webhooks (Zapier, Make); Angi Leads
  and Angi Ads.
- Reporting dashboard; Alivo API (contacts, agents, appointments, reporting).
- "Multi-Location Support" (site menu, https://www.alivo.ai/pricing page navigation).
- Spam handling: per-account filter for notifications "for calls that look like spam or disconnects"
  (https://help.alivo.ai/getting-started-guide/setting-up-your-notifications).
- Languages, white-label: not found.

---

# Feature matrix

Built only from the "8. Features" blocks above; each cell's source is the URL given there. Cell
values: a plan name means the lowest plan the vendor lists it on ("+" = that plan and above); "all" =
every plan; a slash list follows the plan order below; "no" = the vendor's own page marks it not
included; "listed" = the vendor names the feature but publishes no tiers or does not say which tier;
"not found" = no vendor page read says.

Plan order: Echowin (one plan; agency tiers) · Phonely Starter/Pro/Enterprise · Juney
Starter/Pro/Enterprise (Trillet's agency platform noted where different) · Callin.io PAYG/Custom ·
Marlie Basic/Standard/Pro/Premium · Newo PAYG/AI Receptionist/Enterprise · Allo Solo/Business/Ultra
(per seat) · Lindy Free/Team/Enterprise · Sophiie (no tiers published) · Reception.ai
Trial/Basic/Plus/Premium · SkipCalls Starter/PRO/Business · IONOS Flex/Flex Pro/Unlimited · Aira
Starter/Premium/Pro/Scale · Alivo (no tiers published).

| Feature | Echowin | Phonely | Juney (Trillet) | Callin.io | Marlie | Newo | Allo | Lindy | Sophiie | Reception.ai | SkipCalls | IONOS | Aira | Alivo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Spam blocking / screening | not found | not found | all (owner switches on; uses no minutes) | not found | all | all (spam under 30 s costs nothing) | basic filter all; AI screening = receptionist add-on $32 | not found (manual blocked list only) | not found | all (on by default) | all | not found | all | not found (alert filter only) |
| Languages beyond English | all ("70+" and "30+" on one page) | all ("any language") | no (English only); Enterprise "on request" | all (8 listed) | English + Spanish, tier not stated | all | EN, FR, ES (receptionist add-on) | not found | not found | all (70+) | all (English + Spanish) | all (list not found) | all ("74+"; other pages "90+", "31") | not found |
| Outbound AI calls | all | Pro+ | not found (Trillet agency: yes) | all (campaigns) | listed, tier not stated | AI Receptionist+ (Support must enable) | Ultra (AI SDR, beta) | not found | not found | not found | not found | Flex Pro (upsell box only) | not found | listed |
| SMS / texts to callers | add-on $0.02 per part | all (quota per plan) | all (booking link, follow-up text) | not found | all (text links); situation texts Standard+ | listed, tier not stated | text-back all; outbound SMS Business+ | listed, tier not stated | listed | all, but a US Reception.ai number cannot send SMS (own Twilio number needed) | all; AI text replies PRO+ | not found | inbound all; outbound Pro+ | listed |
| Website chat | all ($0.03/chat) | listed, tier not stated | not found | not found | listed, tier not stated | all | not found | not found | listed | all (web widget, credits) | PRO+ | separate product; call button Unlimited | not found | listed (text-based widget) |
| Email answering | not found | listed (outbound AI email) | not found | not found | not found | not found | not found | listed (inbox management) | listed | not found | PRO+ | separate product | not found | not found |
| Built-in CRM / client list | all | not found | not found | contacts list (all) | not found | not found | all | not found | listed | listed (client list) | not found | not found | all | listed |
| Sync to an external CRM | all | Pro+ (build your own); Enterprise managed | Enterprise | all | Standard+ (book into CRM); custom CRM Premium | all ("integrations") | all (native sync) | all (integrations) | not found | listed | PRO+ | Unlimited (API) | all | listed |
| Call analytics | all | all | not found | all | listed, tier not stated | all; custom reporting Enterprise | Business+ | not found | not found | listed | not found | not found | not found | listed |
| Call recording | all | per-agent toggle, tier not stated | all (off by default; none in HIPAA mode) | all (on by default) | listed (own pages contradict) | not found | all (always) | all (always) | listed | all (on by default); auto-delete Premium | yes, tier not stated (consent setting) | **no (never recorded)** | all | listed |
| Transcripts kept | all | all | all (not in HIPAA mode) | all | all (in reports) | not found | Solo 30 days; Business+ unlimited | not found | listed | all | yes, tier not stated | **no (deleted once the summary is sent)** | all | not found |
| Summary to owner after each call | all | all (email + SMS) | all (app or email) | all (email toggle) | all (2/4/8/unlimited channels) | all (session report) | all (in app) | in chat / Slack | listed | all (email, on by default) | all | all (email) | all (text and email) | listed |
| Calendar booking | all | listed, tier not stated | Pro+ (booking link by text: all) | all | Standard+ | listed, tier not stated | receptionist add-on | all (booking link) | listed | all | all | Flex Pro+ | all | listed |
| Live transfer to staff | all | all | Pro+ | all | Standard (1 number); Pro+ departments; Premium ring in order | all | receptionist add-on | not found | listed | all; abroad Premium | all | 1 / 5 / unlimited forwardings | all | listed |
| Owner's phone rings first (in product) | not found | not found | all ("Ring me first") | not found | not found (carrier forwarding) | not found (carrier forwarding) | receptionist add-on ("Only missed calls") | not found | not found | all ("Who answers first") | yes, tier not stated (up to 4 phones) | not found (carrier forwarding) | not found | listed (call-flow builder) |
| Multiple phone numbers | $10/mo each | 3 / 5 / custom included | not found | not found | Premium (on request) | not found | add-on from $5/mo | not found | not found | 1 / 1 / 3 / 5 | 1 / 3 / 10 | not found | not found | not found |
| Multi-location | not found | not found | Enterprise | not found | Premium (arranged by staff) | all (table) vs Enterprise (FAQ), contradiction | not found | not found | listed (multi-business) | 20 / 1 / 1 / 20 | Business | not found | not found | listed |
| Team seats / roles | all | roles, tier not stated | Enterprise | not found | not found | roles, tier not stated | per seat (Business+) | per seat (Team) | not found | 3 / 3 / 5 / 10 | PRO+ | not found | 1 / 5 / 20 / unlimited | listed |
| White-label / resale | Agency $149.99 or $499.99/mo | not found | Enterprise (optional); Trillet Studio $99, Agency $299 | all | not found | Enterprise | not found | not found | not found | not found | listed (page not read) | not found | not found | not found |
| Voice cloning / custom voice | all; premium voices +$0.08/min | all | not found | not found | not found | not found | Ultra (IVR voice only) | not found | not found | 0 / 1 / 3 / 5 custom voices | PRO+ | not found | not found | not found |
| API / webhooks | all | Pro+ | not found (Trillet agency: yes) | all | not found | listed (developer docs) | Business+ | all (MCP) | listed | all | PRO+ | Unlimited | listed | listed |
| Zapier | all | not found | not found | all | all | not found | Business+ | not found | not found | all | not found | not found | all | listed (via webhooks) |
| HIPAA mode or BAA | not found | Enterprise (BAA) | Pro (mode); Enterprise (BAA) | not found | not found | redaction mode, tier not stated | BAA add-on $50/mo (Business+) | Enterprise | not found | not found | not found | not found | not found | not found |
| Owner mobile app | not found | not found | all (app-only product) | not found | not found | not found | all | not found (iMessage on Team) | listed | not found | all | not found | all | not found |
| Payment links / phone payments | not found | Enterprise | not found | not found | Pro+ (Shopify, Square) | not found | not found | not found | listed (invoicing) | not found | not found | not found | not found | not found |
| Remembers repeat callers | not found | not found | Pro+ | not found | not found | all (cross-channel memory) | not found | not found | not found | listed (client list) | not found | not found | not found | not found |
| Review requests | not found | not found | not found | not found | not found | not found | not found | not found | listed (Google review replies) | not found | not found | not found | all | listed |
| Concurrent calls | unlimited | unlimited | not found | 5 (PAYG); more on Custom | "simultaneous", number not found | not found | not found | not found | not found | 1 / 1 / 3 / 10 | not found | not found | not found | not found |

# Patterns across these products

Each pattern names the products it is drawn from (numbers refer to the sections above). Where a
product's own pages contradict each other, that is noted in its section and the pattern only uses the
agreed part.

## A. The market these names now occupy
Several products on the assigned list are no longer "a receptionist for a small business" sold as a
standalone subscription: Echowin calls itself a "self-serve AI agent builder … not a managed answering
service" (1); Lindy is a per-seat general "AI employee" whose phone line is one feature (8); Callin.io is
a European white-label platform sold per minute to agencies (4); Allo is a per-seat phone system with a
receptionist add-on (7); Trillet moved its small-business receptionist into a separate phone app, Juney
(3); Sophiie bundles the receptionist into a trades operating system (9). The products that are
closest to Geek-Receptionist's shape are Juney (3), Marlie (5), Reception.ai (10), SkipCalls (11),
IONOS (12), Aira (13), plus Newo (6) and Phonely (2) at a higher price/complexity.

## B. How setup is ordered
1. **Read the business first, ask second.** The first content step is a website (often *or Google
   Maps / Google Business Profile*) scan that pre-fills name, address, hours, services, prices and
   FAQs: Juney (website), Marlie (website or Google Business listing), Newo (website or Google Maps),
   Reception.ai (website, up to 15 pages), SkipCalls (website or Google Maps), IONOS (website), Aira
   (website), Callin.io (optional website on the template path), Echowin (public demo only), Phonely
   ("connect your website"). Each has a manual fallback: Juney ("I don't have a website" → business
   name + "What I should know"), Reception.ai (country → language → industry), IONOS ("I don't have a
   website"), Newo/SkipCalls (blank or template).
2. **Then "check what it learned"** screens, one fact type per screen, each pre-filled and skippable:
   Juney (name, hours, services+prices, FAQs), Newo (detail cards, then "pre-production" warning),
   Reception.ai (only asks what the scan missed, then a Home checklist), IONOS ("Tip: start by checking
   the content imported").
3. **Then greeting + voice + agent name**, often pre-drafted for the owner to edit: Juney (prefilled
   greeting, fixed name "Juney"), Reception.ai (agent name, voice, first message), IONOS (drafted
   greeting to confirm; default name "Rita"), Newo (suggests name and greeting), Allo (name, tone,
   answer length, greeting/closing), SkipCalls (identity, call script).
4. **Then a test call in the browser inside setup**: Juney ("Demo call", 3 free), Reception.ai ("Meet
   your receptionist", talk in browser), IONOS (wizard step 4, free), SkipCalls ("Try a call right in
   your browser"), Allo ("Test it, then go live"), Phonely (Web Call on the draft), Echowin (chat and
   voice test), Callin.io (Test Call / Test AI agent), Newo (call the agent's own number shown on "Test
   your AI"), Aira ("Browser-based test calls" on every plan).
5. **Then connect the line** (forwarding), usually last: Juney, Marlie, IONOS, SkipCalls, Aira
   (homepage order), Newo, Alivo. Aira's receptionist page and Reception.ai pick the number earlier.
6. **Then where the call notes go**: Juney (push/email, last setup screen), IONOS (email, wizard step
   3), Reception.ai (post-call summary on by default to the owner's email).
- **Chat-based setup is emerging as an alternative to forms**: IONOS's "Setup Assistant" asks one
  question at a time with clickable suggested answers and shows a before/after "Configuration
  updated" card (12); Juney, Marlie, Newo ("Vibe Mode"), Reception.ai ("Business assistant"), Phonely
  ("Ask AI"), Callin.io ("Composer") and Lindy let the owner change the agent by chatting, with an
  approval/confirm step on bigger changes (Juney: hours/schedule show a confirm card; Marlie: "You
  approve each change").
- **Sales-led exceptions**: Alivo — 20-minute form, specialist call, 14 days to go-live, owner approves
  scripts before the agents talk to anyone (14); Sophiie — demo, rules "you approve during onboarding"
  (9); Phonely Enterprise and Marlie Premium offer done-for-you builds.

## C. What is asked
- Common fields: business name, website or Google listing, hours (per day, often with holidays), services
  with optional prices, FAQs, greeting, voice, agent name, email for summaries, transfer numbers,
  calendar connection: Juney, Reception.ai, IONOS, SkipCalls, Newo, Allo, Marlie, Aira.
- **Industry** is asked or detected and drives templates: Reception.ai (16-item list, US medical/dental
  diverted to sales), Callin.io (16 industries → use case → 300-char "Main Goal"), Newo (detected and
  locked — "do not change it … create a new AI Employee"), IONOS ("sector" and "main goal"), SkipCalls
  (templates), Allo (four pre-built "jobs").
- **"What to collect on every call" as a checklist, not prose**: Allo ("Things to find out", each "Must
  get before hanging up" or "If it comes up"), SkipCalls ("Call Tasks" on/off goals, "best effort, not
  guaranteed"), Juney ("Asks them" per scenario; name "Always asked"), Marlie ("custom message
  questions"), Phonely (starter flow collects name, number, reason).
- **Messages first, transfers later**: IONOS's setup "recommends taking messages: this does not require
  a second phone number"; Juney's default action is "Takes a message"; transfers are a paid-tier
  feature on Juney (Pro), Marlie (Standard+) and Aira.

## D. Go-live rules
- **Live immediately after the wizard, no separate gate**: Reception.ai ("US and Canadian businesses get
  a permanent local phone number and the receptionist starts answering immediately"), IONOS ("Your
  assistant has been active since the initial setup"; its "Go live" button "is not a technical
  activation"), Newo (a working "pre-production" agent with its own number before payment), Juney (live
  once forwarding is on, even with every content screen skipped).
- **Explicit publish gate**: Allo ("Go live", later "Unpublish" back to voicemail), Phonely (draft vs
  published flow; Flow Checklist must be clear; "If a flow has never been published, Phonely falls back
  to its draft").
- **Forwarding verified by the product**: Juney places "a quick, silent test call to your business
  number" and won't finish until the owner ticks "I'll switch forwarding off if I stop using Juney";
  SkipCalls, Newo and Alivo tell the owner to call the business number from another phone.
- **Out of minutes / unpaid**: Juney "stops answering until you top up"; Reception.ai trial credits are
  "a hard cap"; Lindy "pauses"; Newo goes Limited → Blocked → Deleted on failed payment; Reception.ai
  pauses on failed payment. Others bill overage automatically (Phonely, Marlie, Reception.ai paid
  plans, SkipCalls Business with an owner-set spending limit, Echowin auto-reload with a cap).

## E. Phone number
- **Keep-your-number forwarding is the default everywhere; porting is rare**: forwarding-only or
  forwarding-first in Juney ("nothing is ported or moved"), Marlie ("No" porting), Trillet, SkipCalls,
  Newo, IONOS, Reception.ai, Aira, Sophiie, Alivo. Porting offered by Allo (free), Echowin and Callin.io
  (outside US/Canada only).
- **In-app carrier codes**: Juney, IONOS, Reception.ai and Newo show the exact code for the owner's
  carrier/phone type with the agent number embedded.
- **"Ring the owner first" handled inside the product, not only by carrier no-answer forwarding**: Juney
  ("Ring me first", app rings ~15 s), Reception.ai ("Who answers first": Never/Business hours/Always/
  Custom, 10–60 s), SkipCalls (up to four phones, 10/20/30 s), Allo ("Only missed calls (suggested)"),
  Alivo (call-flow builder). Juney argues conditional carrier forwarding is "a poor fit" and uses
  all-calls forwarding; Newo and Alivo recommend no-answer forwarding.

## F. Pricing models
- **Per business, flat monthly with a usage allowance** dominates the SMB products: minutes (Phonely,
  Marlie, Juney, Reception.ai credits, SkipCalls Business), calls (IONOS per call, Aira per call,
  SkipCalls "fair usage" calls), conversations ("units": Newo). Pure per-minute: Echowin, Callin.io.
  Per seat: Allo (receptionist add-on priced as one seat per agent), Lindy (per user + credits).
- **Tiers gate capabilities, not only volume**: Marlie (actions per call, number of notification
  channels, transfer types, knowledge uploads), Juney (Pro: booking, transfers, caller memory, HIPAA
  mode), Reception.ai (privacy settings Premium-only; locations 1/1/20; seats 3/5/10), Aira (users
  1/5/20/unlimited; outbound SMS), SkipCalls (team accounts, number of agents/numbers).
- **Spam doesn't count** toward usage: Juney, Newo, SkipCalls.
- **Trials split by card**: card required — Marlie (14 d, $0 due), SkipCalls (7 d), Allo (3 d, "Phone
  service is a regulated industry"), Juney (via App Store/Google Play), Trillet agency; no card —
  Reception.ai (14 d / 30 min), Newo (50 units), Lindy ($50 credits), Echowin (credits), Callin.io (30
  min). IONOS: first month free.
- **Locations** are a plan limit or a sales item: Reception.ai (1/1/20), Newo (one agent per location;
  multi-location = Enterprise), Marlie (Premium, "arranged for you by our team"), Juney (Enterprise),
  Sophiie ("Multi-business setups").

## G. Limits on what the AI may say or promise
- **Prices only from the owner's list**: Juney ("only quotes the prices you list … never makes one up";
  blank price → "you'll confirm"), Newo ("Explicit Constraint - Providing Prices"), Marlie (guardrail
  template "Never quote prices"), Lindy ("Quote a price that isn't on your list" requires the owner).
- **A dedicated "never do" area**: Phonely ("Never Do — strict actions, claims, or promises the agent
  must avoid"), Allo ("What shouldn't your agent do?"), Reception.ai ("Strict" rules, up to 50),
  SkipCalls ("Only promise actions that you have connected and configured").
- **Unknown → message, not a guess**: Juney (FAQ answers said word for word; "Anything not on this list
  becomes a message"), Lindy ("Anything else becomes a message for you"), Trillet, Reception.ai
  (unanswered questions collected into an FAQ queue for the owner).

## H. After the call, retention and disclosure
- **Delivery**: email summary is universal; push (Juney, SkipCalls), SMS (Phonely, Marlie, Aira,
  Reception.ai, Newo), filters by call type and "skip short calls" (Juney), "Needs attention" views
  (Reception.ai, Juney "Needs you", Alivo "Assistance Needed").
- **Recording default varies**: on by default — Callin.io ("On by default"), Reception.ai ("Store call
  recordings — On"), Allo ("Every call … automatically recorded"), Marlie ("all calls are recorded",
  contradicted on the same page), Aira; **off by default** — Juney; **never** — IONOS ("Calls are not
  recorded … No audio is stored after the call").
- **Retention**: only a few vendors state it. Juney: "kept for as long as you have your account".
  Reception.ai: "stay until you delete them" unless auto-delete is on — 30 days default, 0 = "Deleted
  soon after the call ends" — and changing it requires Premium. IONOS: transcripts "deleted once the
  call summary has been sent", summaries kept for the contract. Allo Solo: 30-day history. Not found
  for Echowin, Phonely, Marlie, Callin.io, Newo, Sophiie, Aira, SkipCalls (deletion by owner only).
- **Content-free modes exist but are tier- or support-gated**: Juney HIPAA mode (Pro: no recording,
  transcript or summary; "You'll still see who called and when"), Trillet agency HIPAA mode ("stops call
  recordings and transcripts being stored"), Allo privacy mode (no audio; transcript and summary kept;
  enabled by contacting support), Newo HIPAA mode (redaction), Reception.ai (recordings off; auto-delete
  Premium-only).
- **Disclosure**: Juney inserts "This call may be recorded for quality purposes." into the greeting
  automatically while recording is on (removable "after a warning"); SkipCalls "Ask for Recording
  Consent" stops the recorded conversation if the caller declines; Allo has the owner add a "Play
  announcement" call-flow step; IONOS's default greeting states the call is answered by an AI and
  points to the privacy policy ("by law"); Phonely reminds the owner in the editor; Callin.io and
  Reception.ai offer an uninterruptible greeting for disclosures. Juney and Reception.ai ask callers
  for SMS opt-in on the call.

## I. Features and how they are tiered
- **Booking and live transfer are the usual upsell from the cheapest plan**: Juney (both Pro), Marlie
  (booking and one transfer number at Standard, departments at Pro, ring-in-order at Premium), IONOS
  (booking at Flex Pro; forwardings 1 / 5 / unlimited), Allo (both only with the paid receptionist
  add-on). Message-taking, spam handling and the post-call note sit on the entry plan in the same
  products.
- **Spam handling is an entry-plan feature and usually does not use the allowance**: Juney ("Spam she
  ends uses no minutes"), Newo (spam under 30 s "cost nothing"), Marlie, SkipCalls, Aira and
  Reception.ai (on by default) include it on every plan; Allo puts AI screening in the $32 add-on.
- **Texting callers from a US number needs carrier registration, and vendors handle it differently**:
  Reception.ai's own US numbers "Can send SMS: No" without the owner's Twilio number; Allo charges $24
  one-time for A2P 10DLC; Trillet says reminders go from "a Trillet number registered for A2P 10DLC —
  nothing for you to register"; Aira sends outbound texts on Pro and Scale "after carrier
  verification"; Echowin charges $0.02 per 160-character part.
- **Website chat and email are being folded into the receptionist**: Echowin, Newo (all plans),
  SkipCalls (PRO), Reception.ai (web widget), Sophiie and Alivo include a website chat; IONOS sells AI
  Chat Assistant and AI Email Assistant as separate products; SkipCalls PRO adds an "Email
  Receptionist".
- **White-label is common among the newer platforms**: Echowin ($149.99/$499.99 agency tiers), Trillet
  (Studio $99, Agency $299), Callin.io (included at $0.16/min), Newo (Enterprise), Juney (Enterprise,
  optional), SkipCalls (page listed).
- **Concurrency and seats are explicit limits on some plans**: Reception.ai concurrent calls 1/1/3/10
  and team members 3/3/5/10; Callin.io 5 concurrent calls; Aira users 1/5/20/unlimited; Echowin and
  Phonely advertise unlimited concurrency.
- **Recording and transcript storage is on by default almost everywhere; IONOS is the exception**: the
  matrix rows show recording kept on all or most plans for Echowin, Callin.io, Allo, Lindy, Aira,
  Reception.ai and Juney (Juney off by default), while IONOS records nothing and deletes transcripts
  once the summary is sent. Juney's no-content HIPAA mode is a Pro feature and Reception.ai's
  auto-delete is Premium-only.

# Coverage
Covered from vendor pages: Echowin, Phonely, Trillet (Juney), Callin.io, Marlie, Newo, Allo, Lindy,
Sophiie, plus five added: Reception.ai (ElevenLabs), SkipCalls, IONOS AI Receptionist, Aira, Alivo.
Every product section has a "### 8. Features" block and a column in the Feature matrix.
Thin coverage (no public help center or sales-led): Sophiie (no prices, no setup docs), Aira (marketing
pages only), Alivo (no prices), Marlie (no screen-by-screen help center), Phonely (onboarding screens
undocumented). Considered and not covered: Ringly.io (Shopify/e-commerce focus).
