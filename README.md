# Browser Tetris

A single-player Tetris game for desktop browsers, built with TypeScript, Canvas 2D and native HTML controls. It includes seven tetrominoes, a 10×20 board, next-piece and Hold previews, Ghost landing guide, seven-bag randomization, wall kicks, Hard drop, scoring, increasing levels, soft drop, pause/resume, restart and game over. The production build is static and needs no backend or account.

## Run locally

Use Node 24 or newer and npm. Development and verification were exercised on Ubuntu 24.04 x64 with Node 24.19.0 and npm 11.9.0. From the repository root:

```text
npm ci
npm run dev
```

Open the local URL printed by Vite and select **Start game**. Keep the playfield focused to use the keyboard. Start, Restart and Resume return focus to it; Tab still reaches the native buttons.

| Control | Action |
| --- | --- |
| Left / Right arrows | Move; hold to repeat. |
| Down arrow | Soft drop; hold for faster falling. |
| Z / X | Rotate counterclockwise / clockwise. |
| Space | Rotate clockwise once per fresh press. |
| C | Hold or swap once per piece; resets after a lock. |
| Enter | Hard drop to the landing; locking still waits. |
| P | Pause or resume. |
| Start game | Begin from Ready. |
| Pause / Resume | Suspend or continue the current game. |
| Restart | Begin a fresh game after the first start. |

Losing window focus or hiding the page pauses a running game. Resume explicitly when you return. A fatal error stops play and displays reload guidance; reload starts with fresh in-memory state.

## Rules

Contact with the floor or stack starts a lock delay equal to one full normal gravity interval at the current level (1 second at level one). This also applies after **Enter Hard drop**: it lands the piece immediately, then waits. Soft drop cannot shorten that delay. Moving or rotating while still supported does not reset elapsed lock time. Leaving support clears it; the next contact starts a full delay. Pause preserves the remaining delay.

C stores the current identity and brings in the next piece, or swaps with an occupied Hold slot. Each incoming piece starts in its initial orientation. Hold works once until a piece locks; restart clears the slot. The outlined Ghost shows exactly where Hard drop would land and disappears when it overlaps the active piece. Rotation tries ordered SRS quarter-turn wall kicks; O keeps its occupied cells. There are no hidden rows or 180-degree controls.

Each seven-piece bag contains I, O, T, S, Z, J and L exactly once in randomized order. Consecutive identical pieces can occur across bag boundaries. Completed rows clear together. Clearing 1/2/3/4 rows awards 100/300/500/800 points multiplied by the level before the clear. Every ten cleared lines increases the level; gravity accelerates to a 100 ms minimum interval. Soft and Hard drop award no extra points; there are no spin or combo bonuses.

Touch controls, multiplayer, leaderboards and persistence are outside scope. Scores reset on restart or reload. Canvas has an accessible name and fallback description; cell-by-cell screen-reader gameplay is not provided. The desktop layout supports an 800×600 viewport with vertical scrolling.

## Verify and build

Install Playwright's browser binaries separately from npm dependencies. On Linux, `npx playwright install-deps` installs supported host libraries and requires appropriate system permissions.

```text
npx playwright install chromium firefox webkit
npm run typecheck
npm test
npm run test:browser
npm run build
npm run preview
```

The development browser suite runs 25 scenarios on each of Chromium, Firefox and WebKit. Unit tests cover deterministic rules, timing, input, views and failure boundaries. Production tests use a separate suite against the built assets. In Windows CMD:

```bat
set SDD_PRODUCTION=1
npm run test:browser
set SDD_PRODUCTION=
```

In a POSIX shell, use `SDD_PRODUCTION=1 npm run test:browser`. Run `npm run build` first. Browser tests own their server at port 4173, so stop any manually started preview on that port before testing. All npm scripts use ordinary commands supported by CMD; PowerShell is not required. Windows execution itself has not been tested here.

