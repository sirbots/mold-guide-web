export default function roundTo(num, toHalf = false) {
  if (num === null || num == 0) return 0;

  // round to nearest half
  if (toHalf == true) return Math.round(num * 2) / 2;
  if (toHalf == false) return Math.round(num);
}
