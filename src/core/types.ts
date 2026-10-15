/** Shared core values; no browser facilities or mutable global game state. */
export const PIECES = ["I", "O", "T", "S", "Z", "J", "L"] as const;
export type Piece = (typeof PIECES)[number];
export type Cell = readonly [number, number];
export interface Active {
  kind: Piece;
  x: number;
  y: number;
  rotation: number;
}
export type Board = (Piece | null)[][];
/** Canonical gameplay snapshot; the session owns the live reference. */
export interface Game {
  board: Board;
  active: Active | null;
  next: Piece | null;
  bag: Piece[];
  hold: Piece | null;
  holdUsed: boolean;
  status: "ready" | "running" | "paused" | "gameover";
  score: number;
  lines: number;
  level: number;
  fallMs: number;
  lockMs: number;
  soft: boolean;
}
export type Draw = () => number;
export type Move =
  "left" | "right" | "cw" | "ccw" | "down" | "hardDrop" | "hold";
