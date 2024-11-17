import pools from "@/pages/pools";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { parseAbiItem, decodeEventLog } from "viem";
import { usePublicClient } from "wagmi";
import PoolLiquidityCardV3 from "../PoolLiquidityCard/PoolLiquidityCardV3";
import { AlgebraPoolContract } from "@/services/contract/algebra/algebra-pool-contract";
import { algebraFactoryABI } from "@/lib/abis/algebra-contracts/ABIs";
import { algebraFactoryAddress } from "@/wagmi-generated";
export function V3PoolsPage() {
  const pools = usePoolsList();
  return (
    <div>
      {pools.pools.map((pool) => {
        const poolContract = new AlgebraPoolContract({ address: pool });
        poolContract.init();
        return <PoolLiquidityCardV3 key={pool} pair={poolContract} autoSize />;
      })}
    </div>
  );
}

export function usePoolsList() {
  const publicClient = usePublicClient();

  const [pools, setPools] = useState<`0x${string}`[]>([]);

  useEffect(() => {
    if (!wallet.isInit || !publicClient) return;

    publicClient
      .getContractEvents({
        address: algebraFactoryAddress,
        eventName: "Pool",
        abi: algebraFactoryABI,
        fromBlock: "earliest",
        toBlock: "latest",
      })
      .then((logs) => {
        console.log(logs);
        setPools(
          logs
            .map((log) => {
              return log.args.pool;
            })
            .filter((pool) => pool !== undefined)
        );
      })
      .catch(console.error);
  }, [wallet.isInit, publicClient]);

  return { pools };
}
