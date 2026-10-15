/** Fault injection at real application boundaries, not production testing hooks. */
import { test, expect } from "@playwright/test";
test("unavailable Canvas stops initialization with reload guidance", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: () => null,
    }),
  );
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("Reload");
  await expect(page.locator("#status")).toHaveText("Error");
});
test("missing required markup creates an error region if needed", async ({
  page,
}) => {
  await page.route("**/", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text())
        .replace('id="board"', 'id="missing-board"')
        .replace('id="error"', 'id="missing-error"'),
    });
  });
  await page.goto("/");
  await expect(page.locator("#error")).toBeVisible();
  await expect(page.locator("#error")).toContainText("Reload");
});
test("runtime draw failure freezes input/time and reload is fresh", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.evaluate(() => {
    Math.random = () => 1;
  });
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Reload");
  await expect(page.locator("#status")).toHaveText("Error");
  const before = await page
    .locator("#board")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.keyboard.press("ArrowLeft");
  await page.clock.runFor(2000);
  expect(
    await page
      .locator("#board")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(before);
  await page.reload();
  await expect(page.locator("#status")).toHaveText("Ready");
});
test("unexpected rendering failure stops with a text error", async ({
  page,
}) => {
  await page.addInitScript(() => {
    CanvasRenderingContext2D.prototype.fillRect = () => {
      throw Error("injected rendering failure");
    };
  });
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("Reload");
});
