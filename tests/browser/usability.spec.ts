/** Desktop viewport, focus, readable controls and resize contracts. */
import { test, expect } from "@playwright/test";
test("repeat keys prevent page scrolling and editable fields remain independent", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  const prevented = await page.locator("#board").evaluate((board) => {
    const e = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      repeat: true,
      bubbles: true,
      cancelable: true,
    });
    board.dispatchEvent(e);
    return e.defaultPrevented;
  });
  expect(prevented).toBe(true);
  await page.evaluate(() => {
    const input = document.createElement("input");
    input.id = "editable";
    document.body.append(input);
  });
  await page.locator("#editable").fill("abc");
  await page.locator("#editable").press("p");
  await expect(page.locator("#status")).toHaveText("Running");
  await expect(page.locator("#editable")).toHaveValue("abcp");
});
test("800x600 is readable and resizing preserves canvas state; uppercase controls work", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator("#board")).toHaveAccessibleName("Tetris playfield");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Start game" }).click();
  await page.keyboard.press("Shift+X");
  await page.keyboard.press("Shift+P");
  await expect(page.locator("#status")).toHaveText("Paused");
  const before = await page
    .locator("#board")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.setViewportSize({ width: 1000, height: 700 });
  expect(
    await page
      .locator("#board")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(before);
  await page.locator("#board").focus();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(
    "BUTTON",
  );
  expect(
    await page.evaluate(
      () => getComputedStyle(document.activeElement!).outlineStyle,
    ),
  ).not.toBe("none");
  await page.screenshot({
    path: "test-results/desktop-usability.png",
    fullPage: true,
  });
});
