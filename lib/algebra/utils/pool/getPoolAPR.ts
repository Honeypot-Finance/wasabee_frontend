import { Address } from "viem";

export async function getPoolAPR(poolId: Address) {
  if (!poolId) return;

  const poolsAPR = await fetch(
    "https://api.dexed.org/api/APR/pools/?network=goerli"
  )
    .then((v) => v.json())
    .catch((e) => (console.error("Failed to fetch pools APR", e), {}));

  if (poolsAPR[poolId.toLowerCase()]) {
    return poolsAPR[poolId.toLowerCase()];
  }

  return 0;
}
