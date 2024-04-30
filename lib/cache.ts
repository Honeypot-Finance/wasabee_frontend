export const getCacheKey = (chainId: number | string, key: string) => {
  return `${chainId}-${key}`;
}