# Geek-Receptionist

Where a Geek-Receptionist tenant's owner signs in and manages their receptionist. Plan: GeekBackend `docs/Geek-Receptionist.md`.

Next.js 16 (App Router), TypeScript and Tailwind CSS 4, rendered on the server first. Geek-Receptionist has its own login; no other
Geek service is used, and this app talks only to GeekAPI.

## How it is built

- **Pages are Server Components.** Every page fetches from GeekAPI on the server, so the first answer is complete HTML. Only four small
  components run in the browser: the login form, the one-button form (`ActionButton`), and the one-time notice.
- **No full-page posts.** Every form is a Server Action run through `useActionState`: sign in, sign out, Connect Google Calendar and Pay
  now. The page never reloads; a failure stays on screen under the button, and success moves on with `redirect()`. Next.js refuses a
  Server Action whose Origin is not this site, so another site cannot sign a visitor in or out. A charge is bound to its Pay now button on
  the server (`.bind`), never put in a hidden field.
- **Streaming.** `/dashboard` sends its heading at once and each card (Subscription, Google Calendar) streams in under its own
  `Suspense` boundary as GeekAPI answers; `loading.tsx` shows the card skeletons while the page starts. Links are `next/link`.
- **Return trips are done on the server.** Google and PayPal send the owner back to Route Handlers
  (`/oauth/mcp/google_calendar/callback`, `/billing/paid`) that hand the one-time code or order to GeekAPI before anything is drawn, then
  send the owner to `/dashboard?notice=...` (or `calendar_error=` / `payment_error=`), which shows a fixed sentence for that code in a
  notice and takes the code out of the address bar. Nothing typed or sent by another site is ever shown as text.
- **No optimistic display of payments.** A payment shows as paid only after GeekAPI says PayPal completed it.

## Sign-in

The owner signs in with email and password on `/login`; the Server Action sends them to GeekAPI `POST /api/v1/owner-auth/sign-in` with
`X-API-Key`, and keeps the access token (15 minutes) and the refresh token (30 days) in httpOnly cookies, so the browser's page never holds
either. `proxy.ts` renews the access token with `POST /api/v1/owner-auth/refresh` before a page renders, and sends a visitor with no
sign-in from `/dashboard` to `/login` before anything streams; GeekAPI spends each refresh token once, and only its answer that the token
is unknown, expired or already used, or that the account's subscription is cancelled (`403 account_cancelled`), signs the owner out. Each
sign-in also gives this browser a device token (90 days, httpOnly cookie `rp_device`), sent with the next sign-in so GeekAPI's cap of 10
failed sign-ins per email per hour never keeps the owner out of a browser they have signed in from; it signs nobody in. Sign-out calls
`POST /api/v1/owner-auth/sign-out` and clears the two session cookies, not the device cookie.

## What exists

- `/login`, `/` and `/signed-out`: sign in. A refusal shows one of the login page's fixed sentences, and the email typed stays.
- `/dashboard`: the subscription, from GeekAPI `GET /api/v1/tenants/{tenantId}/billing` (active with its month's end, or suspended with
  the day the receptionist stops answering, a note when PayPal could not take the monthly payment, and each unpaid overage with Pay now),
  and the Google Calendar status, from `GET .../calendar/check`, with Connect Google Calendar.
- `/billing/paid` and `/oauth/mcp/google_calendar/callback`: the return trips above.
- The tenant is always taken from the owner's own `tenant_id` claim on the server, never from the browser's request.

- `/signup`: self-service signup, five steps, each a Server Action. (1) The business and the compliance statement go to GeekAPI
  `POST /api/v1/onboarding/validate-eligibility`, which makes the tenant. (2) A plan: GeekAPI `POST .../onboarding/paypal/subscription`
  starts a PayPal subscription to that tier's plan, the visitor approves it in PayPal and comes back to `/signup/paypal/subscribed`.
  (3) Saving the PayPal account for overage minutes: `POST .../onboarding/paypal/vault`, approved in PayPal, back to
  `/signup/paypal/saved`, which calls `.../paypal/vault/complete`. (4) The area code: `POST .../onboarding/activate-subscription` checks
  both with PayPal, then buys the number and sets up the receptionist; this is the step that spends money. (5) The owner's login:
  `POST .../onboarding/create-owner-login`, then sign-in and the dashboard. Every onboarding call carries GeekAPI's key, the visitor's
  address (`X-Visitor-Ip`) and Vercel's country for it (`X-Visitor-Country`, from `x-vercel-ip-country`), which GeekAPI requires;
  signup therefore cannot pass its first step on this machine. Progress between steps and across the PayPal trips is an httpOnly cookie
  (`rp_signup`, one day) holding ids only, never a password.

## What does not exist

Guided trade setup after signup, and the rest of the dashboard (live calls, appointments, knowledge, settings). Nothing has run against
a real owner's login yet: no tenant is active.

## Variables

| Variable | Default | Purpose |
|---|---|---|
| `GEEK_API_URL` | `https://api.geekatyourspot.com` | GeekAPI |
| `GEEK_BACKEND_API_KEY` | none | GeekAPI's key, server-only; unset, sign-in is refused (`portal_not_configured`) without calling GeekAPI |

Google's redirect address, which must be registered on the OAuth client in project `geek-oauth-04-11-2026` (on 2026-11-16 the client still
holds only the earlier `receptionist.` address), is
`https://geek-receptionist.geekatyourspot.com/oauth/mcp/google_calendar/callback`, and GeekAPI's `PORTAL_BASE_URL` must be
`https://geek-receptionist.geekatyourspot.com` (it is still the earlier address on 2026-11-16).

## Repository and hosting

GitHub: `jmartinemployment/Geek-Receptionist`, branch `main`. Hosting: Vercel project `geek-receptionist`, at `https://geek-receptionist.geekatyourspot.com`
(CNAME at Namecheap, certificate issued 2026-11-16). Licence: MIT (`LICENSE`).

## Commands

`npm run dev` (port 3010), `npm run build`, `npm test`, `npm run typecheck`, `npm run lint`.
