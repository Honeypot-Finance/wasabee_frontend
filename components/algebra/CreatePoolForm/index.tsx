import {
  CUSTOM_POOL_BASE,
  CUSTOM_POOL_DEPLOYER_BLANK,
  CUSTOM_POOL_DEPLOYER_FEE_CHANGER,
} from "@/data/algebra/addresses";
import { STABLECOINS } from "@/data/algebra/tokens";
import { useTransactionAwait } from "@/lib/algebra/hooks/common/useTransactionAwait";
import { usePool, PoolState } from "@/lib/algebra/hooks/pools/usePool";
import {
  useMintState,
  useDerivedMintInfo,
} from "@/services/algebra/state/mintStore";
import { TransactionType } from "@/services/algebra/state/pendingTransactionsStore";
import {
  useDerivedSwapInfo,
  useSwapState,
} from "@/services/algebra/state/swapStore";
import { SwapField } from "@/types/algebra/types/swap-field";
import { computeCustomPoolAddress } from "@cryptoalgebra/custom-pools-sdk";
import {
  computePoolAddress,
  INITIAL_POOL_FEE,
  NonfungiblePositionManager,
  ADDRESS_ZERO,
} from "@cryptoalgebra/custom-pools-sdk";
import { Button } from "@nextui-org/react";
import { cn } from "@nextui-org/theme";
import { Address } from "viem";
import { Loader } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Account } from "viem";
import { useAccount, useContractWrite, useWriteContract } from "wagmi";
import SelectPair from "../SelectPair";
import Summary from "../Summary";
import {
  useSimulateAlgebraCustomPoolDeployerCreateCustomPool,
  useSimulateAlgebraPositionManagerMulticall,
} from "@/wagmi-generated";

const POOL_DEPLOYER = {
  BASE: "Base",
  FEE_CHANGER: "Fee Changer",
  BLANK: "Blank",
};

type PoolDeployerType = (typeof POOL_DEPLOYER)[keyof typeof POOL_DEPLOYER];

const customPoolDeployerAddresses = {
  [POOL_DEPLOYER.BASE]: CUSTOM_POOL_BASE,
  [POOL_DEPLOYER.BLANK]: CUSTOM_POOL_DEPLOYER_BLANK,
  [POOL_DEPLOYER.FEE_CHANGER]: CUSTOM_POOL_DEPLOYER_FEE_CHANGER,
};

