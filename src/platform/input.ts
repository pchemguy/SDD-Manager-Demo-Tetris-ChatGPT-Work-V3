/** Native input translation; rules and rendering remain outside event handlers. */
import type { Command } from "../session/ports";
export function bindInput(
  root: Document,
  dispatch: (c: Command) => void,
  reset: () => void,
): () => void {
  const board = root.getElementById("board")!;
  const listeners: (() => void)[] = [];
  const listen = (target: EventTarget, name: string, fn: EventListener) => {
    target.addEventListener(name, fn);
    listeners.push(() => target.removeEventListener(name, fn));
  };
  for (const id of ["start", "restart"] as const)
    listen(root.getElementById(id)!, "click", () => {
      dispatch(id);
      reset();
      board.focus();
    });
  listen(root, "keydown", (event) => {
    const e = event as KeyboardEvent;
    if (e.target !== board || e.repeat) return;
    const c: Record<string, Command> = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      z: "ccw",
      x: "cw",
    };
    const cmd = c[e.key] ?? c[e.key.toLowerCase()];
    if (cmd) {
      e.preventDefault();
      dispatch(cmd);
    }
  });
  listen(root, "keyup", (event) => {
    if ((event as KeyboardEvent).key === "ArrowDown") dispatch("downRelease");
  });
  return () => listeners.splice(0).forEach((fn) => fn());
}
