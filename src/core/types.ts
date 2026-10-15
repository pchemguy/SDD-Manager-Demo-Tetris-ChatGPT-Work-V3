/** Shared core values; no browser facilities or mutable global game state. */
export const PIECES = ['I','O','T','S','Z','J','L'] as const;
export type Piece = typeof PIECES[number];
export type Cell = readonly [number,number];
export interface Active { kind: Piece; x:number; y:number; rotation:number }
export type Board = (Piece|null)[][];
