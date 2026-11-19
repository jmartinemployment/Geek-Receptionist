# Group 4: AI receptionists built into vertical software, or built for one industry

Researched 2026-11-19 from each vendor's own pages (pricing, product pages, help centers). Every fact has its source URL. "Not found" means the page read does not say it. Anything from a site other than the vendor's is marked **(third-party)**. Pages were read through a fetch tool that summarises, so wording is close to the vendor's but not always verbatim; quoted phrases are the vendor's.

Products: Jobber, Housecall Pro, Sameday AI, Avoca, CallRail, Yelp, Podium, Slang.ai, Loman, Numa.

Each product has eight points: 1 who/pricing, 2 signup and setup, 3 configuration, 4 phone number, 5 after each call, 6 dashboard, 7 integrations, 8 features (with plan/tier and add-on price). A feature matrix and the cross-product patterns are at the end.

---

## 1. Jobber: Receptionist (powered by Jobber AI)

Main sources:
- Help article, setup and settings: https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/ (cited below as **[JH]**)
- Help article, mobile app: https://help.getjobber.com/es/articles/receptionist-in-the-jobber-app/ (**[JApp]**)
- Product page: https://www.getjobber.com/features/ai-receptionist/ (**[JP]**)
- Pricing page: https://www.getjobber.com/pricing/ (**[JPr]**)

### 1.1 Who, sales model, pricing
- **For:** home service businesses ("plumbers, HVAC techs, landscapers, cleaners") [JP]. It is a feature of Jobber's field-service software; the Receptionist section "only appears in accounts that have an active Receptionist add-on subscription" [JApp]. Requires Jobber.
- **Self-serve:** yes. 14-day free trial of the Grow plan, "No credit card required"; billing details requested near the end of the trial [JPr]. The setup flow itself ends with "Add the add-on if needed" [JH].
- **Pricing model:** per business (an add-on on the account), with a monthly conversation allowance and per-conversation overage.
  - Included on the **Plus** plan "with unlimited usage" [JH].
  - Add-on for "select plans" at **$29/month, which includes 30 conversations**; each conversation beyond 30 is **$0.79**. Conversations tagged "no conversation" or "spam" do not count [JH].
  - A call counts when Receptionist "actively engages"; a text conversation lasts up to 24 hours from the first Receptionist reply [JH].
  - Usage alerts: email to admins at 75% (23) and 100% (30); in-app banner at 10 remaining. At the limit the owner chooses to **pay overages** or **pause**: paused, calls go to message-taking only (not counted), no booking, resumes next billing cycle [JH].
