import { action, makeAutoObservable, reaction } from "mobx";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import { AsyncState } from "./utils";
import { ChartDataResponse, resolutionType } from "./priceFeed/priceFeedTypes";
import { wallet } from "./wallet";
import { trpcClient } from "@/lib/trpc";
import { dayjs } from "@/lib/dayjs";
import { debounce } from "lodash";

type Range = "1H" | "1D" | "1W" | "1M" | "6M" | "1Y";

export const chartTimeRanges: {
  [key: string]: {
    label: Range;
    value: number;
    resolution: resolutionType;
  };
} = {
  "1H": {
    label: "1H",
    value: dayjs().unix() - 60 * 60,
    resolution: "1",
  },
  "1D": {
    label: "1D",
    value: dayjs().unix() - 60 * 60 * 24,
    resolution: "5",
  },
  "1W": {
    label: "1W",
    value: dayjs().unix() - 60 * 60 * 24 * 7,
    resolution: "15",
  },
  "1M": {
    label: "1M",
    value: dayjs().unix() - 60 * 60 * 24 * 30,
    resolution: "60",
  },
  "6M": {
    label: "6M",
    value: dayjs().unix() - 60 * 60 * 24 * 180,
    resolution: "720",
  },
  "1Y": {
    label: "1Y",
    value: dayjs().unix() - 60 * 60 * 24 * 365,
    resolution: "7D",
  },
};

class Chart {
  isLoading = false;
  showChart = false;
  chartTarget: Token | PairContract | null = null;
  tokenNumber: 0 | 1 = 0;
  currencyCode: "USD" | "TOKEN" = "USD";
  range: Range = "1D";
  chartColors = {
    textColor: "white",
    labelColor: "orange",
    // line: "#FFA500",
    // area: "#FFA500",
    // background: "#000000",
  };
  chartLabel = "";

  chartData = new AsyncState<
    () => Promise<ChartDataResponse | undefined>,
    ChartDataResponse | undefined
  >(async () => {
    if (!this.chartTarget) {
      return undefined;
    }

    this.isLoading = true;

    const priceDataRequest = await trpcClient.priceFeed.getChartData.query({
      chainId: wallet.currentChainId.toString(),
      tokenAddress: this.chartTarget.address,
      from: this.timestampsByRange,
      to: dayjs().unix(),
      resolution: chartTimeRanges[this.range].resolution,
      tokenNumber: this.tokenNumber,
      currencyCode: this.currencyCode,
    });

    this.isLoading = false;

    if (priceDataRequest.status === "error") {
      return undefined;
    } else {
      return priceDataRequest.data;
    }
  });

  get timestampsByRange() {
    return chartTimeRanges[this.range].value;
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

  setRange(value: "1H" | "1D" | "1W" | "1M" | "6M" | "1Y") {
    this.range = value;
  }

  setTokenNumber(value: 0 | 1) {
    this.tokenNumber = value;
  }

  setCurrencyCode(value: "USD" | "TOKEN") {
    this.currencyCode = value;
  }

  setChartLabel(value: string) {
    this.chartLabel = value;
  }
}

export const chart = new Chart();
