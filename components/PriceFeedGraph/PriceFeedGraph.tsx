"use client";
import { DefinedChartDataResponse } from "@/lib/defined/defined";
import { CandlestickSeriesOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useEffect, useState } from "react";

const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";

export default function PriceFeedGraph() {
  const [priceData, setPriceData] = useState<any>();

  useEffect(() => {
    fetch("/api/defined/get-price")
      .then((res) => res.json())
      .then((data) => {
        console.log(data as DefinedChartDataResponse);
        setPriceData(splitData(data));
      });
  }, []);

  function splitData(rawData: DefinedChartDataResponse) {
    const categoryData = [];
    const values = [];

    const data = rawData.data.getBars;
    for (let i = 0; i < data.c.length; i++) {
      categoryData.push(
        new Date((data.t[i] ?? 0) * 1000).toLocaleDateString("en-US")
      );
      values.push([data.o[i], data.c[i], data.l[i], data.h[i]]);
    }

    return {
      categoryData: categoryData,
      values: values,
    };
  }

  const title = "bera";

  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: priceData?.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: "inside",
        startValue: priceData.categoryData?.length - 30,
        endValue: priceData.categoryData?.length,
      },
      {
        show: true,
        type: "slider",
        top: "90%",
        startValue: priceData.categoryData?.length - 30,
        endValue: priceData.categoryData?.length,
      },
    ],
    series: [
      {
        name: "price",
        type: "candlestick",
        data: priceData?.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
      },
    ],
  } as CandlestickSeriesOption;

  return <EChartsReact option={option} />;
}
