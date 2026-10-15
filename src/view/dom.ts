/** Snapshot-driven semantic status and native control availability. */
import type { Game } from "../core/types";
/** Render counters and lifecycle labels; do not own event handlers or game state. */
export function domView(root: Document): (s: Game) => void {
  return (s) => {
    for (const id of ["score", "lines", "level"] as const)
      root.getElementById(id)!.textContent = String(s[id]);
    root.getElementById("status")!.textContent =
      s.status === "gameover"
        ? "Game over"
        : s.status[0].toUpperCase() + s.status.slice(1);
    (root.getElementById("start") as HTMLButtonElement).disabled =
      s.status !== "ready";
    (root.getElementById("restart") as HTMLButtonElement).disabled =
      s.status === "ready";
    const pause = root.getElementById("pause") as HTMLButtonElement;
    pause.disabled = s.status !== "running" && s.status !== "paused";
    pause.textContent = s.status === "paused" ? "Resume" : "Pause";
  };
}
