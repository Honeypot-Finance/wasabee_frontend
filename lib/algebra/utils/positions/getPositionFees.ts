import { MAX_UINT128 } from "@/data/algebra/max-uint128";
import { wallet } from "@/services/wallet";
import { algebraPositionManagerAddress } from "@/wagmi-generated";
import {
  algebraPositionManagerABI,
  CurrencyAmount,
  Pool,
  unwrappedToken,
} from "@cryptoalgebra/custom-pools-sdk";
import { getContract } from "viem";

export async function getPositionFees(pool: Pool, positionId: number) {
  try {
    const algebraPositionManager = getContract({
      abi: algebraPositionManagerABI,
      address: algebraPositionManagerAddress,
      client: wallet.publicClient,
    });

    const owner = await algebraPositionManager.read.ownerOf([
      BigInt(positionId),
    ]);

    const {
      result: [fees0, fees1],
    } = await algebraPositionManager.simulate.collect(
      [
        {
          tokenId: BigInt(positionId),
          recipient: owner,
          amount0Max: MAX_UINT128,
          amount1Max: MAX_UINT128,
        },
      ],
      {
        account: owner,
      }
    );

    return [
      CurrencyAmount.fromRawAmount(
        unwrappedToken(pool.token0),
        fees0.toString()
      ),
      CurrencyAmount.fromRawAmount(
        unwrappedToken(pool.token1),
        fees1.toString()
      ),
    ];
  } catch {
    return [undefined, undefined];
  }
}
