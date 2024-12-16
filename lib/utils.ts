import BigNumber from "bignumber.js";

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
