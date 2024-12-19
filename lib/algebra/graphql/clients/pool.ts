import { infoClient } from ".";
import {
  PoolsByTokenPairQuery,
  PoolsByTokenPairDocument,
} from "../generated/graphql";

export const poolsByTokenPair = async (token0: string, token1: string) => {
  const { data } = await infoClient.query<PoolsByTokenPairQuery>({
    query: PoolsByTokenPairDocument,
    variables: { token0, token1 },
  });

  return data?.pools;
};
