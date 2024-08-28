import { providers } from "ethers";
import { PairFilter } from "../launchpad";
import { GhostIndexer } from "./indexerProviders/ghost";
import {
  GhostFtoPairResponse,
  GhostFtoTokensResponse,
  GhostHoldingPairsResponse,
  GhostPairResponse,
  IndexerProvider,
  PageRequest,
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
    chainId: string,
    provider?: string,
    pageRequest?: PageRequest,
    projectType?: "fto" | "meme"
  ): Promise<ApiResponseType<GhostFtoPairResponse>> => {
    return await this.dataProvider.getFilteredFtoPairs(
      filter,
      chainId,
      provider,
      pageRequest,
      projectType
    );
  };

  getMostSuccessfulFtos = async (
    chainId: string,
    limit: number
  ): Promise<ApiResponseType<GhostFtoPairResponse>> => {
    return await this.dataProvider.getMostSuccessfulFTOPairs(chainId, limit);
  };

  getAllFtoTokens = async (): Promise<
    ApiResponseType<GhostFtoTokensResponse>
  > => {
    return await this.dataProvider.getAllFtoTokens();
  };

  getFilteredPairs = async (
    filter: Partial<PairFilter>,
    chainId: string,
    provider?: string,
    pageRequest?: PageRequest
  ): Promise<ApiResponseType<GhostPairResponse>> => {
    return await this.dataProvider.getFilteredPairs(
      filter,
      chainId,
      provider,
      pageRequest
    );
  };

  async getPairByTokens({
    token0,
    token1,
  }: {
    token0: string;
    token1: string;
  }) {
    return await this.dataProvider.getPairByTokens({ token0, token1 });
  }

  getHoldingPairs = async (
    walletAddress: string,
    chainId: string,
    pageRequest?: PageRequest
  ): Promise<ApiResponseType<GhostHoldingPairsResponse>> => {
    const res = await this.dataProvider.getHoldingPairs(
      walletAddress,
      chainId,
      pageRequest
    );

    return res;
  };

  getValidatedTokenPairs = async (
    chainId: string
  ): Promise<ApiResponseType<GhostPairResponse>> => {
    return await this.dataProvider.getValidatedTokenPairs(chainId);
  };
}

const ghostIndexer = new GhostIndexer(
  process.env.GHOST_INDEXER_API_KEY ?? "",
  "https://api.ghostlogs.xyz/gg/pub/"
);

export const indexer = new Indexer(ghostIndexer);
