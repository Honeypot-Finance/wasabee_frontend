import { AlgebraPoolContract } from "@/services/contract/algebra/algebra-pool-contract";
import { Position } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

export function usePositionAPR(
  poolId: Address | undefined,
  position: Position | undefined,
  positionId?: string | undefined
) {
  if (!poolId) return undefined;
  const pool = AlgebraPoolContract.getPool({ address: poolId as Address });
  pool?.init();

  //const nativePrice = bundles?.bundles[0] && Number(bundles.bundles[0].maticPriceUSD)
  const nativePrice = 1;

  // Today fees
  const poolDayFees = pool.globalState.value?.[2];

  // Avg fees
  // const poolDayFees = poolFeeData && Boolean(poolFeeData.poolDayDatas.length) && poolFeeData.poolDayDatas.reduce((acc, v) => acc + Number(v.feesUSD), 0) / poolFeeData.poolDayDatas.length

  const yearFee = poolDayFees && poolDayFees * 365;

  const liquidityRelation =
    position &&
    pool.liquidity.value &&
    Number(position.liquidity.toString()) /
      (Number(pool.liquidity.value) +
        (positionId ? 0 : Number(position.liquidity.toString())));

  const [amount0, amount1] = position
    ? [position.amount0.toSignificant(), position.amount1.toSignificant()]
    : [0, 0];

  const tvl =
    pool &&
    nativePrice &&
    Number(pool.token0.value?.derivedUSD) * nativePrice * Number(amount0) +
      Number(pool.token1.value?.derivedUSD) * nativePrice * Number(amount1);

  return (
    liquidityRelation &&
    yearFee &&
    tvl &&
    ((yearFee * liquidityRelation) / tvl) * 100
  );
}
