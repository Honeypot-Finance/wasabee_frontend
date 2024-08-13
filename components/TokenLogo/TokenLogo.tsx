import { Token } from "@/services/contract/token";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface TokenLogoProps {
  token: Token;
  addtionalClasses?: string;
}

export default function TokenLogo({ token, addtionalClasses }: TokenLogoProps) {
  return (
    <Tooltip
      content={
        <div className="flex flex-col items-center gap-[8px]">
          {token.name} ({token.symbol})
        </div>
      }
      closeDelay={0}
    >
      <Link
        href={`https://bartio.beratrail.io/address/${token.address}`}
        target="_blank"
      >
        <Image
          className={
            "border border-[color:var(--card-stroke,#F7931A)] rounded-[50%] cursor-pointer" +
            addtionalClasses
          }
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
