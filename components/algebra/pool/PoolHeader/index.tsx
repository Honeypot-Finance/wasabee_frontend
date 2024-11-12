import CurrencyLogo from "@/components/algebra/common/CurrencyLogo";
import PageTitle from "@/components/algebra/common/PageTitle";
import { Skeleton } from "@/components/algebra/ui/skeleton";
import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import { formatPercent } from "@/lib/algebra/utils/common/formatPercent";
import { Pool } from "@cryptoalgebra/sdk";
import { Address } from "viem";

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
        <CurrencyLogo currency={currencyA} size={40} className="z-10" />
        <CurrencyLogo currency={currencyB} size={40} className="-ml-2" />
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
