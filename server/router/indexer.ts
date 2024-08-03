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
import { filter } from "lodash";

const ghostIndexer = new GhostIndexer(
  process.env.GHOST_INDEXER_API_KEY ?? "",
  "https://api.ghostlogs.xyz/gg/pub/"
);

const indexer = new Indexer(ghostIndexer);

export const indexerFeedRouter = router({
  getFilteredFtoPairs: publicProcedure
    .input(
      z
        .object({
          filter: z.object({
            status: z.string().optional(),
            search: z.string().optional(),
          }),
          provider: z.string().optional(),
        })
        .optional()
    )
    .output(
      z.object({
        status: z.literal("success"),
        data: z.array(
          z.object({
            id: z.string(),
            token0Id: z.string(),
            token1Id: z.string(),
            depositedRaisedToken: z.string(),
            depositedLaunchedToken: z.string(),
            createdAt: z.string(),
            endTime: z.string(),
            status: z.string(),
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
    .query(async ({ input }): Promise<any> => {
      const res = await indexer.getFilteredFtoPairs(
        input?.filter as PairFilter,
        input?.provider
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
    }),
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
