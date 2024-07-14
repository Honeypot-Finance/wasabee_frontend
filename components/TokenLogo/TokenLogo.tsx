import { Token } from "@/services/contract/token";
import Image from "next/image";

export default function TokenLogo({ token }: { token: Token }) {
  return (
    <Image
      className="border border-[color:var(--card-stroke,#F7931A)] rounded-[50%]"
      src={
        !!token.logoURI ? token.logoURI : "/images/icons/unknown-token-icon.png"
      }
      alt=""
      width={24}
      height={24}
    />
  );
}
