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
  disableSelection?: boolean;
  boarderless?: boolean;
}

export function V3SwapCard({
  fromTokenAddress,
  toTokenAddress,
  boarderless,
  disableSelection,
}: V3SwapCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full relative z-[100] space-y-4",
        !boarderless &&
          "items-center gap-2 bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-4 md:pt-12 pb-[90px] text-black"
      )}
    >
      <div
        className={cn(
          !boarderless &&
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
        )}
      ></div>
      <div className="flex items-center justify-end w-full">
        {/* <span
          onClick={() => {
            chart.toggleChart();
          }}
        >
          <MdCandlestickChart
            className="text-[#202020] hover:text-white transition-all cursor-pointer"
            size={24}
          />
        </span> */}
        <Settings />
      </div>
      <SwapPairV3
        fromTokenAddress={fromTokenAddress}
        toTokenAddress={toTokenAddress}
        disableSelection={disableSelection}
      />
      <SwapParamsV3 />
      <SwapButtonV3 />
      {/* <PoweredByAlgebra /> */}
      {!boarderless && (
        <div className="bg-[url('/images/swap/bottom-border.svg')] bg-cover bg-left-top bg-no-repeat absolute bottom-0 left-0 w-full h-[50px]"></div>
      )}
    </div>
  );
}

export default V3SwapCard;
