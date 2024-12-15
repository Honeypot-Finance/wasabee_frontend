import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import * as LightweightCharts from "lightweight-charts";
import { observer } from "mobx-react-lite";
import { chart, chartTimeRanges } from "@/services/chart";
import { AiOutlineSwap } from "react-icons/ai";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Token } from "@/services/contract/token";
import dayjs from "dayjs";

interface KlineChartProps {
  height?: number;
}

const KlineChart = observer(({ height = 400 }: KlineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartCreated, setChart] = useState<any | undefined>();
  const [candleSeries, setCandleSeries] = useState<any | undefined>();
  const [volumeSeries, setVolumeSeries] = useState<any | undefined>();

  // Convert chart service data to candlestick format
  const chartData = useMemo(() => {
    if (!chart.chartData.value?.getBars) return [];

    const { t, o, h, l, c, v } = chart.chartData.value.getBars;

    return t
      .map((time, index) => {
        // Skip data points where any required value is null/undefined
        if (
          o[index] === null ||
          h[index] === null ||
          l[index] === null ||
          c[index] === null
        ) {
          return null;
        }

        return {
          time: time as number,
          open: o[index] as number,
          high: h[index] as number,
          low: l[index] as number,
          close: c[index] as number,
          volume: (v?.[index] as number) || 0,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [chart.chartData.value]);

  const handleResize = useCallback(() => {
    if (chartCreated && chartRef?.current?.parentElement) {
      chartCreated.resize(chartRef.current.parentElement.clientWidth, height);
      chartCreated.timeScale().fitContent();
    }
  }, [chartCreated, height]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Update chart when data changes
  useEffect(() => {
    if (!candleSeries || !volumeSeries || !chartData.length) return;

    // Set volume data
    volumeSeries.setData(
      chartData.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? "#08998150" : "#F2364550",
      }))
    );

    // Set candlestick data
    candleSeries.setData(chartData);

    // Update price line only if we have valid data
    if (chartData.length > 0) {
      const lastPrice = chartData[chartData.length - 1].close;
      candleSeries.createPriceLine({
        price: lastPrice,
        color:
          lastPrice >= chartData[chartData.length - 1].open
            ? "#089981"
            : "#F23645",
        lineWidth: 1,
        lineStyle: LightweightCharts.LineStyle.Dashed,
        axisLabelVisible: true,
        title: lastPrice.toFixed(6),
      });
    }
  }, [chartData, candleSeries, volumeSeries]);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = LightweightCharts.createChart(chartRef.current, {
      width: (chartRef.current.parentElement?.clientWidth || 600) - 48,
      height,
      layout: {
        background: { color: "#202020" },
        textColor: "rgba(255, 255, 255, 0.5)",
        fontFamily: "Roboto, sans-serif",
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.4,
        },
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(43, 43, 43, 0.5)" },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255, 255, 255, 0.1)",
          width: 1,
          style: 1,
          labelBackgroundColor: "#202020",
        },
        horzLine: {
          color: "rgba(255, 255, 255, 0.1)",
          width: 1,
          style: 1,
          labelBackgroundColor: "#202020",
        },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          return dayjs(time * 1000).format("HH:mm");
        },
      },
      watermark: {
        visible: false,
      },
    });

    const volumeSeries = chartInstance.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "left",
      color: "rgba(255, 255, 255, 0.5)",
    });

    const candlestickSeries = chartInstance.addCandlestickSeries({
      upColor: "#089981",
      downColor: "#F23645",
      borderVisible: false,
      wickUpColor: "#089981",
      wickDownColor: "#F23645",
      priceLineVisible: false,
      lastValueVisible: false,
      priceScaleId: "right",
    });

    setChart(chartInstance);
    setCandleSeries(candlestickSeries);
    setVolumeSeries(volumeSeries);

    return () => {
      chartInstance.remove();
    };
  }, [height]);

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
          <AiOutlineSwap className="text-white size-5 font-bold" />
        </div>

        {/* Price and Change */}
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-bold">
            ${chart.currentPrice?.toFixed(6)}
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

        {/* Time Range Selector */}
        <div className="absolute top-4 right-4 flex items-center">
          <div className="flex items-center bg-[#FFCD4D] rounded-xl p-1 space-x-1">
            {Object.values(chartTimeRanges).map((range) => (
              <button
                key={range.label}
                onClick={() => chart.setRange(range.label)}
                className={`w-12 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  chart.range === range.label
                    ? "bg-[#202020] text-white/80"
                    : "text-black hover:bg-black/10"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart or Placeholder */}
      {chartData.length > 0 ? (
        <div ref={chartRef} className="w-full mt-2" />
      ) : (
        <div className="w-full h-[300px] mt-2 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white/50 text-sm mb-2">
              No chart data available
            </div>
            <div className="flex justify-center">
              <svg
                className="animate-spin h-8 w-8 text-[#FFCD4D]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default KlineChart;
