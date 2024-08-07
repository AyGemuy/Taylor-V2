export const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75;
export function xpRange(level, multiplier = global.multiplier || 1) {
  if (level < 0) throw new TypeError("level cannot be negative value");
  let min = 0 === (level = Math.floor(level)) ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1,
    max = Math.round(Math.pow(++level, growth) * multiplier);
  return {
    min: min,
    max: max,
    xp: max - min
  };
}
export function findLevel(xp, multiplier = global.multiplier || 1) {
  if (xp === 1 / 0) return 1 / 0;
  if (isNaN(xp)) return NaN;
  if (xp <= 0) return -1;
  let level = 0;
  do {
    level++;
  } while (xpRange(level, multiplier).min <= xp);
  return --level;
}
export function canLevelUp(level, xp, multiplier = global.multiplier || 1) {
  return !(level < 0) && (xp === 1 / 0 || !isNaN(xp) && (!(xp <= 0) && level < findLevel(xp, multiplier)));
}