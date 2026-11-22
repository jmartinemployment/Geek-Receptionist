# Open-source, self-hostable phone location trackers (as of 2026-11-22)

Scope covered: Traccar (server + Client), OwnTracks (Recorder + Android/iOS apps), Dawarich (brief). Not covered: Nextcloud PhoneTrack (release lookup returned 404; not verified), Overland, GPSLogger, Home Assistant. Sources are official pages or GitHub; "inferred" is marked.

## What each app is, licence, last release, maintained?

### Takeaway
Traccar is the only one that is a multi-user fleet-tracking server with a documented REST API, a vendor-hosted option and a maintained phone client. OwnTracks is a lighter personal/location-sharing system (Recorder is a file-based store). Dawarich is a personal location-history app, not fleet software. All three show releases within the last 7 months.

### Cited Findings
- Traccar server: Apache 2.0, Java, "Open source GPS tracking platform - self-hosted or managed, 200+ device protocols", 8.2k stars — [GitHub](https://github.com/traccar/traccar)
- Traccar server latest release v6.17.0, published 2026-11-01 — [GitHub API](https://api.github.com/repos/traccar/traccar/releases/latest)
- Traccar Client (phone app) latest release v10.2.4, published 2026-10-30 — [GitHub API](https://api.github.com/repos/traccar/traccar-client/releases/latest); the Traccar Client page also cites v10.2.4 APK — [Traccar Client](https://www.traccar.org/client/)
- OwnTracks Recorder: C, stores in plain files, "lightweight program for storing and accessing location data published via MQTT (or HTTP)" — [GitHub](https://github.com/owntracks/recorder); licence is GNU GPL v2 or later per the licence file header — [LICENSE](https://raw.githubusercontent.com/owntracks/recorder/master/LICENSE)
- OwnTracks Recorder latest release 1.0.7, published 2026-11-19 — [GitHub API](https://api.github.com/repos/owntracks/recorder/releases/latest)
- OwnTracks Android: licence EPL-1.0; latest release v2.5.9, published 2026-05-15 — [GitHub](https://github.com/owntracks/android), [GitHub API](https://api.github.com/repos/owntracks/android/releases/latest)
- OwnTracks iOS: latest release 27.1.2, published 2026-10-17; repo has Objective-C topics and says it was formerly MQTTitude; licence type not confirmed from the page — [GitHub](https://github.com/owntracks/ios), [GitHub API](https://api.github.com/repos/owntracks/ios/releases/latest)
- Dawarich: AGPL-3.0, "self-hostable alternative to Google Timeline"; latest release 1.23.0, published 2026-11-15 — [GitHub](https://github.com/Freika/dawarich), [GitHub API](https://api.github.com/repos/Freika/dawarich/releases/latest)

### Inferences
- "Maintained" is inferred from release dates within ~7 months of today; I did not review issue backlogs or commit cadence.
- Dawarich's AGPL-3.0 network-use clause could matter if we modified and hosted it (the DEV.co review says so; secondary source). Traccar (Apache 2.0) and Recorder (GPL) are unaffected if we only call their HTTP APIs (inferred; not legal advice).

### Gaps
- OwnTracks iOS licence type not stated on the fetched page.
- Last commit dates not captured (GitHub page did not show them).
- Nextcloud PhoneTrack, Overland, GPSLogger not researched.

## Server needed, and what it involves

### Takeaway
All three need a server to receive positions. Traccar is a Java server on any SQL database; Recorder is a small C program with no database; Dawarich is a Ruby web app. A business either runs it (or pays someone) or, for Traccar and Dawarich, buys vendor hosting.

### Cited Findings
- Traccar: "Java-based back-end server", "works with any major SQL database", Quick Start uses MySQL — [GitHub](https://github.com/traccar/traccar)
- Traccar's own comparison: self-host = free software + VPS, about $5-$20/month, you install and upgrade; managed = no setup — [Managed vs self-hosted](https://www.traccar.org/managed-vs-self-hosted/); Docker Compose install guides exist per the same page
- Recorder: stores in plain files (`rec/`, `last/`), LMDB for caches, no external database; built-in HTTP server is plain-text only and must sit behind a TLS reverse proxy; nginx and Caddy basic-auth examples are given — [Recorder README](https://github.com/owntracks/recorder)
- Recorder receives via MQTT or HTTP POST to `/pub` (needs `--http-port` and HTTP-enabled build); OwnTracks apps can also POST to any custom endpoint — [OwnTracks HTTP mode](https://owntracks.org/booklet/tech/http/)
- Dawarich docs list server requirements as Rails, Postgres and Redis (topic names only; no detail on page) — [Dawarich docs](https://dawarich.app/docs/)

### Inferences
- OwnTracks over HTTP mode means no MQTT broker is needed (inferred from the HTTP-mode page).
- For a small business with no IT staff, the self-host options are impractical without paying a third party; Traccar managed is the closest to "just sign in".

### Gaps
- No cost data for Recorder or Dawarich self-hosting beyond general VPS pricing.
- Dawarich Redis/Postgres detail not confirmed (docs page was a topic list).

## Can a third party read positions via API, and how authenticated

### Takeaway
Traccar has a full documented REST API (latest and historical positions, devices) with Basic, session or bearer token auth. Recorder has a simple read API (`last`, `locations`) but its docs state no auth of its own; auth is whatever the reverse proxy adds. Dawarich has an API key (details unverified).

### Cited Findings
- Traccar auth: session cookie, HTTP Basic, or bearer/account token (`/api/session?token=...`); tokens from the web app or API — [Traccar API](https://www.traccar.org/traccar-api/)
- Traccar live WebSocket `/api/socket` accepts only session cookies — [Traccar API](https://www.traccar.org/traccar-api/)
- Traccar OpenAPI: `GET /positions` returns last known positions, or history when `deviceId` + `from` + `to` (ISO 8601) are given, with `limit` and `offset`; `GET /devices` lists devices (standard users see only their own); `GET /reports/route` is deprecated in favour of `/positions` — [openapi.yaml](https://raw.githubusercontent.com/traccar/traccar/master/openapi.yaml)
- Traccar position submission is by device protocols (e.g. OsmAnd), not the REST API — [Traccar API](https://www.traccar.org/traccar-api/)
- Recorder API `/api/0/`: `last` (user, device, fields), `list`, `locations` (user and device required; `format` csv/json/geojson/linestring; `from`, `to`, `limit`), `monitor`, `version`; GET and POST — [API.md](https://raw.githubusercontent.com/owntracks/recorder/master/API.md)
- API.md "does not describe any authentication"; the README shows nginx/Caddy basic auth in front and Digest auth for views — [Recorder README](https://github.com/owntracks/recorder)
- Dawarich: docs list "API authentication using an API key" and "endpoints for reading points" as topics, no content fetched — [Dawarich docs](https://dawarich.app/docs/); Cloud Pro lists "Full Write API access" — [Dawarich Cloud](https://dawarich.app/cloud/)

### Inferences
- Our service could read crew positions from Traccar with a per-business bearer token (a token field the owner pastes, plus the server URL). Inferred from the docs; not tested.
- For OwnTracks, the owner would have to give us the Recorder URL plus proxy credentials; every business would host its own Recorder (inferred).
- Traccar's token is per user account; whether a read-only token can be scoped is not stated (gap).

### Gaps
- Traccar token scoping/expiry and read-only permissions not found.
- Traccar API rate limits not found.
- Dawarich API endpoint details and auth scheme not verified.

## Phone app distribution, and background-location and battery limits

### Takeaway
Traccar Client and Dawarich have App Store and Google Play apps; OwnTracks is on Google Play and F-Droid for Android, and iOS App Store listing was not confirmed from fetched pages. Both iOS and Android need "always" location and battery exemptions; iOS stops reporting if the app is swiped away.

### Cited Findings
- Traccar Client: Google Play, App Store, and direct APK from GitHub; defaults to Traccar's demo server until pointed at your own — [Traccar Client](https://www.traccar.org/client/)
- Traccar Client Android: needs precise and background location plus physical-activity permission (used for stop detection); exempt from battery optimisation; vendor battery savers may kill it — [Troubleshooting](https://www.traccar.org/client-troubleshooting/)
- Traccar Client iOS: allow background app refresh and "always" location; swiping the app away makes iOS terminate it and it cannot report — [Troubleshooting](https://www.traccar.org/client-troubleshooting/)
- Traccar Client stop detection is on by default and pauses updates while stationary; Medium/Low accuracy modes save power — [Troubleshooting](https://www.traccar.org/client-troubleshooting/)
- OwnTracks Android: `gms` flavour on Google Play, `oss` flavour on F-Droid, APKs on GitHub — [GitHub](https://github.com/owntracks/android)
- OwnTracks modes: iOS Move (default 100 m / 300 s, battery like a navigation app, recommended mainly while charging or on trips); iOS Significant change (500 m in 5 min per Apple); iOS Manual/Quiet do not track in background. Android Move requests a GPS fix every 10 s by default; Significant about every 15 min — [OwnTracks location modes](https://owntracks.org/booklet/features/location/)
- Dawarich has official iOS (App Store) and Android (Google Play) apps and also accepts OwnTracks, Overland, GPSLogger, PhoneTrack — [GitHub](https://github.com/Freika/dawarich)

### Inferences
- A crew member force-quitting the app on iOS makes their position stale; the receptionist should treat position age as a first-class value (inferred).
- OwnTracks iOS is almost certainly on the App Store (the booklet refers to it), but I did not confirm a listing.

### Gaps
- No OS-level quantified battery drain figures from any vendor.
- OwnTracks iOS App Store listing not verified; the OwnTracks booklet pages for Android/iOS clients returned 404.
- Apple/Google permission-review requirements for a business app were not researched.

## Retention and deletion

### Takeaway
Traccar stores all history by default, has no documented built-in retention setting, but offers API deletes and a documented cron-based cleanup. Recorder writes history unless `--norec` is used and documents no general delete. Short-retention is therefore doable in Traccar through a scheduled delete, not as a setting.

### Cited Findings
- Traccar API: `DELETE /positions` (deviceId, from, to required) and `DELETE /positions/{id}`; `DELETE /devices/{id}` — [openapi.yaml](https://raw.githubusercontent.com/traccar/traccar/master/openapi.yaml)
- Traccar clear-history page gives a daily cron script deleting positions and events older than one year (interval editable), keeping each device's last position; it describes no built-in retention setting — [Clear history](https://www.traccar.org/clear-history/)
- Traccar optimisation page recommends regular cleanup of old location history — [Optimization](https://www.traccar.org/optimization/)
- Recorder: `--norec` stops `.rec` history being written (then `/locations` is useless); `last/` JSON keeps the last position; no general delete documented — [Recorder README](https://github.com/owntracks/recorder)
- Dawarich Cloud Lite: 12 months searchable history; Pro unlimited; exports GPX/GeoJSON/KML/JSON — [Dawarich Cloud](https://dawarich.app/cloud/)

### Inferences
- A service reading only "latest position" could work with a retention of hours or days by the owner running the DELETE endpoint on a schedule (inferred). Whether Traccar's own scripts keep a latest position after deleting all positions is documented only for the cron script.
- OwnTracks with `--norec` is the shortest-retention design, keeping only the last position (inferred from the README).

### Gaps
- Whether Traccar can purge hours-old positions through config (not found).
- Delete behaviour for Dawarich self-hosted not researched.

## Hosted version versus self-host only

### Takeaway
Traccar and Dawarich both sell vendor hosting; OwnTracks was not found to sell hosting.

### Cited Findings
- Traccar managed: Tracking Account from $9.95/month (single user account, shared server), Tracking Server from $49.95/month (dedicated, own branding); 7-day free trial; device limits not stated — [Pricing](https://www.traccar.org/pricing/), [Managed vs self-hosted](https://www.traccar.org/managed-vs-self-hosted/)
- Dawarich Cloud: Lite EUR 59.99/yr (200 API requests/hour, 12 months history), Pro EUR 119.99/yr or 10/month (1,000 requests/hour, unlimited history, write API), Family EUR 239.99/yr; 7-day trial; runs on Hetzner in Germany — [Dawarich Cloud](https://dawarich.app/cloud/)
- Third-party Traccar hosting exists (xCloud, from $24.99/month) — not official — via [search result](https://xcloud.host/traccar-hosting/) (not fetched; price from search snippet only)

### Inferences
- A Traccar Tracking Account is single-user, so one login per business, which fits the "owner connects a tool" model (inferred).
- No evidence OwnTracks has a hosted product: the booklet hosted-service URL I tried returned 404, which is not proof of absence.

### Gaps
- Whether the Traccar API and tokens are available on the $9.95 shared plan: pricing page says API access "not mentioned".
- Traccar managed device limits not stated.
- OwnTracks hosted offering not confirmed either way.
