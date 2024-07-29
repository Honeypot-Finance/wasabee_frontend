interface IndexerProvider {
  apiKey: string;
  apiEndpoint: string;

  callIndexerApi: <T extends any>(query: string) => Promise<ApiResponseType<T>>;
  getFilteredFtoPairs: (
    query: string
  ) => Promise<ApiResponseType<Array<string>>>;
}

type GhostFtoPairResponse = {
  pairs: {
    items: Array<{ id: string }>;
  };
};
