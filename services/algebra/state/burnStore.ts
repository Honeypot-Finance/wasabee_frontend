import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import { usePool } from "@/lib/algebra/hooks/pools/usePool";
import { usePositionFees } from "@/lib/algebra/hooks/positions/usePositionFees";
import { PositionFromTokenId } from "@/lib/algebra/hooks/positions/usePositions";
import { unwrappedToken } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import {
  Currency,
  CurrencyAmount,
  Percent,
  Position,
} from "@cryptoalgebra/custom-pools-sdk";
import { useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import { create } from "zustand";

interface BurnState {
  readonly percent: number;
  actions: {
    selectPercent: (percent: number) => void;
  };
}

export const useBurnState = create<BurnState>((set) => ({
  percent: 0,
  actions: {
    selectPercent: (percent: number) => set({ percent }),
  },
}));

export function useDerivedBurnInfo(
  position?: PositionFromTokenId,
  asWNative = false
): {
  position?: Position;
  liquidityPercentage?: Percent;
  liquidityValue0?: CurrencyAmount<Currency>;
  liquidityValue1?: CurrencyAmount<Currency>;
  feeValue0?: CurrencyAmount<Currency>;
  feeValue1?: CurrencyAmount<Currency>;
  outOfRange: boolean;
  error?: string;
} {
  const { address: account } = useAccount();

  const { percent } = useBurnState();

  const currency0 = useCurrency(position?.token0);
  const currency1 = useCurrency(position?.token1);

  const poolId = position?.pool;

  const [, pool] = usePool(poolId);

  const positionSDK = useMemo(
    () =>
      pool &&
      position?.liquidity &&
      typeof position?.tickLower === "number" &&
      typeof position?.tickUpper === "number"
        ? new Position({
            pool,
            liquidity: position.liquidity.toString(),
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
          })
        : undefined,
    [pool, position]
  );

  const { liquidityPercentage, liquidityValue0, liquidityValue1 } =
    useMemo(() => {
      const liquidityPercentage = new Percent(percent, 100);

      const discountedAmount0 = positionSDK
        ? liquidityPercentage.multiply(positionSDK.amount0.quotient).quotient
        : undefined;
      const discountedAmount1 = positionSDK
        ? liquidityPercentage.multiply(positionSDK.amount1.quotient).quotient
        : undefined;

      console.log(JSON.stringify(currency0));

      const liquidityValue0 =
        currency0 && discountedAmount0 && currency0.isToken
          ? CurrencyAmount.fromRawAmount(
              asWNative ? currency0 : currency0.wrapped,
              discountedAmount0
            )
          : undefined;

      const liquidityValue1 =
        currency1 && discountedAmount1
          ? CurrencyAmount.fromRawAmount(
              asWNative ? currency1 : currency1.wrapped,
              discountedAmount1
            )
          : undefined;

      return {
        liquidityPercentage,
        liquidityValue0,
        liquidityValue1,
      };
    }, [percent, positionSDK, currency0, currency1, asWNative]);

  const { amount0: feeValue0, amount1: feeValue1 } = usePositionFees(
    pool ?? undefined,
    Number(position?.tokenId),
    asWNative
  );

  const outOfRange =
    pool && position
      ? pool.tickCurrent < position.tickLower ||
        pool.tickCurrent > position.tickUpper
      : false;

  let error: string | undefined;

  if (!account) {
    error = `Connect Wallet`;
  }
  if (percent === 0) {
    error = error ?? `Enter a percent`;
  }

  return useMemo(
    () => ({
      position: positionSDK,
      liquidityPercentage,
      liquidityValue0,
      liquidityValue1,
      feeValue0,
      feeValue1,
      outOfRange,
      error,
    }),
    [
      positionSDK,
      liquidityPercentage,
      liquidityValue0,
      liquidityValue1,
      feeValue0,
      feeValue1,
      outOfRange,
      error,
    ]
  );
}

export function useBurnActionHandlers(): {
  onPercentSelect: (percent: number) => void;
} {
  const {
    actions: { selectPercent },
  } = useBurnState();

  const onPercentSelect = useCallback((percent: number) => {
    selectPercent(percent);
  }, []);

  return {
    onPercentSelect,
  };
}
