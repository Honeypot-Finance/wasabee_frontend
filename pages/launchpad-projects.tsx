import Link from "next/link";
import { observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { Tab, Tabs, Button as NextButton } from "@nextui-org/react";
import { motion } from "framer-motion";
import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import Pagination from "@/components/Pagination/Pagination";
import { WarppedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";
import LaunchPadProjectCard from "@/components/LaunchPadProjectCard";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { DataContainer } from "@/components/DataContainer";
import pools from "./pools";
// import FjordHoneySdk from "@/services/fjord_honeypot_sdk";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const [selectedTab, setSelectedTab] = useState<"all" | "my">("all");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const owner = selectedTab == "my" ? wallet.account : "";

  // const pools = useQuery({
  //   queryKey: ["trendingMEMEs"],
  //   queryFn: () => {
  //     FjordHoneySdk.findManyPools({ page: 1, search: "" });
  //   },
  // });

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
  }, [wallet.isInit]);

  console.log("launchpad.projectsPage", launchpad.projectsPage);

  const mostSuccessProjects: any[] = [];
  const pools: any[] = [];

  return (
    <div className="px-7 xl:max-w-[1280px] mx-auto flex flex-col sm:gap-y-5">
      {mostSuccessProjects && mostSuccessProjects.length > 0 && (
        <>
          <h2 className="w-full text-center text-[1.75rem] leading-4 font-bold text-neutral-100 ">
            Trending Projects
          </h2>
          <motion.div
            variants={defaultContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col lg:flex-row gap-4 flex-grow-[1] mt-8"
          >
            <LaunchPadProjectCard
              status="comming"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
            />
          </motion.div>
        </>
      )}

      <div className="flex justify-between">
        <Tabs
          aria-label="Options"
          variant="light"
          radius="sm"
          size="lg"
          classNames={{
            tab: "font-bold text-base leading-4 data-[selected=true]:bg-[#E18A2066] data-[selected=true]:backdrop-blur-[200] data-[selected=true]:border-1 data-[selected=true]:border-[#E18A2066s]",
            tabContent: "group-data-[selected=true]:text-[#ffffff]",
            cursor: "group-data-[selected=true]:bg-[#E18A2066]",
          }}
          defaultSelectedKey={selectedTab}
          selectedKey={selectedTab}
          onSelectionChange={(key) => {
            if (key === "all") {
              setSelectedTab(key);
            } else if (key === "my") {
              setSelectedTab(key);
            }
          }}
        >
          <Tab key="all" title="All Projects" />
          <Tab key="my" title="My Projects" />
        </Tabs>

        <div className="flex gap-5">
          <WarppedNextInputSearchBar
            value={search}
            className="max-w-[305px] w-[305px] h-[46px] flex"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Button className="px-[38px] py-[12.5px] rounded-full outline-1 !bg-[#FFCD4D] border-2 border-[#E18A2066]">
            <Link
              href="/launch-project"
              className="text-black font-bold text-sm leading-4"
            >
              Launch Token
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <DataContainer hasData={pools.length > 0}>
          <div>
            <motion.div
              variants={defaultContainerVariants}
              initial="hidden"
              animate="visible"
              className={
                "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-x-4 xl:gap-y-5 xl:grid-cols-4"
              }
            >
              {pools.map((pair, idx) => (
                <motion.div variants={itemPopUpVariants} key={idx}>
                  <LaunchPadProjectCard
                    status={"live"}
                    coverImg={""}
                    isShowCoverImage={true}
                    endDate={0}
                    tokenName={""}
                    projectAuthor={"Hunny"}
                  />
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-around my-5">
              <Button onClick={() => {}}>
                {true ? "Loading..." : "Load More"}
              </Button>
            </div>
          </div>
        </DataContainer>
      </div>
    </div>
  );
});

export default MemeLaunchPage;
