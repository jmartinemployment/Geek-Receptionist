# Geek-Receptionist-Portal

Where a Geek-Receptionist tenant's owner signs in and manages their receptionist. Plan: GeekBackend `docs/Geek-Receptionist.md`.

Next.js 16 (App Router). Sign-in is GeekOAuth Authorization Code + PKCE, client `geek-receptionist`, with the same cookie and refresh
arrangement as geek-social. The owner's tokens stay in httpOnly cookies; the browser never holds one. This app talks only to GeekOAuth and
GeekAPI.

## What exists

- `/` and `/signed-out`: sign in.
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
| `NEXT_PUBLIC_AUTH_URL` | `https://auth.geekatyourspot.com` | GeekOAuth |
| `NEXT_PUBLIC_GEEK_API_URL` | `https://api.geekatyourspot.com` | GeekAPI |
| `NEXT_PUBLIC_APP_URL` | the Vercel production host, else `http://localhost:3010` | Builds the redirect address registered at GeekOAuth |
| `NEXT_PUBLIC_OAUTH_CLIENT_ID` | `geek-receptionist` | The GeekOAuth client |

Registered redirect addresses (GeekOAuth `OidcPublicClientSeeds`): `https://receptionist.geekatyourspot.com/auth/callback` and
`http://localhost:3010/auth/callback`. Google's redirect address, registered on the OAuth client in project `geek-oauth-04-11-2026`, is
`https://receptionist.geekatyourspot.com/oauth/mcp/google_calendar/callback`, and GeekAPI's `PORTAL_BASE_URL` is
`https://receptionist.geekatyourspot.com`.

## Commands

`npm run dev` (port 3010), `npm run build`, `npm test`, `npm run typecheck`, `npm run lint`.
