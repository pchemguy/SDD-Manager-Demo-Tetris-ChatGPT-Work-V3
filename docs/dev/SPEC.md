# Behavioral specification

## Scope and status

Specify the complete game in [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md). B1–B8 define shared contracts; F1–F8 identify modern mechanics within those owners. The human accepted initial preparation and pre-approved the modern feature's document checkpoints. Current acceptance evidence is in the [modern phase report](features/002_d708792-modern-enhancements/PHASE-REPORT.md).

Multiplayer, leaderboards, accounts, persistence, touch controls, hidden rows, 180-degree rotation, spin/combo/drop bonuses and a configuration panel are outside scope.

## B1: Board and placement

The board has 10 columns and 20 visible rows. Coordinates increase rightward and downward, with top-left cell `(0, 0)`. A cell is empty or contains one settled tetromino identity. There are no hidden rows. An active piece is represented separately from settled cells.

A placement is legal exactly when every occupied piece cell lies inside the board and overlaps no settled cell. Empty padding in a piece's rotation square does not affect legality. Rejected horizontal moves and rotations leave board, piece, score, next piece, and timing unchanged. Piece coordinates are integral. Settling is atomic and never overwrites an occupied cell.

## B2: Pieces, spawn, rotation, and draws

The seven identities and initial local cells are defined below. Clockwise rotation maps `(x, y)` to `(n - 1 - y, x)` within the stated square; counterclockwise maps to `(y, n - 1 - x)`. O does not change on rotation. Four clockwise or counterclockwise rotations restore the initial geometry.

| Identity | Square size n | Initial occupied local cells |
| --- | --- | --- |
| I | 4 | (0,1), (1,1), (2,1), (3,1) |
| O | 2 | (0,0), (1,0), (0,1), (1,1) |
| T | 3 | (1,0), (0,1), (1,1), (2,1) |
| S | 3 | (1,0), (2,0), (0,1), (1,1) |
| Z | 3 | (0,0), (1,0), (1,1), (2,1) |
| J | 3 | (0,0), (0,1), (1,1), (2,1) |
| L | 3 | (2,0), (0,1), (1,1), (2,1) |

Spawn at square origin `(floor((10 - n) / 2), 0)` in the initial orientation. Quarter-turn rotation retains that origin for the first candidate, then tries F6's translations.

### F1: Seven-bag succession

Each consecutive group of seven consumed identities contains I/O/T/S/Z/J/L exactly once. Choose uniformly without replacement from the remaining ordered list, starting from the canonical order [I, O, T, S, Z, J, L] when empty: index floor(u * remaining.length), remove that identity, retain the others in order. One valid finite draw in [0,1) is consumed per selected identity, including the final forced identity. This lazy shuffle is a uniform permutation and preserves deterministic explicit draw injection and atomic transitions. Bag remainder is canonical snapshot state; no mutable external generator owns it.

Ready consumes no draws and has an empty remainder. Start/restart selects active then preview (two draws). A lock promotes preview and selects one replacement (including blocked spawn); the next seven selections start a fresh bag. Consecutive identical identities are possible only across bag boundaries. Rendering and rejected actions consume none. Restart discards the prior remainder. Active and preview need not be distinct when spanning a bag boundary.

### F6: Wall kicks

Use the local geometry above, orientation numbering 0/R/2/L = 0/1/2/3 and clockwise/counterclockwise transforms. Try the following SRS quarter-turn offsets in listed order, relative to the original origin after rotation. All pairs below use board coordinates: x right, y down. Commit the first completely legal candidate; reject atomically if none fits. O has only (0,0) and no visible rotation. No 180-degree input, hidden rows or upward-out-of-board occupancy is allowed. These are explicit project tables, not a claim of full Guideline certification.

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

## B3: Falling, locking, and clearing

A successful downward attempt advances one row. A rejected downward attempt leaves placement unchanged; elapsed continuous support determines locking.

### F2: Grounded locking delay

