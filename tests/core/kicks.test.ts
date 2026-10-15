/** Literal F6 board-coordinate examples exercise order through public actions. */
import { test, expect, vi } from "vitest";
import { act, start } from "../../src/core/game";
import { cells } from "../../src/core/geometry";
import { legal, emptyBoard } from "../../src/core/board";
import type { Active, Cell, Piece } from "../../src/core/types";
const transitions = [
  [0, 1],
  [1, 0],
  [1, 2],
  [2, 1],
  [2, 3],
  [3, 2],
  [3, 0],
  [0, 3],
];
const j: Cell[][] = [
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
];
const i: Cell[][] = [
  [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, 1],
    [1, -2],
  ],
  [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, -1],
    [-1, 2],
  ],
  [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, -2],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, 2],
    [-2, -1],
  ],
  [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, -1],
    [-1, 2],
  ],
  [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, 1],
    [1, -2],
  ],
  [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, 2],
    [-2, -1],
  ],
  [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, -2],
    [2, 1],
  ],
];
for (const kind of ["I", "J", "L", "S", "T", "Z"] as Piece[]) {
  transitions.forEach(([from, to], t) =>
    test(`${kind} ${from}->${to} uses first legal kick at walls/floor/obstacles`, () => {
      const offsets = kind === "I" ? i[t] : j[t];
      let checked = 0;
      // Each independently constructed board blocks every earlier candidate while
      // retaining a legal source and the chosen target. No production kick helper.
      for (let chosen = 1; chosen < 5; chosen++) {
        let found = false;
        for (let y = 0; y < 20 && !found; y++)
          for (let x = -2; x < 10 && !found; x++) {
            const source: Active = { kind, x, y, rotation: from };
            const target = {
              ...source,
              x: x + offsets[chosen][0],
              y: y + offsets[chosen][1],
              rotation: to,
            };
            const board = emptyBoard();
            if (!legal(board, cells(source)) || !legal(board, cells(target)))
              continue;
            const reserved = new Set(
              [...cells(source), ...cells(target)].map(([a, b]) => `${a},${b}`),
            );
            let possible = true;
            for (const [dx, dy] of offsets.slice(0, chosen)) {
              const earlier = cells({
                ...source,
                x: x + dx,
                y: y + dy,
                rotation: to,
              });
              if (!legal(board, earlier)) continue;
              const block = earlier.find(
                ([a, b]) => !reserved.has(`${a},${b}`),
              );
              if (!block) {
                possible = false;
                break;
              }
              board[block[1]][block[0]] = "O";
            }
            if (!possible) continue;
            const s = { ...start(() => 0), board, active: source };
            const before = structuredClone(s),
              draw = vi.fn(() => 0);
            const n = act(s, (to - from + 4) % 4 === 1 ? "cw" : "ccw", draw);
            expect(n.active).toEqual(target);
            expect(s).toEqual(before);
            expect(draw).not.toHaveBeenCalled();
            checked++;
            found = true;
          }
      }
      expect(checked).toBeGreaterThan(0);
    }),
  );
}
test("I floor kick uses the last offset and preserves continuous contact", () => {
  const s = start(() => 0);
  s.active = { kind: "I", x: 3, y: 18, rotation: 0 };
  s.lockMs = 700;
  const n = act(s, "cw", () => 0);
  expect(n.active).toEqual({ kind: "I", x: 4, y: 16, rotation: 1 });
  expect(n.lockMs).toBe(700); // still supported at row 19
  const wall = {
    ...start(() => 0),
    active: { kind: "I" as const, x: -1, y: 4, rotation: 1 },
  };
  expect(act(wall, "cw", () => 0).active).toEqual({
    kind: "I",
    x: 1,
    y: 4,
    rotation: 2,
  });
});
test("fully obstructed rotation rejects atomically and O stays in place", () => {
  const s = start(() => 0);
  s.active = { kind: "T", x: 3, y: 17, rotation: 0 };
  s.lockMs = 600;
  const own = new Set(cells(s.active).map(([x, y]) => `${x},${y}`));
  s.board = s.board.map((row, y) =>
    row.map((_, x) => (own.has(`${x},${y}`) ? null : "J")),
  );
  const before = structuredClone(s),
    draw = vi.fn(() => 0);
  expect(act(s, "cw", draw)).toBe(s);
  expect(s).toEqual(before);
  expect(draw).not.toHaveBeenCalled();
  const o = start(() => 0.2);
  o.active!.y = 18;
  o.lockMs = 250;
  const n = act(o, "ccw", draw);
  expect(cells(n.active!)).toEqual(cells(o.active!));
  expect(n.lockMs).toBe(250);
});

test("a wall kick leaving a support clears both timing accumulators", () => {
  const s = start(() => 0);
  s.active = { kind: "T", x: -1, y: 8, rotation: 1 };
  s.board[11][0] = "J";
  s.lockMs = 650;
  const n = act(s, "cw", () => 0);
  expect(n.active).toEqual({ kind: "T", x: 0, y: 8, rotation: 2 });
  expect(n.lockMs).toBe(0);
  expect(n.fallMs).toBe(0);
});
