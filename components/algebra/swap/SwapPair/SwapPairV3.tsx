import { useUSDCValue } from "@/lib/algebra/hooks/common/useUSDCValue";
import {
  computePoolAddress,
  Currency,
  CurrencyAmount,
  maxAmountSpend,
  tryParseAmount,
} from "@cryptoalgebra/sdk";
import { useCallback, useMemo, useEffect } from "react";
import TokenCard from "../TokenCard";
import { ArrowLeftRight, ChevronsUpDownIcon } from "lucide-react";
import useWrapCallback, {
  WrapType,
} from "@/lib/algebra/hooks/swap/useWrapCallback";
import {
  useDerivedSwapInfo,
  useSwapState,
  useSwapActionHandlers,
} from "@/lib/algebra/state/swapStore";
import { SwapField, SwapFieldType } from "@/types/algebra/types/swap-field";
import TokenCardV3 from "../TokenCard/TokenCardV3";
import { ExchangeSvg } from "@/components/svg/exchange";
import { chart } from "@/services/chart";
import { Token } from "@/services/contract/token";
import { PairContract } from "@/services/contract/pair-contract";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { wallet } from "@/services/wallet";

interface SwapPairV3Props {
  fromTokenAddress?: string;
  toTokenAddress?: string;
}

const SwapPairV3 = ({ fromTokenAddress, toTokenAddress }: SwapPairV3Props) => {
  const {
    toggledTrade: trade,
    currencyBalances,
    parsedAmount,
    currencies,
  } = useDerivedSwapInfo();

  const baseCurrency = currencies[SwapField.INPUT];
  const quoteCurrency = currencies[SwapField.OUTPUT];

  const { independentField, typedValue } = useSwapState();
  const dependentField: SwapFieldType =
    independentField === SwapField.INPUT ? SwapField.OUTPUT : SwapField.INPUT;

  const { onSwitchTokens, onCurrencySelection, onUserInput } =
    useSwapActionHandlers();

  const handleInputSelect = useCallback(
    (inputCurrency: Currency) => {
      onCurrencySelection(SwapField.INPUT, inputCurrency);
    },
    [onCurrencySelection]
  );

  const handleOutputSelect = useCallback(
    (outputCurrency: Currency) => {
      onCurrencySelection(SwapField.OUTPUT, outputCurrency);
    },
    [onCurrencySelection]
  );

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(SwapField.INPUT, value);
    },
    [onUserInput]
  );
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(SwapField.OUTPUT, value);
    },
    [onUserInput]
  );

  const { wrapType } = useWrapCallback(
    currencies[SwapField.INPUT],
    currencies[SwapField.OUTPUT],
    typedValue
  );

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;

  const parsedAmountA =
    independentField === SwapField.INPUT ? parsedAmount : trade?.inputAmount;

  const parsedAmountB =
    independentField === SwapField.OUTPUT ? parsedAmount : trade?.outputAmount;

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [SwapField.INPUT]: parsedAmount,
            [SwapField.OUTPUT]: parsedAmount,
          }
        : {
            [SwapField.INPUT]: parsedAmountA,
            [SwapField.OUTPUT]: parsedAmountB,
          },
    [parsedAmount, showWrap, parsedAmountA, parsedAmountB]
  );

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(
    currencyBalances[SwapField.INPUT]
  );
  const showMaxButton = Boolean(
    maxInputAmount?.greaterThan(0) &&
      !parsedAmounts[SwapField.INPUT]?.equalTo(maxInputAmount)
  );

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(SwapField.INPUT, maxInputAmount.toExact());
  }, [maxInputAmount, onUserInput]);

  const { formatted: fiatValueInputFormatted } = useUSDCValue(
    tryParseAmount(
      parsedAmounts[SwapField.INPUT]?.toSignificant(
        (parsedAmounts[SwapField.INPUT]?.currency.decimals || 6) / 2
      ),
      baseCurrency
    )
  );
  const { formatted: fiatValueOutputFormatted } = useUSDCValue(
    tryParseAmount(
      parsedAmounts[SwapField.OUTPUT]?.toSignificant(
        (parsedAmounts[SwapField.OUTPUT]?.currency.decimals || 6) / 2
      ),
      quoteCurrency
    )
  );

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? (parsedAmounts[independentField]?.toExact() ?? "")
      : (parsedAmounts[dependentField]?.toFixed(
          (parsedAmounts[dependentField]?.currency.decimals || 6) / 2
        ) ?? ""),
  };

  useEffect(() => {
    const initializeTokens = async () => {
      if (fromTokenAddress) {
        const token = Token.getToken({ address: fromTokenAddress });
        await token.init(false, {
          loadIndexerTokenData: true,
          loadLogoURI: true,
        });

        if (!token) {
          return;
        }

        console.log("token", token);
        handleInputSelect(
          new AlgebraToken(
            wallet.currentChainId,
            token.address,
            Number(token.decimals),
            token.symbol,
            token.name
          )
        );
      }

      if (toTokenAddress) {
        const token = Token.getToken({ address: toTokenAddress });
        await token.init(false, {
          loadIndexerTokenData: true,
          loadLogoURI: true,
        });
        if (!token) {
          return;
        }
        console.log("token", token);
        handleOutputSelect(
          new AlgebraToken(
            wallet.currentChainId,
            token.address,
            Number(token.decimals),
            token.symbol,
            token.name
          )
        );
      }
    };

    initializeTokens();
  }, [fromTokenAddress, toTokenAddress]);

  useEffect(() => {
    if (baseCurrency) {
      chart.setChartLabel(`${baseCurrency.symbol}`);
      chart.setChartTarget(
        Token.getToken({ address: baseCurrency.wrapped.address })
      );
      chart.setCurrencyCode("USD");
    } else if (quoteCurrency) {
      chart.setChartLabel(`${quoteCurrency.symbol}`);
      chart.setChartTarget(
        Token.getToken({ address: quoteCurrency.wrapped.address })
      );
      chart.setCurrencyCode("USD");
    }

    console.log("chart.getChartTarget()", chart.chartTarget);
  }, [baseCurrency, quoteCurrency]);

  return (
    <div className="flex flex-col gap-1 relative bg-white custom-dashed px-[18px] py-6 w-full">
      <TokenCardV3
        value={formattedAmounts[SwapField.INPUT] || ""}
        currency={baseCurrency}
        otherCurrency={quoteCurrency}
        handleTokenSelection={handleInputSelect}
        handleValueChange={handleTypeInput}
        handleMaxValue={handleMaxInput}
        fiatValue={fiatValueInputFormatted ?? undefined}
        showMaxButton={showMaxButton}
        showBalance={true}
        label="From"
      />

      <div className="flex w-full items-center gap-[5px]">
        <div className=" h-px flex-[1_0_0] bg-[#363636]/30 rounded-[100px]"></div>
        <div
          className=" cursor-pointer hover:rotate-180 transition-all rounded-[10px] bg-[#FFCD4D] border border-black text-black p-2.5 shadow-[1.25px_2.5px_0px_0px_#000]"
          onClick={onSwitchTokens}
        >
          <ArrowLeftRight className="size-5" />
        </div>
        <div className=" h-px flex-[1_0_0] bg-[#363636]/30 rounded-[100px]"></div>
      </div>

      <TokenCardV3
        value={formattedAmounts[SwapField.OUTPUT] || ""}
        currency={quoteCurrency}
        otherCurrency={baseCurrency}
        handleTokenSelection={handleOutputSelect}
        handleValueChange={handleTypeOutput}
        fiatValue={fiatValueOutputFormatted ?? undefined}
        showBalance={true}
        label="To"
      />
    </div>
  );
};

export default SwapPairV3;
