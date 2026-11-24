# GoHighLevel: what it is and what it means for Geek-Receptionist

Researched 2026-11-24 from official HighLevel help and developer pages plus third-party sources. The long working notes and the full draft are in the session scratchpad; this is the short version. Each point says whether it is official, third-party, or unverified.

## What it is
- An all-in-one CRM and marketing platform: contacts, pipelines, calendars, texting and email, funnels and sites, phone, reputation, workflows, AI agents. Built in 2018 for agencies to resell under their own brand to small businesses. (official)
- Two levels: the agency, then a sub-account per client business.
- Plans per month: Starter $97, Unlimited $297, and $497 (called Founder, SaaS Pro or Agency Pro on different pages). The $497 plan is the one that allows white-label reselling and rebilling with markup. Usage (texts, calls, email, AI) is billed on top. (official; the pricing pages disagree with each other in places)
- Users: "2.2 million businesses" on its About page, but a March 2026 release says about 120,000 customers. The difference is likely agency clients counted as businesses. (the explanation is one analyst's, unconfirmed)

## Is it a first CRM for a business with nothing?
- No evidence either way. No case study found. Reviewers praise replacing several tools; critics call it an agency tool that is complex for a solo owner. (third-party, much of it affiliate-linked)
- So offering it to a no-CRM client is a judgment call, not something the research supports or rules out.

## Your "approved partner" status
- No HighLevel page defines an "approved partner" title. (one third-party page; not proof)
- The real programs: a 40% recurring affiliate commission; a Partner Network for service providers (needs the $497 plan and three exams, matching starts 4 Jan 2027); and Marketplace app developer status. White-label is a plan feature, not a partner status.
- Which of these you hold can only be seen in your own HighLevel account.

## Competition
- HighLevel has its own AI receptionist ("Voice AI"): $50 or $97 per sub-account per month, plus about $0.045 a minute and voice and model charges. It answers calls, books into HighLevel calendars, transfers to people, and handles after-hours. (official)
- It runs only on HighLevel numbers or Twilio numbers. No bring-your-own carrier. (official, partly)
- A business already living in HighLevel has a cheaper built-in option than yours. A business not in HighLevel does not.

## If a client does use HighLevel, how we would connect
- No approval from HighLevel is needed. The client's own token plus their account's Location ID is enough, or a Marketplace app with OAuth. (official docs; competitors do it this way)
- Documented and usable: create or update a contact, find free slots, book and cancel appointments, add notes and tasks.
- Weak spot: the call record. The documented fields are only to, from and status. A note on the contact is the proven way to log a call. Needs a live test.
- No duplicate protection on contacts or notes, so we would need our own.
- Limits are generous: 100 requests per 10 seconds, 200,000 a day.
- Refresh tokens are single use, so refreshes must be one at a time.
- HighLevel's MCP server is for an owner's own assistant, not for a service like ours.
- Cost to us: a Marketplace app needs review. HighLevel takes no commission until 31 Dec 2026; the rate after is unpublished. A private app is capped at 5 installing agencies.

## What this means for the signup
- Other receptionist vendors (Rosie, Dialzara, My AI Front Desk) lead with a calendar plus a text or email to the owner, and treat the CRM as optional. That supports a short path for a business with nothing. (vendor pages; no retention data exists)
- A "what do you already use?" question would decide the path. It is a client question, so it comes to Jeff as a list of choices to edit, not as code.
- Putting call summaries or recordings into a client's HighLevel is call content leaving us for the client's own system. That is the client's setting under the ZDR policy, never ours.

## Gaps
- Official affiliate policy and the March 2026 release were not read.
- Whether a call record can carry duration, transcript or recording was not tested.
- Whether a token-only integration can receive webhooks is unknown.
- Whether other receptionist vendors lack a HighLevel connector rests on search results only.
- No independent reviews of HighLevel's Voice AI quality were found; complaints come from vendors selling replacements.

## Decision (Jeff, 2026-11-24)
The $497-a-month plan, which white-label reselling and the Partner Network require, "kills my idea, for now". Not pursued: reselling HighLevel, the Partner Network, and a HighLevel connector (a client already on HighLevel has its own AI receptionist). Still free and open if wanted later: the affiliate referral (40% recurring, no plan needed, official terms not read).
