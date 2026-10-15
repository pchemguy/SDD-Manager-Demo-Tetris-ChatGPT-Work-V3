# Agent orientation

## Project and governing sources

This repository develops a classic browser-based Tetris game. Start with the accepted [PROJECT](docs/dev/PROJECT.md) and accepted [ARCHITECTURE](docs/dev/ARCHITECTURE.md). The accepted [DECOMPOSITION](docs/dev/DECOMPOSITION.md) refines those boundaries. Accepted [SPEC](docs/dev/SPEC.md) has a current [QC report](docs/dev/SPEC-REVIEW-REPORT.md). Accepted [PLAN](docs/dev/PLAN.md) has a [combined QC report](docs/dev/PLAN-REVIEW-REPORT.md). Accepted [layout](docs/dev/layout.md) assigns physical ownership. Accepted [TASKS](docs/dev/TASKS.md) and its current [QC report](docs/dev/TASKS-REVIEW-REPORT.md) define the sole executable hierarchy; Full P1 (T-001–T-026) is selected. Preparation is integrated on main at 38afea0fe44f2d1b7966c1898043fa053c117f20; the active phase branch is phase/1-classic-browser-game. GitHub activation has verified one phase label, five milestones and 26 issues/associations. Tooling setup is validated: npm install, npm run typecheck, npm run build, and optional Linux npm run browser:provision. No gameplay behavior tests exist at T-001. Packaged Chromium 153.0.8010.0 passed repeated contexts and Canvas/font pixel probes; Firefox/WebKit remain unverified. See README for recovery and commands.

Read applicable nested AGENTS.md files before working on selected paths. Load this entry explicitly if the host does not discover it automatically.

## Workflow ownership

Load the bundled [SDD Manager entry](.agents/plugins/sdd-manager/PLUGIN.md) and [coordinator](.agents/plugins/sdd-manager/skills/sdd-manage/SKILL.md). Preparation documents are accepted. Full P1 execution is active; [sdd-implement](.agents/plugins/sdd-manager/skills/sdd-implement/SKILL.md) will resolve and execute the selected range after preparation integration and phase activation. Follow [human document review](.agents/plugins/sdd-manager/skills/sdd-manage/references/human-document-review.md) before dependent work.

Use accepted current documents and the eventual owning TASKS for execution. Preserve pending and unrelated changes. Do not infer acceptance or implementation authority from a branch name or checked box.

## Verification and publication

Apply the [Git publication rules](.agents/plugins/sdd-manager/skills/sdd-manage/references/git-workflows.md) and the [task commit contract](.agents/plugins/sdd-manager/skills/sdd-implement/references/completion-and-checkpoints.md#task-commit-contract): one executable task's verified result, required evidence, and initial completion checkbox together, followed by push and remote verification before advancement.

GitHub tracking is requested. Apply [phase activation](.agents/plugins/sdd-manager/skills/sdd-manage/references/phase-activation.md) before each eligible phase's implementation; missing or unverified required objects and associations block affected execution. Stop at the user's document-review and execution boundaries.
