# AI receptionist research, group 5: the vendors on geekatyourspot.com (LobbyStack, Voksha, Dapta)

Read 2026-11-19 from each vendor's own pages: marketing site, pricing, and above all the help center / docs, which show the real setup flow. Every fact carries its source URL. "Not found" means no page I read says it; nothing is inferred. Anything not from the vendor is marked **third-party**. The owner's own pages (geekatyourspot.com) were read for context only and are compared with the vendor at the end of each section; they are not used as a source of fact.

All three vendors publish machine-readable docs (`llms.txt` / `.md` pages), which is where most of the setup detail below comes from:
- LobbyStack: https://docs.lobbystack.com/llms.txt (Mintlify docs)
- Voksha: https://voksha.com/docs/llms.txt
- Dapta: https://docs.dapta.ai/llms.txt (GitBook docs)

---

## 1. LobbyStack (lobbystack.com)

### 1.1 Who it is for, sales model, pricing

- **Who:** "AI receptionist software for small businesses"; answers calls at any hour, books appointments, passes urgent calls to the team; open source with a free plan. https://lobbystack.com/ . Greeting examples in the docs are a dental clinic, salon, home services and restaurant. https://docs.lobbystack.com/agent/greeting-and-voice
- **Self-serve or sales-led:** self-serve signup ("Try for free"), no credit card. https://docs.lobbystack.com/getting-started/account-setup , https://docs.lobbystack.com/quickstart . Enterprise is "contact sales by email" with "dedicated implementation support". https://lobbystack.com/pricing/
- **Pricing model:** per workspace (business) plan with a monthly allowance of **voice minutes**, **transfer attempts**, **alert SMS segments** and **knowledge-base storage**; overage per minute / attempt / segment. Not per seat, not per call. https://docs.lobbystack.com/billing/plans

| Plan | Price | Voice min | Transfer attempts | Alert SMS segments | Knowledge base | Agents | Numbers | Call history & recordings kept |
|---|---|---|---|---|---|---|---|---|
| Free | $0 | 30 | 2 | 10 | 1 MB | 1 | trial number free 14 days | 30 days |
| Starter | $30/mo, or $288/yr ($24/mo) | 150, then $0.20/min | 20, then $0.02 | 50, then $0.02 | 5 MB | unlimited | 1 dedicated | 90 days |
| Pro | $100/mo, or $960/yr ($80/mo) | 500, then $0.18/min | 100, then $0.02 | 200, then $0.02 | 20 MB | unlimited | 1 dedicated | 90 days |
| Enterprise | custom | custom | custom | custom | custom | unlimited | multiple | custom |

Sources: https://lobbystack.com/pricing/ , https://docs.lobbystack.com/billing/plans , https://docs.lobbystack.com/billing/usage (retention row is on the pricing page only).

