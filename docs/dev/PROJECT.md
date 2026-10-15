# Browser Tetris

## Purpose

Develop a classic browser-based Tetris game for individual players. The project also demonstrates staged specification-driven development with SDD Manager; the game should be usable without knowledge of that development process.

## Intended outcome and scope

Deliver a complete single-player game with keyboard controls and a readable playfield and status display. The selected classic core includes:

- Falling tetrominoes, horizontal movement, rotation, gravity, and collision handling.
- Piece locking, completed-line clearing, and game-over detection.
- Scoring and increasing falling speed as play progresses.
- A next-piece preview.
- Pause, resume, and restart controls.

Hold, Ghost piece, seven-bag randomization, wall kicks, and Hard drop are outside the selected scope. Any later expansion requires an explicit scope decision.

## Proposed constraints and non-goals

The proposed implementation uses TypeScript and runs entirely in a desktop browser, with no backend or account requirement. Keyboard play is the initial interaction target. Multiplayer, online leaderboards, and mobile touch controls are proposed non-goals.

Favor a small, understandable implementation with independently testable gameplay rules and a clear separation from browser input and rendering. Exact architecture, tooling, rendering technology, and browser compatibility targets belong to subsequent design and specification decisions.

## Development and delivery

Use SDD Manager's main development workflow, with human review of each necessary preparation document before dependent work. Delivery phases and executable tasks will be derived after the design and behavioral contracts are accepted.

GitHub tracking is explicitly requested: eligible phases require verified phase labels, native milestones, task issues, and issue-to-phase and issue-to-milestone associations before implementation. Complete one executable task per commit, including its initial completion checkbox, and push each workflow-owned commit before advancing.

## Decision state

The user selected the classic-core gameplay scope. TypeScript, desktop keyboard focus, backend-free operation, and the proposed non-goals are presented for confirmation through this brief's review. The demonstration purpose follows the conversation context and is also subject to review.

Board dimensions, rotation and locking rules, randomization, scoring, progression, controls, and timing remain to be specified. This brief does not establish a lock-delay policy or import gameplay decisions from other Tetris repositories.

No application code has been implemented. PROJECT acceptance is pending; architecture must wait for that decision.
