export const getNextIndex = (currentIndex: number, maxIndex: number, direction: "up" | "down") => {
  const delta = direction === "up" ? -1 : 1;
  const nextIndex = currentIndex + delta;
  if (nextIndex < 0) {
    return maxIndex;
  } else if (nextIndex > maxIndex) {
    return 0;
  } else {
    return nextIndex;
  }
};


export function escapeRegExp(string: string) {
  // escape the special characters in the highlight string before using it in the regular expression pattern.
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
