import { Input } from "@/components/algebra/ui/input";
import { formatBalance } from "@/lib/algebra/utils/common/formatBalance";
import { formatUSD } from "@/lib//algebra/utils/common/formatUSD";
import { Currency, Percent } from "@cryptoalgebra/sdk";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useWatchBlockNumber } from "wagmi";
import { Address, zeroAddress } from "viem";
import { TokenSelector } from "@/components/TokenSelector/v3";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { wallet } from "@/services/wallet";
import { Token } from "@/services/contract/token";
import { Slider } from "@nextui-org/react";
import { debounce } from "lodash";
import {
  ItemSelect,
  SelectState,
  SelectItem,
} from "@/components/ItemSelect/v3";
import { WNATIVE_EXTENDED } from "@/data/algebra/routing";
import { cn } from "@/lib/tailwindcss";

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

      <div className="w-full rounded-2xl border bg-card-dark shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] flex items-center justify-between px-4 py-2.5 gap-x-2">
        <div className="flex flex-row flex-1">
          <TokenSelector
            value={
              currency?.wrapped.address
                ? Token.getToken({
                    address: currency?.wrapped.address,
                    isNative: currency.isNative,
                  })
                : undefined
            }
            onSelect={(token) => {
              console.log("token.isNative", token.isNative);
              console.log(
                "WNATIVE_EXTENDED[wallet.currentChainId].symbol",
                WNATIVE_EXTENDED[wallet.currentChainId].symbol
              );
              handleTokenSelect(
                token.isNative
                  ? new AlgebraToken(
                      wallet.currentChainId,
                      zeroAddress,
                      wallet.currentChain.nativeToken.decimals,
                      wallet.currentChain.nativeToken.symbol,
                      wallet.currentChain.nativeToken.name
                    ) && ({ isNative: true } as Currency)
                  : new AlgebraToken(
                      wallet.currentChainId,
                      token.address,
                      token.decimals,
                      token.symbol,
                      token.name
                    )
              );
            }}
          />
          <div className="flex flex-col grow items-end">
            <Input
              disabled={disabled}
              type="text"
              value={storedValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStoredValue(e.target.value);
                handleInput(e.target.value);
              }}
              className={cn(
                "text-right",
                "!bg-transparent",
                "[&_*]:!bg-transparent",
                "data-[invalid=true]:!bg-transparent"
              )}
              classNames={{
                inputWrapper: cn(
                  "!bg-transparent",
                  "border-none",
                  "shadow-none",
                  "!transition-none",
                  "data-[invalid=true]:!bg-transparent",
                  "group-data-[invalid=true]:!bg-transparent"
                ),
                input: cn(
                  "!bg-transparent",
                  "!text-[#202020]",
                  "text-right",
                  "text-xl",
                  "!pr-0",
                  "[appearance:textfield]",
                  "[&::-webkit-outer-spin-button]:appearance-none",
                  "[&::-webkit-inner-spin-button]:appearance-none",
                  "data-[invalid=true]:!bg-transparent"
                ),
                clearButton: cn(
                  "opacity-70",
                  "hover:opacity-100",
                  "!text-black",
                  "!p-0"
                ),
              }}
              placeholder="0.0"
              maxDecimals={currency?.decimals ?? 0 + 2}
            />
            {showBalance && fiatValue && (
              <div className="text-sm">{formatUSD.format(fiatValue)}</div>
            )}
          </div>
        </div>
      </div>

      {label?.toLowerCase() !== "to" && (
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
      )}
    </div>
  );
};

export default TokenCardV3;