`npm run build` produces `dist/index.html` and bundled CSS/JavaScript under `dist/assets/`. Serve the contents of `dist/` at the root of any ordinary HTTP static server; `npm run preview` is the validated local preview. File-URL launch and deployment under an arbitrary subpath are not configured. Deploy only `dist/`, without repository credentials, tests, documents, dependencies or agent packages. The game makes no third-party runtime requests and uses no cookies or local storage.

## Verified browser environments

| Engine | Tested version | Development / production scenarios |
| --- | --- | --- |
| Chromium | 153.0.8010.0 | 25 / 18 passed |
| Firefox | 157.0 | 25 / 18 passed |
| WebKit | 27.2 | 25 / 18 passed |

There were no skipped scenarios. See the [acceptance evidence and screenshots](docs/dev/reports/phases/P1/T-023-ACCEPTANCE.md) for historical provisioning and launch settings; the current [modern acceptance](docs/dev/features/002_d708792-modern-enhancements/ACCEPTANCE.md) records 129 unit tests and 75 development / 54 production scenarios, with [modern demonstration](docs/dev/features/002_d708792-modern-enhancements/M2.2.png). These results do not certify every browser release or operating system. Headless blur/visibility tests model the event handlers; native desktop OS focus-switch delivery was not separately verified. WebKit intermittently omitted rapid injected mouse clicks before application listeners received them; the retained Pause/Resume button scenario uses native Enter activation, alongside mouse Start/Restart. This does not certify that injected pointer sequence.

In the development container, official Chromium archives were unavailable. The optional locked Linux x64 fallback is:

```sh
npm run browser:provision
export SDD_PACKAGED_CHROMIUM=1
```

This extracts packaged Chromium, fonts and rendering libraries into ignored `.cache/browser/`; it supplies no Firefox or WebKit substitute. Firefox/WebKit were installed through Playwright's automatic fallback download mirror. WebKit needed host libraries. Firefox required `MOZ_DISABLE_CONTENT_SANDBOX=1` for local tests because this container denies content-process user-namespace mappings. That setting disables Firefox's content sandbox for the invoked test process and was used only with the local application/fixtures; ordinary supported hosts should use normal browser settings. To reproduce this container's matrix in a POSIX shell after provisioning:

```sh
MOZ_DISABLE_CONTENT_SANDBOX=1 SDD_PACKAGED_CHROMIUM=1 npm run test:browser
MOZ_DISABLE_CONTENT_SANDBOX=1 SDD_PACKAGED_CHROMIUM=1 SDD_PRODUCTION=1 npm run test:browser
```

npm's existing unknown `http-proxy` configuration warning and terminal-color warnings did not affect the recorded checks. Failed browser downloads or missing libraries are setup failures, not passing acceptance evidence.

## Development sources

The pure rules live in `src/core/`, session coordination in `src/session/`, browser adapters in `src/platform/`, and rendering in `src/view/`. `src/main.ts` composes one disposable application. Tests live under `tests/`; their harnesses are excluded from the production entry graph.

The accepted [project brief](docs/dev/PROJECT.md), [architecture](docs/dev/ARCHITECTURE.md), [decomposition](docs/dev/DECOMPOSITION.md), [behavioral specification](docs/dev/SPEC.md), [plan](docs/dev/PLAN.md), [layout](docs/dev/layout.md) and owning [task list](docs/dev/TASKS.md) govern development. Use [AGENTS.md](AGENTS.md) for agent orientation. Development uses [SDD Manager](SDD-MANAGER.md); see the [AI-assisted development disclosure](AI_DISCLOSURE.md).

The [modern campaign](docs/dev/features/002_d708792-modern-enhancements/README.md) records its accepted scope, acceptance and integration boundary. The original [P1 implementation report](docs/dev/reports/IMPLEMENTATION-REPORT.md) and [P1 phase review](docs/dev/reports/phases/P1/PHASE-REPORT.md) retain historical checks and task-history exceptions.
