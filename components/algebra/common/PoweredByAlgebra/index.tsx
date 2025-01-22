import AlgebraLogo from "@/public/images/partners/algebra_logo.svg";
import WasabeeLogo from "@/public/images/partners/wasabee.png";
import { cn } from "@/lib/tailwindcss";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
const PoweredByAlgebra = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 p-2", className)}
    >
      <span className="text-sm font-semibold">Powered by</span>
      <div className="flex items-center gap-1">
        <Link
          href={"https://algebra.finance"}
          target="_blank"
          className="flex items-center gap-1"
        >
          <Tooltip content="Algebra Integral">
            <Image
              src={AlgebraLogo}
              width={24}
              height={24}
              alt="Algebra Logo"
            />
          </Tooltip>
        </Link>
        <span>&</span>
        <Link
          href={"https://x.com/WasabeeFi"}
          target="_blank"
          className="flex items-center gap-1"
        >
          {/* <span>Wasabee</span> */}
          <Tooltip content="Wasabee Finance">
            <Image
              src={WasabeeLogo}
              width={24}
              height={24}
              alt="Wasabee Logo"
            />
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default PoweredByAlgebra;
