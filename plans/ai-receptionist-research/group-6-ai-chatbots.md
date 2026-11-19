# Group 6: AI chatbots (BotPenguin, Manychat, Tidio/Lyro, Dapta, My AI Front Desk chat widget)

Read 2026-11-19. Facts come only from the pages named. Every fact carries a source key, and each section starts with the key-to-URL list. "not found" means the pages I read do not say.

Markings:
- **[excerpt]**: a vendor page I could not open directly. The fact comes from a search engine's excerpt of that vendor URL. Lower confidence.
- **[community]**: Manychat's own forum (community.manychat.com). It is vendor-hosted, but posts come from staff, moderators or users. I name the poster's role where the page shows it.
- **[third-party]**: not the vendor.

Access problem: manychat.com and help.manychat.com refused every direct fetch with HTTP 403. **All Manychat facts are [excerpt] or [community].**

The owner's pages under `geekatyourspot/content-writer-output/marketing/Cross-Platform Chatbot/tools/` were read for context only. Nothing below is taken from them.

---

## 1. Tidio (including Lyro AI Agent)

Sources:
- [P] https://www.tidio.com/pricing/
- [Home] https://www.tidio.com/
- [F] https://www.tidio.com/features/
- [I] https://www.tidio.com/integrations/
- [Ed] https://www.tidio.com/editions/
- [Priv] https://www.tidio.com/privacy-policy/
- [Acct] https://help.tidio.com/articles/create-account-log-in/
- [Check] https://help.tidio.com/articles/getting-started-checklist/
- [Inst] https://help.tidio.com/articles/install-website/
- [Lyro] https://help.tidio.com/hc/en-us/articles/9003475527196-Lyro-the-conversational-AI-chatbot
- [Quick] https://help.tidio.com/hc/en-us/articles/15607494952604-Lyro-a-quick-setup
- [DS] https://help.tidio.com/articles/lyro-data-sources/
- [Act] https://help.tidio.com/articles/lyro-actions/
- [Tr] https://help.tidio.com/hc/en-us/articles/5463385056284-Chat-transcripts
- [Guid] https://help.tidio.com/hc/en-us/articles/20810956911004-Lyro-Guidance **[excerpt]**
- [Notif] https://help.tidio.com/hc/en-us/articles/5401257409308-Tidio-notifications and https://help.tidio.com/hc/en-us/articles/5422847876380-Offline-email-notifications **[excerpt]**
- [Inbox] https://help.tidio.com/hc/en-us/articles/6105231808796-The-Inbox-a-powerful-interface-for-managing-your-conversations **[excerpt]**
- [GDPR] https://help.tidio.com/hc/en-us/articles/5462910440220-Privacy-Policy-and-GDPR-Compliance **[excerpt]**
- [VisHist] https://help.tidio.com/hc/en-us/articles/12425531041052-How-visitors-can-remove-their-chat-history **[excerpt]**
- [LiveConv] https://help.tidio.com/hc/en-us/articles/5401394437020-Live-chat-conversations **[excerpt]**
- [GS] https://help.tidio.com/hc/en-us/articles/5376869447196-Getting-started-with-Tidio (an index page whose summaries point to https://help.tidio.com/articles/customize-widget/, https://help.tidio.com/articles/start-collecting-leads/ and https://help.tidio.com/articles/troubleshooting-flow-widget-display/)

### 1.1 Who it is for, sales model, pricing
- **Customers:** "Trusted by 300,000+ businesses." The home page leans to e-commerce: Shopify, cart recovery, "40+ ecommerce templates." It names no company size and describes a path "from free to enterprise" [Home].
- **Sales model:**
  - Self-serve: "Get started free" sign-up, a no-card trial, then pick a plan [Acct][P].
  - Sales-led at the top: Plus is "Starts at $300/mo" plus usage, and Premium is "Contact for pricing" [P].
- **Pricing model:** a plan per project with a monthly quota of conversations. AI and human conversations share the one quota [P].
  - "A conversation is an interaction that includes at least one message from your team or Lyro AI Agent."
  - Visitor messages that nobody answers do not count, and spam does not count.
  - "One conversation always uses exactly one unit of your quota" [P].
  - Lyro's article counts one use "each time Lyro responds first in a thread." A thread closes after 15 minutes of inactivity [Lyro].

| Plan | Price | Included | Seats |
|---|---|---|---|
| Free | $0 | 50 human conversations and 100 Flows visitors a month, plus a one-time 50 Lyro AI conversations that does not renew [P] | [Acct]: "10 agent seats and 50 conversations per month" |
| Starter | $33/mo shown, "Billed annually: $390 /yr"; no separate monthly-billed price shown | 50 AI + human conversations, live chat, ticketing and social channels, live visitors list, operating hours, basic analytics, 100 Flows visitors, Lyro for chat and email, product recommendations, Lyro custom name, 5 Guidance instructions, 3 Smart Actions + 3 MCP tools [P] | Up to 10 [P] |
| Growth | From $63/mo, $750/yr | Quota 50 to 1,000 conversations (choices 50/100/200/300/500/750/1,000), 5 Smart Actions + 5 MCP tools, 5 Guidance instructions [P] | Up to 10 [P] |
| Plus | From $300/mo "+ monthly usage" | Custom quota, 10 Smart Actions + 10 MCP tools, 10 Guidance instructions, "Discounted usage rates" with no amounts given [P] | Custom [P] |
| Premium | Contact for pricing | From 3,000 Lyro conversations; "guaranteed 50% resolution rate and pay-per-resolution billing, both by agreement" [P] | Custom [P] |

- **Overage:** the page lists no per-conversation rate [P].
  - Automatic upgrades on: at 95% of the limit, the account moves to the next tier and pays that tier's price from then on.
  - Automatic upgrades off: you raise the limit yourself.
- **Add-ons** [P]. Annual billing gives "2 months free" on Starter, Growth, Flows, Inbox AI and Voice.

| Add-on | Price | What it is |
|---|---|---|
| Flows | $24/mo | 2,000 visitors reached by default |
| Inbox AI | From $8/mo | Reply-drafting tools for agents. "It doesn't answer customers on its own." |
| Help Center | $10/mo | No article limit, 7-day trial |
| Voice | $16/mo | 20 voice conversations by default. "Make and receive customer calls directly from your Tidio Inbox. Available in the US, Canada, Australia, and the UK." No free trial. |
| No Tidio branding | $20/mo | Removes "Powered by Tidio" from the widget, Help Center and email footers |

- **Trial:** "All paid plans come with a 7-day free trial, no credit card required. The trial starts automatically when you create your account." It includes Growth features and Lyro. Afterwards the account drops to Free unless a paid plan is chosen [P].
- **Contradictions:**
  - The home page's structured data lists paid tiers "from $29 to $2,999 per month" [Home]. The pricing page shows Starter at $33/mo [P].
  - Active Actions per plan [P][Act]:

    | Plan | Pricing page [P] | Lyro Actions article [Act] |
    |---|---|---|
    | 7-day trial | not stated | up to 3 |
    | Free, or a paid plan without the Lyro package | not stated | 1 |
    | Starter | 3 | Lyro package: up to 3 |
    | Growth | 5 | Lyro package: up to 3 |
    | Plus | 10 | up to 10 |
    | Premium | Custom | more than 10 |

  - Voice: the pricing page sells a Voice add-on [P]. The Editions page lists "Lyro Voice" under "Exploring ... In discovery with customers, no date yet": "Lyro answers the phone, resolves what it can from the same knowledge it uses in chat, and opens a ticket for the rest" [Ed]. The pricing page does not say the AI answers Voice calls.

### 1.2 Sign-up and setup flow (in order)
1. **Sign-up form** at tidio.com, "Get started free" [Acct].
   - Asks for login email, password and website address. Facebook sign-up and starting from a platform plugin are alternatives.
   - The visitor accepts the Terms & Conditions and Privacy Policy.
2. **Configuration survey**, up to five short screens [Acct]:
   - **Screen 1:** your name, and "My main goal for using Tidio is...". Choices: Offer human support / Generate leads / Automate my support system with AI Agent / Increase sales. Then which channels you will use: Website live chat, Email, Facebook Messenger, Instagram, WhatsApp, Other. "The goal only affects your first steps."
   - **Screen 2:** "Do you want AI Agent to resolve repetitive questions?" Answering "Yes, let's automate them" asks you to confirm the website address "so Lyro ... can learn from its public information."
   - **Screen 3:** business model, industry, monthly customer conversation volume.
   - **Screen 4:** department, how you heard about Tidio, monthly website visitors, website platform, number of support agents, and whether you want a live demo. "Yes" may show a calendar to book one.
   - Plugin and phone sign-ups get fewer questions.
3. **Lyro syncing:** a loading screen while Lyro reads the website, if that was chosen [Acct].
4. **Landing:** the "Getting started" page with a "Your first steps" checklist that depends on the goal. AI-goal sign-ups may land in Lyro's settings instead. After the trial or the tasks, the Dashboard [Acct].
   - The checklist for the "Automate ... with AI Agent" goal, in order [Check]:
     1. Set up Lyro AI Agent (add knowledge)
     2. Test Lyro AI Agent in the Playground
     3. Activate Lyro AI Agent
     4. Review your welcome message (Edit Flow)
     5. Set up your primary channels (install the widget, connect a support mailbox)
5. **Lyro quick setup**, "In just 10 minutes" [Quick]:
   - **Add knowledge.** "To activate or test Lyro, you must first provide it with knowledge."
   - **Test in the Playground.** "Test questions don't count toward your Lyro conversations limit."
   - **Choose when Lyro answers:** "Always" or "Only when human agents are offline."
   - **Set handoff** under Behavior > Handoff.
   - **Activate** with the toggle in Channels. It stays greyed out until knowledge exists. Turning Lyro on disables existing "Visitor says" flows.
6. **Install the widget** [Inst]:
   - **Plugin route:** Shopify, WordPress, WooCommerce or BigCommerce app/plugin.
   - **Manual route:** copy the JavaScript snippet from Settings > Live Chat > Installation and paste it "just before the </body> tag."
   - **Developer route:** "Send instructions via email" sends the instructions to your developer.
   - **Verification:** the Installation page shows "Chat Widget is installed properly" once the site is visited.
   - **Several sites:** use the same code on each, and add each domain to Trusted domains if the widget is limited.
