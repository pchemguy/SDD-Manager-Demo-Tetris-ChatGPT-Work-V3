/** Literal rewards, level-boundary ordering, and interval-floor contracts. */
import { test, expect } from "vitest";
import { progression, gravity } from "../../src/core/scoring";
import { start, act, advance } from "../../src/core/game";
test("clear rewards and no-clear outcome", () => {
  [0, 100, 300, 500, 800].forEach((reward, n) =>
    expect(progression(0, 0, n)).toEqual({ score: reward, lines: n, level: 1 }),
  );
  expect(progression(9, 10, 4)).toEqual({ score: 1609, lines: 14, level: 2 });
});
test("crossing 10 uses pre-clear multiplier", () => {
  expect(progression(20, 9, 2)).toEqual({ score: 320, lines: 11, level: 2 });
  expect(gravity(2)).toBe(800);
  expect(gravity(12)).toBe(100);
});
test("lock reward and updated gravity integrate atomically", () => {
  const s = start(() => 0.2);
  s.active = { kind: "I", x: 7, y: 16, rotation: 1 };
  s.lines = 9;
  for (let y = 16; y < 20; y++) for (let x = 0; x < 9; x++) s.board[y][x] = "J";
  const n = advance(s, 1000, () => 0.2);
  expect(n).toMatchObject({ score: 800, lines: 13, level: 2, fallMs: 0 });
  expect(advance(n, 800, () => 0.2).active?.y).toBe(1);
  expect(s.score).toBe(0);
});
