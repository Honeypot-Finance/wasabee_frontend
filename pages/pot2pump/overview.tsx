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
import { Button } from "@/components/button";
import Link from "next/link";

const Pot2PumpOverviewPage: NextLayoutPage = observer(() => {
  const [newTokens, setNewTokens] = useState<MemePairContract[]>();
  const [nearSuccessTokens, setNearSuccessTokens] =
    useState<MemePairContract[]>();
  const [highPriceTokens, setHighPriceTokens] = useState<MemePairContract[]>();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Auto scroll effect
  useEffect(() => {
    if (!highPriceTokens?.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev >= Math.min(4, highPriceTokens.length - 1) ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [highPriceTokens]);

  return (
    <div className="w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[1200px] mb-5 flex flex-col justify-center bg-[#FFCD4D] rounded-2xl px-4 pb-[50px] md:pb-8 relative pt-4 md:pt-12 text-black">
        <div
          className={
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
          }
        ></div>

        {/* Featured Slideshow */}
        <div className="relative">
          <div className="user-select-none opacity-0">
            <LaunchCardV3
              type="featured"
              pair={highPriceTokens?.[currentSlide]}
              action={<></>}
            />
          </div>
          {highPriceTokens?.slice(0, 5).map((token, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 absolute inset-0 ${
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <LaunchCardV3 type="featured" pair={token} action={<></>} />
            </div>
          ))}
        </div>
        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 absolute bottom-3 left-0 right-0 z-20">
          {highPriceTokens
            ?.slice(0, 5)
            .map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-black" : "bg-gray-400"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
        </div>
      </div>
      <div className="w-full m-2 p-2 relative flex justify-center">
        <div className="py-2">
          <Link
            href="/launch-token?launchType=meme"
            className="text-black font-bold"
          >
            <Button className="w-full text-3xl py-5">
              🍯 Launch Your Token 🍯
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1200px] grid grid-cols-3 h-[80vh]  bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-4 md:pt-12 mb-[90px] text-black">
        <div
          className={
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
          }
        ></div>
        {/* New Tokens Section */}
        <section className="overflow-y-auto px-4 ">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-20 py-2">
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
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-20 py-2">
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
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-[#FFCD4D] z-20 py-2">
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
