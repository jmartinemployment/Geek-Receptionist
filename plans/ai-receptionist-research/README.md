# AI receptionist research: summary of the six files

This file combines six research files. Every fact here comes from one of them. Nothing was looked up again.
The files are named G1 to G6 below.

## 1. What this is

**Date and scope.** All six files were written on 2026-11-19 from vendor pages read that day. They cover how
AI phone receptionists (and, in G6, website AI chatbots) are sold, signed up for, set up and used. They were
gathered for Geek-Receptionist, a zero-data-retention AI phone receptionist for US small businesses.

**The six files.**

| Tag | File | What it covers |
|---|---|---|
| G1 | `group-1-standalone-a.md` | Standalone AI receptionists: Rosie, My AI Front Desk, Beside, Goodcall, Dialzara, Upfirst, Simple Phones, Smith.ai, Abby Connect. |
| G2 | `group-2-standalone-b.md` | Newer standalone products: Echowin, Phonely, Trillet (now Juney), Callin.io, Marlie, Newo, Allo, Lindy, Sophiie, plus five added: Reception.ai, SkipCalls, IONOS, Aira, Alivo. |
| G3 | `group-3-phone-systems.md` | Business phone systems that sell an AI receptionist: RingCentral, GoTo, Nextiva, Dialpad, Quo, Ooma, Aircall, JustCall, CloudTalk, Vonage, Zoom, 8x8, Grasshopper. |
| G4 | `group-4-industry.md` | Receptionists built into vertical software or built for one industry: Jobber, Housecall Pro, Sameday, Avoca, CallRail, Yelp, Podium, Slang, Loman, Numa. |
| G5 | `group-5-geekatyourspot-vendors.md` | The receptionists listed on geekatyourspot.com: LobbyStack, Voksha, Dapta. Also lists where geekatyourspot.com's pages differ from the vendors. |
| G6 | `group-6-ai-chatbots.md` | Website AI chatbots, for one launch feature (a website chat widget): Tidio (Lyro), BotPenguin, Manychat, Dapta's text agent, My AI Front Desk's chat widget. |

Each file has the same parts per product: who it is for and pricing, signup and setup flow, configuration,
phone number (or channels), after each call (or chat), dashboard, integrations, and features by tier. Each file
ends with a feature matrix and a "Patterns" section.

**Method (as the files state it).**
- Facts come from vendor pages: pricing pages, product pages, help centers, docs, and `llms.txt` files.
- "Not found" means the pages read did not say. Nothing was inferred.
- Facts from other sites are marked third-party. G1 also marks pages read from the Internet Archive ("archived").
- G2 read some pages with a fetch tool that summarises, and others verbatim with curl. G4's fetch tool also
  summarised, so its wording is close to the vendor's but not always exact.
