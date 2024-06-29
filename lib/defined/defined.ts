import axios from "axios";
import { definedNetworks, netWorkDisplayTokens } from "./const";

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
    data = response;
  });

  return { ...(data as unknown as DefinedChartDataResponse) };
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
  let data = [] as DefinedTokenHistoryPrice[];

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
    await callDefinedApi(`{
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
                  }`).then((response: any) => {
      data.push({
        token: tokens[i],
        data: response.getTokenPrices,
      });
    });
  }

  return data;
};
