import { createCache, kv } from "@/lib/kv";
import { publicProcedure, router } from "../trpc";
import requestIp from "request-ip";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { LRUCache } from "lru-cache";
import { createPublicClientByChain } from "@/lib/client";
import BigNumber from "bignumber.js";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { berachainBartioTestnet } from "@/lib/chain";
import { z } from "zod";
import { tryEach } from "ethcall/lib/call";

const ethPublicClient = createPublicClientByChain(mainnet);
const beraPublicClient = createPublicClientByChain(berachainBartioTestnet);
const account = privateKeyToAccount(
  process.env.FAUCET_PRIVATE_KEY! as `0x${string}`
);

const walletClient = createWalletClient({
  account,
  chain: berachainBartioTestnet,
  transport: http(),
});

const ipCache = createCache("ip");
const requestStatus = {} as Record<string, boolean>;
const interval = 1000 * 60 * 60 * 24;
const faucetAmount = 0.5;

export const tokenRouter = router({
  queryNativeFaucet: publicProcedure.query(async ({ input, ctx }) => {
    const { req } = ctx;
    const ip = requestIp.getClientIp(req);
    const cachedValue = await ipCache.get<{
      claimableUntil: number;
    }>(JSON.stringify(ip!));
    if (!cachedValue) {
      return {
        claimable: true,
      };
    } else {
      return {
        claimable: false,
        claimableUntil: cachedValue.claimableUntil,
      };
    }
  }),
  applyNativeFaucet: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { req } = ctx;
      const ip = requestIp.getClientIp(req);
      const address = input.address;

      if (!ip) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid IP",
        });
      }
      if (requestStatus[JSON.stringify(ip!)] === true) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please wait for the last request to finish",
        });
      }
      requestStatus[JSON.stringify(ip!)] = true;
      const cache = await ipCache.get<{
        claimableUntil: number;
      }>(JSON.stringify(ip!));
      if (cache?.claimableUntil) {
        requestStatus[JSON.stringify(ip!)] = false;
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Your IP can claim after ${new Date(
            cache.claimableUntil
          ).toLocaleString()}`,
        });
      } else {
        const ethBalance = await ethPublicClient.getBalance({
          address: address as `0x${string}`,
        });
        console.log("ethBalance", ethBalance.toString());
        if (new BigNumber(ethBalance.toString()).lt(0.01 * 10 ** 18)) {
          requestStatus[JSON.stringify(ip!)] = false;
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Please make sure your account has at least 0.01ETH to claim",
          });
        }
        let sendRes: any;
        let hash = "";
        try {
          const preparedReq = await beraPublicClient.prepareTransactionRequest({
            // address: address as `0x${string}`,
            to: address as `0x${string}`,
            value: BigInt(faucetAmount * 10 ** 18),
          });
          hash = await walletClient.sendTransaction(preparedReq);
          console.log("hash", hash);
          sendRes = await beraPublicClient.waitForTransactionReceipt({
            hash: hash as `0x${string}`,
          });
        } catch (error) {
          console.error(error);
          requestStatus[JSON.stringify(ip!)] = false;
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Claimed failed, Please try again later",
          });
        }
        if (sendRes.status === "success") {
          await ipCache.set(
            JSON.stringify(ip!),
            {
              claimableUntil: Date.now() + interval,
            },
            {
              px: interval,
            }
          );
        } else {
          requestStatus[JSON.stringify(ip!)] = false;
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Claimed failed, Please try again later",
          });
        }

        requestStatus[JSON.stringify(ip!)] = false;
        return {
          hash,
        };
      }
    }),
});
