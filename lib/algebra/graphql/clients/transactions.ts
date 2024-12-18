import { gql } from "@apollo/client";
import { infoClient } from ".";

type ParticipantTransaction = {
  id: string;
  account: {
    id: string;
  };
  depositAmount: string;
  refundAmount: string;
  claimLqAmount: string;
  actionType: string;
  createdAt: string;
};

type Pot2PumpTransactions = {
  pot2Pump: {
    participantTransactionHistorys: ParticipantTransaction[];
  };
};

type TransactionsResponse = {
  status: string;
  message: string;
  data: ParticipantTransaction[];
  pageInfo: {
    hasNextPage: boolean;
  };
};

export async function fetchPot2PumpTransactions(
  pairAddress: string,
  page: number = 1,
  pageSize: number = 10
): Promise<TransactionsResponse> {
  const skip = (page - 1) * pageSize;
  
  const query = `
    query GetPot2PumpTransactions {
      pot2Pump(id: "${pairAddress.toLowerCase()}") {
        participantTransactionHistorys(
          first: ${pageSize}
          skip: ${skip}
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
          account {
            id
          }
          depositAmount
          refundAmount
          claimLqAmount
          actionType
          createdAt
        }
      }
    }
  `;

  const { data } = await infoClient.query<Pot2PumpTransactions>({
    query: gql(query),
  });

  return {
    status: "success",
    message: "Success",
    data: data.pot2Pump.participantTransactionHistorys,
    pageInfo: {
      hasNextPage: data.pot2Pump.participantTransactionHistorys.length === pageSize,
    },
  };
} 