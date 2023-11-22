export function sleep(s = 2) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}
