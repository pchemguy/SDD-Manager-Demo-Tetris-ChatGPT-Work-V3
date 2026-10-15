# Delivery plan

## Objective and strategy

Deliver the complete classic browser Tetris game in accepted [SPEC](SPEC.md), using the boundaries in [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md). Use one delivery phase with four capability milestones and a final dedicated phase review milestone. The core scope is small enough for one coherent phase; milestones provide useful stopping points without pretending that incomplete gameplay is a separate finished product.

Establish a minimal playable browser path in the first delivery milestone, then grow its gameplay completeness, robustness, and delivery evidence. Automated tests and documentation accompany each increment. Do not postpone real browser integration until the final milestone. Physical allocation and concrete tool/check commands belong to layout and TASKS; this plan defines outcomes and exits rather than file edits or task IDs.

SPEC has human acceptance at `1ae7fa32560ebc7db679be0bd3b353c23c9005bc`; its current [design-conformance review](SPEC-REVIEW-REPORT.md) supplies the technical prerequisite. The PLAN proposal and subsequent layout retain separate human checkpoints. TASKS must not be derived until both are accepted and combined QC is current.

## Phase P1: Complete classic browser gameplay

Scope: B1–B8 and all SPEC acceptance groups. The observable final result is the statically served game with complete controls, scoring/progression, preview, lifecycle/failure handling, documentation, and representative browser evidence. No modern gameplay expansion, hosted deployment, tag, or GitHub Release is included.

| Milestone | Outcome and included scope | Dependencies | Exit evidence |
| --- | --- | --- | --- |
| M1.1: First playable loop | Working browser game with the seven shapes, legal movement/rotation, timed falling, failed-downward-attempt locking, clearing, piece succession, blocked-spawn game over, and minimal Start/Restart plus visible board/status. | Accepted preparation, validated build/test facilities, and eligible-phase tracking activation. | Deterministic B1–B3 checks; controlled time/draw integration; a real browser play session showing movement through settlement, clearing, and game over/restart; milestone review/report. |
| M1.2: Complete game controls and progression | Score, cleared lines, levels/gravity curve, exact preview, soft drop, held-direction policy, pause/resume, automatic focus/visibility pause, and complete keyboard/button lifecycle. | M1.1 complete/closed. | B4–B6 checks, keyboard/button browser interactions, repeat and timing boundaries, restart/focus regression checks, and preserved playable loop; milestone review/report. |
| M1.3: Robust and usable browser experience | Complete HTML status/instructions/focus behavior, required viewport usability, stable rendering/resizing, disposal and rebuild safety, explicit input validation, and fatal-error stop/reload behavior. | M1.2 complete/closed. | B7–B8 and remaining B5–B6 failure/resource cases; representative canvas/status inspection; 800 × 600 viewport, missing-element/canvas and injected-failure checks; no duplicate listeners/loops; milestone review/report. |
| M1.4: Reproducible delivery and acceptance evidence | Static production build, clean setup/verification instructions, complete selected browser-engine validation, full contract regressions, and actual compatibility/limitation reporting. | M1.3 complete/closed. | Reproducible installation/build/static-serving checks; Chromium, Firefox, and WebKit evidence with exact versions; full acceptance coverage assessment; README and agent instructions verified against actual commands; milestone review/report. |
| M1.5: Phase review and final report | Exactly one phase code-review/testing/report outcome across the complete P1 result, including final implementation summary and TODO aggregation. | Every delivery milestone M1.1–M1.4 complete/closed with required reports and issue closures. | Cross-milestone code review, required tests/regressions, complete B1–B8 exit coverage, resolved blockers, final reports, and verified issue/milestone closure. |

### First playable milestone boundary

M1.1 is an end-to-end playable slice, not a skeleton or mocked demonstration. It uses actual browser keyboard input and rendering, independent draws, and real core transitions. Build/test setup, controlled randomness/time seams, and minimum browser wiring are necessary prerequisites within this milestone because otherwise gameplay cannot be exercised or its rules checked.

Scoring/progression, exact preview presentation, soft-drop/held-key repetition, complete pause/focus behavior, polished usability, and comprehensive failure/engine coverage are deferred to their listed milestones. M1.1 uses level-one gravity and fresh-press horizontal/rotation input; it must not be reported as full SPEC completion. Minimal Start/Restart and game-over status make the slice independently exercisable. Existing acceptance is preserved as applicable behavior grows.

