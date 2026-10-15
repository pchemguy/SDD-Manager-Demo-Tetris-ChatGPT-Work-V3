# Browser Tetris

A classic browser-based Tetris game under development. The [project brief](docs/dev/PROJECT.md) defines the accepted direction and selected gameplay scope. The accepted [architecture](docs/dev/ARCHITECTURE.md) defines system boundaries; the accepted [component decomposition](docs/dev/DECOMPOSITION.md) assigns logical responsibilities. The accepted [behavioral specification](docs/dev/SPEC.md) defines the game rules. The accepted [delivery plan](docs/dev/PLAN.md) defines increments; the accepted [repository layout](docs/dev/layout.md) assigns physical ownership. The accepted [task list](docs/dev/TASKS.md) defines the intended implementation work. Implementation has not started. Core gameplay, scoring, preview, and keyboard/button lifecycle are implemented; robustness and final acceptance remain in the active task list.

Development uses [SDD Manager](SDD-MANAGER.md). See the [AI-assisted development disclosure](AI_DISCLOSURE.md).

## Tooling setup

From the repository root, use Node 24 or newer and npm. `npm ci`, `npm run typecheck`, and `npm run build` provide installation, type checking, and static build. Run `npm run dev` to play the current milestone, `npm test` for rule/coordinator/view checks, and `npm run test:browser -- --project=chromium` for browser checks. The first playable milestone is not yet the complete game.

Browser checks normally use `npx playwright install chromium firefox webkit`. In this sandbox, official Chromium downloads returned HTML rather than archives. An optional Linux x64 fallback is `npm run browser:provision`, which extracts the locked npm-packaged Chromium assets without changing archive ownership. Set `SDD_PACKAGED_CHROMIUM=1` before Chromium checks (Windows CMD syntax for variables is `set NAME=value`; this fallback itself is Linux-only). This fallback supplies no Firefox/WebKit evidence. Use ordinary npm scripts from CMD on Windows; PowerShell is not required.
