import { TokenPriceDataFeed } from "@/services/priceFeed/tokenPriceDataFeed";
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { DefinedPriceFeed } from "@/services/priceFeed/PriceFeedProviders/PriceFeedProviders";
import { TokenCurrentPriceResponseType } from "@/services/priceFeed/priceFeedTypes";

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
        console.log(priceFeed);
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
});
