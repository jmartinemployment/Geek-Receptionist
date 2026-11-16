# Geek-Receptionist-Portal

Where a Geek-Receptionist tenant's owner signs in and manages their receptionist. Plan: GeekBackend `docs/Geek-Receptionist.md`.

Next.js 16 (App Router). Geek-Receptionist has its own login; no other Geek service is used. The owner signs in with email and password
on `/login`; this server sends them to GeekAPI `POST /api/v1/owner-auth/sign-in` with `X-API-Key`, and keeps the access token (15
minutes) and the refresh token (30 days) in httpOnly cookies, so the browser's page never holds either. `proxy.ts` renews the access token
with `POST /api/v1/owner-auth/refresh` before a page renders; GeekAPI spends each refresh token once, and only its answer that the token
is unknown, expired or already used, or that the account's subscription is cancelled (`403 account_cancelled`), signs the owner out. Each sign-in also gives this browser a device token (90 days, httpOnly cookie
`rp_device`), sent with the next sign-in so GeekAPI's cap of 10 failed sign-ins per email per hour never keeps the owner out of a browser
they have signed in from; it signs nobody in. Sign-out calls `POST /api/v1/owner-auth/sign-out` and clears the two session cookies, not
the device cookie. The
sign-in and sign-out POSTs are refused unless they come from a page of this site (Origin check). This app talks only to GeekAPI.

## What exists

- `/login`, `/` and `/signed-out`: sign in. The login page shows a fixed sentence for each refusal code, never text from the address bar.
- `/dashboard`: the owner's Google Calendar status, from GeekAPI `GET /api/v1/tenants/{tenantId}/calendar/check`, and a button that starts
  the connection (`GET .../oauth/mcp/google_calendar/authorize`).
- `/oauth/mcp/google_calendar/callback`: where Google sends the owner back. It reads the one-time code, the sealed state and any error,
  removes them from the address bar and history, and sends them once to GeekAPI `POST .../oauth/mcp/google_calendar/complete`.
- The tenant is always taken from the owner's own `tenant_id` claim on the server, never from the browser's request.

## What does not exist

The `/signup` wizard (eligibility, PayPal, area code, owner account), the rest of the dashboard (live calls, appointments, knowledge,
settings, billing), and a Vercel project. Nothing has run against a real owner's login yet.

## Variables

| Variable | Default | Purpose |
|---|---|---|
| `GEEK_API_URL` | `https://api.geekatyourspot.com` | GeekAPI |
| `GEEK_BACKEND_API_KEY` | none | GeekAPI's key, server-only; unset, sign-in is refused (`portal_not_configured`) without calling GeekAPI |

Google's redirect address, registered on the OAuth client in project `geek-oauth-04-11-2026`, is
`https://receptionist.geekatyourspot.com/oauth/mcp/google_calendar/callback`, and GeekAPI's `PORTAL_BASE_URL` is
`https://receptionist.geekatyourspot.com`.

## Commands

`npm run dev` (port 3010), `npm run build`, `npm test`, `npm run typecheck`, `npm run lint`.
