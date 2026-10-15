/** Tetromino local cells, fixed-square rotation, and board projection (SPEC B2). */
import type { Active, Cell, Piece } from "./types";
const SHAPES: Record<Piece, Cell[]> = {
  I: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
  ],
  O: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  T: [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  S: [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
  Z: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  J: [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  L: [
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
};
/** Width of the canonical rotation square; padding never controls placement legality. */
export function size(kind: Piece): number {
  return kind === "I" ? 4 : kind === "O" ? 2 : 3;
}
/** Project a piece without mutating shared shapes; rotation is normalized modulo four. */
export function cells(piece: Active): Cell[] {
  return SHAPES[piece.kind].map(([cx, cy]) => {
    let x = cx,
      y = cy;
    for (
      let r = 0;
      r < ((piece.rotation % 4) + 4) % 4 && piece.kind !== "O";
      r++
    ) {
      [x, y] = [size(piece.kind) - 1 - y, x];
    }
    return [x + piece.x, y + piece.y];
  });
}

/** Ordered SRS quarter-turn offsets in board coordinates (x right, y down). */
const JLSTZ: Record<string, readonly Cell[]> = {
  "01": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  "10": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  "12": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  "21": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  "23": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
  "32": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  "30": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  "03": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
};
const I_KICKS: Record<string, readonly Cell[]> = {
  "01": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, 1],
    [1, -2],
  ],
  "10": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, -1],
    [-1, 2],
  ],
  "12": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, -2],
    [2, 1],
  ],
  "21": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, 2],
    [-2, -1],
  ],
  "23": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, -1],
    [-1, 2],
  ],
  "32": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, 1],
    [1, -2],
  ],
  "30": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, 2],
    [-2, -1],
  ],
  "03": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, -2],
    [2, 1],
  ],
};
/** Read-only offsets; callers commit only the first legal placement. */
export function kicks(kind: Piece, from: number, to: number): readonly Cell[] {
  return kind === "O"
    ? [[0, 0]]
    : ((kind === "I" ? I_KICKS : JLSTZ)[`${from}${to}`] ?? []);
}
