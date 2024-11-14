import CurrencyLogo from "@/components/algebra/common/CurrencyLogo";
import PageTitle from "@/components/algebra/common/PageTitle";
import { Skeleton } from "@/components/algebra/ui/skeleton";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import { formatPercent } from "@/lib/algebra/utils/common/formatPercent";
import { Pool } from "@cryptoalgebra/sdk";
import { Address } from "viem";
import { Token } from "@/services/contract/token";

interface PoolHeaderProps {
  pool: Pool | null;
}

const PoolHeader = ({ pool }: PoolHeaderProps) => {
  const [token0, token1] = pool ? [pool.token0, pool.token1] : [];

  const currencyA = useCurrency(token0?.address as Address, true);
  const currencyB = useCurrency(token1?.address as Address, true);

  const poolFee = pool && formatPercent.format(pool.fee / 10_00000);

  return (
    <div className="flex items-center w-full gap-3.5">
      <div className="flex">
        <div className="z-10">
          {(currencyA as any)?.address && (
            <TokenLogo
              size={40}
              token={Token.getToken({
                address: (currencyA as any).address,
              })}
            />
          )}
        </div>
        <div className="-ml-4">
          {(currencyB as any)?.address && (
            <TokenLogo
              size={40}
              token={Token.getToken({
                address: (currencyB as any).address,
              })}
            />
          )}
        </div>
      </div>

      {/* TODO: bg color  */}
      {currencyA && currencyB ? (
        <PageTitle title={`${currencyA.symbol} / ${currencyB.symbol}`}>
          <span className="hidden sm:inline px-3 py-2 font-medium rounded-full text-[#479FFF] border border-[#271A0C] bg-[#F7931A]/20">{`${poolFee}`}</span>
        </PageTitle>
      ) : (
        <Skeleton className="w-[200px] h-[40px] bg-card" />
      )}
    </div>
  );
};

export default PoolHeader;
