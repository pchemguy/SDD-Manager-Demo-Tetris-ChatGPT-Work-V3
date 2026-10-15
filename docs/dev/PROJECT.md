# Browser Tetris

## Purpose

Develop a classic browser-based Tetris game for individual players. The project also demonstrates staged specification-driven development with SDD Manager; the game is usable without knowledge of that process.

## Intended outcome and scope

Deliver a complete desktop single-player game with keyboard controls, a readable playfield and status display:

- Falling tetrominoes, movement, quarter-turn wall kicks, gravity and collision handling.
- Piece locking after a full normal gravity interval of continuous support, including Hard drop.
- Completed-line clearing, scoring, increasing falling speed and game-over detection.
- Seven-bag piece selection, next-piece preview, once-per-piece Hold and a Ghost landing guide.
- Pause, explicit resume and fresh restart controls.

Exact behavioral contracts, controls and objective acceptance belong to [SPEC](SPEC.md).

## Constraints and non-goals

Use TypeScript entirely in a desktop browser with no backend or account requirement. Keep rules independently testable and separate from browser input and rendering. Multiplayer, online leaderboards, persistent sessions/scores, mobile touch controls, hidden rows, 180-degree rotation, spin/combo/drop bonuses and a configuration panel are outside scope. Browser targets and evidence limits are specified in SPEC; passing local tests does not certify untested platforms.

## Development and delivery

[ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md) assign responsibilities. [PLAN](PLAN.md), [layout](layout.md) and [TASKS](TASKS.md) define delivery, physical ownership and the sole executable hierarchy. Use SDD Manager with technical QC and required human review; the modern feature campaign's human checkpoints are explicitly pre-approved by the user's autonomous instruction.

GitHub tracking is required: eligible phases need verified phase labels, native milestones, task issues and associations before implementation. Complete one executable task per commit with its result, evidence and initial completion checkbox; publish/read back before advancing. Milestone/phase code review is separate from test execution. Integrate coherent verified boundaries explicitly and publish the checked target. Release or deployment needs its own selected scope.

## Authority

The accepted project brief and human-commanded modern feature define this complete scope. SPEC owns seven-bag, Hold, Ghost, kicks, drop and timing policy; no gameplay behavior is imported implicitly from another Tetris implementation. Canonical documents and current QC govern development; closed campaign records retain historical evidence.
