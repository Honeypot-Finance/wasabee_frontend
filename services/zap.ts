import { Button } from "@nextui-org/react";
import Link from "next/link";
import { makeAutoObservable } from "mobx";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { trpcClient } from "@/lib/trpc";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { Address, parseUnits } from "viem";
import { wallet } from "./wallet";

export class ZapService {
  constructor() {
    makeAutoObservable(this);
  }

  zapSwap = async (
    from: string,
    to: string,
    amount: string,
    chainId: number,
    account: string
  ) => {
    if (!wallet.isInit) {
      WrappedToastify.error({
        message: "Wallet not initialized",
      });
      return;
    }
    if (!from || !to || !amount || !chainId || !account) {
      WrappedToastify.error({
        message: "Invalid input",
      });
      return;
    }
    const ammountWithDecimals = parseUnits(amount, 18);
    //check allowance
    const allowance = await trpcClient.zap.zapRouterAllowance.query({
      token: from,
      account,
    });

    //if allowance is less than amount, approve
    if (allowance < amount) {
      const tx = await trpcClient.zap.zapRouterGetApproveTx.query({
        token: from,
        amount: ammountWithDecimals.toString(),
      });

      const hash = await wallet.walletClient.sendTransaction({
        from: tx.from as Address,
        to: tx.to as Address,
        data: tx.data as `0x${string}`,
        account: wallet.account as Address,
        chain: wallet.currentChain.chain,
      });

      const rcpt = await wallet.publicClient.waitForTransactionReceipt({
        hash,
      });

      if (rcpt.status === "success") {
        WrappedToastify.success({
          message: "Approved",
        });
      } else {
        WrappedToastify.error({
          message: "Failed to approve",
        });
        return;
      }
    }

    //if allowance is greater than amount, swap
    const { tx } = await trpcClient.zap.zapSwapGetTx.query({
      from,
      to,
      amount: ammountWithDecimals.toString(),
      chainId,
      account,
    });

    const hash = await wallet.walletClient.sendTransaction({
      from: wallet.account as Address,
      to: tx.to as Address,
      data: tx.data as `0x${string}`,
      value: tx.value,
      account: wallet.account as Address,
      chain: wallet.currentChain.chain,
    });

    const rcpt = await wallet.publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("rcpt", rcpt);

    if (rcpt.status === "success") {
      WrappedToastify.success({
        message: "Zap Swapped",
      });
    } else {
      WrappedToastify.error({
        message: "Failed to Zap Swap",
      });
      return;
    }
  };
}

export const zap = new ZapService();
