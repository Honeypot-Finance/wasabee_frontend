import CurrencyLogo from "@/components/algebra/common/CurrencyLogo";
import { Input } from "@/components/algebra/ui/input";
import { Currency, CurrencyAmount } from "@cryptoalgebra/sdk";
import { useCallback, useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { Address } from "viem";
import { formatCurrency } from "@/lib/algebra/utils/common/formatCurrency";
import { Token } from "@/services/contract/token";
import TokenLogo from "@/components/TokenLogo/TokenLogo";

interface EnterAmountsCardProps {
  currency: Currency | undefined;
  value: string;
  needApprove: boolean;
  error: string | undefined;
  valueForApprove: CurrencyAmount<Currency> | undefined;
  handleChange: (value: string) => void;
}

const EnterAmountCard = ({
  currency,
  value,
  handleChange,
}: EnterAmountsCardProps) => {
  const { address: account } = useAccount();

  const { data: balance, isLoading } = useBalance({
    address: account,
    token: currency?.isNative
      ? undefined
      : (currency?.wrapped.address as Address),
    // watch: true,
  });

  const balanceString = useMemo(() => {
    if (isLoading || !balance) return "Loading...";

    return formatCurrency.format(Number(balance.formatted));
  }, [balance, isLoading]);

  const handleInput = useCallback((value: string) => {
    if (value === ".") value = "0.";
    handleChange(value);
  }, []);

  function setMax() {
    handleChange(balance?.formatted || "0");
  }

  return (
    <div className="flex w-full bg-card-dark p-3 rounded-2xl gap-x-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 xs:gap-4">
          {currency && (
            <TokenLogo
              addtionalClasses="w-8 sm:w-10"
              token={Token.getToken({
                address: (currency as any).address,
              })}
            />
          )}
          <span className="font-bold text-sm sm:text-lg">
            {currency ? currency.symbol : "Select a token"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-1">
        <Input
          value={value}
          id={`amount-${currency?.symbol}`}
          onUserInput={(v) => handleInput(v)}
          className={`text-right border text-xl font-bold p-2 honeypot-input w-full max-w-[300px]`}
          placeholder={"0.0"}
          maxDecimals={currency?.decimals}
        />
        {currency && account && (
          <div className={"flex text-sm whitespace-nowrap"}>
            <div>
              <span className="font-semibold">Balance: </span>
              <span>{balanceString}</span>
            </div>
            <button className="ml-2 text-[#63b4ff]" onClick={setMax}>
              Max
            </button>
          </div>
        )}
        {/* <div className="text-sm">{fiatValue && formatUSD.format(fiatValue)}</div> */}
      </div>
    </div>
  );

  // return (
  //   <div
  //       className="flex flex-col justify-between w-full relative">
  //     <div
  //     className="absolute text-right">
  //       {/* // {`Balance: ${displayNumber(balance)}`} */}
  //       {`Balance: ${balance.toString()}`}
  //     </div>

  //     <div
  //     className="flex items-center justify-between">
  //       <div className="flex items-center p-2">
  //         {/* <EquilibreAvatar
  //           src={asset?.logoURI || ''}
  //           size={'md'}
  //           ml={1}
  //           mr={4}
  //         /> */}
  //         <Input value={value} onChange={v => handleChange(v.target.value)} />
  //         {/* <InputGroup flexDirection={'column'}>
  //           <NumberInput
  //             step={0.1}
  //             colorScheme="white"
  //             variant={'unstyled'}
  //             value={value}
  //             onChange={handleChange}>
  //             <NumberInputField
  //               fontSize={'2xl'}
  //               placeholder="0"
  //               textAlign={'left'}
  //             />
  //           </NumberInput>
  //         </InputGroup> */}
  //       </div>
  //       <Button
  //         onClick={setMax}>
  //         MAX
  //       </Button>
  //     </div>
  //     <div className="mt-4">
  //       {error ? (
  //         <div className="flex flex-col absolute">
  //           {error}
  //         </div>
  //       ) : needApprove ? (
  //         <Button
  //           disabled={!approve || isApprovalLoading}
  //           onClick={() => approve()}>
  //           {isApprovalLoading ? 'Loading...' : `Approve ${currency?.symbol}`}
  //         </Button>
  //       ) : valueForApprove ? (
  //         <div className="absolute">
  //           {/* <CheckIcon /> */}
  //           Approved
  //         </div>
  //       ) : null}
  //     </div>
  //   </div>
  // );
};

export default EnterAmountCard;
