/** Deterministic lifecycle and succession scenarios, independent of browser timing. */
import { test, expect, vi } from "vitest";
import { ready, start, promote } from "../../src/core/game";
test("ready consumes no draws; Start consumes active and preview", () => {
  const draw = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(0.2);
  expect(ready().next).toBe(null);
  const s = start(draw);
  expect(draw).toHaveBeenCalledTimes(2);
  expect(s.active).toEqual({ kind: "I", x: 3, y: 0, rotation: 0 });
  expect(s.next).toBe("T");
  expect(s.status).toBe("running");
});
test("preview promotion consumes one draw from the remaining bag", () => {
  const s = start(() => 0.2);
  const n = promote(s, () => 0.2);
  expect(n.active?.kind).toBe("T");
  expect(n.next).toBe("S");
  expect(n.active?.x).toBe(3);
  expect(s.active).not.toBe(n.active);
});
test("blocked preview spawn ends play without settlement", () => {
  const s = start(() => 0.2);
  s.active!.y = 18;
  s.board[0][4] = "T";
  const draw = vi.fn(() => 0);
  const n = promote(s, draw);
  expect(n.status).toBe("gameover");
  expect(n.active).toBe(null);
  expect(n.board[0][4]).toBe("T");
  expect(n.next).toBe("I");
  expect(draw).toHaveBeenCalledTimes(1);
});
test("restart allocates fresh board and counters; draw boundaries are exact", () => {
  const draws = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 0.99999];
  const kinds = ["I", "O", "T", "S", "Z", "J", "L", "L"];
  draws.forEach((v, i) => expect(start(() => v).active?.kind).toBe(kinds[i]));
  const a = start(() => 0);
  a.board[19][0] = "I";
  expect(start(() => 0).board[19][0]).toBe(null);
});
import { act, advance } from "../../src/core/game";
test("movement and wall kick preserve unrelated state/timer", () => {
  const s = start(() => 0);
  s.fallMs = 80;
  expect(act(s, "left", () => 0).active?.x).toBe(2);
  s.active = { kind: "I", x: -1, y: 0, rotation: 1 };
  const n = act(s, "cw", () => 0);
  expect(n.active).toEqual({ kind: "I", x: 1, y: 0, rotation: 2 });
  expect(n.fallMs).toBe(80);
});
test("exact gravity intervals and partial remainder", () => {
  let s = start(() => 0.2);
  s = advance(s, 999, () => 0.2);
  expect(s.active?.y).toBe(0);
  s = advance(s, 2, () => 0.2);
  expect(s.active?.y).toBe(1);
  expect(s.fallMs).toBe(1);
});
test("contact waits one full gravity interval before lock", () => {
  let s = start(() => 0.2);
  s.active!.y = 17;
  s = advance(s, 1000, () => 0.2);
  expect(s.active?.y).toBe(18);
  expect(s.board[19][4]).toBe(null);
  s = advance(s, 1000, () => 0.2);
  expect(s.board[19][4]).toBe("O");
  expect(s.active?.y).toBe(0);
  expect(s.fallMs).toBe(0);
});
test("large update locks only one piece and discards remaining time", () => {
  const s = start(() => 0.2);
  s.active!.y = 18;
  const n = advance(s, 50000, () => 0.2);
  expect(n.board.flat().filter(Boolean)).toHaveLength(4);
  expect(n.active?.y).toBe(0);
});
test("lock clears four rows before preview spawn and leaves input board unchanged", () => {
  const s = start(() => 0.2);
  s.active = { kind: "I", x: 7, y: 16, rotation: 1 };
  for (let y = 16; y < 20; y++) for (let x = 0; x < 9; x++) s.board[y][x] = "J";
  const n = advance(s, 1000, () => 0.2);
  expect(n.board.flat().every((v) => v === null)).toBe(true);
  expect(n.status).toBe("running");
  expect(s.board[19][0]).toBe("J");
});
test("game over ignores further movement and time", () => {
  const s = start(() => 0.2);
  s.status = "gameover";
  s.active = null;
  expect(act(s, "left", () => 0)).toBe(s);
  expect(advance(s, 1000, () => 0)).toBe(s);
});

test("held soft drop retains the full normal locking delay with no drop reward", () => {
  const s = start(() => 0.2);
  s.soft = true;
  s.active!.y = 18;
  const n = advance(s, 1000, () => 0.2);
  expect(n.board[19][4]).toBe("O");
  expect(n.active?.y).toBe(0);
  expect(n.fallMs).toBe(0);
  expect(n.score).toBe(0);
});
test("invalid times, actions and malformed state reject explicitly before mutation", () => {
  const s = start(() => 0.2);
  for (const ms of [-1, NaN, Infinity])
    expect(() => advance(s, ms, () => 0)).toThrow();
  expect(() => act(s, "teleport" as never, () => 0)).toThrow();
  const bad = structuredClone(s);
  bad.board[0].pop();
  expect(() => act(bad, "left", () => 0)).toThrow();
  const noninteger = structuredClone(s);
  noninteger.active!.x = 0.5;
  expect(() => act(noninteger, "left", () => 0)).toThrow();
});
test("invalid draws and score overflow are atomic", () => {
  for (const u of [-0.1, 1, NaN, Infinity])
    expect(() => start(() => u)).toThrow();
  const s = start(() => 0.2);
  s.active!.y = 18;
  const before = structuredClone(s);
  expect(() => advance(s, 1000, () => 1)).toThrow();
  expect(s).toEqual(before);
  const full = start(() => 0.2);
  full.active = { kind: "I", x: 7, y: 16, rotation: 1 };
  full.score = Number.MAX_SAFE_INTEGER;
  for (let y = 16; y < 20; y++)
    for (let x = 0; x < 9; x++) full.board[y][x] = "J";
  const original = structuredClone(full);
  expect(() => advance(full, 1000, () => 0)).toThrow();
  expect(full).toEqual(original);
});

test("sparse board rows and cells reject atomically", () => {
  for (const hole of ["row", "cell"]) {
    const s = start(() => 0.2);
    if (hole === "row") delete s.board[19];
    else delete s.board[19][0];
    const before = structuredClone(s);
    expect(() => act(s, "left", () => 0)).toThrow("Invalid board state");
    expect(s).toEqual(before);
  }
});
