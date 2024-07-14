"use client";
import { Button } from "@nextui-org/react";
import EChartsReact from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";
import { Token } from "@/services/contract/token";
import { networksMap } from "@/services/chain";
import { useAccount } from "wagmi";
import { trpcClient } from "@/lib/trpc";
import { dayjs } from "@/lib/dayjs";
import { ChartDataResponse } from "@/services/priceFeed/priceFeedTypes";
import dynamic from "next/dynamic";
import Script from "next/script";
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "@/public/static/charting_library/charting_library";
import { pairToTicker, tokenToTicker } from "@/lib/advancedChart.util";
import { pairQueryOutput } from "@/types/pair";
import { PairContract } from "@/services/contract/pair-contract";

const TVChartContainer = dynamic(
  () =>
    import("@/components/AdvancedChart/TVChartContainer/TVChartContainer").then(
      (mod) => mod.TVChartContainer
    ),
  { ssr: false }
);

type SwapProps = {
  priceFeedTarget: Token | PairContract;
};

export default function SwapPriceFeedGraph(props: SwapProps) {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const { chainId } = useAccount();
  const getTokenTicker = useMemo(() => {
    if (props.priceFeedTarget instanceof Token) {
      return tokenToTicker(props.priceFeedTarget, chainId as number);
    } else if (props.priceFeedTarget instanceof PairContract) {
      return pairToTicker(props.priceFeedTarget, chainId as number);
    } else {
      return "None";
    }
  }, [props.priceFeedTarget, chainId]);
  const [defaultWidgetProps, setDefaultWidgetProps] = useState<
    Partial<ChartingLibraryWidgetOptions>
  >({
    symbol: getTokenTicker,
    interval: "1D" as ResolutionString,
    library_path: "/static/charting_library/charting_library/",
    locale: "en",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
    theme: "dark",
  });
  return (
    <>
      <Script
        src="/static/charting_library/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
    </>
  );
}
