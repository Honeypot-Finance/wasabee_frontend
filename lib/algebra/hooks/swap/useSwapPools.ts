import {
  Currency,
  Token,
  computePoolAddress,
} from "@cryptoalgebra/custom-pools-sdk";
import { useEffect, useMemo, useState } from "react";
import { useAllCurrencyCombinations } from "./useAllCurrencyCombinations";
import { Address, zeroAddress } from "viem";
import { DEFAULT_CHAIN_ID } from "@/data/algebra/default-chain-id";
import { TokenFieldsFragment } from "@/types/algebra/types/graphql";
import { AlgebraPoolContract } from "@/services/contract/algebra/algebra-pool-contract";

/**
 * Returns all the existing pools that should be considered for swapping between an input currency and an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */
export function useSwapPools(
  currencyIn?: Currency,
  currencyOut?: Currency
): {
  pools: {
    tokens: [Token, Token];
    pool: {
      address: Address;
      liquidity: string;
      price: string;
      tick: string;
      fee: string;
      deployer: string;
      token0: TokenFieldsFragment;
      token1: TokenFieldsFragment;
    };
  }[];
  loading: boolean;
} {
  const [existingPools, setExistingPools] = useState<any[]>();

  const allCurrencyCombinations = useAllCurrencyCombinations(
    currencyIn,
    currencyOut
  );

  useEffect(() => {
    async function getPools() {
      const poolsAddresses = allCurrencyCombinations.map(
        ([tokenA, tokenB]) =>
          computePoolAddress({
            tokenA,
            tokenB,
          }) as Address
      );

      const poolsData: AlgebraPoolContract[] = [];

      for (const address of poolsAddresses) {
        const poolData = AlgebraPoolContract.getPool({ address });
        await poolData?.init();
        if (poolData) poolsData.push(poolData);
      }

      const pools =
        poolsData &&
        poolsData.map((pool) => ({
          address: pool.address,
          liquidity: pool.liquidity,
          price: pool.globalState.value?.[0],
          tick: pool.globalState.value?.[1],
          fee: pool.globalState.value?.[2],
          deployer: zeroAddress,
          token0: pool.token0,
          token1: pool.token1,
        }));

      setExistingPools(pools);
    }

    Boolean(allCurrencyCombinations.length) && getPools();
  }, [allCurrencyCombinations]);

  return useMemo(() => {
    if (!existingPools)
      return {
        pools: [],
        loading: true,
      };

    return {
      pools: existingPools
        .map((pool) => ({
          tokens: [
            new Token(
              DEFAULT_CHAIN_ID,
              pool.token0.id,
              Number(pool.token0.decimals),
              pool.token0.symbol,
              pool.token0.name
            ),
            new Token(
              DEFAULT_CHAIN_ID,
              pool.token1.id,
              Number(pool.token1.decimals),
              pool.token1.symbol,
              pool.token1.name
            ),
          ] as [Token, Token],
          pool: pool,
        }))
        .filter(({ pool }) => {
          return pool;
        }),
      loading: false,
    };
  }, [existingPools]);
}
