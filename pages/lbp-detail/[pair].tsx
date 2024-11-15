import { Divider, Progress } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "@/components/svg/CopyIcon";
import CalenderIcon from "@/components/svg/CalenderIcon";
import { cn } from "@/lib/tailwindcss";
import TokenInfo from "./components/TokenInfo";
import BuySell from "./components/BuySell";
import { useRouter } from "next/router";
import { Address, formatUnits, isAddress } from "viem";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";
import { BigNumber } from "ethers";
import useMulticall3 from "@/components/hooks/useMulticall3";
import {
  formatErc20Data,
  formatLBPPoolData,
  Pool,
} from "@/services/lib/helper";
import { ERC20ABI } from "@/lib/abis/erc20";
import dayjs from "dayjs";

const RankProjectData = [
  { icon: "🚀", value: 10 },
  { icon: "🔥", value: 10 },
  { icon: "💩", value: 10 },
  { icon: "🚩", value: 10 },
];

const ProjectDetailTabs = [
  { title: "Token Info", key: 1 },
  { title: "About the Project", key: 2 },
  { title: "Transactions", key: 3 },
];

const LBPDetail = () => {
  const router = useRouter();
  const { pair: pairAddress } = router.query;

  // lay co buy sell tu contract
  const { data } = useMulticall3({
    queryKey: [pairAddress],
    contractCallContext: [
      {
        abi: LiquidityBootstrapPoolABI as any,
        reference: "LiquidityBootstrapPool",
        contractAddress: pairAddress as Address,
        calls: [
          { methodName: "args", reference: "args", methodParameters: [] },
          {
            methodName: "totalAssetsIn",
            reference: "totalAssetsIn",
            methodParameters: [],
          },
        ],
      },
    ],
    select: (data: any) => {
      const result: { args: Pool | {}; totalAssetsIn: BigInt } = {
        args: {},
        totalAssetsIn: BigInt(0),
      };
      data.LiquidityBootstrapPool.callsReturnContext.forEach((data: any) => {
        if (data.reference === "args") {
          result.args = formatLBPPoolData(data.returnValues ?? []);
        } else if (data.reference === "totalAssetsIn") {
          result.totalAssetsIn = BigNumber.from(
            data?.returnValues?.[0]?.hex ?? 0
          ).toBigInt();
        }
      });

      console.log(result);

      return result;
    },
  });

  const { data: tokenData } = useMulticall3({
    queryKey: ["erc20", data?.args?.shares],
    contractCallContext: [
      {
        reference: "erc20",
        contractAddress: data?.args?.shares,
        abi: ERC20ABI as any,
        calls: [
          { reference: "name", methodName: "name", methodParameters: [] },
          { reference: "symbol", methodName: "symbol", methodParameters: [] },
          {
            reference: "decimals",
            methodName: "decimals",
            methodParameters: [],
          },
          {
            reference: "totalSupply",
            methodName: "totalSupply",
            methodParameters: [],
          },
        ],
      },
    ],
    enabled: Boolean(data?.args?.shares),
  });

  const { data: assetTokenData } = useMulticall3({
    queryKey: ["assetTokenData", data?.args?.asset],
    contractCallContext: [
      {
        reference: "erc20",
        contractAddress: data?.args?.asset,
        abi: ERC20ABI as any,
        calls: [
          { reference: "name", methodName: "name", methodParameters: [] },
          { reference: "symbol", methodName: "symbol", methodParameters: [] },
          {
            reference: "decimals",
            methodName: "decimals",
            methodParameters: [],
          },
          {
            reference: "totalSupply",
            methodName: "totalSupply",
            methodParameters: [],
          },
        ],
      },
    ],
    enabled: Boolean(data?.args?.asset),
  });

  const token = formatErc20Data(
    tokenData?.results?.erc20?.callsReturnContext ?? []
  );

  const assetToken = formatErc20Data(
    assetTokenData?.results?.erc20?.callsReturnContext ?? []
  );

  useEffect(() => {
    if (!isAddress((pairAddress as Address) ?? "")) {
      router.push("/");
    }
  }, [pairAddress]);
  const [activeProjectDetailTab, setActiveProjectDetailTab] = useState<
    1 | 2 | 3
  >(1);

  const onChangeTab = (tab: 1 | 2 | 3) => {
    if (tab !== activeProjectDetailTab) {
      setActiveProjectDetailTab(tab);
    }
  };


  const percentOfTokenSold =
    data?.args?.maxTotalAssetsIn && data?.totalAssetsIn
      ? (+formatUnits(data.args.maxTotalAssetsIn, assetToken.decimals) /
          +formatUnits(data.totalAssetsIn, assetToken.decimals)) *
        100
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-1 flex flex-col">
      <div className="flex flex-col gap-4 md:flex-row rounded-[30px] bg-[#271A0C] px-[20px] py-2.5 items-center">
        <div className="flex gap-2 flex-1">
          <div className="w-[78px] h-[78px] rounded-full relative">
            <Image
              src="/images/icons/tokens/thpot-token-yellow-icon.png"
              alt="token image"
              fill
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold">{token?.name}</div>
            <div className="text-2xl font-bold text-[#FFFFFF8C]">
              {token?.symbol}
            </div>
          </div>
        </div>
        <div className="flex-1 px-5 gap-4 sm:gap-20 flex max-sm:flex-col ">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-[21px] leading-[26px] bg-gradient-to-b from-[#F7931A] to-[#FCD729] w-fit text-transparent bg-clip-text">
              Ends In
            </div>
            <div>
              <Countdown
                date={BigNumber.from(data?.args?.saleEnd ?? 0).toString()}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  return (
                    <div className="font-bold text-[28px] flex items-center gap-5">
                      <div className="flex flex-col text-center gap-[5px]">
                        <span className="leading-[36px]">
                          {days > 0 ? days : "00"}
                        </span>
                        <span className="text-[12px] leading-4 text-[#FFFFFF70]">
                          {days > 1 ? "Days" : "Day"}
                        </span>
                      </div>
                      <div>:</div>
                      <div className="flex flex-col text-center gap-[5px]">
                        <span className="leading-[36px]">
                          {hours > 0 ? hours : "00"}
                        </span>
                        <span className="text-[12px] leading-4 text-[#FFFFFF70]">
                          {hours > 1 ? "Hours" : "Hour"}
                        </span>
                      </div>
                      <div>:</div>
                      <div className="flex flex-col text-center gap-[5px]">
                        <span className="leading-[36px]">
                          {minutes > 0 ? minutes : "00"}
                        </span>
                        <span className="text-[12px] leading-4 text-[#FFFFFF70]">
                          {minutes > 1 ? "Minutes" : "Minute"}
                        </span>
                      </div>
                      <div>:</div>
                      <div className="flex flex-col text-center gap-[5px]">
                        <span className="leading-[36px]">
                          {seconds > 0 ? seconds : "00"}
                        </span>
                        <span className="text-[12px] leading-4 text-[#FFFFFF70]">
                          {seconds > 1 ? "Secs" : "Sec"}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-[#43D9A31A] size-9 rounded-full">
              <div className="bg-[#43D9A3] size-4 rounded-full" />
            </div>
            <div className="text-[22px] leading-7 font-bold">Live Now</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="bg-[#271B0C] p-5 rounded-2xl flex-1  flex flex-col gap-2.5">
          <div>
            <div className="text-base leading-5 font-bold text-[#FFFFFFA8]">
              Total Raised
            </div>
            <div className="w-fit bg-gradient-to-b from-[#F7931A] to-[#FCD729] text-transparent bg-clip-text">
              <span className="leading-[30px] text-[23px] font-bold">
                $200,000
              </span>
              <span className="font-normal text-[17px] leading-[22px]">
                /$200,000
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm leading-[18px] font-medium">
              Sale progress
            </div>
            <Progress
              size="md"
              aria-label="Loading..."
              value={+percentOfTokenSold}
              classNames={{
                track: "h-4 bg-[#9D5E28]",
                indicator: "bg-gradient-to-b from-[#F7931A] to-[#FCD729]",
              }}
            />
            <div className="flex justify-between items-center">
              <div>{percentOfTokenSold} of tokens sold</div>
              <div className="font-medium text-base leading-5 text-[#ffcd4d]">
                {Number(data?.totalAssetsIn)}
                <span className="text-[12px] leading-4 text-white">
                  /{data?.args?.maxTotalAssetsIn}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm leading-[18px] font-medium">
              Token address
            </div>
            <div className="flex justify-between p-3 bg-[#3B2912] text-[#FFFFFFA8] rounded-[10px] items-center">
              {data?.args?.share}
              <CopyToClipboard text={data?.args?.share}>
                <button>
                  <CopyIcon />
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="text-center flex flex-col gap-2">
              <div className="text-[12px] leading-4 font-normal">
                Token Price
              </div>
              <div className="text-base leading-5 font-medium">$0.0008</div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <div className="text-[12px] leading-4 font-normal">
                Funds Raised
              </div>
              <div className="text-base leading-5 font-medium">
                {Number(data?.totalAssetsIn ?? 0)}
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <div className="text-[12px] leading-4 font-normal">
                Full Diluted Value
              </div>
              <div className="text-base leading-5 font-medium">
                {data?.args?.maxTotalAssetsInDeviation}
              </div>
            </div>
            <div className="text-left flex flex-col gap-2">
              <div className="flex gap-1">
                <CalenderIcon />{" "}
                <span className="text-[12px] leading-4 font-normal">
                  Start Date
                </span>
              </div>
              <div className="text-base leading-5 font-medium">
                {dayjs
                  .unix(Number(data?.args?.saleEnd ?? 0))
                  .format("MMMM D, YYYY")}
              </div>
            </div>
            <div className="text-left flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <CalenderIcon />{" "}
                <span className="text-[12px] leading-4 font-normal">
                  End Date
                </span>
              </div>
              <div className="text-base leading-5 font-medium">
                {dayjs
                  .unix(Number(data?.args?.saleEnd ?? 0))
                  .format("MMMM D, YYYY")}
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="text-sm leading-[18px] font-medium">
              Rank Project
            </div>
            <div className="flex gap-4">
              {RankProjectData.map((project, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center bg-[#3B2912] rounded-lg h-[60px] flex-1 flex-col gap-[5px] "
                >
                  <div className="size-[19px]">{project.icon}</div>
                  <div className="font-medium text-[10px] leading-[13px]">
                    {project.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#271B0C] rounded-2xl flex-1 items-center">
          <BuySell
            asset={{
              decimals: assetToken.decimals,
              name: assetToken.name,
              symbol: assetToken.symbol,
              totalSupply: assetToken.totalSupply,
              address: data?.args?.asset as Address,
            }}
            share={{
              decimals: token.decimals,
              name: token.name,
              symbol: token.symbol,
              totalSupply: token.totalSupply,
              address: data?.args?.share as Address,
            }}
            poolAddress={pairAddress as Address}
            allowSell={Boolean(data?.args?.sellingAllowed)}
          />
        </div>
      </div>
      <div className="mt-12">
        <div className="flex justify-between">
          <div className="text-[28px] leading-9 font-bold">Project Details</div>
          <div className="text-[28px] leading-8 font-normal text-[#FFCD4D]">
 PROTOCOL
          </div>
        </div>
        <div className="mt-12">
          <div className="flex w-fit gap-1">
            {ProjectDetailTabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => onChangeTab(tab.key as 1 | 2 | 3)}
                className={cn(
                  "px-11 py-2 pb-[5px] bg-[#3B2712] text-base leading-5 font-normal text-[#A46617] rounded-t-2xl cursor-pointer",
                  {
                    "bg-[#9D5E28] text-white":
                      activeProjectDetailTab === tab.key,
                  }
                )}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <div className="bg-[#211708] rounded-b-[20px] rounded-e-[20px] h-[545px] px-[38px] py-[64px]">
            {activeProjectDetailTab === 1 && (
              <TokenInfo token={token} tokenAddress={data?.args?.share} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LBPDetail;
