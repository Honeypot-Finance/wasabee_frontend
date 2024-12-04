import { SwapCard } from "@/components/SwapCard";
import { chart } from "@/services/chart";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import React from "react";
import { itemPopUpVariants } from "@/lib/animation";
import PriceFeedGraph from "@/components/PriceFeedGraph/PriceFeedGraph";

const Swap = observer(() => {
  return (
    <div
      className={`grid ${
        chart.showChart && "grid-cols-1 lg:grid-cols-2 "
      }  gap-[2rem] lg:gap-[5rem] `}
    >
      {chart.showChart && (
        <motion.div
          variants={itemPopUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="w-full lg:max-w-[574px] flex flex-col self-center place-self-end"
        >
          <PriceFeedGraph></PriceFeedGraph>
        </motion.div>
      )}
      <motion.div
        variants={itemPopUpVariants}
        initial="hidden"
        animate="visible"
        className={
          "relative w-full flex justify-center" +
          (chart.showChart ? "justify-start" : "")
        }
      >
        <SwapCard></SwapCard>
      </motion.div>
    </div>
  );
});

export default Swap;
