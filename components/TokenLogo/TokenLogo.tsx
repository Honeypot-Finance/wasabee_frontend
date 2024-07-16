import { Token } from "@/services/contract/token";
import Image from "next/image";

interface TokenLogoProps {
  token: Token;
  addtionalClasses?: string;
}

export default function TokenLogo({ token, addtionalClasses }: TokenLogoProps) {
  return (
    <Image
      className={
        "border border-[color:var(--card-stroke,#F7931A)] rounded-[50%] " +
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
  );
}
