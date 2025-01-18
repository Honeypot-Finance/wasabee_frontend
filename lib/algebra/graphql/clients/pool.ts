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
import { object } from "zod";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchedPositions, setFetchedPositions] = useState<string[]>([]);
  const { data, loading, refetch } = useUserActivePositionsQuery({
    variables: { account: userAddress.toLowerCase() },
    //fetchPolicy: "cache-and-network",
    //notifyOnNetworkStatusChange: true,
    // pollInterval: 10000,
    onError: (error) => {
      setTimeout(() => {
        refetch();
      }, 1000);
    },
  });

  const [pools, setPools] = useState<
    Record<string, Pool & { fees: BigNumber }>
  >({});

  const algebraPositionManager = getContract({
    address: algebraPositionManagerAddress,
    abi: algebraPositionManagerAbi,
    client: { public: wallet.publicClient, wallet: wallet.walletClient },
  });

  useEffect(() => {
    if (!data || !wallet.isInit || !algebraPositionManager.simulate || isLoaded)
      return;

    setIsLoaded(true);

    const newPools: Record<string, Pool & { fees: BigNumber }> = {};
    Promise.all(
      data.positions.map(async (position) => {
        if (
          fetchedPositions.includes(position.pool.id.concat("-", position.id))
        )
          return;
        try {
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

          const fees0USDformatted = fees0USD
            ? Number(fees0USD.toSignificant()) * Number(pool.token0.derivedUSD)
            : 0;
          const fees1USDformatted = fees1USD
            ? Number(fees1USD.toSignificant()) * Number(pool.token1.derivedUSD)
            : 0;

          if (
            fetchedPositions.includes(position.pool.id.concat("-", position.id))
          )
            return;

          if (newPools[pool.id]) {
            const existingPool = newPools[pool.id];
            if (existingPool) {
              existingPool.fees = existingPool.fees.plus(
                BigNumber(fees0USDformatted + fees1USDformatted)
              );
            }
          } else {
            newPools[pool.id] = {
              ...(pool as Pool),
              fees: BigNumber(fees0USDformatted + fees1USDformatted),
            };
          }

          fetchedPositions.push(pool.id.concat("-", position.id));
        } catch (error) {
          console.error(error);
        }
      })
    ).then(() => {
      Object.entries(newPools).forEach(([id, pool]) => {
        if (pools[id]) {
          pools[id].fees = BigNumber(pools[id].fees.plus(pool.fees));
        } else {
          pools[id] = pool;
        }
      });

      setIsLoading(false);
    });
  }, [algebraPositionManager.simulate, data, wallet.isInit]);

  return {
    data: { pools: Object.values(pools) ?? [] },
    loading: isLoading,
    refetch: refetch,
  };
};