A piece is grounded exactly when its current placement is legal but one row lower is illegal. Grounding starts lock elapsed time at zero immediately on contact, including spawn, downward movement, a successful lateral/rotation move onto support or Hard drop. A failed downward attempt never itself settles the piece. While continuously grounded, elapsed running time accumulates to the current level's normal gravity interval max(100, 1000 * 0.8 ** (level - 1)); reaching the exact boundary locks once.

Soft drop does not shorten this interval. Grounded movement/rotation, repeated down attempts, soft-drop press/release and Hard drop while already grounded preserve accrued lock time. A move/kick that becomes airborne clears lock elapsed time and fall time; later contact starts a fresh full delay. There is no grounded move-reset bonus or reset counter. Pause preserves lock and fall time; restart, hold replacement, disposal and promoted pieces clear appropriate timing/held state. Known movement actions remain ignored outside running.

During a time update, spend elapsed time in chronological order: falling steps until contact, then grounded delay using only the remaining time after contact. Stop immediately after one lock and discard all remaining update time. Do not charge pre-contact time to the lock timer. Horizontal repeats run before this chronological falling/locking update. B5 defines browser clamping and baseline behavior.

### F3: Landing and Hard drop

The landing projection is the greatest y reachable by legal one-row steps downward from the active piece's current position without passing through occupied cells. It preserves identity/x/orientation. Hard drop moves the active piece to that projection immediately, awards no points, consumes no draws, does not settle/clear/promote, and follows F2's delay. First contact starts at zero; an already-grounded piece retains its existing timer. Hard drop is ignored outside running. The landing operation is pure and shared with Ghost to prevent divergent collision rules.

### F4: Hold

Ready/start/restart have an empty hold slot and an unused Hold allowance; Hold accepts actions only while running. A running piece can be held once until it locks. With an empty slot, store its identity, promote preview and select one replacement from the bag. With an occupied slot, swap identities without changing preview/bag or consuming a draw. In both cases the incoming piece uses its initial orientation and canonical spawn origin; clear fall/lock/soft/held-repeat state. A blocked incoming spawn enters game over with active null and the settled board/score visible; selection is still consumed for empty-slot Hold. Repeated Hold before lock is a no-op. A completed lock makes Hold available for the new active piece. Hold does not score or settle. Pause/game-over/ready ignore Hold.

### Settlement and clearing

After lock, find all full rows and remove them simultaneously, shift remaining rows downward without changing their relative order, and insert empty rows at the top. Apply the clear reward and progression, then promote the preview and replenish it as B2 specifies. If the promoted piece's spawn cells are illegal, enter game over. Existing board and final score remain visible; the failed piece is not settled or rendered over occupied cells. A lock with no cleared rows awards no score.

## B4: Scoring and progression

Start at score 0, cleared lines 0, and level 1. A clear of 1/2/3/4 rows awards 100/300/500/800 points multiplied by the level immediately before that clear. Soft and Hard drop award no additional points. Total cleared lines accumulate; level equals `1 + floor(totalLines / 10)` after each clear.

The gravity interval is `max(100, 1000 * 0.8 ** (level - 1))` milliseconds, without intermediate rounding. A lock resets accumulated fall time; its promoted piece uses the updated level's interval. Score, line count, and level are nonnegative safe integers, with level at least 1. No combo, back-to-back, spin, or bonus scoring applies.

## B5: Time and held input

The core accumulates nonnegative elapsed milliseconds only while running. Spend time chronologically: airborne falling steps use the current falling interval; after contact only the remaining time accumulates toward F2's normal-gravity lock deadline. Stop processing elapsed time immediately when a piece locks, and discard the update's remaining elapsed time so one time update cannot cascade through newly spawned pieces.

The normal falling interval is B4's gravity interval. While Down is held, it is 50 ms. A fresh Down press attempts one downward move immediately and resets accumulated fall time. Releasing Down resets accumulated fall time and restores normal gravity. Each successful timed downward move preserves only the unconsumed remainder; rejected horizontal movement and rotation never reset falling time.

Left/Right presses each attempt one immediate horizontal move. A held direction repeats after 150 ms and every 50 ms thereafter, independently of operating-system key repeat. If both directions are held, the most recently pressed direction wins; releasing it activates the remaining direction with a fresh 150 ms repeat delay and no immediate move. At a frame update, process due horizontal repeats before advancing core falling time. Horizontal repeats cannot lock a piece. Z/X, Space, C, Enter and P act only on fresh presses; ignore browser-generated repeat events for all mapped keys.

