/** Native-event translation tested without pretending to provide a full DOM. */
import { test, expect, vi } from "vitest";
import { bindInput } from "../../src/platform/input";
test("OS repeats are ignored, releases translate and cleanup removes listeners", () => {
  const root = new EventTarget(),
    board = new EventTarget();
  const elements = {
    board,
    start: new EventTarget(),
    restart: new EventTarget(),
    pause: new EventTarget(),
  };
  const doc = Object.assign(root, {
    getElementById: (id: keyof typeof elements) => elements[id],
  }) as unknown as Document;
  const dispatch = vi.fn();
  const cleanup = bindInput(doc, dispatch, () => {});
  const send = (name: string, key: string, repeat = false) => {
    const e = Object.assign(new Event(name, { cancelable: true }), {
      key,
      repeat,
    });
    Object.defineProperty(e, "target", { value: board });
    root.dispatchEvent(e);
    return e;
  };
  expect(send("keydown", "ArrowLeft", true).defaultPrevented).toBe(true);
  expect(dispatch).not.toHaveBeenCalled();
  expect(send("keydown", "ArrowLeft").defaultPrevented).toBe(true);
  send("keyup", "ArrowLeft");
  expect(dispatch.mock.calls.map((c) => c[0])).toEqual(["left", "leftRelease"]);
  cleanup();
  send("keydown", "ArrowRight");
  expect(dispatch).toHaveBeenCalledTimes(2);
});
