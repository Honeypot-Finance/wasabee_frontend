import { PairFilter } from "../launchpad";

export interface IndexerProvider {
  apiKey: string;
  apiEndpoint: string;

  callIndexerApi: <T>(query: string) => Promise<ApiResponseType<T>>;
  getFilteredFtoPairs: (
    input: PairFilter
  ) => Promise<ApiResponseType<Array<string>>>;
}

export type GhostFtoPairResponse = {
  pairs: {
    items: Array<{ id: string }>;
  };
};
