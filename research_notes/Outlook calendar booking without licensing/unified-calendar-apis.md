# Unified calendar / scheduling API providers for reaching customers' Outlook, Microsoft 365 and Google calendars

**All pages in this file were fetched on 2026-11-20 unless a different date is stated.** Prices are as
displayed to an anonymous, US-locale visitor on that date. Every price line carries its URL.

A structural note that affects the whole comparison: **two different product shapes are mixed in this
list and they are not substitutes.**

1. **Calendar-connection infrastructure** — you keep your own booking logic; the vendor gives you
   OAuth, tokens, free/busy and event CRUD across providers. *Nylas, Cronofy, Mobiscroll Connect,
   Merge/Paragon/Composio (as generic integration platforms).*
2. **Scheduling-as-a-service** — the vendor owns availability computation, slot holds, conflict
   rejection and the booking record, and connects calendars as a means to that end. *coss.com
   Scheduling (Cal.com), Cal.com Platform, Calendly, OnceHub.*

For an AI receptionist that needs "is this slot free, book it", shape 2 removes more code; shape 1
gives more control. Both reach Outlook.

---

## Q1. For each vendor: which calendar providers, what it does, what it does NOT do

### Takeaway
Cronofy, Nylas, Mobiscroll Connect and coss.com (Cal.com) all cover Google + Microsoft 365/Outlook +
CalDAV/Apple through one integration and all handle OAuth, token refresh, free/busy and event CRUD.
The generic integration platforms (Merge, Paragon, Composio, Zapier) are **not** calendar-shaped:
Merge has no calendar category at all, and none of them compute availability or detect conflicts.
Calendly's API books into *Calendly's own* accounts, not into your customers' calendars as an
infrastructure layer.

### Cited Findings

