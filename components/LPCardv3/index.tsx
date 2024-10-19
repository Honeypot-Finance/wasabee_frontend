import { observer, useLocalObservable } from "mobx-react-lite";
import { TokenSelector } from "@/components/TokenSelector";
import { SwapAmount } from "../SwapAmount/index";
import { Button } from "@/components/button";
import { Token } from "@/services/contract/token";
import { SpinnerContainer } from "../Spinner";
import { PlusSvg } from "../svg/plus";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isEthAddress } from "@/lib/address";
import { wallet } from "@/services/wallet";
import { Checkbox, Slider, Tab, Tabs } from "@nextui-org/react";
import { Table } from "../table";
import { ItemSelect, SelectState } from "../ItemSelect";
import { SelectItem } from "../ItemSelect/index";
import _ from "lodash";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import { Button as NextButton } from "@nextui-org/react";
import { liquidityV3 as addLiquidityV3 } from "@/services/addLiquidityV3";

const AddLiquidity = observer(() => {
  return (
    <SpinnerContainer
      className="mt-[24px]"
      //isLoading={liquidityV3.currentPair.loading}
      isLoading={false}
    >
      <div className=" flex flex-col justify-center items-start gap-[23px] ">
        <div className="flex justify-between items-center w-full">
          {/* <SwapAmount
            label=""
            inputProps={{
              value: liquidity.fromAmount,
              disabled: !liquidity.fromToken,
              max: liquidity.fromToken?.balance.toNumber(),
              min: 0,
              isInvalid:
                (Number(liquidity.fromAmount) >
                  (liquidity.fromToken as Token)?.balance?.toNumber() ??
                  0) ||
                Number(liquidity.fromAmount) < 0,
              errorMessage: "Insufficient balance",
              onClear: () => {
                liquidity.setFromAmount("");
              },
              onChange: (e) => {
                liquidity.setFromAmount(e.target.value);
              },
              onInput: (e) => {
                liquidity.onFromAmountInputChange();
              },
            }}
          ></SwapAmount> */}
          <div className="flex flex-col items-end">
            {/* {!!liquidity.fromToken && (
              <div className="flex items-center">
                <div className="text-sub">
                  Balance: {liquidity.fromToken.balanceFormatted}
                </div>
                <div
                  onClick={() => {
                    liquidity.setFromAmount(
                      (liquidity.fromToken as Token).balance.toFixed()
                    );
                    liquidity.onFromAmountInputChange();
                  }}
                  className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline"
                >
                  Max
                </div>
              </div>
            )} */}
            <TokenSelector
              value={addLiquidityV3.token1}
              onSelect={(token) => {
                addLiquidityV3.setToken1(token);
              }}
            ></TokenSelector>
          </div>
        </div>
        <div className="flex w-full items-center gap-[5px]">
          <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
          <PlusSvg></PlusSvg>
          <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
        </div>
        <div className="flex justify-between  items-center w-full">
          {/* <SwapAmount
            label=""
            inputProps={{
              value: liquidity.toAmount,
              disabled: !liquidity.toToken,
              max: liquidity.toToken?.balance.toNumber(),
              min: 0,
              isInvalid:
                (Number(liquidity.toAmount) >
                  (liquidity.toToken as Token)?.balance?.toNumber() ??
                  0) ||
                Number(liquidity.toAmount) < 0,
              errorMessage: "Insufficient balance",
              onClear: () => {
                liquidity.setToAmount("");
              },
              isClearable: !liquidity.currentPair.value,
              onChange: (e) => {
                liquidity.setToAmount(e.target.value);
              },
              onInput: (e) => {
                liquidity.onToAmountInputChange();
              },
            }}
          ></SwapAmount> */}
          <div className="flex flex-col items-end">
            {/* {!!liquidity.toToken && (
              <div className="flex items-center">
                <div className="text-sub">
                  Balance: {liquidity.toToken.balanceFormatted}
                </div>
                <div
                  onClick={() => {
                    liquidity.setToAmount(
                      (liquidity.toToken as Token).balance.toFixed()
                    );
                    liquidity.onToAmountInputChange();
                  }}
                  className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline"
                >
                  Max
                </div>
              </div>
            )} */}
            <TokenSelector
              value={addLiquidityV3.token2}
              onSelect={(token) => {
                addLiquidityV3.setToken2(token);
              }}
            ></TokenSelector>
          </div>
        </div>
        <div>
          {/* <Checkbox
            defaultSelected={liquidity.balanced}
            checked={liquidity.balanced}
            onChange={(e) => {
              liquidity.setIsExactIn(e.target.checked);
              liquidity.onFromAmountInputChange();
            }}
          >
            Balanced
          </Checkbox> */}
        </div>
        <Button
          onClick={() => {
            addLiquidityV3.createPool.call();
          }}
        >
          Create Pool
        </Button>
        {/* <Button
          isDisabled={liquidity.isDisabled}
          isLoading={liquidity.addLiquidity.loading}
          onClick={async () => {
            liquidity.addLiquidity.call().then(async () => {
              liquidity.myPairPage.addSingleItemToStart(
                liquidity.currentPair.value!
              );

              await Promise.all([
                await liquidity.currentPair.value!.token.getBalance(),
                await liquidity.currentPair.value!.token.getTotalSupply(),
                await liquidity.currentPair.value!.token0.init(),
                await liquidity.currentPair.value!.token1.init(),
              ]);

              liquidity.currentPair.value!.getReserves();
            });
          }}
        >
          {liquidity.buttonContent}
        </Button> */}
      </div>
    </SpinnerContainer>
  );
});

export const LPCardv3 = observer(() => {
  const router = useRouter();

  const { inputCurrency, outputCurrency } = router.query as {
    inputCurrency: string;
    outputCurrency: string;
  };

  const isinit = wallet.isInit;

  useEffect(() => {
    if (!isinit) {
      return;
    }

    if (inputCurrency && isEthAddress(inputCurrency)) {
      addLiquidityV3.setToken1(
        Token.getToken({
          address: inputCurrency,
        })
      );
    }
    if (outputCurrency && isEthAddress(outputCurrency)) {
      addLiquidityV3.setToken2(
        Token.getToken({
          address: outputCurrency,
        })
      );
    }
  }, [inputCurrency, outputCurrency, isinit]);

  return (
    <div className="[background:var(--card-color,#271A0C)]   p-[20px] rounded-[20px] border-2 border-solid border-[rgba(247,147,26,0.10)]">
      {(isinit && (
        <Tabs
          variant="light"
          disableAnimation
          classNames={{
            tabList: "gap-16px p-0 bg-transparent",
            tab: "px-[0.25rem] data-[selected=true]:bg-transparent font-bold text-[1.2rem]",
          }}
        >
          <Tab
            key="addLiquidity"
            title={<span className="text-sm sm:text-base">Add Liquidity</span>}
            className="text-red-500"
          >
            <AddLiquidity></AddLiquidity>
          </Tab>
          {/* <Tab
            key="removeLiquidity"
            title={
              <span className="text-sm sm:text-base">Remove Liquidity</span>
            }
          >
            <RemoveLiquidity></RemoveLiquidity>
          </Tab> */}
        </Tabs>
      )) || <LoadingDisplay></LoadingDisplay>}
    </div>
  );
});
