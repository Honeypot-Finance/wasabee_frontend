import { TVChartContainer } from "@/components/AdvancedChart/TVChartContainer/TVChartContainer";
import SwapPriceFeedGraph from "@/components/PriceFeedGraph/SwapPriceFeedGraph";
import { Swap } from "@/components/swap";
import { Token } from "@/services/contract/token";
import { useState } from "react";

const SwapPage = () => {
  return (
    <>
      <div>
        <Swap activeTab="swap"></Swap>
      </div>
    </>
  );
};
export default SwapPage;
