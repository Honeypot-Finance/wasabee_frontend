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

interface PairInfo {
  price: string;
  symbol: string;
  timeline: string;
  depositedRaisedToken: bigint;
  launchedTokenAddress: `0x${string}`;
}

// const usePairInfo = (pairAddress: `0x${string}`) => {
//   const [pairInfo, setPairInfo] = useState<PairInfo>();
//   useEffect(() => {
//     const fetchPairInfo = async () => {
//       const pairInfo = await launchpad.getPairInfo(pairAddress);
//       setPairInfo(pairInfo);
//     };

//     fetchPairInfo();
//   }, [pairAddress]);

//   return pairInfo;
// };

const LaunchPage: NextLayoutPage = observer(() => {
  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.ftoPairs.call();
  }, [wallet.isInit]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex flex-col gap-16">
      <div className="flex w-full justify-end gap-2">
        <Button>
          <a
            target="_blank"
            href={wallet.faucetUrl}
            className="text-black font-bold"
          >
            Get Faucet
          </a>
        </Button>
        <Button>
          <Link href="/launch-token" className="text-black font-bold">
            Launch Token
          </Link>
        </Button>
      </div>

      {launchpad.ftoPairs.loading ? (
        <div className="flex h-[566px] w-[583px] justify-center items-center [background:#121212] rounded-[54px]  mx-auto">
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
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3">
          {launchpad.ftoPairs.value?.map((pair: FtoPairContract) => (
            <div key={pair.address}>
              <LaunchCard
                pair={pair}
                action={
                  <Button>
                    <Link
                      href={`/launch-detail/${pair.address}`}
                      className="text-black font-bold"
                    >
                      View Token
                    </Link>
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default LaunchPage;