- G3 marks facts seen only in a search result's summary ("search summary"). G4 marks CallRail facts seen only
  in a search extract ("[snippet]"). G6 marks "[excerpt]" (search extract of a vendor page) and "[community]"
  (Manychat's own forum).
- G5 and G6 read geekatyourspot.com's own pages for context only, not as a source of fact.

**Products dropped, and why (from the files' own notes).**
- G1 left out Ruby and AnswerConnect because neither sells an AI receptionist. Ruby's AI aids its human
  receptionists and its pricing lists only human plans. AnswerConnect's homepage says "Pledge People, Not Bots",
  and its /pricing URL returned 404.
- G2 considered Ringly.io and did not cover it (Shopify/e-commerce focus). G2 says Echowin and Callin.io sit at
  the edge of the "skip developer platforms" rule and were kept because they were assigned.
- G4 covers Yelp Receptionist only as history. It was discontinued in September 2026. G4's matrix uses Yelp Host
  (restaurants) instead.
- G1 and G3 do not repeat facts already in `plans/saas-plan.md` §1 (Rosie's, My AI Front Desk's and Beside's
  feature tables and prices; RingCentral's features and prices; GoTo's "Contact Sales" price and lack of a trial).
- G2's own note says the products closest to Geek-Receptionist's shape are Juney, Marlie, Reception.ai,
  SkipCalls, IONOS and Aira, plus Newo and Phonely at a higher price or complexity. That is G2's judgment.

**Main source limits.**
- G1: Rosie's signup is a JavaScript app, so its steps before payment could not be read. Rosie's overage answer
  is not in the page's markup. Dialzara's live help guide returned HTTP 525, so an archived copy (saved
  2025-03-27) was used. My AI Front Desk's Team Management page returned HTTP 410. Simple Phones' /pricing URL
  serves the homepage, and its help page names "OpenAI's GPT-3", which G1 says suggests the docs are old.
- G2: echowin.ai did not load. G2 lists thin coverage for Sophiie (no prices, no setup docs), Aira (marketing
  pages only), Alivo (no prices), Marlie (no screen-by-screen help center) and Phonely (onboarding screens
  undocumented). Lindy's pricing page showed different prices on two readings the same day.
- G3: RingCentral release notes for Sep–Nov 2026 returned 404. Ooma's press release was read on a syndicated
  copy. Several facts are search summaries only (Aircall's no-card trial, JustCall's summary emails, GoTo's
  language count, 8x8's terms). Vonage and 8x8 have very little public detail. A Grasshopper page reported to
  contain instructions aimed at AI assistants was not opened.
- G4: CallRail's support center returned 403, so its setup facts are search extracts. Avoca's pricing page
  returned 404. Sameday, Loman and Numa have no public help center. Podium has no public setup docs or prices.
- G6: manychat.com and help.manychat.com refused every direct fetch, so all Manychat facts are search extracts
  or forum posts. Some BotPenguin table rows could not be matched to plans.

## 2. Product index

54 rows. My AI Front Desk and Dapta each appear twice (G1 and G6; G5 and G6), so the rows cover 52 distinct
products. Values are copied from the files. "Not found" is kept where a file says it.

| # | Product | File | Kind | Self-serve or sales-led | Pricing unit | Entry price (as recorded) | Trial and card |
|---|---|---|---|---|---|---|---|
| 1 | Rosie | G1 | standalone | self-serve; white-glove onboarding only on Growth | per account, by minutes | Professional $49/mo, 250 min | 7-day free trial, first charge at trial end; card: not found |
| 2 | My AI Front Desk | G1 | standalone | self-serve; Partner/Enterprise custom | monthly allowances; overage in credits ($0.25/min) | Business-in-a-Box $99/mo ($79 annual), 200 min | 7 days, "No credit card required" (pricing page and help overview) |
| 3 | Beside | G1 | standalone (business phone app with the AI built in) | self-serve | web plans per business (Baseline 30 AI calls; Unlimited); in-app plans per seat | Baseline $29/mo, 30 AI calls | Baseline: "No trial. Billing starts immediately."; Unlimited: 7 days with a payment method. A help article says 30-day trial (contradiction) |
| 4 | Goodcall | G1 | standalone | self-serve; Enterprise sales-led | per unique customer a month | Starter $79/mo, 100 customers | no trial; free demo agent; pay when adding a number; card before that: not found |
| 5 | Dialzara | G1 | standalone | self-serve trial; 1:1 setup call with paid plans | per minute | Business Lite $29/mo, 60 min | 7 days; card not found on vendor pages (third-party: no card) |
| 6 | Upfirst | G1 | standalone | self-serve; free 30-min onboarding call | per call | Starter $24.95/mo ($20 annual), 30 calls | 14 days or 100 calls; no card |
| 7 | Simple Phones | G1 | standalone | self-serve start; later changes made by staff | per call | "$97/mo for 100 calls/mo" | 14 days; card: not found |
| 8 | Smith.ai | G1 | standalone | self-serve | per call | Free $0 for 25 calls, then $3/call | free plan, "Not a trial"; card required at signup |
| 9 | Abby Connect | G1 | standalone (one human + AI service) | self-serve signup, then a booked onboarding call | per Abby Minute (an AI minute is half) | Starter $164, 50 Abby Minutes | 14 days or 500 trial minutes; payment details at signup, charged at trial end |
| 10 | Echowin | G2 | standalone (self-serve agent builder) | self-serve; agency tiers | per minute + per number | pay as you go: $0 to start, $10/mo per number, $0.20/min; bundles from $45/mo (250 min) | free credits ($5 or $10; page contradicts); "No credit card required" (a third-party says a card is needed; unverified) |
| 11 | Phonely | G2 | standalone | self-serve Starter/Pro; Enterprise sales-led | per organization, included minutes + per-minute overage | Starter $50/mo ($33 annual), 200 or 250 min (page contradicts) | first 100 minutes free; card: not found |
| 12 | Juney (Trillet) | G2 | standalone (phone app) | self-serve in the app | per business, flat monthly with minutes | Starter $49/mo, 200 min | Starter: no trial; Pro: 7 days with 50 min, billed through App Store/Google Play |
| 13 | Callin.io | G2 | standalone (European white-label voice-agent platform) | self-serve | per minute, no subscription | $0.16/min | 30 free minutes; card: not found |
| 14 | Marlie | G2 | standalone | self-serve; optional team build from $250 | per business, tiered by minutes and capabilities | Basic $49/mo, 250 min | 14 days, card required ($0 due); also says "money-back guarantee" (contradiction) |
| 15 | Newo | G2 | standalone | sold direct and through partners | per agent per location, in "units" (about one conversation) | pay as you go $0/mo, 50 free units once, then $1.75/unit; AI Receptionist $299/mo | no payment method to start; card before the first billable unit |
| 16 | Allo | G2 | phone system add-on (per-seat phone system) | self-serve Business; Ultra via sales | per seat; receptionist add-on priced as one Business seat per agent | add-on $32/mo per agent (billed yearly); Solo seat $10/$15 | 3 days on Business; card required |
| 17 | Lindy | G2 | standalone (general "AI employee"; phone line is one feature) | self-serve | per active user + credits; calls from 25 credits/min; number fee separate | $49.99/user (5,000 credits) or $29.99/user (3,000 credits): two readings disagree | $50 in credits for 7 days; no card |
| 18 | Sophiie | G2 | industry (trade and service businesses) | sales-led (demo) | not found | not published | homepage "No credit card required"; what is free: not found |
| 19 | Reception.ai (ElevenLabs) | G2 | standalone | self-serve; US medical/dental sent to sales | per workspace credit pool (1 credit = 1 phone minute) | Basic $29/mo ($24 annual), 75 credits | 14 days, 30 credits, no card |
| 20 | SkipCalls | G2 | standalone (app-first) | self-serve | per account, flat monthly with a call allowance | Starter $29.99/mo, 200 calls (fair usage) | 7 days on monthly plans, card required; 30-day money-back |
| 21 | IONOS AI Receptionist | G2 | standalone (sold by web host IONOS as a reseller) | self-serve (add to cart) | per contract, per call | Flex $39/mo, 30 calls, then $0.49/call | 1 month free; card: not stated |
| 22 | Aira | G2 | standalone | self-serve plus consultation | per business, per call | Starter $24.95/mo ($19.96 annual), 30 calls | not found |
| 23 | Alivo | G2 | industry (home-services CRM) | sales-led (demo; 14-day onboarding) | not found | not found | not found |
| 24 | RingCentral AIR | G3 | phone system add-on (also standalone) | "Buy now" and "Contact sales" | per AIR licence with 100 minutes; $0.50/min over | Standalone $49 (or $39 + $30 RingEX) | 14 days; card: not found. Sales page offers "6 months free" (contradiction) |
| 25 | GoTo Connect AI Receptionist | G3 | phone system add-on | sales-led ("Contact Sales") | AI talk time; CX Complete includes 100 AIR credits | no prices | not found |
| 26 | Nextiva XBert | G3 | phone system add-on (also standalone) | self-serve tracks plus sales-led onboarding | per 100 interactions, then $1.50 per conversation (one page) | $99/mo | 14 days; card: not found |
| 27 | Dialpad AI Agents | G3 | phone system add-on (Resolve) | sales-led | credit pool; billed only when the AI does work | custom | not found |
| 28 | Quo (Sona) | G3 | phone system add-on | self-serve | Sona per workspace in credits (100 per call); phone seats per user | Sona: 10 calls/mo on every plan; tiers from $25 for 40 calls; phone from $19/user | 7 days; credit or debit card at signup |
| 29 | Ooma | G3 | phone system add-on | Answering Service priced; AI Receptionist "Contact Sales" | per account or per licence (pages contradict) | AI Answering Service $14.99, 40 min | not found |
| 30 | Aircall AI Voice Agent | G3 | phone system add-on (also standalone) | self-serve | per minute | 50 min/mo on core plans; $0.29/min pay as you go; standalone $99/mo minimum | 7 days, "no card needed" (search summary); 100 trial minutes once |
| 31 | JustCall AI Voice Agent | G3 | phone system add-on | add-on priced through Sales | per minute | first 100 min free; "Starting at $0.15/min"; $0.99/min overage | phone plans 14 days, no card; trial users must subscribe before buying the add-on |
| 32 | CloudTalk | G3 | phone system add-on | AI Receptionist self-serve; AI Specialist via sales | per minute | AI Receptionist €0 with 50 min, or $99/mo with 200 min (page contradicts) | 14 days with 50 AI minutes; card: not stated |
| 33 | Vonage | G3 | phone system add-on | sales-led managed service | not found | not published | not found |
| 34 | Zoom Virtual Agent Receptionist | G3 | phone system add-on (also standalone) | free trial and sales | per minute | standalone from $25/mo (billed annually) for 100 min | free trial; length and card: not found |
| 35 | 8x8 | G3 | phone system add-on | contact sales (third-party) | not found | not found | not found |
| 36 | Grasshopper (through SmithAI) | G3 | phone system add-on | sign-up described on the page; details not found | not found | "Starts at $95/month" | trial page linked; details not found |
| 37 | Jobber Receptionist | G4 | industry (field-service software add-on) | self-serve | per business add-on, by conversations | $29/mo, 30 conversations, $0.79 each over; unlimited on Plus | 14-day Grow trial, no card |
| 38 | Housecall Pro CSR AI | G4 | industry (field-service software add-on) | mixed (demo or trial; onboarding specialist) | add-on, price not published | not published | 14-day software trial, no card; whether CSR AI works in the trial: not found |
| 39 | Sameday AI | G4 | industry (home services) | sales-led | per business, minutes allowance, locations bundled | Launch $449/mo, 500 min | not found |
| 40 | Avoca | G4 | industry (home and field services) | sales-led | not published | not published (third-party estimates conflict) | not found |
| 41 | CallRail Voice Assist | G4 | industry file; call-tracking add-on, also sold standalone | self-serve | per business, call allowance, per-call overage | $95/mo, 50 calls, $1/call over (also $75 on its own site; $50 through Semrush) | 14 days, no card |
| 42 | Yelp Host (Yelp Receptionist discontinued) | G4 | industry (restaurants) | mixed (form leads to a demo; also online setup) | per business, tier by call volume | $249/mo ($199 with Guest Manager); Plus $399 unlimited | free up to 30 days; card: not found |
| 43 | Podium AI Employee | G4 | industry (add-on to Podium) | sales-led | add-on, not published | not published | not found |
| 44 | Slang.ai | G4 | industry (restaurants) | sales-led | per location per month | Core from $399/mo ($379 annual) | not found |
| 45 | Loman | G4 | industry (restaurants) | sales-led | pricing page: no prices; llms.txt: monthly with minutes | llms.txt: Starter about $199/mo, about 500 min | not found |
| 46 | Numa | G4 | industry (auto dealers) | sales-led | not published | not published | not found |
| 47 | LobbyStack | G5 | standalone (open source) | self-serve; Enterprise by email | per workspace: voice minutes, plus transfer attempts, alert SMS, storage | Free $0 (30 min); Starter $30/mo ($24 annual), 150 min | Free plan with a 14-day trial number; no card |
| 48 | Voksha | G5 | standalone | self-serve Starter/Premium; Enterprise via sales | per agent, per answered call | Starter $14/mo, 15 calls, $1/call over | no trial; 7-day money-back; 2 free browser test calls per agent; card needed before go-live |
| 49 | Dapta (voice agent) | G5 | standalone (AI voice agent platform) | self-serve and "Book a demo"; assisted onboarding from Scale-Up | credits (1,000 = $1); 333 credits per answered minute | Pro $99/mo, 100,000 credits | 7-day Pro trial, card required; free account 7,000 credits, 0 inbound calls |
| 50 | Tidio (Lyro) | G6 | chatbot | self-serve; top tiers sales-led | conversations per project (AI and human share one quota) | Free $0; Starter $33/mo ($390/yr) | 7 days, no card |
| 51 | BotPenguin | G6 | chatbot | self-serve; Emperor via sales | monthly messages, number of chatbots and team members | Baby free forever; Little from $29/mo | 7 days, no card (King features) |
| 52 | Manychat | G6 | chatbot (Instagram, Messenger, WhatsApp, TikTok, Telegram, SMS, Email) | self-serve | monthly Active Contacts | Free $0 (25 contacts); Essential $17/mo ($14 annual) | Pro 14 days; card: not found. All Manychat facts are excerpts or forum posts |
| 53 | Dapta (text agent) | G6 | chatbot | Pro self-serve; Scale-Up/Prime assisted; Enterprise via sales | credits; 40 credits ($0.04) per AI answer | Pro $99/mo | 7-day Pro trial, card required; 7,000 free credits |
| 54 | My AI Front Desk (chat widget) | G6 | chatbot (inside the receptionist plan) | self-serve | chatbot conversations (100/mo included; $0.05 each over) | Business-in-a-Box $99/mo ($79 annual) | 7 days; "No credit card required" on help pages; the pricing page does not say |

## 3. Feature matrix, all products

Rows are products. The phone products (G1 to G5) are split into eight tables by area. G6's chatbots have their
own table at the end of this section.

**How to read a cell.** Each cell copies the file's value.
- "not found": the file says the vendor pages read did not say it.
- "not recorded": the file did not record this item for this product. This is different from "not found".
- G1 values: "All" = every plan; "Tier?" = listed, plan not stated.
- G2 values: "all" = every plan; "listed" = named, no tier stated; "+" = that plan and above.
- G3 tier keys: RingCentral "both" = Standalone $49 and AIR+RingEX; GoTo "AIR" = the AI Receptionist plan or
  add-on; Nextiva "$99" = XBert AI; Dialpad "Resolve"; Quo "all" = Sona on every plan; Ooma "AS" = AI Answering
  Service, "AR" = AI Receptionist; Aircall "AIVA" = AI Voice Agent; JustCall "add-on"; CloudTalk "Rec" = AI
  Receptionist, "Spec" = AI Specialist; Vonage "managed"; Zoom "both" = standalone and Zoom Phone bundle; 8x8
  "listed"; Grasshopper "$95".
- G4 values: "Incl." = part of the single AI offer; "tier unpub." = listed, no tiers published; "Base" = Yelp
  Host's base price.
- "(P6)" and similar point to a numbered pattern in that file.
- A cell taken from a product section rather than a matrix row is still the file's own statement.

### 3a. Setup

| Product | Reads website or Google profile | Industry templates | Test call before live | AI off until owner publishes or forwards | Payment before or after setup |
|---|---|---|---|---|---|
| Rosie (G1) | All (website and Google profile) | none named | yes (call Rosie in step 2) | changes reach callers only after Publish; answering before setup ends: not found | not found (first charge at trial end) |
| My AI Front Desk (G1) | URL crawl, Tier? | not found (business type asked) | yes (Playground; needs voice credits) | not found | after (five signup steps, none is payment) |
| Beside (G1) | Tier? (scan; owner accepts each change) | none found (industry is a field) | yes (in-app "Test Receptionist") | answers once the Receptionist is on and forwarding is active | Baseline bills at once; payment step not in the guide |
| Goodcall (G1) | Tier? (website, price list or PDF) | not recorded | yes (browser call; AI-written practice callers) | yes: Publish is for test calls only; no real callers before a number is bought | after (pay when adding a number) |
| Dialzara (G1) | Tier? (website-to-knowledge import) | 88+ industries | yes (test-call training loop) | go live = forward the line | not found |
| Upfirst (G1) | All (one page at a time) | not recorded | yes (web calls free; texts and transfers off) | no: the number answers once picked | after (no card) |
| Simple Phones (G1) | crawl on request (website in signup form) | not found | chat test screen | no: answers at once with a default greeting | build first; card not found |
| Smith.ai (G1) | not found | caller types (law-firm oriented) | yes (simulated calls; preview call) | yes ("turn on live calls") | before (Pay, then build; card even on Free) |
| Abby Connect (G1) | not found | not found | yes (test call from another phone) | live once a test call is handled correctly | before (payment, then onboarding call) |
| Echowin (G2) | public demo only; knowledge from chosen pages | sample prompt; use-case "examples" | browser chat and voice test; real-number test not described | no number until the Deploy step | build and test free; pay for a number |
| Phonely (G2) | website pages (30/month on Starter) | use-case Templates | yes (Web Call / Web Chat) | Publish gate; a never-published flow falls back to its draft | not documented (importing a number needs a paid plan) |
| Juney (G2) | website (name, address, hours, services, prices) | no per-industry template; scenario examples | yes ("Demo call", 3 free) | live once forwarding is on, even with every content screen skipped | before (plan chosen at step 1, through the app store) |
| Callin.io (G2) | optional website (template path) | 16 industries, then use case | yes (real Test Call; browser test) | not found | not found |
| Marlie (G2) | website or Google Business listing | not recorded | yes (guided test call) | not recorded | before (card at step 1, $0 due) |
| Newo (G2) | website or Google Maps | Industry Playbooks; industry locked | yes (call the agent's own number) | no: a working "pre-production" agent exists before payment | after (activate the account after the test) |
| Allo (G2) | websites as knowledge | four pre-built jobs | yes (test call from the computer) | yes ("Go live"; "Unpublish") | before (card at signup) |
| Lindy (G2) | not found | not recorded | call it from your verified phone | not recorded | free credits, no card; a number needs a paid plan |
| Sophiie (G2) | not found | not recorded | not found (a demo call before sale) | rules approved in a staff-led onboarding | not recorded |
| Reception.ai (G2) | website, up to 15 pages | industry list; per-industry default procedures | yes (talk to it in the browser) | no: answers right after the wizard (US/Canada) | after (no payment step before live) |
| SkipCalls (G2) | website or Google Maps | templates (incoming/outgoing) | yes (browser call; call the number) | not recorded | before ("active free trial or plan" needed) |
| IONOS (G2) | website | sector and main goal asked | yes (browser test call, free) | no: "active since the initial setup" | before (contract first) |
| Aira (G2) | website | not recorded | browser-based test calls, all plans | not found | not found |
| Alivo (G2) | not recorded (20-minute onboarding form) | preset named agents | call the business line from another phone | yes: owner approves scripts before agents talk to anyone | not recorded |
| RingCentral (G3) | both (website, Google Business Profile) | not found (builds from an IVR) | both (chat, call) | yes: "Assign"; "Active" vs "Not in use" | not recorded |
| GoTo (G3) | crawl as knowledge only; no auto-fill | not found | test call only after the dial plan | yes: answers only once in a dial plan | sales-led |
| Nextiva (G3) | $99 (website, Google Maps) | role templates: Receptionist, Sales, Support | $99 (call or chat preview) | no: "Your business will now be online" | not recorded |
| Dialpad (G3) | no auto-fill; crawler for knowledge | skill templates only | Resolve (text test) | yes: routing option "To an AI agent" | sales-led |
| Quo (G3) | website import as knowledge | all (job templates) | all ("Test Sona") | yes: Publish call flow | before (card at signup) |
| Ooma (G3) | AR (point it at the website) | not found | not found | no: takes calls right after creation | not recorded |
| Aircall (G3) | AIVA (knowledge sources); no auto-fill | AIVA (3 use-case templates) | AIVA (call, chat, simulations) | yes: publish and connect a number | trial without a card (search summary) |
| JustCall (G3) | add-on (URLs refreshed every 24 h) | add-on (templates) | add-on (works without a number) | yes: cannot be enabled without a number | subscribe before buying the add-on |
| CloudTalk (G3) | not found | Rec ("AI Receptionist" template) | Rec (a real, billed call) | yes: "Active" does not mean answering until connected | not recorded |
| Vonage (G3) | not found | not found | not found | managed project | sales-led |
| Zoom (G3) | both (Knowledge Library URL) | both (wizard, templates) | test call on the assigned number | yes: Publish and assign a number | not recorded |
| 8x8 (G3) | not found | not found | not found | not found | sales-led |
| Grasshopper (G3) | not found (upload a call playbook) | not found | not found | not found | not recorded |
| Jobber (G4) | Jobber data; Jobber-website FAQs | not recorded | Incl. (Receptionist calls the owner) | on/off toggles per channel; no separate go-live step | after (add-on bought at the last step; no-card trial) |
| Housecall Pro (G4) | Housecall Pro data | not recorded | Incl. ("Test CSR AI") | ready once settings are done (product page: not required to start) | not found |
| Sameday (G4) | not recorded (set up on a call with the vendor) | not recorded | not found | not found | not found |
| Avoca (G4) | "Find FAQs on website"; ServiceTitan sync | not recorded | tier unpub. (registered test phones) | yes: checklist blocks "Mark Responder live" | not found |
| CallRail (G4) | website autofill plus past call transcripts | not recorded | Incl. ("Test Assistant") | yes: off until a Call Flow enables it | after (no-card trial) |
| Yelp Host (G4) | Yelp Page | not recorded | not found | not recorded | not found |
| Podium (G4) | not recorded (website training is a third-party claim only) | not recorded | tier unpub. (Test Bench) | yes: Test Bench runs and the business approves | not found |
| Slang (G4) | hours from Google Business Profile on every call | vendor's restaurant topic list | go-live checklist (test by phone) | launch step = forwarding, then tell the project manager | not found |
| Loman (G4) | POS menu import | not recorded | vendor team tests | not recorded | not recorded |
| Numa (G4) | DMS, scheduler and CRM | not recorded | not found | not recorded | not found |
| LobbyStack (G5) | all (website crawl) | no (white-label partner templates only) | all (counts against minutes) | no: the number answers once picked | after, when a trial is available |
| Voksha (G5) | yes (fills services and hours) | all (industry step, industry scripts) | 2 free browser calls per agent | yes: nothing answers until a plan and a number | before the number (wizard step 6) |
| Dapta (G5) | yes ("Generate Context") | templates; purpose presets | web call, Test Number, chat, simulation | pages disagree: assigning a number vs emailing support to activate | build free; inbound needs a paid plan |

Fed by:
- Reads website or Google profile: G1 "Train from website"; G3 "Auto-fills setup from website or Google
  listing" and "Learns from a website URL"; G5 "Website import". G2 and G4 have no such row; their cells come
  from each product's point 2 and from G2 pattern B and G4 P1.
- Industry templates: G3 "Templates"; G5 "Industry templates". Other cells from points 2–3. G1 P2 says
  per-industry templates appear only at Dialzara and in Smith.ai's caller types.
- Test call before live: G3 "Test before going live"; G4 "Test before going live"; G5 "Test call before live".
  Other cells from point 2, G1 P3 and G2 pattern B.
- AI off until owner publishes or forwards: no matrix row. From point 2 and G1 P4, G2 pattern D, G3 P3, G4 P3,
  G5 pattern 5.
- Payment before or after setup: no matrix row. From points 1–2 and G1 P1, G2 pattern F, G3 P7, G4 P2, G5
  pattern 5.

### 3b. Answering: when it answers

| Product | 24/7 | After-hours or overflow only | Owner's phone rings first | Spam blocking | Languages |
|---|---|---|---|---|---|
| Rosie (G1) | All | yes, with conditional call forwarding | carrier conditional forwarding | All | EN+ES, all |
| My AI Front Desk (G1) | Tier? | only "Time Control" found | carrier "forward when busy / unanswered" | Tier? | 20+, tier? |
| Beside (G1) | not found | not recorded | yes, by default (about 25 s ring) | not found | EN/ES/FR/PT, all |
| Goodcall (G1) | All | not found | "Ring my phone first" | spam not billed; blocking not found | English only |
| Dialzara (G1) | All | after-hours message fallback | not recorded | Tier? | 10, all |
| Upfirst (G1) | All | not recorded | forward missed calls only | All | 35+, all |
| Simple Phones (G1) | not found | time-of-day rules added by staff | forward missed calls or all calls | not found | 20, tier? |
| Smith.ai (G1) | All | not recorded | not recorded | All (spam not billed) | "Bilingual", tier? |
| Abby Connect (G1) | All | custom answering hours | not recorded | All ("call blocking") | EN+ES, all |
| Echowin (G2) | not recorded | "After Hours" use case listed | not found | not found | all ("70+" and "30+" on one page) |
| Phonely (G2) | not recorded | Time Filter block (no holidays) | not found | not found | all ("any language") |
| Juney (G2) | all ("while you have minutes") | "Juney after hours only" | all ("Ring me first", about 15 s) | all (owner switches it on) | no (English only); Enterprise on request |
| Callin.io (G2) | not recorded | not found (no hours setting) | not found | not found | all (8 listed) |
| Marlie (G2) | all | not recorded | not found (carrier forwarding) | all | EN + ES, tier not stated |
| Newo (G2) | not recorded | separate transfer numbers for non-working hours | not found (carrier forwarding) | all (spam under 30 s costs nothing) | all |
| Allo (G2) | add-on (24/7) | "Business hours only" option | add-on ("Only missed calls (suggested)") | basic filter all; AI screening in the $32 add-on | EN, FR, ES (add-on) |
| Lindy (G2) | not recorded | not found | not found | not found (manual blocked list only) | not found |
| Sophiie (G2) | not recorded | rules by time of day | not found in product (forward missed calls) | not found | not found |
| Reception.ai (G2) | not recorded | not recorded | all ("Who answers first", 10–60 s) | all (on by default) | all (70+) |
| SkipCalls (G2) | all | not recorded | yes, tier not stated (up to 4 phones) | all | all (English + Spanish) |
| IONOS (G2) | not recorded | not found | not found (carrier "forward when unanswered") | not found | all (list not found) |
| Aira (G2) | all | custom answering schedule | not found | all | all ("74+"; other pages "90+", "31") |
| Alivo (G2) | not recorded | immediate forwarding for after-hours lines | listed (call-flow builder) | not found (alert filter only) | not found |
| RingCentral (G3) | not recorded | custom schedules and coverage | both (overflow from queues) | yes, tier not found | both: 7 listed + Dutch |
| GoTo (G3) | not recorded | set in the dial plan | not found | not found | conflict (4+ vs 10+) |
| Nextiva (G3) | not recorded | always on or after hours only | not found | not found | not found |
| Dialpad (G3) | not recorded | open/closed-hours routing | not found | not found | English only |
| Quo (G3) | not recorded | Sona step after business hours | all (after "Ring users") | no (short calls free) | all: EN, ES, FR (beta) |
| Ooma (G3) | AR | AS: business hours, after hours or missed calls only | AS: missed calls only | not found | AR: "multiple" |
| Aircall (G3) | not recorded | set by place in the call flow | AIVA (overflow) | not found | AIVA: 38 |
| JustCall (G3) | not recorded | not recorded | not found | not found | add-on: 14 |
| CloudTalk (G3) | Rec | hours set in the Call Flow Designer | not found | Rec | Rec: 70+ |
| Vonage (G3) | not recorded | not found | not found | not found | not found |
| Zoom (G3) | both | Auto Receptionist hours (search summary) | not found | not found | both: EN, ES + 10 |
| 8x8 (G3) | listed | not recorded | not found | not found | listed (auto-detect) |
| Grasshopper (G3) | $95 | after-hours AI (blog) | not found | $95 | $95: EN, ES |
| Jobber (G4) | Incl. | Incl. (carrier forwarding) | carrier forwarding after set rings | Incl. (not billed) | not found |
| Housecall Pro (G4) | Incl. | not found | not recorded | not found | no (Spanish planned) |
| Sameday (G4) | Scale (Launch: after hours, weekends) | Launch | not recorded | not found | Launch: Spanish; Enterprise: multilingual |
| Avoca (G4) | tier unpub. | tier unpub. | Overflow mode (20–25 s ring) | not found | tier unpub. |
| CallRail (G4) | Incl. | Incl. | overflow mode (reseller page) | Incl. | not found |
| Yelp Host (G4) | Base | Base | not recorded | Base | Base |
| Podium (G4) | tier unpub. | not found | not recorded | not found | not found |
| Slang (G4) | Core | not found | not recorded | not found | Core: Spanish; Premium: 97 |
| Loman (G4) | Starter | not found | not recorded | not found | tier unpub. (55; llms.txt: Spanish) |
| Numa (G4) | tier unpub. | not found | not recorded | not found | not found |
| LobbyStack (G5) | Free (14 days only), Starter+ | Starter+ (via rules) | Starter+ ("Staff answers first") | all (spam not billed) | 70+, all |
| Voksha (G5) | all | all; emergency routing Premium+ | not found | all (screened spam not billed) | Starter 1, Premium 2, Enterprise 50+ |
| Dapta (G5) | paid plans (Free: 0 inbound) | transfers can be limited to hours; other not found | not found | not found | 20 (site) / EN+ES (blog) |

Fed by:
- 24/7: G1 "24/7 answering"; G4 "Calls answered 24/7"; G5 "24/7 answering". G2 and G3 cells from point 8.
- After-hours or overflow only: G4 "After-hours or overflow-only mode"; G5 "After-hours handling". Others from
  point 3.
- Owner's phone rings first: G2 "Owner's phone rings first (in product)"; G3 "Overflow from people or queues to
  the AI"; G5 "Ring staff first". Others from points 3–4 and G1 P4.
- Spam blocking: G1 "Spam blocking"; G2 "Spam blocking / screening"; G3 "Spam / robocall blocking"; G4 "Spam
  filtering"; G5 "Spam filtering".
- Languages: G1 "Languages"; G2 "Languages beyond English"; G3 "Languages"; G4 "Languages beyond English"; G5
  "Languages".

### 3c. Answering: what it does with a call

| Product | Live transfer | Warm transfer | Cold transfer | Message taking | FAQ / knowledge answers |
|---|---|---|---|---|---|
| Rosie (G1) | Scale and up | Scale and up | Scale and up | All (2 / 5 / unlimited scenarios) | custom FAQ (up to 20), all |
| My AI Front Desk (G1) | yes, up to 100 scenarios (pricing page: "2 of each") | "Hot", tier? | yes (uses the caller's number) | intake forms, tier? | knowledge base (20 pages on Business) |
| Beside (G1) | Tier? (one destination per rule) | Tier? | not recorded | Tier? | FAQ / Company Knowledge |
| Goodcall (G1) | yes (retries, up to 3 contacts) | not found | not recorded | Tier? | yes (business-info worker) |
| Dialzara (G1) | Elite and up (FAQ contradicts) | Elite and up | blind: Elite and up | All (lead qualification) | yes (FAQs, policies, prices) |
| Upfirst (G1) | All | All | yes | All | All (knowledge base) |
| Simple Phones (G1) | on request, set up by staff | not found | not recorded | base agent ("leave a message") | crawl on request |
| Smith.ai (G1) | yes | Tier? | not recorded | Free and up | FAQs |
| Abby Connect (G1) | yes (to Abby's humans or your team) | Tier? | not recorded | Tier? | FAQs |
| Echowin (G2) | all | yes (agent tools) | not recorded | via the Send Email tool | knowledge base (pages, PDFs, Q&A) |
| Phonely (G2) | all | yes | yes | starter flow (name, number, reason) | knowledge base |
| Juney (G2) | Pro+ | not recorded (announced transfer, Pro) | not recorded | all (default action) | FAQs said word for word |
| Callin.io (G2) | all | not recorded | not recorded | not recorded | knowledge base |
| Marlie (G2) | Standard (1 number); Pro+ departments; Premium rings in order | not recorded | not recorded | all (custom questions) | custom FAQs, all |
| Newo (G2) | all | not recorded | not recorded | not recorded | Active Knowledge Base |
| Allo (G2) | add-on | beta | not recorded | "Things to find out" | websites, files, extra context |
| Lindy (G2) | not found | not recorded | not recorded | yes (Messages) | "Answers from your info" |
| Sophiie (G2) | listed | yes | yes | not recorded | FAQs |
| Reception.ai (G2) | all; to another country Premium | announced transfer, Twilio numbers only | not recorded | default procedure | website, files, FAQ list |
| SkipCalls (G2) | all | yes (setup topic) | yes (setup topic) | Starter ("Call transfers & messages") | Knowledge Base |
| IONOS (G2) | 1 / 5 / unlimited forwardings | not recorded | not recorded | recommended at setup | website + company knowledge |
| Aira (G2) | all | all ("direct and warm") | not recorded | all (intake) | all (knowledge base) |
| Alivo (G2) | listed | yes (briefs the rep) | not recorded | not recorded | knowledge and FAQs |
| RingCentral (G3) | both (with context) | not recorded | not recorded | both (lead capture) | both |
| GoTo (G3) | AIR (30 topics) | not recorded | not recorded | AIR (capture forms emailed) | AIR (15 FAQ pairs) |
| Nextiva (G3) | $99 (with context) | not recorded | not recorded | $99 | $99 |
| Dialpad (G3) | Resolve (with context) | not recorded | not recorded | not found | Resolve |
| Quo (G3) | all (member, inbox, external) | not recorded | not recorded | all | all |
| Ooma (G3) | AR | not recorded | not recorded | AS, AR | AS, AR |
| Aircall (G3) | AIVA (with context) | yes (with context) | not recorded | AIVA (FAQ Deflector template) | AIVA |
| JustCall (G3) | add-on | yes | yes | not found | add-on |
| CloudTalk (G3) | Rec | not recorded | not recorded | Rec | Rec |
| Vonage (G3) | managed | not recorded | not recorded | not found | managed |
| Zoom (G3) | both (with context) | not recorded | not recorded | both | both |
| 8x8 (G3) | listed (with context) | not recorded | not recorded | not found | listed |
| Grasshopper (G3) | $95 | not recorded | not recorded | $95 (logs follow-ups) | $95 |
| Jobber (G4) | Incl. | not recorded | not recorded | Incl. (tasks) | Jobber data |
| Housecall Pro (G4) | Incl. | not recorded | not recorded | Incl. (notes) | Housecall Pro data |
| Sameday (G4) | tier unpub. | not recorded | not recorded | not found | not found |
| Avoca (G4) | tier unpub. | not recorded | not recorded | tier unpub. | Knowledge Base |
| CallRail (G4) | Incl. (only an existing transfer step) | not recorded | not recorded | Incl. (lead capture) | business profile |
| Yelp Host (G4) | Base | not recorded | not recorded | not found | FAQs, menu |
| Podium (G4) | tier unpub. | not recorded | not recorded | tier unpub. (Note Taker) | playbooks |
| Slang (G4) | plan not stated | not recorded | not recorded | not found | topic copy |
| Loman (G4) | Starter | not recorded | not recorded | tier unpub. | Starter (FAQ, menu) |
| Numa (G4) | tier unpub. | not recorded | not recorded | not found | not recorded |
| LobbyStack (G5) | all (Free: 2 attempts) | not recorded | not recorded | all | all (1 / 5 / 20 MB) |
| Voksha (G5) | Premium+ | not recorded | not recorded | all | "some plans only" |
| Dapta (G5) | yes, tier not stated | yes (also "agentic warm") | yes | not found as a feature | Brains, tier not stated |

Fed by:
- Live transfer: G2 "Live transfer to staff"; G3 "Transfer to people, queues or groups"; G4 "Live transfer to a
  person"; G5 "Live call transfer". G1 cells from point 3.
- Warm transfer: G1 "Warm transfer". Other cells only where a product section names "warm".
- Cold transfer: no matrix row. Cells only where a product section names "cold" or "blind".
- Message taking: G1 "Message taking / intake"; G3 "Message taking"; G4 "Message taking"; G5 "Message /
  callback taking". G2 cells from point 3.
- FAQ / knowledge answers: G3 "Answers FAQs from your content"; G5 "Knowledge base". Others from point 3.

### 3d. Booking

| Product | Calendar booking | Which calendars | Appointment rules | Booking link by text | Reschedule or cancel |
|---|---|---|---|---|---|
| Rosie (G1) | Scale and up | Google Calendar, Calendly, Acuity, Appointlet | default calendar only; 2–3 options; one appointment type | yes (Professional texts a link) | not yet ("Coming Soon") |
| My AI Front Desk (G1) | Google, tier? | Google Calendar | Services as types; hours per day; timezone | public booking link | not recorded |
| Beside (G1) | Tier? | Google, Outlook (apps); Google, Calendly, Housecall Pro, GoHighLevel, Follow Up Boss (agent.beside.com) | 30 min default; 4 h minimum notice; buffers on mobile | not recorded | not recorded |
| Goodcall (G1) | Google, tier? | Google Calendar | not recorded | not recorded | not recorded |
| Dialzara (G1) | All | Google, Outlook | round-robin; reminders by SMS or email | not recorded | yes, in the call |
| Upfirst (G1) | All | Google, Outlook, Calendly, Acuity, Clio, Square | appointment type | yes (links) | not recorded |
| Simple Phones (G1) | Tier? | not recorded | not recorded | not recorded | not recorded |
| Smith.ai (G1) | Calendly, tier? | Calendly | not recorded | not recorded | not recorded |
| Abby Connect (G1) | Tier? | "hundreds"; Google, Calendly, Acuity named | not recorded | not recorded | not recorded |
| Echowin (G2) | all | Google, Outlook, Wix Bookings, Square, Cal.com | duration, minimum lead time, booking window | link by SMS or email | not recorded |
| Phonely (G2) | listed, tier not stated | Google Calendar | duration; 7-day search; 3 slots offered | not recorded | not recorded |
| Juney (G2) | Pro+ | Google Calendar only | 15–240 min; only inside hours | all | Pro (moves, cancels) |
| Callin.io (G2) | all | Google Calendar, Cal.com | slot length, reminders, overlap, working hours | not recorded | not recorded |
| Marlie (G2) | Standard+ | Google, Outlook, Calendly, Housecall Pro, Jobber, Square, Shopify, HubSpot | types and lengths: not found | all (text links) | reschedule Standard+; cancel Pro+ |
| Newo (G2) | listed, tier not stated | Cal.com, Google | not recorded | not recorded | not recorded |
| Allo (G2) | add-on | Google, Cal.com, Calendly | booking hours, blocked dates, buffer, notice, how far out | not recorded | not recorded |
| Lindy (G2) | all (booking link) | Lindy booking link | "the slots you open" | yes | not recorded |
| Sophiie (G2) | listed | Google, Outlook, Apple, ServiceM8, simPRO, Housecall Pro, Fergus, Ascora | no double-booking of a team member | not recorded | not recorded |
| Reception.ai (G2) | all | Google, Calendly, Cal.com; own booking page | services, staff schedules, hours, closures, rules | booking page | default procedure |
| SkipCalls (G2) | all | Google and others | several appointment types and lengths | not recorded | not recorded |
| IONOS (G2) | Flex Pro+ | Cal.com, Calendly, Google, Microsoft 365 / Outlook | not recorded | not recorded | not recorded |
| Aira (G2) | all (pages differ: link vs calendar sync) | Google, Outlook, Calendly, Clio | not recorded | all (during calls) | not recorded |
| Alivo (G2) | listed | set up by Alivo | location-based, drive time | not recorded | not recorded |
| RingCentral (G3) | both | Google, Outlook, Calendly | not recorded | both | not recorded |
| GoTo (G3) | Xtime or athenaOne only (needs an industry, CX or integrations plan) | Xtime, AthenaOne | one integration per receptionist | AIR (static text) | not recorded |
| Nextiva (G3) | $99 | Google, Outlook | not recorded | not found | yes, tier not stated |
| Dialpad (G3) | Resolve (connectors) | Google, Outlook, Calendly, AthenaHealth | not recorded | not found | yes (marketing page) |
| Quo (G3) | no (link only) | none (booking link) | not recorded | all | no, not on a live call |
| Ooma (G3) | AR | Google, Microsoft (Ooma Online Booking Pages) | not recorded | AR | not recorded |
| Aircall (G3) | AIVA (Calendly action) | Calendly | not recorded | not found | not recorded |
| JustCall (G3) | add-on | Google, Outlook | custom booking rules | add-on | not recorded |
| CloudTalk (G3) | Rec | Google, Outlook, Calendly, Cal.com | not recorded | coming soon | Spec |
| Vonage (G3) | not found | not found | not recorded | not found | not recorded |
| Zoom (G3) | both (needs a Zoom Scheduler licence) | Zoom Scheduler, Google, Microsoft, Calendly | not recorded | both | not recorded |
| 8x8 (G3) | listed | Google, Outlook | not recorded | not found | not recorded |
| Grasshopper (G3) | $95 | not found | not recorded | not found | not recorded |
| Jobber (G4) | Incl. | Jobber Online Booking | Online Booking settings; else a request | not recorded | Incl. |
| Housecall Pro (G4) | Incl. | Housecall Pro calendar | price book, service area | not recorded | Incl. (by permission) |
| Sameday (G4) | Launch | field-service software (ServiceTitan and others) | technician skills, service area, drive time | not recorded | not found |
| Avoca (G4) | tier unpub. | ServiceTitan; Google Calendar | ZIP service areas, arrival windows, fees | not recorded | tier unpub. |
| CallRail (G4) | Incl. | Google, Calendly, Yardi, HubSpot, Jobber, Clio | not recorded | yes | Incl. |
| Yelp Host (G4) | Base | Yelp Reservations, Guest Manager, OpenTable | not recorded | SMS action links | Base |
| Podium (G4) | tier unpub. | not named | service-area check (default mode) | not recorded | not found |
| Slang (G4) | Core | OpenTable, Resy, SevenRooms, Tripleseat | maximum party size | Core | plan not stated |
| Loman (G4) | Premium | OpenTable, Resy, SevenRooms | not recorded | not recorded | not found |
| Numa (G4) | tier unpub. | Xtime, DealerFX, Tekion APC, Numa's own | real open slots; loaner or shuttle choice | not recorded | not found |
| LobbyStack (G5) | all (unlimited) | Google, Cal.com, Calendly | only inside opening hours; services and staff | not recorded | all, with caller verification |
| Voksha (G5) | Premium+ | Google, Outlook, iCloud, Mindbody, Square, Booker | slot length, buffer, notice, horizon | not recorded | no reschedule; cancelling contradictory |
| Dapta (G5) | yes, tier not stated | dCal (Google, Outlook), Cal.com | only offers times found in the calendar | not recorded | not found |

Fed by:
- Calendar booking: G1 "Direct calendar booking"; G2 "Calendar booking"; G3 "Direct calendar booking"; G4 "Books
  appointments, jobs or reservations"; G5 "Appointment booking".
- Which calendars: G5 "Calendars". Others from points 3 and 7.
- Appointment rules: no matrix row. From point 3.
- Booking link by text: G3 "Booking link by text". Others from points 3 and 8.
- Reschedule or cancel: G4 "Reschedule or cancel"; G5 "Reschedule / cancel by phone". Others from point 3.

### 3e. After the call: what the owner gets

| Product | Email | Text | Owner app or push | Summary | Transcript |
|---|---|---|---|---|---|
| Rosie (G1) | yes, all | yes, all | iOS and Android apps | All | All |
| My AI Front Desk (G1) | yes | SMS "may require a Pro subscription" | not found (native app) | yes (can be switched off) | yes (can be switched off) |
| Beside (G1) | not found | not found | iOS and Android apps; alerts not found | yes (plus a Daily Recap) | yes |
| Goodcall (G1) | yes (while the caller is on the line) | yes (while the caller is on the line) | not found | not found | All |
| Dialzara (G1) | yes, by default (archived guide) | yes, by default (archived guide) | not found (Slack and Teams alerts) | Tier? | Tier? |
| Upfirst (G1) | yes | yes | no (installable web app) | All | All |
| Simple Phones (G1) | yes (to the team) | yes (to the team) | not found | not recorded | yes (in the log) |
| Smith.ai (G1) | yes (email only) | no (email only) | not found | All | All |
| Abby Connect (G1) | yes | yes | AbbyGO app | Tier? | Tier? |
| Echowin (G2) | yes ("to your inbox") | not recorded | not found | all | all |
| Phonely (G2) | yes | yes | not found | all | all |
| Juney (G2) | yes | no ("Juney doesn't text you the note") | push (app-only product) | all | all (not in HIPAA mode) |
| Callin.io (G2) | yes (switch on) | not recorded | not found | all | all |
| Marlie (G2) | all | all | not found | all (2 / 4 / 8 / unlimited channels) | all |
| Newo (G2) | yes (session report) | yes (session report) | not found | all | not found |
| Allo (G2) | not recorded | not recorded | apps, all | all (in app) | Solo 30 days; Business+ unlimited |
| Lindy (G2) | not recorded | not recorded | not found (iMessage on Team) | in chat or Slack | not found |
| Sophiie (G2) | not recorded | not recorded | listed (mobile app) | listed | listed |
| Reception.ai (G2) | yes (on by default, up to 10 addresses) | yes (option) | not found | all | all |
| SkipCalls (G2) | yes | lead alerts by call or text | push; apps all | all | yes, tier not stated |
| IONOS (G2) | yes (plus optional daily email) | not found | not found | all | no (deleted once the summary is sent) |
| Aira (G2) | yes | yes | mobile app, all | all | all |
| Alivo (G2) | per person | per person | in-app feed; mobile app not found | listed | not found |
| RingCentral (G3) | lead emails | not recorded | not recorded | both (on transfer) | both |
| GoTo (G3) | per transfer; capture forms | not recorded | not recorded | AIR | not found |
| Nextiva (G3) | yes | yes | not recorded | $99 | $99 |
| Dialpad (G3) | not found | not found | not found | not found | Resolve |
| Quo (G3) | Sona-specific: not found | not recorded | not recorded | all (always in English) | all |
| Ooma (G3) | yes | yes | not recorded | AS; AR (by topic, urgency) | AS (AR not found) |
| Aircall (G3) | not recorded (usage alerts only) | not recorded | not recorded | AIVA (summary note, webhook) | AIVA |
| JustCall (G3) | yes (search summary) | not recorded | not recorded | add-on | add-on |
| CloudTalk (G3) | not found | not found | not found | not found | paid package only |
| Vonage (G3) | not found | not found | not found | not found | not found |
| Zoom (G3) | not found | not found | not found | not found | both |
| 8x8 (G3) | team notified (channel not stated) | not recorded | not recorded | listed | listed |
| Grasshopper (G3) | not recorded | not recorded | not recorded | $95 (morning summary) | $95 |
| Jobber (G4) | to task assignees (optional) | escalation text alert | push for tasks; mobile app | Incl. | Incl. |
| Housecall Pro (G4) | channel not specified | text for calls it could not book | not recorded | Incl. | not found |
| Sameday (G4) | not found | not found | iOS and Android apps | tier unpub. | tier unpub. |
| Avoca (G4) | yes (by priority and call reason) | on-call text alerts | not recorded | tier unpub. | tier unpub. |
| CallRail (G4) | yes | not recorded | not recorded | Incl. | Incl. |
| Yelp Host (G4) | not found | not found | Yelp Business Owner app (settings) | not found | Base |
| Podium (G4) | alerts: tier unpub. | alerts: tier unpub. | mobile app | tier unpub. | tier unpub. |
| Slang (G4) | Premium (topic alerts); weekly recap | Premium (topic alerts) | not recorded | plan not stated; Smart Inbox Premium | plan not stated; Smart Inbox Premium |
| Loman (G4) | not found | not found | not recorded | tier unpub. | tier unpub. |
| Numa (G4) | not found | not found | mobile app | tier unpub. | tier unpub. |
| LobbyStack (G5) | all (on by default) | all (10 / 50 / 200 segments) | no app found | all | all |
| Voksha (G5) | all | paid plans | not found | all | all (kept 1 year) |
| Dapta (G5) | only when a set condition is met; daily report | not found | not found | yes | yes |

Fed by:
- Email and Text: G4 "Owner alerts (email, SMS, push)"; G5 "Email alert to owner" and "SMS alert to owner".
  Others from point 5.
- Owner app or push: G1 "Native mobile app"; G2 "Owner mobile app". These rows record whether an app exists, so
  cells say "app" unless the file names push. Others from points 5–6.
- Summary: G1 "Transcript and summary"; G2 "Summary to owner after each call"; G3 "Summary or notice to
  owner/team"; G4 "Call summaries"; G5 "Call summary".
- Transcript: G1 "Transcript and summary"; G2 "Transcripts kept"; G3 "Transcripts"; G4 "Transcripts"; G5
  "Transcript".

### 3f. After the call: records, retention and disclosure

| Product | Call recording (default where stated) | Retention stated | No-recording or no-content option | Caller recording disclosure |
|---|---|---|---|---|
| Rosie (G1) | All; on by default (P6) | the subscriber decides; account data deleted 30 days after cancelling; CRM recordings play 30 days | none found (P6) | left to the subscriber; no setting found |
| My AI Front Desk (G1) | toggle, tier?; default not stated | last 200 logs (Business); custom on Partner | "Record Calls" on/off | not found |
| Beside (G1) | on by default | not found | a caller can ask not to be recorded: nothing is kept | "Recording Consent" toggle plays a message |
| Goodcall (G1) | All ("Every call") | 30 days / 90 days / unlimited by plan | none found (P6) | consent not found; callers told it is an AI |
| Dialzara (G1) | All ("saved automatically") | customer-set (30 / 90 / 365 days) | none found (P6) | inbound: not found |
| Upfirst (G1) | All; mandatory, cannot be disabled | not found; deletion by request | no (its "zero data retention" means its AI providers don't store data) | greeting should say "This call is being recorded" |
| Simple Phones (G1) | not found | not found | not found | not found |
| Smith.ai (G1) | All; on by default (P6) | 90 days | none found (P6) | not found |
| Abby Connect (G1) | All; on by default (P6) | not found | none found (P6) | not found |
| Echowin (G2) | all | "as long as necessary" | not recorded | no built-in disclosure found |
| Phonely (G2) | per-agent toggle, tier not stated | not found | recording toggle; HIPAA flag; PII redaction | editor reminds the owner to add one |
| Juney (G2) | all; off by default | while the account exists | HIPAA mode (Pro): no recording, transcript or summary | added to the greeting while recording is on |
| Callin.io (G2) | all; on by default | not found | can be switched off | greeting can be made uninterruptible for a disclaimer |
| Marlie (G2) | listed (its own pages contradict) | not found | "opt in or out" (contradicted) | how it is done: not found |
| Newo (G2) | not found | not found | HIPAA mode (redaction) | not found |
| Allo (G2) | all (always) | Solo 30 days; Business and Ultra unlimited | privacy mode through support: no audio, transcript and summary kept | owner adds a "Play announcement" step |
| Lindy (G2) | all (always) | not found | not recorded | not found |
| Sophiie (G2) | listed | not found | choice on transferred calls only | inbound: not found |
| Reception.ai (G2) | all; on by default | kept until deleted; auto-delete optional (Premium) | recordings off, or auto-delete at 0 days (Premium) | no default line found |
| SkipCalls (G2) | yes, tier not stated | not found; owner deletes | not recorded | "Ask for Recording Consent" setting |
| IONOS (G2) | no (never recorded) | summaries for the contract; transcripts deleted after the summary | no recording, by design | default greeting says it is an AI and points to the privacy policy |
| Aira (G2) | all | not found | not recorded | not found |
| Alivo (G2) | listed (recording settings) | not found | not recorded | not found |
| RingCentral (G3) | both; automatic recording option (P6) | not found | caller opt-out stops transcription | built-in caller opt-out |
| GoTo (G3) | not found | not found | not recorded | owner's responsibility; tip: sound clip before the AI |
| Nextiva (G3) | $99; recorded (P6) | not found | not recorded | not found (greeting should disclose AI) |
| Dialpad (G3) | not found | not found | not recorded | not found |
| Quo (G3) | all; "every Sona call" (P6) | not found | not recorded | recommended in the greeting |
| Ooma (G3) | AS (AR not found); recorded (P6) | not found | not recorded | not found |
| Aircall (G3) | AIVA; recorded (P6) | not found (usage reports kept 90 days) | not recorded | greeting should say it is an AI |
| JustCall (G3) | add-on | not found | not recorded | not found |
| CloudTalk (G3) | paid Conversation Intelligence package | not found | not recorded | not found |
| Vonage (G3) | not found | not found | not recorded | not found |
| Zoom (G3) | Zoom Phone bundle only | not found | not recorded | not found |
| 8x8 (G3) | not found | not found | not recorded | not found |
| Grasshopper (G3) | $95 | not found | not recorded | not found |
| Jobber (G4) | Incl. | not found | not recorded | encouraged, optional |
| Housecall Pro (G4) | not found | not found | not recorded | not recorded (its AI-disclosure pages contradict) |
| Sameday (G4) | tier unpub. | no period; export, deletion on request | not recorded | advises telling callers |
| Avoca (G4) | tier unpub. | not stated | not recorded | not covered (AI disclosure is a setting) |
| CallRail (G4) | Incl. (required) | not found | no (recording required) | optional greeting line |
| Yelp Host (G4) | not found (Yelp Receptionist recorded every call) | not stated | not recorded | topic listed, answer not shown |
| Podium (G4) | tier unpub. | no period | not recorded | announcement can be customised |
| Slang (G4) | always on | not stated; used to train Slang's AI | no (mandatory) | required sentence |
| Loman (G4) | tier unpub. | not found | not recorded | not found |
| Numa (G4) | tier unpub. | not found | not recorded | not found |
| LobbyStack (G5) | all | 30 days (Free); 90 days (paid) | none shown | not found |
| Voksha (G5) | all | recordings 90 days; transcripts 1 year | none shown | listed only under the Enterprise compliance block |
| Dapta (G5) | yes | not found | none shown | not found |

Fed by:
- Call recording: G1, G2, G3 and G5 "Call recording"; G4 "Call recordings". The default state comes from point 5
  and G1 P6, G2 pattern H, G3 P6.
- Retention, no-content option and disclosure: no matrix rows. From point 5 and G1 P6, G2 pattern H, G3 P6, G4
  P6, G5 pattern 8.

### 3g. Channels and extras

| Product | SMS during or after the call | Outbound calls | Website chat | CRM entry | Zapier / webhooks / API | Analytics | Multiple locations | White-label |
|---|---|---|---|---|---|---|---|---|
| Rosie (G1) | links all; in-call Scale+ | not found | All (free) | 19 CRMs, all | Zapier all; webhooks/API not found | not found | not found | not found |
| My AI Front Desk (G1) | 400/mo (Business) | 20/day (Business); custom (Partner) | 100 conversations (Business) | built-in CRM and named CRMs, tier? | Zapier all; webhooks tier?; API Partner | "Dashboards & Reporting", tier? | "multi-location routing" (vendor checklist) | exists; tier not found |
| Beside (G1) | missed-call text-back, tier? | not found | not found | booking connectors only | not found | daily recap | extra line $4.99/mo | not found |
| Goodcall (G1) | send-only, tier? | not found | not found | HighLevel, Sheets, tier? | Zapier tier?; API/MCP tools tier? | custom metrics, tier? | separate agent on its own plan | not found |
| Dialzara (G1) | SMS Agent $19 + $0.05/msg ("free with voice plan") | add-on $750–$1,500/mo | $39/mo; 100 free with a voice plan | All | Zapier and webhooks tier?; API Elite+ | Tier? | Elite and up | custom pricing |
| Upfirst (G1) | All (two-way) | not found | not found | Clio, tier? | All | All | $9.95/mo per agent | not found |
| Simple Phones (G1) | not found | Tier? | not found | custom work | Zapier through webhooks; webhooks tier? | not found | above Basic | not found |
| Smith.ai (G1) | SMS branding Pro+ | not found | not found | Clio from Free; Salesforce/HubSpot tier? | Zapier Free+; webhooks not found | Tier? | Enterprise | not found |
| Abby Connect (G1) | not found | not found | separate human service | Tier? | not found | Caller Insights, all | $85/mo each | not found |
| Echowin (G2) | add-on $0.02 per part | all | all ($0.03/chat) | all (built-in and sync) | all | all | not found | agency $149.99 or $499.99/mo |
| Phonely (G2) | all (quota per plan) | Pro+ | listed, tier not stated | Pro+; managed on Enterprise | API/webhooks Pro+; Zapier: section 7 lists it, matrix says not found | all | not found | not found |
| Juney (G2) | all (booking link, follow-up text) | not found (Trillet agency: yes) | not found | Enterprise | not found | not found | Enterprise | Enterprise (optional); Trillet Studio $99, Agency $299 |
| Callin.io (G2) | not found | all (campaigns) | not found | all | all | all | not found | all |
| Marlie (G2) | all; extra situation texts Standard+ | listed | listed | Standard+; custom CRM Premium | Zapier all; API not found | listed | Premium (arranged by staff) | not found |
| Newo (G2) | listed | AI Receptionist+ (support must enable) | all | all | API listed; Zapier not found | all; custom reporting Enterprise | table: all; FAQ: Enterprise (contradiction) | Enterprise |
| Allo (G2) | text-back all; outbound SMS Business+ | Ultra (AI SDR, beta) | not found | all (native sync) | Business+ | Business+ | not found | not found |
| Lindy (G2) | listed | not found | not found | all (integrations) | API all (MCP); Zapier not found | not found | not found | not found |
| Sophiie (G2) | listed | not found | listed | built-in CRM listed; sync not found | API listed; Zapier not found | not found | listed (multi-business) | not found |
| Reception.ai (G2) | all, but a US Reception.ai number cannot send SMS | not found | all (web widget) | listed | all | listed | 20 / 1 / 1 / 20 | not found |
| SkipCalls (G2) | all; AI text replies PRO+ | not found | PRO+ | PRO+ | API/webhooks PRO+; Zapier not found | not found | Business | listed (page not read) |
| IONOS (G2) | not found | Flex Pro (upsell box only) | separate product; call button on Unlimited | Unlimited (API) | API Unlimited; Zapier not found | not found | not found | not found |
| Aira (G2) | inbound all; outbound Pro+ | not found | not found | all (built-in) | Zapier all; API listed | not found | not found | not found |
| Alivo (G2) | listed | listed | listed (text-based widget) | listed | listed (through webhooks) | listed | listed | not found |
| RingCentral (G3) | both ("AI SMS agent" may cost extra) | not found | not found (WhatsApp coming soon) | both | not found | both | both | not recorded |
| GoTo (G3) | AIR (needs SMS registration) | not found | AIR (webchat listed) | not found | not found | AIR (portal reports plan-dependent) | not found | not recorded |
| Nextiva (G3) | $99 (10DLC) | not found | $99 (live chat) | $99 | $99 (Zapier, Make, webhooks) | $99 | $99 | not recorded |
| Dialpad (G3) | not found | Resolve (mentioned) | Resolve (web chat) | Resolve | not found | Resolve | not found | not recorded |
| Quo (G3) | all (10DLC) | not found | not found (SMS lead capture only) | all | all (webhooks beta) | all (call tags Scale only) | not found | not recorded |
| Ooma (G3) | AR | not found | not found | not found | not found | not found | not found | not recorded |
| Aircall (G3) | not found (separate Messaging Agent) | AIVA (+$0.015 per attempt) | not found | AIVA | AIVA (webhook) | all plans; Inbound dashboards Professional or Analytics+ | not found | not recorded |
| JustCall (G3) | add-on | add-on (consented leads only) | not found | add-on (70+) | add-on (custom API actions) | add-on | not found | not recorded |
| CloudTalk (G3) | coming soon | Spec | not found | not found | API, Zapier, Make (outbound triggers) | Spec | not found | not recorded |
| Vonage (G3) | not found | managed (campaigns) | not found | not found | not found | managed (insights) | not found | not recorded |
| Zoom (G3) | both | not found | not found | both | not found | both | per site | not recorded |
| 8x8 (G3) | listed (booking confirmations) | not found | not found | listed | not found | not found | not found | not recorded |
| Grasshopper (G3) | not found | $95 (asterisked) | not found | not found | not found | $95 (dashboard) | $95 (up to 20) | not recorded |
| Jobber (G4) | Incl. (hang-up text-back) | not found | Incl. (Jobber-built website) | Incl. (jobs, requests, tasks) | not found | Incl. | not found | not recorded |
| Housecall Pro (G4) | alpha | not found | yes, plan not stated | Incl. (jobs, estimates) | not found | Incl. | not found | not recorded |
| Sameday (G4) | tier unpub. | tier unpub. | not found | tier unpub. | Enterprise | tier unpub.; advanced Enterprise | Launch 3; Scale multiple | not recorded |
| Avoca (G4) | tier unpub. | tier unpub. | tier unpub. | tier unpub. | tier unpub. | tier unpub. | tier unpub. | not recorded |
| CallRail (G4) | Incl. | not found | not found | Incl. (CRM sync) | not found | Incl. | one company per location | not recorded |
| Yelp Host (G4) | Base (SMS links, pay link) | not found | not found | Base (into OpenTable) | not found | Base | not found | not recorded |
| Podium (G4) | tier unpub. | beta (phone and email) | tier unpub. | not found | not found | tier unpub. | tier unpub. | not recorded |
| Slang (G4) | Core | not found | not found | Core | Enterprise | Core; reporting Enterprise | priced per location | not recorded |
| Loman (G4) | Starter | not found | not found | Premium (POS orders) | Enterprise | Starter; premium analytics Premium | tier unpub. | not recorded |
| Numa (G4) | tier unpub. | not found | not found | tier unpub. (DMS) | not found | tier unpub. | tier unpub. | not recorded |
| LobbyStack (G5) | confirmation texts Starter+; reminders (tier not stated) | no | restricted (pages contradict) | no native CRM | webhooks and API all; Zapier through them | all | Starter+ (agents, workspaces) | partner tiers $0–$499/mo |
| Voksha (G5) | texting callers Enterprise | Enterprise (reminder calls only) | no (click-to-call button only) | Premium+ (Zoho self-serve; others by support) | Zapier by support Premium+; webhooks/API Enterprise | advanced Premium+; usage all | Enterprise (else one plan per location) | not found |
| Dapta (G5) | SMS text agents (home page) | yes (Sequences) | Text Agent widget | HubSpot, Google Sheets, Dapta CRM | post-call webhook, API keys; Zapier not found | Metrics tab, all | workspaces 5 / 25 / 70 | not found |

Fed by:
- SMS: G1 "Texts to callers"; G2 "SMS / texts to callers"; G3 "AI texts the caller"; G4 "Outbound SMS (links,
  confirmations, follow-ups)"; G5 "Booking confirmation to caller", "Appointment reminders", "AI replies to SMS".
- Outbound calls: G1, G2 and G3 "Outbound AI calls"; G4 "Outbound AI calls or campaigns"; G5 "Outbound calling".
- Website chat: G1, G2, G4 and G5 "Website chat"; G3 "Other channels (chat, WhatsApp, social)", used only where
  it names web chat or live chat.
- CRM entry: G1 "Native CRM entry"; G2 "Sync to an external CRM" and "Built-in CRM / client list"; G3 "CRM
  entry"; G4 "Creates a record in the business's system"; G5 "Native CRM push".
- Zapier / webhooks / API: G1 "Zapier" and "Webhooks / API"; G2 "Zapier" and "API / webhooks"; G3 "Zapier /
  webhooks / API"; G4 "API or webhooks"; G5 "Webhooks", "Public API", "Zapier".
- Analytics: G1, G2 and G3 "Call analytics"; G4 "Analytics dashboard"; G5 "Analytics".
- Multiple locations: G1 "More agents or locations"; G2 "Multi-location"; G3, G4 and G5 "Multiple locations".
- White-label: G1 "White-label / reseller"; G2 "White-label / resale"; G5 "White-label / resell". G3 and G4 have
  no such row, so their cells say "not recorded".

### 3h. Seats and agents

| Product | Team seats or users | How the receptionist's price relates to seats | Several agents or lines per account |
|---|---|---|---|
| Rosie (G1) | not found | per account, by minutes | not found |
| My AI Front Desk (G1) | 2 editors + unlimited viewers (Business) | seats are a plan limit | "Add More Receptionist" (price not found) |
| Beside (G1) | up to 20 (web plans); one per in-app plan | web plans per business; in-app plans per seat | one Receptionist per line; extra line $4.99/mo |
| Goodcall (G1) | 1 / 5 / 10 team members | per unique customer; seats capped by plan | a separate agent per location, each on its own plan |
| Dialzara (G1) | roles (owner, manager, agent, read-only); count not found | per minute | Elite and up |
| Upfirst (G1) | Owner / Member | team access "is NOT billed per seat" | $9.95/mo per agent |
| Simple Phones (G1) | not found | per call | above the Basic plan |
| Smith.ai (G1) | not found | per call | Enterprise (multi-location) |
| Abby Connect (G1) | team members, tier? | per Abby Minute | $85/mo per extra company or location |
| Echowin (G2) | team and user management, all | seats are not priced | unlimited agents |
| Phonely (G2) | roles; invites need a plan with more members | per organization | several agents per organization |
| Juney (G2) | one owner login; teammates on Enterprise | per business | not recorded |
| Callin.io (G2) | not found | per minute | several agents |
| Marlie (G2) | not found | per business | extra numbers on Premium, on request |
| Newo (G2) | roles: Owner, Technical Owner, Account Manager, Viewer | per agent per location | one agent per plan |
| Allo (G2) | per seat (Business+) | add-on priced as one Business seat per agent | one agent per line |
| Lindy (G2) | per seat (Team) | per active user, plus credits | not recorded |
| Sophiie (G2) | not found (owner and admin roles exist) | not found | multi-business setups |
| Reception.ai (G2) | 3 / 3 / 5 / 10 | per workspace, in credits | up to 10 receptionists |
| SkipCalls (G2) | team accounts PRO+ | per account | 1 / 3 / 10 agents |
| IONOS (G2) | not found | per contract, per call | several contracts, switchable |
| Aira (G2) | 1 / 5 / 20 / unlimited users | per business, per call | not recorded |
| Alivo (G2) | listed (settings per person) | not found | four preset agents |
| RingCentral (G3) | RingEX phone seats per user | per AIR licence, not per seat | both (unlimited) |
| GoTo (G3) | link to user seats: not found | AI talk time | several per account |
| Nextiva (G3) | every added user is an administrator; counts not found | bundle ties XBert to one Core licence | $99 (several) |
| Dialpad (G3) | agents attach to departments or main lines, not users | credit pool | Resolve |
| Quo (G3) | phone seats per user | Sona billed per workspace | all |
| Ooma (G3) | phone seats per user | per account or per licence (pages contradict) | AR |
| Aircall (G3) | phone licences, minimum 3 | standalone agent needs no Aircall seat | AIVA |
| JustCall (G3) | phone seats per user, minimum 2 | per minute, separate from seats | unlimited agents |
| CloudTalk (G3) | not found | per minute | Rec |
| Vonage (G3) | not found | not found | not found |
| Zoom (G3) | per-seat basis not stated | per minute (plus Zoom Phone in the bundle) | not found |
| 8x8 (G3) | not found | not found | not found |
| Grasshopper (G3) | not found | not found | not found |
| Jobber (G4) | only admins reach settings | per business add-on | not recorded |
| Housecall Pro (G4) | not found | add-on | not recorded |
| Sameday (G4) | Launch ("Add your whole team") | per business | not recorded |
| Avoca (G4) | tier unpub. (Admin, Member, Agent; contacts who never sign in) | not published | not recorded |
| CallRail (G4) | not found | per business | one company per location |
| Yelp Host (G4) | not found | per business | not recorded |
| Podium (G4) | tier unpub. (users get extensions) | add-on | not recorded |
| Slang (G4) | Enterprise (SSO, MFA); "Grant team access" step | per location | one per location |
| Loman (G4) | not found | not published | not recorded |
| Numa (G4) | not found | not published | not recorded |
| LobbyStack (G5) | Owner / Admin / Viewer; no seat limit or price found | not per seat | Starter+ unlimited; Free 1 |
| Voksha (G5) | per agent: Owner / Manager / Member | "Team size doesn't change the bill" | Enterprise; otherwise one plan per agent |
| Dapta (G5) | Pro 5 users; unlimited above | not per seat | unlimited agents |

Fed by:
- Team seats or users: G1 "Team seats"; G2 "Team seats / roles"; G4 "Team users and roles"; G5 "Team roles".
  G3 has no such row; its cells come from point 6 and G3 P1.
- Price vs seats: G5 "Priced per seat". Others from point 1 and G1 P5, G3 P1, G4 P4, G5 pattern 1.
- Several agents: G1 "More agents or locations"; G3 "Several AI agents per account"; G5 "Multiple agents". G2
  and G4 cells from points 6 and 8.

**Matrix rows not carried into 3a–3h** (they stay in their own files): G1 "Simultaneous calls", "Voice choice",
"Voicemail", "Caller memory", "Sequential (waterfall) transfer", "Human receptionist backup", "AI replies to
texts", "Train from documents", "Setup help", "Extra phone numbers", "Toll-free number", "HIPAA / BAA"; G2
"Email answering", "Multiple phone numbers", "Voice cloning", "HIPAA mode or BAA", "Payment links", "Remembers
repeat callers", "Review requests", "Concurrent calls"; G3 "Document upload", "Transfer by name", "Custom intake
/ lead questions", "Automatic language switching", "Human receptionist option", "Takes payments", "HIPAA"; G4
"Price basis", "Answers inbound texts", "Estimates or quotes", "Phone ordering and payment", "Lead qualification
or urgency", "Call scoring or QA coaching", "Voice choice", "Multiple inbound numbers", "Vendor's human agents as
backup", "Free trial"; G5 rows on billing, numbers, voices, MCP, payments, HIPAA, open source and support.

### 3i. Chatbots (G6)

All five get a full row. Manychat's facts come from search extracts and Manychat's forum, because its pages
refused direct fetches. That is a source caveat only.

| Product | Website widget on the client's site | Reads a website URL | Test or preview | Handoff to a person | Booking in the chat | Owner told per chat | Chat retention stated | Setting to not store chats | Other channels |
|---|---|---|---|---|---|---|---|---|---|
| Tidio (Lyro) | all plans | yes; weekly auto-sync on Plus/Premium | Playground (all) | all (online and offline behaviour) | Lyro Action (Calendly template) | email only when the agent is offline | not found | not found | Messenger, Instagram, WhatsApp; email (Lyro, Starter+); Voice add-on $16/mo (AI answering not stated); SMS not found |
| BotPenguin | Baby+ | Baby 200 pages, Little 1,000, King+ unlimited | Agent Preview / Test | Baby+ | Little+ | session summary email (setting); lead email Little+ | 30 days Baby, 90 days Little, lifetime King+ | not found | WhatsApp, Instagram, Facebook, Telegram (Baby+); MS Teams King; SMS Emperor or all plans (pages contradict); AI voice agents, voice minutes add-on |
| Manychat | no website widget install (Manychat staff: "doesn't support website widget feature"; one third-party, ASC, says it does, contradicting the others) | one page per link entry | Playground / Preview | Inbox handoff; human reply pauses automation 30 min (adjustable) | not found | "Notify Assignees" action | not found | not found | Instagram, Facebook Messenger, TikTok, Telegram on every plan (Free: up to 2 channels); WhatsApp, SMS, Email from Pro (up to 3 channels); AI Step on Messenger, Instagram, WhatsApp, TikTok, Telegram; AI replies to DMs and comments (Pro); TikTok not in the EU and UK |
| Dapta (text agent) | yes; tier not stated | yes (sitemap discovery) | Playground | "Transfer to a human" action | dCal action (books in the chat, no link) | no alert for website chats | not found | not found | WhatsApp, Facebook Messenger, SMS (A2P 10DLC); phone through Voice Agents; Instagram not found |
| My AI Front Desk (chat widget) | Business-in-a-Box (100 conversations/mo) | yes (3 URLs per entry) | receptionist Playground; chat preview not found | escalation rules (up to 10) | product page: Google Calendar, Calendly | email or SMS per chatbot conversation (3 recipients on Business) | "Last 200 logs" (Business); custom on Enterprise | not found | product page: Messenger, Instagram DMs, SMS; help pages: website only; WhatsApp not found |

Fed by G6 matrix rows: "Website chat widget on the client's site", "Reads a website URL", "Test/preview before
live", "Handoff to a person", "Booking inside the chat", "Owner notified per chat", "Stated chat retention
period", "Setting to not store chats", "Facebook Messenger", "Instagram", "WhatsApp", "SMS", "Email channel",
"Phone / voice". Manychat's widget, handoff, AI Step and channel-limit details come from its sections 2 and 3.

## 4. Receptionists that also sell a chatbot

One row for every product in G1 to G5. Values come only from the files. "not recorded" means the file says
nothing on that point for that product. My AI Front Desk and Dapta also have chatbot rows in G6; see
[3i. Chatbots (G6)](#3i-chatbots-g6) for their full chat detail.

| Product | Chatbot or website chat | Other text channels (SMS, Facebook, Instagram, WhatsApp) | Same knowledge or FAQ as the phone receptionist | Plan, or add-on and price | Chats stored, and for how long | File |
|---|---|---|---|---|---|---|
| Rosie | yes: Website Chat, free | SMS: Website Texting (AI replies to texts) add-on; texts to callers | not recorded | Website Chat free on all plans; Website Texting $50/mo with 25 conversations, then $1 each | not recorded | G1 |
| My AI Front Desk | yes: website chatbot ([detail in 3i](#3i-chatbots-g6)) | SMS (400/mo); product page: Messenger, Instagram DMs; WhatsApp not found | yes: "Answers questions using your AI receptionist's knowledge base" (G6) | Business-in-a-Box $99/mo, 100 chatbot conversations; $0.05 each over | "Last 200 logs" on Business; whether chats count in it: not stated (G6) | G1, G6 |
| Beside | not found | SMS: Text Receptionist (AI replies to texts), tier not given; missed-call text-back | not recorded | Text Receptionist: tier not given | not recorded | G1 |
| Goodcall | not found | SMS: send-only, cannot receive replies | not recorded | not recorded | not recorded | G1 |
| Dialzara | yes: AI Website Chatbot | SMS: AI SMS Agent | not recorded (the chatbot has "Topic guardrails") | chatbot $39/mo alone; with a voice plan 100 sessions/mo free, then $0.15 each; features page: "Included with every plan". SMS Agent $19/mo + $0.05 per AI message, also "Free with any inbound voice plan" | not recorded | G1 |
| Upfirst | not found | SMS: two-way texting, AI replies to texts, all plans | not recorded | not recorded | not recorded | G1 |
| Simple Phones | not found (only a chat test screen in the dashboard) | not found | not recorded | not recorded | not recorded | G1 |
| Smith.ai | not found for the AI plan | SMS branding Pro and up | not recorded | not recorded | not recorded | G1 |
| Abby Connect | Live Web Chat is a separate service (G1 matrix: separate human service) | not found | not recorded | separate service, own pricing | not recorded | G1 |
| Echowin | yes: website chat | the same agent also runs on WhatsApp, SMS and Slack | yes: "the same agent can moonlight on website chat, WhatsApp, SMS, and Slack" | every plan; $0.03 per chat; chat and SMS draw from the same bundle balance | "Conversation logs" listed (pricing); privacy policy: "as long as necessary" | G2 |
| Phonely | listed ("voice, chat, SMS"), tier not stated | SMS: "outbound AI SMS during and after calls", all plans (quota per plan) | not recorded | tier not stated | not recorded | G2 |
| Juney (Trillet) | not found | SMS: booking link and follow-up text to the caller | not recorded | not recorded | not recorded | G2 |
| Callin.io | not found (G2 lists a "Website widget" tab in the agent editor) | not found | not recorded | not recorded | not recorded | G2 |
| Marlie | listed: website lead answering ("24-7-website-chat"), plan not stated | SMS: text links to callers | not recorded | plan not stated | not recorded | G2 |
| Newo | yes: web chat and social messaging; "AI Chat Widget" | SMS AI Agent; social messaging; ManyChat/WhatsApp integration | not recorded (cross-channel memory on every plan) | every plan; a text session (up to 15 agent messages) costs 0.5 unit from the same balance | not recorded | G2 |
| Allo | not found | SMS: missed-call text-back all; outbound SMS Business+ | not recorded | not recorded | not recorded | G2 |
| Lindy | not found | texting confirmations and intake (listed); "Text Lindy anytime over iMessage" is for the owner | not recorded | not recorded | not recorded | G2 |
| Sophiie | listed: website chatbot | text messaging, email, website chat ("One AI. Four channels"); WhatsApp Business integration | not recorded ("One AI" across four channels) | not published | not recorded | G2 |
| Reception.ai | yes: web widget puts the receptionist on the business's site | SMS (a US Reception.ai number cannot send SMS without the owner's Twilio number) | yes: the widget is the receptionist itself | every plan; web widget or booking-page minute 0.5 credit; text message 0.1 credit each | not recorded | G2 |
| SkipCalls | yes: "Website chat & Email Receptionist" | SMS: AI text replies PRO+; email | not recorded | PRO ($49.99/mo) and up | messages inbox holds text, email and web chat; period not recorded | G2 |
| IONOS | separate product: AI Chat Assistant (price not on the page); Unlimited adds a website call button | not found | not recorded | separate product | not recorded | G2 |
| Aira | not found | SMS: inbound all; outbound Pro+; AI replies to customer messages | not recorded | not recorded | not recorded | G2 |
| Alivo | yes: chat widget that "starts a text conversation, not a live chat session" | texts (follow-up agent) | not recorded | not published | not recorded | G2 |
| RingCentral | not found | SMS: the AI texts the caller (both plans); each location can have its own SMS responses; WhatsApp coming soon | not recorded | "AI SMS agent": additional charges may apply | not recorded | G3 |
| GoTo | listed: "voice, SMS, WhatsApp, webchat, and social" | SMS, WhatsApp, social | not recorded | AI Receptionist plan or CX Complete (no prices) | not recorded | G3 |
| Nextiva | yes: live-chat widget (Advanced onboarding) | SMS (10DLC) | not recorded ("voice, SMS and chat on one platform") | $99 XBert tier | not recorded | G3 |
| Dialpad | yes: web chat is created automatically for the agent | not found | yes: it is a channel of the same agent | Resolve, custom pricing | conversation history; period not found | G3 |
| Quo | not found | SMS: "Lead capture over SMS" | not recorded | every plan; 50 credits per SMS conversation | not recorded | G3 |
| Ooma | not found | SMS to the caller (AI Receptionist) | not recorded | not recorded | not recorded | G3 |
| Aircall | not found for the voice agent | texts and WhatsApp through a separate AI Messaging Agent | not recorded | separate agent | not recorded | G3 |
| JustCall | not found | SMS during and after the call | not recorded | not recorded | not recorded | G3 |
| CloudTalk | not found | SMS booking links "coming soon" | not recorded | not recorded | not recorded | G3 |
| Vonage | not found | not found | not recorded | not recorded | not recorded | G3 |
| Zoom | not found | SMS reminders and links | not recorded | not recorded | not recorded | G3 |
| 8x8 | not found | SMS booking confirmations | not recorded | not recorded | not recorded | G3 |
| Grasshopper | not found | not found | not recorded | not recorded | not recorded | G3 |
| Jobber | yes: webchat on a Jobber-built website | SMS: answers inbound texts (Incl.); hang-up text-back | not recorded (it answers from Jobber data) | included in the Receptionist ($29/mo add-on, or Plus) | logs cover calls, SMS and webchat; period not found | G4 |
| Housecall Pro | yes: CSR AI Chat (chat bubble on the site) | SMS text answering, alpha (new customers only) | not recorded | plan or add-on status not stated (a third-party says included) | not recorded | G4 |
| Sameday | not found | sends texts (tier unpub.); answering inbound texts not found | not recorded | not recorded | not recorded | G4 |
| Avoca | yes: Web Chat (the AI answers calls, texts and chats), tier unpub. | SMS, tier unpub. | not recorded | not published | not recorded | G4 |
| CallRail | not found | answers inbound texts (Incl.) | not recorded | not recorded | not recorded | G4 |
| Yelp Host | not found | SMS action links | not recorded | not recorded | not recorded | G4 |
| Podium | listed: AI "Website Chat" on the pricing page (also AI "Text Marketing") | text, email and social in one inbox; answers inbound texts (tier unpub.) | not recorded | plan not stated; AI Employee is an unpriced add-on | not recorded | G4 |
| Slang | not found | "Direct Text"; text links | not recorded | not recorded | not recorded | G4 |
| Loman | not found | outbound SMS | not recorded | not recorded | not recorded | G4 |
| Numa | not found | texts in Smart Inbox | not recorded | not recorded | not recorded | G4 |
| LobbyStack | pages contradict: "isn't part of the hosted plans" vs Free has "website chat" | Instagram DMs (tier not stated); AI replies to SMS: no, staff reply (contradicted by the rules page); inbox holds website chat, Instagram and SMS | yes: unanswered questions from calls, chats and Instagram feed one knowledge base; rules are set per channel | white-label partner tiers include 50 / 1,000 / 5,000 / 10,000 chats | not recorded for chats; deleting a workspace erases chats | G5 |
| Voksha | no (click-to-call button only) | texting callers on Enterprise | not recorded | not recorded | not recorded | G5 |
| Dapta | yes: Text Agent widget ([detail in 3i](#3i-chatbots-g6)) | WhatsApp, Facebook Messenger, SMS (A2P 10DLC); Instagram not found | not stated; Company Context is "reusable across agents"; each agent has its own Brains | credits, 40 per AI answer; which plan includes it: not stated | chat history kept; period not found (the 90-day picker is a query limit, not deletion) | G5, G6 |

**Products that sell both a phone receptionist and a chat assistant, and how they package it.**
- **One plan with the receptionist:** Rosie (website chat free on every plan); My AI Front Desk (100 chatbot
  conversations in Business-in-a-Box); Echowin (every plan, paid per chat from the same balance); Newo (every
  plan, from the same unit balance); Reception.ai (web widget on every plan, from the same credits); SkipCalls
  (from the PRO tier); Jobber (inside the Receptionist add-on); Nextiva (live-chat widget in onboarding, $99
  tier); Dialpad (web chat is a channel of the same agent, Resolve); LobbyStack (its pages contradict; its
  white-label partner tiers count chats).
- **Add-on with its own price:** Dialzara (chatbot $39/mo alone, or 100 sessions free with a voice plan then
  $0.15 each; another page says it is included with every plan).
- **Separate product:** IONOS (AI Chat Assistant), Abby Connect (Live Web Chat), Aircall (AI Messaging Agent for
  texts and WhatsApp, not website chat).
- **Listed, packaging not stated:** Phonely, Marlie, Sophiie, Alivo, Avoca, Housecall Pro, Podium, GoTo, Dapta.


Fed by: G1 matrix "Website chat" and "AI replies to texts"; G2 matrix "Website chat" and "SMS / texts to callers";
G3 matrix "Other channels (chat, WhatsApp, social)" and "AI texts the caller"; G4 matrix "Website chat" and
"Answers inbound texts"; G5 matrix "Website chat", "Instagram DMs", "WhatsApp", "AI replies to SMS"; G6 sections
on My AI Front Desk and Dapta. G2 pattern I states the trend in its own words: "Website chat and email are being
folded into the receptionist" (Echowin, Newo, SkipCalls, Reception.ai, Sophiie, Alivo; IONOS sells its chat and
email assistants separately).

## 5. Patterns across all products

Built from the six files' Patterns sections and the per-product facts above. Each pattern names its products and
its source files. P1, P2 and so on are the numbered patterns in G1, G3 and G4; letters are G2's patterns.

### 5.1 Setup order and what is asked

- **Read the business, let the owner check, set the greeting, test, then connect the line.** This is the common
  order for standalone products. Products: Juney, Reception.ai, IONOS, SkipCalls, Newo, Allo, Aira, Marlie (G2 B);
  Rosie, Beside, Upfirst, Simple Phones, Dialzara, My AI Front Desk, Smith.ai (G1 P2); LobbyStack, Voksha, Dapta
  (G5 pattern 5).
- **Phone systems build the agent inside the phone system.** Facts, persona, knowledge, abilities, test, publish,
  then connect a number: RingCentral, GoTo, Quo, Aircall, JustCall, CloudTalk, Zoom, Dialpad (G3 P3).
- **Industry products split.** Jobber and CallRail put the test before payment, the number and enabling.
  Housecall Pro starts with forwarding (G4 P2).
- **Signup forms are short.** My AI Front Desk: email, business name and type, call-handling questions,
  receptionist name, a code (G1). Smith.ai: info, password, business, plan, pay (G1). Abby Connect: email, name,
  phone, company, industry (G1). Quo: email code, name, team or solo, mobile, number, plan, card, ID (G3). Tidio:
  email, password, website, a survey (G6).
- **The industry is asked or detected** at Reception.ai, Callin.io, Newo (locked once set), IONOS, SkipCalls,
  Allo (G2); Abby Connect, My AI Front Desk (G1); Voksha (G5); Tidio (G6).
- **Some ask what the AI must not do.** Voksha asks for purpose and handoff, "what you do not do", "the two
  questions everyone asks" and pronunciation (G5). Nextiva's blog asks for "topics the AI should avoid" (G3).
- **A checklist of what to collect on every call** appears at Allo, SkipCalls, Juney, Marlie, Phonely (G2 C);
  RingCentral, GoTo (G3); CallRail (G4); Voksha (G5); Smith.ai (G1).
- **Messages first, transfers later.** IONOS and Juney start with message taking. Transfers are a paid step at
  Juney (Pro) and Marlie (Standard and up) (G2 C). G2 C also names Aira; Aira's own section says all plans (see 6).
- **An AI or chat builder sets the agent up** at Goodcall (Gabi), Beside (Configurator), My AI Front Desk (Ask
  Frontdesk), Upfirst (through ChatGPT or Claude) (G1); IONOS (Setup Assistant), Juney, Marlie ("You approve each
  change"), Newo (Vibe Mode), Reception.ai, Phonely, Callin.io (Composer), Lindy (G2); Aircall (Ask Aircall, which
  never publishes by itself), JustCall (Build with AI) (G3); LobbyStack (prompt and CLI), Voksha (Enhance), Dapta
  (Dapti) (G5).
- **Sales-led products set up as a project:** Alivo (14 days) (G2); Vonage, 8x8, Dialpad (G3); Avoca, Slang,
  Sameday, Loman, Numa (2–3 weeks), Podium (G4).
- **Stated setup times:** RingCentral same day, Nextiva under an hour, Zoom 60 minutes, CloudTalk under 5 minutes
  (G3); My AI Front Desk 5 minutes (G1); Juney about 5 minutes (G2); Voksha wizard about 3 minutes (G5). Dialzara,
  Marlie, Dapta, Voksha and Slang each state more than one time (see 6).

### 5.2 Where the business's facts come from, and templates

- **The business's website** is read by Rosie, Beside, Upfirst, Simple Phones, Dialzara, My AI Front Desk,
  Goodcall (G1); Juney, Marlie, Newo, Reception.ai, SkipCalls, IONOS, Aira, Callin.io, Phonely, and Echowin's
  public demo (G2); RingCentral, Nextiva, Quo, GoTo (a one-time snapshot), Zoom, JustCall, Aircall, Dialpad (G3);
  CallRail, Avoca, Jobber (website FAQs) (G4); LobbyStack, Voksha, Dapta (G5); all five chatbots (G6).
- **A Google profile or Google Maps** feeds Rosie (G1); Marlie, Newo, SkipCalls (G2); RingCentral, Nextiva (G3);
  Slang, which reads hours from the Google Business Profile on every call (G4).
- **The vendor's own software** is the source at Jobber, Housecall Pro, Avoca (ServiceTitan), Numa (DMS), Loman
  (POS menu), Yelp Host (the Yelp page) (G4 P1); RingCentral (company settings and IVR), and the Zoom, GoTo and
  Dialpad directories (G3). CallRail also reads past call transcripts (G4).
- **Typed in or gathered on a call:** Voksha (G5); Alivo's onboarding form, Lindy's brief, Echowin's instructions
  (G2); Abby Connect's onboarding call, Smith.ai's four fields (G1); Sameday's and Loman's vendor teams, Slang's
  topic copy (G4).
- **Document upload** is offered by nearly all of G3 (5–10 MB); LobbyStack (10 MB), Dapta (50 MB each) (G5);
  Phonely (25 MiB), Allo (3 files, 5 MB), Juney (Enterprise only), Marlie (Pro and up) (G2); Rosie (Growth only)
  (G1).
- **A review step before scanned facts are used:** Beside ("Nothing is saved until you review and accept") (G1);
  Juney ("Check what she learned"), Newo (a "pre-production" agent), Reception.ai (asks only for what is missing)
  (G2); CallRail (review and save), Avoca (warns to review) (G4). Rosie's retrain overwrites scanned fields (G1).
- **Stated gaps in website reading:** Newo ("Some websites block automated reading … Expect some gaps"); Phonely
  does not re-read automatically (G2); GoTo takes a one-time snapshot (G3); Tidio's manual re-sync loses edits
  (G6).
- **Industry templates** exist at Dialzara (88+ industries), Smith.ai (caller types) (G1 P2: only these two in
  G1); Callin.io (16), Newo (Industry Playbooks), Reception.ai, IONOS (sector) (G2); Voksha (G5).
- **Use-case templates instead of industry templates:** G3 P4 says "Templates are per use case, not per
  industry" (Aircall, CloudTalk, Quo, JustCall, Dialpad, Nextiva). Allo, Phonely, SkipCalls, Echowin (G2); Dapta
  (G5); BotPenguin, Tidio (G6) also template by use case.
- **No templates:** Rosie, Beside, My AI Front Desk (G1); LobbyStack (G5); Juney gives scenario examples instead
  (G2).
- **The agent learns from what it could not answer:** Reception.ai's FAQ list (G2); LobbyStack's Unanswered
  Questions (G5); RingCentral's knowledge insights, Aircall's gap flagging (G3); Tidio's Suggestions,
  BotPenguin's Un-answered Questions (G6).

### 5.3 Payment before or after setup

- **Payment or a card first:** Smith.ai (card even on Free), Abby Connect, Beside Baseline (G1); Juney, Marlie
  ($0 due), SkipCalls, Allo ("Phone service is a regulated industry"), IONOS (G2); Quo (G3); Voksha (card before
  the number) (G5); Dapta (inbound needs a paid plan; the trial needs a card) (G5, G6).
- **Build first, no card to start:** My AI Front Desk, Upfirst, Goodcall (pay when adding a number), Simple
  Phones (G1); Reception.ai, Newo, Lindy, Echowin (G2); Aircall and JustCall trials (G3); Jobber, CallRail,
  Housecall Pro's trial (G4); LobbyStack (G5); Tidio, BotPenguin, Manychat (G6).
- **Not found:** Rosie (bills at the end of its trial; card not found), Dialzara (G1); Phonely, Aira, Callin.io
  (G2).
- Trials split into card-required and no-card (G1 P1; G2 F; G6 pattern 1).

### 5.4 Test call and go-live gate

- **A test before going live is near universal** (G1 P3; G2 B; G3 P3; G4 P3; G5; G6 pattern 3).
- **What a test costs.** Free: Upfirst (G1); IONOS (G2); Voksha (2 per agent), Dapta (Test Number) (G5); Tidio's
  Playground (G6). Metered or billed: Goodcall, My AI Front Desk (voice credits) (G1); Juney (after setup) (G2);
  Aircall, CloudTalk (a real, billed call) (G3); CallRail (unless in trial) (G4); LobbyStack (G5). Smith.ai limits
  test calls and they must be marked as tests (G1).
- **Safe testing:** Avoca tests only from registered phones, "never a real customer's information"; Podium's Test
  Bench needs the business's approval (G4).
- **A gate before real callers:** RingCentral, GoTo, Quo, Aircall, JustCall, CloudTalk, Zoom, Dialpad (G3);
  Allo, Phonely, Alivo (G2); Avoca (named approvers), Podium, CallRail (G4); Voksha (G5); Goodcall (G1); Tidio
  (cannot activate without knowledge) (G6).
- **Live at once, no gate:** Simple Phones, Upfirst (G1); Reception.ai, IONOS, Newo, Juney (G2); Ooma, Nextiva
  (G3); LobbyStack (G5).
- **Forwarding is checked:** Juney's silent test call and tick box (G2); LobbyStack detects the first forwarded
  call (G5); Avoca after a real call (G4). SkipCalls, Newo, Alivo (G2), Abby Connect and Upfirst (G1) tell the
  owner to call from another phone.
- **Staged rollout:** Voksha suggests after-hours first (G5); Echowin has a migration guide (G2); My AI Front
  Desk offers "100% of traffic or a subset" (G1); Slang holds an Initial Results Review at 2 weeks (G4).
- **Changes after launch:** Rosie needs Publish; Goodcall has rollback; Dialzara and Smith.ai apply at once (G1);
  Voksha's save publishes live (G5); Juney shows a confirm card for big changes (G2).

### 5.5 Phone number (new, forwarding, porting)

- **Forwarding to a vendor number is the default; porting is rare** (G1 P4; G2 E; G4 P5).
- **Porting offered:** Beside, Upfirst, Dialzara (2–4 weeks), Abby Connect (G1); Allo (free), Echowin, Callin.io
  (outside US/Canada) (G2); Quo (free), Nextiva (included), Grasshopper (G3); Sameday (G4). LobbyStack: contact the
  team (G5).
- **No porting:** Juney, Marlie, SkipCalls (G2).
- **Carrier forwarding codes shown in the product:** Juney, IONOS, Reception.ai, Newo (G2); LobbyStack (51
  carriers), Voksha (G5); My AI Front Desk (QR code), Rosie (G1).
- **The owner's phone rings first, set in the product:** Juney, Reception.ai, SkipCalls, Allo, Alivo (G2);
  LobbyStack (G5); Beside, Goodcall (G1); RingCentral, Quo, Aircall as overflow (G3); Avoca's Overflow mode (G4).
  Newo and Alivo recommend no-answer forwarding instead; Juney calls it "a poor fit" (G2).
- **Phone systems need their own numbers:** GoTo, Aircall, JustCall, CloudTalk, Dialpad (G3).
- **Stated hazards:** when Yelp shut its receptionist, owners had to remove the number; Housecall Pro's number
  "should not be used in any marketing"; Jobber, Housecall Pro and Slang warn about forwarding loops (G4).
  Cancelling Voksha does not stop forwarding (G5). Smith.ai (G1) and Slang (G4) need caller ID passed through.
- **Texting needs 10DLC registration:** Allo ($24), Trillet (handles it), Aira (after verification), Echowin
  ($0.02 per part) (G2); Quo, GoTo, Nextiva (G3); Avoca (G4); Dialzara (G1). A US Reception.ai number cannot send
  SMS without the owner's Twilio number (G2). LobbyStack sends from one shared toll-free number (G5). Goodcall can
  send but not receive (G1).

### 5.6 Pricing unit and how seats relate to the receptionist

- **Per minute:** Rosie, My AI Front Desk, Dialzara, Abby Connect (G1); Phonely, Marlie, Juney, Reception.ai,
  Echowin, Callin.io (G2); RingCentral, Aircall, Ooma, Zoom, JustCall, CloudTalk, GoTo (G3); Sameday, Loman (G4);
  LobbyStack (G5).
- **Per call:** Upfirst, Simple Phones, Smith.ai, Beside Baseline (G1); IONOS, Aira, SkipCalls (G2); Nextiva,
  Quo (G3); CallRail, Yelp Host (G4); Voksha (G5).
- **Other units:** Goodcall per unique caller (G1); Jobber per conversation (G4); Newo per unit (about one
  conversation) and per location (G2); Dialpad credits billed when the AI works (G3); Slang per location (G4);
  credits at Dapta (G5), Lindy, Reception.ai (G2), Quo (G3). Chatbots price by conversations (Tidio), messages
  (BotPenguin), Active Contacts (Manychat), or credits per answer (Dapta) (G6 pattern 5).
- **Flat or unlimited plans:** Beside Unlimited (G1); IONOS Unlimited (G2); Jobber on Plus, Yelp Host Plus (G4).
- **Not published:** Housecall Pro, Avoca, Podium, Numa (G4); Sophiie, Alivo (G2); GoTo, Vonage, 8x8 (G3).
- **Seats are a plan limit, not the price of the receptionist** (G1 P5; G3 P1; G4 P4; G5 pattern 1). Exceptions:
  Allo prices the add-on as one Business seat per agent; Lindy charges per active user (G2); Beside's in-app plans
  are per seat (G1).
- **Calls not billed:** spam at Juney, Newo, SkipCalls (G2); Jobber (G4); Upfirst, Goodcall, Smith.ai (up to
  10%) (G1); LobbyStack, Voksha (G5). Short calls: Quo and Aircall under 15 s (G3), Upfirst under 15 s (G1),
  LobbyStack under 10 s (G5), CallRail counts only calls over 15 s (G4), Newo bills short calls at 0.2 unit (G2).
  Transfers: Echowin at half rate, Phonely at $0.02/min (G2).
- **When the allowance runs out:** it stops at Juney, Reception.ai's trial, Newo (Limited, then Blocked, then
  Deleted), Lindy (pauses) (G2); Dapta (G5); BotPenguin (G6). It forwards at LobbyStack (to the transfer number,
  then the mobile, then busy) (G5). It keeps answering and bills at Voksha (G5). It falls back at Quo (off by
  default) and RingCentral (backup extension) (G3). Jobber lets the owner choose pay or pause (G4). Simple Phones
  releases numbers (G1). Tidio upgrades the plan at 95% (G6). Warnings: Rosie by email, My AI Front Desk at
  50/75/100% (G1); Echowin cap, SkipCalls spending limit (G2); Manychat at 70/90/100% plus a cap (G6).
- **Extra locations** are sold as extra agents, plans or lines (G1 P5; G3; G4; G5).

### 5.7 Limits on what the AI may say or promise

- G1 P8: "No vendor publishes a fixed list of things the AI must never promise." Beside will not state open or
  closed without hours and will not claim to be a person; Rosie never invents a number; Goodcall can be told to
  stop quoting prices; Upfirst and Dialzara have similar settings.
- G2 G: prices only from the entered list (Juney, Newo, Marlie, Lindy); never-do lists (Phonely, Allo,
  Reception.ai's Strict rules up to 50, SkipCalls); an unknown answer becomes a message (Juney, Lindy, Trillet,
  Reception.ai).
- G3 P5: Dialpad's "no-guess zones"; Zoom, CloudTalk, Nextiva and GoTo have written rules.
- G4 P7: Avoca's Fee, Price Objection and Arrival Timing rules; Housecall Pro's price book; Podium's Note Taker;
  Jobber's "ask first"; a hard service-area rule at Avoca, Housecall Pro and Podium.
- G5 patterns 6–7: LobbyStack quotes only entered prices and verifies callers before changes; Voksha never claims
  an appointment it did not make and will not reschedule; Dapta offers only times found in the calendar.
- G6: Tidio answers from its data only; Manychat has Guardrails, but the AI "can still occasionally answer
  outside guardrails"; BotPenguin has no guardrail setting.
- **Approval before acting:** Lindy ("Checks with you first") (G2); Sameday ("Needs your approval"), Jobber (G4).

### 5.8 After the call, retention, recording by default, and caller disclosure

- **Email is near universal.** Other channels: text (most); push at Juney, SkipCalls (G2) and Jobber (G4); owner
  apps at Abby Connect, Rosie, Beside (G1); Slack or Teams at Dialzara (G1), Voksha (G5), Avoca (G4).
- **Daily or weekly recaps:** Beside, Dialzara, Smith.ai (G1); Juney, SkipCalls, IONOS (G2); Slang weekly (G4);
  Dapta (G5); Grasshopper's morning summary (G3).
- **Filtered alerts:** Avoca, Slang, CallRail, Jobber (G4); Upfirst, My AI Front Desk, Smith.ai (G1); Juney,
  Reception.ai (G2). Dapta emails only when a set condition is met (G5). Voksha and Dapta send no-login links
  (G5).
- **Recording is on by default almost everywhere** (G1 P6; G2 H; G3 P6; G4 P6; G5 pattern 8). Exceptions: Juney
  (off by default) and IONOS (never) (G2). Recording is mandatory at Upfirst (G1), CallRail and Slang (G4).
- **Retention is rarely stated.** Stated periods: Goodcall 30/90 days/unlimited, Dialzara 30/90/365 set by the
  customer, Smith.ai 90 days, My AI Front Desk last 200 logs (G1); Allo Solo 30 days (G2); LobbyStack 30/90 days,
  Voksha recordings 90 days and transcripts 1 year (G5); BotPenguin chats 30/90 days/lifetime (G6). G3 found no
  retention period for any product.
- **Use for training:** Rosie uses deidentified data (G1); Echowin's third-party models may train on data; Lindy
  never trains; IONOS does not use data for training (G2); Slang trains its AI; Sameday does not use one client's
  data for others (G4).
- **Recording disclosure is mostly left to the owner.** Built in: Beside's Recording Consent toggle (G1);
  RingCentral's caller opt-out (G3); SkipCalls' consent setting, Juney's automatic line, IONOS's default greeting
  (G2); Slang's required sentence (G4). Recommended only: Upfirst (G1); Quo, GoTo (G3); Jobber, Sameday (G4);
  Phonely, Allo (G2).
- **AI disclosure:** Goodcall, Beside (G1); IONOS, Juney (G2); Nextiva, Aircall, Quo (G3); Avoca (setting),
  Housecall Pro (pages contradict) (G4); Voksha (3 levels), LobbyStack (recommended) (G5).
- **Consent for texts to callers:** Juney, Reception.ai (G2); GoTo (G3); LobbyStack (verbal script), Voksha
  (double checkbox) (G5).

### 5.9 Zero-retention or no-content options

Every product with any such option, as the files record it:
- **IONOS:** never records; transcripts deleted once the summary is made; summaries kept for the contract;
  processed in the EU; not used for training (G2).
- **Juney:** recording off by default; HIPAA mode (Pro) keeps no recording, transcript or summary, "just who
  called and when". Trillet's agency product has a HIPAA mode too (G2).
- **Reception.ai:** recordings can be switched off; auto-delete at 0 days ("Deleted soon after the call ends");
  Premium only (G2).
- **Allo:** privacy mode through support: no audio; transcript and summary kept (G2).
- **Newo:** HIPAA redaction mode (G2).
- **Phonely:** recording toggle, HIPAA flag, PII redaction (G2).
- **Callin.io:** recording can be switched off (G2).
- **Marlie:** "opt in or out" of recording, contradicted by its own pages (G2).
- **Sophiie:** a choice to record transferred calls only (G2).
- **SkipCalls:** a recording-consent setting (G2).
- **My AI Front Desk:** "Record Calls" toggle; custom retention on Partner/Enterprise (G1).
- **Beside:** a caller who refuses recording leaves nothing kept (G1).
- **RingCentral:** a caller opt-out stops transcription (G3).
- **Upfirst:** its "zero data retention" claim means its AI providers do not store data; recording is mandatory
  (G1).
- **The files' own summaries:** G1 P6 "None offers a no-recording, no-transcript default"; G4 "No product offers
  zero data retention"; G5 "None shows a zero-retention option"; G6 found no setting to not store chats for any
  of the five chatbots; G3 found no retention period for any product. CloudTalk's recordings need a paid package
  and Zoom's recording is bundle-only (G3).

### 5.10 How features are tiered

- **Entry plans carry the core:** message taking, spam handling and the post-call note (G2 I).
- **First upsells:** booking and live transfer at Juney, Marlie, IONOS, Allo (G2); Rosie, Dialzara (G1); Voksha
  (G5). Booking and integrations at Loman, Sameday, Slang (G4). Languages and voices at Slang, Sameday, Loman (G4)
  and Voksha (G5). Alerts, inbox and QA in the middle tier at Slang (G4). API, SSO, custom integrations and
  advanced analytics on Enterprise at Sameday, Slang, Loman (G4) and Voksha (G5).
- **One feature set, priced by usage:** Jobber, Housecall Pro, CallRail (G4); RingCentral, Quo, Aircall,
  JustCall, Zoom (G3); Echowin, Callin.io, Newo (claimed, contradicted by its own table) (G2); Beside (G1); Dapta
  (G5).
- **Core outputs sold separately:** CloudTalk recordings and transcripts (a package); Zoom recording (bundle
  only); RingCentral's AI SMS agent (extra charge); Aircall's Inbound dashboards; Quo's AI call tags (Scale only)
  (G3). Reception.ai's privacy settings (Premium only); Juney's HIPAA mode (Pro) (G2).
- **Capability dimensions as price levers:** Marlie (actions, channels, departments) (G2); Rosie (scenarios),
  Goodcall (G1).
- **White-label or resale:** Echowin, Trillet, Callin.io, Newo, Juney, SkipCalls (G2); My AI Front Desk, Dialzara
  (G1); LobbyStack (G5); BotPenguin (G6); Tidio sells branding removal for $20 (G6).
- **HIPAA or a BAA as an upsell:** Goodcall (Scale and up), Upfirst (Enterprise), Abby Connect (human service
  only) (G1); Phonely, Lindy (Enterprise), Juney, Allo ($50) (G2); Voksha (Enterprise) (G5); Aircall (on request),
  Zoom (contact sales), Quo (Business/Scale) (G3).
- **Website chat and email folded in:** see section 4 and G2 pattern I.

## 6. Contradictions and caveats

One line each. These are the places where the files mark a vendor contradicting itself, or a source conflict.

### G1
- Beside: a help article says a 30-day trial and plans "Standard and Pro"; the pricing pages show Baseline and
  Unlimited.
- Goodcall: "no annual plan" vs "annual saves 15%".
- Goodcall: its homepage names Rosie (an oddity the file notes).
- Dialzara: live transfer is Elite-only vs "on request" / "Human transfer on demand".
- Dialzara: time to go live "under 30 minutes" vs "under 3 days".
- Dialzara: porting is free; coverage "continental US only" vs "US and Canada".
- Upfirst: "zero data retention" vs mandatory call recording.
- Smith.ai: 5 test calls vs 25/75/150/300 by plan.
- My AI Front Desk: up to 100 transfer scenarios vs the pricing page's "2 of each" (marked a possible
  contradiction).
- Simple Phones: its help page names GPT-3, which the file says suggests old docs.

### G2
- Echowin: free credits $5 vs $10; "70+" vs "30+" languages; "No credit card required" vs a third-party saying a
  card is needed.
- Phonely: Starter 200 vs 250 minutes and Pro 650 vs 750; overage $0.25 vs $0.35; Pro's overage higher than
  Starter's; a "Free to Enterprise" title with no free plan.
- Trillet: llms.txt (Basic $49 with 150 min, $0.20/min, 28-day money-back, three calendars, live immediately)
  differs from the pricing page and from Juney.
- Callin.io: a monthly plan in the docs vs "no tiers"; "7+" languages vs 8 listed.
- Marlie: a card-required trial vs a "money-back guarantee"; 10 vs 15 minutes to set up; calls recorded vs "opt
  in or out".
- Newo: "no annual plan" vs an annual commitment; multi-location on all plans vs Enterprise only (FAQ); "Same
  capabilities on every plan" vs a table that differs.
- Allo: Starter $16 / Business $45 vs Solo $10/$15 and Business $32/$45; a "Starter" plan name that is not on
  the pricing page.
- Lindy: $49.99/user with 5,000 credits vs $29.99/user with 3,000 credits on two readings; "Computer use on Pro
  and Max" vs plans named Free, Team and Enterprise.
- Sophiie: no prices and "book a demo" vs "Get started" and "No credit card required".
- SkipCalls: "unlimited minutes" vs about 200 calls (fair usage).
- IONOS: two first-run setup flows, both marked valid; Flex Pro's outbound calling appears only in an upsell box.
- Aira: 90+ vs 74 vs 31 languages; booking by link vs calendar sync; "9,000+ integrations" vs Zapier.

### G3
- RingCentral: the sales page offers "6 months free" (pay in 2027) vs the 14-day self-serve trial.
- GoTo: 4+ vs 10+ languages.
- Nextiva: $99 per 100 interactions with no contract vs a bundle with a 12-month minimum; a third-party gives
  $0.99.
- Quo: a changelog shows $49 for 50 calls; pricing.md lists only Business and Scale.
- Ooma: AI Receptionist priced per account vs per licence ($14.99 vs $49.99).
- Aircall: $0.12 vs $0.19 per minute; a third-party gives $0.49 vs the vendor's $0.29.
- JustCall: 300 URLs and 50 FAQs vs 500 and 500.
- CloudTalk: AI Receptionist €0 with 50 min vs $99 with 200 min; €349 vs $349; FAQ gives $0.35–$0.50 per minute.

### G4
- Jobber: "select plans" vs Core/Connect/Grow; a snippet says Plus or Grow.
- Housecall Pro: settings required before CSR AI is ready vs not required; AI disclosure described three ways.
- CallRail: three prices ($95, $75, $50 via Semrush); 50 vs 55 calls; caller memory "none" vs shared.
- Yelp: shutdown dates September 10/17 vs September 23/30; a form that leads to a demo vs online setup.
- Slang: live "under 30 minutes" / same day vs the first week; Yelp's page says Spanish is a $99 add-on vs Slang
  says it is included (Yelp is a competitor); a greeting article that is inconsistent.
- Loman: "No per minute fees" vs $0.59/min; 55 languages vs English and Spanish; onboarding fees $249/$149
  (third-party).
- Avoca: third-party price estimates conflict.

### G5 (vendor self-contradictions)
- LobbyStack (G5 section 1.9): website chat; AI replies to texts; which countries numbers come from; Zapier;
  retention settings.
- Voksha (G5 section 2.9): alerts at 75/90 vs 75/90/100%; cancelling by phone; Slack on Starter; TLS 1.2 vs 1.3;
  roles; retention controls; spam billing; setup time; toll-free numbers.
- Dapta (G5 section 3.9): setup time 2 / 5 / 30 minutes; "1,000+" vs 42 integrations; 20 languages vs English
  and Spanish; Cal.com vs dCal; how a number is activated; support per plan; concurrent calls.

### G5: where geekatyourspot.com's pages differ from the vendors
- LobbyStack: owner page Pro $15–$30 vs vendor $100/$80.
- LobbyStack: "Google Calendar only" vs the vendor also listing Cal.com, Calendly and Instagram.
- LobbyStack: records "always accessible" vs 30/90 days.
- LobbyStack: alerts on paid plans only vs every plan including Free.
- LobbyStack: "30 browser voice minutes" vs browser calls plus a trial number.
- LobbyStack: transfers "without an introduction": not found at the vendor.
- LobbyStack: a "GPT-Live" model: not on the vendor's pages.
- LobbyStack: the owner page's JSON-LD $30 price links the affiliate blog post.
- Voksha: "10+ languages" vs 1 / 2 / 50+ by plan.
- Voksha: takeout order processing: not found at the vendor.
- Voksha: a single multi-location dashboard is Enterprise only.
- Voksha: alert thresholds 75/90.
- Voksha: the JSON-LD URL is wrong.
- Dapta: "unlimited parallel calls" vs 0 / 2 / 10 / 15 by plan.
- Dapta: forwarding from carriers: not found (vendor describes SIP).
- Dapta: "real-time summaries" vs conditional emails.
- Dapta: Instagram: not found at the vendor (owner page covers "Facebook Messenger and Instagram DMs").
- Dapta: English and Spanish vs 20 languages.
- G5 also lists items that match; calendars are consistent for Dapta.

### G6
- Tidio: a price range of $29–$2,999 vs $33 Starter; Lyro Action limits; a Voice add-on vs "Lyro Voice" described
  as exploratory.
- BotPenguin: team member counts; Emperor $990 vs Custom; SMS on Emperor vs all plans.
- Manychat: AI as an add-on vs built in; old pricing pages still indexed; website widget (Manychat staff say no;
  one third-party, ASC, says yes).
- Dapta (text agent): setup time; which plan includes the Text Agent: not stated; a card for the free start.
- My AI Front Desk (chat): brand colours auto-detected vs swatches; "Pro subscription" for SMS is not on the
  pricing page.

### Where two files cover the same product
- **My AI Front Desk (G1 and G6).** G1 says the pricing page and the help overview both say "No credit card
  required". G6 says only the help pages say it and the pricing page is silent. G1 says white-label accounts
  exist with the tier not found; G6 lists Partner/Enterprise "for … agencies". The files agree on prices, "last
  200 logs", 20+ languages, and SMS that "may require a Pro subscription".
- **Dapta (G5 voice, G6 text).** The files agree on credits (1,000 = $1), Pro $99 with 100,000 credits, the 7-day
  trial with a card, 7,000 free credits, the setup-time contradictions, no Zapier, and no Instagram. G6 adds a
  contradiction about a card for the free start.
- **Grasshopper and Smith.ai.** Grasshopper (G3) sells its AI receptionist through SmithAI from $95/month;
  Smith.ai's own plans are in G1.

### Inconsistencies inside the research files
- G2 pattern C names Aira among products where transfers are paid; the Aira section and matrix say all plans.
- G2 Phonely: section 7 lists Zapier; the matrix says not found.
- G2 SkipCalls: the section 6 dashboard lists outbound calls and campaigns; section 8 and the matrix say not
  found.
- G2 Callin.io: the agent editor has a "Website widget" tab, but website chat is recorded as not found.
