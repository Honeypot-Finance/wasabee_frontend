import { chart } from "@/services/chart";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { wallet } from "@/services/wallet";
import { motion } from "framer-motion";
import React from "react";
import { itemPopUpVariants } from "@/lib/animation";
import { liquidity } from "@/services/liquidity";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import V3SwapCard from "@/components/algebra/swap/V3SwapCard";
import KlineChart from "./launch-detail/componets/KlineChart";
import { useSearchParams } from "next/navigation";
import SwapTransactionHistory from "@/components/SwapTransactionHistory";

const SwapPage = observer(() => {
  useEffect(() => {
    observe(chart, "chartTarget", () => {});
  }, []);

  useEffect(() => {
    if (wallet.isInit) {
      liquidity.initPool();
    }
  }, [wallet.isInit]);

  const inputCurrency = useSearchParams().get("inputCurrency");
  const outputCurrency = useSearchParams().get("outputCurrency");

  const isInit = wallet.isInit && liquidity;

  return isInit ? (
    <div className="w-full flex items-center justify-center pb-6 sm:pb-12 overflow-x-hidden">
      <div className="w-full xl:mx-auto xl:max-w-[min(1500px,100%)] px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8">
        {chart.showChart && (
          <motion.div
            variants={itemPopUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="w-full col-span-2 lg:col-span-1"
          >
            <div className="w-full bg-[#FFCD4D] relative py-8 sm:py-12 px-4 rounded-2xl overflow-hidden">
              <div className="bg-[url('/images/pool-detail/top-border.svg')] bg-left-top h-6 absolute top-0 left-0 w-full bg-contain"></div>
              <KlineChart height={475} />
              <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-left-top h-6 absolute -bottom-1 left-0 w-full bg-contain"></div>
            </div>
          </motion.div>
        )}
        <motion.div
          variants={itemPopUpVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full flex flex-col items-center justify-start col-span-2 lg:col-span-1"
        >
          <V3SwapCard
            fromTokenAddress={inputCurrency ?? undefined}
            toTokenAddress={
              outputCurrency ?? wallet.currentChain.platformTokenAddress.HPOT
            }
          />
        </motion.div>

        <motion.div
          variants={itemPopUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="w-full col-span-2"
        >
          <SwapTransactionHistory />
        </motion.div>
      </div>
    </div>
  ) : (
    <LoadingDisplay />
  );
});

export default SwapPage;
