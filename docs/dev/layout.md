# Repository layout

## Scope and status

Map the accepted [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), and [PLAN](PLAN.md) to physical ownership. Application, test, configuration and documentation paths below are the current ownership map. Generated assets remain separate from maintained source; implementation/acceptance status belongs to TASKS and retained reports.

## Application ownership

| Path | Logical owner and responsibility | Primary checks |
| --- | --- | --- |
| `index.html` | Composition-owned static page structure, canvas elements, status/error regions, buttons, and module entry. | Browser startup, native control/focus, missing-element scenarios. |
| `src/main.ts` | Browser application composition and teardown wiring; invokes coordinator and adapters. | Browser startup/error/teardown integration. |
| `src/core/types.ts` | Canonical core state, actions, piece identities, and core collaborator/result types. Contains no browser imports. | Type checking and state/contract consumers. |
| `src/core/geometry.ts` | Piece geometry, rotation transforms and ordered quarter-turn kick tables. | `tests/core/geometry.test.ts`, `tests/core/kicks.test.ts`. |
| `src/core/board.ts` | Placement, settlement, completed rows, compaction and shared pure landing. | `tests/core/board.test.ts`. |
| `src/core/scoring.ts` | Scoring, level progression, and gravity interval policy. | `tests/core/scoring.test.ts`. |
| `src/core/game.ts` | Core state including bag/Hold/contact timing, validation and composed transitions; uses the other core owners. | `tests/core/game.test.ts`, including deterministic draw/time and invalid-input cases. |
| `src/session/controller.ts` | Retains live snapshot, orders semantic input/time, repeat bookkeeping, lifecycle, and presentation requests. | `tests/session/controller.test.ts` with controlled collaborators. |
| `src/session/ports.ts` | Narrow coordinator-facing view, clock, and input wiring contracts where a shared type is needed. Imports core types only. | Type checking and controller/adapter integration. |
| `src/view/canvas.ts` | Canvas playfield/Ghost/next/Hold drawing and coordinate conversion using pure core projection queries. | Focused recording-context checks and real browser visual inspection. |
| `src/view/dom.ts` | HTML status, control availability, and text/focus presentation. | Browser DOM, lifecycle, and usability assertions. |
| `src/platform/input.ts` | Keyboard/button/focus/visibility translation and listener disposal. | Event translation and real browser interaction checks. |
| `src/platform/clock.ts` | Animation-frame chain, timestamp baseline/clamp, and cancellation. | Controlled scheduler checks and browser lifecycle checks. |
| `src/platform/random.ts` | Production uniform draw source, supplied explicitly to core consumers through composition. | Controlled-source integration and draw-boundary checks. |
| `src/style.css` | View-owned layout, colors, readable status, and keyboard focus presentation. | Browser visual/viewport checks. |

Functions sharing one cohesive responsibility may stay together; these paths do not impose one class per component. `game.ts` may use private helpers for validation without creating a second rule owner. Introduce an additional module only when real responsibility or test isolation warrants it, and amend this map within the owning change.

Imports point from `game.ts` toward core helpers/types and from the controller toward core and its narrow ports. Views read core types and pure geometry/landing queries; they never commit gameplay transitions. Platform adapters use their coordinator-facing contracts; composition imports concrete implementations. No core module imports `session`, `view`, `platform`, DOM globals, or test helpers. There is no shared miscellaneous utility directory, global state store, or barrel required to join unrelated responsibilities.

## Tests and fixtures

| Path | Ownership and limits |
| --- | --- |
| `tests/core/` | Deterministic rule/state tests, including invalid-input and atomicity coverage. Mirror core responsibility names rather than implementation internals. |
| `tests/session/` | Controller ordering, repeat/lifecycle, time, and draw-collaborator integration with controlled inputs. |
| `tests/platform/` | Focused adapter tests with injected event/scheduling facilities when browser-independent checks are meaningful. |
| `tests/view/` | Focused canvas draw-command checks; use browser tests for actual Canvas/DOM behavior. |
| `tests/browser/` | Playwright interaction, lifecycle, failure, viewport, static-build, and representative visual checks. Browser engine projects share behavior scenarios. |
| `tests/fixtures/` | Explicit board/state examples, controlled random/clock helpers, and test-only browser harnesses. Do not duplicate production scoring/rotation rules to compute expected answers. |

