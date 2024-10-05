import Link from "next/link";
import { Observer, observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { LaunchCard } from "@/components/LaunchCard";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  useDisclosure,
  Button as NextButton,
} from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { SpinnerContainer } from "@/components/Spinner";
import { DropdownSvg } from "@/components/svg/dropdown";
import { motion } from "framer-motion";
import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import { FaCrown, FaExternalLinkAlt } from "react-icons/fa";
import { MemePairContract } from "@/services/contract/memepair-contract";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import { WarppedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mostSuccessProjects, setMostSuccessProjects] = useState<
    MemePairContract[] | null
  >(null);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();

    // launchpad.projectsPage.reloadPage();
    // launchpad.participatedPairs.reloadPage();

    //loading most success projects
    launchpad.trendingMEMEs().then((data) => {
      setMostSuccessProjects(data);
    });
  }, [wallet.isInit]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex flex-col sm:gap-y-4">
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
        <>
          <h2 className="w-full text-center text-[3rem] [font-family:MEMEH] font-bold">
            Trending MEMEs
          </h2>
          <motion.div
            variants={defaultContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col lg:flex-row gap-2 flex-grow-[1]"
          >
            {mostSuccessProjects.map((pair: MemePairContract, idx) => (
              <motion.div
                variants={itemPopUpVariants}
                key={pair.address}
                className={
                  "relative flex-grow " + (idx !== 0 && "hidden lg:block")
                }
              >
                <motion.div
                  className="absolute  top-0 left-0 z-10"
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
                    <FaCrown className="absolute top-0 left-2 rotate-[-30deg] translate-x-[-50%] translate-y-[-100%] scale-[500%] fill-yellow-300" />
                  )}
                  {idx === 1 && (
                    <FaCrown className="absolute top-0 left-1 rotate-[-30deg] translate-x-[-50%] translate-y-[-100%] scale-[300%] fill-gray-300" />
                  )}
                  {idx === 2 && (
                    <FaCrown className="absolute top-0 left-0 rotate-[-30deg] translate-x-[-30%] translate-y-[-50%] scale-[100%] fill-amber-800" />
                  )}
                </motion.div>
                <LaunchCard
                  pair={pair}
                  action={<></>}
                  type="trending"
                  className="p-0"
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      <div>
        <div id="filter" className="flex flex-col sm:flex-row gap-2">
          <WarppedNextInputSearchBar
            onChange={(e) => {
              launchpad.pairFilterSearch = e.target.value;
            }}
          />
          <Popover
            shouldBlockScroll
            isOpen={isOpen}
            onOpenChange={(isOpen) => {
              isOpen ? onOpen() : onClose();
            }}
            placement="bottom"
            classNames={{
              base: [
                // arrow color
                "before:bg-default-200",
              ],
              content: [
                "py-3 px-4 border border-default-200",
                "bg-gradient-to-br from-white to-default-300",
                "dark:from-default-100 dark:to-default-50",
              ],
            }}
          >
            <PopoverTrigger>
              <NextButton className="inline-flex w-full sm:w-[124px] h-10 justify-between items-center shrink-0 border [background:#3E2A0F] px-2.5 py-0 rounded-[30px] border-solid border-[rgba(247,147,26,0.10)] text-white text-center">
                <span className="flex-1">
                  {launchpad.projectsPage.filter.status.toUpperCase()}
                </span>
                <DropdownSvg></DropdownSvg>
              </NextButton>
            </PopoverTrigger>
            <PopoverContent className="flex lg:w-[352px] flex-col items-center gap-4 border border-[color:var(--card-stroke,#F7931A)] [background:var(--card-color,#271A0C)] rounded-xl border-solid">
              <Observer>
                {() => (
                  <div className="w-full">
                    <SpinnerContainer
                      isLoading={launchpad.projectsPage.isLoading}
                    >
                      <div className="max-h-[300px] grid grid-cols-3 gap-2">
                        <NextButton
                          onClick={() => {
                            launchpad.pairFilterStatus = "all";
                          }}
                          className="w-[100px]"
                        >
                          All
                        </NextButton>
                        <NextButton
                          onClick={() => {
                            launchpad.pairFilterStatus = "success";
                          }}
                          className="w-[100px]"
                        >
                          Success
                        </NextButton>
                        <NextButton
                          onClick={() => {
                            launchpad.pairFilterStatus = "fail";
                          }}
                          className="w-[100px]"
                        >
                          Failed
                        </NextButton>
                        <NextButton
                          onClick={() => {
                            console.log("processing");
                            launchpad.pairFilterStatus = "processing";
                          }}
                          className="w-[100px]"
                        >
                          Processing
                        </NextButton>
                      </div>
                    </SpinnerContainer>
                  </div>
                )}
              </Observer>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
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
              render={(pair) => <LaunchCard pair={pair} action={<></>} />}
              classNames={{
                itemsContainer:
                  "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
              }}
            />
          </Tab>
          <Tab key="my" title="My MEMEs">
            <Pagination
              paginationState={launchpad.myLaunches}
              render={(pair) => <LaunchCard pair={pair} action={<></>} />}
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
                  className="h-4"
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
        </Tabs>
      </div>
    </div>
  );
});

export default MemeLaunchPage;