- Calls under 10 seconds and calls the agent ends as spam are not billed. https://docs.lobbystack.com/billing/usage
- Unused minutes do not roll over; annual plans still reset monthly. https://docs.lobbystack.com/billing/plans
- **Spending cap:** Starter/Pro owners can set a monthly overage cap; when overage hits it (or Free's 30 minutes run out) the agent stops answering and calls forward to the default transfer number, else the verified mobile, else busy signal. https://docs.lobbystack.com/billing/usage
- **Extra phone numbers** (Starter/Pro/Enterprise): an "Extra phone numbers" add-on billed monthly at carrier cost with no markup: US/Canada local $1.15, Puerto Rico $3.25, UK mobile $2.50, Australia mobile $8.25, New Zealand local $3.15. https://docs.lobbystack.com/agent/phone-number
- **Free trial / card:** Free plan, 14 days of full access, no credit card; the 14-day trial number is available in the US, Canada and Puerto Rico; one trial per business and account; refused if a trial started from your network in the last 30 days, if the network can't be checked, if email is unverified, or in a country without trials. LobbyStack emails on day 10, day 13 and the day after the trial ends; the number is released about a month after you got it. https://docs.lobbystack.com/getting-started/claim-your-number
- **Cancel:** from billing settings, no cancellation fee, downgrade takes effect at period end. Refund policy: not found. https://lobbystack.com/pricing/
- **Self-hosted (MIT licence):** Complete edition $0 (community support); Premium support $20/business/mo billed annually; Enterprise support $80/business/mo billed annually. You pay your host, Twilio and OpenAI directly. https://lobbystack.com/pricing/self-hosted/
- **White-label partner tiers** (agencies reselling under their own brand): Free $0 (30 min, 50 chats, 1 trial number); Starter $49/mo ($39 annual) 250 min, 1,000 chats, 2 numbers; Growth $199/mo ($159) 1,300 min, 5,000 chats, 10 numbers; Scale $499/mo ($399) 4,000 min, 10,000 chats, 25 numbers; overage $0.20/$0.15/$0.12 per minute. Partners set their own package prices and setup fees to their clients. https://docs.lobbystack.com/white-label/tiers , https://docs.lobbystack.com/llms.txt

### 1.2 Signup and setup flow (in order)

Source for steps 1-9: https://docs.lobbystack.com/quickstart , with detail from https://docs.lobbystack.com/getting-started/claim-your-number

1. **Create account:** email and password. (No card.) https://docs.lobbystack.com/getting-started/account-setup
2. **Name your business.**
3. **Import your website** (or "I don't have a website"). A background crawl of public pages (services, about, FAQ, hours, contact). Moves on when finished; if it fails you move on at once; past 90 seconds you move on and it continues in the background. The import also sets the agent's caller language; without a website you pick it. AI then writes the business summary (2-4 sentences) and fills opening hours from the site/documents. https://docs.lobbystack.com/settings/business-details
4. **Pick your agent's phone number:** country, then a number (area-code search). Without a paid plan this starts the 14-day free trial number. **If no trial can be offered, this step shows Starter / Pro / Enterprise and you must subscribe here, then come back to pick the number.** Countries without numbers: "Continue without a number" and test in the browser. "You need a number to finish setup."
5. **Say how you heard about LobbyStack.**
6. **Meet your agent:** call the number or test in the browser (call or chat); on the same screen change the agent's name, voice, greeting and caller language.
7. **Choose a plan:** if the number is on trial, plans are shown before Home: "Start 14-day free trial" (no card) or Subscribe to Starter/Pro.
8. **Forward your business line** (optional): Home > Getting started > "Keep your existing number" shows carrier codes with your number filled in. https://docs.lobbystack.com/getting-started/forward-calls
9. **Review before real callers:** agent General page and rules; Business > Details, Knowledge, Services, Employees.

- **Before vs after payment:** everything, including a live number answering calls, comes before payment when a trial is available; payment is step 7 (or step 4 when no trial is available). https://docs.lobbystack.com/quickstart
- **How business info is gathered:** website crawl, uploaded documents (PDF, DOCX, TXT, Markdown, 10 MB each), text entries; AI writes the summary and hours from them. No industry template for the business; no staff call (Enterprise has "dedicated implementation"). https://docs.lobbystack.com/settings/knowledge , https://lobbystack.com/pricing/
- **AI-assisted setup:** a ready-made prompt to paste into Claude/ChatGPT that sets the receptionist up with you via the MCP server and API; a CLI that onboards a business from one file (knowledge, agent, plan, number, owner). https://docs.lobbystack.com/quickstart , https://docs.lobbystack.com/llms.txt
- **Home "Getting started" checklist** after onboarding: Read the rest of your site, Call your number, Keep your existing number (forwarding), Add your website, Add opening hours, Add more sources. It switches to the daily view after the agent's first real customer conversation. https://docs.lobbystack.com/dashboard/home
- **Time to live / answers before setup is finished:** the number answers as soon as it is picked in step 4 ("Call the number from any phone. Your AI agent answers."). https://docs.lobbystack.com/getting-started/claim-your-number . No stated total time.
- **Test call before live:** yes, step 6 (browser call/chat or real call); browser test calls and trial calls both count against Free's 30 minutes. https://docs.lobbystack.com/billing/plans
- **Trial guardrail:** if the trial started with a verified mobile, transfers go only to that mobile during the trial. https://docs.lobbystack.com/getting-started/claim-your-number

### 1.3 How the receptionist is configured

- **Template:** one agent per workspace to start; no per-industry templates for businesses (white-label partners can save a business's setup as a template). https://docs.lobbystack.com/agent/overview , https://docs.lobbystack.com/llms.txt
- **Name, greeting, voice:** the agent Name is internal only ("Callers never hear it"). Greeting is free text; docs recommend including the business name, "a short disclosure that the caller is speaking with the AI agent", and an offer to help. 22 voices (Alloy ... Willow), default Marin; preview in the default language; "It can't copy someone's voice." https://docs.lobbystack.com/agent/greeting-and-voice , https://docs.lobbystack.com/quickstart
- **Business details** (shared by all agents): business summary, opening hours (with lunch-break windows and closures), default customer language (15 options), team language (language of notes to staff), time zone, currency. The agent switches to the caller's language, "more than 70 languages". https://docs.lobbystack.com/settings/business-details
- **Knowledge / FAQs:** text entries, documents, website imports; per-page on/off; per-agent "Specific knowledge". **Unanswered Questions** list: questions the agent couldn't answer from knowledge (calls, browser calls, chats, Instagram), up to 50, owner writes the answer which becomes a knowledge entry; kept 30 days (Free) / 365 days (paid) after last asked. https://docs.lobbystack.com/settings/knowledge
- **Rules:** plain-text rules, ordered by priority, per channel (all / calls / texts / website chat / Instagram); templates for live transfer, callback, uncertain answer, after-hours, pricing. Calls follow the first 50 active rules; up to 100 rules. https://docs.lobbystack.com/agent/rules , https://docs.lobbystack.com/llms.txt
- **Limits on what the AI may promise:** features list "Business knowledge, service rules, and do-not-say instructions"; the agent quotes only the price entered for a service and "doesn't guess one" if empty; rule template "If the agent is not sure of an answer, say that the team will follow up instead of guessing". https://lobbystack.com/features/ , https://docs.lobbystack.com/settings/services , https://docs.lobbystack.com/agent/rules
- **Business hours / after-hours:** opening hours drive booking; after-hours handling via rules; "after-hours answering" is not on Free. https://docs.lobbystack.com/settings/business-details , https://lobbystack.com/pricing/
- **Transfers:** one default transfer number per agent; employees with their own numbers can be asked for by name; transfer countries limited to a list of 18. Without a transfer number the agent takes callback details. **Staff answers first** (paid plans, Twilio numbers): rings a staff phone first for 10-60 s (default 15); press 1 to take it, otherwise the agent answers; optional 200-character messages before ringing / before the agent answers; business hours or always. https://docs.lobbystack.com/agent/calls-and-booking
- **Booking:** per agent, one of **Books appointments / Takes requests / Doesn't book**. Services have title, duration, price type (Fixed / From / Between / In person), description, Bookable switch. Employees have services, own working hours, time off; caller can book a named employee. Bookings only inside opening hours; closures block booking. Calendars: Google Calendar, Cal.com, Calendly (paid Calendly account). https://docs.lobbystack.com/settings/services , https://docs.lobbystack.com/settings/employees , https://docs.lobbystack.com/integrations/overview
- **Cancel / reschedule by phone:** optional; caller verified by phone number, name and an appointment detail; optional texted one-time code or keypad PIN (4-8 digits, locked after 5 wrong tries); otherwise the request goes to the team to approve. https://docs.lobbystack.com/agent/appointment-changes
- **Message taking:** callback/message tasks appear under "Action required" on Home and on the call's Details tab with "Mark done". https://docs.lobbystack.com/dashboard/home , https://docs.lobbystack.com/dashboard/inbox
- **Other per-feature claims** (features page, no tier stated): quotes (exact, starting or range prices), lead qualification questions, service-area (postal/ZIP) checks, dedicated lines (sales/quote/booking/support), reminders 24 hours ahead by text if the caller agrees. https://lobbystack.com/features/

### 1.4 Phone number

- New number: picked during setup (US, Canada, Puerto Rico; UK, Australia, New Zealand "being added"). https://docs.lobbystack.com/getting-started/number-countries
- Call forwarding: "Calls you miss" or "All calls", with codes/settings for 51 US/Canada carriers and phone systems; the step finishes when LobbyStack detects the first forwarded call. https://docs.lobbystack.com/getting-started/forward-calls , https://docs.lobbystack.com/dashboard/home
- Porting: "contact the team so we can review the best path". https://docs.lobbystack.com/getting-started/claim-your-number
- A number can be replaced once; old number works 30 days. After a paid plan ends the number is kept 30 days, then released. https://docs.lobbystack.com/agent/phone-number

### 1.5 After each call

- **Owner gets:** email "Call answered" alert (caller, time, length, summary, link) on by default; optional alerts for callback voice messages, new texts, website chats, failed SMS, calendar sync issues, failed transfers; by email and/or SMS to a verified operator phone (SMS needs explicit operator consent). https://docs.lobbystack.com/settings/notifications , https://docs.lobbystack.com/integrations/sms
- **In the dashboard:** each call has Details (follow-up tasks, appointment requests, outcome, transfer status), Transcript, Recording. https://docs.lobbystack.com/dashboard/inbox
- **Retention:** call history and recordings 30 days (Free), 90 days (Starter, Pro), custom (Enterprise). https://lobbystack.com/pricing/ . The docs say "Manage recording and retention policy in your workspace and compliance settings" but no page I found describes those settings. https://docs.lobbystack.com/agent/rules
- **Workspace deletion** erases calls, chats, contacts, appointments, knowledge, settings; cannot be restored. https://docs.lobbystack.com/settings/team
- **Caller consent / disclosure:** AI disclosure is recommended in the greeting (above). Recording disclosure: not found. SMS consent to callers is verbal on the call with a fixed script ("Can Example Business text this number with your appointment confirmation and reminder? Message and data rates may apply..."); all cloud businesses text from one LobbyStack toll-free number (+1 844 656 2290). https://docs.lobbystack.com/integrations/sms

### 1.6 Dashboard / app

- Areas: Home, Inbox, Appointments, Contacts, Analytics, Agents, Business, Settings. https://docs.lobbystack.com/introduction
- Home: setup checklist, then phone & results card (Booked value, Time saved, Calls without transfer over 30 days), Action required, Upcoming, Calls per month, Recent calls. https://docs.lobbystack.com/dashboard/home
- Inbox: phone, browser, website chat, Instagram, SMS; take over / resume AI on chats; staff reply to texts (the AI does not). https://docs.lobbystack.com/dashboard/inbox
- Contacts: caller profiles, activity, appointments, blocking (blocked callers are hung up on), SMS consent state, keypad PIN. https://docs.lobbystack.com/dashboard/contacts
- Analytics: calls, average duration, appointments, call outcomes, channel share. https://docs.lobbystack.com/dashboard/analytics
- **Users:** Owner / Admin / Viewer roles, invites by email; no seat limit or seat price found. https://docs.lobbystack.com/settings/team
- **Multiple locations:** multiple workspaces per account (workspace switcher); within a workspace, multiple agents "such as one for after hours or one per location" (paid plans), each with its own number via the add-on. https://docs.lobbystack.com/getting-started/account-setup , https://docs.lobbystack.com/agent/overview

### 1.7 Integrations

Google Calendar, Cal.com, Calendly (paid Calendly), Instagram DMs, signed webhooks (Standard Webhooks; retries ~23 h), REST API with scoped keys, MCP server (Claude, ChatGPT, Cursor...). "To connect a CRM or Zapier, use webhooks and the LobbyStack API." No native CRM. https://docs.lobbystack.com/integrations/overview , https://docs.lobbystack.com/integrations/webhooks , https://docs.lobbystack.com/llms.txt . Pricing page lists "Zapier, webhook, and MCP integrations" on every plan. https://lobbystack.com/pricing/

### 1.8 Features by tier (vendor's lists)

From https://lobbystack.com/pricing/ unless noted:
- **All plans (Free included):** caller details & message capture, knowledge-base answers, plain-language workflows, spam filtering, calls under 10 s not billed, unlimited concurrent calls, answers in the caller's language, unlimited appointment booking, Google Calendar, urgent call handoff, call transfers, email & SMS notifications, unlimited summaries & transcripts, caller profiles & notes, unlimited contacts, website knowledge import, managed cloud hosting; Zapier/webhook/MCP.
- **Free only, restricted:** 24/7 answering for 14 days only.
- **Starter, Pro, Enterprise only:** appointment confirmation texts, after-hours answering, usage-based overages, more than one agent, Staff answers first, extra numbers add-on. (Staff answers first: https://docs.lobbystack.com/agent/calls-and-booking ; agents: https://docs.lobbystack.com/agent/manage-agents)
- **Support:** Free community, Starter email, Pro priority email, Enterprise dedicated implementation.
- **Outbound calls:** none; "LobbyStack doesn't make any other outgoing calls" than transfer legs. https://docs.lobbystack.com/billing/plans
- **Website chat widget:** "restricted and isn't part of the hosted plans" (see contradictions). https://docs.lobbystack.com/agent/widget
- **White label, self-hosting:** see 1.1.

### 1.9 Contradictions in LobbyStack's own pages

1. **Website chat:** "Website chat isn't part of the hosted plans" (https://docs.lobbystack.com/quickstart , https://docs.lobbystack.com/agent/widget) vs. "Without a plan, the workspace stays on Free without a number ... with browser test calls and website chat" (https://docs.lobbystack.com/billing/plans , https://docs.lobbystack.com/getting-started/claim-your-number).
2. **AI replies to texts:** "The receptionist doesn't reply to text messages" / "The AI doesn't reply to SMS" (quickstart, inbox) vs. Rules channel table "Text messages: Replies to texts" and example rule "Keep replies under 300 characters" for texts. https://docs.lobbystack.com/agent/rules
3. **Number countries:** UK, Australia, NZ are "being added" (https://docs.lobbystack.com/getting-started/number-countries) while the extra-number price table already lists UK, Australia and NZ prices (https://docs.lobbystack.com/agent/phone-number).
4. **Zapier:** pricing lists "Zapier" as an included integration; docs say Zapier is reached through webhooks and the API. Not a direct contradiction; no native Zapier app page found.
5. **Recording retention settings:** docs point to "workspace and compliance settings" that no docs page describes; the only stated periods are on the pricing table.

### 1.10 Where the owner's page differs from the vendor

Owner's page: `geekatyourspot/content-writer-output/marketing/Lead Capture Pipeline Intelligent Receptionist/tools/lobbystack.html`
- Owner: "The Pro plan costs $15 to $30 per month." Vendor: Pro is $100/mo or $80/mo billed annually; Starter is $30. https://docs.lobbystack.com/billing/plans
- Owner: "Out of the box, Lobbystack connects to Google Calendar" (as the only calendar). Vendor also lists Cal.com and Calendly, plus Instagram. https://docs.lobbystack.com/integrations/overview
- Owner: "call summaries, transcripts, and recordings are always accessible from the dashboard." Vendor: call history and recordings are kept 30 days (Free) / 90 days (Starter, Pro). https://lobbystack.com/pricing/
- Owner: "On paid plans, alerts go out by email and (optionally) SMS." Vendor lists email and SMS notifications on all plans, Free included (10 SMS segments). https://lobbystack.com/pricing/
- Owner: free plan with "30 browser voice minutes." Vendor: the 30 minutes cover browser tests and calls to a 14-day trial phone number. https://docs.lobbystack.com/billing/usage
- Owner: transfers happen "without an introduction". Not found on vendor pages read.
- Owner: "support for over 70 languages on OpenAI's GPT-Live." Vendor says "more than 70 languages"; the model name is not on pages read. https://docs.lobbystack.com/settings/business-details
- Owner's JSON-LD offer is $30 with the URL of LobbyStack's affiliate-program blog post, not its pricing page.

---

## 2. Voksha (voksha.com)

### 2.1 Who it is for, sales model, pricing

- **Who:** "24/7 AI phone receptionist for small and local businesses", US, Canada and UK; "1,200+ local businesses"; industries listed: salons/spas/fitness, medical/dental/vet/PT/mental health, home services, law/accounting/insurance/mortgage, restaurants, real estate, auto repair, tutoring, SaaS/fintech. Operated by TechnoKeen Inc., Los Angeles. https://voksha.com/llms.txt , https://voksha.com/privacy/
- **Self-serve or sales-led:** Starter and Premium self-serve at app.voksha.com; Enterprise via "Talk to sales". https://voksha.com/ , https://voksha.com/enterprise/
- **Pricing model:** **per agent, per answered call.** "You buy one plan for each agent, not one for your account. Two agents means two plans." https://voksha.com/docs/getting-started/choose-a-plan/ . "Per plan and per call. Team size doesn't change the bill." https://voksha.com/pricing/

| Plan | Price | Included | Overage | Number | Languages |
|---|---|---|---|---|---|
| Starter | $14/mo | 15 calls | $1 per call | 1 local | English |
| Premium | $99/mo | 150 calls | $1 per call | 1 toll-free | 2 (English + one, e.g. Spanish, Korean, Chinese, French) |
| Enterprise | from $990/mo | custom | custom | multiple | 50+ auto-detected |

Sources: https://voksha.com/pricing/ , https://voksha.com/faq/what-languages-does-voksha-support/

- Monthly only; no annual plan or prepaid discount. No setup fee, no contract, cancel any time; upgrades immediate, other changes next cycle. Unused calls do not roll over. Card payment; invoice billing on Enterprise. https://voksha.com/pricing/ , https://voksha.com/faq/how-does-billing-work/
- **What counts:** an answered call. Not counted: missed calls, network-failed calls, the two free test calls (docs); "Spam and robocalls that Voksha screens out" (pricing/FAQ). https://voksha.com/docs/account/billing/ , https://voksha.com/faq/how-does-billing-work/
- **Overage behaviour:** the agent keeps answering; extra calls billed; usage alerts. https://voksha.com/docs/account/billing/
- **Free trial:** **none.** A free demo line (1-888-488-1811) and a **7-day money-back guarantee** on every plan. https://voksha.com/faq/is-there-a-free-trial/ . Each new agent gets **two free browser test calls** before buying a plan, "no plan and no card". https://voksha.com/docs/getting-started/test-call/
- **Card:** needed "Before you go live". https://voksha.com/docs/getting-started/

### 2.2 Signup and setup flow (in order)

"The setup wizard is eight steps and takes about three minutes." https://voksha.com/docs/getting-started/ . Steps from https://voksha.com/docs/getting-started/create-an-agent/ and following pages:

1. **Sign up** at app.voksha.com with email. https://voksha.com/faq/how-long-does-setup-take/
2. **Wizard step 1, Your business:** name (spoken aloud exactly as typed) and website (Voksha reads it and fills in services and hours).
3. **Step 2, Industry:** the closest match; sets "the words it starts with, and the questions it expects".
4. **Step 3, Role:** what calls should achieve, saved as **Agent purpose** (Book appointments / Answer common questions / Capture new leads / Route urgent calls / Act like a receptionist / Custom). https://voksha.com/docs/agents/what-it-says/
5. **Step 4, Handoff:** Transfer the call or Take a message. ("Pick the true one.") The "What it says" page lists the handoff options as Take a message / Collect callback details / Tell them a human will follow up / I'm not sure yet.
6. **Step 5, Details:** hours, prices, what you do **not** do, the two questions everyone asks, pronunciation of the business name. "This is the screen that matters most."
7. **Step 6, Choose a plan** (Starter or Premium, one per agent). **Payment is here**, before a number. https://voksha.com/docs/getting-started/choose-a-plan/
8. **Step 7, Get a phone number:** country, area code, pick a number; Voksha buys it, creates the voice agent, saves instructions, attaches the number ("a couple of minutes"). UK +44 landlines wait about one working day for a Twilio/Ofcom regulatory check. https://voksha.com/docs/getting-started/phone-numbers/
9. **Step 8, finish.** Agent shows "Active" once it has a number and a plan. https://voksha.com/docs/getting-started/go-live/

Then:
- **Test:** Dashboard > Playground, browser call or chat; first two calls per agent free; test calls produce a recording, transcript and summary and appear in the call list. Docs recommend one browser call and one call to the real number. https://voksha.com/docs/getting-started/test-call/
- **Go live, staged:** send after-hours calls first, read them each morning, then busy hours, then everything; done at the phone company. https://voksha.com/docs/getting-started/go-live/
- **How business info is gathered:** website read during step 1; typed details (step 5); knowledge base (files, text, single URL with optional weekly re-check, sitemap or whole-site crawl). https://voksha.com/docs/agents/knowledge-base/ . No staff call on Starter/Premium; Enterprise gets "white-glove onboarding". https://voksha.com/faq/how-long-does-setup-take/
- **Time to live:** "under 5 minutes" (marketing, https://voksha.com/product/); wizard ~3 minutes plus "Ten quiet minutes" to prepare answers and a couple of minutes of provisioning (docs, https://voksha.com/docs/getting-started/).
- **Answers before setup is finished:** setup instructions (steps 1-5) and a plan are required before the number exists; nothing answers real callers until then. https://voksha.com/docs/getting-started/

### 2.3 How the receptionist is configured

Dashboard > Agents > agent > **Configure**; "Saving on Configure publishes to the live agent. The next call uses the new version." https://voksha.com/docs/agents/
- **Template:** the Industry step seeds wording and expected questions; "Ready-made call scripts for salons, clinics, law offices, home services, restaurants and more". https://voksha.com/docs/getting-started/create-an-agent/ , https://voksha.com/product/
- **System prompt:** plain text under Agent Logic, written in Markdown with six recommended headings (Personality, Environment, Tone, Goal, Guardrails, Tools); "Enhance with AI" rewrites it. Docs give a full template, including guardrails such as "Never quote a fixed price for treatment" and "If you do not know something, say you do not know and offer to take a message. Do not guess." https://voksha.com/docs/agents/what-it-says/
- **Greeting / voice:** "First message" field; Voice dropdown with a sample player, or a fallback "Voice preference" (Professional/Friendly Male/Female, Neutral). Region: US, Canada or UK, which sets number/date/time formats. https://voksha.com/docs/agents/voice-and-greeting/ . Tone options (professional, friendly, warm, formal, casual). https://voksha.com/faq/can-i-customize-the-greeting/
- **AI disclosure:** owner chooses simple greeting / brief mention / full disclosure; if asked "Am I talking to a robot?" Voksha "answers honestly". https://voksha.com/faq/will-callers-know-they-are-talking-to-ai/
- **Collected details:** up to 10 fields per agent, each with label, type (Text, Yes/No, Whole number, Number) and an instruction to the agent; shown on the call, in notifications and sent to Zoho CRM. https://voksha.com/docs/agents/collected-details/
- **Knowledge base:** files (PDF, Word, text, Markdown, HTML, EPUB), text, URL, sitemap, whole website; allowance per agent shown as e.g. "310 KB of 1 MB used"; "The knowledge base is included on some plans only" (plan not named). https://voksha.com/docs/agents/knowledge-base/
- **Business hours / after-hours:** different handling for business hours, after hours, weekends, holidays; after-hours emergency routing on Premium. https://voksha.com/faq/how-does-after-hours-answering-work/
- **Transfers:** Premium and Enterprise (custom call flows, after-hours emergency routing), by caller request, urgency, call type, time of day; if no one answers, takes a message. Starter takes messages only. https://voksha.com/faq/can-voksha-transfer-calls/
- **Booking (Premium+):** one connector ("diary") per agent; connecting a second disconnects the first. Calendars (Google, Outlook, iCloud): Voksha computes free times from working hours (per day), appointment length, timezone; busy calendar time is respected; booking on/off switch. Booking platforms (Mindbody, Square Appointments, Booker): the platform's services, staff and rules decide. https://voksha.com/docs/booking/ , https://voksha.com/docs/booking/hours-and-slots/ , https://voksha.com/docs/connectors/one-per-agent/ . FAQ also lists slot lengths of 15/30/45/60 min, buffer time, minimum notice, booking horizon. https://voksha.com/faq/can-voksha-book-appointments/
- **What the AI may promise in booking:** "An agent never claims an appointment that was not made." If a booking fails, the caller is told the team will confirm and the request shows as "Awaiting your confirmation". It never reschedules by phone (see contradictions on cancelling). https://voksha.com/docs/booking/
- **Scam protection (all plans):** "Voksha only shares information you allow", resists social engineering, one caller's information never shared with another. https://voksha.com/faq/how-does-voksha-prevent-social-engineering/
- **Message taking:** when it can't answer it says so, captures the question, takes name, number, best time, alerts by email and SMS. https://voksha.com/faq/what-happens-if-ai-cannot-answer/

### 2.4 Phone number

- New number bought by Voksha during setup (country + area code). One number per agent; two agents cannot share a number. https://voksha.com/docs/getting-started/phone-numbers/
- Forwarding from the existing number (all calls, or after hours / busy / no answer within N rings); carrier instructions for AT&T, Verizon, T-Mobile and others. https://voksha.com/faq/do-i-have-to-change-my-phone-number/
- Porting: not found.
- Cancelling a plan does not stop calls while forwarding remains: "Remove the forwarding at your phone company to stop calls." https://voksha.com/docs/account/billing/

### 2.5 After each call

- **Kept per call:** recording, transcript, summary, collected details, whether it booked. https://voksha.com/docs/calls/
- **Sent to owner:** per agent, any of SMS (paid plans; separate double-checkbox consent; one text per completed call with a listen link), email, Slack webhook, Google Chat webhook. Notifications contain the summary, collected details and a no-login link. https://voksha.com/docs/calls/notifications/ , https://voksha.com/docs/calls/sms-alerts/
- **No-login call link:** one link per agent, reused; it opens the agent's recent calls, not just one; "Treat the link as a password." https://voksha.com/docs/calls/call-link/
- **Booking emails:** caller gets a confirmation email if they gave an email; owner gets an email when the agent could not book and took a request. https://voksha.com/docs/calls/notifications/
- **Retention:** recordings 90 days by default, "configurable based on your plan"; transcripts 1 year or until deletion request; account data 30 days after deletion; billing records 7 years. https://voksha.com/privacy/ . Security page: "Configure retention policies for call recordings, transcripts, and contact information. Delete data on demand at any time." https://voksha.com/security/ . Docs: "Nothing is deleted when a plan ends." https://voksha.com/docs/account/billing/
- **Recording disclosure:** "State-specific call recording disclosures" listed under the GDPR & CCPA (Enterprise plan) block of the security page; no setup instruction found. https://voksha.com/security/

### 2.6 Dashboard / app

- Agents list (status, number, plan), Configure, Playground, Conversations (search by caller phone number only; filters status/date; sort), Appointments (only those Voksha made; statuses Booked / Awaiting your confirmation / Cancelled; refreshes from the platform on open), Integrations, Team, Billing and plans, Usage, Notifications. https://voksha.com/docs/calls/ , https://voksha.com/docs/booking/appointments/
- **Users:** added **per agent**, roles Owner / Manager / Member (Member: listen to calls, use playground; Manager: change agent, connect diary, cancel appointments, invite members; Owner: change plan, delete agent). No seat limit or seat price found. https://voksha.com/docs/account/team/
- **Multiple locations:** Starter/Premium run one agent per location, each on its own plan; "managed together under one account" is Enterprise. Agents share nothing except account, people and billing account. https://voksha.com/docs/agents/several-agents/

### 2.7 Integrations

- "79 integrations", Premium and Enterprise only. **Self-serve (6):** Google Calendar, Microsoft Outlook, Apple iCloud (app-specific password), Mindbody, Square Appointments, Booker. **Zoho CRM** (creates a lead per call via Zoho's MCP server) appears "when your plan includes it" or support turns it on. **The other 73** (Salesforce, HubSpot, Clio, Dentrix, ServiceTitan, Toast, Calendly, Acuity, Zapier, Slack, Teams, QuickBooks, ...) are "set up with Voksha support". API and webhooks: Enterprise. https://voksha.com/faq/what-integrations-does-voksha-support/ , https://voksha.com/docs/connectors/ , https://voksha.com/docs/connectors/directory/ , https://voksha.com/docs/connectors/zoho-crm/
- Every connector uses the customer's own credentials. https://voksha.com/docs/connectors/

### 2.8 Features by tier (vendor's lists)

From https://voksha.com/pricing/ and https://voksha.com/llms.txt:
- **Starter (all plans):** 24/7 answering, lead capture, call summaries, email & SMS alerts, Slack & Google Chat alerts (llms.txt), call-script following, message taking, phone scam protection, SOC 2 and ISO 27001, 1 local number, English.
- **Premium adds:** appointment booking, integrations (79; 6 self-serve), custom call flows and scripts, advanced analytics and reporting, after-hours emergency routing, priority email and chat support, audit trails (comparison table), toll-free number, 2 languages.
- **Enterprise adds:** voice cloning (consented voice, built by the onboarding team), texting callers, payments, appointment reminder calls (its only outbound calls), custom AI training, multiple agents per department, multi-location, HIPAA with BAA, GDPR and CCPA, 99.9% uptime SLA, API and webhooks, dedicated account manager, white-glove onboarding, 50+ languages. https://voksha.com/enterprise/ , https://voksha.com/voice-cloning/
- **Website widget:** a click-to-call button script (dials the agent's number), once the agent is Active and has a number; tier not stated. https://voksha.com/docs/agents/contact-widget/
- **Canadian privacy (all plans):** PIPEDA, Quebec Law 25, Canadian data storage on request. https://voksha.com/security/
- Simultaneous calls: "many calls at once", no extra charge. https://voksha.com/faq/can-voksha-handle-multiple-calls-simultaneously/

### 2.9 Contradictions in Voksha's own pages

1. **Usage alerts:** 75% and 90% (https://voksha.com/pricing/ , https://voksha.com/faq/what-happens-if-i-exceed-minutes/) vs. 75%, 90% and 100% (https://voksha.com/docs/getting-started/choose-a-plan/ , https://voksha.com/docs/account/billing/).
2. **Cancelling by phone:** "Your agent can cancel on some platforms but never reschedules by phone" (https://voksha.com/docs/booking/) vs. "your agent never cancels by phone on any connector" (https://voksha.com/docs/booking/appointments/); llms.txt: "reschedule and cancel requests go to your team".
3. **Slack/Google Chat on Starter:** llms.txt lists "Slack & Google Chat alerts" on Starter, while the integrations FAQ says "Starter has no integrations" and lists Slack among support-set-up integrations; the docs set Slack/Google Chat up as a webhook in agent Settings with no plan stated.
4. **Encryption in transit:** "TLS 1.2+" (llms.txt) vs. "TLS 1.3" (security page, HIPAA FAQ, Enterprise page).
5. **Roles:** "admin, manager, and viewer roles" (https://voksha.com/enterprise/) vs. Owner / Manager / Member (https://voksha.com/docs/account/team/).
6. **Retention controls:** security page offers configurable retention to everyone; HIPAA FAQ lists "Data retention controls" under Enterprise; privacy policy says recording retention is "configurable based on your plan"; no docs page shows a retention setting.
7. **What is not billed:** pricing/FAQ say screened spam and robocalls; billing docs list missed calls, network failures and test calls, and do not mention spam.
8. **Setup time:** "under 5 minutes" (marketing) vs. "about three minutes" for the wizard plus "Ten quiet minutes" to prepare (docs).
9. **Number type:** pricing says Premium gets a toll-free number; the number docs describe only picking an area code "so the number looks local".

### 2.10 Where the owner's page differs from the vendor

Owner's page: `.../tools/voksha.html`
- Owner: understands "plain English or Spanish, with support for more than 10 languages on select plans". Vendor: Starter English only; Premium 2 languages; Enterprise 50+. https://voksha.com/faq/what-languages-does-voksha-support/
- Owner: restaurants "on Enterprise, even confirm and process takeout orders". Vendor restaurant FAQ: takeout = "Points callers to your online ordering or takes their details" (every plan); Enterprise adds taking payments and texting callers; no takeout-order processing found. https://voksha.com/faq/how-does-voksha-work-for-restaurants/
- Owner: "multi-location operations ... deploy specialized AI agents ... all managed from a single dashboard" without a tier. Vendor: that is Enterprise; Starter/Premium are one agent per location, each on its own plan. https://voksha.com/docs/agents/several-agents/
- Owner: alerts at "75 percent and 90 percent". Docs say 75/90/100 (vendor itself inconsistent, see 2.9).
- Owner: "Changes take effect immediately" and pricing $14 / 15 calls / $1, Premium booking with Google/Outlook/iCloud, Dentrix, HIPAA/BAA on Enterprise: these match the vendor.
- Owner's JSON-LD links pricing to `voksha.com/virtual-receptionist/pricing/`; the vendor's pricing page is https://voksha.com/pricing/ .

---

## 3. Dapta (dapta.ai), its AI Voice Agent used as a receptionist

Dapta does not sell a product named "AI Receptionist". Its AI Voice Agent covers "Inbound reception — answer every call, at any hour, and book or route it" alongside outbound calling, WhatsApp, chat and other tools. https://docs.dapta.ai/ai-voice-agents/ai-voice-agents , https://dapta.ai/ai-voice-agent/ . A vendor blog post ranks Dapta as an AI receptionist. https://dapta.ai/blog-posts/best-ai-receptionist-small-business

### 3.1 Who it is for, sales model, pricing

- **Who:** "AI voice and text agents for SMB sales teams"; by team: sales, operations, marketing, HR, debt collections; by industry: education, SaaS, law, home services, real estate, insurance, automotive, coaching. "Used by 50,000+ companies" (vendor claim). https://dapta.ai/ . dCal (its calendar) is "built for small and mid-size teams in Latin America and the US". https://docs.dapta.ai/dcal/dcal
- **Self-serve and sales-led:** self-serve signup and "Book a demo"; assisted onboarding from Scale-Up up. https://dapta.ai/ , https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- **Pricing model:** **account subscription that buys credits** (1,000 credits = US$1), spent on call minutes, messages, phone numbers, Dapti answers and flow runs. Per workspace/user limits, not per seat price. https://docs.dapta.ai/my-account/how-credits-work-in-dapta

| Plan | Price | Credits / month | Users | Workspaces | Storage | Inbound calls at once | Onboarding / support |
|---|---|---|---|---|---|---|---|
| Free account | $0 | 7,000 once at signup | not found | not found | not found | 0 | n/a |
| Pro | $99/mo | 100,000 | 5 | 5 | 10 GB | 2 | self-service, one tech session; email and chat |
| Scale-Up | $499/mo | 500,000 | unlimited | 25 | 20 GB | 10 | fully assisted onboarding; priority chat, 4 tech sessions/month |
| Prime | $1,499/mo | 1,500,000 | unlimited | 70 | 50 GB | 15 | assisted onboarding and implementation; account manager, solutions engineer, WhatsApp/Slack group |
| Enterprise | talk to sales | consumption | unlimited | custom | custom | 15 | SLAs, on-premise option |

Sources: https://dapta.ai/pricing/ , https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing , https://docs.dapta.ai/ai-voice-agents/phone-numbers/concurrent-calls

- **Usage rates:** answered call 333 credits/min ($0.333), rounded up per started minute; voicemail 75; no answer/busy 45; failed 0; Test Number calls 0; browser web calls free on paid plans, 200/min on Free; AI text message 40; US number about 1,380 credits/month (carrier price x 1.2); non-US numbers via support (e.g. Canada 4,000, Mexico 13,000). "Pro covers about 300 minutes of conversation a month." https://docs.dapta.ai/my-account/how-credits-work-in-dapta , https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- **Overage:** none. "When your balance reaches 0, calls, messages and Dapti stop until credits are added." Extra credits in $1 steps; optional auto-recharge at 20,000 credits. Extra concurrent-call spots $10/month each (via support). https://docs.dapta.ai/my-account/how-credits-work-in-dapta , https://docs.dapta.ai/ai-voice-agents/phone-numbers/concurrent-calls
- **Annual:** 16.7% cheaper ("about two months free"). https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- **Free trial / card:** 7-day **Pro** trial, **card required at start**, auto-charged at the end of day 7; Scale-Up and Prime have no trial. Separately, every new account gets 7,000 free credits. https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- **Cancel:** self-serve; access until period end; credits expire; account drops to Free with agents, numbers and call history kept; deletion only via a support ticket (data deletion certificate on request). https://docs.dapta.ai/my-account/how-credits-work-in-dapta/cancel-your-subscription

### 3.2 Signup and setup flow (in order)

Quick Setup: "Four steps, about thirty minutes": create account, build first agent, connect tools, put it where customers are. https://docs.dapta.ai/quick-setup

1. **Create account:** first name, last name, email, then a one-time email code; or "Continue with Google". https://docs.dapta.ai/my-account/account/how-to-create-an-account-in-dapta
2. **Plan:** a Free account (7,000 credits) can build and test; the Pro 7-day trial needs a card. The docs mention "the plan picker that appears when you open the app" but no page I found places the plan step in the signup order. https://docs.dapta.ai/my-account/how-credits-work-in-dapta/cancel-your-subscription
3. **Voice Agents > New Agent:** "Create with Dapti" (chat) or "Create from scratch"; ready-made template cards "such as a receptionist or a lead qualification agent" skip the questions and go straight to a test call. https://docs.dapta.ai/ai-voice-agents/creating-a-voice-agent
4. **Agent Context:** Language, Agent Name (human-sounding, used to introduce itself), Purpose (Meeting Confirmation, Lead Qualification, Debt Collection, Customer Service & Support, Schedule Meetings, Send Reminders, Custom), Timezone (default US Pacific), Important Instructions.
5. **Company Context:** Company Name, Website URL > "Generate Context" (Dapta reads the site and writes the description), Company Description; reusable across agents. https://docs.dapta.ai/ai-voice-agents/creating-a-voice-agent/setting-up-company-context
6. **Test:** Dapta writes the prompt live (Preview or Markdown view); "Try your Agent" browser web call. Later tests: phone call to a verified Test Number (free), text chat, AI-played simulation; "Test as an inbound call" switch. https://docs.dapta.ai/ai-voice-agents/creating-a-voice-agent/test-agent
7. **Configure:** Settings (voice, voice model, speed, LLM model; speech settings; call behaviour; keypad input; Agent Actions such as transfer and booking; Brains); Call Analysis; Channels. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent
8. **Phone line:** buy a US number in Voice Agents > Phone Numbers (search by city, area code, digits) and assign it to the agent; other countries through Support; or connect your own SIP trunk / Twilio / PBX. https://docs.dapta.ai/ai-voice-agents/phone-numbers/buying-phone-numbers-through-dapta , https://docs.dapta.ai/ai-voice-agents/phone-numbers/connecting-your-sip-trunk
9. **Inbound activation:** the inbound page's "Validation and Activation Process" step 1 is "Send your request to support@daptatech.com or to the tech person supporting you". https://docs.dapta.ai/ai-voice-agents/phone-numbers/inbound-calls-and-how-to-activate-them (see contradictions).

- **Before vs after payment:** building and browser-testing work on a Free account (web calls cost 200 credits/min there); inbound answering needs a paid plan, since Free has 0 inbound concurrency. https://docs.dapta.ai/ai-voice-agents/phone-numbers/concurrent-calls
- **How business info is gathered:** website-generated company description, Brains (files, web pages via sitemap discovery, text), templates; assisted onboarding with "setup tasks" assigned by an implementation team on higher plans. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent/brains , https://docs.dapta.ai/llms.txt
- **Time to live:** "2-minute" setup (https://dapta.ai/), "under five minutes" (https://dapta.ai/ai-voice-agent/), "about thirty minutes" (https://docs.dapta.ai/quick-setup).

### 3.3 How the receptionist is configured

- **Prompt:** generated, editable, "Improve with AI", `{{variables}}`, version history. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent
- **Greeting:** Start behaviour: user speaks first, AI opens with a prompt-generated line, or AI opens with a predefined line. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent/voice-agent-settings-guide/conversation-behavior-start-conversation
- **Voice / language:** voice, voice model, speed, temperature, volume, emotional voices, pronunciation dictionary, boosted keywords. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent . Languages: "20 languages" (https://dapta.ai/ai-voice-agent/); "English and Spanish" (vendor blog, https://dapta.ai/blog-posts/best-ai-receptionist-small-business).
- **Knowledge (Brains):** files (PDF, DOC/DOCX, PPT/PPTX, TXT, MD, CSV, JSON; 50 MB each), web pages, text; up to 5 Brains per agent. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent/brains
- **Business hours:** only on transfers ("Restrict to business hours": days, start/end, timezone; outside hours the agent will not transfer). General after-hours handling: not found. https://docs.dapta.ai/ai-voice-agents/agent-actions/transfer-call
- **Transfers:** predefined number or dynamic (AI picks by instruction); cold, warm (debrief) or agentic warm (a screening agent talks to the destination first); IVR navigation; custom SIP headers. https://docs.dapta.ai/ai-voice-agents/agent-actions/transfer-call
- **Booking:** "Dapta Calendars Scheduling" action books one dCal meeting type (name + duration; default Mon-Fri 9-17); dCal connects Google Calendar and Outlook/Microsoft 365; replaces older Cal.com actions; "Additional instructions" add business rules, and the agent "only offers times it found in your calendar". https://docs.dapta.ai/ai-voice-agents/agent-actions/schedule-appointments-with-dapta-calendars , https://docs.dapta.ai/dcal/dcal
- **Message taking:** no named feature found; capture is via post-call variables (below).
- **Limits on promises:** booking rule above; otherwise via the prompt. Not found as a separate setting.
- **Do Not Call:** a voice agent can add a caller's number to the Do Not Call list "when someone asks on a call"; the list applies to outbound sequences. https://docs.dapta.ai/ai-voice-agents/how-to-create-your-first-campaign-in-dapta/do-not-call-list

### 3.4 Phone number

- New US number bought in-app, ~1,380 credits/month, usable for voice and SMS; non-US through Support. https://docs.dapta.ai/ai-voice-agents/phone-numbers/buying-phone-numbers-through-dapta
- Bring your own: SIP trunk, Twilio Elastic SIP Trunking, PBX, contact center. "Existing business phone numbers can be routed straight to AI agents through a SIP Trunk, with no migration." https://docs.dapta.ai/ai-voice-agents/phone-numbers/connecting-your-sip-trunk , https://dapta.ai/ai-voice-agent/
- Carrier call forwarding from an existing number: not found. Porting: not found.

### 3.5 After each call

- **Call Log:** every call with recording and transcript; auto-summaries; LLM quality scores. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent , https://dapta.ai/ai-voice-agent/
- **Post-call analysis:** a Call Objective scored on every call; extracted variables (text, selector, boolean, number). https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/post-call-analysis
- **Destinations:** Google Sheets row, HubSpot contact/deal/note, a Dapta flow, the Dapta CRM; post-call webhook with `recording_url`. https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/post-call-analysis-destinations , https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent/voice-agent-settings-guide/configure-call-public-call-link
- **Owner alerts:** **email only, and only when a post-call variable meets a condition you set** (required); one notification per agent; plus an optional daily "Scheduled email report". SMS or app alerts to the owner for voice calls: not found. https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/post-call-analysis-notifications
- **Public call link** switch: on = anyone with the link plays the recording and reads the transcript; off = sign-in required. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent/voice-agent-settings-guide/configure-call-public-call-link
- **Retention:** not found (call history stays after cancellation; deletion by support ticket). https://docs.dapta.ai/my-account/how-credits-work-in-dapta/cancel-your-subscription
- **Recording / AI disclosure to callers:** not found.

### 3.6 Dashboard / app

- Agent tabs: Context, Test Agent, Settings, Call Analysis, Call Log, Metrics, Channels. https://docs.dapta.ai/ai-voice-agents/how-to-set-up-your-ai-voice-agent
- Metrics: credits used, total calls, contacts called, connection rate, average duration, disconnection reasons (including "Concurrency Limit Reached", "Marked as Spam"), contact funnel. https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/voice-agent-metrics
- Also: CRM, pipelines, Inbox (text agents), Sequences, Flow Studio, Dapti assistant (charged per answer on Free/Pro). https://docs.dapta.ai/llms.txt , https://docs.dapta.ai/my-account/how-credits-work-in-dapta
- **Users / seats:** invite by email from Members; Pro 5 users, higher plans unlimited. https://docs.dapta.ai/my-account/account/add-team-members , https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- **Multiple locations:** workspaces (5 / 25 / 70); unlimited agents; numbers reassignable between agents. Location-specific feature: not found.

### 3.7 Integrations

- Voice call results: Google Sheets, HubSpot, Dapta flows (Flow Studio), Dapta CRM; CRMs named on the site: HubSpot, GoHighLevel, Salesforce. https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/post-call-analysis-destinations , https://dapta.ai/
- Calendars: dCal (Google, Outlook), Cal.com. https://docs.dapta.ai/dcal/dcal , https://dapta.ai/ai-voice-agent/
- Integrations page lists 42 apps (Slack, Stripe, Shopify, QuickBooks Online, Zoho CRM, Pipedrive, Notion, Airtable...); Zapier not mentioned. https://dapta.ai/integrations/
- MCP server (Claude, ChatGPT, Codex, Cursor) and API keys. https://docs.dapta.ai/llms.txt

### 3.8 Features (vendor's lists; Dapta does not tier features, only credits, users, workspaces, concurrency and support)

From https://dapta.ai/ , https://dapta.ai/ai-voice-agent/ , https://docs.dapta.ai/llms.txt :
- Voice Agents inbound and outbound; outbound Sequences (call lists) with Do Not Call list.
- Text Agents on WhatsApp, website widget, Facebook Messenger; SMS (A2P 10DLC registration charged in credits).
- WhatsApp voice calls; voice agent sends WhatsApp templates mid-call.
- Transfers (cold, warm, agentic warm), voicemail detection, end on silence, max duration, keypad input.
- AI Notetaker (meetings), dForms (forms), dCal (booking pages, MIT open source), Dapti assistant, Flow Studio automations, CRM and pipelines.
- Enterprise: enterprise-grade security, on-premise deployment, SLAs. https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing
- White-label: not found. HIPAA: not found. Spam blocking on inbound: not found. Voice cloning: not found.

### 3.9 Contradictions in Dapta's own pages

1. **Setup time:** "2-minute" (home) vs. "under five minutes" (AI Voice Agent page) vs. "about thirty minutes" (Quick Setup).
2. **Number of integrations:** "connects to 1,000+ tools" (vendor blog) vs. 42 apps listed on https://dapta.ai/integrations/ .
3. **Languages:** "20 languages" (https://dapta.ai/ai-voice-agent/) vs. "English and Spanish" (vendor blog).
4. **Booking:** "Checks Cal.com availability and books" (AI Voice Agent page) vs. docs: the dCal action "replaces the two Cal.com actions" and needs no Cal.com account.
5. **Inbound activation:** buying a number and assigning it makes "the assigned agent answer" (buying page) vs. "Send your request to support@daptatech.com" as step 1 of activation (inbound page).
6. **Support per plan:** pricing page "Advanced support" on Prime and "Self-service, email and chat" on Pro vs. docs "dedicated account manager, solutions engineer" on Prime and "Self-service, one tech session" on Pro.
7. **Concurrency:** blog says Dapta "handles several calls at once"; docs: Pro answers 2 inbound calls at once, Free 0.

### 3.10 Where the owner's page differs from the vendor

Owner's page: `geekatyourspot/src/app/(site)/tools/business-operations/ai-receptionist/dapta/page.tsx`
- Owner: "Handles unlimited parallel calls so no caller reaches a busy signal." Vendor: inbound limit 2 (Pro), 10 (Scale-Up), 15 (Prime/Enterprise), 0 (Free); extra spots $10/month; over the limit, new callers "are not answered". https://docs.dapta.ai/ai-voice-agents/phone-numbers/concurrent-calls
- Owner: "Call forwarding is set up so your existing business number routes to Dapta when your line is unanswered, busy, or outside business hours." Vendor docs describe a Dapta-bought number or a SIP trunk; carrier forwarding not found.
- Owner: "Summaries are sent to your team in real time." Vendor: owner email only when a set post-call condition is met (one per agent), plus Sheets/HubSpot/flow destinations and a daily report. https://docs.dapta.ai/ai-voice-agents/analyze-your-calls/post-call-analysis-notifications
- Owner: covers "Facebook Messenger and Instagram DMs". Vendor docs: Messenger yes; Instagram not found.
- Owner: "Dapta integrates with Google Calendar, Outlook". Vendor: through dCal (Google, Outlook) or Cal.com. Consistent in substance.
- Owner: the AI "answers calls in English and Spanish". Vendor claims 20 languages on one page, English and Spanish on another.

---

## Feature matrix

Cells: the tier the feature is on, "no", or "not found". LS = LobbyStack (Free / Starter $30 / Pro $100 / Enterprise), VK = Voksha (Starter $14 / Premium $99 / Enterprise $990+), DP = Dapta (Free / Pro $99 / Scale-Up $499 / Prime $1,499 / Enterprise). Sources are in the sections above.

| Feature | LobbyStack | Voksha | Dapta |
|---|---|---|---|
| Free plan | Free: 30 min, 14-day trial number | no | Free account: 7,000 credits once, 0 inbound calls |
| Free trial | 14 days, no card | no (7-day money-back guarantee; 2 free browser test calls per agent) | 7-day Pro trial, card required |
| Billing unit | voice minute | answered call | credits (333/min answered) |
| Entry price | Starter $30/mo ($24 annual) | Starter $14/mo | Pro $99/mo |
| Overage | Starter $0.20/min, Pro $0.18/min | $1/call, all plans | no overage; calls stop at 0 credits; buy credits / auto-recharge |
| Overage spending cap | Starter, Pro | not found | n/a (prepaid balance) |
| Annual discount | Starter, Pro (20%) | no | all paid plans (16.7%) |
| Priced per seat | no | no (per agent) | no (users capped: Pro 5, then unlimited) |
| 24/7 answering | Free (14 days only), Starter+ | all | paid plans (Free 0 inbound) |
| After-hours handling | Starter+ ("after-hours answering"), via rules | all (after-hours instructions); emergency routing Premium+ | transfer "restrict to business hours" (tier not stated); other not found |
| Included phone number | Starter, Pro (1); Free 14-day trial | Starter (1 local), Premium (1 toll-free), Enterprise (multiple) | no; bought at ~1,380 credits/mo |
| Extra numbers | Starter+ add-on at carrier cost ($1.15 US) | Enterprise (else one number per agent/plan) | any plan, ~1,380 credits/mo each |
| Forward existing number | all (guide for 51 carriers) | all | not found (SIP trunk instead) |
| Number porting | contact team | not found | not found |
| Bring own telephony / SIP | self-host (Twilio/Telnyx) | not found | yes, tier not stated |
| Ring staff first | Starter+ ("Staff answers first", Twilio numbers) | not found | not found |
| Live call transfer | all (Free 2 attempts; trial to verified mobile only) | Premium+ | yes, tier not stated (cold / warm / agentic warm) |
| Transfer to named employee | all | Premium+ (caller request) | dynamic transfer, tier not stated |
| Message / callback taking | all | all | not found as a feature (post-call variables) |
| Appointment booking | all (unlimited) | Premium+ | yes, tier not stated (dCal / Cal.com) |
| Calendars | Google, Cal.com, Calendly | Google, Outlook, iCloud, Mindbody, Square Appts, Booker (Premium+) | dCal (Google, Outlook), Cal.com |
| Services with duration/price | all | via booking platforms only | dCal meeting types |
| Staff/employee booking | all | via booking platforms only | dCal team events |
| Reschedule / cancel by phone | all, with caller verification (SMS code or keypad PIN) | no reschedule; cancel contradictory | not found |
| Booking confirmation to caller | text, Starter+ (verbal consent) | email if caller gives one (Premium+) | dCal emails |
| Appointment reminders | text 24 h ahead if caller agrees (tier not stated) | reminder calls, Enterprise | dCal emails 24 h and 1 h |
| Knowledge base | all (1 / 5 / 20 MB) | "some plans only" (not named); 1 MB per agent | Brains, tier not stated |
| Website import | all | yes (URL, sitemap, whole site, weekly re-check) | yes (sitemap discovery; website-generated company context) |
| Unanswered-questions list | all | not found | not found |
| Industry templates | no (white-label partner templates only) | all (industry step, industry call scripts) | templates (e.g. receptionist), purpose presets |
| Custom greeting | all | all | all |
| Voice choice | 22 voices, all | curated voices / 5 presets, all | voice + model settings, all |
| Voice cloning | no | Enterprise | not found |
| Languages | 70+ (15 default options), all | Starter 1, Premium 2, Enterprise 50+ | 20 (site) / EN+ES (blog), tier not stated |
| Structured data fields | caller details capture, all | up to 10 fields per agent | post-call variables |
| Call recording | all (kept 30 d Free, 90 d paid) | all (90 days default) | yes (retention not found) |
| Transcript | all | all (1 year) | yes |
| Call summary | all | all | yes |
| Email alert to owner | all (per call, default on) | all | conditional email (1 per agent) + daily report |
| SMS alert to owner | all (10 / 50 / 200 segments) | paid plans (all plans are paid) | not found |
| Slack / Google Chat alert | no (via webhooks) | Starter per llms.txt (contradicted) | not found for voice calls |
| Webhooks | all | Enterprise | post-call webhook / flows, tier not stated |
| Public API | yes (API keys) | Enterprise | API keys (MCP) |
| Zapier | via webhooks/API (pricing lists it on all plans) | set up by support, Premium+ | not found |
| Native CRM push | no | Zoho CRM (self-serve), others via support, Premium+ | HubSpot, Google Sheets, Dapta CRM |
| MCP server | yes | not found | yes |
| Spam filtering | all (spam not billed) | all (screened spam not billed) | not found |
| Block a caller | all | not found | Do Not Call list (outbound) |
| Short calls not billed | under 10 s | missed / failed calls | failed calls 0; no-answer 45 credits |
| Concurrent inbound calls | unlimited, all | "many at once", all | Free 0, Pro 2, Scale-Up 10, Prime/Ent 15; +$10/mo per spot |
| Multiple agents | Starter+ (unlimited); Free 1 | Enterprise (else one per plan) | all (unlimited) |
| Multiple locations | workspaces + agents per location (Starter+) | one agent+plan per location; managed together on Enterprise | workspaces 5 / 25 / 70 |
| Team roles | Owner, Admin, Viewer | Owner, Manager, Member (per agent) | members; Pro 5 users |
| Website chat | restricted, not in hosted plans (contradicted) | no (click-to-call button widget) | Text Agent widget |
| Instagram DMs | yes (tier not stated) | no | not found |
| WhatsApp | no | no | yes |
| AI replies to SMS | no (contradicted by rules page) | texting callers, Enterprise | SMS text agents (home page) |
| Outbound calling | no | Enterprise (appointment reminder calls only) | yes (Sequences) |
| Payments | no | Enterprise | not found |
| HIPAA / BAA | not found | Enterprise | not found |
| White-label / resell | partner tiers $0-$499/mo | not found | not found |
| Open source / self-host | MIT, all features | no | no (dCal and dForms MIT; on-prem Enterprise) |
| Analytics | all | advanced analytics Premium+; usage all | Metrics tab, all |
| AI help writing setup | setup prompts for Claude/ChatGPT, CLI | "Enhance with AI" | Dapti (charged per answer on Free/Pro), "Improve with AI" |
| Test call before live | all (counts against minutes) | 2 free browser calls per agent | web call (free on paid), Test Number, chat, simulation |
| Priority support | Pro | Premium | Scale-Up+ |
| Assisted onboarding | Enterprise | Enterprise (white-glove) | Scale-Up+ (Pro: one tech session) |
| Uptime SLA | not found | Enterprise 99.9% | Enterprise SLAs |

---

## Patterns across these products

1. **Three different billing units.** LobbyStack bills voice minutes (plus transfer legs and alert texts), Voksha bills answered calls ($1 flat whatever the length), Dapta sells prepaid credits that stop service at zero. None prices per seat; Voksha prices **per agent**, so a second location or line is a second plan.
2. **What isn't billed is spelled out.** LobbyStack skips calls under 10 seconds and spam; Voksha skips missed, failed and screened spam calls; Dapta charges 0 for failed calls but 45 credits for unanswered outbound calls. All three tell the owner before the bill: LobbyStack with a spending cap, Voksha with 75/90(/100)% emails, Dapta with a balance and auto-recharge.
3. **When the allowance runs out, the behaviour differs.** LobbyStack forwards callers to the owner's transfer number (so callers still reach a person); Voksha keeps answering and bills overage; Dapta stops answering.
4. **Trial vs. guarantee.** LobbyStack gives a real 14-day number with no card; Dapta a 7-day trial that needs a card and auto-charges; Voksha no trial but a 7-day money-back guarantee and two free browser test calls per agent.
5. **Setup is a short wizard that writes the agent from the business's website.** All three read the website (LobbyStack crawl into knowledge; Voksha fills services and hours; Dapta "Generate Context"), then let the owner talk to the agent in the browser before any real caller. Voksha's wizard asks the most pointed questions (industry, purpose, handoff, "what you do **not** do"). Only Voksha takes payment before the number exists; LobbyStack has the number answering before payment; Dapta needs a paid plan for any inbound call.
6. **The configuration surface is a plain-language prompt plus structured fields.** LobbyStack: ordered plain-text rules per channel, services with price types, employees, hours. Voksha: a Markdown system prompt with a Guardrails section, plus up to 10 "collected details". Dapta: a generated prompt plus actions and post-call variables. Each vendor's own docs warn that silence on a subject makes the AI guess, and each adds a hard rule against inventing (LobbyStack quotes only entered prices; Voksha "never claims an appointment that was not made"; Dapta only offers calendar times it found).
7. **Booking is guarded.** All three book only into real free time; Voksha and LobbyStack turn failed bookings into requests the team confirms; LobbyStack lets callers cancel or reschedule only after verification (SMS code or keypad PIN), and Voksha won't reschedule by phone at all.
8. **Recordings and transcripts are the default, and kept.** Every product records and transcribes every call: LobbyStack 30/90 days, Voksha recordings 90 days and transcripts 1 year, Dapta no stated limit. Two of them ship **no-login links** to recordings (Voksha's per-agent call link; Dapta's "Public call link" switch). None shows a zero-retention option on the pages read; recording-consent wording is absent in all three (Voksha lists "state-specific call recording disclosures" only under its Enterprise compliance block).
9. **AI disclosure is left to the owner.** LobbyStack recommends it in the greeting; Voksha offers three disclosure levels and answers honestly if asked; Dapta has no stated guidance. SMS consent, by contrast, is handled carefully (LobbyStack's verbal script and STOP handling; Voksha's double-checkbox opt-in for owner alerts).
10. **The owner is reached by email and text, not by an app.** LobbyStack and Voksha send a per-call email and optional SMS (both with consent flows); Voksha adds Slack/Google Chat; Dapta sends only conditional emails and a daily report. No mobile app was found for any of the three.
11. **Locations and lines are modelled as "agents".** LobbyStack: many agents per workspace sharing knowledge (paid); Voksha: one agent = one number = one plan = one diary; Dapta: unlimited agents across workspaces. Team access is role-based (LobbyStack Owner/Admin/Viewer; Voksha per-agent Owner/Manager/Member).
12. **Integrations are mostly calendars; CRM is thin or support-led.** LobbyStack has no native CRM (webhooks/API/MCP); Voksha self-serves six calendars and Zoho, and "sets up" 73 other listed tools with support; Dapta pushes to HubSpot/Sheets/its own CRM. Two of the three (LobbyStack, Dapta) expose MCP servers so an AI assistant can run the account.
13. **Marketing outruns the docs.** Each vendor's marketing claims conflict with its own docs in places (setup minutes, language counts, integration counts, alert thresholds, SMS replies, website chat). The geekatyourspot.com pages repeat some claims the vendors' docs do not support (LobbyStack Pro price, Voksha languages and takeout orders, Dapta unlimited parallel calls and call forwarding).
