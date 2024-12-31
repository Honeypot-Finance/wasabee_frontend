import { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { chart } from "@/services/chart";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Token } from "@/services/contract/token";
import { RotateCcw } from "lucide-react";
import { getBaseUrl } from "@/lib/trpc";
import { strParams } from "@/lib/advancedChart.util";
import { wallet } from "@/services/wallet";

// 为 Window 对象添加 TradingView 相关的类型定义
declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
    Datafeeds: any;
  }
}

// 格式化数字的工具函数
const formatNumber = (number: number) => {
  if (isNaN(number)) return 0;
  number = +number;
  if (number === 0) return 0;
  if (number < 0) number = Math.abs(number);

  if (number >= 1000) return new Intl.NumberFormat("en-US").format(number);
  else if (number > 100)
    return parseFloat(String(number)).toFixed(2).toString();
  else if (number > 1) return parseFloat(String(number)).toFixed(3).toString();
  else if (number > 1e-4)
    return parseFloat(parseFloat(String(number)).toExponential(4)).toString();
  else {
    const endNumbers = Number(number)
      .toExponential()
      .split("e")[0]
      .replace(".", "")
      .substring(0, 4);
    const zeros = -Math.floor(Math.log10(number) + 1);
    let subNumber;
    if (zeros > 9) {
      subNumber =
        String.fromCharCode(parseInt(`2081`, 16)) +
        String.fromCharCode(parseInt(`208${zeros - 10}`, 16));
    } else {
      subNumber = String.fromCharCode(parseInt(`208${zeros}`, 16));
    }
    return "0.0" + subNumber + endNumbers;
  }
};

interface KlineChartProps {
  height?: number | string;
  onReady?: () => void;
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const KlineChart = observer(({ height = 400, onReady }: KlineChartProps) => {
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(true);
  const [chartWidth, setChartWidth] = useState(200);
  const listener = useRef<any>(null);

  const initOnReady = useCallback(() => {
    window.Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function (
      symbolName: string,
      onSymbolResolvedCallback: any,
      onResolveErrorCallback: any
    ) {
      onSymbolResolvedCallback({
        name: symbolName,
        ticker: "",
        description: "",
        type: "stock",
        exchange: "DEX",
        minmove2: 0,
        session: "24x7",
        timezone: timeZone,
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        volume_precision: 6,
      });
    };

    window.Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = (
      symbolInfo: any,
      resolution: any,
      onRealtimeCallback: any,
      subscribeUID: any,
      onResetCacheNeededCallback: any
    ) => {
      listener.current = {
        onRealtimeCallback,
        resolution,
      };
    };

    const interval = "5";
    const datafeed = new window.Datafeeds.UDFCompatibleDatafeed(
      `${getBaseUrl()}/api/udf-data-feed`,
      5000
    );

    console.log("chart.chartTarget", chart.chartTarget);

    if (chart.chartTarget) {
      window.tvWidget = new window.TradingView.widget({
        symbol: strParams(
          chart.chartTarget as Token,
          wallet.currentChainId,
          chart.tokenNumber,
          chart.currencyCode
        ),
        interval: interval as any,
        container: "tv_chart_container",
        width: chartWidth,
        height: Number(height),
        formatting_price_precision: 10,
        timezone: timeZone as any,
        datafeed: datafeed,
        library_path: "/charting_library/",
        locale: "en",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_symbol_search",
          "header_settings",
          "header_indicators",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_fullscreen_button",
          "border_around_the_chart",
          "header_saveload",
          "drawing_templates",
          "volume_force_overlay",
        ],
        enabled_features: ["header_widget", "left_toolbar", "control_bar"],
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        preset: "mobile",
        custom_css_url: "/css/tradingViews.css",
        loading_screen: {
          backgroundColor: "#202020",
          foregroundColor: "#FFCD4D",
        },
        theme: "dark",
        overrides: {
          "paneProperties.backgroundType": "solid",
          "paneProperties.background": "#202020",
          "scalesProperties.lineColor": "#202020",
          "mainSeriesProperties.candleStyle.barColorsOnPrevClose": true,
          "mainSeriesProperties.haStyle.barColorsOnPrevClose": true,
          "mainSeriesProperties.barStyle.barColorsOnPrevClose": true,
          "mainSeriesProperties.candleStyle.upColor": "#089981",
          "mainSeriesProperties.candleStyle.borderUpColor": "#089981",
          "mainSeriesProperties.candleStyle.downColor": "#F23645",
          "mainSeriesProperties.candleStyle.borderDownColor": "#F23645",
          "mainSeriesProperties.candleStyle.wickUpColor": "#089981",
          "mainSeriesProperties.candleStyle.wickDownColor": "#F23645",
        },
      });

      window.tvWidget.onChartReady(() => {
        setSpinning(false);
        const chart = window.tvWidget.chart();
        chart.priceFormatter().format = formatNumber;
        onReady?.();
      });
    }
  }, [chartWidth, height, chart.chartTarget, onReady]);

  useEffect(() => {
    const resizeChart = () => {
      if (chartWrapRef.current)
        setChartWidth(chartWrapRef.current.clientWidth - 48 || 0);
    };
    resizeChart();
    window.addEventListener("resize", resizeChart);
    return () => window.removeEventListener("resize", resizeChart);
  }, []);

  useEffect(() => {
    setSpinning(true);
    initOnReady();
  }, [initOnReady]);

  return (
    <div className="w-full relative rounded-2xl bg-[#202020] overflow-hidden p-4">
      <div className="flex flex-col gap-1">
        {/* Token Info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {chart.TargetLogoDisplay.map((token: Token) => (
              <TokenLogo key={token.address} token={token} />
            ))}
          </div>
          <span className="text-white text-lg font-bold">
            {chart.chartLabel}
          </span>
        </div>

        {/* Price and Change */}
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-bold">
            {chart.currentPrice?.toFixed(6)}
          </span>
          <span
            className={`text-base ${
              chart.chartPricePercentageChange >= 0
                ? "text-[#089981]"
                : "text-[#F23645]"
            }`}
          >
            {chart.chartPricePercentageChange >= 0 ? "▲" : "▼"}{" "}
            {chart.chartPricePercentageChange.toFixed(2)}%
          </span>
        </div>
      </div>

      <div ref={chartWrapRef} className="relative my-4">
        <div
          style={{
            opacity: spinning ? 0.8 : 0,
            transition: "opacity 0.3s ease-out",
          }}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <RotateCcw className="animate-spin" />
        </div>

        <div
          id="tv_chart_container"
          style={{
            opacity: spinning ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        />
      </div>
    </div>
  );
});

export default KlineChart;
