# Group 3: business phone systems that sell an AI receptionist

Read 2026-11-19. Every fact comes from the page named beside it. "Not found" means the pages read did not say it; nothing is
inferred. "Third-party" marks anything not from the vendor. "Search summary" means the fact came from a search result's summary
and the page itself was not opened.

Each product has points 1–7 as briefed plus point 8 (features by tier). A feature matrix precedes the patterns.

Already in `plans/saas-plan.md` §1 (not repeated): RingCentral AIR's features and $49 / $39+$30 prices, GoTo's "Contact Sales"
price and lack of a trial. This file adds setup, configuration and seats for both, and new facts where they changed.

---

## 1. RingCentral AI Receptionist (AIR)

Sources:
- [R-guide] RingCentral PDF "Setting up and Updating your AI Receptionist", https://assets.ringcentral.com/us/guide/settingup-updating-your-ai-receptionist.pdf (undated; its only links point to AT&T Office@Hand, a RingCentral reseller)
- [R-price] https://www.ringcentral.com/pricing/ai-receptionist.html
- [R-page] https://www.ringcentral.com/ai-receptionist.html
- [R-dg] https://www.ringcentral.com/dg/ai-receptionist (sales form)
- [R-rn-YYYY-MM] release notes, https://support.ringcentral.com/us/en/release-notes/ai-receptionist/release-notes-<month>-<year>.html (May 2025 to Aug 2026 read; Sep–Nov 2026 pages return 404)
- [R-blog-jan] https://www.ringcentral.com/us/en/blog/ai-receptionist-easier-setup-smarter-conversations/ (14 Jan 2026)
- [R-blog-mar] https://www.ringcentral.com/us/en/blog/how-to-set-up-a-voice-ai-agent-that-works-from-day-one-with-ringcentral-ai-receptionist/ (11 Mar 2026)

**1. Who, sales model, price**
- Standalone ("works with any business phone system", forwarding or SIP) or with RingEX. Both have "Buy now" (self-serve) and "Contact sales" [R-price].
- Priced per AIR license with minutes, not per seat: "purchasing an AIR license which comes with 100 minutes, as well as additional stackable 100 minute bundles" [R-rn-2025-06]. Standalone plan: "Launch unlimited AI Receptionists", "Number of agents: Unlimited" [R-price].
- The RingEX bundle ($39 AIR + $30 RingEX Core) adds "One new phone number per user", i.e. the phone seats are per user while AIR is not [R-price].
- 14-day free trial on both plans; card requirement not found [R-price].
- Contradiction: the sales landing page [R-dg] offers "Don't pay until 2027. Get 6 months free today" and says "A sales advisor will contact you within 24 hours"; the pricing page offers a 14-day trial and self-serve purchase.
- The sales form [R-dg] asks: full name, work email, business phone number, company name, number of employees (1-19, 20-99, 100-399, 400-4999, 5000+), consent to calls/emails; button "Get my quote".
- 30-second billing increments, $0.50/min over [R-price].

