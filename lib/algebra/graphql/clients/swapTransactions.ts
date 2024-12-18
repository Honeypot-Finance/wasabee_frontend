import { gql } from "@apollo/client";
import { infoClient } from ".";

type SwapTransaction = {
  id: string;
  timestamp: string;
  transaction: {
    id: string;
  };
  sender: string;
  recipient: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
  amount0: string;
  amount1: string;
  amountUSD: string;
};

type SwapsResponse = {
  swaps: SwapTransaction[];
};

type SwapTransactionsResponse = {
  status: string;
  message: string;
  data: SwapTransaction[];
  pageInfo: {
    hasNextPage: boolean;
  };
};

export async function fetchSwapTransactions(
  page: number = 1,
  pageSize: number = 10
): Promise<SwapTransactionsResponse> {
  const skip = (page - 1) * pageSize;
  
  const query = `
    query GetUSDTWBERASwaps {
      swaps(
        first: ${pageSize}
        skip: ${skip}
        orderBy: timestamp
        orderDirection: desc
        where: {token0_: {symbol: "USDT"}, token1_: {symbol: "WBERA"}}
      ) {
        id
        timestamp
        transaction {
          id
        }
        sender
        recipient
        token0 {
          symbol
        }
        token1 {
          symbol
        }
        amount0
        amount1
        amountUSD
      }
    }
  `;

  const { data } = await infoClient.query<SwapsResponse>({
    query: gql(query),
  });

  return {
    status: "success",
    message: "Success",
    data: data.swaps,
    pageInfo: {
      hasNextPage: data.swaps.length === pageSize,
    },
  };
} 