import { TokenPriceDataFeed } from "@/services/priceFeed/tokenPriceDataFeed";
import { publicProcedure, router } from "../trpc";
import z from "zod";
import { DefinedPriceFeed } from "@/services/priceFeed/PriceFeedProviders/PriceFeedProviders";
import {
  ChartDataResponse,
  TokenCurrentPriceResponseType,
} from "@/services/priceFeed/priceFeedTypes";
import { Zap } from "@/services/zap/zap";
import { OogaBoogaZapProvider } from "@/services/zap/zapProvider/zapProviders";

const zap = new Zap(new OogaBoogaZapProvider());

export const zapRouter = router({
  test: publicProcedure.query(async () => {
    return zap.provider.test();
  }),
});
