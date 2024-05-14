import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";
import { Logo } from "../svg/logo";
import { Copy } from "@/components/copy";
import { TimelineSvg } from "@/components/svg/Timeline";
import { TotalRaisedSvg } from "@/components/svg/TotalRaised";
import { TokenPriceSvg } from "@/components/svg/TokenPrice";
import { AmountFormat } from "@/components/AmountFormat";
import { Button } from "@/components/button";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/tailwindcss";

export const LaunchCard = observer(({ pair, action, className, ...props }: { pair?: FtoPairContract | null; action: React.ReactNode } & Partial<HTMLAttributes<any>>) => {
  return (
    <div className={cn("flex flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative", className)} {...props}>
      <div className="flex px-[8px] h-[29px] justify-center items-center gap-[5px] absolute bg-[rgba(131,194,233,0.10)] rounded-[20px] right-2.5 top-[9px]">
        <div className="rounded-full bg-[#83C2E9] w-2 h-2"></div>
        <span className="text-ss text-[#83C2E9]">{pair?.ftoStatusAction?.status}</span>
      </div>
      <div className="w-14 flex items-center justify-center rounded-lg bg-gold-primary aspect-square">
        <div className="w-8">
          <Logo />
        </div>
      </div>
      <h4 className="text-white text-center text-[1rem] font-bold flex items-center">
        <div className=" relative">
        {pair?.launchedToken.displayName}
        {pair?.launchedToken.displayName && <Copy className=" absolute ml-[8px] top-[50%] translate-y-[-50%]" value={pair.launchedToken.address}></Copy>}
        </div>
      </h4>
      <div className="flex items-center gap-6 text-white mt-2 justify-between w-full">
        <div className="flex flex-col items-center gap-1">
          <h6 className="opacity-50 text-xs">Timeline</h6>
          <div className="flex items-center gap-2 text-sm">
            {/* <TimelineSvg /> */}
            <span className="font-bold">{pair?.remainTime}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h6 className="opacity-50 text-xs">Total raised</h6>
          <div className="flex items-center gap-2 text-sm">
            {/* <TotalRaisedSvg /> */}
            <span className="font-bold">
              {pair?.depositedRaisedToken?.toFormat(3)}&nbsp;
              {pair?.raiseToken.displayName}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h6 className="opacity-50 text-xs">Token Price</h6>
          <div className="flex items-center gap-2 text-sm">
            {/* <TokenPriceSvg /> */}
            <span className="font-bold">
              <AmountFormat amount={pair?.price?.toFixed()}></AmountFormat>{" "}
              {pair?.raiseToken.displayName}
            </span>
          </div>
        </div>
      </div>
      {action}
    </div>
  );
});
