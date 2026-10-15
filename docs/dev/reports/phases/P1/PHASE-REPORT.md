# P1 complete classic browser gameplay review

## Outcome and reviewed scope

Full P1 (T-001–T-026) delivers the accepted classic browser game: 10×20 board, all seven pieces, fixed-origin rotations without kicks, independent random draws, immediate failed-downward locking, simultaneous row clears, scoring/levels/gravity, exact preview, soft drop, held horizontal input, pause/explicit resume, restart and game over. The static TypeScript application includes native controls, Canvas presentation, desktop usability, disposal and fatal-stop/reload behavior.

T-026 reviews the coherent phase from accepted preparation/main baseline `38afea0fe44f2d1b7966c1898043fa053c117f20` through delivery tip `7486fb1363498df9b27b8103ba36fde5c0a21bab`, plus this task's characterization test and reports. This is a direct owner code review, not an independent reviewer or user study. Inspected all 13 application TypeScript modules, HTML/CSS, four tooling/config boundaries, provisioning, fixtures and tests, documentation and the whole prospective branch difference. Tests were assessed separately from source review.

## Cross-milestone code assessment

Core geometry and board operations remain browser-independent. Transitions validate complete snapshots, copy before settlement/clear/reward, and draw only on start or succession. Invalid draws/score overflow cannot publish a partial board/score update. The M1.4 sparse-array repair closes the located structural-input gap. Canonical score derives the pre-clear level from validated line totals, then the promoted piece uses updated gravity.

The session exclusively owns live state and sends isolated snapshots to views. Opposing-direction priority/release, repeat bookkeeping, soft-drop reset and pause fall-time preservation remain consistent. Due horizontal repeats execute before falling; the first lock discards remaining elapsed time. T-026 adds a public-behavior characterization: an O at support with due left repeats must settle at the wall before the falling attempt locks it. It passed against the existing implementation; no fabricated RED cycle or production change is claimed for this added coverage.

Browser adapters translate input and clamp/rebase animation time without owning game rules. Start/resume/restart focus, repeat suppression, editable fields, listener cleanup and a single frame chain were inspected across composition/controller boundaries. Failure handling disposes scheduling/listeners/session, disables controls and shows text reload guidance with a fixed diagnostic that omits exception payloads. Test harnesses have no production bootstrap marker or global runtime state setter. Vite's persistent main-element marker survives bundling, and the actual production page now mounts.

Canvas/DOM read snapshots without random draws. Layout and accessible native controls were inspected against the retained three-engine screenshots and browser assertions. The production graph contains only application assets; static HTTP serving and absence of third-party runtime requests are exercised. README commands and limitations match actual setup and checks.

No new blocking code finding remains. Prior located findings are resolved or explicitly classified in their owning reports: M11-F001 formatting, M13-F001 unowned Down release, M14-F001 sparse validation, and M14-F002 WebKit input-delivery facility limitation. The original T-022 persistence violation remains an approved historical exception, not a repaired history.

## Final working-boundary verification

| Check | Observed result |
| --- | --- |
| npm test | 42/42 tests passed in nine files. |
| npm run build | Strict typecheck and static build passed. |
| Development browser matrix | 42/42 scenarios passed: 14 per engine. |
| Production browser matrix | 6/6 scenarios passed: 2 per engine. |
| Engine versions | Chromium 153.0.8010.0; Firefox 157.0; WebKit 27.2. |
| Skips | Zero in the final full runs. |
| Whitespace and maintained navigation | git diff --check passed; final maintained local links checked. |

The browser commands use `MOZ_DISABLE_CONTENT_SANDBOX=1 SDD_PACKAGED_CHROMIUM=1`, adding `SDD_PRODUCTION=1` for production. [T-023 acceptance](T-023-ACCEPTANCE.md) maps B1–B8 to observable evidence and retains the inspected per-engine screenshots. [M1.4 review](M1.4.md) records subsequent repair/rechecks and the native Enter Pause/Resume adjustment, which also passed ten consecutive WebKit repetitions. Expected controlled error logs exercise fatal scenarios. npm proxy and terminal-color warnings are non-blocking.

Chromium uses the pinned npm-packaged fallback after invalid official archives; Firefox/WebKit use Playwright's fallback mirror. WebKit needed Ubuntu host libraries. Firefox's content sandbox is disabled only for these trusted local tests because container namespace mappings are denied. This does not establish normal Firefox sandbox operation on this host. Rapid injected WebKit mouse Pause/Resume delivery remains unreliable before application listeners; retained coverage uses native Enter buttons plus mouse Start/Restart and native game keys. Native desktop OS focus-switch delivery, Windows runtime, other browser releases and cell-by-cell screen-reader gameplay are not claimed. No required engine was substituted or waived.