const CreatePoolForm = () => {
  const { address: account } = useAccount();

  const { currencies } = useDerivedSwapInfo();

  const {
    actions: { selectCurrency },
  } = useSwapState();

  const {
    startPriceTypedValue,
    actions: { typeStartPriceInput },
  } = useMintState();

  const [poolDeployer, setPoolDeployer] = useState<PoolDeployerType>(
    POOL_DEPLOYER.BASE
  );

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

  const customPoolsAddresses =
    areCurrenciesSelected && !isSameToken
      ? [CUSTOM_POOL_DEPLOYER_BLANK, CUSTOM_POOL_DEPLOYER_FEE_CHANGER].map(
          (customPoolDeployer) =>
            computeCustomPoolAddress({
              tokenA: currencyA.wrapped,
              tokenB: currencyB.wrapped,
              customPoolDeployer,
            }) as Address
        )
      : [];

  const [poolState] = usePool(poolAddress);

  // TODO
  const [poolState0] = usePool(customPoolsAddresses[0]);
  const [poolState1] = usePool(customPoolsAddresses[1]);

  const isPoolExists =
    poolState === PoolState.EXISTS && poolDeployer === POOL_DEPLOYER.BASE;
  const isPool0Exists =
    poolState0 === PoolState.EXISTS && poolDeployer === POOL_DEPLOYER.BLANK;
  const isPool1Exists =
    poolState1 === PoolState.EXISTS &&
    poolDeployer === POOL_DEPLOYER.FEE_CHANGER;

  const isSelectedCustomPoolExists =
    isPoolExists || isPool0Exists || isPool1Exists;

  const mintInfo = useDerivedMintInfo(
    currencyA ?? undefined,
    currencyB ?? undefined,
    poolAddress ?? undefined,
    INITIAL_POOL_FEE,
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
      customPoolDeployerAddresses[poolDeployer]
    );
  }, [mintInfo?.pool, poolDeployer]);

  const { data: createBasePoolConfig } =
    useSimulateAlgebraPositionManagerMulticall({
      args: Array.isArray(calldata)
        ? [calldata as Address[]]
        : [[calldata] as Address[]],
      value: BigInt(value || 0),
      query: {
        enabled: Boolean(calldata),
      },
    });

  const { data: createBasePoolData, writeContract: createBasePool } =
    useWriteContract();

  const { isLoading: isBasePoolLoading } = useTransactionAwait(
    createBasePoolData,
    {
      title: "Create Base Pool",
      tokenA: currencyA?.wrapped?.address as Address,
      tokenB: currencyB?.wrapped?.address as Address,
      type: TransactionType.POOL,
    },
    "/pools"
  );

  const isCustomPoolDeployerReady =
    account && mintInfo.pool && poolDeployer !== POOL_DEPLOYER.BASE;

  const { data: createCustomPoolConfig } =
    useSimulateAlgebraCustomPoolDeployerCreateCustomPool({
      address: isCustomPoolDeployerReady
        ? customPoolDeployerAddresses[poolDeployer]
        : undefined,
      args: isCustomPoolDeployerReady
        ? [
            customPoolDeployerAddresses[poolDeployer],
            account,
            mintInfo.pool?.token0.address as Address,
            mintInfo.pool?.token1.address as Address,
            "0x0",
          ]
        : undefined,
      query: {
        enabled: Boolean(isCustomPoolDeployerReady),
      },
    });

  console.log(
    "createCustomPoolConfig",
    isCustomPoolDeployerReady,
    customPoolDeployerAddresses[poolDeployer]
  );

  const { data: createCustomPoolData, writeContract: createCustomPool } =
    useWriteContract();

  const { isLoading: isCustomPoolLoading } = useTransactionAwait(
    createCustomPoolData,
    {
      title: "Create Custom Pool",
      tokenA: currencyA?.wrapped?.address as Address,
      tokenB: currencyB?.wrapped?.address as Address,
      type: TransactionType.POOL,
    },
    "/pools"
  );

  const isLoading = isCustomPoolLoading || isBasePoolLoading;

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

  const handlePoolDeployerChange = (poolDeployer: PoolDeployerType) => {
    setPoolDeployer(poolDeployer);
  };

  const handleCreatePool = () => {
    if (poolDeployer === POOL_DEPLOYER.BASE) {
      if (!createBasePool) return;
      createBasePool(createBasePoolConfig!.request);
    }
    if (!createCustomPool) return;
    createCustomPool(createCustomPoolConfig!.request);
  };

  const isDisabled = Boolean(
    isLoading ||
      isSelectedCustomPoolExists ||
      !startPriceTypedValue ||
      !areCurrenciesSelected ||
      isSameToken
  );

  return (
    <div className="flex flex-col gap-1 p-2 bg-card border border-card-border rounded-3xl">
      <h2 className="font-semibold text-xl text-left ml-2 mt-2">Select Pair</h2>
      <SelectPair
        mintInfo={mintInfo}
        currencyA={currencyA}
        currencyB={currencyB}
      />

      {areCurrenciesSelected && !isSameToken && !isSelectedCustomPoolExists && (
        <Summary currencyA={currencyA} currencyB={currencyB} />
      )}

      <div className="text-left font-bold">
        <div>Plugin</div>
        <div className="grid grid-cols-2 w-100 gap-4 my-2">
          {Object.entries(POOL_DEPLOYER).map(([, v]) => (
            <button
              key={v}
              onClick={() => handlePoolDeployerChange(v)}
              className={cn(
                "px-3 py-2 rounded-lg border",
                poolDeployer === v ? "border-blue-500" : "border-gray-600"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <Button className="mt-2" disabled={isDisabled} onClick={handleCreatePool}>
        {isLoading ? (
          <Loader />
        ) : isSameToken ? (
          "Select another pair"
        ) : !areCurrenciesSelected ? (
          "Select currencies"
        ) : isSelectedCustomPoolExists ? (
          "Pool already exists"
        ) : !startPriceTypedValue ? (
          "Enter initial price"
        ) : (
          "Create Pool"
        )}
      </Button>

      {poolDeployer !== POOL_DEPLOYER.BASE && (
        <Button
          disabled={isDisabled}
          onClick={() =>
            createBasePool && createBasePool(createBasePoolConfig!.request)
          }
          className="mt-2"
        >
          {isBasePoolLoading ? <Loader /> : "Initialize"}
        </Button>
      )}
    </div>
  );
};

export default CreatePoolForm;
