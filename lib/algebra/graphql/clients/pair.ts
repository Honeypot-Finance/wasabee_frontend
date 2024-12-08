import { gql } from "@apollo/client";
import { infoClient } from ".";
import { launchpadType, PairFilter } from "@/services/launchpad";
import { PageRequest } from "@/services/indexer/indexerTypes";

type SubgraphToken = {
  id: string;
  name: string;
  symbol: string;
  decimals: string | number;
  holderCount: string;
  derivedMatic: string;
  totalSupply: string;
};

type Pot2Pump = {
  id: string;
  launchToken: SubgraphToken;
  raisedToken: SubgraphToken;
  DepositRaisedToken: string;
  DepositLaunchToken: string;
  createdAt: string;
  endTime: string;
  state: string;
  participantsCount: string;
  raisedTokenReachingMinCap: boolean;
};

type Pot2PumpListData = {
  pot2Pumps: Pot2Pump[];
};

export type Pair = {
  id: string;
  token0Id: string;
  token1Id: string;
  depositedRaisedToken: string;
  depositedLaunchedToken: string;
  createdAt: string;
  endTime: string;
  status: string;
  participantsCount: string;
  token0: SubgraphToken;
  token1: SubgraphToken;
};

type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
};

type PairsListResponse = {
  status: string;
  message: string;
  data: {
    pairs: Pair[];
    pageInfo: PageInfo;
  };
};

type MemetrackerListResponse = {
  status: string;
  message: string;
  data: {
    pairs: Pair[];
  };
};

const subgraphTokenQuery = `
  id
  name
  symbol
  decimals
  holderCount
  derivedMatic
  totalSupply
`;

const pop2PumpQuery = `
  launchToken {
    ${subgraphTokenQuery}
  }
  raisedToken {
    ${subgraphTokenQuery}
  }
  id
  DepositRaisedToken
  DepositLaunchToken
  createdAt
  endTime
  state
  participantsCount
  raisedTokenReachingMinCap
`;

export async function fetchPairsList({
  filter,
  pageRequest,
}: {
  chainId: string;
  filter: PairFilter;
  pageRequest: PageRequest;
  projectType: launchpadType;
}): Promise<PairsListResponse> {
  let whereCondition = "";

  if (filter.status === "success") {
    whereCondition = `{ raisedTokenReachingMinCap: true }`;
  } else if (filter.status === "fail") {
    whereCondition = `{ raisedTokenReachingMinCap: false, endTime_lt: ${Math.floor(Date.now() / 1000)} }`;
  } else if (filter.status === "processing") {
    whereCondition = `{ raisedTokenReachingMinCap: false, endTime_gte: ${Math.floor(Date.now() / 1000)} }`;
  }

  const queryParts = [
    filter.limit ? `first: ${filter.limit}` : "",
    pageRequest?.pageNum && filter.limit
      ? `skip: ${(pageRequest?.pageNum - 1) * filter.limit}`
      : "",
    pageRequest.orderBy ? `orderBy: ${pageRequest.orderBy}` : "",
    pageRequest.orderDirection
      ? `orderDirection: ${pageRequest.orderDirection}`
      : "",
    whereCondition ? `where: ${whereCondition}` : "",
  ].filter(Boolean);

  const query = `
    query PairsList {
      pot2Pumps(
        ${queryParts.join(", ")}
      ) {
        ${pop2PumpQuery}
      }
    }
  `;

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData(data: Pot2PumpListData): PairsListResponse {
    const pairs = data.pot2Pumps.map((pot2Pump) => ({
      id: pot2Pump.id,
      token0Id: pot2Pump.launchToken.id,
      token1Id: pot2Pump.raisedToken.id,
      depositedRaisedToken: pot2Pump.DepositRaisedToken,
      depositedLaunchedToken: pot2Pump.DepositLaunchToken,
      createdAt: pot2Pump.createdAt,
      endTime: pot2Pump.endTime,
      status: pot2Pump.state,
      participantsCount: pot2Pump.participantsCount,
      token0: {
        id: pot2Pump.raisedToken.id,
        name: pot2Pump.raisedToken.name,
        symbol: pot2Pump.raisedToken.symbol,
        decimals: parseInt(pot2Pump.raisedToken.decimals.toString()),
        holderCount: pot2Pump.raisedToken.holderCount,
        derivedMatic: pot2Pump.raisedToken.derivedMatic,
        totalSupply: pot2Pump.raisedToken.totalSupply,
      },
      token1: {
        id: pot2Pump.launchToken.id,
        name: pot2Pump.launchToken.name,
        symbol: pot2Pump.launchToken.symbol,
        decimals: parseInt(pot2Pump.launchToken.decimals.toString()),
        holderCount: pot2Pump.launchToken.holderCount,
        derivedMatic: pot2Pump.launchToken.derivedMatic,
        totalSupply: pot2Pump.launchToken.totalSupply,
      },
    }));

    const pageInfo: PageInfo = {
      hasPreviousPage: false,
      hasNextPage: pairs.length === filter.limit,
      startCursor: "",
      endCursor: "",
    };

    return {
      status: "success",
      message: "Success",
      data: {
        pairs,
        pageInfo,
      },
    };
  }

  return transformPairsListData(data);
}

export async function fetchMemetrackerList({
  chainId,
}: {
  chainId: string;
}): Promise<MemetrackerListResponse> {
  const query = `
    query MemetrackerList {
      pot2Pumps(
        first: 100
        where: {raisedTokenReachingMinCap: true}
        orderBy: createdAt
        orderDirection: desc
      ) {
        ${pop2PumpQuery}
      }
    }
  `;

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData(
    data: Pot2PumpListData
  ): MemetrackerListResponse {
    const pairs = data.pot2Pumps.map((pot2Pump) => ({
      id: pot2Pump.id,
      token0Id: pot2Pump.launchToken.id,
      token1Id: pot2Pump.raisedToken.id,
      depositedRaisedToken: pot2Pump.DepositRaisedToken,
      depositedLaunchedToken: pot2Pump.DepositLaunchToken,
      createdAt: pot2Pump.createdAt,
      endTime: pot2Pump.endTime,
      status: pot2Pump.state,
      participantsCount: pot2Pump.participantsCount,
      token0: {
        id: pot2Pump.launchToken.id,
        name: pot2Pump.launchToken.name,
        symbol: pot2Pump.launchToken.symbol,
        decimals: parseInt(pot2Pump.launchToken.decimals.toString()),
        holderCount: pot2Pump.launchToken.holderCount,
        derivedMatic: pot2Pump.launchToken.derivedMatic,
        totalSupply: pot2Pump.launchToken.totalSupply,
      },
      token1: {
        id: pot2Pump.raisedToken.id,
        name: pot2Pump.raisedToken.name,
        symbol: pot2Pump.raisedToken.symbol,
        decimals: parseInt(pot2Pump.raisedToken.decimals.toString()),
        holderCount: pot2Pump.raisedToken.holderCount,
        derivedMatic: pot2Pump.raisedToken.derivedMatic,
        totalSupply: pot2Pump.raisedToken.totalSupply,
      },
    }));

    return {
      status: "success",
      message: "Success",
      data: {
        pairs,
      },
    };
  }

  return transformPairsListData(data);
}
