import BigNumber from "bignumber.js"

export const amountFormatted = (amount: number | string | BigNumber, {
    decimals,
    fixed
}: {
    decimals?: number,
    fixed?: number
} = {}) => {
    const bigAmount = new BigNumber(amount)
    if (bigAmount.eq(0)) {
        return "0"
    }
    fixed = fixed ?? 6
    const r = bigAmount.div(new BigNumber(10).pow(decimals ?? 18))
    const minValue = new BigNumber(1).div(new BigNumber(10).pow(fixed - 1))
    if (r.isLessThan(minValue)) {
       return `<${minValue.toFixed()}`
    }
    return new BigNumber(new BigNumber(r.toFixed(fixed)).toFixed()).toFormat()
}

// truncate middle of string
export const truncate = (str: string, length: number) => {
    if (str.length <= length) {
        return str
    }
    const mid = Math.floor(length / 2)
    return str.slice(0, mid) + '...' + str.slice(str.length - mid)
}