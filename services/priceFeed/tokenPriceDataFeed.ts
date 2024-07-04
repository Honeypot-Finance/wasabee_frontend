import {
  PriceFeedProvider,
  TokenCurrentPriceResponseType,
} from "./priceFeedTypes";

export class TokenPriceDataFeed<T extends PriceFeedProvider> {
  dataProvider: T;
  debug: boolean;

  constructor(dataProvider: T, debug: boolean = false) {
    this.dataProvider = dataProvider;
    this.debug = debug;
  }

  getTokenCurrentPrice = async (
    address: string,
    networkId: string
  ): Promise<ApiResponseType<TokenCurrentPriceResponseType>> => {
    const price = await this.dataProvider.getTokenCurrentPrice(
      address,
      networkId
    );
    if (this.debug) {
      console.log(price);
    }

    if (price.status === "error") {
      return {
        status: "error",
        message: price.message,
      };
    } else {
      return {
        status: "success",
        data: price.data,
        message: "Success",
      };
    }
  };
}
