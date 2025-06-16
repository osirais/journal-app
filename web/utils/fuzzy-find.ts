export function fuzzyFind<T>(items: T[], searchKey: keyof T, query: string): T[] {
  const q = query.toLowerCase();
  return items.filter((item) => {
    const text = String(item[searchKey]).toLowerCase();
    return isFuzzyMatch(text, q);
  });
}

function isFuzzyMatch(text: string, query: string): boolean {
  let tIdx = 0;
  let qIdx = 0;

  while (tIdx < text.length && qIdx < query.length) {
    if (text[tIdx] === query[qIdx]) {
      qIdx++;
    }
    tIdx++;
  }

  return qIdx === query.length;
}