- **Before payment:** all of the above. No card at sign-up, and nothing is charged unless a paid plan is chosen [P].
- **How the business's information is gathered:**
  - The website URL at sign-up (Lyro learns from public pages) [Acct].
  - Later, through Data sources (see 1.3).
- **Preview:** Playground with Live chat and Email tabs, and a "Test Lyro" button [Lyro][Quick]. Flows are tested "in a fresh private browsing session" [GS].
- **Time to live:** "In just 10 minutes" for Lyro [Quick]. The home page makes no setup-time claim [Home].

### 1.3 How the assistant is configured
- **Name:** Configure > General, up to 20 characters [Lyro]. "Lyro custom name" is listed on Starter and up [P].
- **Tone:** neutral, friendly, formal, or a custom prompt, set under Behavior > Guidance. Emojis can be turned off [Lyro].
- **Guidance (rules):** instructions for escalation and communication style [Guid].
  - Examples: "Escalate to a human agent if the visitor requests a refund or wants to cancel an order"; "Escalate ... immediately if the customer is angry or annoyed."
  - Guidance "cannot instruct Lyro to use specific data sources; call Actions; change or access other settings."
  - Count by plan: 5 on Starter and Growth, 10 on Plus, custom on Premium [P].
- **Limits on what the AI says:**
  - Lyro "prioritizes brand safety by utilizing solely the data you provide."
  - "If the answer lies beyond the available data, Lyro will seamlessly redirect the question to a human agent" [Lyro].
  - Audiences restrict which knowledge applies to which visitors [Lyro][DS].
  - Source links can be shown at the bottom of answers, and "Review sources" shows the exact source used [DS].
- **Knowledge sources** [DS]:

| Source | Limits and notes |
|---|---|
| Website URL | "Scan priority pages" (up to 100 pages) or a single page; up to 500 URLs overall. Q&As are extracted per page and can be edited. |
| Manual Q&A | No limit stated |
| CSV | 500 entries and 512 KB per file; 10,000 entries in total |
| PDF | 10 files at a time, 30 MB each, 50 MB total |
| Suggestions | Built from unanswered live-chat questions |
| Chat collection | Built from chats solved by agents; entries are disabled until reviewed |
| Zendesk articles | Public articles only |
| Product sync | Shopify, WooCommerce or API; "Product feed upload" on Plus only |
| Help Center articles | Needs the Help Center add-on |
| HTML via API | Plus only |

  - Weekly automatic re-sync is on Plus and Premium only. A manual re-sync replaces the extracted Q&As, so manual edits to them are lost [DS].
- **Greeting:** set through a Flow ("Review your welcome message") [Check].
- **Widget look:** colors, welcome screen, texts, position and visibility, in Settings > Live Chat > Appearance [GS].
- **Business hours:** "Operating hours" is on Starter [P]. Handoff behavior is set separately for online and offline times: transfer the chat, keep it with Lyro, or create a ticket [Lyro].
- **Handoff to a person** [Lyro]:
  - The visitor can pick "Talk to a person." Lyro also hands off when it cannot answer.
  - Handoff audiences and predefined handoff messages can be edited.
  - Handoff tickets "include a transcript of the conversation" [Lyro, **excerpt**].
- **Booking:** a Lyro Action template for booking a call through Calendly [Act].
  - Actions call external APIs. Their instructions can be "up to 10,000 characters."
  - "Lyro does not validate or roll back your integrations" [Act].
- **Lead capture:** Pre-Chat Survey, Flows and live chats collect contact details and newsletter consent [GS].

### 1.4 Channels
- **Website live chat:** on by default [Lyro].
- **Messenger, Instagram, WhatsApp:** can be turned on for Lyro [Lyro][Quick].
- **Email:** Lyro answers email "starting October 26, 2026," the first email and replies in the same thread. Emails with attachments are left to the team [Lyro].
- **Phone:** the Voice add-on, US/CA/AU/UK, "make and receive customer calls ... from your Tidio Inbox." The page does not say the AI answers calls [P]. "Lyro Voice" is listed as exploratory [Ed].
- **SMS:** not found. The features page lists the channels as Live Chat, Email, Instagram, Messenger, WhatsApp [F].

### 1.5 After each chat
- **Transcripts** [Tr]:
  - An agent can send a transcript by email from More options > Send transcript. The field defaults to the account email, and any address can be entered.
  - Export is CSV, one transcript at a time.
- **Automatic transcript to the visitor:** sent "15 minutes after leaving the website," but only if visitor notifications are on and the visitor left an email address [Tr].
- **Owner notifications** [Notif]:
  - Settings > Notifications covers new messages, new chat requests, incoming visitors and new tickets, as web push.
  - Email notifications go out only when the agent is logged out or offline. They are sent five minutes after the last message, bundled into one email, and can be forwarded to other addresses.
  - The mobile and desktop apps have their own notification settings.
- **Stored history:**
  - Solved live chats are kept in a Solved folder [LiveConv].
  - Live conversations older than 30 days are marked solved automatically. The excerpt does not say they are deleted [Inbox].
  - Agents can delete chats one at a time or in bulk [LiveConv].
  - A GDPR procedure deletes a visitor's data, chat history included [GDPR].
  - Visitor-side history is kept in the browser's localStorage [VisHist].
- **Retention period:** not found. The privacy policy keeps account data "no longer than until the account is deleted" and gives no chat-content period [Priv].
- **Setting to not store chats:** not found.

### 1.6 Owner's dashboard / apps
- **Panel areas:**
  - Inbox, with live conversations and tickets [LiveConv].
  - Visitors list [P].
  - Lyro sections: Knowledge, Behavior, Channels, Playground, Suggestions, Analytics [Lyro].
  - Analytics and Settings [F].
- **Apps:** browser, macOS, Windows, iOS, Android [F].
- **Seats:** up to 10 on Starter and Growth, custom on Plus [P]. "Permissions" is listed on Growth [P].
- **Not included in Growth**, listed for Plus/Premium: "Departments," "Super admin role," "Multiproject" [P].
- **Several websites:** the same code works on two or more sites [Inst]. "Multiproject" is Plus/Premium [P].

### 1.7 Integrations
- **Messaging:** WhatsApp, Instagram, Messenger [I].
- **CRM:** Salesforce, HubSpot, Microsoft Dynamics, Pipedrive [I].
- **Help desk:** Zendesk, Intercom [I].
- **E-commerce:** Shopify, Adobe Commerce (Magento) [I], plus WordPress, WooCommerce and BigCommerce plugins [Inst].
- **Automation:** Zapier, Tidio OpenAPI [I]. OpenAPI is Plus [P].
- **Email marketing:** ActiveCampaign, AWeber, Act-On [I].
- **Calendar:** Calendly, as a Lyro Action template only [Act].
- **Webhooks:** not listed on the integrations page [I].
- **MCP tools:** 3, 5 or 10 by plan [P].

### 1.8 Features and their tier
The pricing table shows only Growth's status, plus the Starter list and the rows that are "Not included in Growth" [P].
- **Free:** live chat, 50 human conversations, 100 Flows visitors, one-time 50 Lyro conversations [P].
- **Starter:** the list in 1.1 [P].
- **Growth includes:**
  - Lyro: chat, emails, product recommendations, custom name, human handoff, Lyro analytics, AI intents.
  - Knowledge: FAQ upload, FAQ scraper, Website scraper, Import Zendesk articles.
  - Inbox: live chat, ticketing, email management system, live video calls, ticketing automations.
  - Reporting and visitors: basic and advanced analytics, multilanguage, live visitors list, operating hours, chat page, live typing, viewed pages history, visitors info, visitor notes.
  - Automation: automatic response, automatic chat assignment, automated satisfaction survey, automated conversation solving.
  - Agents: quick replies with macros, permissions, native Shopify actions.
  - Channels and apps: Messenger, Instagram, WhatsApp, Email and App integrations; desktop app; mobile app.
  - Flows and widget: Sales and FAQ Flows templates, visual automation builder, basic widget customization, support over email [P].
- **Plus/Premium only:**
  - AI: Lyro Connect, AI insights, AI CSAT, Lyro for sales, Lyro for product feedback, real-time AI knowledge refresh.
  - Account and channels: Multiproject, Departments, custom analytics, Super admin role, OpenAPI, custom channels, Mobile SDK, custom branding.
  - Support: support over live chat (24/5), Flows building assistance, premium support, dedicated success manager, discounted usage rates, training sessions, account reviews, Slack support, dedicated services team, "Lyro AI as a managed service," analysis and monitoring.
  - Security: Compliance, SSO.
  - Resolution pricing: guaranteed 50% Lyro resolution rate, pay-per-resolution billing [P].
- **Add-on only:** Inbox AI package, Copilot, Magic Wand, AI summary, AI translations, AI contact properties, Help Center, Voice, No Tidio branding [P].
- **Features page, no tiers given** [F]:
  - Lyro: Smart Actions, Product recommendations, AI-driven email resolutions, Multilanguage, Multichannel, Smart redirections, Analytics, Time saved calculator, Playground, Instant updates, Conversation control, Multiple sources, Missed questions, Custom name.
  - Live chat: Macros, Tidio AI Reply Assistant, Ban users, Chat page, Transcripts, Pre-chat survey, Attachments, Tags and contact properties, Customer satisfaction, Operating hours, Read receipt, Live visitor list, Automatic chat assignment, Offline message.
  - Ticketing: Workflows, Priorities, Collision detection, Spam management, Smart views.
  - Flows: 40+ e-commerce templates, Data collection, Post communication surveys, Save abandoned carts, Transfer to operator.
  - Shopify order management.
  - Analytics API.
  - Customization: widget position, welcome screen, Remove Tidio branding, chat and offline visibility, Script templates.
  - Departments.
  - Support tiers.

---

## 2. BotPenguin

