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
import { VaultAmount } from "../VaultAmount/VaultAmount";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { PairContract } from "@/services/contract/pair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { vault } from "@/services/vault";
import { chart } from "@/services/chart";
import { V3SwapCard } from "../algebra/swap/V3SwapCard";

export const LaunchDetailSwapCard = observer(
  ({
    inputAddress,
    outputAddress,
    extraTokenAction,
    noBoarder,
    memePairContract,
    onSwapSuccess,
  }: {
    inputAddress?: string;
    outputAddress?: string;
    extraTokenAction?: React.ReactNode;
    noBoarder?: boolean;
    memePairContract: MemePairContract;
    onSwapSuccess?: () => void;
  }) => {
    const [currentTab, setCurrentTab] = useState<"Swap" | "LP">("Swap");
    const router = useRouter();
    const isInit = wallet.isInit && liquidity.isInit;
    const [operate, setOperate] = useState<string>("Swap");
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
    const [vaultContract, setVaultContract] =
      useState<ICHIVaultContract | null>(null);

    useEffect(() => {
      //get pair contract by inputAddress and outputAddress

      const loadVaultContract = async () => {
        try {
          const lpTokenAddress = await memePairContract.contract.read.lpToken();
          const aquaberaVaultContract = new ICHIVaultContract({
            address: lpTokenAddress,
          });
          await vault.setVaultContract(aquaberaVaultContract);
          setVaultContract(aquaberaVaultContract);
        } catch (error) {
          console.error("Failed to load vault contract:", error);
        }
      };
      loadVaultContract();
    }, [inputAddress, outputAddress]);

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
      if (swap.toToken) {
        chart.setChartLabel(
          `${Token.getToken({ address: swap.toToken.address }).symbol}`
        );
        chart.setChartTarget(Token.getToken({ address: swap.toToken.address }));
        chart.setCurrencyCode("USD");
      } else if (swap.fromToken) {
        chart.setChartLabel(
          `${Token.getToken({ address: swap.fromToken.address }).symbol}`
        );
        chart.setChartTarget(
          Token.getToken({ address: swap.fromToken.address })
        );
        chart.setCurrencyCode("USD");
      }
      console.log("chart.getChartTarget()", chart.chartTarget);
    }, [swap.fromToken, swap.toToken]);

    return (
      <SpinnerContainer
        className={cn(
          "flex flex-1 justify-around items-center flex-col gap-2 w-full"
        )}
        isLoading={false}
      >
        <div
          className={cn(
            " w-full flex flex-1 flex-col justify-center items-start gap-[23px] bg-[#FFCD4D] px-5 pt-[70px] pb-[45px] rounded-3xl border-3 border-solid border-[#F7931A10] hover:border-[#F7931A] transition-all relative",
            noBoarder && "border-0"
          )}
        >
          <div className="bg-[url('/images/swap/top-border.png')] bg-cover bg-no-repeat bg-left-bottom h-[70px] absolute top-0 left-0 w-full rounded-t-[20px]"></div>
          <Trigger
            tab={operate}
            capitalize={true}
            setTab={setOperate}
            options={["Swap", "LP"]}
            callback={(tab) => setCurrentTab(tab as "Swap" | "LP")}
            className="w-[308px] z-10 absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
            notification={memePairContract.canClaimLP ? ["LP"] : []}
          />

          {currentTab === "Swap" && (
            <LoadingContainer isLoading={!isInit}>
              <V3SwapCard
                fromTokenAddress={inputAddress}
                toTokenAddress={outputAddress}
                bordered={false}
                onSwapSuccess={onSwapSuccess}
              />
            </LoadingContainer>
          )}

          {currentTab === "LP" && (
            <LoadingContainer isLoading={!isInit}>
              {memePairContract.canClaimLP && (
                <Button
                  className="w-full relative overflow-visible"
                  isLoading={memePairContract.claimLP.loading}
                  onClick={() => {
                    memePairContract.claimLP.call();
                  }}
                  isDisabled={!memePairContract.canClaimLP}
                >
                  Claim LP
                  {memePairContract.canClaimLP && (
                    <div className="absolute -top-0 -right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full z-10" />
                  )}
                </Button>
              )}
              <Button
                className="w-full"
                onClick={async () => {
                  const lpTokenAddress =
                    await memePairContract.contract.read.lpToken();
                  window.location.href = `/vault/${lpTokenAddress}`;
                }}
              >
                Visit Vault
              </Button>
              <div className="w-full rounded-[32px] bg-white space-y-2 px-4 py-6 custom-dashed">
                {vaultContract && <VaultAmount vaultContract={vaultContract} />}
              </div>

              <Button
                className="w-full"
                isDisabled={vault.isDisabled}
                isLoading={vault.deposit.loading}
                onClick={async () => {
                  await vault.deposit.call();
                }}
              >
                {vault.buttonContent}
              </Button>
            </LoadingContainer>
          )}
          <div className="bg-[url('/images/swap/bottom-border.svg')] bg-cover bg-no-repeat bg-left-top h-[45px] absolute bottom-0 left-0 w-full rounded-b-[20px] origin-bottom"></div>
        </div>
        {extraTokenAction}
      </SpinnerContainer>
    );
  }
);
