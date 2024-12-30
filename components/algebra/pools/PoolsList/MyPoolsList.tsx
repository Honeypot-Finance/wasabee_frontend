import { poolsColumns } from "@/components/algebra/common/Table/poolsColumns";
import { useEffect, useMemo } from "react";
import { Address } from "viem";
import { usePositions } from "@/lib/algebra/hooks/positions/usePositions";
import { farmingClient } from "@/lib/algebra/graphql/clients";
import {
  usePoolsListQuery,
  useActiveFarmingsQuery,
} from "@/lib/algebra/graphql/generated/graphql";
import PoolCardList from "./PoolCardList";
import MyPoolsTable from "../../common/Table/MyPoolsTable";

const MyPoolsList = () => {
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
      ({
        id,
        token0,
        token1,
        fee,
        totalValueLockedUSD,
        liquidity,
        poolHourData,
        poolDayData,
        poolWeekData,
        poolMonthData,
        txCount,
        volumeUSD,
        token0Price,
        createdAtTimestamp,
      }) => {
        const currentPool = poolDayData[0];
        const lastDate = currentPool ? currentPool.date * 1000 : 0;
        const currentDate = new Date().getTime();

        console.log("poolHourData", poolHourData);

        const changeHour = poolHourData[0]
          ? poolHourData[1]
            ? (poolHourData[0].volumeUSD - poolHourData[1].volumeUSD) /
              poolHourData[1].volumeUSD
            : 100
          : "";

        const change24h = poolDayData[0]
          ? poolDayData[1]
            ? (poolDayData[0].volumeUSD - poolDayData[1].volumeUSD) /
              poolDayData[1].volumeUSD
            : 100
          : "";

        const changeWeek = poolWeekData[0]
          ? poolWeekData[1]
            ? (poolWeekData[0].volumeUSD - poolWeekData[1].volumeUSD) /
              poolWeekData[1].volumeUSD
            : 100
          : "";

        const changeMonth = poolMonthData[0]
          ? poolMonthData[1]
            ? (poolMonthData[0].volumeUSD - poolMonthData[1].volumeUSD) /
              poolMonthData[1].volumeUSD
            : 100
          : "";

        /* time difference calculations here to ensure that the graph provides information for the last 24 hours */
        const timeDifference = currentDate - lastDate;
        const msIn24Hours = 24 * 60 * 60 * 1000;

        const openPositions = positions?.filter(
          (position) => position.pool.toLowerCase() === id.toLowerCase()
        );
        const activeFarming = activeFarmings?.eternalFarmings.find(
          (farming) => farming.pool === id
        );

        const poolMaxApr = !!Number(totalValueLockedUSD)
          ? (Number(currentPool.feesUSD) * 365) / Number(totalValueLockedUSD)
          : 0;
        const poolAvgApr = !!Number(totalValueLockedUSD)
          ? (Number(currentPool.feesUSD) * 365) / Number(totalValueLockedUSD)
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
          createdAtTimestamp,
          token0Price,
          changeHour,
          change24h,
          changeWeek,
          changeMonth,
          txCount,
          volumeUSD,
          liquidity,
        };
      }
    );
  }, [isLoading, pools, positions, activeFarmings]);

  return (
    <div>
      <div className="hidden xl:block">
        <MyPoolsTable
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

export default MyPoolsList;
