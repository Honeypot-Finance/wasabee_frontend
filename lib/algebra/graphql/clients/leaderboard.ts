import { gql } from "@apollo/client";
import { infoClient } from ".";

export const LEADERBOARD_QUERY = gql`
  query leaderboardStatus {
    factories {
      txCount
      totalVolumeUSD
      totalVolumeMatic
      totalValueLockedUSD
      totalValueLockedMatic
    }
  }
`;

export const TOTAL_USERS_QUERY = gql`
  query TotalUsers {
    accounts {
      id
    }
  }
`;

export const ACCOUNTS_QUERY = gql`
  query accounts($skip: Int!, $first: Int!, $address: String) {
    accounts(
      skip: $skip
      first: $first
      orderBy: totalSpendUSD
      orderDirection: desc
      where: $address
    ) {
      id
      swapCount
      holdingPoolCount
      memeTokenHoldingCount
      platformTxCount
      participateCount
      totalSpendUSD
      totalEarningUSDDay
      totalEarningUSDMonth
      transaction(first: 1, orderBy: timestamp, orderDirection: desc) {
        timestamp
      }
    }
  }
`;

type Factory = {
  txCount: string;
  totalVolumeUSD: string;
  totalVolumeMatic: string;
  totalValueLockedUSD: string;
  totalValueLockedMatic: string;
};

export type FactoryData = {
  factories: Factory[];
};

export type AccountsData = {
  accounts: { id: string }[];
};

export type Account = {
  id: string;
  swapCount: string;
  holdingPoolCount: string;
  memeTokenHoldingCount: string;
  platformTxCount: string;
  participateCount: string;
  totalSpendUSD: string;
  totalEarningUSDDay: string;
  totalEarningUSDMonth: string;
  transaction: { timestamp: string }[];
};

export type AccountsQueryData = {
  accounts: Account[];
};

type LeaderboardResponse = {
  status: string;
  message: string;
  data: Factory;
};

export async function fetchLeaderboardData(): Promise<LeaderboardResponse> {
  const { data } = await infoClient.query<FactoryData>({
    query: LEADERBOARD_QUERY,
  });

  return {
    status: "success",
    message: "Success",
    data: data.factories[0],
  };
}

export type PaginationParams = {
  skip: number;
  first: number;
};
