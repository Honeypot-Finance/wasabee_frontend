import CardContianer from "@/components/CardContianer/CardContianer";
import { LaunchCard } from "@/components/LaunchCard";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import TokenBalanceCard from "@/components/TokenBalanceCard/TokenBalanceCard";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import HoneyStickSvg from "@/components/svg/HoneyStick";
import { PeddingSvg } from "@/components/svg/Pedding";
import { RocketSvg } from "@/components/svg/Rocket";
import { defaultContainerVariants, itemSlideVariants } from "@/lib/animation";
import { truncate } from "@/lib/format";
import { trpc, trpcClient } from "@/lib/trpc";
import { networksMap } from "@/services/chain";
import { PairContract } from "@/services/contract/pair-contract";
import { GhostPair } from "@/services/indexer/indexerTypes";
import launchpad from "@/services/launchpad";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const Profile = observer(() => {
  const { chainId } = useAccount();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    if (!liquidity.isInit) {
      liquidity.initPool();
      return;
    }
    launchpad.showNotValidatedPairs = true;
    launchpad.myFtoPairs.call();
    launchpad.getMyFtoParticipatedPairs.call();
    liquidity.myPairPage.reloadPage();
  }, [wallet.isInit, liquidity.isInit]);

  return (
    <div className="m-auto flex justify-center items-start flex-col max-w-[800px] gap-2">
      <div>
        {wallet.isInit && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex h-10 w-10">
                <div
                  className="rounded-full w-full h-full "
                  style={{
                    backgroundImage: `linear-gradient(90deg, #${wallet.account
                      .substring(2, 8)
                      .toUpperCase()} 0%, #${wallet.account
                      .substring(
                        wallet.account.length - 6,
                        wallet.account.length
                      )
                      .toUpperCase()} 100%)`,
                  }}
                ></div>
              </div>
              <div className="grow">
                <p>My Account</p>
                <p className="w-full break-all">
                  {truncate(wallet.account, 10)} <Copy value={wallet.account} />
                </p>
              </div>
            </div>
            <div>
              <Link
                target="_blank"
                className="underline p-1"
                href={`https://bartio.beratrail.io/address/${wallet.account}`}
              >
                View on beratrail.io
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent flex-wrap sm:flex-nowrap",
            tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
        >
          <Tab key="portfolio" title="Portfolio">
            <Card className="next-card">
              <CardBody className="">
                <motion.div
                  variants={defaultContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {wallet?.currentChain?.faucetTokens &&
                    wallet?.currentChain?.faucetTokens?.map((token) => (
                      <motion.div
                        variants={itemSlideVariants}
                        key={token.address}
                      >
                        <TokenBalanceCard
                          token={token}
                          autoSize
                        ></TokenBalanceCard>
                      </motion.div>
                    ))}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="my-launch" title="My Launch">
            <Card className="next-card">
              <CardBody>
                <motion.div
                  variants={defaultContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {launchpad.myFtoPairs.loading ? (
                    <LoadingDisplay />
                  ) : launchpad.myFtoPairs.value?.data.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                      <HoneyStickSvg />
                      <div className="text-[#eee369] mt-2  text-[3rem] text-center">
                        List is empty
                      </div>
                    </div>
                  ) : (
                    launchpad.myFtoPairs.value?.data.map((project) => (
                      <LaunchCard
                        key={project.address}
                        pair={project}
                        action={
                          <div className="flex">
                            <Link
                              href={`/launch-detail/${project.address}`}
                              className="text-black font-bold w-full px-[8px]"
                            >
                              <Button className="w-full">View Token</Button>
                            </Link>
                            {project.ftoState === 0 && (
                              <Link
                                href={`/swap?inputCurrency=${project.launchedToken?.address}&outputCurrency=${project.raiseToken?.address}`}
                                className="text-black font-bold w-full px-[8px]"
                              >
                                <Button className="w-full">
                                  <p>Swap Token</p>
                                  <p>
                                    <Copy
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                      className=" absolute ml-[8px] top-[50%] translate-y-[-50%]"
                                      value={`${window.location.origin}/swap?inputCurrency=${project.launchedToken?.address}&outputCurrency=${project.raiseToken?.address}`}
                                    ></Copy>
                                  </p>
                                </Button>{" "}
                              </Link>
                            )}
                          </div>
                        }
                      />
                    ))
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="participated-launch" title="Participated Launch">
            <Card className="next-card">
              <CardBody>
                <motion.div
                  variants={defaultContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {launchpad.myFtoPairs.loading ? (
                    <LoadingDisplay />
                  ) : launchpad.getMyFtoParticipatedPairs.value?.length ??
                    0 > 0 ? (
                    launchpad.getMyFtoParticipatedPairs.value?.map(
                      (project) => (
                        <LaunchCard
                          key={project.address}
                          pair={project}
                          action={
                            <div className="flex">
                              <Link
                                href={`/launch-detail/${project.address}`}
                                className="text-black font-bold w-full px-[8px]"
                              >
                                <Button className="w-full">View Token</Button>
                              </Link>
                              {project.ftoState === 0 && (
                                <Link
                                  href={`/swap?inputCurrency=${project.launchedToken?.address}&outputCurrency=${project.raiseToken?.address}`}
                                  className="text-black font-bold w-full px-[8px]"
                                >
                                  <Button className="w-full">
                                    <p>Swap Token</p>
                                    <p>
                                      <Copy
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                        className=" absolute ml-[8px] top-[50%] translate-y-[-50%]"
                                        value={`${window.location.origin}/swap?inputCurrency=${project.launchedToken?.address}&outputCurrency=${project.raiseToken?.address}`}
                                      ></Copy>
                                    </p>
                                  </Button>{" "}
                                </Link>
                              )}
                            </div>
                          }
                        />
                      )
                    )
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <HoneyStickSvg />
                      <div className="text-[#eee369] mt-2  text-[3rem] text-center">
                        List is empty
                      </div>
                    </div>
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="my-pools" title="My Pools">
            <Card className="next-card">
              <CardBody>
                <motion.div
                  variants={defaultContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {liquidity.isInit ? (
                    liquidity.myPairPage.pageItems.value.length > 0 ? (
                      liquidity.myPairPage.pageItems.value.map((pair) => (
                        <motion.div
                          variants={itemSlideVariants}
                          key={pair.address}
                        >
                          <PoolLiquidityCard
                            showMyLiquidity={true}
                            pair={pair}
                            autoSize
                          ></PoolLiquidityCard>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <HoneyStickSvg />
                        <div className="text-[#eee369] mt-2  text-[3rem] text-center">
                          List is empty
                        </div>
                      </div>
                    )
                  ) : (
                    <LoadingDisplay />
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});

export default Profile;