Core/session tests run in Node; real DOM/canvas interactions use browser checks rather than a second simulated browser framework. Test-only harnesses may instantiate components with deterministic collaborators and malformed markup, but must not add a debug state setter or global testing API to the production application. Production builds include only the application entry graph; exclude test fixtures and harnesses from distributable assets. Distinguish harness checks from interaction checks against the actual application and production build.

Generated traces, screenshots, and reports belong in ignored `test-results/` and `playwright-report/`; coverage belongs in ignored `coverage/`. Retain concise meaningful evidence and selected review images under the owning report directory when needed for a durable review; do not commit entire generated browser caches or transient output.

## Tooling and configuration ownership

Use npm with a committed `package-lock.json` for reproducible installation. Use Vite for development/static builds, TypeScript for type checking, Vitest for deterministic tests, and Playwright Test for Chromium/Firefox/WebKit integration. These are development tools, not a UI framework or backend. Locked versions and engine requirements are recorded in package metadata and setup/acceptance evidence.

| Root path | Owner |
| --- | --- |
| `package.json`, `package-lock.json` | Project tooling, dependency versions, engine constraints, and cross-platform npm scripts. |
| `tsconfig.json` | Strict TypeScript checking for application and relevant test/config consumers; use focused child configs only if actual tool boundaries require them. |
| `vite.config.ts` | Static application entry, output, and development/preview serving. |
| `vitest.config.ts` | Node unit/integration test selection, excluding browser specs. |
| `playwright.config.ts` | Browser-engine projects, test selection, local server lifecycle, and output locations. |
| `scripts/provision-chromium.mjs` | Optional Linux x64, ownership-safe extraction of npm-packaged Chromium/fonts into ignored `.cache/browser/` when official browser downloads are unavailable; never a Firefox/WebKit substitute. |
| `.gitignore` | Generated/dependency output and protected credential exclusions; preserve existing rules. |

Run project commands from the repository root. Script names are `dev`, `typecheck`, `test`, `test:browser`, `build`, and `preview`. Actual execution and limits are in README and the current acceptance report. Installation/launch of browser binaries must be established and recorded during implementation, separately from a package install. Use npm scripts compatible with Windows CMD and the execution environment's shell; do not force PowerShell or hard-code a Windows shell on Linux.

Observed environment at layout preparation: Node `v24.19.0`, npm `11.9.0`. npm prints an existing unknown `http-proxy` environment-config warning. Current installation/build/browser acceptance is retained in the modern feature package; these original layout observations alone are not runtime proof.

Official tooling sources inspected on 2026-10-15: [Vite getting started](https://vite.dev/guide/), [Vitest getting started](https://vitest.dev/guide/), [Playwright installation](https://playwright.dev/docs/intro), and [Playwright browser management](https://playwright.dev/docs/browsers). Exact installed versions and representative runtime checks are implementation evidence.

## Documentation, generated output, and retained capabilities

`README.md` owns player instructions and actual setup/build/test/serve commands against observed implementation. `AGENTS.md` owns concise agent navigation and operational constraints. Canonical preparation stays in `docs/dev/`; TASKS is the sole executable task owner. PLAN and its review report own combined strategy/layout readiness. Milestone/phase/final report paths are defined in PLAN, including the modern feature package and historical archived sources. More detailed user/developer guides belong under `docs/` only when the selected scope needs them.

`dist/` is ignored generated static build output, not hand-maintained source. `node_modules/`, tool caches, coverage, browser binaries, and transient test output are not production source. Only application assets may be copied to deployment output; no repository credentials, development documents, tests, or bundled agent packages are deployed.

`.agents/plugins/sdd-manager/` and `.agents/skills/technical-writing-assistant/` are retained workflow capabilities, not game modules or test targets. Do not edit them as part of application development without a separate scoped instruction. Root disclosure/usage records and license remain repository artifacts.

## Readiness boundary

Every decomposition component has a source home and matching check route. Modern mechanics reuse the existing production modules; focused bag/locking/drop/Hold/kick/failure tests remain in tests/core and native modern checks in tests/browser/modern.spec.ts. There are no unresolved physical ownership choices. Current combined PLAN/layout QC governs dependent use; original human acceptance and the modern campaign's pre-approval retain their recorded scope.
