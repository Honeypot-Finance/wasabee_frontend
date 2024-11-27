import { formatAmount } from "../../utils/common/formatAmount";
import { Farming } from "@/types/algebra/types/farming-info";
import { useReadAlgebraVirtualPoolRewardRates } from "@/wagmi-generated";
import { formatUnits } from "viem";

export function useFarmingRewardRates(farming: Farming) {
  const { data: rates } = useReadAlgebraVirtualPoolRewardRates({
    address: farming.farming.virtualPool,
  });

  const [rewardRate, bonusRewardRate] = rates || [BigInt(0), BigInt(0)];

  const rewardRatePerDay =
    Number(formatUnits(rewardRate, farming.rewardToken.decimals)) *
    60 *
    60 *
    24;

  const bonusRewardRatePerDay =
    Number(formatUnits(bonusRewardRate, farming.bonusRewardToken?.decimals)) *
    60 *
    60 *
    24;

  const sumOfRewardRates = rewardRatePerDay + bonusRewardRatePerDay;

  return {
    sumOfRewardRates: formatAmount(sumOfRewardRates.toString(), 4),
    rewardRatePerDay: formatAmount(rewardRatePerDay.toString(), 4),
    bonusRewardRatePerDay: formatAmount(bonusRewardRatePerDay.toString(), 4),
  };
}
