import { usePoolsStore } from "@/services/algebra/state/poolsStore";
import {
  useReadAlgebraPoolGlobalState,
  useReadAlgebraPoolPlugin,
  useReadAlgebraBasePluginIncentive,
} from "@/wagmi-generated";
import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-sdk";
import { useEffect } from "react";
import { Address } from "viem";

export function usePoolPlugins(poolId: Address | undefined) {
  const { pluginsForPools, setPluginsForPool } = usePoolsStore();

  const skipFetch = Boolean(poolId && pluginsForPools[poolId]);

  const { data: globalState, isLoading: globalStateLoading } =
    useReadAlgebraPoolGlobalState({
      address: skipFetch ? undefined : poolId,
    });

  const { data: plugin, isLoading: pluginLoading } = useReadAlgebraPoolPlugin({
    address: skipFetch ? undefined : poolId,
  });

  const { data: hasFarmingPlugin, isLoading: farmingLoading } =
    useReadAlgebraBasePluginIncentive({
      address: skipFetch ? undefined : plugin,
    });

  // const { data: hasLimitOrderPlugin, isLoading: limitLoading } =
  //     useAlgebraBasePluginLimitOrderPlugin({
  //         address: skipFetch ? undefined : plugin,
  //     });

  const isLoading = globalStateLoading || pluginLoading || farmingLoading;

  const hasDynamicFee = globalState && Number(globalState[3]) >> 7 === 1;

  useEffect(() => {
    if (
      !poolId ||
      isLoading ||
      pluginsForPools[poolId.toLowerCase() as Address]
    )
      return;

    console.log("Setting plugins for pool", poolId, pluginsForPools[poolId]);
    setPluginsForPool(poolId, {
      dynamicFeePlugin: Boolean(hasDynamicFee),
      farmingPlugin: hasFarmingPlugin !== ADDRESS_ZERO,
      limitOrderPlugin: false,
    });
  }, [
    poolId,
    isLoading,
    pluginsForPools,
    hasDynamicFee,
    hasFarmingPlugin,
    setPluginsForPool,
  ]);

  if (poolId && pluginsForPools[poolId]) {
    return {
      ...pluginsForPools[poolId],
      isLoading: false,
    };
  }

  return {
    dynamicFeePlugin: Boolean(hasDynamicFee),
    farmingPlugin: hasFarmingPlugin !== ADDRESS_ZERO,
    limitOrderPlugin: false,
    isLoading,
  };
}