Sources:
- [P] https://botpenguin.com/pricing
- [T] https://botpenguin.com/pricing/pricing-table (detailed comparison; check-mark-only rows could not be assigned to plans from the page text)
- [Home] https://botpenguin.com/
- [F] https://botpenguin.com/features
- [I] https://botpenguin.com/integrations
- [Intro] https://help.botpenguin.com/getting-started/readme.md
- [Req] https://help.botpenguin.com/getting-started/system-requirements-and-setup-checklist.md
- [Panel] https://help.botpenguin.com/getting-started/customer-panel-complete-overview.md
- [Agent] https://help.botpenguin.com/ai-agents/create-your-first-ai-agent.md
- [Train] https://help.botpenguin.com/ai-agents/train-your-ai-agent.md
- [Prompt] https://help.botpenguin.com/ai-agents/prompts-and-tools.md
- [Design] https://help.botpenguin.com/ai-agents/design.md
- [Set] https://help.botpenguin.com/ai-agents/settings.md
- [WebBot] https://help.botpenguin.com/bots/website-mobile-app-bot/website-chatbot-setup-and-installation.md
- [First] https://help.botpenguin.com/bots/creating-your-first-chatbot
- [Install] https://help.botpenguin.com/bots/website-mobile-app-bot/website-chatbot-setup-and-installation/install-your-chatbot/install-your-website-chatbot.md
- [Live] https://help.botpenguin.com/inbox-chats/inbox-chats/live-chats.md
- [Docs index] https://help.botpenguin.com/llms.txt

### 2.1 Who it is for, sales model, pricing
- **Customers:** "80,000+ Businesses" / "80,000+ Customers" in "193 Countries," "250+ Partners" [Home].
  - Industries listed: Healthcare, Education, Ecommerce, Real Estate, Travel, SaaS, Insurance [Home].
  - "Whether you're a startup, small business, or enterprise" [Intro].
  - White-label and reseller partner programs [Home].
- **Sales model:**
  - Self-serve: a "FREE Forever" plan and "No Credit Card Required" [P][Home][F].
  - Sales-led top tier: Emperor is "Contact Sales," with "Done-for-you chatbot build" and custom setup [P].
- **Pricing model:** a plan per account, priced on a monthly message quota, number of chatbots and team members, with add-on packs [P].

| Plan | Price [P] | Messages/mo | Chatbots | Team members |
|---|---|---|---|---|
| Baby | FREE Forever | 1,000, shared with "1000 AI answered messages" | 1 | [P] not listed; [T] 5 |
| Little | "starts at" $29/mo | 3,000 | 5 | [P] 5; [T] 10 |
| King | "starts at" $99/mo | 12,000 | Unlimited | [P] 10; [T] Unlimited |
| Emperor | "starts at" $990/mo ([T]: "Custom Pricing") | "As per Need" | Unlimited | [P] Unlimited; [T] "Unlimited*" |

- **Annual:** "Get 2 Months FREE." The FAQ says yearly costs 10 months' price [P].
- **Overage:** no per-message fee. When the message limit is used up the bot stops until you upgrade. A reminder is sent at 90% [P].
- **Add-ons** [P]:

| Add-on | Price |
|---|---|
| Messages pack | 1,000 for $5/mo; 5,000 for $10/mo |
| AI messages | 1,000 for $15/mo; 5,000 for $60/mo |
| Data training storage | 1 GB for $15/mo; 5 GB for $68/mo |
| Additional team member | $7/mo, or a pack of 5 for $30/mo |
| Whitelabel chat window | $20/mo per bot |
| MS Teams platform | $100/mo |
| Voice minutes | 1,000 for $40/mo; 5,000 for $150/mo |

- **Free plan:** Baby, free forever, no card [P].
- **Trial:** 7 days, "No credit card required," "full access to King plan features" [P].
- **Payment:** Stripe or Razorpay [P].
- **Detailed table per plan** [T]:

| Row | Baby | Little | King | Emperor |
|---|---|---|---|---|
| Websites (also Instagram, Facebook, Telegram, WhatsApp numbers) | 1 each | 5 each | Unlimited | Unlimited |
| Conversation history | **30 Days** | **90 Days** | **Lifetime** | **Lifetime** |
| Train on web pages | 200 pages | 1,000 pages | Unlimited | Unlimited |
| Train on FAQs | 50 | 500 | Unlimited | Unlimited |
| File size per file | 25 MB | 25 MB | 25 MB | 25 MB |
| Training storage | 50 MB | 1 GB | 1 GB | 1 GB |
| LLM | OpenAI | OpenAI | All | All |
| Chatbot designing support | "Do it yourself" | "Do it yourself" | "We are here to help" | "We are here to help" |
| Remove BotPenguin branding | Add-on | Add-on | check mark (plan unclear) | check mark (plan unclear) |
| SMS Bot | Unlimited | Unlimited | Unlimited | Unlimited |

- **Contradictions:**
  - Team members per plan differ between [P] and [T] (table above). The FAQ also says King includes 10 agents [T].
  - Emperor is $990/mo on [P] and "Custom Pricing" on [T].
  - SMS: the pricing page lists SMS only under Emperor's channels. The comparison table shows "SMS Bot: Unlimited" on every plan [P][T].

### 2.2 Sign-up and setup flow (in order)
1. **Sign up:** "A valid email address or phone number to sign up/log in," with email and phone "accessible for verification" [Req]. The sign-up form fields and any sign-up survey: not found.
2. **First login:** "you'll land on a welcome screen prompting you to create your first bot. From here you can book a free demo call with the team or watch a help video." After the first bot, the Home page shows an onboarding checklist in its right panel [Panel].
3. **Choose a path:** a flow-based **Chatbot** or an **AI Agent** [Panel].
   - **AI Agent wizard** [Agent]:
     1. **Select Channel:** Website, WhatsApp, Instagram, Facebook, Telegram, Phone.
     2. **Use Case:** a ready-made role, "Start from Scratch," or "Browse all templates." The panel overview names the templates Lead Qualification, Support, Appointment Booking [Panel].
     3. **Prompt & Tools:** type Core Instructions (required) and optionally connect tools.
     4. **Train Your Agent** (optional): Website, Files, FAQs or Text snippets.
     5. **Design Your Agent** (optional): Agent Name, avatar, theme colors, ice breakers.
     6. **Install Agent on Website:** "Get Agent Installation Code," copy it into the site. "You can also share the code or ask the support team to help you install it." Optionally enter the website URL and click verify, or choose "I'll Install later."
     - Skip works at any step, and the rest is finished from the agent's Overview page.
   - **Chatbot (flow) path** [WebBot][First]:
     1. Bots > Create New Bot.
     2. Pick the platform: Website, WhatsApp, Facebook, Instagram, Telegram, MS Teams, SMS.
     3. Pick a use case, which "will apply the Chatflow to the Chatbot."
     4. Edit the chatflow (Flow or Classic builder), and import a template or start from scratch.
     5. Click **Test**, then **Install**.
4. **Install on the website** [Install]:
   - Platform choices: Custom Built, WordPress, Shopify, Wix, Squarespace, None/Not Sure.
   - Paste the script "usually before the closing `</body>` tag."
   - Other forms: Landing Page Bot (a hosted page), Mobile App bot, Embedded (iframe) bot.
   - When the bot is live, the platform card "will no longer show Not Connected" [Install].
   - The Website platform needs the "Ability to add a script snippet to your site header/footer" [Req].
- **Before payment:** everything. Free plan, no card [P].
- **Preview:**
  - Agent Preview panel, "Test how the agent responds in real time before going live" [Panel].
  - The Design page has a live preview, and changes go live only after Update [Design].
  - Chatflow "Test" button [WebBot].
- **Time to live:** "Live in minutes." A testimonial says "about 15 minutes" [Home].

### 2.3 How the assistant is configured
- **Prompt & Tools** [Prompt]:
  - Agent prompt, plus "Rewrite with AI."
  - Communication style: "Let agent decide," or "Configure it yourself" with answer length, answer style, tone, language and formatting.
  - "Show sources when agent answers questions."
  - Tools named in the docs [Docs index]: Google Calendar, Google Sheets, API Request, Custom MCP, Acuity Scheduling, HubSpot, Freshdesk, Freshworks CRM, LeadSquared, Razorpay, Zoho Desk, Manage Tags/Contact Group/Chat Status/Private Notes, End Call, Transfer Call to Live Agent.
- **Design** [Design]:
  - Profile photo (PNG/JPG/WEBP, 2 MB or less).
  - Agent Name, 2 to 40 characters.
  - Agent description: "A short greeting shown under the agent's name on the Website chat," up to 100 characters.
  - Theme colors and font.
  - Up to 3 ice breakers of 100 characters each. A visitor's tap sends that text as the first message.
- **Settings, Web Platform tab** [Set]:
  - **Settings section:** session timeout, time zone, "Chat window message history," "Send session summary email," "Send returning user session summary email."
  - **Chat screen section:** Request live chat on/off, Restart chat session, Rate the conversation screen, Agent white label, "Show AI disclaimer," Manage URL list (allow/block pages), Manage country list (allow/block countries).
  - **Other sections:** agent language and all visitor-facing text; window size and position; custom CSS; capture visitor IP/device/page/source; auto-open timing; a CTA.
  - **Voice tab:** "Enable voice mode."
- **Knowledge** [Train]:
  - **Website:** "The full website" or "Specific URLs only," with Re-sync and a re-sync schedule.
  - **Files:** upload or file link.
  - **Google Sheets.**
  - **FAQs:** one by one or bulk CSV.
  - **Snippets:** named text with tags.
  - **Un-answered Questions:** each row can be turned into an FAQ ("Create a FAQ").
  - **Other Sources:** Notion, Dropbox, MCP server.
- **Limits on what the AI may say:** the Core Instructions, the "Show AI disclaimer" switch [Set], and "Show sources" [Prompt]. A dedicated guardrail or restricted-topic setting: not found.
- **Business hours:**
  - Agents toggle Online/Offline for Live Chat [Live].
  - The WhatsApp, Facebook, Instagram and Telegram tabs have a "Live chat request expiry time" and a "Live chat unavailability message" [Set].
  - An opening-hours schedule: not found.
