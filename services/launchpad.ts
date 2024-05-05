import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { ContractWrite } from "./utils";

class LaunchPad {
  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  createFTO =new ContractWrite(async ({
    provider,
    raisedToken,
    tokenName,
    tokenSymbol,
    tokenAmount,
    poolHandler,
    rasing_cycle,
  }: {
    provider:string,
    raisedToken: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    rasing_cycle: string;
  }) => {
    return await this.ftofactoryContract.createFTO.call([
      provider,
      raisedToken,
      tokenName,
      tokenSymbol,
      new BigNumber(tokenAmount),
      poolHandler,
      rasing_cycle,
    ]);
  });
}

const launchpad = new LaunchPad();

export default launchpad;
