"use client";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { TokenHistoryPrice } from "@/lib/defined/defined";
import PriceFeedGraph from "@/components/PriceFeedGraph/PriceFeedGraph";

export default function Price() {
  return (
    <div>
      <PriceFeedGraph />
    </div>
  );
}
