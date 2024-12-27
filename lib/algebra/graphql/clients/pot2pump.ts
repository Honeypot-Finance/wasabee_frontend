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
  const res = await infoClient.query<CanClaimPot2PumpParticipantQuery>({
    query: CanClaimPot2PumpParticipantDocument,
    variables: { accountId },
  });

  return pot2PumpListToMemePairList(
    res.data?.participants.map((p) => p.pot2Pump) as Partial<Pot2Pump>[]
  );
};

export const canRefundPot2Pump = async (accountId: string) => {
  const res = await infoClient.query<CanRefundPot2PumpParticipantQuery>({
    query: CanRefundPot2PumpParticipantDocument,
    variables: { accountId, timeNow: Math.floor(Date.now() / 1000).toFixed(0) },
  });

  return pot2PumpListToMemePairList(
    res.data?.participants.map((p) => p.pot2Pump) as Partial<Pot2Pump>[]
  );
};
