import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { NextLayoutPage } from "@/types/nextjs";
import { useEffect, useMemo, useState } from "react";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import { itemPopUpVariants } from "@/lib/animation";
import {
  fetchNearSuccessPot2Pump,
  fetchPumpingHighPricePot2Pump,
  fetchPottingNewTokens,
  fetchPottingTrendingPot2Pump,
  pot2PumpListToMemePairList,
} from "@/lib/algebra/graphql/clients/pair";
import { MemePairContract } from "@/services/contract/launches/pot2pump/memepair-contract";
import { wallet } from "@/services/wallet";
import { Button } from "@/components/button";
import Link from "next/link";
import { Trigger } from "@/components/Trigger";
import {
  Pot2Pump,
  usePot2PumpPottingHighPriceQuery,
  usePot2PumpPottingNearSuccessQuery,
  usePot2PumpPottingNewTokensQuery,
  usePot2PumpPottingTrendingQuery,
} from "@/lib/algebra/graphql/generated/graphql";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";

// 在组件外部定义常量
const POT_TABS = {
  NEW: "New POTs",
  ALMOST: "Almost",
  MOON: "Moon 🚀",
  TRENDING: "Trending",
} as const;

type TabType = (typeof POT_TABS)[keyof typeof POT_TABS];

const Pot2PumpOverviewPage: NextLayoutPage = observer(() => {
  const [newTokensList, setNewTokensList] = useState<MemePairContract[]>([]);
  console.log(newTokensList);
  const [nearSuccessTokensList, setNearSuccessTokensList] = useState<
    MemePairContract[]
  >([]);
  const [highPriceTokensList, setHighPriceTokensList] = useState<
    MemePairContract[]
  >([]);
  const [trendingTokensList, setTrendingTokensList] = useState<
    MemePairContract[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>(POT_TABS.NEW);
  const [currentTime, setCurrentTime] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(new Date().getTime() / 1000));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { data: pottingNewTokens, loading: isPottingNewTokensLoading } =
    usePot2PumpPottingNewTokensQuery({
      variables: {
        endTime: currentTime,
      },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      skip: !wallet.isInit,
    });

  const {
    data: pottingNearSuccessTokens,
    loading: isPottingNearSuccessTokensLoading,
  } = usePot2PumpPottingNearSuccessQuery({
    variables: {
      endTime: currentTime,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    skip: !wallet.isInit,
  });

  const {
    data: pottingHighPriceTokens,
    loading: isPottingHighPriceTokensLoading,
  } = usePot2PumpPottingHighPriceQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000, // Refetch every 10 seconds
    skip: !wallet.isInit,
  });

  const {
    data: pottingTrendingTokens,
    loading: isPottingTrendingTokensLoading,
  } = usePot2PumpPottingTrendingQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000, // Refetch every 10 seconds
    skip: !wallet.isInit,
  });

  useEffect(() => {
    if (!pottingNewTokens) return;
    console.log(pottingNewTokens);
    const list = pot2PumpListToMemePairList(
      (pottingNewTokens?.pot2Pumps as Partial<Pot2Pump>[]) ?? []
    );
    if (!list.length || list.length == 0) return;
    setNewTokensList((prev) => {
      prev.map((item) => {
        const i = list.find((item2) => item.address === item2.address);
        if (!i) {
          prev.splice(prev.indexOf(item), 1);
        }
      });

      list.map((item) => {
        if (!prev.find((item2) => item.address === item2.address)) {
          prev.push(item);
        } else {
          const existItem = prev.find(
            (item2) => item.address === item2.address
          );
          if (existItem) {
            Object.assign(existItem, {
              depositedRaisedTokenWithoutDecimals:
                item.depositedRaisedTokenWithoutDecimals,
            });
          }
        }
      });
      return prev;
    });
  }, [pottingNewTokens]);

  useEffect(() => {
    if (!pottingNearSuccessTokens) return;
    const list = pot2PumpListToMemePairList(
      (pottingNearSuccessTokens?.pot2Pumps as Partial<Pot2Pump>[]) ?? []
    );
    if (!list.length || list.length == 0) return;
    setNearSuccessTokensList((prev) => {
      prev.map((item2) => {
        const i = list.find((item) => item.address == item2.address);
        if (!i) {
          prev.splice(prev.indexOf(item2), 1);
        }
      });

      list.map((item) => {
        if (!prev.find((item2) => item.address === item2.address)) {
          console.log("add", item.address);
          prev.unshift(item);
        } else {
          const existItem = prev.find(
            (item2) => item.address === item2.address
          );

          if (existItem) {
            Object.assign(existItem, {
              depositedRaisedTokenWithoutDecimals:
                item.depositedRaisedTokenWithoutDecimals,
            });
          }
        }
      });

      return prev;
    });
  }, [pottingNearSuccessTokens]);

  useEffect(() => {
    if (!pottingHighPriceTokens) return;
    const list = pot2PumpListToMemePairList(
      (pottingHighPriceTokens?.pot2Pumps as Partial<Pot2Pump>[]) ?? []
    );
    setHighPriceTokensList((prev) => {
      list.map((item) => {
        if (!prev.find((item2) => item.address === item2.address)) {
          prev.push(item);
        } else {
          const existItem = prev.find(
            (item2) => item.address === item2.address
          );
          if (existItem) {
            Object.assign(existItem, {
              launchedToken: item.launchedToken,
            });
          }
        }
      });
      return prev;
    });
  }, [pottingHighPriceTokens]);

  useEffect(() => {
    const list = pot2PumpListToMemePairList(
      (pottingTrendingTokens?.pot2Pumps as Partial<Pot2Pump>[]) ?? []
    );

    setTrendingTokensList((prev) => {
      list.map((item) => {
        if (!prev.find((item2) => item.address === item2.address)) {
          prev.push(item);
        } else {
          const existItem = prev.find(
            (item2) => item.address === item2.address
          );

          if (existItem) {
            Object.assign(existItem, {
              launchedToken: item.launchedToken,
            });
          }
        }
      });
      return prev;
    });
  }, [pottingTrendingTokens]);

  // Auto scroll effect
  useEffect(() => {
    if (!highPriceTokensList?.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev >= Math.min(4, highPriceTokensList?.length - 1) ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [highPriceTokensList]);

  return (
    <div className="w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[1200px] mb-6 flex flex-col justify-center bg-[#FFCD4D] rounded-2xl px-4 pb-[50px] md:pb-8 relative pt-4 md:pt-12 text-black">
        <div
          className={
            "bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"
          }
        ></div>

        {/* Featured Slideshow */}
        <div className="relative">
          <div className="user-select-none opacity-0 min-h-[2 00px]">
            <LaunchCardV3
              type="featured"
              pair={highPriceTokensList?.[currentSlide]}
              action={<></>}
            />
          </div>
          {trendingTokensList.length > 0 ? (
            trendingTokensList
              ?.sort(
                (a, b) =>
                  Number(b.launchedToken?.priceChange24hPercentage) -
                  Number(a.launchedToken?.priceChange24hPercentage)
              )
              ?.slice(0, 5)
              ?.map((token, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    currentSlide === index
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <LaunchCardV3 type="featured" pair={token} action={<></>} />
                </div>
              ))
          ) : (
            <LoadingDisplay />
          )}
        </div>
        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 absolute bottom-3 left-0 right-0 z-20">
          {trendingTokensList
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
      <div className="w-full relative flex justify-center mb-12">
        <div className="w-full max-w-[600px]">
          <Link
            href="/launch-token?launchType=meme"
            className="text-black font-bold block"
          >
            <Button className="w-full tex   t-xl md:text-3xl py-3 md:py-5">
              🍯 Launch Your Token 🍯
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1200px] bg-[#FFCD4D] rounded-2xl px-2 md:px-4 relative pt-4 md:pt-12 mb-[90px] text-black">
        <div className="bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"></div>

        {/* Mobile Trigger */}
        <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] z-10">
          <Trigger
            tab={activeTab}
            setTab={setActiveTab as (tab: string) => void}
            options={Object.values(POT_TABS)}
            className="w-full px-4 py-2 rounded-2xl bg-white shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020]"
            capitalize={false}
          />
        </div>

        {/* Content Area - 添加顶部内边距 */}
        <div className="pt-6">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 min-h-[600px] h-[calc(100vh-300px)] gap-2">
            <section className="relative flex flex-col px-2 overflow-hidden">
              <h2 className="text-xl font-bold mb-4 absolute top-0 left-0 right-0 bg-[#FFCD4D] z-20 py-2 px-2">
                {POT_TABS.NEW}
              </h2>
              <div className="flex flex-col gap-2 pb-2 overflow-y-auto h-full pt-[60px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                {newTokensList.length > 0 ? (
                  newTokensList
                    .sort((a, b) => Number(b.startTime) - Number(a.startTime))
                    ?.map((pot2pump, index) => (
                      <motion.div key={index} variants={itemPopUpVariants}>
                        <LaunchCardV3
                          type="simple"
                          pair={pot2pump}
                          action={<></>}
                        />
                      </motion.div>
                    ))
                ) : (
                  <LoadingDisplay />
                )}
              </div>
            </section>

            <section className="relative flex flex-col px-2 overflow-hidden">
              <h2 className="text-xl font-bold mb-4 absolute top-0 left-0 right-0 bg-[#FFCD4D] z-20 py-2 px-2">
                {POT_TABS.ALMOST}
              </h2>
              <div className="flex flex-col gap-8 pb-2 overflow-y-auto h-full pt-[60px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                {nearSuccessTokensList.length > 0 ? (
                  nearSuccessTokensList
                    ?.sort(
                      (a, b) =>
                        Number(b.pottingPercentageNumber) -
                        Number(a.pottingPercentageNumber)
                    )
                    ?.map((pot2pump, index) => (
                      <motion.div key={index} variants={itemPopUpVariants}>
                        <LaunchCardV3
                          type="simple"
                          pair={pot2pump}
                          action={<></>}
                        />
                      </motion.div>
                    ))
                ) : (
                  <LoadingDisplay />
                )}
              </div>
            </section>

            {/* <section className="relative flex flex-col px-2 overflow-hidden">
              <h2 className="text-xl font-bold mb-4 absolute top-0 left-0 right-0 bg-[#FFCD4D] z-20 py-2 px-2">
                {POT_TABS.MOON}
              </h2>
              <div className="flex flex-col gap-8 pb-2 overflow-y-auto h-full pt-[60px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                {highPriceTokens?.map((pot2pump, index) => (
                  <motion.div key={index} variants={itemPopUpVariants}>
                    <LaunchCardV3
                      type="simple"
                      pair={pot2pump}
                      action={<></>}
                    />
                  </motion.div>
                ))}
              </div>
            </section> */}

            <section className="relative flex flex-col px-2 overflow-hidden">
              <h2 className="text-xl font-bold mb-4 absolute top-0 left-0 right-0 bg-[#FFCD4D] z-20 py-2 px-2">
                {POT_TABS.TRENDING}
              </h2>
              <div className="flex flex-col gap-8 pb-2 overflow-y-auto h-full pt-[60px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                {trendingTokensList.length > 0 ? (
                  trendingTokensList
                    ?.sort(
                      (a, b) =>
                        Number(b.launchedToken?.priceChange24hPercentage) -
                        Number(a.launchedToken?.priceChange24hPercentage)
                    )
                    ?.map((pot2pump, index) => (
                      <motion.div key={index} variants={itemPopUpVariants}>
                        <LaunchCardV3
                          type="simple"
                          pair={pot2pump}
                          action={<></>}
                        />
                      </motion.div>
                    ))
                ) : (
                  <LoadingDisplay />
                )}
              </div>
            </section>
          </div>

          {/* Mobile Content */}
          <div className="md:hidden min-h-[600px] h-[calc(100vh-300px)]">
            <div className="h-full flex flex-col px-2 overflow-hidden">
              {activeTab === POT_TABS.NEW && (
                <div className="flex flex-col gap-4 pb-2 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                  {newTokensList.length > 0 ? (
                    newTokensList
                      ?.sort(
                        (a, b) => Number(b.startTime) - Number(a.startTime)
                      )
                      ?.map((pot2pump, index) => (
                        <motion.div key={index} variants={itemPopUpVariants}>
                          <LaunchCardV3
                            type="simple"
                            pair={pot2pump}
                            action={<></>}
                          />
                        </motion.div>
                      ))
                  ) : (
                    <LoadingDisplay />
                  )}
                </div>
              )}

              {activeTab === POT_TABS.ALMOST && (
                <div className="flex flex-col gap-4 pb-2 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                  {nearSuccessTokensList.length > 0 ? (
                    nearSuccessTokensList
                      ?.sort(
                        (a, b) =>
                          Number(b.pottingPercentageNumber) -
                          Number(a.pottingPercentageNumber)
                      )
                      ?.map((pot2pump, index) => (
                        <motion.div key={index} variants={itemPopUpVariants}>
                          <LaunchCardV3
                            type="simple"
                            pair={pot2pump}
                            action={<></>}
                          />
                        </motion.div>
                      ))
                  ) : (
                    <LoadingDisplay />
                  )}
                </div>
              )}

              {activeTab === POT_TABS.MOON && (
                <div className="flex flex-col gap-4 pb-2 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                  {highPriceTokensList.length > 0 ? (
                    highPriceTokensList
                      ?.sort(
                        (a, b) =>
                          Number(b.launchedToken?.derivedUSD) -
                          Number(a.launchedToken?.derivedUSD)
                      )
                      ?.map((pot2pump, index) => (
                        <motion.div key={index} variants={itemPopUpVariants}>
                          <LaunchCardV3
                            type="simple"
                            pair={pot2pump}
                            action={<></>}
                          />
                        </motion.div>
                      ))
                  ) : (
                    <LoadingDisplay />
                  )}
                </div>
              )}

              {activeTab === POT_TABS.TRENDING && (
                <div className="flex flex-col gap-4 pb-2 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-amber-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white [-webkit-scrollbar]:mr-0 [&::-webkit-scrollbar]:mr-2 pr-2">
                  {trendingTokensList.length > 0 ? (
                    trendingTokensList
                      ?.sort(
                        (a, b) =>
                          Number(b.launchedToken?.priceChange24hPercentage) -
                          Number(a.launchedToken?.priceChange24hPercentage)
                      )
                      ?.map((pot2pump, index) => (
                        <motion.div key={index} variants={itemPopUpVariants}>
                          <LaunchCardV3
                            type="simple"
                            pair={pot2pump}
                            action={<></>}
                          />
                        </motion.div>
                      ))
                  ) : (
                    <LoadingDisplay />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Pot2PumpOverviewPage;