**2. Signup and setup flow (admin, in order)** [R-guide unless noted]
1. Admin (needs "Phone System or Auto Receptionist permissions") signs in to Admin Portal > AI tab > AI Receptionist > **Start**.
2. **Profile**: receptionist name, Primary language, Additional languages, voice (preview each avatar with Play).
3. **Company description**: products and services; "also be used to auto-generate questions and answers for the FAQ skill"; optional website link the AI gives callers.
4. **Location and business hours**: pre-filled from the company's existing RingCentral settings; confirm.
5. **Company greeting**: keep default or customise.
6. **Transfer by name**: on by default; extensions on the "excluded extension list" are left out. **Finish**.
7. **Test**: Chat tab ("Start new test chat") or Call tab (dial the AIR's number/extension).
8. **Assign**: until assigned it does not answer. "Assign" opens Auto-Receptionist > General Settings to attach it to a site's Call Handling or an IVR menu.
- Newer automation (dated):
  - Website auto-setup GA Jan 2026: adding the business website "auto-creates" a receptionist pre-filled with hours, greeting, common questions and services overview, reviewed "before going live" [R-blog-jan].
  - Feb 2026: "Auto-create AIR from a Google Business Profile" by entering the business name as on Google [R-rn-2026-02].
  - Aug 2026: build an AIR from an existing IVR, reusing its routing, then add website or Google Business Profile [R-rn-2026-08].
  - Jul 2026: "Test call during setup" inside the wizard; a final "Connect" step choosing numbers and call-handling rules before finishing (single-site only); Aug 2026 extended Connect to multi-site [R-rn-2026-07], [R-rn-2026-08].
  - Jun 2025: onboarding call can be booked from inside the AIR UI [R-rn-2025-06].
- Go-live rule: the AI does not answer until assigned; status badge "Active" vs "Not in use" (Aug 2026) [R-rn-2026-08].
- Time: "Many teams can complete the initial setup and begin testing within the same day"; FAQ: same day to two weeks [R-blog-mar]. Customer example "first version running in about 30 minutes" [R-page].

**3. Configuration**
- Skills: FAQ (auto-generated from description, website, uploaded documents), transfer by name, transfer by context (internal or external numbers, May 2025), appointment booking on Google/Outlook real-time availability (Sep 2025), lead capture / custom intake questions with timing choice (after greeting, after questions, or before transfer, Mar 2026), Send text message, video meeting link by SMS, spam blocking with sensitivity and allow list (Jul 2026) [R-rn-*].
- Personality presets: talking speed, personality, response detail (Aug 2026) [R-rn-2026-08].
- Settings > General: name, extension, **Backup extension** ("if AIR can't resolve the issue"), assign to company site, assign to direct number [R-guide]. Backup routing also when AIR is down or out of minutes (Jul 2025) [R-rn-2025-07].
- Each location can have its own hours, routing rules, greetings and SMS responses [R-page].
- Contact directory upload by CSV or Active Directory (Apr 2026) [R-rn-2026-04].
- Rules limiting what the AI may promise: not found (only "minimize risks of irrelevant responses" [R-page]).

**4. Phone number**: standalone includes a "Dedicated new phone number"; "Keep your number or get a new local number"; forwarding or SIP; External PBX via SIP (Oct 2025) [R-price], [R-rn-2025-10]. Porting not found on AIR pages.

**5. After each call**
- Transcripts per call; transfer target shown in transcript; Analytics and "Conversational insights" (top unanswered questions, add an answer from there) [R-guide], [R-rn-2025-05], [R-rn-2025-06].
- "Automatic call recording" saved to the call log (Sep 2025) [R-rn-2025-09]; "Every AI Receptionist call can be recorded and transcribed automatically" [R-page].
- Contextual transfer: receiving user sees a summary of reason/keywords (Oct 2025) [R-rn-2025-10].
- Email notifications for new leads (Jul 2026); minute-usage notifications on by default (Jul 2026); notification center (Aug 2026) [R-rn-2026-07], [R-rn-2026-08].
- Consent: "Call recording opt-out": if the caller opts out, "AIR immediately stops the transcription and transfers the call to the designated backup extension" (Nov 2025) [R-rn-2025-11].
- Retention period: not found.

**6. Admin console and seats**
- "AIR Studio" card page lists all receptionists with call trends and assigned/unassigned cues [R-rn-2025-06]; Channels page holds number and call-handling assignments [R-rn-2026-07].
- Business-level product: AIR has its own extension; individual users' "If no answer" rules or call queues can point at it (queue overflow to AIR, Mar 2026) [R-rn-2026-03]. Multiple AIRs allowed, e.g. per location [R-page].

**7. Integrations**: Integrations tab with HubSpot, Zoho, Salesforce, Google Calendar, Outlook (GA Jan 2026); Calendly; Shopify (product and order lookup, May–Jun 2026) [R-blog-jan], [R-price], [R-rn-2026-05]. Zapier/webhooks not found.

**8. Features** (source [R-price] comparison table unless noted; the table has one column, so every row applies to both Standalone $49 and AIR+RingEX $39+$30, and RingEX adds phone-system features)
- In both plans: 8 voice options; custom greetings; intelligent routing by name or intent; transfer to users, extensions, queues or external numbers; call queue integration (overflow or queue destination); live handoff with context; custom schedules and coverage; languages English (US, UK, AUS), French, Spanish, Latin American Spanish, Italian, German, Portuguese, with automatic language switching (Dutch added May 2026 [R-rn-2026-05]); lead capture; custom intake questions; appointment scheduling "via calendar integrations or SMS links"; "Text inquiry automation"; SMS follow-ups; calendar (Google, Outlook, Calendly) and CRM (Salesforce, Zoho, HubSpot) integrations; guided setup; auto-setup from website or Google Business Profile; knowledge base from website plus unlimited document uploads; unlimited agents; keep your number or new local number; any phone via forwarding or SIP; transcripts and recordings; call analytics; "Knowledge insights" (unanswered questions); HIPAA and SOC 2; multi-location support.
- Extra charges: "AI SMS agent", "additional charges may apply" (price not shown). Coming soon: Shopify (e-commerce) and WhatsApp (messaging) integrations.
- RingEX bundle only: business SMS/MMS, basic call queues, on-demand call recording, unlimited domestic calling, one number per user, 24/7 support.
- Not on the pricing page but in release notes (plan not stated): spam and robocall blocking with sensitivity, block log, allow list [R-rn-2026-07]; lead email notifications [R-rn-2026-07]; video meeting links by text [R-rn-2025-09]; contact directory upload [R-rn-2026-04]; Shopify product/order lookup [R-rn-2026-05].
- Outbound AI calls: not found.

---

## 2. GoTo Connect AI Receptionist

Sources (all GoTo support, read in a browser):
- [G-hub] https://support.goto.com/connect/help/set-up-and-use-ai-receptionist
- [G-new] https://support.goto.com/connect/help/set-up-a-new-ai-receptionist
- [G-flow] https://support.goto.com/connect/help/manage-conversation-flow-for-ai-receptionist
- [G-kb] https://support.goto.com/connect/help/create-knowledge-base-for-ai-receptionist
- [G-form] https://support.goto.com/connect/help/create-information-capture-forms-for-ai-receptionist
- [G-dial] https://support.goto.com/connect/help/add-ai-receptionist-to-your-dial-plan
- [G-faq] https://support.goto.com/connect/help/faqs-and-guidelines-for-ai-receptionist
- [G-set] https://support.goto.com/connect/help/ai-receptionist-settings
- [G-an] https://support.goto.com/connect/help/view-analytics-on-your-ai-receptionist
- [G-price] https://www.goto.com/pricing/connect

**1. Who, sales model, price**
- Only inside GoTo Connect. Plans listed: "Phone System", "Phone System + AI Receptionist", CX Complete ("100 AIR credits included (additional available for purchase)"), Customer Experience, Contact Center. No prices; every plan is "Contact Sales" [G-price].
- Billing by talk time: monthly total of AI talk time, rounded to the nearest hundredth of a minute; only "AI receptionist Total talk time" is billed, not ringing or hold [G-faq].
- Per seat vs per account: not found. Trial: not found.

**2. Setup flow** [G-hub]: in-product guided setup at GoTo Admin > Digital Workforce > Getting started, "Each needed step is listed there with an estimated completion time". Requires Admin or Super admin role.
1. **Create help material first** (recommended): knowledge base collections and information capture forms [G-new].
   - Knowledge: collection > "+ Add knowledge" > Write article, Upload files (PDF/DOCX/TXT 10 MB, 200,000 chars; CSV/XLSX beta, 8,000 chars; no images), or Extract from website ("Crawl connected pages" up to two levels deep, same domain, or "Extract from specific pages"). Extraction is a one-time snapshot; re-crawl by hand [G-kb], [G-faq].
   - Info capture form: name, description, rows each with name and description (e.g. email, phone) [G-form].
2. **Create a receptionist**: Digital Workforce > AI receptionists > "+ Create a receptionist"; Personality: voice (Standard or HD), tone, language. The language setting changes accent only and does not translate the greeting [G-new].
3. **Conversation flow**: configure abilities (below) [G-flow].
4. **Add to dial plan**: Phone system > Dial plans; drag the AI receptionist node after "Start here", choose the receptionist, connect an "On error" path, Save. "Before you begin: Ensure the desired phone number is active and routing to this dial plan" [G-dial].
5. **Test**: "Run a test call" after adding it to the dial plan [G-dial]. No preview before go-live was found.
6. Analytics and settings [G-hub].
- Go-live rule: it answers only once placed in a dial plan [G-dial].
- Business information is not auto-gathered from Google; website crawl is a knowledge source only.

**3. Configuration** [G-flow]
- Greeting message (used as context; callers may be allowed to skip it [G-set]).
- Transfer by topic: up to 30 per receptionist; destination extension, description of when to use it, optional info capture form, optional email notification to up to 10 recipients.
- Transfer by name: uses directories; extensions can be excluded; topic transfer takes precedence; no info capture with name transfer.
- FAQ: up to 15 question/answer pairs.
- Scheduling: only through Xtime (auto dealers) or AthenaOne (healthcare); requires automotive, healthcare or CX plan or integrations package; one integration per receptionist. (Updates saas-plan.md, which recorded booking links only.)
- Knowledge, Info capture (forms emailed to an address with custom subject), Texting (asks caller consent and confirms number before sending a static text; needs SMS registration), Interaction rules (named free-text rules), Escalation rules (destination plus an escape key 0–9, #, *).
- Hours: handled by the dial plan, not inside the receptionist (no hours setting in the AI articles).

**4. Phone number**: GoTo numbers routed through the dial plan [G-dial]. Forwarding/porting not covered in the AI articles.

**5. After each call**
- Email per transfer (if set) and emailed info capture forms [G-flow]. Captured details shown to the agent in the GoTo softphone on transfer [G-form].
- Analytics: total calls, total/average talk time, % handled, escalated, abandoned; call reports in the Analytics portal ("may not be available with your plan") [G-an].
- Recordings, transcripts, retention: not found.
- Disclosure: "Laws regulating the use of AI vary... It is your responsibility to ensure your use of this feature complies" [G-hub]; tip to put a Sound clip node before the AI announcing AI use and "This call may be recorded" [G-dial].

**6. Admin and seats**: several receptionists per account, each duplicable; one AI per dial plan node [G-flow], [G-dial]. Relation to user seats: not found.

**7. Integrations**: Xtime, AthenaOne for scheduling [G-flow]. CRM, Zapier, webhooks: not found.

**8. Features** (sources [G-flow] and [G-prod] https://www.goto.com/connect/ai-virtual-receptionist; plan: the "Phone System + AI Receptionist" plan or CX Complete with 100 AIR credits, or listed under "Add Ons"; no prices [G-price], [G-prod])
- Abilities, all on the AI receptionist: greeting; transfer by topic (30) with optional info capture and email notice; transfer by name over directories; FAQ (15 pairs); knowledge (articles, files, website extraction); info capture forms emailed; texting with caller consent; interaction rules; escalation rules with an escape key [G-flow].
- Scheduling only with Xtime or AthenaOne, and only on an "automotive license or plan, healthcare plan, CX plan, or integrations package" [G-flow].
- Channels: "voice, SMS, WhatsApp, webchat, and social" [G-prod].
- "AI Observability": which knowledge sources were used, what was captured, when it handed off [G-prod]; Analytics tab; Analytics portal reports "may not be available with your plan" [G-an].
- Languages: [G-prod] says "multiple languages and accents" without a list; a search summary of goto.com pages reports "10+" on launch pages vs "over four" (English, French, Spanish, Brazilian Portuguese) with automatic detection in a December 2025 update. Conflict unresolved.
- Search summary of the GoTo FAQ: pay per minute or a fixed plan with 3,000 minutes and overage, varying by region (not opened).
- Spam blocking, outbound AI calls, recordings, transcripts, CRM: not found.

---

## 3. Nextiva (XBert AI receptionist)

Sources:
- [N-kb] https://kb.nextiva.com/help/articles/xbert-ai-standalone
- [N-fwd] https://kb.nextiva.com/help/articles/forward-calls-to-xbert-ai
- [N-bundle] https://www.nextiva.com/x/xbert-ai-core-bundle
- [N-agent] https://www.nextiva.com/products/ai-voice-agent
- [N-blog] https://www.nextiva.com/blog/how-to-set-up-ai-receptionist.html (4 May 2026, updated 14 Nov 2026)

**1. Who, sales model, price**
- Standalone ("works with any phone provider") or with a Nextiva phone line [N-agent], [N-fwd].
- Contradiction between vendor pages:
  - [N-agent]: "$99/month", "Per 100 interactions, then $1.50 per conversation after", "No contracts", "30-Day Money-Back Guarantee", 14-day free trial.
  - [N-bundle]: "AI Receptionist and business phone line for $99/month", "XBert AI + 1 Core License", "Minimum 12‑month Core or Engage subscription required", businesses up to 200 employees, limited time, 14-day trial.
  - Third-party (getvoip.com, search summary only): 100 sessions, $0.99 each extra.
- Per seat vs per business: not stated; the bundle ties one Core (user) license to XBert [N-bundle]. Card requirement for trial: not found.
- Three onboarding tracks exist: Basic, Advanced, and "Sales-Led Onboarding" [N-kb].

**2. Setup flow** [N-kb], Basic onboarding:
1. Accept the invitation > "Continue to setup".
2. Business information: company website, find the business on Google Maps, or manual entry.
3. Company details form auto-filled; correct the name ("Search again").
4. AI Employee: name, voice (ten options), default greeting ("should disclose that the customer is talking to AI"), optional avatar.
5. Review what the AI knows: brand name and overview; optional products/services CSV or Excel (10 MB) and other documents; processing up to ~60 s.
6. **Preview**: call the listed number or "Chat".
7. Channels: Calling (always on or after hours only; transfer number; call summary by email, text, or callback); SMS and Live Chat handoff notifications.
8. Final steps; then "Your business will now be online".
- Advanced onboarding: bring existing numbers (transfer local/toll-free, skippable), 10DLC text registration, live-chat widget, review [N-kb].
- Sales-led variant: website or Google Business > avatar, name, brand, gender, voice, greeting > "Creating and Hiring" (~60 s) > copy number > "Train AI Employee" [N-kb].
- Blog version adds a "Tell me about your company" step (services, pricing, cancellation/refund/payment policies, FAQs, team and routing, "topics the AI should avoid"), 15–20 min; total "under an hour"; 3–5 test calls before launch [N-blog].
- The AI gets its own number during onboarding; forwarding from the old provider comes after setup [N-fwd].

**3. Configuration**: onboarding creates "receptionist, support, and FAQ skills"; more via "Add skills" [N-kb]. Skills named in the blog: Receptionist (routing), Support (tickets), Lead generation (suggested three questions: identity, intent, urgency) [N-blog]. Hours: always on, business hours only, or custom [N-blog]. Booking: Meetings tab connects Outlook or Google Calendar [N-kb]. Transfer or take a message [N-blog]. Guardrails: "topics the AI should avoid" and "questions the AI should decline" [N-blog].

**4. Phone number**: own XBert number ("Buy phone numbers"), "Transfer numbers" (porting) [N-kb]; "Porting included" [N-bundle]; forwarding guides for 14 providers, all "forward all calls" style; conditional forwarding not described [N-fwd]; blog lists forward-all, after-hours/weekends, or busy/unanswered [N-blog].

**5. After each call**: call summary by email, text, or marked for callback [N-kb]; "Each call is transcribed and summarized automatically", "Conversations are recorded and transcribed" [N-agent]. Retention: not found. Disclosure: greeting should disclose AI [N-kb]; recording disclosure not found.

**6. Admin and seats**: pages Users ("All added users have administrator privileges"), Numbers, Channels, Billing (usage across channels, invoices), AI Employees [N-kb]. Seat counts: not found. Multiple locations: "personalized greetings and smart call flows for each branch" [N-agent].

**7. Integrations**: Outlook/Google Calendar [N-kb]; CRM (Salesforce, HubSpot, Zoho, Pipedrive and others), helpdesks, Zapier, Make, REST APIs, webhooks [N-agent].

**8. Features** (source [N-agent] unless noted)
- "XBert AI" $99/month tier lists: "Real-time coaching on every call", "AI-powered suggested responses", "Live sentiment detection", "Knowledge base surfacing", "Automatic call summaries & transcripts", "Compliance & security monitoring", "Available standalone & works with any phone provider". (The first three read as agent-assist features; the page puts them under the receptionist tier.)
- "Launch Ready (Guided self-setup)", no price: "Pre-built roles. Receptionist, Sales, or Support"; "Personalize your agent. Name, voice, greeting, channels"; "Preview & test".
- Elsewhere on the page (tier not stated): book, confirm and reschedule appointments with reminders; transfer with context; qualify leads; CRM sync; voice, SMS and chat on one platform; dashboard of call volume, handoffs, sentiment; recording and transcription of conversations; multiple locations with per-branch greetings and call flows; "HIPAA compliance" badge; 40+ integrations including Zapier, Make, webhooks.
- From [N-kb]: live-chat widget, 10DLC texting, call summary by email/text/callback, Meetings tab (Google/Outlook).
- Languages, spam blocking, outbound AI calls, transfer by name: not found.

---

## 4. Dialpad (AI Agents, part of "Dialpad Resolve")

Sources:
- [D-sol] https://www.dialpad.com/solutions/ai-receptionist/
- [D-help] https://help.dialpad.com/docs/create-an-agentic-ai-agent (read in a browser; resolves to help.dialpad.com/hc/en-us/articles/54542536836891)
- [D-price] https://www.dialpad.com/pricing/
- [D-agent] https://www.dialpad.com/ai-agent/

**1. Who, sales model, price**
- AI Agents sit only under "Resolve", "Custom Pricing", sales-led. Not in Connect ($15/$25 per user) or other per-user tiers [D-price].
- Credit pool: "purchase a pool of AI Agent Credits"; "A conversation is billable only when the AI retrieves information or executes a real action"; "If no work is done, you're not charged" [D-price].
- Seat requirement: not stated, but it connects only to Dialpad voice targets (Department, Main Line, Contact Center) [D-help]. Trial for AI Agents: not found (Connect has 14 days) [D-price].
- Positioned for high-call-volume industries (medical, dental, legal, HVAC, restaurants) on [D-sol]; enterprise ROI/governance language on [D-agent].

**2. Setup flow** (Agentic agent) [D-help]
1. Company or Office Admin > Admin Settings > AI Agents > Create AI Agent > Agentic.
2. Internal name; company name; company description; "Describe the tasks your agent will perform"; voice and tone; display name; greeting description; knowledge-base language; Create.
3. Knowledge: connect Zendesk, Document360, Box, Guru, Google Drive folder (24-hour sync), custom web crawler, or upload documents (5 MB each, no sync).
4. Skills: from scratch or template; fields Skill name, Description, Instructions, Actions (via Connectors), Connections, Guardrails, Labels; Validate; Publish.
5. Validate (platform suggests edits; "Publish with warnings" allowed).
6. Test: "Test AI Agent" text preview.
7. Connect to voice: Department/Main Line/Contact Center > Business hours and call routing > open or closed hours > "No operator" > "To an AI agent".
- No website or Google Business auto-fill for business details; no industry templates for the agent itself (templates exist for skills).

**3. Configuration**: greeting skill optional; guardrails per skill ("What the agent should never do", when to confirm, when to escalate); FAQ says business-specific limits belong in agent behaviour and high-risk topics should be "no-guess zones" with explicit escalation [D-help]. Booking via connectors (Google Calendar/Workspace, Outlook, Calendly, AthenaHealth) [D-help]. Hours via open/closed-hours routing [D-help]. Language: "available in English with other languages coming soon" [D-help]. Voice sessions end after 90 s of caller silence [D-help].

**4. Phone number**: Dialpad numbers only (voice targets). Forwarding/porting for the AI: not found.

**5. After each call**: History tab per agent with transcript, metadata, resolution status, feedback [D-help]. Owner notifications, recordings, retention, disclosure: not found.

**6. Admin and seats**: agents are per company/office, attached to departments or main lines, not to users [D-help]. Multiple locations: not found.

**7. Integrations**: Bullhorn, Salesforce, ServiceNow, Zendesk, HubSpot, Google Calendar/Workspace, Outlook, AthenaHealth, Calendly, Zoho CRM [D-help]; Android/iOS SDKs [D-help].

**8. Features** (all on "Resolve", custom pricing, credits billed per conversation that does work [D-price])
- Agentic agent: knowledge connectors and crawler, skills with actions and guardrails, skill templates, optional Greeting Skill using caller ID, validation, text test, voice and web-chat channels (web chat created automatically), conversation history with transcripts, "Skills Mining" from human-call transcripts (Early Adopter, English voice contact centers only) [D-help].
- Actions named: book appointments, check order status, update records, create tickets [D-help]; scheduling, routing, order lookup [D-price].
- Marketing page: personalized greeting, time-of-day/day-of-week/department/individual routing rules, after-hours handling, booking/rescheduling, context on handoff [D-sol]; "HIPAA-compliant triage and scheduling" for healthcare [D-agent].
- Outbound: Greeting Skill "runs on every new launch, including inbound, web chat, and outbound bot conversations" [D-help]; no outbound receptionist feature described.
- Languages: English only, "other languages coming soon" [D-help].
- SMS, spam blocking, message taking, recordings, owner notifications: not found.

---

## 5. Quo (formerly OpenPhone), Sona AI agent

Sources:
- [Q-setup] https://support.quo.com/core-concepts/ai-automations/sona/overview.md
- [Q-know] https://support.quo.com/core-concepts/ai-automations/sona/knowledge.md
- [Q-bill] https://support.quo.com/core-concepts/ai-automations/sona/sona-pricing.md
- [Q-act] https://support.quo.com/core-concepts/ai-automations/sona/actions.md
- [Q-hist] https://support.quo.com/core-concepts/ai-automations/sona/conversation-history.md
- [Q-sona] https://support.quo.com/core-concepts/ai-automations/sona-ai-agent.md
- [Q-signup] https://support.quo.com/getting-started/sign-up.md
- [Q-price] https://www.quo.com/pricing (live) and https://www.quo.com/pricing.md ("Last updated: 2025-07-01")
- [Q-appt] https://www.quo.com/product/ai/appointment-setter
- [Q-cl] changelogs https://support.quo.com/changelog/2025/04/17/changelog.md, /2025/06/17/, /2025/06/26/

**1. Who, sales model, price**
- Self-serve phone system for small teams. Per user: Starter $19 ($15 annual), Business $33 ($23), Scale $47 ($35); one number per user; extra numbers $5/mo; 7-day trial [Q-price live].
- Sona is per workspace, not per user: "Every workspace starts with 1,000 credits (~10 calls) each month" [Q-bill]. 100 credits a call, 50 per SMS conversation; calls under 15 s free.
- Tiers: Free 10 calls ($1.00/call over), $25/40 calls ($0.75), $49/100 ($0.65), $99/250 ($0.55), $199/600 ($0.45) [Q-bill], [Q-price].
- Overage is **off by default**: when credits run out "Sona stops answering and routes calls through the fallback path"; emails at 80% and 100% [Q-bill].
- Requires a paid Quo plan with Stripe (not Apple) billing; buying paid tiers not allowed on free trial [Q-bill]. The Sona FAQ says the 7-day Sona trial has "Unlimited calls" and "Automatic conversion to paid after trial" [Q-sona].
- Contradictions: launch changelog (17 Apr 2025) priced Sona "$49 per month and includes 50 calls", $0.99 extra [Q-cl]; pricing.md (2025-07-01) lists only Business and Scale while the live page and Sona docs include Starter.

**2. Signup and setup flow**
- Account signup, in order [Q-signup]: email + 6-digit code; first/last name; team or solo; mobile number verification; phone number (auto-assigned new number, or port with a temporary number meanwhile); plan to trial (7 days, reminder email the day before it ends); **credit or debit card**. Then Stripe identity verification (government ID + selfie); until verified: 3 outgoing conversations a day, inbound only from the verifying number, no call forwarding, no new numbers.
- Sona setup [Q-setup]: Owner/Admin (workspace or inbox), web or desktop only.
  1. Sona in sidebar > pick an inbox > "Set up" opens the call flow builder.
  2. Drag a Sona step into the call flow; common placements: after "Ring users" (missed calls), after phone menu, after business hours (after-hours), or on every call. Several Sona steps per flow allowed.
  3. Greeting text; recommended elements: business name, AI disclosure, recording notice ("Please note this call is being recorded").
  4. Personality: tone (Formal, Neutral, Casual), 4 voices, languages (English; Spanish, French beta).
  5. Knowledge: website import or upload (JSON, PDF, CSV, Markdown, text; 10 MB), 20,000 chars per page, review before live; vocabulary up to 25 keywords [Q-know], [Q-cl 2025-06-17].
  6. Jobs: from templates (Message taking, Lead qualification) or scratch; up to 10 per Sona step.
  7. "Test Sona" mock calls; then **Publish call flow** ("changes won't go live until you press it").
- Go-live rule: Sona answers only where a published call flow contains a Sona step.

**3. Configuration**: jobs with actions inserted by "/": Send SMS (only to the caller, from the called number, needs A2P 10DLC/toll-free registration), Transfer call (member, shared inbox, external number; Sona confirms first and then leaves the call), Create Jobber request [Q-act]. Booking: texts a booking link; "Sona can't handle rescheduling and cancellations on a live call" [Q-appt]. Conversation history toggle: last 21 days, up to 30 activities, per inbox [Q-hist]. Hours: via the call flow's business-hours step [Q-setup].

**4. Phone number**: new local or toll-free number per user, or port free [Q-price], [Q-signup].

**5. After each call**: "every Sona call is recorded and transcribed" [Q-setup]; summaries always in English [Q-setup]; Sona's texts appear in the Inbox thread [Q-act]; calls logged to the CRM like other calls [Q-appt]. Email notifications listed as an integration [Q-price]. Retention: not found. Disclosure: recommended in greeting [Q-setup].

**6. Admin and seats**: Sona is configured per inbox (phone number) and billed per workspace; seats are per user for the phone system. Usage on the Sona tab or Plan & billing [Q-bill].

**7. Integrations**: Slack, Zapier, Make, webhooks (beta), HubSpot, Salesforce, Zoho, Pipedrive, Attio, Jobber, Gong, Google Contacts [Q-price]; MCP server [Q-sona listing in llms.txt].

**8. Features** (Sona is "Included on All Plans" (Starter, Business, Scale) with 10 calls a month; more calls through credit tiers $25–$199 [Q-price]; [Q-ans] = https://www.quo.com/answering-service)
- All plans: answers FAQs from uploaded policies/FAQs or website URLs; detailed message taking; lead qualification and intake; booking link by text; Send SMS and call transfer actions; Jobber request creation; conversation history; English, Spanish, French (beta) with language detection when 2–3 are selected; summaries and transcripts in the workspace and CRM; call recording; up to 10 jobs per Sona step [Q-ans], [Q-setup], [Q-act], [Q-hist], [Q-price].
- "Lead capture over SMS": Sona answers new leads by text, 50 credits per conversation [Q-bill], [Q-price].
- AI call tags: Scale plan only; AI call summaries and transcripts "All calls" on Business and Scale [Q-price].
- "HIPAA ready" on Business and Scale [Q-price].
- Spam: no blocking feature; "spam and robocalls typically hang up" when they reach Sona and calls under 15 s are free [Q-ans].
- Direct calendar booking and live rescheduling: no [Q-appt]. Outbound AI calls: not found. Owner notification specific to Sona: not found.
- Extra numbers $5/month each [Q-price].

---

## 6. Ooma (Ooma Office: AI Answering Service and AI Receptionist)

Sources:
- [O-page] https://www.ooma.com/small-business-phone-systems/ai-receptionist/
- [O-howto] https://www.ooma.com/small-business-phone-systems/how-to/setting-up-the-ai-receptionist/
- [O-pr] Ooma press release 12 May 2026, read as syndicated at https://www.01net.it/ooma-introduces-ooma-ai-to-streamline-business-call-management-and-transform-customer-experiences/ (businesswire.com copy blocked)

**1. Who, sales model, price**
- Add-ons to any Ooma Office plan (Essentials $19.95, Pro $24.95, Pro Plus $29.95 per user) [O-page].
- AI Answering Service: "Starts at $14.99/account/month", up to 40 minutes [O-page]. AI Receptionist: "Contact Sales for Pricing" [O-page].
- Contradiction: [O-pr] prices both **per license**: Answering Service "$14.99 per license, including 40 minutes"; AI Receptionist (Beta) "$49.99 per license, including 100 minutes", "fully available in the coming weeks". Overage: "additional usage tiers"; rate not found.
- Trial and card: not found.

**2. Setup flow** [O-howto]
1. Admin logs in to Ooma Office Manager > Settings > Ooma AI.
2. Voice Assistants > "New voice assistant" > Receptionist; accept Terms of Service on the first one.
3. Wizard: extension name and number; greeting up to 250 characters; one of four voices.
4. Notifications: who is notified and when, by call topic, urgency, or recipient.
5. Up to 10 FAQs, or point it at the website.
6. Review > "Create assistant".
- "After creation, the assistant can take calls and answer FAQs immediately"; routing calls to it is a separate step not shown. Test/preview: not found. Time: "Setup takes just a few minutes" [O-page].

**3. Configuration**: optional skills: Information to gather (up to five custom questions), Call Transfer to an Ooma extension with conditions, Appointment Scheduling (Google or Microsoft Calendar), SMS to Caller [O-howto]. Answering Service can answer during business hours, after hours, or only on missed calls; flags urgent calls [O-page].

**4. Phone number**: Ooma Office numbers; the AI is an extension [O-howto]. Forwarding/porting for the AI: not found.

**5. After each call**: "recorded, transcribed, and summarized"; notifications by SMS or email; call logs in the admin portal [O-page]. Retention and disclosure: not found.

**6. Admin and seats**: assistants are extensions in Ooma Office Manager [O-howto]; pricing basis conflicts (account vs license, above). Multiple locations: not found.

**7. Integrations**: Google and Microsoft calendars (also via "Ooma Online Booking Pages") [O-page], [O-howto]. Others not found.

**8. Features** (source [O-page] unless noted; both are add-ons to any Ooma Office plan)
- AI Answering Service ($14.99, 40 min): answers missed calls during or after business hours; FAQs from the information you enter; captures messages; "Flags calls as urgent"; notifications by SMS or email; every interaction "recorded, transcribed, and summarized".
- AI Receptionist (Contact Sales on the page; $49.99/licence with 100 min in [O-pr]; beta in May 2026): 24/7 coverage; routing to "the right person, department, or destination"; booking through Ooma Online Booking Pages (Google, Microsoft); sends links; "Support multiple languages" (not listed); handles several calls at once; call summaries and notifications; custom questions (up to five), conditional transfer, SMS to caller [O-howto].
- Listed for the AI tools without saying which: "Reminders and links via SMS & email", "Multiple voice options" (female and male), "Intelligent call routing", "Call transcripts, recording & summaries".
- Spam blocking, outbound AI calls, CRM, analytics: not found.

---

## 7. Aircall (AI Voice Agent)

Sources:
- [A-price] https://aircall.io/pricing/
- [A-bill] https://support.aircall.io/en-gb/articles/28888299272733 (charges)
- [A-launch] https://support.aircall.io/en-gb/articles/25979310514461 (launch guide)
- [A-create] https://support.aircall.io/en-gb/articles/40726709932317
- [A-config] https://support.aircall.io/en-gb/articles/40728331891357
- [A-tmpl] https://support.aircall.io/en-gb/articles/39660596587933
(Help articles are the en-gb site; read in a browser.)

**1. Who, sales model, price**
- Phone plans per license, minimum 3: Essentials $30, Professional $50, Enterprise custom (25 minimum); 25% off annual [A-price].
- AI Voice Agent: "with or without a phone system". Standalone "$99 per month minimum", no Aircall seat required [A-price].
- Minutes: 100 trial minutes once; 50 included every month on core plans; pay as you go $0.29/min; bundles 1,000/$250, 3,500/$805, 10,000/$1,900 ("annual commitment"); billed to the decimal minute, calls under 15 s free; test calls use minutes [A-bill], [A-price], [A-launch].
- Contradiction on the top tier: pricing page "as low as $0.12" over 50,000 minutes vs FAQ "from $0.19/minute" [A-price]. Third-party/search summary had $0.49/min; the vendor billing article now says $0.29.
- Trial: 7 days, "no card needed" (aircall.io signup and feature pages, search summary only).

**2. Setup flow** [A-create], [A-config], [A-launch]
- Before: Admin; connect integrations first; have opening hours, FAQ answers and transfer destinations ready.
- Dashboard > AI Agents > AI Voice Agents > Create > Inbound/Outbound > choose one of:
  - "Prompt with Ask Aircall": describe it in plain words; it asks questions and drafts the agent; "Ask Aircall never publishes your agent" (recommended for most).
  - Template (inbound only): FAQ Deflector, Lead qualifier (needs HubSpot), Order support (needs Shopify); guided steps Role and tasks > Voice and speech (name, greeting, farewell, voice preview) > Context (knowledge sources; suggested topics such as hours, pricing) > Conversation overview (test call) > connect number [A-tmpl].
  - Build manually: Persona > During call > Pre- and postcall > Call settings > Memory > AI Actions > Knowledge sources > Transfer rules.
- Test agent call, text chat test, Simulations (scenarios with pass/fail); integrations are simulated in tests.
- Publish changes, then Deploy > Connect number (existing or buy new) > add to the number's call flow > publish call flow. Template flow can auto-create the call flow.
- Go-live rule: "Your agent does not answer calls until you publish it and connect it to a phone number"; status Inactive until then. Launch checklist in [A-launch].

**3. Configuration** [A-config]
- Persona: name, one-sentence goal, tone in free text, language, formality, voice, noise removal, filler phrases, ambient sound, voice sliders.
- Greeting should say callers are speaking with an AI and what it can and cannot help with; farewell message.
- Conversation flow (plain-language instructions with inserted actions and transfer branches); no separate intake section.
- Call settings: max duration 1–30 min (default 10), always confirm key details, end-call confirmation.
- Knowledge sources up to 300,000 characters; company name required.
- Transfer rules: named branches with messages, destinations chosen in the call flow, mandatory Fallback branch.
- Hours: decided by where the agent sits in the call flow (first responder, overflow, after-hours) [A-launch].

**4. Phone number**: Aircall number required; buy new in Connect number [A-config]. Not on French mobile numbers [A-launch].

**5. After each call**: up to 25 extraction variables added to a call summary note and the webhook; transfer reason sent [A-config]. Recordings and transcripts in Conversation Center [A-launch]. Usage alert emails at a chosen threshold (informational only) [A-config]. Usage reports kept 90 days [A-bill]. Disclosure: in greeting [A-config]. Retention of recordings: not found.

**6. Admin and seats**: agents are account-level, attached to numbers; transfer targets are users or teams. Analytics dashboard for all; Inbound dashboards need Professional or Analytics+ [A-launch].

**7. Integrations**: AI Actions for HubSpot, Salesforce, Zendesk, Shopify, Attio, Front, Calendly, Help Scout; webhook [A-launch], [A-config].

**8. Features** ([A-prod] = https://aircall.io/products/ai/voice-agent/; AI Voice Agents included on Essentials and Professional with 50 min/month; standalone $99/month minimum; bundles add "support from FDE" [A-price], [A-bill])
- Inbound and outbound agents; outbound has a $0.015 call-origination fee per attempt on top of minutes, not covered by bundles [A-bill], [A-prod].
- Warm transfer with context; intent routing; booking and ticket creation through AI actions; knowledge sources with gap flagging; unlimited call concurrency; "38 languages" (not listed); voices, accents, or your own voice; numbers in 100+ countries; SOC 2 Type II; "HIPAA support available through a Business Associate Agreement on request" [A-prod].
- Templates (FAQ Deflector with message taking, Lead qualifier needing HubSpot, Order support needing Shopify) in English, Spanish, German, French [A-tmpl].
- Extraction variables to summary note and webhook; recordings and transcripts in Conversation Center; Simulations; Ask Aircall builder; memory across conversations [A-config], [A-launch].
- Analytics: AI Agents dashboard on all plans; Inbound dashboards need Professional or the Analytics+ add-on; "Agent performance" beta for selected customers [A-launch].
- "Responds to texts and WhatsApp messages" is the separate AI Messaging Agent [A-prod]. SMS sent by the voice agent, spam blocking: not found.

---

## 8. JustCall (AI Voice Agent)

Sources:
- [J-start] https://help.justcall.io/en/articles/10353843-ai-voice-agent-pricing-and-how-to-get-started
- [J-create] https://help.justcall.io/en/articles/9656596-how-to-create-your-first-ai-voice-agent
- [J-cost] https://help.justcall.io/en/articles/18454315-how-much-does-the-ai-voice-agent-cost
- [J-price] https://justcall.io/pricing/

**1. Who, sales model, price**
- Phone plans per user, minimum 2: Team $29, Pro $49, Pro Plus $89 (annual); Business and SalesPro custom [J-price]. 14-day trial, "No credit card required" [J-price].
- AI Voice Agent: add-on priced per minute through Sales ("Please connect with Sales/Account Manager team for tailored price"); overage $0.99/min from JustCall credits; volume "down to $0.15 per minute"; unlimited agents; first 100 minutes free, shared across agents; trial users must subscribe before buying the add-on [J-start], [J-cost].
- Requires an active JustCall subscription; calls must land on a JustCall number [J-start].

**2. Setup flow** [J-create]: AI Voice Agent > Create Agent > Start from scratch / Build with AI / Select Template > name > language (14) > voice (up to five custom voices) > Personalise Agent (role, personality, style, business context, pre-filled sample data) > greeting > script prompts > knowledge (up to 300 URLs, 40,000 chars text, 50 FAQs) > actions > assign a JustCall number (overrides that number's routing) > advanced settings (timezone, max duration, silence) > "Test Voice Agent" (works without a number) > "Finish Setup". "An agent cannot be enabled without an assigned number."

**3. Configuration**: in-call actions Schedule Appointment, Transfer Call, Send SMS; after-call Send SMS, Data Collection, Assign Disposition Code [J-create]. Hours and calendar choice: not found in these articles.

**4. Phone number**: JustCall number; forward an existing number to it [J-start]. Porting: not found.

**5. After each call**: JustCall AI transcripts and summaries; summary emails toggled in notification center (help articles 8159213 and 7896464, search summary only). Retention and disclosure: not found.

**6. Admin and seats**: agent count unlimited, billed by minute, separate from per-user seats [J-cost]. Purchasers: Account Owner, Admins, billing-permission users [J-start].

**7. Integrations**: HubSpot, Pipedrive, ActiveCampaign, HighLevel, Help Scout logging (search summary only).

**8. Features** ([J-prod] = https://justcall.io/product/ai-voice-agent/; "an add-on available on every plan", per minute "Starting at $0.15/min", first 100 minutes free [J-prod]; the pricing page marks it an add-on on Pro Plus and SalesPro [J-price])
- Inbound and outbound (outbound only to consented leads) in one agent; 14 languages, auto-detects 10 and switches mid-call; booking on Google Calendar or Outlook with live availability and custom booking rules; warm and cold transfer with fallback rules; texts mid-call and after the call; knowledge up to 500 URLs (refreshed every 24 hours), 500 Q&A pairs, 10 files; every call transcribed and stored with recordings and summaries synced to the CRM; 70+ integrations; custom API actions before and after the call; analytics (AI resolution rate, handover rate, actions, time saved); "handle hundreds of calls at once"; SOC 2 Type II; "The Business plan offers HIPAA, GDPR, and PCI-DSS compliance" [J-prod].
- Contradiction: the help center says 300 URLs and 50 FAQs [J-create], [J-start]; the product page says 500 and 500.
- Spam: carrier registration and "spam-label remediation" for outbound numbers; no inbound spam blocking found [J-prod].
- Message taking, multiple locations: not found.

---

## 9. CloudTalk (AI Voice Agent / AI Receptionist)

Sources:
- [C-price] https://www.cloudtalk.io/ai-voice-agent-pricing/
- [C-ga] https://www.cloudtalk.io/ai-receptionist-ga/
- [C-tmpl] https://help.cloudtalk.io/en/articles/14057883-voiceagent-templates-ai-receptionist
- [C-start] https://help.cloudtalk.io/en/articles/11053795-getting-started-with-voiceagents

**1. Who, sales model, price**
- Plans: AI Receptionist (self-serve, white-glove onboarding), AI Specialist (sales), Custom ("as low as €0.15 per minute", over 10,000 min) [C-price], [C-ga].
- Contradictions on the same page: AI Receptionist shown as €0 with 50 minutes in the table but "$99/month" with 200 minutes in the text; AI Specialist €349 and $349 with 1,000 min; FAQ says "~$0.35–$0.50/min" [C-price]. [C-ga] shows €0 with 50 min.
- Trial: 14 days with 50 AI minutes; card not stated [C-price], [C-ga].
- Seat requirement: not found; the feature "is currently not available for all accounts" [C-start].

**2. Setup flow** [C-tmpl], [C-start]: Admin; AI Voice Agents > Agents > "+ New VoiceAgent" > template "AI Receptionist" (Reception category) > Profile (name, languages with auto-detect, voice, contact-field personalisation, a structured Goal prompt with Identity / Style / Task flow / Guardrails sections pre-filled with placeholders for company name, routing rules, opening hours, location, "before going live") > knowledge files (not pre-filled) > skills > scenarios and guardrails > "Test VoiceAgent" (the agent calls your phone; "Test calls are real calls" and are billed) > connect a number in the Call Flow Designer.
- Marketing version: upload knowledge > set call destinations > turn it on; "Self-guided setup in <5 minutes" [C-ga].
- Go-live rule: "Creating a VoiceAgent does not automatically connect it to incoming calls"; "Active means the agent is enabled, not that it's answering calls" [C-start].

**3. Configuration** [C-tmpl]: skills Take a Message, Extract Information (name, callback number, inquiry by default), Answer Questions, Transfer to Human (conditions and destination agent/group), Appointment Booking (Google, Outlook, Calendly, Cal.com). Default scenarios: end after resolution, hang up on voicemail/robocalls, end after two unanswered check-ins. Business hours are set in the Call Flow Designer, not the agent. No keypad menus.

**4. Phone number**: CloudTalk number via Call Flow Designer [C-tmpl]. Forwarding/porting for the AI: not found.

**5. After each call**: recordings and transcripts on the call details page only with the "Conversation Intelligence package" [C-start]. Summaries, notifications, retention, disclosure: not found.

**6. Admin and seats**: max call duration per agent to control cost; call records kept when an agent is deleted [C-start].

**7. Integrations**: calendars above; HubSpot (agent name appears there); API, Zapier, Make for outbound triggers [C-start].

**8. Features** (source [C-price])
- AI Receptionist plan: 24/7 inbound coverage; "70+ languages and accents"; conversational routing (no phone trees); contact data collection and message taking; FAQs and basic business info; "Spam and robocall blocking"; booking in Google Calendar, Outlook, Calendly or Cal.com; "Coming soon: Appointment scheduling via SMS links"; white-glove onboarding.
- AI Specialist (€/$349, 1,000 min) adds: expert implementation; identity authentication; real-time workflows; multi-step resolution; "Payment & invoice transaction handling"; calendar sync, custom calendars and automated rescheduling; live and post-call analytics; outbound (page describes the Receptionist plan as for inbound).
- Custom: volume rates, custom minute packages, bespoke workflow mapping.
- Recordings and transcripts need the "Conversation Intelligence package" [C-start]; its price: not found.
- CRM entry, summaries, owner notifications, multiple locations: not found.

---

## 10. Vonage (AI Virtual Assistant for Vonage Business Communications)

Sources: [V-page] https://www.vonage.com/unified-communications/features/ai-virtual-assistant/ (read in a browser); [V-price] https://www.vonage.com/unified-communications/pricing/

1. Sales-led only ("Schedule a conversation", phone). No price; not listed on the plans page, which shows lines from "$13.99 per month/per line" (12-month promotion from $19.99) [V-page], [V-price]. Trial: not found. Third-party (search summary): an undisclosed add-on fee.
2. Setup: "a high-touch managed service both pre- and post-sale. You are assigned a conversational designer, and every project goes through scoping and sizing." The package "includes set-up, monitoring, speech recognition, and Natural Language Understanding"; managed in the "AI Design Studio app" [V-page]. No self-serve flow, timeline, or preview found.
3. Configuration: NLU intent routing; concierge/receptionist use case; "Easily deploy new scripts and make changes in real time" [V-page]. Hours, booking, message taking: not found.
4–7. Phone number, after-call outputs, retention, disclosure, seats, integrations: not found for the AI product. (Porting exists for Vonage lines generally [V-price].)

8. Features [V-page], one custom managed package, price not published: set-up, monitoring, speech recognition and NLU included; intent routing ("Seeking an expert", "Routing calls"); concierge/receptionist answering; outbound campaigns (surveys, lead qualification, recalls); high-volume business continuity; "AI Design Studio app"; insights from calls. Languages, booking, SMS, spam blocking, CRM, recordings, transcripts: not found.

---

## 11. Zoom (Zoom Virtual Agent Receptionist for Zoom Phone)

Sources: [Z-guide] https://library.zoom.com/zoom-workplace/zoom-phone/expert-insights/zoom-virtual-agent-receptionist-start-guide; [Z-page] https://www.zoom.com/en/products/voip-phone/features/ai-receptionist/

**1. Who, sales model, price**: standalone "starts at $25 per month (billed annually) for 100 minutes"; with Zoom Phone "Starting at $0.25 /minute billed annually + the cost of Zoom Phone"; "Start a free trial" (length and card not found); also sales [Z-page]. Licences: Zoom Phone or Contact Center, a ZVA licence, plus a Zoom Scheduler licence only for booking [Z-guide].

**2. Setup flow** [Z-guide]: Owner/Admin with AI Studio enabled.
1. Knowledge Library: files or a URL ("3 to 5 documents" to start).
2. AI Studio > ZVA Receptionist Wizard (greeting and voice, Knowledge Library, route to Zoom Phone, transfer by name, Zoom Scheduler, create or connect an Auto Receptionist) or an instruction template. Greeting under 10 seconds; Agent Guidance = Personality, Environment, Tone, Goal, Guardrails.
3. Skills (Name, Trigger, Instructions with a Tool).
4. Voice settings (temperature, filler words).
5. Test by calling the assigned number.
6. Publish ("Changes don't take effect until you publish").
7. Attach: Admin center > Phone system > Auto Receptionist > Site > Virtual Agent; "will not receive calls until a phone number is explicitly assigned".
- "Most ... setups are live within 60 minutes"; no IT needed [Z-page].

**3. Configuration**: routing to Call Queue, User, Auto Receptionist, Shared Line Group; dial-by-name over selected users; scheduling by Zoom Scheduler link [Z-guide]; marketing page also names Google, Microsoft, Calendly; message taking, SMS, callbacks [Z-page]. Hours: the Auto Receptionist's business-hours, holiday and fallback routing (search summary of Zoom community).

**4. Phone number**: standalone includes a "Dedicated phone number"; works with any carrier (SIP, analog, cloud) [Z-page].

**5. After each call**: "You receive a transcript of every call starting on day one"; analytics; CRM sync to Salesforce/HubSpot [Z-page]. AI Studio Transcripts tab with intents and routing [Z-guide]. Recordings, notifications, retention, disclosure: not found.

**6. Admin and seats**: AI Studio plus Admin center; per-seat basis: not stated. Multiple locations: per-site Auto Receptionist assignment [Z-guide].

**7. Integrations**: Zoom Scheduler, Google, Outlook, Calendly; Salesforce, HubSpot, Microsoft Dynamics [Z-page].

**8. Features** (source [Z-page]; the Zoom Phone bundle is "Everything in Zoom Virtual Agent Receptionist PLUS Zoom Phone")
- Both plans: 24/7 answering; answers from website, FAQ and documents; smart routing; transfer with context; transfer by name and dial by name; appointment scheduling and lead capture; calendars Zoom Scheduler, Google, Microsoft, Calendly; SMS with appointment reminders and links; message taking and callback scheduling (FAQ); English, Spanish and "10+ other languages" with no add-on cost; live transcription and a transcript of every call; real-time analytics; HIPAA BAA available (contact sales).
- Standalone only: 100 minutes and a dedicated phone number. Bundle adds: call recording, business SMS/MMS, unlimited US/Canada calling, voicemail transcription, auto attendants, shared lines.
- Booking needs a separate Zoom Scheduler licence [Z-guide]; price not found. Add-on minutes: price not found.
- Escalation to a Zoom video meeting or Contact Center queue (FAQ).
- Spam blocking, outbound AI calls, call summaries, owner notifications: not found.

---

## 12. 8x8 (Intelligent Customer Assistant as AI receptionist)

Source: [E-page] https://www.8x8.com/s/ai-receptionist (an explainer page, read in a browser); 8x8 ICA terms https://www.8x8.com/legal/terms-for-ica-services (search summary only)

1. Pitched at "an enterprise environment"; built on 8x8 Intelligent Customer Assistant (ICA) handing off to 8x8 Work or Contact Center [E-page]. Price, trial, self-serve: not found; third-party sources say contact sales (search summaries). ICA terms (search summary): voice and digital ICA "require separate implementation", usage pricing per the customer's Order.
2. Setup: "can often be configured and deployed within days by connecting them to your existing knowledge base and business hours" [E-page]. No admin setup docs found.
3. Greeting, intent recognition, routine answers, routing with context summary, calendar booking (Google, Outlook) with SMS/email confirmation, fallback to a human [E-page].
4. Phone number: 8x8 main number [E-page]; details not found.
5. "generates a transcript and summary, updating your CRM and notifying relevant team members" [E-page]. Retention, disclosure: not found.
6–7. Seats, locations, integrations beyond "CRMs": not found.

8. Features [E-page], tier and price not found: natural-language intent routing; transfer with a context summary; 24/7; scheduling and lead capture with Google or Outlook calendars and CRMs; SMS or email booking confirmations; multilingual with automatic detection; answers from knowledge bases; transcript and summary after the call with CRM update and team notification; fallback to a human or flag for follow-up. Speech-enabled directory (name dialing) appears in a search summary of 8x8 pages, not opened. Spam blocking, outbound AI calls, recordings: not found.

---

## 13. Grasshopper (AI receptionist through SmithAI)

Sources: [H-page] https://grasshopper.com/features/virtual-receptionist (undated); [H-blog] https://grasshopper.com/blog/new-spring-2026-features (6 May 2026). (A Grasshopper page, grasshopper.com/ai-information, was reported by a search tool to contain instructions aimed at AI assistants; it was not opened and nothing from it is used.)

1. Grasshopper sells one, but through a partner: "Grasshopper has partnered with SmithAI"; AI receptionist "Starts at $95/month"; AI, human, or both [H-page]. Plan/seat requirement: "Fully customizable with every plan", details not found. Base plans and trial: /pricing and /buy/trial linked [H-page].
2. Setup per [H-page]: sign up and choose a local, toll-free or vanity number or port; choose AI, human or mixed; "Upload a call playbook" covering inquiries, routing, booking and how to represent the business.
3. Booking, intake/lead qualification, routing and forwarding, payments, spam filtering, English/Spanish; playbooks "whether you have one location or 20" [H-page]. After-hours AI answers common questions, gathers information, logs follow-ups [H-blog].
4. New local/toll-free/vanity number or port [H-page].
5. Call recordings and transcripts [H-page]; a morning summary of who called and what they need [H-blog]. Retention, disclosure: not found.
6–7. Dashboard ("real-time dashboard") [H-page]; integrations not found.

8. Features [H-page], "Starts at $95/month", tiers above that not found: AI, human, or mixed receptionists; 24/7; "unlimited call capacity"; appointment scheduling; lead qualification and intake; general Q&A; call routing and forwarding; accept payments; spam filtering; bilingual English and Spanish; "Outbound Calls*" (footnote not on the page); real-time dashboard; custom call playbooks for one location or 20; call recordings and transcripts. CRM, SMS by the AI, calendars named: not found.

---

## Feature matrix

Each cell names the tier that offers the feature, "no" where a vendor page says it does not, or "n/f" (not found on the pages read). Sources are in each product's point 8.

Tier keys: **RC** both = Standalone $49 and AIR+RingEX; **GoTo** AIR = the AI Receptionist plan/add-on (unpriced); **Nextiva** $99 = XBert AI; **Dialpad** Resolve (custom); **Quo** all = Sona on Starter, Business, Scale; **Ooma** AS = AI Answering Service, AR = AI Receptionist; **Aircall** AIVA = AI Voice Agent (in Essentials/Professional, or standalone $99 minimum); **JustCall** add-on (per minute); **CloudTalk** Rec = AI Receptionist, Spec = AI Specialist; **Vonage** managed (custom); **Zoom** both = standalone $25 and Zoom Phone bundle; **8x8** listed = on the 8x8 page, tier not found; **Grasshopper** $95 (SmithAI).

| Feature | RC | GoTo | Nextiva | Dialpad | Quo | Ooma | Aircall | JustCall | CloudTalk | Vonage | Zoom | 8x8 | Grasshopper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Answers FAQs from your content | both | AIR | $99 | Resolve | all | AS, AR | AIVA | add-on | Rec | managed | both | listed | $95 |
| Auto-fills setup from website or Google listing | both (website, Google Business Profile) | n/f | $99 (website, Google Maps) | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f |
| Learns from a website URL | both | AIR (crawl, manual refresh) | $99 | Resolve (crawler) | all | AR | AIVA | add-on (refresh 24 h) | n/f | n/f | both | n/f | n/f |
| Document upload | both (unlimited) | AIR (10 MB) | $99 (CSV/Excel, docs) | Resolve (5 MB) | all (10 MB) | n/f | n/f | add-on (10 files) | Rec | n/f | both | n/f | $95 (call playbook) |
| Transfer to people, queues or groups | both (with context) | AIR (30 topics) | $99 (with context) | Resolve (with context) | all (member, inbox, external) | AR | AIVA (with context) | add-on (warm/cold) | Rec | managed | both (with context) | listed (with context) | $95 |
| Transfer by name | both | AIR | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | both | n/f | n/f |
| Direct calendar booking | both (Google, Outlook, Calendly) | Xtime/athenaOne only, needs automotive, healthcare or CX plan or integrations package | $99 (Google, Outlook) | Resolve (connectors) | no (link only) | AR (Google, Microsoft) | AIVA (Calendly action) | add-on (Google, Outlook) | Rec; rescheduling Spec | n/f | both (+ Zoom Scheduler licence) | listed | $95 |
| Booking link by text | both | AIR (static text) | n/f | n/f | all | AR | n/f | add-on | coming soon | n/f | both | n/f | n/f |
| Message taking | both (lead capture) | AIR (capture forms emailed) | $99 | n/f | all | AS, AR | AIVA (FAQ Deflector template) | n/f | Rec | n/f | both | n/f | $95 (logs follow-ups) |
| Custom intake / lead questions | both | AIR (forms) | $99 | Resolve (skills) | all | AR (5 questions) | AIVA | add-on | Rec | managed | both | listed | $95 |
| AI texts the caller | both ("AI SMS agent" may cost extra) | AIR (needs SMS registration) | $99 (10DLC) | n/f | all (10DLC) | AR | n/f (separate Messaging Agent) | add-on | coming soon | n/f | both | listed | n/f |
| Spam / robocall blocking | yes, tier n/f (Jul 2026) | n/f | n/f | n/f | no (short calls free) | n/f | n/f | n/f | Rec | n/f | n/f | n/f | $95 |
| Outbound AI calls | n/f | n/f | n/f | Resolve (mentioned) | n/f | n/f | AIVA (+$0.015/attempt) | add-on (consented leads) | Spec | managed | n/f | n/f | $95 (asterisked) |
| Languages | both: 7 listed + Dutch | AIR: conflict (4+ vs 10+) | n/f | English only | all: EN, ES, FR (beta) | AR: "multiple" | AIVA: 38 | add-on: 14 | Rec: 70+ | n/f | both: EN, ES + 10 | listed | $95: EN, ES |
| Automatic language switching | both | n/f | n/f | no | all (2–3 selected) | n/f | n/f | add-on (10 of 14) | Rec | n/f | n/f | listed | n/f |
| CRM entry | both (Salesforce, Zoho, HubSpot) | n/f | $99 | Resolve | all | n/f | AIVA | add-on (70+) | n/f | n/f | both (Salesforce, HubSpot, Dynamics) | listed | n/f |
| Zapier / webhooks / API | n/f | n/f | $99 (Zapier, Make, webhooks) | n/f | all (Zapier, Make, webhooks beta) | n/f | AIVA (webhook) | add-on (custom API actions) | API, Zapier, Make (outbound triggers) | n/f | n/f | n/f | n/f |
| Call recording | both | n/f | $99 | n/f | all | AS (AR n/f) | AIVA | add-on | Conversation Intelligence package (price n/f) | n/f | bundle only | n/f | $95 |
| Transcripts | both | n/f | $99 | Resolve | all | AS (AR n/f) | AIVA | add-on | Conversation Intelligence package | n/f | both | listed | $95 |
| Summary or notice to owner/team | both (on transfer; lead emails) | AIR (email per transfer; forms) | $99 (email, text, callback) | n/f | all (workspace, CRM) | AS (SMS, email); AR (by topic, urgency) | AIVA (summary note, webhook) | add-on | n/f | n/f | n/f | listed | $95 (morning summary) |
| Call analytics | both | AIR (portal reports plan-dependent) | $99 | Resolve | all (call tags Scale only) | n/f | all plans; Inbound dashboards Professional or Analytics+ | add-on | Spec | managed | both | n/f | $95 (dashboard) |
| Overflow from people or queues to the AI | both | n/f | n/f | n/f | all (after "Ring users") | n/f | AIVA | n/f | n/f | n/f | n/f | n/f | n/f |
| Multiple locations | both | n/f | $99 | n/f | n/f | n/f | n/f | n/f | n/f | n/f | per site | n/f | $95 (up to 20) |
| Several AI agents per account | both (unlimited) | AIR | $99 | Resolve | all | AR | AIVA | add-on (unlimited) | Rec | n/f | n/f | n/f | n/f |
| Other channels (chat, WhatsApp, social) | WhatsApp coming soon | AIR: SMS, WhatsApp, webchat, social | $99: SMS, live chat | Resolve: web chat | all: SMS lead capture | n/f | separate Messaging Agent | n/f | n/f | n/f | video-meeting escalation | n/f | n/f |
| Human receptionist option | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | $95 (AI, human or both) |
| Takes payments | n/f | n/f | n/f | n/f | n/f | n/f | n/f | n/f | Spec | n/f | n/f | n/f | $95 |
| HIPAA | both | n/f on pages read | $99 (badge) | Resolve (healthcare claim) | Business, Scale ("HIPAA ready") | n/f | BAA on request | Business plan | n/f | n/f | BAA (contact sales) | n/f | n/f |
| Test before going live | both (chat, call) | test call after dial plan only | $99 (call or chat preview) | Resolve (text test) | all | n/f | AIVA (call, chat, simulations) | add-on | Rec (real, billed call) | n/f | test call on assigned number | n/f | n/f |
| Templates | n/f (builds from IVR) | n/f | Launch Ready: Receptionist, Sales, Support | Resolve (skill templates) | all (job templates) | n/f | AIVA (3 templates) | add-on | Rec | n/f | both (wizard, templates) | n/f | n/f |

---

## Patterns across these products

**P1. The receptionist is a business-level object attached to a number or call flow, never to a user seat.**
- Seats are sold per user for the phone system, while the AI is priced per account/workspace, per AI licence, or per minute, and attached to a number, site, department or call flow: RingCentral (AIR licence with 100 minutes; RingEX seats per user), Quo (Sona credits "every workspace"; Sona set up per inbox), Aircall (standalone $99 minimum, "no Aircall seat"), JustCall (per-minute add-on, unlimited agents), Dialpad (credit pool; attached to departments/main lines), Zoom (per-minute on top of Zoom Phone).
- Exception and contradiction: Ooma's press release prices both AI products "per license" while its product page says "/account/month"; Nextiva's bundle ties XBert to "1 Core License".
- Multiple receptionists per account are normal (one per location, department or call-flow position): RingCentral, GoTo, Quo, JustCall, Aircall.

**P2. Usage is metered (minutes, calls or credits), with a small included allowance and a fallback when it runs out.**
- Minutes: RingCentral (100, $0.50/min), Aircall (50/month + 100 trial; $0.29/min), Ooma (40 or 100 per licence), Zoom (100 for $25), JustCall (100 free then quoted; $0.99 overage), CloudTalk (50/200).
- Calls or credits: Quo (100 credits a call; overage **off by default**, calls fall to the call flow's fallback; emails at 80% and 100%), Dialpad (billed only when the AI "retrieves information or executes a real action"), Nextiva (100 interactions, $1.50 each after; contradicted by its bundle page).
- Short calls not billed: Quo and Aircall (under 15 s). Test calls cost minutes: Aircall, CloudTalk.
- When out of minutes, calls route to a backup: RingCentral (backup extension), Quo (fallback path/voicemail).

**P3. Setup order converges on: business facts > persona and greeting > knowledge > abilities (transfer, booking, message) > test > publish > connect a number. The AI does not answer until that last step.**
- Explicit "not live until connected/assigned": RingCentral (Assign; "Active" vs "Not in use"), GoTo (dial plan), Quo (Publish call flow), Aircall (Publish + Connect number; "Inactive"), JustCall ("cannot be enabled without an assigned number"), CloudTalk ("Active means the agent is enabled, not that it's answering calls"), Zoom (Publish + assign number), Dialpad (routing option "To an AI agent").
- Exception: Ooma says the assistant "can take calls and answer FAQs immediately" after creation; Nextiva's basic onboarding ends with "Your business will now be online".
- A test before going live is standard: chat and/or test call (RingCentral, Nextiva, Quo, Aircall with simulations, JustCall without a number, CloudTalk calls you, Dialpad text test). GoTo and Zoom only describe test calls on the assigned number.
- Self-serve products quote minutes to an hour (RingCentral same day, Nextiva under an hour, Zoom 60 min, CloudTalk under 5 min); sales-led ones are managed projects (Vonage "scoping and sizing", 8x8 "within days", Dialpad Resolve custom).

**P4. Business information is gathered by reading what already exists, then the owner reviews it.**
- Website scan pre-fills hours, greeting, services, FAQs: RingCentral (Jan 2026), Nextiva (website or Google Maps), Quo (website import), GoTo (crawl two levels deep, a one-time snapshot), Zoom, JustCall (300 URLs), Aircall, Dialpad (crawler).
- Google Business Profile: RingCentral (Feb 2026), Nextiva.
- Reuse of the phone system's own data: RingCentral pre-fills location and hours from company settings and can build from an existing IVR; Zoom/GoTo/Dialpad reuse directories for transfer by name.
- Document upload: nearly all (size limits 5–10 MB). Structured Q&A caps: GoTo 15, Ooma 10, JustCall 50.
- Templates are per use case, not per industry: Aircall (FAQ Deflector, Lead qualifier, Order support), CloudTalk ("AI Receptionist" template with placeholders for company, routing, hours, location), Quo (Message taking, Lead qualification jobs), JustCall, Dialpad skills. Nextiva shows industry demos but no industry templates were found.
- Plain-language builders draft the agent from a description: Aircall "Ask Aircall" (never publishes by itself), JustCall "Build with AI".

**P5. Hours, booking and transfer reuse the phone system; the AI's own settings stay small.**
- Business hours live in the call flow, dial plan or auto receptionist rather than in the agent: GoTo, Quo, Aircall, CloudTalk ("not inside the agent"), Zoom, Dialpad. RingCentral reads them from company settings.
- Transfers go to existing users, queues, groups or directories, with context passed: RingCentral, GoTo (up to 30 topics), Quo (member, inbox, external), Aircall (named branches + Fallback), Zoom, Ooma, CloudTalk.
- Booking: direct calendar booking with Google/Outlook (RingCentral, Nextiva, Ooma, CloudTalk + Calendly/Cal.com, Zoom via Scheduler) vs text-a-link (Quo, GoTo texting) vs vertical systems only (GoTo: Xtime, AthenaOne).
- Limits on what the AI may say are free-text guardrails, not structured rules: Dialpad (per-skill Guardrails; "no-guess zones"), Zoom (Guardrails in Agent Guidance), CloudTalk (Guardrails section), Nextiva ("topics the AI should avoid"), GoTo ("Interaction rules").

**P6. After the call: transcript and summary are the norm; recording is usually on; retention is never stated; disclosure is left to the customer.**
- Transcripts/summaries: RingCentral, Nextiva (email, text, or callback), Quo (always in English), Aircall (extraction variables in a summary note and webhook), Zoom, Ooma (SMS or email), 8x8, Grasshopper.
- Recordings by default or automatic: Quo ("every Sona call is recorded"), Nextiva, Ooma, RingCentral (automatic recording option), Aircall. CloudTalk requires a paid add-on for recordings and transcripts.
- Retention period: not found for any product (only Aircall's 90-day usage reports).
- Disclosure: vendors put it on the customer, usually as greeting text: Quo and Aircall recommend AI and recording notices in the greeting; Nextiva says the greeting "should disclose" AI; GoTo suggests a sound clip before the AI and says compliance is "your responsibility". Only RingCentral has a built-in caller opt-out (stops transcription and transfers to the backup extension). GoTo's texting asks the caller's consent before every text.

**P7. Self-serve signup collects identity and payment before the AI exists.**
- Quo: email code > name > team/solo > mobile verification > number (new or port) > plan > card; then ID verification with limits until done.
- JustCall and Aircall: trial without a card; JustCall requires a paid subscription before buying the AI add-on, Quo before paid Sona tiers.
- RingCentral and Nextiva sales forms ask company size; Nextiva's bundle is limited to businesses up to 200 employees.
- Sales-led: GoTo, Vonage, 8x8, Dialpad Resolve.

**P8. Receptionist features are mostly in one tier; higher tiers sell usage, implementation, analytics and depth, and a few core outputs are carved out.**
- One feature set, priced by usage: RingCentral (the pricing table lists the same features for Standalone and AIR+RingEX), Quo (Sona on every plan; tiers add calls only), Aircall (bundles add minutes and engineer support), JustCall (per minute), Zoom (bundle adds the phone system).
- Upper tier adds depth: CloudTalk AI Specialist adds rescheduling, payments, identity checks, analytics and outbound; Ooma's AI Receptionist adds routing and booking over the Answering Service; GoTo's booking needs an industry or CX plan.
- Core outputs sold separately or only in the phone bundle: CloudTalk recordings and transcripts need the Conversation Intelligence package; Zoom call recording is bundle-only; RingCentral's "AI SMS agent" may carry extra charges; Aircall's Inbound dashboards need Professional or Analytics+; Quo's AI call tags are Scale-only.
- Spam blocking is listed by only three (RingCentral, CloudTalk AI Receptionist, Grasshopper); outbound AI calls by Aircall, JustCall, CloudTalk AI Specialist, Vonage and Grasshopper; transfer by name by RingCentral, GoTo and Zoom.
