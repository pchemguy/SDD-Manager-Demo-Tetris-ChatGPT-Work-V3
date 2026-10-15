/** Hard drop follows the same grounded timer and never locks on the action itself. */
import { test, expect, vi } from "vitest";
import { start, act, advance } from "../../src/core/game";
test("hard drop lands over an obstacle without settlement, draws or reward", () => {
  const s = start(() => 0.2);
  s.board[12][4] = "J";
  const before = structuredClone(s), draw = vi.fn(() => 0);
  const n = act(s, "hardDrop", draw);
  expect(n.active).toMatchObject({ x: 4, y: 10, rotation: 0 });
  expect(n.board).toEqual(s.board);
  expect(n.score).toBe(0);
  expect(n.next).toBe(s.next);
  expect(n.lockMs).toBe(0);
  expect(draw).not.toHaveBeenCalled();
  expect(s).toEqual(before);
  expect(advance(n, 999, draw).board.flat().filter(Boolean)).toHaveLength(1);
  expect(advance(n, 1000, draw).board.flat().filter(Boolean)).toHaveLength(5);
});
test("hard drop on support preserves an accrued delay and is inert when paused", () => {
  const s = start(() => 0.2);
  s.active!.y = 18;
  let n = advance(s, 700, () => 0);
  n = act(n, "hardDrop", () => 0);
  expect(n.lockMs).toBe(700);
  expect(advance(n, 300, () => 0).board.flat().filter(Boolean)).toHaveLength(4);
  const paused = { ...n, status: "paused" as const };
  expect(act(paused, "hardDrop", () => 0)).toBe(paused);
});

import { landing } from "../../src/core/board";
test("landing is pure, stops before an obstacle and rejects illegal sources", () => {
  const s = start(() => 0.2);
  s.board[12][4] = "J";
  const before = structuredClone(s);
  expect(landing(s.board, s.active!)).toEqual({ ...s.active!, y: 10 });
  expect(s).toEqual(before);
  expect(() => landing(s.board, { ...s.active!, y: -1 })).toThrow();
});
