import { PairFilter } from "../launchpad";
import { IndexerProvider } from "./indexerTypes";

export default class Indexer<T extends IndexerProvider> {
  dataProvider: T;
  debug: boolean;

  constructor(dataProvider: T, debug: boolean = false) {
    this.dataProvider = dataProvider;
    this.debug = debug;
  }

  callIndexerApi = async <T extends any>(
    query: string
  ): Promise<ApiResponseType<T>> => {
    return await this.dataProvider.callIndexerApi(query);
  };

  getFilteredFtoPairs = async (
    filter: PairFilter
  ): Promise<ApiResponseType<Array<string>>> => {
    return await this.dataProvider.getFilteredFtoPairs(filter);
  };
}
