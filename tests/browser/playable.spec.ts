/** Real application input/rendering plus a separate deterministic core/view harness. */
import { test, expect } from "@playwright/test";
test("Start, keyboard movement, gravity and restart render through the real application", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(page.locator("#status")).toHaveText("Running");
  await page.locator("#board").focus();
  await page.keyboard.press("ArrowLeft");
  const pixel = () =>
    page
      .locator("#board")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(60, 36, 1, 1)
            .data,
        ),
      );
  expect(await pixel()).toEqual([99, 217, 223, 255]);
  await page.keyboard.press("x");
  expect(
    await page
      .locator("#board")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(108, 12, 1, 1)
            .data,
        ),
      ),
  ).toEqual([99, 217, 223, 255]);
  await page.keyboard.press("z");
  await page.clock.runFor(1100);
  expect(await pixel()).not.toEqual([99, 217, 223, 255]);
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Running");
  await page.screenshot({
    path: "test-results/first-playable.png",
    fullPage: true,
  });
});
test("deterministic browser harness covers locking clear succession and blocked spawn", async ({
  page,
}) => {
  await page.goto("/tests/fixtures/playable.html");
  const result = await page.evaluate(async () => {
    const path = "/src/core/game.ts";
    const g = await import(path);
    let s = g.start(() => 0.2);
    s.active = { kind: "I", x: 7, y: 16, rotation: 1 };
    for (let y = 16; y < 20; y++)
      for (let x = 0; x < 9; x++) s.board[y][x] = "J";
    s = g.advance(s, 1000, () => 0.2);
    const cleared = s.board.flat().every((x: unknown) => x === null);
    s.board[0][4] = "T";
    s.active = { kind: "O", x: 4, y: 18, rotation: 0 };
    s = g.advance(s, 1000, () => 0);
    return { cleared, status: s.status, active: s.active, next: s.next };
  });
  expect(result).toEqual({
    cleared: true,
    status: "gameover",
    active: null,
    next: "I",
  });
});
