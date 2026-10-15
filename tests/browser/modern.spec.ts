/** Modern controls use real browser input and actual application pixels. */
import { test, expect } from "@playwright/test";
test("Enter hard drop waits a full gravity interval and repeated drop does not reset it", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.2;
  });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.clock.runFor(32);
  await page.keyboard.press("Enter");
  const pixel = (x: number, y: number) =>
    page
      .locator("#board")
      .evaluate(
        (c, [x, y]) =>
          Array.from(
            (c as HTMLCanvasElement).getContext("2d")!.getImageData(x, y, 1, 1)
              .data,
          ),
        [x, y],
      );
  expect(await pixel(108, 444)).toEqual([241, 206, 103, 255]);
  expect(await pixel(108, 12)).toEqual([9, 25, 29, 255]);
  await page.clock.runFor(900);
  expect(await pixel(108, 12)).toEqual([9, 25, 29, 255]);
  await page.keyboard.press("Enter");
  await page.clock.runFor(200);
  expect(await pixel(108, 12)).toEqual([189, 155, 244, 255]);
});
test("C holds once and renders the original identity; restart clears the slot", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.2;
  });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.keyboard.press("c");
  await expect(page.locator("#hold-status")).toHaveText("Used");
  await expect(page.locator("#hold")).toHaveAccessibleName(
    "Held piece preview",
  );
  expect(
    await page
      .locator("#hold")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(36, 36, 1, 1)
            .data,
        ),
      ),
  ).toEqual([241, 206, 103, 255]);
  const before = await page
    .locator("#board")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.keyboard.press("Shift+C");
  expect(
    await page
      .locator("#board")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(before);
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.locator("#hold-status")).toHaveText("Available");
  expect(
    await page
      .locator("#hold")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(36, 36, 1, 1)
            .data,
        ),
      ),
  ).toEqual([9, 25, 29, 255]);
});
