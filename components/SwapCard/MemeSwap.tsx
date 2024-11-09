import { observer, useLocalObservable } from "mobx-react-lite";
import { TokenSelector } from "@/components/TokenSelector";
import { SwapAmount } from "../SwapAmount/index";
import { swap } from "@/services/swap";
import { ExchangeSvg } from "../svg/exchange";
import { Button } from "@/components/button";
import { Token } from "@/services/contract/token";
import { SpinnerContainer } from "../Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isEthAddress } from "@/lib/address";
import { useAccount } from "wagmi";
import { wallet } from "@/services/wallet";
import { amountFormatted } from "../../lib/format";
import { AmountFormat } from "../AmountFormat";
import { liquidity } from "@/services/liquidity";
import { chart } from "@/services/chart";
import LoadingDisplay, {
  LoadingContainer,
} from "../LoadingDisplay/LoadingDisplay";
import { trpc, trpcClient } from "@/lib/trpc";
import { GhostLaunchPair } from "@/services/indexer/indexerTypes";
import { ItemSelect, SelectItem, SelectState } from "../ItemSelect";
import { Input, Slider, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { delay } from "lodash";
import { LuOption } from "react-icons/lu";
import { IoOptions } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { FaLongArrowAltRight } from "react-icons/fa";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Slippage } from "./Slippage";
import BigNumber from "bignumber.js";
import { useInterval } from "@/lib/hooks";

