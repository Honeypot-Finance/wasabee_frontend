import { Address } from "viem";

const apiOrigin = process.env.NEXT_PUBLIC_APR_HOST;

export async function getPoolAPR(poolId: Address) {
  if (!poolId) return;

  const poolsAPR = await fetch(`${apiOrigin}/api/APR/pools/?network=berachain`)
    .then((v) => v.json())
    .catch((e) => console.error("Failed to fetch pools APR", e));

  if (poolsAPR[poolId.toLowerCase()]) {
    return poolsAPR[poolId.toLowerCase()];
  }

  return 0;
}
