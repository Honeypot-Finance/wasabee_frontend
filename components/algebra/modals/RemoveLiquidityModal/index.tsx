import Loader from "@/components/algebra/common/Loader";
import { Button } from "@/components/algebra/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/algebra/ui/dialog";
import { Slider } from "@/components/algebra/ui/slider";
import {
  NonfungiblePositionManager,
  Percent,
} from "@cryptoalgebra/custom-pools-sdk";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { Address } from "viem";
import { useTransactionAwait } from "@/lib/algebra/hooks/common/useTransactionAwait";
import {
  usePositions,
  usePosition,
} from "@/lib/algebra/hooks/positions/usePositions";
import { farmingClient } from "@/lib/graphql/clients";
import { Deposit } from "@/lib/graphql/generated/graphql";
import {
  useBurnState,
  useBurnActionHandlers,
  useDerivedBurnInfo,
} from "@/services/algebra/state/burnStore";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import { useUserState } from "@/services/algebra/state/userStore";
import { useSimulateAlgebraPositionManagerMulticall } from "@/wagmi-generated";

interface RemoveLiquidityModalProps {
  positionId: number;
}

const RemoveLiquidityModal = ({ positionId }: RemoveLiquidityModalProps) => {
  const [sliderValue, setSliderValue] = useState([50]);

  const { txDeadline } = useUserState();
  const { address: account } = useAccount();

  const { refetch: refetchAllPositions } = usePositions();

  const { position, refetch: refetchPosition } = usePosition(positionId);

  const { percent } = useBurnState();

  const { onPercentSelect } = useBurnActionHandlers();

  const derivedInfo = useDerivedBurnInfo(position, false);

  const {
    position: positionSDK,
    liquidityPercentage,
    feeValue0,
    feeValue1,
  } = derivedInfo;

  const { calldata, value } = useMemo(() => {
    if (
      !positionSDK ||
      !positionId ||
      !liquidityPercentage ||
      !feeValue0 ||
      !feeValue1 ||
      !account ||
      percent === 0
    )
      return { calldata: undefined, value: undefined };

    return NonfungiblePositionManager.removeCallParameters(positionSDK, {
      tokenId: String(positionId),
      liquidityPercentage,
      slippageTolerance: new Percent(1, 100),
      deadline: Date.now() + txDeadline * 1000,
      collectOptions: {
        expectedCurrencyOwed0: feeValue0,
        expectedCurrencyOwed1: feeValue1,
        recipient: account,
      },
    });
  }, [
    positionId,
    positionSDK,
    txDeadline,
    feeValue0,
    feeValue1,
    liquidityPercentage,
    account,
    percent,
  ]);

  const { data: removeLiquidityConfig } =
    useSimulateAlgebraPositionManagerMulticall({
      args: calldata && [calldata as `0x${string}`[]],
      value: BigInt(value || 0),
      query: {
        enabled: Boolean(calldata),
      },
    });

  const { data: removeLiquidityData, writeContract: removeLiquidity } =
    useContractWrite();

  const { isLoading: isRemoveLoading, isSuccess } = useTransactionAwait(
    removeLiquidityData,
    {
      title: "Remove liquidity",
      tokenA: position?.token0 as Address,
      tokenB: position?.token1 as Address,
      type: TransactionType.POOL,
    }
  );

  const isDisabled =
    sliderValue[0] === 0 || isRemoveLoading || !removeLiquidity;

  useEffect(() => {
    onPercentSelect(sliderValue[0]);
  }, [sliderValue]);

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isSuccess) return;
    let interval: NodeJS.Timeout;

    /* pool positions refetch */
    Promise.all([refetchPosition(), refetchAllPositions()])

      /* farming deposits refetch */
      .then(() => {
        handleCloseModal?.();
        if (sliderValue[0] !== 100) return;
        interval = setInterval(
          () =>
            farmingClient.refetchQueries({
              include: ["Deposits"],
              onQueryUpdated: (query, { result: diff }) => {
                const currentPos = diff.deposits.find(
                  (deposit: Deposit) =>
                    deposit.id.toString() === positionId.toString()
                );
                if (!currentPos) return;

                if (currentPos.eternalFarming === null) {
                  clearInterval(interval);
                } else {
                  query.refetch().then();
                }
              },
            }),
          2000
        );
      });

    return () => clearInterval(interval);
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full">
          Remove Liquidity
        </Button>
      </DialogTrigger>
      <DialogContent
        className="min-w-[500px] rounded-3xl bg-card-dark"
        style={{ borderRadius: "32px" }}
      >
        <DialogHeader>
          <DialogTitle className="font-bold select-none">
            Remove Liquidity
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold select-none">{`${sliderValue}%`}</h2>

          <div className="flex gap-2">
            {[25, 50, 75, 100].map((v) => (
              <Button
                key={`liquidity-percent-${v}`}
                disabled={isRemoveLoading}
                variant={"icon"}
                className="border border-card-border"
                size={"sm"}
                onClick={() => setSliderValue([v])}
              >
                {v}%
              </Button>
            ))}
          </div>

          <Slider
            value={sliderValue}
            id="liquidity-percent"
            max={100}
            defaultValue={sliderValue}
            step={1}
            onValueChange={(v) => setSliderValue(v)}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Liquidity Percent"
            disabled={isRemoveLoading}
          />

          <Button
            disabled={isDisabled}
            onClick={() =>
              removeLiquidity &&
              removeLiquidityConfig &&
              removeLiquidity(removeLiquidityConfig.request)
            }
          >
            {isRemoveLoading ? <Loader /> : "Remove Liquidity"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

RemoveLiquidityModal.whyDidYouRender = true;

export default RemoveLiquidityModal;
