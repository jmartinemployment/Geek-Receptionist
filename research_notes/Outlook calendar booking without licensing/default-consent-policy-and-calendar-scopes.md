# The Microsoft-managed consent policy excludes every calendar scope from end-user consent

Research date: 2026-11-20. Settles the item the report listed third among the things that
"cannot be settled by reading" and called highest-leverage: the third-party claim ([Zeeg](https://zeeg.me/en/help/articles/14755107-how-microsoft-365-permissions-work-in-zeeg))
that Microsoft changed Entra defaults so that third-party apps need administrator consent before a
user can grant calendar access through Graph.

## Verdict

**Confirmed, from Microsoft's own documentation, and more specifically than the third-party source
stated it.** The claim is not about third-party apps in general — it is about a named list of
delegated permissions, and every calendar scope this product could use is on it.

## The citation

[Manage app consent policies](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-app-consent-policies),
section "Microsoft recommended current settings", page `updated_at` 2026-11-19 (fetched
2026-11-20):

> The setting labeled "Let Microsoft manage your consent settings," the Microsoft managed policy,
> will update with Microsoft's latest recommended default consent settings. **This is also the
> default for a new tenant.** The setting's rules are currently: End users can consent for any user
> consentable delegated permissions EXCEPT:
>
> - For Microsoft Graph: `Files.Read.All`, `Files.ReadWrite.All`, `Sites.Read.All`,
>   `Sites.ReadWrite.All`, `Mail.Read`, `Mail.ReadWrite`, `Mail.ReadBasic`, `Mail.Read.Shared`,
>   `Mail.ReadBasic.Shared`, `Mail.ReadWrite.Shared`, `MailboxItem.Read`, **`Calendars.Read`**,
>   **`Calendars.ReadBasic`**, **`Calendars.ReadWrite`**, **`Calendars.Read.Shared`**,
>   **`Calendars.ReadWrite.Shared`**, `Chat.Read`, `Chat.ReadWrite`, `OnlineMeetings.Read`,
>   `OnlineMeetings.ReadWrite`, `MailBoxFolder.Read`, `MailBoxFolder.ReadWrite`,
>   `MailBoxSettings.Read`, `MailBoxSettings.ReadWrite`, `Contacts.ReadWrite`,
>   `Contacts.Read.Shared`, `Contacts.ReadWrite.Shared`, `Tasks.Read`, `Tasks.Read.Shared`,
>   `Tasks.ReadWrite`, `Tasks.ReadWrite.Shared`, `People.Read`.
> - For Office 365 Exchange Online: `EAS.AccessAsUser.All`, `EWS.AccessAsUser.All`,
>   `IMAP.AccessAsUser.All`, `POP.AccessAsUser.All`.

Bold is mine. The built-in policy is named `microsoft-user-default-recommended`, and the same page
carries the warning that it "and microsoft-user-default-allow-consent-apps are a Microsoft managed
policies. The conditions included in the policies are automatically updated based on Microsoft's
latest security recommendations for end-user consent" — so the list above is a snapshot, not a
contract.

Dates and rollout, from the Microsoft Q&A thread on message-centre post **MC1163922**
([Clarification on MC1163922](https://learn.microsoft.com/en-us/answers/questions/5572742/clarification-on-mc1163922)),
which quotes the message as: "For customers using the Microsoft-managed default consent policy,
admin approval will be required for third-party apps accessing Exchange and Teams content via
Microsoft Graph, Exchange Web Services (EWS), Exchange ActiveSync (EAS), POP3, and IMAP4." The
thread dates the Graph permissions to the **end of October 2025** and the EWS/EAS/IMAP/POP scopes to
the **end of November 2025**. The earlier **MC1097272** (July 2025) was the same move for
`Files.*`/`Sites.*`.

## What this changes about the plan

1. **Publisher verification does not buy self-consent.** The report's structure was: verification is
   the mandatory long-lead item, after which "on a default-policy tenant a verified publisher gets
   self-consent in a few clicks." That is now wrong. The exclusion is keyed to the *permission*, not
   to the publisher's verification status — a verified publisher asking for `Calendars.ReadWrite`
   is excluded exactly as an unverified one is. Verification still matters for risk-based step-up
   consent and for how the consent screen reads, but it is no longer the thing standing between the
   owner and a working connection.

2. **There is no calendar scope that routes around it.** `Calendars.ReadBasic` — the narrowest
   read scope, which would otherwise be the fallback for a free/busy-only product — is on the list
   too. The only calendar permission absent from the list is `Calendars.ReadBasic.Shared`, which is
   read-only (so it cannot book) and *broader* in subject (shared calendars), which is the wrong
   direction on both counts.

3. **Admin consent is the main path, not the error path.** Onboarding has to be built around
   "Consent on behalf of your organization," with the self-consent attempt as the lucky case, not
   the reverse. The `AADSTS90094` detection the report already calls for stays, but it stops being
   an edge case to degrade into.

4. **It is less bad than it sounds for a 1–20 person business**, which is the whole target. The
   owner of a small tenant generally *is* the Global Administrator, so the admin consent dialog is a
   dialog they can click themselves — one extra checkbox, not a ticket to an IT department. The
   onboarding cost is a worse consent screen and a harder-to-explain step, not an impossible one.

5. **Tenant-wide admin consent does not mean tenant-wide calendar access**, and the copy must say so
   or the owner will reasonably assume it does. Admin consent to a *delegated* permission
   pre-approves the permission for the tenant's users; the app still acts only as the user who
   signed in and can still only reach that user's calendar. There is no reading of this grant under
   which the receptionist can see other employees' calendars without those employees signing in.
   (App-only permissions are the ones that are genuinely tenant-wide, and the report already rules
   those out for separate reasons.)

## What is still open

- **Existing tenants.** The page says the Microsoft-managed policy "is also the default for a new
  tenant"; it does not say every existing tenant was moved onto it. A tenant left on
  `microsoft-user-default-legacy` ("Allow user consent for apps") is not subject to the exclusion
  list at all. So the population splits, and the product cannot see which half a given owner is in
  before trying — which is the same conclusion the report reached, arrived at for a different
  reason. Unresolved: what proportion of existing small-business tenants Microsoft migrated, and
  whether MC1097272/MC1163922 flipped the setting or only changed the managed policy's contents for
  tenants already on it.
- **The mail-client carve-out is a precedent worth watching.** `microsoft-user-allow-default-consent-apps`
  re-allows end-user consent for these same permissions, but only for six hard-coded application
  IDs (Apple Mail, Spark, eM Client, Android-Samsung, Android-Mail, Thunderbird). There is no
  documented way for a third party to be added to that list. Do not plan around getting onto it.
- The empirical check named in the report still stands and is now better targeted: read
  `GET /v1.0/policies/authorizationPolicy` on a throwaway 2026 trial tenant and confirm
  `defaultUserRolePermissions.permissionGrantPoliciesAssigned` resolves to
  `microsoft-user-default-recommended`, then attempt owner self-consent to `Calendars.ReadWrite`
  and record the exact error code.