Demonstrate M1.1 to assess whether movement, readability, and the playable loop support continued development. Demonstrate M1.2 to assess complete controls, scoring, and timing feel; use M1.3 evidence to assess usability and robustness. At a requested stopping boundary these observations inform the human's choice to continue, amend, simplify, or stop. They do not add automatic implementation pauses or authorize steering beyond the selected range.

## Dependencies and integration

Within milestones, derive small verifiable tasks around cohesive component/contract changes and integrate them into the playable path promptly. Establish deterministic rule tests before behavior changes and maintain focused regressions as browser wiring grows. Browser facilities must have actual installation and launch evidence before browser acceptance is claimed; configuration alone is insufficient.

Each delivery milestone ends with its own explicit code-review/testing/report outcome after its delivery work. Its exit requires relevant dependent checks, repair of bugs and SPEC/PLAN violations, updated documentation, and committed/pushed evidence. M1.5 contains only the single phase review outcome and has no second milestone-review outcome. TASKS assigns stable executable IDs to all delivery and review work.

Use the accepted preparation branch until PROJECT/design/SPEC/PLAN/layout/TASKS and required reviews are complete. Before implementation branching, explicitly merge accepted preparation into the actual default branch, verify the merged state, push it, and confirm remote containment. Execute P1 on its phase branch; incomplete task/milestone ranges push and pause without integration. Merge the complete phase only after all phase exits, required tracking closures, and verification gates pass; verify and publish the merged target.

GitHub tracking remains required. Before P1's first task, create/reconcile its phase label, all five native milestones, and every derived task issue, including reviews; verify phase labels and milestone associations by readback. Each verified task result and its initial completion checkbox close in one task commit, followed by push/readback, then evidence-backed issue closure. Close each milestone only after every issue, its review, and exits are satisfied. Tracking failures block affected execution or dependent closure; do not silently continue in local-only mode.

## Phase exits and evidence

- All B1–B8 capabilities and acceptance groups are covered by actual passing evidence, with implementation and code review assessed separately from test execution.
- Required deterministic, coordinator, failure, browser interaction, visual/usability, static-build, and compatibility checks pass. An unavailable required browser engine is a blocker or explicit human exception, not a compatibility pass.
- Every delivery milestone and the phase review have retained reports with features delivered, checks/outcomes, findings/blockers, and a TODO section, including `None` when empty. Final reporting aggregates unresolved eligible TODOs with original identities, options, owners, and provenance.
- README and agent guidance contain actual setup/build/test/serve commands and truthful supported behavior and limitations. A static build artifact is produced and served for verification; release packaging/publication is outside this phase.
- All selected task commits are published and meet the one-task completion contract; hosted task issues and all native milestones are closed/read back in lifecycle order.
- Complete-phase integration is an explicit two-parent merge followed by merged-state checks, target publication, and remote containment verification. Only then is P1 integrated; no additional phase begins automatically.

Retain milestone reports under `docs/dev/reports/phases/P1/<milestone-id>.md`, the phase report at `docs/dev/reports/phases/P1/PHASE-REPORT.md`, and the final implementation report at `docs/dev/reports/IMPLEMENTATION-REPORT.md`. These fixed workflow artifacts are exceptions to the general deferral of physical allocation to layout.

## Risks and decision gates

| Risk | Planned control and decision boundary |
| --- | --- |
| Browser timing/input behavior diverges from deterministic core behavior | Integrate a real browser in M1.1; exercise repeat, focus, and pause timing in M1.2; preserve controlled-clock tests. Contract changes require human direction rather than silent tuning. |
| Native dependencies or browser downloads/launches fail in the environment | Validate selected facilities during M1.1 and investigate supported recovery. Report actual capability limits before claiming acceptance; do not replace a required engine or weaken SPEC implicitly. |
| A large first milestone hides disconnected subsystem work | Derive bounded tasks with integrated checkpoints, keep the initial UI minimal, and inspect semantic task scope during TASKS QC. Avoid a core-only milestone delaying first use. |
| Tracking creation or closure is unavailable | Enforce phase activation and lifecycle readback gates, preserve local evidence, and report the concrete pending hosted operation. |
| Final browser checks reveal earlier regressions | Carry relevant regressions through every milestone and repair blockers before review closure; retain exact engine/version and scenario evidence. |

No governing behavioral decision is delegated to TASKS. Tool selection and physical ownership remain for layout; task-level sequencing and verification commands follow after that checkpoint. This plan is a proposed delivery strategy and claims no completed implementation.
