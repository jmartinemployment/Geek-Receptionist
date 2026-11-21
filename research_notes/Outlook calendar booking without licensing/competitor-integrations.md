# How competing AI receptionist vendors integrate with Outlook / Microsoft 365 calendars

Research date: **2026-11-20**. All pages fetched that day unless noted.

**Evidence grading used below.** VERIFIED = I fetched the vendor's own page and the wording is
quoted or closely paraphrased. SEARCH-ONLY = the claim came from a search-result summary of a
vendor page I did not fetch in full; treat as weaker. INFERRED = my reasoning, not a vendor claim.
NOT DETERMINED = I could not establish it, and I am not guessing.

**Source-quality caveats that matter for three entries:**
- Voksha's Microsoft 365 page resolves at `voksha-website.pages.dev` — a Cloudflare Pages
  deployment domain, not an apex marketing domain. It may be a staging mirror. Treat Voksha's
  claims as vendor-published but not confirmed as the production site.
- The My AI Front Desk Outlook page is on `llms.myaifrontdesk.com`, a subdomain that appears to be
  machine-generated LLM-facing SEO content rather than the human help centre. Vendor-published, but
  lower confidence than a normal help article.
- Goodcall's `/business-productivity-ai/outlook` page is 236k characters of generated integration
  listings. The first 100k contained no Outlook section at all. Its Outlook claims are marketing
  boilerplate, not documentation.

---

## Q1. Which vendors offer Outlook / Microsoft 365 calendar booking, on which tier, at what price?

### Takeaway
Of the eight vendors named in the assignment, **not one was verified to do direct, native,
read-and-write Microsoft 365 calendar booking via its own Microsoft Graph OAuth connection.** The
vendors that genuinely book into Outlook do so through an intermediary — Zapier, Microsoft
Bookings, or a scheduling product (Calendly/Cal.com/Appointlet/Acuity). The only vendors I found
with a documented, self-serve, first-party "Sign in with Microsoft" calendar connection are
**outside** that list: Allo, IONOS AI Frontdesk, Nextiva (Xbert AI), and Voksha.

### Cited Findings

