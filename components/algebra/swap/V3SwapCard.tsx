import CardContianer from "@/components/CardContianer/CardContianer";
import PoweredByAlgebra from "../common/PoweredByAlgebra";
import IntegralPools from "./IntegralPools";
import SwapButton from "./SwapButton";
import SwapChart from "./SwapChart";
import SwapPair from "./SwapPair";
import SwapParams from "./SwapParams";
import ChartData from "@/components/svg/chartData";
import { Slippage } from "@/components/SwapCard/Slippage";
import { chart } from "@/services/chart";
import Settings from "../common/Settings";
import SwapPairV3 from "./SwapPair/SwapPairV3";

export function V3SwapCard() {
  return (
    <div className="w-full">
      <CardContianer addtionalClassName="flex-col gap-2">
        {/* <IntegralPools /> */}
        <div className="flex items-center justify-between w-full  text-[color:var(--Button-Gradient,#F7931A)] text-base font-bold leading-3 tracking-[0.16px]">
          <span
            onClick={() => {
              chart.toggleChart();
            }}
          >
            <ChartData></ChartData>
          </span>
          <Settings />
        </div>
        <SwapPairV3 />
        <SwapParams />
        <SwapButton />
        {/* <PoweredByAlgebra /> */}
      </CardContianer>

      {/* <div className="col-span-2">
        <SwapChart />{" "}
      </div> */}
    </div>
  );
}

export default V3SwapCard;
