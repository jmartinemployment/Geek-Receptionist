# Electron features for securing a desktop client's backend connection and on-device secrets (as of 2026-11-23)

Method note: official docs fetched 2026-11-23 from electronjs.org (rendered "latest") and raw `docs/api/*.md` on the electron/electron `main` branch. GitHub's latest release at fetch time was v45.4.1 (2026-11-19) per the [GitHub releases API](https://api.github.com/repos/electron/electron/releases/latest). `main` docs can describe features newer than a given release; check the version before relying on a feature. Fetches of long pages (session, app) were truncated by the fetch tool at ~100k characters, so "page doesn't mention X" statements refer to the portion read.

## 1. Client-certificate (mutual TLS), certificate verification, pinning

### Takeaway
Electron exposes the primitives (`select-client-certificate`, `certificate-error`, `ses.setCertificateVerifyProc`) but documents no first-class mTLS or pinning feature. Pinning has to be hand-built in `setCertificateVerifyProc`. Client certs come from the OS/Chromium store, and smart-card/PKCS#11 on Linux has had unresolved-at-closure issues.

### Cited Findings
- `select-client-certificate` params: `event`, `webContents` (nullable), `url`, `certificateList`, `callback(certificate?)`. "Using `event.preventDefault()` prevents the application from using the first certificate from the store." The callback can be called "with an entry filtered from the list." — [app.md (main)](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md); [app docs](https://www.electronjs.org/docs/latest/api/app)
- `webContents` is `null` when the request is from main-process `net.request`/`net.fetch`, or from a utility process created with `respondToAuthRequestsFromMainProcess: true`. For utility processes created without that flag, "`net` requests proceed without a client certificate and this event is not emitted." — [app.md (main)](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md)
- The docs example auto-selects `list[0]` after `preventDefault()`. The docs do not say what happens if the callback is called with no certificate. — [app.md (main)](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md)
- `certificate-error`: to trust, `event.preventDefault()` and `callback(true)`; the example uses `callback(false)` for untrusted URLs. The page states no explicit default. — [app docs](https://www.electronjs.org/docs/latest/api/app)
- `ses.setCertificateVerifyProc(proc)`: request has `hostname`, `certificate`, `validatedCertificate`, `isIssuedByKnownRoot`, `verificationResult`, `errorCode`. `callback(0)` accepts and "disables Certificate Transparency verification"; `-2` rejects; `-3` uses Chromium's result. "The result of this procedure is cached by the network service." `null` reverts to default. — [session docs](https://www.electronjs.org/docs/latest/api/session)
- The session page (portion read) does not mention client certificates or the term "certificate pinning"; the Electron security checklist does not discuss ignoring certificate errors or pinning either. — [session docs](https://www.electronjs.org/docs/latest/api/session); [security tutorial](https://www.electronjs.org/docs/latest/tutorial/security)
- `login` event default: "The default behavior is to cancel all authentications"; to override, `preventDefault()` and call `callback(username, password)` (relevant for proxy/Basic auth). — [app docs](https://www.electronjs.org/docs/latest/api/app)
- Fuse `EnableNodeOptionsEnvironmentVariable` (default enabled) controls whether `NODE_OPTIONS` and `NODE_EXTRA_CA_CERTS` are respected; "most apps can turn it off." — [fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)
- Known limitation (Linux smart cards): electron/electron #20575 ("Ubuntu and smart cards authentication - Windows and Mac working perfectly") and #32668 ("Linux smart card authentication fails to prompt for a password/pin") are both closed per the GitHub API; I did not read the closing rationale. — [#20575](https://github.com/electron/electron/issues/20575); [#32668](https://github.com/electron/electron/issues/32668). A third-party gist and forum thread describe the same symptom: [gist](https://gist.github.com/cgagner/4ce1ae5ccee20920037cdfa2c67422d9); [Mattermost forum](https://forum.mattermost.com/t/mattermost-desktop-linux-does-not-read-the-nssdb/14735)

### Inferences
- Pinning would be implemented by comparing `request.certificate`/`validatedCertificate` fingerprints (or SPKI) to an app-embedded set inside `setCertificateVerifyProc` and returning `-2` on mismatch. The docs give no pinning recipe, so this is inference. Note `callback(0)` disables Certificate Transparency, so `-3` is the safer pass-through for non-pinned checks.
- Because results are cached by the network service, a pin change at runtime may not take effect for existing cached results (inference from the caching sentence; behavior not documented in detail).
- A pinned/mTLS-only backend is only as strong as the private key's storage: Electron's client-cert path uses the OS/Chromium certificate store (the "store" in the docs), not an app-managed key. Whether the key can be non-exportable depends on how the OS store imports it (not covered by Electron docs).
- For mTLS from the main process, a `net.fetch` request fires the event with `webContents: null`, so a main-process-only client can select a cert without any renderer involvement.

### Gaps
- No official statement on behavior when `callback()` is called with no certificate.
- No official pinning guidance; no official statement on how cert-verify caching interacts with changing pins.
- Current (2026) status of Linux smart-card/PKCS#11 client certs not verified; issues closed but resolution unread.
- Windows/macOS hardware-token (non-exportable key) client-cert behavior in Electron not documented in pages read.

## 2. Credential storage: safeStorage

### Takeaway
`safeStorage` encrypts strings with an OS-held key, protecting data at rest on disk from other users (and, on macOS, other apps). It does not protect against code running as the same user in the same app context on Windows, and on Linux it can silently degrade to a hardcoded-password fallback. The synchronous API is deprecated and scheduled for removal in Electron 46; use the async API.

### Cited Findings
- Purpose: "simple encryption and decryption of strings for storage on the local machine, using OS-provided cryptography." — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- Sync API (`isEncryptionAvailable`, `encryptString`, `decryptString`) is deprecated and will be removed in Electron 46; async API is non-blocking, supports key rotation, and handles temporary unavailability. — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- macOS: keys stored in Keychain Access; other apps cannot load them without user override, so content is protected from other users and other apps in the same userspace. Windows: DPAPI; protects against other users on the machine "but not against other apps in the same userspace." — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- Linux: secret stores `kwallet`, `kwallet5`, `kwallet6`, `gnome-libsecret` (sync API); async API prefers `org.freedesktop.portal.Secret` (e.g. Flatpak), then Secret Service (e.g. GNOME Keyring), then a fallback provider. — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- Linux plaintext fallback: if no store is available, data is encrypted with a hardcoded plaintext password, i.e. unprotected; detect via `getSelectedStorageBackend()` returning `basic_text`. `setUsePlainTextEncryption` forces an in-memory password when no manager exists. — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- macOS: app should be code signed or the Keychain may re-prompt users on every update. — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- `decryptStringAsync` returns `{ shouldReEncrypt, result }`; re-encrypt when true. — [safeStorage docs](https://www.electronjs.org/docs/latest/api/safe-storage)
- Related fuse `EnableCookieEncryption` (default disabled) encrypts the on-disk cookie store with OS keys; one-way (disabling later corrupts the store); on macOS needs Keychain access, so sign the app. — [fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)

### Inferences
- The docs scope protection to "other users" (and other apps on macOS). Malware running as the same user on Windows can call DPAPI in its own context; the docs say this explicitly for Windows. On macOS and Linux the stated guarantees are weaker/less specific; same-user code execution inside the app process (e.g. injected preload/main code) can call `decryptString` itself. The docs do not state this last point; it follows from the API being a function the app code calls.
- safeStorage is a good fit for a refresh token or a wrapped key, not a defence against a compromised app process.

### Gaps
- No official statement on safeStorage's resistance to a same-user attacker on macOS or Linux, or to a modified app binary calling it.
- Whether other apps can read a macOS item when the app is unsigned or re-signed was not verified.

## 3. Device-bound / hardware-backed keys

### Takeaway
Electron has no general API for creating hardware-backed (TPM/Secure Enclave) keys for app use. The one official hardware-backed path is `app.configureWebAuthn` on macOS (Touch ID / Secure Enclave, plus Apple platform passkeys), documented on `main`. Windows (TPM/Hello) and Linux have no documented equivalent in the pages read.

### Cited Findings
- `app.configureWebAuthn(options)` is macOS-only. With `touchID` set, "WebAuthn credentials are stored in the macOS keychain and bound to this device's Secure Enclave"; requires a `keychain-access-groups` entitlement matching `keychainAccessGroup`. Until called, `isUserVerifyingPlatformAuthenticatorAvailable()` resolves false. — [app.md (main)](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md)
- `platformPasskeys: true` uses Apple's `ASAuthorizationController` (iCloud Keychain, 1Password, etc.); those passkeys sync across devices, are scoped to the relying party not Electron, and are shared across session partitions and other apps for the same domain. `prf` and `largeBlob` WebAuthn extensions are not supported; platform passkeys cannot serve cross-origin iframe requests; platform passkeys need the Associated Domains entitlement. — [app.md (main)](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md)
- A search result attributes the arrival to Electron 41.5.0 (PR #51563 appears in the docs YAML history); the 41.5.0 attribution comes from a PR comment surfaced by search, not release notes — treat as unconfirmed. — [PR comment via search](https://github.com/different-ai/openwork/pull/3460); [PR #51563 reference in docs](https://raw.githubusercontent.com/electron/electron/main/docs/api/app.md)
- `systemPreferences.canPromptTouchID()` / `promptTouchID(reason)` (macOS): the docs say "This API itself will not protect your user data; rather, it is a mechanism to allow you to do so." Real protection requires setting Keychain access-control constants (e.g. `kSecAccessControlUserPresence`) on the entry. Secure Enclave is not mentioned on that page. — [systemPreferences docs](https://www.electronjs.org/docs/latest/api/system-preferences)
- Third-party macOS addons exist for WebAuthn (e.g. electron-webauthn-mac); Clerk's passkey package is not supported on Linux. Earlier sources cite electron/electron #24573 as the long-standing WebAuthn gap. — [search summary: Clerk docs](https://clerk.com/docs/reference/electron/passkeys); [WebCatalog](https://docs.webcatalog.io/en/articles/13749280-does-webcatalog-support-webauthn-e-g-passkeys)

### Inferences
- Because `configureWebAuthn` serves WebAuthn from the renderer to a relying party, a device-bound credential could back a server-verified challenge-response (device attestation of "this install"), but only on macOS; the docs do not describe attestation.
- Touch ID credential is per-session-partition (Electron generates a per-session metadata secret), which means a secret stored there is bound to the app's partition and device, not extractable via the documented API (inference from "bound to Secure Enclave").
- A cross-platform hardware-bound key would require a native module/OS API outside Electron (not researched here).

### Gaps
- No Electron-documented TPM, Windows Hello, or Linux platform-authenticator support found.
- Release in which `configureWebAuthn` shipped and whether it is in stable v45.x not verified from release notes.
- Whether it permits Electron main-process (non-web) signing: no.

## 4. Electron's security guidance relevant to protecting a connection

### Takeaway
The checklist's relevant items for connection integrity: HTTPS/WSS only, context isolation, sandbox, no Node in renderers, narrow preload APIs, IPC sender validation, navigation limits, CSP, and not disabling `webSecurity`. The fuses and ASAR integrity harden the app's own code (which holds the client certificate selection logic and pins). Auto-update security documentation is thin.

### Cited Findings
- Security checklist (20 items) includes: use HTTPS/WSS ("Any resources not included with your application should be loaded using a secure protocol"), no Node integration for remote content, `contextIsolation` "must" be used, enable the sandbox in all renderers, handle permission requests via `setPermissionRequestHandler`, do not disable `webSecurity`, define a CSP (e.g. `script-src 'self'`), limit navigation (parse URLs, don't use `startsWith`), limit new windows, don't use `shell.openExternal` with untrusted content, keep Electron current, "validate the `sender` of **all** IPC messages", use custom protocols not `file://`, check fuses, don't expose Electron APIs to untrusted content. — [security tutorial](https://www.electronjs.org/docs/latest/tutorial/security)
- Context isolation is on by default since Electron 12; use `contextBridge`; "does not automatically mean that everything you do is safe"; exposing raw `ipcRenderer.send` lets any site send arbitrary IPC messages. — [context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- Sandbox is on by default since Electron 20; sandboxed renderers have no Node.js and must ask main via IPC; sandbox is tied to Node integration (enabling Node in a renderer turns the sandbox off for it). — [sandbox](https://www.electronjs.org/docs/latest/tutorial/sandbox)
- Fuses (defaults): RunAsNode enabled; EnableEmbeddedAsarIntegrityValidation disabled (macOS/Windows only); OnlyLoadAppFromAsar disabled; EnableNodeCliInspectArguments enabled (disabling stops `--inspect` and SIGUSR1 inspector); GrantFileProtocolExtraPrivileges enabled; EnableCookieEncryption disabled; EnableNodeOptionsEnvironmentVariable enabled; LoadBrowserProcessSpecificV8Snapshot disabled; WasmTrapHandlers enabled. — [fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)
- ASAR integrity: header hash verified at runtime, "if no hash is present or if there is a mismatch... the app will forcefully terminate." macOS since Electron 16, Windows since Electron 30. Enable `EnableEmbeddedAsarIntegrityValidation` and also `onlyLoadAppFromAsar`, otherwise "the validity checking can be bypassed via the Electron app code search path." Forge >= 7.4.0 / Packager >= 18.3.1 handle the hash. Page does not discuss code signing or whether the stored hash is signature-protected. — [ASAR integrity](https://www.electronjs.org/docs/latest/tutorial/asar-integrity)
- Code signing: macOS apps must be signed and notarized; "Squirrel.Mac requires the app to be signed for automatic updates to work at all." Windows requires EV-style certificates on compliant hardware or cloud signing since June 2023; page does not say whether Windows auto-update requires signing. — [code signing](https://www.electronjs.org/docs/latest/tutorial/code-signing)
- Updates: built-in Squirrel `autoUpdater` is the "officially supported" path; update.electronjs.org requires macOS builds to be code-signed; supports macOS and Windows, Linux not mentioned. The page "says little about update verification": no description of signature or checksum checks beyond signing; a custom server can sit "behind an authentication check"; `url` supports `file://`. — [updates](https://www.electronjs.org/docs/latest/tutorial/updates)

### Inferences
- Signed + notarized builds and ASAR integrity + OnlyLoadAppFromAsar are what make an embedded pin set or cert-selection logic harder to alter on disk; they do not stop a local attacker with enough privilege (see section 5).
- Disabling RunAsNode, `NODE_OPTIONS` handling, and `--inspect` closes common routes for running arbitrary code under the app's identity (and thereby calling safeStorage or reusing the client cert). The docs list the fuses but do not tie them to this threat; this link is inference.

### Gaps
- Electron docs do not specify how Squirrel verifies update payload integrity on Windows; electron-updater (third-party) not researched.
- CSP effect on API connections (`connect-src`) not covered beyond the example.

## 5. Known weaknesses: local attacker, malicious dependency, extension

### Takeaway
Electron's docs treat remote/untrusted code as the central risk and give no promise of protecting secrets from an attacker who controls the user's account or the app's files. Third-party reporting shows ASAR tampering is practised, and Electron's own ASAR integrity is documented as an additional layer with specific bypass conditions.

### Cited Findings
- Electron's security page: "A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally"; "Under no circumstances should you load and execute remote code with Node.js integration enabled." — [security tutorial](https://www.electronjs.org/docs/latest/tutorial/security)
- ASAR integrity bypass condition without `onlyLoadAppFromAsar` (above); ASAR integrity is "an additional layer" and especially important for MAS-style builds distributed outside the Mac App Store because they lack system read-only protection on `Resources/`. — [ASAR integrity](https://www.electronjs.org/docs/latest/tutorial/asar-integrity)
- Extensions: Electron supports only a subset of Chrome extension APIs, "does not support arbitrary Chrome extensions from the store," loads only unpacked extensions per session via `ses.extensions.loadExtension`, not remembered across restarts. The page has no security warning section. So browser-extension risk applies only if the app itself loads extensions. — [extensions](https://www.electronjs.org/docs/latest/api/extensions)
- Third-party: Atos reports attackers modifying ASAR contents for persistence, credential theft and payload delivery while the app stays trusted by security tooling. — [Atos](https://atos.net/en/lp/cybershield/asar-archives-an-overlooked-blind-spot) (landing page; PDF not read)
- Third-party: Schneier's post covers a supply-chain/backdoor attack concept against Electron apps via ASAR modification (BEEMKA). — [Schneier](https://www.schneier.com/?p=12176) (secondary summary only; original research not read)
- Fuse `GrantFileProtocolExtraPrivileges`: the documented privilege list is "incomplete"; disable if not serving from `file://`. — [fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)

### Inferences
- A malicious npm dependency runs with the main process's privileges and can call `safeStorage.decryptString`, read tokens in memory, hook `select-client-certificate`, or override `setCertificateVerifyProc`. Electron docs do not address supply-chain risk directly; this is inference from how the APIs work.
- An attacker who can modify the app (or run as the user) can defeat any client-side pin or secret that the app itself can use; client-side measures raise cost but do not remove the secret from the device. Server-side controls (short-lived tokens, revocation, rate limits, device-bound credentials) are the compensating design (inference, not from Electron docs).
- Preload/IPC over-exposure is the documented in-app route to turn a renderer bug into main-process abuse (e.g. calling a "get token" IPC). The docs' narrow-API and sender-validation advice is the mitigation.

### Gaps
- No official Electron threat-model page that states what is out of scope (local admin, malware as same user).
- Atos PDF and the original BEEMKA research not read; Schneier is a secondary source.
- No survey of 2025-2026 Electron CVEs related to certificate handling or safeStorage was done.
- Debugging attachment on packaged apps (e.g. attaching a debugger to a signed macOS app) not covered by official pages read.
