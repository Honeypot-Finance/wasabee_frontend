import { action, makeAutoObservable, reaction } from "mobx";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import { AsyncState } from "./utils";
import { ChartDataResponse } from "./priceFeed/priceFeedTypes";
import { wallet } from "./wallet";
import { trpcClient } from "@/lib/trpc";
import { dayjs } from "@/lib/dayjs";

class Chart {
  showChart = false;
  chartTarget: Token | PairContract | null = null;
  tokenNumber: 0 | 1 = 0;
  currencyCode: "USD" | "TOKEN" = "USD";
  resolution: "1" | "5" | "15" | "30" | "60" | "240" | "720" | "1D" | "7D" =
    "30";
  range: "1D" | "3D" | "7D" | "15D" | "1M" = "1D";

  chartData = new AsyncState<
    () => Promise<ChartDataResponse | undefined>,
    ChartDataResponse | undefined
  >(async () => {
    if (!this.chartTarget) {
      return undefined;
    }

    const priceDataRequest = await trpcClient.priceFeed.getChartData.query({
      chainId: wallet.currentChainId.toString(),
      tokenAddress: this.chartTarget.address,
      from: this.timestampsByRange,
      to: dayjs().unix(),
      resolution: this.resolution,
      tokenNumber: this.tokenNumber,
      currencyCode: this.currencyCode,
    });

    if (priceDataRequest.status === "error") {
      return undefined;
    } else {
      return priceDataRequest.data;
    }
  });

  get timestampsByRange() {
    switch (this.range) {
      case "1D":
        return dayjs().unix() - 60 * 60 * 24;
      case "3D":
        return dayjs().unix() - 60 * 60 * 24 * 3;
      case "7D":
        return dayjs().unix() - 60 * 60 * 24 * 7;
      case "15D":
        return dayjs().unix() - 60 * 60 * 24 * 15;
      case "1M":
        return dayjs().unix() - 60 * 60 * 24 * 30;
    }
  }

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.range,
      () => {
        this.chartData.call();
      }
    );
  }

  toggleChart() {
    this.showChart = !this.showChart;
  }

  setChartTarget(target: Token | PairContract | null) {
    this.chartTarget = target;
  }
  setRange(value: "1D" | "3D" | "7D" | "15D" | "1M") {
    this.range = value;
  }

  setTokenNumber(value: 0 | 1) {
    this.tokenNumber = value;
  }

  setCurrencyCode(value: "USD" | "TOKEN") {
    this.currencyCode = value;
  }

  setResolution(
    value: "1" | "5" | "15" | "30" | "60" | "240" | "720" | "1D" | "7D"
  ) {
    this.resolution = value;
  }
}

export const chart = new Chart();
