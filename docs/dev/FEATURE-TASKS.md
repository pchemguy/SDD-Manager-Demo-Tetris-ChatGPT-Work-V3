# Modern enhancements executable tasks

Campaign 002_d708792. Governing [FEATURE-SPEC](FEATURE-SPEC.md), [FEATURE-PLAN](FEATURE-PLAN.md), accepted main design/layout and their feature QC reports. Human checkpoints are pre-approved and the entire feature is selected for autonomous execution. P1 and the published Space amendment are prerequisites; preserve their stable IDs/evidence and closed reports. Task IDs continue after T-026 and have exactly one active owner here until final transfer.

Each task closes with its result, current verification and initial checkbox in one single-ID commit, then push/readback and evidence-backed issue closure. Before the first task require complete P2 projection/readback. Milestone review tasks are explicit; close each native milestone only after all its issues. Final incorporation/archive occurs on the feature branch before verification/integration. Reports live under docs/dev/features/002_d708792-modern-enhancements/.

## P2 — Modern gameplay enhancements

- [ ] P2 — Modern gameplay enhancements
    - [ ] M2.1 — Bag and delayed drop gameplay
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
        - [ ] T-030 — Review test and report bag and delayed drop gameplay
            Scope: M2.1 coherent result and package M2.1.md.
            Depends on: T-027–T-029.
            Evidence: Separate code review from execution; repair blockers; deterministic/build/browser demonstration; findings and TODO; close review issue then milestone.
    - [ ] M2.2 — Hold ghost and wall kicks
        - [ ] T-031 — Implement once-per-piece Hold and presentation
            Scope: core state/transitions, controller/input/composition, Hold markup/views and fixtures.
            Depends on: T-030; M2.1 complete/closed.
            Evidence: F4/F7/F8; empty/swap draw counts, repeat rejection, blocked spawn, reset/pause and held-state/clock cleanup, actual named Hold display.
        - [ ] T-032 — Render exact state-free landing Ghost
            Scope: view/canvas.ts and focused core/view/browser tests.
            Depends on: T-031.
            Evidence: F3/F5; shared landing, outline behind active, overlap suppression, obstacles, movement and hold recomputation, paused/ready/gameover and snapshot/draw purity.
        - [ ] T-033 — Implement ordered quarter-turn wall kicks
            Scope: core/geometry.ts and game.ts with deterministic rotation/obstacle/timer regressions.
            Depends on: T-032.
            Evidence: F6/F2; all eight transitions for both tables, I/JLSTZ/O distinction, first legal order, floor/wall/blocked rejection, timer preserve/reset and no extra draws.
        - [ ] T-034 — Review test and report complete modern mechanics
            Scope: M2.2 coherent result and package M2.2.md.
            Depends on: T-031–T-033.
            Evidence: Separate code review/testing, integrated Hold/Ghost/kick demonstration, retained modern/baseline regressions, repairs and TODO; close review issue then milestone.
    - [ ] M2.3 — Robust reproducible modern delivery
        - [ ] T-035 — Verify modern state failures and lifecycle boundaries
            Scope: core/controller/composition validations and focused regression tests.
            Depends on: T-034; M2.2 complete/closed.
            Evidence: F8 and retained B8; malformed dense/unique bag, held/use/lock fields, draw/overflow atomicity, missing Hold Canvas/markup, disposal/rebuild and safe fatal stop.
        - [ ] T-036 — Verify complete modern browser and static acceptance
            Scope: browser specs, deterministic fixtures, production selection and retained screenshots.
            Depends on: T-035.
            Evidence: F1–F8; actual C/Enter/Space/Z/X, lock delay, ghost/hold pixels, typing/repeats/focus, 800x600, production assets/exclusions; all three exact engine versions/counts/skips.
        - [ ] T-037 — Document modern player rules and reproducible checks
            Scope: README.md, AGENTS.md and focused maintained guides.
            Depends on: T-036.
            Evidence: Controls, seven-bag/hold/ghost/kicks, full normal-gravity lock including Hard drop, no drop bonuses; actual setup/tests/build/static serve, CMD and observed limits, local links.
        - [ ] T-038 — Review test and report modern delivery acceptance
            Scope: Whole delivery result and package M2.3.md.
            Depends on: T-035–T-037.
            Evidence: Code/config/docs review, complete required checks and repairs, actual acceptance/limits/TODO; close review issue then milestone.
    - [ ] M2.4 — Feature phase review and final report
        - [ ] T-039 — Review incorporate and report the complete modern feature
            Scope: Whole feature, canonical main documents/QC and unique task transfer, eligible source archive, package PHASE-REPORT.md and IMPLEMENTATION-REPORT.md.
            Depends on: T-030, T-034, T-038; M2.1–M2.3 complete/closed.
            Evidence: Cross-milestone code review and full tests/build/three-engine acceptance; audit task parent diffs; incorporate feature into main owners and transfer tasks once; archive active sources/QC only after disposition; aggregate TODO; close final tracking, explicitly merge, verify/publish/read back main and stop without release.
