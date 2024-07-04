import { TokenPriceDataFeed } from "@/services/priceFeed/tokenPriceDataFeed";
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { DefinedPriceFeed } from "@/services/priceFeed/PriceFeedProviders/PriceFeedProviders";
import {
  ChartDataResponse,
  TokenCurrentPriceResponseType,
} from "@/services/priceFeed/priceFeedTypes";

const definedApiKey = process.env.DEFINED_API_KEY || "";
const priceFeed = new TokenPriceDataFeed(new DefinedPriceFeed(definedApiKey));

export const priceFeedRouter = router({
  getSingleTokenPrice: publicProcedure
    .input(
      z.object({
        chainId: z.string(),
        tokenAddress: z.string(),
      })
    )
    .query(
      async ({
        input,
      }): Promise<ApiResponseType<TokenCurrentPriceResponseType>> => {
        const res = await priceFeed.getTokenCurrentPrice(
          input.tokenAddress,
          input.chainId
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
  getChartData: publicProcedure
    .input(
      z.object({
        chainId: z.string(),
        tokenAddress: z.string(),
        from: z.number(),
        to: z.number(),
        resolution: z.string(),
      })
    )
    .query(async ({ input }): Promise<ApiResponseType<ChartDataResponse>> => {
      console.log(input);
      const res = await priceFeed.getChartData(
        input.tokenAddress,
        input.chainId,
        input.from,
        input.to,
        input.resolution
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
});
