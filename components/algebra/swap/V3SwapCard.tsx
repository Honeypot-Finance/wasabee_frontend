import SwapPairV3 from "./SwapPair/SwapPairV3";
import SwapButtonV3 from "./SwapButton/SwapButotnV3";
import SwapParamsV3 from "./SwapParams/SwapParamsV3";
import { HoneyContainer } from "../../CardContianer";

interface V3SwapCardProps {
  fromTokenAddress?: string;
  toTokenAddress?: string;
  disableSelection?: boolean;
  bordered?: boolean;
  borderHeight?: string;
  onSwapSuccess?: () => void;
}

export function V3SwapCard({
  fromTokenAddress,
  toTokenAddress,
  disableSelection,
  bordered = true,
}: V3SwapCardProps) {
  return (
    <HoneyContainer bordered={bordered} borderHeight={"40px"}>
      <SwapPairV3
        fromTokenAddress={fromTokenAddress}
        toTokenAddress={toTokenAddress}
        disableSelection={disableSelection}
      />
      <SwapParamsV3 />
      <SwapButtonV3 />
    </HoneyContainer>
  );
}

export default V3SwapCard;
