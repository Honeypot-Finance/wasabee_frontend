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
import { Token } from "@/services/contract/token";
import { pairQueryOutput } from "@/types/pair";

const queue = new PQueue({ concurrency: 10 });

export const pairRouter = router({
  getPairByIndex: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
        startIndex: z.number(),
        enIndex: z.number(),
      })
    )
    .query(async ({ input }) => {
      // const { index } = input;
    }),
  getPairByTokens: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
        token0Address: z.string(),
        token1Address: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { token0Address, token1Address, chainId } = input;
      return pairByTokensLoader.load({
        token0Address,
        token1Address,
        chainId,
      });
    }),
  getPairs: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
      })
    )
    .query(async ({ input }): Promise<pairQueryOutput> => {
      const { chainId } = input;
      const currentNetwork = networksMap[chainId];
      const factoryContract = getContract({
        address: currentNetwork.contracts.factory as `0x${string}`,
        abi: factoryABI,
        // 1a. Insert a single client
        client: {
          public: createPublicClientByChain(currentNetwork.chain),
        },
      });
      console.log("factoryContract-------", factoryContract);
      const length = Number(
        ((await factoryContract.read.allPairsLength()) as BigInt).toString()
      );
      if (!length) {
        return {};
      }
      console.log("total pairs", length);
      // await kv.del(getCacheKey(chainId, 'allPairs'));
      const allPairs =
        (await kv.get<Record<string, any>>(getCacheKey(chainId, "allPairs"))) ||
        {};
      // console.log(getCacheKey(chainId, 'allPairs'), allPairs)
      Array.from({ length: Number(length) }).forEach(async (_, index) => {
        await queue.add(async () => {
          const pair = allPairs?.[index];
          if (!pair) {
            try {
              const pairAddress = await factoryContract.read.allPairs([
                BigInt(index),
              ]);
              const pairContract = getContract({
                address: pairAddress as `0x${string}`,
                abi: IUniswapV2Pair.abi,
                client: {
                  public: createPublicClientByChain(currentNetwork.chain),
                },
              });
              const [token0, token1] = await Promise.all([
                pairContract.read.token0(),
                pairContract.read.token1(),
              ]);
              const tokens = await Promise.all([
                tokenLoader.load({
                  address: token0 as `0x${string}`,
                  chainId: Number(chainId),
                }),
                tokenLoader.load({
                  address: token1 as `0x${string}`,
                  chainId: Number(chainId),
                }),
              ]);
              const pair = {
                address: pairAddress,
                token0: tokens[0],
                token1: tokens[1],
              };
              allPairs[index] = pair;
            } catch (error) {
              console.error(error);
            }
          }
          return pair;
        });
      });
      await queue.onIdle();
      await kv.set(getCacheKey(chainId, "allPairs"), allPairs);
      return allPairs;
    }),
});
