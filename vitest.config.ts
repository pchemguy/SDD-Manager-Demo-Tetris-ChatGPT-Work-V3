/** Deterministic Node tests; browser specs are owned by Playwright. */
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/browser/**"],
    fileParallelism: false,
  },
});
