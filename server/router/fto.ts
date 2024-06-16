import { factoryABI } from "@/lib/abis/factory";

import { publicProcedure, router } from "../trpc";
import z from "zod";
import { pairByTokensLoader, tokenLoader } from "@/lib/dataloader/pair";
import { getContract } from "viem";
import { createPublicClientByChain } from "@/lib/client";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import PQueue from "p-queue";
import { getCacheKey } from "@/lib/cache";
import { networksMap } from "@/services/chain";
import { kv } from "@/lib/kv";
import { ftoService } from "../service/fto";

const queue = new PQueue({ concurrency: 10 });

export const ftoRouter = router({
  createProject: publicProcedure
    .input(
      z.object({
        chain_id: z.number(),
        pair: z.string(),
        account: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // const { index } = input;
      await ftoService.createFtoProject(input);
    }),
    getProjectsByAccount: publicProcedure
    .input(
      z.object({
        account: z.string(),
        chain_id: z.number()
      })
    ).query(async ({ input }) => {
        return ftoService.getFtoProjectsByAccount(input)
        }),
});
