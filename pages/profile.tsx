import CardContianer from "@/components/CardContianer/CardContianer";
import { LaunchCard } from "@/components/LaunchCard";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import TokenBalanceCard from "@/components/TokenBalanceCard/TokenBalanceCard";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import { PeddingSvg } from "@/components/svg/Pedding";
import { RocketSvg } from "@/components/svg/Rocket";
import { trpc } from "@/lib/trpc";
import { networksMap } from "@/services/chain";
import { PairContract } from "@/services/contract/pair-contract";
import launchpad from "@/services/launchpad";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const Profile = observer(() => {
  const { chainId } = useAccount();
  const { data: pairsMap, isLoading } = trpc.pair.getPairs.useQuery(
    {
      chainId: chainId as number,
      blockAddress: networksMap[chainId as number].blacklist?.poolBlacklist,
    },
    {
      enabled: !!chainId,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    wallet.currentChain?.faucetTokens?.forEach((token) => {
      token.init();
    });
  }, []);

  useEffect(() => {
    if (pairsMap) {
      liquidity.initPool(
        Object.values(pairsMap),
        wallet?.currentChain?.validatedTokensInfo
      );
    }
  }, [pairsMap, wallet?.currentChain]);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.showNotValidatedPairs = true;
    launchpad.getFtoPairs.call();
    launchpad.getMyFtoPairs.call();
    launchpad.getMyFtoParticipatedPairs.call();
  }, [wallet.isInit]);

  return (
    <div className="m-auto flex justify-center items-center flex-col w-[800px]">
      <div>
        {wallet.isInit && (
          <>
            <div className="flex align-middle justify-center">
              <div className="flex h-10 w-10 mr-5 mt-1">
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
              <div>
                <p>My Account</p>
                <p>
                  {wallet.account} <Copy value={wallet.account} />
                </p>
              </div>
            </div>
            <div>
              <Link
                target="_blank"
                href={`https://bartio.beratrail.io/address/${wallet.account}`}
              >
                view on beratrail.io
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="w-full">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent ",
            tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
        >
          <Tab key="protfolio" title="Protfolio">
            <Card className="next-card">
              <CardBody className="">
                {wallet?.currentChain?.faucetTokens &&
                  wallet?.currentChain?.faucetTokens?.map((token) => (
                    <TokenBalanceCard
                      key={token.address}
                      token={token}
                      autoSize
                    ></TokenBalanceCard>
                  ))}
              </CardBody>
            </Card>
          </Tab>{" "}
          <Tab key="my-launch" title="My Launch">
            <Card className="next-card">
              <CardBody>
                {launchpad.ftoPairs.loading ? (
                  <LoadingDisplay />
                ) : (
                  launchpad.getMyFtoPairs.value?.map((project) => (
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
                              href={`/swap?inputCurrency=${project.launchedToken.address}&outputCurrency=${project.raiseToken.address}`}
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
                                    value={`${window.location.origin}/swap?inputCurrency=${project.launchedToken.address}&outputCurrency=${project.raiseToken.address}`}
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
              </CardBody>
            </Card>
          </Tab>
          <Tab key="participated-launch" title="Participated Launch">
            <Card className="next-card">
              <CardBody>
                {launchpad.ftoPairs.loading ? (
                  <LoadingDisplay />
                ) : (
                  launchpad.getMyFtoParticipatedPairs.value?.map((project) => (
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
                              href={`/swap?inputCurrency=${project.launchedToken.address}&outputCurrency=${project.raiseToken.address}`}
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
                                    value={`${window.location.origin}/swap?inputCurrency=${project.launchedToken.address}&outputCurrency=${project.raiseToken.address}`}
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
              </CardBody>
            </Card>
          </Tab>
          <Tab key="my-pools" title="My Pools">
            <Card className="next-card">
              <CardBody>
                {(liquidity.isInit &&
                  liquidity.myPairs.map((pair) => (
                    <PoolLiquidityCard
                      key={pair.address}
                      pair={pair}
                      autoSize
                    ></PoolLiquidityCard>
                  ))) || <LoadingDisplay />}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});

export default Profile;
