# Working branches and explicit integration

Use this protocol for a bounded implementation range, feature campaign, steering amendment, project preparation baseline, or selected document integration. **sdd-manage** establishes and coordinates the Git lifecycle; the active owner performs its scoped work and persistence. A direct invocation of a focused skill follows this same protocol. Read-only requests do not create branches or merge.

## Publish each commit

After **each workflow-owned commit**, push it to the established remote branch and verify remote containment before advancing project work or creating another commit. Do not accumulate local commits for later publication, including in an agent's temporary sandbox. This rule applies to preparation, reviews/revisions, maintenance, implementation, steering, feature incorporation, report-only commits and merge commits, including direct focused calls. The commit owner publishes; a coordinator/reviewer handoff must finish publication before the next work unit, whether independent or dependent.

Resolve eligible outstanding workflow commits before new commit-producing work. If publication fails, is uncertain or lacks an established destination, preserve the commit, reconcile the remote/recover access where supported, and report the pending operation. Pause workflow advancement and further commits until publication is verified. Commit inspection, push/readback and scoped recovery remain allowed to finish that operation. Do not switch branches, tools or workflows to accumulate unpublished work or evade a blocker.

An **explicit user instruction** for local-only work or deferred publication overrides this cadence only within its stated scope; report committed-but-unpushed state accurately. This rule does not authorize publication outside the granted scope, bypass host/repository restrictions, guess a destination or permit force-pushing. Per-commit pushes do not require per-commit merges or alter human acceptance and integration gates.

## Establish the working branch

Use [branch management](branch-management.md) for identities, targets, convention names, eligible creation/reuse, worktree preservation, and phase transitions. Implementation's push-first prerequisite remains before new setup. Read-only review/selection does not create branches. The integration boundary below depends on workflow scope, not merely the last completed task range.

## Work and prepare the boundary

