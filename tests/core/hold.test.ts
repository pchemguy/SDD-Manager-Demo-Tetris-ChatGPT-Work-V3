/** Hold consumes preview only for an empty slot and is limited until the next lock. */
import { test, expect, vi } from "vitest";
import { start, act, advance } from "../../src/core/game";
test("empty Hold uses preview once; occupied swap is draw-free and respawns", () => {
  const draw = vi.fn(() => 0);
  let s = start(draw);
  s = act(s, "hold", draw);
  expect(s.hold).toBe("I");
  expect(s.holdUsed).toBe(true);
  expect(s.active).toEqual({ kind: "O", x: 4, y: 0, rotation: 0 });
  expect(s.next).toBe("T");
  expect(draw).toHaveBeenCalledTimes(3);
  expect(act(s, "hold", draw)).toBe(s);
  s = advance(act(s, "hardDrop", draw), 1000, draw);
  expect(s.holdUsed).toBe(false);
  const next = s.next,
    bag = s.bag.slice();
  s = act(s, "hold", draw);
  expect(s.active).toEqual({ kind: "I", x: 3, y: 0, rotation: 0 });
  expect(s.hold).toBe("T");
  expect(s.next).toBe(next);
  expect(s.bag).toEqual(bag);
  expect(draw).toHaveBeenCalledTimes(4);
});
test("blocked empty Hold still consumes one selection and ends without settlement", () => {
  const draw = vi.fn(() => 0);
  const s = start(draw);
  s.active!.y = 10;
  s.board[0][4] = "J";
  const n = act(s, "hold", draw);
  expect(n.status).toBe("gameover");
  expect(n.active).toBe(null);
  expect(n.hold).toBe("I");
  expect(n.board).toEqual(s.board);
  expect(draw).toHaveBeenCalledTimes(3);
});
test("Hold clears piece timing/soft state and is inert during pause and after restart", () => {
  let s = start(() => 0.2);
  s = act(s, "hardDrop", () => 0);
  s.soft = true;
  s = advance(s, 600, () => 0);
  const paused = { ...s, status: "paused" as const };
  expect(act(paused, "hold", () => 0)).toBe(paused);
  const n = act(s, "hold", () => 0);
  expect(n).toMatchObject({ lockMs: 0, fallMs: 0, soft: false });
  expect(start(() => 0)).toMatchObject({ hold: null, holdUsed: false });
});
test("blocked occupied swap preserves preview and consumes no draw", () => {
  const s = start(() => 0);
  s.hold = "O";
  s.active!.y = 10;
  s.board[0][4] = "J";
  const draw = vi.fn(() => 0);
  const n = act(s, "hold", draw);
  expect(n.status).toBe("gameover");
  expect(n.active).toBe(null);
  expect(n.next).toBe(s.next);
  expect(n.hold).toBe("I");
  expect(n.board).toEqual(s.board);
  expect(draw).not.toHaveBeenCalled();
});
