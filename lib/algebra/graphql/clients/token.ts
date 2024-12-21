import { isAddress } from "viem";
import { infoClient } from ".";
import {
  TokenTop10HoldersDocument,
  TokenTop10HoldersQuery,
  TokenTop10HoldersQueryVariables,
  SingleTokenDocument,
  SingleTokenQuery,
  SingleTokenQueryVariables,
  MultipleTokensQuery,
  MultipleTokensQueryVariables,
  MultipleTokensDocument,
} from "../generated/graphql";

type SingleTokenQueryType = {
  __typename?: "Query";
  token?: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: string;
    derivedMatic: string;
    derivedUSD: string;
    initialUSD: string;
    txCount: string;
    holderCount: string;
    pot2Pump?: {
      __typename?: "Pot2Pump";
      id: string;
    } | null;
  } | null;
};

export async function getTokenTop10Holders(tokenId: string) {
  const tokenQuery = await infoClient.query<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  >({
    query: TokenTop10HoldersDocument,
    variables: { tokenId },
  });

  return tokenQuery.data;
}

export async function getSingleTokenData(tokenId: string) {
  if (!tokenId || !isAddress(tokenId)) return;
  const tokenQuery = await infoClient.query<
    SingleTokenQueryType,
    SingleTokenQueryVariables
  >({
    query: SingleTokenDocument,
    variables: { tokenId },
  });

  return tokenQuery.data;
}

export async function getMultipleTokensData(tokenIds: string[]) {
  if (!tokenIds || tokenIds.length === 0) return;
  const tokenQuery = await infoClient.query<
    MultipleTokensQuery,
    MultipleTokensQueryVariables
  >({
    query: MultipleTokensDocument,
    variables: { tokenIds },
  });
  tokenQuery.data.tokens;
  return tokenQuery.data;
}
