export interface PriceFeedProvider {
  getTokenCurrentPrice(
    address: string,
    networkId: string
  ): Promise<ApiResponseType<TokenCurrentPriceResponseType>>;

  getChartData(
    input: getChartDataInputsType
  ): Promise<ApiResponseType<ChartDataResponse>>;
}

export type getChartDataInputsType = {
  address: string;
  networkId: string;
  from: number;
  to: number;
  resolution: resolutionType;
};

export type resolutionType =
  | "1"
  | "5"
  | "15"
  | "30"
  | "60"
  | "240"
  | "720"
  | "1D"
  | "7D";

export type TokenCurrentPriceResponseType = {
  price: number;
  lastUpdated: number;
};

export interface ChartDataResponse {
  getBars: ChartDataResponseGetBars;
}

export interface ChartDataResponseGetBars {
  o: number[] | undefined[];
  h: number[] | undefined[];
  l: number[] | undefined[];
  c: number[] | undefined[];
  t: number[] | undefined[];
}
