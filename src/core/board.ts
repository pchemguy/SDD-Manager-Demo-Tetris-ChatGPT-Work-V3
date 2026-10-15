/** Pure 10×20 placement, atomic settlement, and simultaneous row compaction. */
import { cells } from "./geometry";
import type { Active, Board, Cell, Piece } from "./types";
/** Allocate independent empty rows. */
export const emptyBoard = (): Board =>
  Array.from({ length: 20 }, () => Array(10).fill(null));
/** Check occupied cells only, including bounds and overlap. */
export function legal(b: Board, c: Cell[]): boolean {
  return c.every(
    ([x, y]) =>
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      x < 10 &&
      y >= 0 &&
      y < 20 &&
      b[y][x] === null,
  );
}
/** Return a copy with settled cells; reject the complete candidate before writing. */
export function settle(b: Board, c: Cell[], p: Piece): Board {
  if (!legal(b, c) || new Set(c.map((v) => v.join(","))).size !== c.length)
    throw Error("Illegal settlement");
  const n = b.map((r) => r.slice());
  for (const [x, y] of c) n[y][x] = p;
  return n;
}
/** Remove full rows simultaneously, keeping the order of every retained row. */
export function clearRows(b: Board): { board: Board; cleared: number } {
  const keep = b.filter((r) => r.some((v) => v === null)).map((r) => r.slice());
  const cleared = 20 - keep.length;
  return {
    board: [
      ...Array.from({ length: cleared }, () => Array(10).fill(null)),
      ...keep,
    ],
    cleared,
  };
}

/** Furthest reachable legal descent; no cell or active-piece mutation. */
export function landing(board: Board, active: Active): Active {
  if (!legal(board, cells(active))) throw Error("Invalid landing source");
  const result = { ...active };
  while (legal(board, cells({ ...result, y: result.y + 1 }))) result.y++;
  return result;
}
