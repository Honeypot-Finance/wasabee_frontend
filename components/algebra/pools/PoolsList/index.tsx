import {
  poolsColumns,
  poolsColumnsMy,
} from "@/components/algebra/common/Table/poolsColumns";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import PoolsTable from "@/components/algebra/common/Table/poolsTable";
import { usePositions } from "@/lib/algebra/hooks/positions/usePositions";
import { farmingClient } from "@/lib/algebra/graphql/clients";
import {
  usePoolsListQuery,
  useActiveFarmingsQuery,
  Pool_OrderBy,
} from "@/lib/algebra/graphql/generated/graphql";
import PoolCardList from "./PoolCardList";
import { SortingState } from "@tanstack/react-table";
import { useUserPools } from "@/lib/algebra/graphql/clients/pool";
import { wallet } from "@/services/wallet";
import BigNumber from "bignumber.js";
import { id } from "ethers/lib/utils";

const mappingSortKeys: Record<any, Pool_OrderBy> = {
  tvlUSD: Pool_OrderBy.TotalValueLockedUsd,
  price: Pool_OrderBy.Token0Price,
  age: Pool_OrderBy.CreatedAtTimestamp,
  txns: Pool_OrderBy.TxCount,
  volume: Pool_OrderBy.VolumeUsd,
  changeHour: Pool_OrderBy.Id,
  change24h: Pool_OrderBy.Id,
  changeWeek: Pool_OrderBy.Id,
  changeMonth: Pool_OrderBy.Id,
  liquidity: Pool_OrderBy.Liquidity,
  "marktet cap": Pool_OrderBy.Token0MarketCap,
};
interface PoolsListProps {
  defaultFilter?: string;
  showOptions?: boolean;
}
const PoolsList = ({
  defaultFilter = "trending",
  showOptions = true,
}: PoolsListProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  const [search, setSearch] = useState("");

  const {
    data: pools,
    loading: isPoolsListLoading,
    refetch,
  } = usePoolsListQuery({
    variables: {
      search: search,
    },
  });
  const {
    data: userPools,
    loading: isUserPoolsLoading,
    refetch: refetchUserPools,
  } = useUserPools(wallet.account);

  // useEffect(() => {
  //   if (userPools || isUserPoolsLoading) return;

  //   const interval = setInterval(() => {
  //     refetchUserPools();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [userPools, refetchUserPools, isUserPoolsLoading]);

  // useEffect(() => {
  //   if (pools || isPoolsListLoading) return;

  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [pools, refetch, isPoolsListLoading]);

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

    return pools?.pools.map(
      ({
        id,
        token0,
        token1,
        fee,
        totalValueLockedUSD,
        poolHourData,
        poolDayData,
        poolWeekData,
        poolMonthData,
        txCount,
        volumeUSD,
        token0Price,
        createdAtTimestamp,
        liquidity,
        aprPercentage,
      }) => {
        const currentPool = poolDayData[0];
        const lastDate = currentPool ? currentPool.date * 1000 : 0;
        const currentDate = new Date().getTime();

        function handleGap(
          data: any[],
          gap: number,
          field: string,
          endTime: number
        ) {
          data?.sort((a, b) => a[field] - b[field]);

          let startTime = data[0]?.[field];

          let currentTimestamp = startTime;
          const filledData = [];

          while (currentTimestamp <= endTime) {
            const existingData = data.find(
              (d) =>
                d[field] >= currentTimestamp &&
                d[field] < currentTimestamp + gap
            );

            filledData.push(
              existingData || {
                [field]: currentTimestamp,
                volumeUSD: 0,
              }
            );

            currentTimestamp += gap;
          }

          return filledData?.sort((a, b) => b[field] - a[field]);
        }

        function calculatePercentageChange(current: number, previous: number) {
          if (previous === 0) {
            return current === 0 ? 0 : 100; // Assume 100% change for a significant increase
          }

          // Calculate percentage change
          const change = ((current - previous) / previous) * 100;

          // Ensure the result is a valid number
          return isNaN(change) || !isFinite(change) ? 0 : change;
        }

        //periodStartUnix

        const handleGapHour = (data: any[], end: number) => {
          return handleGap(data, 3600, "periodStartUnix", end);
        };

        const handleDayGap = (data: any[], end: number) => {
          return handleGap(data, 3600 * 24, "date", end);
        };

        const handleGapWeek = (data: any[], end: number) => {
          return handleGap(data, 3600 * 24 * 7, "week", end);
        };

        const filledGapHours = handleGapHour(
          poolHourData?.slice(0, 24) || [],
          Math.floor(Date.now() / 1000)
        );

        const filledGapDays = handleDayGap(
          poolDayData?.slice(0, 14) || [],
          Math.floor(Date.now() / 1000)
        );

        const filledGapWeeks = handleGapWeek(
          poolWeekData?.slice(0, 8),
          Math.floor(Date.now() / 1000)
        );
        const changeHour = calculatePercentageChange(
          Number(filledGapHours[0]?.volumeUSD || 0),
          Number(filledGapHours[1]?.volumeUSD || 0)
        );

        const change24h = calculatePercentageChange(
          filledGapHours
            .slice(0, 24)
            .reduce((sum, hour) => sum + Number(hour?.volumeUSD || 0), 0),
          filledGapHours
            .slice(24, 48)
            .reduce((sum, hour) => sum + Number(hour?.volumeUSD || 0), 0)
        );

        const changeWeek = calculatePercentageChange(
          filledGapDays
            .slice(0, 7)
            .reduce((sum, day) => sum + Number(day?.volumeUSD || 0), 0),
          filledGapDays
            .slice(7, 14)
            .reduce((sum, day) => sum + Number(day?.volumeUSD || 0), 0)
        );

        const changeMonth = calculatePercentageChange(
          filledGapWeeks
            .slice(0, 4)
            .reduce((sum, week) => sum + Number(week?.volumeUSD || 0), 0),
          filledGapWeeks
            .slice(4, 8)
            .reduce((sum, week) => sum + Number(week?.volumeUSD || 0), 0)
        );

        /* time difference calculations here to ensure that the graph provides information for the last 24 hours */
        const timeDifference = currentDate - lastDate;
        const msIn24Hours = 24 * 60 * 60 * 1000;

        const openPositions = positions?.filter(
          (position) => position.pool.toLowerCase() === id.toLowerCase()
        );
        const activeFarming = activeFarmings?.eternalFarmings.find(
          (farming) => farming.pool === id
        );

        const poolMaxApr = aprPercentage;
        const poolAvgApr = aprPercentage;
        const farmApr = 0;
        const avgApr = aprPercentage;

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
          liquidity,
          token0Price,
          changeHour,
          change24h,
          changeWeek,
          changeMonth,
          txCount,
          volumeUSD,
          marktetcap: token0.marketCap,
          apr24h: avgApr,
        };
      }
    );
  }, [isLoading, pools, positions, activeFarmings?.eternalFarmings]);

  const formattedUserPools = useMemo(() => {
    if (isLoading || !userPools) return [];

    return userPools.pools.map(
      ({
        id,
        token0,
        token1,
        fee,
        totalValueLockedUSD,
        poolHourData,
        poolDayData,
        poolWeekData,
        poolMonthData,
        txCount,
        volumeUSD,
        token0Price,
        createdAtTimestamp,
        liquidity,
        aprPercentage,
        fees,
      }) => {
        const currentPool = poolDayData[0];
        const lastDate = currentPool ? currentPool.date * 1000 : 0;
        const currentDate = new Date().getTime();

        const handlePoolChange = (poolTimeData0: any, poolTimeData1: any) => {
          if (!poolTimeData0) return "0"; // No data available
          if (
            !poolTimeData1 ||
            poolTimeData1.volumeUSD == 0 ||
            !isFinite(poolTimeData1.volumeUSD)
          )
            return 100; // Only one day of data, return 100

          const volumeChange =
            poolTimeData0.volumeUSD - poolTimeData1.volumeUSD;
          const changePercentage = volumeChange / poolTimeData1.volumeUSD;
          if (isNaN(changePercentage)) return 100;
          return Math.round(changePercentage * 100) / 100;
        };

        const changeHour = handlePoolChange(poolHourData[0], poolHourData[1]);

        const change24h = handlePoolChange(poolDayData[0], poolDayData[1]);

        const changeWeek = handlePoolChange(poolWeekData[0], poolWeekData[1]);

        const changeMonth = handlePoolChange(
          poolMonthData[0],
          poolMonthData[1]
        );

        /* time difference calculations here to ensure that the graph provides information for the last 24 hours */
        const timeDifference = currentDate - lastDate;
        const msIn24Hours = 24 * 60 * 60 * 1000;

        const openPositions = positions?.filter(
          (position) => position.pool.toLowerCase() === id.toLowerCase()
        );
        const activeFarming = activeFarmings?.eternalFarmings.find(
          (farming) => farming.pool === id
        );

        const poolMaxApr = aprPercentage;
        const poolAvgApr = aprPercentage;
        const farmApr = 0;
        const avgApr = aprPercentage;

        const unclaimedFees = BigNumber(fees.toString());

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
          liquidity,
          token0Price,
          changeHour,
          change24h,
          changeWeek,
          changeMonth,
          txCount,
          volumeUSD,
          marktetcap: token0.marketCap,
          apr24h: avgApr,
          unclaimedFees,
        };
      }
    );
  }, [isLoading, userPools, positions, activeFarmings]);

  console.log(pools?.pools[0]);

  const handleSort = (callback: any) => {
    const sort = callback();
    if (sort.length > 0) {
      setSorting(sort);
    } else {
      setSorting([]);
    }
  };

  return (
    <div>
      <div className="hidden xl:block">
        <PoolsTable
          columnsMy={poolsColumnsMy}
          columns={poolsColumns}
          data={formattedPools}
          userPools={formattedUserPools}
          sorting={sorting}
          setSorting={handleSort}
          link={"pooldetail"}
          showPagination={true}
          loading={isLoading || isUserPoolsLoading}
          defaultFilter={defaultFilter}
          showOptions={showOptions}
          handleSearch={(data: string) => setSearch(data)}
        />
      </div>
      <div className="block xl:hidden">
        <PoolCardList data={formattedPools} />
      </div>
    </div>
  );
};

export default PoolsList;
