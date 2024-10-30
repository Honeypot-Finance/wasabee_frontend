import { MAX_UINT128 } from "@/data/algebra/max-uint128";
import {
  Currency,
  CurrencyAmount,
  Pool,
  unwrappedToken,
} from "@cryptoalgebra/custom-pools-sdk";
import { useMemo } from "react";
import { Address } from "viem";

interface PositionFeesResult {
  amount0: CurrencyAmount<Currency> | undefined;
  amount1: CurrencyAmount<Currency> | undefined;
}

export function usePositionFees(
  pool?: Pool,
  tokenId?: number,
  asWNative = false
): PositionFeesResult {
  const { data: owner } = useAlgebraPositionManagerOwnerOf({
    args: tokenId ? [BigInt(tokenId)] : undefined,
  });

  const isReady = tokenId && owner;

  const { config: amountsConfig } = usePrepareAlgebraPositionManagerCollect({
    args: Boolean(isReady)
      ? [
          {
            tokenId: BigInt(tokenId || 0),
            recipient: owner as Address,
            amount0Max: MAX_UINT128,
            amount1Max: MAX_UINT128,
          },
        ]
      : undefined,
    enabled: Boolean(isReady),
  });

  const amounts = amountsConfig?.result;

  return useMemo(() => {
    if (pool && amounts) {
      return {
        amount0: CurrencyAmount.fromRawAmount(
          !asWNative ? unwrappedToken(pool.token0) : pool.token0,
          amounts[0].toString()
        ),
        amount1: CurrencyAmount.fromRawAmount(
          !asWNative ? unwrappedToken(pool.token1) : pool.token1,
          amounts[1].toString()
        ),
      };
    } else {
      return {
        amount0: undefined,
        amount1: undefined,
      };
    }
  }, [pool, amounts]);
}
function useAlgebraPositionManagerOwnerOf(arg0: {
  args: bigint[] | undefined;
}): { data: any } {
  throw new Error("Function not implemented.");
}

function usePrepareAlgebraPositionManagerCollect(arg0: {
  args:
    | {
        tokenId: bigint;
        recipient: Address;
        amount0Max: any;
        amount1Max: any;
      }[]
    | undefined;
  enabled: boolean;
}): { config: any } {
  throw new Error("Function not implemented.");
}
