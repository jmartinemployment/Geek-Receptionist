# Plan: connecting to the client's own calendars and CRMs

Jeff, 2026-11-20: *"Clients bring their own booking, there are many common calendars we need to be able to connect to"*,
then *"Many CRMs we need to be able to connect to."*

**What this is for: the client keeps their calendar and their CRM where they already are, and the receptionist reaches into
it.** We hold no customer list, no appointment book and no contact record of our own — which is the same posture Zero Data
Retention already takes, applied to the systems the business runs on. The integration surface *is* the product; today it has
one working wire.

## The count, verified rather than recalled

| Kind | Provider | State |
|---|---|---|
| Calendar | `google_calendar` | **real** — OAuth, token refresh, tools, appointments |
| Calendar | `outlook` | a string in `VoiceMcpProviders` and a DB CHECK constraint. No OAuth, no client, no tool |
| Calendar | `cal_com` | same |
| CRM | `hubspot` | same — **and filed as a calendar**, see below |
| Storage | `google_drive` | real, and not a calendar |
| CRM | anything else | **zero occurrences anywhere in the receptionist path** |

Calendly, Acuity, Square, Jobber, Housecall Pro, ServiceTitan, Salesforce, Zoho, Pipedrive, GoHighLevel: nothing.

Two names that read as live claims and are not:

- **`VoiceMcpProviders.Calendars` contains HubSpot**, under the comment *"The providers an appointment can come from: a
  calendar, never a storage connection."* HubSpot is a CRM. `google_drive` already had to be carved out of that list with
  its own "Not a calendar" note — the list is carrying three different kinds of connection and labelling them all calendars.
- **`VoiceCredentialProtector`'s doc comment** says it protects *"the calendar and CRM OAuth"* secrets. There is no CRM
  OAuth. Same defect class as `EmergencyKeywords`, which stores, validates and round-trips while nothing reads it.

## The good news, and it decides the shape of this plan

**The call path is already provider-generic. Only the OAuth half is Google-shaped.**

- `CalendarTools.CallAsync(tenantId, **provider**, tool, arguments)` already takes the provider as a parameter.
- `McpToolDefinition(Name, Description, InputSchema)` is documented *"exactly as the provider describes it: nothing here is
  written by us."* The model calls whatever tools a provider offers; we do not hand-map fields.
- `McpGatewayClient` passes the tenant's decrypted token in the body of one call, logs no token, no argument and no content,
  and never retries.
- `tenant_mcp_connections` already stores one connection per tenant per provider, with both tokens encrypted.

So this is not a rewrite. **A new provider is an OAuth entry, an MCP server behind the gateway, a migration, and a catalog
entry.** The seam exists; three places assume there is only one thing on the other side of it.

## The three Google-shaped places

1. **`McpConnectionService` is hardwired to `GoogleCalendarOAuth`.** `BeginAsync` calls `GoogleConnections.For(provider)` and
   returns `ProviderNotSupported` for anything else — correct, fail-closed, and the reason nothing can be connected today.
   The authorization URL, the code exchange and the refresh are all Google's.
2. **`GoogleConnections` is the right record with the wrong scope.** `GoogleConnection(Provider, Scopes, ExternalId,
   PartialGrantMessage)` is exactly the per-provider descriptor this needs — it just has no room for *whose* OAuth endpoints,
   client id and secret to use, because there has only ever been one.
3. **`CalendarToolCatalog` is not per-provider, and this one is a bug waiting for the second connection.** `ToolsAsync` asks
   the gateway for *every* tool it offers and caches one list "the same for every tenant." The moment a second provider is
   behind the gateway, a tenant connected only to HubSpot is offered Google Calendar's tools, and the model will try to call
   one. It fails at the gateway rather than silently doing the wrong thing, which is the right failure — but it is a failure
   on a live call, and the model wasted the turn.

## Stages

### Stage 1: the provider registry

