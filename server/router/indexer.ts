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
      z.object({
        filter: z.object({
          status: z.string().optional(),
          search: z.string().optional(),
        }),
      })
    )
    .output(
      z.object({
        status: z.literal("success"),
        data: z.array(z.string()),
        message: z.string(),
      })
    )
    .query(async ({ input }): Promise<any> => {
      console.log(input);
      const res = await indexer.getFilteredFtoPairs(input.filter as PairFilter);

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
