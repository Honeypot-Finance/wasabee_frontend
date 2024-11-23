import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BigNumber from "bignumber.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
