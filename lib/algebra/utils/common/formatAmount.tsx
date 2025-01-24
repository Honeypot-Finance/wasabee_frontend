import { ReactNode } from "react";
import { formatCurrency } from "./formatCurrency";

export function formatAmountWithAlphabetSymbol(
  amount: string,
  decimals = 3
): string {
  const amountNum = Number(amount);
  const minAmount = 1 / 10 ** decimals;

  if (amountNum === 0) return "0";
  if (amountNum < minAmount) return `< ${minAmount}`;
  if (amountNum < 1)
    return (Math.floor(amountNum / minAmount) * minAmount).toFixed(decimals);
  if (amountNum < 100) return (Math.floor(amountNum * 100) / 100).toString();
  if (amountNum < 10000) return Math.floor(amountNum).toString();

  if (amountNum < 1000000000000000)
    return formatCurrency.format(Math.floor(amountNum * 100) / 100);

  return "∞";
}

export function formatAmountWithScientificNotation(
  amount: string,
  decimals = 3
): string {
  const amountNum = Number(amount);
  if (amountNum === 0) return "0";
  return amountNum.toExponential(decimals);
}

export function DynamicFormatAmount({
  amount,
  decimals = 3,
  beginWith,
  endWith,
}: {
  amount: string | number;
  decimals?: number;
  beginWith?: ReactNode;
  endWith?: ReactNode;
}): string {
  const amountStr = amount.toString();
  const output =
    getFirstDecimalPlace(amountStr) < decimals
      ? formatAmountWithAlphabetSymbol(amountStr, decimals)
      : formatAmountWithScientificNotation(amountStr, decimals);

  return `${beginWith ? `${beginWith} ` : ""}${output}${endWith ? ` ${endWith}` : ""}`;
}

export function getFirstDecimalPlace(amount: string): number {
  if (Number(amount) === 0 || Number(amount) > 1) return 0;

  let decimalPlaces = 0;
  if (amount.includes(".")) {
    const decimalString = amount.split(".")[1];
    while (decimalString[decimalPlaces] === "0") {
      decimalPlaces++;
    }
  }
  return decimalPlaces;
}

export function reverseFormatAmount(formattedNumber: string): number {
  const suffixes: { [key: string]: number } = {
    K: 1e3,
    M: 1e6,
    B: 1e9,
    T: 1e12,
  };

  const suffix = formattedNumber.slice(-1);
  const value = parseFloat(formattedNumber.slice(0, -1));

  if (formattedNumber.startsWith("< ") || formattedNumber.startsWith("> ")) {
    const value = parseFloat(formattedNumber.slice(2));
    return value > 0 ? value : 0;
  }

  if (suffixes[suffix]) {
    return value * suffixes[suffix];
  } else {
    return parseFloat(formattedNumber);
  }
}
