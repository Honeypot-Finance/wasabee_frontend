import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { amountFormatted, truncate } from "@/lib/format";
import { chart } from "@/services/chart";
import { ChevronDown, LucideFileEdit } from "lucide-react";
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
import { VscCopy } from "react-icons/vsc";
import { Copy } from "@/components/copy";
import TokenAddress from "./TokenAddress";
import { Trigger } from "@/components/Trigger";
import {
  OptionsDropdown,
  optionsPresets,
} from "@/components/OptionsDropdown/OptionsDropdown";
import { wallet } from "@/services/wallet";
import { toast } from "react-toastify";
import { Modal, useDisclosure } from "@nextui-org/react";
import { UpdateProjectModal } from "../[pair]";

const universalMenuItems = [
  { key: "info", label: "Token Info" },
  { key: "about", label: "About the Project" },
  { key: "txs", label: "Transactions" },
  { key: "comment", label: "Comments" },
  { key: "priceChart", label: "Price Chart" },
];

const successMenuItems = [{ key: "votingspace", label: "Voting Space" }];

interface Transaction {
  rank: string;
  address: string;
  quantity: string;
  percentage: string;
  value: string;
}

const transactionData: Transaction[] = [
  {
    rank: "01",
    address: "0x0e230092509233trd1234567",
    quantity: "51,774.3457510410643427771",
    percentage: "30.89%",
    value: "$34,432,134.09",
  },
  {
    rank: "02",
    address: "0x0e230092509233trd1234567",
    quantity: "51,774.3457510410643427771",
    percentage: "30.89%",
    value: "$34,432,134.09",
  },
  {
    rank: "03",
    address: "0x0e230092509233trd1234567",
    quantity: "51,774.3457510410643427771",
    percentage: "30.89%",
    value: "$34,432,134.09",
  },
  // ... 可以继续添加更多数据
];

