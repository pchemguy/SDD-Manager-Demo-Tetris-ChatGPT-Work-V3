/** New snapshot fields reject malformed data without partial transitions. */
import { test, expect, vi } from "vitest";
import { act, advance, ready, start } from "../../src/core/game";
import type { Game } from "../../src/core/types";
const malformed: [string, (s: Game) => void][] = [
  [
    "duplicate bag",
    (s) => {
      s.bag = ["I", "I"];
    },
  ],
  [
    "overfull bag",
    (s) => {
      s.bag = ["I", "O", "T", "S", "Z", "J", "L"];
    },
  ],
  [
    "sparse bag",
    (s) => {
      s.bag = new Array(2);
    },
  ],
  [
    "invalid identity",
    (s) => {
      s.bag = ["?" as never];
    },
  ],
  [
    "missing bag",
    (s) => {
      s.bag = undefined as never;
    },
  ],
  [
    "invalid held identity",
    (s) => {
      s.hold = "?" as never;
    },
  ],
  [
    "missing held slot",
    (s) => {
      s.hold = undefined as never;
    },
  ],
  [
    "invalid Hold-use flag",
    (s) => {
      s.holdUsed = 1 as never;
    },
  ],
  [
    "used empty slot",
    (s) => {
      s.holdUsed = true;
    },
  ],
  [
    "negative lock",
    (s) => {
      s.lockMs = -1;
    },
  ],
  [
    "nonfinite lock",
    (s) => {
      s.lockMs = Infinity;
    },
  ],
  [
    "missing lock",
    (s) => {
      s.lockMs = undefined as never;
    },
  ],
  [
    "airborne lock",
    (s) => {
      s.lockMs = 1;
    },
  ],
];
for (const [name, corrupt] of malformed)
  test(name + " rejects atomically before any draw", () => {
    const s = start(() => 0);
    corrupt(s);
    const before = structuredClone(s),
      draw = vi.fn(() => 0);
    for (const action of ["hold", "hardDrop", "cw"] as const)
      expect(() => act(s, action, draw)).toThrow();
    expect(() => advance(s, 1000, draw)).toThrow();
    expect(s).toEqual(before);
    expect(draw).not.toHaveBeenCalled();
  });
test("ready rejects bag, Hold and timer residue", () => {
  for (const corrupt of [
    (s: Game) => {
      s.bag = ["I"];
    },
    (s: Game) => {
      s.hold = "T";
    },
    (s: Game) => {
      s.lockMs = 1;
    },
  ]) {
    const s = ready();
    corrupt(s);
    expect(() => act(s, "hold", () => 0)).toThrow();
  }
});
test("invalid empty-Hold draw and delayed-lock draw preserve every source field", () => {
  for (const u of [-1, 1, NaN, Infinity]) {
    const s = start(() => 0),
      before = structuredClone(s);
    expect(() => act(s, "hold", () => u)).toThrow("Invalid random draw");
    expect(s).toEqual(before);
    const grounded = advance(
        act(s, "hardDrop", () => 0),
        999,
        () => 0,
      ),
      original = structuredClone(grounded);
    expect(() => advance(grounded, 1, () => u)).toThrow("Invalid random draw");
    expect(grounded).toEqual(original);
  }
});
test("score overflow at delayed settlement consumes no selection and preserves Hold and bag", () => {
  const s = start(() => 0);
  s.active = { kind: "I", x: 7, y: 16, rotation: 1 };
  s.hold = "T";
  s.holdUsed = true;
  s.score = Number.MAX_SAFE_INTEGER;
  s.lockMs = 999;
  for (let y = 16; y < 20; y++) for (let x = 0; x < 9; x++) s.board[y][x] = "J";
  const before = structuredClone(s),
    draw = vi.fn(() => 0);
  expect(() => advance(s, 1, draw)).toThrow();
  expect(s).toEqual(before);
  expect(draw).not.toHaveBeenCalled();
});
