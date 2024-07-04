export type TokenCurrentPriceResponseType = {
  price: number;
  lastUpdated: number;
};

export interface PriceFeedProvider {
  getTokenCurrentPrice(
    address: string,
    networkId: string
  ): Promise<ApiResponseType<TokenCurrentPriceResponseType>>;

  getChartData(
    address: string,
    networkId: string,
    from: number,
    to: number,
    resolution: string
  ): Promise<ApiResponseType<ChartDataResponse>>;
}

export interface ChartDataResponse {
  data: ChartDataResponseData;
}

export interface ChartDataResponseData {
  getBars: ChartDataResponseGetBars;
}

export interface ChartDataResponseGetBars {
  o: number | undefined[];
  h: number | undefined[];
  l: number | undefined[];
  c: number | undefined[];
  t: number | undefined[];
}
