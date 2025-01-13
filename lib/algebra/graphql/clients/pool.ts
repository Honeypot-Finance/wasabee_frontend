import { useQuery } from "@tanstack/react-query";
import { infoClient } from ".";
import {
  PoolsByTokenPairQuery,
  PoolsByTokenPairDocument,
  PoolsByTokenPairQueryVariables,
  UserActivePositionsDocument,
  UserActivePositionsQuery,
  UserActivePositionsQueryVariables,
  useUserActivePositionsQuery,
  Pool,
  UserActivePositionsQueryResult,
  useNativePriceQuery,
} from "../generated/graphql";
import { getContract } from "viem";
import { algebraPositionManagerAddress } from "@/wagmi-generated";
import { algebraPositionManagerAbi } from "@/wagmi-generated";
import { useEffect, useState } from "react";
import { MAX_UINT128 } from "@/config/algebra/max-uint128";
import { wallet } from "@/services/wallet";
import { CurrencyAmount, Token } from "@cryptoalgebra/sdk";
import { unwrappedToken } from "@cryptoalgebra/sdk";
import BigNumber from "bignumber.js";

export const poolsByTokenPair = async (token0: string, token1: string) => {
  const { data } = await infoClient.query<
    PoolsByTokenPairQuery,
    PoolsByTokenPairQueryVariables
  >({
    query: PoolsByTokenPairDocument,
    variables: { token0, token1 },
  });

  return data?.pools;
};

export const userPools = async (userAddress: string) => {
  const { data } = await infoClient.query<
    UserActivePositionsQuery,
    UserActivePositionsQueryVariables
  >({
    query: UserActivePositionsDocument,
    variables: { account: userAddress.toLowerCase() },
  });

  const pools = data?.positions.map((position) => position.pool);

  return pools;
};

export const useUserPools = (userAddress: string) => {
  const { data, loading } = useUserActivePositionsQuery({
    variables: { account: userAddress.toLowerCase() },
  });
  const [pools, setPools] = useState<(Pool & { fees: bigint })[]>([]);

  const { data: bundles } = useNativePriceQuery();

  const algebraPositionManager = getContract({
    address: algebraPositionManagerAddress,
    abi: algebraPositionManagerAbi,
    client: { public: wallet.publicClient, wallet: wallet.walletClient },
  });

  useEffect(() => {
    if (!data || !wallet.isInit || !algebraPositionManager.simulate || !bundles)
      return;
    const poolsWithFees: (Pool & { fees: BigNumber })[] = [];

    Promise.all(
      data.positions.map(async (position) => {
        const pool = position.pool;
        const {
          result: [fees0, fees1],
        } = await algebraPositionManager.simulate.collect([
          {
            tokenId: BigInt(position.id),
            recipient: wallet.account as `0x${string}`,
            amount0Max: MAX_UINT128,
            amount1Max: MAX_UINT128,
          },
        ]);

        const fees0USD = CurrencyAmount.fromRawAmount(
          unwrappedToken(
            new Token(
              wallet.currentChainId,
              pool.token0.id,
              Number(pool.token0.decimals),
              pool.token0.symbol,
              pool.token0.name
            )
          ),
          fees0.toString()
        );

        const fees1USD = CurrencyAmount.fromRawAmount(
          unwrappedToken(
            new Token(
              wallet.currentChainId,
              pool.token1.id,
              Number(pool.token1.decimals),
              pool.token1.symbol,
              pool.token1.name
            )
          ),
          fees1.toString()
        );

        const nativePrice = bundles?.bundles[0].maticPriceUSD;
        const fees0USDformatted = fees0USD
          ? Number(fees0USD.toSignificant()) *
            (Number(pool.token0.derivedMatic) * Number(nativePrice))
          : 0;
        const fees1USDformatted = fees1USD
          ? Number(fees1USD.toSignificant()) *
            (Number(pool.token1.derivedMatic) * Number(nativePrice))
          : 0;

        if (poolsWithFees.find((p) => p.id === pool.id)) {
          const existingPool = poolsWithFees.find((p) => p.id === pool.id);
          if (existingPool) {
            existingPool.fees = existingPool.fees.plus(
              BigNumber(fees0USDformatted + fees1USDformatted)
            );
          }
        } else {
          poolsWithFees.push({
            ...(pool as Pool),
            fees: BigNumber(fees0USDformatted + fees1USDformatted),
          });
        }
      })
    ).then((pools) => {
      setPools(poolsWithFees as unknown as (Pool & { fees: bigint })[]);
    });
  }, [algebraPositionManager.simulate, data, wallet.isInit, bundles]);

  return {
    data: { pools: pools ?? [] },
    loading,
  };
};
