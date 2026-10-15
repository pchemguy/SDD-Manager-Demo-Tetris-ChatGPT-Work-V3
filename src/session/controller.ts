/** Own the live snapshot and serialize browser-independent core/view collaboration. */
import { ready, start, act, advance } from "../core/game";
import type { Draw } from "../core/types";
import type { Command, View } from "./ports";
export class Controller {
  private state = ready();
  private held: ("left" | "right")[] = [];
  private repeatMs = 0;
  private repeatDelay = 150;
  private clearHeld() {
    this.held = [];
    this.repeatMs = 0;
    this.repeatDelay = 150;
  }
  /** Render an isolated ready snapshot without consuming randomness. */
  constructor(
    private draw: Draw,
    private view: View,
  ) {
    this.render();
  }
  /** Return an isolated observation; consumers cannot mutate the live state. */
  get snapshot() {
    return structuredClone(this.state);
  }
  private render() {
    this.view(this.snapshot);
  }
  /** Apply one command in order; Start and Restart have distinct lifecycle guards. */
  dispatch(command: Command) {
    if (command === "leftRelease" || command === "rightRelease") {
      const dir = command === "leftRelease" ? "left" : "right";
      const winner = this.held.at(-1);
      this.held = this.held.filter((d) => d !== dir);
      if (winner === dir) {
        this.repeatMs = 0;
        this.repeatDelay = 150;
      }
      return;
    }
    if (command === "left" || command === "right") {
      if (this.state.status !== "running" || this.held.includes(command))
        return;
      this.held.push(command);
      this.repeatMs = 0;
      this.repeatDelay = 150;
    }
    if (command === "start") {
      if (this.state.status !== "ready") return;
      this.clearHeld();
      this.state = start(this.draw);
    } else if (command === "restart") {
      if (this.state.status === "ready") return;
      this.clearHeld();
      this.state = start(this.draw);
    } else if (command === "down" || command === "downRelease") {
      if (this.state.status !== "running") return;
      this.state =
        command === "down"
          ? { ...act(this.state, "down", this.draw), soft: true, fallMs: 0 }
          : { ...this.state, soft: false, fallMs: 0 };
    } else this.state = act(this.state, command, this.draw);
    this.render();
  }
  /** Deliver logical elapsed milliseconds; non-running states remain inert. */
  frame(ms: number) {
    if (!Number.isFinite(ms) || ms < 0) throw Error("Invalid elapsed time");
    if (this.state.status === "running" && this.held.length) {
      this.repeatMs += ms;
      while (this.repeatMs >= this.repeatDelay) {
        this.repeatMs -= this.repeatDelay;
        this.repeatDelay = 50;
        this.state = act(this.state, this.held.at(-1)!, this.draw);
      }
    }
    this.state = advance(this.state, ms, this.draw);
    this.render();
  }
}
