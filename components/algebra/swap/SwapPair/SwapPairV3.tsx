import { useUSDCValue } from "@/lib/algebra/hooks/common/useUSDCValue";
import {
  Currency,
  CurrencyAmount,
  maxAmountSpend,
  tryParseAmount,
} from "@cryptoalgebra/sdk";
import { useCallback, useMemo } from "react";
import TokenCard from "../TokenCard";
import { ChevronsUpDownIcon } from "lucide-react";
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

const SwapPairV3 = () => {
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

  return (
    <div className="flex flex-col gap-1 relative">
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
        <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
        <ExchangeSvg
          className=" cursor-pointer hover:rotate-180 transition-all"
          onClick={onSwitchTokens}
        ></ExchangeSvg>
        <div className=" h-px flex-[1_0_0] [background:rgba(247,147,26,0.20)] rounded-[100px]"></div>
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
