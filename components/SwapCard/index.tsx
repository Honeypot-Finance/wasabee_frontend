import { observer } from "mobx-react-lite";
import { TokenSelector } from '@/components/TokenSelector';
import { SwapAmount } from '../SwapAmount/index';
import { swap } from "@/services/swap";
import { ExchangeSvg } from "../svg/exchange";
import { Button } from '@/components/button';
import { Token } from "@/services/contract/token";
import { SpinnerContainer } from "../Spinner";

export const SwapCard = observer(() => {
  return (
    <SpinnerContainer isLoading={swap.currentPair.loading}>
      <div className=" flex flex-col justify-center items-start gap-[23px] [background:var(--card-color,#271A0C)] p-[20px] rounded-[20px] border-2 border-solid border-[rgba(247,147,26,0.10)]">
        <div className="flex justify-between items-center w-full">
          <SwapAmount label="From" inputProps={{
            value: swap.fromAmount,
            disabled: !swap.fromToken,
            onClear: () => {
                swap.setFromAmount("");
            },
            onChange: (e) => {
              swap.setFromAmount(e.target.value);
            }
          }}></SwapAmount>
          <div>
          {!!swap.fromToken && <div className="flex items-center">
             <div className="text-sub text-[]">Balance: {swap.fromToken.balanceFormatted}</div> 
              <div onClick={() => {
                swap.setFromAmount((swap.fromToken as Token).balance.toFixed());
              }} className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline">
                Max
              </div>
            </div>}
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
          <SwapAmount label="To" inputProps={{
            value: swap.toAmount,
            disabled: !swap.toToken,
            onClear: () => {
                swap.setToAmount("");
            },
            onChange: (e) => {
              swap.setToAmount(e.target.value);
            }
          }}></SwapAmount>
          <div>
            <TokenSelector
              value={swap.toToken}
              onSelect={(token) => {
                swap.setToToken(token);
              }}
            ></TokenSelector>
          </div>
        </div>
        
        {!!swap.price && <div className="flex w-[529px] h-[71px] justify-between items-center border [background:#291C0A] px-5 py-2.5 rounded-2xl border-solid border-[rgba(247,147,26,0.20)]">
            <div>
              <div>{swap.price.toFormat(6)}</div>
              <div>{swap.fromToken?.displayName} per {swap.toToken?.displayName}</div>
            </div>
          </div>}
        <Button isDisabled={swap.isDisabled} isLoading={swap.swapExactTokensForTokens.loading} onClick={async () => {
          await swap.swapExactTokensForTokens.call()
        }}>{swap.buttonContent}</Button>
      </div>
      </SpinnerContainer>
  );
});
