# T-022 production bootstrap recovery

## Observed state and scope

T-001–T-021 are verified, committed, pushed and have closed/read-back task issues; M1.1–M1.3 are closed/read back. Full P1 remains selected. Main contains accepted preparation at `38afea0fe44f2d1b7966c1898043fa053c117f20`; implementation stays on `phase/1-classic-browser-game` and is not integrated.

T-022 commit `d690244f79b8f098d0999346eb29afbdca1a865a` was prematurely marked complete and published after a production startup test failed. Its completion evidence incorrectly claimed both production scenarios passed. This report preserves that failure and does not certify the original completion chronology or rewrite history. The owning checkbox is locally unchecked with reassessment pending. T-023–T-026 remain unexecuted.

## Root cause and bounded correction

Vite preserves ordinary page data attributes but rewrites the module script element during bundling. The source page had a `data-tetris-entry` script marker; the production page had only a rewritten module script, while main.ts queried the missing marker before mounting. Start therefore left status Ready in the production browser test.

Move the bootstrap marker to `data-tetris-root` on the main page element and query that marker from composition. The separate application harness has no auto-mount marker and still exercises explicit mount/dispose. No gameplay rules, architecture, phase scope, or task hierarchy changes are proposed.

## Actual correction evidence

After the local correction:

- `npm test`: 40 tests passed in nine files.
- `npm run build`: strict typecheck/static build passed; a repeated corrected build had identical file/content hashes.
- Production Chromium suite: both scenarios passed, covering actual asset loading, Start/Pause/preview and distribution contents.
- Development Chromium suite: 14 scenarios passed, covering input/timing/lifecycle, fault injection, rebuild, visibility handlers, usability and resize.

Chromium is 153.0.8010.0 via the documented packaged fallback. Firefox/WebKit remain required and unverified. The production bootstrap fix is locally verified but uncommitted/unpublished; no current T-022 completion is claimed.

## Approval and stopping boundary

Automatic approval review rejected polling the old T-022 completion cell, because it could continue the stopped GitHub completion/publication path. That cell must not be retried as a workaround. A read-only GET confirmed issue #22 is already closed with reason completed and one evidence comment from the premature path. Its current hosted state is disputed, not accepted completion. No corrective GitHub write is attempted pending explicit recovery approval.

Proposed recovery: preserve the published premature commit, publish a forward task-specific correction with accurate current evidence, reconcile T-022's issue state/evidence, and resume the already-selected full P1 range. The task-persistence audit must retain this original premature-closure deviation rather than claim that a forward repair makes its historical verification valid. Preparation/task/phase tracking and full-engine verification gates remain in force. The human decides this recovery exception before further implementation or integration.

## Approved forward recovery

The human explicitly replied “Approve” to the proposed forward correction and resumption of full P1. This authorizes the scoped recovery exception while preserving the original premature closure as a historical violation. The stopped completion cell was not retried.

Fresh checks after approval: npm test passed 40/40 in nine files; npm run build passed strict typecheck and static generation; production Chromium passed 2/2 and development Chromium passed 14/14, with no skips; git diff --check passed. The owning T-022 checkbox now reflects this corrected verified state. The forward repair commit and issue correction supersede the original false evidence for current acceptance, without rewriting it. Firefox/WebKit remain the next task's blocking acceptance requirements.
