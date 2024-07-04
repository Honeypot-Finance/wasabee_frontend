import {
  ChartDataResponse,
  PriceFeedProvider,
  TokenCurrentPriceResponseType,
} from "./../priceFeedTypes";
import { getTokenCurrentPriceTypeDataType } from "./defined";
const DEFINED_API_ENDPOINT = "https://graph.defined.fi/graphql";

export class DefinedPriceFeed implements PriceFeedProvider {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  callDefinedApi = async <T extends any>(
    query: string
  ): Promise<ApiResponseType<T>> => {
    if (!this.apiKey || !query) {
      return {
        status: "error",
        message: "Error: API Key or query is missing.",
      };
    }

    const res = await fetch(DEFINED_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      body: JSON.stringify({ query: query }),
    });

    const data = await res.json();

    return {
      status: "success",
      data: data.data,
      message: "Success",
    };
  };

  getTokenCurrentPrice = async (
    address: string,
    networkId: string
  ): Promise<ApiResponseType<TokenCurrentPriceResponseType>> => {
    const query = ` {
                      getTokenPrices(
                        inputs: [
                          { address: "${address.toString()}", networkId: ${networkId.toString()} }
                        ]
                      ) {
                        priceUsd
                        timestamp
                      }
                    }`;

    const data = await this.callDefinedApi<getTokenCurrentPriceTypeDataType>(
      query
    );

    if (!data || data.status === "error") {
      return {
        status: "error",
        message: "Failed to fetch data.",
      };
    } else {
      return {
        status: "success",
        data: {
          price: data.data.getTokenPrices[0].priceUsd,
          lastUpdated: data.data.getTokenPrices[0].timestamp,
        },
        message: "Success",
      };
    }
  };

  getChartData = async (
    address: string,
    networkId: string,
    from: number,
    to: number,
    resolution: string
  ): Promise<ApiResponseType<ChartDataResponse>> => {
    const res = await this.callDefinedApi<ChartDataResponse>(
      `{
        getBars(
          symbol: "${address}:${networkId}"
          from: ${from}
          to: ${to}
          resolution: "${resolution}"
          quoteToken: token1
        ) {
          o
          h
          l
          c
          t
        }
      }`
    );

    return res;
  };
}
