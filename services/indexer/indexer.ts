import { PairFilter } from "../launchpad";
import {
  GhostFtoPairResponse,
  GhostFtoTokensResponse,
  IndexerProvider,
} from "./indexerTypes";

export default class Indexer<T extends IndexerProvider> {
  dataProvider: T;
  debug: boolean;

  constructor(dataProvider: T, debug: boolean = false) {
    this.dataProvider = dataProvider;
    this.debug = debug;
  }

  callIndexerApi = async <T extends any>(
    query: string,
    options: any
  ): Promise<ApiResponseType<T>> => {
    return await this.dataProvider.callIndexerApi(query, options);
  };

  getFilteredFtoPairs = async (
    filter: PairFilter,
    provider?: string
  ): Promise<ApiResponseType<GhostFtoPairResponse>> => {
    return await this.dataProvider.getFilteredFtoPairs(filter, provider);
  };

  getAllFtoTokens = async (): Promise<
    ApiResponseType<GhostFtoTokensResponse>
  > => {
    return await this.dataProvider.getAllFtoTokens();
  };
}
