import { cn } from "@/lib/tailwindcss";
import { Token } from "@/services/contract/token";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface TokenLogoProps {
  token: Token;
  addtionalClasses?: string;
  disableLink?: boolean;
  disableTooltip?: boolean;
}

export default function TokenLogo({
  token,
  addtionalClasses,
  disableLink,
  disableTooltip,
  ...props
}: TokenLogoProps) {
  return (
    <Tooltip
      content={
        <div className="flex flex-col items-center gap-[8px]">
          {token.name} ({token.symbol})
        </div>
      }
      isDisabled={disableTooltip}
      closeDelay={0}
    >
      <Link
        href={
          disableLink
            ? "#"
            : `https://bartio.beratrail.io/address/${token.address}`
        }
        target={disableLink ? "" : "_blank"}
      >
        <Image
          className={cn(
            "border border-[color:var(--card-stroke,#F7931A)] rounded-[50%] cursor-pointer",
            addtionalClasses
          )}
          src={
            !!token.logoURI
              ? token.logoURI
              : "/images/icons/tokens/unknown-token-icon.png"
          }
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </Tooltip>
  );
}
