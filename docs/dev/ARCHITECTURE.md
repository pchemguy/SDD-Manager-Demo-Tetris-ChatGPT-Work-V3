# Architecture

## Context and approach

Implement the accepted [PROJECT](PROJECT.md) as a static browser application written in TypeScript. Keep gameplay rules independent of browser APIs, and use a small session coordinator to connect them to keyboard input, elapsed time, and presentation. All game data stays in memory for the current page session; there is no backend or required persistent storage.

Use ordinary TypeScript modules, HTML, and CSS, with a Canvas 2D playfield, next-piece and Hold previews. Use semantic HTML for scores, game status, controls, and keyboard instructions. This division keeps cell drawing straightforward while retaining browser-native buttons and readable text outside the canvas.

## Major blocks and ownership

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Gameplay core | Own board and piece rules, legal transitions, bag selection, Hold, landing, kicks, delayed locking, clearing, scoring, progression, and game-over decisions. Define the canonical game-state shape and preserve its invariants. | TypeScript language facilities and explicitly supplied inputs; no DOM, canvas, browser clock, or storage. |
| Session coordinator | Retain the current game-state snapshot, serialize player actions and time updates, manage lifecycle scheduling, and request presentation after transitions. | Gameplay core and narrow input, clock, randomness, and presentation contracts. |
| Presentation | Read snapshots to draw the board, Ghost and previews and update HTML status and controls. Report user control actions through the coordinator's input boundary. | Read-only state/view contracts and browser rendering APIs; no rule implementation or direct state mutation. |
| Browser adapters and composition | Translate keyboard and button events into semantic actions, supply elapsed time and randomness, and construct/dispose the application wiring. | Browser APIs and coordinator contracts. Composition may import all blocks to assemble them. |

The core defines valid game state; the coordinator holds the single live snapshot and replaces it through core transitions. Presentation derives its display from that snapshot rather than maintaining a second gameplay model. Scheduling timestamps and held-input bookkeeping are coordinator state. Logical timing state required by gameplay rules belongs to the core snapshot; neither renderer owns timing decisions.

## Dependency direction and execution

Browser events enter through adapters, which deliver semantic actions to the coordinator. The coordinator orders those actions and elapsed-time updates, invokes the core, retains the resulting snapshot, and asks presentation to display it. Presentation may call pure geometry/landing queries to derive pixels; it never invokes state-changing transitions or maintains an alternative gameplay state.

Use one animation-frame scheduling chain for an active session. The browser adapter supplies monotonic elapsed time; the coordinator converts that into logical updates under the SPEC timing contract. Rendering cadence does not define gravity speed. Pause, resume, restart, focus loss, and disposal clear or rebase applicable timing and input state so a suspended page does not produce accidental catch-up gameplay. SPEC defines focus, long-frame and grounded-delay behavior. Successful Hold clears applicable held input and rebases scheduling through the existing adapter boundary.

Randomness is an explicit collaborator rather than an implicit global call in gameplay rules. Production supplies random draws through the composition boundary; tests supply controlled draws. Given the same initial state, action/time sequence, and draw sequence, the game must produce the same results. The core owns the seven-bag remainder in its snapshot; the browser source supplies uniform draws without owning distribution state.

## Architectural invariants

- Only core transitions change board occupancy, active/next/held pieces, bag remainder, score, progression, or terminal game state.
- Rendering and input handlers cannot mutate the retained game snapshot directly.
- Core transitions preserve legal placement and board bounds; rejected player actions leave the relevant gameplay state coherent.
- Start/restart creates fresh session state, and disposal removes event listeners and scheduling callbacks owned by that session.
- Browser facilities are kept at the outer boundary, enabling core verification without launching a browser.
- Gameplay and presentation implement the complete selected scope in PROJECT/SPEC; shared pure landing prevents Ghost and Hard drop from diverging.

## Alternatives and tradeoffs

A DOM-cell board would make each cell individually inspectable but couple rendering to a larger element grid. Canvas keeps board drawing compact; the tradeoff is that controls and meaningful textual status must remain in HTML, and browser tests must assess visual output as well as the underlying state.

A UI framework could manage presentation updates but would add a runtime and lifecycle abstraction without a demonstrated need in this game. Plain modules are sufficient. A single monolithic game script would reduce initial wiring but mix timing, input, rules, and rendering, making deterministic tests and later changes harder.

Use direct module collaboration rather than a general event bus, dependency-injection framework, or plugin system. Introduce only boundaries required by the current game and its verification.

## Verification and downstream ownership

Verify core rules and transitions with deterministic automated tests. Verify coordinator ordering and lifecycle with controlled clocks, input, and random draws. Browser checks cover real keyboard/button interactions, canvas rendering, HTML status, pause/restart, and browser lifecycle wiring. Passing core tests alone does not establish browser acceptance.

[DECOMPOSITION](DECOMPOSITION.md) refines logical responsibilities. [SPEC](SPEC.md) establishes exact rules and acceptance; PLAN/layout own delivery and physical paths. Modern mechanics fit the existing owners without a new subsystem or runtime dependency.

## Review state

The user accepted ARCHITECTURE as presented at commit `89e8144dccfc0ad712898b346d3581439ab8cf65`. The human-commanded modern feature reuses these boundaries and pre-approves its document checkpoints; exact behavior remains owned by SPEC.
