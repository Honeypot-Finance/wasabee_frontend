import { kv } from "./kv";

const timeBeforeRefresh = 5 * 60 * 1000; // 5 minutes

export const getCacheKey = (chainId: number | string, key: string) => {
  return `${chainId}-${key}`;
};

export const cache = (key: string, data: string) => {};

export const getCache = (cacheKey: string) => {};
