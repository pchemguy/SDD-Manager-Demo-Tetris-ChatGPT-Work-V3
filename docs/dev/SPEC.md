# Behavioral specification

## Scope and status

Specify the complete classic-core game defined by accepted [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), and [DECOMPOSITION](DECOMPOSITION.md). The user accepted the gameplay defaults in conversation on 2026-10-15. The precise contracts below elaborate those defaults and await this document's human review; they are intended requirements, not implemented or verified behavior.

Hold, Ghost piece, seven-bag randomization, wall kicks, Hard drop, multiplayer, online leaderboards, accounts, persistence, and touch controls are outside scope.

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

Spawn at square origin `(floor((10 - n) / 2), 0)` in the initial orientation. Rotation keeps that square origin; there is no translation adjustment. If the candidate rotated cells are illegal, reject the rotation.

Map independent draws `u` in `[0, 1)` to `[I, O, T, S, Z, J, L][floor(7 * u)]`. Consecutive identical pieces are permitted. Start/restart consumes two draws: active piece, then next piece. A completed lock consumes the preview as the next active piece and one draw to replenish the preview. This also applies if that active piece cannot spawn. View drawing, rejected actions, and pause/resume consume no additional random draws. Tests may supply controlled draws; production supplies an independent uniform random source.

## B3: Falling, locking, and clearing

A successful downward attempt advances the active piece by exactly one row. A failed downward attempt immediately locks the piece; there is no separate lock delay, contact timer, or movement-reset allowance. Merely reaching a supported position does not lock until a downward attempt fails. Gravity and soft drop use this same rule.

After lock, find all full rows and remove them simultaneously, shift remaining rows downward without changing their relative order, and insert empty rows at the top. Apply the clear reward and progression, then promote the preview and replenish it as B2 specifies. If the promoted piece's spawn cells are illegal, enter game over. Existing board and final score remain visible; the failed piece is not settled or rendered over occupied cells. A lock with no cleared rows awards no score.

## B4: Scoring and progression

Start at score 0, cleared lines 0, and level 1. A clear of 1/2/3/4 rows awards 100/300/500/800 points multiplied by the level immediately before that clear. Soft-drop movement awards no additional points. Total cleared lines accumulate; level equals `1 + floor(totalLines / 10)` after each clear.

The gravity interval is `max(100, 1000 * 0.8 ** (level - 1))` milliseconds, without intermediate rounding. A lock resets accumulated fall time; its promoted piece uses the updated level's interval. Score, line count, and level are nonnegative safe integers, with level at least 1. No combo, back-to-back, spin, or bonus scoring applies.

## B5: Time and held input

The core accumulates nonnegative elapsed milliseconds only while running. At each update, subtract the current falling interval and attempt one downward move for every complete interval available. Stop processing elapsed time immediately when a piece locks, and discard the update's remaining elapsed time so one time update cannot cascade through newly spawned pieces.

The normal falling interval is B4's gravity interval. While Down is held, it is 50 ms. A fresh Down press attempts one downward move immediately and resets accumulated fall time. Releasing Down resets accumulated fall time and restores normal gravity. Each successful timed downward move preserves only the unconsumed remainder; rejected horizontal movement and rotation never reset falling time.

Left/Right presses each attempt one immediate horizontal move. A held direction repeats after 150 ms and every 50 ms thereafter, independently of operating-system key repeat. If both directions are held, the most recently pressed direction wins; releasing it activates the remaining direction with a fresh 150 ms repeat delay and no immediate move. At a frame update, process due horizontal repeats before advancing core falling time. Horizontal repeats cannot lock a piece. Z/X and P act only on fresh presses; ignore browser-generated repeat events for all mapped keys.

Browser input events are delivered in event-loop order; each callback completes its state update before the next. The first animation frame after start/resume establishes its timestamp baseline and contributes no elapsed time. Clamp subsequent frame deltas to `[0, 250]` ms and discard excess; negative deltas contribute zero. Therefore long stalls may slow game time but cannot trigger unbounded catch-up. Restart, pause, resume, focus loss, and disposal clear held-input/repeat state and rebase scheduling; pause/resume preserves the core's accumulated fall time. The clamp is a browser-boundary policy; deterministic core tests may deliver larger finite deltas directly.

## B6: Controls and lifecycle

| Input | Action |
| --- | --- |
| Left / Right arrows | Move or hold horizontal direction under B5. |
| Down arrow | Soft drop under B3/B5. |
| Z / X | Counterclockwise / clockwise rotation. |
| P | Toggle pause/resume while running or paused. |
| Start button | Start from ready state. |
| Pause / Resume button | Pause or resume the current session. |
| Restart button | Start a fresh running game from running, paused, or game-over state. |

