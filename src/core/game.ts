/** Canonical lifecycle and explicitly supplied random piece succession (SPEC B2). */
import { emptyBoard, legal, settle, clearRows } from "./board";
import { progression, gravity } from "./scoring";
import { cells, size } from "./geometry";
import { PIECES, type Piece, type Game, type Draw, type Active } from "./types";
/** Allocate the ready snapshot; no random collaborator is consulted. */
export function ready(): Game {
  return {
    board: emptyBoard(),
    active: null,
    next: null,
    status: "ready",
    score: 0,
    lines: 0,
    level: 1,
    fallMs: 0,
  };
}
/** Map one finite uniform draw to a piece. Invalid sources fail explicitly. */
function choose(draw: Draw): Piece {
  const u = draw();
  if (!Number.isFinite(u) || u < 0 || u >= 1)
    throw Error("Invalid random draw");
  return PIECES[Math.floor(u * 7)];
}
function spawn(kind: Piece): Active {
  return { kind, x: Math.floor((10 - size(kind)) / 2), y: 0, rotation: 0 };
}
/** Start/restart with fresh state and exactly two draws. */
export function start(draw: Draw): Game {
  const active = spawn(choose(draw)),
    next = choose(draw);
  return { ...ready(), active, next, status: "running" };
}
/** Promote stored preview, replenish once, and detect blocked spawn without settlement. */
export function promote(s: Game, draw: Draw): Game {
  if (!s.next) throw Error("Missing preview");
  const active = spawn(s.next),
    next = choose(draw);
  const ok = legal(s.board, cells(active));
  return {
    ...s,
    active: ok ? active : null,
    next,
    status: ok ? "running" : "gameover",
    fallMs: 0,
  };
}
/** Apply a move atomically. Only a failed downward attempt settles a piece. */
export function act(s: Game, action: import("./types").Move, draw: Draw): Game {
  if (s.status !== "running" || !s.active) return s;
  const active = { ...s.active };
  if (action === "left") active.x--;
  else if (action === "right") active.x++;
  else if (action === "cw") active.rotation = (active.rotation + 1) % 4;
  else if (action === "ccw") active.rotation = (active.rotation + 3) % 4;
  else active.y++;
  if (legal(s.board, cells(active))) return { ...s, active };
  if (action !== "down") return s;
  const result = clearRows(settle(s.board, cells(s.active), s.active.kind));
  return promote(
    {
      ...s,
      board: result.board,
      ...progression(s.score, s.lines, result.cleared),
    },
    draw,
  );
}
/** Consume level-dependent logical gravity; stop at the first lock and discard excess. */
export function advance(s: Game, ms: number, draw: Draw): Game {
  if (s.status !== "running") return s;
  let next = { ...s, fallMs: s.fallMs + ms };
  while (next.fallMs >= gravity(next.level)) {
    next = { ...next, fallMs: next.fallMs - gravity(next.level) };
    const moved = act(next, "down", draw);
    if (moved.board !== next.board) return moved;
    next = moved;
  }
  return next;
}
