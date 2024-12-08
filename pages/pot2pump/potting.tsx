import Link from "next/link";
import { observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/button";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { LaunchCard } from "@/components/LaunchCard";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import { FaCrown, FaExternalLinkAlt } from "react-icons/fa";
import { MemePairContract } from "@/services/contract/memepair-contract";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import { WarppedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const [mostSuccessProjects, setMostSuccessProjects] = useState<
    MemePairContract[] | null
  >(null);

  const updateMostSuccessProjects = useCallback(() => {
    console.log("updating most success projects", mostSuccessProjects);
    mostSuccessProjects?.forEach((pair) => {
      pair.getDepositedRaisedToken();
    });
  }, [mostSuccessProjects]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateMostSuccessProjects();
    }, 2000);
    return () => clearInterval(updateInterval);
  }, [updateMostSuccessProjects]);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();
    launchpad.projectsPage.updateFilter({
      status: "processing",
    });

    // launchpad.projectsPage.reloadPage();
    // launchpad.participatedPairs.reloadPage();

    //loading most success projects
    const startMostSuccessfulFtoPolling = () => {
      launchpad.trendingMEMEs().then((data) => {
        //if data is same as previous data then no need to update
        setMostSuccessProjects(data);
      });
    };

    startMostSuccessfulFtoPolling();
  }, [wallet.isInit]);

  return (
    <div className="px-2 md:px-6 xl:max-w-[1200px] mx-auto flex flex-col sm:gap-y-4">
      <div className="flex w-full justify-end gap-2">
        <Button className="scale-[0.8] sm:scale-100">
          <Link
            href="/launch-token?launchType=meme"
            className="text-black font-bold"
          >
            Launch Token
          </Link>
        </Button>
      </div>

      {mostSuccessProjects && mostSuccessProjects.length > 0 && (
        <div className="flex flex-col">
          <div className="relative flex flex-row items-end justify-between">
            <Image
              src={"/images/pumping/lying-bear.png"}
              width={150}
              height={0}
              alt="lying bear"
            />
            <Image
              src={"/images/pumping/Trading.png"}
              width={180}
              height={0}
              alt="Trading"
              className="mb-8 absolute left-1/2 transform -translate-x-1/2"
            />
            <Image
              src={"/images/pumping/victory-bear.png"}
              width={240}
              height={0}
              alt="lying bear"
            />
          </div>
          <div className="border-3 border-[#FFCD4D] bg-[#FFCD4D] rounded-3xl overflow-hidden">
            <div className="bg-[url('/images/pumping/outline-border.svg')] bg-top h-16"></div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={defaultContainerVariants}
              className="w-full flex flex-col lg:flex-row gap-2 flex-grow-[1] p-8"
            >
              {mostSuccessProjects.map((pair: MemePairContract, idx) => (
                <motion.div
                  variants={itemPopUpVariants}
                  key={pair.address}
                  className={
                    "relative flex-1 " + (idx !== 0 && "hidden lg:block")
                  }
                >
                  <motion.div
                    className="absolute top-0 left-0 z-10"
                    initial={{
                      rotate: 0,
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 10, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                      duration: 1,
                    }}
                  >
                    {idx === 0 && (
                      <FaCrown className="absolute top-0 left-2 rotate-[-30deg] translate-x-[-50%] translate-y-[-100%] scale-[300%] md:scale-[300%] fill-yellow-300" />
                    )}
                    {idx === 1 && (
                      <FaCrown className="absolute top-0 left-1 rotate-[-30deg] translate-x-[-50%] translate-y-[-100%] md:scale-[200%] fill-gray-300" />
                    )}
                    {idx === 2 && (
                      <FaCrown className="absolute top-0 left-0 rotate-[-30deg] translate-x-[-30%] translate-y-[-50%] md:scale-[100%] fill-amber-800" />
                    )}
                  </motion.div>
                  <LaunchCardV3
                    pair={pair}
                    action={<></>}
                    type="trending"
                    className="p-0"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      <div>
        <div
          id="filter"
          className="flex flex-col sm:flex-row items-center gap-2 my-4 sm:my-0"
        >
          <WarppedNextInputSearchBar
            onChange={(e) => {
              launchpad.pairFilterSearch = e.target.value;
            }}
          />
        </div>
      </div>

      <div className="w-full">
        <Tabs
          // destroyInactiveTabPanel={false}
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent",
            tab: "flex flex-col items-center gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
          onSelectionChange={(key) => {
            launchpad.setCurrentLaunchpadType("meme");
            if (key === "all") {
              launchpad.projectsPage.setIsInit(false);
              launchpad.pairFilterStatus = defaultPairFilters.all.status;
            } else if (key === "my") {
              launchpad.myLaunches.setIsInit(false);
              launchpad.pairFilterStatus = defaultPairFilters.myPairs.status;
            } else if (key === "participated-launch") {
              launchpad.participatedPairs.setIsInit(false);
              launchpad.pairFilterStatus =
                defaultPairFilters.participatedPairs.status;
            }
          }}
        >
          <Tab key="all" title="All MEMEs">
            <Pagination
              paginationState={launchpad.projectsPage}
              render={(pair) => <LaunchCardV3 pair={pair} action={<></>} />}
              classNames={{
                itemsContainer:
                  "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
              }}
            />
          </Tab>
          <Tab key="my" title="My MEMEs">
            <Pagination
              paginationState={launchpad.myLaunches}
              render={(pair) => (
                <LaunchCard
                  pair={pair}
                  action={<></>}
                  className="flex w-full h-full flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative overflow-hidden"
                />
              )}
              classNames={{
                itemsContainer:
                  "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
              }}
            />
          </Tab>
          <Tab key="participated-launch" title="Participated MEMEs">
            <Pagination
              paginationState={launchpad.participatedPairs}
              render={(pair) => <LaunchCard pair={pair} action={<></>} />}
              classNames={{
                itemsContainer:
                  "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
              }}
            />
          </Tab>
          {/* <Tab href="/launch" title="To Fto projects->" /> */}
          <Tab
            href="https://bartio.bonds.yeetit.xyz/"
            target="_blank"
            title={
              <div className="flex items-center text-yellow-400">
                <Image
                  className="size-4"
                  src="/images/partners/yeet_icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
                <span className="flex items-center justify-center gap-2">
                  Try Yeet Bond <FaExternalLinkAlt className="inline-block" />
                </span>
              </div>
            }
          />
          <Tab
            title={
              <Link href="/memewar" className="flex items-center text-rose-600">
                <span className="flex items-center justify-center gap-2">
                  Meme War ⚔️
                </span>
              </Link>
            }
          />
        </Tabs>
      </div>
    </div>
  );
});

export default MemeLaunchPage;
