import { Currency } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "viem";
import USDTLogo from "@/assets/tokens/usdt.png";
import USDCLogo from "@/assets/tokens/usdc.svg";
import WBTCLogo from "@/assets/tokens/wbtc.svg";
import EtherLogo from "@/assets/tokens/ether.svg";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "@nextui-org/react";

interface CurrencyLogoProps {
  currency: Currency | undefined | null;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

export const specialTokens: {
  [key: Address]: { symbol: string; logo: string };
} = {};

const CurrencyLogo = ({
  currency,
  size,
  className,
  style = {},
}: CurrencyLogoProps) => {
  if (!currency)
    return (
      <Skeleton
        className={cn(`flex rounded-full bg-card-dark`, className)}
        style={{
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          width: `${size}px`,
          height: `${size}px`,
          ...style,
        }}
      />
    );

  const address = currency.wrapped.address.toLowerCase() as Address;

  const classString = cn(
    `w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px] bg-card-dark rounded-full`,
    className
  );

  return (
    <div
      className={`${classString} flex items-center justify-center bg-white text-black`}
      style={{
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      {currency.symbol?.slice(0, 2)}
    </div>
  );
};

export default CurrencyLogo;
