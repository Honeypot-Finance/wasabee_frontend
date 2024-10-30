import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import { useFarmHarvestAll } from "@/lib/algebra/hooks/farming/useFarmHarvest";
import { useFarmingAPR } from "@/lib/algebra/hooks/farming/useFarmingAPR";
import { useRewardEarnedUSD } from "@/lib/algebra/hooks/farming/useRewardEarnedUSD";
import { getFarmingRewards } from "@/lib/algebra/utils/farming/getFarmingRewards";
import { isSameRewards } from "@/lib/algebra/utils/farming/isSameRewards";
import { Deposit } from "@/lib/graphql/generated/graphql";
import { Farming } from "@/types/algebra/types/farming-info";
import { FormattedPosition } from "@/types/algebra/types/formatted-position";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { Button } from "@nextui-org/react";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import CardInfo from "../../common/CardInfo";
import CurrencyLogo from "../../common/CurrencyLogo";
import { SelectPositionFarmModal } from "../../modals/SelectPositionFarmModal";

interface ActiveFarmingProps {
  farming: Farming;
  deposits: Deposit[];
  positionsData: FormattedPosition[];
}

const ActiveFarming = ({
  farming,
  deposits,
  positionsData,
}: ActiveFarmingProps) => {
  const { address: account } = useAccount();

  const [rewardEarned, setRewardEarned] = useState<bigint>(BigInt(0));
  const [bonusRewardEarned, setBonusRewardEarned] = useState<bigint>(BigInt(0));

  const APR = useFarmingAPR({ farmingId: farming.farming.id });

  const isSameReward = isSameRewards(
    farming.farming.rewardToken,
    farming.farming.bonusRewardToken
  );

  const formattedRewardEarned = Number(
    formatUnits(rewardEarned, farming.rewardToken.decimals)
  );

  const formattedBonusRewardEarned = Number(
    formatUnits(bonusRewardEarned, farming.bonusRewardToken?.decimals)
  );

  const rewardEarnedUSD = useRewardEarnedUSD({
    token: farming.rewardToken,
    reward: rewardEarned,
  });

  const bonusRewardEarnedUSD = useRewardEarnedUSD({
    token: farming.bonusRewardToken,
    reward: bonusRewardEarned,
  });

  const farmingRewards = (rewardEarnedUSD + bonusRewardEarnedUSD).toFixed(4);

  const rewardTokenCurrency = useCurrency(farming.farming.rewardToken);
  const bonusRewardTokenCurrency = useCurrency(
    farming.farming.bonusRewardToken
  );

  const TVL = deposits.reduce((acc, deposit) => {
    const currentFormattedPosition = positionsData.find(
      (position) => Number(position.id) === Number(deposit.id)
    );
    if (deposit.eternalFarming !== null && currentFormattedPosition) {
      return acc + currentFormattedPosition.liquidityUSD;
    } else {
      return acc;
    }
  }, 0);

  const formattedTVL = TVL.toFixed(2);

  const rewardRatePerDay =
    Number(
      formatUnits(farming.farming.rewardRate, farming.rewardToken.decimals)
    ) *
    60 *
    60 *
    24;

  const bonusRewardRatePerDay =
    Number(
      formatUnits(
        farming.farming.bonusRewardRate,
        farming.bonusRewardToken?.decimals
      )
    ) *
    60 *
    60 *
    24;

  const { isLoading, onHarvestAll, isSuccess } = useFarmHarvestAll(
    {
      rewardToken: farming.farming.rewardToken,
      bonusRewardToken: farming.farming.bonusRewardToken,
      pool: farming.farming.pool,
      nonce: farming.farming.nonce,
      account: account ?? ADDRESS_ZERO,
    },
    deposits
  );

  const handleHarvestAll = async () => {
    if (isLoading || !onHarvestAll) return;
    onHarvestAll();
  };

  useEffect(() => {
    const promises: Promise<{
      reward: bigint;
      bonusReward: bigint;
    }>[] = [];
    deposits.forEach((deposit) => {
      if (deposit.eternalFarming !== null) {
        promises.push(
          getFarmingRewards({
            rewardToken: farming.farming.rewardToken,
            bonusRewardToken: farming.farming.bonusRewardToken,
            pool: farming.farming.pool,
            nonce: farming.farming.nonce,
            tokenId: BigInt(deposit.id),
          })
        );
      }
    });
    if (promises.length === 0) return;
    Promise.all(promises).then((rewards) => {
      setRewardEarned(BigInt(0));
      setBonusRewardEarned(BigInt(0));
      rewards.forEach((reward) => {
        setRewardEarned((prev) => prev + reward.reward);
        setBonusRewardEarned((prev) => prev + reward.bonusReward);
      });
    });
  }, [deposits, farming, isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-[377px] pb-2 bg-card border border-card-border/60 rounded-3xl mt-8">
      <div className="flex flex-col w-full max-sm:p-6 p-8 gap-8">
        <div className="flex max-sm:flex-col w-full gap-8">
          <div className="flex max-xs:flex-col w-full gap-8">
            <CardInfo className="w-1/2 max-xs:w-full" title="APR">
              <p className="text-green-300">{APR}%</p>
            </CardInfo>
            <CardInfo className="w-1/2 max-xs:w-full" title="TVL">
              <p className="text-purple-300">${formattedTVL}</p>
            </CardInfo>
          </div>

          <CardInfo
            additional={
              !isSameReward && farmingRewards !== "0.0000"
                ? `${
                    formattedRewardEarned.toFixed(2) === "0.00"
                      ? "<0.01"
                      : formattedRewardEarned.toFixed(2)
                  } ${farming.rewardToken.symbol} + ${
                    formattedBonusRewardEarned.toFixed(2) === "0.00"
                      ? "<0.01"
                      : formattedBonusRewardEarned.toFixed(2)
                  } ${farming.bonusRewardToken?.symbol}`
                : ""
            }
            className="w-full"
            title="EARNED"
          >
            <p className="text-cyan-300">${farmingRewards}</p>
          </CardInfo>
        </div>

        <CardInfo title="Rewards">
          <div className="flex gap-12 min-h-12">
            <div className="flex gap-4 items-center">
              {isSameReward ? (
                <>
                  <CurrencyLogo size={32} currency={rewardTokenCurrency} />
                  <p>
                    {`${(rewardRatePerDay + bonusRewardRatePerDay).toFixed(
                      2
                    )} ${farming.rewardToken.symbol} / day`}
                  </p>
                </>
              ) : (
                <div className="flex w-full gap-4 max-md:flex-col">
                  <div className="flex w-fit h-fit gap-4 items-center">
                    <CurrencyLogo
                      className="h-fit"
                      size={32}
                      currency={rewardTokenCurrency}
                    />
                    <p>
                      {`${
                        rewardRatePerDay.toFixed(2) === "0.00"
                          ? "<0.01"
                          : rewardRatePerDay.toFixed(2)
                      } ${farming.rewardToken.symbol} / day`}
                    </p>
                  </div>
                  {bonusRewardRatePerDay > 0 && (
                    <div className="flex w-fit h-fit gap-4 items-center">
                      <CurrencyLogo
                        className="h-fit"
                        size={32}
                        currency={bonusRewardTokenCurrency}
                      />
                      <p>
                        {`${
                          bonusRewardRatePerDay.toFixed(2) === "0.00"
                            ? "<0.01"
                            : bonusRewardRatePerDay.toFixed(2)
                        } ${farming.bonusRewardToken?.symbol} / day`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardInfo>

        <div className="w-full flex gap-8">
          <Button
            disabled={
              (rewardEarnedUSD === 0 && bonusRewardEarnedUSD === 0) || isLoading
            }
            onClick={handleHarvestAll}
            className="w-1/2"
          >
            {isLoading ? <Loader /> : "Collect Rewards"}
          </Button>
          <SelectPositionFarmModal
            isHarvestLoading={isLoading}
            positions={deposits}
            farming={farming}
            positionsData={positionsData}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveFarming;
