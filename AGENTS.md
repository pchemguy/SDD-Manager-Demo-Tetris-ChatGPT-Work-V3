# Agent orientation

## Project and governing sources

This repository develops a classic browser-based Tetris game. Start with [PROJECT](docs/dev/PROJECT.md); its initial human review is pending. Architecture, decomposition, specification, delivery plan, layout, and task list have not yet been prepared. No application source, tests, or validated setup commands exist yet.

Read applicable nested AGENTS.md files before working on selected paths. Load this entry explicitly if the host does not discover it automatically.

## Workflow ownership

Load the bundled [SDD Manager entry](.agents/plugins/sdd-manager/PLUGIN.md) and [coordinator](.agents/plugins/sdd-manager/skills/sdd-manage/SKILL.md). The [design skill](.agents/plugins/sdd-manager/skills/sdd-design/SKILL.md) owns current project preparation. Follow [human document review](.agents/plugins/sdd-manager/skills/sdd-manage/references/human-document-review.md) before dependent work.

Use accepted current documents and the eventual owning TASKS for execution. Preserve pending and unrelated changes. Do not infer acceptance or implementation authority from a branch name or checked box.

## Verification and publication

Apply the [Git publication rules](.agents/plugins/sdd-manager/skills/sdd-manage/references/git-workflows.md) and the [task commit contract](.agents/plugins/sdd-manager/skills/sdd-implement/references/completion-and-checkpoints.md#task-commit-contract): one executable task's verified result, required evidence, and initial completion checkbox together, followed by push and remote verification before advancement.

GitHub tracking is requested. Apply [phase activation](.agents/plugins/sdd-manager/skills/sdd-manage/references/phase-activation.md) before each eligible phase's implementation; missing or unverified required objects and associations block affected execution. Stop at the user's document-review and execution boundaries.
