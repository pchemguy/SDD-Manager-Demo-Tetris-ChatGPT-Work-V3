/** Observable controller state/view/draw ordering using actual core transitions. */
import { test, expect, vi } from "vitest";
import { Controller } from "../../src/session/controller";
test("serializes start action time and view; rejected ready commands do not draw", () => {
  const draw = vi.fn(() => 0.2),
    view = vi.fn();
  const c = new Controller(draw, view);
  c.dispatch("left");
  expect(draw).not.toHaveBeenCalled();
  c.dispatch("start");
  c.dispatch("left");
  c.frame(1000);
  expect(c.snapshot.active).toMatchObject({ x: 3, y: 1 });
  expect(draw).toHaveBeenCalledTimes(2);
  expect(view.mock.calls.at(-1)![0].active).toMatchObject({ x: 3, y: 1 });
});
test("restart is fresh; duplicate Start is inert; views cannot mutate live board", () => {
  const c = new Controller(
    () => 0.2,
    (s) => {
      s.board[19][0] = "I";
    },
  );
  c.dispatch("start");
  c.dispatch("left");
  c.dispatch("start");
  expect(c.snapshot.active?.x).toBe(3);
  expect(c.snapshot.board[19][0]).toBe(null);
  c.dispatch("restart");
  expect(c.snapshot.active?.x).toBe(4);
  expect(c.snapshot.active?.y).toBe(0);
});
test("soft drop immediate move, exact held interval and release reset", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.dispatch("down");
  expect(c.snapshot.active?.y).toBe(1);
  c.frame(49);
  expect(c.snapshot.active?.y).toBe(1);
  c.frame(1);
  expect(c.snapshot.active?.y).toBe(2);
  c.dispatch("downRelease");
  c.frame(999);
  expect(c.snapshot.active?.y).toBe(2);
  c.frame(1);
  expect(c.snapshot.active?.y).toBe(3);
  expect(c.snapshot.score).toBe(0);
});
