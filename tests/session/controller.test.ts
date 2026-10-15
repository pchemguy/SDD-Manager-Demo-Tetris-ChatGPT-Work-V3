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
  c.dispatch("leftRelease");
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
test("held direction repeats at 150/50 ms and winning-key release rebases", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.dispatch("left");
  c.frame(149);
  expect(c.snapshot.active?.x).toBe(3);
  c.frame(1);
  expect(c.snapshot.active?.x).toBe(2);
  c.frame(49);
  expect(c.snapshot.active?.x).toBe(2);
  c.frame(1);
  expect(c.snapshot.active?.x).toBe(1);
  c.dispatch("right");
  expect(c.snapshot.active?.x).toBe(2);
  c.dispatch("rightRelease");
  c.frame(149);
  expect(c.snapshot.active?.x).toBe(2);
  c.frame(1);
  expect(c.snapshot.active?.x).toBe(1);
  c.dispatch("leftRelease");
  c.frame(150);
  expect(c.snapshot.active?.x).toBe(1);
});
test("pause/focus are idempotent, preserve fall time and clear held state", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.dispatch("left");
  c.dispatch("down");
  c.frame(30);
  c.dispatch("pause");
  expect(c.snapshot.status).toBe("paused");
  expect(c.snapshot.fallMs).toBe(30);
  expect(c.snapshot.soft).toBe(false);
  c.frame(10000);
  expect(c.snapshot.active).toMatchObject({ x: 3, y: 1 });
  c.dispatch("blur");
  expect(c.snapshot.status).toBe("paused");
  c.dispatch("pause");
  c.frame(969);
  expect(c.snapshot.active?.y).toBe(1);
  c.frame(1);
  expect(c.snapshot.active).toMatchObject({ x: 3, y: 2 });
  c.dispatch("blur");
  c.dispatch("blur");
  expect(c.snapshot.status).toBe("paused");
  c.dispatch("restart");
  expect(c.snapshot).toMatchObject({
    status: "running",
    fallMs: 0,
    soft: false,
  });
});
test("disposed session ignores notifications without drawing or changing state", () => {
  const view = vi.fn();
  const c = new Controller(() => 0.2, view);
  c.dispatch("start");
  const before = c.snapshot;
  c.dispose();
  const count = view.mock.calls.length;
  c.dispatch("restart");
  c.dispatch("left");
  c.frame(1000);
  expect(c.snapshot).toEqual(before);
  expect(view).toHaveBeenCalledTimes(count);
});
test("unowned Down release does not reset normal gravity timing", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.frame(100);
  c.dispatch("downRelease");
  expect(c.snapshot.fallMs).toBe(100);
});

test("due horizontal repeats run before the downward attempt locks", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.frame(18000); // O reaches support, without a failed downward attempt.
  expect(c.snapshot.active?.y).toBe(18);
  c.dispatch("left");
  c.frame(1000); // Repeats reach the wall before gravity settles this piece.
  expect(c.snapshot.board[19].slice(0, 4)).toEqual(["O", "O", null, null]);
  expect(c.snapshot.active?.y).toBe(0);
});
test("grounded pause preserves lock elapsed until explicit resume", () => {
  const c = new Controller(
    () => 0.2,
    () => {},
  );
  c.dispatch("start");
  c.dispatch("hardDrop");
  c.frame(600);
  c.dispatch("pause");
  c.frame(5000);
  expect(c.snapshot.lockMs).toBe(600);
  c.dispatch("pause");
  c.frame(399);
  expect(c.snapshot.board.flat().filter(Boolean)).toHaveLength(0);
  c.frame(1);
  expect(c.snapshot.board.flat().filter(Boolean)).toHaveLength(4);
  expect(c.snapshot.lockMs).toBe(0);
});