**Rosie — no Outlook at all (VERIFIED).**
- Rosie's help centre "Scheduling Integrations" article lists exactly four: **Calendly, Google
  Calendar, Appointlet, Acuity Scheduling**. Microsoft 365 / Outlook appears neither as a current
  integration nor on the "Coming Soon" list (which names rescheduling/cancellation, multiple
  appointment types, and "Integration with more scheduling platforms"). — [Rosie help centre, Scheduling Integrations](https://heyrosie.com/support/en/articles/12998658-scheduling-integrations), fetched 2026-11-20
- Rosie's Google Calendar article states the integration "only checks availability and creates
  events — Rosie cannot delete, reschedule, or view full calendar content," and "V1 always schedules
  to your default calendar." — [Rosie help centre, Google Calendar Integration](https://heyrosie.com/support/en/articles/12872287-scheduling-google-calendar-integration) (SEARCH-ONLY)
- A review round-up claims a $49 Rosie plan cannot book appointments at all. — [OnceHub, 6 Best AI Answering Services of 2026](https://www.oncehub.com/blog/6-best-ai-answering-services-of-2026-low-cost-high-roi) (SEARCH-ONLY, competitor-adjacent source, corroboration only)

**Smith.ai — Outlook only via Microsoft Bookings, and only on the human-receptionist product (VERIFIED).**
- Smith.ai's own Microsoft 365 page lists the calendar route as **"Book Appointments with Microsoft
  Bookings (Native)"**. The contact integrations beside it are explicitly "(Zapier)". — [Smith.ai, Microsoft Office 365](https://smith.ai/integrates-with/microsoft-office-365), fetched 2026-11-20
- The setup is not an OAuth connection at all. The page says: **"just send us each individual's
  Bookings link, along with any necessary directions for proper use."** — same URL
- Smith.ai's **AI Receptionist** (the voice-AI product, separate from its human receptionists) has a
  dashboard Integrations tab with a "Native Integrations" list. The only calendar entry documented
  there is **Calendly**; Microsoft 365/Outlook is not mentioned, nor is Google Calendar. The article
  adds "Calendly integrations are only available with a paid Calendly plan." — [Smith.ai AI Receptionist support, How to Connect Your Calendly Account](https://smithaivoiceassistant.freshdesk.com/support/solutions/articles/151000221010-how-to-connect-your-calendly-account-to-ai-receptionist), fetched 2026-11-20
- Smith.ai's Calendly page confirms the indirect path: Calendly connects to "your Microsoft Office
  365 Outlook calendar, and Outlook for Windows." — [Smith.ai, Calendly](https://smith.ai/integrates-with/calendly) (SEARCH-ONLY)
- Smith.ai also lists Apptoto and Timely as third-party routes that expose Outlook/Office365
  calendars for its receptionists to book into. — [Smith.ai blog, Now Integrates with Apptoto](https://smith.ai/blog/smith-ai-now-integrates-with-apptoto); [Smith.ai, Timely](https://smith.ai/integrates-with/timely) (both SEARCH-ONLY)
- Tier: Calendly integration listed as available on "Enterprise Plan, Teams Plan, Standard Plan". — [Calendly integration directory, Smith.ai](https://calendly.com/integration/smithai) (SEARCH-ONLY)

**Dialpad (Ai Receptionist / Resolve) — Microsoft 365 integration is read-only; no calendar writes (VERIFIED).**
- Dialpad's own Microsoft 365 partner page describes four features: SSO/user provisioning, contact
  profiles showing shared emails/documents/events, directory sync, and **calendar presence**. It
  describes reading and displaying calendar data and a "View Calendar" button. **Nothing on the page
  says the integration creates calendar events or books appointments.** — [Dialpad ecosystem, Microsoft 365](https://ecosystem.dialpad.com/partners/microsoft-365/), fetched 2026-11-20
- Connection wording is "log in and grant Dialpad access to your Microsoft contacts"; sign-in can
  "Authenticate user sign-in requests via SAML." — same URL
- Tier: **"Microsoft 365 integration is available on every Dialpad plan type including AI Messaging,
  Sell, and Dialpad Support."** — same URL
- Dialpad's booking path is Calendly: its AI agents "integrate with Calendly, allowing customers and
  prospects to interact directly with AI agents to instantly book meetings." — [Dialpad app marketplace, Calendly](https://www.dialpad.com/app-marketplace/calendly/) (SEARCH-ONLY)

**Voksha — claims a self-serve Microsoft sign-in, gated to Premium/Enterprise (VERIFIED, source-domain caveat).**
- **"You connect it yourself from the Voksha dashboard on Premium or Enterprise."** — [Voksha, Microsoft 365 integration](https://voksha-website.pages.dev/integrations/microsoft-365), fetched 2026-11-20
- **"You sign in with your Microsoft account when you connect your calendar, and Voksha does not
  store your password."** — same URL
- **"Integrations are included on the Premium and Enterprise plans (not Starter)."** Teams notices
  and Excel call logs additionally require Voksha support to set up rather than being self-serve. — same URL
- Voksha's FAQ claims it "integrates with Google Calendar, Outlook, Calendly, and more, checks
  real-time availability, and books appointments directly into your schedule." — [Voksha FAQ, Can Voksha book appointments](https://voksha-website.pages.dev/faq/can-voksha-book-appointments) (SEARCH-ONLY)
- No price figures found for the Premium/Enterprise tiers. (Gap.)

**Goodcall — NOT DETERMINED, leaning toward no native Outlook booking.**
- Goodcall's own `/business-productivity-ai/outlook` page returned 236k characters with **no Outlook
  section in the first 100k**; no OAuth, Graph, Zapier, or connector mechanism is described anywhere
  I read. The newest dated listing on the page is 2026-09-09. — [Goodcall, Business Productivity AI / Outlook](https://www.goodcall.com/business-productivity-ai/outlook), fetched 2026-11-20
- A separate Goodcall marketing page claims "Goodcall can access the calendar in Microsoft Outlook
  to schedule, reschedule, or cancel appointments automatically" (page dated May 2026) — but this is
  promotional copy with no setup steps. — [Goodcall marketing page](https://www.goodcall.com/business-productivity-ai/outlook) (SEARCH-ONLY)
- The only concrete Goodcall↔Outlook artifact found is a Zapier template that **sends email**, not
  calendar events: "Send emails in Microsoft Outlook when flows complete in Goodcall." — [Zapier, Goodcall + Microsoft Outlook](https://zapier.com/apps/goodcall/integrations/microsoft-outlook/1772296/send-emails-in-microsoft-outlook-when-flows-complete-in-goodcall) (SEARCH-ONLY)
- One review round-up states flatly that Goodcall "Cannot book — No calendar writing at any tier." — [OnceHub, 6 Best AI Answering Services of 2026](https://www.oncehub.com/blog/6-best-ai-answering-services-of-2026-low-cost-high-roi) (SEARCH-ONLY, corroboration only — this contradicts Goodcall's own marketing page and I could not resolve the conflict)

**Ruby Receptionists — Google Calendar native, Outlook only through a scheduler (SEARCH-ONLY).**
- Ruby's integrations page lists Google Calendar: "Let Ruby's receptionists keep your calendar
  up-to-date and populated with appointments from clients or customers." No Outlook entry found. — [Ruby, Integrations](https://www.ruby.com/solutions/integrations/)
- Ruby's Calendly help article notes a real limitation: Ruby "is not able to proactively reference
  your calendar to setup Ruby Statuses to hold your calls during scheduled appointments." — [Ruby Help Center, Scheduling with Calendly](https://rubyhelpcenter.helpjuice.com/scheduling/scheduling-with-calendly)
- Cal.com published a Ruby integration that connects Google or Outlook calendars to a Cal.com
  account for conflict checking — i.e. Cal.com, not Ruby, holds the Microsoft connection. — [Cal.com blog, Ruby Receptionists integration](https://cal.com/blog/ruby-receptionists-cal-com-scheduling-integration)

**Numa — NOT DETERMINED for Microsoft calendars.**
- Numa's integrations are dealership systems: "CDK, Reynolds & Reynolds, and Dealertrack," plus
  Tekion and Xtime. — [Numa blog, Dealership integrations: DMS, schedulers, CRM](https://numa.com/blog/numa-dealership-integrations-dms-schedulers-crm-guide) (SEARCH-ONLY)
- "For dealers without a third-party scheduler, Numa's native scheduling system handles appointment
  booking, calendar management, and availability checks." — [Numa blog, AI Appointments for Auto](https://numa.com/blog/ai-appointments-for-auto) (SEARCH-ONLY)
- No Numa page found mentioning Outlook, Exchange, or Microsoft 365 calendars. (Gap.)

**Slang.ai — no general calendar integration; it books into restaurant reservation systems (SEARCH-ONLY).**
- Slang.ai books into **OpenTable**, with bookings appearing "as if a host had entered them," tagged
  "Phone/AI Automation" in OpenTable reporting. Restaurants connect through the OpenTable Guest
  Center's Integrations page — i.e. the connection is made on OpenTable's side, not Slang's. — [Slang.ai help centre, Getting Started with the OpenTable x Slang Integration](https://slang-ai-knowledge-base.help.usepylon.com/articles/6627139160-getting-started-with-the-opentable-x-slang-integration)
- Also integrates SevenRooms, Tripleseat, Yelp; Resy and Tock listed as in development. — [Slang.ai vs Revmo](https://slang.ai/slang-ai-vs-revmo)
- No Outlook/Microsoft 365/Google Calendar integration found in any Slang.ai source.

### Additional vendors found that DO support Outlook (outside the assigned list)

| Vendor | Outlook mechanism | Tier | Evidence grade |
|---|---|---|---|
| **ElevenLabs Reception AI** | Zapier MCP → Microsoft Outlook actions | Consumes Zapier tasks (2/call) | VERIFIED |
| **Allo (withallo.com)** | First-party "Connect Outlook Calendar" → Microsoft sign-in | Integration library on Business plan; Solo has a CRM-only subset | VERIFIED (flow); SEARCH-ONLY (tier) |
| **IONOS AI Frontdesk** | First-party Microsoft 365 tile → Microsoft sign-in + consent dialog | AI Receptionist needs Flex Pro or Unlimited | VERIFIED |
| **Nextiva (Xbert AI)** | Direct Microsoft Graph OAuth, scopes selectable | Not stated | VERIFIED |
| **My AI Front Desk** | Zapier, or texting a Microsoft Bookings link | Not stated | VERIFIED (source-domain caveat) |

### Inferences
- INFERRED: The assigned eight split into three groups — vendors with no Microsoft story at all
  (Rosie, Slang.ai, Numa), vendors that delegate to a scheduling product (Ruby, Dialpad, Smith.ai's
  AI Receptionist), and vendors that delegate to a Microsoft-side product or automation layer
  (Smith.ai's human receptionists → Bookings). Voksha is the only one of the eight claiming a
  first-party connection, and its page is on a deployment-preview domain.
- INFERRED: Dialpad's Microsoft 365 integration being free on every plan while its *booking* story
  routes through Calendly is consistent with the read-only scope of that integration. Reading
  presence is cheap; writing events needs a different permission set and a different product owner
  inside Dialpad.

### Gaps
- No price figures found for Voksha Premium/Enterprise, Allo Business, or IONOS Flex Pro/Unlimited.
- Goodcall's own marketing claims Outlook scheduling while a third-party round-up says it cannot
  write to any calendar. I could not find Goodcall help documentation to settle this.
- Numa: no Microsoft calendar evidence either way.

---

## Q2. HOW does each connect? (mechanism evidence)

### Takeaway
The single most useful piece of evidence found is ElevenLabs stating in its own docs **why** it does
not connect to Microsoft directly — Graph "only accepts OAuth sign-ins" — and routing through Zapier
instead. Where a vendor does connect directly, the evidence (Nextiva) shows plain Microsoft Graph
OAuth with named scopes, not a unified-calendar middleman. **I found zero evidence of any AI
receptionist vendor using Nylas, Cronofy, Merge, Paragon or Composio for calendars.**

### Cited Findings

**ElevenLabs Reception AI — Zapier, and the doc says why (VERIFIED).**
- The doc states Microsoft's calendar and mail API (Microsoft Graph) **"only accepts OAuth
  sign-ins,"** so Reception connects to Outlook via Zapier. — [ElevenLabs docs, Reception AI → Microsoft Outlook](https://elevenlabs.io/docs/reception-ai/integrations/microsoft-outlook), fetched 2026-11-20
- Owner steps: (1) "If you haven't yet, connect Zapier in Reception.ai." (2) In the Zapier MCP
  server at `mcp.zapier.com`, add the Microsoft Outlook actions and **"sign in to your Microsoft
  account when Zapier asks."** (3) In the Zapier integration's Tools tab, "Refresh tools" and assign
  each action. — same URL
- Actions exposed: *Get Calendar Events in Date Range* (read, assigned to Client and Assistant),
  *Create Event* (write, Client), *Send Email* (Client). — same URL
- Cost model: **"Zapier currently counts two tasks per successful call."** Failed calls are not
  counted; actions stop when the plan's task budget runs out until it resets. — same URL
- The doc also recommends, for real-time availability booking, using "Reception's own booking with
  Google Calendar, Calendly, or Cal.com" — i.e. its first-party booking engine does **not** cover
  Outlook. — same URL (SEARCH-ONLY for this specific line)

**Nextiva / Xbert AI — direct Microsoft Graph OAuth, scopes named (VERIFIED). The clearest mechanism evidence found.**
- Install flow: App marketplace → **Outlook Calendar** → Install → accept Terms and Privacy → Next. — [Nextiva help, NEXT — Outlook Calendar Setup Guide](https://help.nextiva.com/article/nextiva-next-outlook-calendar-setup-guide), fetched 2026-11-20
- **Account type choice: Common / Tenant-specific / Consumer / Organization**, default Common.
  Common covers "Personal, enterprise, or multi-tenant accounts." Consumer is for "Personal Microsoft
  accounts" and requires supplying a Client ID and Client secret. — same URL
- **Authentication: default "Authorization code grant."** For tenant-specific accounts that must
  authenticate without user interaction, "Client credentials grant" is offered, which "requires the
  registered app to have sufficient permissions in Azure." — same URL
- **Scopes requested: `Calendars.Read`, `Calendars.ReadWrite`, `Calendars.Read.Shared`,
  `Calendars.ReadWrite.Shared`; `User.Read` and `offline_access` are always requested.** — same URL
- Then "Sign in with Microsoft" opens a browser window for the Microsoft sign-in. — same URL

**Allo — first-party Microsoft sign-in, mechanism not named (VERIFIED flow, mechanism INFERRED).**
- **"In Allo, go to Settings, then Integrations, then Outlook, and click Connect Outlook Calendar."**
  Then **"Sign in on Microsoft's page and grant Allo access to your Outlook calendar."** — [Allo, Outlook integration](https://www.withallo.com/integrations/outlook), fetched 2026-11-20
- The page never names Microsoft Graph, OAuth, Nylas, Cronofy or Zapier. — same URL
- Behavioural detail worth noting: **"Allo only shows calendars you can edit in Outlook."** Only the
  person who connected an account can disconnect it. Changing the booking calendar or meeting length
  is limited to account owner, admin, or manager. — same URL

**IONOS AI Frontdesk — first-party Microsoft consent dialog (VERIFIED).**
- Flow: IONOS account → Menu > AI Frontdesk → Manage → Settings > **Appointment Booking** → click
  the **Microsoft 365 tile** → the Microsoft sign-in dialog opens → **"Pick an account"** (or "Use
  another account") → **"Permissions requested"** dialog → **Accept** (Cancel aborts) → calendars
  appear automatically in the Calendars section. — [IONOS help, AI Frontdesk: Setting up appointment booking with Google Calendar or Microsoft 365](https://www.ionos.com/help/ai/ai-frontdesk/appointment-scheduling-and-integrations/ai-frontdesk-setting-up-appointment-booking-with-google-calendar-or-microsoft-365/), fetched 2026-11-20
- The permission grant is described as needed "so the assistant can create and manage appointments
  in your calendar" — i.e. read **and** write. — same URL

**My AI Front Desk — two indirect patterns, neither first-party (VERIFIED, source-domain caveat).**
- **Option A (Zapier):** "In Zapier, add a Microsoft Outlook connection and authorize your Microsoft
  365 work account," then build a Zap with a "Create Event" action. — [My AI Front Desk, Outlook / Microsoft Bookings integration](https://llms.myaifrontdesk.com/outlook-microsoft-bookings-integration), fetched 2026-11-20
- **Option B (Bookings link):** the AI texts or emails your public Microsoft Bookings link; Bookings
  then writes to the staff member's Outlook calendar. Setup: create a Bookings calendar at
  `book.ms`, add staff with "Events on personal calendar affect availability" turned on, create
  services, publish the page, copy the link, paste it into the knowledge base/instructions. — same URL
- Bookings requires "eligible SKUs such as Business Standard/E3/E5." — same URL

**Smith.ai (human receptionist product) — Microsoft Bookings link, no OAuth (VERIFIED).**
- No connection is made at all; the owner emails Smith.ai the Bookings link. Smith.ai's receptionists
  book through the public Bookings page. — [Smith.ai, Microsoft Office 365](https://smith.ai/integrates-with/microsoft-office-365), fetched 2026-11-20

**Unified calendar API vendors — searched for, not found in any AI receptionist's stack.**
- Nylas's own subprocessor page names Anthropic (for its MCP server) and does not list any AI
  receptionist as a customer in a way I could use. — [Nylas Subprocessors](https://www.nylas.com/security/subprocessors/) (SEARCH-ONLY)
- Cronofy markets an MCP server for AI agents and a Teams/Outlook Scheduling Agent, and is listed on
  Microsoft AppSource ("Cronofy for Office") and as a Microsoft connector. But **no voice/AI
  receptionist vendor named Cronofy in any page found.** — [Cronofy MCP Server](https://www.cronofy.com/developer/mcp-server); [Microsoft Learn, Cronofy MCP connector](https://learn.microsoft.com/en-us/connectors/cronofymcp) (both SEARCH-ONLY)
- Gloss Genius's subprocessor list names ElevenLabs for its "Receptionist" voice synthesis but
  neither Cronofy nor Nylas. Cal.com's subprocessor page names Anthropic, not Cronofy/Nylas. — [GlossGenius Sub-processor List](https://glossgenius.com/legal/subprocessors); [Cal.com subprocessors](https://trust.cal.com/subprocessors) (both SEARCH-ONLY)

### Inferences
- INFERRED: ElevenLabs' stated reason ("Graph only accepts OAuth sign-ins") is almost certainly a
  statement about *their own architecture*, not a limitation of Graph. Graph supports client
  credentials and application permissions perfectly well — Nextiva's page documents exactly that
  option. The honest reading is that ElevenLabs did not want to build and maintain an Entra app
  registration, consent flow, token refresh and per-tenant store, and pushed that cost onto Zapier.
  That is the same build-vs-buy decision this project faces.
- INFERRED: The absence of Nylas/Cronofy/Merge anywhere in this vendor set suggests that for a
  single-provider need (Microsoft only), vendors either build the Graph OAuth themselves or punt to
  Zapier. The unified-API vendors appear to sell to CRM/scheduling/ATS products, not to voice agents.
  This is an inference from absence across ~10 vendor pages, not a verified market fact.
- INFERRED: Microsoft Bookings is the recurring "no-code" escape hatch (Smith.ai, My AI Front Desk).
  It moves the Microsoft licensing and the calendar write into the customer's own tenant, so the
  vendor never holds a Microsoft token. That sidesteps the integration entirely at the cost of the
  AI not seeing real-time availability.

### Gaps
- No Microsoft AppSource / Azure Marketplace listing found for any of the eight assigned vendors.
  The only AppSource hits in this space were Cronofy's own add-in.
- No OAuth consent-screen screenshot or Entra enterprise-application name found for any vendor. No
  vendor page exposed the registered app display name a customer would see on the consent screen.
- No vendor privacy policy or subprocessor list was found that names a calendar API vendor. I
  searched for this specifically and found nothing.

---

## Q3. What does the owner actually click? Is a Global Admin or admin consent required?

### Takeaway
Where a first-party connection exists, every documented flow is a **plain self-serve "Sign in with
Microsoft" + consent dialog, clicked by the business owner, with no admin involvement described**.
Admin consent surfaces only as a *conditional* — when the tenant restricts third-party apps — and
only two sources mention it at all.

### Cited Findings
- **IONOS:** the owner clicks the Microsoft 365 tile, picks an account, reviews a **"Permissions
  requested"** dialog and clicks **Accept**. **The page does not mention admin consent or a tenant
  administrator at any point.** — [IONOS help](https://www.ionos.com/help/ai/ai-frontdesk/appointment-scheduling-and-integrations/ai-frontdesk-setting-up-appointment-booking-with-google-calendar-or-microsoft-365/), fetched 2026-11-20
- **Allo:** Settings → Integrations → Outlook → "Connect Outlook Calendar" → sign in on Microsoft's
  page and grant access. **The page says nothing about Global Admin or admin consent.** — [Allo](https://www.withallo.com/integrations/outlook), fetched 2026-11-20
- **Nextiva:** self-serve "Sign in with Microsoft." Admin involvement appears only on the
  *client-credentials* path, which "requires the registered app to have sufficient permissions in
  Azure" — i.e. an admin is needed only for unattended, tenant-wide access. **Admin consent is not
  mentioned for the normal authorization-code path.** — [Nextiva help](https://help.nextiva.com/article/nextiva-next-outlook-calendar-setup-guide), fetched 2026-11-20
- **My AI Front Desk:** the one source that names it as a prerequisite — **"admin consent if your
  tenant restricts third-party apps"** — and its troubleshooting advises "asking an admin to approve
  the Outlook Zapier connection if consent errors occur." — [My AI Front Desk](https://llms.myaifrontdesk.com/outlook-microsoft-bookings-integration), fetched 2026-11-20
- **Voksha:** "You connect it yourself from the Voksha dashboard" and "You sign in with your
  Microsoft account… Voksha does not store your password." No admin mentioned. — [Voksha](https://voksha-website.pages.dev/integrations/microsoft-365), fetched 2026-11-20
- **Smith.ai (human product):** no clicking at all — the owner emails Smith.ai a Bookings link. — [Smith.ai](https://smith.ai/integrates-with/microsoft-office-365), fetched 2026-11-20

### Inferences
- INFERRED: The uniform silence about admin consent across IONOS, Allo, Nextiva and Voksha means
  these vendors are requesting **delegated** permissions on a single user's calendar (the owner's),
  not application permissions across the tenant. Delegated `Calendars.ReadWrite` on one's own
  calendar does not require admin consent in a default Entra tenant. Nextiva's explicit scope list
  (`Calendars.ReadWrite`, `Calendars.ReadWrite.Shared`) is consistent with this.
- INFERRED: My AI Front Desk's conditional is the accurate general statement, and the other vendors
  are simply not documenting the case. A tenant with "Users can consent to apps accessing company
  data on their behalf" set to No will block all of these flows regardless of vendor. Any product
  planning a Microsoft calendar connection should expect to hit this with a minority of customers
  and should surface the resulting error rather than failing silently.

### Gaps
- No vendor documents what the consent screen actually says, what app name appears on it, or what
  happens when consent is blocked. Nobody publishes a screenshot.

---

## Q4. Do any support personal Outlook.com accounts, or only Microsoft 365 work accounts?

### Takeaway
Only **Nextiva** documents personal-account support explicitly, and it is the only vendor that even
distinguishes the account types. Everyone else is silent, and **My AI Front Desk is the one vendor
whose wording implies work accounts only.**

### Cited Findings
- **Nextiva — yes, documented.** The account-type picker includes **Common** ("Personal, enterprise,
  or multi-tenant accounts") and **Consumer** ("Personal Microsoft accounts"), the latter requiring
  a Client ID and Client secret. Common is the default. — [Nextiva help](https://help.nextiva.com/article/nextiva-next-outlook-calendar-setup-guide), fetched 2026-11-20
- **My AI Front Desk — work accounts only, by implication.** The page specifies authorizing "your
  Microsoft 365 **work** account," and says the Zapier Outlook app "requires Microsoft 365
  Business/Enterprise." Microsoft Bookings further requires "eligible SKUs such as Business
  Standard/E3/E5." — [My AI Front Desk](https://llms.myaifrontdesk.com/outlook-microsoft-bookings-integration), fetched 2026-11-20
- **Allo — not addressed.** The page does not say whether personal Outlook.com accounts work. — [Allo](https://www.withallo.com/integrations/outlook), fetched 2026-11-20
- **IONOS — not addressed.** The page refers only to a "Microsoft 365 account." — [IONOS help](https://www.ionos.com/help/ai/ai-frontdesk/appointment-scheduling-and-integrations/ai-frontdesk-setting-up-appointment-booking-with-google-calendar-or-microsoft-365/), fetched 2026-11-20
- **ElevenLabs — not addressed.** The doc says only "sign in to your Microsoft account when Zapier
  asks." — [ElevenLabs docs](https://elevenlabs.io/docs/reception-ai/integrations/microsoft-outlook), fetched 2026-11-20
- **Voksha, Smith.ai, Dialpad — not addressed** on any page fetched.

### Inferences
- INFERRED: The Bookings-based routes (Smith.ai, My AI Front Desk option B) are structurally
  work-account-only, because Microsoft Bookings is a Microsoft 365 Business/Enterprise feature and
  does not exist for Outlook.com consumer accounts. That is a licensing fact about Bookings, not a
  vendor policy.
- INFERRED: The Zapier-based routes inherit whatever Zapier's Microsoft Outlook app supports. My AI
  Front Desk states Zapier's Outlook app requires Business/Enterprise; if accurate, every Zapier-
  mediated vendor (ElevenLabs Reception AI included) is work-account-only in practice. I did not
  verify this against Zapier's own documentation. Flagging as unverified.

### Gaps
- Zapier's own Microsoft Outlook app requirements were not checked directly; the only claim comes
  from a third party (My AI Front Desk) describing it.
- Nobody documents whether a *personal* Outlook.com calendar can be booked into by an AI agent at
  all, beyond Nextiva's account-type picker.

---

## Q5. Which vendors gate Outlook behind a higher tier than Google Calendar, and why?

### Takeaway
**I found no vendor that gates Outlook specifically above Google Calendar.** Where gating exists it
is on *calendar integration as a category*, or on *integrations as a category*, with Google and
Microsoft treated identically. IONOS states this explicitly.

### Cited Findings
- **IONOS — explicitly equal.** The requirements are the same for Google Calendar and Microsoft 365;
  **only the one-time login differs between the two providers.** Both need: AI Chat Assistant on any
  plan level, or AI Receptionist on **Flex Pro or Unlimited**. On basic Flex, the Appointment Booking
  section is not shown at all until you add AI Chat Assistant or upgrade. — [IONOS help](https://www.ionos.com/help/ai/ai-frontdesk/appointment-scheduling-and-integrations/ai-frontdesk-setting-up-appointment-booking-with-google-calendar-or-microsoft-365/), fetched 2026-11-20
- **Voksha — gates the whole integration category.** "Integrations are included on the Premium and
  Enterprise plans (not Starter)" — Google Calendar is not carved out separately. — [Voksha](https://voksha-website.pages.dev/integrations/microsoft-365), fetched 2026-11-20
- **Dialpad — no gating.** Microsoft 365 is "available on every Dialpad plan type." (But it does not
  book.) — [Dialpad ecosystem](https://ecosystem.dialpad.com/partners/microsoft-365/), fetched 2026-11-20
- **Allo — category gating.** The full integration library sits on the Business plan; the Solo plan
  includes a CRM-only subset (Attio, Folk, HubSpot, Pipedrive, Salesforce). — [Allo product page](https://www.withallo.com/product/ai-appointment-booking) (SEARCH-ONLY)
- **CloudTalk — calendar sync is a tier jump.** AI receptionist starts at $99 but the tier that syncs
  calendars is $349; the source does not say whether that covers Outlook, Google, or both. — [CloudTalk, Dialzara pricing comparison](https://www.cloudtalk.io/dialzara-pricing/) (SEARCH-ONLY, competitor-published comparison, corroboration only)
- **Dialzara — calendar integration sits above the Lite tier**, alongside warm transfers and
  bilingual support. — same URL (SEARCH-ONLY)
- **Rosie — the asymmetry is total, not tiered.** Google Calendar exists at all tiers that have
  scheduling; Microsoft does not exist at any tier. — [Rosie help centre](https://heyrosie.com/support/en/articles/12998658-scheduling-integrations), fetched 2026-11-20

### Inferences
- INFERRED: The real pattern is not "Outlook costs more" but **"Outlook doesn't exist."** Vendors
  either ship both calendar providers at the same tier (IONOS, Voksha, Allo) or ship Google only
  (Rosie, Ruby, ElevenLabs' first-party booking engine). The plausible reason is engineering order:
  Google Calendar's API is one well-trodden OAuth flow against one identity model, whereas Microsoft
  means Entra tenants, consent policies, work-vs-personal account types, shared vs personal
  calendars, and Exchange quirks — so Google ships first and Microsoft slips. This is an inference
  from the shipped-feature pattern, not a stated vendor reason.
- INFERRED: Where a vendor does gate calendars by tier (CloudTalk, Dialzara, Voksha, Allo), the
  gating is commercial — calendar booking is the feature people upgrade for — not technical.

### Gaps
- No vendor anywhere stated a reason for treating the two calendar providers differently. Every
  "why" in this section is inference.

---

## Q6. Any vendor that explicitly does NOT support Outlook, and says why?

### Takeaway
**One vendor states its reason outright: ElevenLabs.** Its own Outlook doc says Microsoft Graph
"only accepts OAuth sign-ins," and that is given as the reason Reception connects through Zapier
rather than directly. No other vendor explains an absence; the rest simply omit Microsoft.

### Cited Findings
- **ElevenLabs Reception AI — states the reason.** Microsoft Graph "only accepts OAuth sign-ins," so
  Reception connects to Outlook via Zapier. Separately, for real-time availability booking the doc
  points users to "Reception's own booking with Google Calendar, Calendly, or Cal.com" — an explicit
  acknowledgement that its native booking engine excludes Outlook. — [ElevenLabs docs](https://elevenlabs.io/docs/reception-ai/integrations/microsoft-outlook), fetched 2026-11-20
- **Rosie — silent omission.** Four scheduling integrations listed, Microsoft in none of them, and
  "Integration with more scheduling platforms" sits under Coming Soon without naming Microsoft. No
  reason given. — [Rosie help centre](https://heyrosie.com/support/en/articles/12998658-scheduling-integrations), fetched 2026-11-20
- **RingCentral — a customer-side complaint confirming the same gap elsewhere.** A RingCentral
  community feature request asks for Microsoft 365 support, noting its AI Receptionist could at the
  time automate appointment creation using Outlook Calendar or Google Calendar only. The post's date
  and current status were not established, so treat as directional. — [RingCentral ideas forum, Automate Appointment Creation for AI Receptionist Using Microsoft 365](https://ideas.ringcentral.com/forums/958502-ai-conversation-expert-ace-formerly-ringsense/suggestions/50865281-automate-appointment-creation-for-ai-receptionist) (SEARCH-ONLY)

### Inferences
- INFERRED: ElevenLabs' stated justification does not survive scrutiny — Nextiva's documented
  client-credentials option and Microsoft's own published voice-appointment sample both use Graph
  directly. The sentence reads as a simplification of "we chose not to build a Microsoft OAuth
  integration," not a genuine API constraint. Worth noting precisely because it is the kind of
  sentence that gets quoted as if it were a fact about Microsoft.
- INFERRED: Nobody in this market publishes a "we don't support Outlook because X" page. Absence is
  communicated by omission from an integrations list, which means a competitor-capability table
  built from marketing pages will systematically overstate Outlook support.

### Gaps
- No vendor was found stating Microsoft *licensing cost* as a reason to avoid Outlook — which is the
  specific hypothesis this research folder is named after. Nothing found either supports or refutes
  the idea that vendors avoid Outlook because of a Microsoft licence requirement. If that hypothesis
  matters, the Bookings-SKU requirement (Business Standard/E3/E5, per My AI Front Desk) is the only
  licensing-shaped evidence found, and it applies to the Bookings route only — not to a direct Graph
  OAuth connection, which needs no particular Microsoft 365 SKU.
