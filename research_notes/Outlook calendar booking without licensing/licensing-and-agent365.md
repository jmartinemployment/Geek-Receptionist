# Microsoft 365 licensing for third-party Graph calendar access, and the Agent 365 / Work IQ Calendar MCP route

Research date: 2026-11-20. All prices USD, commercial list, per user per month.
Framing throughout: a 1–20 person business that already pays for Microsoft 365 Business
Standard (or similar) and will not buy an add-on.

## Q1. Does delegated Microsoft Graph calendar access require any licence beyond the one that already gives the user an Exchange Online mailbox? Is there per-API, per-call or "premium" licensing for calendar read/write?

### Takeaway

No. Microsoft classifies calendar CRUD as a **standard API**, explicitly "available as part of the
user license without additional costs", and the calendar APIs do not appear on Microsoft's metered
API list. The only licence the business needs is the one that already gives the user an Exchange
Online mailbox; nothing extra is bought, and there is no per-call charge.

### Cited Findings

- Microsoft's own framing: "Microsoft Graph includes APIs that are available at no additional cost with [user subscription licenses] and APIs and services that are metered." — [Overview of metered APIs and services in Microsoft Graph](https://learn.microsoft.com/en-us/graph/metered-api-overview)
- "Most Microsoft Graph APIs are standard APIs. These APIs perform standard operations (create, read, update, delete) on customer content and administrative endpoints… **Access to standard APIs within the defined usage thresholds is available as part of the user license without additional costs.**" — [Overview of metered APIs and services in Microsoft Graph](https://learn.microsoft.com/en-us/graph/metered-api-overview)
- Metering applies to two other categories only: **high-capacity APIs** ("purpose-built, bulk export or import endpoints") and **advanced APIs** ("enriched or aggregated data", example given is `assignSensitivityLabel`). Calendar event CRUD is neither. — [Overview of metered APIs and services in Microsoft Graph](https://learn.microsoft.com/en-us/graph/metered-api-overview)
- Microsoft commits that moving an included API to metered would be a breaking change: "In the event that a Microsoft Graph API that is included with user subscription licenses becomes metered, that would be a non-backward compatible change and the versioning, support, and breaking change policies for Microsoft Graph would apply." — [Overview of metered APIs and services in Microsoft Graph](https://learn.microsoft.com/en-us/graph/metered-api-overview)
- Accessing metered APIs requires the app be "associated with an active Microsoft Azure subscription" — i.e. if calendar were metered you would need an Azure sub to call it. You do not. — [Overview of metered APIs and services in Microsoft Graph](https://learn.microsoft.com/en-us/graph/metered-api-overview)
- The permissions for `GET /me/events` are `Calendars.ReadBasic`, `Calendars.Read`, `Calendars.ReadWrite` for **Delegated (work or school account)**, **Delegated (personal Microsoft account)** and **Application** alike. No licence, SKU or add-on is named anywhere on the reference page. — [List events — Microsoft Graph v1.0](https://learn.microsoft.com/en-us/graph/api/user-list-events)
- Calendar resources (`event`, `eventMessage`, `calendar`, `calendarGroup`, `outlookCategory`, `attachment`, `place`) are listed under the **Outlook service** in the throttling doc, i.e. an ordinary first-party workload, not a premium surface. — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)

### Inferences

- "Graph connector / premium" licensing is a different product line (Copilot Connectors / Graph
  connectors index content *into* Microsoft Search and Copilot, and Graph Data Connect is a bulk
  export product). Neither is involved in reading or writing `/me/events`. A receptionist that
  reads free/busy and creates events touches none of the paid surfaces.
- Practically: a Business Standard tenant can authorise a third-party app via OAuth and the app can
  read and write that user's calendar with zero incremental Microsoft spend. The cost is the
  mailbox licence they already have.

### Gaps

- I did not fetch <https://learn.microsoft.com/en-us/graph/metered-api-list> directly to enumerate
  the metered list and show calendar's absence. The category definitions on the overview page are
  the stronger citation anyway, but a report that wants "calendar is not on the list" stated as a
  verified fact should fetch that page.
- I found no single Microsoft sentence of the form "the calendar API is free". The argument is
  assembled from the metered-API taxonomy. That is Microsoft's own taxonomy, but it is an
  inference one step removed from a direct quote.

## Q2. Which Microsoft 365 / Office 365 plans include an Exchange Online mailbox with calendar? Cheapest? Which plans a small business might have do NOT include a mailbox?

### Takeaway

Business Basic is the cheapest Microsoft 365 plan with a mailbox — **$7.00/user/month** from
1 July 2026 (was $6.00). Business Standard is **$14.00** (was $12.50). The trap is
**Microsoft 365 Apps for business**, which bundles the Outlook *app* but no mailbox, so there is no
Outlook calendar to connect at all.

### Cited Findings

- Commercial US list prices effective **1 July 2026**, from Microsoft's own packaging/pricing
  update page — [Microsoft 365 packaging and pricing updates (2026)](https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates):

  | Plan | Old | New (from 2026-07-01) |
  |---|---|---|
  | Business Basic (with Teams) | $6.00 | **$7.00** |
  | Business Basic (no Teams) | $4.40 | $5.40 |
  | Business Standard (with Teams) | $12.50 | **$14.00** |
  | Business Standard (no Teams) | $9.29 | $10.79 |
  | Business Premium (with Teams) | — (not shown as changed) | **$22.00** |
  | Business Premium (no Teams) | — | $18.79 |
  | Office 365 E1 (with Teams) | — (not shown as changed) | $10.00 |
  | Office 365 E3 (with Teams) | $23.00 | $26.00 |
  | Microsoft 365 E3 (with Teams) | $36.00 | $39.00 |
  | Office 365 E5 (with Teams) | $38.00 | $41.00 |
  | Microsoft 365 E5 (with Teams) | $57.00 | $60.00 |

- "Existing customers remain on current pricing until renewal." The pricelist "is subject to change and may vary by country and currency." — [Microsoft 365 packaging and pricing updates (2026)](https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates)
- That Microsoft page lists **no Exchange Online standalone plans and no Microsoft 365 E1 SKU**, so Exchange Online Plan 1 pricing is not confirmed from it. — [Microsoft 365 packaging and pricing updates (2026)](https://www.microsoft.com/en-us/licensing/news/2026-m365-packaging-pricing-updates)
- **Microsoft 365 Apps for business has no mailbox.** A Microsoft Q&A answer states it "provides the full suite of Office applications, including Outlook, but does not include a mailbox or email service", and that you can add an Exchange Online Plan 1 mailbox (50 GB) alongside it. This is Microsoft-hosted community support, not a policy page. — [Microsoft Apps for Business 365 w/o Microsoft Exchange / Email — Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/1190555/microsoft-apps-for-business-365-w-o-microsoft-exch)
- Microsoft's no-Teams pricing page lists Apps for business at **$10.00/user/month** and leaves the mailbox-storage row **blank** for that plan while Business Basic, Standard and Premium all list Exchange mailbox storage. — [Microsoft 365 Business pricing: plans without Teams](https://www.microsoft.com/en-us/microsoft-365/business/no-teams-plans-and-pricing) (figure taken from a search snippet of that page; the page itself timed out on fetch)
- A reseller blog reports the Business plans' Exchange Online mailbox storage doubling from 50 GB to 100 GB with the 2026 changes. Third-party, unverified on a Microsoft page. — [office-watch.com](https://office-watch.com/2026/microsoft-365-business-price-increase-2026/)

### Inferences

- Mailbox-bearing plans a 1–20 person business plausibly holds: Business Basic, Business Standard,
  Business Premium, Office 365 E1/E3/E5, Microsoft 365 E3/E5, and Exchange Online Plan 1/2
  standalone. All of these give the user an Exchange Online mailbox and therefore a Graph calendar.
- The only realistic "they're on Microsoft but there's nothing to connect" case is **Microsoft 365
  Apps for business** (or Apps for enterprise), where email is hosted elsewhere — GoDaddy, Google
  Workspace, an ISP. The signup/onboarding flow should detect this rather than assume it, because
  the owner will still say "we use Outlook": they mean the desktop app.
- A business on Apps for business whose email is actually Google Workspace needs the Google
  Calendar path, not the Graph path.

### Gaps

- **Exchange Online Plan 1 current list price not verified** on any Microsoft page in this research.
  Do not quote a figure without checking <https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans>.
- The Microsoft business-plan comparison page timed out, so Business Basic/Standard mailbox
  inclusion is argued from the pricing page and the Q&A answer rather than the plan comparison
  table. This is not seriously in doubt but is worth one confirming fetch.
- Whether Business Premium and Office 365 E1 prices changed on 1 July 2026 is unclear: the
  Microsoft page shows new prices with no old price or change percentage for those two rows.

## Q3. Does a free personal Outlook.com account have a Graph-accessible calendar at no cost?

### Takeaway

Yes. Microsoft Graph's calendar APIs explicitly support **Delegated (personal Microsoft account)**
permissions, and the Microsoft APIs Terms of Use name Outlook.com as a covered service. A free
Outlook.com user can OAuth a third-party app into their calendar with no purchase.

### Cited Findings

- `GET /me/events` permissions table lists a **"Delegated (personal Microsoft account)"** row with `Calendars.ReadBasic, Calendars.Read, Calendars.ReadWrite` — the same scopes as work/school. — [List events — Microsoft Graph v1.0](https://learn.microsoft.com/en-us/graph/api/user-list-events)
- The Microsoft APIs Terms of Use cover "any other Microsoft APIs that enable access to data in services that are part of **Outlook.com**, OneDrive.com, and Yammer". — [Terms of Use — Microsoft APIs](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- Personal Microsoft accounts have no tenant and no admin consent step; the "application" (app-only) permission path does not apply to them — the Graph permissions model for MSA is delegated-only in practice. — inferred from the permissions table structure in [List events](https://learn.microsoft.com/en-us/graph/api/user-list-events)

### Inferences

- A sole trader on a free outlook.com address can be onboarded by the same delegated OAuth flow as a
  Business Standard tenant. There is no licence gate.
- But app-only / unattended access is not available for a personal account, so a receptionist that
  wants to act without the owner being signed in must hold and refresh a delegated token. That is a
  token-lifetime engineering problem, not a licensing one.

### Gaps

- I did not verify Outlook.com-specific throttling. The Outlook service limits page describes
  "a specific app accessing a specific user or group mailbox" without distinguishing MSA from
  work/school, so the same limits plausibly apply, but that is unconfirmed.
- Whether `findMeetingTimes` and `getSchedule` (the free/busy helpers a receptionist wants) support
  personal Microsoft accounts was not checked. These are Exchange-side features and may be
  work/school only.

## Q4. Graph throttling limits relevant to a receptionist checking availability during a live phone call

### Takeaway

The binding limit is not the request count — it is **four concurrent requests per app per mailbox**.
10,000 requests per 10 minutes per app per mailbox is far more headroom than a small business needs,
but a receptionist that fans out several Graph calls in parallel while the caller waits will hit the
concurrency ceiling first.

### Cited Findings

- Outlook service, **limits per mailbox** — "The Outlook service applies limits to each app ID and mailbox combination — that is, a specific app accessing a specific user or group mailbox. **Exceeding the limit for one mailbox doesn't affect the ability of the application to access another mailbox.**" — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)

  | Limit | Applies to |
  |---|---|
  | **10,000 API requests in a 10-minute period** | v1.0 and beta endpoints |
  | **Four concurrent requests** | v1.0 and beta endpoints |
  | **150 MB upload (PATCH, POST, PUT) in a 5-minute period** | v1.0 and beta endpoints |

- The per-mailbox scoping is the key multi-tenant property: one noisy customer cannot throttle another customer's calendar for the same app. — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- Global ceiling across every service and tenant: **130,000 requests per 10 seconds per app across all tenants**. — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- "Any request can be evaluated against multiple limits… the first limit to be reached triggers throttling behavior." — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- JSON batching against the same mailbox: "Microsoft Graph sends the Outlook service up to four individual requests from the batch at a time… Since Microsoft Graph sends only up to four requests to run in parallel, the execution of that batch stays within Outlook's concurrency limits for the same mailbox, **regardless of the app used**." With `dependsOn`, requests run strictly sequentially and "up to four such batch requests [can] run concurrently". — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- The Outlook service's throttling applies to "the public cloud and national cloud deployments". — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- Separately: the **Places API** (preview, for room/resource lookup) is capped at **three calls per second**. — [Microsoft Graph throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)

### Inferences

- 10,000 requests / 10 min per mailbox = ~16.7 req/s sustained against a single calendar. A 20-person
  business taking even 200 calls a day, each costing a handful of calls, is three orders of
  magnitude below it. **Throttling is not a reason to avoid the Graph route.**
- The design constraint is latency, not quota: during a live call, use `getSchedule` (free/busy for
  several mailboxes in **one** request) or `findMeetingTimes` rather than N parallel
  `listCalendarView` calls, because four-at-a-time is the hard parallelism ceiling per mailbox.
- JSON batching is a correctness win, not just a performance one: Graph itself enforces the
  four-wide window inside a batch, so a batched fan-out cannot self-throttle.
- `Retry-After` handling is still mandatory — the limits are per app ID, so an app serving many
  tenants must back off per-mailbox rather than globally.

### Gaps

- No documented latency SLA for Graph calendar reads. For a receptionist speaking to a caller, p99
  latency matters more than quota, and Microsoft publishes nothing I found on it.
- The throttling page does not say whether `findMeetingTimes` or `getSchedule` count as one request
  or as one-per-mailbox-queried against the 10,000.

## Q5. What is Microsoft Agent 365? What is "Work IQ" / the mcp_CalendarTools MCP server, and exactly what does it require?

### Takeaway

Agent 365 is a **per-user-licensed governance control plane for AI agents** — GA since 1 May 2026,
$15/user/month standalone or bundled in Microsoft 365 E7 at $99 — with enterprise prerequisites
(E5, or E3 + Defender + Purview suites) and Business Premium + the SMB Defender/Purview suites for
SMB. `mcp_CalendarTools` is a **preview**, per-tenant Agent 365 MCP endpoint that Microsoft's own
docs say is **backward-compatibility only and not for new projects**. Its successor, Work IQ MCP,
is **billed by Copilot Credits** through an Azure subscription. Neither is a free alternative to
calling Graph.

### Cited Findings

**Agent 365 licensing and availability**

- Microsoft's licensing FAQ: enterprise customers "need Microsoft 365 E5 (ME5) or Microsoft 365 E3" plus **both** the Defender Suite and the Purview Suite. — [Microsoft Licensing FAQ 122](https://www.microsoft.com/licensing/faqs/122)
- **SMB:** Microsoft 365 **Business Premium** is the base; Defender Suite for SMB and Purview Suite for SMB are needed "to unlock Agent 365 functionality", though the page says they are not formal prerequisites. — [Microsoft Licensing FAQ 122](https://www.microsoft.com/licensing/faqs/122)
- Frontline: M365 F1/F3 plus Defender and Purview Suite FLW. Education: A5 or A3 for Faculty plus the Edu suites. — [Microsoft Licensing FAQ 122](https://www.microsoft.com/licensing/faqs/122)
- **Pricing:** included in Microsoft 365 E7 at **$99/user/month** list, or **standalone at $15/user/month**. "There are no consumption-based costs for Agent 365 yet." Windows 365 for Agents is separate and pay-as-you-go at **$0.40 per VM per hour**. — [Microsoft Licensing FAQ 122](https://www.microsoft.com/licensing/faqs/122)
- **Who is licensed:** "Agents do not require their own licenses." Users who delegate access to agents (OBO agents) must be licensed; the owner/sponsor/manager of agents with their own access must be licensed. Users needing only foundational capabilities do not. "ME3 + Copilot users aren't eligible unless they also meet the ME5 or Defender/Purview requirements." — [Microsoft Licensing FAQ 122](https://www.microsoft.com/licensing/faqs/122)
- **GA date:** Microsoft announced general availability on **1 May 2026** ("general availability starts today"), alongside the Microsoft 365 E7 suite. First unveiled at Ignite 2025. — [Microsoft Agent 365 now generally available (Microsoft Security Blog, 2026-05-01)](https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations); [Redmond Magazine](https://redmondmag.com/articles/2026/05/01/microsoft-agent-365-goes-live-as-company-unveils-e7-suite.aspx)
- Conflict worth flagging: the licensing FAQ page still hedges with "subject to applicable licensing terms and availability at GA", which reads as pre-GA language on a now-GA product. Third-party blogs also report an **E5 prerequisite taking effect 1 June 2026** and preview features being withdrawn from unlicensed tenants from **1 July 2026**, and note the admin center had not yet been updated to match. — [blog.topedia.com](https://blog-en.topedia.com/2026/06/new-licensing-prerequisites-for-agent-365/); [samexpert.com](https://samexpert.com/agent-365/)

**mcp_CalendarTools — the Agent 365 Calendar MCP server**

- Server ID **`mcp_CalendarTools`**; tenant-level URL **`https://agent365.svc.cloud.microsoft/agents/tenants/{tenantId}/servers/mcp_CalendarTools`**; display name "Calendar"; "Tools for calendar operations like creating, updating, retrieving events, managing invites, and checking availability." — [Calendar reference (preview), Microsoft Copilot Studio / Agent 365](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar)
- Page is banner-marked **"This is a preview feature… Preview features have restricted functionality and aren't meant for production use. Microsoft might change preview MCP tool names and parameters."** — [Calendar reference (preview)](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar)
- **Deprecation-in-place notice, verbatim:** "Application-specific Microsoft 365 MCP tools (Copilot, Calendar, Mail, SharePoint, OneDrive, Teams, User, and Word) are **only intended for backward compatibility purposes and shouldn't be used in production environments or new projects**. For new projects that require access to Microsoft 365 resources, use Work IQ MCP with the Microsoft Copilot harness." — [Calendar reference (preview)](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar)
- Tools are thin wrappers over Graph, named `mcp_CalendarTools_graph_*`: `acceptEvent`, `cancelEvent`, `createEvent`, `declineEvent`, `deleteEvent`, `findMeetingTimes`, `getEvent`, `getSchedule`, `listCalendarView`, `listEvents`, `updateEvent`. — [Calendar reference (preview)](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar)
- It is not self-contained: "Calendar MCP relies on `UserprofileMCP` to find users in the organization." — [Calendar reference (preview)](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar)

**Work IQ — the successor**

- "Work IQ is a workplace intelligence layer that combines Microsoft 365 data with contextual understanding so agents can reason over work and take action." Protocols: A2A, local MCP, remote MCP, REST. — [Microsoft Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq-api-overview)
- **Licensing, verbatim:** "Work IQ API is licensed under your agreement governing use of Microsoft Online Services, including the Microsoft Product Terms. **You pay for use of the Work IQ API through a usage-based model that uses Copilot Credits.**" — [Microsoft Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq-api-overview)
- **Tenant prerequisites to enable Work IQ at all:** "A usage-based billing plan set up in Copilot Studio with an Azure subscription and resource group assigned"; "The user assigned to the billing plan"; "A user with **Global Administrator** role for the one-time Work IQ setup". Setup creates the Work IQ service principal (`appId fdcc1f02-fc51-4226-8753-f668596af7f7`) in the tenant. — [Enable your tenant for Work IQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/enable-work-iq)
- **Delegated only:** "Requests run in the context of the signed-in user. On-behalf-of (OBO) flows are supported. **Application-only authentication isn't supported.**" — [Microsoft Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq-api-overview)
- The remote Work IQ MCP server is one consolidated endpoint with generic tools, not a calendar-specific one: entity tools (`fetch`, `create_entity`, `do_action`…), Copilot tools (`ask`, `retrieve`, `list_agents`), schema tools (`get_schema`, `search_paths`). A calendar write is `create_entity /me/events`. The `retrieve` tool is "available in public preview". — [Work IQ MCP overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview)
- A2A base endpoint is `https://workiq.svc.cloud.microsoft/a2a/`. Auth is Entra ID, discovered via `/.well-known/oauth-protected-resource`. — [Microsoft Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq-api-overview); [Work IQ MCP overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview)
- A separate first-party **Work IQ MCP connector** exists for Copilot Studio / Power Automate / Power Apps / Logic Apps, publisher Microsoft, "Availability and capabilities are subject to change", unavailable in GCC, GCC High, DoD and 21Vianet clouds. — [Work IQ MCP — Connectors](https://learn.microsoft.com/en-us/connectors/workiqmcp/)
- A separate marketplace listing, "**Work IQ Outlook Calendar MCP Server (Preview)**", exists in Microsoft Marketplace / Azure AI Foundry with a release date of 19 Nov 2025 and OAuth 2.0 auth. — [Microsoft Marketplace listing wa200009542](https://marketplace.microsoft.com/en-us/product/wa200009542) (listing returned HTTP 403 to automated fetch; details come from search results and the [Azure AI Foundry catalog entry](https://ai.azure.com/catalog/tools/microsoft-outlook-calendar-mcp-frontier/version/1/apiCenter/registry-prod-bl/eastus) — **treat as unverified**)

### Inferences

- **For a 1–20 person Business Standard business, the Agent 365 route is dead on arrival.** The SMB
  prerequisite is Business Premium ($22) before the $15/user Agent 365 licence, plus the SMB
  Defender and Purview suites to actually unlock it. That is a multiple of what they pay today, for
  a capability Graph gives them free.
- **The Work IQ route is also not free.** Copilot Credits are consumption billing against an Azure
  subscription the small business does not have, configured by a Global Administrator through
  Copilot Studio. Even setting price aside, the setup burden on a 5-person plumbing company is
  disqualifying.
- `mcp_CalendarTools`'s tools are literally `*_graph_*` wrappers over the same Graph calls
  (`findMeetingTimes`, `getSchedule`, `listCalendarView`, `createEvent`). The MCP route buys
  governance, discoverability and Copilot integration — **not capability**. Everything the
  receptionist needs is reachable from plain Graph.
- Microsoft's own docs tell you not to build on `mcp_CalendarTools`, and the thing it points to
  instead is metered. There is no "newer, better, still free" path here.
- Strategically for Geek-Receptionist: Agent 365 is a story to tell the *customer's IT person*
  ("we don't need you to buy anything"), not a route to build on. Quoting the $15 + Business
  Premium + suites stack is the contrast that makes the delegated-Graph approach look right.

### Gaps

- **The Marketplace listing for "Work IQ Outlook Calendar MCP Server (Preview)" could not be fetched** (HTTP 403). Its pricing, prerequisites and whether it is the same thing as `mcp_CalendarTools` are unconfirmed. One third-party directory claimed "no free tier or trial"; unverified.
- **Work IQ GA status is ambiguous.** The API overview and MCP overview pages carry no preview banner and the `retrieve` tool is singled out as "public preview", which implies the rest is not — but no page states "generally available". A third-party blog claims GA on 16 June 2026; unverified on a Microsoft page.
- **Copilot Credit cost per Work IQ call is not quantified here.** The pricing lives at <https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-overview-copilot-credits>, which I did not fetch.
- Whether a Microsoft 365 Copilot licence ($30/user/month) is *additionally* required for Work IQ, or whether Copilot Credits alone suffice, is not stated on the pages I read. The licensing paragraph mentions only Copilot Credits.
- The Agent 365 licensing FAQ's "availability at GA" phrasing versus the 1 May 2026 GA announcement is an unresolved inconsistency on Microsoft's own properties.

## Q6. Is there any Microsoft-published remote MCP server for calendar that does NOT require Copilot/Agent 365 licensing?

### Takeaway

**None found.** Every first-party Microsoft calendar MCP surface traced in this research sits behind
either Agent 365 (`agent365.svc.cloud.microsoft`, preview, deprecated-in-place) or Work IQ
(Copilot Credits, Azure subscription, Global Admin setup). The unlicensed path to a Microsoft
calendar is the Graph REST API directly.

### Cited Findings

- The two first-party remote calendar MCP endpoints identified are `mcp_CalendarTools` under `agent365.svc.cloud.microsoft` — [Calendar reference (preview)](https://learn.microsoft.com/en-us/microsoft-agent-365/mcp-server-reference/calendar) — and the Work IQ remote MCP server — [Work IQ MCP overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview).
- Work IQ's own licensing section ties use to Copilot Credits consumption billing. — [Microsoft Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq-api-overview)
- The remaining "Outlook Calendar MCP server" results are all third-party vendors wrapping Graph themselves — Workato, Gumloop, Arcade, and community GitHub projects. — e.g. [Workato Outlook Calendar MCP server](https://docs.workato.com/en/mcp/prebuilt-mcps/outlook-calendar-mcp-server)

### Inferences

- The pattern is deliberate: Microsoft meters the *agentic reasoning layer* (Work IQ, Copilot,
  Agent 365) and leaves the *data plane* (Graph) included with the user's licence. A product that
  does its own reasoning and calls Graph for data pays nothing extra; a product that asks Microsoft
  to reason pays.
- For Geek-Receptionist this is the right side of the line to be on: the voice model does the
  reasoning, Graph supplies free/busy and takes the booking.

### Gaps

- I did not search for a Microsoft-published *local* (stdio) Graph MCP server, e.g. a `@microsoft/mcp` npm package or the `microsoft/work-iq` GitHub repo a directory referenced. A local Graph MCP that merely holds the user's token would sidestep all of the above, and its existence is worth one check — but it would be a convenience over Graph, not a different licensing position.

## Q7. Microsoft restrictions, terms of service, or policy limiting a third-party SaaS from accessing customer calendars at scale

### Takeaway

Yes — the Microsoft APIs Terms of Use permit exactly this use case but fence it tightly. The
binding clauses for a receptionist SaaS are **§3(c)** (email/calendar APIs may only be used for
*syncing* or *backing up* calendar events absent explicit customer permission), **§3(b)(4)**
(no building databases of API data beyond the intended scenario), **§3(b)(5)** (minimum data,
minimum permissions), and **§3(b)(7)** (Microsoft sets and enforces user-count and request limits
"in its sole discretion"). Microsoft also reserves an **audit right** requiring up to two
full-feature instances of the application on request.

### Cited Findings

- **Scope:** the API Terms expressly cover "Outlook APIs in Microsoft Graph API", EWS, IMAP/POP/MAPI, "Exchange online APIs", and APIs accessing Office 365 (Outlook/Exchange) and Outlook.com. — [Terms of Use — Microsoft APIs](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(c), the calendar-specific clause, verbatim:** "Unless you have use permissions **expressly and specifically granted by Customers** in connection with using your Application, you may not use Microsoft email protocols and APIs for any purpose other than: 1. syncing email messages, **calendar events**, and contacts, or 2. backing up email messages, **calendar events**, and contacts." — [Terms of Use — Microsoft APIs](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(b)(4):** "Scrape, build databases or otherwise create copies of any data accessed or obtained using the Microsoft APIs, **except as necessary to enable an intended usage scenario for your Application**". — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(b)(5):** "Request from the Microsoft APIs more than the minimum amount of data, or more than the minimum permissions to the types of data, that your Application needs". — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(b)(6) and (7):** no "unreasonable amount of bandwidth"; and "Microsoft sets and enforces limits on your use of the Microsoft APIs (e.g., **limiting the number of API requests that you may make or the number of users you may serve**), in its sole discretion." — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(b)(12):** no use of API data, "including any data aggregated, anonymized or derived from that data", for advertising or marketing. — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§3(b)(13) and (15):** may not circumvent, or misrepresent, "the need for users to obtain a valid license to the Microsoft application or service that is accessed through the Microsoft APIs". — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§5 privacy obligations:** obtain Data Access Consents before processing; if storing data locally, keep it current and honour corrections/restrictions/deletions; "implement proper retention and deletion policies, **including deleting all data when your user abandons your Application, uninstalls your Application, closes its account with you, or abandons the account**"; maintain a privacy statement "as protective as the Microsoft Privacy Statement"; link to <https://account.live.com/consent/Manage> and/or <https://myapps.microsoft.com> for consent revocation. — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§4 audit right:** "upon request by Microsoft, you will provide us (or an independent auditor acting on our behalf) with **up to two full-feature client account-level instances** to access your Application… to verify your compliance". Microsoft "may restrict or terminate access to the APIs or perform an audit… if you fail to provide adequate information and materials". Security obligations survive five years post-termination. — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§4 enforcement tooling:** Microsoft "may use technology to detect, prevent or limit the impact of any issues caused by your Application", including "security or privacy monitoring regarding scraping, denial of service attacks, user impersonation, application impersonation, or **illicit consent grant(s)**", up to "limiting or terminating your access". — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§10 termination:** Microsoft may suspend or terminate "in our sole discretion at any time, for any reason". On termination you must "comply with Customer's instruction to return or delete any data accessed or obtained through the Microsoft APIs". — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§9(b) liability cap:** Microsoft's total liability to the developer is **USD $5.00 collectively**. — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)
- **§11(j), new:** where the terms conflict with the EU Commission commitments in case AT.40721 (Microsoft Teams), the EU Commitments control — explicitly over §3(b)(7) (sole-discretion limits), §6 (changes), §9 and §10 (termination). Terms last updated **October 2025**. — [Terms of Use](https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use)

### Inferences

- **There is no per-tenant scale cap and no partner-programme gate.** Nothing requires Microsoft's
  approval, certification or a revenue share to serve many customers' calendars. What exists is a
  discretionary power to limit "the number of users you may serve", which is a lever Microsoft
  holds, not a ceiling it has published.
- **§3(c) is satisfied by design** for a receptionist: the customer explicitly grants the permission
  via OAuth consent for the stated booking purpose, and reading availability plus writing a booking
  is closer to "syncing calendar events" than to anything the clause forbids. But the safe reading
  is to rely on the *express customer permission* limb, which means the consent screen and the
  signup form must actually say what the app will do with the calendar.
- **§3(b)(4) + §5(c) bear directly on Geek-Receptionist's ZDR posture and they point the same way.**
  Do not build a shadow copy of the customer's calendar; query free/busy at call time, store the
  minimum (an event id, a tenant id), and delete everything when a tenant cancels. The ZDR default
  already decided this; the API Terms make it contractual rather than a preference.
- **§3(b)(5) argues for `Calendars.ReadWrite` scoped as narrowly as the product allows**, and against
  requesting `Calendars.ReadWrite.All` or app-only tenant-wide access "just in case". If only the
  owner's calendar is booked, ask for the owner's calendar.
- **§3(b)(13)/(15) means the marketing copy must not imply the customer can skip a Microsoft
  licence.** Saying "no extra Microsoft purchase needed" is accurate and allowed; saying "you don't
  need Microsoft 365" to someone whose calendar lives in Microsoft 365 would not be.
- The $5 liability cap and the at-will termination clause are the real commercial risk: a core
  product dependency that Microsoft may cut off at its discretion, with no recourse. Worth stating
  plainly in any plan that makes Outlook booking a headline feature.

### Gaps

- I did not check the **Microsoft Product Terms** or the **Microsoft 365 Partner / Marketplace
  certification requirements**, which may impose publisher verification obligations on a multi-tenant
  app (e.g. Microsoft Partner Network publisher verification to avoid the "unverified publisher"
  consent warning). That warning is a conversion problem for signup even though it is not a
  licensing one, and it is worth a dedicated check.
- No Microsoft-published figure for what "unreasonable" bandwidth or an excessive user count means.
  The throttling limits are the only quantified constraint.
- Whether Microsoft requires a multi-tenant app to undergo **Microsoft 365 App Compliance / Publisher
  Attestation** before tenant admins will consent at scale was not researched.
