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

interface PairInfo {
  price: string;
  symbol: string;
  timeline: string;
  depositedRaisedToken: bigint;
  launchedTokenAddress: `0x${string}`;
}

const usePairInfo = (pairAddress: `0x${string}`) => {
  const [pairInfo, setPairInfo] = useState<PairInfo>();
  useEffect(() => {
    const fetchPairInfo = async () => {
      const pairInfo = await launchpad.getPairInfo(pairAddress);
      setPairInfo(pairInfo);
    };

    fetchPairInfo();
  }, [pairAddress]);

  return pairInfo;
};

const LaunchCard = observer(
  ({ pairAddress }: { pairAddress: `0x${string}` }) => {
    const pairInfo = usePairInfo(pairAddress);

    const { data: launchedTokenName } = useReadContract({
      abi: erc20Abi,
      address: pairInfo?.launchedTokenAddress,
      functionName: "name",
    });

    return (
      <div className="flex flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative">
        <div className="flex w-[72px] h-[29px] justify-center items-center gap-[5px] absolute bg-[rgba(131,194,233,0.10)] rounded-[20px] right-2.5 top-[9px]">
          <div className="rounded-full bg-[#83C2E9] w-2 h-2"></div>
          <span className="text-ss text-[#83C2E9]">Live</span>
        </div>
        <div className="w-14 flex items-center justify-center rounded-lg bg-gold-primary aspect-square">
          <div className="w-8">
            <Logo />
          </div>
        </div>
        <h4 className="text-white text-center [text-2xl font-bold">
          {launchedTokenName || "--"}
        </h4>
        <div className="flex items-center gap-6 text-white mt-2">
          <div className="flex flex-col items-center gap-1">
            <h6 className="opacity-50 text-xs">Timeline</h6>
            <div className="flex items-center gap-2 text-sm">
              <TimelineSvg />
              <span className="font-bold">{pairInfo?.timeline || "--"}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <h6 className="opacity-50 text-xs">Total raised</h6>
            <div className="flex items-center gap-2 text-sm">
              <TotalRaisedSvg />
              <span className="font-bold">
                {pairInfo?.depositedRaisedToken !== undefined
                  ? formatEther(pairInfo.depositedRaisedToken)
                  : "--"}
                &nbsp;USD
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <h6 className="opacity-50 text-xs">Token Price</h6>
            <div className="flex items-center gap-2 text-sm">
              <TokenPriceSvg />
              <span className="font-bold">
                {pairInfo?.price || "--"} {pairInfo?.symbol}
              </span>
            </div>
          </div>
        </div>
        <Button>
          <Link
            href={`/launch-detail/${pairAddress}`}
            className="text-black font-bold"
          >
            View Token
          </Link>
        </Button>
      </div>
    );
  }
);

const LauchPage: NextLayoutPage = observer(() => {
  const [loading, setLoading] = useState(true);
  // const [list, setList] = useState<LaunchCardProps[]>([]);
  const [list, setList] = useState<`0x${string}`[]>([]);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.allPairsLength().then(async ([pairsLength, error]) => {
      if (error) {
        throw error;
      }
      const list: `0x${string}`[] = [];
      for (let i = 0; i < Number(pairsLength); i++) {
        const [pairAddress] = await launchpad.getPairAddress(BigInt(i));
        // const info = await launchpad.getPairInfo(pairAddresss as `0x${string}`);
        // list.push({ ...info, pairAddresss: pairAddresss as `0x${string}` });
        list.push(pairAddress as `0x${string}`);
      }

      setList(list);
      setLoading(false);
    });
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

      {loading ? (
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
          {/* {list.map((info) => (
            <div key={info.pairAddresss}>
              <LaunchCard {...info} />
            </div>
          ))} */}
          {list.map((pairAddress) => (
            <div key={pairAddress}>
              <LaunchCard pairAddress={pairAddress} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default LauchPage;