const Tabs = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract | null }) => {
    const [tab, setTab] = useState(universalMenuItems[0].key);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const options =
      pair?.state === 0
        ? [...universalMenuItems, ...successMenuItems]
        : universalMenuItems;

    return (
      <div className="relative">
        {pair && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              base: "max-h-[70vh] overflow-y-scroll",
            }}
          >
            <UpdateProjectModal pair={pair}></UpdateProjectModal>
          </Modal>
        )}
        {/* <div className="hidden sm:flex items-center gap-x-1 md:text-xs ml-3">
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
          {pair?.state === 0 &&
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
        </div> */}
        <Trigger
          tab={tab}
          setTab={setTab}
          options={options.map((item) => item.key)}
          className="px-2 md:px-8 pt-2 pb-1 rounded-t-2xl mx-auto absolute -top-8 z-10 left-1/2 -translate-x-1/2 hidden sm:block"
          capitalize={true}
        />

        <div className="relative sm:hidden inline-block text-left">
          <button
            onBlur={() => setIsMenuOpen(false)}
            onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
            className="inline-flex justify-center w-full rounded-2xl border border-[#202020] bg-white px-4 py-2 text-[#202020] text-sm font-medium shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020] focus:outline-none mb-2 space-x-0.5"
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
            className="absolute left-0 w-56 rounded-2xl overflow-hidden z-10 border border-[#202020] bg-white shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020]"
          >
            <div className="py-1 rounded-2xl">
              {universalMenuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setTab(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={[
                    "block px-4 py-2 text-sm w-full text-left transition-all",
                    tab === item.key
                      ? "bg-[#202020] text-white"
                      : "text-[#202020] hover:bg-[#20202010]",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
              {pair?.state === 0 &&
                successMenuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setTab(item.key);
                      setIsMenuOpen(false);
                    }}
                    className={[
                      "block px-4 py-2 text-sm w-full text-left transition-all",
                      tab === item.key
                        ? "bg-[#202020] text-white"
                        : "text-[#202020] hover:bg-[#20202010]",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
          </motion.div>
        </div>

        {/** Comment section */}
        <CardContianer
          addtionalClassName={
            "block bg-[#FFCD4D] relative overflow-hidden pt-12"
          }
        >
          <div className="bg-[url('/images/pumping/outline-border.png')] bg-top h-12 absolute top-0 left-0 w-full bg-contain bg-repeat-x"></div>
          {tab === "info" && (
            <div className="flex items-center justify-center">
              <OptionsDropdown
                className="p-0 m-0 absolute right-2 top-2 lg:top-4 "
                options={[
                  optionsPresets.copy({
                    copyText: pair?.launchedToken?.address ?? "",
                    displayText: "Copy Token address",
                    copysSuccessText: "Token address copied",
                  }),
                  optionsPresets.share({
                    shareUrl: `${window.location.origin}/launch-detail/${pair?.address}`,
                    displayText: "Share this project",
                    shareText: "Checkout this Token: " + pair?.projectName,
                  }),
                  optionsPresets.importTokenToWallet({
                    token: pair?.launchedToken,
                  }),
                  optionsPresets.viewOnExplorer({
                    address: pair?.address ?? "",
                  }),
                  {
                    icon: <LucideFileEdit />,
                    display: "Update Project",
                    onClick: () => {
                      if (!pair) return;

                      if (
                        pair.provider.toLowerCase() !==
                        wallet.account.toLowerCase()
                      ) {
                        toast.warning("You are not the owner of this project");
                        return;
                      }

                      onOpen();
                    },
                  },
                ]}
              />
              <div className="w-full overflow-hidden p-4 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-x-8">
                <div>
                  <h1 className="text-[var(--Heading,#0D0D0D)] text-center md:text-left text-stroke-white webkit-text-stroke-[2px] webkit-text-stroke-color-[#FFF] font-gliker text-[40px] md:text-[64px] font-normal leading-[110%] tracking-[1.28px] mb-6 md:mb-12 text-stroke-custom">
                    Token Info
                  </h1>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-center md:text-left col-span-2 md:col-span-1">
                      <div className="text-white text-shadow-custom text-stroke-black font-gliker text-[24px] md:text-[34px] font-normal leading-[110%] tracking-[0.68px]">
                        {pair?.launchedToken?.name}
                      </div>
                      <div className="text-[var(--Heading,#0D0D0D)] font-gliker text-[20px] font-normal leading-[110%] tracking-[0.4px]">
                        Token Name
                      </div>
                    </div>
                    <div className="space-y-4 text-center md:text-left col-span-2 md:col-span-1">
                      <div className="text-white text-shadow-custom text-stroke-black font-gliker text-[24px] md:text-[34px] font-normal leading-[110%] tracking-[0.68px]">
                        {pair?.launchedToken?.symbol}
                      </div>
                      <div className="text-[var(--Heading,#0D0D0D)] font-gliker text-[20px] font-normal leading-[110%] tracking-[0.4px]">
                        Token Symbol
                      </div>
                    </div>
                    <div className="space-y-4 text-center md:text-left col-span-2 md:col-span-1">
                      <div className="text-white text-shadow-custom text-stroke-black font-gliker text-[24px] md:text-[34px] font-normal leading-[110%] tracking-[0.68px]">
                        MEME
                      </div>
                      <div className="text-[var(--Heading,#0D0D0D)] font-gliker text-[20px] font-normal leading-[110%] tracking-[0.4px]">
                        Token type
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="w-full bg-white rounded-3xl px-4 md:px-[60px] text-center border border-black shadow-[4px_4px_0px_0px_#D29A0D] space-y-4 py-[28.5px]">
                      <div className="text-[24px] md:text-[34px] text-stroke-black text-shadow-custom">
                        {(
                          pair as MemePairContract
                        )?.depositedLaunchedToken?.toNumber()}
                      </div>
                      <div className="text-base md:text-lg text-[#0D0D0D]">
                        Total Supply
                      </div>
                    </div>
                    <div className="w-full bg-white rounded-3xl px-4 md:px-[60px] text-center border border-black shadow-[4px_4px_0px_0px_#D29A0D] space-y-4 py-[28.5px]">
                      <div className="text-[24px] md:text-[34px] text-stroke-black text-shadow-custom">
                        ${" "}
                        {amountFormatted(pair?.depositedRaisedToken, {
                          decimals: 0,
                          fixed: 3,
                        })}
                      </div>
                      <div className="text-base md:text-lg text-[#0D0D0D]">
                        Initial Market Cap
                      </div>
                    </div>
                  </div>
                  <div className="w-full rounded-[16px] border-[3px] border-white bg-[#EFC049] shadow-[4px_4px_0px_0px_#202020,-2px_4px_0px_0px_#202020] flex items-center justify-between relative">
                    <Copy
                      className={"w-full"}
                      content="Copy address"
                      value={pair?.launchedToken?.address || ""}
                      displayContent={
                        <div className="relative">
                          <span className="px-4 py-2 flex h-[41px] justify-between items-center bg-[#F2C34A] rounded-[10px] cursor-pointer hover:brightness-150 active:brightness-75 select-none text-[#202020] text-sm md:text-base">
                            {truncate(pair?.launchedToken?.address || "", 16)}
                          </span>
                          <div className="size-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center bg-white text-[#202020] border border-[#202020] rounded-md">
                            <VscCopy className="size-4" />
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "about" && (
            <div className="space-y-4 w-full px-[60px]">
              <h1 className="text-[var(--Heading,#0D0D0D)] text-center text-shadow-[2px_4px_0px_#AF7F3D] webkit-text-stroke-[2px] text-stroke-white font-gliker text-[64px] font-normal leading-[110%] tracking-[1.28px]">
                About the Project
              </h1>
              <div className="mx-auto grid grid-cols-2 gap-8 w-fit">
                <div className="space-y-4">
                  <div className="text-white text-shadow-custom text-stroke-black font-gliker text-[34px] font-normal leading-[110%] tracking-[0.68px]">
                    {pair?.launchedToken?.name}
                  </div>
                  <div className="text-[var(--Heading,#0D0D0D)] font-gliker text-[20px] font-normal leading-[110%] tracking-[0.4px]">
                    Token Name
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-white text-shadow-custom text-stroke-black font-gliker text-[34px] font-normal leading-[110%] tracking-[0.68px]">
                    {pair?.launchedToken?.symbol}
                  </div>
                  <div className="text-[var(--Heading,#0D0D0D)] font-gliker text-[20px] font-normal leading-[110%] tracking-[0.4px]">
                    Token Symbol
                  </div>
                </div>
              </div>
              <p className="text-center text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus tincidunt nulla nec diam finibus, non faucibus dolor
                venenatis. Integer pharetra nisi nec lorem volutpat, fringilla
                arcu tincidunt. Morbi vehicula, justo in ultrices porttitor,
                purus justo interdum nunc, sed elementum elit lacus ac turpis.
                Proin lacinia tellus magna hendrerit, sed sodales erat
                dignissim. Suspendisse potenti. Curabitur felis ut urna vehicula
                volutpat. Vestibulum viverra arcu urna gravida suscipit. Donec
                non ligula magna bibendum volutpat.
              </p>
            </div>
          )}
          {tab === "txs" && (
            <div className="bg-[#202020] rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="border border-[#5C5C5C] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#323232] text-white">
                      <tr>
                        <th className="py-4 px-6 text-left text-base font-medium">
                          RANK
                        </th>
                        <th className="py-4 px-6 text-left text-base font-medium">
                          ADDRESS
                        </th>
                        <th className="py-4 px-6 text-left text-base font-medium">
                          QUANTITY
                        </th>
                        <th className="py-4 px-6 text-right text-base font-medium">
                          PERCENTAGE
                        </th>
                        <th className="py-4 px-6 text-right text-base font-medium">
                          VALUE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white divide-y divide-[#5C5C5C]">
                      {transactionData.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-[#2a2a2a] transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-[#FFCD4D] rounded"></div>
                              {item.rank}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-base font-mono">
                            <div className="flex items-center gap-2">
                              {item.address}
                              <button className="p-1 hover:bg-[#3a3a3a] rounded">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16M8 5V3H16V5M8 5H16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-base">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-6 text-right text-base">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-12 bg-[#FFCD4D] h-1 rounded"></div>
                              {item.percentage}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right text-base">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
                {console.log(
                  "pair?.ftoStatusDisplay?.status",
                  pair?.ftoStatusDisplay?.status
                ) === undefined && <></>}

                {console.log("chart.chartTarget", chart.chartTarget) ===
                  undefined && <></>}
                {chart.chartTarget &&
                  pair?.ftoStatusDisplay?.status == "success" && (
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
      </div>
    );
  }
);

export default Tabs;
