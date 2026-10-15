/** Production-only acceptance: real static assets, native controls, and distribution boundary. */
import { test, expect } from "@playwright/test";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
test("production app renders and plays using only its own HTTP assets", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.addInitScript(() => {
    Math.random = () => 0.2;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(page.locator("#status")).toHaveText("Running");
  await page.keyboard.press("p");
  await expect(page.locator("#status")).toHaveText("Paused");
  expect(
    await page
      .locator("#preview")
      .evaluate((c) =>
        Array.from(
          (c as HTMLCanvasElement).getContext("2d")!.getImageData(36, 36, 1, 1)
            .data,
        ),
      ),
  ).toEqual([241, 206, 103, 255]);
  expect(requests.every((u) => u.startsWith("http://127.0.0.1:4173/"))).toBe(
    true,
  );
  expect(
    requests.some((u) => u.includes("/assets/") && u.endsWith(".js")),
  ).toBe(true);
  expect(requests.some((u) => u.includes("/src/"))).toBe(false);
});
test("distribution contains no repository credentials fixtures docs or agent packages", async () => {
  const walk = async (dir: string): Promise<string[]> => {
    const entries = await readdir(dir, { withFileTypes: true });
    const chunks = await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? walk(join(dir, e.name))
          : Promise.resolve([join(dir, e.name)]),
      ),
    );
    return chunks.flat();
  };
  const files = await walk("dist");
  expect(files.length).toBeGreaterThanOrEqual(3);
  for (const name of files) {
    expect(name).not.toMatch(
      /\.tkn|tests|fixtures|\.agents|docs|node_modules|\.map$/,
    );
    expect(await readFile(name, "utf8")).not.toMatch(/github_pat_|ghp_/);
  }
  expect(files.some((n) => n === "dist/index.html")).toBe(true);
});
