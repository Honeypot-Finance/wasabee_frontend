import Link from "next/link";
import { observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
<<<<<<< HEAD
import { useEffect } from "react";
import { Button } from "@/components/button/button-next";
=======
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/button";
>>>>>>> algebra-full-implement
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { Tab, Tabs } from "@nextui-org/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import { WrappedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";
import { memewarStore } from "@/services/memewar";
import { Pot2PumpTracker } from "@/components/MemeWarBanner/Pot2PumpTracker";
<<<<<<< HEAD
import { LaunchCardV3 } from "@/components/LaunchCard/v3";

const MemeLaunchPage: NextLayoutPage = observer(() => {
=======
import { Pot2PumpPumpingService } from "@/services/launchpad/pot2pump/pumping";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const [pumpingProjects, setPumpingProjects] =
    useState<Pot2PumpPumpingService>();

>>>>>>> algebra-full-implement
  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
<<<<<<< HEAD
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();
    launchpad.projectsPage.updateFilter({
      status: "success",
    });

    memewarStore.reloadParticipants();

    // launchpad.projectsPage.reloadPage();
    // launchpad.participatedPairs.reloadPage();
=======
    const newPumpingProjects = new Pot2PumpPumpingService();
    setPumpingProjects(newPumpingProjects);
    newPumpingProjects.projectsPage.reloadPage();
>>>>>>> algebra-full-implement
  }, [wallet.isInit]);

  return (
    <div className="w-full grow">
      <div className="px-2 md:px-6 xl:max-w-[1200px] mx-auto flex flex-col sm:gap-y-4">
        <Pot2PumpTracker />

        <div>
          <div
            id="filter"
            className="flex flex-col sm:flex-row items-center gap-2 my-4 sm:my-0"
          >
            <WrappedNextInputSearchBar
              className="border border-[#FFCD4D] shadow-[1px_2px_0px_0px_#9B7D2F] placeholder:text-xs"
              onChange={(e) => {
                launchpad.pairFilterSearch = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="w-full relative">
          <div className="py-2 sm:py-0 sm:absolute right-0 top-0">
            <Button className="w-full">
              <Link
                href="/launch-token?launchType=meme"
                className="text-black font-bold"
              >
                Launch Token
              </Link>
            </Button>
          </div>

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
                render={(pair) => <LaunchCardV3 pair={pair} action={<></>} />}
                classNames={{
                  itemsContainer:
                    "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
                }}
              />
            </Tab>
            <Tab key="participated-launch" title="Participated MEMEs">
              <Pagination
                paginationState={launchpad.participatedPairs}
                render={(pair) => <LaunchCardV3 pair={pair} action={<></>} />}
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
                <Link
                  href="/memewar"
                  className="flex items-center text-rose-600"
                >
                  <span className="flex items-center justify-center gap-2">
                    Meme War ⚔️
                  </span>
                </Link>
              }
            />
          </Tabs>
        </div>
      </div>
<<<<<<< HEAD
      <footer>
        <Image
          src="/images/pumping/toast-bear.png"
          width={1000}
          height={0}
          className="w-full h-auto"
          alt="toast bear"
        />
      </footer>
=======

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
            if (key === "all") {
              pumpingProjects?.projectsPage.reloadPage();
            }
          }}
        >
          <Tab key="all" title="All MEMEs">
            {pumpingProjects && (
              <Pagination
                paginationState={pumpingProjects.projectsPage}
                render={(pair) => <LaunchCard pair={pair} action={<></>} />}
                classNames={{
                  itemsContainer:
                    "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3",
                }}
              />
            )}
          </Tab>
          <Tab key="my" title="My MEMEs" href="/profile" />
          <Tab
            key="participated-launch"
            title="Participated MEMEs"
            href="/profile"
          />
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
>>>>>>> algebra-full-implement
    </div>
  );
});

export default MemeLaunchPage;
