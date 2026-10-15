# Three-engine acceptance evidence

## Scope and environment

T-023 verifies SPEC B1–B8 with deterministic rule/coordinator checks, real browser integration, visual inspection, and the production static distribution. Node 24.19.0, npm 11.9.0, Playwright 1.64.1, Ubuntu 24.04 x64. This report records tested engine versions, not certification of every browser release or operating system.

## Provisioning investigation

Playwright's initial CDN returned invalid archives. Its built-in Microsoft fallback mirror supplied the pinned Firefox 157.0 and WebKit 27.2 artifacts. Official Chromium downloads remained invalid; the locked npm-packaged Chromium 153.0.8010.0 remains the tested Chromium route, with ownership-safe extraction, working fonts and multiprocess contexts.

Firefox's initial 14 scenarios all failed before application navigation because content processes crashed on denied user-namespace mappings. A narrowly scoped local test invocation with `MOZ_DISABLE_CONTENT_SANDBOX=1` enabled three successive contexts with correct red Canvas pixels, followed by 14/14 development and 2/2 production scenarios. This container launch configuration is an explicit test-environment limitation; it does not change application code or establish Firefox sandbox compatibility on this host.

WebKit initially could not launch because required shared libraries were absent. Ordinary Playwright dependency installation encountered container setuid and cache ownership limitations. The Ubuntu package manager was retried with its root download user and a task-owned scratch archive cache. Final launch and acceptance evidence is recorded below only after successful checks.

## Contract coverage

| Contract | Evidence |
| --- | --- |
| B1–B3 | Geometry/board/game deterministic tests; browser Canvas movement/rotation/gravity; deterministic browser harness for simultaneous four-line clear, preview promotion and blocked spawn. |
| B4 | Scoring tests for all rewards, pre-clear level and progression/floor; no drop/zero-clear reward; browser counters/preview. |
| B5 | Core/controller exact timing, held/released/opposing input and lock discard; clock baseline/clamp tests; real keyboard browser pause/restart/frozen-state checks. |
| B6 | Native browser button and keyboard actions/focus, lifecycle/disposal/rebuild; modeled blur/visibility notifications checked separately from native OS delivery. |
| B7 | Canvas pixel assertions and inspected per-engine screenshots; 800×600 readability, no horizontal overflow, native button focus and resize invariance. |
| B8 | Invalid state/action/time/draw/overflow atomic checks; four browser fatal fault injections; actual production assets and distribution exclusions, no external runtime requests. |

Native desktop focus-switch/visibility delivery is not claimed by headless modeled-event checks. Cell-by-cell screen-reader gameplay, mobile/touch, persistence, hard drop, hold, ghost, kicks and seven-bag are outside the accepted scope.

## Final observed results

The dependency install completed successfully; WebKit 27.2 subsequently passed three successive contexts with exact red Canvas pixels. After provisioning and font installation, the complete fresh run passed:

| Engine | Actual version | Development scenarios | Production scenarios | Skips |
| --- | --- | --- | --- | --- |
| Chromium | 153.0.8010.0 | 14/14 | 2/2 | 0 |
| Firefox | 157.0 | 14/14 | 2/2 | 0 |
| WebKit | 27.2 | 14/14 | 2/2 | 0 |

`npm test` passed 40 tests in nine files. `npm run build` passed strict typecheck and generated the three static assets. `MOZ_DISABLE_CONTENT_SANDBOX=1 SDD_PACKAGED_CHROMIUM=1 npm run test:browser` passed 42/42; adding `SDD_PRODUCTION=1` passed 6/6. The distribution test is deliberately repeated per project; these are 48 executed scenarios, not 48 distinct test definitions. Expected controlled error logs come from intentional fault injection. npm proxy and terminal-color warnings were non-blocking.

Additional production-page screenshots were generated using the same engine launch settings at 800×600: [Chromium](acceptance-chromium.png), [Firefox](acceptance-firefox.png), [WebKit](acceptance-webkit.png). All three were visually inspected: complete 10×20 grid, active O and exact stored O preview, paused text, readable score/lines/level and instructions, and usable native controls. Each reports document width 800 with no horizontal overflow. Full-page capture includes permitted vertical scrolling. Typography differs slightly across engines; layout and content remain intact. The separate suite checks keyboard focus outlines and resize invariance.

T-023 acceptance is established under the recorded configurations. No application change or required-engine waiver was needed. The approved T-022 historical recovery remains separately documented and is not erased by these passing checks.

TODO: None. Native desktop OS focus delivery and other browser/OS versions remain unclaimed limits rather than deferred accepted requirements.
