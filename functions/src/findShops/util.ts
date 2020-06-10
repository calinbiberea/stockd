export interface FindShopsResult {
  id: string;
  distance: number;
  [p: string]: unknown;
}

export type FindShopsResults = { success: false } | { success: true; results: FindShopsResult[] };

export const defaultNum = <T extends number>(v: T, defaultV: T): T => (isNaN(v) ? defaultV : v);

export const filterNotNull = <T>(arr: (T | null)[]): T[] =>
  (arr.filter((item) => item !== null) as unknown) as T[];
