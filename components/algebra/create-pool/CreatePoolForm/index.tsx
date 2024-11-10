import { Button } from "@/components/algebra/ui/button";
import { useEffect, useMemo } from "react";
import {
  ADDRESS_ZERO,
  NonfungiblePositionManager,
  computePoolAddress,
} from "@cryptoalgebra/sdk";
import { useTransactionAwait } from "@/lib/algebra/hooks/common/useTransactionAwait";
import { useContractWrite } from "wagmi";
import { Address } from "viem";
import Loader from "@/components/algebra/common/Loader";
import { PoolState, usePool } from "@/lib/algebra/hooks/pools/usePool";
import Summary from "../Summary";
import SelectPair from "../SelectPair";
import { STABLECOINS } from "@/data/algebra/tokens";
import {
  useMintState,
  useDerivedMintInfo,
} from "@/lib/algebra/state/mintStore";
import { TransactionType } from "@/lib/algebra/state/pendingTransactionsStore";
import {
  useDerivedSwapInfo,
  useSwapState,
} from "@/lib/algebra/state/swapStore";
import { SwapField } from "@/types/algebra/types/swap-field";
import { useSimulateAlgebraPositionManagerMulticall } from "@/wagmi-generated";

const CreatePoolForm = () => {
  const { currencies } = useDerivedSwapInfo();

  const {
    actions: { selectCurrency },
  } = useSwapState();

  const {
    startPriceTypedValue,
    actions: { typeStartPriceInput },
  } = useMintState();

  const currencyA = currencies[SwapField.INPUT];
  const currencyB = currencies[SwapField.OUTPUT];

  const areCurrenciesSelected = currencyA && currencyB;

  const isSameToken =
    areCurrenciesSelected && currencyA.wrapped.equals(currencyB.wrapped);

  const poolAddress =
    areCurrenciesSelected && !isSameToken
      ? (computePoolAddress({
          tokenA: currencyA.wrapped,
          tokenB: currencyB.wrapped,
        }) as Address)
      : undefined;

  const [poolState] = usePool(poolAddress);

  const isPoolExists = poolState === PoolState.EXISTS;

  const mintInfo = useDerivedMintInfo(
    currencyA ?? undefined,
    currencyB ?? undefined,
    poolAddress ?? undefined,
    100,
    currencyA ?? undefined,
    undefined
  );

  const { calldata, value } = useMemo(() => {
    if (!mintInfo?.pool)
      return {
        calldata: undefined,
        value: undefined,
      };

    return NonfungiblePositionManager.createCallParameters(
      mintInfo.pool,
      ADDRESS_ZERO
    );
  }, [mintInfo?.pool]);

  const { data: createPoolConfig } = useSimulateAlgebraPositionManagerMulticall(
    {
      args: Array.isArray(calldata)
        ? [calldata as Address[]]
        : [[calldata] as Address[]],
      value: BigInt(value || 0),
      query: {
        enabled: Boolean(calldata),
      },
    }
  );

  const { data: createPoolData, writeContract: createPool } =
    useContractWrite();

  const { isLoading } = useTransactionAwait(
    createPoolData,
    {
      title: "Create Pool",
      tokenA: currencyA?.wrapped.address as Address,
      tokenB: currencyB?.wrapped.address as Address,
      type: TransactionType.POOL,
    },
    "/pools"
  );

  useEffect(() => {
    selectCurrency(SwapField.INPUT, undefined);
    selectCurrency(SwapField.OUTPUT, undefined);
    typeStartPriceInput("");

    return () => {
      selectCurrency(SwapField.INPUT, ADDRESS_ZERO);
      selectCurrency(SwapField.OUTPUT, STABLECOINS.USDT.address);
      typeStartPriceInput("");
    };
  }, []);

  return (
    <div className="flex flex-col gap-1 p-2 bg-card border border-card-border rounded-3xl">
      <h2 className="font-semibold text-xl text-left ml-2 mt-2">Select Pair</h2>
      <SelectPair
        mintInfo={mintInfo}
        currencyA={currencyA}
        currencyB={currencyB}
      />

      {areCurrenciesSelected && !isSameToken && !isPoolExists && (
        <Summary currencyA={currencyA} currencyB={currencyB} />
      )}

      <Button
        className="mt-2"
        disabled={
          isLoading ||
          isPoolExists ||
          !startPriceTypedValue ||
          !areCurrenciesSelected ||
          isSameToken
        }
        onClick={() =>
          createPoolConfig && createPool(createPoolConfig?.request)
        }
      >
        {isLoading ? (
          <Loader />
        ) : isSameToken ? (
          "Select another pair"
        ) : !areCurrenciesSelected ? (
          "Select currencies"
        ) : isPoolExists ? (
          "Pool already exists"
        ) : !startPriceTypedValue ? (
          "Enter initial price"
        ) : (
          "Create Pool"
        )}
      </Button>
    </div>
  );
};

export default CreatePoolForm;
