/** Drawing probes assert visible board contracts rather than gameplay internals. */
import { test, expect, vi } from "vitest";
import { canvasView } from "../../src/view/canvas";
import { start, ready } from "../../src/core/game";
test("renders grid and actual active/settled cells without mutating snapshot", () => {
  const fills: unknown[][] = [];
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    fillRect(x: number, y: number, w: number, h: number) {
      fills.push([this.fillStyle, x, y, w, h]);
    },
    strokeRect: vi.fn(),
  };
  const canvas = {
    width: 240,
    height: 480,
    getContext: () => ctx,
  } as unknown as HTMLCanvasElement;
  const draw = vi.fn(() => 0);
  const s = start(draw);
  s.board[19][0] = "O";
  const before = structuredClone(s);
  canvasView(canvas)(s);
  expect(ctx.strokeRect).toHaveBeenCalledTimes(200);
  expect(fills.some((r) => r[1] === 73 && r[2] === 25)).toBe(true);
  expect(fills.some((r) => r[1] === 1 && r[2] === 457)).toBe(true);
  expect(s).toEqual(before);
  expect(draw).toHaveBeenCalledTimes(2);
});
test("ready board has no piece overlay and missing Canvas is explicit", () => {
  expect(() =>
    canvasView({ getContext: () => null } as unknown as HTMLCanvasElement),
  ).toThrow();
  const s = ready();
  expect(s.active).toBe(null);
});
