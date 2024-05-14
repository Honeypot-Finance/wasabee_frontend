import dayjs from "dayjs";
import { wallet } from "./wallet";
import { formatEther } from "viem";
import BigNumber from "bignumber.js";
import { FtoPairContract } from "./contract/ftopair-contract";
import { AsyncState } from "./utils";

function calculateTimeDifference(timestamp: number): string {
  if (timestamp.toString().length !== 13) {
    return "Invaild";
  }
  const now = dayjs();
  const targetTime = dayjs(timestamp);

  const diffDays = now.diff(targetTime, "days");

  if (Math.abs(diffDays) >= 1) {
    return `${diffDays} ${diffDays > 0 ? "days later" : "days ago"}`;
  }

  const diffHours = now.diff(targetTime, "hours");

  if (Math.abs(diffHours) >= 1) {
    return `${diffHours} ${diffHours > 0 ? "hours later" : "hours ago"}`;
  }

  const diffMinutes = now.diff(targetTime, "minutes");
  return `${diffMinutes} ${diffMinutes > 0 ? "minutes later" : "minutes ago"}`;
}

class LaunchPad {

  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  get ftofacadeContract() {
    return wallet.contracts.ftofacade;
  }

  allPairsLength = async () =>
    await this.ftofactoryContract.allPairsLength.call();

  getPairAddress = async (index: bigint) =>
    await this.ftofactoryContract.allPairs.call([index]);

  ftoPairs = new AsyncState<FtoPairContract []>(async () => {
    const [pairsLength] = await this.allPairsLength();
    return  Promise.all(Array.from({ length: Number(pairsLength) }, async (_, i) => {
      const [pairAddress] = await this.getPairAddress(BigInt(i));
      const pair = new FtoPairContract({ address: pairAddress as string })
      pair.init()
      return pair
    }))
  })


  // getPairInfo = async (pairAddress: `0x${string}`) => {
  //   const ftoPairContract = this.ftoPairContract(pairAddress);
  //   const launchedTokenAddress = await ftoPairContract.launchedTokenAddress();
  //   const depositedRaisedToken = await ftoPairContract.depositedRaisedToken();
  //   const depositedLaunchedToken =
  //     await ftoPairContract.depositedLaunchedToken();

  //   const price = BigNumber(formatEther(depositedRaisedToken))
  //     .div(formatEther(depositedLaunchedToken))
  //     .toFormat();
  //   return {
  //     price,
  //     launchedTokenAddress,
  //     depositedRaisedToken,
  //     endTime: await ftoPairContract.endTime(),
  //   };
  // };

  createFTO = async ({
    provider,
    raisedToken,
    tokenName,
    tokenSymbol,
    tokenAmount,
    poolHandler,
    rasing_cycle,
  }: {
    provider: string;
    raisedToken: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    rasing_cycle: string;
  }) => {
    return await this.ftofactoryContract.createFTO.call([
      provider as `0x${string}`,
      raisedToken as `0x${string}`,
      tokenName,
      tokenSymbol,
      BigInt(tokenAmount),
      poolHandler as `0x${string}`,
      BigInt(rasing_cycle),
    ]);
  };
}

const launchpad = new LaunchPad();

export default launchpad;
