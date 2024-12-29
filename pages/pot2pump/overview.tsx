import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { NextLayoutPage } from "@/types/nextjs";
import { useEffect, useState } from "react";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import { itemPopUpVariants } from "@/lib/animation";
import {
  fetchNearSuccessPot2Pump,
  fetchPumpingHighPricePot2Pump,
  fetchPottingNewTokens,
} from "@/lib/algebra/graphql/clients/pair";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { wallet } from "@/services/wallet";

const Pot2PumpOverviewPage: NextLayoutPage = observer(() => {
  const [newTokens, setNewTokens] = useState<MemePairContract[]>();
  const [nearSuccessTokens, setNearSuccessTokens] =
    useState<MemePairContract[]>();
  const [highPriceTokens, setHighPriceTokens] = useState<MemePairContract[]>();

  useEffect(() => {
    if (!wallet.isInit) return;
    const fetchData = async () => {
      const [newTokensData, nearSuccessData, highPriceData] = await Promise.all(
        [
          fetchPottingNewTokens(),
          fetchNearSuccessPot2Pump(),
          fetchPumpingHighPricePot2Pump(),
        ]
      );

      setNewTokens(newTokensData);
      setNearSuccessTokens(nearSuccessData);
      setHighPriceTokens(highPriceData);
    };

    fetchData();
  }, [wallet.isInit]);

  return (
    <div className="w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[1200px] mb-5 flex flex-col justify-center bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-4 md:pt-12  text-black">
        <div
          className={
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
          }
        ></div>

        <LaunchCardV3
          type="featured"
          pair={highPriceTokens?.[0]}
          action={<></>}
        />
      </div>
      <div className="w-full max-w-[1200px] grid grid-cols-3 h-[80vh]  bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-4 md:pt-12 mb-[90px] text-black">
        <div
          className={
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
          }
        ></div>
        {/* New Tokens Section */}
        <section className="overflow-y-auto px-4">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-10 py-2">
            New POTs 🍯
          </h2>
          <div className="flex flex-col gap-4">
            {newTokens &&
              newTokens.map((pot2pump, index) => (
                <motion.div key={index} variants={itemPopUpVariants}>
                  <LaunchCardV3 type="simple" pair={pot2pump} action={<></>} />
                </motion.div>
              ))}
          </div>
        </section>
        {/* Near Success Tokens Section */}
        <section className="overflow-y-auto px-4">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-10 py-2">
            Almost Pumping
          </h2>
          <div className="flex flex-col gap-4">
            {nearSuccessTokens &&
              nearSuccessTokens.map((pot2pump, index) => (
                <motion.div key={index} variants={itemPopUpVariants}>
                  <LaunchCardV3 type="simple" pair={pot2pump} action={<></>} />
                </motion.div>
              ))}
          </div>
        </section>
        {/* High Price Tokens Section */}
        <section className="overflow-y-auto px-4">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-10 py-2">
            To the Moon 🚀
          </h2>
          <div className="flex flex-col gap-4">
            {highPriceTokens &&
              highPriceTokens.map((pot2pump, index) => (
                <motion.div key={index} variants={itemPopUpVariants}>
                  <LaunchCardV3 type="simple" pair={pot2pump} action={<></>} />
                </motion.div>
              ))}
          </div>
        </section>{" "}
      </div>
    </div>
  );
});

export default Pot2PumpOverviewPage;
