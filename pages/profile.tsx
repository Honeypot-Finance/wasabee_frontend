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
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import TokenBalanceCard from "@/components/TokenBalanceCard/TokenBalanceCard";
import { PriceChart } from "@/components/PriceChart/PriceChart";
import { UTCTimestamp } from "lightweight-charts";

const MyLaunchTab = observer(() => {
  const [myProjects, setMyProjects] = useState<Pot2PumpService>();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    const newPumpingProjects = new Pot2PumpService();
    setMyProjects(newPumpingProjects);
    newPumpingProjects.myLaunches.reloadPage();
  }, [wallet.isInit]);

  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex">
          {/* <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "fto"}
            className={
              launchpad.currentLaunchpadType.value === "fto"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.setCurrentLaunchpadType("fto");
              launchpad.myLaunches.reloadPage();
            }}
          >
            FTO
          </NextButton> */}
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.setCurrentLaunchpadType("meme");
              launchpad.myLaunches.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>
        {myProjects && (
          <Pagination
            paginationState={myProjects.myLaunches}
            render={(project) => (
              <LaunchCardV3
                key={project.address}
                pair={project}
                action={<></>}
              />
            )}
            classNames={{
              base: "",
              itemsContainer: "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
              item: "",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
});

const ParticipatedLaunchTab = observer(() => {
  const [myProjects, setMyProjects] = useState<Pot2PumpService>();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    const newPumpingProjects = new Pot2PumpService();
    setMyProjects(newPumpingProjects);
    newPumpingProjects.participatedPairs.reloadPage();
  }, [wallet.isInit]);

  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex">
          {/* <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "fto"}
            className={
              launchpad.currentLaunchpadType.value === "fto"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.currentLaunchpadType.setValue("fto");
              launchpad.participatedPairs.reloadPage();
            }}
          >
            FTO
          </NextButton> */}
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.currentLaunchpadType.setValue("meme");
              launchpad.participatedPairs.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>{" "}
        {myProjects && (
          <Pagination
            paginationState={myProjects.participatedPairs}
            render={(project) => (
              <LaunchCardV3
                key={project.address}
                pair={project}
                action={<></>}
              />
            )}
            classNames={{
              base: "",
              itemsContainer: "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
              item: "",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
});

const PoolsTab = observer(() => {
  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex w-full items-center">
          <div className="hidden md:flex w-full justify-between text-[#FAFAFC] gap-[0.5rem]">
            <div className="w-full">
              <h2 className="ml-[1rem] opacity-65 ">Pool</h2>
            </div>
            <div className="w-full flex">
              <h2 className=" opacity-65">Your Reserves</h2>
            </div>
            <div className="w-full flex ">
              <h2 className=" opacity-65">Asset Market Value</h2>
            </div>
          </div>
          <div className="flex justify-end w-[8rem]">
            <Link
              href={"https://tryghost.xyz/log"}
              target="_blank"
              className="flex p-2 gap-2 items-center"
            >
              <Image
                className="h-4"
                src="/images/partners/powered_by_ghost_light.png"
                alt=""
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        <OldPagination
          paginationState={liquidity.myPairPage}
          render={(pair) => (
            <PoolLiquidityCard
              showMyLiquidity={true}
              pair={pair}
              autoSize
            ></PoolLiquidityCard>
          )}
          classNames={{
            base: "",
            itemsContainer: "",
            item: "",
          }}
        />
      </CardBody>
    </Card>
  );
});

const PortfolioTab = observer(() => {
  return (
    <Card className="bg-[#1C1C1C] border-none">
      <CardBody className="p-0">
        <table className="w-full">
          <thead className="bg-[#323232] text-white">
            <tr>
              <th className="py-4 px-6 text-left">Asset</th>
              <th className="py-4 px-6 text-right">Price</th>
              <th className="py-4 px-6 text-right">Balance</th>
              <th className="py-4 px-6 text-right">Proportion</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D2D2D]">
            {wallet?.currentChain?.validatedTokens
              ?.filter((token) => token.balance.toNumber() > 0)
              .map((token) => (
                <TokenBalanceCard key={token.address} token={token} />
              ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
});

export const Profile = observer(() => {
  const { chainId } = useAccount();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "1Y">("1D");

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

  const chartData = {
    "1D": [
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.2,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1W": [
      {
        time: Math.floor(
          new Date("2024-01-06").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-07").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.2,
      },
      {
        time: Math.floor(
          new Date("2024-01-08").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
      {
        time: Math.floor(
          new Date("2024-01-09").getTime() / 1000
        ) as UTCTimestamp,
        value: 39.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-10").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-11").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1M": [
      {
        time: Math.floor(
          new Date("2023-12-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 36.5,
      },
      {
        time: Math.floor(
          new Date("2023-12-17").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.2,
      },
      {
        time: Math.floor(
          new Date("2023-12-22").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.9,
      },
      {
        time: Math.floor(
          new Date("2023-12-27").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2024-01-01").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2024-01-06").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
    "1Y": [
      {
        time: Math.floor(
          new Date("2023-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 35.5,
      },
      {
        time: Math.floor(
          new Date("2023-03-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 36.2,
      },
      {
        time: Math.floor(
          new Date("2023-05-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 37.9,
      },
      {
        time: Math.floor(
          new Date("2023-07-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.5,
      },
      {
        time: Math.floor(
          new Date("2023-09-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.7,
      },
      {
        time: Math.floor(
          new Date("2023-11-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.4,
      },
      {
        time: Math.floor(
          new Date("2024-01-12").getTime() / 1000
        ) as UTCTimestamp,
        value: 38.9,
      },
    ],
  };

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

                <div className="flex  gap-2">
                  <span className="text-[#FAFAFC] text-[48px] leading-none">
                    $38.9
                  </span>
                  <div>
                    <span className="text-[#FAFAFC]/60 text-sm ml-1">
                      {timeRange}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#FF5555] text-sm">-$0.5531</span>
                      <span className="text-[#FF5555] text-sm">(-1.41%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[300px] flex flex-col gap-2">
                <div
                  className="h-30 w-full rounded-lg overflow-hidden"
                  ref={chartContainerRef}
                >
                  <PriceChart
                    data={chartData[timeRange]}
                    width={300}
                    height={120}
                    timeRange={timeRange}
                  />
                </div>
                <div className="flex items-center justify-end gap-6">
                  {(["1D", "1W", "1M", "1Y"] as const).map((range) => (
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
                <MyLaunchTab />
              </Tab>
              <Tab key="participated-launch" title="Participated Launch">
                <ParticipatedLaunchTab />
              </Tab>
              <Tab key="my-pools" title="My Pools">
                <PoolsTab />
              </Tab>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
});

export default Profile;
