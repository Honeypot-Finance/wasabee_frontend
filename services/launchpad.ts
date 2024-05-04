import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { AsyncState } from "./utils";

class LaunchPad {
  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  createFTO = async ({
    tokenAddress,
    tokenName,
    tokenSymbol,
    tokenAmount,
    poolHandler,
    rasing_cycle,
  }: {
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    rasing_cycle: string;
  }) => {
    return await this.ftofactoryContract.createFTO.call([
      tokenAddress,
      tokenName,
      tokenSymbol,
      new BigNumber(tokenAmount),
      poolHandler,
      rasing_cycle,
    ]);
  };
}

const launchpad = new LaunchPad();

export default launchpad;