- **Base software prices** (per month, annual billing / monthly no-commitment): Core 1 user $29/$49; Connect 1 user $99/$139 up to 15 users $299/$399; Grow 1 user $149/$199 up to 15 users $399/$499; Plus 5 users $399/$499 up to 15 users $529/$699; additional users $29/month each [JPr]. The pricing page lists Receptionist as a Plus feature and "Add-on" for the other plans at $29/mo; it does not state the 30-conversation allowance or overage [JPr].
- **Contradiction:** the help article says the add-on is for "select plans" [JH]; the pricing table shows "Add-on" for Core, Connect and Grow [JPr]. A Jobber product-update page said Receptionist is "included in the Plus plan, or available as an add-on to the Grow plan" (seen only as a search snippet; the page returned 403: https://productupdates.getjobber.com/121638-receptionist-now-does-more-to-assist-your-existing-clients).

### 1.2 Signup and setup flow
Order, from the Receptionist page, "Get Started" [JH]:
1. **Greeting:** a greeting is pre-written automatically; the company name comes from Jobber company settings. "Play preview" makes Receptionist call your phone so you hear it; pencil icon edits it.
2. **Automatic actions:** choose which tasks Receptionist does on its own (e.g. scheduling jobs, taking requests). Tasks left off make Receptionist "ask first".
3. **Who is in the loop:** pick team members who get tasks, and the keywords that escalate calls and texts.
4. **Essential information:** enter "about" details, policies and services; a checkbox lets AI generate it; Continue.
5. **Test:** enter your phone number and Receptionist calls you; example questions to ask are shown.
6. **Finish:** add the add-on if needed, set up a dedicated phone number if needed, "Save & Exit".
- **Before payment:** steps 1-5 come before the add-on purchase in step 6 [JH]. The trial itself needs no card [JPr].
- **Where business facts come from:** data already in Jobber. Receptionist "works on day one using data already in Jobber: company profile, services, request forms, and booking settings" [JP]. Information sources [JH]: Company settings (name, contact details, region, tax settings); Business profile ("Essential information": services, policies, what makes the business unique; a summary is generated automatically and guides answers but is not read word for word); FAQs from a Jobber website (does not need to be published). Booking uses the existing Online Booking form and settings [JH]. "No scripting or setup calls are required" [JP].
- **Time to live:** not stated [JP].
- **Answers before setup finished:** not stated. There is no separate go-live step; calls and texts each have an On/Off toggle on the dashboard [JH].
- **Test call before live:** yes, step 5 has Receptionist call the owner [JH]. Texting can be left "Off" with only "trusted access" numbers answered, "useful for testing" [JH]. Public demo line 737-388-0043 (US) does a two-call test (second call checks recognition and rescheduling) [JP].

### 1.3 Configuration
- **Greeting:** auto-written, read exactly as written; phonetic spelling can fix pronunciation; tone: Casual, Professional, Brief. Text greeting max 300 characters. Greetings "may be reviewed"; one that misrepresents the business or could put a caller at risk "may not save" [JH].
- **Known callers:** greets matched clients by name using template variables; optional "upcoming appointment" message; "Identify clients" matches caller ID [JH].
- **Voice:** dropdown with "Play sample"; optional background noise (call-centre sound, recommended) [JH].
- **Business hours / after hours:** a "Business hours" toggle gives separate open and closed greetings, each with its own phone menu (IVR). Tasks created after hours are scheduled next day [JH].
- **Phone menu (IVR):** Book a service, Get started on an estimate, Leave a message, Speak with someone (requires an escalation policy) [JH].
- **Knowledge:** company settings, business profile, Jobber website FAQs (above). If it can't answer, it can direct the caller to contact the business [JH].
- **Transfers / escalation:** trigger terms (e.g. "emergency", "speak to a manager") [JH]; examples "no heat", "burst pipe", a commercial account name, or a caller asking for the owner by name [JP]. Contact method: **text** (transcript snippet plus callback link) or **live transfer** (optionally to a different number). The escalation number must differ from the business/dedicated number. Escalated calls tagged "Call escalated" [JH].
- **Booking:** uses Online Booking settings for bookable team members and services; can look up visits, cancel (visit becomes unscheduled with a note) and reschedule (needs online booking). Unbookable work becomes a **request** through the chosen request form [JH][JP].
- **Message taking:** messages become Jobber **tasks**, assigned to chosen team members [JH][JP].
- **Limits on promises:** owners "set rules for what the AI can and can't do" and "shape how services are described" [JP]; "Automatic actions" off = ask first [JH]. No specific rule on prices or arrival times found.

### 1.4 Phone number
- A **dedicated Jobber phone number (DPN) is required**; available in US, Canada, UK [JH].
- Keep the existing number by **carrier forwarding** (after a set number of rings or outside hours) [JH][JP]. Google Voice steps given (link DPN, turn off caller-ID passthrough and call screening, turn on Jobber's ~10-second "answering delay") [JH].
- **Porting:** not covered [JH].

### 1.5 After each call
- Conversation record: client name, phone, property address, summary, **call recording, transcript** [JH]; logs cover calls, SMS and Jobber-website webchat; recording is calls only [JApp].
- Statuses: Needs action, For review, No action, Resolved [JApp]. Tags: General inquiry, Needs action, Request created, Assessment scheduled, Job scheduled, Took a message, Spam, Call escalated [JH].
- Created records: jobs, requests, tasks [JH]. Tasks appear on home, schedule and activity feed; tasks created during business hours send a **mobile push**; optional email to task assignees [JH].
- Hang-up **SMS send-back** to callers who hang up early (new callers, matching clients, not more than once per 24 h, not to STOP repliers) [JH].
- "The article doesn't describe notifications for every call" [JH].
- **Retention:** not found [JH].
- **Consent / disclosure:** Jobber "encourages" telling callers that AI answers or that calls may be recorded; optional; owner must check state recording laws [JH].

### 1.6 Dashboard / app
- Web dashboard: status (calls/texts on/off, "Configure"), time saved (minutes, counts, call-to-text ratio), outcomes (jobs, requests, tasks created), recent conversations with summary, tag and "View details" [JH].
- Mobile app: logs with status filter, details, mark resolved; on/off for calls, texts, webchat; "Advanced configuration remains in the browser version" [JApp].
- Owner can watch text conversations live and take over [JP]; can disable Receptionist per text conversation [JH].
- **Users:** "Only admins can access the dashboard and settings"; multiple team members can be assigned tasks; one escalation contact [JH].
- **Multiple locations:** not found for Receptionist; multi-location/franchise Jobber pricing is custom via Partnerships [JPr].
- Handles concurrent calls; answers 24/7 when on [JH].

### 1.7 Integrations
- Native to Jobber (clients, online booking, requests, tasks, website) [JH]. No other Receptionist integrations found on vendor pages.

### 1.8 Features
Tier for everything below: the Receptionist itself. Included on **Plus** ("unlimited usage"); on other plans an **add-on at $29/month with 30 conversations, $0.79 per extra conversation** [JH][JPr]. No sub-tiers of Receptionist were found.
- Answers calls 24/7; handles several calls and texts at once [JP][JH].
- Answers texts (SMS) to the dedicated number; owner can watch live and take over [JH][JP].
- Webchat from a Jobber-built website (logs cover webchat) [JApp].
- Answers questions from Jobber data (company settings, business profile, website FAQs) [JH][JP].
- Captures lead and property details [JP].
- Books jobs and assessments through Online Booking; creates **requests** when it can't book [JH][JP].
- Reschedules and cancels existing visits (needs online booking) [JH].
- Takes messages as Jobber **tasks** assigned to team members [JH][JP].
- Hang-up **SMS send-back** [JH].
- Escalation keywords → live transfer or text alert to the owner [JH][JP].
- Phone menu (IVR): book, estimate, leave a message, speak with someone [JH].
- Known-caller greeting by name and upcoming-appointment message [JH].
- Separate business-hours and after-hours greetings and menus [JH].
- Voice choice, tone (Casual / Professional / Brief), background noise, answering delay [JH].
- Summary, transcript and recording per call; conversation tags incl. **Spam** (spam not billed) [JH][JP].
- Dashboard: time saved, outcomes (jobs, requests, tasks) [JH]; mobile app on/off per channel [JApp].
- **Receptionist Companion** (drafts a quote or schedules a visit during a call the owner is on): "COMING SOON" [JP].
- Languages, outbound calls, multiple numbers, multiple locations: not found.

---

## 2. Housecall Pro: CSR AI

Main sources:
- Help, Getting started: https://help.housecallpro.com/en/articles/12996637-getting-started-with-csr-ai (**[HG]**)
- Help, Overview: https://help.housecallpro.com/en/articles/9740104-csr-ai-overview (**[HO]**)
- Help, Best practices and FAQs: https://help.housecallpro.com/en/articles/12001958-csr-ai-best-practices-and-faqs (**[HB]**)
- Help, AI Team overview: https://help.housecallpro.com/en/articles/9311875-ai-team-overview (**[HT]**)
- Product page: https://www.housecallpro.com/features/ai-team/csr-ai/ (**[HP]**)
- Pricing page: https://www.housecallpro.com/pricing/ (**[HPr]**)

### 2.1 Who, sales model, pricing
- **For:** home service businesses (HVAC, plumbing, electrical, handyman, landscaping, pest control and others) and commercial service operations [HP]. Part of Housecall Pro's field-service software; uses Housecall Pro data (services, hours, availability, job history, price book) [HP]. Requires Housecall Pro.
- **Pricing:** CSR AI is an **optional add-on**; "All members are included free ... except CSR AI" [HT]. **No price published** on the pricing page, product page or help articles read [HPr][HP][HO]. Product page says only "a fraction of the cost of an office admin" [HP]. Third-party sites also report no published price ("custom quote") **(third-party)**: https://blocksentient.com/review/housecall-pro-csr-ai/ , https://www.usecarly.com/blog/housecall-pro-ai-receptionist/ .
- **Base software** (annual / monthly): Basic $59/$79, 1 user; Essentials $149/$189, 5 users; Max $299/$329, 8 users, extra users $35/mo each; Max shows "Book Demo" [HPr].
- **Trial:** 14 days, "No credit card required", full access to Max plan [HPr]; product page also offers a free trial, "No credit card required" [HP]. Whether CSR AI is usable inside the trial: not found.
- **Sales-led vs self-serve:** mixed. "Book a demo or start a free trial" [HP]; getting started references a "CSR AI onboarding specialist" and a text that arrives "About an hour after you attach the CSR AI product" [HG].

### 2.2 Signup and setup flow
From Getting started [HG], in order:
1. **Call forwarding:** forward your calls so CSR AI answers; method depends on carrier; HCP Voice can also be used. About an hour after the CSR AI product is attached, a **text message walks you through call forwarding**.
2. **Forwarding number:** obtained from your **CSR AI onboarding specialist** or via the in-app chat bubble.
3. **CSR AI Settings:** whether CSR AI books jobs, and where calls go when a caller asks for a human.
4. **Booking settings:** who can be booked, when, which services; or choose unscheduled jobs/estimates instead. Shared with Online Booking.
5. **Price book line items:** mark services active for booking; set duration, who can be booked, description, price.
6. **Service area:** enable so CSR AI books only inside it (can be turned off to treat everyone as in-area).
- "Once these settings are complete, CSR AI is ready to handle calls" [HG]. Product page: forward calls and be "live in minutes"; booking rules, pricing and service area "can be fine-tuned later and aren't required to start" [HP].
- **Contradiction:** [HG] lists booking, price book and service area before "ready"; [HP] says they are not required to start.
- **Business facts source:** existing Housecall Pro data (business name, company description, price book, schedule, hours, job history) [HO][HP]. A "Knowledge Base" tab shows what CSR AI knows (search snippet of help center; not read in full).
- **Before payment:** not found.
- **Test call:** "Test CSR AI" button at Settings > Team & Permissions > Team > AI Team, plays your scripts, voice, tone, background noise and business details; non-subscribers can use a demo page [HO].

### 2.3 Configuration
- **Customization** [HO]: voice, tone, background noise; how it handles **pricing questions**; custom scripts; pronunciation of the business name.
- **Price wording guidance** [HB]: don't put the price in the service description, CSR AI "pulls the set price from your available services"; for $0 items explain why no price can be given (e.g. technician quotes on site). Keep descriptions short; use specific line-item names ("Repair - Dishwasher").
- **Hours / after hours** [HO]: escalation rules apply during company hours; after hours it can call you, text you, or log a private note. "Emergency handling is always on"; emergencies forwarded or texted per settings.
- **Transfers** [HO]: during hours, forward to a number you provide, forward to an HCP Assist agent for note-taking, or end politely and send notes. Escalation number must differ from the forwarding number.
- **Booking** [HO][HG]: books jobs and estimates onto the calendar, checks technician availability, recognises line items; reschedule/cancel are permission-controlled; if it can't book, owner notified by text and inbox to call back.
- **Languages:** Spanish "planned but not yet available" [HO].
- Text answering: "coming soon" [HP]; an alpha help article exists (https://help.housecallpro.com/en/articles/16673934-csr-ai-text-answering-in-alpha, not read).

### 2.4 Phone number
- Housecall Pro gives a **call-forwarding number used only for CSR AI**; it "should not be used in any marketing or advertising" [HO]. The business forwards its existing number to it (carrier, VoIP or HCP Voice) [HG][HO].
- New public number / porting: not found.

### 2.5 After each call
- Owner can choose to receive a **notification after each CSR call** [HO]. Channel: not specified beyond text and inbox for unbooked calls [HO].
- Call details: customer info, **summary**, urgency [HO]; summaries, booking details and customer info logged in call log and calendar, web and mobile [HP].
- Transcripts, recordings: not mentioned [HO][HP]. Retention: not found (overview points to privacy page) [HO].
- **Disclosure contradiction:** Overview says CSR AI "introduces itself as 'AI'" and "No separate disclaimer is required" [HO]. Best-practices FAQ says "The default greeting no longer includes the AI disclosure. You can add it back" [HB]. Product page: "You decide whether CSR AI discloses that it's AI" [HP].

### 2.6 Dashboard
- CSR AI dashboard: calls and chats handled, jobs and estimates booked, booking conversion rate, self-resolution vs escalation, revenue from booked jobs, top call reasons, trends; filter by period and channel [HO].
- Users/seats: settings under Team > AI Team; no per-user detail [HO][HT]. Locations: not found.

### 2.7 Integrations
- Native to Housecall Pro (calendar, price book, online booking, inbox); forwarding from carrier/VoIP/HCP Voice [HO]. Nothing else found.

### 2.8 Features
Tier: CSR AI is an **optional add-on; price not published** [HT][HPr][HP]. Every base plan includes "AI team members" (Analyst, Coach, Marketing, Help AI), but not CSR AI [HPr][HT].
- 24/7 call answering [HP].
- **Website chat answering** (CSR AI Chat): needs the chat bubble on the site; books jobs, manages appointments, uses custom scripts; plan/add-on status not stated in the article: https://help.housecallpro.com/en/articles/12453258-csr-ai-chat-answering . A third-party site says chat is included with all plans **(third-party)**: https://blocksentient.com/review/housecall-pro-csr-ai/ .
- **Text answering, alpha:** follow-up texts to *new* customers after a qualifying call, on the existing business number; can answer service questions, share pricing, check availability, create jobs and estimates, send booking links, reschedule or cancel, each behind a permission; "CSR AI only confirms that an action was completed after the action succeeds"; add-on status not stated: https://help.housecallpro.com/en/articles/16673934-csr-ai-text-answering-in-alpha . Product page: "Text answering coming soon!" [HP].
- Books jobs and **estimates**; reschedule and cancel (permission-controlled) [HO].
- Price-book prices quoted per Customization setting [HO][HB].
- Custom scripts, voice, tone, background noise, business-name pronunciation [HO].
- Escalation: forward to a number, to an **HCP Assist** human rep (needs a separate HCP Assist subscription), or end and send notes [HO].
- After-hours call/text/private-note handling; emergency handling always on [HO].
- Service-area enforcement for booking [HG].
- Per-call notification option; summary and urgency per call [HO].
- Dashboard: calls and chats handled, bookings, conversion rate, revenue, top call reasons, trends [HO].
- Test CSR AI button; public demo page [HO].
- Spanish: "planned but not yet available" [HO].
- Spam blocking, outbound calls, multiple numbers, multiple locations: not found. HCP Voice (phone system) is a separate add-on, price not shown [HPr].

---

## 3. Sameday AI (gosameday.com, now sameday.ai)

gosameday.com 301-redirects to sameday.ai. Sources:
- Home: https://sameday.ai/ (**[SH]**)
- Pricing: https://sameday.ai/pricing (**[SPr]**)
- Features: https://sameday.ai/features (**[SF]**)
- Security: https://sameday.ai/security (**[SS]**)
- Blog setup guide: https://sameday.ai/post/voice-ai-field-service-integration-complete-setup (**[SB]**)
- No public help center or documentation found (none linked from the home page [SH]; search found none).

### 3.1 Who, sales model, pricing
- **For:** home services: commercial cleaning, window cleaning, HVAC, solar, pest control, plumbing, garage door, landscaping, locksmith, restoration, roofing, electrician [SH]. Standalone; integrates with field-service software rather than requiring one vendor.
- **Sales-led:** "Book a demo"; "We'll set it up on a call and it can be answering calls the same day" [SPr].
- **Pricing model:** per business, monthly plan with a **minutes allowance**, locations bundled [SPr]:
  - **Launch $449/month:** 500 minutes; after-hours and weekend calls; 3 locations; English and Spanish; AI customization; "Pro scheduling (ServiceTitan etc)".
  - **Scale $789/month** ("Most popular"): 1,000 minutes; 24/7 including spikes; "Multiple locations"; English and Spanish; voice cloning (with written consent of the voice owner); Pro scheduling.
  - **Enterprise:** custom; multilingual voices, analytics, hands-on training, API, custom integrations.
  - Overage "billed at your plan's per-minute or per-message rate"; rates not listed.
  - Setup fee, contract term, free trial, card: not found [SPr].

### 3.2 Signup and setup flow
- Setup is done "from a call with our team"; you "describe what you need in plain English"; call paths adjustable later in a **visual editor** [SH].
- Demo offer: "We'll run Sameday on a few of your missed calls and show you the booking" [SB].
- ServiceTitan connection: certified app, "configured without custom development"; you authorise access [SB].
- Step list in [SB] (audit call workflow, choose integration, map call data to FSM fields, configure call logic, test real scenarios, outbound automations) is mostly **generic advice**, not described as Sameday's own onboarding; the article states no Sameday timeline.
- Time to live: "can be answering calls the same day" [SPr].
- Before payment / test call before live: not found for Sameday specifically.

### 3.3 Configuration
- Greeting, tone and rules configurable [SF]. Plain-English direction [SH].
- Scheduling: matches jobs to technician skills, service areas and drive time; backfills cancellations from a waitlist; two-way sync with dispatch board [SF].
- Escalates to a human "when needed" (trigger not described) [SF].
- Sensitive actions wait for owner approval ("Needs your approval") [SH].
- FAQs, voice choice, hours, transfer rules, price rules: not found [SF].

### 3.4 Phone number
- Sameday local numbers or bring your own; **port** or keep carrier; forward current number or connect phone system; keep known caller ID [SH][SF][SPr].
- Seats, queues (ring all, round robin, least calls) and routing configurable [SH].

### 3.5 After each call
- Calls, texts and bookings logged with **transcripts, summaries and an audit trail**; one inbox for calls, texts, voicemail [SH][SF].
- "Coach" scores every call, human or AI [SF].
- Push/email per call: not found [SH].
- **Retention:** recordings, transcripts and customer records belong to the business, exportable anytime; deletion on request subject to legal retention; **no period stated** [SS]. Customer calls not used to train models for other businesses [SS].
- **Consent:** home page advises telling callers when calls are recorded as laws vary by state [SH]; "consent controls" built into recording and transcription, not described [SS].

### 3.6 Dashboard
- Insights: booking rate, response time, missed-call recovery, revenue booked, per line and per location, with benchmarks [SF]. iOS and Android apps [SH][SF].
- Users: role-based access you assign [SS]; "seats" mentioned for call routing [SH]. Multiple locations: per-plan location counts [SPr].
- Staff can hand a live call to the AI ("Hand to AI") [SH].

### 3.7 Integrations
- ServiceTitan (certified), Housecall Pro, FieldRoutes (partner), AccuLynx, JobNimbus, Maid Central, Service Fusion; lead sources Thumbtack, Google Local Services, Angi, Facebook [SH]. Jobber also listed in [SB].

### 3.8 Features
By plan, from the pricing page [SPr]:
- **Launch ($449/month):** 500 minutes; after-hours and weekend answering; "Add your whole team"; "3 locations included"; English and Spanish; "Customize your AI"; "Pro scheduling (ServiceTitan etc)".
- **Scale ($789/month):** everything in Launch plus 1,000 minutes; 24/7 including spikes; "Multiple locations"; "Voice cloning, with written consent from the voice owner".
- **Enterprise (custom):** "Multilingual voices", "Advanced data analytics", "Hands on training/support", "API access", "Custom integrations".
- No add-ons with prices listed [SPr].
Listed on the home and features pages, plan not stated [SH][SF]:
- Texting customers; estimate follow-ups; reactivation campaigns ("calls first, text if no answer"); review requests; filling open schedule slots; speed-to-lead and membership-sales playbooks.
- Lead classification (e.g. "high value") and call summaries.
- "Coach" scoring of every call, human or AI.
- "Hand to AI" button for staff on a live call.
- Seats, queues (ring all, round robin, least calls) and routing; Sameday local numbers; porting; voicemail; unified inbox for calls, texts, voicemail.
- Scheduling by technician skills, service area and drive time; cancellation backfill from a waitlist; two-way dispatch-board sync.
- Insights per line and per location; iOS and Android apps.
- Approval queue for sensitive actions ("Needs your approval").
- Spam blocking, quoting (beyond estimate follow-ups): not found [SPr].

---

## 4. Avoca (avoca.ai), product "Responder" (AI CSR inbound)

Sources:
- Home: https://www.avoca.ai/ (**[AH]**); https://www.avoca.ai/pricing returns 404.
- Help center index: https://help.avoca.ai/llms.txt
- Complete your setup: https://help.avoca.ai/getting-started/setup.md (**[AS]**)
- Prepare for go-live: https://help.avoca.ai/getting-started/go-live.md (**[AG]**)
- Test with real calls: https://help.avoca.ai/getting-started/testing.md (**[AT]**)
- Knowledge Base: https://help.avoca.ai/responder/knowledge-base.md (**[AK]**)
- Notifications: https://help.avoca.ai/responder/notifications.md (**[AN]**)
- Business compliance: https://help.avoca.ai/business-info/compliance.md (**[AC]**)
- Call forwarding overview: https://help.avoca.ai/config/call-forwarding/overview.md (**[AF]**)
- Review calls: https://help.avoca.ai/calls/review-calls.md (**[AR]**)
- Members and SSO: https://help.avoca.ai/business-info/members-and-sso.md (**[AM]**)

### 4.1 Who, sales model, pricing
- **For:** home and field service (HVAC, plumbing, electrical, pest control, roofing, garage door, fuel delivery, auto repair incl. dealership service, junk removal, movers, restoration) [AH].
- **Sales-led:** every call to action is "Book a demo" (20-minute walkthrough) or "Talk to our AI" [AH]. Forwarding number comes from your "Customer Success Manager or Technical Account Manager" [AF].
- **Pricing:** **not published**; pricing page 404 [AH]. Third-party estimates: roughly $1,000-$3,000/month, quote-based, per-minute billing **(third-party)**: https://fieldcamp.ai/reviews/avoca-ai/ ; "does not publish pricing" **(third-party)**: https://www.getmacha.com/blog/avoca-ai-pricing-explained . These conflict on range and are unverified.
- Trial, card: not found. Does not require one FSM but the setup flow is built around ServiceTitan; Housecall Pro and Google Calendar also connect (help index).

### 4.2 Signup and setup flow
"Launchpad is your step-by-step setup guide" [AS]. Order [AS]:
1. Open **Launchpad** (Deploy → Launchpad), invite teammates as Member or Admin.
2. **Knowledge Base:** review company details, hours, services, programs, agent behaviour; the **AI Intro Line** (greeting) is required.
3. **Connect ServiceTitan:** create an Avoca admin user in ServiceTitan (with 2FA), enter tenant ID, Avoca registers the tenant, install the Avoca app, "I installed the app", wait for "Connection verified". "Don't send ServiceTitan passwords or app secrets to Avoca."
4. **Job types:** sync; choose which the assistant can book, cancel, reschedule.
5. **Business units:** sync, define each, choose bookable ones.
6. **Service areas:** import or start blank; zones and ZIP codes. "Your assistant only books callers whose ZIP code is in a service area."
7. **Capacity:** ServiceTitan availability or custom arrival windows; fix failing checks.
8. **Booking windows:** generate scenarios, map business units per area, set arrival windows, clear every "Needs work"; holidays set before go-live.
9. **Fees:** add each fee and the windows it applies to.
10. **Meet your agent:** set up the phone line and wait for the number, deploy the agent, **choose a voice**, call it.
11. **Test:** intro line, service answers, booking, transfers, call classification.
12. **Go live:** go-live checklist. "Your assistant doesn't take customer calls until you go live."
- **Go-live gate** [AG]: Deploy → Checklist, each step Required or Recommended. Required include knowledge base, CRM connection, job types, business units, service areas, booking windows, fees, notifications, production phone number. "Remaining required steps block" the **Mark Responder live** action. "Every launch decision should have a named approver" (operations for hours/services/fees; CRM admin; dispatch; after-hours lead; marketing/compliance for messaging consent). Plan switch-over date and who can switch back. Avoca marks forwarding done "after a real call reaches your assistant."
- **Testing** [AT]: register every test phone in Deploy → Testing; only calls from registered phones count as tests; eight suggested scenarios; per-call feedback, "Not quite, needs tuning" opens a support ticket. Optional "Book real jobs from test calls"; "Use approved test details, never a real customer's information."
- **Business facts source** [AK]: typed by the business, plus AI helpers: "Generate All with AI" (service rows), "Find FAQs on website", "Format with AI", "Suggest from booking windows" (hours), "Import from Text" (service list); ServiceTitan sync for job types, business units, service areas, technicians, shifts [AS]. Whether Avoca pre-fills: not stated [AK].
- **Before payment:** not found. **Time to live:** no durations given [AG][AS].

### 4.3 Configuration
- **Knowledge Base sections** [AK]: Basics (company name, callback number, email, **assistant name**, timezone, website, country, location, CRM and phone system, fees label, languages, AI Intro Line with Agent name / Company name tags); Hours & Availability (regular hours, Emergency After Hours, Live Representative Schedules, callback messages); Services & FAQs (provided, not provided, FAQs as "Question: ... Answer: ..."); Programs & Guidance (affiliated brands, memberships, emergency guidance, high-demand mode); Agent Configuration (arrival timing, availability offers, fee timing, **AI disclosure**, cancellations, rescheduling, renters, commercial jobs, ETAs, customer lookup).
- **Per-service outcome:** Book, Transfer, or Take a message [AK]. If Transfer has no open destination it falls back to message-taking (help center search result: https://help.avoca.ai/How-to-Configure-Transfer-Destinations-2f0f2b56d4d580cea91af46a66784fc9).
- **Limits on promises** [AK]: **Fee Presentation Timing** (mention fee when slot offered, after acceptance, or only if asked); **Price Objection Retention** must name the exact objection, who approves a waiver, and its terms; "A vague instruction can lead your assistant to promise something your team doesn't offer"; **Arrival Timing Line** sets what callers hear when they ask for an exact arrival time.
- **Transfers:** Transfer Destinations (where and when open) and Pre-call Transfer Rules (route before AI answers) (help center search result above).
- **Voice:** chosen at "Meet your agent" [AS]; alternative voices and Spanish shown in demo library (help index).
- **Security note:** "Never store passwords, payment details, or private customer information in the Knowledge Base" [AK].

### 4.4 Phone number
- Avoca forwarding number supplied by CSM/TAM; same number used for testing [AF].
- Routing modes: **Primary** (Avoca answers every call first), **After-hours**, **Overflow** (suggested 20-25 s ring plus greeting length) [AF].
- Business sends Avoca its phone system, forwarding numbers, routing, test confirmation and the exact go-live time [AF].
- Porting: not covered [AF].

### 4.5 After each call
- **Email call summaries** via Team Notifications; editable summary prompt; subject marked **[ACTION REQUIRED]** for High/Low priority; choose which call reasons send email; optional email on transfer; Microsoft Teams posts; on-call text alerts [AN].
- Call page: summary, **recording, transcript**, call reason, bookability (Booked / Not Booked / Not Bookable, overridable), tasks, internal notes, caller history [AR].
- Bookings written to the CRM (ServiceTitan two-way sync, help index).
- Retention: not stated [AR].
- **Compliance step** [AC]: legal name, EIN, address, authorised representative, Terms and Privacy URLs; submits A2P campaigns to carriers (required on go-live checklist for Speed-to-Lead and Outbound). Recording disclosure: not covered [AC]; "AI disclosure" is an Agent Configuration setting [AK].

### 4.6 Dashboard
- Calls, booked calls, message conversations, tasks, analytics, Coach (call scoring), Oversight, A/B experiments (help index).
- **Users** [AM]: roles Admin, Member, Agent; invite by email; SAML SSO; "employee contacts" receive notifications and on-call pages but do not sign in. Seat charges: not found.
- Multiple teams/brands: API has "all brands" and "cross-team" endpoints and a Portfolio dashboard (help index); member article does not cover locations [AM].

### 4.7 Integrations
- ServiceTitan (certified), Housecall Pro, Google Calendar, Google LSA, Yelp, Thumbtack, webhooks, API keys, data export, MCP (help index); phone systems with guides: Dialpad, RingCentral, 3CX, Five9, Intermedia, ServiceTitan/Housecall Pro phones, carriers (help index). SOC 2 Type 2 badge [AH].

### 4.8 Features
No tiers or prices published for any feature [AH]. Features from the home page [AH], the HVAC product page https://www.avoca.ai/inbound/hvac (**[AIn]**) and the help-center index (https://help.avoca.ai/llms.txt):
- **AI CSR (inbound):** calls, texts and chats 24/7, books jobs [AH][AIn].
- **Simple Scheduler:** self-service online booking [AH].
- **Web Chat** [AH].
- **Speed-to-Lead:** responds to leads from every source, stated under 15 seconds; email-forwarded and native lead sources (help index) [AH].
- **Outbound Campaigns:** SMS and call drip campaigns to past customers; audiences (unsold estimates, expiring memberships, member maintenance); direct mail (help index) [AH].
- **Google LSA**, Yelp and Thumbtack lead integrations (help index) [AH].
- **Coach:** call scoring, rubrics, missed-booking recovery (help index) [AH].
- **Analytics:** metrics, revenue, Google Ads reporting, A/B experiments, Oversight, Portfolio dashboard (help index) [AH].
- **Human in the Loop:** escalation to human CSRs with full context [AIn]; https://www.avoca.ai/blog/why-avoca-has-a-human-in-the-loop-program .
- **Customer Recognition:** caller history, equipment and membership tier before the conversation [AIn].
- Routing by intent and urgency; emergency routing to on-call tech; On-Call Calendar; Break Glass (help index) [AIn].
- Multiple languages [AIn]; Spanish demo and alternative voices (help index).
- Per-service outcome Book / Transfer / Take a message; fee and arrival-time rules [AK].
- Call classification; tasks; email summaries; Teams posts [AN][AR].
- API, webhooks, MCP, data export (help index).
- Spam blocking, quoting: not found. Disclosure of AI is left to the business [AIn].

---

## 5. CallRail: Voice Assist

CallRail's support center (support.callrail.com) returned 403 to the fetch tool and to a plain download, so its articles could not be read in full. Facts marked **[snippet]** come from the search engine's extract of those CallRail support pages (vendor text, seen only in part):
- Voice Assist setup: https://support.callrail.com/hc/en-us/articles/37933901800845-Voice-Assist-setup
- How to create your business profile: https://support.callrail.com/hc/en-us/articles/37933930430989-How-to-create-your-business-profile
- Troubleshooting and FAQ: https://support.callrail.com/hc/en-us/articles/37933955209229-Voice-Assist-troubleshooting-and-Frequently-Asked-Questions
- Voice Assist overview: https://support.callrail.com/hc/en-us/articles/37933897778061-Voice-Assist-overview

Pages read in full:
- CallRail pricing: https://www.callrail.com/pricing (**[CPr]**)
- Voice Assist standalone site: https://www.voiceassist.callrail.com/ (**[CV]**) and its pricing page https://www.voiceassist.callrail.com/pricing (**[CVPr]**)
- Standalone launch post, 2026-07-28: https://www.callrail.com/blog/callrail-opens-voice-assist-to-every-business-contextual-ai-texting (**[CL]**)
- Setup best-practice post: https://www.callrail.com/blog/convert-every-call-with-voice-assist (**[CB]**)
- Small-business page: https://www.callrail.com/ai-voice-agent-small-business (**[CS]**)
- Semrush App Center KB (CallRail's Voice Assist resold through Semrush; **not CallRail's own site**): https://es.semrush.com/kb/1628-voice-assist (**[CSem]**)

### 5.1 Who, sales model, pricing
- **For:** home services (electrical, HVAC, landscaping, plumbing, roofing), dental, medspa, real estate, agencies, legal [CV]. CallRail is a call-tracking/marketing-attribution company; Voice Assist was an add-on and since 2026-07-28 is also sold "with or without CallRail Call Tracking" on the business's existing number [CL].
- **Self-serve:** "Start free trial" signup; 14-day trial, "No credit card required" [CVPr][CPr]. "Quick self-setup or expert help" [CVPr]; "setup support from an AI Expert Team" [CPr].
- **Pricing model:** per business (CallRail "company"), monthly fee with an included **call** allowance and **per-call** overage.
  - CallRail pricing page: Voice Assist "starts at **$95/month**"; footnote "Lead Tracking starting at an additional $55"; overage "**$1 per call after 50** Voice Assist calls over 15 seconds" (one version of the page says 55) [CPr].
  - Standalone site: **$75/month**, shown against a crossed-out $95; included calls and overage not shown (FAQ answers not rendered) [CVPr].
  - Semrush channel **(reseller, not CallRail)**: $50/month, 7-day trial, 50 calls; plan steps up by prior month's usage (51-100 calls $100 ... 901-1,200 $1,000) [CSem].
  - **Contradiction:** three different prices ($95 + $55 tracking, $75, $50 via Semrush) for the same product on 2026-11-19.
- Base CallRail plans (if bought): Lead Tracking $50, Lead Tracking Complete $95, Lead Conversion $150, Lead Conversion Complete $195 per month; each includes 5 local numbers, 250 local minutes, 25 SMS; extra local number $3, local minute $0.05 [CPr].

### 5.2 Signup and setup flow
- CallRail support **[snippet]**: "There are five onboarding steps ... only the first (setting up a Business Profile) and last (enabling Voice Assist in a Call Flow) are mandatory":
  1. **Business Profile:** enter business hours (Smart profile tab), paste the website URL, choose autofill; when done a green box appears and "Company overview and Value prop, Target customers, Services, Service area, and Frequently asked questions" are filled in; each service becomes its own text box. Must be reviewed and saved before Voice Assist works.
  2. **AI voice settings:** voice, tone, greeting, optional call-behaviour instructions.
  3. **Caller intake:** standard, lead-qualification or custom questions; always asks name, phone number and reason for calling.
  4. **Test the agent:** "Test Assistant"; test calls count toward minutes unless on trial.
  5. **Enable:** through the tracking number's Call Options or a Call Flow; without an enabled Call Flow it stays off.
- Prerequisite **[snippet]**: "Voice Assist requires Call recording to be enabled in your CallRail account and enabled in the Call Flow." Transcription not required, but without it the profile cannot use past call data.
- Business facts source: website autofill plus past CallRail call transcripts ("trains quickly" from website and past conversations [CS]; profile "initially generated off whatever is on your website" [CB]).
- Semrush-channel order **(reseller)** [CSem]: (1) business name, website URL, FAQs, auto-generate from site; (2) choose voice, adjust greeting, test in app; (3) choose when it answers (after hours, overflow, always on) and intake questions; (4) review auto-filled details, "Finish setup"; (5) pop-up gives a **dedicated Voice Assist number** to publish or forward to; forwarding can be done now or later.
- Before payment: trial without card, so all setup happens before payment [CVPr].
- Time to live: existing users can add it "in minutes" [CV]. G2 "Fastest Implementation" claim [CL].
- Answering before setup complete: not stated; it stays disabled until a Call Flow enables it **[snippet]**.

### 5.3 Configuration
- Greeting, agent name, voice, tone, behaviour instructions [snippet][CB]. Pre-made call-flow templates include a greeting step and recording on **[snippet]**.
- Answering modes tied to business hours: always / after hours **[snippet]**; after hours, overflow, always on [CSem].
- Intake questions [snippet][CB].
- **Transfers:** "Voice Assist can only trigger a transfer step that already exists. Prompting alone can't initiate a transfer"; cannot route dynamically, use a Menu step for multiple paths **[snippet]**. High-value or urgent calls routed to a team member [CS].
- **Booking:** captures details and "can send an automated text with a booking link" [CB]; "live appointment booking" and "two-way CRM sync" listed as included [CVPr]; Google Calendar, Calendly, Yardi, HubSpot, Jobber, Clio named [CV].
- **Memory contradiction:** FAQ **[snippet]**: "Each call is treated as a standalone interaction. Voice Assist does not retain memory or context from prior conversations." Launch post: "shared memory keeps call and text history together" [CL].
- **Multiple locations** **[snippet]**: configured per CallRail company; a separate company per location if hours or address differ.
- Limits on promises (prices, arrival times): not found.

### 5.4 Phone number
- Dedicated Voice Assist number (publish it, or forward existing line to it) [CSem]; or run on an existing CallRail tracking number via Call Flow **[snippet]**; or "on its existing business number" without call tracking [CL]. Porting: not found.

### 5.5 After each call
- Call summaries and transcripts; lead qualification and scoring; spam detection; email notifications [CVPr]; real-time summaries for lead alerts, dashboard with transcripts, call scores and intent [CS].
- Notifications set under "Calls & texts", filterable to "Only Voice Assist calls" and by lead qualification **[snippet]**.
- Text follow-up after missed calls or hang-ups; answers inbound texts [CL].
- Recording: required by the product **[snippet]**. Retention: not found.
- **Disclosure** **[snippet]**: "A greeting can be typed in to notify the caller that their call will be recorded if state or local laws require the caller to be notified." Optional.

### 5.6 Dashboard
- CallRail dashboard with transcripts, scores, intent [CS]; multi-conversation insights report of top call reasons [CB]. Users/seats for Voice Assist: not found. Locations: one company per location **[snippet]**.

### 5.7 Integrations
- Google Calendar, Calendly, Yardi, HubSpot, Jobber, Clio [CV]; Google Ads qualified-lead signal [CV]; CallRail attribution if call tracking added [CL]. SOC 2 and ISO 42001 [CVPr].

### 5.8 Features
Standalone site lists one plan, **$75/month** (crossed-out $95), with all of these included [CVPr]:
- "24/7 call answering and lead capture"
- "AI text conversations"
- "Call summaries and transcripts"
- "Lead qualification and scoring"
- "Smart call transferring"
- "Automatic lead source detection"
- "Robocall spam detection"
- "Live appointment booking"
- "Two-way CRM sync"
- "Human-like AI voices"
- "Email notifications"
- "Quick self-setup or expert help"
- "SOC2 and ISO 42001 compliance"
CallRail pricing page lists Voice Assist at **$95/month** with 24/7 coverage, lead prioritisation and AI Expert Team setup support; $1 per call after 50; "Lead Tracking starting at an additional $55" [CPr].
Other features, plan not stated:
- Replies to inbound texts within seconds; text follow-up after missed calls or hang-ups; shared call-and-text memory; "smart profile" [CL].
- Handles scheduling changes during the call; sends follow-up texts; routes urgent calls to staff; qualified-lead signal to Google Ads [CV].
- Intake questions (standard, qualification, custom) [snippet].
- Call tracking and marketing attribution as an optional upgrade (Lead Tracking $50 to Lead Conversion Complete $195/month; 5 local numbers included, extra local number $3) [CPr][CVPr].
- Multi-conversation insights report [CB].
- Languages, outbound calls, quoting: not found. Multiple locations: one CallRail company per location [snippet].

---

## 6. Yelp: Yelp Receptionist (discontinued) and Yelp Host (restaurants)

Sources:
- Launch post, 2025-10-21: https://blog.yelp.com/news/yelp-host-yelp-receptionist-launch/ (**[YL]**)
- Support: "Yelp Receptionist Discontinuation FAQ": https://biz.yelp.com/support-center/article/Yelp-Receptionist-Discontinuation-FAQ (**[YD]**)
- Support: "What is Yelp Receptionist?": https://biz.yelp.com/support-center/article/What-is-Yelp-Receptionist (**[YW]**)
- Yelp Host product page: https://business.yelp.com/restaurants/products/yelp-host/ (**[YH]**)
- Yelp Host update, 2026-07-28: https://blog.yelp.com/news/yelp-host-voice-ai-adds-opentable-reservations-and-takeout-ordering-for-restaurants/ (**[YU]**)
- Yelp article "Yelp Host vs. Slang", 2026-09-30: https://business.yelp.com/resources/articles/yelp-host-vs-slang/?domain=restaurants (**[YS]**)

### 6.0 Status
- **Yelp Receptionist (local service businesses) has been discontinued.** Billing stopped 2026-08-10; prorated final charge on the September statement; usage 2026-08-11 to shutdown free; "Starting September 23, 2026, calls to your Yelp Receptionist number will no longer be answered or forwarded"; Voice Inbox available until 2026-09-30; owners told to remove the number from their materials and turn off forwarding; Yelp points to its acquisition of Hatch as the replacement [YD].
- **Contradiction:** [YW] says discontinued "Thursday, September 10, 2026" with Voice Inbox access ending September 17, 2026; [YD] says September 23 and September 30.
- **Yelp Host (restaurants) is live** [YH][YU]. Both are covered below because the Receptionist's design is still informative.

### 6.1 Who, sales model, pricing
- **Receptionist:** "eligible local businesses" (examples: house cleaning, flooring); from $99/month; signup in the "Yelp Receptionist" tab of a Yelp for Business account [YL]. [YW] lists topics on multi-location pricing, a "500-calls-per-month limit" and charges for spam calls, but the answers were not on the page.
- **Host:** table-service restaurants, and since 2026-07 pickup-ordering restaurants [YU]. Requires a claimed Yelp business listing [YH].
  - Price history (all Yelp's own pages): $149/month or $99 for Yelp Guest Manager customers [YL, 2025-10]; $249/month or $199 with Guest Manager [YU, 2026-07]; "starts at $249/month, subject to call limits", **Plus $399/month for unlimited calls** [YS, 2026-09]; "Free for up to 30 days, then pricing starts at $249/month" [YH].
  - Pricing model: per business, monthly tier by **call volume** (capped tier vs unlimited) [YS].
  - Card requirement: not found [YH].
  - **Signup:** product page form asks email, phone, whether you work at/own a restaurant, then leads to a demo or scheduled call [YH]; but "Setup was simplified and can be completed online directly from a Yelp for Business account" [YU]. Both statements are on Yelp pages (mixed model).

### 6.2 Signup and setup flow
- "Pre-trained on Yelp business information and works out of the box" [YL]. Host "pulls hours, location, and business info from your Yelp Page" [YH]; setup "takes about 10 minutes and requires no code" [YS].
- Customise afterwards in Yelp for Business [YL].
- Step-by-step order, test call, before-payment steps: not found on the pages read. Free trial up to 30 days [YH].
- Can run "24/7, or only when extra coverage is needed" [YL].

### 6.3 Configuration
- Both: greeting, agent name, voice, questions the agent asks, details on offers, pricing and other information it shares [YL].
- Host: styling, name, greeting, voice/personas, call handling (transfers, waitlist), SMS action links, FAQs, menu and dietary information, amenities [YH][YL]; multiple handoff numbers by inquiry type; 8 new voices; custom brand voices; auto language detection, 16 languages added [YU].
- Host bookings: Yelp Reservations, Yelp Guest Manager, OpenTable (US and Canada; book, modify, cancel); pickup orders via Stream to Toast, Square, Clover POS; SMS payment link [YU][YH].
- Transfers: to a designated number in Yelp for Business when it can't answer or the caller asks [YH].
- Receptionist: asks project questions, vets and qualifies leads, collects info for quotes, consultations or appointments [YL].
- Limits on promises: not found.

### 6.4 Phone number
- "You'll also be provided with a dedicated phone number you can list anywhere, and the option to set up call forwarding" [YL]. Host answers its number wherever published [YH]; forward existing line or publish Host number [YS]. Porting: not found.

### 6.5 After each call
- Receptionist: "Each call is automatically recorded, transcribed, and summarized", delivered to the Yelp for Business inbox in real time [YL]; real-time notifications with summaries and caller details [YW]; SMS to the owner per call with caller details and a callback link (search snippet of the launch materials).
- Host: transcribes calls, records guest preferences; adds callers to guest book with Guest Manager [YS][YH].
- Retention: not stated; at shutdown, owners told to copy transcripts and download audio before the Voice Inbox closed [YD].
- Disclosure: [YW] lists "what the service says if asked whether it's AI" and "whether callers are told they're being recorded" as topics, answers not shown.

### 6.6 Dashboard
- Host: dashboard of what callers ask, what is resolved, revenue captured [YH]; reporting on call evaluation, after-hours volume, reservation conversion, order volume [YU]; settings also in the Yelp Business Owner app [YU]. Users/seats: not found. Multi-location: restaurant groups page linked, no detail [YH].

### 6.7 Integrations
- Yelp Guest Manager, Yelp Reservations, OpenTable, Stream (Toast, Square, Clover) [YU][YH].

### 6.8 Features
**Yelp Host (live).** Prices: from $249/month, $199 with Yelp Guest Manager [YU]; "starts at $249/month, subject to call limits", **Plus $399/month for unlimited calls**; the $249 price includes "reservation and waitlist management, takeout ordering, integrations, and an analytics dashboard" [YS]; free up to 30 days [YH]. An "Advanced AI upgrade" is named on the product page's comparison table, with no price; the table's columns are unlabeled, and the Yelp Host column can only be inferred from its $249-$399 price [YH].
- AI call handling; pretrained from the Yelp Page, POS and reservation data [YH].
- Reservations (Yelp Reservations, OpenTable: book, modify, cancel) [YU][YH].
- Waitlist via Yelp Guest Manager; text links for other bookings [YH].
- **Takeout ordering** to Toast, Square, Clover via Stream, "no extra cost and no commission" [YU][YH].
- **SMS payment link** for phone orders; customisable SMS action links [YH].
- Languages: "nearly any language", auto-detected [YH]; 16 languages added [YU].
- Voices: 8 new voices, custom brand voices; name, greeting, persona customisable [YU][YH].
- Multiple handoff numbers by inquiry type [YU].
- **Spam and wrong-number filtering** [YS].
- Call transcription; guest preferences recorded; callers added to guest book with Guest Manager [YS][YH].
- Analytics: call evaluation, after-hours volume, reservation conversion, order volume [YU]; dashboard of asks, resolutions, revenue [YH].
- Food upselling: "coming" [YU].
- Outbound calls, multi-location pricing: not found [YH].
**Yelp Receptionist (discontinued 2026-09).** From $99/month [YL]: lead qualification and project questions; recording, transcription and summary to the Yelp inbox; per-call SMS to the owner with callback link; dedicated number; transfers; spam filtering [YL][YW]. [YW] lists a "500-calls-per-month limit" and multi-location pricing as FAQ topics without answers.

---

## 7. Podium: AI Employee ("Jerry") on phone (Voice AI, Podium Phones)

Podium publishes no pricing and no public step-by-step setup documentation for Voice AI was found; its help center articles did not surface in search. Sources:
- Pricing: https://www.podium.com/pricing (**[PPr]**), https://podium.com/getpricing
- AI Employee page: https://www.podium.com/product/ai-employee (**[PA]**)
- Phones page: https://www.podium.com/voice/ (**[PV]**)
- Phones FAQ (Australian site): https://www.podium.com.au/article/phones-faq (**[PF]**)
- Release 25.6: https://www.podium.com/whats-new/25-6/ (**[P256]**)
- Release 26.6: https://www.podium.com/whats-new/26-6 (**[P266]**)
- AI Employee Sources: https://www.podium.com/whats-new/ai-employee-sources (**[PS]**)

### 7.1 Who, sales model, pricing
- **For:** auto dealerships, home services, aesthetics and wellness, retail, other local businesses; "single-location shops to multi-location operations" [PA].
- **Sales-led:** "talk to our sales team for details"; "Get a demo"; no self-serve signup [PPr]. "Add on AI Employee to any plan" [PPr]. Prices, per-location/per-user basis, trial, contract: not found [PPr]. Third-party: AI Employee is not priced publicly **(third-party)**: https://www.usecarly.com/blog/podium-ai/ .
- Phone answering runs inside **Podium Phones** (Podium's VoIP system) [PV]. Requires Podium.
- Included in every plan: step-by-step onboarding, phone and chat support, customer success managers [PPr].

### 7.2 Signup and setup flow
- Podium's onboarding team helps set up call routing and extensions [PF].
- Configured with "custom playbooks" covering services, pricing, policies; plain-language corrections applied immediately [PA].
- **Test before live:** "Test Bench" in AI Studio runs simulated conversations; "When you set up a new agent, Test Bench runs before it goes live. You review the results, leave feedback, and approve when ready" [P266]. AI Studio has a sandbox to test changes before they go live [PA].
- Business facts source: configurable FAQs and business configuration; location-specific services and hours "planned" [PS]. Website/PDF training: third-party claim only, not confirmed.
- Order of steps, time to live, before payment: not found.

### 7.3 Configuration
- **Modes:** default mode checks service area and tries to book specific times; **Note Taker** mode "prioritizes information gathering", skips service-area checks and "avoids bringing up specific time frames" [P256].
- **Policies:** Voice AI policies in AI Studio, global or per playbook; a built-in agent checks new policies for conflicts before they go live [P266].
- Escalation rules for human handoff [PA]; escalation assigns the conversation to its assigned users plus optional others; "AI needs help" badge [P256].
- Booking: "Books directly on your calendar" [PA]; systems not named.
- Missed-call text-back; press-any-key switch to text [PV][PF].
- Voice, greeting, hours: after-hours routing to a number, voicemail or text follow-up [PF]; voice choice not found.

### 7.4 Phone number
- Podium Phones uses "your business number" [PF]; porting and new-number details not found.

### 7.5 After each call
- Calls recorded and transcribed; AI recap/bullet summaries; one inbox for calls, texts, messages [PV][PF]. Thumbs up/down on AI-handled calls, reviewed by Podium [P256].
- **Recording announcement** customisable in Recordings and Transcriptions settings [P256].
- Retention: "encrypted and stored securely", no period [PF].

### 7.6 Dashboard
- AI Studio performance view [PA]; live call reporting [PV]; users get extensions, call groups; app shows who handled each call [PF]; multi-location supported [PF]. Seat pricing: not found.

### 7.7 Integrations
- Boulevard, Mindbody, Nextech, HubSpot, Outlook, QuickBooks, Mailchimp, Shopify, Salesforce shown [PV]; LeadSync 2.0 for CRM lead assignment via CSM [P256]; Meta lead ads [P256].

### 7.8 Features
Tier: AI Employee is an add-on: "Add on AI Employee to any plan"; no price [PPr]. No per-feature tiers found.
- Channels: phone calls, text, email, social in one inbox [PA].
- Books directly on the calendar [PA].
- Playbooks for services, pricing, policies; plain-language corrections [PA].
- AI Studio: performance view, sandbox, escalation rules [PA]; Voice AI policies with conflict checking; **Test Bench** simulated conversations before go-live [P266].
- Voice AI **Note Taker** mode vs default booking mode [P256].
- Missed-call text-back; press any key to switch a call to text [PV][PF].
- Call recording, transcription, AI recap summaries (Podium Phones) [PV][PF].
- Phone menus, extensions, call groups, transfers, softphone and mobile app (Podium Phones) [PV][PF].
- Multi-channel outreach to new leads by phone and email (beta); Meta lead-ad intake [P256].
- AI-detected opt-out requests in messaging [P266].
- Source citations for FAQ answers [PS].
- Pricing page also lists AI "Website Chat" and AI "Text Marketing", plan not stated [PPr].
- Spam blocking, languages, quoting: not found. Multi-location: "single-location shops to multi-location operations" [PA].

---

## 8. Slang.ai (restaurants)

Sources:
- Pricing: https://www.slang.ai/pricing (**[SlPr]**)
- Knowledge base home: https://slang-ai-knowledge-base.help.usepylon.com/
- Go Live Checklist: https://slang-ai-knowledge-base.help.usepylon.com/articles/6734739846-go-live-checklist (**[SlG]**)
- Configuring your Concierge: https://slang-ai-knowledge-base.help.usepylon.com/articles/6035668101-a-guide-on-configuring-your-concierge (**[SlC]**)
- Welcome to Slang: https://slang-ai-knowledge-base.help.usepylon.com/articles/7676589654-welcome-to-slang (**[SlW]**)
- Settings page: https://slang-ai-knowledge-base.help.usepylon.com/articles/3427310442-settings-page (**[SlS]**)
- Business hours and holidays: https://slang-ai-knowledge-base.help.usepylon.com/articles/2181770132-how-slang-gets-business-hours-information-and-handling-holiday-closures (**[SlHr]**)
- Call Forwarding: https://slang-ai-knowledge-base.help.usepylon.com/articles/3375871181-call-forwarding (**[SlF]**)
- Call Forwarding vs Slang Replace: https://slang-ai-knowledge-base.help.usepylon.com/articles/5041772952-call-forwarding-vs-slang-replace-which-setup-is-right-for-you (**[SlR]**)
- Add a new location: https://slang-ai-knowledge-base.help.usepylon.com/articles/2982925986-how-to-add-a-new-location-to-your-slang-account (**[SlL]**)
- Branded Greeting: https://slang-ai-knowledge-base.help.usepylon.com/articles/8839327046-branded-greeting (**[SlB]**)
- Smart Inbox: https://slang-ai-knowledge-base.help.usepylon.com/articles/3880348716-smart-inbox-knowledge-base-article (**[SlI]**)

### 8.1 Who, sales model, pricing
- **For:** restaurants and restaurant groups [SlPr]. Standalone; connects to reservation platforms.
- **Sales-led:** every plan says "Get a quote"; "Book a Demo" [SlPr]. Adding a location: "request this through your account manager or by contacting support", then an agreement to sign, then kickoff with an Implementation Project Manager [SlL].
- **Pricing model: per location per month** [SlPr]:
  - **Core** from $399/month ($379 annual): reservations, text confirmations, reservation integrations, VIP routing, special requests, guest satisfaction scoring, bilingual (Spanish).
  - **Premium** (with Superhost) from $599/month ($539 annual): adds 97 languages, custom branding, cross-selling, private events capture, real-time alerts, Smart Inbox, white-glove support.
  - **Enterprise:** custom (workflows, integrations, reporting, MFA/SSO, dedicated support).
  - "No hidden fees", cancel anytime; included calls/minutes, overage, trial, card: not found [SlPr].
- **Contradiction:** Yelp's comparison article (third-party to Slang, and a competitor) says Spanish is a $99/month add-on to Core [YS]; Slang's own pricing page says bilingual is included in Core [SlPr].

### 8.2 Signup and setup flow
- Time: "under 30 minutes of your time", can go live the same day; elsewhere on the same page, "most operators are live within the first week" [SlPr].
- Before the checklist, "your team has already reviewed your links, phone numbers, and concierge configurations with Slang" [SlG].
- **Go Live Checklist** order [SlG]:
  1. **Test the concierge by phone:** check you like the voice and that the venue name is pronounced correctly.
  2. **Set up integrations** in the Marketplace.
  3. **Grant team access.**
  4. **Launch:** configure carrier call forwarding, or update online sources with the Slang number. Check first that the public number is not also a Slang transfer destination ("endless forwarding loop").
  4a. Opt out of Google Business Profile automated calls/messages.
  5. **Notify your IPM** (Implementation Project Manager) that you are live.
  6. **Initial Results Review** two weeks after go-live, scheduled by the IPM.
- **Business facts source:** operators write copy per topic in the dashboard; Slang supplies "all the questions and conversational design" [SlC]. **Hours come from Google**: "Slang reads your hours directly from your Google Business Profile on every call" (if connected), otherwise from the public Google listing with a 7-day window; hours are changed in Google, not in Slang [SlHr]. Links, emails, internal phone numbers kept as "variables" reused across topics [SlS].
- Before payment: agreement precedes kickoff for added locations [SlL]; for first signup, not found.

### 8.3 Configuration
- **Topic-based knowledge** [SlC]: Reservations (max party size), Private Dining, Waitlist, Address (Maps link by text), Directions, Family Friendly, Menu and Price, Outdoor Seating, Parking, Regular Events, Seasonal Events (with expiry date), Career Opportunities, Specials; full-service: Large Parties, Walk-ins, Running Late (grace period), Outside Wine, Dress Code. Copy rules: no questions, don't start with "of course"/"yes", end sentences with a period.
- Each topic routes by **phone transfer, email, or text link** [SlC].
- **Greeting** five parts: salutation, introduction with venue name, optional tagline, recording disclosure, invitation to state reason. Premium can customise all five; Core and Basic only the tagline [SlB] (the article is internally inconsistent on this).
- Voice, greeting, personality under Branding [SlW]; pronunciation fields for emails and names [SlS].
- Limits on promises: copy rules above; Dress Code default "Casual dress is fine" if disabled [SlC]. Nothing specific on prices beyond the topic copy.

### 8.4 Phone number
- **Two setups** [SlR]: **Call Forwarding** (keep public number, carrier forwards to the Slang number, transfers go to a third line at the host stand) or **Slang Replace** (publish the Slang number everywhere; no carrier hop). Pricing page: a new local or toll-free number for website and Google Business Profile, or keep existing number via onboarding [SlPr].
- Forwarding by *72 / *73 or carrier portal; carrier must preserve caller ID [SlF]. Porting: not mentioned.

### 8.5 After each call
- Smart Inbox (Premium): summary, recording (voice calls), full transcript, notes, mark resolved, tags (high priority: incomplete reservation, missed call, voicemail, party too large, complaint, food poisoning; low priority: successful reservation etc.) [SlI].
- **Conversation Topic Alerts:** email or SMS for any Smart Inbox tag [SlI]. Weekly recap emails exist (FAQ title) (https://slang-ai-knowledge-base.help.usepylon.com/collections/4337799346-faq).
- **Recording is mandatory:** the recording disclosure is a "required sentence"; Core/Basic fixed text "Just so you know, we're speaking on a recorded line." Slang records transcripts and often audio and uses them for quality testing, auditing, and "training Slang's AI over time" [SlB]. Retention: not stated [SlB][SlI].
- AI disclosure: not stated [SlB].

### 8.6 Dashboard
- Dashboard at ilove.slang.ai; location dropdown for multi-location; Concierge (topics), Branding, Marketplace (integrations and health), Settings [SlW].
- Users: "Grant team access" step [SlG]; user management article returned 404. Seat charges: not found.

### 8.7 Integrations
- OpenTable, Resy, SevenRooms, Tripleseat [SlW]; Perfect Venue [SlPr]; Fishbowl; Google Business Profile (KB index).

### 8.8 Features
By plan, per location per month [SlPr]:
- **Core ($399; $379 annual):** "Comprehensive Reservation Management", "Text Links and Confirmations", "Reservation Insights", "Full Reservation Integrations", "VIP Call Handling", "Special Requests Collection", "Direct Measurement of Guest Satisfaction", "User-Friendly Restaurant Prompts", "Bilingual Support" (Spanish).
- **Premium ($599; $539 annual):** everything in Core plus **Superhost** (included), "Emotionally Intelligent Conversations", "97 Languages", "Custom Branding" (20 premium voices, custom greetings), "Flexible Responses", "Enterprise Quality Assurance", "Reservation Cross-Selling", "Private Events Capture" (Tripleseat, Perfect Venue), "Real Time Alerts", "White Glove Support", "Smart Inbox".
- **Enterprise (custom):** "Custom Workflows", "Custom Integrations", "Robust Reporting & Dashboards", "Enterprise Security & Access Controls" (MFA, SSO), "Dedicated Support & Consultation".
- Listed with no plan: "Direct Text", "Enterprise Insights", "Call Recordings, Summaries & Reservation Insights", "Instant Human Transfer", "Tagging and Prioritization Capabilities" [SlPr].
- No add-ons with prices listed [SlPr].
From the knowledge base: Conversation Topic Alerts by email or SMS [SlI]; weekly recap emails (FAQ index); texted Google Maps, menu, waitlist and private-dining links [SlC]; Call Forwarding or Slang Replace [SlR].
- Spam blocking, outbound calls: not found [SlPr]. Phone ordering: not found on Slang's pages; Yelp's comparison article says Slang does not support direct phone ordering or waitlist management **(competitor's page)** [YS].

---

## 9. Loman (loman.ai, restaurants)

Sources:
- Pricing: https://loman.ai/pricing (**[LPr]**)
- Home: https://loman.ai/ (**[LH]**)
- llms.txt (Loman's own machine-readable summary): https://loman.ai/llms.txt (**[LL]**)
- Toast's support article (Toast's site, describing the Loman integration): https://support.toasttab.com/en/article/Get-Started-With-the-LomanAI-Integration (**[LT]**)
- No Loman help center found.

### 9.1 Who, sales model, pricing
- **For:** restaurants: phone orders, reservations, FAQs [LL].
- **Sales-led:** "Request Pricing", "Schedule a demo" [LPr]. Also reachable by adding the integration in Toast; then "the LomanAI team will reach out to you directly to start your account setup and onboarding" [LT].
- **Pricing contradiction:**
  - Pricing page: plans Starter and Premium, **no prices**, "No per minute fees", "No hidden costs" [LPr].
  - llms.txt: Starter about **$199/month** monthly or $149 yearly with about **500 talk minutes**, overage about **$0.59/minute**; Premium about $399/month or $299 yearly, about 500-1,000 minutes, adds POS and reservation integration, payments, brand voice cloning; Enterprise custom [LL].
  - "No per minute fees" [LPr] conflicts with "$0.59/minute" overage [LL].
- Onboarding fee: third-party search results report conflicting $249 / $149 onboarding fees on Loman partner pages; not verified on a page read.
- Trial, card: not found.

### 9.2 Signup and setup flow
- "24-48 hour onboarding" [LPr]; "in less than 24 hours"; "less than an hour of your time" [LH]; standard integrations live in under 48 hours [LL].
- Done mostly by Loman's team: connect POS, import menu, customise hours, FAQs and preferences [LH].
- Steps: connect systems, import the menu, choose a greeting, set hours and rules, then test; Loman's team handles testing, walks you through the dashboard, and helps forward your existing number [LH].
- White-glove option [LH]; Enterprise white-glove and account manager [LL].
- Business facts source: **POS menu import**; info, menu and hours editable in the dashboard [LH].

### 9.3 Configuration
- Greeting, hours, rules, FAQs [LH]. Transfers: live line, voicemail with transcript, or message to team with caller context [LH]. Upsell prompts [LH]. 55 languages with auto detection, tickets to POS in English [LH]. Payments by phone for pickup/delivery [LH]. Recognises repeat callers, quotes wait times [LH].
- Voice selection and limits on what it may say: not found [LH].

### 9.4 Phone number
- Forward the existing number; no new hardware [LH][LL]. Local numbers per store for groups [LH]. New number/porting: not found.

### 9.5 After each call
- Orders and payments to POS and reservation systems; transcripts and outcomes in dashboard; voicemails with transcripts; messages to team [LH]. Call recordings, transcripts, missed-opportunity logs [LL].
- Retention, recording disclosure: not found [LH].

### 9.6 Dashboard
- Command center: live calls, transcripts, orders, outcomes, edit info/menu/hours, payments, revenue, peak call times [LH].
- **Multi-location:** shared menu with per-store overrides, local numbers, store-specific hours and holidays, region-based routing, analytics by location [LH]. Users: not found.

### 9.7 Integrations
- POS: Toast, Square, Clover, SpotOn, NCR Aloha, Olo, Revel, PAR Brink; reservations: OpenTable, Resy, SevenRooms [LL]. Toast flow: Integrations > Browse & purchase > LomanAI > choose locations > confirm data scope [LT].

### 9.8 Features
By plan, from the pricing page (no prices shown) [LPr]:
- **Starter:** "Humanlike voice AI", "Outbound SMS", "Handle customer inquiries", "Automated call transfer", "Automatic menu updates", "Restaurant knowledge graph", "Up to 50 calls handled at once", "Interruption handling", "Customer dashboard".
- **Premium:** everything in Starter plus "Takeout and delivery ordering", "Automated phone reservations", "Complete POS integration", "Secure payment over the phone", "Smart guest memory", "Dynamic upsell engine", "Out-of-stock AI menu updates", "Intelligent SMS updates".
- **Enterprise:** not listed ("custom integrations or enterprise features").
From llms.txt [LL]: Starter (~$199/month, ~500 minutes, ~$0.59/min over): 24/7 answering, FAQ and menu Q&A, SMS and call transfer, dashboard. Premium (~$399/month): POS integration, reservation integration, payment processing, **custom brand voice cloning**, premium analytics. Enterprise: volume minute discounts, white-glove setup, account manager, custom integrations and API, advanced security.
Plan not stated [LH][LL]:
- Languages: "55 languages", auto-detected [LH]; **contradiction:** llms.txt says "English and Spanish support (with other languages possible)" [LL].
- Voicemail with transcript; messages to team with caller context [LH].
- Repeat-caller recognition; wait-time quotes; catering inquiries; allergen questions [LH].
- Recordings, transcripts, revenue tracking, missed-opportunity logs [LL].
- Multi-location: shared menu with per-store overrides, local numbers per store, store-specific hours, region-based routing, per-location analytics [LH].
- Spam blocking, outbound calls: not found.

---

## 10. Numa (numa.com, auto dealers, service departments)

Sources:
- Home: https://www.numa.com/ (**[NH]**)
- Integrations guide (Numa blog): https://numa.com/blog/numa-dealership-integrations-dms-schedulers-crm-guide (**[NI]**)
- AI receptionist for car dealerships (Numa blog): https://numa.com/blog/ai-receptionist-for-car-dealerships (**[NR]**)
- Voice AI for service departments (Numa blog): https://numa.com/blog/voice-ai-for-service-departments (**[NV]**)
- News page: https://www.numa.com/news/numa-unveils-the-first-ai-agent-platform-for-auto-dealerships (**[NN]**)
- No pricing page, help center or public documentation found [NH]. Trust Center (https://trust.numa.com/) returned no readable content.

### 10.1 Who, sales model, pricing
- **For:** franchise dealerships and multi-rooftop groups, fixed ops (service); single stores too [NH]. Products: Voice AI, Operator (AI receptionist with routing), Appointment Agent, Service Advisor Agent, Smart Inbox, LiveCSI, Opportunities, Numa for Sales, Call Intelligence, mobile app [NH].
- **Sales-led:** only "Get a demo" [NH]. Pricing: not published [NH]. Third-party: no published pricing, itemised after demo **(third-party)**: https://serviceagent.ai/blogs/numa-pricing/ . OEM programs: GM iMR, FordDirect, Stellantis, BMW [NN].

### 10.2 Signup and setup flow
- "Most dealerships go live in 2-3 weeks"; a dedicated Numa team handles **DMS integration, phone configuration, and staff training**, with check-ins in the first weeks; "most teams are proficient within 90 days" [NH].
- Basic deployment "within days", fully configured with custom routing, escalation and scheduling integration "one to three weeks" [NR].
- Business facts source: the **DMS, scheduler and CRM** (customer records, vehicle ownership, service history, RO status, technician availability, open slots); Foureyes API for location, hours, services [NI].
- Step order, test calls, before-payment: not found.

### 10.3 Configuration
- Books into real open slots in Xtime, DealerFX, Tekion APC or Numa's scheduler, with loaner/shuttle/Uber preference [NI]. Gives repair status and estimated completion times [NI].
- Routes by call type (scheduling to BDC, RO status to assigned advisor), handing off context [NV]; Operator "precision routing" [NH].
- Greeting, voice, hours, limits on promises: not found [NI][NR][NV].

### 10.4 Phone number
- "Phone configuration" done by Numa during onboarding [NH]. Operator runs on the dealership's existing phone system (press coverage listed on [NN]). Forwarding/porting details: not found.

### 10.5 After each call
- "Every AI conversation is logged, transcribed, and synced to your CRM and DMS automatically"; recordings, transcripts, summaries to CRM; next-step recommendations in VinSolutions [NI]. Smart Inbox thread with the repair order beside it; Call Intelligence scores every call [NH].
- Retention, disclosure: not found.

### 10.6 Dashboard
- Smart Inbox, Call Intelligence, mobile app [NH]. Multi-rooftop standardisation [NH]. Users/seats: not found.

### 10.7 Integrations
- DMS: CDK Drive, Reynolds & Reynolds, Tekion, Dealertrack, PBS, DealerBuilt; schedulers: Xtime, DealerFX, Tekion APC, Numa's own; CRM: CDK CRM (eLead), VinSolutions; UVeye; Foureyes [NI].

### 10.8 Features
No tiers or prices published [NH]. Products listed on the home page, each sold as a named product [NH]:
- **Voice AI:** answers every call with the customer's history and sentiment; reads and writes the DMS.
- **Operator:** AI receptionist with "precision routing" to the right person.
- **Appointment Agent:** books service appointments into real open slots.
- **Service Advisor Agent:** drafts replies, surfaces history, handles follow-ups.
- **Smart Inbox:** all calls and texts in one thread with the repair order.
- **LiveCSI:** flags unhappy customers while they are in the shop.
- **Heat Case Agent:** works escalating customer issues.
- **Opportunities / Opportunity Agent:** finds declined or unsold work in the DMS and books it (channel not stated).
- **Numa for Sales:** sales calls with inventory context.
- **Call Intelligence:** scores and summarises calls for coaching.
- **Mobile App.**
From the integrations guide [NI]: loaner/shuttle/Uber preference at booking; repair status and estimated completion times; plain-language UVeye inspection findings; DealerFX confirmations.
- A third-party news summary describes the Appointment Agent as priced per appointment booked; seen only in a search-result summary, not read **(third-party)**: https://www.autosuccessonline.com/numa-ai-agent-platform-dealerships/ .
- Spam blocking, languages, quoting, multiple numbers: not found.

---

## Feature matrix

How to read a cell: the plan or tier on which the product offers the feature. **Incl.** = part of the product's single AI-receptionist offering (Jobber Receptionist add-on or Plus; Housecall Pro CSR AI add-on; CallRail Voice Assist). **tier unpub.** = the vendor lists the feature but publishes no tiers or prices. **no** = the vendor says it is not offered. **not found** = the vendor pages read do not list it. The Yelp column is **Yelp Host** (restaurants), because Yelp Receptionist was discontinued in September 2026. Each cell's source is in that product's section above, mostly point 8.

| Feature | Jobber | Housecall Pro | Sameday | Avoca | CallRail | Yelp Host | Podium | Slang | Loman | Numa |
|---|---|---|---|---|---|---|---|---|---|---|
| Price basis | add-on $29/mo, 30 conv., $0.79 over; Plus incl. | add-on, unpublished | $449/mo 500 min; $789/mo 1,000 min | unpublished | $75 or $95/mo, 50 calls, $1 over | $249 capped; $399 unlimited | add-on, unpublished | $399 / $599 per location | unpublished (llms.txt ~$199 / ~$399) | unpublished |
| Calls answered 24/7 | Incl. | Incl. | Scale (Launch: after hours, weekends) | tier unpub. | Incl. | Base | tier unpub. | Core | Starter | tier unpub. |
| After-hours or overflow-only mode | Incl. (carrier forwarding) | not found | Launch | tier unpub. | Incl. | Base ("only when extra coverage is needed") | not found | not found | not found | not found |
| Answers inbound texts | Incl. | alpha, new customers only | not found (sends texts: tier unpub.) | tier unpub. | Incl. | not found | tier unpub. | plan not stated ("Direct Text") | not found | tier unpub. |
| Outbound SMS (links, confirmations, follow-ups) | Incl. (hang-up text-back) | alpha | tier unpub. | tier unpub. | Incl. | Base (SMS links, pay link) | tier unpub. | Core | Starter | tier unpub. |
| Website chat | Incl. (Jobber website) | yes, plan not stated | not found | tier unpub. | not found | not found | tier unpub. | not found | not found | not found |
| Books appointments, jobs or reservations | Incl. | Incl. | Launch | tier unpub. | Incl. | Base | tier unpub. | Core | Premium | tier unpub. |
| Reschedule or cancel | Incl. | Incl. | not found | tier unpub. | Incl. | Base | not found | plan not stated (inbox tags) | not found | not found |
| Creates a record in the business's system | Incl. (jobs, requests, tasks) | Incl. (jobs, estimates) | tier unpub. | tier unpub. | Incl. (CRM sync) | Base | not found | Core | Premium (POS orders) | tier unpub. (DMS) |
| Estimates or quotes | coming soon | Incl. (books estimates) | tier unpub. (follow-ups) | not found | not found | not found | not found | not found | not found | not found |
| Phone ordering and payment | not found | not found | not found | not found | not found | Base | not found | not found | Premium | not found |
| Live transfer to a person | Incl. | Incl. | tier unpub. | tier unpub. | Incl. | Base | tier unpub. | plan not stated | Starter | tier unpub. |
| Message taking | Incl. (tasks) | Incl. (notes) | not found | tier unpub. | Incl. (lead capture) | not found | tier unpub. (Note Taker) | not found | tier unpub. | not found |
| Spam filtering | Incl. (not billed) | not found | not found | not found | Incl. | Base | not found | not found | not found | not found |
| Languages beyond English | not found | no (Spanish planned) | Launch: Spanish; Enterprise: multilingual | tier unpub. | not found | Base | not found | Core: Spanish; Premium: 97 | tier unpub. (55; llms.txt: Spanish) | not found |
| Voice choice, custom or cloned voice | Incl. (choice) | Incl. (choice) | Scale (cloning) | tier unpub. (choice) | Incl. | Base | not found | Premium (20 voices) | Premium (cloning) | not found |
| Outbound AI calls or campaigns | not found | not found | tier unpub. | tier unpub. | not found | not found | beta (phone + email) | not found | not found | not found |
| Call summaries | Incl. | Incl. | tier unpub. | tier unpub. | Incl. | not found | tier unpub. | plan not stated; Smart Inbox Premium | tier unpub. | tier unpub. |
| Transcripts | Incl. | not found | tier unpub. | tier unpub. | Incl. | Base | tier unpub. | plan not stated; Smart Inbox Premium | tier unpub. | tier unpub. |
| Call recordings | Incl. | not found | tier unpub. | tier unpub. | Incl. (required) | not found | tier unpub. | always on, plan not stated | tier unpub. | tier unpub. |
| Lead qualification or urgency | not found | Incl. (urgency) | tier unpub. | tier unpub. | Incl. | not found | not found | not found | not found | not found |
| Call scoring or QA coaching | not found | not found | tier unpub. | tier unpub. | Incl. | Base | not found | Premium | not found | tier unpub. |
| Analytics dashboard | Incl. | Incl. | tier unpub.; Enterprise advanced | tier unpub. | Incl. | Base | tier unpub. | Core; Enterprise reporting | Starter; Premium analytics | tier unpub. |
| Owner alerts (email, SMS, push) | Incl. | Incl. | not found | tier unpub. | Incl. (email) | not found | tier unpub. | Premium | not found | not found |
| Multiple locations | not found | not found | Launch: 3; Scale: multiple | tier unpub. | one company per location | not found | tier unpub. | priced per location | tier unpub. | tier unpub. |
| Multiple inbound numbers | not found | not found | tier unpub. | tier unpub. | not found | not found | not found | not found | tier unpub. (per store) | not found |
| Team users and roles | admins only | not found | Launch ("whole team") | tier unpub. | not found | not found | tier unpub. | Enterprise (SSO, MFA) | not found | not found |
| API or webhooks | not found | not found | Enterprise | tier unpub. | not found | not found | not found | Enterprise | Enterprise | not found |
| Vendor's human agents as backup | not found | separate HCP Assist subscription | not found | tier unpub. | not found | not found | not found | not found | not found | not found |
| Test before going live | Incl. | Incl. | not found | tier unpub. | Incl. | not found | tier unpub. | go-live checklist | vendor team tests | not found |
| Free trial | 14 days, no card | 14 days, no card (software) | not found | not found | 14 days, no card | up to 30 days | not found | not found | not found | not found |

---

## Patterns across these products

### P1. Where the business facts come from: the system the business already runs, not a form
- **The vertical software is the knowledge base.** Jobber reads company settings, services, request forms and online-booking settings ("works on day one using data already in Jobber") [Jobber]. Housecall Pro reads the price book, schedule, hours and service area [Housecall Pro]. Avoca syncs ServiceTitan job types, business units, service areas, technician shifts and arrival windows [Avoca]. Numa reads the DMS and scheduler [Numa]. Loman imports the POS menu [Loman]. Yelp Host reads the Yelp Page [Yelp]. Slang reads hours from Google Business Profile on every call and tells owners to change hours in Google, not in Slang [Slang].
- **Website scraping is the fallback when there is no system of record.** CallRail autofills Company overview, Services, Service area and FAQs from the website URL (and past call transcripts) [CallRail]; Avoca has "Find FAQs on website" [Avoca]; Jobber uses FAQs from a Jobber-built website [Jobber].
- **AI drafts, owner reviews.** Jobber auto-writes the greeting and offers an AI-generation checkbox for "Essential information" [Jobber]; Avoca "Generate All with AI" / "Format with AI" with a warning to review [Avoca]; CallRail profile must be "reviewed and saved" before Voice Assist works [CallRail].
- **Typed, structured copy per topic** where the vendor supplies the conversation design: Slang's fixed topic list with per-topic routing [Slang]; Avoca's Knowledge Base sections with per-service Book / Transfer / Take a message [Avoca].

### P2. Setup order: self-serve products put the test call before the money and the phone number last
- **Self-serve order (Jobber, CallRail):** greeting/voice → what the AI may do on its own → knowledge → **test call** → pay / get number / enable. Jobber's step 5 has Receptionist call the owner; step 6 adds the add-on and dedicated number [Jobber]. CallRail: business profile → voice/greeting → intake questions → Test Assistant → enable in a Call Flow; trial needs no card [CallRail].
- **Housecall Pro inverts it:** forwarding first (a text arrives about an hour after attaching CSR AI), then booking, price book and service area; its product page says those can be "fine-tuned later" and you are "live in minutes" [Housecall Pro].
- **Sales-led order (Avoca, Slang, Sameday, Loman, Numa, Podium):** agreement/demo → vendor implementation person → configuration (often done by the vendor's team: Loman, Numa, Sameday "set up on a call") → test → forward → tell the vendor you are live → review (Slang's Initial Results Review at two weeks) [Avoca][Slang][Sameday][Loman][Numa][Podium].

### P3. Go-live is gated and reversible; the AI does not answer until the business switches it on
- **Explicit gate:** Avoca's required checklist blocks "Mark Responder live", "Your assistant doesn't take customer calls until you go live", and forwarding is only marked done "after a real call reaches your assistant"; each launch decision needs a named approver [Avoca]. Podium's Test Bench runs simulated conversations before a new agent goes live and the business approves [Podium]. CallRail stays disabled until a Call Flow enables it [CallRail].
- **On/off switches per channel** instead of a gate: Jobber's call and text toggles, plus "trusted access" numbers so texting can be tested while off [Jobber]; Yelp "24/7, or only when extra coverage is needed" [Yelp].
- **Test call to the owner's own phone** is near universal: Jobber, CallRail, Housecall Pro ("Test CSR AI" button), Slang (check voice and pronunciation), Avoca (registered test phones only, test details "never a real customer's information") [Jobber][CallRail][Housecall Pro][Slang][Avoca].
- **Answering modes:** always / after hours / overflow (no answer after N rings) [Avoca][CallRail][Jobber].

### P4. Pricing: a flat monthly fee per business (or per location) with a usage allowance; vertical-software vendors sell it as a cheap add-on
- **Add-on with a small allowance and per-unit overage:** Jobber $29/month for 30 conversations, $0.79 each after, unlimited on Plus; spam and no-conversation not counted [Jobber]. CallRail $95/month (or $75 on its standalone site) with 50 calls, $1 per call over, only calls over 15 seconds count [CallRail].
- **Tier by call volume:** Yelp Host $249 capped vs $399 unlimited [Yelp]. **Tier by minutes:** Sameday $449/500 min, $789/1,000 min [Sameday]; Loman llms.txt ~500 minutes, $0.59/min overage (contradicted by its own "No per minute fees") [Loman].
- **Per location:** Slang $399/$599 per location per month [Slang]; Sameday bundles 3 locations in Launch [Sameday]; CallRail needs one "company" per location with different hours or address [CallRail].
- **Unpublished, quote only:** Housecall Pro CSR AI, Avoca, Podium, Numa, Loman's pricing page [Housecall Pro][Avoca][Podium][Numa][Loman].
- **Free trial without a card:** Jobber, Housecall Pro, CallRail (14 days); Yelp Host up to 30 days free [Jobber][Housecall Pro][CallRail][Yelp].
- No product charges per seat for the AI itself; user access rides on the host software's users [Jobber][Avoca][Slang].

### P5. Phone number: a vendor-owned number plus forwarding from the business's existing number; porting is rare
- **A dedicated vendor number is required, the public number forwards to it:** Jobber (DPN required), Housecall Pro (CSR AI-only number "should not be used in any marketing"), Avoca (forwarding number from the CSM), CallRail (dedicated Voice Assist number), Yelp (dedicated number "you can list anywhere", or forward), Slang (Call Forwarding or "Slang Replace") [Jobber][Housecall Pro][Avoca][CallRail][Yelp][Slang].
- **Porting** offered only by Sameday [Sameday]; not found for the others.
- **Loop warning:** the transfer/escalation number must differ from the forwarded number [Jobber][Housecall Pro][Slang].
- **Risk of publishing the vendor's number:** when Yelp discontinued Receptionist, owners had to remove the number from their website, cards and ads and turn off forwarding; calls stopped being answered on a fixed date [Yelp].

### P6. After each call: summary + transcript + recording, a record created in the business's own system, and alerts filtered by priority
- Summary, transcript and audio recording on every call: Jobber, Avoca, Sameday, Yelp, Slang, Podium, Numa, Loman, CallRail (summary and transcript) [all].
- **A real record is created where the owner already works:** Jobber jobs, requests and tasks; Housecall Pro jobs and estimates; Avoca bookings into ServiceTitan; Loman orders into the POS; Numa writes to the DMS/CRM; Yelp Host into OpenTable [Jobber][Housecall Pro][Avoca][Loman][Numa][Yelp].
- **Alerts are filtered, not one per call:** Avoca emails with "[ACTION REQUIRED]" by priority and per call reason [Avoca]; Slang alerts by tag [Slang]; CallRail filters "Only Voice Assist calls" and by lead qualification [CallRail]; Jobber pushes only for tasks created during business hours [Jobber]. Yelp Receptionist texted the owner per call with a callback link [Yelp].
- **Retention:** **none of the ten publishes a retention period.** Sameday: owner can export and request deletion [Sameday]. Slang uses recordings and transcripts to train its AI [Slang]. **Recording is mandatory** in CallRail (requires call recording on) and Slang (required recording sentence) [CallRail][Slang]. No product offers zero data retention.
- **Disclosure is inconsistent:** Jobber recommends AI/recording notice but leaves it optional [Jobber]; Housecall Pro's own pages contradict each other on whether the default greeting says it is AI [Housecall Pro]; Avoca has an "AI disclosure" setting [Avoca]; Podium lets you customise the recording announcement [Podium]; Slang requires the recording sentence but its greeting does not mention AI [Slang].

### P7. Rules on what the AI may promise are explicit settings, tied to prices and arrival times
- Avoca: Fee Presentation Timing, Price Objection Retention (must name who approves a waiver, else "your assistant [may] promise something your team doesn't offer"), Arrival Timing Line [Avoca].
- Housecall Pro: price read from the price book, not the description; $0 items must explain why no price [Housecall Pro].
- Podium: Note Taker mode "avoids bringing up specific time frames" [Podium].
- Jobber: actions left off make Receptionist "ask first"; greetings that misrepresent the business "may not save" [Jobber].
- Service area as a hard booking rule: Avoca ("only books callers whose ZIP code is in a service area"), Housecall Pro, Podium default mode [Avoca][Housecall Pro][Podium].

### P8. Users and locations
- Access is limited to admins or role-based: Jobber "Only admins can access the dashboard and settings" [Jobber]; Avoca Admin / Member / Agent, plus "employee contacts" who get notifications but never sign in [Avoca]; Sameday role-based [Sameday]; Slang "Grant team access" is a go-live step [Slang].
- Locations are separate configurations: Slang (dropdown; new location = agreement + kickoff) [Slang]; CallRail (separate company) [CallRail]; Loman (shared menu, per-store overrides, local numbers) [Loman]; Sameday (location counts per plan) [Sameday].

### P9. What is base and what is upsold (from the tiered price lists)
- **Booking and system integrations are the first upsell:** Loman puts ordering, reservations, POS integration and phone payment in Premium, Starter only answers, transfers and texts [Loman]; Sameday includes "Pro scheduling (ServiceTitan etc)" from Launch [Sameday]; Slang includes reservation integrations in Core [Slang].
- **Languages and voices are upsold:** Slang Core has Spanish, Premium 97 languages and 20 premium voices [Slang]; Sameday Launch/Scale English and Spanish, Enterprise multilingual voices, Scale voice cloning [Sameday]; Loman voice cloning in Premium (llms.txt) [Loman]. Yelp Host is the exception: "nearly any language" at base [Yelp].
- **Alerts, inbox and QA sit in the middle tier:** Slang's Real Time Alerts, Smart Inbox and Enterprise QA are Premium [Slang].
- **API, custom integrations, SSO and advanced analytics are Enterprise-only:** Sameday, Slang, Loman [Sameday][Slang][Loman].
- **Single-offer products put everything in one price:** Jobber's Receptionist, Housecall Pro's CSR AI and CallRail's Voice Assist have no feature tiers [Jobber][Housecall Pro][CallRail]. For Jobber and CallRail the only variable is usage (conversations or calls) [Jobber][CallRail]; Housecall Pro publishes no price at all [Housecall Pro].
- **Spam filtering, where offered, is in the base offer:** Jobber tags spam and excludes it from the conversation count; CallRail lists robocall spam detection in its single plan; Yelp Host filters spam and wrong numbers at its base price [Jobber][CallRail][Yelp]. (Yelp Receptionist's FAQ listed "charges for spam calls" as a topic without showing the answer [Yelp].)
