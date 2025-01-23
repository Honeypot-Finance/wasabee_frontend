import AlgebraLogo from "@/assets/algebra/algebra-logo.svg";
import AlgebraIntegral from "@/assets/algebra/algebra-itegral.svg";
import { cn } from "@/lib/tailwindcss";
import AlphaKekLogo from "@/public/images/partners/alphakek-logo.png";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

const PoweredByAlgebra = ({ className }: { className?: string }) => {
  return (
    <a
      href={"https://algebra.finance"}
      className={cn("flex items-center gap-2 p-2", className)}
    >
      <span className="text-sm font-semibold">Powered by</span>
      <div className="flex items-center gap-1">
        <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full">
          <img src={AlgebraLogo} width={18} height={18} />
        </div>
        <img src={AlgebraIntegral} width={120} height={18} />
      </div>
    </a>
  );
};

export const PoweredByAlphaKek = ({ className }: { className?: string }) => {
  return (
    <a
      href={"https://alphakek.ai"}
      className={cn("flex items-center gap-2 p-2 text-black", className)}
      target="_blank"
    >
      <span className="text-sm font-semibold">Powered by</span>
      <Tooltip content="AlphaKek">
        <Image src={AlphaKekLogo} alt="AlphaKek Logo" width={24} height={24} />
      </Tooltip>
    </a>
  );
};

export default PoweredByAlgebra;
