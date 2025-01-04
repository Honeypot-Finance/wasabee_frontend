import { HoneyContainer } from "@/components/CardContianer";
import { PriceChart } from "@/components/PriceChart/PriceChart";
import { UserPoolProfit } from "@/lib/algebra/graphql/clients/userProfit";
import { UTCTimestamp } from "lightweight-charts";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

export const ProtfolioBalanceChart = observer(
  ({
    userPoolsProfits,
    timeRange,
  }: {
    userPoolsProfits: UserPoolProfit[];
    timeRange: "1D" | "1W" | "1M";
  }) => {
    const chartData = useMemo(() => {
      const now = new Date();
      const ranges = {
        "1D": 24 * 60 * 60 * 1000, // 1 day in ms
        "1W": 7 * 24 * 60 * 60 * 1000,
        "1M": 30 * 24 * 60 * 60 * 1000,
      };

      const startTime = now.getTime() - ranges[timeRange];

      // Aggregate data based on time range
      const data = userPoolsProfits.reduce(
        (acc, pool) => {
          const hourData = timeRange === "1D" ? pool.pool.poolHoursData : [];
          const dayData = timeRange !== "1D" ? pool.pool.poolDaysData : [];
          const relevantData = timeRange === "1D" ? hourData : dayData;

          relevantData.forEach((dataPoint) => {
            const timestamp = new Date(
              ("date" in dataPoint
                ? dataPoint.date
                : dataPoint.periodStartUnix) * 1000
            ).getTime();
            if (timestamp >= startTime) {
              const time = Math.floor(timestamp / 1000) as UTCTimestamp;
              if (!acc[time]) {
                acc[time] = 0;
              }
              acc[time] += Number(dataPoint.feesUSD);
            }
          });
          return acc;
        },
        {} as Record<number, number>
      );

      // Convert to array format required by the chart
      return Object.entries(data)
        .map(([time, value]) => ({
          time: Number(time) as UTCTimestamp,
          value,
        }))
        .sort((a, b) => a.time - b.time);
    }, [userPoolsProfits, timeRange]);

    return (
      <HoneyContainer>
        <h3 className="text-white text-2xl font-bold">Fees Gained</h3>
        <PriceChart
          data={chartData}
          width={300}
          height={120}
          timeRange={timeRange}
        />
      </HoneyContainer>
    );
  }
);

export default ProtfolioBalanceChart;
