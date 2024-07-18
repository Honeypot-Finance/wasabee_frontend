import { makeAutoObservable } from "mobx";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";

class Chart {
  showChart = false;
  chartTarget: Token | PairContract | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  toggleChart() {
    this.showChart = !this.showChart;
  }

  setChartTarget(target: Token | PairContract | null) {
    console.log("setChartTarget", target);
    this.chartTarget = target;
  }
}

export const chart = new Chart();
