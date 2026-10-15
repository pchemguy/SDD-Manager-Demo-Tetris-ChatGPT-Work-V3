# Modern enhancements feature specification

## Scope and authority

Campaign `002_d708792` adds Hold, Ghost, seven-bag generation, ordered wall kicks and Hard drop, and replaces immediate locking with one full normal gravity interval of grounded delay. The human pre-approved document checkpoints and autonomous execution on 2026-10-15. This delta revises main SPEC B2/B3/B5–B8; unchanged board dimensions, geometry squares, spawn origins, score/progression, native lifecycle/fatal boundaries and static delivery remain governing. No hidden rows, persistence, touch, multiplayer, spin/combo/drop bonuses, 180-degree rotation or configuration panel is added.

Main architecture/decomposition are reused: Game owns bag remainder, hold identity/use and lock elapsed time; pure geometry owns kick candidates; board legality/landing is shared by Ghost and Hard drop; views remain read-only and consume no draws. No structural feature design overlay is necessary.

## F1: Seven-bag succession

Each consecutive group of seven consumed identities contains I/O/T/S/Z/J/L exactly once. Choose uniformly without replacement from the remaining ordered list, starting from the canonical main SPEC order when empty: index floor(u * remaining.length), remove that identity, retain the others in order. One valid finite draw in [0,1) is consumed per selected identity, including the final forced identity. This lazy shuffle is a uniform permutation and preserves deterministic explicit draw injection and atomic transitions. Bag remainder is canonical snapshot state; no mutable external generator owns it.

Ready consumes no draws and has an empty remainder. Start/restart selects active then preview (two draws). A lock promotes preview and selects one replacement (including blocked spawn); the next seven selections start a fresh bag. Consecutive identical identities are possible only across bag boundaries. Rendering and rejected actions consume none. Restart discards the prior remainder. Active and preview need not be distinct when spanning a bag boundary.

## F2: Grounded locking delay

A piece is grounded exactly when its current placement is legal but one row lower is illegal. Grounding starts lock elapsed time at zero immediately on contact, including spawn, downward movement, a successful lateral/rotation move onto support or Hard drop. A failed downward attempt never itself settles the piece. While continuously grounded, elapsed running time accumulates to the current level's normal gravity interval max(100, 1000 * 0.8 ** (level - 1)); reaching the exact boundary locks once.

Soft drop does not shorten this interval. Grounded movement/rotation, repeated down attempts, soft-drop press/release and Hard drop while already grounded preserve accrued lock time. A move/kick that becomes airborne clears lock elapsed time and fall time; later contact starts a fresh full delay. There is no grounded move-reset bonus or reset counter. Pause preserves lock and fall time; restart, hold replacement, disposal and promoted pieces clear appropriate timing/held state. Known movement actions remain ignored outside running.

During a time update, spend elapsed time in chronological order: falling steps until contact, then grounded delay using only the remaining time after contact. Stop immediately after one lock and discard all remaining update time. Do not charge pre-contact time to the lock timer. Horizontal repeats run before this chronological falling/locking update as before. Browser clamping/baseline behavior is unchanged.

## F3: Landing and Hard drop

The landing projection is the greatest y reachable by legal one-row steps downward from the active piece's current position without passing through occupied cells. It preserves identity/x/orientation. Hard drop moves the active piece to that projection immediately, awards no points, consumes no draws, does not settle/clear/promote, and follows F2's delay. First contact starts at zero; an already-grounded piece retains its existing timer. Hard drop is ignored outside running. The landing operation is pure and shared with Ghost to prevent divergent collision rules.

## F4: Hold

Ready/start/restart have an empty hold slot and available Hold. A running piece can be held once until it locks. With an empty slot, store its identity, promote preview and select one replacement from the bag. With an occupied slot, swap identities without changing preview/bag or consuming a draw. In both cases the incoming piece uses its initial orientation and canonical spawn origin; clear fall/lock/soft/held-repeat state. A blocked incoming spawn enters game over with active null and the settled board/score visible; selection is still consumed for empty-slot Hold. Repeated Hold before lock is a no-op. A completed lock makes Hold available for the new active piece. Hold does not score or settle. Pause/game-over/ready ignore Hold.

## F5: Ghost and presentation

