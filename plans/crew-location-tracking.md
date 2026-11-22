# Crew location tools: plan (open source only, 2026-11-22)

## Context
The signup step "Crew location tools" is laid out but undefined. Jeff wants crew mobile-device location tied into the receptionist's dispatching, using open-source iOS and Android tracking apps. Commercial tools have no place in this plan (Jeff, 2026-11-22). Rules that apply: zero data retention by default; the owner, not us, decides how the receptionist behaves; no CRM; connect-then-test as with Drive.

Research: `research_notes/Crew location tracking and dispatch/open_source_trackers.md` and `consent_and_retention.md`.

## The open-source candidates found
- **Traccar:** Apache 2.0, Java server on any SQL database, phone apps on Google Play, the App Store and as a GitHub APK. REST API: `GET /positions` returns last-known positions, or history with a device id and time range; authentication is Basic, a session cookie or a bearer token. Self-hosted (free software, a VPS) or run by Traccar from $9.95 a month. History is kept by default; `DELETE /positions` removes a time range.
- **OwnTracks:** the Recorder is C, GPL v2 or later, stores plain files, has a read API (`/api/0/last`) that documents no authentication of its own. `--norec` keeps only the last position. Android and iOS apps exist; the iOS listing and licence were not confirmed.
- **Dawarich:** AGPL-3.0, personal location history, not fleet software.
- **Not yet researched:** Nextcloud PhoneTrack, Overland, GPSLogger. Jeff's two apps are not yet named; they are most likely Traccar and OwnTracks.

## What constrains the design
- A phone's position is often old (iOS force-quit, battery savers, stationary pause), so position age is part of every answer.
- Both apps need "always" location permission and battery exemptions on the crew's phones.
- Our side reads a position on request and stores nothing. The tracker's own server keeps what it collects; Traccar can be given a cleanup schedule.
- Consent and notice duties are the owner's. This is research, not legal advice; some state statutes were not read in full.

## Decisions for Jeff (none made here)
1. Who runs the tracking server: we run one Traccar for all businesses, each business runs its own, or Traccar's hosted service.
2. How the owner connects: Traccar's API takes a pasted token, not a sign-in.
3. Whether OwnTracks is offered at all (no authentication of its own).
4. How the receptionist uses a location: answer "can someone get there today", suggest a technician, or assign a job.
5. How old a position may be before it is called stale; wording of the owner's crew-notice acknowledgment; whether lookups are limited to work hours.

## Order of work after the current setup flow
1. Jeff names his two apps and answers 1 to 3.
2. Research what remains: Traccar token scoping and rate limits, whether its API is on the hosted plan, PhoneTrack, Overland and GPSLogger, and dispatch (assigning a job) on an open-source base.
3. Lay out the screens, calling nothing: choose the tracker, connect, tested position and its age, setup questions, acknowledgment, disconnect.
4. Jeff approves layout and wording.
5. Only then wire GeekAPI.

## Not done
No code, no migration, nothing on GeekAPI.
