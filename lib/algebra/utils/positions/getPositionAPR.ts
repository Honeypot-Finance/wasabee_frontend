import { algebraPoolABI } from "@/lib/abis/algebra-contracts/ABIs";
import {
  PoolFieldsFragment,
  PoolFeeDataFieldsFragment,
} from "@/lib/graphql/generated/graphql";
import { wallet } from "@/services/wallet";
import { Position } from "@cryptoalgebra/custom-pools-sdk";
import { Address, getContract } from "viem";

export async function getPositionAPR(
  poolId: Address,
  position: Position,
  pool: PoolFieldsFragment | undefined | null,
  poolFeeData: PoolFeeDataFieldsFragment[] | undefined,
  nativePrice: string | undefined
) {
  if (!pool || !poolFeeData || !nativePrice) return;

  const algebraPool = getContract({
    abi: algebraPoolABI,
    address: poolId,
    client: wallet.publicClient,
  });

  try {
    const liquidity = await algebraPool.read.liquidity();

    // Today fees
    const poolDayFees =
      poolFeeData &&
      Boolean(poolFeeData.length) &&
      Number(poolFeeData[0].feesUSD);

    // Avg fees
    // const poolDayFees = poolFeeData && Boolean(poolFeeData.length) && poolFeeData.reduce((acc, v) => acc + Number(v.feesUSD), 0) / poolFeeData.length

    const yearFee = poolDayFees && poolDayFees * 365;

    const liquidityRelation =
      position &&
      liquidity &&
      Number(position.liquidity.toString()) / Number(liquidity);

    const [amount0, amount1] = position
      ? [position.amount0.toSignificant(), position.amount1.toSignificant()]
      : [0, 0];

    const tvl =
      pool &&
      Number(pool.token0.derivedMatic) * Number(nativePrice) * Number(amount0) +
        Number(pool.token1.derivedMatic) *
          Number(nativePrice) *
          Number(amount1);

    return (
      liquidityRelation &&
      yearFee &&
      tvl &&
      ((yearFee * liquidityRelation) / tvl) * 100
    );
  } catch {
    return 0;
  }
}