- **Handoff:**
  - A "Live Chat" component is placed in the chatflow [Live].
  - "Request live chat" toggle in the widget [Set].
  - Agents get "a notification popup whenever there is a new chat request" [Live].
- **Booking:**
  - "Appointment booking" from Little up [P].
  - Google Calendar and Acuity tools [Docs index].
  - The Inbox Appointments tab can mark a no-show, reschedule or cancel [Panel].
- **Lead capture:**
  - "Automated Lead Capture," "Lead Qualification" [F].
  - "Lead notifications by email" from Little up [P].

### 2.4 Channels
- **Every plan, Baby up:** Website, WhatsApp, Instagram, Facebook, Telegram [P].
- **MS Teams:** King, and also a $100/mo add-on [P].
- **Emperor:** WeChat, LINE, Viber, Google My Business, SMS, Slack [P]. SMS conflicts with [T]; see 2.1.
- **SMS** needs "SMS provider credentials (e.g., Twilio)" [Req].
- **Phone:** AI Voice Agents [Home]; "Phone" is a channel in the AI Agent wizard [Agent]; voice minutes are an add-on [P].

### 2.5 After each chat
- **Inbox** [Panel]:
  - Chats: filter, assign, tag, open/close, export.
  - Contacts.
  - Appointments.
  - Orders.
- **Email to the owner:**
  - "Send session summary email" and a returning-user version are settings [Set].
  - "Lead notifications by email" from Little up [P].
  - "Event-Based Notifications" [F].
- **AI chat summary** in the Inbox ("AI Chat Summary" article title) [Docs index].
- **How long chats are kept:** conversation history 30 days on Baby, 90 days on Little, Lifetime on King and Emperor [T].
- **Setting to not store chats:** not found.

### 2.6 Owner's dashboard
- **Areas** [Panel]:
  - **Home:** Insights (messages, WhatsApp messages, AI messages, leads), bots and agents tables, onboarding checklist.
  - **Chatbot** and **AI Agents:** list, configuration panel, preview panel.
  - **Inbox:** Chats, Orders, Appointments, Contacts, Groups.
  - **Analytics:** Overview, Chatbot Engagement, Live Chat, AI Analytics, ChatFlows, Voice.
  - **Subscriptions:** Plan, Add-Ons, Current Plan usage bars, Billing, Invoices.
  - **Help Center.**
- **Team:** "Manage Team" and roles [Live]; "Role-Based Access Control" [F].
- **Mobile apps for agents:** Little and up [P].
- **Several sites:** websites 1 / 5 / unlimited by plan [T]. White label is on Emperor [T]. Reseller program [Home].

### 2.7 Integrations
- **CRM** [I]: HubSpot, Salesforce, Zoho CRM, Pipedrive, GoHighLevel, Freshworks, Agile, Copper, Close, and many more.
- **Calendar** [I]: Google Calendar, Calendly, Acuity, CalendarHero, SimplyBook, Outlook.
- **E-commerce:** Shopify, Zid, ZohoCommerce [I]; WooCommerce [F].
- **Automation:** Zapier, Make, n8n, Pabbly [I].
- **Webhooks:** "Webhooks" and "API Access" appear on [F]; webhooks are not on [I].
- **Payments:** Razorpay, Stripe and others [I].
- **Plan gating** [P]:
  - Little: "30+ integrations (e.g., Shopify, Google Calendar, Zendesk)."
  - King: "50+ integrations (e.g., Zapier, Razorpay, HubSpot, Salesforce)" and "API integration in chatflows."

### 2.8 Features and their tier (from the plan lists on [P])
- **Baby:**
  - Channels: WhatsApp, Instagram, Website, Facebook, Telegram.
  - Inbox and routing: unlimited subscribers/leads, pre-built chat flow templates, intent-based chat routing, unified inbox, live chat (bot-to-human handoff).
  - Other: multilingual chatbot, 2048-bit SSL.
  - AI: OpenAI integration, LLM knowledge base, 1,000 AI-answered messages, AI personality configuration, training on website, PDF and FAQ.
- **Little adds:**
  - Notifications and booking: lead notifications by email, appointment booking.
  - Messaging: WhatsApp bulk messaging, Instagram DM automation, WhatsApp shop automation.
  - Reporting and contacts: reports and analytics, segmentation, custom attributes and tags.
  - Mobile apps for agents.
  - Integrations: 30+; AI training on Google Sheets.
- **King adds:**
  - Channels and routing: MS Teams, WhatsApp flows, smart department routing.
  - Integrations: API integration in chatflows, built-in AI assistance, 50+ integrations.
  - AI: GPT-5, Gemini, Claude, Llama, DeepSeek; retraining on chat transcripts; Google Drive and Notion training.
- **Emperor adds:**
  - Channels: WeChat, LINE, Viber, Google My Business, SMS, Slack.
  - Service: custom setup and branding, done-for-you chatbot build.
  - Analytics and campaigns: advanced analytics, custom campaigns.
  - Facebook e-commerce.
  - Security and integrations: advanced security, custom integrations.
  - AI: custom LLM and fine-tuning; YouTube/RSS/Dropbox training.
- **Features page, no tiers given** [F]:
  - Builder: no-code builder, prebuilt templates, flow testing and preview, AI + flow hybrid.
  - Agents: Appointment, Lead Generation, Website, Sales and Marketing agents; AI voice agents.
  - Inbox: saved replies, AI-assisted responses, real-time chat translation.
  - Marketing: broadcast, drip campaigns, abandoned cart recovery, product recommendations, CRM lead sync.
  - Visitors and data: visitor identification, data privacy controls, IP and country blocking.

---

## 3. Manychat

**All Manychat facts here are [excerpt] or [community].** manychat.com and help.manychat.com returned HTTP 403 to every direct fetch.

Sources:
- [ProH] https://help.manychat.com/hc/en-us/articles/25800228332572-Pro-plan **[excerpt]**
- [FreeH] https://help.manychat.com/hc/en-us/articles/25800197498652-Free-plan **[excerpt]**
- [EssH] https://help.manychat.com/hc/en-us/articles/25800276116508-Essential-plan **[excerpt]**
- [BusH] https://help.manychat.com/hc/en-us/articles/25800254159900-Business-plan **[excerpt]**
- [AdvH] https://help.manychat.com/hc/en-us/articles/25800308984988-Advanced-plan **[excerpt]**
- [AC] https://help.manychat.com/hc/en-us/articles/25800323349020-Active-Contacts **[excerpt]**
- [BillFAQ] https://help.manychat.com/hc/en-us/articles/14281409288604-Billing-FAQ **[excerpt]** (describes the pre-2 March 2026 model)
- [InboxPrice] https://help.manychat.com/hc/en-us/articles/14281088746652-Manychat-Inbox-pricing **[excerpt]**
- [PriceBlog] https://manychat.com/blog/manychat-pricing-explained/ **[excerpt]**
- [PriceP] https://manychat.com/pricing **[excerpt]** (the search engine marked its cached copy as old, but its figures matched the newer help articles)
- [Signup] https://help.manychat.com/hc/en-us/articles/14281100962460-How-to-sign-up-sign-in-and-manage-your-Manychat-accounts **[excerpt]**
- [IG] https://help.manychat.com/hc/en-us/articles/14281290924444-How-to-connect-Instagram-to-Manychat **[excerpt]**
- [AI] https://help.manychat.com/hc/en-us/articles/14281227789468-Power-up-your-chat-marketing-with-Manychat-AI **[excerpt]**
- [AIStep] https://help.manychat.com/hc/en-us/articles/14281187288860-Manychat-AI-Step **[excerpt]**
- [AIBeh] https://help.manychat.com/hc/en-us/articles/26782002914332-Manychat-AI-Behavior **[excerpt]**
- [AIComm] https://help.manychat.com/hc/en-us/articles/23096278263836-Manychat-AI-Comments **[excerpt]**
- [AIprod] https://manychat.com/product/ai **[excerpt]**
- [InboxH] https://help.manychat.com/hc/en-us/articles/14281070478748-Manychat-Inbox **[excerpt]**
- [Pause] https://help.manychat.com/hc/en-us/articles/19957883687708-How-to-pause-all-automations **[excerpt]**
- [Mobile] https://help.manychat.com/hc/en-us/articles/19858378137756-Manychat-Mobile-App **[excerpt]**
- [Zap] https://help.manychat.com/hc/en-us/articles/14281281340188-Zapier-Integration **[excerpt]**
- [IntSec] https://help.manychat.com/hc/en-us/sections/13556926216988-Integrations **[excerpt]**
- [Retain] https://help.manychat.com/hc/en-us/articles/14281205806748-Data-Retention-for-inactive-accounts **[excerpt]**
- [GDPR] https://support.manychat.com/support/solutions/articles/36000060439-managing-user-data **[excerpt]**
- [Priv] https://manychat.com/legal/privacy **[excerpt]**
- [C-FAQ] https://community.manychat.com/general-q-a-43/manychat-faq-everything-you-need-to-get-started-in-2026-8982 **[community]** (posted by "Community Moderator & Expert," not identified as staff, 2 Feb 2026, updated 10 Feb 2026; read directly)
- [C-Web] https://community.manychat.com/general-q-a-43/chatbot-in-website-675 and https://community.manychat.com/general-q-a-43/can-we-integrate-chatbot-to-our-website-5031 **[community, excerpt]**
- [C-Del] https://community.manychat.com/general-q-a-43/can-instagram-inbox-messages-be-auto-deleted-without-deleting-the-contact-10749 **[community, excerpt]**
- [C-AIupd] https://community.manychat.com/product-updates/transform-your-marketing-strategy-with-manychat-ai-the-ultimate-pro-add-on-1554 **[community, excerpt]**
- [TidioRev] https://www.tidio.com/blog/manychat-review/ **[third-party; a competitor]**
- [Chatimize] https://chatimize.com/reviews/manychat/ **[third-party]**
- [Scape] https://chatbotscape.com/reviews/manychat-review **[third-party]**
- [ASC] https://aisupportcrew.com/guides/manychat-review-2026 **[third-party]**

