import Loader from "@/components/algebra/common/Loader";
import { Button } from "@/components/algebra/ui/button";
import { ALGEBRA_POSITION_MANAGER } from "@/data/algebra/addresses";
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_CHAIN_NAME,
} from "@/data/algebra/default-chain-id";
import { useApprove } from "@/lib/algebra/hooks/common/useApprove";
import { useTransactionAwait } from "@/lib/algebra/hooks/common/useTransactionAwait";
import { IDerivedMintInfo } from "@/services/algebra/state/mintStore";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import { useUserState } from "@/services/algebra/state/userStore";
import { ApprovalState } from "@/types/algebra/types/approve-state";
import {
  Percent,
  Currency,
  NonfungiblePositionManager,
  Field,
  ZERO,
} from "@cryptoalgebra/integral-sdk";
import JSBI from "jsbi";
import { useMemo } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { Address } from "viem";

interface AddLiquidityButtonProps {
  baseCurrency: Currency | undefined | null;
  quoteCurrency: Currency | undefined | null;
  mintInfo: IDerivedMintInfo;
  poolAddress: Address | undefined;
}

const ZERO_PERCENT = new Percent("0");
const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10_000);

export const AddLiquidityButton = ({
  baseCurrency,
  quoteCurrency,
  mintInfo,
  poolAddress,
}: AddLiquidityButtonProps) => {
  const { address: account } = useAccount();

  const { txDeadline } = useUserState();

  const useNative = baseCurrency?.isNative
    ? baseCurrency
    : quoteCurrency?.isNative
    ? quoteCurrency
    : undefined;

  const { calldata, value } = useMemo(() => {
    if (
      !account ||
      !mintInfo.position ||
      JSBI.EQ(mintInfo.position.liquidity, ZERO)
    )
      return { calldata: undefined, value: undefined };

    return NonfungiblePositionManager.addCallParameters(mintInfo.position, {
      slippageTolerance: mintInfo.outOfRange
        ? ZERO_PERCENT
        : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
      recipient: account,
      deadline: Date.now() + txDeadline,
      useNative,
      createPool: mintInfo.noLiquidity,
    });
  }, [mintInfo, account, txDeadline, useNative]);

  const { approvalState: approvalStateA, approvalCallback: approvalCallbackA } =
    useApprove(
      mintInfo.parsedAmounts[Field.CURRENCY_A],
      ALGEBRA_POSITION_MANAGER
    );
  const { approvalState: approvalStateB, approvalCallback: approvalCallbackB } =
    useApprove(
      mintInfo.parsedAmounts[Field.CURRENCY_B],
      ALGEBRA_POSITION_MANAGER
    );

  const showApproveA =
    approvalStateA === ApprovalState.NOT_APPROVED ||
    approvalStateA === ApprovalState.PENDING;

  const showApproveB =
    approvalStateB === ApprovalState.NOT_APPROVED ||
    approvalStateB === ApprovalState.PENDING;

  const isReady = useMemo(() => {
    return Boolean(
      (mintInfo.depositADisabled
        ? true
        : approvalStateA === ApprovalState.APPROVED) &&
        (mintInfo.depositBDisabled
          ? true
          : approvalStateB === ApprovalState.APPROVED) &&
        !mintInfo.errorMessage &&
        !mintInfo.invalidRange
    );
  }, [mintInfo, approvalStateA, approvalStateB]);

  const { data: addLiquidityData, write: addLiquidity } = useContractWrite();

  const { isLoading: isAddingLiquidityLoading } = useTransactionAwait(
    addLiquidityData?.hash,
    {
      title: "Add liquidity",
      tokenA: baseCurrency?.wrapped.address as Address,
      tokenB: quoteCurrency?.wrapped.address as Address,
      type: TransactionType.POOL,
    },
    `/pool/${poolAddress}`
  );

  if (mintInfo.errorMessage)
    return <Button disabled>{mintInfo.errorMessage}</Button>;

  if (showApproveA || showApproveB)
    return (
      <div className="flex w-full gap-2">
        {showApproveA && (
          <Button
            disabled={approvalStateA === ApprovalState.PENDING}
            className="w-full"
            onClick={() => approvalCallbackA && approvalCallbackA()}
          >
            {approvalStateA === ApprovalState.PENDING ? (
              <Loader />
            ) : (
              `Approve ${mintInfo.currencies.CURRENCY_A?.symbol}`
            )}
          </Button>
        )}
        {showApproveB && (
          <Button
            disabled={approvalStateB === ApprovalState.PENDING}
            className="w-full"
            onClick={() => approvalCallbackB && approvalCallbackB()}
          >
            {approvalStateB === ApprovalState.PENDING ? (
              <Loader />
            ) : (
              `Approve ${mintInfo.currencies.CURRENCY_B?.symbol}`
            )}
          </Button>
        )}
      </div>
    );

  return (
    <Button disabled={!isReady} onClick={() => addLiquidity && addLiquidity()}>
      {isAddingLiquidityLoading ? <Loader /> : "Create Position"}
    </Button>
  );
};

export default AddLiquidityButton;
