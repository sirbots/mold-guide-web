export default function roundToHalf(num, toHalf = false) {
  if (num === null || num == 0) return 0;

  // round to nearnest half
  if (toHalf == true) return Math.round(num * 2) / 2;
  if (toHalf == false) return Math.round(num);
}