Browser input events are delivered in event-loop order; each callback completes its state update before the next. The first animation frame after start/resume establishes its timestamp baseline and contributes no elapsed time. Clamp subsequent frame deltas to `[0, 250]` ms and discard excess; negative deltas contribute zero. Therefore long stalls may slow game time but cannot trigger unbounded catch-up. Restart, pause, resume, focus loss, and disposal clear held-input/repeat state and rebase scheduling; pause/resume preserves the core's accumulated fall and lock time. Accepted Hold clears held/repeat state and rebases the clock; rejected Hold does neither. The clamp is a browser-boundary policy; deterministic core tests may deliver larger finite deltas directly.

## B6: Controls and lifecycle

| Input | Action |
| --- | --- |
| Left / Right arrows | Move or hold horizontal direction under B5. |
| Down arrow | Soft drop under B3/B5. |
| Z | Counterclockwise rotation. |
| X / Space | Clockwise rotation. |
| C | Hold/swap once until a lock under F4. |
| Enter | Hard drop under F3, followed by F2 delayed locking. |
| P | Toggle pause/resume while running or paused. |
| Start button | Start from ready state. |
| Pause / Resume button | Pause or resume the current session. |
| Restart button | Start a fresh running game from running, paused, or game-over state. |

Initial ready state shows an empty board, next preview and Hold slot, zero score/lines, level 1, controls, and instructions; no piece draws or gameplay occur before Start. Start is enabled only in ready. Pause/Resume is enabled only while running or paused. Restart is enabled after the first start. Running, paused, game-over, and error states have visible textual labels.

Paused and game-over sessions ignore movement, rotation, Hold and Hard drop and do not advance game time. Losing window focus or becoming hidden pauses a running game; returning focus/visibility does not automatically resume it. Multiple blur/visibility notifications are idempotent. Recognized gameplay keys prevent browser scrolling while the game surface is focused. The game surface receives focus on Start, Restart, and Resume; ordinary button focus and Tab navigation remain usable. Key handlers do not intercept typing in editable fields or unrelated page controls. Letter mappings are case-insensitive. Known lifecycle actions outside their applicable states are no-ops: Start applies only in ready, Pause/Resume only in running/paused, and Restart only after the first start. Browser-dispatched synthetic events are valid test inputs, not a production gameplay requirement.

Restart resets board, active/next/held pieces, bag remainder, Hold-use state, score, lines, level, timing and held input. There is at most one active scheduling chain and one owned set of listeners. Disposal cancels callbacks, unregisters listeners, and makes further notifications inert; rebuilding the application does not duplicate event handling.

### F7: Control ownership

B6 mappings apply only while the playfield is focused; native Start/Pause/Resume/Restart remain independent. Each new key acts only on a fresh press; recognized repeats prevent default but dispatch nothing. Typing in editable fields and native button activation remain independent. Hold resets input-repeat ownership and rebases the clock only when accepted; Hard drop preserves held movement policy and does not create a second frame chain.

## B7: Presentation and usability

Render all 200 board cells and the active piece in their legal positions, with visible settled/empty boundaries and distinct piece colors. The next-piece preview shows the exact stored next identity in its initial orientation. Display F5's Ghost and Hold panel. Every completed state update is reflected by the next rendered frame; a rendering pass does not change game state or consume draws.

HTML displays score, total cleared lines, level, lifecycle status, and the B6 keyboard instructions. Controls use native buttons with accessible names and visible keyboard focus. Paused, game-over, and fatal-error messages are textual, not color-only. The canvas has an accessible name and concise fallback description; cell-by-cell screen-reader gameplay is outside scope. The board and controls remain usable at a desktop viewport of 800 × 600 CSS pixels with page scrolling allowed; canvas resizing does not change board coordinates or gameplay.

### F5: Ghost and presentation

