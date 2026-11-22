# Crew location tools: plan (updated after the research, 2026-11-22)

## Context
The signup step "Crew location tools" is laid out but undefined. Jeff wants crew mobile-device location tied into the receptionist's dispatching, and has found open-source iOS and Android tracking apps (names not yet given). Rules that apply: a vendor runs the connection and the owner signs in; zero data retention by default; the owner, not us, decides how the receptionist behaves; no CRM; connect-then-test as with Drive.

The research is `plans/crew-location-research.md` (notes behind it: `research_notes/Crew location tracking and dispatch/`). Read it for sources and for what was not verified.

## What the research found
- **Best fit:** a vendor-run OAuth connection to a tool the owner already uses. ServiceM8 is the only one found where staff GPS and job assignment sit under one owner approval. Motive, Samsara and Verizon Connect report vehicles, not people.
- **Fails "the owner signs in":** Geotab (shared service-account password) and Housecall Pro (API key, MAX plan only).
- **Open-source:** Traccar is the only fleet-grade one; its API takes a pasted token or Basic credentials, not a sign-in, and self-hosting means we or the business run a server. OwnTracks' Recorder documents no authentication. Dawarich is personal software.
- **Nothing stored on our side** fits ZDR, but no tool offers store-nothing; the vendor keeps what it collects.
- **Positions go stale** (iOS force-quit, battery savers, stationary pause, privacy modes), so position age is part of every answer.
- **Consent:** the rules are the owner's to meet; no source found says non-retention removes the notice duty. This is research, not legal advice.

## Decisions for Jeff (none made here)
1. Which location sources to offer (ServiceM8, Motive, Samsara, Verizon Connect, Traccar managed, or "we do not use a location tool").
2. Whether Traccar and OwnTracks are offered at all, given the sign-in and hosting findings. Jeff's two open-source apps are still unnamed.
3. How the receptionist uses a location: answer "can someone get there today", suggest a technician, or assign a job (whether it writes to dispatch at all).
4. Person or vehicle wording; how old a position may be before it is called stale.
5. Wording of the owner's acknowledgment that crew have been told, and whether lookups are limited to work hours.

## Order of work after the current setup flow
1. Jeff names the open-source apps and answers decisions 1 and 2.
2. Close the research gaps that block building: whether Jobber, Housecall Pro, Workiz and ServiceTitan expose technician GPS; vendor access terms (ServiceM8 Development Partner, Motive developer account, Samsara partner); Traccar token scoping.
3. Lay out the screens first (source, connect, tested position and age, setup questions, acknowledgment, disconnect), calling nothing, as with Drive.
4. Jeff approves the layout and wording.
5. Only then wire GeekAPI: connect through the vendor's sign-in, read one position and its age to prove it, store nothing.

## Not done
No code, no migration, nothing on GeekAPI.
