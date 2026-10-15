/** Controlled scheduling verifies baselines/clamping independently of native browser delivery. */
import { test, expect, vi } from "vitest";
import { clock } from "../../src/platform/clock";
test("baseline clamp reset and cancellation maintain one frame chain", () => {
  let next = 0;
  const q = new Map<number, FrameRequestCallback>();
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
    q.set(++next, fn);
    return next;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => q.delete(id));
  try {
    const delivered: number[] = [];
    const c = clock((ms) => delivered.push(ms));
    const fire = (t: number) => {
      const [id, fn] = q.entries().next().value!;
      q.delete(id);
      fn(t);
    };
    c.start();
    c.start();
    expect(q.size).toBe(1);
    fire(100);
    fire(1100);
    fire(1000);
    c.reset();
    fire(5000);
    expect(delivered).toEqual([0, 250, 0, 0]);
    c.stop();
    expect(q.size).toBe(0);
  } finally {
    vi.unstubAllGlobals();
  }
});
