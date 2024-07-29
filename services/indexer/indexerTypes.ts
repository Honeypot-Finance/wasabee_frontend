interface IndexerProvider {
  apiKey: string;
  apiEndpoint: string;

  callIndexerApi: <T extends any>(query: string) => Promise<ApiResponseType<T>>;
}
