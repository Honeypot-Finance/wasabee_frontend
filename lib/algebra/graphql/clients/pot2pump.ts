import { gql } from "@apollo/client";
import { infoClient } from ".";
import {
  GetPot2PumpDetailDocument,
  GetPot2PumpDetailQuery,
  Pot2Pump,
  CanClaimPot2PumpParticipantDocument,
  CanClaimPot2PumpParticipantQuery,
  CanRefundPot2PumpParticipantQuery,
  CanRefundPot2PumpParticipantDocument,
  CanClaimPot2PumpParticipantQueryVariables,
  CanRefundPot2PumpParticipantQueryVariables,
  Scalars,
} from "../generated/graphql";
import { pot2PumpListToMemePairList, pot2PumpToMemePair } from "./pair";

export const getPot2PumpDetail = async (id: string) => {
  const res = await infoClient.query<GetPot2PumpDetailQuery>({
    query: GetPot2PumpDetailDocument,
    variables: { id },
  });

  return res.data?.pot2Pump;
};

export const subgraphPot2PumpToMemePair = async (id: string) => {
  const pot2Pump = await getPot2PumpDetail(id);
  return pot2Pump ? pot2PumpToMemePair(pot2Pump as Partial<Pot2Pump>) : null;
};

export const canClaimPot2Pump = async (accountId: string) => {
  const res = await infoClient.query<
    CanClaimPot2PumpParticipantQuery,
    CanClaimPot2PumpParticipantQueryVariables
  >({
    query: CanClaimPot2PumpParticipantDocument,
    variables: {
      accountId: accountId.toLowerCase(),
    },
    fetchPolicy: "network-only",
  });

  return pot2PumpListToMemePairList(
    res.data.participants.map((p) => p.pot2Pump) as Partial<Pot2Pump>[]
  );
};

export const canRefundPot2Pump = async (accountId: string) => {
  const timeNow = Math.floor(Date.now() / 1000);

  const res = await infoClient.query<
    CanRefundPot2PumpParticipantQuery,
    CanRefundPot2PumpParticipantQueryVariables
  >({
    query: CanRefundPot2PumpParticipantDocument,
    variables: {
      accountId: accountId.toLowerCase(),
      timeNow: timeNow,
    },
    fetchPolicy: "network-only",
  });

  if (!res.data?.participants) {
    console.error(
      "Failed to fetch refundable pot2pump participants:",
      res.error
    );
    return [];
  }

  return pot2PumpListToMemePairList(
    res.data.participants.map((p) => p.pot2Pump) as Partial<Pot2Pump>[]
  );
};
