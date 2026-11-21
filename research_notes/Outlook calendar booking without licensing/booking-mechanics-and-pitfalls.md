# Outlook / Microsoft 365 calendar booking via Microsoft Graph — mechanics, pitfalls, and Microsoft Bookings as an alternative

Scope: what actually goes wrong in production when an automated agent reads availability and books on a
small business's Microsoft 365 calendar, judged against a live phone call (seconds to answer, a lost
response must never double-book). Research date: 2026-11-20. Every Microsoft Learn page fetched below
carries an `updated_at` in 2025–2026 unless noted.

Labelling convention used throughout: **[DOC]** = Microsoft's own documentation, quoted or closely
paraphrased. **[COMMUNITY]** = forum/Q&A/vendor report, not verified by Microsoft documentation.
**[INFERENCE]** = my reasoning from the cited facts, not stated by any source.

---

## Q1. Reading availability: getSchedule vs calendarView vs findMeetingTimes

### Takeaway

Three different APIs with three different contracts, and only two of them work without a signed-in user:
`findMeetingTimes` has **no application permission at all**, which rules it out for an unattended phone
agent. `getSchedule` is the free/busy read (20 entities, <62 days, Windows time-zone names, a merged
`availabilityView` string); `calendarView` is the event read (recurrences expanded, ISO-8601 offsets,
ignores the timezone Prefer header for its own query params). What each returns about a *private* event
is controlled by the mailbox owner's own Outlook settings, not by the permission granted to the app.

### Cited Findings

**getSchedule**

