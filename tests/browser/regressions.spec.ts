/** Cross-component interaction checks against the actual application. */
import { test, expect } from "@playwright/test";
test("held input is cleared by pause and restart; suspended canvas stays frozen", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.2;
  });
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.keyboard.down("ArrowLeft");
  await page.keyboard.down("ArrowDown");
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Paused");
  const image = () =>
    page
      .locator("#board")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  const paused = await image();
  await page.clock.runFor(3000);
  expect(await image()).toBe(paused);
  await page.keyboard.up("ArrowLeft");
  await page.keyboard.up("ArrowDown");
  await page.getByRole("button", { name: "Resume", exact: true }).click();
  await page.clock.runFor(400);
  expect(await image()).toBe(paused);
  await page.keyboard.down("ArrowRight");
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await page.keyboard.up("ArrowRight");
  const fresh = await image();
  await page.clock.runFor(400);
  expect(await image()).toBe(fresh);
  await expect(page.locator("#score")).toHaveText("0");
});
test("modeled visibility pause is idempotent and does not auto-resume", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    document.dispatchEvent(new Event("visibilitychange"));
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("#status")).toHaveText("Paused");
  await page.getByRole("button", { name: "Resume", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Running");
});
test("fatal diagnostics do not echo exception payloads or continue input", async ({
  page,
}) => {
  const logs: string[] = [];
  page.on("console", (m) => logs.push(m.text()));
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.evaluate(() => {
    Math.random = () => {
      throw Error("fixture-private-payload");
    };
  });
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Error");
  await expect(page.locator("#start")).toBeDisabled();
  await expect(page.locator("#pause")).toBeDisabled();
  await expect(page.locator("#restart")).toBeDisabled();
  expect(logs.some((x) => x.includes("fixture-private-payload"))).toBe(false);
  expect(logs.some((x) => x.includes("Tetris stopped"))).toBe(true);
});
