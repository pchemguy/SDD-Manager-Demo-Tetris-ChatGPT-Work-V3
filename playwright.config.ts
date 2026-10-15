/** Real browser projects and task-owned local server lifecycle. */
import packaged from "@sparticuz/chromium";
import { resolve } from "node:path";
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  testMatch: process.env.SDD_PRODUCTION
    ? ["static-build.spec.ts", "spacebar.spec.ts", "modern.spec.ts"]
    : ["**/*.spec.ts"],
  testIgnore: process.env.SDD_PRODUCTION ? [] : ["static-build.spec.ts"],
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 800, height: 600 },
    trace: "retain-on-failure",
  },
  projects: ["chromium", "firefox", "webkit"].map((browserName) => ({
    name: browserName,
    use: {
      browserName: browserName as "chromium" | "firefox" | "webkit",
      ...(browserName === "chromium" && process.env.SDD_PACKAGED_CHROMIUM
        ? {
            launchOptions: {
              executablePath: resolve(".cache/browser/chromium"),
              args: packaged.args.filter((a) => a !== "--single-process"),
              env: {
                ...process.env,
                FONTCONFIG_PATH: resolve(".cache/browser/fonts"),
                LD_LIBRARY_PATH: resolve(".cache/browser"),
              },
            },
          }
        : {}),
    },
  })),
  webServer: {
    command: process.env.SDD_PRODUCTION
      ? "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort"
      : "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
