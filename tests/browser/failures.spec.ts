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

for (const id of ["hold", "hold-status"])
  test(`missing ${id} markup stops safely`, async ({ page }) => {
    await page.route("**/", async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        body: (await response.text()).replace(
          `id="${id}"`,
          `id="missing-${id}"`,
        ),
      });
    });
    await page.goto("/");
    await expect(page.getByRole("alert")).toContainText("Reload");
    await expect(page.locator("#start")).toBeDisabled();
  });
test("unavailable Hold Canvas alone stops initialization", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      return this.id === "hold" ? null : original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator("#status")).toHaveText("Error");
  await expect(page.getByRole("alert")).toContainText("Reload");
});
test("a failing Hold draw stops modern input and time without leaking payloads", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await page.evaluate(() => {
    Math.random = () => {
      throw Error("private-draw-payload");
    };
  });
  await page.keyboard.press("c");
  await expect(page.getByRole("alert")).toContainText("Reload");
  const before = await page
    .locator("#board")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.keyboard.press("Enter");
  await page.keyboard.press("Space");
  await page.clock.runFor(5000);
  expect(
    await page
      .locator("#board")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(before);
  await expect(page.locator("body")).not.toContainText("private-draw-payload");
});
