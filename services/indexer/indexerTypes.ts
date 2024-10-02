import { GhostIndexer } from "./indexerProviders/ghost";
import Indexer from "./indexer";
import { PageInfo } from "../utils";
import { Address } from "viem";
export type IndexerProvider = GhostIndexer;

export type GhostFtoPairResponse = {
  pairs: GhostFTOPair[];
  pageInfo: PageInfo;
};

export type GhostPoolPairResponse = {
  pairs: GhostPoolPair[];
  pageInfo: PageInfo;
};

export type TrendingMEMEs = {
  pairs: {
    items: {
      id: string;
      status: string;
      depositedRaisedToken: string;
      depositedLaunchedToken: string;
      endTime: string;
      token0: GhostToken;
      token1: GhostToken;
    }[];
  };
};

export type GhostHoldingPairsResponse = {
  holdingPairs: holdingPairs[];
  pageInfo: PageInfo;
};

export type GhostParticipatedProjectsResponse = {
  participateds: {
    items: ParticipatedProjects[];
    pageInfo: PageInfo;
  };
};

export type ParticipatedProjects = {
  id: string;
  depositer: Address;
  pairId: Address;
  pair: GhostFTOPair;
};

export type holdingPairs = {
  pairId: Address;
  totalLpAmount: string;
  deCreaselpAmount: string;
  inCreaselpAmount: string;
  pair: {
    trackedReserveETH: string;
    trackedReserveUSD: string;
    token0Id: Address;
    token1Id: Address;
    token0name: string;
    token1name: string;
    token0symbol: string;
    token1symbol: string;
    token0: GhostToken;
    token1: GhostToken;
  };
};

export type PairFilter = {
  searchString: string;
  limit: number;
  sortingTarget?: "trackedReserveETH" | "trackedReserveUSD";
  sortingDirection?: "asc" | "desc";
};

export type GhostFtoTokensResponse = {
  items: GhostToken[];
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
  derivedETH?: string;
  derivedUSD?: string;
};

export type GhostPoolPair = {
  id: string;
  trackedReserveETH: string;
  trackedReserveUSD: string;
  token0: GhostToken;
  token1: GhostToken;
};

export type GhostLaunchPair = {
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

export type GhostBundleResponse = {
  bundle: {
    id: string;
    price: string;
    totalETH: string;
    totalUSD: string;
  };
};