Project preparation uses the [preparation integration gate](branch-management.md#preparation-integration-gate): commit project documents on design-docs, explicitly merge the accepted boundary into the actual default branch, verify and publish that target, then create the dependent implementation branch. This document-only boundary does not require implementation phase completion. Campaign plans/reports remain on their revision branch; preparation merging does not incorporate feature deltas or complete executable tasks.

Commit and push completed task or amendment work on the working branch. Do not merge every task commit. A main request stops at its selected task count/milestone/checkpoint, but its phase branch integrates only when the complete phase and exits are verified. Otherwise push completed work and pause without merging. A feature/revision integrates its coherent authorized boundary after applicable incorporation/archive gates; steering integrates its commanded amendment into the paused branch and stops.

Inspect the complete branch difference against the target, including earlier unmerged commits. If it contains unrelated or unfinished work, resolve the branch/scope conflict rather than integrating that work by implication. A narrower continuation on an existing feature branch may require a separate scoped branch; do not cherry-pick a guessed subset silently.

Check that the full proposed campaign delta leaves prior closed review, feature and nested steering records unchanged, using path/object identity without reading their contents. Remove incidental historical edits before integration. Later source/link changes do not justify repairing those artifacts or reporting their compatibility; use the [closed-record boundary](../../sdd-conventions/references/review-campaigns.md#closed-campaign-records).

When executable tasks govern the proposed boundary, require **sdd-implement**'s bounded [task persistence audit](../../sdd-implement/references/completion-and-checkpoints.md#task-persistence-audit-and-recovery) before integration. Inspect each selected task's actual closing commit and parent diff, exact leading single-ID subject, task-owned result/evidence and initial owning checkbox transition; aggregate subjects, checked final lists and merge summaries do not establish compliant task persistence. Separate authorized partial checkpoints, repairs and parent-only follow-ups. A detected bundled/split/malformed closing boundary blocks affected integration pending an explicit scoped recovery decision or exception; do not rewrite published history automatically. Non-task campaign/preparation work does not acquire fabricated task IDs or task checklists through this gate.

Verify working-branch acceptance and applicable exits. Reconcile selected feature documents on that branch before its final verification. Retain source documents still required by active work. Commit and push boundary evidence before integration. A pause or unresolved blocker retains the working branch and does not authorize a partial merge.

## Merge, verify, and publish

1. Refresh the target from its established remote and inspect divergence and worktree state without discarding changes. Resolve non-fast-forward local/remote history through project policy, not force-push. Use a clean integration worktree if unrelated work prevents safe integration. Pin the verified working tip and refreshed target tip.
2. Check whether the working tip is already an ancestor of the target. If already integrated, inspect the existing merge/evidence and publication state; do not fabricate another merge or claim a new boundary. If a prior merge is awaiting publication, verify that state and finish its push.
3. Merge the pinned working tip into the target with `git merge --no-ff --no-commit <working-tip>`. Never substitute a fast-forward, squash, or rebase for the required two-parent boundary. Inspect conflicts and the full prospective result; preserve the merge state when blocked. Do not publish a conflicted or unverified result.
4. Use **sdd-verify** to assess the merged state and relevant target regressions. Resolve conflicts and defects only within the authorized boundary; an out-of-scope consequence needs a decision. Record both parent tips, actual checks, and material conflict resolutions in existing evidence. If changes alter working-branch acceptance, recheck it rather than relying on stale results.
5. Use **sdd-report**’s [campaign integration summary](../../sdd-report/references/object-drafts.md#campaign-integration-summary) to compose the explicit merge message: final title/objective, actual review and delivered scope, merged-state verification/limits and integration provenance. Apply it to every revision mode and feature/steering, completed phase and accepted document-preparation integration; an amendment carries retained campaign outcomes forward and separately reports its new delta, unchanged original campaign-opening commit, original branch-off SHA and reopening checkpoint. Do not claim publication/closure before their actual completion. Commit the coherent verified merge result; inspect the commit's two parents, contents, and remaining worktree state. If any result changes after verification, repeat affected checks before completing the merge commit.
6. Push the target merge commit to its established remote branch and verify containment. A task-branch push or local merge alone does not establish published integration. On rejection or outage, retain the merge commit, report pending publication, and reconcile remote changes before retrying; never force-push.
7. Report working/target branches, task/amendment commits, merge SHA, verification, publication, and remaining differences. Retain the working branch unless deletion is requested or established project policy covers it. Stop at the selected boundary; steering always returns control without main-task continuation.

Git merge is a local repository operation. Protected target policy may block direct publication; report the needed supported route. Do not create or merge a pull request implicitly: the present **sdd-forge** backend does not implement PR operations.

## Continue a blocked workflow

Recover the working/target identities and starting checkpoint from Git and existing task/change evidence. Inspect actual diffs, unresolved merge entries, committed parents, accepted inputs, and pending checks. A clean tree or checked list alone does not establish completed integration. If the next action or ownership is ambiguous, preserve state and report it.

Continue the same authorized operation when commanded; do not start another task or amendment. For an in-progress merge, finish scoped conflict/verification work before its commit. A verified merge committed but not pushed needs publication, not a second merge. Aborting a merge or reverting published work is a separate explicit recovery decision with unrelated work protected; no automatic rollback or new transaction journal is required.

## Platform authorization rejection

For a host denial, retain the commit, attempted destination/ref and actual reason. Distinguish denial from missing credentials; use available scope/evidence only through a supported resolution, without inventing an approval mechanism or asking for a grant already present. Inspect the remote first if the effect is uncertain. Do not repeat an unchanged denied operation, substitute credentials for a policy restriction, or switch tools/transports/accounts to evade it. Report pending publication accurately and respect the host's requirements.

## Push authentication recovery

Attempt authorized pushes with existing shell authentication. For a 403 or explicit missing/invalid-credential failure, use [hosting credentials and shell recovery](credentials.md), passing sanitized destination, operation, transport, and cause. Recover the current client's access and retry the same established destination; classify rate-limit or policy restrictions before replacing a token. Keep the commit and report pending publication on an unresolved failure. Authentication recovery does not bypass push-first execution, change the target, or authorize force-pushing.

## Release commit and tag

For an authorized release request, forge first verifies/refreshes the retained complete message through [release-message preparation](../../sdd-forge/references/release-message.md#release-request-freshness-and-commit-gate). Local source/coverage/body context and the established version govern freshness; a matching version alone is insufficient. Manage owns Git persistence and forge owns provider publication.

Prepare one release commit using report's [release commit format](../../sdd-report/references/object-drafts.md#release-commit-message): assemble the UTF-8 message bytes without normalization and use `git commit --cleanup=verbatim -F <message-file>`, with the finalized complete Markdown body also destined for GitHub. Stage only authorized verified release/version changes. A requested release may use an empty marker when there are no owned file changes; preparation-only does not. Reuse a verified matching existing marker on recovery. Explicit existing-source-only instructions take precedence and must be reflected in the release handoff.

Immediately after committing, inspect the raw stored message rather than pretty-printed Git output, which may add formatting. Compare the subject and body with the prepared subject and finalized body bytes, including Markdown spaces and exact newline endings. For example, the Git owner can extract them without decoding or normalization:

```python
import subprocess

raw = subprocess.check_output(["git", "cat-file", "commit", "HEAD"])
message = raw.split(b"\n\n", 1)[1]
actual_subject, separator, actual_body = message.partition(b"\n\n")
if (not separator or actual_subject != expected_subject_bytes
        or actual_body != finalized_body_bytes):
    raise SystemExit("Release commit message differs from finalized bytes")
```

Use `expected_subject_bytes` and `finalized_body_bytes` from the owned prepared message and finalized notes, not reconstructed display text. If a hook/client changed them, block publication/tagging and return the mismatch for scoped correction, preserving notes and commit state. Do not rewrite published history or silently normalize accepted Markdown.

Publish/read back the verified commit before further work, then verify final-source coverage, version/body agreement and actual merged/release-source checks required by the project. The pending release tag points to this exact verified commit; publish/read back its peeled target under the normal Git rules before provider upload/publication. Do not move existing tags or rewrite published commits. A failed/uncertain push stops dependent tagging/publication and resumes from readback evidence. Existing completed releases are inspected/reused, not given duplicate markers. The commit describes the release being published; it cannot claim future provider success.
