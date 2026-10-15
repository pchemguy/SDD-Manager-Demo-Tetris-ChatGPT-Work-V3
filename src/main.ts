/** Compose and contain failures of a disposable browser application. */
import "./style.css";
import { Controller } from "./session/controller";
import { canvasView } from "./view/canvas";
import { domView } from "./view/dom";
import { randomDraw } from "./platform/random";
import { clock } from "./platform/clock";
import { bindInput } from "./platform/input";
/** Mount one application; failures stop all owned work and expose reload guidance. */
export function mount(root: Document = document): () => void {
  let session: Controller | undefined,
    timer: ReturnType<typeof clock> | undefined,
    unbind: (() => void) | undefined,
    disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    timer?.stop();
    unbind?.();
    session?.dispose();
    root.defaultView?.removeEventListener("pagehide", dispose);
  };
  const fail = () => {
    dispose();
    let region = root.getElementById("error");
    if (!region) {
      region = root.createElement("p");
      region.id = "error";
      region.setAttribute("role", "alert");
      root.body.append(region);
    }
    region.hidden = false;
    region.textContent = "Game error. Reload the page to start again.";
    const status = root.getElementById("status");
    if (status) status.textContent = "Error";
    for (const button of root.querySelectorAll<HTMLButtonElement>(
      "#start,#pause,#restart",
    ))
      button.disabled = true;
    console.error(
      "Tetris stopped: an initialization or application operation failed.",
    );
  };
  const guard = (fn: () => void) => {
    if (disposed) return;
    try {
      fn();
    } catch {
      fail();
    }
  };
  try {
    for (const id of [
      "board",
      "preview",
      "status",
      "score",
      "lines",
      "level",
      "start",
      "pause",
      "restart",
    ])
      if (!root.getElementById(id)) throw Error("Missing required markup");
    const paint = canvasView(
        root.getElementById("board") as HTMLCanvasElement,
        root.getElementById("preview") as HTMLCanvasElement,
      ),
      text = domView(root);
    session = new Controller(randomDraw, (s) => {
      paint(s);
      text(s);
    });
    timer = clock((ms) => guard(() => session!.frame(ms)));
    unbind = bindInput(
      root,
      (c) => guard(() => session!.dispatch(c)),
      () => timer?.reset(),
    );
    root.defaultView?.addEventListener("pagehide", dispose, { once: true });
    timer.start();
  } catch {
    fail();
  }
  return dispose;
}
if (document.querySelector("script[data-tetris-entry]")) mount();
