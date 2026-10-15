# Executable tasks

## Inputs and execution boundary

[PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [PLAN](PLAN.md) and [layout](layout.md) govern this sole executable hierarchy. [Current QC](TASKS-REVIEW-REPORT.md) assesses conformance. P1 foundation and the Space amendment are integrated; P2 modern tasks T-027–T-039 are transferred once from the accepted feature list. The human authorizes the complete autonomous feature with document checkpoints pre-approved. Stop after verified integration/publication; select no further work automatically.

Preserve stable IDs and historical evidence. P1's original verification below is explicitly historical; current reassessments establish changed acceptance without rewriting published chronology or frozen reports. P2 issue identities/phase/milestone associations remain unchanged by transfer. Historical feature snapshots are not executable owners.

One task's result, evidence and initial checkbox close together in a single-ID commit; push/read back before advancing, then reconcile its issue. Required phase activation/readback precedes implementation. Reviews assess source separately from checks, retain findings/TODO and close milestones only after all issues/exits. Complete phase/feature integration uses an explicit two-parent merge, merged-state checks, target publication/readback. Partial work publishes and pauses.

## P1 — Complete classic browser gameplay

- [x] P1 — Complete classic browser gameplay
    Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
    - [x] M1.1 — First playable loop
        Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
        - [x] T-001 — Establish reproducible build and verification facilities
            Scope: Root npm/TypeScript/Vite/Vitest/Playwright configuration and lockfile; minimal entry needed to exercise tooling, setup documentation, and generated-output exclusions.
            Depends on: none. Contracts: B8; PLAN M1.1 prerequisite.
            Evidence: Verify installed stable package engine requirements, npm installation, typecheck and static build; obtain real Chromium download/launch evidence and identify other engine prerequisites. Record Node/npm versions and the existing proxy warning. Record test collection honestly; no empty-suite success claim.
            Historical verification: npm install, typecheck and build passed on Node 24.19.0/npm 11.9.0. Official Playwright downloads returned 195-byte HTML, not ZIP; a stable older release also failed. Ownership-safe npm-packaged Chromium 153.0.8010.0 with Playwright 1.64.1 passed three successive contexts and Canvas/text pixel probes. Recovery covers archive ownership, executable mode and font paths. No gameplay suite exists yet; Firefox/WebKit are pending.
        - [x] T-002 — Implement tetromino geometry
            Scope: src/core/types.ts, src/core/geometry.ts, and tests/core/geometry.test.ts.
            Depends on: T-001. Contracts: B1–B2.
            Evidence: Use npm test -- tests/core/geometry.test.ts and typecheck; verify all seven coordinate sets, CW/CCW transforms, O invariance, and four-rotation identity.
            Historical verification: Observed eight geometry assertions fail against the empty-cell stub before implementation. All eight now pass, covering seven literal shapes, fixed-origin CW/CCW rotation, O invariance, translation, and four-rotation identity. Typecheck passed; no browser or later gameplay claims.
        - [x] T-003 — Implement board placement and row compaction
            Scope: src/core/board.ts and tests/core/board.test.ts; coherent board types only.
            Depends on: T-002. Contracts: B1, B3.
            Evidence: Focused board tests verify edges, occupied-cell overlap, padding, atomic settlement, simultaneous clears, empty-row insertion, and retained-row order.
            Historical verification: Four board tests first failed against behavior stubs; all now pass, covering legal cells, integer/boundary/overlap rejection, copy-on-settlement, atomic failure, simultaneous two/four-row clears and preserved order. Full suite: 12 passing tests; typecheck passed.
        - [x] T-004 — Implement initial game state and piece succession
            Scope: src/core/game.ts, core types, src/platform/random.ts, and deterministic tests/core/game.test.ts.
            Depends on: T-002, T-003. Contracts: B2–B3, B6 ready/start/restart subset.
            Evidence: Verify ready state consumes no draws, Start consumes two, bag-based mapping/spawn/preview promotion, cross-bag repeated identities, fresh restart, and blocked spawn; no browser globals in core.
            Historical verification: Four lifecycle/draw tests failed against missing behavior and now pass: no ready draws, exactly two Start draws, preview promotion/replenishment, repeats, exact draw boundaries, blocked spawn without overwrite, and fresh state. Full suite 16 passing; typecheck passed.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-005 — Implement movement gravity and lock-clear transitions
            Scope: src/core/game.ts and focused game sequence tests; compose existing geometry/board helpers.
            Depends on: T-004. Contracts: B1–B3, B5 normal-falling subset.
            Evidence: Verify legal/rejected moves and rotation, exact level-one gravity boundaries, partial elapsed time, full normal-gravity grounded delay, clear/promote order, no post-lock cascade, and game over. Run core regressions.
            Historical verification: Observed five new movement/gravity/lock-clear assertions fail before implementation; all now pass. Full suite 22 tests passed with exact interval/remainder, contact versus failed attempt, blocked rotation, four-line clear ordering, immutable prior board, game-over inertness and no post-lock cascade. Typecheck passed. Scoring and advanced input remain M1.2 work.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-006 — Implement the minimal session coordinator
            Scope: src/session/controller.ts, src/session/ports.ts, and tests/session/controller.test.ts.
            Depends on: T-005. Contracts: B5–B6 M1.1 subset.
            Evidence: Controlled action/time/draw/view tests prove a single retained snapshot, ordered transition/view calls, running/ready/game-over guards, Start/Restart, and no rule duplication.
            Historical verification: Two controller behavior tests failed before orchestration was implemented and now pass. Full suite 24 tests passed, proving action/time/view order, ready draw guards, duplicate Start inertness, fresh restart and snapshot isolation from view mutation. Typecheck passed; browser wiring remains pending.
        - [x] T-007 — Render the first playable board and controls
            Scope: src/view/canvas.ts, src/view/dom.ts, index.html, src/style.css, and focused view checks.
            Depends on: T-006. Contracts: B7 and B6 M1.1 subset.
            Evidence: Representative state/draw-command checks show all cells, legal active piece, ready/game-over text, and native Start/Restart controls; input wiring remains the next task. Preview/scoring polish remains M1.2.
            Historical verification: Two renderer tests failed before implementation; all 26 unit tests now pass. Drawing checks verify 200 grid cells, literal active/settled positions, no snapshot mutation or extra draws, and explicit missing Canvas failure. Typecheck passed. HTML/CSS provide first-playable controls/status; native input and real visual inspection remain T-008.
        - [x] T-008 — Wire and demonstrate the playable browser loop
            Scope: src/main.ts, src/platform/input.ts, src/platform/clock.ts, and tests/browser/playable.spec.ts; integrate existing controller/views.
            Depends on: T-007. Contracts: B1–B3; B5–B7 M1.1 subset.
            Evidence: Run Chromium browser checks and production-build smoke: real fresh-press keyboard movement/rotation, gravity, locking, clear, succession, blocked spawn, and restart. Use deterministic test fixtures for rare states without a production global setter. Inspect a play screenshot; record demo observations and incomplete SPEC scope.
            Historical verification: Real browser test first failed because Start left status Ready; wiring fixed it. 26 unit tests, typechecked static build, two Chromium integration tests, and one production-build browser smoke passed. Actual native keyboard movement/CW/CCW, Canvas pixels, timed falling and restart are verified; separate deterministic module harness covers clear/succession/blocked spawn. Screenshot inspected; missing arrow glyph labels replaced with words. Added vite/client CSS declarations after a typecheck failure. Remaining M1.2 functionality is not claimed.
            Amendment evidence: [001_8131306 Spacebar rotation](reports/phases/P1/revisions/001_8131306-spacebar-rotation/REVISION-REPORT.md) extends the existing input mapping with fresh-press Space clockwise rotation, focus/repeat/scroll/default-control checks and current three-engine verification. This is a later scoped amendment, not another initial T-008 closure; original evidence above is retained.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-009 — Review test and report the first playable milestone
            Scope: All M1.1 result and dependent code; docs/dev/reports/phases/P1/M1.1.md.
            Depends on: T-001–T-008; constituent delivery issues completed. Contracts: PLAN M1.1 exit.
            Evidence: Perform code review separately from tests; run core/session and Chromium playable regressions, repair blockers, report delivered features/demo feedback, verification and limits, and TODOs. Commit/push the report, close its issue, then close/read back M1.1.
            Historical verification: M1.1 code review covered all application modules, input/time/state/view boundaries, tooling, tests and partial-scope exits. Resolved formatting finding M11-F001; 26 unit tests, strict build, two Chromium integration tests and one production-preview test passed after cleanup. Screenshot inspected and retained in milestone report; no blocking M1.1 findings or optional TODOs. Scoring/advanced input and complete engine evidence remain planned later work.
    - [x] M1.2 — Complete game controls and progression
        Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
        - [x] T-010 — Implement scoring level progression and gravity scaling
            Scope: src/core/scoring.ts, transition integration, tests/core/scoring.test.ts and game sequence cases.
            Depends on: T-009; M1.1 complete/closed. Contracts: B4.
            Evidence: Verify all clear rewards, pre-clear multiplier across a level boundary, no-clear score, cumulative lines, exact level/interval formula and 100 ms floor; run core regressions.
            Historical verification: Three scoring/progression integration tests failed before implementation and now pass. Full suite 29 tests passed; rewards 0/100/300/500/800, pre-clear multiplier, 10-line level crossing, exact gravity curve/floor, atomic clear reward and updated interval verified. Typecheck passed; M1.1 is closed/read back before this milestone.
        - [x] T-011 — Implement soft-drop timing and reset semantics
            Scope: Core falling-time actions, controller Down-state handling, input mapping, and focused core/session tests.
            Depends on: T-010. Contracts: B3, B5 soft drop.
            Evidence: Verify immediate Down attempt, 50 ms falling interval, release/reset, normal-gravity delay independent of soft drop, pause-independent core accumulation contract, and no newly spawned-piece cascade.
            Historical verification: Soft-drop scenario first failed at the 50 ms boundary; after implementation all 31 tests and typecheck passed. Verified immediate attempt, exact held timing, release timer reset/restored gravity, no drop reward, failed-attempt locking and no post-lock cascade. Input maps Down press/release without OS-repeat dependence.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-012 — Implement deterministic horizontal key repetition
            Scope: Controller repeat bookkeeping and input adapter repeat filtering; tests/session and tests/platform/input.test.ts.
            Depends on: T-011. Contracts: B5 held direction and ordering.
            Evidence: Verify immediate press, 150/50 ms repeat boundaries, OS-repeat suppression, opposing-key winner/release, horizontal-before-fall ordering, and no lock/timer reset from horizontal rejection.
            Historical verification: Held-direction test first failed before implementation. A prior single-press test then correctly exposed its missing release under the new held-input contract; added the modeled release, preserving the new held-key assertions. All 33 tests and typecheck pass. Verified 150/50 ms boundaries, opposing-key winner/release, OS-repeat suppression, and listener cleanup; horizontal repeats precede core falling.
        - [x] T-013 — Implement pause resume and focus-loss lifecycle
            Scope: Controller lifecycle, input/focus/visibility adapter, clock baseline integration, and browser/session cases.
            Depends on: T-012. Contracts: B5–B6.
            Evidence: Verify P/button pause, preserved core fall time, cleared held keys, explicit resume, first-frame baseline, long-frame clamp, blur/hidden idempotence, no automatic return-to-focus resume, and restart in each allowed state.
            Historical verification: Pause scenario failed before implementation; 35 unit tests and three Chromium browser tests now pass, with strict build. Verified preserved core fall time, held-input clearing, explicit P resume, idempotent modeled blur, no focus auto-resume, fresh restart, first-frame baseline, clamped/negative elapsed handling, reset and one scheduling chain. Native keyboard P tested; synthetic blur/focus evidence is labeled separately from native desktop focus delivery.
        - [x] T-014 — Complete preview status and control presentation
            Scope: Canvas preview, DOM score/lines/level/status/button availability, and browser interaction cases.
            Depends on: T-013. Contracts: B2, B4, B6–B7.
            Evidence: Verify displayed preview exactly matches stored next piece, rendering consumes no draw, status follows core snapshot, inapplicable lifecycle actions are no-ops, and Start/Restart/Resume focus returns to game surface.
            Historical verification: DOM counter/availability assertion failed before completion; all 36 unit tests, strict build and four Chromium browser scenarios pass. Stored-next preview pixels, score/line/level display, Pause/Resume labels/availability, reset counters, and game-surface focus after Start/Resume are verified. Rendering remains snapshot-only and consumes no draws.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-015 — Review test and report complete controls and progression
            Scope: All M1.2 code and preserved playable path; docs/dev/reports/phases/P1/M1.2.md.
            Depends on: T-010–T-014; constituent delivery issues completed. Contracts: PLAN M1.2 exit.
            Evidence: Separate code review and deterministic/browser checks; inspect complete controls/scoring/preview demo and timing observations, repair blockers, report capabilities, evidence, limits and TODOs; publish and reconcile issue/milestone closure.
            Historical verification: M1.2 code review assessed score/clear order, core versus scheduling state, repeat ordering, pause/focus lifecycle, draw-free views and actual input. All 36 unit tests, strict static build and four Chromium scenarios passed; updated screenshot inspected/retained. No blocking milestone findings or optional TODOs; modeled focus evidence and missing final engines are explicit. Updated current README/agent guidance.
    - [x] M1.3 — Robust and usable browser experience
        Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
        - [x] T-016 — Enforce atomic core validation and error contracts
            Scope: Core state/action/time/draw validation in src/core/game.ts and focused invalid-input tests.
            Depends on: T-015; M1.2 complete/closed. Contracts: B1, B8.
            Evidence: Verify malformed state, unknown actions, invalid/nonfinite/out-of-range draws, negative/nonfinite elapsed time, and expected placement rejection; errors leave prior snapshots unchanged and do not commit partial board/score results.
            Historical verification: Two new core validation/overflow scenarios failed before implementation. All 38 unit tests, strict build and four Chromium regressions pass after input/state/output guards. Unknown actions, malformed/nonintegral state, invalid times/draws, and unsafe scoring fail before committing results; invalid draw after tentative lock preserves the original board/score. Corrected blocked-spawn fixture to retain a legal active piece under the explicit invariant.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-017 — Complete scheduler and listener resource safety
            Scope: Controller disposal, clock/input adapter cleanup and focused tests/platform/session cases.
            Depends on: T-016. Contracts: B5–B6, B8 resources.
            Evidence: Verify repeated start/restart/resume do not duplicate frame chains/listeners, teardown cancels owned resources, disposed notifications are inert, and rebuilding starts one coherent session.
            Historical verification: Disposed-session behavior first failed against a no-op disposal method; all 39 unit tests, strict build and five Chromium scenarios pass. Controller notifications become inert, owned listeners/frame callbacks are removed/cancelled, disposal is idempotent, and a separate real-markup harness verifies fresh mount after teardown. No production global debug API was added.
        - [x] T-018 — Implement observable fatal-error handling
            Scope: Composition and controller error boundary plus DOM fallback; tests/browser/failures.spec.ts and controlled fixtures.
            Depends on: T-017. Contracts: B8.
            Evidence: Verify missing required markup, unavailable Canvas 2D, transition/render failures, stopped scheduling/input, concise reload guidance, safe console diagnostics, and fresh reload state.
            Historical verification: All four new fault-injection browser scenarios failed before the fatal boundary and pass afterward. Full checks: 39 unit tests, strict static build, nine Chromium scenarios. Missing markup/error region, unavailable Canvas, runtime invalid draw and rendering failure now stop scheduling/listeners/input, show textual Error/reload guidance, and reload fresh. Diagnostics use controlled text without exception payloads, credentials or unrelated content.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-019 — Complete accessible desktop presentation and resize behavior
            Scope: index.html, views and src/style.css; tests/browser/usability.spec.ts.
            Depends on: T-018. Contracts: B6–B7.
            Evidence: Inspect 800 × 600 viewport with scrolling, all cells/preview/status, native named buttons, Tab/focus styles, text lifecycle/error messages, canvas naming/fallback, case-insensitive controls, editable-field exclusion, and resize without gameplay changes.
            Historical verification: New browser repeat-default assertion failed and identified page-scroll leakage; fixed prevention while preserving OS-repeat suppression. All 39 unit tests, strict build and 11 Chromium scenarios pass. Verified editable-field independence, case-insensitive controls, 800x600 no horizontal overflow, accessible canvas name, native button focus outline, resize preserving canvas state and textual paused/error state. Desktop screenshot inspected; cell-by-cell screen-reader gameplay remains excluded.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-020 — Integrate lifecycle and failure regression scenarios
            Scope: tests/browser, tests/fixtures, and only necessary narrow fixes in their owning modules.
            Depends on: T-019. Contracts: B5–B8 cross-component acceptance.
            Evidence: Exercise real app focus, held input across pause/restart, blur/visibility sequences, fatal-error inertness, disposal/rebuild and render/state consistency. Distinguish injected-harness checks from actual-app checks; preserve core regressions.
            Historical verification: Added cross-component regression scenarios against already implemented behavior; they passed on first execution, with no fabricated RED or production edits. All 39 unit tests, strict build and 14 Chromium scenarios pass. Verified frozen paused canvas, cleared held input across pause/resume/restart, idempotent modeled visibility notifications, fatal inertness and controlled diagnostics that do not echo injected payloads.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-021 — Review test and report robustness and usability
            Scope: All M1.3 changes and affected dependencies; docs/dev/reports/phases/P1/M1.3.md.
            Depends on: T-016–T-020; constituent delivery issues completed. Contracts: PLAN M1.3 exit.
            Evidence: Review implementation separately from tests, assess B7–B8 and remaining B5–B6 acceptance, inspect viewport/visual evidence, repair blockers, and publish features/findings/limits/TODO report before issue/milestone closure.
            Historical verification: Reviewed all application state/input/resource/failure/view boundaries and M1.3 acceptance. Finding M13-F001 reproduced an unowned Down release resetting 100 ms to 0; repaired with held-soft guard and rechecked. All 40 unit tests, strict build and 14 Chromium scenarios pass; desktop screenshot inspected/retained. No blocking M1.3 findings or TODOs. Firefox/WebKit and final delivery evidence remain mandatory M1.4 work.
    - [x] M1.4 — Reproducible delivery and acceptance evidence
        Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
        - [x] T-022 — Verify clean production build and distributable contents
            Scope: Build/config/lockfile and tests/browser/static-build.spec.ts; focused fixes only.
            Depends on: T-021; M1.3 complete/closed. Contracts: B8; PLAN M1.4.
            Evidence: Verify npm ci, typecheck, production build and HTTP serving; inspect dist contains only application assets and excludes credentials, tests/harnesses, docs and agent packages. Confirm no external runtime requests and preserve lockfile/native dependency reproducibility.
            Historical invalid completion claim (d690244): Clean npm ci passed; two strict production builds had identical file/content hashes. Both production-only Chromium scenarios passed: actual static asset loading/play/pause/preview and distribution exclusion of credentials/tests/docs/agent packages. Full 40-test Node suite passed. Browser configuration now selects development and production suites explicitly, with no hidden skip-based acceptance; full three-engine validation remains T-023.
            Verified recovery (human approved): production bootstrap marker moved to the persistent main element. Fresh npm test passed 40 tests; strict production build passed; production Chromium passed 2/2 and development Chromium passed 14/14 with no skips. See reports/phases/P1/T-022-RECOVERY.md for the preserved premature closure and approved forward repair. This correction does not certify the original completion chronology.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-023 — Verify complete three-engine acceptance coverage
            Scope: Playwright browser projects, tests and fixtures; repair failures within existing scope.
            Depends on: T-022. Contracts: B1–B8 acceptance table.
            Evidence: Install/launch required Chromium, Firefox and WebKit; run npm test, typecheck/build, and npm run test:browser across all three. Record exact versions, scenario counts/skips, visual/viewport observations, and contract coverage. Missing required evidence blocks completion; no silent engine substitution.
            Historical verification: Fresh 40/40 unit tests and strict build passed; Chromium 153.0.8010.0, Firefox 157.0 and WebKit 27.2 each passed 14 development plus 2 production scenarios, zero skips. Per-engine screenshots inspected at 800x600. Provisioning, exact launch limitations and B1-B8 coverage retained in reports/phases/P1/T-023-ACCEPTANCE.md.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-024 — Finalize reproducible player and developer instructions
            Scope: README.md, AGENTS.md, and focused docs only where necessary; validate documented commands.
            Depends on: T-023. Contracts: B6–B8; PLAN delivery/documentation exits.
            Evidence: From actual validated setup, document requirements, npm ci, browser installation, dev/typecheck/test/browser/build/preview, controls, rules, static serving, non-goals and observed limits. Verify links and Windows CMD-compatible script assumptions; claim only tested environments.
            Historical verification: README and AGENTS now document actual controls/rules, Node/npm setup, dev/typecheck/unit/browser/build/preview, static-only deployment, CMD syntax and observed engine/container limits. Fresh npm ci, typecheck, optional packaged-browser provisioning, strict build and 2/2 production Chromium checks passed; all maintained local links resolve. npm scripts inspected for CMD-compatible commands; Windows runtime remains untested.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
        - [x] T-025 — Review test and report reproducible delivery
            Scope: Whole delivery result with M1.4 changes; docs/dev/reports/phases/P1/M1.4.md.
            Depends on: T-022–T-024; constituent delivery issues completed. Contracts: PLAN M1.4 exit.
            Evidence: Review code/config/docs, rerun required affected/full regressions and build/engine checks, repair blockers, and publish features, reproducibility, acceptance and compatibility evidence, findings and TODOs; close issue and native milestone after verified completion.
            Historical verification: Reviewed coherent delivery code/config/docs separately from checks. M14-F001 sparse board validation reproduced RED, repaired and rechecked; M14-F002 WebKit injected pointer loss investigated and native Enter button activation retained (10/10 repeats). Fresh 41/41 unit, strict build, 42/42 development and 6/6 production engine scenarios passed, zero skips. M1.4 report records acceptance, historical T-022 exception and limits; TODO None.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.
    - [x] M1.5 — Phase review and final report
        Current parent reassessment: T-039 verifies retained exits against current SPEC and complete modern acceptance; see [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Earlier closed reports remain historical; final target publication is separate.
        - [x] T-026 — Review verify and report complete Phase P1
            Scope: Complete P1 implementation and all milestone reports; docs/dev/reports/phases/P1/PHASE-REPORT.md and docs/dev/reports/IMPLEMENTATION-REPORT.md.
            Depends on: T-009, T-015, T-021, T-025; M1.1–M1.4 complete/closed. Contracts: PLAN P1 exits; all SPEC contracts.
            Evidence: Perform cross-milestone code review and full acceptance/regression/build/three-engine assessment, repair blockers, audit one-task commits and tracking state, aggregate all TODO identities/options/owners/provenance, and publish phase/final reports. Close this issue then M1.5; reconcile parents, perform eligible explicit phase merge, verify merged target and publish/read back. Report integrated features and remaining limits; stop without release or extra tasks.
            Historical verification: Completed direct phase code review and B1-B8 assessment separately from execution. Added passing characterization of horizontal-before-lock ordering; 42/42 unit tests, strict build, 42/42 development and 6/6 production engine scenarios passed with zero skips. Task parent diffs audited individually; approved T-022 historical exception retained. All delivery milestone closures/associations read back; final reports aggregate TODO None and exact environment limits. Final task/milestone closure and explicit merged-state verification/publication follow this commit.
            Current completion reassessment: T-039 source review, 129 unit tests, strict build and 75 development/54 static-production checks verify retained capability against current SPEC F1–F8. See [modern phase review](features/002_d708792-modern-enhancements/PHASE-REPORT.md). Original verification and T-022 chronology remain historical.

## P2 — Modern gameplay enhancements

- [x] P2 — Modern gameplay enhancements
    - [x] M2.1 — Bag and delayed drop gameplay
        - [x] T-027 — Implement snapshot-owned seven-bag succession
            Scope: core/types.ts and game.ts; deterministic core tests and affected preview/browser expectations.
            Depends on: Published preparation and verified P2 activation.
            Evidence: F1; preserve explicit draws, multi-bag permutations, no replacement, boundary repeats, restart and atomic invalid draws.
            Verified: Seven-bag test failed before snapshot/remainder implementation. 46/46 unit tests, strict build, preview integration and 3/3 production Chromium scenarios passed. Verified three deterministic permutations, cross-bag repeat, one draw per selection, bag uniqueness/ownership, restart and atomic invalid selection. Changed old independent-draw and O-preview expectations explicitly to F1's no-replacement results.
        - [x] T-028 — Implement continuous grounded locking delay
            Scope: core/game.ts and types.ts; update declared changed immediate-lock checks.
            Depends on: T-027.
            Evidence: F2; exact normal interval, contact remainder, soft-drop independence, grounded/airborne movement, pause and single-lock discard.
            Verified: RED observed missing post-contact timer; 50/50 unit tests, strict build and 15/15 Chromium regressions passed after chronological fall/contact implementation. Exact 999/1000 and level-two 799/800 boundaries, post-contact remainder, failed Down, soft independence, grounded preservation, airborne reset, paused freeze and one-lock discard are verified. Superseded immediate-lock tests/harness now use elapsed delay, preserving score/atomic assertions.
        - [x] T-029 — Integrate delayed hard drop and shared landing
            Scope: core/board.ts and game.ts, ports/input, visible help and real browser coverage.
            Depends on: T-028.
            Evidence: F3/F7; projection over uneven stacks, native Enter, no immediate settle/score/draw, preserve existing grounded time and defaults.
            Verified: Hard-drop test failed on Unknown action before implementation. 53/53 unit tests and strict build passed; frozen-clock native Enter delay scenario passed against development and production Chromium. Shared pure landing stops above obstacles; drop consumes no draws/reward, does not settle, preserves accrued grounding and paused guards. Initial browser clock auto-advance caused an early-boundary observation; explicit pauseAt fixed the facility without changing expectations. Enter help added and modern scenario selected in production.
        - [x] T-030 — Review test and report bag and delayed drop gameplay
            Scope: M2.1 coherent result and package M2.1.md.
            Depends on: T-027–T-029.
            Evidence: Separate code review from execution; repair blockers; deterministic/build/browser demonstration; findings and TODO; close review issue then milestone.
            Verified: Reviewed bag/timer/drop code and dependent lifecycle/input separately from tests. Added passing 100 ms floor and grounded-pause characterizations, formatted scoped additions, and inspected actual production screenshot. Fresh 55/55 unit tests, strict build, 48/48 development and 12/12 production browser scenarios passed across Chromium 153.0.8010.0/Firefox 157.0/WebKit 27.2, zero skips. M2.1 report retains findings, limits and TODO None.
    - [x] M2.2 — Hold ghost and wall kicks
        - [x] T-031 — Implement once-per-piece Hold and presentation
            Scope: core state/transitions, controller/input/composition, Hold markup/views and fixtures.
            Depends on: T-030; M2.1 complete/closed.
            Evidence: F4/F7/F8; empty/swap draw counts, repeat rejection, blocked spawn, reset/pause and held-state/clock cleanup, actual named Hold display.
            Verified: RED Unknown action observed before Hold implementation. 61/61 unit tests, strict build, actual C/uppercase C display/restart checks, composition rebuild and production C scenario passed. Empty Hold consumes preview plus one draw; occupied swaps are draw-free; both blocked paths, once-per-piece reset after lock, pause/restart, soft/held timing cleanup and accepted-only clock rebase verified. Hold Canvas/availability are required composition resources; test-only real-markup fixture aligned.
        - [x] T-032 — Render exact state-free landing Ghost
            Scope: view/canvas.ts and focused core/view/browser tests.
            Depends on: T-031.
            Evidence: F3/F5; shared landing, outline behind active, overlap suppression, obstacles, movement and hold recomputation, paused/ready/gameover and snapshot/draw purity.
            Verified: Ghost RED observed missing outlines. 62/62 unit tests and strict build passed; native Hold/drop Ghost pixel scenarios passed in development and production Chromium. Focused paused/ready/gameover and overlap/purity assertions passed after final additions; shared landing recomputes without draws or snapshot mutation.
        - [x] T-033 — Implement ordered quarter-turn wall kicks
            Scope: core/geometry.ts and game.ts with deterministic rotation/obstacle/timer regressions.
            Depends on: T-032.
            Evidence: F6/F2; all eight transitions for both tables, I/JLSTZ/O distinction, first legal order, floor/wall/blocked rejection, timer preserve/reset and no extra draws.
            Verified: RED I floor rotation remained unchanged before kicks. 113/113 unit tests and strict build pass. Literal F6 fixtures cover all eight transitions for I and each JLSTZ identity, earlier-candidate obstruction, floor/left wall kicks, full rejection atomicity, O, no draws, continuous grounded timing and airborne kick reset. Previous fixed-origin rejection expectation explicitly changed to its specified wall-kick success.
        - [x] T-034 — Review test and report complete modern mechanics
            Scope: M2.2 coherent result and package M2.2.md.
            Depends on: T-031–T-033.
            Evidence: Separate code review/testing, integrated Hold/Ghost/kick demonstration, retained modern/baseline regressions, repairs and TODO; close review issue then milestone.
            Verified: Separate coherent Hold/Ghost/kick source review found no blockers. Added native Space floor-kick then Hold/Ghost demonstration and inspected production screenshot. Fresh 113/113 unit tests, strict build, 57/57 development and 21/21 production scenarios across Chromium153/Firefox157/WebKit27.2 pass, zero skips. M2.2 report records scope, inspection, limits and TODO None.
    - [x] M2.3 — Robust reproducible modern delivery
        - [x] T-035 — Verify modern state failures and lifecycle boundaries
            Scope: core/controller/composition validations and focused regression tests.
            Depends on: T-034; M2.2 complete/closed.
            Evidence: F8 and retained B8; malformed dense/unique bag, held/use/lock fields, draw/overflow atomicity, missing Hold Canvas/markup, disposal/rebuild and safe fatal stop.
            Verified: 129/129 unit tests and strict build pass; 36/36 focused failure/lifecycle checks pass across all three engines. Added malformed bag/held/use/lock and ready residue cases; invalid Hold/settlement draws and score overflow preserve complete snapshots without selection; missing Hold markup/context, fatal Hold input/time freeze and occupied-Hold disposal/rebuild verified. Initial test mock lacked an explicit this type; corrected and strict build rerun successfully. No product defect or test-first claim for these boundary characterizations.
        - [x] T-036 — Verify complete modern browser and static acceptance
            Scope: browser specs, deterministic fixtures, production selection and retained screenshots.
            Depends on: T-035.
            Evidence: F1–F8; actual C/Enter/Space/Z/X, lock delay, ghost/hold pixels, typing/repeats/focus, 800x600, production assets/exclusions; all three exact engine versions/counts/skips.
            Verified: 129/129 unit tests, strict build, 75/75 development and 54/54 actual static-production browser checks pass across Chromium153.0.8010.0/Firefox157.0/WebKit27.2, zero skips. Added real Z/X/native typing/button checks and explicit C/Enter repeat defaults; expanded production to modern, Space, failures, usability and static exclusions. ACCEPTANCE.md maps F1-F8 and retained contracts to evidence and records exact facilities/limits.
        - [x] T-037 — Document modern player rules and reproducible checks
            Scope: README.md, AGENTS.md and focused maintained guides.
            Depends on: T-036.
            Evidence: Controls, seven-bag/hold/ghost/kicks, full normal-gravity lock including Hard drop, no drop bonuses; actual setup/tests/build/static serve, CMD and observed limits, local links.
            Verified: README and root orientation now describe all modern controls/rules, full normal-gravity grounded delay including Enter, no reset on support/no drop bonus, Hold availability, Ghost and seven-bag/SRS limits. Setup/production/CMD commands checked against package scripts and T-036 actual evidence; local links, heading spacing and whitespace pass. Counts are current 129 units and 25/18 scenarios per engine. Historical P1 reports remain frozen; active feature ownership and final stopping boundary are explicit.
        - [x] T-038 — Review test and report modern delivery acceptance
            Scope: Whole delivery result and package M2.3.md.
            Depends on: T-035–T-037.
            Evidence: Code/config/docs review, complete required checks and repairs, actual acceptance/limits/TODO; close review issue then milestone.
            Verified: Separate whole delivery source/config/docs review and clean npm ci passed. First dev run was 74/75: transient Chromium old Hold pixel after Restart; 10 unchanged and 40 instrumented repetitions passed. M23-F001 retained in report; pixel check now observes specified next-frame boundary, same assertion. Fresh 129/129 units, strict build, 75/75 dev and 54/54 production across all three engines pass, zero skips. No product defect or deferred TODO; initial observation and environment limits retained.
    - [x] M2.4 — Feature phase review and final report
        - [x] T-039 — Review incorporate and report the complete modern feature
            Scope: Whole feature, canonical main documents/QC and unique task transfer, eligible source archive, package PHASE-REPORT.md and IMPLEMENTATION-REPORT.md.
            Depends on: T-030, T-034, T-038; M2.1–M2.3 complete/closed.
            Evidence: Cross-milestone code review and full tests/build/three-engine acceptance; audit task parent diffs; incorporate feature into main owners and transfer tasks once; archive active sources/QC only after disposition; aggregate TODO; close final tracking, explicitly merge, verify/publish/read back main and stop without release.
            Verified: Final cross-milestone source review and 129/129 unit, strict build, 75/75 development and 54/54 static-production checks passed on all three engines, zero skips. Incorporated canonical PROJECT/design/SPEC/PLAN/layout with current full QC; transferred thirteen stable tasks once and archived six feature source/QC files. P1 affected task/parent acceptance reassessed, original verification/closed records and T-022 exception preserved. Audited T-027–T-038 parent diffs and effective T-039 transfer/closing composition; phase/final reports aggregate TODO None. Twelve task issues/three delivery milestone closures and all associations read back; final issue/milestone closure, explicit merged checks and main publication follow this verified commit.
