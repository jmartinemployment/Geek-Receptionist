
## Status: stopped (Jeff, 2026-11-24)
Jeff stopped the project on 2026-11-24 and said "I've 410'd the pages" (the public receptionist pages now answer 410 Gone). Nothing else has been cancelled or deleted by this note: the Twilio numbers, PayPal plans, Railway and Vercel services, and the code are unchanged until Jeff says otherwise.

**Why, in his words and numbers.** He asked for worst-case numbers, with no optimistic case. At about $0.18 a minute (my assumption, not measured), every included minute used, PayPal at 3.49% plus $0.49 (unverified): Starter keeps about $11, Standard about $0, Pro loses about $39, Premium loses about $74 a month. Pro and Premium sell minutes at $0.15, below that cost.

**What was never measured.** Whether Twilio's ConversationRelay $0.07 a minute includes text-to-speech and speech recognition: no Twilio page says (pricing page and docs read 2026-11-24). The AI model cost per call, the voice tier and the PayPal fee were all assumptions. Twilio's console usage page (Monitor, Usage) for any past test call, or one call, would have replaced them with real figures. Nobody ran it.

**If it is ever reopened:** measure first (usage records for one call, and ask Twilio in writing what the $0.07 covers), then price the larger tiers against the measured cost per minute. Cheaper paths noted but not priced: Media Streams at $0.0044 a minute (own speech and voice vendors, a rebuild), free basic voices, and other carriers. GoHighLevel was researched and parked: `plans/gohighlevel-findings.md`.
