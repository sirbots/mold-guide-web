export default function capitalizeFirstLetter(string) {
  // prevents breakage if null value is passed
  if (string === null) return;

  // uppercase the first letter
  return string.charAt(0).toUpperCase() + string.slice(1);
}
