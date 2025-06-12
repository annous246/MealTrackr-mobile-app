export function alreadyDotted(p: string) {
  let c = 0;
  for (let k of p) {
    if (k == ".") c++;
    if (c == 2) return true;
  }
  return false;
}
