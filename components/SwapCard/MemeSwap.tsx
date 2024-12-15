import { observer, useLocalObservable } from "mobx-react-lite";
import { SwapAmount } from "../SwapAmount/v3";
import { swap } from "@/services/swap";
import { Button } from "@/components/button/button-next";
import { Token } from "@/services/contract/token";
import { SpinnerContainer } from "../Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isEthAddress } from "@/lib/address";
import { wallet } from "@/services/wallet";
import { amountFormatted } from "../../lib/format";
import { liquidity } from "@/services/liquidity";
import { LoadingContainer } from "../LoadingDisplay/LoadingDisplay";
import { ItemSelect, SelectItem, SelectState } from "../ItemSelect/v3";
import { cn, Slider } from "@nextui-org/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Slippage } from "./Slippage";
import BigNumber from "bignumber.js";
import { useInterval } from "@/lib/hooks";
import { Trigger } from "../Trigger";
import { ArrowLeftRight, Zap, ChevronDown } from "lucide-react";
import { BsLightningChargeFill } from "react-icons/bs";
import { chart } from "@/services/chart";

export const SwapCard = observer(
  ({
    inputAddress,
    outputAddress,
    extraTokenAction,
    noBoarder,
  }: {
    inputAddress?: string;
    outputAddress?: string;
    extraTokenAction?: React.ReactNode;
    noBoarder?: boolean;
  }) => {
    const router = useRouter();
    const isInit = wallet.isInit && liquidity.isInit;
    const [operate, setOperate] = useState<string>("buy");
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
              inputAddress || "0xfc5e3743e9fac8bb60408797607352e24db7d65e",
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

    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
      if (inputCurrency) {
        chart.setChartLabel(
          `${Token.getToken({ address: inputCurrency }).symbol}`
        );
        chart.setChartTarget(Token.getToken({ address: inputCurrency }));
        chart.setCurrencyCode("USD");
      } else if (outputCurrency) {
        chart.setChartLabel(`${outputCurrency}`);
        chart.setChartTarget(Token.getToken({ address: outputCurrency }));
        chart.setCurrencyCode("USD");
      }

      console.log("chart.getChartTarget()", chart.chartTarget);
    }, [inputCurrency, outputCurrency]);

    return (
      <SpinnerContainer
        className={cn(
          "flex flex-1 justify-around items-center flex-col gap-2 w-full"
        )}
        isLoading={false}
      >
        <div
          className={cn(
            " w-full flex flex-1 flex-col justify-center items-start gap-[23px] bg-[#FFCD4D] px-5 pt-[60px] pb-[50px] rounded-3xl border-3 border-solid border-[#F7931A10] hover:border-[#F7931A] transition-all relative",
            noBoarder && "border-0"
          )}
        >
          <div className="bg-[url('/images/pumping/outline-border.png')] h-[60px] bg-[length:150%_auto] absolute top-0 left-0 w-full bg-repeat-x rounded-t-2xl"></div>
          <Trigger
            tab={operate}
            capitalize={true}
            setTab={setOperate}
            options={["buy", "sell"]}
            callback={() => swap.switchTokens()}
            className="w-[308px] z-10 absolute top-0 transform -translate-y-1/2 left-1/2  -translate-x-1/2"
          />

          <LoadingContainer isLoading={!isInit}>
            <div className="flex items-center justify-between w-full text-black text-base font-bold leading-3 tracking-[0.16px]">
              <span className="text-[#202020]">Slippage</span>
              <Slippage className="flex justify-between items-center w-full" />
            </div>
            <div className="w-full rounded-[32px] bg-white space-y-2 px-4 py-6 custom-dashed">
              <SwapAmount
                label="From"
                token={swap.fromToken}
                direction="from"
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
              />
              {swap.fromToken && (
                <div className="w-full flex justify-end items-center">
                  {/* TODO: update slider ui */}
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
                  />
                </div>
              )}{" "}
              {swap.fromToken && (
                <ItemSelect
                  selectState={state.selectState}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-[16px] justify-around w-full"
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
                <div className=" h-px flex-[1_0_0] bg-[#363636]/30 rounded-[100px]"></div>
                <div
                  className=" cursor-pointer hover:rotate-180 transition-all rounded-[10px] bg-[#FFCD4D] border border-black text-black p-2.5 shadow-[1.25px_2.5px_0px_0px_#000]"
                  onClick={() => {
                    swap.switchTokens();
                  }}
                >
                  <ArrowLeftRight className="size-5" />
                </div>
                <div className=" h-px flex-[1_0_0] bg-[#363636]/30 rounded-[100px]"></div>
              </div>
              <SwapAmount
                label="To"
                direction="to"
                token={swap.toToken}
                inputProps={{
                  value: swap.toAmount,
                  isClearable: false,
                  disabled: true,
                  onChange: (e) => {
                    swap.setToAmount(e.target.value);
                  },
                }}
              />
            </div>
            {!!swap.price && (
              <div className="flex flex-col w-full rounded-2xl cursor-pointer">
                <div className="w-full custom-dashed p-4">
                  <div
                    className="flex flex-col w-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#FFB800] p-2 rounded-lg">
                          <BsLightningChargeFill className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-black font-bold text-base">
                          0 .0100% fee
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-black transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="flex flex-col divide-y divide-black/10">
                        <div className="flex items-center py-3 justify-between">
                          <span className="text-black text-sm font-medium">
                            Route
                          </span>
                          <div className="flex items-center gap-2">
                            <TokenLogo token={swap.fromToken as Token} />
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <TokenLogo token={swap.toToken as Token} />
                          </div>
                        </div>

                        <div className="flex items-center py-3 justify-between">
                          <span className="text-black text-sm font-medium">
                            Minimum received
                          </span>
                          <span className="text-black text-sm font-medium">
                            {amountFormatted(swap.minToAmount, {
                              decimals: 0,
                              fixed: 6,
                            })}{" "}
                            {swap.toToken?.displayName}
                          </span>
                        </div>

                        <div className="flex items-center py-3 justify-between">
                          <span className="text-black text-sm font-medium">
                            LP Fee
                          </span>
                          <span className="text-black text-sm font-medium">
                            0.0001 tHPOT
                          </span>
                        </div>

                        <div className="flex items-center py-3 justify-between">
                          <span className="text-black text-sm font-medium">
                            Price Impact
                          </span>
                          <span className="text-[#FF5449] text-sm font-medium">
                            -4.49%
                          </span>
                        </div>

                        <div className="flex items-center py-3 justify-between">
                          <span className="text-black text-sm font-medium">
                            Slippage tolerance
                          </span>
                          <span className="text-black text-sm font-medium">
                            0.50%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
              className="w-full"
              isDisabled={swap.isDisabled}
              isLoading={swap.swapExactTokensForTokens.loading}
              onClick={async () => {
                await swap.swapExactTokensForTokens.call();
              }}
            >
              {swap.buttonContent === "Swap" ? operate : swap.buttonContent}
            </Button>
          </LoadingContainer>
          <div className="bg-[url('/images/swap/bottom-border.jpg')] bg-[length:100%_100%] bg-no-repeat h-[50px] absolute bottom-0 left-0 w-full"></div>
        </div>
        {extraTokenAction}
      </SpinnerContainer>
    );
  }
);
