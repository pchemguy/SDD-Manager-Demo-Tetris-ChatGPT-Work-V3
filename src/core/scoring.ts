/** Canonical clear rewards and gravity progression; no browser timing dependence. */
/** Compute reward with the pre-clear level, then derive the resulting level. */
export function progression(score: number, lines: number, cleared: number) {
  if (
    !Number.isSafeInteger(score) ||
    score < 0 ||
    !Number.isSafeInteger(lines) ||
    lines < 0 ||
    !Number.isInteger(cleared) ||
    cleared < 0 ||
    cleared > 4
  )
    throw Error("Invalid scoring input");
  const result = {
    score:
      score + [0, 100, 300, 500, 800][cleared] * (1 + Math.floor(lines / 10)),
    lines: lines + cleared,
    level: 1 + Math.floor((lines + cleared) / 10),
  };
  if (
    !Number.isSafeInteger(result.score) ||
    !Number.isSafeInteger(result.lines)
  )
    throw Error("Score overflow");
  return result;
}
/** Gravity interval in milliseconds, without intermediate rounding. */
export function gravity(level: number) {
  if (!Number.isSafeInteger(level) || level < 1) throw Error("Invalid level");
  return Math.max(100, 1000 * 0.8 ** (level - 1));
}
