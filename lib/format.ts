import BigNumber from "bignumber.js";

export const amountFormatted = (
  amount?: number | string | BigNumber,
  {
    decimals,
    fixed,
    prefix,
  }: {
    decimals?: number;
    fixed?: number;
    prefix?: string;
  } = {}
) => {
  if (!amount) {
    return "-";
  }
  prefix = prefix ?? "";
  const bigAmount = new BigNumber(amount);
  if (bigAmount.eq(0)) {
    return prefix + "0";
  }
  fixed = fixed ?? 6;
  const r = bigAmount.div(new BigNumber(10).pow(decimals ?? 18));
  const minValue = new BigNumber(1).div(new BigNumber(10).pow(fixed));
  if (r.isLessThan(minValue)) {
    return prefix + `<${minValue.toFixed()}`;
  }
  return prefix + new BigNumber(new BigNumber(r.toFixed(fixed, 1)).toFixed()).toFormat();
};

// truncate middle of string
export const truncate = (str: string, length: number) => {
  if (str.length <= length) {
    return str;
  }
  const mid = Math.floor(length / 2);
  return str.slice(0, mid) + "..." + str.slice(str.length - mid);
};

export const formatAmount = (amount?: number | string) => {
  if (!amount && amount !== 0) {
    return {
      start: "",
    };
  }
  if (new BigNumber(amount).gt(1)) {
    return {
      start: new BigNumber(new BigNumber(amount).toFixed(6)).toFixed(),
    };
  }
  // 查找小数点后连续的零
  const match = String(amount).match(/0\.0*(\d+)/);
  if (match) {
    // 计算连续零的个数
    const zeroCount = match[0].length - match[1].length - 2; // 减去小数点和非零数字的长度
    // 构造新的格式
    return zeroCount > 4
      ? {
          start: `0.0`,
          zeroCount,
          end: match[1].substring(0, 4),
        }
      : {
          start: new BigNumber(new BigNumber(amount).toFixed(6)).toFixed(),
        };
  }

  return {
    start: String(amount),
  };
};
