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

test("Space rotates once, prevents focused scrolling, and preserves other controls", () => {
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
  const key = (target: EventTarget, repeat = false) => {
    const event = Object.assign(new Event("keydown", { cancelable: true }), {
      key: " ",
      repeat,
    });
    Object.defineProperty(event, "target", { value: target });
    root.dispatchEvent(event);
    return event;
  };
  try {
    expect(key(board).defaultPrevented).toBe(true);
    expect(dispatch.mock.calls.map(([command]) => command)).toEqual(["cw"]);
    expect(key(board, true).defaultPrevented).toBe(true);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(key(elements.pause).defaultPrevented).toBe(false);
    expect(dispatch).toHaveBeenCalledTimes(1);
  } finally {
    cleanup();
  }
});
test("Hold rebases the clock only when the session accepts it", () => {
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
  const dispatch = vi.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
    reset = vi.fn();
  const cleanup = bindInput(doc, dispatch, reset);
  try {
    for (let i = 0; i < 2; i++) {
      const event = Object.assign(new Event("keydown", { cancelable: true }), {
        key: "c",
        repeat: false,
      });
      Object.defineProperty(event, "target", { value: board });
      root.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    }
    expect(dispatch.mock.calls.map(([c]) => c)).toEqual(["hold", "hold"]);
    expect(reset).toHaveBeenCalledTimes(1);
  } finally {
    cleanup();
  }
});
