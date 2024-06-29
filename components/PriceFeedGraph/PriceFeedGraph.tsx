"use client";
import { DefinedChartDataResponse } from "@/lib/defined/defined";
import { Button } from "@nextui-org/react";
import { CandlestickSeriesOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { set } from "lodash";
import { useEffect, useRef, useState } from "react";

const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";

export default function PriceFeedGraph() {
  const title = "bera";
  const [priceData, setPriceData] = useState<any>();
  const [option, setOption] = useState<any>({
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
        startValue: priceData?.categoryData?.length - 30,
        endValue: priceData?.categoryData?.length,
      },
      {
        show: true,
        type: "slider",
        top: "90%",
        startValue: priceData?.categoryData?.length - 30,
        endValue: priceData?.categoryData?.length,
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
  });

  useEffect(() => {
    fetch("/api/defined/get-price")
      .then((res) => res.json())
      .then((data) => {
        console.log(data as DefinedChartDataResponse);
        setPriceData(splitData(data));
      });
  }, []);

  useEffect(() => {
    setOption({
      ...option,
      xAxis: {
        type: "category",
        data: priceData?.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
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
      dataZoom: [
        {
          type: "inside",
          startValue: priceData?.categoryData?.length - 30,
          endValue: priceData?.categoryData?.length,
        },
        {
          show: true,
          type: "slider",
          top: "90%",
          startValue: priceData?.categoryData?.length - 30,
          endValue: priceData?.categoryData?.length,
        },
      ],
    });
  }, [priceData]);

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

  function toViewHandler(days: number) {
    setOption({
      ...option,
      dataZoom: [
        {
          type: "inside",
          startValue: priceData.categoryData?.length - days,
          endValue: priceData.categoryData?.length,
        },
        {
          show: true,
          type: "slider",
          top: "90%",
          startValue: priceData.categoryData?.length - days,
          endValue: priceData.categoryData?.length,
        },
      ],
    });
  }

  function to3YearsViewButtonHandler() {
    toViewHandler(1095);
  }

  function to1YearViewButtonHandler() {
    toViewHandler(365);
  }

  function to6MonthViewButtonHandler() {
    toViewHandler(180);
  }

  function to1MonthViewButtonHandler() {
    toViewHandler(30);
  }

  function to1WeekViewButtonHandler() {
    toViewHandler(7);
  }

  return (
    <>
      <EChartsReact option={option} />
      <Button onClick={to3YearsViewButtonHandler}>3 Years</Button>
      <Button onClick={to1YearViewButtonHandler}>1 Year</Button>
      <Button onClick={to6MonthViewButtonHandler}>6 Months</Button>
      <Button onClick={to1MonthViewButtonHandler}>1 Month</Button>
      <Button onClick={to1WeekViewButtonHandler}>1 Week</Button>
    </>
  );
}
