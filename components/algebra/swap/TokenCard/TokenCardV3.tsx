import { Input } from "@/components/algebra/ui/input";
import { formatBalance } from "@/lib/algebra/utils/common/formatBalance";
import { formatUSD } from "@/lib//algebra/utils/common/formatUSD";
import { Currency, Percent } from "@cryptoalgebra/sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useWatchBlockNumber } from "wagmi";
import { Address, zeroAddress } from "viem";
import { TokenSelector } from "@/components/TokenSelector/v3";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { wallet } from "@/services/wallet";
import { Token } from "@/services/contract/token";
import { AccordionItem, Slider } from "@nextui-org/react";
import { WrappedNextAccordion } from "@/components/wrappedNextUI/Accordion/Accordion";
import { BiDownArrow } from "react-icons/bi";
import { debounce } from "lodash";
import {
  ItemSelect,
  SelectState,
  SelectItem,
} from "@/components/ItemSelect/v3";
import { WNATIVE_EXTENDED } from "@/data/algebra/routing";
import { SwapAmount } from "@/components/SwapAmount/v3";

interface TokenSwapCardProps {
  handleTokenSelection: (currency: Currency) => void;
  handleValueChange?: (value: string) => void;
  handleMaxValue?: () => void;
  value: string;
  currency: Currency | null | undefined;
  otherCurrency: Currency | null | undefined;
  fiatValue?: number;
  priceImpact?: Percent;
  showMaxButton?: boolean;
  showBalance?: boolean;
  showNativeToken?: boolean;
  disabled?: boolean;
  label?: string;
}

const TokenCardV3 = ({
  handleTokenSelection,
  handleValueChange,
  handleMaxValue,
  value,
  currency,
  otherCurrency,
  fiatValue,
  showMaxButton,
  showBalance = true,
  showNativeToken,
  disabled,
  label,
}: TokenSwapCardProps) => {
  const { address: account } = useAccount();
  useWatchBlockNumber({
    onBlockNumber: () => {
      refetch();
    },
  });
  const [storedValue, setStoredValue] = useState(value);

  const {
    data: balance,
    isLoading,
    refetch,
  } = useBalance({
    address: account,
    token: currency?.isNative
      ? undefined
      : (currency?.wrapped.address as Address),
    //watch: true,
  });

  useEffect(() => {
    setStoredValue(value);
  }, [value]);

  const balanceString = useMemo(() => {
    if (isLoading || !balance) return "Loading...";
    return formatBalance(balance.formatted);
  }, [balance, isLoading]);

  const handleInput = useMemo(
    () =>
      debounce((value: string) => {
        if (value === ".") value = "0.";
        console.log("value", value);
        handleValueChange?.(value);
      }, 200),
    []
  );

  const handleTokenSelect = (newCurrency: Currency) => {
    handleTokenSelection(newCurrency);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-y-3">
      <div className="text-black flex items-center justify-between px-2">
        <span>{label}</span>
        {currency && account && showBalance && (
          <div className="flex items-center gap-x-2">
            <div>
              <span>Balance: </span>
              <span>{balanceString}</span>
            </div>
            {showMaxButton && (
              <button
                className="cursor-pointer text-[#63b4ff]"
                onClick={handleMaxValue}
              >
                Max
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-2 space-y-4">
        <Slider
          className="w-full"
          size="sm"
          maxValue={Number(balance?.formatted)}
          minValue={0}
          onChange={(value) => {
            setStoredValue(value.toString());
            handleInput(value.toString());
          }}
          value={Number(storedValue)}
          step={Math.pow(0.1, 18)}
        />

        <ItemSelect
          selectState={
            new SelectState({
              value: Number(storedValue),
              onSelectChange: (value) => {
                handleInput(
                  (Number(balance?.formatted) * Number(value)).toString()
                );
              },
            })
          }
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
      </div>
    </div>
  );
};

export default TokenCardV3;
