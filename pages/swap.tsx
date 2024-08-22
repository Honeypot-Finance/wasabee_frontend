import { TVChartContainer } from "@/components/AdvancedChart/TVChartContainer/TVChartContainer";
import SwapPriceFeedGraph from "@/components/PriceFeedGraph/SwapPriceFeedGraph";
import { Swap } from "@/components/swap";
import { SwapCard } from "@/components/SwapCard";
import { chart } from "@/services/chart";
import { PairContract } from "@/services/contract/pair-contract";
import { Token } from "@/services/contract/token";
import { observe, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { SimplePriceFeedGraph } from "@/components/PriceFeedGraph/SimplePriceFeedGraph";
import { getBaseUrl, trpcClient } from "@/lib/trpc";
import { tokenToTicker } from "@/lib/advancedChart.util";
import { berachainBartioTestnetNetwork, networksMap } from "@/services/chain";
import { berachainBartioTestnet } from "@/lib/chain";
import { wallet } from "@/services/wallet";
import dayjs from "dayjs";
import { animate, motion } from "framer-motion";
import React from "react";
import { itemPopUpVariants } from "@/lib/animation";

const SwapPage = observer(() => {
  useEffect(() => {
    observe(chart, "chartTarget", () => {});
  }, []);

  return (
    <>
      <div
        className={`grid ${
          chart.showChart && "grid-cols-1 lg:grid-cols-2 "
        }  mb-[20vh] gap-[2rem] lg:gap-[5rem] `}
      >
        {chart.showChart && (
          <motion.div
            variants={itemPopUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="w-full lg:max-w-[574px] flex flex-col self-center place-self-end"
          >
            <SimplePriceFeedGraph></SimplePriceFeedGraph>
          </motion.div>
        )}
        <motion.div
          variants={itemPopUpVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full  flex "
        >
          <SwapCard></SwapCard>
        </motion.div>
      </div>
    </>
  );
});

export default SwapPage;
