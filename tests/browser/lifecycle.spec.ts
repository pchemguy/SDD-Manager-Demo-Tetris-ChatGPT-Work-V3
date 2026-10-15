/** Actual keyboard lifecycle plus explicitly modeled window-focus event handling. */
import { test, expect } from "@playwright/test";
test("P toggles pause and focus loss requires explicit resume", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.locator("#board").focus();
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Paused");
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Running");
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect(page.locator("#status")).toHaveText("Paused");
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.locator("#status")).toHaveText("Paused");
  await page.locator("#board").focus();
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Running");
});