## Task persistence and tracking audit

Inspected each selected commit's parent diff, exact single task subject, task-owned result paths, owning unchecked-to-checked transition and added verification evidence, separately from repairs and parent status. Task scopes/dependencies/evidence requirements match accepted TASKS after normalization of completion/evidence additions. Accepted PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC and PLAN content is unchanged. The documented tooling-only layout allocation matches its QC identity. Agent packages are unchanged; closed milestone reports have identical object identities to their closing commits.

| Task | Initial closing commit | Assessment |
| --- | --- | --- |
| T-001 | `ac76c85` | Separate task result, checkbox and evidence. |
| T-002 | `3395c68` | Separate task result, checkbox and evidence. |
| T-003 | `5c65b8f` | Separate task result, checkbox and evidence. |
| T-004 | `99ed219` | Separate task result, checkbox and evidence. |
| T-005 | `2adebb5` | Separate task result, checkbox and evidence. |
| T-006 | `66efa34` | Separate task result, checkbox and evidence. |
| T-007 | `652459f` | Separate task result, checkbox and evidence. |
| T-008 | `fbfa119` | Separate task result, checkbox and evidence. |
| T-009 | `63dcdd0` | Separate task result, checkbox and evidence. |
| T-010 | `bcc67bb` | Separate task result, checkbox and evidence. |
| T-011 | `5011646` | Separate task result, checkbox and evidence. |
| T-012 | `40cfd5f` | Separate task result, checkbox and evidence. |
| T-013 | `faea438` | Separate task result, checkbox and evidence. |
| T-014 | `515bab5` | Separate task result, checkbox and evidence. |
| T-015 | `5b6f032` | Separate task result, checkbox and evidence. |
| T-016 | `4359088` | Separate task result, checkbox and evidence. |
| T-017 | `6292776` | Separate task result, checkbox and evidence. |
| T-018 | `5b3ddac` | Separate task result, checkbox and evidence. |
| T-019 | `91c8d10` | Separate task result, checkbox and evidence. |
| T-020 | `bda47f1` | Separate task result, checkbox and evidence. |
| T-021 | `b3ec957` | Separate task result, checkbox and evidence. |
| T-022 | `d690244` | Historical invalid evidence; approved forward recovery below. |
| T-023 | `c04e2cd` | Separate task result, checkbox and evidence. |
| T-024 | `054c25f` | Separate task result, checkbox and evidence. |
| T-025 | `7486fb1` | Separate task result, checkbox and evidence. |
| T-026 | This report's owning task commit | Phase review, characterization, final reports and initial completion together; inspect actual commit before publication. |

Published T-022 commit `d690244f79b8f098d0999346eb29afbdca1a865a` falsely claimed a passing production startup test. The human explicitly approved preservation plus forward recovery, implemented in `e961c3d059cd01e3e807b730f22fc187d4dde216`; [recovery evidence](T-022-RECOVERY.md) and the issue's corrective comment retain the original violation. No rebase, task replay or retrospective compliance claim was used. The audit accepts current verified state under that scoped exception, not universal historical conformance.

Before this task closes, GitHub readback confirms all 26 exact task identities, the phase label and correct native milestone associations; T-001–T-025 are completed, and M1.1–M1.4 are closed. T-026 and M1.5 remain open until this result is committed/pushed/read back. The execution owner must then close/read back the final task and milestone, verify all 26/5 closures, and integrate only after those observations. The phase merge commit records actual source/target parents and merged-state checks; Git remote containment establishes publication separately from this report.

## TODO aggregation and stopping boundary

TODO: None. M1.1, M1.2, M1.3 and M1.4 each declare None; no unresolved eligible TODO identity, option set, owner or provenance exists to carry forward. The resolved finding identities and explicit environment/non-goal limits above remain traceable to their original reports and are not disguised as optional future accepted work.

All local P1 capability/review exits are verified. Hosted final closure and explicit two-parent integration remain subsequent workflow operations, not effects of checking the task. Refresh actual main, merge the pinned verified phase tip without fast-forward/squash/rebase, verify the merged tree, publish main and read back containment. Retain the phase branch. Stop after full P1; no release, deployment, additional task or feature is selected.