While active exists, derive the exact F3 landing each render and show a distinct low-contrast outline behind the active piece; draw active last. Do not obscure settled cells or add ghost cells to state. Suppress the ghost when its occupied cells coincide with the active piece. Preserve active/ghost/held/next during pause, hide ghost when no active exists, and show held identity in initial orientation in a named Hold canvas. Empty Hold is visibly empty; HTML indicates whether Hold is available or already used. Rendering consumes no random draws and changes no snapshot fields. Layout remains readable at 800x600 with vertical scrolling permitted.

## F6: Wall kicks

Keep existing local geometry, orientation numbering 0/R/2/L = 0/1/2/3 and clockwise/counterclockwise transforms. Try the following SRS quarter-turn offsets in listed order, relative to the original origin after rotation. All pairs below use board coordinates: x right, y down. Commit the first completely legal candidate; reject atomically if none fits. O has only (0,0) and no visible rotation. No 180-degree input, hidden rows or upward-out-of-board occupancy is allowed. These are explicit project tables, not a claim of full Guideline certification.

| Transition | J/L/S/T/Z offsets | I offsets |
| --- | --- | --- |
| 0→R | (0,0),(-1,0),(-1,-1),(0,2),(-1,2) | (0,0),(-2,0),(1,0),(-2,1),(1,-2) |
| R→0 | (0,0),(1,0),(1,1),(0,-2),(1,-2) | (0,0),(2,0),(-1,0),(2,-1),(-1,2) |
| R→2 | (0,0),(1,0),(1,1),(0,-2),(1,-2) | (0,0),(-1,0),(2,0),(-1,-2),(2,1) |
| 2→R | (0,0),(-1,0),(-1,-1),(0,2),(-1,2) | (0,0),(1,0),(-2,0),(1,2),(-2,-1) |
| 2→L | (0,0),(1,0),(1,-1),(0,2),(1,2) | (0,0),(2,0),(-1,0),(2,-1),(-1,2) |
| L→2 | (0,0),(-1,0),(-1,1),(0,-2),(-1,-2) | (0,0),(-2,0),(1,0),(-2,1),(1,-2) |
| L→0 | (0,0),(-1,0),(-1,1),(0,-2),(-1,-2) | (0,0),(1,0),(-2,0),(1,2),(-2,-1) |
| 0→L | (0,0),(1,0),(1,-1),(0,2),(1,2) | (0,0),(-1,0),(2,0),(-1,-2),(2,1) |

The numerical offset/sign convention was cross-checked against a [published primary implementation](https://github.com/sen-ltd/tetris/blob/main/pieces.js); this project's explicit table governs tests and implementation. No foreign source code is incorporated.

## F7: Controls

Keep Left/Right, Down, Z, X/Space, P and native Start/Pause/Resume/Restart. Add C (case insensitive) for Hold and Enter for Hard drop, only while the playfield is focused. Each new key acts only on a fresh press; recognized repeats prevent default but dispatch nothing. Typing in editable fields and native button activation remain independent. Hold resets input-repeat ownership and rebases the clock only when accepted; Hard drop preserves held movement policy and does not create a second frame chain.

## F8: Failure and acceptance

Validate new bag remainder (legal unique dense identities, at most six after selection), held identity/null, Hold-use boolean and finite nonnegative lock time before committing transitions. Inactive ready state has no bag/hold/use/lock residue; airborne snapshots must have zero lock time. Invalid selection, malformed new fields, illegal kicked placement or projection and score overflow preserve input state. Browser initialization validates required Hold markup/Canvas and routes failures through existing fatal stop/reload behavior.

Acceptance requires deterministic multi-bag/no-replacement and draw-count checks; exact delayed-lock boundaries at multiple levels, soft drop, pause, movement and Hard drop; hold empty/swap/reuse/blocked/restart paths; independent landing/ghost pixels; all eight transitions per kick family with wall/floor/obstacle/order/rejection evidence; keyboard/focus/repeat/typing and fatal/resource regressions; Chromium/Firefox/WebKit integration and actual static assets. Report exact versions/counts/skips and environment limits. Old immediate-lock/independent-draw/no-kick tests must be replaced against these declared changed contracts, not silently skipped. Main documents are incorporated only after verified feature delivery.
