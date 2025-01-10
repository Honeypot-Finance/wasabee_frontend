import Link from "next/link";
import { observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import launchpad from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { Tab, Tabs, Button as NextButton } from "@nextui-org/react";
import { motion } from "framer-motion";
import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import { WrappedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";
import LaunchPadProjectCard from "@/components/LaunchPadProjectCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DataContainer } from "@/components/DataContainer";
import FjordHoneySdk from "@/services/fjord_honeypot_sdk";
import dayjs from "dayjs";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const [selectedTab, setSelectedTab] = useState<"all" | "my">("all");
  const [take, setTake] = useState(10);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<any[]>([]);

  const owner = selectedTab == "my" ? wallet.account : "";

  const {
    data: pools,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["trendingMEMEs", search, owner, take],
    queryFn: () => {
      return FjordHoneySdk.findManyPools({
        page: 1,
        take: take,
        search: search,
        filters: { owner: owner },
      });
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.isInit]);

  const resetPage = () => {
    setPage(1);
    setSearch("");
    setResult([]);
  };

  useEffect(() => {
    if (pools?.data && pools.data.length > 0) {
      setResult((prev) => [...prev, ...pools.data]);
    }
  }, [pools?.data]);

  const mostSuccessProjects: any[] = [];

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
              startDate={0}
              fundsRaised={0}
              pairAddress={"0x"}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
              startDate={0}
              fundsRaised={0}
              pairAddress={"0x0"}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
              startDate={0}
              fundsRaised={0}
              pairAddress={"0x0"}
            />
            <LaunchPadProjectCard
              status="live"
              coverImg={""}
              endDate={0}
              tokenName={""}
              projectAuthor={""}
              startDate={0}
              fundsRaised={0}
              pairAddress={"0x0"}
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
            resetPage();
          }}
        >
          <Tab key="all" title="All Projects" />
          <Tab key="my" title="My Projects" />
        </Tabs>

        <div className="flex gap-5">
          <WrappedNextInputSearchBar
            value={search}
            className="max-w-[305px] w-[305px] h-[46px] flex"
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
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
        <DataContainer
          hasData={result.length > 0 || isLoading || isFetching}
          isLoading={isLoading || isFetching}
        >
          <div>
            <motion.div
              variants={defaultContainerVariants}
              initial="hidden"
              animate="visible"
              className={
                "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-x-4 xl:gap-y-5 xl:grid-cols-4"
              }
            >
              {result.map((pair, idx) => (
                <motion.div variants={itemPopUpVariants} key={idx}>
                  <LaunchPadProjectCard
                    status={
                      dayjs(pair.startsAt).isAfter(dayjs()) ? "comming" : "live"
                    }
                    coverImg={pair.bannerUrl}
                    isShowCoverImage={true}
                    endDate={pair.endsAt}
                    startDate={pair.startsAt}
                    tokenName={pair.shareTokenName}
                    projectAuthor={pair.owner}
                    fundsRaised={pair.fundsRaised}
                    assetTokenSymbol={pair.assetTokenSymbol}
                    shareTokenSymbol={pair.imageUrl}
                    pairAddress={pair.address}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </DataContainer>
        <div className="flex justify-around my-5">
          <Button
            onClick={() => {
              setTake((prev) => (prev += 10));
            }}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default MemeLaunchPage;
