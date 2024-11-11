import { Input } from "@/components/algebra/ui/input";
import { formatBalance } from "@/lib/algebra/utils/common/formatBalance";
import { formatUSD } from "@/lib//algebra/utils/common/formatUSD";
import { Currency, Percent } from "@cryptoalgebra/sdk";
import { useCallback, useMemo, useState } from "react";
import { useAccount, useBalance, useWatchBlockNumber } from "wagmi";
import { Address } from "viem";
import { TokenSelector } from "@/components/TokenSelector";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { wallet } from "@/services/wallet";
import { Token } from "@/services/contract/token";
import { Accordion, AccordionItem, Slider } from "@nextui-org/react";
import { WrappedNextAccordion } from "@/components/wrappedNextUI/Accordion/Accordion";
import { BiDownArrow } from "react-icons/bi";

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

  const balanceString = useMemo(() => {
    if (isLoading || !balance) return "Loading...";

    return formatBalance(balance.formatted);
  }, [balance, isLoading]);

  const handleInput = useCallback((value: string) => {
    if (value === ".") value = "0.";
    handleValueChange?.(value);
  }, []);

  const handleTokenSelect = (newCurrency: Currency) => {
    handleTokenSelection(newCurrency);
  };

  return (
    <div className="p-2">
      <div className="flex w-full py-1 bg-card-dark rounded-2xl">
        <div className="flex flex-col min-w-fit">
          <div className="text-sub text-sm font-normal ">{label}</div>

          <Input
            disabled={disabled}
            type={"text"}
            value={value}
            id={`amount-${currency?.symbol}`}
            onUserInput={(v) => handleInput(v)}
            className={`text-right border-none text-xl font-bold w-9/12 p-0 disabled:cursor-default disabled:text-white`}
            placeholder={"0.0"}
            maxDecimals={currency?.decimals}
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
                  })
                : undefined
            }
            onSelect={(token) => {
              handleTokenSelect(
                new AlgebraToken(
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
                maxValue={Number(balance)}
                minValue={0}
                onChange={(value) => {
                  handleValueChange?.(value.toString());
                }}
                value={Number(value)}
                step={Math.pow(0.1, 18)}
              ></Slider>
            </div>
          </div>
        </AccordionItem>
      </WrappedNextAccordion>
    </div>
  );
};

export default TokenCardV3;
