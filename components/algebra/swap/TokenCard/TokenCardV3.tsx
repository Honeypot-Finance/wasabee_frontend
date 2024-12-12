import { Input } from "@/components/algebra/ui/input";
import { formatBalance } from "@/lib/algebra/utils/common/formatBalance";
import { formatUSD } from "@/lib//algebra/utils/common/formatUSD";
import { Currency, Percent } from "@cryptoalgebra/sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useWatchBlockNumber } from "wagmi";
import { Address, zeroAddress } from "viem";
import { TokenSelector } from "@/components/TokenSelector";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { wallet } from "@/services/wallet";
import { Token } from "@/services/contract/token";
import { Accordion, AccordionItem, Slider } from "@nextui-org/react";
import { WrappedNextAccordion } from "@/components/wrappedNextUI/Accordion/Accordion";
import { BiDownArrow } from "react-icons/bi";
import { debounce } from "lodash";
import { ItemSelect, SelectState, SelectItem } from "@/components/ItemSelect";
import NativeCurrency from "@cryptoalgebra/sdk/dist/entities/NativeCurrency";
import {
  BASES_TO_CHECK_TRADES_AGAINST,
  WNATIVE_EXTENDED,
} from "@/data/algebra/routing";

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
    <div className="p-2">
      <div className="flex w-full py-1 bg-card-dark rounded-2xl">
        <div className="flex flex-col w-full">
          <div className="text-sub text-sm font-normal ">{label}</div>

          <Input
            disabled={disabled}
            type={"text"}
            value={storedValue}
            id={`amount-${currency?.symbol}`}
            onUserInput={(v) => {
              setStoredValue(v);
              handleInput(v);
            }}
            className={`bg-transparent border-none text-xl font-bold w-11/12 p-2 disabled:cursor-default disabled:text-white 
               focus:bg-black/20 focus:outline-none focus:boader-none focus:ring-0 
                focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent
              `}
            placeholder={"0.0"}
            maxDecimals={currency?.decimals ?? 0 + 2}
          />
          {showBalance && (
            <div className="text-sm">
              {fiatValue && formatUSD.format(fiatValue)}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end w-full">
          {currency && account && (
            <div className={"flex text-sm whitespace-nowrap"}>
              {showBalance && (
                <div>
                  <span className="font-semibold">Balance: </span>
                  <span>{balanceString}</span>
                </div>
              )}
              {showMaxButton && (
                <button
                  className="ml-2 text-[#63b4ff]"
                  onClick={handleMaxValue}
                >
                  Max
                </button>
              )}
            </div>
          )}
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
        </div>
      </div>
      <WrappedNextAccordion>
        <AccordionItem
          title={
            <span className="flex w-full justify-center items-center text-center">
              <BiDownArrow />
            </span>
          }
          className=""
          classNames={{
            base: "bg-black/25 rounded-2xl",
            titleWrapper: "text-center",
            trigger: "py-1",
          }}
          hideIndicator
        >
          <div className="p-2">
            <div className="w-full flex justify-end items-center">
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
              ></Slider>
            </div>
          </div>

          <div className="p-2">
            <div className="w-full flex justify-end items-center">
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
            </div>
          </div>
        </AccordionItem>
      </WrappedNextAccordion>
    </div>
  );
};

export default TokenCardV3;
