import { gql } from "@apollo/client";
import { infoClient } from ".";
import {
  launchpadType,
  PairFilter,
  SubgraphProjectFilter,
} from "@/services/launchpad";
import { PageRequest } from "@/services/indexer/indexerTypes";
import dayjs from "dayjs";
import { MemePairContract } from "@/services/contract/memepair-contract";
import BigNumber from "bignumber.js";
import { Token } from "@/services/contract/token";

type SubgraphToken = {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
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
  raisedTokenMinCap: string;
  creator: string;
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

export type subgraphPageRequest = {
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
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

type Pot2PumpListResponse = {
  status: string;
  message: string;
  data: {
    pairs: MemePairContract[];
    filterUpdates: Partial<SubgraphProjectFilter>;
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
  raisedTokenMinCap
  creator
`;

export async function fetchPairsList({
  filter,
  pageRequest,
}: {
  filter: PairFilter;
  pageRequest?: PageRequest;
}): Promise<PairsListResponse> {
  let whereCondition = "";

  if (filter.status === "success") {
    whereCondition = `{ raisedTokenReachingMinCap: true }`;
  } else if (filter.status === "fail") {
    whereCondition = `{ raisedTokenReachingMinCap: false, endTime_lte: ${dayjs().unix()} }`;
  } else if (filter.status === "processing") {
    whereCondition = `{ raisedTokenReachingMinCap: false, endTime_gt: ${dayjs().unix()} }`;
  }

  const queryParts = [
    filter.limit ? `first: ${filter.limit}` : "",
    pageRequest?.pageNum && filter.limit
      ? `skip: ${(pageRequest?.pageNum - 1) * filter.limit}`
      : "",
    pageRequest?.orderBy ? `orderBy: ${pageRequest?.orderBy}` : "",
    pageRequest?.orderDirection
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
        decimals: pot2Pump.raisedToken.decimals,
        holderCount: pot2Pump.raisedToken.holderCount,
        derivedMatic: pot2Pump.raisedToken.derivedMatic,
        totalSupply: pot2Pump.raisedToken.totalSupply,
      },
      token1: {
        id: pot2Pump.launchToken.id,
        name: pot2Pump.launchToken.name,
        symbol: pot2Pump.launchToken.symbol,
        decimals: pot2Pump.launchToken.decimals,
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
        decimals: pot2Pump.launchToken.decimals,
        holderCount: pot2Pump.launchToken.holderCount,
        derivedMatic: pot2Pump.launchToken.derivedMatic,
        totalSupply: pot2Pump.launchToken.totalSupply,
      },
      token1: {
        id: pot2Pump.raisedToken.id,
        name: pot2Pump.raisedToken.name,
        symbol: pot2Pump.raisedToken.symbol,
        decimals: pot2Pump.raisedToken.decimals,
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

export async function fetchPot2PumpList({
  filter,
}: {
  chainId: string;
  filter: SubgraphProjectFilter;
}): Promise<Pot2PumpListResponse> {
  let whereCondition: string[] = [];

  if (filter.status === "success") {
    whereCondition.push(` raisedTokenReachingMinCap: true `);
  } else if (filter.status === "fail") {
    whereCondition.push(
      ` raisedTokenReachingMinCap: false, endTime_lt: ${Math.floor(Date.now() / 1000)} `
    );
  } else if (filter.status === "processing") {
    whereCondition.push(
      ` raisedTokenReachingMinCap: false, endTime_gte: ${Math.floor(Date.now() / 1000)} `
    );
  }

  if (filter.creator) {
    whereCondition.push(` creator: "${filter.creator.toLowerCase()}" `);
  }

  if (filter.participant) {
    whereCondition.push(
      ` participants_:{account:"${filter.participant.toLowerCase()}"}`
    );
  }

  const queryParts = [
    filter.limit ? `first: ${filter.limit}` : "",
    filter?.currentPage && filter.limit
      ? `skip: ${filter?.currentPage * filter.limit}`
      : "",
    filter.orderBy ? `orderBy: ${filter.orderBy}` : "",
    filter.orderDirection ? `orderDirection: ${filter.orderDirection}` : "",
    whereCondition.length > 0
      ? `where:{ ${whereCondition
          .map((condition) => `${condition}`)
          .join(",\n")}}`
      : "",
  ].filter(Boolean);

  const query = `
    query PairsList {
      pot2Pumps(
        ${queryParts.join(",\n")}
      ) {
        ${pop2PumpQuery}
      }
    }
  `;

  console.log(query);

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData(
    data: Pot2PumpListData
  ): Pot2PumpListResponse {
    const pairs = data.pot2Pumps.map((pot2Pump) => {
      const memePair = new MemePairContract({
        address: pot2Pump.id,
        launchedToken: new Token({
          address: pot2Pump.launchToken.id,
          name: pot2Pump.launchToken.name,
          symbol: pot2Pump.launchToken.symbol,
          decimals: Number(pot2Pump.launchToken.decimals),
          holderCount: pot2Pump.launchToken.holderCount,
          derivedETH: pot2Pump.launchToken.derivedMatic,
          totalSupplyWithoutDecimals: BigNumber(
            pot2Pump.launchToken.totalSupply
          ),
        }),
        raiseToken: new Token({
          address: pot2Pump.raisedToken.id,
          name: pot2Pump.raisedToken.name,
          symbol: pot2Pump.raisedToken.symbol,
          decimals: Number(pot2Pump.raisedToken.decimals),
          holderCount: pot2Pump.raisedToken.holderCount,
          derivedETH: pot2Pump.raisedToken.derivedMatic,
          totalSupplyWithoutDecimals: BigNumber(
            pot2Pump.raisedToken.totalSupply
          ),
        }),
        depositedRaisedTokenWithoutDecimals: BigNumber(
          pot2Pump.DepositRaisedToken
        ),
        depositedLaunchedTokenWithoutDecimals: BigNumber(
          pot2Pump.DepositLaunchToken
        ),
        startTime: pot2Pump.createdAt,
        endTime: pot2Pump.endTime,
        //state: pot2Pump.state,
        participantsCount: new BigNumber(pot2Pump.participantsCount),
        raisedTokenMinCap: BigNumber(pot2Pump.raisedTokenMinCap),
        provider: pot2Pump.creator,
      });

      memePair.getProjectInfo();

      return memePair;
    });

    return {
      status: "success",
      message: "Success",
      data: {
        pairs,
        filterUpdates: {
          currentPage: filter.currentPage + 1,
          hasNextPage: pairs.length === filter.limit,
        },
      },
    };
  }

  return transformPairsListData(data);
}
