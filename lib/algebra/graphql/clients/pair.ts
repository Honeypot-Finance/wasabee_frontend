import { gql } from "@apollo/client";
import { infoClient } from ".";
import { PairFilter, SubgraphProjectFilter } from "@/services/launchpad";
import { PageRequest } from "@/services/indexer/indexerTypes";
import dayjs from "dayjs";
import { MemePairContract } from "@/services/contract/memepair-contract";
import BigNumber from "bignumber.js";
import { Token } from "@/services/contract/token";
import { Pot2Pump } from "../generated/graphql";
import {
  Pot2PumpPottingNearSuccessDocument,
  Pot2PumpPottingHighPriceDocument,
  Pot2PumpPottingNewTokensDocument,
  Pot2PumpPottingNearSuccessQuery,
  Pot2PumpPottingHighPriceQuery,
  Pot2PumpPottingNewTokensQuery,
} from "../generated/graphql";

type SubgraphToken = {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
  holderCount: string;
  derivedMatic: string;
  totalSupply: string;
};

export type Pot2PumpListData = {
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
  derivedUSD
  volumeUSD
  initialUSD
  totalValueLockedUSD
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

export const pot2PumpListToMemePairList = async (
  pot2Pump: Partial<Pot2Pump>[]
): Promise<MemePairContract[]> => {
  return Promise.all(pot2Pump.map(pot2PumpToMemePair));
};

export const pot2PumpToMemePair = async (
  pot2Pump: Partial<Pot2Pump>
): Promise<MemePairContract> => {
  const contract = new MemePairContract({
    address: pot2Pump.id,
    depositedLaunchedTokenWithoutDecimals: new BigNumber(
      pot2Pump.DepositLaunchToken
    ),
    depositedRaisedTokenWithoutDecimals: new BigNumber(
      pot2Pump.DepositRaisedToken
    ),
    launchedTokenProvider: pot2Pump.creator,
    provider: pot2Pump.creator,
    raisedTokenMinCap: new BigNumber(pot2Pump.raisedTokenMinCap),
    participantsCount: new BigNumber(pot2Pump.participantsCount),
    launchedTokenBuyCount: new BigNumber(pot2Pump.buyCount),
    launchedTokenSellCount: new BigNumber(pot2Pump.sellCount),
    endTime: pot2Pump.endTime,
    startTime: pot2Pump.createdAt,
    canClaimLP:
      pot2Pump.raisedTokenReachingMinCap &&
      pot2Pump.participants &&
      pot2Pump.participants.length > 0 &&
      !pot2Pump.participants[0].claimed,
    canRefund:
      !pot2Pump.raisedTokenReachingMinCap &&
      pot2Pump.participants &&
      pot2Pump.participants.length > 0 &&
      !pot2Pump.participants[0].refunded &&
      pot2Pump.endTime < dayjs().unix(),
    launchedToken: Token.getToken({
      address: pot2Pump.launchToken?.id!,
      name: pot2Pump.launchToken?.name,
      symbol: pot2Pump.launchToken?.symbol,
      decimals: Number(pot2Pump.launchToken?.decimals),
      holderCount: pot2Pump.launchToken?.holderCount,
      derivedETH: pot2Pump.launchToken?.derivedMatic,
      totalSupplyWithoutDecimals: BigNumber(pot2Pump.launchToken?.totalSupply),
      derivedUSD: pot2Pump.launchToken?.derivedUSD,
      volumeUSD: pot2Pump.launchToken?.volumeUSD,
      initialUSD: pot2Pump.launchToken?.initialUSD,
      totalValueLockedUSD: pot2Pump.launchToken?.totalValueLockedUSD,
      poolCount: Number(pot2Pump.launchToken?.poolCount),
    }),
    raiseToken: Token.getToken({
      address: pot2Pump.raisedToken?.id!,
      name: pot2Pump.raisedToken?.name,
      symbol: pot2Pump.raisedToken?.symbol,
      decimals: Number(pot2Pump.raisedToken?.decimals),
      holderCount: pot2Pump.raisedToken?.holderCount,
      derivedETH: pot2Pump.raisedToken?.derivedMatic,
      totalSupplyWithoutDecimals: BigNumber(pot2Pump.raisedToken?.totalSupply),
      derivedUSD: pot2Pump.raisedToken?.derivedUSD,
      volumeUSD: pot2Pump.raisedToken?.volumeUSD,
      initialUSD: pot2Pump.raisedToken?.initialUSD,
      totalValueLockedUSD: pot2Pump.raisedToken?.totalValueLockedUSD,
      poolCount: Number(pot2Pump.raisedToken?.poolCount),
    }),
  });

  contract.getProjectInfo();
  contract.launchedToken?.loadLogoURI();
  contract.raiseToken?.loadLogoURI();

  return contract;
};

export async function fetchNearSuccessPot2Pump () {
  const { data } = await infoClient.query<Pot2PumpPottingNearSuccessQuery>({
    query: Pot2PumpPottingNearSuccessDocument,
    variables: {
      endTime: Math.floor(new Date().getTime() / 1000),
    },
  });

  console.log("data", data.pot2Pumps);

  return pot2PumpListToMemePairList(data.pot2Pumps as Partial<Pot2Pump>[]);
}

export async function fetchPottingNewTokens () {
  const { data } = await infoClient.query<Pot2PumpPottingNewTokensQuery>({
    query: Pot2PumpPottingNewTokensDocument,
    variables: {
      endTime: Math.floor(new Date().getTime() / 1000),
    },
  });

  console.log(
    "Pot2PumpPottingNewTokensDocument",
    Pot2PumpPottingNewTokensDocument
  );

  console.log("data", data.pot2Pumps);

  return pot2PumpListToMemePairList(data.pot2Pumps as Partial<Pot2Pump>[]);
}

export async function fetchPumpingHighPricePot2Pump () {
  const { data } = await infoClient.query<Pot2PumpPottingHighPriceQuery>({
    query: Pot2PumpPottingHighPriceDocument,
  });

  console.log("data", data.pot2Pumps);

  return pot2PumpListToMemePairList(data.pot2Pumps as Partial<Pot2Pump>[]);
}

export async function fetchPairsList ({
  filter,
  pageRequest,
}: {
  filter: PairFilter;
  pageRequest?: PageRequest;
}): Promise<PairsListResponse> {
  let whereCondition = "";
  let conditions = [];

  if (filter.search) {
    conditions.push(`
      launchToken_: {
        or: [
          {name_contains_nocase: "${filter.search}"}, 
          {symbol_contains_nocase: "${filter.search}"}, 
          {id: "${filter.search.toLowerCase()}"}
        ]
      }
    `);
  }

  if (filter.status === "success") {
    conditions.push(`raisedTokenReachingMinCap: true`);
  } else if (filter.status === "fail") {
    conditions.push(
      `raisedTokenReachingMinCap: false, endTime_lte: ${dayjs().unix()}`
    );
  } else if (filter.status === "processing") {
    conditions.push(
      `raisedTokenReachingMinCap: false, endTime_gt: ${dayjs().unix()}`
    );
  }

  // Add TVL range conditions
  if (filter.tvlRange?.min !== undefined) {
    conditions.push(`LaunchTokenTVL_gte: "${filter.tvlRange.min}"`);
  }
  if (filter.tvlRange?.max !== undefined) {
    conditions.push(`LaunchTokenTVL_lte: "${filter.tvlRange.max}"`);
  }

  // Add participants range conditions
  if (filter.participantsRange?.min !== undefined) {
    conditions.push(`participantsCount_gte: "${filter.participantsRange.min}"`);
  }
  if (filter.participantsRange?.max !== undefined) {
    conditions.push(`participantsCount_lte: "${filter.participantsRange.max}"`);
  }

  if (conditions.length > 0) {
    whereCondition = `{ ${conditions.join(", ")} }`;
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

  console.log("query fetchPairsList", query);

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData (data: Pot2PumpListData): PairsListResponse {
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

export async function fetchMemetrackerList ({
  chainId,
}: {
  chainId: string;
}): Promise<MemetrackerListResponse> {
  const query = `
    query MemetrackerList {
      pot2Pumps(
        first: 25
        where: {raisedTokenReachingMinCap: true}
        orderBy: launchToken__derivedMatic
        orderDirection: desc
      ) {
        ${pop2PumpQuery}
      }
    }
  `;

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData (
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

export async function fetchPot2PumpList ({
  filter,
}: {
  chainId: string;
  filter: SubgraphProjectFilter;
}): Promise<Pot2PumpListResponse> {
  let whereCondition: string[] = [];

  if (filter.search) {
    whereCondition.push(`
      launchToken_: {
        or: [
          {name_contains_nocase: "${filter.search}"}, 
          {symbol_contains_nocase: "${filter.search}"}, 
          {id: "${filter.search.toLowerCase()}"}
        ]
      }
    `);
  }

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

  if (filter.tvlRange?.min !== undefined) {
    whereCondition.push(` LaunchTokenTVL_gte: "${filter.tvlRange.min}" `);
  }
  if (filter.tvlRange?.max !== undefined) {
    whereCondition.push(` LaunchTokenTVL_lte: "${filter.tvlRange.max}" `);
  }

  if (filter.participantsRange?.min !== undefined) {
    whereCondition.push(
      ` participantsCount_gte: "${filter.participantsRange.min}" `
    );
  }
  if (filter.participantsRange?.max !== undefined) {
    whereCondition.push(
      ` participantsCount_lte: "${filter.participantsRange.max}" `
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

  const queryString = queryParts.join(",\n");

  const query = `
    query PairsList {
      pot2Pumps ${queryString.length > 0 ? `(${queryString})` : ''}{
        ${pop2PumpQuery}
      }
    }
  `;

  console.log('query', query)

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  function transformPairsListData (
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
          derivedUSD: pot2Pump.launchToken.derivedUSD,
          volumeUSD: pot2Pump.launchToken.volumeUSD,
          initialUSD: pot2Pump.launchToken.initialUSD,
          totalValueLockedUSD: pot2Pump.launchToken.totalValueLockedUSD,
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
          currentPage: filter?.currentPage ? filter?.currentPage + 1 : 1,
          hasNextPage: pairs.length === filter.limit,
        },
      },
    };
  }

  return transformPairsListData(data);
}

export async function fetchPot2Pumps ({
  filter,
}: {
  chainId: string;
  filter: SubgraphProjectFilter;
}): Promise<Pot2PumpListData> {
  const whereCondition: string[] = [];

  if (filter.search) {
    whereCondition.push(`
      launchToken_: {
        or: [
          {name_contains_nocase: "${filter.search}"}, 
          {symbol_contains_nocase: "${filter.search}"}, 
          {id: "${filter.search.toLowerCase()}"}
        ]
      }
    `);
  }

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

  if (filter.tvlRange?.min !== undefined) {
    whereCondition.push(` LaunchTokenTVL_gte: "${filter.tvlRange.min}" `);
  }
  if (filter.tvlRange?.max !== undefined) {
    whereCondition.push(` LaunchTokenTVL_lte: "${filter.tvlRange.max}" `);
  }

  if (filter.participantsRange?.min !== undefined) {
    whereCondition.push(
      ` participantsCount_gte: "${filter.participantsRange.min}" `
    );
  }
  if (filter.participantsRange?.max !== undefined) {
    whereCondition.push(
      ` participantsCount_lte: "${filter.participantsRange.max}" `
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

  const { data } = await infoClient.query<Pot2PumpListData>({
    query: gql(query),
  });

  return data;
}
