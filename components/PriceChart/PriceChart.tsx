import { createChart, ColorType, UTCTimestamp, LineData } from "lightweight-charts";
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
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
        scaleMargins: {
          top: 0,
          bottom: 0
        }
      },
      timeScale: {
        visible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
        barSpacing: 6,
        minBarSpacing: 0,
        rightBarStaysOnScroll: true
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
      watermark: {
        visible: false,
      },
    });

    const series = chart.addLineSeries({
      color: "#FF3B9A",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    const generatePixelatedData = () => {
      const baseValue = 38.5;
      const points = 50;
      const startTime = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);

      return Array.from({ length: points }, (_, i) => ({
        time: (startTime + i * 300) as UTCTimestamp,
        value:
          baseValue + Math.sin(i / (points / 8)) * 1.5 + Math.random() * 0.5,
      }));
    };

    const formattedData = timeRange === "1D" ? generatePixelatedData() : data;

    series.setData(formattedData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
        height: chartContainerRef.current!.clientHeight,
      });
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
