# The /signup step order, as the code runs it — 2026-11-21 (updated: the eight industry questions now share one screen)

**Current order, 2026-11-22 (the table below is the 2026-11-21 record and is out of date on these points).** Robot check, who, the
business, eligibility (this now creates the business: there is no `industries` gate and no "Your business" screen), then nine setup
steps in this order: Recording, Scheduling and Crew location tools (all three laid out only: they ask a yes or no and call nothing),
When you're open, What it should ask, What it should know, After the call, Appointments, Your greeting; the working connect-and-prove version of Recording and Scheduling is on the branch `connect-and-prove`, not in
production, until the workflow is defined and the functionality is proven; then the Terms, the plan, the payment method, the number, the login.
The order lives in `CONFIG_STEPS` (`src/lib/signup/state.ts`) and `STEPS` (`src/app/signup/page.tsx`).

**What this is for: the step order is written down in three places and two of them are wrong**, so anyone asking "what
does signup do" gets a stale answer. `CLAUDE.md` still calls `/signup` "a five-step flow" and numbers
`activate-subscription` as step 4; `README.md` is stale on `/` being a sign-in page. This is the order read off the code
at `30bdd94`, with the file that decides each one. It is a record, not a proposal: nothing here is a change to make.

## The order

Fourteen screens, plus the robot check before them: two screens asking who is talking to us, the person and then the business apart from each other, were added 2026-11-21 (it was twenty before the eight industry questions shared one screen). The bracketed numbers are `src/app/signup/actions.ts`' own comments,
which skip the six receptionist steps — that is why the numbering jumps from 3 to 4.

| # | Screen | Decided by | What happens |
|---|---|---|---|
| — | Robot check | `captcha.ts`, `RobotCheckButton` | reCAPTCHA. A gate, not a numbered step |
| **[1]** | Eligibility: is the business in the United States, then eight excluded-industry questions | `eligibilityAction` | One screen (the country question moved onto it, Jeff, 2026-11-21). A no to the country ends the signup and says so; nothing is sent to GeekAPI. The eight: three headings, each question its own yes or no, none pre-selected, all required. All noes are one `industries` gate; a yes to any ends it, is sent at once with all eight answers (`industry-refusals`) and is kept forever |
| **[3]** | Your business | `businessAction` | Name, what it does, state, email, phone, AI-disclosure checkbox, plus all eight noes → `validate-eligibility`. **A tenant now exists, `pending_payment`** |
| | Your greeting | `saveConfigStep` | ↓ |
| | When you're open | `saveConfigStep` | ↓ |
| | What it should ask | `saveConfigStep` | the six receptionist steps, unnumbered, in `CONFIG_STEPS` order |
| | What it should know | `saveConfigStep` | each one → `receptionist-config` |
| | After the call | `saveConfigStep` | ↓ |
| | Appointments | `appointmentsAction` | records `BookingRequested`; does not switch booking on |
| **[4]** | Choose a plan | `choosePlanAction` | `paypal/subscription`, then the visitor approves at PayPal and returns to `/signup/paypal/subscribed` |
| **[5]** | Save a payment method | `savePaymentMethodAction` | `paypal/vault` for overage, approved at PayPal, returns to `/signup/paypal/saved` |
| **[6]** | Your receptionist's number | `activateAction` | Area code → `activate-subscription`. **This is the step that spends money**: PayPal is checked, a number is bought, the tenant becomes `active` |
| **[7]** | Your login | `createLoginAction` | `create-owner-login`, then signed in and sent to `/dashboard?notice=signup_complete` |

## Where the progress lives

- **Before [3]: `rp_gates`**, HMAC-signed with `RECAPTCHA_SECRET_KEY` so a visitor cannot write `captcha` into it and
  skip the check. `GATES` is `captcha`, `who`, `company` and `industries` — the last meaning a yes to the country question and a no to all eight.
  Country is only a bookmark; GeekAPI decides it again at [3].
- **From [3]: `rp_signup`**, httpOnly, one day, **ids only** — tenant, PayPal subscription, setup token, vault token,
  number, and which receptionist steps are done. Never an answer, never a password. A greeting and a question list would
  overflow a 4 KB cookie and break resumption silently; the row already holds them.

## The three gates that fix this order

Each is enforced by GeekAPI, not by the form, so the order cannot be rearranged in the portal alone.

1. **No tenant before [3].** `validate-eligibility` is what creates it. Everything before is a signed cookie.
2. **No login before the tenant is active.** `OwnerAuthService.CreateLoginAsync` refuses `409 tenant_not_active` —
   *"An owner login can be created only after the subscription is active"* — and the tenant becomes active at [6]. The
   portal enforces the same order: `createLoginAction` refuses with `signup_expired` without `state.phoneNumber`.
3. **No calendar connection anywhere in the form.** `McpConnectionService.BeginAsync` refuses the same way, and
   `CompleteAsync` refuses unless the approving owner's `tenant_id` matches the one sealed in the OAuth state — which
   needs the login from [7]. So connecting lives on the dashboard, and [appointments] records the answer for
   `HonourBookingRequestAsync` to act on when a calendar finally arrives.

Also fixed by GeekAPI: the six receptionist steps are refused once the business is active, so they cannot move after
[4]–[6]. `CONFIG_STEPS`' own comment gives the reason they sit where they do — *"a business sees what it is configuring
before it is asked to pay for it."*

## What is written about this and is wrong

- Fixed 2026-11-21, with the one-screen change: `CLAUDE.md` called this "a five-step flow" and numbered
  `activate-subscription` step 4, and `README.md` listed five steps. Both now describe the order above.
- Still stale in `CLAUDE.md`: its note that `README.md` is wrong about `/` being a sign-in page — the README no longer says so.

## Changes proposed to this order, and where they are

`plans/attestation-and-terms.md`, which is a plan and not this record:

- ~~the eight screens of [2] as one grouped screen~~ — done, see above,
- an attestor's name, title and truth checkbox added to [3],
- Terms acceptance, which nothing in this order currently does.
