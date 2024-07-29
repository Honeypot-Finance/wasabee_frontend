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
    query: string
  ): Promise<ApiResponseType<Array<string>>> => {
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
