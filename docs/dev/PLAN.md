# Delivery plan

## Objective and strategy

Deliver the complete desktop browser game specified in [SPEC](SPEC.md), using [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md) and [layout](layout.md). P1 establishes complete classic gameplay and reproducible delivery; dependent P2 adds modern mechanics and reassesses changed acceptance. Scope and current behavior are defined by SPEC, while this plan assigns useful increments and exit gates. [TASKS](TASKS.md) owns executable identities and completion evidence.

Integrate an actual playable browser path early, carry deterministic and browser regressions through each increment, and assess source separately from running tests. Do not use an in-range milestone/task count as proof of coherent decomposition. Human review and technical QC are separate gates; P2's human document checkpoints are pre-approved by the autonomous campaign request.

## P1 — Complete classic browser gameplay

| Milestone | Useful outcome | Dependencies | Exit evidence |
| --- | --- | --- | --- |
| M1.1 — First playable loop | Seven shapes, legal movement/rotation, timed falling/locking, clears, succession, blocked spawn and actual Start/Restart board/status. | Accepted published preparation, validated facilities and phase activation. | Deterministic B1–B3, controlled time/draw integration, native playable demonstration, source review/testing/report. |
| M1.2 — Complete game controls and progression | Rewards, lines/levels/gravity, exact next preview, soft drop, held directions, pause/resume/focus and full lifecycle controls. | M1.1 complete/closed. | B4–B6 exact boundaries, keyboard/buttons, repeat, focus, restart and preserved playable loop; review/report. |
| M1.3 — Robust and usable browser experience | HTML instructions/status/focus, viewport and resizing, disposal/rebuild, validation and fatal stop/reload. | M1.2 complete/closed. | B5–B8 invalid input/resource/failure cases, 800x600 visual inspection, no duplicated loops/listeners; review/report. |
| M1.4 — Reproducible delivery and acceptance evidence | Static production assets, accurate setup/player/developer instructions and complete required engine evidence. | M1.3 complete/closed. | Clean setup/build/serve, all engine versions/counts/limits, contract coverage and guides; review/report. |
| M1.5 — Phase review and final report | One cross-milestone phase review/testing/report outcome. | M1.1–M1.4 complete/closed, including reviews/issues. | Complete baseline acceptance, blocker repairs, TODO aggregation, task-commit audit, tracking closures and verified explicit target integration/publication. |

P1 contains four delivery milestones and a dedicated one-task phase review milestone. The first playable path is end-to-end, rather than isolated infrastructure; controls/progression and robustness grow it into complete baseline delivery. P2's requested bag/kick/drop/Hold/Ghost and delayed-lock rules are introduced in P2, then become the complete intended behavior in SPEC. Reassess affected completed P1 task/parent claims against those contracts without replaying tasks or rewriting historical reports.

## P2 — Modern gameplay enhancements

| Milestone | Useful outcome and scope | Prerequisites | Exit evidence |
| --- | --- | --- | --- |
| M2.1 — Bag and delayed drop gameplay | Seven-bag succession, continuous grounded delay and reachable Hard drop in the playable loop. | P1/Space amendment integrated/published, accepted feature preparation integrated/published and complete P2 activation. | F1–F3 permutations/draw/atomic checks; exact contact/soft/pause timing; native Enter then delayed settlement; retained regressions; code review/testing/report. |
| M2.2 — Hold ghost and wall kicks | Once-per-piece Hold with display, exact shared landing Ghost and ordered quarter-turn kicks. | M2.1 complete/closed. | F4–F6 empty/swap/blocked/reuse/reset, Ghost purity/pixels, all eight transitions per family with order/rejection/support timing; native demonstration; review/report. |
| M2.3 — Robust reproducible modern delivery | New-state/resource/lifecycle robustness, complete browser/static acceptance and accurate guides. | M2.2 complete/closed. | F7–F8 and retained B1–B8 atomic failures, native focus/default/repeat/typing, disposal, all three engines with exact versions/counts/skips, 800x600 and distribution exclusions; review/report. |
| M2.4 — Feature phase review and final report | One cross-milestone phase review, canonical incorporation/task transfer/archive and final evidence. | M2.1–M2.3 complete/closed, including reviews/issues. | All B1–B8/F1–F8 exits, task persistence audit, current canonical QC, one executable owner, eligible feature archive, TODO aggregation, final tracking closure, explicit merge, merged checks and target publication/readback. |

