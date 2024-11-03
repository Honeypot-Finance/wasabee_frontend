import { useDerivedSwapInfo } from "@/services/algebra/state/swapStore";
import { useSmartRouterBestRoute } from "@/lib/algebra/hooks/routing/useSmartRouterBestRoute";
import { Currency as CurrencyBN } from "@cryptoalgebra/router-custom-pools-and-sliding-fee";
import SwapButton from "../SwapButton";
import SwapPair from "../SwapPair";
import SwapParams from "../SwapParams";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
// import {useSmartRouterCallback} from "@/hooks/routing/useSmartRouterCallback.ts";

const SwapCard = () => {
  const derivedSwap = useDerivedSwapInfo();

  const smartTrade = useSmartRouterBestRoute(
    derivedSwap.parsedAmountBN,
    (derivedSwap.isExactIn
      ? derivedSwap.currencies.OUTPUT
      : derivedSwap.currencies.INPUT) as CurrencyBN,
    derivedSwap.isExactIn,
    true
  );
  console.log("derivedSwap", derivedSwap);
  //"0xDeC4BC6Cf82cA04d724aa5c17FB1D96Be234b4E1"
  console.log("smartTrade", smartTrade);

  return (
    <div className="flex flex-col gap-1 w-full bg-card border border-card-border p-2 rounded-3xl">
      <SwapPair
        derivedSwap={derivedSwap}
        smartTrade={smartTrade.trade?.bestTrade}
      />
      <SwapParams
        derivedSwap={derivedSwap}
        smartTrade={smartTrade.trade?.bestTrade}
        isSmartTradeLoading={smartTrade.isLoading}
      />{" "}
      <SwapButton
        derivedSwap={derivedSwap}
        smartTrade={smartTrade.trade?.bestTrade}
        isSmartTradeLoading={smartTrade.isLoading}
        callOptions={{
          calldata: smartTrade.trade?.calldata,
          value: smartTrade.trade?.value,
        }}
      />
    </div>
  );
};

export default SwapCard;
