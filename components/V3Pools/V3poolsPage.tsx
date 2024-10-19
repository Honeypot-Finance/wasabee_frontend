import { algebraFactoryABI } from "@/lib/abis/algebra-contracts/ABIs";
import pools from "@/pages/pools";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { parseAbiItem, decodeEventLog } from "viem";
import { usePublicClient } from "wagmi";

export function V3PoolsPage() {
  const pools = usePoolsList();
  return (
    <div>
      {pools.pools.map((pool) => {
        return <div key={pool}>{pool}</div>;
      })}
    </div>
  );
}

export function usePoolsList() {
  const publicClient = usePublicClient();

  const [pools, setPools] = useState<`0x${string}`[]>([]);

  useEffect(() => {
    if (!wallet.isInit || !publicClient) return;
    console.log(wallet.currentChain.contracts.algebraFactory);

    publicClient
      .getContractEvents({
        address: wallet.currentChain.contracts.algebraFactory as `0x${string}`,
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
