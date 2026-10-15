# Agent orientation

## Project and governing sources

This repository develops a classic browser-based Tetris game. Start with the accepted [PROJECT](docs/dev/PROJECT.md) and accepted [ARCHITECTURE](docs/dev/ARCHITECTURE.md). The accepted [DECOMPOSITION](docs/dev/DECOMPOSITION.md) refines those boundaries. Accepted [SPEC](docs/dev/SPEC.md) has a current [QC report](docs/dev/SPEC-REVIEW-REPORT.md). Accepted [PLAN](docs/dev/PLAN.md) has a [combined QC report](docs/dev/PLAN-REVIEW-REPORT.md). Accepted [layout](docs/dev/layout.md) assigns physical ownership. Accepted [TASKS](docs/dev/TASKS.md) and its current [QC report](docs/dev/TASKS-REVIEW-REPORT.md) define the sole executable hierarchy; Full P1 (T-001–T-026) is selected. Preparation is integrated and GitHub phase tracking is activated. Inspect Git and TASKS for the current branch and execution boundary. P1's implementation and final review are recorded in [phase review](docs/dev/reports/phases/P1/PHASE-REPORT.md) and [implementation report](docs/dev/reports/IMPLEMENTATION-REPORT.md). The explicitly approved forward T-022 recovery preserves its original premature completion as a historical deviation in [recovery evidence](docs/dev/reports/phases/P1/T-022-RECOVERY.md). Inspect TASKS, task commits, hosted closures and the explicit phase merge/readback to establish the actual completion/integration boundary. P1 is integrated. The current human-commanded amendment adds Space as clockwise rotation; its [revision report](docs/dev/reports/phases/P1/revisions/001_8131306-spacebar-rotation/REVISION-REPORT.md) records the checkpoint and verification. Stop after its verified integration/publication, without release or further task selection.

## Application checks

Use Node 24+ and npm from the repository root: `npm ci`, `npm run dev`, `npm run typecheck`, `npm test`, `npm run test:browser`, `npm run build`, and `npm run preview`. Browser installation is separate: `npx playwright install chromium firefox webkit`; Linux host libraries may require `npx playwright install-deps`. Tests own port 4173. `SDD_PRODUCTION=1` selects only the production suite after build; unset it for development scenarios. npm scripts are CMD-compatible; Windows execution is unverified and PowerShell is not required.

The verified local matrix is Chromium 153.0.8010.0, Firefox 157.0 and WebKit 27.2: each 15 development and 3 production scenarios, zero skips; 43 Node tests and strict build pass. See [acceptance evidence](docs/dev/reports/phases/P1/T-023-ACCEPTANCE.md) and README. Local container commands use `SDD_PACKAGED_CHROMIUM=1` after optional Linux `npm run browser:provision`, and `MOZ_DISABLE_CONTENT_SANDBOX=1` only for trusted local Firefox tests because namespace mappings are denied. WebKit requires installed host libraries. These launch limits are not general browser compatibility claims. Native OS focus delivery is not established by modeled events.

Source ownership follows layout. `dist/` is generated; never deploy repository credentials, tests, docs, dependencies or agent packages. Keep test harnesses outside the production graph and do not introduce global runtime debug setters. Preserve unrelated toolchains; do not touch or execute `/pyenv`.

Read applicable nested AGENTS.md files before working on selected paths. Load this entry explicitly if the host does not discover it automatically.

## Workflow ownership

Load the bundled [SDD Manager entry](.agents/plugins/sdd-manager/PLUGIN.md) and [coordinator](.agents/plugins/sdd-manager/skills/sdd-manage/SKILL.md). Preparation documents are accepted. Full P1 is the authorized execution boundary; [sdd-implement](.agents/plugins/sdd-manager/skills/sdd-implement/SKILL.md) will resolve and execute the selected range after preparation integration and phase activation. Follow [human document review](.agents/plugins/sdd-manager/skills/sdd-manage/references/human-document-review.md) before dependent work.

Use accepted current documents and the eventual owning TASKS for execution. Preserve pending and unrelated changes. Do not infer acceptance or implementation authority from a branch name or checked box.

## Verification and publication

Apply the [Git publication rules](.agents/plugins/sdd-manager/skills/sdd-manage/references/git-workflows.md) and the [task commit contract](.agents/plugins/sdd-manager/skills/sdd-implement/references/completion-and-checkpoints.md#task-commit-contract): one executable task's verified result, required evidence, and initial completion checkbox together, followed by push and remote verification before advancement.

GitHub tracking is requested. Apply [phase activation](.agents/plugins/sdd-manager/skills/sdd-manage/references/phase-activation.md) before each eligible phase's implementation; missing or unverified required objects and associations block affected execution. Stop at the user's document-review and execution boundaries.
