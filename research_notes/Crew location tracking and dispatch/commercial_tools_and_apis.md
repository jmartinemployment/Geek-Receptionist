# Commercial fleet-tracking and field-service tools: third-party read access to crew locations (as of 2026-11-22)

Method note: official pages were fetched where possible. Several vendor pages returned 403/404 to the fetcher (Jobber docs, ServiceTitan developer portal, Motive getting-started, Jobber authorization page), so some claims rest on search summaries of official pages or on third-party sources, flagged below.

## 1. Which tools expose a documented API for current location of crew or vehicles?

### Takeaway
Documented location APIs found for: ServiceM8 (staff GPS, a scope named staff_locations), Samsara (vehicle GPS stats), Motive (Locations permission), Geotab (DeviceStatusInfo lat/long), Verizon Connect Reveal (Vehicle Update API for GPS). Jobber, Housecall Pro, Workiz and ServiceTitan: no documented technician-location endpoint was found. Google Maps location sharing and Life360: no official public API found.

### Cited Findings
- ServiceM8 OAuth scope `staff_locations` gives "real-time GPS information about staff"; `staff_activity` gives clock-on/lunch/clock-off; both require user consent — [ServiceM8 authentication](https://developer.servicem8.com/docs/authentication)
- Samsara: the closest current-location endpoint is the stats feed, `GET https://api.samsara.com/fleet/vehicles/stats/feed` with the `gps` stat type (lat/long, heading, speed, reverse-geocoded address); needs the "Read Vehicle Statistics" scope. The sidebar also lists a "Locations snapshot" endpoint (`/reference/getvehiclelocations`) that the page fetched did not describe — [Samsara stats feed](https://developers.samsara.com/reference/getvehiclestatsfeed)
- Geotab: `DeviceStatusInfo` exposes the device's current latitude and longitude — [Geotab DeviceStatusInfo](https://developers.geotab.com/myGeotab/apiReference/objects/DeviceStatusInfo)
- Motive: the developer portal permission list includes Locations and Dispatches (among Vehicles, Users, HOS, etc.) — [Motive OAuth 2.0](https://developer-docs.gomotive.com/docs/oauth-20). Search summary also says OAuth scopes include driver locations — [Motive OAuth reference](https://developer.gomotive.com/reference/authentication-oauth-20)
- Verizon Connect Reveal: Vehicle Update API lets integrated users poll GPS location for vehicles, one vehicle per call by vehicle number; a GPS history API also exists — [Verizon Connect/Fleetmatics Vehicle Update API](https://fim.eu.fleetmatics.com/content/api/20601b05-c704-4bca-8c60-876c4656d76d.fleetmatics-p-eu/documents/vehicle_update_api.htm), [Developer Quick Start](https://fim.us.fleetmatics.com/content/home/support/guides/DeveloperQuickStartGuide.htm)
- ServiceTitan: the help center documents GPS-provider integrations (add GPS devices per technician) and native phone GPS in the field app; search found no developer-portal technician-location endpoint. A third-party GPS vendor guide describes connecting via Settings > Integrations > API Application Access with Client ID, Client Secret, Tenant ID — [ServiceTitan add GPS providers](https://help.servicetitan.com/docs/add-gps-providers-1.md), [GPS Insight guide](https://help.gpsinsight.com/docs/servicetitan-integration-update/)
- Workiz: v2 API keys cover Search, Jobs, Leads, Clients, Invoices, Estimates; separate Team API and Time Off API; no location endpoint seen. Location tracking is a product feature on higher plans; the HVAC page says location data arrives via a Linxup GPS integration (third-party product) — [Workiz API credentials](https://help.workiz.com/hc/en-us/articles/50737427251473-Accessing-your-Workiz-API-credentials), [Workiz HVAC GPS page](https://workiz.com/industries/hvac/hvac-gps-tracking-software)
- Housecall Pro public API documented at docs.housecallpro.com; no location endpoint surfaced in search — [Housecall Pro API overview](https://help.housecallpro.com/en/articles/8505035-api-overview)
- Jobber: single GraphQL endpoint with OAuth 2.0; no location/GPS object confirmed in anything I could read — [Jobber developer docs](https://developer.getjobber.com/docs/building_your_app/app_authorization)
- Google Maps location sharing: no official developer endpoint found; a 2011 Google statement said friends' locations would not be added to the Latitude API for privacy reasons; the only workaround found is an npm package that requires the user's main Google login (flagged risky) — [Google Latitude API thread](https://groups.google.com/g/google-latitude-api/c/58NUsFkNO34), [google-location-sharing](https://www.npmjs.com/package/google-location-sharing)
- Life360: no public developer API found; a job posting describes building an external developer program; unofficial access reportedly blocked — [Life360 job posting](https://job-boards.greenhouse.io/life360/jobs/8246478002), [Home Assistant thread](https://community.home-assistant.io/t/life360-device-tracker-platform/52406/1939)

### Inferences
- For a small HVAC/plumbing shop, the most relevant "location of a person" source is ServiceM8 (phone-based staff GPS). Vehicle telematics (Samsara, Motive, Geotab, Verizon Connect) give vehicle, not person, location.
- Google Maps sharing and Life360 are not viable as a vendor-run connection (no official API).

### Gaps
- Whether Jobber, Housecall Pro, Workiz, ServiceTitan expose technician GPS via API: not confirmed either way (docs blocked or silent).
- Samsara "Locations snapshot" and Motive vehicle-locations exact scope names/auth: not verified from official reference pages. One forum post reports a Motive API key failing on the vehicle_locations endpoint while working elsewhere (unresolved, unofficial) — [Motive forum](https://developer-docs.gomotive.com/discuss/69853be36d75e6bdf21a29f1).

## 2. Sign-in method, owner action, plan or partner limits

### Takeaway
Most offer both a per-account API key and OAuth for apps serving many customers. For a multi-tenant product where the owner signs in, OAuth is the fit: ServiceM8 (needs Development Partner registration), Motive (self-serve developer account), Samsara (OAuth for marketplace apps). Housecall Pro is API-key only (found) and MAX-plan only.

### Cited Findings
- ServiceM8: private app = owner generates API key under Settings > API Keys (X-API-Key header); public app = OAuth 2.0, developer registers as Development Partner, owner approves scopes on a consent screen, tokens expire after 3600 s with refresh token; owner can revoke by disabling add-on; staff location scopes need user consent; docs mention no plan tier. Add-on Store listing requires OAuth — [ServiceM8 authentication](https://developer.servicem8.com/docs/authentication), [Add-on Store requirements](https://developer.servicem8.com/docs/addon-store-requirements)
- Samsara: API tokens created in Dashboard Settings > API Tokens with granular scopes; OAuth 2.0 "recommended for marketplace apps"; no plan restriction stated on the page; server-side calls only — [Samsara authentication](https://developers.samsara.com/docs/authentication)
- Motive: sign up for developer account at developer.gomotive.com, no approval step stated on the OAuth page; fleet customer clicks Install on Motive's page to grant permissions; code expires in 10 minutes — [Motive OAuth 2.0](https://developer-docs.gomotive.com/docs/oauth-20). Search summary says a developer account must be set up with Motive support before login, which conflicts with "sign up yourself" — [Motive OAuth reference](https://developer.gomotive.com/reference/authentication-oauth-20). Motive also has an API Terms of Service — [Motive API ToS](https://gomotive.com/legal/api-terms-of-service/)
- Geotab: authentication returns a session; guidance is for the customer to create a dedicated service account and share credentials securely with the integrator — [Geotab service account docs](https://support.geotab.com/software-integration/doc/service-acct-api). No official OAuth-style flow found; a community post says user credentials are the only approach found for cloud-to-cloud (unofficial) — [Geotab community](https://support.geotab.com/community/sdk-api/1597/geotab-provides-authorization-interface-like-oauth)
- Verizon Connect Reveal: developer creates an app in the Verizon Connect Development Portal (self-registration per a 2022 post) and uses a Token API; customers can also connect partner accounts via Reveal's Partner Integrations tab and consent to sharing; some integrations carry a charge; partner program page exists, eligibility not found; Reveal available US/Canada/Australia/NZ — [Developer Quick Start](https://fim.us.fleetmatics.com/content/home/support/guides/DeveloperQuickStartGuide.htm), [Self-service API post](https://verizonconnect.com/resources/article/introducing-self-service-api-for-fleet-tracking), [Fleetio guide](https://help.fleetio.com/en_US/verizon-connect-reveal-fleetmatics-integration)
- Housecall Pro: API only for MAX plan; admins generate keys (My Apps > API Key Management, full or read-only); the key gives access to all account data; Housecall Pro says it cannot build or maintain custom integrations made via API keys; OAuth not confirmed — [Housecall Pro API key help](https://help.housecallpro.com/en/articles/6790722-how-to-make-an-api-key), [API overview](https://help.housecallpro.com/en/articles/8505035-api-overview)
- Jobber: OAuth 2.0 only (no API keys); account admin authorizes; scopes set in Developer Center; marketplace listing requires tester account and Jobber review — [Jobber developer docs](https://developer.getjobber.com/docs/getting_started). A third-party report card (unverified) says full API access needs a premium plan at $600+/month — [Supergood](https://supergood.ai/api-report-card/jobber)
- Workiz: v2 named API keys created on the Developer page, with expiry and permissions; which plan includes API not found — [Workiz help](https://help.workiz.com/hc/en-us/articles/50737427251473-Accessing-your-Workiz-API-credentials)
- ServiceTitan: OAuth2 plus an app key per third-party spec (third-party mirror); tenant grants via Settings > Integrations > API Application Access per GPS Insight guide — [apis.io](https://apis.io/apis/servicetitan/servicetitan-appointment-assignments-api/), [GPS Insight](https://help.gpsinsight.com/docs/servicetitan-integration-update/)

### Inferences
- Handing an owner an API key (Samsara token, Housecall Pro key, Geotab service-account password) means the owner pastes a secret into our signup rather than signing in to the vendor; this conflicts with the "owner signs in" rule. OAuth flows (ServiceM8, Motive, Jobber, Samsara marketplace) match it.

### Gaps
- Samsara OAuth app registration/partner requirements: not found on pages read.
- ServiceTitan developer program terms, fees and approval for third parties: official portal not readable.
- Housecall Pro OAuth/partner program: not confirmed.

## 3. Dispatch / job-assignment APIs

### Takeaway
Several allow creating and assigning jobs: ServiceM8, Samsara (routes), Motive (Dispatches permission), ServiceTitan (appointment assignment), Workiz (via a third-party connector), Jobber and Housecall Pro (jobs exist, assignment not confirmed).

### Cited Findings
- ServiceM8: scopes `create_jobs` (may incur account charges), `manage_jobs`, `manage_schedule` (full access to JobActivity and JobAllocation endpoints) — [ServiceM8 authentication](https://developer.servicem8.com/docs/authentication)
- Samsara: `POST https://api.samsara.com/fleet/routes` creates a route with stops, assignable to a driver or vehicle; stops reference Addresses; PATCH to update; token needs Read/Write Routes scopes; 100 requests/min on create — [Create a route](https://developers.samsara.com/reference/createroute), [Creating routes](https://developers.samsara.com/docs/creating-routes-via-api)
- Motive: "Dispatches" permission in the developer portal — [Motive OAuth 2.0](https://developer-docs.gomotive.com/docs/oauth-20)
- ServiceTitan: Dispatch API has TechnicianShifts and TechnicianSkills endpoints (tenant-dispatch-v2); a third-party spec lists assign/unassign technician operations in an Appointment Assignments API (spec appears mislabeled; verify) — [Fivetran post](https://support.fivetran.com/hc/en-us/community/posts/42367186233751-ServiceTitan-Dispatch-API), [apis.io](https://apis.io/apis/servicetitan/servicetitan-appointment-assignments-api/)
- Workiz: third-party connector (Composio) lists assign technician and update job tools — [Composio Workiz](https://composio.dev/toolkits/workiz)

### Inferences
- ServiceM8 is the only one found where location scope and job-allocation scope sit under one OAuth consent.

### Gaps
- Jobber/Housecall Pro technician assignment via API not verified from official pages.

## 4. Worker consent and privacy

### Takeaway
ServiceM8 gates staff location behind user consent at the API scope level. Samsara and Geotab offer in-vehicle/app privacy modes; no API-exposed privacy state was found.

### Cited Findings
- ServiceM8: `staff_locations` and `staff_activity` grant "otherwise restricted user data" and "require user consent" — [ServiceM8 authentication](https://developer.servicem8.com/docs/authentication)
- Samsara Privacy Button temporarily stops real-time GPS being sent to the cloud; dashboard shows a gray dot at the last location; managers are not alerted on/off per the datasheet; camera privacy modes are separate — [Samsara privacy button data sheet](https://www.samsara.com/pdf/docs/privacy-button-data-sheet.pdf)
- Geotab added a privacy mode for personal use — [Automotive Fleet](https://www.automotive-fleet.com/news/geotab-adds-privacy-mode-for-personal-use)
- Life360 history of selling location data to brokers (stopped for most) — [The Markup](https://themarkup.org/privacy/2021/12/06/the-popular-family-safety-app-life360-is-selling-precise-location-data-on-its-tens-of-millions-of-user)
- ServiceTitan: GPS accurate to 3-10 m natively, cellular triangulation up to 500 m fallback — [ServiceTitan native GPS](https://help.servicetitan.com/docs/enable-native-gps)

### Inferences
- A privacy-mode vehicle will appear as a stale last-known position; the receptionist should treat location age as part of the answer, never as current truth. State laws on employee tracking not researched.

### Gaps
- Off-duty settings for ServiceM8, Motive, Verizon Connect and Jobber not found; whether any API returns the privacy-mode flag is not found.

## 5. Open to small integrators vs partnership-gated

### Takeaway
Self-serve (per official/search pages): Samsara tokens, Motive developer account, Verizon Connect self-registration (2022 post), ServiceM8 Development Partner registration, Jobber (developer account plus review for listing), Housecall Pro (MAX plan key), Workiz key. Likely partnership-heavy: ServiceTitan and Geotab marketplace, plus Verizon Connect partner program.

### Cited Findings
- ServiceM8: registering as Development Partner is required for some APIs; public apps need not be listed on the store — [ServiceM8 authentication](https://developer.servicem8.com/docs/authentication)
- Jobber: tester account and review stages for marketplace listing — [Jobber docs](https://developer.getjobber.com/docs/getting_started)
- Housecall Pro won't support custom API-key integrations — [Housecall Pro API key help](https://help.housecallpro.com/en/articles/6790722-how-to-make-an-api-key)

### Inferences
- Recommended order to evaluate (inference): ServiceM8 (location plus dispatch in one OAuth), then Motive and Samsara (vehicle-level), Jobber and Housecall Pro for jobs only. ServiceTitan serves larger shops than "small" targets, and its access terms were not verified.

### Gaps
- ServiceTitan, Geotab and Samsara marketplace partner terms and fees: unverified; Housecall Pro plan price for MAX not captured.
