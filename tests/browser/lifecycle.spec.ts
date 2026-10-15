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
test("stored next preview, Pause/Resume button and focus are rendered", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.2;
  });
  // Native keyboard button activation avoids intermittent WebKit pointer loss.
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(page.locator("#board")).toBeFocused();
  expect(
    await page
      .locator("#preview")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(48, 48, 1, 1)
            .data,
        ),
      ),
  ).toEqual([189, 155, 244, 255]);
  await page.getByRole("button", { name: "Pause", exact: true }).press("Enter");
  await expect(page.locator("#status")).toHaveText("Paused");
  await page
    .getByRole("button", { name: "Resume", exact: true })
    .press("Enter");
  await expect(page.locator("#status")).toHaveText("Running");
  await expect(page.locator("#board")).toBeFocused();
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.locator("#score")).toHaveText("0");
  await expect(page.locator("#lines")).toHaveText("0");
  await expect(page.locator("#level")).toHaveText("1");
});
test("composition disposal removes listeners and permits one fresh rebuild", async ({
  page,
}) => {
  await page.goto("/tests/fixtures/application.html");
  const result = await page.evaluate(async () => {
    const path = "/src/main.ts";
    const { mount } = await import(path);
    const dispose = mount(document);
    (document.getElementById("start") as HTMLButtonElement).click();
    dispose();
    dispose();
    const status = document.getElementById("status")!.textContent;
    (document.getElementById("restart") as HTMLButtonElement).click();
    const inert = document.getElementById("status")!.textContent === status;
    const second = mount(document);
    const ready = document.getElementById("status")!.textContent;
    (document.getElementById("start") as HTMLButtonElement).click();
    const running = document.getElementById("status")!.textContent;
    second();
    return { inert, ready, running };
  });
  expect(result).toEqual({ inert: true, ready: "Ready", running: "Running" });
});

test("disposal with occupied Hold and grounded delay permits a fresh empty rebuild", async ({
  page,
}) => {
  await page.goto("/tests/fixtures/application.html");
  const result = await page.evaluate(async () => {
    const path = "/src/main.ts",
      { mount } = await import(path);
    const dispose = mount(document);
    document.getElementById("start")!.click();
    const board = document.getElementById("board")!;
    for (const key of ["c", "Enter"])
      board.dispatchEvent(
        new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
      );
    const used = document.getElementById("hold-status")!.textContent;
    dispose();
    const old = (board as HTMLCanvasElement).toDataURL();
    for (const key of ["c", "Enter", " "])
      board.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    const inert = old === (board as HTMLCanvasElement).toDataURL();
    const second = mount(document);
    const fresh = document.getElementById("hold-status")!.textContent;
    document.getElementById("start")!.click();
    const available = document.getElementById("hold-status")!.textContent;
    second();
    return { used, inert, fresh, available };
  });
  expect(result).toEqual({
    used: "Used",
    inert: true,
    fresh: "Inactive",
    available: "Available",
  });
});
