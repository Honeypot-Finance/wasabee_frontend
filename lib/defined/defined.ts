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

export interface DefinedChartDataResponse {
  data: Data;
}

export interface Data {
  getBars: GetBars;
}

export interface GetBars {
  o: number[] | undefined[];
  h: number[] | undefined[];
  l: number[] | undefined[];
  c: number[] | undefined[];
  t: number[] | undefined[];
}

const DEFINED_API_KEY = process.env.DEFINED_API_KEY;

const callDefinedApi = async (query: string) => {
  let data;
  await axios
    .post(
      "https://graph.defined.fi/graphql",
      {
        query: query,
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

export const getDefinedTokenPriceForLast3Years = async (
  address: string,
  networkId: string
) => {
  let data;

  console.log(new Date().getTime() / 1000 - 3 * 365 * 24 * 60 * 60);
  console.log(new Date().getTime() / 1000);

  await callDefinedApi(
    `{
  getBars(
    symbol: "${address}:${networkId}"
    from: ${Math.round(new Date().getTime() / 1000 - 3 * 365 * 24 * 60 * 60)}
    to: ${Math.round(new Date().getTime() / 1000)}
    resolution: "1D"
    quoteToken: token1
  ) {
    o
    h
    l
    c
    t
  }
}`
  ).then((response) => {
    console.log(response);
    data = response;
  });

  return data as unknown as DefinedChartDataResponse;
};

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
