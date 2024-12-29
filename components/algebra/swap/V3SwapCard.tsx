import { cn } from "@/lib/tailwindcss";
import SwapPairV3 from "./SwapPair/SwapPairV3";
import SwapButtonV3 from "./SwapButton/SwapButotnV3";
import SwapParamsV3 from "./SwapParams/SwapParamsV3";

interface V3SwapCardProps {
  fromTokenAddress?: string;
  toTokenAddress?: string;
  disableSelection?: boolean;
  bordered?: boolean;
  borderHeight?: string;
}

export function V3SwapCard({
  fromTokenAddress,
  toTokenAddress,
  disableSelection,
  bordered = true,
  borderHeight = "40px",
}: V3SwapCardProps) {
  return (
    <div className="w-full @container">
      <div
        style={{ '--border-height': borderHeight } as React.CSSProperties}
        className={cn(
          "flex flex-col w-full gap-y-4 items-center bg-[#FFCD4D] rounded-2xl text-black",
          bordered &&
            `px-4 py-12 bg-[url('/images/pumping/outline-border.png'),_url('/images/swap/bottom-border.svg')] bg-[position:left_top,_left_bottom] bg-[size:100%_var(--border-height)] bg-no-repeat @[500px]:bg-[size:auto_var(--border-height)] @[500px]:bg-repeat-x`
        )}
      >
        <SwapPairV3
          fromTokenAddress={fromTokenAddress}
          toTokenAddress={toTokenAddress}
          disableSelection={disableSelection}
        />
        <SwapParamsV3 />
        <SwapButtonV3 />
      </div>
    </div>
  );
}

export default V3SwapCard;
