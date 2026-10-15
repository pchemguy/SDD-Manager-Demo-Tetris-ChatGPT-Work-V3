# Architecture

## Context and approach

Implement the accepted [PROJECT](PROJECT.md) as a static browser application written in TypeScript. Keep gameplay rules independent of browser APIs, and use a small session coordinator to connect them to keyboard input, elapsed time, and presentation. All game data stays in memory for the current page session; there is no backend or required persistent storage.

Use ordinary TypeScript modules, HTML, and CSS, with a Canvas 2D playfield and next-piece preview. Use semantic HTML for scores, game status, controls, and keyboard instructions. This division keeps cell drawing straightforward while retaining browser-native buttons and readable text outside the canvas.

## Major blocks and ownership

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Gameplay core | Own board and piece rules, legal transitions, locking, clearing, scoring, progression, and game-over decisions. Define the canonical game-state shape and preserve its invariants. | TypeScript language facilities and explicitly supplied inputs; no DOM, canvas, browser clock, or storage. |
| Session coordinator | Retain the current game-state snapshot, serialize player actions and time updates, manage lifecycle scheduling, and request presentation after transitions. | Gameplay core and narrow input, clock, randomness, and presentation contracts. |
| Presentation | Read snapshots to draw the board and preview and update HTML status and controls. Report user control actions through the coordinator's input boundary. | Read-only state/view contracts and browser rendering APIs; no rule implementation or direct state mutation. |
| Browser adapters and composition | Translate keyboard and button events into semantic actions, supply elapsed time and randomness, and construct/dispose the application wiring. | Browser APIs and coordinator contracts. Composition may import all blocks to assemble them. |

The core defines valid game state; the coordinator holds the single live snapshot and replaces it through core transitions. Presentation derives its display from that snapshot rather than maintaining a second gameplay model. Timing accumulators and held-input bookkeeping are coordinator state, separate from board and scoring state.

## Dependency direction and execution

Browser events enter through adapters, which deliver semantic actions to the coordinator. The coordinator orders those actions and elapsed-time updates, invokes the core, retains the resulting snapshot, and asks presentation to display it. Presentation never invokes gameplay rules to predict a different state.

Use one animation-frame scheduling chain for an active session. The browser adapter supplies monotonic elapsed time; the coordinator converts that into logical updates under the eventual SPEC timing contract. Rendering cadence does not define gravity speed. Pause, resume, restart, focus loss, and disposal clear or rebase applicable timing and input state so a suspended page does not produce accidental catch-up gameplay. Exact focus and long-frame behavior remain SPEC decisions.

Randomness is an explicit collaborator rather than an implicit global call in gameplay rules. Production supplies random draws through the composition boundary; tests supply controlled draws. Given the same initial state, action/time sequence, and draw sequence, the game must produce the same results. This does not select seven-bag randomization or another piece-distribution policy.

## Architectural invariants

- Only core transitions change board occupancy, active/next pieces, score, progression, or terminal game state.
- Rendering and input handlers cannot mutate the retained game snapshot directly.
- Core transitions preserve legal placement and board bounds; rejected player actions leave the relevant gameplay state coherent.
- Start/restart creates fresh session state, and disposal removes event listeners and scheduling callbacks owned by that session.
- Browser facilities are kept at the outer boundary, enabling core verification without launching a browser.
- Gameplay and presentation are limited to the accepted classic scope. No dormant Hold, Ghost, wall-kick, Hard-drop, or seven-bag machinery is required.

## Alternatives and tradeoffs

A DOM-cell board would make each cell individually inspectable but couple rendering to a larger element grid. Canvas keeps board drawing compact; the tradeoff is that controls and meaningful textual status must remain in HTML, and browser tests must assess visual output as well as the underlying state.

A UI framework could manage presentation updates but would add a runtime and lifecycle abstraction without a demonstrated need in this game. Plain modules are sufficient. A single monolithic game script would reduce initial wiring but mix timing, input, rules, and rendering, making deterministic tests and later changes harder.

Use direct module collaboration rather than a general event bus, dependency-injection framework, or plugin system. Introduce only boundaries required by the current game and its verification.

## Verification and downstream ownership

Verify core rules and transitions with deterministic automated tests. Verify coordinator ordering and lifecycle with controlled clocks, input, and random draws. Browser checks cover real keyboard/button interactions, canvas rendering, HTML status, pause/restart, and browser lifecycle wiring. Passing core tests alone does not establish browser acceptance.

DECOMPOSITION will define detailed logical responsibilities and collaborations after architecture acceptance; that document is not yet authored. SPEC will establish exact rules, controls, timing, compatibility targets, and acceptance scenarios. PLAN and layout will own delivery order, tooling allocation, and physical paths. No implementation or dependency installation is part of this architecture checkpoint.
