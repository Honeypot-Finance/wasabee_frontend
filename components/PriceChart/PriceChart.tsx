import {
  createChart,
  ColorType,
  UTCTimestamp,
  LineData,
  IChartApi,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface PriceChartProps {
  data: LineData<UTCTimestamp>[];
  width?: number;
  height?: number;
  timeRange: "1D" | "1W" | "1M" | "1Y";
}

export const PriceChart = ({
  data,
  width = 374,
  height = 150,
  timeRange,
}: PriceChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#FAFAFC",
      },
      grid: {
        vertLines: { color: "#2D2D2D" },
        horzLines: { color: "#2D2D2D" },
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#2D2D2D",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        visible: true,
        borderColor: "#2D2D2D",
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          switch (timeRange) {
            case "1D":
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            case "1W":
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
            case "1M":
            case "1Y":
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
          }
        },
      },
      crosshair: {
        vertLine: {
          color: "#FF3B9A",
          width: 1,
          style: 3,
        },
        horzLine: {
          color: "#FF3B9A",
          width: 1,
          style: 3,
        },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addLineSeries({
      color: "#FF3B9A",
      lineWidth: 2,
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `$${price.toFixed(2)}`,
        minMove: 0.01,
      },
    });

    series.setData(data);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, width, height, timeRange]);

  return (
    <div ref={chartContainerRef} className="w-full h-full">
      <style jsx global>{`
        a[id="tv-attr-logo"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
};