**Cronofy**
- Cronofy stores, per connected account: OAuth credentials, account name/email/time zone, calendar
  names; event summaries, descriptions, start/end, recurrence, categories, colors, conferencing URLs,
  location (incl. lat/long), attendee email/name/status; free/busy from–to times; Smart Invites;
  meeting recordings and transcripts if used. It explicitly does **not** access email or contacts —
  [Cronofy Data Management](https://docs.cronofy.com/policies/data-management/)
- Feature set named on the pricing page: unlimited API calls, two-way calendar sync, Availability API,
  conferencing on events, 6 data centers, 99.99% uptime, Smart Invites, Application Calendars,
  Enterprise Connect (Growth tier and up), meeting rooms —
  [Cronofy OEM pricing](https://www.cronofy.com/api/markdown/api-pricing)
- Real-time webhook notifications on every plan. Rate limit 50 req/sec and 500 req/min **per
  application**; increases require contacting support — [Nylas comparison page, Nylas marketing
  material](https://www.nylas.com/cronofy-alternative/)
- Cronofy's raw Availability API prefers participants in the order listed; even round-robin
  distribution is left to the developer (its packaged Scheduler does distribute) — same source,
  Nylas marketing.
- Cronofy's sync keeps a **query window**, default 42 days past / 201 days future; reduced or extended
  windows are available on Emerging plans and above, configured per application —
  [Cronofy Data Management](https://docs.cronofy.com/policies/data-management/)
- Enterprise Connect connects a whole Office 365 / Exchange organisation via a service account or a
  tenant-level app rather than per-user OAuth —
  [Cronofy Enterprise Connect for Office 365 (Graph)](https://docs.cronofy.com/calendar-admins/enterprise-connect-office365-graph/)

**Nylas**
- Providers: Google, Microsoft 365/Exchange and Apple iCloud calendars through one API, plus email and
  contacts for Google/Microsoft/IMAP — [Nylas vs Cronofy, Nylas marketing](https://www.nylas.com/cronofy-alternative/)
- Free/Busy API; round-robin via a `max-fairness` / `max-availability` parameter — same source.
- Webhooks: lifecycle webhooks for events, messages, drafts, threads, folders and agents; payloads
  signed HMAC-SHA256; `event.created` and `event.updated` include the event object; failed deliveries
  retry up to 3 times with exponential backoff — same source.
- Rate limits: 200 req/sec per connected account for calendar/contacts/messages; 50/sec per
  application on auth and grant endpoints — same source.
- Nylas Scheduler (its hosted booking UI/API) is included on every plan — Nylas's own
  Calendly comparison, cited via [Nylas data-residency search result](https://www.nylas.com/blog/data-residency-scheduling-calendar-europe/)
- **Does not** supply the Microsoft app: a Microsoft connector is configured with *your* Azure app's
  client ID and secret — [Nylas: Creating an Azure auth app](https://developer.nylas.com/docs/provider-guides/microsoft/create-azure-app/)

**coss.com Scheduling (Cal.com, Inc.)**
- Providers: Google, Microsoft, and CalDAV (page names Apple, Nextcloud and Fastmail as CalDAV
  servers) — [coss.com/docs/scheduling](https://coss.com/docs/scheduling)
- Connection flow: `coss.scheduling.calendars.authorize` returns a consent URL you open in a new window
  (providers refuse to be framed); the host returns to your `return_url`, which must be an allowed
  origin. CalDAV uses `coss.scheduling.calendars.connect` with server URL, username and an
  app-specific password — [coss.com/docs/scheduling/calendars](https://coss.com/docs/scheduling/calendars)
- Conflict detection is enforced in the database: overlapping bookings for the same host are rejected,
  including from retries or simultaneous requests; a taken time returns `slot_unavailable` —
  [coss.com/docs/scheduling](https://coss.com/docs/scheduling)
- **Fails closed on unreadable calendars**: "a calendar that can't be read is treated as busy, not
  free" — [coss.com/scheduling](https://coss.com/scheduling)
- Timezone/DST: host hours stay in the host's local time across DST changes; recurring bookings stay at
  the attendee's local time — [coss.com/docs/scheduling](https://coss.com/docs/scheduling)
- Bookings are written to the host's chosen calendar as a **private "Appointment" with no attendees**,
  so no invitations are sent. Optional `host_calendar_details: full` puts attendee names, emails and
  phone numbers into the event description —
  [coss.com/docs/scheduling/calendars](https://coss.com/docs/scheduling/calendars)
- Embedding: the booking page can be iframed into your app; embedding origins are limited to 10 HTTPS
  origins — [coss.com/scheduling](https://coss.com/scheduling)
- Holds and pending approvals exist and are not billed until confirmed — [coss.com/scheduling](https://coss.com/scheduling)
- Webhooks are mentioned as part of the shared platform but the scheduling page gives no detail —
  [coss.com/docs/scheduling](https://coss.com/docs/scheduling)

**Mobiscroll Connect**
- Supports Google Calendar, Outlook Calendar, Apple Calendar and CalDAV-based calendars. Each calendar
  connection counts as one connected account — a single user connecting both Google and Outlook counts
  as two — [Mobiscroll Connect pricing](https://mobiscroll.com/connect-pricing)

**Cal.com Platform (atoms / managed users)**
- Developer's users are "managed users" in Cal.com's database; they need no Cal.com account and their
  booking pages live on the developer's platform. Docs show a `Connect.GoogleCalendar` component and
  mention Google Calendar, Zoom and Microsoft Teams under the Apps permission. **Outlook calendar is
  not named in the quickstart** — [Cal.com Platform quickstart](https://cal.com/docs/platform/quickstart)
- Integration requires: creating a Cal.com OAuth client; creating a managed user per end user via API
  and storing their access/refresh tokens; a backend refresh-token endpoint; handling refresh-token
  expiry via cron or `/force-refresh`; `@calcom/atoms` + `CalProvider` — same source.

**Calendly API**
- The REST API v2 can "programmatically book meetings" and read/write Scheduling, Contacts and
  Notetaker data; webhooks cover the same areas; embeds add a scheduling page via an HTML snippet
  (inline, popup, button) — [Calendly API docs](https://developer.calendly.com/api-docs)

**OnceHub**
- Client-side JS API for embedding OnceHub scheduling interfaces with event listeners; a REST Booking
  Calendars API for bookings, calendars and webhooks; API-key auth; a separate MCP server —
  [OnceHub developer center](https://developers.oncehub.com/docs/overview/introduction/)

**Merge.dev**
- The pricing page's visible integration categories are accounting, ATS/recruiting, CRM, file storage,
  HR/payroll and ticketing. **Calendar/scheduling is not among them** —
  [Merge pricing](https://www.merge.dev/pricing)

**Paragon**
- Sells "managed auth", unlimited integrations, Managed Sync, ActionKit and Workflows. The pricing page
  does not mention Google Calendar or Outlook —
  [Paragon pricing](https://www.useparagon.com/pricing)

**Composio**
- Ships per-app auth connectors (e.g. a Microsoft Bookings connector page exists at
  [composio.dev/auth/microsoft_bookings](https://composio.dev/auth/microsoft_bookings)). Sold as tool
  calls for AI agents, with custom MCP servers and a "Firewall" —
  [Composio pricing](https://composio.dev/pricing)

**Zapier**
- Task-based automation; the public pricing page does not mention an embedded/white-label product —
  [Zapier pricing](https://zapier.com/pricing)

### Inferences
- Merge is **out of scope** for this problem: a unified API with no calendar category cannot deliver
  Outlook free/busy. (Inference from the absence of the category on its pricing page; not from a
  statement that calendar is unsupported.)
- Paragon, Composio and Zapier are *connection plumbing or agent tooling*, not scheduling engines.
  Even where a calendar connector exists, availability computation, slot holds, conflict rejection,
  recurrence and DST remain yours to build. For an AI receptionist whose whole job is "find a free slot
  and book it", that is most of the work left undone.
- Calendly's API is a control surface for Calendly accounts. Using it to reach *your customers'*
  Outlook calendars would mean every customer holds their own Calendly subscription and authorises your
  app to it — a licensing cost and a signup step per customer, not a buy-instead-of-build layer.
  (Inference; see Gaps — Calendly's OAuth model for third-party apps was not confirmed.)
- coss.com is the only vendor here that states fail-closed behaviour on an unreadable calendar and
  database-level overlap rejection. Those are exactly the two properties an AI receptionist needs and
  the two most commonly got wrong when hand-built.

### Gaps
- **Calendly**: rate limits, plan tiers required for API/webhook access, and whether a third-party app
  can OAuth into another company's Calendly account — the api-docs landing page states none of these,
  and I did not fetch the OpenAPI spec. Not determined.
- **Reclaim.ai**: I found an OpenAPI-described calendars API at `api.app.reclaim.ai` and a separate
  "Embed API" with two POST endpoints under a "dropbox" path, via a third-party catalogue
  ([apis.io Reclaim calendars API](https://apis.io/apis/reclaim-ai/reclaim-ai-calendars-api/)). I found
  **no official Reclaim developer documentation** for third-party embedding. Reclaim should be treated
  as not a contender on current evidence rather than as evaluated-and-rejected.
- **Unified.to** offers a unified calendar API that includes OnceHub ([unified.to/integrations/oncehub](https://unified.to/integrations/oncehub)).
  It was not researched. It is a live contender that this pass did not cover.
- Cronofy webhook payload contents and signing: not determined (only Nylas's marketing page addressed
  it, and it says Cronofy's detail was unavailable).
- Recurrence handling specifics for Nylas and Cronofy beyond "recurrence is a stored field": not
  determined.

---

## Q2. Current pricing, with dates and URLs

### Takeaway
There is a ~30x spread at small scale. **coss.com (Cal.com) at $0.10 per confirmed booking with a $25/mo
floor and Nylas at $15–49/mo are the only two that are affordable pre-launch.** Cronofy's entry plan is
**$819/month billed annually** and Merge's is **$650/month** — both are disqualifying for a product with
few customers. Paragon has no public price at all.

### Cited Findings — all seen 2026-11-20

**coss.com (Cal.com, Inc.) — [coss.com/pricing](https://coss.com/pricing) and [coss.com/scheduling](https://coss.com/scheduling)**
- Free: $0, no card. 3 scheduling hosts, 3,000 emails/mo, 1 domain, 3 team members, 3 inboxes.
- Pro: **$25/month**, which is *credit* toward usage — you pay the larger of the fee or your usage.
  10 domains, 10 team members, 25 scheduling hosts.
- Scale: **$250/month** (same credit model), 100 domains, unlimited team members, 100 scheduling hosts.
- Enterprise: **from $2,000/month on an annual commitment**; volume pricing, SCIM, HIPAA mode with
  signed BAA, invoicing. sales@coss.com.
- **Per booking: $0.10 per confirmed booking.** Each occurrence of a recurring series and each group
  session counts separately. Holds and pending approvals are not charged until confirmed;
  rescheduling is not charged; sandbox is not charged; **cancelled bookings stay charged**.
- **Per host: $0.99 per 30 host-days** beyond the plan's included hosts. From January 2027 host-days
  are charged by the day.
- *Conflict in the sources:* [coss.com/scheduling](https://coss.com/scheduling) says the free plan
  includes **100 scheduling bookings per month**; [coss.com/pricing](https://coss.com/pricing) lists
  Free's included usage as "None" and only caps hosts at 3. Also, Scale's feature list says "100
  Scheduling hosts, more by the month" while its comparison table says "Unlimited". Both unresolved —
  confirm with sales before relying on either.

**Cronofy — [cronofy.com/api/markdown/api-pricing](https://www.cronofy.com/api/markdown/api-pricing) (OEM/API plans)**
- Emerging: **$819/month billed annually**. Includes unlimited API calls, two-way sync, Availability
  API, 6 data centres, 99.99% uptime, **up to 500 Synced Accounts**, 2,000 Smart Invites, 500
  Application Calendars. Overage: **Synced Accounts $1.39 each/mo**, Smart Invites $0.06 per 10/mo,
  Application Calendars $0.28 each/mo.
- Growth: **$2,399/month billed annually**. Adds Enterprise Connect access and meeting rooms; up to
  3,000 Synced Accounts, 10,000 Smart Invites, 3,000 Application Calendars. Overage: **Synced Accounts
  $0.69 each/mo**, **Enterprise Connect $99.00 each/mo**, Application Calendars $0.14 each/mo.
- Strategic: **contact sales** ("Let's talk"); priority support, integration consultancy.
- Annual billing saves 10%; a monthly toggle exists but its figures did not render in the fetched text.
- Meeting Agents add-on (usage-based): first 24 hours free; $0.79/hr for 25–4,000 hrs; $0.69/hr for
  4,001–8,000; $0.59/hr above. Billed per second. **Standalone use has a $99/month minimum.**
- Cronofy's FAQ describes an *activation model*: a user is someone who has granted your application
  access; billing stops when they are no longer active —
  [Cronofy FAQs](https://cronofy.com/faqs) (via search result, not directly fetched)
- Nylas's comparison page claims Cronofy's free tier is a **sandbox up to 20 accounts**; Cronofy's own
  page shows only a "Try for free" button with no stated limits. Treat the 20 figure as unconfirmed
  third-party — [Nylas vs Cronofy](https://www.nylas.com/cronofy-alternative/)

**Nylas — [nylas.com/pricing](https://www.nylas.com/pricing/)**
| Plan | Price | Email+calendar accts | **Calendar-only accts** | Bot hrs |
|---|---|---|---|---|
| Free | $0/mo, "free forever", no card | 5 | not included | 5 |
| Essentials | $15/mo | 10 (+$2.25 ea) | 10 (**+$1.70 ea**) | 10 (+$0.80/hr) |
| Pro Monthly | $49/mo | 25 (+$2.00 ea) | 35 (**+$1.50 ea**) | 70 (+$0.70/hr) |
| Pro Annual | $43/mo, 12-month commitment | 25 (+$1.75 ea) | 35 (**+$1.35 ea**) | 70 (+$0.65/hr) |
| Enterprise | Custom / contact sales | custom | custom | custom |
- The **calendar-only account** SKU is the relevant one here and is the cheaper line.
- No API-call limits are published on the pricing page; the published limits are account counts and
  monthly agent email volume.
- Add-ons: Accelerator Package $2,400/year (Pro Annual only); Professional Services from $2,000/session.
- *Discrepancy on the page itself:* the Pro card says 20 custom sending domains; the comparison table
  says 10 for Pro Monthly and 20 for Pro Annual.

**Merge.dev — [merge.dev/pricing](https://www.merge.dev/pricing)**
- Launch: **$650/month**, self-serve, covers up to 10 production Linked Accounts, of which 3 are free;
  **$65 per Linked Account after the 10th**. Volume discounts on request.
- Professional and Enterprise: contract-based, no USD figures published, "get a demo".

**Paragon — [useparagon.com/pricing](https://www.useparagon.com/pricing)**
- Platform: "Start for free", unlimited integrations, managed auth, Managed Sync, ActionKit, Workflows.
  **No numeric limits and no USD prices anywhere on the page.** Connected Users shown as "Custom".
- Pro and Enterprise: "Talk to sales".
- Billing unit is the **Connected User** — an end customer actively using your integrations; docs define
  it as a unique User ID connected to at least 1 integration, typically an organisation —
  [Paragon docs: connected users](https://docs.useparagon.com/billing/connected-users)
- A **$40 / connected user per month** figure appears on an alternate Paragon pricing URL
  ([useparagon.com/pricing-2](https://www.useparagon.com/pricing-2)) alongside a platform fee, but other
  sources say Paragon gives no per-CU specifics. **Unverified — do not budget from it.**

**Composio — [composio.dev/pricing](https://composio.dev/pricing)**
- Free: $0, no card. Up to 3 members, **10,000 tool calls/month**, up to 3 custom MCP servers, 5 shared
  connections, up to 25 skills, **up to 10 linked accounts per app**, $2 one-time credits.
- Standard: **$18 per seat/month — listed as "Coming soon"**. 10,000 tool calls per seat, unlimited
  custom MCP servers, Firewall, SSO, **Zero data retention**. The $18 is pooled credit; it resets
  monthly with no rollover and overflow bills to the card.
- Enterprise: custom; BYOC, custom connectors, SCIM, audit logs, SIEM streaming, FDEs, SLAs.
- Usage rates: extra app tool calls **$0.005/call**; Firewall policies $0.50 per 1M tokens; Google Maps
  from $0.01 in credits per call.
- No minimum seat count or contract length stated.

**Zapier — [zapier.com/pricing](https://zapier.com/pricing)**
- Free: $0, **100 tasks/month**, two-step Zaps, 1 seat.
- Professional: $19.99–$3,389.00/mo annual (750 – 2,000,000 tasks/mo); monthly billing is 50% higher
  ($29.99–$5,099.00).
- Team: $69.00–$3,999.00/mo annual (2,000 – 2,000,000 tasks/mo), 25 users; monthly $103.50–$5,999.00.
- Enterprise: custom, via sales. Above 2,000,000 tasks/mo goes through sales.
- Overage with pay-per-task: 2.5× base rate on monthly plans, 1.25× on annual. Usage pauses at 3× the
  subscription until the next cycle even with pay-per-task on.

**Mobiscroll Connect — [mobiscroll.com/connect-pricing](https://mobiscroll.com/connect-pricing)**
- **Prices are in EUR, not USD.**
- Develop/free: Connect "with limited features free for development". The page lists 100 connected
  accounts included with **€0.89/connected account above 100**, and *elsewhere on the same page*
  describes the tier as up to 10 accounts. Conflicting — unresolved.
- Scale: **from €833/mo billed annually** (2 months free), 1,000 connected accounts, unlimited
  applications and API calls, branded Connect page. Overage **€0.69/connected account above 1,000**.
- Usage is measured and overages billed monthly regardless of billing cycle.

**Cal.com (the scheduling product, not Platform) — [cal.com/pricing](https://cal.com/pricing)**
- Free: $0 forever, 1 user, unlimited links and calendars.
- Teams: **$12 per user/month** (25% off yearly).
- Organizations: **$28 per user/month** (25% off yearly); adds SAML SSO, SCIM, SOC 2 / HIPAA / ISO 27001.
- Enterprise: custom.

### Inferences
- **Disqualifying minimums for a pre-launch buyer**: Cronofy ($819/mo annual floor), Merge ($650/mo),
  Mobiscroll Scale (€833/mo), coss.com Enterprise ($2,000/mo annual), Paragon (no public price =
  enterprise sales motion). Cronofy's Emerging plan costs ~$9,828/year before the first customer
  connects a calendar.
- **Cost at realistic early scale.** For 20 connected business owners doing 200 bookings/month total:
  coss.com Pro ≈ $25/mo (usage $20 of bookings + host-days, so the $25 floor binds); Nylas Essentials
  ≈ $15 + 10 extra calendar-only accounts × $1.70 = **$32/mo**; Cronofy Emerging = **$819/mo**. These
  are my arithmetic from the published rates, not vendor quotes.
- coss.com's "fee is credit against usage" model means the $25 and $250 tiers behave as **minimum
  spends, not surcharges** — unusual and favourable at low volume.
- Composio's Standard tier being marked "Coming soon" means the only *available* Composio plan today is
  Free, and Free excludes zero-data-retention. Relevant given the ZDR constraint.

### Gaps
- Cronofy **monthly** (non-annual) prices: the toggle exists but the figures did not render in the
  fetched text. Not determined.
- Cronofy's free/sandbox tier limits from a primary source. Not determined.
- OnceHub developer/API pricing: not determined — I found the developer docs but no pricing page for
  API access.
- Calendly plan tier required for API and webhook access, and its prices. Not determined.
- Paragon's actual per-connected-user rate. Not determined (see the unverified $40 note).
- Whether Merge, Paragon or Composio charge per API call in addition to per connected account.
  Composio publishes $0.005/tool call; Merge and Paragon do not publish a per-call rate.

---

## Q3. Who carries the Microsoft publisher-verification / app-registration burden?

### Takeaway
**This is the sharpest dividing line in the whole comparison, and it splits the field cleanly.**
Cronofy and coss.com (Cal.com) use **their own** Microsoft application by default — the business owner
sees the vendor's consent screen and you register nothing with Microsoft. **Nylas requires you to bring
your own Azure app registration** and to complete Microsoft publisher verification yourself; that is
the exact burden the buyer is trying to avoid.

### Cited Findings
- **Nylas — bring your own.** Nylas's Microsoft connector is configured with *your* Azure app's client
  ID and secret, entered in the Nylas Dashboard or sent through the API. Setup is: register the app,
  add Microsoft Graph permissions, create a client secret, add a Microsoft connector —
  [Nylas: Creating an Azure auth app](https://developer.nylas.com/docs/provider-guides/microsoft/create-azure-app/)
- Nylas's publisher-verification guide puts all four steps on the developer: create an Azure auth app
  **for your project**, join the Microsoft AI Cloud Partner Program, configure the publisher domain,
  mark the app publisher-verified; then confirm a blue badge appears under Branding & properties —
  [Nylas Microsoft publisher verification guide](https://developer.nylas.com/docs/provider-guides/microsoft/verification-guide/)
- Nylas's guide warns that **without verification, organisations may require admin consent before users
  can connect**, which "can slow or block adoption"; and that since November 2020, with risk-based
  step-up consent enabled, users cannot consent to most newly registered unverified multi-tenant apps —
  same source.
- Nylas also requires `User.Read`, `offline_access`, `openid` and `email` on **every** Microsoft auth
  request even if your connector does not list them; your registration needs those four plus `profile`
  and at least one feature permission. Single-tenant registrations are rejected when the connector's
  tenant is `common`. Azure client secrets expire and must be renewed in Azure *and* updated in the
  Nylas dashboard. A v2 Azure app does not work with v3 —
  [Nylas Microsoft docs](https://developer.nylas.com/docs/provider-guides/microsoft/create-azure-app/)
- Nylas's own marketing frames this as a feature: "Nylas lets you use your own Google and Microsoft
  projects and offers white-labeled authentication", versus "Cronofy holds the application credentials"
  — [Nylas vs Cronofy](https://www.nylas.com/cronofy-alternative/)
- **Cronofy — vendor's own app.** Cronofy connects Office 365 users through a shared application,
  "Cronofy for Office 365", Application ID `f573e3d3-ea9c-4d8d-9d8f-20107b8cedbd`. The consent screen is
  therefore Cronofy's app, not one you register —
  [Cronofy: Limit Cronofy's access](https://docs.cronofy.com/calendar-users/office-365-outlook/restrict-access/)
- Cronofy's Enterprise Connect runs through a "Cronofy Enterprise for Office 365" application whose ID
  Cronofy publishes —
  [Cronofy Enterprise Connect (Graph)](https://docs.cronofy.com/calendar-admins/enterprise-connect-office365-graph/)
- Cronofy's Microsoft Marketplace listing carries a **"Microsoft 365 Certified"** tag. That is the
  Microsoft 365 Certification programme (a review of the publisher's practices and procedures), which is
  a **different programme from publisher verification** —
  [Cronofy on Microsoft Marketplace](https://appsource.microsoft.com/en-us/product/web-apps/cronofyltd1589543811684.cronofy-enterprise-365-connector)
- **coss.com — vendor's own app by default, yours optionally.** "Hosts connect calendars through
  coss.com's own Google, Microsoft, and Zoom apps… By default that's coss.com's" consent screen. Bringing
  your own app changes the consent screen to your name and logo, and makes **you** own the provider
  relationship including the provider's review of your app and your privacy policy. coss.com requests the
  same access either way. New consents use your app once added; hosts already connected stay on coss.com's
  app until they reconnect; if your app stops working coss.com does **not** fall back to its own —
  [coss.com/docs/scheduling/oauth-apps](https://coss.com/docs/scheduling/oauth-apps)
- On that same coss.com page, **Google verification is discussed explicitly** (an external app needs its
  own brand verification; Google requires you to own every domain on the app including redirect URIs;
  until verified Google shows a warning and caps the app at **100 users**; an Internal app for your own
  Workspace skips this). **Microsoft publisher verification is not mentioned** — the Microsoft section
  covers multi-tenant registration, permissions and client-secret expiry — same source.

### Inferences
- For the stated objective — "the business owner sees the API vendor's consent screen rather than ours"
  — **coss.com and Cronofy both deliver it out of the box; Nylas structurally cannot.** Nylas's
  architecture is "we operate the sync, you own the Microsoft relationship." That is the right trade
  for a company that wants its own brand on the consent screen and the wrong one for a company trying
  to avoid Microsoft Partner Network enrolment.
- coss.com is the only vendor found that offers **both** modes on the same product: ship on its app now,
  switch to your own later for branding, without changing scheduling vendors. The migration is graceful
  (new consents use the new app) but **not retroactive** (existing hosts stay until they reconnect).
- The absence of a Microsoft publisher-verification section on coss.com's OAuth-apps page, alongside a
  detailed Google verification section, is weak evidence that Microsoft verification is not a blocker on
  coss.com's default path. It is **not** evidence that coss.com's Microsoft app is publisher-verified.
  Not determined.

### Gaps
- Whether Cronofy's and coss.com's Microsoft apps carry the blue **publisher-verified** badge. Neither
  vendor states it and Microsoft's directory was not queried. **Not determined.** This is worth a direct
  question to each vendor, because it decides whether a tenant with risk-based step-up consent lets an
  owner self-consent.
- Mobiscroll Connect, Paragon and Composio: whose Microsoft app registration is used. Not determined.
- Cal.com Platform (the atoms product, as distinct from coss.com): whether Cal.com supplies Google/
  Microsoft credentials or the developer must register their own. The quickstart does not say — it only
  covers the Cal.com-issued OAuth client ID/secret, which authenticates *your app to Cal.com*, a
  different thing. **Not determined** — [Cal.com Platform quickstart](https://cal.com/docs/platform/quickstart)

---

## Q4. What the business owner actually sees and clicks; does anyone need an IT admin?

### Takeaway
In every vendor-app model the owner clicks a normal Microsoft/Google consent screen bearing the
**vendor's** name. The real risk is not the vendor — it is that Microsoft tenants increasingly block
user consent to any third-party app by default, in which case an IT admin must approve once. Cronofy
and coss.com both provide an admin path; Cronofy's is a pre-generated admin consent URL.

### Cited Findings
- **Cronofy**: a user may see "Need admin approval" when authenticating. This happens when the
  customer's IT admin has enabled the User Consent setting in Microsoft 365, which "blocks access of any
  non-Microsoft application." The admin must grant consent using **Cronofy's pre-generated Admin Consent
  URL**, found in the Credentials tab of the integrator's application in the Cronofy Portal. Manually
  constructing a Microsoft admin-consent URL is **not supported and causes a state error** —
  [Cronofy: 'Need admin approval'](https://docs.cronofy.com/calendar-admins/faqs/need-admin-approval-error/)
- Cronofy also lets the integrator add their own logo to the **Cronofy OAuth authorization screen** via
  Branding in the developer dashboard — note this is Cronofy's own intermediate screen, not Microsoft's —
  [Cronofy application customization](https://docs.cronofy.com/developers/application-management/customization/)
- Cronofy's Enterprise Connect asks for access to list users & resources, organization information, and
  calendars — i.e. a tenant-wide grant performed by an admin, for organisations connecting many users at
  once — [Cronofy Enterprise Connect (Graph)](https://docs.cronofy.com/calendar-admins/enterprise-connect-office365-graph/)
- **coss.com**: the host clicks through a provider consent screen opened in a new window (providers
  refuse to be framed) and returns to your `return_url`. For large organisations, "an admin can authorize
  a whole domain once through calendar delegation… for organizations with hundreds of hosts" —
  [coss.com/docs/scheduling/calendars](https://coss.com/docs/scheduling/calendars)
- **Nylas**: without publisher verification, "organizations may require admin consent before users can
  connect their accounts" —
  [Nylas verification guide](https://developer.nylas.com/docs/provider-guides/microsoft/verification-guide/)
- **Microsoft's default changed, per a third-party vendor**: Zeeg's help centre states that in
  **November 2025** Microsoft changed Entra ID defaults such that **all third-party apps require
  administrator consent** before a user can grant calendar access through Microsoft Graph —
  [Zeeg: How Microsoft 365 permissions work](https://zeeg.me/en/help/articles/14755107-how-microsoft-365-permissions-work-in-zeeg).
  **This is a single third-party source and was not confirmed against Microsoft's own documentation.**
- Admin consent removes the per-user consent prompt but the permissions remain delegated — same source.
- Google side: a user can revoke third-party app access at Google's third-party apps page; Microsoft's
  account apps portal lists granted permissions —
  [UW-Madison IT: Manage OAuth permissions](https://kb.wisc.edu/139035)

### Inferences
- **The owner-sees-what** answer is roughly identical across Cronofy and coss.com: "Cronofy wants to read
  and write your calendar — Accept" or "coss.com wants to…". Neither shows your brand on Microsoft's
  screen unless you bring your own app (coss.com) — and bringing your own app is precisely the burden
  being avoided.
- **The IT-person question is not vendor-determined.** Whether a given small business needs an admin
  depends on that tenant's Entra consent policy, not on which vendor you picked. A solo owner on a
  Microsoft 365 Business Basic tenant where they *are* the admin will typically self-consent; an owner
  who is one user inside a managed tenant may not. Plan for both paths regardless of vendor.
- Cronofy's pre-generated admin-consent URL is a concrete operational advantage: it is a link you can put
  in your onboarding email and the admin clicks once for the whole tenant. coss.com's domain-delegation
  path is described as aimed at "hundreds of hosts", so it may not be offered for a 5-person business.
- If the Zeeg claim about the November 2025 Entra default is accurate, **admin consent becomes the
  common case rather than the exception for Microsoft 365 business tenants**, and the onboarding flow
  must handle it as a first-class step, not an error state. Verify this against Microsoft's own docs
  before designing around it — it is the single highest-leverage unverified claim in this file.

### Gaps
- Microsoft's own documentation of the November 2025 consent-default change. **Not verified.**
- What coss.com's Microsoft consent screen literally says (scopes requested). coss.com's calendars page
  does not list scopes. Not determined.
- Whether coss.com offers an admin-consent URL equivalent to Cronofy's for small tenants. Not determined.

---

## Q5. MCP servers — who has one, and does it matter?

### Takeaway
Cal.com/coss.com, OnceHub and Composio all expose MCP. For a C#/GeekAPI backend calling plain HTTP,
**MCP is irrelevant to the integration itself** — it is a client-side convenience for AI chat clients,
and every one of these products has a REST API underneath it.

### Cited Findings
- **Cal.com hosted MCP**: `https://mcp.cal.com/mcp`, Streamable HTTP transport with **OAuth 2.1**; no API
  key needed — the AI client walks the user through an authorization flow granting the server access to
  **your Cal.com account**. It wraps Cal.com API v2 (bookings, event types, schedules). Tools can be
  filtered with `?toolsets=bookings,availability`. It supports MCP Events, so clients on protocol version
  2026-07-28 are notified of changes instead of polling —
  [Cal.com MCP server docs](https://cal.com/docs/mcp-server)
- A local stdio version exists as `@calcom/cal-mcp`, using an API key, requiring Node.js 18+ — same source.
- **Cal.com's docs conflict on tool count**: 34, 76 and 85 tools appear on different pages; 34 appears on
  older-looking pages. Current count not established — same source and its siblings.
- **coss.com** exposes MCP tools for scheduling, including `cancel_scheduling_booking` —
  [coss.com/docs/scheduling](https://coss.com/docs/scheduling)
- **OnceHub** has a separate MCP server targeting AI-agent workflows —
  [OnceHub developer center](https://developers.oncehub.com/docs/overview/introduction/)
- **Composio** sells custom MCP servers as a core unit: Free allows up to 3, Standard and Enterprise any
  number — [Composio pricing](https://composio.dev/pricing)

### Inferences
- `mcp.cal.com` authorises against **a Cal.com account** — the developer's or an individual user's — not
  against a managed multi-tenant estate. It is a tool for a human with an AI client managing their own
  calendar, **not** a way for your SaaS to reach its customers' Outlook calendars. Treat it as out of
  scope for the buy-vs-build decision.
- MCP matters here only if the AI receptionist's own model is to call scheduling tools directly rather
  than through GeekAPI. Given this estate calls GeekAPI server-side over HTTP and GeekAPI owns the
  grounding and verification, an MCP surface adds a hop without adding capability. The REST API is the
  integration point.

### Gaps
- Whether coss.com's MCP surface supports multi-tenant/host-scoped credentials (i.e. your SaaS acting on
  behalf of many hosts) as opposed to a single account. Not determined.

---

## Q6. Data residency and retention — which vendors mirror calendar content?

### Takeaway
**Cronofy and Nylas's synced mode necessarily copy the customer's event content — summaries,
descriptions, attendees, locations — onto vendor servers, and Cronofy publishes no option to turn that
off.** coss.com is the only vendor found that states it stores *only busy times* and explicitly does not
read or store titles, attendees or descriptions from Google and Microsoft. For a product carrying a
zero-data-retention promise, that difference is decisive.

### Cited Findings
- **Cronofy stores event content.** It copies account information and event data into its data store and
  keeps it synchronized. Stored event fields include **summaries, descriptions, start/end, recurrence,
  categories, colors, conferencing URLs, location including latitude and longitude, and attendee email,
  name and status**; managed events also include attachments. Free/busy periods store only from/to times
  — [Cronofy Data Management](https://docs.cronofy.com/policies/data-management/)
- **Cronofy publishes no zero-retention mode.** The Data Management document describes data minimisation
  and short retention but **no option to disable event storage** — same source.
- Cronofy retention windows: default sync query window 42 days past / 201 days future, with reduced or
  extended windows available on Emerging plans and above, configured per application; event data outside
  the window kept up to 31 days; after all authorizations end, third-party events and credentials kept
  30 days, managed events 90 days, account structure 90 days; Smart Invites 30 days after event end;
  recordings and transcripts 7 days after meeting end; application logs up to 90 days; billing records
  and application configuration kept **permanently**; backups every 24 hours kept 7 days — same source.
- Cronofy's security white paper states the longest it retains any event data is **90 days**, and its
  privacy notice says end-user data is generally removed 90 days after a calendar is disconnected —
  [Cronofy security white paper](https://cronofy.com/cronofy-security-white-paper);
  [Cronofy Privacy Notice](https://docs.cronofy.com/policies/privacy-notice/).
  *These do not cleanly reconcile with the 42/201-day window and 31-day tail in the Data Management doc;
  the figures measure different things and the sources do not say so explicitly.*
- **Cronofy data residency: six data centre options.** Each is a separate instance and "Personal Data is
  not transferred between them"; you must create a separate integrator account per instance —
  [Cronofy Data Management](https://docs.cronofy.com/policies/data-management/)
- **Nylas has two modes.** Passthrough: requests go straight to the provider and Nylas does not store
  message or event data. Synced: Nylas keeps the last 90 days of messages for speed; this mode is used
  for IMAP providers — [Nylas data retention](https://developer.nylas.com/docs/dev-guide/platform/data-retention/)
- **Nylas residency: two isolated regions** — US (Iowa) and Europe (London). "Each region is completely
  isolated and data can't pass between them." You create different applications in different regions
  under the same Nylas Organization. Changing region means a new application and re-authenticating every
  user — [Nylas data residency](https://developer.nylas.com/docs/dev-guide/platform/data-residency/)
- Nylas, as a data processor, says users have the right to delete all of their stored data — same
  retention page. Its privacy policy says neither Nylas nor its subprocessors view Restricted Customer
  End-User Data such as email contents, except as described —
  [Nylas privacy policy](https://www.nylas.com/privacy-policy/)
- **coss.com stores busy times only.** "Stored: when a calendar is busy. Nothing else." Titles, attendees
  and descriptions are **not read or stored** from Google or Microsoft. CalDAV servers send whole events
  but "everything except their times is discarded as they're read." Bookings are written to the host's
  calendar as a private "Appointment" with no attendees. The opt-in `host_calendar_details: full` writes
  attendee names, emails and phone numbers into the event description **on the host's own provider
  calendar** — [coss.com/docs/scheduling/calendars](https://coss.com/docs/scheduling/calendars)
- coss.com's scheduling page repeats it: "It never keeps your hosts' event titles" —
  [coss.com/docs/scheduling](https://coss.com/docs/scheduling)
- coss.com Enterprise (from $2,000/mo annual) includes **HIPAA mode with a signed BAA** —
  [coss.com/pricing](https://coss.com/pricing)
- **Composio** lists **Zero data retention** as a feature of its Standard ($18/seat, "coming soon") and
  Enterprise tiers, explicitly **not** on Free — [Composio pricing](https://composio.dev/pricing)
- HIPAA/BAA, per Nylas's marketing comparison: both Nylas and Cronofy offer a BAA on request; Nylas says
  its BAA is pre-signed on paid plans — [Nylas vs Cronofy](https://www.nylas.com/cronofy-alternative/)
- Both claim SOC 2 Type II, ISO 27001, ISO 27701 and GDPR support; Cronofy adds ISO 27018, Nylas adds
  CCPA and GLBA. Cronofy advertises 99.99% uptime on every plan; Nylas offers a contractual SLA only on
  Enterprise — same source, Nylas marketing.

### Inferences
- **Cronofy is the vendor to flag against a zero-data-retention promise.** It necessarily mirrors event
  summaries, descriptions, attendee names and emails, and locations, for a window measured in months,
  with no documented off switch. If a receptionist tenant's calendar contains "Consult — Jane Doe,
  oncology", that string sits in Cronofy's store. Short retention is not zero retention, and a BAA is a
  contract about handling data, not an undertaking not to hold it.
- **Nylas's passthrough mode is the architectural answer to ZDR**, but the documentation I read describes
  passthrough/synced in terms of *messages* and names IMAP as the synced case. Whether Google and
  Microsoft **calendar** reads are passthrough — and whether that is the default or must be configured —
  is the question to settle before Nylas could be called ZDR-compatible. Not determined (see Gaps).
- **coss.com's model is the closest fit to a ZDR product by construction, not by policy.** "Store busy
  times, never read titles" is a design decision enforced at the read, equivalent in kind to the
  fail-closed rules this estate already applies. It also means coss.com **cannot** offer features that
  need event content — which is a feature, not a limitation, for this buyer.
- Note the asymmetry worth stating to Jeff: a vendor that stores less also knows less. coss.com cannot
  tell you *why* a slot is busy. For an AI receptionist that only needs "free or not", that is sufficient.
- Residency: Cronofy's six isolated data centres are the strongest residency story and Nylas's two
  regions the second. coss.com's residency position was not established.

### Gaps
- **Whether Nylas calendar access for Google and Microsoft Graph is passthrough by default**, and whether
  passthrough can be enforced. The retention page describes the two modes but frames synced around
  messages and IMAP. **Not determined — this is the decisive unknown for Nylas under ZDR.**
- coss.com's data residency (where it hosts, whether EU hosting exists) — its privacy page was not read.
  Not determined.
- coss.com's retention period for the busy-time data and booking records it does keep. Not determined.
- A third-party review (buildbetter.ai) claims Nylas keeps email content and calendar data until account
  deletion, contradicting the official docs' 90 days. The official docs are the better source; the
  conflict is noted rather than resolved —
  [buildbetter.ai review](https://blog.buildbetter.ai/do-they-own-your-data-nylas-privacy-policy-reviewed/)
- Cronofy's three retention figures (42/201-day window, 31-day tail, 90-day maximum) are not reconciled
  by any single Cronofy document I read.

---

## Q7. Cal.com specifically — mcp.cal.com vs REST API v2 vs Platform vs self-host

### Takeaway
**Cal.com's third-party/OEM offering appears to have been renamed and moved to coss.com**, which sells
Scheduling as an API at $0.10 per confirmed booking on a $25/month floor, supports Google + Microsoft +
CalDAV, supplies its own OAuth apps, and stores only busy times. That — not `mcp.cal.com`, not the
$12/user Teams plan, not self-hosting — is the thing that lets a third-party SaaS connect its own
customers' Outlook calendars at a price a pre-launch company can pay.

### Cited Findings
- **The four things are distinct:**
  - `cal.com/pricing` sells Cal.com *the scheduling app* per seat: Free (1 user), Teams $12/user/mo,
    Organizations $28/user/mo, Enterprise custom — [cal.com/pricing](https://cal.com/pricing)
  - `cal.com/platform/pricing` **did not render Platform pricing** when fetched on 2026-11-20; it served
    the same per-seat plans with no per-booking or per-user Platform figures —
    [cal.com/platform/pricing](https://cal.com/platform/pricing)
  - **Cal.com's own localized pricing page redirects OEM buyers away**: it says the listed plans are for
    using Cal.com itself, and points "marketplaces and platforms" to **coss.com Scheduling**, which
    "provides hosts, availability, calendar sync, and bookings through a single API key" —
    [cal.com/es/platform/pricing](https://cal.com/es/platform/pricing)
  - `coss.com` carries the footer **"© 2026 Cal.com, Inc."** — [coss.com/scheduling](https://coss.com/scheduling)
  - `mcp.cal.com/mcp` is an MCP wrapper over Cal.com API v2, authorised by OAuth 2.1 against **a Cal.com
    account** — [Cal.com MCP server docs](https://cal.com/docs/mcp-server)
- **Cal.com Platform (atoms/managed users) still exists in the docs**: managed users live in Cal.com's
  database, need no Cal.com account, and their booking pages live on the developer's platform. Requires
  a Cal.com OAuth client, per-user managed-user creation with stored access/refresh tokens, a backend
  refresh endpoint, and `@calcom/atoms` — [Cal.com Platform quickstart](https://cal.com/docs/platform/quickstart)
- **Platform tier prices reported by search, from localized Cal.com pages, not directly verified by me:**
  Starter free up to 25 bookings/mo then $0.99/booking; Essentials $299/mo up to 500 bookings then
  $0.60 overage; Scale $2,499/mo (the Arabic page says up to 5,000 bookings, $0.50 overage); Enterprise
  custom with unlimited volume. **I could not render these on an English Cal.com page on 2026-11-20** and
  they are an order of magnitude more expensive than coss.com's published rates, which suggests they may
  be the superseded pricing. Treat as unconfirmed.
- **coss.com Scheduling, confirmed directly** (see Q2 for the full table): Free $0; Pro $25/mo as usage
  credit; Scale $250/mo; Enterprise from $2,000/mo annual; **$0.10 per confirmed booking**; $0.99 per 30
  host-days beyond included; holds, reschedules and sandbox not charged —
  [coss.com/pricing](https://coss.com/pricing), [coss.com/scheduling](https://coss.com/scheduling)
- **coss.com does let a third-party SaaS connect its own customers' Outlook calendars**: hosts connect
  Google, Microsoft or CalDAV through consent screens, and "you can present this flow in your own UI or
  an embedded host portal" — [coss.com/scheduling](https://coss.com/scheduling)
- **Self-hosting**: Cal.com's FAQ says "for commercial use, self-hosting the full Cal.com product is part
  of our Enterprise offering". The community edition has moved: Cal.com's blog says it went from
  **AGPL 3.0 to MIT** as **Cal.diy**, shipping API v2 only with API v1 removed, and that the production
  codebase moved from a public repository to a private one —
  [Cal.com blog: cal.diy, open source to closed source](https://cal.com/blog/cal-diy-open-source-to-closed-source)
- Older sources still describe Cal.com as AGPLv3 with "Singleplayer APIs" open and "Multiplayer APIs"
  commercial — [bestofjs listing](https://bestofjs.org/projects/cal.com). This conflicts with the blog
  above; the blog is the more recent primary source.

### Inferences
- **Answer to the direct question** — "which of those lets a third-party SaaS connect ITS OWN customers'
  Outlook calendars, and what does it cost":
  - `mcp.cal.com` — **no.** It authorises one Cal.com account via OAuth 2.1 for an AI client. Not
    multi-tenant infrastructure.
  - REST API v2 on a seat-priced Cal.com plan — **only by giving every customer a Cal.com seat**
    ($12–$28/user/mo), which is both expensive and a visible third-party product in your onboarding.
  - **Cal.com Platform / coss.com Scheduling — yes.** This is the OEM path. On coss.com's published rates
    that is **$25/month plus $0.10 per confirmed booking**, with coss.com's own Google/Microsoft OAuth
    apps and no Microsoft registration of your own.
  - Self-hosting — **yes technically, but it hands you back the entire Microsoft problem**: you register
    the Azure app, you do publisher verification, you store and refresh every customer's tokens, you
    patch the server. Plus an Enterprise licence for commercial self-hosting of full Cal.com. It is the
    "build" option wearing a "buy" label.
- The strong impression from the pages is that **Cal.com has spun its OEM/API product out under the
  coss.com brand** and that the `/platform/pricing` tiers found via search are the prior generation.
  This is an inference from the footer, the redirect on Cal.com's own pricing page, and the fact that the
  English Platform pricing page no longer renders those tiers. **It is not a statement either company
  made**, and it should be confirmed with Cal.com/coss sales before it is relied on — the whole
  recommendation rests on it.
- coss.com's billing shape fits an AI receptionist unusually well: you pay when a booking is confirmed,
  not per connected account per month. A tenant whose receptionist takes 5 calls a month costs $0.50,
  not $1.39 (Cronofy) or $1.50 (Nylas) in standing account fees. The risk is the reverse: a high-volume
  tenant's cost scales with success. At $0.10/booking the crossover against Nylas's $1.50/calendar-account
  is ~15 bookings per host per month.

### Gaps
- **Whether coss.com is formally the successor to Cal.com Platform, and whether Cal.com Platform's
  per-booking tiers ($299/mo Essentials etc.) are still sold.** Not determined. This is the single
  question to put to Cal.com/coss sales first.
- Whether coss.com publishes an SLA, uptime history or status page. Not determined.
- coss.com's company maturity and support model at the $25/mo tier. Not determined.
- Cal.diy's licence terms in the actual LICENSE file, and which API v2 endpoints are MIT vs commercial.
  The blog and third-party summaries conflict and I did not read the repository.
