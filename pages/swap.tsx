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
      <div className={`lg:grid ${chart.showChart && "grid-cols-2"}`}>
        <Swap activeTab="swap"></Swap>
        {chart.showChart && (
          <div className="m-auto w-full h-full lg:pr-20">
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
