/** Native Space rotation and default behavior, usable against dev or static assets. */
import { test, expect } from "@playwright/test";
test("Space rotates clockwise once without scrolling and leaves typing and buttons usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator(".controls")).toContainText("SPACE");
  await page.getByRole("button", { name: "Start game" }).click();
  const image = () =>
    page.locator("#board").evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  const before = await image();
  const scroll = await page.evaluate(() => scrollY);
  await page.keyboard.down("Space");
  expect((await image()) === before).toBe(false);
  // Clockwise I rotation occupies local (2,0), hence board cell (5,0).
  expect(
    await page.locator("#board").evaluate((c) =>
      Array.from(
        (c as HTMLCanvasElement).getContext("2d")!.getImageData(132, 12, 1, 1)
          .data,
      ),
    ),
  ).toEqual([99, 217, 223, 255]);
  const rotated = await image();
  await page.keyboard.down("Space"); // Native repeat, not a fresh press.
  expect(await image()).toBe(rotated);
  await page.keyboard.up("Space");
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Paused");
  await page.keyboard.press("Space");
  expect(await image()).toBe(rotated);
  await page.getByRole("button", { name: "Resume", exact: true }).press("Space");
  await expect(page.locator("#status")).toHaveText("Running");
  await expect(page.locator("#board")).toBeFocused();
  await page.evaluate(() => {
    const input = document.createElement("input");
    input.id = "typing";
    document.body.append(input);
  });
  await page.locator("#typing").fill("a");
  await page.locator("#typing").press("Space");
  await expect(page.locator("#typing")).toHaveValue("a ");
  expect(await image()).toBe(rotated);
});
