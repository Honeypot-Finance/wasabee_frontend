import { gql } from "@apollo/client";
import { infoClient } from ".";
import {
  GetPot2PumpDetailDocument,
  GetPot2PumpDetailQuery,
  Pot2Pump,
} from "../generated/graphql";
import { pot2PumpToMemePair } from "./pair";

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
