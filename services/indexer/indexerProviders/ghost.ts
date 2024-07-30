import { PairFilter, statusTextToNumber } from "@/services/launchpad";
import { IndexerProvider, GhostFtoPairResponse } from "./../indexerTypes";

export default class GhostIndexer implements IndexerProvider {
  apiKey: string;
  apiEndpoint: string;

  constructor(apiKey: string, apiEndpoint: string) {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
  }

  callIndexerApi = async <T extends any>(
    query: string
  ): Promise<ApiResponseType<T>> => {
    if (!this.apiKey || !query) {
      return {
        status: "error",
        message: "Error: API Key or query is missing.",
      };
    }

    const res = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GHOST-KEY": this.apiKey,
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

  getFilteredFtoPairs = async (
    filter: PairFilter
  ): Promise<ApiResponseType<Array<string>>> => {
    const statusNum = statusTextToNumber(filter.status);

    const statusCondition = statusNum != -1 ? `status: "${statusNum}",` : "";
    const searchIdCondition = filter.search ? `id: "${filter.search}",` : "";
    const searchToken0IdCondition = filter.search
      ? `token0Id: "${filter.search}",`
      : "";
    const searchToken1IdCondition = filter.search
      ? `token1Id: "${filter.search}",`
      : "";

    const query = `
        {
          pairs(
            where: {
              OR:[
                {
                  ${statusCondition}
                  ${searchIdCondition}
                }
                {
                  ${statusCondition}
                  ${searchToken0IdCondition}
                }
                {
                  ${statusCondition}
                  ${searchToken1IdCondition}
                }
              ]
            }
          ) {
            items {
              id
            }
          }
        }
      `;

    console.log(query);

    const res = await this.callIndexerApi(query);
    if (res.status === "error") {
      return res;
    } else {
      return {
        status: "success",
        message: "Success",
        data: (res.data as GhostFtoPairResponse).pairs.items.flatMap((item) => {
          return item.id;
        }),
      };
    }
  };
}
