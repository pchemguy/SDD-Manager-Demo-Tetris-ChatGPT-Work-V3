/** Ground contact starts a full normal-gravity delay, independent of falling speed. */
import { test, expect } from "vitest";
import { start, act, advance } from "../../src/core/game";
const draw = () => 0.2;
test("only post-contact remainder counts and the exact boundary locks once", () => {
  const s = start(draw);
  s.active!.y = 17;
  let n = advance(s, 1500, draw);
  expect(n.active?.y).toBe(18);
  expect(n.lockMs).toBe(500);
  expect(n.board.flat().filter(Boolean)).toHaveLength(0);
  n = advance(n, 499, draw);
  expect(n.lockMs).toBe(999);
  n = advance(n, 1, draw);
  expect(n.board.flat().filter(Boolean)).toHaveLength(4);
  expect(n.active?.y).toBe(0);
  expect(n.lockMs).toBe(0);
});
test("failed down, soft drop and grounded moves cannot reset or shorten delay", () => {
  const s = start(draw);
  s.active!.y = 18;
  s.soft = true;
  expect(act(s, "down", draw).board.flat().filter(Boolean)).toHaveLength(0);
  let n = advance(s, 700, draw);
  n = act(n, "left", draw);
  n = act(n, "down", draw);
  expect(n.lockMs).toBe(700);
  expect(advance(n, 299, draw).board.flat().filter(Boolean)).toHaveLength(0);
  expect(advance(n, 300, draw).board.flat().filter(Boolean)).toHaveLength(4);
});
test("leaving support clears timing and pause freezes both accumulators", () => {
  const s = start(draw);
  s.active!.y = 10;
  s.board[12][4] = "J";
  let n = advance(s, 600, draw);
  n = act(n, "right", draw);
  expect(n.lockMs).toBe(0);
  expect(n.fallMs).toBe(0);
  const paused = { ...n, status: "paused" as const };
  expect(advance(paused, 5000, draw)).toBe(paused);
});
test("higher levels use their normal interval and discard post-lock elapsed time", () => {
  const s = start(draw);
  s.lines = 10;
  s.level = 2;
  s.active!.y = 18;
  expect(advance(s, 799, draw).board.flat().filter(Boolean)).toHaveLength(0);
  const n = advance(s, 50000, draw);
  expect(n.board.flat().filter(Boolean)).toHaveLength(4);
  expect(n.active?.y).toBe(0);
  expect(n.fallMs).toBe(0);
});
test("lock delay follows the 100 ms normal-gravity floor", () => {
  const s = start(draw);
  s.lines = 110;
  s.level = 12;
  s.active!.y = 18;
  expect(advance(s, 99, draw).board.flat().filter(Boolean)).toHaveLength(0);
  expect(advance(s, 100, draw).board.flat().filter(Boolean)).toHaveLength(4);
});