P2 has three delivery milestones, each containing three delivery tasks plus a separate review, and one dedicated final phase review milestone. Bag/locking/drop form the first useful increment; Hold/Ghost/kicks contribute separately verifiable mechanics; robustness/acceptance/guides make the result reproducible. Counts fit the preferred range, and semantic scopes have independent observable exits without artificial administrative tasks. No new runtime subsystem or physical production module is needed.

## Execution and integration gates

Each delivery milestone ends with a distinct source review/testing/report task after its delivery work. Each phase has one final single-task review milestone, dependent on all delivery milestone closures. Deterministic tests precede changed behavior; characterization checks are labeled accurately. Repair bugs, critical issues, contract violations and missing required evidence before review completion. Preserve admissible TODO provenance, options/tradeoffs and follow-up owner; use None when empty.

Prepare documents on design-docs, with current SPEC/design, PLAN/layout and TASKS conformance assessments before downstream use. Explicitly merge accepted preparation into the actual default branch, verify/publish/read back, then create the implementation branch from that checkpoint. No Ready label or preparation-branch push substitutes for target publication.

GitHub tracking is required. Before an eligible phase's first task, create/reconcile its phase label, all native milestones including reviews and every derived task issue; read back exact phase/milestone associations. Missing projection blocks execution. A result, current evidence and initial task checkbox close together in one single-ID commit, followed by push/readback before advancing and then verified issue closure. Close each milestone only after all its issues and review/exits; phase review waits for delivery milestone closure. GitHub phase labels retain historical associations and have no close state.

A partial phase publishes and pauses. A complete verified phase/feature integrates with an explicit two-parent merge into refreshed actual main, merged-state verification, push and remote containment. Feature completion incorporates accepted content into main owners, transfers tasks once and archives only eligible owning sources/QC on the feature branch before final verification. Preserve earlier closed records and stable identities. Stop at the authorized boundary; deployment, release, tags and further campaigns are outside this plan's selected execution.

## Evidence locations and acceptance

P1 reports remain at docs/dev/reports/phases/P1/<milestone-id>.md and PHASE-REPORT.md, with its historical final docs/dev/reports/IMPLEMENTATION-REPORT.md. Modern feature reports remain at docs/dev/features/002_d708792-modern-enhancements/: M2.1.md, M2.2.md, M2.3.md, ACCEPTANCE.md, PHASE-REPORT.md and IMPLEMENTATION-REPORT.md. The package retains archived feature sources/QC with explicit historical status; TASKS is the sole executable owner.

Every exit requires actual evidence, with source review distinct from tests and native app/static checks distinct from test-only rare-state harnesses. Required engines cannot be silently skipped or substituted. Guides report actual setup/check/serve commands and observed compatibility limits. Produce and serve static assets for verification; do not infer deployment or release.

## Risks and controls

| Risk | Control |
| --- | --- |
| Contact overcount, reset on grounded actions or soft/drop shortening | Exact chronological contact boundaries, continuous/airborne motion, normal-level intervals, pause and native drop checks. |
| Bag/Hold selection ownership or partial invalid state | Snapshot-owned remainder, deterministic draw counts, blocked spawn/swap and invalid-draw/overflow atomicity. |
| Wrong kick sign/order or Ghost disagreement | Explicit SPEC tables, independent obstacle/floor/wall fixtures and shared pure landing/pixel checks. |
| Browser facilities or input timing differ from deterministic tests | Real engine installation/launch, native keys/buttons, explicit virtual frame boundaries, source-only fixture separation and recorded limits. |
| Hosted transition uncertainty or premature completion | Activation/readback, per-task publication, lifecycle closure gates, retained failure evidence and task-parent diff audit. |
| Stale canonical docs or duplicate executable ownership | Final whole-owner QC, unique task transfer, historical archive markers and maintained link/orientation checks. |
