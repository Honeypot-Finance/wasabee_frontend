import { GhostIndexer } from "./indexerProviders/ghost";
import Indexer from "./indexer";

export type IndexerProvider = GhostIndexer;

export type GhostFtoPairResponse = {
  pairs: GhostFTOPair[];
  pageInfo: PageInfo;
};

export type GhostPairResponse = {
  pairs: GhostPair[];
};

export type PairFilter = {
  searchString: string;
  limit: number;
};

export type GhostFtoTokensResponse = {
  items: GhostToken[];
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type PageRequest = {
  direction: "next" | "prev";
  cursor?: string;
};

export type GhostToken = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type GhostPair = {
  id: string;
  token0: GhostToken;
  token1: GhostToken;
};
export type GhostFTOPair = {
  id: string;
  token0Id: string;
  token1Id: string;
  depositedRaisedToken: string;
  depositedLaunchedToken: string;
  createdAt: string;
  endTime: string;
  status: string;
  token0: GhostToken;
  token1: GhostToken;
};

export type GhostAPIOpt = {
  apiHandle: string;
};
