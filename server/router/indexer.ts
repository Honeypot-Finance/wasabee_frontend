import { TokenPriceDataFeed } from "@/services/priceFeed/tokenPriceDataFeed";
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { DefinedPriceFeed } from "@/services/priceFeed/PriceFeedProviders/PriceFeedProviders";
import {
  ChartDataResponse,
  TokenCurrentPriceResponseType,
} from "@/services/priceFeed/priceFeedTypes";
import GhostIndexer from "@/services/indexer/indexerProviders/ghost";
import Indexer from "@/services/indexer/indexer";
import { statusTextToNumber, type PairFilter } from "@/services/launchpad";
import { chain, filter } from "lodash";
import { GhostFtoPairResponse } from "@/services/indexer/indexerTypes";

const ghostIndexer = new GhostIndexer(
  process.env.GHOST_INDEXER_API_KEY ?? "",
  "https://api.ghostlogs.xyz/gg/pub/"
);

const indexer = new Indexer(ghostIndexer);

export const indexerFeedRouter = router({
  getFilteredFtoPairs: publicProcedure
    .input(
      z.object({
        filter: z.object({
          status: z.string().optional(),
          search: z.string().optional(),
          showNotValidatedPairs: z.boolean().optional(),
        }),
        chainId: z.string(),
        provider: z.string().optional(),
      })
    )
    .query(
      async ({ input }): Promise<ApiResponseType<GhostFtoPairResponse>> => {
        const res = await indexer.getFilteredFtoPairs(
          input.filter as PairFilter,
          input.chainId,
          input.provider
        );

        if (res.status === "error") {
          return {
            status: "error",
            message: res.message,
          };
        } else {
          return {
            status: "success",
            data: res.data,
            message: "Success",
          };
        }
      }
    ),
  getAllFtoTokens: publicProcedure
    .output(
      z.object({
        status: z.literal("success"),
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            symbol: z.string(),
            decimals: z.number(),
          })
        ),
        message: z.string(),
      })
    )
    .query(async (): Promise<any> => {
      const res = await indexer.getAllFtoTokens();

      if (res.status === "error") {
        return {
          status: "error",
          message: res.message,
        };
      } else {
        return {
          status: "success",
          data: res.data,
          message: "Success",
        };
      }
    }),
  getAllPairs: publicProcedure
    .output(
      z.object({
        status: z.literal("success"),
        data: z.array(
          z.object({
            id: z.string(),
            token0: z.object({
              id: z.string(),
              name: z.string(),
              symbol: z.string(),
              decimals: z.number(),
            }),
            token1: z.object({
              id: z.string(),
              name: z.string(),
              symbol: z.string(),
              decimals: z.number(),
            }),
          })
        ),
        message: z.string(),
      })
    )
    .query(async (): Promise<any> => {
      const res = await indexer.dataProvider.getAllPairs();

      if (res.status === "error") {
        return {
          status: "error",
          message: res.message,
        };
      } else {
        return {
          status: "success",
          data: res.data,
          message: "Success",
        };
      }
    }),
});
