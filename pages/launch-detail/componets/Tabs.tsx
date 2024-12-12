import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { amountFormatted, truncate } from "@/lib/format";
import { chart } from "@/services/chart";
import { ChevronDown } from "lucide-react";
import CardContianer from "@/components/CardContianer/CardContianer";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { DiscussionArea } from "@/components/Discussion/DiscussionArea/DiscussionArea";
import { SimplePriceFeedGraph } from "@/components/PriceFeedGraph/SimplePriceFeedGraph";
import LaunchChart from "./LaunchChart";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";
import BeraVoteForm from "@/components/beravote/components/NewSpace/Steps/BeraVoteForm";
import { observer } from "mobx-react-lite";

const universalMenuItems = [
  { key: "info", label: "Token Info" },
  { key: "about", label: "About the Project" },
  { key: "txs", label: "Transactions" },
  { key: "comment", label: "Comments" },
  { key: "priceChart", label: "Price Chart" },
];

const successMenuItems = [{ key: "votingspace", label: "Voting Space" }];

const Tabs = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract | null }) => {
    const [tab, setTab] = useState(universalMenuItems[0].key);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <>
        <div className="hidden sm:flex items-center gap-x-1 md:text-xs ml-3">
          {universalMenuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={[
                "px-2 md:px-8 pt-2 pb-1 rounded-t-2xl",
                tab === item.key
                  ? "bg-[#9D5E28] text-white"
                  : "bg-[#3B2712] text-[#A46617]",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
          {pair?.ftoState === 0 &&
            successMenuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={[
                  "px-2 md:px-8 pt-2 pb-1 rounded-t-2xl",
                  tab === item.key
                    ? "bg-[#9D5E28] text-white"
                    : "bg-[#3B2712] text-[#A46617]",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
        </div>

        <div className="relative sm:hidden inline-block text-left">
          <button
            onBlur={() => setIsMenuOpen(false)}
            onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
            className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-[#3B2712] text-[#A46617] text-sm font-medium hover:bg-[#9D5E28] hover:text-white focus:outline-none mb-2 space-x-0.5"
          >
            <span>
              {universalMenuItems.find((item) => item.key === tab)?.label}
              {successMenuItems.find((item) => item.key === tab)?.label}
            </span>
            <ChevronDown className="size-4" />
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMenuOpen ? "auto" : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-56 rounded-md overflow-hidden z-10"
          >
            <div className="py-1 rounded-md z-10">
              {universalMenuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setTab(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={[
                    "block px-4 py-2 text-sm w-full text-left",
                    tab === item.key
                      ? "bg-[#9D5E28] text-white"
                      : "bg-[#3B2712] text-[#A46617] hover:bg-[#9D5E28] hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
              {
                // Show voting space only when the status is success
                pair?.ftoState === 0 &&
                  successMenuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setTab(item.key);
                        setIsMenuOpen(false);
                      }}
                      className={[
                        "block px-4 py-2 text-sm w-full text-left",
                        tab === item.key
                          ? "bg-[#9D5E28] text-white"
                          : "bg-[#3B2712] text-[#A46617] hover:bg-[#9D5E28] hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  ))
              }
            </div>
          </motion.div>
        </div>

        {/** Comment section */}
        <CardContianer addtionalClassName={"block"}>
          {tab === "info" && (
            <div className="flex flex-col w-full px-2 md:px-10">
              <h1 className="text-lg xl:text-4xl xl:py-16">Token Info</h1>
              <div className="flex flex-col gap-x-2 divide-y-1 divide-[#F0A64A]">
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">Token Name</span>
                  <span className="text-white md:text-xl">
                    {pair?.launchedToken?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">Token Symbol</span>
                  <span className="text-white md:text-xl">
                    {pair?.launchedToken?.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">Token supply</span>
                  <span className="text-white md:text-xl">
                    {(
                      pair as MemePairContract
                    )?.depositedLaunchedToken?.toNumber()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">
                    INITIAL MARKET CAP
                  </span>
                  <span className="text-white md:text-xl">
                    {amountFormatted(pair?.depositedRaisedToken, {
                      decimals: 0,
                      fixed: 3,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">Token Type</span>
                  <span className="text-white md:text-xl">MEME</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[#F0A64A] text-sm">Token Address</span>
                  <span className="text-white md:text-xl">
                    {" "}
                    {truncate(pair?.launchedToken?.address ?? "", 16)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {tab === "about" && (
            <div>
              <h2 className="text-xl sm:text-3xl">project description:</h2>
              <p>
                {!!pair?.description
                  ? pair?.description
                  : "this project does not have description info"}
              </p>
            </div>
          )}
          {tab === "txs" && (
            <div>
              <h2 className="text-[2rem] text-center">Coming Thoon</h2>
            </div>
          )}
          {tab === "comment" && (
            <div className="w-full">
              {pair && (
                <DiscussionArea
                  pairDatabaseId={pair.databaseId ?? -1}
                  classNames={{ container: "border-none" }}
                />
              )}
            </div>
          )}
          {tab === "priceChart" && (
            <div className="flex justify-center">
              <div className="w-full">
                {chart.chartTarget &&
                  pair?.ftoStatusDisplay?.status === "success" && (
                    <SimplePriceFeedGraph />
                  )}
                {pair?.launchedToken &&
                  pair?.ftoStatusDisplay?.status === "Processing" && (
                    <LaunchChart decimals={pair.launchedToken.decimals} />
                  )}
              </div>
            </div>
          )}
          {tab === "votingspace" && (
            <div className="flex flex-col justify-center items-center gap-2">
              {pair &&
                (pair.beravoteSpaceId ? (
                  <>
                    <iframe
                      className="w-full aspect-video"
                      src={`https://beravote.com/space/${pair.beravoteSpaceId}`}
                    >
                      {" "}
                    </iframe>
                    <Link
                      href={`https://beravote.com/space/${pair.beravoteSpaceId}`}
                    >
                      <Button className="w-full">View On Beravote</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Image
                      src={"/images/partners/beravote.avif"}
                      width={500}
                      height={500}
                      alt="beravote logo"
                      className="w-full"
                    />
                    {pair.isProvider ? (
                      <BeraVoteForm pair={pair} />
                    ) : (
                      <h3>this project does not have voting space</h3>
                    )}
                  </>
                ))}
            </div>
          )}
        </CardContianer>
      </>
    );
  }
);

export default Tabs;
