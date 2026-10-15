/** Canonical clear rewards and gravity progression; no browser timing dependence. */
/** Compute reward with the pre-clear level, then derive the resulting level. */
export function progression(score: number, lines: number, cleared: number) {
  return {
    score:
      score + [0, 100, 300, 500, 800][cleared] * (1 + Math.floor(lines / 10)),
    lines: lines + cleared,
    level: 1 + Math.floor((lines + cleared) / 10),
  };
}
/** Gravity interval in milliseconds, without intermediate rounding. */
export function gravity(level: number) {
  return Math.max(100, 1000 * 0.8 ** (level - 1));
}
