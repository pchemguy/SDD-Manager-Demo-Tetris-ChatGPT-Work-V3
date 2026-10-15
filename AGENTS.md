# Agent orientation

## Governing sources and current boundary

This repository develops desktop browser Tetris with TypeScript, Canvas and native HTML. Start with [PROJECT](docs/dev/PROJECT.md), [ARCHITECTURE](docs/dev/ARCHITECTURE.md), [DECOMPOSITION](docs/dev/DECOMPOSITION.md), [SPEC](docs/dev/SPEC.md), [PLAN](docs/dev/PLAN.md) and [layout](docs/dev/layout.md). Their adjacent QC reports govern dependent use. P1 and the Space clockwise-rotation amendment are integrated. Preserve their stable IDs, published history and closed records.

The active autonomous campaign is [002_d708792 modern enhancements](docs/dev/features/002_d708792-modern-enhancements/README.md). Accepted [FEATURE-SPEC](docs/dev/FEATURE-SPEC.md) and [FEATURE-PLAN](docs/dev/FEATURE-PLAN.md) override changed baseline contracts; [FEATURE-TASKS](docs/dev/FEATURE-TASKS.md) solely owns T-027–T-039 until final transfer. Main [TASKS](docs/dev/TASKS.md) retains P1. The human pre-approved document checkpoints and all necessary repository/tracking operations within this campaign. Technical QC, phase activation, verification, one-task commits and publication remain mandatory. Finish canonical incorporation/archive and verified integration to main, then stop without release or deployment.

## Application behavior and checks

Space/X rotate clockwise; Z counterclockwise; C Holds once until lock; Enter Hard drops with delayed locking; arrows move/soft drop and P pauses. Seven-bag state owns the remaining identities; Ghost uses the shared pure landing. Grounded locking waits one full current normal gravity interval, including Hard drop. Continuous support preserves accrued lock time; leaving it clears timing. No drop bonuses, hidden rows, persistence, mobile controls or multiplayer.

Use Node 24+ and npm from the repository root: npm ci, npm run dev, npm run typecheck, npm test, npm run build, npm run test:browser and npm run preview. Install browser binaries separately with npx playwright install chromium firefox webkit; Linux may need npx playwright install-deps. Tests own port 4173. Run build before SDD_PRODUCTION=1 browser checks; unset it for development. README has Windows CMD syntax. PowerShell is not required; Windows execution is unverified.

Current [acceptance](docs/dev/features/002_d708792-modern-enhancements/ACCEPTANCE.md): 129 unit tests, strict build, 25 development and 18 production scenarios per engine, zero skips; Chromium 153.0.8010.0, Firefox 157.0, WebKit 27.2. Production selection includes modern controls, Space, failures, usability and static assets. Development also covers source-only rare-state and composition harnesses. Use optional Linux npm run browser:provision then SDD_PACKAGED_CHROMIUM=1 in this container. MOZ_DISABLE_CONTENT_SANDBOX=1 was needed only for trusted local Firefox tests because namespace mappings are denied; WebKit needs installed host libraries. Modeled blur/visibility does not establish native OS focus delivery. WebKit's rapid injected mouse-click limitation is documented in README.

## Workflow and publication

Load bundled [SDD Manager](.agents/plugins/sdd-manager/PLUGIN.md) and its [coordinator](.agents/plugins/sdd-manager/skills/sdd-manage/SKILL.md). Use [sdd-implement](.agents/plugins/sdd-manager/skills/sdd-implement/SKILL.md) for the selected executable boundary. Apply [phase activation](.agents/plugins/sdd-manager/skills/sdd-manage/references/phase-activation.md) before eligible implementation; required GitHub phase labels, milestones, task issues and associations need readback. Inspect owning tasks, actual commits, pending changes and hosted state when resuming. Never infer acceptance from a branch name or checkbox.

Follow [one-task completion](.agents/plugins/sdd-manager/skills/sdd-implement/references/completion-and-checkpoints.md#task-commit-contract): result, required evidence and initial task checkbox together in one single-ID commit, push/readback before advancement, then verified issue closure. Milestone/phase reviews require source inspection separately from passing tests; close milestones only after all constituents. Apply [explicit integration/publication](.agents/plugins/sdd-manager/skills/sdd-manage/references/git-workflows.md) and preserve closed campaign bytes. The historical T-022 premature-completion exception and authorized forward repair remain in [P1 recovery](docs/dev/reports/phases/P1/T-022-RECOVERY.md); do not rewrite or certify its original chronology.

## Source and environment constraints

Follow layout ownership. Core imports no browser facilities; the controller owns the live snapshot; views only derive presentation. Keep test harnesses outside the production graph and introduce no global debug setters. dist, node_modules, caches and test-results are generated. Deploy only application dist assets; never credentials, tests, documents or agent packages. Preserve unrelated toolchains; do not touch or execute /pyenv.

Read applicable nested AGENTS.md files before selected work. Preserve unrelated pending changes. Root orientation is authoritative when the host does not discover it automatically. Human review is separate from technical QC; this campaign's explicit pre-approval covers its human checkpoints only.