### 3.1 Who it is for, sales model, pricing
- **Product:** chat automation for Instagram, Facebook Messenger, WhatsApp, TikTok, Telegram, SMS and Email [FreeH][EssH][ProH][C-FAQ]. It is self-serve.
- **Pricing model** since 2 March 2026: a plan per account priced on monthly **Active Contacts**, plus users, Inbox seats and number of channels [AC][ProH].
  - "An Active Contact is a contact who has interacted with you through Manychat during your current billing month." Repeat messages from one person count once. The count resets on the billing date [AC].

| Plan | Monthly / annual-billed price | Active Contacts | Users | Inbox seats | Channels | Overage per extra contact |
|---|---|---|---|---|---|---|
| Free [FreeH] | $0 | 25 | 1 | 1 | Up to 2 (IG, TikTok, Messenger, Telegram; no WhatsApp/SMS/Email); 4 live automations | not found |
| Essential [EssH] | $17 / $14 | 250 | 2 | 1 | Up to 2 (same four) | $0.10 / $0.08 |
| Pro [ProH] | $39 / $29 ("25% savings") | 2,500 | 3 | 2 (up to 3; $25 per extra seat) | Up to 3 (adds WhatsApp, SMS, Email) | $0.05 / $0.038 |
| Business [BusH] | $99 / $69 | 7,500 | 5 | 3 (up to 5; $25 each) | Unlimited | $0.025 / $0.018 |
| Advanced [AdvH] | $199 / $139 ("30% savings") | 25,000 | "expanded team access" | not found | Unlimited | custom or usage-based, per a search summary of [AdvH]/[PriceP] |

- **Usage warnings:** sent at 70%, 90% and 100% of the allowance, and an overage cap can be set in billing settings [ProH].
- **Trial:** Pro has a 14-day free trial [ProH]. Advanced has "no free trial" [AdvH]. Whether the trial needs a card: not found.
- **AI pricing, contradiction:**
  - [ProH]: "the Manychat AI add-on is not included in the free trial. If you add it at this step and proceed, you will be billed immediately."
  - [PriceBlog]: AI is not "a separate add-on under our current pricing; it's built into the Pro plan."
  - [PriceP]: "AI-powered replies to DMs and comments are available with Pro."
  - [C-FAQ] and [C-AIupd]: "Manychat AI add-on ($29/month)."
  - [AI]: "AI Replies" is Instagram-only and needs the paid AI add-on.
- **Older model, contradiction:**
  - [BillFAQ]: Pro "starts at $15/month for up to 500 contacts," and contacts do not reset monthly.
  - [InboxPrice] lists extra seats at $39.
  - [C-FAQ]: Inbox "starting at $99/month" with 3 Live Chat seats.
  - The newer help articles say those pages describe plans from before 2 March 2026.

### 3.2 Sign-up and setup flow
1. **Get started:** sign up with email (CAPTCHA, then a one-time link in the email, then "Create account") or with Google [Signup].
   - Alternatively, pick Instagram from the channel list and sign up with Facebook or Google [IG].
   - "Signing up with Google or email creates your Manychat profile, and connecting your first channel creates a Manychat account" [Signup].
2. **Connect a channel.** For Instagram: Settings > Instagram > Connect [IG]. Three routes:
   - **"Via Meta"** (recommended): needs a Meta Business Portfolio.
   - **"Connect Via Instagram"**: quickest, needs no Meta Business account, and some features are limited.
   - **"Via Meta Business Suite"**: for agencies.
   - The Instagram account must be a Business or Creator account [IG].
3. **Set up the AI:**
   - **Knowledge:** link entries are read one exact page each; text entries are up to 250k characters; files are "coming soon" [AI].
   - **Behavior:** pre-filled from the Instagram bio and recent comments into "AI Role," "Brand Voice & Persona" and "Guardrails & Constraints" [AIBeh].
   - **Goals** [AI].
4. **Test** in the Playground, where missing information can be added on the spot [AIBeh]. Flows are previewed in the Flow Builder or the mobile app [C-FAQ].
- **One account, one set of channels:** "Each Manychat account can have only one connected account per channel type." Separate brands need separate accounts [IG][C-FAQ].
- **Website widget install:** none.
  - A Manychat staff reply says "Manychat doesn't support website widget feature." Another says "you can train it using your website, but you can not use it on your website (like a widget chatbot)" [C-Web].
  - Facebook's Customer Chat plugin "will be disabled as of May 2024 (a decision taken by Meta)" [C-Web].
  - Third parties agree: [TidioRev] (a competitor), [Chatimize], [Scape]. [ASC] says Manychat does offer a website chat widget, which contradicts the others.
- **Before payment:** the Free plan needs no payment [FreeH].

### 3.3 How the assistant is configured
- **AI Step:** "you set a goal and add business context, such as FAQ answers and tone of voice." Supported on Messenger, Instagram, WhatsApp, TikTok and Telegram [AIStep].
- **Intention recognition:** "answers based on intent, not keywords and handles many languages and typos" [AIprod].
- **AI Replies:** spots questions in DMs or comments and answers from the Knowledge library [AIBeh].
- **AI Comments:** "Set AI's Tone" studies existing comment replies and produces five example responses [AIComm].
- **Rules on what the AI may say:** the "Guardrails & Constraints" field [AIBeh]. The docs warn that AI "can still occasionally answer outside guardrails" [AIBeh].
- **Name and greeting:** not found.
- **Business hours:** not found.
- **Handoff** [InboxH][Pause]:
  - A human reply in the Inbox starts an automatic 30-minute pause of automation for that contact. The length is adjustable under "Inbox Behavior."
  - A "Pause all automations" action can pause from 30 minutes to forever.
  - A "Notify Assignees" action alerts team members.
