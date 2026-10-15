/** Assemble a disposable browser application; no test-only global state hooks. */
import "./style.css";
import { Controller } from "./session/controller";
import { canvasView } from "./view/canvas";
import { domView } from "./view/dom";
import { randomDraw } from "./platform/random";
import { clock } from "./platform/clock";
import { bindInput } from "./platform/input";
/** Mount one application into its document; caller must dispose before rebuilding. */
export function mount(root: Document = document): () => void {
  const paint = canvasView(
      root.getElementById("board") as HTMLCanvasElement,
      root.getElementById("preview") as HTMLCanvasElement,
    ),
    text = domView(root);
  const session = new Controller(randomDraw, (s) => {
    paint(s);
    text(s);
  });
  const timer = clock((ms) => session.frame(ms));
  const unbind = bindInput(
    root,
    (c) => session.dispatch(c),
    () => timer.reset(),
  );
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    timer.stop();
    unbind();
    session.dispose();
    root.defaultView?.removeEventListener("pagehide", dispose);
  };
  root.defaultView?.addEventListener("pagehide", dispose, { once: true });
  timer.start();
  return dispose;
}
if (document.querySelector("script[data-tetris-entry]")) mount();
