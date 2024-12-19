import { infoClient } from ".";
import {
  TokenTop10HoldersDocument,
  TokenTop10HoldersQuery,
  TokenTop10HoldersQueryVariables,
} from "../generated/graphql";

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
