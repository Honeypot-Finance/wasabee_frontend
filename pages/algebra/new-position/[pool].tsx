import PageContainer from "@/components/algebra/common/PageContainer";
import PageTitle from "@/components/algebra/common/PageTitle";
import LiquidityChart from "@/components/algebra/create-position/LiquidityChart";
import RangeSelector from "@/components/algebra/create-position/RangeSelector";
import PresetTabs from "@/components/algebra/create-position/PresetTabs";
import { Bound, INITIAL_POOL_FEE } from "@cryptoalgebra/custom-pools-sdk";
import { useEffect, useMemo } from "react";
import { Address } from "viem";
import AmountsSection from "@/components/algebra/create-position/AmountsSection";
import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import {
  useDerivedMintInfo,
  useRangeHopCallbacks,
  useMintActionHandlers,
  useMintState,
} from "@/services/algebra/state/mintStore";
import { ManageLiquidity } from "@/types/algebra/types/manage-liquidity";
import { useParams } from "next/navigation";
import {
  useReadAlgebraPoolToken0,
  useReadAlgebraPoolToken1,
} from "@/wagmi-generated";
import CardContianer from "@/components/CardContianer/CardContianer";

type NewPositionPageParams = Record<"pool", Address>;

const NewPositionPage = () => {
  const { pool: poolAddress } = useParams<NewPositionPageParams>();

  const { data: token0 } = useReadAlgebraPoolToken0({
    address: poolAddress,
  });

  const { data: token1 } = useReadAlgebraPoolToken1({
    address: poolAddress,
  });

  const currencyA = useCurrency(token0, true);
  const currencyB = useCurrency(token1, true);

  const mintInfo = useDerivedMintInfo(
    currencyA ?? undefined,
    currencyB ?? undefined,
    poolAddress,
    INITIAL_POOL_FEE,
    currencyA ?? undefined,
    undefined
  );

  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } =
    mintInfo.pricesAtTicks;

  const price = useMemo(() => {
    if (!mintInfo.price) return;

    return mintInfo.invertPrice
      ? mintInfo.price.invert().toSignificant(5)
      : mintInfo.price.toSignificant(5);
  }, [mintInfo]);

  const currentPrice = useMemo(() => {
    if (!mintInfo.price) return;

    if (Number(price) <= 0.0001) {
      return `< 0.0001 ${currencyB?.symbol}`;
    } else {
      return `${price} ${currencyB?.symbol}`;
    }
  }, [mintInfo.price, price]);

  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = useMemo(() => {
    return mintInfo.ticks;
  }, [mintInfo]);

  const {
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
  } = useRangeHopCallbacks(
    currencyA ?? undefined,
    currencyB ?? undefined,
    mintInfo.tickSpacing,
    tickLower,
    tickUpper,
    mintInfo.pool
  );

  const { onLeftRangeInput, onRightRangeInput } = useMintActionHandlers(
    mintInfo.noLiquidity
  );

  const { startPriceTypedValue } = useMintState();

  useEffect(() => {
    return () => {
      onLeftRangeInput("");
      onRightRangeInput("");
    };
  }, []);

  return (
    <PageContainer>
      <PageTitle title={"Create Position"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-0 gap-y-8 w-full lg:gap-8 mt-8 lg:mt-16 text-left">
        <div className="col-span-2">
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="font-semibold text-2xl text-left">
              1. Select Range
            </h2>
            <PresetTabs
              currencyA={currencyA}
              currencyB={currencyB}
              mintInfo={mintInfo}
            />
          </div>

          <div className="flex flex-col w-full">
            <CardContianer
              childrenAutoSize
              addtionalClassName="flex-col w-full px-8 py-6  text-left rounded-3xl"
            >
              <div className="flex w-full flex-col md:flex-row gap-4">
                <RangeSelector
                  priceLower={priceLower}
                  priceUpper={priceUpper}
                  getDecrementLower={getDecrementLower}
                  getIncrementLower={getIncrementLower}
                  getDecrementUpper={getDecrementUpper}
                  getIncrementUpper={getIncrementUpper}
                  onLeftRangeInput={onLeftRangeInput}
                  onRightRangeInput={onRightRangeInput}
                  currencyA={currencyA}
                  currencyB={currencyB}
                  mintInfo={mintInfo}
                  disabled={!startPriceTypedValue && !mintInfo.price}
                />
                <div className="md:ml-auto md:text-right">
                  <div className="font-bold text-xs mb-3">CURRENT PRICE</div>
                  <div className="font-bold text-xl">{`${currentPrice}`}</div>
                </div>
              </div>

              <LiquidityChart
                currencyA={currencyA}
                currencyB={currencyB}
                pool={mintInfo.pool}
                currentPrice={price ? parseFloat(price) : undefined}
                priceLower={priceLower}
                priceUpper={priceUpper}
              />
            </CardContianer>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl text-left mb-6 leading-[44px]">
            2. Enter Amounts
          </h2>
          <CardContianer
            childrenAutoSize
            addtionalClassName="flex flex-col w-full h-full gap-2 p-2"
          >
            <AmountsSection
              currencyA={currencyA}
              currencyB={currencyB}
              mintInfo={mintInfo}
              manageLiquidity={ManageLiquidity.ADD}
            />
          </CardContianer>
        </div>
      </div>
    </PageContainer>
  );
};

export default NewPositionPage;
