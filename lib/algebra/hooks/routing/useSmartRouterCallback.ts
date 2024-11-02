import { useMemo } from "react";
import { Address } from "viem";

import { useTransactionAwait } from "../common/useTransactionAwait";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import {
  algebraRouterAbi,
  useSimulateAlgebraRouterMulticall,
  useWriteAlgebraRouterMulticall,
} from "@/wagmi-generated";
import { Currency } from "@cryptoalgebra/router-custom-pools-and-sliding-fee";
import { formatAmount } from "../../utils/common/formatAmount";

export function useSmartRouterCallback(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  amount: string | undefined,
  calldata: Address | undefined,
  value: string | undefined
) {
  const { data: config } = useSimulateAlgebraRouterMulticall({
    args: calldata ? [[calldata]] : undefined,
  });

  const { data: swapData, writeContractAsync: callback } =
    useWriteAlgebraRouterMulticall();

  const { isLoading } = useTransactionAwait(swapData, {
    title: `Swap ${formatAmount(amount || "0", 6)} ${currencyA?.symbol}`,
    type: TransactionType.SWAP,
    tokenA: currencyA?.wrapped.address as Address,
    tokenB: currencyB?.wrapped.address as Address,
  });

  return useMemo(
    () => ({
      callback: async () => {
        if (!config) return;
        await callback(config.request);
      },
      isLoading,
    }),
    [callback, isLoading]
  );
}
