import { Currency, CurrencyAmount } from "@cryptoalgebra/custom-pools-sdk";
import {
  Currency as CurrencyBN,
  CurrencyAmount as CurrencyAmountBN,
} from "@cryptoalgebra/router-custom-pools-and-sliding-fee";
import { Account } from "viem/accounts";
import {
  useAccount,
  useBlockNumber,
  useContractRead,
  useReadContract,
} from "wagmi";
import { Address, erc20Abi } from "viem";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useNeedAllowance(
  currency: Currency | CurrencyBN | null | undefined,
  amount: CurrencyAmount<Currency> | CurrencyAmountBN<CurrencyBN> | undefined,
  spender: Address | undefined
) {
  const queryClient = useQueryClient();
  const { address: account } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: allowance, queryKey } = useReadContract({
    address: currency?.wrapped.address as Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: account && spender && [account, spender],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient]);

  return Boolean(
    !currency?.isNative &&
      typeof allowance === "bigint" &&
      amount &&
      amount.greaterThan(allowance.toString())
  );
}
