import { useMemo } from "react";
import {
  Currency,
  CurrencyAmount,
  Percent,
  Trade,
  TradeType,
} from "@cryptoalgebra/custom-pools-sdk";
import {
  Currency as CurrencyBN,
  CurrencyAmount as CurrencyAmountBN,
  Percent as PercentBN,
  SmartRouter,
  SmartRouterTrade,
} from "@cryptoalgebra/router-custom-pools-and-sliding-fee";

import { useNeedAllowance } from "./useNeedAllowance";
import { useTransactionAwait } from "./useTransactionAwait";
import { Address } from "viem";
import { ALGEBRA_ROUTER } from "@/data/algebra/addresses";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import {
  ApprovalStateType,
  ApprovalState,
} from "@/types/algebra/types/approve-state";
import { useContractWrite, useSimulateContract, useWriteContract } from "wagmi";
import { formatBalance } from "../../utils/common/formatBalance";
import { erc20Abi } from "viem";

export function useApprove(
  amountToApprove:
    | CurrencyAmount<Currency>
    | CurrencyAmountBN<CurrencyBN>
    | undefined,
  spender: Address
) {
  const token = amountToApprove?.currency?.isToken
    ? amountToApprove.currency
    : undefined;
  const needAllowance = useNeedAllowance(token, amountToApprove, spender);

  const approvalState: ApprovalStateType = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;

    return needAllowance ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
  }, [amountToApprove, needAllowance, spender]);

  const { data: config } = useSimulateContract({
    address: amountToApprove
      ? (amountToApprove.currency.wrapped.address as Address)
      : undefined,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      spender,
      amountToApprove ? BigInt(amountToApprove.quotient.toString()) : 0,
    ] as [Address, bigint],
  });

  const { data: approvalData, writeContractAsync: approve } =
    useWriteContract();

  const { isLoading, isSuccess } = useTransactionAwait(approvalData, {
    title: `Approve ${formatBalance(
      amountToApprove?.toSignificant() as string
    )} ${amountToApprove?.currency.symbol}`,
    tokenA: token?.address as Address,
    type: TransactionType.SWAP,
  });

  return {
    approvalState: isLoading
      ? ApprovalState.PENDING
      : isSuccess && approvalState === ApprovalState.APPROVED
        ? ApprovalState.APPROVED
        : approvalState,
    approvalCallback: () => (config ? approve(config?.request) : undefined),
  };
}

export function useApproveCallbackFromTrade(
  trade: Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent
) {
  const amountToApprove = useMemo(
    () =>
      trade && trade.inputAmount.currency.isToken
        ? trade.maximumAmountIn(allowedSlippage)
        : undefined,
    [trade, allowedSlippage]
  );
  return useApprove(amountToApprove, ALGEBRA_ROUTER);
}

export function useApproveCallbackFromSmartTrade(
  trade: SmartRouterTrade<TradeType> | undefined,
  allowedSlippage: Percent
) {
  const allowedSlippageBN = useMemo(
    () =>
      new PercentBN(
        BigInt(allowedSlippage.numerator.toString()),
        BigInt(allowedSlippage.denominator.toString())
      ),
    [allowedSlippage]
  );

  const amountToApprove = useMemo(
    () =>
      trade && trade.inputAmount.currency.isToken
        ? SmartRouter.maximumAmountIn(trade, allowedSlippageBN)
        : undefined,
    [trade, allowedSlippageBN]
  );

  return useApprove(amountToApprove, ALGEBRA_ROUTER);
}
