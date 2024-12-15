import { PriceChart } from "@/components/PriceChart/PriceChart";
import { UTCTimestamp } from "lightweight-charts";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const ProtfolioBalanceChart = observer(() => {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "1Y">("1D");

  const chartData = {
    "1D": [
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.2,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1W": [
      {
        time: Math.floor(
          new Date("2024-01-06").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-07").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.2,
      },
      {
        time: Math.floor(
          new Date("2024-01-08").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
      {
        time: Math.floor(
          new Date("2024-01-09").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-10").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-11").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1M": [
      {
        time: Math.floor(
          new Date("2023-12-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 36.5,
      },
      {
        time: Math.floor(
          new Date("2023-12-17").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.2,
      },
      {
        time: Math.floor(
          new Date("2023-12-22").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.9,
      },
      {
        time: Math.floor(
          new Date("2023-12-27").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-01").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-06").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1Y": [
      {
        time: Math.floor(
          new Date("2023-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 35.5,
      },
      {
        time: Math.floor(
          new Date("2023-03-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 36.2,
      },
      {
        time: Math.floor(
          new Date("2023-05-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.9,
      },
      {
        time: Math.floor(
          new Date("2023-07-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2023-09-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2023-11-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
  };
  return (
    <>
      <PriceChart
        data={chartData[timeRange]}
        width={300}
        height={120}
        timeRange={timeRange}
      />
    </>
  );
});

export default ProtfolioBalanceChart;
