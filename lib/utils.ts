import BigNumber from "bignumber.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function toCompactLocaleString(
  value: number | string | BigNumber,
  options?: Intl.NumberFormatOptions
) {
  if (!!!value) return "0";
  return Number(value) >= 0.01
    ? Number(value).toLocaleString("en-US", {
        // add suffixes for thousands, millions, and billions
        // the maximum number of decimal places to use
        maximumFractionDigits: 2,
        // specify the abbreviations to use for the suffixes
        notation: "compact",
        compactDisplay: "short",
        ...options,
      })
    : "< 0.01";
}

export const shortenAddressString = (address: string, chars = 4): string => {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
};

export const formatVolume = (volume: number): string => {
  const value = volume / 10 ** 18;

  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }

  return `$${value.toFixed(2)}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
