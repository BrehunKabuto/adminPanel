export function mergeById<T extends { id: number }>(prev: T[], next: T[]): T[] {
  const ids = new Set(prev.map(o => o.id));
  return [...prev, ...next.filter(o => !ids.has(o.id))];
}