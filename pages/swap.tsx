import { TVChartContainer } from "@/components/AdvancedChart/TVChartContainer/TVChartContainer";
import SwapPriceFeedGraph from "@/components/PriceFeedGraph/SwapPriceFeedGraph";
import { Swap } from "@/components/swap";
import { chart } from "@/services/chart";
import { PairContract } from "@/services/contract/pair-contract";
import { Token } from "@/services/contract/token";
import { observe, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const SwapPage = observer(() => {
  useEffect(() => {
    observe(chart, "chartTarget", () => {
      console.log("chart.chartTarget", chart.chartTarget);
    });
  }, []);
  return (
    <>
      <div className="lg:flex justify-around items-center *:flex-1 gap-5">
        <Swap activeTab="swap"></Swap>
        {chart.showChart && (
          <div className="flex justify-center m-auto h-[50vh] w-[90vw] *:flex-1 lg:w-[40vw] lg:h-[50vh]">
            <SwapPriceFeedGraph
              priceFeedTarget={chart.chartTarget}
            ></SwapPriceFeedGraph>
          </div>
        )}
      </div>
    </>
  );
});

export default SwapPage;