While active exists, derive the exact F3 landing each render and show a distinct low-contrast outline behind the active piece; draw active last. Do not obscure settled cells or add ghost cells to state. Suppress the ghost when its occupied cells coincide with the active piece. Preserve active/ghost/held/next during pause, hide ghost when no active exists, and show held identity in initial orientation in a named Hold canvas. Empty Hold is visibly empty; HTML indicates whether Hold is available or already used. Rendering consumes no random draws and changes no snapshot fields. Layout remains readable at 800x600 with vertical scrolling permitted.

## B8: Platform, resources, and failures

The delivered build is static HTML/CSS/JavaScript compiled from TypeScript and needs no backend, account, third-party runtime service, cookie, local storage, or network request after its own assets load. It runs through an ordinary HTTP static server. File-URL launching is not required. Runtime compatibility targets desktop Chromium, Firefox, and WebKit engines supporting Canvas 2D, ES modules, keyboard events, and animation frames; implementation verification records the exact tested engine versions and limitations rather than claiming untested browser certification.

Invalid core inputs, including out-of-range/nonfinite draws, nonfinite or negative elapsed time, unknown actions, or structurally invalid initial state, fail explicitly before committing a state transition. Expected illegal placement attempts remain ordinary rejected outcomes. Missing required DOM elements, unavailable Canvas 2D, or unexpected transition/render failures stop the application's scheduling and input processing and display a concise reload instruction in an HTML error region; if required markup is missing, create a minimal text error element in the document body. Record a diagnostic in the developer console without credentials or unrelated page content. No automatic retry, silent state repair, or partial score/board update is allowed. Reload resets all in-memory state.

### F8: Modern state validity

Validate new bag remainder (legal unique dense identities, at most six after selection), held identity/null, Hold-use boolean and finite nonnegative lock time before committing transitions. Inactive ready state has no bag/hold/use/lock residue; airborne snapshots must have zero lock time. Invalid selection, malformed new fields, illegal kicked placement or projection and score overflow preserve input state. Browser initialization validates required Hold markup/Canvas and routes failures through existing fatal stop/reload behavior.

## Contract ownership and acceptance

| Contract | Responsible decomposition components | Required observable evidence |
| --- | --- | --- |
| B1–B3 | Geometry, board operations, game transitions, random source | Every piece spawns/rotates as defined; edge/overlap rejection is atomic; F2 contact delay locks independently of falling speed; simultaneous clears compact correctly; blocked spawn ends play. |
| B4 | Scoring/progression policy and transitions | Verify all four clear rewards, a clear crossing 10 lines using the pre-clear multiplier, unchanged score on a zero-line lock, and the 100 ms gravity floor. |
| B5 | Game transitions, coordinator, clock and input adapters | Verify exact interval boundaries, partial accumulated time, held input/release, opposing arrows, update ordering, no post-lock cascade, long-frame clamp, and pause/resume timing. |
| B6 | Coordinator, input/clock adapters, HTML view, composition | Start, pause, explicit resume, restart, game over, focus-loss pause, keyboard/button focus, disposal, and repeated lifecycle operations behave as specified without duplicate loops/listeners. |
| B7 | Canvas/HTML views | Browser inspection and representative snapshots show correct board/next/Hold/Ghost/status, usable controls at the required viewport, and no unsupported feature UI. |
| B8 | All core entry boundaries and browser composition | Explicit invalid-input outcomes preserve state; missing-element/canvas and unexpected-failure scenarios stop processing and show reload guidance; static build works without a backend. |

Acceptance requires deterministic automated rule/coordinator checks plus browser integration and visual/usability evidence for the relevant rows. Core test success alone does not prove rendering, focus, or browser compatibility. The same initial state, action/time sequence, and draw sequence must produce identical gameplay outcomes. Modern acceptance additionally covers F1 bag permutations/draw counts, F2 exact multi-level contact boundaries, F3 shared landing/drop purity, F4 empty/swap/blocked/reuse/reset Hold, F5 outline/overlap/inactive rendering, all eight transitions for each F6 kick family including order/rejection/support timing, F7 native focus/default/repeat/typing and F8 malformed state/resource failures. Exact engine versions, counts/skips and limits belong to retained implementation evidence.
