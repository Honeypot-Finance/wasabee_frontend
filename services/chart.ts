import { action, makeAutoObservable, reaction } from "mobx";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import { AsyncState } from "./utils";
import { ChartDataResponse, resolutionType } from "./priceFeed/priceFeedTypes";
import { wallet } from "./wallet";
import { trpcClient } from "@/lib/trpc";
import { dayjs } from "@/lib/dayjs";

type Range = "1H" | "1D" | "1W" | "1M" | "6M" | "1Y";

export const chartColorThemes = {
  default: {
    textColor: "white",
    labelColor: "orange",
  },
  green: {
    textColor: "white",
    labelColor: "#43D9A3",
  },
  red: {
    textColor: "white",
    labelColor: "red",
  },
};

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
  chartTarget: Token | PairContract | undefined = undefined;
  tokenNumber: 0 | 1 = 0;
  currencyCode: "USD" | "TOKEN" = "USD";
  range: Range = "1D";
  chartColors = chartColorThemes.default;
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

  get currentPrice() {
    if (this.chartData.value?.getBars.c) {
      return this.chartData.value.getBars.c[
        this.chartData.value.getBars.c.length - 1
      ];
    } else {
      return 0;
    }
  }

  get chartPricePercentageChange() {
    if (this.chartData.value?.getBars.c) {
      const firstPrice = this.firstValidPrice;
      const lastPrice = this.lastValidPrice;

      return ((lastPrice - firstPrice) / firstPrice) * 100;
    } else {
      return 0;
    }
  }

  get firstValidPrice() {
    if (
      this.chartData.value?.getBars.c &&
      this.chartData.value.getBars.c.length > 0
    ) {
      let i = 0;
      while (
        (this.chartData.value.getBars.c[i] === undefined ||
          this.chartData.value.getBars.c[i] === null) &&
        i < this.chartData.value.getBars.c.length
      ) {
        i++;
      }

      return this.chartData.value.getBars.c[i] ?? 0;
    } else {
      return 0;
    }
  }

  get lastValidPrice() {
    if (this.chartData.value?.getBars.c) {
      let i = this.chartData.value.getBars.c.length - 1;
      while (
        (this.chartData.value.getBars.c[i] === undefined ||
          this.chartData.value.getBars.c[i] === null) &&
        i > 0
      ) {
        i--;
      }

      return this.chartData.value.getBars.c[i] ?? 0;
    } else {
      return 0;
    }
  }

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

  setChartTarget(target: Token | PairContract | undefined) {
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

  setChartColors(value: "default" | "green" | "red") {
    this.chartColors = chartColorThemes[value];
  }
}

export const chart = new Chart();
