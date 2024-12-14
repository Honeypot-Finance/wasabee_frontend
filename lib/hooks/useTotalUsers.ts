import { useQuery } from "@apollo/client";
import { TOTAL_USERS_QUERY, AccountsData } from "../algebra/graphql/clients/leaderboard";

export function useTotalUsers() {
  const { data, loading, error } = useQuery<AccountsData>(TOTAL_USERS_QUERY);

  return {
    totalUsers: data?.accounts.length ?? 0,
    loading,
    error,
  };
} 