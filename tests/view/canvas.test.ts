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
  expect(
    ctx.strokeRect.mock.calls.filter(([, , w, h]) => w === 24 && h === 24),
  ).toHaveLength(200);
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
test("Ghost outlines the shared landing without state changes and suppresses overlap", async () => {
  const strokes: unknown[][] = [];
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    fillRect() {},
    strokeRect(x: number, y: number, w: number, h: number) {
      strokes.push([this.strokeStyle, x, y, w, h]);
    },
  };
  const canvas = {
    width: 240,
    height: 480,
    getContext: () => ctx,
  } as unknown as HTMLCanvasElement;
  const draw = vi.fn(() => 0);
  const s = start(draw),
    before = structuredClone(s);
  const paint = canvasView(canvas);
  paint(s);
  expect(strokes.filter(([color]) => color === "#567570")).toEqual([
    ["#567570", 75, 459, 18, 18],
    ["#567570", 99, 459, 18, 18],
    ["#567570", 123, 459, 18, 18],
    ["#567570", 147, 459, 18, 18],
  ]);
  expect(s).toEqual(before);
  expect(draw).toHaveBeenCalledTimes(2);
  strokes.length = 0;
  paint({ ...s, status: "paused" });
  expect(strokes.filter(([color]) => color === "#567570")).toHaveLength(4);
  for (const inactive of [ready(), { ...s, status: "gameover" as const, active: null }]) {
    strokes.length = 0;
    paint(inactive);
    expect(strokes.filter(([color]) => color === "#567570")).toHaveLength(0);
  }
  strokes.length = 0;
  const { act } = await import("../../src/core/game");
  paint(act(s, "hardDrop", draw));
  expect(strokes.filter(([color]) => color === "#567570")).toHaveLength(0);
});
