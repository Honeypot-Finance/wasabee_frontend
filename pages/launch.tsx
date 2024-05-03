import { liquidity } from "@/services/liquidity";
import { NextLayoutPage } from "@/types/nextjs";
import { observer, useLocalObservable } from "mobx-react-lite";
import Link from "next/link";
import { Logo } from "@/components/svg/logo";
import { TimelineSvg } from "@/components/svg/Timeline";
import { TotalRaisedSvg } from "@/components/svg/TotalRaised";
import { TokenPriceSvg } from "@/components/svg/TokenPrice";

const LauchPage: NextLayoutPage = observer(() => {
  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto">
      <div className="flex w-full">
        <Link href="/launch-token" className="ml-auto border-[rgba(225,138,32,0.40)] [background:var(--f-7931-a-2-paints,linear-gradient(180deg,rgba(232,211,124,0.13)_33.67%,#FCD729_132.5%),#F7931A)] p-2.5 rounded-lg border-[6px] border-solid text-black font-bold text-sm">
          Launch Token
        </Link>
      </div>
      <div className="mt-[20px] grid grid-cols-3 gap-6">
        <div className="flex  flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative">
          <div className="flex w-[72px] h-[29px] justify-center items-center gap-[5px] absolute bg-[rgba(131,194,233,0.10)] rounded-[20px] right-2.5 top-[9px]">
            <div className="rounded-full bg-[#83C2E9] w-2 h-2"></div>
            <span className="text-ss text-[#83C2E9]">Live</span>
          </div>
          <div className="w-14 flex items-center justify-center rounded-lg bg-gold-primary aspect-square">
            <div className="w-8">
              <Logo />
            </div>
          </div>
          <h4 className="text-white text-center [text-2xl font-bold">Hopt</h4>
          <div className="flex items-center gap-6 text-white mt-2">
            <div className="flex flex-col items-end gap-1">
              <h6 className="opacity-50 text-xs">Timeline</h6>
              <div className="flex items-center gap-2 text-sm">
                <TimelineSvg />
                <span className="font-bold">13 Days</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <h6 className="opacity-50 text-xs">Total raised</h6>
              <div className="flex items-center gap-2 text-sm">
                <TotalRaisedSvg />
                <span className="font-bold">204K USD</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <h6 className="opacity-50 text-xs">Token Price</h6>
              <div className="flex items-center gap-2 text-sm">
                <TokenPriceSvg />
                <span className="font-bold">0.004 ETH</span>
              </div>
            </div>
          </div>
          <Link href="/launch-detail" className="text-center mt-4 border bg-[rgba(255,205,77,0.20)] p-2.5 rounded-lg  border-[rgba(255,205,77,0.20)] w-full text-gold-primary">
            View Token
          </Link>
        </div>
      </div>
    </div>
  );
});

export default LauchPage;
