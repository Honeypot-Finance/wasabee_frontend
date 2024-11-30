import { gql } from "@apollo/client";
import { infoClient } from ".";

type WhitelistPool = {
  id: string;
};

type Token = {
  id: string;
  name: string;
  symbol: string;
  Pot2PumpAddress: string;
  poolCount: string;
  whitelistPools: WhitelistPool[];
};

type PairsListData = {
  tokens: Token[];
};

export async function fetchPairsList(): Promise<PairsListData> {
  const { data } = await infoClient.query<{ tokens: Token[] }>({
    query: gql`
      query PairsList {
        tokens(
          where: {
            Pot2PumpAddress_not: "0x0000000000000000000000000000000000000000"
          }
        ) {
          id
          name
          symbol
          Pot2PumpAddress
          poolCount
          whitelistPools {
            id
          }
        }
      }
    `,
  });

  return data;
}
