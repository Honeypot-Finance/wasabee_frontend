import { TokenPriceDataFeed } from "@/services/priceFeed/tokenPriceDataFeed";
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { DefinedPriceFeed } from "@/services/priceFeed/PriceFeedProviders/PriceFeedProviders";
import {
  ChartDataResponse,
  TokenCurrentPriceResponseType,
} from "@/services/priceFeed/priceFeedTypes";
import Indexer, { indexer } from "@/services/indexer/indexer";
import { statusTextToNumber, type PairFilter } from "@/services/launchpad";
import { filter } from "lodash";
import { GhostIndexer } from "@/services/indexer/indexerProviders/ghost";
import {
  GhostPairResponse,
  PageRequest,
} from "@/services/indexer/indexerTypes";

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
        pageRequest: z
          .object({
            direction: z.string(z.enum(["next", "prev"])),
            cursor: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const res = await indexer.getFilteredFtoPairs(
        input.filter as PairFilter,
        input.chainId,
        input.provider,
        input.pageRequest as PageRequest
      );

      if (res.status === "error") {
        return {
          status: "error",
          message: res.message,
        } as const;
      } else {
        return {
          status: "success",
          data: res.data,
          message: "Success",
        } as const;
      }
    }),
  getMostSuccessfulFtos: publicProcedure
    .input(
      z.object({
        chainId: z.string(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const res = await indexer.getMostSuccessfulFtos(
        input.chainId,
        input.limit
      );

      if (res.status === "error") {
        return {
          status: "error",
          message: res.message,
        } as const;
      } else {
        return {
          status: "success",
          data: res.data,
          message: "Success",
        } as const;
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
  getAllPairs: publicProcedure.query(
    async (): Promise<ApiResponseType<GhostPairResponse>> => {
      const res = await indexer.dataProvider.getAllPairs();
      return res;
    }
  ),
});