- `POST /me/calendar/getSchedule` and `POST /users/{id|userPrincipalName}/calendar/getSchedule`. Delegated least-privileged permission `Calendars.ReadBasic`; **Application permission is supported** (`Calendars.ReadBasic`, or `Calendars.Read` / `Calendars.ReadWrite`). Delegated personal Microsoft account: not supported. — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- Request body: `schedules` (collection of SMTP addresses of users, distribution lists, or resources), `startTime` / `endTime` (`dateTimeTimeZone`), `availabilityViewInterval` — "the default is 30 minutes, minimum is 5, maximum is 1440." — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- **Hard limits, stated verbatim**: "**getSchedule** can support looking up free/busy information for up to 20 entities at once. This limit applies to the number of users identified individually or as members of a distribution list, and to the number of resources as well." / "The time period to look up must be less than 62 days." / "If **getSchedule** cannot identify a specified user or resource, it returns a single schedule item and indicates the error." — [Get free/busy schedule of Outlook calendar users and resources](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- Error condition: "When the user's calendar has a time slot that contains more than 1000 entries, a `5006` response code with the message 'The result set contains too many calendar entries. The allowed size is 1000; the actual size is ...' will be returned." — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- `availabilityView` encoding: `0` = free *or working elsewhere*; `1` = tentative; `2` = busy; `3` = out of office. Default slot length 30 minutes. — [Get free/busy schedule](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- Timezone: "By default, the start and end times of the returned schedule items are represented in UTC. You can use a `Prefer` header to specify a time zone" — `Prefer: outlook.timezone="Pacific Standard Time"`. Windows time-zone names, not IANA. — [Get free/busy schedule](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- **Private / detail disclosure is the mailbox owner's call, not the admin's**: getSchedule "can return the free/busy status and working hours of the requested users, or it can also return the **subject**, **location**, and **isPrivate** properties of an event, provided that: the event is marked with low sensitivity level — `normal` or `personal` — AND one or more of the following conditions apply: the requested user's calendar settings allow the signed-in user to view subject lines and locations; the requested user's calendar is shared with the signed-in user." And: "These conditions apply regardless of whether the signed-in user is an administrator in the organization. The requested user has control over the event data returned." — [Get free/busy schedule](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- The response also carries `workingHours` per schedule (daysOfWeek, startTime, endTime, timeZone). In Microsoft's own sample, one user's `workingHours.timeZone` is a plain `{"name": "Pacific Standard Time"}` and the other's is a `#microsoft.graph.customTimeZone` with `bias`, `standardOffset` and `daylightOffset` objects. — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)

**calendarView**

- `GET /users/{id}/calendar/calendarView?startDateTime=...&endDateTime=...`. Returns "the occurrences, exceptions and single instances of events in a calendar view defined by a time range" — i.e. recurrence is expanded server-side. Delegated and Application both supported, `Calendars.ReadBasic` least privileged. — [List calendarView](https://learn.microsoft.com/en-us/graph/api/calendar-list-calendarview?view=graph-rest-1.0)
- **Timezone trap, stated verbatim**: "The values of `startDateTime` and `endDateTime` are interpreted using the timezone offset specified in the value and aren't impacted by the value of the `Prefer: outlook.timezone` header if present. If no timezone offset is included in the value, it is interpreted as UTC." (The Prefer header still governs the *response* times.) — [List calendarView](https://learn.microsoft.com/en-us/graph/api/calendar-list-calendarview?view=graph-rest-1.0)
- "**CalendarView** with `$top` has a minimum value of 1 and maximum of 1000." Results page with `@odata.nextLink`. — [List calendarView](https://learn.microsoft.com/en-us/graph/api/calendar-list-calendarview?view=graph-rest-1.0)
- "The **createdDateTime** and **lastModifiedDateTime** properties of event don't support `$select`." — [List calendarView](https://learn.microsoft.com/en-us/graph/api/calendar-list-calendarview?view=graph-rest-1.0)

**findMeetingTimes**

- **Application permissions: "Not supported."** Delegated (work/school) only, least privileged `Calendars.Read.Shared`. Delegated personal Microsoft account also not supported. Not available in China operated by 21Vianet. — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- Microsoft's own comparison page says it plainly: "**findmeetingtimes** supports only delegated scenarios which require a user to have signed in to the app... **getSchedule** supports both delegated and app-only scenarios." — [Get free/busy schedule](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- Parameters: `attendees`, `locationConstraint`, `timeConstraint` (incl. `activityDomain`), `meetingDuration` (ISO-8601, default 30 minutes if unspecified), `maxCandidates`, `isOrganizerOptional`, `returnSuggestionReasons`, `minimumAttendeePercentage`. — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- `activityDomain`: `work` = "within the user's work hours which are defined in the user's calendar configuration... The default work hours are Monday to Friday, 8am to 5pm in the time zone set for the mailbox"; `personal` adds Sat/Sun; `unrestricted` = all hours all days; `unknown` is deprecated and currently behaves as `work`. — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- Confidence model: "For each attendee, a free status for a specified meeting time period corresponds to 100% chance of attendance, unknown status 49%, and busy status 0%" — averaged over attendees. If `minimumAttendeePercentage` is not specified, findMeetingTimes "assumes a value of 50%." Suggestions returned in UTC by default. — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- **Non-determinism, stated by Microsoft**: "The algorithm used to suggest meeting times and locations undergoes fine-tuning from time to time. In scenarios like test environments where the input parameters and calendar data remain static, expect that the suggested results may differ over time." — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- Empty result carries `emptySuggestionsReason`, intended to be read and used to adjust parameters and call again. — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)

**Throttling (affects all three on a live call)**

- Outlook service limits apply "to each app ID and mailbox combination": **10,000 API requests in a 10-minute period**, **four concurrent requests**, 150 MB upload in a 5-minute period. Exceeding the limit for one mailbox doesn't affect other mailboxes. — [Microsoft Graph service-specific throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- JSON batching against Outlook: "Microsoft Graph sends the Outlook service up to four individual requests from the batch at a time" for unordered batches; `dependsOn` forces strictly sequential execution. — [Throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)
- Global ceiling: 130,000 requests per 10 seconds per app across all tenants; "the specific limits described in this article are subject to change." Throttled responses are `429` with `x-ms-throttle-limit-percentage`, `x-ms-throttle-scope`, `x-ms-throttle-information` headers. — [Throttling limits](https://learn.microsoft.com/en-us/graph/throttling-limits)

### Inferences

- For an unattended phone agent, `findMeetingTimes` is simply unavailable: no app-only permission. Using it would mean holding a *delegated* refresh token for the business owner and refreshing it in the background — which drags in every token-revocation failure mode in Q5. **[INFERENCE]**
- Even if delegated tokens were acceptable, Microsoft's own warning that the suggestion algorithm is fine-tuned over time makes `findMeetingTimes` a poor fit for a system whose offered slots must be reproducible and testable. The agent would be reading a black box out loud to a caller. **[INFERENCE]**
- The workable shape is: `getSchedule` (app-only, one mailbox, one day or week, `availabilityViewInterval` matched to the appointment grid, e.g. 15 or 30) + the business's own rules for opening hours and slot length, held in your own config rather than read from the mailbox. That is one round trip, well inside a conversational pause. **[INFERENCE]**
- `getSchedule`'s `0` meaning "free **or working elsewhere**" is a real hazard: an owner marked "working elsewhere" reads as bookable. If that matters, you must read `scheduleItems[].status` rather than parse `availabilityView`, since `workingElsewhere` is distinguishable there. **[INFERENCE]** (status values appear in Microsoft's sample response.)
- `calendarView` is the better choice only when the agent needs to *reconcile* — e.g. confirm its own previously-created booking still exists, or detect a double-book after the fact — because it returns event ids and `transactionId`. For "is 2pm free", it is strictly more work and more data than getSchedule. **[INFERENCE]**
- The 62-day ceiling on getSchedule is irrelevant for phone booking (callers book days or weeks out), but the 20-entity ceiling matters if the business has many bookable staff: a 25-person salon needs two round trips. **[INFERENCE]**
- The `customTimeZone` shape in `workingHours.timeZone` means any code that assumes a Windows zone *name* will throw on some mailboxes. This is a parse-time failure on real tenants, not a theoretical one — Microsoft put it in their own sample. **[INFERENCE]**

### Gaps

- No Microsoft-documented latency SLO for `getSchedule` or event creation. I found none, so "within seconds on a live call" cannot be asserted from documentation — it has to be measured against a real tenant.
- I did not find a documented Outlook/calendar-specific *rate* limit finer than the per-mailbox 10,000/10-min and 4-concurrent figures; whether a burst of getSchedule calls can trip a shorter-window limit isn't published.

---

## Q2. Creating an event without sending invitations

### Takeaway

Microsoft Graph has **no equivalent of Google Calendar's `sendUpdates=none`**. There is no documented
flag that suppresses the invitation email when an event has attendees. The only reliable way to avoid
mailing anyone is to create the event with **no attendees at all** — an appointment, not a meeting —
which is in fact the right model for a receptionist booking a caller onto the owner's calendar.

### Cited Findings

- The `event` resource's full property list contains no send/notification-suppression property. The nearest relatives are `responseRequested` ("Default is true, which represents the organizer would like an invitee to send a response to the event") and `hideAttendees` ("When set to `true`, each attendee only sees themselves in the meeting request and meeting **Tracking** list"). Neither suppresses the invitation. — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- Maximum attendees on an event, and recipients on an `eventMessage` from Exchange Online, is 500. — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- **[COMMUNITY]** A Microsoft Tech Community idea, "Ability to update or create an event without sending a notification email to attendees," has been open since 2021 with comments continuing years later; commenters note EWS could import meetings without sending new invitations. — [Tech Community idea 2335070](https://techcommunity.microsoft.com/idea/microsoft365developerplatform/ability-to-update-or-create-an-event-without-sending-a-notification-email-to-att/2335070)
- **[COMMUNITY]** Microsoft Q&A answers on the same question state there is currently no way to prevent emails being sent to attendees when an event is created, that this is default behaviour, and suggest as a workaround creating the event without attendees and adding them afterwards — while cautioning that the update may itself send notifications. — [Disable the invitation mail to the participants...](https://learn.microsoft.com/en-us/answers/questions/1339837/disable-the-invitation-mail-to-the-participants-wh); [Create an Appointment without invitation - graph API](https://learn.microsoft.com/en-us/answers/questions/1657563/create-an-appointment-without-invitation-graph-api); [How to stop default mail triggers...](https://learn.microsoft.com/en-us/answers/questions/2071808/how-to-stop-default-mail-triggers-when-creating-an)

### Inferences

- Booking a caller as an *attendee* is the wrong design on Microsoft 365 regardless of the email question: it turns a shop appointment into a meeting invitation that the caller can decline, propose a new time for (`allowNewTimeProposals` defaults to true), and that then shows as tentative on the owner's calendar. **[INFERENCE]**
- The correct shape is an appointment on the owner's calendar with `attendees: []`, the caller's name and number in `subject`/`body`, `showAs: "busy"`, and `isReminderOn` as the owner prefers. No mail is generated because there is no recipient. **[INFERENCE]**
- This also lines up with the Geek-Receptionist zero-data-retention posture: nothing about the call is mailed anywhere by Microsoft, and the only persisted record is the calendar entry the owner asked for. **[INFERENCE]**
- If a confirmation to the caller is ever wanted, it must be sent by our own channel (SMS/email we control), not by Graph's invitation machinery — which gives control over content and over what is stored. **[INFERENCE]**

### Gaps

- I did not find any Microsoft documentation confirming or denying whether *adding* attendees to an existing event via PATCH sends an invitation. The community answers assume it does; Microsoft hasn't documented it. Treat as unknown.
- Whether a `Prefer` header or beta-only property exists for suppression: I checked the v1.0 `event` resource only. Not checked on beta.

---

## Q3. Idempotency — Graph *does* have what Google lacks

### Takeaway

**Yes. `event.transactionId` is a documented client-supplied idempotency key, designed for exactly the
lost-response case.** This is a genuine, material advantage of Microsoft Graph over Google Calendar for
a phone-booking agent, and it should be central to the build-vs-buy case.

### Cited Findings

- Verbatim from the `event` resource: "**transactionId** | String | A custom identifier specified by a client app for the server to avoid redundant [POST] operations in case of client retries to create the same event. It's useful when low network connectivity causes the client to time out before receiving a response from the server for the client's prior create-event request. After you set **transactionId** when creating an event, you can't change **transactionId** in a subsequent update. This property is only returned in a response payload if an app has set it. Optional." — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- `transactionId` is a first-class property of `event`, so it is readable back via `calendarView`/`GET /events` (with `$select`, since it is only returned when set). — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- Related but distinct: `iCalUId` is "a unique identifier for an event across calendars... different for each occurrence in a recurring series. Read-only" — server-assigned, not usable as a client idempotency key. — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- Immutable ids: the default `id` "changes when the item is moved from one container... to another"; `Prefer: IdType="ImmutableId"` opts into a stable id. — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)

### Inferences

- Design: generate the `transactionId` once per *booking intent* (e.g. a UUID derived from call id + slot), persist it **before** the POST, and reuse it verbatim on every retry. A timed-out POST can then be retried safely on the same call without risking a second event. **[INFERENCE]**
- Because `transactionId` cannot be changed after creation and is returned on read, it doubles as the reconciliation key: after a timeout, a `calendarView` query with `$select=id,subject,start,end,transactionId` over the target day tells you definitively whether the booking landed, without creating anything. That is the fail-loud, no-fallback shape — confirm or abort, never "book again and hope". **[INFERENCE]**
- The request to Graph on a live call should therefore be: getSchedule → speak the slot → POST event with transactionId → on timeout, retry the *same* POST once, then (still uncertain) read back by transactionId before telling the caller anything. **[INFERENCE]**

### Gaps

- **The documentation does not state the maximum length of `transactionId`, how long the server remembers it, whether the dedupe scope is per-calendar or per-mailbox, or what the server returns on a duplicate** (the original event with `201`? a `409`? a `200`?). I found no Microsoft page answering any of these. A 256-character limit is widely repeated but I could not source it to Microsoft documentation, so it is not asserted here. These need an empirical test against a real tenant before the retry logic is written.
- No documented idempotency mechanism for `PATCH`/`DELETE` of an event, only for create. Rescheduling and cancellation retries are therefore *not* covered by `transactionId` — that is an open design problem for the agent.

---

## Q4. Recurrence, all-day events, and working hours

### Takeaway

`mailboxSettings` exposes the user's time zone, working hours and — usefully — `userPurpose`, which
distinguishes a personal mailbox from a shared/room/equipment mailbox. The data is real, but it is
*optional configuration a small business may never have touched*, and the time zone can come back in two
different shapes.

### Cited Findings

- `mailboxSettings` properties: `archiveFolder`, `automaticRepliesSetting`, `dateFormat`, `delegateMeetingMessageDeliveryOptions`, `language`, `timeFormat`, `timeZone` ("The default time zone for the user's mailbox"), `userPurpose`, `workingHours` ("The days of the week and hours in a specific time zone that the user works"). — [mailboxSettings resource type](https://learn.microsoft.com/en-us/graph/api/resources/mailboxsettings?view=graph-rest-1.0)
- `userPurpose` values: `user`, `linked`, `shared`, `room`, `equipment`, `others`, `unknownFutureValue`. "Differentiates a mailbox for a single user from a shared mailbox and equipment mailbox in Exchange Online." Read-only. — [mailboxSettings resource type](https://learn.microsoft.com/en-us/graph/api/resources/mailboxsettings?view=graph-rest-1.0)
- `delegateMeetingMessageDeliveryOptions`: "If the user has a calendar delegate, this specifies whether the delegate, mailbox owner, or both receive meeting messages and meeting responses." Values `sendToDelegateAndInformationToPrincipal`, `sendToDelegateAndPrincipal`, `sendToDelegateOnly`. — [mailboxSettings resource type](https://learn.microsoft.com/en-us/graph/api/resources/mailboxsettings?view=graph-rest-1.0)
- Working hours are *also* returned inline by `getSchedule` per schedule, so a separate `mailboxSettings` read is not required just to get them. — [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- If working hours are never configured, findMeetingTimes' documented default is "Monday to Friday, 8am to 5pm in the time zone set for the mailbox." — [user: findMeetingTimes](https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0)
- All-day events: "**isAllDay** | Boolean | Set to true if the event lasts all day. If true, regardless of whether it's a single-day or multi-day event, start, and endtime must be set to midnight and be in the same time zone." — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- Recurrence: `recurrence` is a `patternedRecurrence`; `type` is one of `singleInstance`, `occurrence`, `exception`, `seriesMaster` (read-only); `seriesMasterId`; `cancelledOccurrences` and `exceptionOccurrences` require `$select`/`$expand` and are "Only returned in a GET operation that specifies the ID (**seriesMasterId** property value) of a series master event." — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)
- Legacy custom time zones: `originalStartTimeZone` / `originalEndTimeZone` — "A value of `tzone://Microsoft/Custom` indicates that a legacy custom time zone was set in desktop Outlook." — [event resource type](https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0)

### Inferences

- Reliability of `workingHours` for a *small business* is the weak point: the field reflects whatever the owner set (or never set) in Outlook, and the documented default (Mon–Fri 8–5) is almost certainly wrong for a salon, a clinic with Saturday hours, or a trade that starts at 7am. Treating `mailboxSettings.workingHours` as the source of truth for "when can this business be booked" would silently offer the wrong slots. **[INFERENCE]**
- Consistent with the project's "configurable, not hardcoded" and "do not decide for the client" rules: opening hours and slot length belong in the tenant's own configuration, collected in the signup form, with `workingHours` used at most as a *suggested default* at onboarding. **[INFERENCE]**
- `userPurpose` is the cheapest pre-flight check available: if the target mailbox comes back `shared`, `room` or `equipment`, licensing and access behave differently from a `user` mailbox and the onboarding should branch (or refuse) rather than discover it at booking time. **[INFERENCE]**
- All-day events matter mainly as *blockers*: an owner's all-day "Closed — public holiday" event shows in getSchedule only if its `showAs` is `oof`/`busy`. An all-day event left as `free` (Outlook's default for all-day items in some clients) will not block the slot. This is a plausible real-world double-booking cause. **[INFERENCE — the `showAs` enum including `free` is documented; the client default behaviour is not, and should be tested.]**
- Recurrence is where a naive implementation breaks: the series master's occurrences, modified exceptions, and *cancelled* occurrences are all returned differently. `getSchedule` sidesteps this entirely because it returns merged free/busy rather than events. One more reason to read availability with getSchedule rather than reconstruct it from `/events`. **[INFERENCE]**

### Gaps

- Microsoft does not document how often `workingHours` is actually populated in the field, nor whether any default is written at mailbox provisioning. No data found.
- The permission required to read `mailboxSettings` (`MailboxSettings.Read`) is on the user-get-mailboxsettings page, which I did not fetch; the resource page itself does not list permissions. Verify before scoping consent.

---

## Q5. Known failure modes in production

### Takeaway

The failure modes split cleanly by credential type. Delegated tokens die on password changes and
conditional access; app-only tokens survive those but can be silently blocked per-mailbox by an Exchange
*application access policy*, and are subject to a separate class of hybrid/on-premises failures where
Graph genuinely cannot reach the calendar. There is a live, Microsoft-acknowledged 2026 hybrid
free/busy defect.

### Cited Findings

**Token revocation / conditional access**

- Continuous access evaluation treats "Password for a user is changed or reset" as a critical event, alongside account deletion/disablement, and "Critical event evaluation doesn't rely on Conditional Access policies so it's available in any tenant." — [Continuous access evaluation](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation)
- On a password change or reset, CAE revokes user sessions **and refresh tokens**. — [Continuous access evaluation (App Proxy)](https://learn.microsoft.com/en-us/entra/identity/app-proxy/concept-continuous-access-evaluation)
- For apps that support CAE, Entra ID can issue access tokens valid for up to 28 hours; both the client app and the resource API must be CAE-enabled. — [Continuous access evaluation](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation)
- Service principal bearer tokens can themselves now be revoked instantly with CAE; disabling the service principal is described as the simpler/faster lever. — [Instant revocation of service principal bearer tokens with CAE](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/instant-revocation-of-service-principal-bearer-tokens-with-cae/4548192)

**Exchange application access policy (app-only being blocked per mailbox)**

- Microsoft documents `ApplicationAccessPolicy` as the admin control for limiting which mailboxes an app can reach, with `Test-ApplicationAccessPolicy -AppId <AppId> -Identity <mailbox>` as the diagnostic. — [Limiting application permissions to specific Exchange Online mailboxes](https://learn.microsoft.com/graph/auth-limit-mailbox-access)
- **[COMMUNITY/vendor]** A Cisco Webex troubleshooting document records the concrete symptom of this policy in production: calendar access failing with "Blocked by tenant configured AppOnly AccessPolicy settings." — [Troubleshoot Webex scheduling error](https://www.cisco.com/c/en/us/support/docs/conferencing/webex-support/223083-troubleshoot-webex-scheduling-error.html)

**Hybrid / on-premises mailboxes**

- **Microsoft-acknowledged defect (2026)**: in classic hybrid deployments configured with `ConfigureExchangeHybridApplication.ps1 -UseGraphApiOnly`, a remote mailbox user opening a delegated on-premises mailbox cannot see free/busy for Exchange Online mailboxes. Symptoms: classic Outlook "Your server location could not be determined. Contact your administrator."; Outlook on the web "No information."; EWS logs show `403 Forbidden` with `EXNL-GraphWebRequestProcessingException:WebException`. Microsoft states the issue "has been fixed in the service," with a workaround via the `EnableRouteThroughMSGraphFeature` setting override. Applies to Exchange Server SE. — [Availability (free/busy) fails for delegated mailboxes in Exchange hybrid deployments using Graph API only](https://support.microsoft.com/servicing/exchange/server/update/2026/5127092)
- The Exchange team has moved hybrid off the legacy shared service principal to a dedicated hybrid app for free/busy, MailTips and profile pictures, requiring on-premises servers to be updated and the app configured in Entra ID. — [Dedicated Hybrid App: temporary enforcements, new HCW and possible issues](https://techcommunity.microsoft.com/t5/exchange-team-blog/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible/ba-p/4440682)
- **[COMMUNITY]** Multiple Microsoft Q&A threads report `MailboxNotEnabledForRESTAPI` / "REST API is not yet supported for this mailbox" and `404` on calendar calls against on-premises or hybrid mailboxes. — [Creating Events by Graph API in a Hybrid deployment fails with on-premise mailbox](https://learn.microsoft.com/en-us/answers/questions/545747/creating-events-by-graph-api-in-an-hybrid-deployme); [MailboxNotEnabledForRESTAPI — Graph API with HMA enabled on-premise server](https://learn.microsoft.com/en-us/answers/questions/134051/mailboxnotenabledforrestapi-microsoft-graph-api-in)

**Shared / delegated mailboxes (official known issue)**

- From Microsoft's Known Issues page, Calendar section, verbatim: "An app with delegated permissions returns `HTTP 403 Forbidden` when attempting to attach large files to an Outlook message or event that is in a shared or delegated mailbox. With delegated permissions, [createUploadSession] succeeds only if the message or event is in the signed-in user's mailbox." — [Known issues with Microsoft Graph](https://learn.microsoft.com/en-us/graph/known-issues)
- The Known Issues page lists **no other calendar issue** as of its 2026-04-10 date — notably, nothing about getSchedule, findMeetingTimes, transactionId or event creation. — [Known issues with Microsoft Graph](https://learn.microsoft.com/en-us/graph/known-issues)

### Inferences

- For an unattended receptionist, **app-only (client credentials) is the only sane credential**: a delegated refresh token for the business owner dies the first time they change their password, and CAE makes that revocation immediate and tenant-wide, with no policy required. The failure would surface mid-call. **[INFERENCE from the CAE documentation above.]**
- The price of app-only is the opposite risk: the tenant admin can scope the app out of the mailbox with an `ApplicationAccessPolicy` at any time, and the failure is an access-denied at booking time rather than at consent time. Onboarding should therefore *prove* access by making a real getSchedule call against the target mailbox and failing loudly if it is refused, rather than treating a successful admin consent as sufficient. **[INFERENCE]**
- Exchange hybrid is the one environment where this product cannot be made to work reliably, and it is not detectable from the consent flow. Mailbox-on-premises small businesses exist (an accountant's office with an old Exchange box and a hybrid tenant). A pre-flight `GET /users/{id}/mailboxSettings` or getSchedule that returns `MailboxNotEnabledForRESTAPI` is the cheap detector; the right response is to refuse onboarding, not to degrade. **[INFERENCE]**
- Conditional access policies requiring a compliant device or MFA will block an interactive delegated sign-in from a server but do **not** apply to client-credentials flows, which are governed instead by app consent policies and (for Exchange) application access policies. I could not find a single Microsoft page stating this cleanly for the calendar case, so treat it as **[INFERENCE]** and verify before putting it in a customer-facing doc.

### Gaps

- I found no authoritative Microsoft statement enumerating which Entra conditional-access policy types can block a third-party *app-only* Graph calendar call. The CAE and application-access-policy docs cover revocation and mailbox scoping, not CA policy targeting of workload identities. Not verified.
- No documented error code list for "mailbox is on-premises" — the `MailboxNotEnabledForRESTAPI` string comes only from community reports, not from a Microsoft error reference I could locate.
- Frequency data: no source quantifies how often any of these failures occur in the SMB population.

---

## Q6. Microsoft Bookings and the `bookingBusiness` API

### Takeaway

Microsoft Bookings is a real, licensed, first-party booking product with a full Graph API that
**supports application permissions for both reading staff availability and creating appointments** — and
`getStaffAvailability` is in fact *app-only* (delegated not supported). It is a credible route for an AI
receptionist, but it brings its own licensing floor, its own data store holding customer details, its own
notification emails, and a documented business-rules validation requirement for app-only callers.

### Cited Findings

**What it is and licensing**

- "The Microsoft Bookings API in Microsoft Graph applies only to shared bookings. The API is not applicable for personal bookings." — [Bookings API overview](https://learn.microsoft.com/en-us/graph/api/resources/booking-api-overview?view=graph-rest-1.0)
- Step 1 of Microsoft's own getting-started sequence: "Make sure the business has an **Microsoft 365 Business Premium** subscription." — [Bookings API overview](https://learn.microsoft.com/en-us/graph/api/resources/booking-api-overview?view=graph-rest-1.0)
- The Bookings service description (page date 2026-09-21) lists "Bookings API in Microsoft Graph" as available in Small Business plans, Enterprise plans, GCC-High, DOD and Education — and **"No" for GCC**. — [Microsoft Bookings service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/microsoft-bookings-service-description)
- Same table: appointment notification **emails** are available on all plans; appointment notification **SMS** is available only in North America and the United Kingdom and "require an additional Teams Premium license." Online meetings "require the staff member being booked to have a Microsoft Teams or Skype for Business license that allows for the creation of meetings." — [Microsoft Bookings service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/microsoft-bookings-service-description)
- Object model: a `bookingBusiness` contains `bookingStaffMember`s, `bookingService`s, `bookingAppointment`s and `bookingCustomer`s. Setup sequence is POST business → add staff → define services → `POST /publish` the scheduling page. — [Bookings API overview](https://learn.microsoft.com/en-us/graph/api/resources/booking-api-overview?view=graph-rest-1.0)

**Permissions — app-only works, and in one case is mandatory**

- Create appointment (`POST /solutions/bookingBusinesses/{id}/appointments`): Delegated least privileged `BookingsAppointment.ReadWrite.All`; **Application** least privileged `BookingsAppointment.ReadWrite.All` (higher: `Bookings.Manage.All`, `Bookings.Read.All`, `Bookings.ReadWrite.All`). With a note: "If you create a custom app using application permissions, you must follow the [Business rules validation]." — [Create bookingAppointment](https://learn.microsoft.com/en-us/graph/api/bookingbusiness-post-appointments?view=graph-rest-1.0)
- `getStaffAvailability` (`POST /solutions/bookingBusinesses/{id}/getStaffAvailability`): Delegated — **"Not supported."** Application — `Bookings.Read.All` least privileged (higher: `Bookings.Manage.All`, `Bookings.ReadWrite.All`, `Calendars.Read`, `Calendars.ReadWrite`). Not available in China operated by 21Vianet. — [bookingsBusiness: getStaffAvailability](https://learn.microsoft.com/en-us/graph/api/bookingbusiness-getstaffavailability?view=graph-rest-1.0)
- `getStaffAvailability` takes `staffIds[]`, `startDateTime`, `endDateTime` (both `dateTimeTimeZone`) and returns `staffAvailabilityItem`s whose `availabilityItems` carry `status` (`Available`/`Busy`), start/end, and a `serviceId` identifying which booked service occupies a busy block. Microsoft's own sample passes **different time zones for start and end** (`India Standard Time` and `Pacific Standard Time`) and returns slots in `(UTC-08:00) Pacific Time (US & Canada)` format. — [bookingsBusiness: getStaffAvailability](https://learn.microsoft.com/en-us/graph/api/bookingbusiness-getstaffavailability?view=graph-rest-1.0)

**Known issue**

- Official known issue: listing `bookingBusinesses` fails with `ErrorExceededFindCountLimit` — "The GetBookingMailboxes request returned too many results. Please specify a query to limit the results." — "when an organization has several Bookings businesses and the account making the request is not an administrator." Workaround: add a `?query=` parameter. — [Known issues with Microsoft Graph](https://learn.microsoft.com/en-us/graph/known-issues)

### Inferences

- Bookings answers two problems the raw-calendar route does not: it models services (duration, buffer, price) and staff-to-service mapping natively, and `getStaffAvailability` returns *bookable* availability rather than raw free/busy — it already accounts for the Bookings scheduling policy. For a receptionist that must say "we have 2:30 with Maria on Thursday," that is substantially less logic to own. **[INFERENCE]**
- But it inverts the data story. Bookings stores `bookingCustomer` records and sends its own confirmation and reminder emails from the tenant. Under the project's zero-data-retention posture, that is a *new* place where caller details persist and a *new* outbound message we do not control the wording of — which has to be a client decision, not ours. **[INFERENCE, grounded in the service description's notification-email row.]**
- `getStaffAvailability` returns `Available`/`Busy` blocks but the documented response shows no idempotency facility on `POST .../appointments`, and `bookingAppointment` is not documented as having a `transactionId` equivalent. **If that holds, Bookings loses exactly the property that makes the raw Graph route safe on a dropped response.** This is the single most important thing to verify before choosing Bookings. **[INFERENCE — see Gaps.]**
- The Business Premium floor is a real cost gate for the smallest clients: a one-person trade on Business Basic may not have it. Microsoft's API page says Business Premium; the service description's feature table says "Small Business" plans generally. These two Microsoft sources are not obviously consistent, and the discrepancy should not be papered over. **[CONFLICT between [Bookings API overview](https://learn.microsoft.com/en-us/graph/api/resources/booking-api-overview?view=graph-rest-1.0) and [Microsoft Bookings service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/microsoft-bookings-service-description).]**
- "You must follow the Business rules validation" for app-only appointment creation is a documented constraint whose content I have not read — it is a prerequisite, not a footnote. **[INFERENCE]**

### Gaps

- **I did not verify whether `bookingAppointment` supports any idempotency key.** The create-appointment page was fetched but only its permissions section was extracted; the full `bookingAppointment` resource property list was not read. This is the decisive question for the live-call constraint and must be checked at `https://learn.microsoft.com/en-us/graph/api/resources/bookingappointment`.
- The Business rules validation page (`/graph/bookingsbusiness-business-rules`) was not read. Unknown what it requires of an app-only caller.
- Whether Bookings' confirmation emails can be disabled per-business via Graph (`bookingSchedulingPolicy` or business settings) — not checked.
- Documented limits on `getStaffAvailability` (max staff ids, max date range) — the reference page states none. Absence of a documented limit is not the same as no limit.
- Bookings API latency on a live call — no data.

---

## Q7. A Microsoft "calendar MCP" or agent-facing booking endpoint without Copilot licensing

### Takeaway

The honest answer is **no, not a first-party one**. Microsoft's agent-facing calendar tooling sits inside
the Agent 365 / Copilot Studio stack and the available (secondary) sources say it requires Microsoft 365
Copilot licensing. The licence-free agent route on Microsoft is the one that has always existed: Graph
REST with an app-only client-credentials token. I could not find an authoritative Microsoft Learn
licensing page confirming the Copilot requirement, so this answer is weaker than the rest of these notes.

### Cited Findings

- **[COMMUNITY/secondary]** A Microsoft Copilot Studio community blog (Nov 2025, describing a preview) states that Agent 365 MCP servers "require a full Microsoft 365 Copilot license for users of the agent," and that without one, "users will NOT be able to use Agent 365 MCP servers from Copilot Studio." — [Bringing Microsoft 365 Copilot into Copilot Studio with Agent 365 MCP Servers](https://microsoft.github.io/mcscatblog/posts/a365-mcp-servers-copilot-studio/)
- **[COMMUNITY]** Microsoft Q&A threads asking directly about licensing for the Agent 365 MCP server reference (including its Mail server) have been raised and answered with Copilot-licensing requirements; these answers are flagged as AI-generated on the platform. — [Clarity on Licensing Requirements for Agent 365](https://learn.microsoft.com/en-us/answers/questions/6059531/clarity-on-licensing-requirements-for-agent-365); [Requesting license details for the Agent 365 MCP server reference](https://learn.microsoft.com/en-us/answers/questions/5839529/requesting-license-details-required-to-explore-htt)
- **[COMMUNITY]** The same Q&A material reports a "Microsoft Graph MCP Server for Enterprise" requiring no additional licence, but explicitly *not* positioned as a Calendar/Outlook mailbox MCP server — so it does not cover this use case.
- By contrast, the Bookings and calendar Graph REST APIs documented above require only the relevant Graph permission plus the underlying Microsoft 365 licence for the mailbox/Bookings feature — no Copilot licence is mentioned anywhere on those reference pages. — [Bookings API overview](https://learn.microsoft.com/en-us/graph/api/resources/booking-api-overview?view=graph-rest-1.0); [calendar: getSchedule](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)

### Inferences

- An MCP wrapper would in any case be the wrong shape here: on a live phone call the agent needs one or two deterministic, low-latency HTTP calls with a known idempotency key, not a tool-discovery protocol hop. The value MCP adds — letting an arbitrary model discover and call tools — is value this product does not need, since we know exactly which two endpoints we want. **[INFERENCE]**
- Requiring tenants to hold Microsoft 365 Copilot licences would be fatal to the SMB price point regardless of what the agent could do with them. **[INFERENCE]**

### Gaps

- **Not verified against Microsoft Learn.** I could not locate the current first-party licensing page for Agent 365 / Microsoft 365 MCP servers in these searches. The Copilot-licence claim rests on a community blog describing a preview and on AI-generated Q&A answers. Before this is relied on in a decision, check `learn.microsoft.com/en-us/microsoft-agent-365/` directly.
- Whether Microsoft has shipped any *unlicensed* agent-facing booking endpoint since the training cutoff — not established either way by these searches.

---

## Cross-cutting judgement against the live-call constraint

### Takeaway

The raw-Graph route is viable and has one decisive advantage over Google Calendar — `transactionId` — but
its safety depends on documentation gaps that must be closed by experiment, not by reading.

### Inferences

- **The two-call shape works**: `getSchedule` (app-only, 1 mailbox, 1–2 days, 15-min interval) then `POST /events` with `transactionId` and no attendees. Both are single round trips to one service. **[INFERENCE]**
- **The double-booking question is not fully answered by documentation.** `transactionId` is documented as existing and as being *for* this problem, but its dedupe semantics (scope, retention, duplicate response code) are not. Until those are measured, the only fail-closed design is: retry once with the identical `transactionId`, and if still uncertain, read back by `transactionId` before confirming to the caller — never create a second event, never tell the caller it's booked on an unconfirmed write. **[INFERENCE]**
- **Credential choice is forced**: app-only, because delegated refresh tokens are revoked by a password change via CAE with no policy involved, and that revocation would surface mid-call. **[INFERENCE]**
- **Onboarding must prove access, not assume it**: consent succeeding tells you nothing about an Exchange application access policy, a hybrid on-premises mailbox, or a shared/room mailbox. A real getSchedule against the real target mailbox at signup time is the only honest check, and a failure there should refuse onboarding loudly rather than defer the discovery to a caller. **[INFERENCE]**
- **Bookings is the stronger product fit and the weaker engineering fit** — richer domain model and app-only availability, but a Business Premium floor, its own customer data store, its own outbound emails, and (pending verification) no idempotency key. **[INFERENCE]**
