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
} from "../generated/graphql";

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

  return {
    data: { pools: data?.positions.map((position) => position.pool) || [] },
    loading,
  };
};
