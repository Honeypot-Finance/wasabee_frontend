import { ALGEBRA_ROUTER } from "@/data/algebra/addresses";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import {
  ApprovalStateType,
  ApprovalState,
} from "@/types/algebra/types/approve-state";
import {
  CurrencyAmount,
  Currency,
  Trade,
  TradeType,
  Percent,
} from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";
import { useMemo } from "react";
import { useContractWrite } from "wagmi";
import { formatBalance } from "../../utils/common/formatBalance";
import { useNeedAllowance } from "./useNeedAllowance";
import { useTransactionAwait } from "./useTransactionAwait";
import { erc20Abi } from "viem";

export function useApprove(
  amountToApprove: CurrencyAmount<Currency> | undefined,
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

  const { data: approvalData, writeAsync: approve } = useContractWrite();

  const { isLoading, isSuccess } = useTransactionAwait(approvalData?.hash, {
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
    approvalCallback: approve,
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
