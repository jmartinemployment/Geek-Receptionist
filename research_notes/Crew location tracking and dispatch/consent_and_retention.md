# Crew location tracking: employer consent/notice rules, platform rules, and retention (research notes, as of 2026-11-22)

Research only, not legal advice. Source type is marked on each finding: **[statute]** = read from or summarised from statute text; **[agency]** = government/regulator page; **[commentary]** = law firm, HR vendor or trade article; **[platform]** = Apple/Google policy; **[vendor]** = software vendor's own page. Several fetches returned a summary produced by a fetch tool rather than the verbatim page; those are flagged "summary of fetch". Nothing here says what is legally safe.

## 1. Federal and Florida rules on employer location tracking; which other states need extra care

### Takeaway
No federal statute found that specifically governs employer GPS tracking of employees; the main constraints come from state law and common-law privacy claims. Florida's tracking-application statute (s. 934.425) requires consent to use a tracking app to find a person's location but, per the fetched summary, has a business-entity good-faith/legitimate-purpose exception that was not verified verbatim. Connecticut, New York and Delaware have written-notice electronic-monitoring statutes, but their text as found is aimed at premises/telephone/email/internet monitoring, not clearly at phone location. California's Penal Code 637.7 is the sharpest location-specific rule found (vehicle-only consent exception).

