import Link from "next/link";
import { useReadContract } from "wagmi";
import { observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { formatEther, erc20Abi } from "viem";
import { Button } from "@/components/button";
import { Logo } from "@/components/svg/logo";
import launchpad from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { RocketSvg } from "@/components/svg/Rocket";
import { PeddingSvg } from "@/components/svg/Pedding";
import { TimelineSvg } from "@/components/svg/Timeline";
import { TokenPriceSvg } from "@/components/svg/TokenPrice";
import { TotalRaisedSvg } from "@/components/svg/TotalRaised";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { AmountFormat } from "@/components/AmountFormat";
import { Copy } from "@/components/copy";
import { LaunchCard } from "@/components/LaunchCard";
import { Pagination, Tab, Tabs } from "@nextui-org/react";

const LaunchPage: NextLayoutPage = observer(() => {
  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.ftoPairs.call({
      page: launchpad.ftoPairsPagination.page,
      limit: launchpad.ftoPairsPagination.limit,
    });
    launchpad.myFtoPairs.call();
  }, [wallet.isInit]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex flex-col gap-16">
      <div className="flex w-full justify-end gap-2">
        {/* <Button>
          <a
            target="_blank"
            href={wallet.faucetUrl}
            className="text-black font-bold"
          >
            Get Faucet
          </a>
        </Button> */}
        <Button>
          <Link href="/launch-token" className="text-black font-bold">
            Launch Token
          </Link>
        </Button>
      </div>

      {launchpad.ftoPairs.loading ? (
        <div className="flex h-[566px] max-w-full w-[583px] justify-center items-center [background:#121212] rounded-[54px]  mx-auto">
          <div className="flex flex-col items-center">
            <div className="relative">
              <PeddingSvg />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <RocketSvg />
              </div>
            </div>
            <div className="text-gold-primary mt-[59px] font-bold">
              Token List Loading...
            </div>
            <div className="text-[#868B9A] mt-2 w-[250px] text-xs text-center">
              Waiting for the token list to be generated
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Tabs
            aria-label="Options"
            classNames={{
              tabList: "bg-transparent",
              tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
            }}
            className="next-tab"
          >
            <Tab key="all" title="All Projects">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3">
                {launchpad.ftoPairs.value?.data.map((pair: FtoPairContract) => (
                  <div key={pair.address}>
                    <LaunchCard
                      pair={pair}
                      action={
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Link
                            href={`/launch-detail/${pair.address}`}
                            className="text-black font-bold w-full px-[8px]"
                          >
                            <Button className="w-full">View Token</Button>
                          </Link>
                          {pair.ftoState === 0 && (
                            <Link
                              href={`/swap?inputCurrency=${pair.launchedToken.address}&outputCurrency=${pair.raiseToken.address}`}
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
                                    value={`${window.location.origin}/swap?inputCurrency=${pair.launchedToken.address}&outputCurrency=${pair.raiseToken.address}`}
                                  ></Copy>
                                </p>
                              </Button>{" "}
                            </Link>
                          )}
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
              <Pagination
                className="flex justify-center mt-[12px]"
                total={launchpad.ftoPairsPagination.totalPage}
                page={launchpad.ftoPairsPagination.page}
                initialPage={launchpad.ftoPairsPagination.page}
                onChange={(page) => {
                  launchpad.ftoPairsPagination.onPageChange(page);
                  launchpad.ftoPairs.call({
                    page,
                    limit: launchpad.ftoPairsPagination.limit,
                  });
                }}
              />
            </Tab>
            <Tab key="my" title="My Projects">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3">
                {launchpad.myFtoPairs.value?.data.map(
                  (pair: FtoPairContract) => (
                    <div key={pair.address}>
                      <LaunchCard
                        pair={pair}
                        action={
                          <Link
                            href={`/launch-detail/${pair.address}`}
                            className="text-black font-bold w-full px-[8px]"
                          >
                            <Button className="w-full">View Token</Button>
                          </Link>
                        }
                      />
                    </div>
                  )
                )}
              </div>
              {/* <Pagination
                className="flex justify-center mt-[12px]"
                total={launchpad.ftoPairsPagination.totalPage}
                page={launchpad.ftoPairsPagination.page}
                initialPage={launchpad.ftoPairsPagination.page}
                onChange={(page) => {
                  launchpad.ftoPairsPagination.onPageChange(page);
                  launchpad.ftoPairs.call({
                    page,
                    limit: launchpad.ftoPairsPagination.limit,
                  });
                }}
              /> */}
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
});

export default LaunchPage;
