import axios from "axios";
import { definedNetworks, netWorkDisplayTokens } from "./const";

export type TokenHistoryPrice = {
  token: {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
  };
  data: {
    priceUsd: number;
  }[];
};

const DEFINED_API_KEY = process.env.DEFINED_API_KEY;

export const getDefinedNetworks = async () => {
  let data;
  await axios
    .post(
      "https://graph.defined.fi/graphql",
      {
        query: `{
        getNetworks {
          name
          id
        }
      }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: DEFINED_API_KEY,
        },
      }
    )
    .then((response) => {
      data = response.data;
    });

  return data;
};

export const getPriceOfTokensInNetwork = async (id: string) => {
  if (!id || !definedNetworks.includes(id)) {
    return false;
  }
  const tokens = Object(netWorkDisplayTokens)[id].tokens;
  const dayCount = 30;
  let data = [] as TokenHistoryPrice[];

  function getTimestamps() {
    const timestamps = [];
    for (let i = 0; i < dayCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i + 1));
      timestamps.push(Math.round(date.getTime() / 1000));
    }
    return timestamps;
  }

  for (let i = 0; i < tokens.length; i++) {
    await axios
      .post(
        "https://graph.defined.fi/graphql",
        {
          query: `{
                    getTokenPrices(
                      inputs: [
                        ${getTimestamps().map((timestamp) => {
                          return `{ 
                          address: "${tokens[i].address}"
                          networkId: ${id}
                          timestamp: ${timestamp}
                        }`;
                        })}
                      ]
                    ) {
                      priceUsd
                    }
                  }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: DEFINED_API_KEY,
          },
        }
      )
      .then((response) => {
        data.push({
          token: tokens[i],
          data: response.data.data.getTokenPrices,
        });
      });
  }

  return data;
};
