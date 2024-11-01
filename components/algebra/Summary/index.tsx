import { useMintState } from "@/services/algebra/state/mintStore";
import { Currency } from "@cryptoalgebra/custom-pools-sdk";
import { Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Address } from "viem";
import CurrencyLogo from "../common/CurrencyLogo";
import { observer } from "mobx-react-lite";
import { Token } from "@/services/contract/token";
import BigNumber from "bignumber.js";

interface ISummary {
  currencyA: Currency | undefined;
  currencyB: Currency | undefined;
}

const Summary = observer(({ currencyA, currencyB }: ISummary) => {
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const { startPriceTypedValue } = useMintState();

  const token0 = currencyA?.wrapped?.address.toLowerCase() as Address;
  const token1 = currencyB?.wrapped?.address.toLowerCase() as Address;

  const singleToken0 = token0 && Token.getToken({ address: token0 });
  const singleToken1 = token1 && Token.getToken({ address: token1 });

  useEffect(() => {
    if (!singleToken0 || !singleToken1) return;
    if (
      Number(singleToken0.derivedUSD) === 0 ||
      Number(singleToken1.derivedUSD) === 0
    ) {
      setSuggestedPrice(0);
      return;
    }

    const suggstdPrice = new BigNumber(singleToken1.derivedUSD).div(
      new BigNumber(singleToken0.derivedUSD)
    );
    const filteredSuggstdPrice = Number(suggstdPrice.toFixed(4));

    setSuggestedPrice(filteredSuggstdPrice);
  }, [singleToken0, singleToken1]);

  return (
    <div className="flex flex-col gap-4 bg-card-dark py-2 px-3 rounded-lg">
      <div className="flex items-center gap-4 ml-2 justify-between">
        <div className="flex">
          <CurrencyLogo currency={currencyA} size={30} />
          <CurrencyLogo currency={currencyB} size={30} className="-ml-2" />
        </div>

        {currencyA && currencyB ? (
          <div className="mr-auto">{`${currencyA?.symbol} - ${currencyB?.symbol}`}</div>
        ) : (
          <Skeleton className="h-[20px] w-[90px] bg-card" />
        )}

        <div>
          {`1 ${currencyA?.symbol} = ${startPriceTypedValue || 0} ${
            currencyB?.symbol
          }`}
        </div>
      </div>
      {suggestedPrice > 0 && (
        <div className="text-left ml-2 flex justify-between">
          <p className="opacity-50">Suggested price:</p>
          <p className="opacity-50">{` 1 ${currencyA?.symbol} = ${suggestedPrice} ${currencyB?.symbol}`}</p>
        </div>
      )}
    </div>
  );
});

export default Summary;
