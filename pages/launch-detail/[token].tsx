import { useRouter } from "next/router";
import { useReadContract } from "wagmi";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import launchpad from "@/services/launchpad";
import { Logo } from "@/components/svg/logo";
import { formatEther, erc20Abi } from "viem";
import { NextLayoutPage } from "@/types/nextjs";
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

const LauchPage: NextLayoutPage = observer(() => {
  const [info, setInfo] = useState<PairInfo>();
  const router = useRouter();
  const { token: pairAddresss } = router.query;

  const { data: launchedTokenName } = useReadContract({
    abi: erc20Abi,
    address: info?.launchedTokenAddress,
    functionName: "name",
  });

  useEffect(() => {
    launchpad.getPairInfo(pairAddresss as `0x${string}`).then((info) => {
      setInfo(info);
    });
  }, []);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto">
      <div className="mt-[20px] grid grid-cols-3 gap-6">
        <div className="col-start-2 flex flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative">
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
            {launchedTokenName}
          </h4>
          <div className="flex items-center gap-6 text-white mt-2">
            <div className="flex flex-col items-center gap-1">
              <h6 className="opacity-50 text-xs">Timeline</h6>
              <div className="flex items-center gap-2 text-sm">
                <TimelineSvg />
                <span className="font-bold">{info?.timeline || "--"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <h6 className="opacity-50 text-xs">Total raised</h6>
              <div className="flex items-center gap-2 text-sm">
                <TotalRaisedSvg />
                <span className="font-bold">
                  {info?.depositedRaisedToken !== undefined
                    ? formatEther(info.depositedRaisedToken)
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
                  {info?.price || "--"} {info?.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LauchPage;
