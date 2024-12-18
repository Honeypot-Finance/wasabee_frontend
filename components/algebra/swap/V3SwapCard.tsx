import CardContianer from "@/components/CardContianer/CardContianer";
import ChartData from "@/components/svg/chartData";
import { chart } from "@/services/chart";
import Settings from "../common/Settings";
import SwapPairV3 from "./SwapPair/SwapPairV3";
import SwapButtonV3 from "./SwapButton/SwapButotnV3";
import SwapParamsV3 from "./SwapParams/SwapParamsV3";
import { MdCandlestickChart } from "react-icons/md";
import { cn } from "@/lib/tailwindcss";
import { useEffect } from "react";

interface V3SwapCardProps {
  fromTokenAddress?: string;
  toTokenAddress?: string;
  boarderless?: boolean;
}

export function V3SwapCard({
  fromTokenAddress,
  toTokenAddress,
  boarderless,
}: V3SwapCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full",
        !boarderless &&
          " items-center gap-2 bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-[90px] pb-[70px] text-black "
      )}
    >
      <div
        className={cn(
          !boarderless &&
            "bg-[url('/images/swap/top-border.png')] bg-cover bg-no-repeat bg-left-top h-[90px] absolute top-0 left-0 w-full rounded-[20px]"
        )}
      ></div>
      <div className="flex items-center justify-between w-full">
        <span
          onClick={() => {
            chart.toggleChart();
          }}
        >
          <MdCandlestickChart
            className="text-[#202020] hover:text-white transition-all cursor-pointer"
            size={24}
          />
        </span>
        <Settings />
      </div>
      <SwapPairV3
        fromTokenAddress={fromTokenAddress}
        toTokenAddress={toTokenAddress}
      />
      <SwapParamsV3 />
      <SwapButtonV3 />
      {/* <PoweredByAlgebra /> */}
      <div className="bg-[url('/images/swap/bottom-border.jpg')] bg-cover bg-no-repeat bg-left-top h-[70px] absolute bottom-0 left-0 w-full rounded-[20px]"></div>
    </div>
  );
}

export default V3SwapCard;
