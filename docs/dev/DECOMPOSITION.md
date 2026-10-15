# Component decomposition

## Context

Refine the accepted [ARCHITECTURE](ARCHITECTURE.md) into logical components for the classic-core scope in [PROJECT](PROJECT.md). These components describe responsibilities and collaboration, not a file inventory or delivery sequence. A component may consist of a few cohesive functions; this model requires no class hierarchy or service framework.

## Gameplay core

| Component | Provides and owns | Requires and excludes | Verification seam |
| --- | --- | --- | --- |
| Piece geometry | Tetromino geometry, orientation transforms, and occupied-cell projection for a candidate placement. | Piece identity, orientation, and origin. Does not inspect DOM, time, score, or input devices; does not apply wall kicks. | Known shape/orientation examples and occupied-cell invariants. |
| Board operations | Placement legality, settlement of legal cells, completed-row detection, and board compaction. | Board and projected cells. Does not choose pieces, schedule falls, or calculate rewards. | Small explicit boards covering edges, overlap, settlement, and simultaneous row clearing. |
| Scoring and progression policy | Derive score and progression changes and the applicable gravity interval from accepted game events and current progression. | Clear outcomes and policy state. Does not clear rows or measure wall-clock time. | Table-driven scoring and progression cases after SPEC defines the formulas. |
| Game transitions | Canonical game-state shape and transitions for starting a game, moving/rotating a piece, advancing logical time, locking, spawning, and reaching game over. Compose geometry, board, and policy results. | Semantic actions, elapsed-time inputs under the timing contract, and explicitly supplied piece draws. Does not read browser APIs or render. | Deterministic state/action sequences with controlled draws and elapsed time. |

Game transitions define the rules governing a snapshot; the session coordinator retains the single live snapshot. Core helpers return results to the transition owner and cannot independently update the live game. A rejected placement must not partially settle cells or award score.

The canonical snapshot includes board contents, active and next piece, score/progression, and game lifecycle status. Logical timing information needed to decide a gameplay transition belongs to this core state. Scheduling timestamps, input-repeat bookkeeping, and callback handles belong outside it. Exact representation and timing semantics are SPEC concerns.

## Session coordination

The session coordinator is the sole entry for semantic player actions and browser time updates. It retains the current snapshot, serializes updates, obtains piece draws when core operations require them, invokes game transitions, and requests presentation of the resulting snapshot. Its public boundary is provisionally action dispatch, elapsed-time delivery, snapshot observation, and disposal.

The coordinator owns any input-repeat scheduling chosen by SPEC. It must not implement collision, rotation, line clearing, or scoring in parallel with the core. It manages the scheduling lifecycle through the clock adapter rather than owning a second animation loop. Controlled time and action sources allow tests to assess ordering, pause/resume, restart, and disposal without a real browser.

## Presentation

| Component | Provides and owns | Requires and excludes | Verification seam |
| --- | --- | --- | --- |
| Canvas view | Draw the settled board, active piece, and next-piece preview from the snapshot. Own drawing resources and coordinate conversion. | Read-only snapshot and canvas elements. Does not apply rules, generate pieces, or keep its own board model. | Drawing assertions and browser visual inspection with representative snapshots. |
| HTML view | Update score, progression, lifecycle status, button availability, and instructions. | Read-only snapshot and selected HTML elements. Does not register gameplay keyboard handlers or mutate state. | DOM assertions for representative lifecycle and scoring states. |

A presentation operation receives a coherent snapshot and updates both views. Display-only calculations, such as cell-to-pixel conversion, remain in presentation. The next-piece preview consumes the next piece already owned by game state; rendering never draws a new random piece.

## Browser boundary and composition

| Component | Provides and owns | Requires and excludes | Verification seam |
| --- | --- | --- | --- |
| Input adapter | Translate keyboard, buttons, and browser focus/visibility events into semantic notifications; register and remove its listeners. | DOM event sources and coordinator dispatch. Does not mutate game state or decide whether a movement is legal. | Event translation and listener cleanup tests, followed by real keyboard/button browser checks. |
| Clock adapter | One animation-frame scheduling chain, monotonic timestamps, and cancellation. | Browser scheduling facilities and the coordinator's elapsed-time callback. Does not own gravity or lock rules. | Controlled scheduling/cancellation checks and browser lifecycle checks. |
| Random draw source | Supply production random draws through an explicit collaborator; allow deterministic sequences in tests. | Selected platform randomness facility. Does not silently introduce seven-bag distribution or own the preview. | Fixed draw sequences and boundary values under the eventual distribution contract. |
| Application composition | Locate required page elements, construct core/session/view/adapter wiring, and coordinate teardown. | All concrete blocks. Contains no gameplay rules. | Browser startup, missing-element handling, and teardown checks. |

Input events and frame callbacks enter the coordinator serially. The coordinator applies a core operation, retains its result, and renders it. During a core operation requiring a new piece, the coordinator-provided draw collaborator supplies the input; an unchanged rendering pass consumes no draw. This direct collaboration needs no global event bus.

## Lifecycle and failure boundaries

Composition constructs one application session and binds its adapters. Start/restart creates fresh game state and rebases relevant timing/input bookkeeping; pause/resume changes the established session lifecycle without creating another loop. Disposal cancels callbacks and removes listeners. Focus-loss and long-frame policy will be specified together with timing so the adapters and coordinator do not invent different rules.

Ordinary rejected player actions are core outcomes, not application faults. Board helpers reject illegal placements before mutation. An unexpected exception or missing required browser element is an application-boundary failure; composition/coordinator must prevent continued invalid state updates and provide an observable failure path. SPEC will define the exact player-visible response and diagnostic expectations. No recovery backend, persisted game, or network retry subsystem is required.

## Review and downstream decisions

The dependency graph is directed: game transitions use geometry, board operations, and scoring policy; the coordinator uses game transitions and narrow collaborators; views consume state; adapters deliver events and time; composition assembles the concrete units. No core component depends on its coordinator or browser consumers.

SPEC must settle board dimensions, spawn and rotation behavior, locking, random distribution, score/progression formulas, input mapping/repeat, browser lifecycle timing, error responses, and compatibility targets. Those decisions can be assigned to the components above without creating a second owner for a rule. Core, coordinator, DOM, and browser checks provide complementary evidence rather than interchangeable acceptance claims.

Physical module/test allocation belongs to layout, delivery order to PLAN, and executable work to TASKS. The user accepted DECOMPOSITION as presented at commit `e14b1d5c07fc830aa3963d6e87044ad9b1df0cd2`; [SPEC](SPEC.md) supplies the proposed precise contracts for its separate human review.
