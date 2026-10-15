# SPEC review report

Current complete incorporated scope: see Revision 3 below for the actual identities, conformance and Ready assessment. Earlier preparation gates/observations are historical.

## Initial preparation gate (historical)

Technical state: **Ready** for the complete reviewed SPEC scope, subject to separate human acceptance. SPEC human review is **accepted** at `1ae7fa32560ebc7db679be0bd3b353c23c9005bc`; dependent PLAN authoring is eligible. No implementation, test execution, or browser compatibility pass is claimed.

Reviewed root: [SPEC](SPEC.md), SHA-256 `7dd0a43bc357005f4cb85fd0861664dc18e3fc91a20aa5b8e40bc7dfa08796f8`. There are no focused children. Governing source content identities follow; the accepted decomposition checkpoint is `e14b1d5c07fc830aa3963d6e87044ad9b1df0cd2`, and its pending navigation-only edit records the actual human acceptance and links SPEC without changing component ownership.

- [PROJECT](PROJECT.md): SHA-256 `ae713895d55cabf7369c6316f897b8c5917b9c1463d0cb0ce329bdfdd6099acf`.
- [ARCHITECTURE](ARCHITECTURE.md): SHA-256 `8f05b301c007640fa90235de13ecec3d4a2f891e65e9996e7eda48570b6538be`.
- [DECOMPOSITION](DECOMPOSITION.md): SHA-256 `f8571d4c5a113e088fd2c5ba1f5e16ab01ffb1a6275e7b29f620ae17a67bc297`.

The user accepted classic-core scope, PROJECT, ARCHITECTURE, DECOMPOSITION, and the proposed gameplay defaults before this specification. Numeric timing elaborations, exact geometry/spawn conventions, compatibility scope, and input/error contracts in SPEC were included in that human acceptance. Technical readiness and the human decision are recorded separately.

## Initial review

Date: 2026-10-15. Reviewer: sdd-specify owner, assisted by sdd-report for presentation. Method: direct contract/design comparison, action/lifecycle and timing walk-through, and document checks. This is an author self-review, not an independent review or gameplay validation.

Initial SPEC SHA-256: `af24e31b44e05daaab21376d4b3c7c709f4c88ec0c9a1cf993433386d749d1ec`.

| Coverage | Design/intent conformance assessed | Result |
| --- | --- | --- |
| B1–B3 | Geometry, board, transitions, and explicit draw boundary; core scope and excluded modern features | Placement, locking, clear/spawn order, preview promotion, and blocked-spawn outcome are specified without browser dependency. F-001 identifies one wording ambiguity. |
| B4 | Scoring/progression policy and transition ownership | All clear sizes, pre-clear multiplier, level boundary, and gravity floor are assessable; no unrelated bonus feature is introduced. |
| B5 | Core logical time versus coordinator/browser scheduling | Exact interval boundaries, soft-drop/reset, repeat ordering, clamped browser time, and post-lock remainder are explicit; rule and scheduling state owners remain coherent. |
| B6 | Coordinator, adapters, composition, and HTML lifecycle | Pause/focus/restart/cleanup are covered. F-002 identifies incomplete handling of inapplicable lifecycle actions and ready preview. |
| B7 | Canvas and HTML presentation split | Snapshot-only rendering, preview accuracy, text status, focus, and viewport criteria align with design; accessibility limits are explicit. |
| B8 | Core failure boundary and browser composition | Atomic rejection, fatal stop/reload guidance, static deployment, compatibility targets, and evidence limits are specified. |
| Acceptance table | Complete selected classic scope and cross-block obligations | Each contract group identifies responsible components and objective success/boundary/failure evidence; no claim of implemented acceptance. |

| Finding | Location and consequence | Correction/recheck | Disposition |
| --- | --- | --- | --- |
| F-001 | B2's phrase “Drawing ... consume no additional draws” could confuse random generation with view drawing. | sdd-specify: explicitly name view drawing and random draws; recheck generation counts. | Resolved in Revision 1. |
| F-002 | B6 did not explicitly define ready-state preview or known lifecycle actions received outside their allowed states; letter-case handling was implicit. Consumers could disagree. | sdd-specify: specify empty ready preview, inapplicable-action no-ops, and case-insensitive letters; recheck lifecycle guards and B2 startup counts. | Resolved in Revision 1. |

## Revision 1

Corrected F-001 and F-002 in SPEC. Revised SPEC SHA-256: `7dd0a43bc357005f4cb85fd0861664dc18e3fc91a20aa5b8e40bc7dfa08796f8`. Governing identities are unchanged from the current-gate list. Direct recheck confirms that startup consumes no draws before Start, ready preview is empty, valid Start consumes exactly two draws, rendering consumes none, and disabled lifecycle actions are harmless no-ops. Unknown actions retain B8's explicit-error contract. Letter-case clarification preserves the accepted controls.

