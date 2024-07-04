export type TokenCurrentPriceResponseType = {
  price: number;
  lastUpdated: number;
};

export interface PriceFeedProvider {
  getTokenCurrentPrice(
    address: string,
    networkId: string
  ): Promise<ApiResponseType<TokenCurrentPriceResponseType>>;
}
