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

type Token = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
};

type Pot2PumpListData = {
  pot2Pumps: Pot2Pump[];
};

type Pair = {
  id: string;
  token0Id: string;
  token1Id: string;
  depositedRaisedToken: string;
  depositedLaunchedToken: string;
  createdAt: string;
  endTime: string;
  status: string;
  participantsCount: string;
  token0: Token;
  token1: Token;
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

const subgraphTokenQuery = `
  id
  name
  symbol
  decimals
  holderCount
  derivedMatic
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
        id
        launchToken {
        ${subgraphTokenQuery}
        }
        raisedToken {
        ${subgraphTokenQuery}
        }
        DepositRaisedToken
        DepositLaunchToken
        createdAt
        endTime
        state
        participantsCount
        raisedTokenReachingMinCap
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
      },
      token1: {
        id: pot2Pump.launchToken.id,
        name: pot2Pump.launchToken.name,
        symbol: pot2Pump.launchToken.symbol,
        decimals: parseInt(pot2Pump.launchToken.decimals.toString()),
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
