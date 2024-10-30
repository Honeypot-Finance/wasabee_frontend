import { farmingCenterABI } from "@/lib/abis/algebra-contracts/ABIs/farming/farmingCenter";
import { wallet } from "@/services/wallet";
import { farmingCenterAddress, readFarmingCenter } from "@/wagmi-generated";
import { Address, getContract } from "viem";

export async function getFarmingRewards({
  rewardToken,
  bonusRewardToken,
  pool,
  nonce,
  tokenId,
}: {
  rewardToken: Address;
  bonusRewardToken: Address;
  pool: Address;
  nonce: bigint;
  tokenId: bigint;
}): Promise<{ reward: bigint; bonusReward: bigint }> {
  try {
    const farmingCenter = getContract({
      abi: farmingCenterABI,
      address: farmingCenterAddress,
      client: wallet.publicClient,
    });

    const {
      result: [reward, bonusReward],
    } = await farmingCenter.simulate.collectRewards([
      {
        rewardToken,
        bonusRewardToken,
        pool,
        nonce,
      },
      tokenId,
    ]);
    return {
      reward,
      bonusReward,
    };
  } catch (e) {
    console.error(e);
    return {
      reward: BigInt(0),
      bonusReward: BigInt(0),
    };
  }
}
