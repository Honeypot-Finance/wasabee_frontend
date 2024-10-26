import { InitialPoolFee } from "@cryptoalgebra/integral-sdk";
import { Pool } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";
import { useCurrency } from "../common/useCurrency";
import { useMemo, useState } from "react";
import { Token } from "@/services/contract/token";
import { AlgebraPoolContract } from "@/services/contract/algebra/algebra-pool-contract";
import { observer } from "mobx-react-lite";

export const PoolState = {
  LOADING: "LOADING",
  NOT_EXISTS: "NOT_EXISTS",
  EXISTS: "EXISTS",
  INVALID: "INVALID",
} as const;

export type PoolStateType = (typeof PoolState)[keyof typeof PoolState];

export function usePool(address: Address): [PoolStateType, Pool | null] {
  const [pool] = useState<AlgebraPoolContract | undefined>(
    address ? AlgebraPoolContract.getPool({ address }) : undefined
  );

  const {
    value: tickSpacing,
    loading: isTickSpacingLoading,
    error: isTickSpacingError,
  } = pool?.tickSpacing ?? {
    tickSpacing: undefined,
    isTickSpacingLoading: false,
    isTickSpacingError: true,
  };

  const {
    value: globalState,
    loading: isGlobalStateLoading,
    error: isGlobalStateError,
  } = pool?.globalState ?? {
    globalState: undefined,
    isGlobalStateLoading: false,
    isGlobalStateError: true,
  };

  const {
    value: liquidity,
    loading: isLiquidityLoading,
    error: isLiquidityError,
  } = pool?.liquidity ?? {
    liquidity: undefined,
    isLiquidityLoading: false,
    isLiquidityError: true,
  };

  const {
    value: token0Address,
    loading: isLoadingToken0,
    error: isToken0Error,
  } = pool?.token0 ?? {
    token0: undefined,
    isLoadingToken0: false,
    isToken0Error: true,
  };

  const {
    value: token1Address,
    loading: isLoadingToken1,
    error: isToken1Error,
  } = pool?.token1 ?? {
    token1: undefined,
    isLoadingToken1: false,
    isToken1Error: true,
  };

  const token0 = useCurrency(
    token0Address?.address ? (token0Address.address as Address) : undefined
  );
  const token1 = useCurrency(
    token1Address?.address ? (token1Address.address as Address) : undefined
  );

  const isPoolError =
    isTickSpacingError ||
    isGlobalStateError ||
    isLiquidityError ||
    isToken0Error ||
    isToken1Error ||
    !address;

  const isPoolLoading =
    isTickSpacingLoading ||
    isGlobalStateLoading ||
    isLiquidityLoading ||
    isLoadingToken0 ||
    isLoadingToken1;
  const isTokensLoading = !token0 || !token1;

  return useMemo(() => {
    if ((isPoolLoading || isTokensLoading) && !isPoolError)
      return [PoolState.LOADING, null];

    if (!tickSpacing || !globalState || liquidity === undefined)
      return [PoolState.NOT_EXISTS, null];

    if (globalState[0] === BigInt(0) || !token0 || !token1)
      return [PoolState.NOT_EXISTS, null];

    try {
      return [
        PoolState.EXISTS,
        new Pool(
          token0.wrapped,
          token1.wrapped,
          globalState[2] as InitialPoolFee,
          globalState[0].toString(),
          Number(liquidity),
          globalState[1],
          tickSpacing
        ),
      ];
    } catch (error) {
      return [PoolState.NOT_EXISTS, null];
    }
  }, [
    token0,
    token1,
    globalState,
    liquidity,
    tickSpacing,
    isPoolError,
    isPoolLoading,
    isTokensLoading,
  ]);
}
