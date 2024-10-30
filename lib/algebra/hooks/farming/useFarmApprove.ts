import { useContractWrite, useSimulateContract, useWriteContract } from "wagmi";
import { useTransactionAwait } from "../common/useTransactionAwait";
import { useEffect } from "react";
import { useFarmCheckApprove } from "./useFarmCheckApprove";
import {
  ALGEBRA_POSITION_MANAGER,
  FARMING_CENTER,
} from "@/data/algebra/addresses";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import { algebraPositionManagerABI } from "@cryptoalgebra/custom-pools-sdk";

export function useFarmApprove(tokenId: bigint) {
  const APPROVE = true;

  const { data: config } = useSimulateContract({
    address: tokenId ? ALGEBRA_POSITION_MANAGER : undefined,
    abi: algebraPositionManagerABI,
    functionName: "approveForFarming",
    args: [tokenId, APPROVE, FARMING_CENTER],
  });

  const { data: data, writeContractAsync: onApprove } = useWriteContract();

  const { isLoading, isSuccess } = useTransactionAwait(data, {
    title: `Approve Position #${tokenId}`,
    tokenId: tokenId.toString(),
    type: TransactionType.FARM,
  });

  const { handleCheckApprove } = useFarmCheckApprove(tokenId);

  useEffect(() => {
    if (isSuccess) {
      handleCheckApprove();
    }
  }, [isSuccess]);

  return {
    isLoading,
    isSuccess,
    onApprove: () => onApprove && config && onApprove(config?.request),
  };
}
