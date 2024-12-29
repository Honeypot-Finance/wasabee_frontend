import { LaunchCard } from "@/components/LaunchCard";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import Pagination from "@/components/Pagination/Pagination";
import OldPagination from "@/components/Pagination/OldPagination";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import { Copy } from "@/components/copy";
import { defaultContainerVariants, itemSlideVariants } from "@/lib/animation";
import { truncate } from "@/lib/format";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { Pot2PumpService } from "@/services/launchpad/pot2pump";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
  Button as NextButton,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { MyLaunches } from "./MyLaunches";
import ParticipatedLaunches from "./ParticipatedLaunches";
import { MyPools } from "./MyPools";
import PortfolioTab from "./Portfolio";
import { ProtfolioBalanceChart } from "./ProtfolioBalanceChart";
import { portfolio } from "@/services/portfolio";
import {
  getLiquidatorDatas,
  UserPoolProfit,
} from "@/lib/algebra/graphql/clients/userProfit";
import { LiquidatorDataQuery } from "@/lib/algebra/graphql/generated/graphql";
import { formatAmount } from "@/lib/algebra/utils/common/formatAmount";

export const Profile = observer(() => {
  const { chainId } = useAccount();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M">("1D");
  const [userPoolsProfit, setUserPoolsProfit] = useState<UserPoolProfit[]>([]);

  useEffect(() => {
    if (wallet.account) {
      getLiquidatorDatas(wallet.account).then((data) => {
        setUserPoolsProfit(data);
      });
    }
  }, [wallet.account]);

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    if (!liquidity.isInit) {
      liquidity.initPool();
      return;
    }
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();
    launchpad.participatedPairs.reloadPage();
    liquidity.myPairPage.reloadPage();
  }, [wallet.isInit, liquidity.isInit]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 xl:px-0">
      <div className="flex flex-col gap-6">
        {wallet.isInit && (
          <>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12">
                    <div
                      className="rounded-full w-full h-full"
                      style={{
                        backgroundImage: `linear-gradient(90deg, #${wallet.account.substring(2, 8).toUpperCase()} 0%, #${wallet.account
                          .substring(
                            wallet.account.length - 6,
                            wallet.account.length
                          )
                          .toUpperCase()} 100%)`,
                      }}
                    ></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#FAFAFC] text-lg">My Account</p>
                    <div className="flex items-center gap-2">
                      <Link
                        target="_blank"
                        className="text-[#FAFAFC]/60 hover:text-[#FAFAFC] hover:underline transition-colors"
                        href={`https://bartio.beratrail.io/address/${wallet.account}`}
                      >
                        {truncate(wallet.account, 10)}
                      </Link>
                      <Copy value={wallet.account} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[#FAFAFC] text-[24px] leading-none p-2">
                    <span>Token Value: </span>
                    {formatAmount(portfolio.totalBalanceFormatted, 2)} USD
                  </span>
                  <span className="text-[#FAFAFC] text-[24px] leading-none p-2">
                    <span>Total LP Value: </span>
                    {formatAmount(
                      userPoolsProfit
                        .reduce((acc, curr) => acc + curr.totalValueUSD, 0)
                        .toFixed(2),
                      2
                    )}{" "}
                    USD
                  </span>
                  <span className="text-[#FAFAFC] text-[24px] leading-none p-2">
                    <span>Total LP Fees Gained: </span>
                    {formatAmount(
                      userPoolsProfit
                        .reduce((acc, curr) => acc + curr.collectedFeesUSD, 0)
                        .toFixed(2),
                      2
                    )}{" "}
                    USD
                  </span>
                </div>
              </div>

              <div className="w-[300px] flex flex-col gap-2">
                <div
                  className="h-30 w-full rounded-lg overflow-hidden"
                  ref={chartContainerRef}
                >
                  <ProtfolioBalanceChart
                    userPoolsProfits={userPoolsProfit}
                    timeRange={timeRange}
                  />
                </div>
                <div className="flex items-center justify-end gap-6">
                  {(["1D", "1W", "1M"] as const).map((range) => (
                    <span
                      key={range}
                      className={`text-sm cursor-pointer ${
                        timeRange === range
                          ? "text-[#FAFAFC]"
                          : "text-[#FAFAFC]/60 hover:text-[#FAFAFC]"
                      }`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Tabs
              aria-label="Options"
              classNames={{
                tabList: "bg-[#1C1C1C] p-1 rounded-lg gap-2",
                tab: "text-[#FAFAFC]/60 data-[selected=true]:text-[#FAFAFC] data-[selected=true]:bg-[#2D2D2D] rounded-lg px-4 py-2",
                cursor: "bg-[#2D2D2D]",
                panel: "pt-6",
              }}
            >
              <Tab key="portfolio" title="Portfolio">
                <PortfolioTab />
              </Tab>
              <Tab key="my-launch" title="My Launch">
                <MyLaunches />
              </Tab>
              <Tab key="participated-launch" title="Participated Launch">
                <ParticipatedLaunches />
              </Tab>
              <Tab key="my-pools" title="My Pools">
                <MyPools />
              </Tab>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
});

export default Profile;
