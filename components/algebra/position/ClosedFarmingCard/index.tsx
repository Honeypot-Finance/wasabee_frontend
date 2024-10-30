import Loader from "@/components/algebra/common/Loader";
import { Button } from "@/components/algebra/ui/button";
import { useFarmUnstake } from "@/lib/algebra/hooks/farming/useFarmStake";
import { EternalFarming } from "@/lib/graphql/generated/graphql";
import { FormattedPosition } from "@/types/algebra/types/formatted-position";
import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-sdk";
import { useAccount } from "wagmi";

interface ClosedFarmingCardProps {
  positionInEndedFarming: EternalFarming;
  selectedPosition: FormattedPosition;
}

const ClosedFarmingCard = ({
  positionInEndedFarming,
  selectedPosition,
}: ClosedFarmingCardProps) => {
  const { address: account } = useAccount();

  const farmingArgs = {
    tokenId: BigInt(selectedPosition.id ?? 0),
    rewardToken: positionInEndedFarming.rewardToken,
    bonusRewardToken: positionInEndedFarming.bonusRewardToken,
    pool: positionInEndedFarming.pool,
    nonce: positionInEndedFarming.nonce,
    account: account ?? ADDRESS_ZERO,
  };

  const { onUnstake, isLoading: isUnstaking } = useFarmUnstake(farmingArgs);

  return (
    <Button disabled={isUnstaking} onClick={onUnstake}>
      {isUnstaking ? <Loader /> : "Exit from farming"}
    </Button>
  );
};

export default ClosedFarmingCard;
