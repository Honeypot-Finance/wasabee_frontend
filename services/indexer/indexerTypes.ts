import { PairFilter } from "../launchpad";

export interface IndexerProvider {
  apiKey: string;
  apiEndpoint: string;

  callIndexerApi(query: string, option: any): Promise<ApiResponseType<any>>;
  getFilteredFtoPairs: (
    input: PairFilter
  ) => Promise<ApiResponseType<Array<string>>>;
}

export type GhostFtoPairResponse = {
  pairs: {
    items: Array<{ id: string }>;
  };
};

export type GhostAPIOpt = {
  apiHandle: string;
};