export const SwapCard = observer(
  ({
    inputAddress,
    outputAddress,
  }: {
    inputAddress?: string;
    outputAddress?: string;
  }) => {
    const router = useRouter();
    const isInit = wallet.isInit && liquidity.isInit;
    const [operate, setOperate] = useState<"buy" | "sell">("buy");
    const state = useLocalObservable(() => ({
      selectState: new SelectState({
        value: 0,
        onSelectChange: (value) => {
          swap.setFromAmount(
            (swap.fromToken as Token).balance.times(value).toFixed()
          );
        },
      }),
    }));

    const { inputCurrency, outputCurrency } = router.query as {
      inputCurrency: string;
      outputCurrency: string;
    };

    useEffect(() => {
      if (!isInit) {
        liquidity.initPool();
        return;
      }

      if (inputCurrency && isEthAddress(inputCurrency)) {
        swap.setFromToken(
          Token.getToken({
            address: inputCurrency,
          })
        );
      } else {
        swap.setFromToken(
          Token.getToken({
            address:
              inputAddress || "0x0874955158639a594fd65641e16c7de91f3df465",
          })
        );
      }

      if (outputCurrency && isEthAddress(outputCurrency)) {
        swap.setToToken(
          Token.getToken({
            address: outputCurrency,
          })
        );
      } else {
        swap.setToToken(
          Token.getToken({
            address: outputAddress ?? "",
          })
        );
      }
    }, [isInit, inputCurrency, outputCurrency, inputAddress, outputAddress]);

    useInterval(() => {
      swap.onFromAmountChange();
    }, 3000);

    return (
      <SpinnerContainer
        className="flex flex-1 justify-around items-center"
        isLoading={false}
      >
        <div className=" flex flex-1 flex-col justify-center items-start gap-[23px] [background:var(--card-color,#271A0C)] p-[20px] rounded-[20px] border-3 border-solid border-[#F7931A10] hover:border-[#F7931A] transition-all">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => {
                  setOperate("buy");
                  swap.switchTokens();
                }}
                className={[
                  "text-[color:var(--Button-Gradient,#F7931A)] font-bold",
                  operate === "buy" ? "" : "opacity-50 hover:opacity-100",
                ].join(" ")}
              >
                Buy
              </button>
              <button
                onClick={() => {
                  setOperate("sell");
                  swap.switchTokens();
                }}
                className={[
                  "text-[color:var(--Button-Gradient,#F7931A)] font-bold",
                  operate === "sell" ? "" : "opacity-50 hover:opacity-100",
                ].join(" ")}
              >
                Sell
              </button>
            </div>
            <div className="flex items-center justify-end w-full  text-[color:var(--Button-Gradient,#F7931A)] text-base font-bold leading-3 tracking-[0.16px]">
              <Slippage className="flex justify-between items-center w-full"></Slippage>
            </div>
          </div>
          <LoadingContainer isLoading={!isInit}>
            <>
              <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <SwapAmount
                  label="From"
                  inputProps={{
                    value: swap.fromAmount,
                    disabled: !swap.fromToken,
                    max: swap.fromToken?.balance.toNumber(),
                    min: 0,
                    isInvalid:
                      Number(swap.fromAmount) >
                        (swap.fromToken as Token)?.balance?.toNumber() ||
                      0 ||
                      Number(swap.fromAmount) < 0,
                    errorMessage: "Insufficient balance",
                    onClear: () => {
                      swap.setFromAmount("0");
                    },
                    onChange: (e) => {
                      swap.setFromAmount(e.target.value);
                    },
                  }}
                ></SwapAmount>
                <div className="flex flex-col items-end w-full lg:w-[unset]">
                  {!!swap.fromToken && (
                    <div className="flex items-center">
                      <div className="text-sub">
                        Balance: {swap.fromToken.balanceFormatted}
                      </div>
                      <div
                        onClick={() => {
                          swap.setFromAmount(
                            (swap.fromToken as Token).balance.toFixed()
                          );
                        }}
                        className=" pb-2 cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] ml-[8px] font-bold  underline"
                      >
                        <Image
                          src={"/images/icons/artisticTexts/MAX.svg"}
                          alt={""}
                          width={40}
                          height={40}
                        ></Image>
                      </div>
                    </div>
                  )}
                  <TokenSelector
                    value={swap.fromToken}
                    onSelect={(token) => {
                      swap.setFromToken(token);
                    }}
                  ></TokenSelector>
                </div>
              </div>
              {swap.fromToken && (
                <div className="w-full flex justify-end items-center">
                  <Slider
                    className="w-full"
                    size="sm"
                    maxValue={
                      (swap.fromToken as Token).balance.toNumber() +
                      Math.pow(0.1, 15)
                    }
                    minValue={0}
                    onChange={(value) => {
                      if (
                        new BigNumber(String(value)) >
                        (swap.fromToken as Token).balance
                      ) {
                        swap.setFromAmount(
                          (swap.fromToken as Token).balance.toFixed()
                        );
                      } else {
                        swap.setFromAmount(String(value));
                      }
                    }}
                    value={Number(swap.fromAmount)}
                    step={Math.pow(0.1, 18)}
                  ></Slider>
                </div>
              )}{" "}
              {swap.fromToken && (
                <ItemSelect
                  selectState={state.selectState}
                  className=" grid grid-cols-2 lg:grid-cols-4 gap-[16px] justify-around w-full"
                >
                  <SelectItem className="rounded-[30px] px-[24px]" value={0.25}>
                    25%
                  </SelectItem>
                  <SelectItem className="rounded-[30px] px-[24px]" value={0.5}>
                    50%
                  </SelectItem>
                  <SelectItem className="rounded-[30px] px-[24px]" value={0.75}>
                    75%
                  </SelectItem>
                  <SelectItem className="rounded-[30px] px-[24px]" value={1}>
                    100%
                  </SelectItem>
                </ItemSelect>
              )}
              <div className="flex w-full items-center gap-[5px]">
                <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
                <ExchangeSvg
                  className=" cursor-pointer hover:rotate-180 transition-all"
                  onClick={() => {
                    swap.switchTokens();
                  }}
                ></ExchangeSvg>
                <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <SwapAmount
                  label="To"
                  inputProps={{
                    value: swap.toAmount,
                    isClearable: false,
                    disabled: true,
                    onChange: (e) => {
                      swap.setToAmount(e.target.value);
                    },
                  }}
                ></SwapAmount>
                <div className="flex flex-col items-end w-full lg:w-[unset]">
                  {!!swap.toToken && (
                    <div className="flex items-center">
                      <div className="text-sub">
                        Balance: {swap.toToken.balanceFormatted}
                      </div>
                    </div>
                  )}
                  <TokenSelector
                    value={swap.toToken}
                    onSelect={(token) => {
                      swap.setToToken(token);
                    }}
                  ></TokenSelector>
                </div>
              </div>
              {!!swap.price && (
                <div className="flex  w-full lg:w-[529px] max-w-full h-[71px] justify-between items-center border [background:#291C0A] px-5 py-2.5 rounded-2xl border-solid border-[rgba(247,147,26,0.20)]">
                  <div>
                    <div>
                      <AmountFormat
                        amount={swap.price?.toFixed()}
                      ></AmountFormat>
                    </div>
                    <div>
                      {swap.toToken?.displayName} per{" "}
                      {swap.fromToken?.displayName}
                    </div>
                  </div>
                  <div>
                    <div>
                      {amountFormatted(swap.minToAmount, {
                        decimals: 0,
                        fixed: 6,
                      })}{" "}
                      {swap.toToken?.displayName}
                    </div>
                    <div>Minimum Received</div>
                  </div>
                </div>
              )}{" "}
              {swap.routerToken && swap.routerToken.length > 0 && (
                <div className="w-full p-1 flex justify-between items-center rounded-xl  bg-black/50">
                  <>
                    <div>
                      <TokenLogo token={swap.fromToken as Token} />
                    </div>
                    <FaLongArrowAltRight />
                  </>

                  {swap.routerToken.map((token, idx) => {
                    if (idx != 0 && idx !== swap.routerToken!.length - 1) {
                      return (
                        <>
                          <div key={token.address}>
                            <TokenLogo token={token} />
                          </div>
                          <FaLongArrowAltRight />
                        </>
                      );
                    }
                  })}
                  <div>
                    <TokenLogo token={swap.toToken as Token} />
                  </div>
                </div>
              )}
              <Button
                isDisabled={swap.isDisabled}
                isLoading={swap.swapExactTokensForTokens.loading}
                onClick={async () => {
                  await swap.swapExactTokensForTokens.call();
                }}
              >
                {swap.buttonContent === "Swap" ? operate : swap.buttonContent}
              </Button>
            </>
          </LoadingContainer>
        </div>
      </SpinnerContainer>
    );
  }
);
