# OrderStack (getorderstack.com) and its use of Electron

Research date: 2026-11-23. Headline: the getorderstack.com site could not be read from this environment (TLS handshake failure and a browser error page), so nothing first-party was obtained. No source found states that OrderStack ships an Electron app. Do not treat OrderStack as an established Electron reference.

## What is OrderStack, who makes it, what does it do? Which entity matches "getorderstack"?

### Takeaway
A search for "getorderstack" returns a page titled "OrderStack — Restaurant Operating System" at getorderstack.com, described as an all-in-one restaurant OS (POS, online ordering, KDS, delivery management, no marketplace commissions). The page itself could not be fetched, so the maker and details are unverified. Several unrelated products share similar names.

### Cited Findings
- A web search for "getorderstack" returned a result titled "OrderStack — Restaurant Operating System" at www.getorderstack.com/index.html. The search tool's summary of it: POS, online ordering, kitchen display system, delivery management, no marketplace commissions. This is the search tool's paraphrase, not a page I read — [search result](https://www.getorderstack.com/index.html)
- DNS: www.getorderstack.com is a CNAME to orderstack-app.onrender.com, i.e. hosted on Render behind Cloudflare. Observed directly via `dig` on 2026-11-23. The bare domain getorderstack.com returned HTTP 409 with Cloudflare "error code: 1001" over HTTP.
- Fetching https://www.getorderstack.com failed with a TLS handshake failure (WebFetch and curl), and a real Chrome browser showed an error page. orderstack-app.onrender.com returned "Not Found" at its root. The site may be misconfigured, down, or blocking this environment; cause unknown.
- Internet Archive had no snapshot for getorderstack.com — [Wayback availability API](https://archive.org/wayback/available?url=getorderstack.com)
- Different, unrelated entity: orderstack.io is "Enterprise Product Engineering & AI Consulting" (IT services, Toronto per LinkedIn), not a restaurant product — [orderstack.io](https://orderstack.io); [LinkedIn](https://www.linkedin.com/company/orderstackio)
- Different entity: EverybodyWiki describes "OrderStack" as a commission-free online ordering platform for restaurants, powered by TNGONE, Inc., formerly Skipthecommission (founded 2018), Binghamton NY. Single wiki source citing 2019-2020 articles; could not be fetched directly (403), known only via search summary — [EverybodyWiki](https://en.everybodywiki.com/OrderStack). Whether this is the same as getorderstack.com is unconfirmed.
- Different entity: "Ordering Stack" (orderingstack.com), a Polish cloud ordering platform for restaurant chains, says it needs an internet connection with no offline mode per its FAQ (via search summary) — [orderingstack.com](https://orderingstack.com/)
- Also found: an Instagram account @orderstack and a ZoomInfo entry (Binghamton NY, IT consulting/software) — [ZoomInfo](https://www.zoominfo.com/c/orderstack/529852467); not verified to be the same company.

### Inferences
- The getorderstack.com marketing description suggests a POS-class restaurant product, but that is from a search snippet only.
- The TNGONE link and the GitHub user "tngoman" (see below) may be a coincidence of naming; no source ties them together.

### Gaps
- Who makes getorderstack.com, its pricing, and its current status: not established (site unreadable).

## Does it ship an Electron app? Platforms? What does it do?

### Takeaway
No source found says OrderStack ships an Electron app or any desktop app. Not found, not disproven.

### Cited Findings
- Searches for "OrderStack Electron POS desktop app" and for OrderStack desktop downloads returned no OrderStack results, only unrelated open-source Electron POS projects — [search results](https://github.com/tngoman/Store-POS)
- Unrelated but easily confused: the GitHub repo tngoman/Store-POS is an open-source "Modern Electron Point of Sale" (React till, Express and SQLite API, LAN multi-terminal modes Standalone / Network Server / Network Terminal, Windows installer, Electron 33 with contextIsolation and a preload bridge, no nodeIntegration). The repo page does not mention OrderStack — [GitHub](https://github.com/tngoman/Store-POS)

### Inferences
- Store-POS is not evidence about OrderStack. The only possible link is that GitHub user "tngoman" resembles "TNGONE"; no source connects them.

### Gaps
- Electron use, platforms, KDS/printer bridge, offline sync: no source found.

## How does the app authenticate to the backend and to local hardware (device registration, tokens, certificates, local agent, stable device identity)?

### Takeaway
Nothing found for OrderStack.

### Cited Findings
- None. For reference only, Store-POS (a different product) uses JWT and bcrypt for user auth, Bearer tokens, a per-terminal till number, and tells operators to restrict Network Server mode to a trusted LAN; it does not describe per-device authentication — [GitHub](https://github.com/tngoman/Store-POS)

### Inferences
- None for OrderStack.

### Gaps
- Device registration, device tokens, certificates, local agent or tunnel, stable device identity: no OrderStack source found.

## Published security model, connection hardening, certificate handling, auto-update signing, Electron security features

### Takeaway
No OrderStack security documentation found.

### Cited Findings
- None found.

### Inferences
- None.

### Gaps
- No security page, trust page, or docs were reachable. Not checked because inaccessible: getorderstack.com itself.

## Public repositories, engineering blog posts, release notes, job posts, docs

### Takeaway
None found for getorderstack.com. Only the unrelated orderstack.io consultancy has a public site and careers page.

### Cited Findings
- orderstack.io has a sitemap with careers, articles-and-research and compliance pages (SOC 2, HIPAA, zero trust), but it is a consultancy site and not about the restaurant product — [sitemap](https://orderstack.io/sitemap.xml)
- A LinkedIn post advertises a React Native Mobile Developer role at the orderstackio company — [LinkedIn](https://www.linkedin.com/company/orderstackio); relation to getorderstack.com unverified.
- A GitHub repo search was attempted but the API call failed on a shell glob error; a GitHub org for getorderstack was therefore not checked.

### Inferences
- None.

### Gaps
- GitHub org/repo for getorderstack, release notes, engineering blog, app store listings: not checked or not found. Recommended next step: Jeff opens https://www.getorderstack.com in his own browser and reads its download and security pages, or supply the real URL.
