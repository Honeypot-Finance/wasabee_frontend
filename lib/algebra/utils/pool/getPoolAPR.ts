import { Address } from "viem";

export async function getPoolAPR(poolId: Address) {
  if (!poolId) return;

  const poolsAPR = await fetch(
    "http://localhost/api/APR/pools/?network=berachain"
  )
    .then((v) => v?.json())
    .catch((e) => {
      console.error(e);
      return {};
    });

  if (poolsAPR[poolId.toLowerCase()]) {
    return poolsAPR[poolId.toLowerCase()];
  }

  return 0;
}
