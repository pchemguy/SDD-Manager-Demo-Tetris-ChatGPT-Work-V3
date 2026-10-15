# Select optional hosted tracking

At workflow entry, preparation handoff and phase activation, establish the actual human tracking decision for the repository and scope. Tracking is optional to select; once requested or confirmed, its activation and lifecycle requirements are prerequisites for dependent execution. Git publication authority and authenticated access are separate from the choice to activate issue/label/milestone tracking.

| Observed decision / access context | Coordinator action and state |
| --- | --- |
| User explicitly requests enabling and maintaining phase labels, milestones and task issues | Treat the request as confirmation for the named repository and scope; do not ask again. Carry **requested/confirmed; projection pending** until the eligible phase objects and associations are verified. Load [phase activation](phase-activation.md) before implementation handoff. |
| User supplies a GitHub token for this repository workflow; no tracking decision exists | Recommend **enable** by default. Ask for confirmation of the concrete managed scope before any hosted projection. State **recommended enabled; confirmation pending**. |
| Confirmation already covers this repository/scope | Carry it forward without another question. Establish eligible phase identity and observed projection separately, then route missing projection/reconciliation to sdd-forge. No objects yet does not mean no tracking request. |
| Explicit decline covers this scope | Respect it, retain **declined**, and continue local/Git work without repeated offers. A later supplied token alone does not erase the decline. |
| No supplied token and no choice | Offer supported tracking when relevant. Use existing authenticated access for confirmed operations; do not probe for credentials or invent consent to make the offer. |
| Confirmation pending | Preserve **pending**, not declined or active. Preparation and independent authorized local work can continue; ask before an affected activation decision. Do not silently choose local-only execution at a phase gate requiring that choice. |

The confirmation proposal identifies the established repository, eligible phase label, every milestone/task issue and their associations, and verification-based closure/reopening within the selected lifecycle. Use known accepted hierarchy counts when available; do not invent them before planning. A supplied token alone neither creates objects nor authorizes a new destination. An explicit request to create and maintain these objects is itself confirmation; do not ask the same question again.

Record the actual user decision and its source, repository/scope, eligible phase, and observed projection/associations in existing project/handoff evidence. Distinguish requested/confirmed tracking from pending, verified or unknown projection; authenticated access and object existence establish neither the decision nor execution readiness. An agent-authored PLAN statement that tracking is inactive describes performed state, not proof of a user decline. Do not create another state registry.

## Late confirmation

When confirmed after local execution begins, discover existing eligible-phase objects and reconcile missing identities/associations idempotently. Attach retained commit/check evidence and close only verified tasks/milestones; leave incomplete work open. Do not repeat product tasks, create future-phase objects or rewrite historical reports to imply earlier projection. Apply phase activation, document readiness and backend lifecycle rules to the actual continuation state.

## Recover an omitted requested gate

An initial explicit tracking request discovered after untracked execution is not late user confirmation. Retain the actual request, missed boundary and performed state separately; do not ask the human to enable tracking again or rewrite evidence to imply earlier compliance.

Preserve pending files/index, task identities and verified results. Publish already verified retained commits first. Before further affected implementation edits/tests or phase advancement, route discovery/reconciliation of the existing eligible phase and required predecessor lifecycle through sdd-forge and [phase activation](phase-activation.md). Reuse matched objects, read uncertain effects before retry, attach retained commit/check evidence and close only verified work. Missing or unknown required projection/closure remains a blocker. Do not replay product tasks, reset work, bulk-project future phases or fabricate historical projection. An actual explicit human local-only override records its scope and pending hosted obligations.
