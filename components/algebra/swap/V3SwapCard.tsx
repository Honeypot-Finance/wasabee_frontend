import CardContianer from "@/components/CardContianer/CardContianer";
import PoweredByAlgebra from "../common/PoweredByAlgebra";
import IntegralPools from "./IntegralPools";
import SwapButton from "./SwapButton";
import SwapChart from "./SwapChart";
import SwapPair from "./SwapPair";
import SwapParams from "./SwapParams";

export function V3SwapCard() {
  return (
    <div className="w-full">
      <CardContianer addtionalClassName="flex-col gap-2">
        {/* <IntegralPools /> */}

        <SwapPair />
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
