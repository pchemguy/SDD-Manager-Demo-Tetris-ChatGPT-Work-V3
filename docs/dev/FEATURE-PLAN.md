# Modern enhancements delivery plan

## Scope, authority and prerequisites

Campaign 002_d708792 delivers the complete accepted FEATURE-SPEC F1–F8 on the existing playable application. Document checkpoints are explicitly pre-approved; technical conformance, predecessor publication, tracking, tests and reviews remain gates. Reuse accepted architecture/decomposition/layout: no new production component or physical module is required. P1 and Space steering are verified published prerequisites. Use new P2/M2.x/task identities, never reopen or replay P1 tasks.

## P2 — Modern gameplay enhancements

| Milestone | Useful outcome and scope | Prerequisites | Exit evidence |
| --- | --- | --- | --- |
| M2.1 — Bag and delayed drop gameplay | Seven-bag succession, continuous grounded timing and immediately reachable Hard drop integrated with the playable loop. | Accepted published feature preparation and complete P2 hosted activation. | Multi-bag/draw/atomic checks, exact contact-time/soft/pause boundaries, native Enter drop followed by delayed settlement; preserved baseline regressions; code review/testing/report. |
| M2.2 — Hold ghost and wall kicks | Once-per-piece Hold with display, exact shared landing Ghost, and ordered quarter-turn kicks; all new controls operate in the actual app. | M2.1 complete and closed. | Empty/swap/blocked/reuse/reset Hold; ghost state purity and pixels; all eight transitions per kick family plus first-legal/rejection and grounded timer effects; representative browser demonstration; code review/testing/report. |
| M2.3 — Robust reproducible modern delivery | New-state failure/lifecycle robustness, complete three-engine/static acceptance and accurate player/developer instructions. | M2.2 complete and closed. | Atomic malformed state/draw checks; native focus/repeat/typing and failure/disposal; complete deterministic/browser matrix and readable 800x600 views; clean static build; code review/testing/report. |
| M2.4 — Feature phase review and final report | Cross-milestone code review, complete contract reassessment, main document incorporation, archive and final evidence. | M2.1–M2.3 complete/closed. | All F1–F8 and retained B1–B8 exits; per-task persistence audit, final TODO aggregation, one executable task owner, canonical document/QC consistency and eligible feature source archive; final issue/milestone closure, explicit merge, merged-state verification and target publication. |

Three delivery milestones are cohesive behavioral increments; the fourth is the required single phase-review outcome. Earliest useful increment is actual delayed Hard drop and bag play, not isolated infrastructure. Subsequent Hold/Ghost/kick visuals demonstrate changed play while preserving the existing UI. The human's autonomous instruction permits continuing through these observations without new checkpoints; blockers remain blocking.

## Physical ownership assessment

| Existing owner | Feature responsibility |
| --- | --- |
| src/core/types.ts | Snapshot bag remainder, held identity/use and lock elapsed; semantic hold/hardDrop actions. |
| src/core/game.ts | Atomic bag succession, delayed locking/hold transitions, chronological time accounting and kicked candidate selection. |
| src/core/geometry.ts | Ordered SRS offset data for the two piece families and O's zero offset. |
| src/core/board.ts | Pure shared landing projection using legal cells. |
| src/session/controller.ts and ports.ts | New actions, successful Hold's held-input clearing and clock-rebase notification. |
| src/platform/input.ts | Fresh C/Enter translation; preserve Space rotation, focus and native defaults. |
| src/view/canvas.ts and dom.ts | Derived Ghost, held preview and availability text without mutable rules or draws. |
| src/main.ts, index.html, src/style.css | Hold resources/required markup, new instructions, existing error/disposal boundary and desktop layout. |
| tests/core, session, platform, view | Focused deterministic tests and explicit replacement of superseded rule expectations. |
| tests/browser/modern.spec.ts and existing specs/fixtures | Native modern interactions, Canvas, timing, fault/lifecycle and production integration; no global debug setter. |

Existing directory ownership covers all files, so no layout amendment or feature-layout overlay is necessary. No dependency/toolchain changes are planned. The exact existing Chromium/Firefox/WebKit configurations and their honest limitations remain applicable until reverified.

## Integration, reports and risks

Commit/push each preparation stage on design-docs, then explicitly merge accepted preparation into actual main, verify and publish before branching feature execution. Activate P2's phase label, all four native milestones and all derived issues with readback before task tests/edits. One task result/evidence/initial checkbox per closing commit; publish/read back before the next. Close each milestone after its final review issue and all constituents.

Reports stay in docs/dev/features/002_d708792-modern-enhancements/: M2.1.md, M2.2.md, M2.3.md, PHASE-REPORT.md and IMPLEMENTATION-REPORT.md. Final review incorporates the accepted delta into PROJECT/design/SPEC/PLAN/layout and transfers FEATURE-TASKS into TASKS exactly once where applicable; unchanged owners are retained. Archive only this active package's eligible feature sources/QC, updating links before closure. Preserve all earlier closed reports and steering packages. Then close/read back final tracking, explicitly merge verified feature into main, rerun merged acceptance and publish/read back. Stop without release/deployment.

Risks: contact-time overcount and hard-drop timer reset; bag-state atomicity and stale uniform-draw expectations; Hold blocked-spawn/draw ownership; opposite sign in kicks; Ghost disagreement with landing; input collisions and hidden test skips. Deterministic boundaries, hand-checked fixtures, native browser/Canvas assertions and separate code review control these risks. No required engine may be silently omitted.
