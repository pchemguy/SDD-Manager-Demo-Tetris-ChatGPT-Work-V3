/** Own the live snapshot and serialize browser-independent core/view collaboration. */
import { ready, start, act, advance } from "../core/game";
import type { Draw } from "../core/types";
import type { Command, View } from "./ports";
export class Controller {
  private state = ready();
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
    if (command === "start") {
      if (this.state.status !== "ready") return;
      this.state = start(this.draw);
    } else if (command === "restart") {
      if (this.state.status === "ready") return;
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
    this.state = advance(this.state, ms, this.draw);
    this.render();
  }
}
