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
