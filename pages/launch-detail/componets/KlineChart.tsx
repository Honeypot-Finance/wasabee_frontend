import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import * as LightweightCharts from "lightweight-charts";
import dayjs from "dayjs";
import Image from "next/image";
import { AiOutlineSwap } from "react-icons/ai";

interface KlineChartProps {
  data?: any[];
  height?: number;
  symbol?: string;
  price?: string;
  change?: string;
}

type TimeRange = "24H" | "1W" | "1M" | "1Y";

// 根据不同时间范围生成数据
const generateMockData = (timeRange: TimeRange = "24H") => {
  const data = [];
  let basePrice = 1200;
  const now = dayjs();

  const config = {
    "24H": { unit: "hour", count: 24, step: 1 },
    "1W": { unit: "day", count: 7, step: 2 },
    "1M": { unit: "day", count: 30, step: 6 },
    "1Y": { unit: "month", count: 12, step: 24 },
  } as const;

  const { unit, count, step } = config[timeRange];

  for (let i = count; i >= 0; i -= step) {
    const time = now.subtract(i, unit as any).unix() as LightweightCharts.Time;
    const open = basePrice + Math.random() * 20 - 10;
    const high = open + Math.random() * 10;
    const low = open - Math.random() * 10;
    const close = (high + low) / 2;

    basePrice = close;

    data.push({
      time,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 200),
    });
  }

  return data;
};

const KlineChart = ({
  height = 400,
  symbol = "USDC/ETH",
  price = "$1.03",
  change = "0.03%",
}: KlineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartCreated, setChart] = useState<any | undefined>();
  const [candleSeries, setCandleSeries] = useState<any | undefined>();
  const [volumeSeries, setVolumeSeries] = useState<any | undefined>();
  const [timeRange, setTimeRange] = useState<TimeRange>("24H");

  const mockData = useMemo(() => generateMockData(timeRange), [timeRange]);

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

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const chart = LightweightCharts.createChart(chartRef.current, {
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

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "left",
      color: "rgba(255, 255, 255, 0.5)",
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#089981",
      downColor: "#F23645",
      borderVisible: false,
      wickUpColor: "#089981",
      wickDownColor: "#F23645",
      priceLineVisible: false,
      lastValueVisible: false,
      priceScaleId: "right",
    });

    volumeSeries.setData(
      mockData.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? "#08998150" : "#F2364550",
      }))
    );

    candlestickSeries.setData(mockData);

    candlestickSeries.createPriceLine({
      price: mockData[mockData.length - 1].close,
      color: "#089981",
      lineWidth: 1,
      lineStyle: LightweightCharts.LineStyle.Dashed,
      axisLabelVisible: true,
      title: mockData[mockData.length - 1].close.toFixed(1),
    });

    chart.timeScale().fitContent();

    setChart(chart);
    setCandleSeries(candlestickSeries);
    setVolumeSeries(volumeSeries);

    return () => {
      chart.remove();
    };
  }, [mockData, height]);

  return (
    <div className="w-full relative rounded-2xl bg-[#202020] overflow-hidden p-4">
      <div className="flex flex-col gap-1">
        {/* 顶部标题栏 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Image src="/images/tokens/usdc.png" alt="USDC" width={32} height={32} />
            <Image
              src="/images/tokens/eth.png"
              alt="ETH"
              width={32}
              height={32}
              className="-ml-2"
            />
          </div>
          <span className="text-white text-lg font-bold">{symbol}</span>
          <AiOutlineSwap className="text-white size-5 font-bold" />
        </div>

        {/* 价格和涨跌幅 */}
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-bold">{price}</span>
          <span
            className={`text-base ${change.startsWith("-") ? "text-[#F23645]" : "text-[#089981]"}`}
          >
            {change.startsWith("-") ? "▼" : "▲"} {change}
          </span>
        </div>

        {/* 时间范围选择器 */}
        <div className="absolute top-4 right-4 flex items-center">
          <div className="flex items-center bg-[#FFCD4D] rounded-xl p-1 space-x-1">
            {(["24H", "1W", "1M", "1Y"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`w-12 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  timeRange === range
                    ? "bg-[#202020] text-white/80"
                    : "text-black hover:bg-black/10"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 图表 */}
      <div ref={chartRef} className="w-full mt-2" />
    </div>
  );
};

export default KlineChart;