Rechecked dependency direction, state/rule ownership, selected scope, deterministic random/time inputs, lifecycle/resource cleanup, scoring/level ordering, and acceptance coverage. No confirmed unresolved design-conformance issues remain. Automated local-link, heading separation, tab/credential-marker, and whitespace checks are recorded with this checkpoint after execution. Runtime behavior and engine compatibility remain unverified. Human SPEC acceptance is the next gate; no PLAN or implementation work is authorized by this report's Ready state alone.

## Human decision

The user accepted the complete SPEC checkpoint presented at `1ae7fa32560ebc7db679be0bd3b353c23c9005bc`. SPEC content and the governing content identities above are unchanged; the current-gate update records the decision without changing the original review or Revision 1 evidence. PLAN and layout retain their separate human checkpoints.

## Revision 2: Spacebar rotation amendment

Current amended SPEC SHA-256: `15118b886ae68d5c6297616f897ed5da4ff49872feff7bd83f52a57c5af7f7d3`. Reviewed B5/B6 against accepted PROJECT/design and the human-commanded amendment: Space is an alternate clockwise action in the existing input adapter; focus, repeat suppression, scroll prevention and inapplicable-state rules still apply. No core rule, boundary or non-goal changes.

Scoped technical gate: **Ready** for this bounded steering amendment; no unresolved conformance finding. The human command authorizes this direct amendment; initial preparation acceptance and earlier evidence remain historical. Governing PROJECT, ARCHITECTURE, DECOMPOSITION, PLAN and layout contents are unchanged. This recheck establishes document conformance, not a runtime pass. Runtime acceptance and reassessed completion evidence belong to the active [revision report](reports/phases/P1/revisions/001_8131306-spacebar-rotation/REVISION-REPORT.md).

## Revision 3: Modern feature incorporation

Current technical gate: **Ready** for the complete incorporated main SPEC, no focused children. Human modern document checkpoints are explicitly pre-approved. Assessed by sdd-specify criteria within sdd-integrate-feature; this is an owner self-review, not an independent external assessment.

- [PROJECT.md](PROJECT.md): SHA-256 `82df2b780cbf4e56f579770b0df4483e369bf9289344c07c2be3544148fa05f4`.
- [ARCHITECTURE.md](ARCHITECTURE.md): SHA-256 `5040738e2527bfdd24605fe77043af9f4dc1e9c534f9244d1f29bd8f16bdb776`.
- [DECOMPOSITION.md](DECOMPOSITION.md): SHA-256 `937e9ff7c8d5ea802b3562840117ca6ee3e58600e14c01b512b28210846a73e6`.
- [SPEC.md](SPEC.md): SHA-256 `2de4fc7c611d2a23522368da1b9369e2d386c66b1c4241b16f2e9b10f49d7ff2`.

| Coverage | Current whole-owner assessment |
| --- | --- |
| B1–B3 / F1–F4 / F6 | Geometry, spawn, snapshot bag/hold/contact timing, kicks and atomic board transitions retain single core owners. Exact selection/hold counts, chronological normal-gravity lock delay and shared landing are complete, objectively assessable contracts. |
| B4–B6 / F7 | Rewards/progression remain stable; no drop bonus. Core versus frame timing, accepted-only Hold rebase, Space/Z/X preservation, C/Enter, repeat/focus/default/lifecycle and fatal ownership align with design. |
| B7–B8 / F5/F8 | Views derive pure Ghost/preview pixels without transitions or draws; named Hold resources, viewport and failure/static/engine acceptance have explicit owners. |
| Scope and acceptance | PROJECT contains all requested modern outcomes and non-goals. Architecture/decomposition preserve existing structure while allowing pure view projection. Main SPEC describes final behavior rather than a chronological delta; F1–F8 identities remain traceable from transferred tasks. |

MI-S001: initial incorporation's Ready-Hold language could conflate an unused allowance with an actionable Ready state. Clarified that the allowance is unused while actions only apply running; Ready remains inert. MI-S002: superseded main no-modern/no-kick/independent-draw/immediate-lock claims and a design sentence excluding pure view queries conflicted with the accepted delta. Replaced those current claims, retained core transition ownership and checked dependent design/acceptance. Both resolved in this revision; no behavioral decision was invented. Original F-001/F-002 and earlier revisions remain historical with their dispositions.

Checks: full source/delta/design comparison, local links/style/identity checks, exact eight-row kick table and all B/F acceptance groups. This gate establishes current document conformance; implementation/task completion and final publication are separate phase-report/Git evidence.
