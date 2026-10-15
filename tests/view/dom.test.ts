/** HTML-view contracts tested as values; native controls remain browser evidence. */
import { test, expect } from "vitest";
import { domView } from "../../src/view/dom";
import { start } from "../../src/core/game";
test("status counters and lifecycle availability follow one snapshot", () => {
  const nodes = Object.fromEntries(
    ["score", "lines", "level", "status", "start", "restart", "pause"].map(
      (id) => [id, { textContent: "", disabled: false }],
    ),
  );
  const doc = {
    getElementById: (id: string) => nodes[id],
  } as unknown as Document;
  const s = start(() => 0.2);
  s.score = 1234;
  s.lines = 21;
  s.level = 3;
  s.status = "paused";
  domView(doc)(s);
  expect(nodes.score.textContent).toBe("1234");
  expect(nodes.lines.textContent).toBe("21");
  expect(nodes.level.textContent).toBe("3");
  expect(nodes.pause.textContent).toBe("Resume");
  expect(nodes.pause.disabled).toBe(false);
  expect(nodes.start.disabled).toBe(true);
});
