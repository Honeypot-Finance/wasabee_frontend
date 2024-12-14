import { useQuery } from "@apollo/client";
import { ACCOUNTS_QUERY, AccountsQueryData, PaginationParams } from "../algebra/graphql/clients/leaderboard";
import dayjs from "dayjs";

export function useAccounts(page: number = 1, pageSize: number = 10, searchAddress: string = '') {
  const { data, loading, error, fetchMore } = useQuery<AccountsQueryData>(ACCOUNTS_QUERY, {
    variables: {
      skip: (page - 1) * pageSize,
      first: pageSize,
      address: searchAddress ? { id: searchAddress.toLowerCase() } : null,
    },
  });

  const accounts = data?.accounts.map(account => ({
    walletAddress: account.id,
    totalVolume: parseFloat(account.totalSpendUSD),
    swapCount: parseInt(account.swapCount),
    holdingCount: parseInt(account.holdingPoolCount),
    memeTokenCount: parseInt(account.memeTokenHoldingCount),
    transactions: parseInt(account.platformTxCount),
    participateCount: parseInt(account.participateCount),
    dailyEarning: parseFloat(account.totalEarningUSDDay),
    monthlyEarning: parseFloat(account.totalEarningUSDMonth),
    lastActive: account.transaction[0]
      ? dayjs(parseInt(account.transaction[0].timestamp) * 1000).format("MM/DD/YYYY, h:mm:ss A")
      : "-",
  })) ?? [];

  const loadMore = () => {
    return fetchMore({
      variables: {
        skip: data?.accounts.length ?? 0,
        first: pageSize,
      },
    });
  };

  return {
    accounts,
    loading,
    error,
    loadMore,
    hasMore: accounts.length === pageSize,
  };
} 