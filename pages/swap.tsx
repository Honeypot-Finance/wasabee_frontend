import { SwapCard } from "@/components/SwapCard";
import { chart } from "@/services/chart";
import { observe, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import PriceFeedGraph from "@/components/PriceFeedGraph/PriceFeedGraph";

import { wallet } from "@/services/wallet";
import { animate, motion } from "framer-motion";
import React from "react";
import { itemPopUpVariants } from "@/lib/animation";
import { Tabs, Tab } from "@nextui-org/react";
import { liquidity } from "@/services/liquidity";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import V3SwapCard from "@/components/algebra/swap/V3SwapCard";

const SwapPage = observer(() => {
  useEffect(() => {
    observe(chart, "chartTarget", () => {});
  }, []);

  useEffect(() => {
    if (wallet.isInit) {
      liquidity.initPool();
    }
  }, [wallet.isInit]);

  const isInit = wallet.isInit && liquidity;

  return isInit ? (
    <div className="w-full">
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
            className="w-full lg:max-w-[574px] flex flex-col self-center place-self-end h-full order-2 lg:order-1"
          >
            <PriceFeedGraph></PriceFeedGraph>
          </motion.div>
        )}
        <motion.div
          variants={itemPopUpVariants}
          initial="hidden"
          animate="visible"
          className={
            "relative w-full flex flex-col items-center justify-center order-1 lg:order-2" +
            (chart.showChart ? " justify-start" : "")
          }
        >
          <div>
            <V3SwapCard />
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <LoadingDisplay />
  );
});

export default SwapPage;
