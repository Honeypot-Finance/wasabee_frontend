import { observer } from "mobx-react-lite";
import { TokenSelector } from '@/components/TokenSelector';
import { SwapAmount } from '../SwapAmount/index';
import { swap } from "@/services/swap";
import { ExchangeSvg } from "../svg/exchange";
import { Button } from '@/components/button';

export const SwapCard = observer(() => {
  return (
    
      <div className=" flex flex-col justify-center items-start gap-[23px] [background:var(--card-color,#271A0C)] p-[20px] rounded-[20px] border-2 border-solid border-[rgba(247,147,26,0.10)]">
        <div className="flex justify-between items-center w-full">
          <SwapAmount label="From"></SwapAmount>
          <div>
            <div className="flex items-center">
              <div className="text-sub text-[]">Balance:2.39</div>
              <div className=" text-[color:var(--Button-Gradient,#F7931A)] text-base font-bold leading-3 tracking-[0.16px] underline">
                Max
              </div>
            </div>
            <TokenSelector
              value={swap.fromToken}
              onSelect={(token) => {
                swap.setFromToken(token);
              }}
            ></TokenSelector>
          </div>
        </div>
        <div className="flex w-full items-center gap-[5px]">
          <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
          <ExchangeSvg
            className=" cursor-pointer"
            onClick={() => {
              swap.switchTokens();
            }}
          ></ExchangeSvg>
          <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
        </div>
        <div className="flex justify-between  items-center w-full">
          <SwapAmount label="To"></SwapAmount>
          <div>
            <TokenSelector
              value={swap.toToken}
              onSelect={(token) => {
                swap.setToToken(token);
              }}
            ></TokenSelector>
          </div>
        </div>
        <Button>Swap</Button>
      </div>
  );
});
