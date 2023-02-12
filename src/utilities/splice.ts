export const splice = <T = any>(arr: Array<T>, start = 0, count = 1, ...items: T[]) => [
  ...arr.slice(0, start),
  ...items,
  ...arr.slice(start + count)
];
