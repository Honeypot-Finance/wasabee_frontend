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
import { tokenToTicker } from "@/lib/advancedChart.util";
import { pairQueryOutput } from "@/types/pair";

const TVChartContainer = dynamic(
  () =>
    import("@/components/AdvancedChart/TVChartContainer/TVChartContainer").then(
      (mod) => mod.TVChartContainer
    ),
  { ssr: false }
);

export default function PriceFeedGraph() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const { chainId } = useAccount();
  const [pairs, setPairs] = useState<pairQueryOutput>({});
  const [currentToken, setCurrentToken] = useState<Token>(
    networksMap[chainId as number].faucetTokens[0]
  );
  const [defaultWidgetProps, setDefaultWidgetProps] = useState<
    Partial<ChartingLibraryWidgetOptions>
  >({
    symbol: tokenToTicker(currentToken, chainId as number),
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

  useEffect(() => {
    if (!chainId || !currentToken) return;
    setDefaultWidgetProps((prev) => {
      return {
        ...prev,
        symbol: tokenToTicker(currentToken, chainId as number),
      };
    });
  }, [chainId, currentToken]);

  useEffect(() => {
    if (!chainId) return;
    trpcClient.pair.getPairs
      .query({ chainId: chainId as number })
      .then((data) => {
        setPairs(data);
      });
  }, [chainId]);

  function changeTokenHandler(token: Token) {
    setCurrentToken(token);
  }

  return (
    <>
      {networksMap[chainId as number].faucetTokens.map((token) => (
        <Button key={token.address} onClick={() => changeTokenHandler(token)}>
          {token.name}
        </Button>
      ))}

      {Object.values(pairs).map((token) => (
        <Button
          key={token.address}
          onClick={() =>
            changeTokenHandler(
              new Token({
                address: token.address,
                name: `${token.token0.name}/${token.token1.name}`,
              })
            )
          }
        >
          {token.token0.name}/{token.token1.name}
        </Button>
      ))}

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
