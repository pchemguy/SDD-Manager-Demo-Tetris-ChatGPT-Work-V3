# Modern feature acceptance

## Scope and facilities

T-036 verifies the T-027–T-035 implementation through b433afdbe573d231c593bf4018e729ebc1ea06f7 with its expanded native-key scenario and production selection. Actual Node 24.19.0/npm 11.9.0, locked Playwright 1.64.1, Vitest 5.0.4 and strict TypeScript/Vite tooling are used on Ubuntu 24.04 x64. No runtime dependency or package version changed in this campaign.

Commands: npm test; npm run build; MOZ_DISABLE_CONTENT_SANDBOX=1 SDD_PACKAGED_CHROMIUM=1 npm run test:browser; and the same browser command with SDD_PRODUCTION=1 after build. Browser tests own HTTP port 4173. Production uses actual dist/index.html and bundled assets, not TypeScript imports or a global state setter. Static distribution checks reject credentials, docs, test fixtures, source maps and agent packages.

## Observed acceptance

129/129 unit tests in fifteen files and strict build passed. Browser results:

| Engine | Actual version | Development | Static production | Skips |
| --- | --- | --- | --- | --- |
| Chromium | 153.0.8010.0 | 25/25 | 18/18 | 0 |
| Firefox | 157.0 | 25/25 | 18/18 | 0 |
| WebKit | 27.2 | 25/25 | 18/18 | 0 |

| Contract | Observable checks |
| --- | --- |
| F1 seven-bag | Deterministic multi-bag permutations, cross-boundary repeat, explicit draw counts and immutable snapshot remainder; stored preview colors asserted in actual app. |
| F2 delayed locking | Exact 999/1000, 799/800 and 99/100 core boundaries, post-contact remainder, continuous/airborne motion, soft independence, pause and single-lock discard; native Enter waits, with repeated grounded drop unable to reset. |
| F3 Hard drop | Pure legal landing above obstacles, no settlement/draw/reward on action; native Enter shows landing then timed promotion in development and production. |
| F4 Hold | Empty/swap/blocked/once/reset paths, no extra swap draw, accepted-only held/clock cleanup; actual C and uppercase C, named held preview pixels, status, restart and disposal. |
| F5 Ghost | Literal outline positions, unchanged snapshot/draw count, paused/inactive/overlap states; actual Ghost recomputation after Hold, active overlay after drop. |
| F6 kicks | All eight ordered transitions for I/JLSTZ, O, wall/floor/obstacle/rejection and support timing; native Space floor-kick vacated/occupied pixel assertions. |
| F7 controls | Real Z/X inverse rotation and Space preserved; C/Enter repeated notifications prevent defaults without action; unrelated native input retains c/Enter typing; native Enter Restart clears slot and returns board focus. Retained scroll, uppercase, Tab/button and held-key scenarios. |
| F8 and retained B1–B8 | Malformed fields, invalid draws/overflow atomicity, missing Hold DOM/context, safe fatal stop/reload/payload non-disclosure, one disposable/rebuildable session, board/clear/progression harness, native lifecycle, resizing and 800x600 layout with scrolling. |

The production suite deliberately includes modern, Space, failure and usability scenarios plus static distribution checks. Development adds source-only deterministic rare-state and mount/disposal harnesses. No required scenario or engine is silently omitted. [Inspected modern production demonstration](M2.2.png) retains Hold, Ghost and readable controls; browser tests generate fresh ignored screenshots for the same native sequence.

## Limits and disposition

Packaged Chromium uses locked Linux x64 provisioning. Firefox/WebKit use actual installed Playwright binaries; WebKit requires host libraries. Firefox's sandbox setting is only for trusted local tests because container namespace mappings are denied. Browser evidence does not certify all releases or Windows; scripts are CMD-compatible without requiring PowerShell. Modeled blur/visibility tests do not establish native OS focus-switch delivery. Retained Pause/Resume uses native Enter activation because WebKit sometimes omits rapidly injected pointer clicks before application listeners; mouse Start/Restart still run. Vertical page scrolling at 800x600 is allowed; there is no horizontal overflow.

Expected fault-injection diagnostics and npm proxy/color warnings are non-blocking. No unresolved acceptance failure or skipped check remains. Full code review, maintained guides and canonical document incorporation retain their separate task boundaries. No deployment, release or tag is claimed.