`GoogleConnections` becomes `McpProviders` — every provider, each carrying what differs: display name, kind
(**calendar · crm · storage**, replacing the one list that conflates them), OAuth authorization and token endpoints, the
client credentials' variable names, scopes, external id, and the partial-grant sentence. `McpConnectionService` takes an
OAuth client resolved from that entry instead of `GoogleCalendarOAuth` directly; the state sealing, the tenant check, the
"refuse unless the approving owner matches the sealed tenant" rule and the encryption are untouched, because none of them is
Google-specific.

A provider with no credentials configured stays `OAuthNotConfigured` and is **not offered**: a connect button that cannot
complete is worse than an absent one.

### Stage 2: the catalog becomes per-provider

`ToolsAsync(provider, …)`, cached per provider, and a tenant is offered only the tools of the providers it has actually
connected. This lands **before** the second provider, not with it.

### Stage 3: one second provider, end to end

Breadth comes from repetition, so the second one is the one that proves the seam — connect, refresh, call a tool, book,
disconnect, reconnect. **Which provider is a market decision and yours.** What this plan asserts is only that the second one
is done completely before the third is started, because every shortcut taken on the second is taken four more times.

What it needs beyond Stage 1: an **MCP server for it behind `geek-mcp-gateway`**. That is where the breadth actually lives —
GeekAPI never speaks a vendor's API, it speaks MCP, and the gateway speaks the vendor. A vendor with a published MCP server
is cheap; one without needs a server written, and that is the real per-provider cost to weigh when choosing.

### Stage 4: the database stops being a second list

`provider` is CHECK-constrained in two places — `tenant_mcp_connections` (`ck_tenant_mcp_connections_provider`, migration
`0078`) and `appointments.mcp_provider` (`0060`). Both enumerate providers in SQL. Every new provider is therefore a
migration, and the enum in `VoiceRecords.cs` can drift from the constraint — which is exactly the failure mode the language
registry avoided by deliberately not adding a CHECK constraint in `0085`.

Do the same here: **drop the CHECK constraints and let the code's list govern**, with a test binding `VoiceMcpProviders` to
the registry. One list, in the place that can refuse a connection with a message.

### Stage 5: the names that will be read as claims

`CalendarTools`, `CalendarToolCatalog`, `CalendarToolbox`, `calendar_not_connected`, `GoogleConnections` — every one says
*calendar* about something that will be reaching a CRM. This project's own rule: *"the test for an occurrence is not 'does
this execute' — it is 'can this be read as evidence.'"* Rename with the registry, not after, so no one greps `Calendar` and
concludes the product only books. `calendar_not_connected` stays as a code where a *calendar* is genuinely what was missing,
and gains a sibling for a CRM.

### Stage 6: the questions, which are the client's

Two signup questions, and they are askable immediately because neither needs a working connection:

- **"Which calendar does your business use?"** — this is the sixth signup step I wrongly reported as blocked. *Turning
  booking on* needs a working calendar and is rightly refused without one; *asking which calendar they use* is a fact about
  their business, like their hours. The connection happens at first sign-in.
- **"Which CRM, if any?"** — same shape.

Both offer only what can actually be connected, plus "something else", which records what they said and promises nothing.
Wording is Jeff's.

## What must not happen

- **No per-vendor API client in GeekAPI.** It speaks MCP to the gateway and nothing else. A vendor SDK in the receptionist
  path is the thing this architecture exists to prevent.
- **No field mapping written by us.** Tool definitions come from the provider verbatim; the model reads the schema. The
  moment we hand-map a CRM's contact fields we own every schema change that vendor ships.
- **No copy of their data.** We read at call time and write back. A cached contact list is the retention this product does
  not do, and for outbound it is the exact thing `implementing-outbound-calling.md` forbids as "the ledger by another name."
- **No provider offered before it works.** The three names sitting in the enum today are the current version of that
  mistake.

## What this unblocks

`implementing-outbound-calling.md` rests on *"the client's store holds the list, we read it when a call is due"* — and I
scoped its Stage 4 around Google Calendar because that was the only connectable thing, which quietly narrowed outbound to
appointment reminders. **Follow-up, reactivation and invoice calls read from a CRM.** They stay unbuildable until this plan
lands, and that dependency belongs in writing rather than discovered later.
