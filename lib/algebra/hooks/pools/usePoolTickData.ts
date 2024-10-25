import {
  Currency,
  TickMath,
  Token,
  computePoolAddress,
  tickToPrice,
} from "@cryptoalgebra/integral-sdk";
import { useState } from "react";
import { Address } from "viem";
import keyBy from "lodash.keyby";
import { AlgebraPoolContract } from "@/services/contract/algebra/algebra-pool-contract";

interface TickProcessed {
  liquidityActive: bigint;
  tickIdx: number;
  liquidityNet: bigint;
  price0: string;
  price1: string;
  liquidityGross: bigint;
}

interface TicksResult {
  ticksProcessed: TickProcessed[];
  tickSpacing: number;
  activeTickIdx: number;
  token0: Token;
  token1: Token;
}

export function useInfoTickData() {
  const numSurroundingTicks = 500;
  const PRICE_FIXED_DIGITS = 8;

  const [ticksResult, setTicksResult] = useState<TicksResult | null>(null);
  const [ticksLoading, setTicksLoading] = useState(false);

  async function fetchInitializedTicks(poolAddress: Address) {
    let surroundingTicks = [];
    let surroundingTicksResult: any = [];

    const pool = AlgebraPoolContract.getPool({ address: poolAddress });
    await pool.init();

    do {
      let skip = 0;
      const ticks = await pool.ticks(skip);

      if (!ticks) {
        return {
          loading: true,
          ticks: surroundingTicksResult,
        };
      }

      surroundingTicks = ticks as any;
      surroundingTicksResult = surroundingTicksResult.concat(surroundingTicks);
      skip += 1000;
    } while (surroundingTicks.length > 0);

    return { ticks: surroundingTicksResult, loading: false, error: false };
  }

  async function fetchTicksSurroundingPrice(
    currencyA: Currency,
    currencyB: Currency
  ) {
    setTicksLoading(true);

    const poolId = computePoolAddress({
      tokenA: currencyA.wrapped,
      tokenB: currencyB.wrapped,
    }).toLowerCase() as Address;

    const pool = AlgebraPoolContract.getPool({ address: poolId });
    await pool.init();

    try {
      if (
        !pool ||
        !pool.token0.value ||
        !pool.token1.value ||
        !pool.tickSpacing.value ||
        !pool.globalState.value ||
        !pool.liquidity.value
      )
        return;

      const { globalState, liquidity } = pool;

      const tickSpacing = Number(pool.tickSpacing.value);

      const poolCurrentTickIdx = globalState.value?.[1] ?? 0;

      const activeTickIdx =
        Math.floor(poolCurrentTickIdx / tickSpacing) * tickSpacing;

      const initializedTicksResult = await fetchInitializedTicks(poolId);

      if (initializedTicksResult.error || initializedTicksResult.loading) {
        return {
          error: initializedTicksResult.error,
          loading: initializedTicksResult.loading,
        };
      }

      const { ticks: initializedTicks } = initializedTicksResult;

      const tickIdxToInitializedTick = keyBy(initializedTicks, "tickIdx");

      const token0 = new Token(
        1,
        pool.token0.value?.address,
        pool.token0.value?.decimals
      );
      const token1 = new Token(
        1,
        pool.token1.value?.address,
        pool.token1.value?.decimals
      );

      let activeTickIdxForPrice = activeTickIdx;
      if (activeTickIdxForPrice < TickMath.MIN_TICK) {
        activeTickIdxForPrice = TickMath.MIN_TICK;
      }
      if (activeTickIdxForPrice > TickMath.MAX_TICK) {
        activeTickIdxForPrice = TickMath.MAX_TICK;
      }

      const activeTickProcessed = {
        liquidityActive: liquidity.value ?? BigInt(0),
        tickIdx: activeTickIdx,
        liquidityNet: BigInt(0),
        price0: tickToPrice(token0, token1, activeTickIdxForPrice).toFixed(
          PRICE_FIXED_DIGITS
        ),
        price1: tickToPrice(token1, token0, activeTickIdxForPrice).toFixed(
          PRICE_FIXED_DIGITS
        ),
        liquidityGross: BigInt(0),
      };

      const activeTick = tickIdxToInitializedTick[activeTickIdx];
      if (activeTick) {
        activeTickProcessed.liquidityGross = BigInt(activeTick.liquidityGross);
        activeTickProcessed.liquidityNet = BigInt(activeTick.liquidityNet);
      }

      const Direction = {
        ASC: "ASC",
        DESC: "DESC",
      };

      // Computes the numSurroundingTicks above or below the active tick.
      const computeSurroundingTicks = (
        activeTickProcessed: TickProcessed,
        tickSpacing: number,
        numSurroundingTicks: number,
        direction: string
      ) => {
        let previousTickProcessed = {
          ...activeTickProcessed,
        };

        // Iterate outwards (either up or down depending on 'Direction') from the active tick,
        // building active liquidity for every tick.
        let processedTicks = [];
        for (let i = 0; i < numSurroundingTicks; i++) {
          const currentTickIdx =
            direction == Direction.ASC
              ? previousTickProcessed.tickIdx + tickSpacing
              : previousTickProcessed.tickIdx - tickSpacing;

          if (
            currentTickIdx < TickMath.MIN_TICK ||
            currentTickIdx > TickMath.MAX_TICK
          ) {
            break;
          }

          const currentTickProcessed = {
            liquidityActive: previousTickProcessed.liquidityActive,
            tickIdx: currentTickIdx,
            liquidityNet: BigInt(0),
            price0: tickToPrice(token0, token1, currentTickIdx).toFixed(
              PRICE_FIXED_DIGITS
            ),
            price1: tickToPrice(token1, token0, currentTickIdx).toFixed(
              PRICE_FIXED_DIGITS
            ),
            liquidityGross: BigInt(0),
          };

          const currentInitializedTick =
            tickIdxToInitializedTick[currentTickIdx.toString()];
          if (currentInitializedTick) {
            currentTickProcessed.liquidityGross = BigInt(
              currentInitializedTick.liquidityGross
            );
            currentTickProcessed.liquidityNet = BigInt(
              currentInitializedTick.liquidityNet
            );
          }

          if (direction == Direction.ASC && currentInitializedTick) {
            currentTickProcessed.liquidityActive =
              BigInt(previousTickProcessed.liquidityActive) +
              BigInt(currentInitializedTick.liquidityNet);
          } else if (
            direction == Direction.DESC &&
            BigInt(previousTickProcessed.liquidityNet) !== BigInt(0)
          ) {
            currentTickProcessed.liquidityActive =
              BigInt(previousTickProcessed.liquidityActive) -
              BigInt(previousTickProcessed.liquidityNet);
          }

          processedTicks.push(currentTickProcessed);
          previousTickProcessed = currentTickProcessed;
        }

        if (direction == Direction.DESC) {
          processedTicks = processedTicks.reverse();
        }

        return processedTicks;
      };

      const subsequentTicks = computeSurroundingTicks(
        activeTickProcessed,
        tickSpacing,
        numSurroundingTicks,
        Direction.ASC
      );

      const previousTicks = computeSurroundingTicks(
        activeTickProcessed,
        tickSpacing,
        numSurroundingTicks,
        Direction.DESC
      );

      const ticksProcessed = previousTicks
        .concat(activeTickProcessed)
        .concat(subsequentTicks);

      setTicksResult({
        ticksProcessed,
        tickSpacing: Number(tickSpacing),
        activeTickIdx,
        token0,
        token1,
      });
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setTicksLoading(false);
    }
  }

  return {
    fetchTicksSurroundingPrice: {
      ticksResult,
      ticksLoading,
      fetchTicksSurroundingPrice,
    },
  };
}
