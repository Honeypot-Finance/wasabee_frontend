import { poolsColumns } from "@/components/algebra/common/Table/poolsColumns";
import { useEffect, useMemo } from "react";
import { Address } from "viem";
import useSWR from "swr";
import PoolsTable from "@/components/algebra/common/Table/poolsTable";
import { usePositions } from "@/lib/algebra/hooks/positions/usePositions";
import { farmingClient } from "@/lib/algebra/graphql/clients";
import {
  usePoolsListQuery,
  useActiveFarmingsQuery,
} from "@/lib/algebra/graphql/generated/graphql";
import PoolCardList from "./PoolCardList";

const PoolsList = () => {
  const { data: pools, loading: isPoolsListLoading } = usePoolsListQuery();

  useEffect(() => {
    if (pools) {
      console.log("Pools data:", pools);
    }
  }, [pools]);

  const { data: activeFarmings, loading: isFarmingsLoading } =
    useActiveFarmingsQuery({
      client: farmingClient,
    });
  const { positions, loading: isPositionsLoading } = usePositions();

  const isLoading =
    isPoolsListLoading ||
    // isPoolsMaxAprLoading ||
    // isPoolsAvgAprLoading ||
    isPositionsLoading ||
    isFarmingsLoading;
  // ||isFarmingsAPRLoading;

  const formattedPools = useMemo(() => {
    if (isLoading || !pools) return [];

    return pools.pools.map(
      ({ id, token0, token1, fee, totalValueLockedUSD, poolDayData }) => {
        const currentPool = poolDayData[0];
        const lastDate = currentPool ? currentPool.date * 1000 : 0;
        const currentDate = new Date().getTime();

        /* time difference calculations here to ensure that the graph provides information for the last 24 hours */
        const timeDifference = currentDate - lastDate;
        const msIn24Hours = 24 * 60 * 60 * 1000;

        const openPositions = positions?.filter(
          (position) => position.pool.toLowerCase() === id.toLowerCase()
        );
        const activeFarming = activeFarmings?.eternalFarmings.find(
          (farming) => farming.pool === id
        );

        // const poolMaxApr =
        //   poolsMaxApr && poolsMaxApr[id]
        //     ? Number(poolsMaxApr[id].toFixed(2))
        //     : 0;
        // const poolAvgApr =
        //   poolsAvgApr && poolsAvgApr[id]
        //     ? Number(poolsAvgApr[id].toFixed(2))
        //     : 0;
        // const farmApr =
        //   activeFarming && farmingsAPR && farmingsAPR[activeFarming.id] > 0
        //     ? farmingsAPR[activeFarming.id]
        //     : 0;

        // const avgApr = farmApr + poolAvgApr;

        // 池子的 APR 是 24H 的 fee 除以 TVL，position 的 APR 是 24H 的 fee 除以 TVL
        const poolMaxApr = !!Number(totalValueLockedUSD)
          ? ((Number(currentPool.feesUSD) * 365) /
              Number(totalValueLockedUSD)) *
            100
          : 0;
        const poolAvgApr = !!Number(totalValueLockedUSD)
          ? ((Number(currentPool.feesUSD) * 365) /
              Number(totalValueLockedUSD)) *
            100
          : 0;
        const farmApr = 0;
        const avgApr = poolAvgApr;

        return {
          id: id as Address,
          pair: {
            token0,
            token1,
          },
          fee: Number(fee) / 10_000,
          tvlUSD: Number(totalValueLockedUSD),
          volume24USD:
            timeDifference <= msIn24Hours ? currentPool.volumeUSD : 0,
          fees24USD: timeDifference <= msIn24Hours ? currentPool.feesUSD : 0,
          poolMaxApr,
          poolAvgApr,
          farmApr,
          avgApr,
          isMyPool: Boolean(openPositions?.length),
          hasActiveFarming: Boolean(activeFarming),
        };
      }
    );
  }, [isLoading, pools, positions, activeFarmings]);

  return (
    <div>
      <div className="hidden xl:block">
        <PoolsTable
          columns={poolsColumns}
          data={formattedPools}
          defaultSortingID={"tvlUSD"}
          link={"pooldetail"}
          showPagination={true}
          loading={isLoading}
        />
      </div>
      <div className="block xl:hidden">
        <PoolCardList data={formattedPools} />
      </div>
    </div>
  );
};

export default PoolsList;