### Cited Findings
**Federal**
- "There's no federal privacy law to keep businesses from tracking their employees with GPS"; only a handful of states restrict it; elsewhere plaintiffs rely on invasion-of-privacy torts. [commentary, via search-result summaries of ADP/SHRM/Paychex-type pages; not individually fetched] — [SHRM: monitoring employees GPS](https://www.shrm.org/resourcesandtools/hr-topics/risk-management/pages/monitoring-employees-gps.aspx), [ADP](https://www.adp.com/spark/articles/2016/01/employee-privacy-is-gps-tracking-compliant.aspx), [Paychex](https://paychex.com/articles/human-resources/read-this-gps-track-employees)
- Several firms advise written consent before tracking employee-provided phones and avoiding GPS collection while employees are off duty. [commentary] — same sources as above
- Roughly 29 states and DC have off-duty-conduct protections against firing; off-duty tracking that feeds discipline is described as higher-risk where they apply. [commentary, number unverified] — same sources
- Intermex matter: an employee claimed she was fired for disabling a GPS app on her company phone after learning she was tracked around the clock. [commentary, allegation only] — same sources
- ECPA / Stored Communications Act / FLSA / NLRA: searched, no usable source returned. See Gaps.

**Florida**
- s. 934.425 (2025 text, flsenate.gov): "tracking application" = software whose primary purpose is to track or identify the location or movement of an individual; a person may not knowingly install a tracking device/app on another's property without consent, or use one to find another person's or property's location or movement without consent. [statute, summary of fetch] — [Fla. Stat. 934.425 (2025)](https://www.flsenate.gov/Laws/Statutes/2025/934.425)
- "Person" is defined as an individual and excludes a business entity; an exception covers a person acting in good faith on behalf of a business entity for a legitimate business purpose. The fetch summary stated the statute has no separate "employer" exception and that the business-entity clause is (4)(g). [statute, summary of fetch; exact wording and scope NOT verified verbatim] — same URL
- Violation is a third-degree felony (second-degree if used to facilitate a dangerous crime). The 2024 amendment (SB 758, effective Oct 1, 2024) extended the ban from installation to use. [statute / bill history] — same URL; [SB 758 (2024)](https://flsenate.gov/Session/Bill/2024/758/BillText/er/HTML)
- Florida Digital Bill of Rights: sources say it does not apply to employee data (s. 501.703(2)); precise geolocation is "sensitive data" under it. [commentary] — [SHRM](https://www.shrm.org/topics-tools/employment-law-compliance/florida-enacts-privacy-law), [DataGuidance](https://www.dataguidance.com/notes/florida-sectoral-privacy-overview)

**Connecticut**
- Conn. Gen. Stat. 31-48d: prior written notice to affected employees of the types of electronic monitoring; conspicuous posting; exception where employer has reasonable grounds to suspect unlawful conduct, violation of legal rights, or hostile workplace. [statute via commentary] — [Justia 31-48d](https://law.justia.com/codes/connecticut/2022/title-31/chapter-557/section-31-48d/), [CT DOL notice](https://portal.ct.gov/dol/-/media/DOL/2022-New-Design-System/Divisions/wage-and-workplace-standards/ElectronicMonitoring.pdf)
- Public Act 26-73 (SB 472), signed June 4, 2026, repeals and replaces 31-48d effective Oct 1, 2026: notice must also name the specific premises locations where monitoring occurs and be posted there; new hires on/after Oct 1, 2026 get a plain-language written statement of activities monitored without notice; civil penalties up to $500 / $1,000 / $3,000 (first / second / third+). Definition is premises-based ("on an employer's premises"); the commentary did not say whether GPS is covered. [statute via commentary; act text not read] — [Workplace Privacy Report, Sept 2026](https://www.workplaceprivacyreport.com/2026/09/articles/monitoring-2/deadline-imminent-for-connecticuts-expanded-electronic-monitoring-law/), [PA 26-73 text](https://prdext3.cga.ct.gov/2026/ACT/PA/PDF/2026PA-00073-R00SB-00472-PA.PDF)

**New York**
- Civil Rights Law 52-c (the second of two sections numbered 52-c): employers that monitor or intercept telephone, email or internet use must give written (or electronic) notice on hiring, get the employee's written or electronic acknowledgment, and post the notice conspicuously. [statute, summary of fetch] — [NY Senate CVR 52-C*2](https://www.nysenate.gov/legislation/laws/CVR/52-C*2)
- Law-firm reading: acknowledgment is required only for new hires; scope is phone/email/internet, effective May 7, 2022. [commentary] — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/labor-days/ny-requires-notice-of-electronic-monitoring-to-employees-are-you-in-compliance), [MoFo](https://www.mofo.com/resources/insights/211115-new-york-enacts-employee-monitoring-notification-law)

**Delaware**
- 19 Del. C. 705: before monitoring/intercepting phone, email or internet use, employer must give either daily electronic notice, or a one-time written/electronic notice acknowledged by the employee; $100 civil penalty per violation. [statute, summary of fetch] — [Delaware Code Title 19 ch. 7](https://delcode.delaware.gov/title19/c007/sc01/index.html)

**California**
- Penal Code 637.7: no person or entity may use an electronic tracking device to determine the location or movement of a person; exception applies where the registered owner/lessor/lessee of a *vehicle* has consented. CalChamber says there is no similar exception for a phone, and that whether a smartphone app is a "device" is debated. [statute via commentary] — [Justia 637.7](https://law.justia.com/codes/california/2019/code-pen/part-1/title-15/chapter-1-5/section-637-7/), [CalChamber HR](https://p-hrcalifornia.calchamber.com/hr-library/qa/track-employees-GPS-device-cell-phone-vehicle)
- AB 1331 (chaptered 2026, effective Jan 1, 2027, adds Labor Code Part 5.8): as signed it is a workplace-bathroom surveillance ban with $500-per-violation penalties; "workplace surveillance tool" reportedly includes geolocation tools. Earlier drafts would have barred monitoring off-duty areas including a worker's residence or personal vehicle; one source claims the enacted law covers breakrooms etc., but bathroom-focused sources (Ogletree, Sheppard, LCW) do not support that. [commentary; conflicting] — [Ogletree](https://www.ogletree.com/insights-resources/blog-posts/california-governor-signs-3-bills-targeting-ai-and-workplace-surveillance/), [Sheppard Mullin](https://www.sheppard.com/insights/blogs/california-ab-1331-limits-workplace-bathroom-surveillance), [Nat'l Law Review](https://natlawreview.com/article/californias-new-workplace-surveillance-law-employee-bathroom)

### Inferences
- CT, NY, DE appear to be notice-and-posting regimes for premises/communications monitoring; whether they reach phone location is not established by anything read. A reader should treat them as "states where an electronic-monitoring notice regime exists", not as proven location-tracking rules.
- California is the state with an explicit location-tracking statute whose vehicle-only exception leaves phones unaddressed; that suggests extra care there, but this is inference.
- Florida's statute defines "person" to exclude business entities and has a business-entity exception, so a Florida employer acting for a legitimate business purpose may be treated differently from an individual; verbatim text and case law needed.

### Gaps
- Verbatim text of Fla. Stat. 934.425(4)(g); no case law or commentary found on its application to employee phones.
- No primary or secondary source found on ECPA, Stored Communications Act, FLSA off-duty time, NLRA, or Florida common-law privacy as applied to employee phone tracking.
- Statutory text of CT PA 26-73 not read directly; whether geolocation is covered unknown.
- Other states (Illinois, Texas, Washington, etc.) not researched; "four states" claim in commentary not identified.
- Whether AB 1331 as enacted reaches off-duty or personal-vehicle tracking: unresolved; chaptered text not read.

## 2. Apple and Google platform rules on background location in work apps

### Takeaway
Google Play requires background location to be core to the app and requires a prominent in-app disclosure plus a declaration and video. Apple requires consent, purpose strings, data minimization and a privacy policy that states retention/deletion; employee-tracking apps have been rejected or redirected in developer-forum reports.

### Cited Findings
- Google: background location allowed only if required for core functionality, with significant user benefit; foreground preferred; requests solely for ads/analytics not allowed. [platform, summary of fetch] — [Google Play background location policy](https://support.google.com/googleplay/android-developer/answer/9799150?hl=en)
- Google disclosure: a dialog shown in normal use before the runtime permission prompt, containing the word "location", stating background use ("when the app is closed / not in use"), listing every feature using background location; not satisfiable by privacy policy alone. Suggested template: "This app collects location data to enable [feature] even when the app is closed or not in use." Declaration form and a 30-second-or-less video are required. Privacy policy must be linked in-app and in the listing and cover location. [platform, summary of fetch] — same URL
- Google: foreground-service location is allowed only as a continuation of a user-initiated action that ends when the action ends; otherwise background rules apply. The page did not address employee/enterprise tracking and did not mention persistent notifications. [platform, summary of fetch] — same URL
- Apple 5.1.5: use Location Services only when directly relevant; "notify and obtain consent before collecting, transmitting, or using location data." [platform] — [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Apple 5.1.1: privacy policy must explain data retention/deletion and how to revoke consent/request deletion; consent required "even if such data is considered to be anonymous"; purpose strings must "clearly and completely describe" use; data minimization (collect only what the task requires). 5.1.2: data collected for one purpose may not be repurposed without consent. 2.5.4: background services only for intended purposes including location. [platform, summary of fetch] — same URL (last ~14k characters of the page were not read)
- Developer-forum reports (anecdotal): an app used "solely for the purpose of tracking employees" was rejected under 2.5.4 as unsuitable for the App Store; another was advised to use Apple Business Manager. [forum, unofficial] — [Apple forum thread (search result summary)](https://developer.apple.com/forums/thread/774018)
- ServiceTitan's help page says technicians must select "Allow only while using the app" or "Ask every time" for GPS tracking to work. [vendor] — [ServiceTitan help](https://help.servicetitan.com/construction/docs/enable-native-gps-access-for-the-servicetitan-field-mobile-app)

### Inferences
- A tracking feature that reads location only when a caller asks might be argued to be foreground/user-initiated rather than continuous background; whether it avoids the background-location declaration depends on how the crew app obtains the reading while closed. Not verified against Apple/Google.

### Gaps
- Apple's Always-authorization specifics (Core Location docs) not read; only a third-party guide mentioned it. Employee-tracking-specific Apple guideline text not located. Android 10+/iOS system reminder prompts not sourced.

## 3. What a business must tell its crew; written consent; work-hours-only norm

### Takeaway
Only the notice statutes above (CT, NY, DE) were verified as requiring written notice, and NY and DE require a written/electronic acknowledgment; none verified as location-specific. Commentary advises written policy and written acknowledgment, and tracking only during work hours as good practice rather than law.

### Cited Findings
- Vendor-review blog: written monitoring policy before go-live covering what is tracked, when, who sees it and how long it is kept; says California, Illinois, New York, Connecticut impose notice requirements (no statutes cited); written acknowledgment recommended "even where explicit consent isn't legally required"; recommends tracking only during scheduled work hours, which "requires a deliberate configuration step". [commentary, commercial interest; consulting vendor] — [fieldservicesoftware.io](https://fieldservicesoftware.io/blog/field-technician-tracking-gps-privacy-trust/)
- Written consent before tracking employee-provided phones, and avoid off-duty collection. [commentary] — SHRM/ADP/Paychex links above
- NY/DE acknowledgments may be written or electronic. [statute] — see section 1
- QuickBooks Time: GPS points are not gathered on break; admins can't see location when off the clock; but the app "may still have access to employees' locations" off the clock. [vendor] — [QuickBooks GPS FAQ](https://quickbooks.intuit.com/time-tracking/resources/gps-tracking-faq/)

### Inferences
- "Work hours only" is a common practice recommendation and vendor design point, supported by commentary, not by a statute found here.

### Gaps
- No statute found mandating written consent for location tracking by a private Florida employer. No authoritative survey of "the norm"; only commentary and vendor behavior.

## 4. Does not storing location reduce obligations or exposure?

### Takeaway
No authoritative source found stating that non-retention reduces consent/notice obligations for employee location tracking. The sources read key the duty to collection/use/access, not storage.

### Cited Findings
- Florida 934.425 prohibits *using* a tracking app to find a person's location without consent; the text as summarised does not mention storage. [statute, summary of fetch] — [Fla. Stat. 934.425](https://www.flsenate.gov/Laws/Statutes/2025/934.425)
- Apple 5.1.1(ii): consent needed to collect data "even if such data is considered to be anonymous at the time of or immediately following collection." [platform] — [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Google disclosure requirement is triggered by background location *collection* and says nothing about retention. [platform] — Google Play policy above
- FTC orders (Gravy/Venntel, Mobilewalla, InMarket, Kochava 2026) require affirmative consent and published retention schedules; the Mobilewalla complaint alleged indefinite retention of location history was itself unfair, which two commissioners disputed. These are consumer data-broker cases, not employer cases. [agency / commentary] — [FTC Kochava 2026 release](https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-ban-kochava-subsidiary-selling-sensitive-location-data-settle-charges-they-sold-location-data), [Proskauer](https://www.proskauer.com/blog/ftc-remains-on-the-location-data-beat-agency-settles-long-running-kochava-enforcement-even-as-state-regulation-has-already-changed-the-landscape), [InMarket release](https://ftc.gov/news-events/news/press-releases/2024/01/ftc-order-will-ban-inmarket-selling-precise-consumer-location-data)
- California lists precise geolocation as sensitive personal information; one commentary says CCPA sensitive-data obligations are use-based, not collection-based (unverified against statute; employee-data treatment not checked). [agency / commentary] — [CPPA](https://cppa.ca.gov/pdf/personal_information.pdf), [BCLP](https://www.bclplaw.com/print/v2/content/1516870/sensitive-personal-information-understanding-and-complying-with-the-new-rules-in-the-united-states.pdf)

### Inferences
- Not storing likely reduces breach and retention-related exposure (nothing to leak or keep indefinitely, in line with FTC retention concerns), but no source says it removes the notice/consent duty, because the duties read are triggered by the act of tracking or collecting. The consent duty in Florida's statute attaches to *use*, which a live lookup still is.
- This is inference, not a finding.

### Gaps
- No law, regulator or court source found addressing transient, non-persisted location reads. CCPA "collect"/"employee data" definitions not checked. No source on a provider's own duties as a processor of an employer's employee location data.

## 5. Retention practices in comparable products

### Takeaway
Retention periods are rarely published; where they are, they are vendor-set and short-to-configurable (Hubstaff 1 month on listed plans). Several products limit tracking to clock-in time, which is the main "off switch" found.

### Cited Findings
- Hubstaff: location data kept 1 month on Starter, Grow, Team and Enterprise; Data Retention Add-on also 1 month for Locations per the list view (a search snippet suggested "six years" under the add-on; the page's table was ambiguous). [vendor, summary of fetch; conflict] — [Hubstaff retention comparison](https://support.hubstaff.com/data-retention-comparison/)
- QuickBooks Time: GPS points not stored on break, clocked out or signed out; points attached to timesheets and exportable via Reports > Tracking > GPS Points; no retention period stated; admin setting can require location to clock in. [vendor] — [QuickBooks GPS FAQ](https://quickbooks.intuit.com/time-tracking/resources/gps-tracking-faq/)
- Jobber: records location at clock-in/out and visit completion plus live tracking; no retention figure found. [vendor, via search snippet] — [Jobber GPS](https://www.getjobber.com/features/gps-tracking-app/)
- ServiceTitan: device-permission setting is the only off-switch found. [vendor] — ServiceTitan link above
- Industry guide: most field-service platforms set no retention limit by default so data accumulates unless an admin configures it; route history is typically stored and reviewable; some platforms log only at clock-in/clock-out. [commentary, vendor-consultant] — [fieldservicesoftware.io](https://fieldservicesoftware.io/blog/field-technician-tracking-gps-privacy-trust/)

### Inferences
- A read-on-request, store-nothing design is at the minimal end of the range seen; none of the products examined was found to offer it.

### Gaps
- Workiz, Samsara, Connecteam retention not found (Connecteam privacy policy has a Data Retention section not read). Jobber, ServiceTitan retention periods not found. Whether any vendor lets history be turned off entirely: not found beyond clock-in-only / permission settings.
