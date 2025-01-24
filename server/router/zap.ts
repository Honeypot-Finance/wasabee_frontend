import {
  authProcedure,
  publicProcedure,
  rateLimitMiddleware,
  router,
} from "../trpc";
import z from "zod";
import { discussionService } from "../service/discussion";
import {
  Address,
  createWalletClient,
  http,
  isAddress,
  maxUint256,
  parseEther,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { berachainTestnetbArtio } from "viem/chains";
import { chainsMap } from "@/lib/chain";
import { ADDRESS_ZERO } from "@cryptoalgebra/sdk";

if (!process.env.OOGABOOGA_ZAP_PUBLIC_API_URL)
  throw new Error("PUBLIC_API_URL is required");
if (!process.env.OOGABOOGA_ZAP_API_KEY) throw new Error("API_KEY is required");

type SwapParams = {
  tokenIn: Address;
  amount: bigint;
  tokenOut: Address;
  to: Address;
  slippage: number;
};
const OOGABOOGA_ZAP_PUBLIC_API_URL = process.env.OOGABOOGA_ZAP_PUBLIC_API_URL;
const OOGABOOGA_ZAP_API_KEY = process.env.OOGABOOGA_ZAP_API_KEY;

const headers = {
  Authorization: `Bearer ${OOGABOOGA_ZAP_API_KEY}`,
};

export const zapRouter = router({
  zapRouterAllowance: publicProcedure
    .input(
      z.object({
        token: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
        account: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
      })
    )
    .query(async ({ input }) => {
      const { token, account } = input;
      const allowance = await getAllowance(token, account);
      return allowance;
    }),
  zapRouterGetApproveTx: publicProcedure
    .input(
      z.object({
        token: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
        amount: z.string(), // in real amount instead of bigint
      })
    )
    .query(async ({ input }) => {
      const { token, amount } = input;
      const { tx } = await approveAllowance(token, BigInt(amount));
      return tx;
    }),
  zapSwapGetTx: publicProcedure
    .input(
      z.object({
        from: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
        to: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
        amount: z.string(), // in real amount instead of bigint
        slippage: z.number().optional(),
        chainId: z.number(),
        account: z
          .string()
          .refine((value) => isAddress(value), { message: "Invalid address" }),
      })
    )
    .query(async ({ input }) => {
      const { from, to, amount, slippage, chainId, account } = input;
      const swapParams = {
        tokenIn: from, // Address of the token swapping from
        tokenOut: to, // Address of the token swapping to
        amount: BigInt(amount), // Amount of tokenIn to swap
        to: account, // Address to send tokenOut to (optional and defaults to `from`)
        slippage: slippage ?? 0.01, // Range from 0 to 1 to allow for price slippage
      };
      const { tx } = await swap(swapParams);
      return { tx };
    }),
});

const getAllowance = async (token: Address, from: Address) => {
  // Native token does not require approvals for allowance
  if (token === ADDRESS_ZERO) return maxUint256;

  const publicApiUrl = new URL(
    `${OOGABOOGA_ZAP_PUBLIC_API_URL}/v1/approve/allowance`
  );
  publicApiUrl.searchParams.set("token", token);
  publicApiUrl.searchParams.set("from", from);

  const res = await fetch(publicApiUrl, {
    headers,
  });

  const json = await res.json();
  return json.allowance;
};

const approveAllowance = async (
  token: Address,
  amount: bigint
): Promise<{
  tx: {
    from: Address;
    to: Address;
    data: `0x${string}`;
  };
}> => {
  const publicApiUrl = new URL(`${OOGABOOGA_ZAP_PUBLIC_API_URL}/v1/approve`);
  publicApiUrl.searchParams.set("token", token);
  publicApiUrl.searchParams.set("amount", amount.toString());

  const res = await fetch(publicApiUrl, { headers });
  const { tx } = await res.json();

  return { tx };

  // const hash = await client.sendTransaction({
  //   from: tx.from as Address,
  //   to: tx.to as Address,
  //   data: tx.data as `0x${string}`,
  // });

  // const rcpt = await client.waitForTransactionReceipt({
  //   hash,
  // });

  // console.log("Approval complete", rcpt.transactionHash, rcpt.status);
};

const swap = async (
  swapParams: SwapParams
): Promise<{
  tx: {
    to: Address;
    data: `0x${string}`;
    value: bigint;
  };
}> => {
  const publicApiUrl = new URL(`${OOGABOOGA_ZAP_PUBLIC_API_URL}/v1/swap`);
  publicApiUrl.searchParams.set("tokenIn", swapParams.tokenIn);
  publicApiUrl.searchParams.set("amount", swapParams.amount.toString());
  publicApiUrl.searchParams.set("tokenOut", swapParams.tokenOut);
  publicApiUrl.searchParams.set("to", swapParams.to);
  publicApiUrl.searchParams.set("slippage", swapParams.slippage.toString());

  const res = await fetch(publicApiUrl, { headers });
  const { tx } = await res.json();
  console.log("tx", tx);

  return { tx };

  // console.log("Submitting swap...");
  // const hash = await client.sendTransaction({
  //   from: tx.from as Address,
  //   to: tx.to as Address,
  //   data: tx.data as `0x${string}`,
  //   value: tx.value ? BigInt(tx.value) : BigInt(0),
  // });
  // console.log("hash", hash);

  // const rcpt = await client.waitForTransactionReceipt({
  //   hash,
  // });
  // console.log("Swap complete", rcpt.status);
};
