/** Seven-bag selection is snapshot-owned, deterministic and atomic. */
import { test, expect, vi } from "vitest";
import { ready, start, promote, act } from "../../src/core/game";
import { PIECES } from "../../src/core/types";
test("seven-bag emits canonical zero-draw permutations and owns its remainder", () => {
  expect(ready().bag).toEqual([]);
  const draw = vi.fn(() => 0);
  let s = start(draw);
  expect(s.bag).toEqual(["T", "S", "Z", "J", "L"]);
  const emitted = [s.active!.kind];
  for (let i = 0; i < 20; i++) {
    s = promote(s, draw);
    emitted.push(s.active!.kind);
  }
  for (let i = 0; i < 21; i += 7)
    expect(emitted.slice(i, i + 7)).toEqual(PIECES);
  expect(draw).toHaveBeenCalledTimes(22);
  expect(start(() => 0).bag).toEqual(["T", "S", "Z", "J", "L"]);
});
test("bag validation and a failed selection preserve the source snapshot", () => {
  const s = start(() => 0);
  const before = structuredClone(s);
  expect(() => promote(s, () => 1)).toThrow();
  expect(s).toEqual(before);
  s.bag = ["T", "T"];
  expect(() => act(s, "left", () => 0)).toThrow();
});
test("only bag boundaries permit adjacent repeats", () => {
  let count = 0;
  const draw = () => (++count <= 7 ? 0 : 0.99999);
  let s = start(draw);
  for (let i = 0; i < 6; i++) s = promote(s, draw);
  expect(s.active?.kind).toBe("L");
  expect(s.next).toBe("L");
  expect(s.bag).toEqual(["I", "O", "T", "S", "Z", "J"]);
});