- **Booking:** native booking not found. The only reference is a 2020 Manychat blog about linking scheduling apps through Zapier (search excerpt of https://manychat.com/blog/best-appointment-scheduling-apps/).
- **Lead capture:** Essential lists "lead capture," tags and "Sync contact data to Google Sheets" [PriceP].

### 3.4 Channels
- **Supported:** Instagram, Facebook Messenger, TikTok and Telegram on every plan. WhatsApp, SMS and Email from Pro up [FreeH][EssH][ProH].
- **TikTok:** not available in the EU and UK [C-FAQ].
- **Website:** no; see 3.2.
- **Phone:** not found.

### 3.5 After each chat
- **Inbox:** conversation history. The mobile app can assign conversations to team members [InboxH][Mobile].
- **Notifications:** through the "Notify Assignees" action [InboxH]. Push-notification details: not found.
- **Retention period** for individual messages: not found.
  - A community answer says there is "no way to delete the chat conversation through Manychat" while keeping the contact [C-Del].
  - Deleting a contact can remove their Live Chat discussions [GDPR].
  - Accounts unused for 18 months are inactive, and "the account and all associated data will be permanently deleted within 90 days after the closure" [Retain].
  - The privacy policy keeps data "only for as long as necessary" [Priv].
- **Setting to not store chats:** not found.

### 3.6 Owner's dashboard
- **Areas:** Home tab overview (exists; not read in detail), Inbox, Flow Builder, Settings, and a mobile app [InboxH][Mobile].
- **Users and seats:** see 3.1.
- **Several brands:** one Manychat account per brand [IG][C-FAQ].

### 3.7 Integrations
- **Native:** Google Sheets, HubSpot CRM, Zapier, Klaviyo, MailChimp, Flodesk, Kit [IntSec][Zap].
- **Make:** through an "External Request" plus a Make webhook [community excerpt, https://community.manychat.com/general-q-a-43/i-need-help-with-integrating-manychat-instagram-make-or-zapier-google-sheet-1641].
- **External Request:** part of the paid DevTools [BillFAQ]. API access is on Advanced [AdvH].
- **Shopify:** no current native integration, per a community answer (https://community.manychat.com/general-q-a-43/manychat-shopify-integration-5884, excerpt).
- **Calendar:** not found.

### 3.8 Features and their tier
- **Free:** 4 live automations, basic automations, 2 channels [FreeH].
- **Essential:** lead capture, tags, Google Sheets sync, 2 channels [PriceP][EssH].
- **Pro:** AI-powered automation, AI replies to DMs and comments, WhatsApp/SMS/Email, 3 channels, Inbox seats [ProH], plus PriceBlog/AI contradiction in 3.1.
- **Business:** "everything available on the Pro plan (AI-powered automation, custom labels and rules, WhatsApp automation, integrations)," unlimited channels [BusH].
- **Advanced:** "expanded team access, API access, and decreasing cost per contact at higher usage" [AdvH].
- **AI features named:** AI Step, Intention Recognition, Text Improver, AI Replies, AI Comments, Knowledge, Behavior, Goals, Playground [AI][AIStep][AIBeh][AIComm][C-FAQ].

---

## 4. Dapta (AI Text Agent: website chat, WhatsApp, SMS)

Sources:
- [P] https://dapta.ai/pricing
- [Home] https://dapta.ai/
- [Text] https://dapta.ai/ai-text-agent-for-ai-sms/
- [I] https://dapta.ai/integrations/
- [Quick] https://docs.dapta.ai/quick-setup.md
- [Acct] https://docs.dapta.ai/my-account/account/how-to-create-an-account-in-dapta.md
- [Plans] https://docs.dapta.ai/my-account/how-credits-work-in-dapta/plans-and-pricing.md
- [Cred] https://docs.dapta.ai/my-account/how-credits-work-in-dapta.md
- [Create] https://docs.dapta.ai/ai-text-agents/create-your-first-text-agent-in-dapta.md
- [Widget] https://docs.dapta.ai/ai-text-agents/channels/widget-embed-your-text-agent-on-a-website.md
- [Chan] https://docs.dapta.ai/ai-text-agents/channels.md
- [Brain] https://docs.dapta.ai/ai-text-agents/setting-up-your-text-agent/brains-for-text-agents.md
- [Actions] https://docs.dapta.ai/ai-text-agents/setting-up-your-text-agent/text-agent-actions.md
- [dCal] https://docs.dapta.ai/ai-text-agents/setting-up-your-text-agent/schedule-appointments-with-dapta-calendars.md
- [Inbox] https://docs.dapta.ai/ai-text-agents/inbox.md
- [Alerts] https://docs.dapta.ai/ai-text-agents/inbox/desktop-alerts.md
- [Logs] https://docs.dapta.ai/ai-text-agents/analytics-and-logs.md
- [PCA] https://docs.dapta.ai/ai-text-agents/setting-up-your-text-agent/post-conversation-analysis.md
- [Index] https://docs.dapta.ai/llms.txt (article titles and one-line descriptions)

### 4.1 Who it is for, sales model, pricing
- **Positioning:** "One AI platform to call and text your leads," an AI sales automation platform [Home].
  - Teams: Sales, Operations, Marketing, Human Resources, Debt Collections.
  - Industries: Education, SaaS, Law Firms, Home Services, Real Estate, Insurance, Automotive, Coaching & Courses [Home].
- **Sales model:**
  - Self-serve Pro: "Self-service, one tech session."
  - Scale-Up and Prime: assisted onboarding.
  - Enterprise: "Talk to Sales" [Plans].
- **Pricing model:** an account plan with monthly **credits**. "1,000 credits = US$1" [Plans].
  - An AI text message (one answer) costs 40 credits ($0.04).
  - A message a person sends from the Inbox costs 10.
  - An answered call costs 333 credits per minute.
  - A US phone number costs "about 1,380 per month."
  - [Cred]

| Plan | Price | Credits/mo | Users | Workspaces | Storage | Onboarding / support |
|---|---|---|---|---|---|---|
| Pro | $99/mo | 100,000 | 5 | 5 | 10 GB | Self-service, one tech session; email and chat |
| Scale-Up | $499/mo | 500,000 | Unlimited | 25 | 20 GB | Fully assisted onboarding; priority chat, 4 tech sessions/mo |
| Prime | $1,499/mo | 1,500,000 | Unlimited | 70 | 50 GB | Assisted onboarding and implementation; dedicated account manager |
| Enterprise | Talk to Sales | Consumption-based | Unlimited | Custom | Custom | SLAs; on-premise option |

- Every plan has unlimited voice and text agents and unlimited flows [Plans].
- **Yearly:** "16.7% cheaper ... the equivalent of two months free" [Plans]. The pricing page shows only "Monthly payment" [P].
- **Trial:** a 7-day Pro trial. "You add a card when you start." The card is charged the Pro price at the end of day 7 unless cancelled. Scale-Up and Prime have no trial [Plans].
- **Without a plan:** "A new account gets 7,000 free credits when you sign up." A free account can build agents. The monthly allowance and Test Numbers need a paid plan [Plans].
- **Overage:** buy credits and turn on auto-recharge ("Billing, Payments and Invoices" description, [Index]).
- **Contradictions:**
  - Setup time: the pricing page and home page say "Get Started for Free" and "Build your AI Sales Army in 2 minutes" [Home]. The product page says an agent "in under five minutes" [Text]. The docs say "Four steps, about thirty minutes" [Quick].
  - Which plan includes the AI Text Agent / website chat: not stated on [P].

### 4.2 Sign-up and setup flow (in order)
- The docs name four steps, "about thirty minutes" [Quick].
1. **Create the account** [Acct]:
   - First name, last name and email, then "Send Email Code," then enter the code.
   - Or "continue with Google."
2. **Build the first Text Agent** [Create]:
   - **Agent Context:**
     - **Agent Name:** "this is how the agent will refer to itself when your customer asks."
     - **Purpose presets:** Ecommerces Sales Agent, Qualify Inbound Leads, Support Sales Inquiries In My Ecommerce, Customer Services And Support, Website Q&A Assistant, Schedule Meetings, Confirmations, Reminders, Set Up my Own Assistant.
     - **Important Instructions:** tasks, behavior, tone and style.
     - **Language.**
   - **Company Context:**
     - Company Name (required).
     - Company Description (required): written by hand, or "Generate Context with AI" from the website URL.
   - **Test** the agent on the same screen, with Reset, then "Finish."
3. **Test in the Playground** [Quick]: "Testing does not cost you a customer conversation."
4. **Put it on a channel** [Quick][Widget]:
   - **Website:** Channels → Dapta Widget.
     1. Copy the generated embed snippet.
     2. Paste it into the site's HTML or script field.
     3. Publish the site and open it in a fresh browser session.
     4. "Send a test message, verify the reply, and locate the conversation in Inbox."
     5. Test both desktop and mobile layouts.
   - **WhatsApp:** prepare a Meta account first.
   - The widget page warns: "A successful preview is not a substitute for testing the deployed page" [Widget].
- **Before payment:** sign-up and agent building run on the 7,000 free credits. The trial needs a card [Plans].
- **How the business's information is gathered:**
  - The company description, written or generated from the website [Create].
  - Brains: web pages, files, text [Brain].

### 4.3 How the assistant is configured
- **Name, purpose, instructions (tone), language** [Create].
- **Model and temperature:** listed as settings; "Dapta Auto" model at 40 credits per answer ([Index] descriptions).
- **Conversation behavior:** inactivity timeout, reply delay, split replies ([Index] description).
- **Widget settings** [Widget]:
  - Welcome message.
  - Default questions, entered by hand or generated by AI.
  - Colors and advanced CSS.
  - Auto Open.
  - Page list.
  - A Voice Agent for "the widget's call-request flow."
- **Brains (knowledge)** [Brain]:
  - Up to 25 sources per Brain.
  - **Web pages:** "Discover Pages" from the sitemap, or manual URLs.
  - **Files:** up to 25 at a time; .pdf, .doc, .docx, .ppt, .pptx, .txt, .md, .csv, .json. Spreadsheets and images are not supported yet.
  - **Pasted text.**
  - States: Pending, In Process, Completed, Error.
- **Handoff** [Actions]:
  - A "Transfer to a human" action goes to a Member or a Team, with Fixed or Balanced assignment.
  - The message the customer gets at handover can be Silent, Fixed or AI-generated.
  - An "Unavailability message" is "sent whenever no advisor could be assigned, for example when nobody on the team is online."
- **Booking:** the "Schedule appointments (Dapta Calendars)" action. It "offers the times that are actually free, and books the one your customer picks. The customer never leaves the conversation and never gets a booking link." dCal is "Dapta's free booking product," where working hours live [dCal].
- **Lead capture:**
  - Post-conversation analysis variables: Text, Selector, Boolean, Number, Date, DateTime, Email, Phone, and others. They are extracted when a conversation closes or times out (24 hours by default) and can be sent to a webhook [PCA].
  - CRM destinations and pipeline sync for GoHighLevel and HubSpot ([Index]).
- **Follow-ups:** "up to three timed follow-ups per contact" [Text].
- **Rules on what the AI may say:** instructions only. The product page says responses stay "grounded in that data" [Text]. A separate guardrail setting: not found.
- **Business hours:**
  - Inbox availability is Online or Offline [Inbox].
  - dCal holds working hours for booking [dCal].
  - Chat opening hours: not found.

### 4.4 Channels
- Website widget, WhatsApp, Facebook Messenger [Chan][Index].
- SMS through US A2P 10DLC registration [Chan][Cred].
- Phone through Voice Agents [Home].
- Instagram: not found.

### 4.5 After each chat
- **Inbox** [Inbox]:
  - Each chat has one owner: the AI agent, a teammate or nobody.
  - "A chat from your website shows as Web visitor followed by four characters of its ID."
  - "Waiting" is highlighted after 15 minutes.
- **Alerts:** desktop alerts only when a chat is assigned to you or a customer replies on WhatsApp in a person-handled chat. "Replies in website chats don't send an alert" [Alerts].
- **Chat history:** Sessions and Conversations views, and CSV export "with or without message content" [Logs].
- **Post-conversation analysis:** results go to a webhook and to CRM fields, pipeline stage and a note [PCA].
- **"Ask Dapti":** questions about outcomes and patterns [Text].
- **Retention:** "The custom-period picker limits a selected range to 90 days. This is a query-range limit, not a statement that conversations are deleted after 90 days" [Logs]. A retention period: not found.
- **Setting to not store chats:** not found.

### 4.6 Owner's dashboard
- Text Agents (Agents, Inbox, Channels, Chat history, metrics), CRM, Billing & Plans, Dapti assistant, Flow Studio, dForms, dCal [Index][Quick].
- **Members:** invited by email ("Add team members," [Index]).
- **Workspaces:** "you can create multiple workspaces within a single account" ([Index] description). Counts are 5 / 25 / 70 by plan [Plans].
- **"Your setup tasks":** "The tasks your implementation team assigns you in Dapta" ([Index] description).

### 4.7 Integrations
- **CRM:** HubSpot, Salesforce, Zoho CRM, Pipedrive, GoHighLevel [I].
- **E-commerce:** Shopify, WooCommerce, Magento 2 [I].
- **Messaging:** Slack, Discord, Telegram [I].
- **Also on the page:** Stripe, QuickBooks, Mailchimp, Zoom, OpenAI and others [I].
- **Custom:** API actions and webhooks [Actions][PCA]; MCP server ([Index]).
- **Calendar:** dCal is Dapta's own [dCal]. The integrations page names no calendar [I].
- **Zapier:** not found.

### 4.8 Features and their tier
- **Every plan:** unlimited voice and text agents, unlimited flows [Plans].
- **Dapti AI assistant:** charged per answer on Free and Pro; included on Scale-Up and up [Plans].
- **Product page, no tiers given** [Text]: AI text agents on SMS, website chat and WhatsApp; custom variables to CRM; up to 3 timed follow-ups; automatic handoff; routing by topic, time or priority; take over from web or mobile; centralized inbox; HubSpot/Salesforce/GoHighLevel push.
- **Home page products** [Home]: AI Voice Agent, AI Text Agents, WhatsApp AI Agents and Calls, AI Notetaker, Dapti, dForms, dCal, workflow automation, Sequences, Dapta MCP.
- **Enterprise extras:** enterprise-grade security, on-premise deployment [Plans].

---

## 5. My AI Front Desk: AI chatbot / website chat widget only

Sources:
- [P] https://www.myaifrontdesk.com/pricing
- [Prod] https://www.myaifrontdesk.com/platform/ai-web-chatbot
- [Help] https://www.myaifrontdesk.com/help
- [Over] https://www.myaifrontdesk.com/help/getting-started/overview
- [Dash] https://www.myaifrontdesk.com/help/getting-started/dashboard
- [Setup] https://www.myaifrontdesk.com/help/getting-started/setup-wizard
- [CW] https://www.myaifrontdesk.com/help/chatbot-widget/overview
- [Cust] https://www.myaifrontdesk.com/help/chatbot-widget/customizing
- [Inst] https://www.myaifrontdesk.com/help/chatbot-widget/installation
- [Notif] https://www.myaifrontdesk.com/help/notifications/settings
- [IntH] https://www.myaifrontdesk.com/help/integrations
- [SetH] https://www.myaifrontdesk.com/help/settings
- [KB] https://www.myaifrontdesk.com/help/ai-receptionist/knowledge-base **[excerpt]**

### 5.1 Who it is for, sales model, pricing
- **Plans:** "Business-in-a-Box: For growing small businesses." "Partner / Enterprise: For scaling teams & agencies" [P].
- **The chatbot is not sold separately.** It sits inside Business-in-a-Box [P]:
  - $99/mo, or $79/mo billed annually ("Save 20%").
  - "100 chatbot conversations/month," and "each customer conversation counts as one."
  - Overage is 5 credits ($0.05) a conversation, at 1 credit = $0.01.
  - The plan includes 1,000 overage credits a month (they expire monthly). Auto-reload is $10 for 1,000 credits.
- **Business-in-a-Box also includes** [P]:
  - 200 voice minutes, 400 SMS, 500 email drafts, 300 form submissions.
  - 20 knowledge base pages.
  - 3 notification recipients.
  - Zapier.
  - "2 editor seats; unlimited viewing seats."
  - **"Last 200 logs of data retention."**
- **Partner / Enterprise adds** [P]: volume pricing, API access and custom integrations, a dedicated account manager, white-glove onboarding, **"custom data retention options."**
- **Trial:** "Start 7-day free trial" [P]. "No credit card required" appears on the help landing pages [Over][CW]. The pricing page does not say whether the Business trial needs a card [P].
- **Sales model:** self-serve sign-up for Business; Partner/Enterprise is custom [P].

### 5.2 Sign-up and setup flow (in order)
1. **Sign-up**, five steps [Over]:
   1. "Enter your email and create login credentials."
   2. "Provide your business name and type."
   3. "Answer a few questions about how you want calls handled."
   4. "Name your AI receptionist and provide basic configuration."
   5. "Confirm your email with a one-time code."
2. **Recommended order after sign-up** [Over]:
   1. Complete the setup checklist under Receptionist > Configure.
   2. Test in the Playground.
   3. Set up notifications.
   4. Forward the phone line.
   - The chatbot is the "AI Website Embeddable" sub-agent in the Inbound Suite [Over][Dash].
3. **Chatbot install** [Inst]:
   - Open the Website Widget page, Website Chatbot tab, and click "Copy Embed Code."
   - "Paste the embed code just before the closing `</body>` tag."
   - Platform guides:
     - WordPress: Insert Headers and Footers or WPCode, "Scripts in Footer."
     - Shopify: `theme.liquid`.
     - Wix: Custom Code, "Body - End," "All Pages."
     - Squarespace: Code Injection > Footer.
   - "Email My Developer" sends the code and instructions to whoever manages the site.
   - **Verification:** "Visit your website and confirm the chat bubble appears," then tick "My Chatbot is Live!" to finish setup.
- **The product page's version, three steps** [Prod]:
  1. Enter your website URL.
  2. Brand colors and logo "detected and applied automatically."
  3. "Copy a single line of code and paste it into your site, no developer needed."
- **How the business's information is gathered:** the chatbot "Answers questions using your AI receptionist's knowledge base" [CW]. Knowledge base entries [KB]:
  - Text, up to 100,000 characters per entry.
  - Website URLs, "up to 3 URLs per entry."
  - Documents: PDF, DOCX or TXT, 20 MB maximum.
  - The product page says "Enter your URL and the AI automatically reads your website, PDFs, and documents" [Prod].
- **Preview:**
  - The Playground is described for the receptionist [Over].
  - A chatbot-specific preview: not found. The install check is visiting the site [Inst].
- **Time to live:** "Go live in under 5 minutes" (marketing) [CW][Over]. The installation guide gives no time [Inst].
- **Contradiction:** the product page says brand colors and logo are detected automatically [Prod]. The help page offers preset swatches and no logo or avatar setting [Cust].

### 5.3 How the assistant is configured (Website Widget → Website Chatbot tab) [Cust]
- **Look & Feel:**
  - Light or Dark theme.
  - Colors from preset swatches.
  - Bottom Left or Bottom Right.
  - Mobile margins from 0 to 100 px.
- **Content:**
  - Business name, up to 50 characters.
  - Greeting, up to 200 characters. Default: "Hi! How can we help you today?"
  - Popup message, up to 100 characters. Default: "Have a question? Chat with us!"
  - Display names: an optional AI agent name, plus operator names.
- **AI Brain:** "instructions, personality, and knowledge." It uses the same prompt editor as the voice receptionist's Custom Commands [Cust]. Custom Commands allow "separate prompts for voice calls and text conversations" [Setup].
- **Escalation Rules:** up to 10. Each has a status, title, scenario description, response message, optional keywords and "an optional decline/offline intake workflow."
- **Behavior:** Auto-Open on desktop after 5 to 120 seconds (default 30). It never auto-opens on mobile.
- **Sounds & Alerts:** separate sounds for the dashboard and the widget.
- **Booking:** the product page says "Syncs with Google Calendar and Calendly" and books "on the spot" [Prod]. The chatbot help pages do not cover booking [CW][Cust].
- **Lead capture:**
  - "Collects lead information around the clock" [CW].
  - The product page says it "pushes qualified leads directly to your CRM via webhook or Zapier" [Prod].
- **Handoff:**
  - "Hands off conversations to a human operator based on escalation rules you define" [CW].
  - "One-click takeover button" [Prod].
- **Business hours for chat:** only the "decline/offline intake workflow" on an escalation rule [Cust]. A schedule: not found.

### 5.4 Channels (chat product)
- The product page says "Deploy on your website, Facebook Messenger, Instagram DMs, and SMS" [Prod].
- The help center's chatbot pages cover the website only [CW][Inst].
- WhatsApp: not found.
- Phone: the receptionist product, covered by another researcher.

### 5.5 After each chat
- **Notifications** [Notif]:
  - A "Chatbot" notification type covers "Conversations from the website chatbot widget," by email or SMS.
  - "SMS notifications may require a Pro subscription depending on your plan." The pricing page shows no plan named Pro [P], which contradicts this.
  - Recipients are plan-limited; Business-in-a-Box has 3 [P].
  - A "Sent Notifications History" article exists [Help].
- **In-dashboard alerts:** sounds for new conversations and messages [Cust].
- **Where chats are kept:** the product page says "All managed from a single inbox" [Prod]. The help pages do not say where chatbot conversations appear [Dash][Help].
- **Retention:** "Last 200 logs of data retention" on Business-in-a-Box, and "custom data retention options" on Enterprise [P]. Whether chatbot conversations fall under those 200 logs: not stated.
- **Setting to not store chats:** not found.

### 5.6 Owner's dashboard
- **Sidebar** [Dash]: Dashboard, Ask Frontdesk, Receptionist, Chatbot, Web Forms, Call Log Inbox, CRM (Customers), Outbound, Calendar, Tickets, Notify Me, Analytics, Settings.
- **More agents:** "Add More Receptionist" creates further agents [Dash].
- **Team:** "Team Management: Invite members and assign roles" [SetH]; 2 editor seats [P].
- **Several websites:** not found.

### 5.7 Integrations
- **Help center list** [IntH]: Zapier, Google Calendar, Custom Webhooks, API Workflows, Email/Gmail, Shopify, AppFolio, HubSpot, GoHighLevel, Housecall Pro, Claude and ChatGPT (MCP).
- **Calendly:** named on [Prod].

### 5.8 Features and their tier
- **Business-in-a-Box:** everything in 5.1 [P].
- **Partner/Enterprise:** custom limits, voice from 7 credits/min, API access, custom integrations, dedicated account manager and Slack channel, white-glove onboarding, custom data retention, custom outbound caller ID [P].
- **Chatbot product page, no tiers given** [Prod]: Instant Knowledge Base, Multi-Channel Support, Custom Personality, Live Human Handover, Booking Integration, Automated Lead Qualification, 20+ languages.
- **Website widgets:** Website Call Widget ("Click-to-call button"), AI Avatar ("talking video avatar") [Help embeddables section, https://www.myaifrontdesk.com/help/embeddables].

---

## Feature matrix

Each cell gives the tier, "no," or "not found." Sources are in each product's section. Abbreviations: BIB = Business-in-a-Box; ent = Partner/Enterprise.

| Feature | Tidio | BotPenguin | Manychat | Dapta | My AI Front Desk (chat) |
|---|---|---|---|---|---|
| Free plan, forever | Free | Baby | Free | no; 7,000 free credits at sign-up | no |
| Free trial | 7 days, no card | 7 days, no card (King features) | Pro 14 days; card not found | Pro 7 days, card required | 7 days; "No credit card required" on help pages |
| Website chat widget on the client's site | all plans | Baby+ | no | yes; tier not stated | BIB (100 conv/mo) |
| AI answers from the client's own knowledge | Free (one-time 50), all paid | Baby+ (1,000 AI msgs) | Pro (add-on status contradicts) | all plans (40 credits/answer) | BIB |
| Reads a website URL | yes, no tier limit stated; weekly auto-sync on Plus/Premium | Baby 200 pages, Little 1,000, King+ unlimited | one page per link entry | yes (sitemap discovery) | yes (3 URLs per entry; 20 KB pages on BIB) |
| URL asked for during sign-up | yes (sign-up form, Lyro learns from it) | no (not in sign-up per pages read) | no (channel connect instead) | company description can be generated from the URL during agent creation | not in sign-up steps; product page says "enter your website URL" |
| Document upload | PDF, CSV | yes, 25 MB/file | "coming soon" | yes (pdf, doc(x), ppt(x), txt, md, csv, json) | PDF, DOCX, TXT |
| Manual Q&A / FAQ entry | yes | Baby 50, Little 500, King+ unlimited | text entries (250k chars) | text source | yes ("Common Questions," receptionist) |
| Unanswered-question review | yes (Suggestions) | yes (Un-answered Questions) | not found | not found | not found |
| Test/preview before live | Playground (all) | Agent Preview / Test | Playground / Preview | Playground | receptionist Playground; chat preview not found |
| Activation blocked until knowledge exists | yes | not found | not found | not found | not found |
| Use-case templates at setup | Flows templates; goal question at sign-up | yes (use cases, templates) | not found | purpose presets | not found |
| Custom assistant name | Starter+ (≤20 chars) | yes (2–40 chars) | not found | yes | yes (display name) |
| Greeting / welcome message | yes (Flow) | yes (agent description ≤100, ice breakers) | not found | yes (welcome message, default questions) | yes (≤200 chars, popup ≤100) |
| Tone setting | neutral/friendly/formal/custom | Communication style | Behavior (Brand Voice & Persona) | in instructions | AI Brain prompt |
| Written rules / guardrails | Guidance: 5 Starter/Growth, 10 Plus, custom Premium | Core Instructions only; AI-disclaimer switch | "Guardrails & Constraints" | instructions only | Escalation Rules (≤10) |
| Handoff to a person | all (online/offline behavior) | Baby+ | Inbox (seats by plan) | Transfer to a human action | escalation rules |
| Operating hours | Starter+ | not found (online/offline toggle only) | not found | not found (Inbox online/offline) | not found (offline intake workflow only) |
| Booking inside the chat | Lyro Action (Calendly template) | Little+ | not found | dCal action | product page: Google Calendar, Calendly |
| Lead capture | Pre-chat survey, Flows ($24 add-on beyond Free's 100 visitors) | yes; email lead alerts Little+ | Essential+ | post-conversation variables → webhook/CRM | yes; to CRM via webhook/Zapier (product page) |
| Owner notified per chat | email only when offline | session summary email (setting); lead email Little+ | Notify Assignees action | no alert for website chats | email or SMS per chatbot conversation (3 recipients on BIB) |
| Transcript to owner | manual send / CSV, one at a time | not found as a transcript (summary email) | not found | CSV export | not found for chat |
| Stated chat retention period | not found | 30 days Baby, 90 days Little, lifetime King+ | not found | not found | "Last 200 logs" BIB; custom on ent |
| Setting to not store chats | not found | not found | not found | not found | not found |
| Facebook Messenger | yes | Baby+ | Free+ | yes | product page only |
| Instagram | yes | Baby+ | Free+ | not found | product page only |
| WhatsApp | yes | Baby+ | Pro+ | yes | not found |
| SMS | not found | Emperor ([P]) vs all ([T]); contradiction | Pro+ | yes (A2P 10DLC) | product page; 400 SMS on BIB |
| Email channel | Lyro for emails, Starter+ | not found | Pro+ | not found | not found |
| Phone / voice | Voice add-on $16/mo (AI not stated) | AI Voice Agents; voice minutes add-on | not found | Voice Agents (credits) | core product (other researcher) |
| Seats included | up to 10 (Starter, Growth); custom Plus | 5/10/unlimited (pages disagree); +$7 each | users 1/2/3/5/expanded; Inbox seats 1/1/2/3; +$25 | 5 Pro; unlimited above | 2 editors + unlimited viewers |
| Several websites / brands | same code on several sites; Multiproject Plus | websites 1/5/unlimited | one account per brand | workspaces 5/25/70 | several receptionists; several sites not found |
| Remove vendor branding | $20/mo add-on | add-on ($20/mo per bot) on Baby/Little | not found | not found | not found |
| White-label / reseller | not found | white label Emperor; reseller program | not found | not found | Partner/Enterprise "for ... agencies" |
| Zapier | yes | King+ | yes | not found | BIB |
| Webhooks / API | OpenAPI on Plus | API in chatflows King+; webhooks on features page | External Request (paid); API on Advanced | API actions, post-conversation webhook, MCP | custom webhooks; API on ent |
| CRM | HubSpot, Salesforce, Pipedrive, Dynamics | HubSpot, Salesforce (King+) and many | HubSpot | HubSpot, Salesforce, Zoho, Pipedrive, GoHighLevel | HubSpot, GoHighLevel |
| E-commerce | Shopify actions (Growth); Woo/BigCommerce plugins | Shopify, WooCommerce | no native Shopify (community) | Shopify, WooCommerce, Magento 2 | Shopify |
| Owner mobile app | iOS, Android | Little+ | yes | not found | not found |
| Pay per resolution | Premium, by agreement | not found | not found | not found | not found |
| Done-for-you / assisted setup | Plus (Flows help), Premium (managed Lyro) | King "We are here to help"; Emperor done-for-you build | not found | Pro one tech session; Scale-Up+ assisted | ent white-glove |

---

## Patterns across these products

1. **Sign-up asks for little, and payment comes after setup.**
   - Four of five ask only identity details at sign-up: email/password, Google or social login, sometimes a phone number. You can build and test before paying, on a free plan or a no-card trial.
     - Tidio: free plan and no-card trial.
     - BotPenguin: free plan and no-card trial.
     - Manychat: free plan.
     - My AI Front Desk: no-card trial on its help pages.
   - Dapta is the exception for its trial (card required) but gives 7,000 free credits so agents can be built first.
   - Business details arrive in different places:
     - Tidio asks for the website URL and a goal, industry and volume survey at sign-up.
     - My AI Front Desk asks business name and type and how calls should be handled.
     - Dapta asks company name and description while the first agent is created.
2. **The website URL is the main seed for the assistant's knowledge.**
   - Tidio reads it at sign-up.
   - Dapta can write the company description from it.
   - My AI Front Desk's product page starts with "enter your website URL."
   - BotPenguin trains on the full site or chosen URLs.
   - Manychat reads one page per link.
   - All five also take typed text or Q&A. Four take documents (Manychat's files are "coming soon").
   - Two turn unanswered visitor questions into new Q&A: Tidio Suggestions, BotPenguin Un-answered Questions.
3. **A test step before going live is standard.**
   - Tidio, BotPenguin, Manychat and Dapta each have a playground or preview.
   - Tidio blocks activation until knowledge has been added.
   - Dapta warns that a preview does not prove the deployed widget works and says to test a real conversation on the live site.
   - My AI Front Desk's chat install ends with the owner ticking "My Chatbot is Live!" after checking the bubble on the site.
4. **The widget install is always a pasted script snippet**, "before `</body>`," with per-platform guides for WordPress, Shopify, Wix and Squarespace.
   - Three offer a hand-off to someone else:
     - Tidio: "Send instructions via email."
     - My AI Front Desk: "Email My Developer."
     - BotPenguin: "share the code or ask the support team."
   - Install detection is automatic in Tidio ("installed properly") and BotPenguin (the "Not Connected" status clears, or URL verify), and manual in My AI Front Desk.
5. **The pricing unit varies, and seats are bundled.**

| Product | Unit | Seats / users included | Extra seat |
|---|---|---|---|
| Tidio | conversations (AI + human together) | up to 10 | — |
| My AI Front Desk | chatbot conversations, with a $0.05 overage | 2 editors + unlimited viewers | — |
| BotPenguin | messages | 5 to 10 | $7 |
| Manychat | monthly active contacts | 1 to 5 users | $25 per Inbox seat |
| Dapta | credits per AI answer ($0.04) | 5 users on Pro | — |

   - Annual billing is about "two months free" at Tidio, BotPenguin and Dapta, 20% at My AI Front Desk, and 25–30% at Manychat.
6. **Handoff and escalation are written as rules**, often with an "agents offline" branch.
   - Tidio: Guidance plus separate online and offline handoff behavior.
   - My AI Front Desk: Escalation Rules with an offline intake workflow.
   - Dapta: a Transfer action with an "Unavailability message."
   - BotPenguin: a "Live chat unavailability message."
7. **Every product stores chats by default, and none offers a setting to not store them.**
   - Retention is a pricing lever where it is stated:
     - BotPenguin: history 30 days (Free), 90 days (Little), lifetime (King+).
     - My AI Front Desk: "Last 200 logs" on its one self-serve plan, custom retention on Enterprise.
   - Tidio, Manychat and Dapta state no period.
   - Manychat's community says a conversation cannot be deleted while keeping the contact.
   - Tidio keeps the visitor's side of the history in the visitor's browser localStorage.
8. **How the owner learns about a chat differs widely.**
   - My AI Front Desk sends an email or SMS per chatbot conversation, to plan-limited recipients.
   - BotPenguin has session-summary emails and lead emails from Little up.
   - Tidio emails only when the agent is offline. Transcripts are sent by hand, and visitors get one automatically.
   - Dapta sends no alert for website chats.
   - Manychat notifies through a flow action.
9. **Several sites or brands:**
   - Tidio: one snippet on many sites; separate projects only on Plus.
   - BotPenguin: a website count by plan.
   - Dapta: workspaces by plan.
   - My AI Front Desk: more receptionists.
   - Manychat: a separate account per brand.
10. **Vendor pages contradict each other often enough that no single page can be trusted alone.**
    - BotPenguin: seat counts and SMS availability.
    - Tidio: Smart Action limits; a Voice add-on for sale while "Lyro Voice" is "Exploring."
    - Manychat: whether AI is an add-on.
    - My AI Front Desk: channels, brand auto-detection and a "Pro subscription" that is not on its pricing page.
    - Dapta: setup time (2 minutes, 5 minutes, about 30 minutes) and whether the free start needs a card.
