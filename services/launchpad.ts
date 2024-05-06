import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { ContractWrite } from "./utils";

class LaunchPad {
  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  createFTO = async ({
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
    console.log('args', provider as `0x${string}`,
    raisedToken as `0x${string}`,
    tokenName,
    tokenSymbol,
    BigInt(tokenAmount),
    poolHandler as `0x${string}`,
    BigInt(rasing_cycle),)
    return await this.ftofactoryContract.createFTO.call([
      provider as `0x${string}`,
      raisedToken as `0x${string}`,
      tokenName,
      tokenSymbol,
      BigInt(tokenAmount),
      poolHandler as `0x${string}`,
      BigInt(rasing_cycle),
    ]);
  }
}

const launchpad = new LaunchPad();

export default launchpad;