Initial ready state shows an empty board and preview, zero score/lines, level 1, controls, and instructions; no piece draws or gameplay occur before Start. Start is enabled only in ready. Pause/Resume is enabled only while running or paused. Restart is enabled after the first start. Running, paused, game-over, and error states have visible textual labels.

Paused and game-over sessions ignore movement and rotation and do not advance game time. Losing window focus or becoming hidden pauses a running game; returning focus/visibility does not automatically resume it. Multiple blur/visibility notifications are idempotent. Recognized gameplay keys prevent browser scrolling while the game surface is focused. The game surface receives focus on Start, Restart, and Resume; ordinary button focus and Tab navigation remain usable. Key handlers do not intercept typing in editable fields or unrelated page controls. Letter mappings are case-insensitive. Known lifecycle actions outside their applicable states are no-ops: Start applies only in ready, Pause/Resume only in running/paused, and Restart only after the first start. Browser-dispatched synthetic events are valid test inputs, not a production gameplay requirement.

Restart resets board, pieces, score, line count, level, timing, and held input. There is at most one active scheduling chain and one owned set of listeners. Disposal cancels callbacks, unregisters listeners, and makes further notifications inert; rebuilding the application does not duplicate event handling.

## B7: Presentation and usability

Render all 200 board cells and the active piece in their legal positions, with visible settled/empty boundaries and distinct piece colors. The next-piece preview shows the exact stored next identity in its initial orientation. Do not display a Ghost piece or Hold panel. Every completed state update is reflected by the next rendered frame; a rendering pass does not change game state or consume draws.

HTML displays score, total cleared lines, level, lifecycle status, and the B6 keyboard instructions. Controls use native buttons with accessible names and visible keyboard focus. Paused, game-over, and fatal-error messages are textual, not color-only. The canvas has an accessible name and concise fallback description; cell-by-cell screen-reader gameplay is outside scope. The board and controls remain usable at a desktop viewport of 800 × 600 CSS pixels with page scrolling allowed; canvas resizing does not change board coordinates or gameplay.

## B8: Platform, resources, and failures

The delivered build is static HTML/CSS/JavaScript compiled from TypeScript and needs no backend, account, third-party runtime service, cookie, local storage, or network request after its own assets load. It runs through an ordinary HTTP static server. File-URL launching is not required. Runtime compatibility targets desktop Chromium, Firefox, and WebKit engines supporting Canvas 2D, ES modules, keyboard events, and animation frames; implementation verification records the exact tested engine versions and limitations rather than claiming untested browser certification.

Invalid core inputs, including out-of-range/nonfinite draws, nonfinite or negative elapsed time, unknown actions, or structurally invalid initial state, fail explicitly before committing a state transition. Expected illegal placement attempts remain ordinary rejected outcomes. Missing required DOM elements, unavailable Canvas 2D, or unexpected transition/render failures stop the application's scheduling and input processing and display a concise reload instruction in an HTML error region; if required markup is missing, create a minimal text error element in the document body. Record a diagnostic in the developer console without credentials or unrelated page content. No automatic retry, silent state repair, or partial score/board update is allowed. Reload resets all in-memory state.

## Contract ownership and acceptance

| Contract | Responsible decomposition components | Required observable evidence |
| --- | --- | --- |
| B1–B3 | Geometry, board operations, game transitions, random source | Every piece spawns/rotates as defined; edge/overlap rejection is atomic; failed gravity and soft-drop attempts lock; simultaneous clears compact correctly; blocked spawn ends play. |
| B4 | Scoring/progression policy and transitions | Verify all four clear rewards, a clear crossing 10 lines using the pre-clear multiplier, unchanged score on a zero-line lock, and the 100 ms gravity floor. |
| B5 | Game transitions, coordinator, clock and input adapters | Verify exact interval boundaries, partial accumulated time, held input/release, opposing arrows, update ordering, no post-lock cascade, long-frame clamp, and pause/resume timing. |
| B6 | Coordinator, input/clock adapters, HTML view, composition | Start, pause, explicit resume, restart, game over, focus-loss pause, keyboard/button focus, disposal, and repeated lifecycle operations behave as specified without duplicate loops/listeners. |
| B7 | Canvas/HTML views | Browser inspection and representative snapshots show correct board/preview/status, usable controls at the required viewport, and no unsupported feature UI. |
| B8 | All core entry boundaries and browser composition | Explicit invalid-input outcomes preserve state; missing-element/canvas and unexpected-failure scenarios stop processing and show reload guidance; static build works without a backend. |

Acceptance requires deterministic automated rule/coordinator checks plus browser integration and visual/usability evidence for the relevant rows. Core test success alone does not prove rendering, focus, or browser compatibility. The same initial state, action/time sequence, and draw sequence must produce identical gameplay outcomes. No acceptance condition is presently claimed as implemented or passed.
