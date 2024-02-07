type PrevQuery = string | string[] | undefined;

export const addEachQuery = (prev: PrevQuery, current: string) => {
  if (prev && Array.isArray(prev)) return [...prev, current];
  if (prev) return [prev, current];
  return current;
};

export const removeEachQuery = (prev: PrevQuery, current: string) => {
  if (prev && Array.isArray(prev))
    return prev.filter((query) => query !== current);
  return undefined;
};

export const updateEachQuery = (
  alreadyExist: boolean,
  prevQuery: PrevQuery,
  currentQuery: string
) => {
  if (alreadyExist) return removeEachQuery(prevQuery, currentQuery);
  return addEachQuery(prevQuery, currentQuery);
};

export const alreadyExistQuery = (prev: PrevQuery, current: string) => {
  if (prev && Array.isArray(prev))
    return prev.some((query) => query === current);
  if (prev) return prev === current;
  return false;
};
