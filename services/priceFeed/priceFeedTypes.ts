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
