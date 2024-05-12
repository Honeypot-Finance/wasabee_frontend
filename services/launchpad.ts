import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { formatEther } from "viem";
import { FtoPairContract } from "./contract/ftopair-contract";
import { useReadContract, useBalance, useAccount } from "wagmi";

class LaunchPad {
  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  get ftofacadeContract() {
    return wallet.contracts.ftofacade;
  }

  ftoPairContract(address: `0x${string}`) {
    return new FtoPairContract({ address });
  }

  allPairsLength = async () =>
    await this.ftofactoryContract.allPairsLength.call();

  getPairAddress = async (index: bigint) =>
    await this.ftofactoryContract.allPairs.call([index]);

  getPairInfo = async (pairAddress: `0x${string}`) => {
    const ftoPairContract = this.ftoPairContract(pairAddress);
    const launchedTokenAddress = await ftoPairContract.launchedTokenAddress();
    const depositedRaisedToken = await ftoPairContract.depositedRaisedToken();
    const depositedLaunchedToken =
      await ftoPairContract.depositedLaunchedToken();

    const price = BigNumber(formatEther(depositedRaisedToken))
      .div(formatEther(depositedLaunchedToken))
      .toFormat();
    return {
      price,
      launchedTokenAddress,
      depositedRaisedToken,
      endTime: await ftoPairContract.endTime(),
    };
  };

  // useTokenDetail = async (tokenAddress: string) => {
  //   const { address } = useAccount();
  //   const ftoPairContract = new FtoPairContract({ address: tokenAddress });
  //   const tokenBAddress = await ftoPairContract.tokenBAddress();
  //   const { data: tokenBName } = useReadContract({
  //     abi: erc20Abi,
  //     address: tokenBAddress,
  //     functionName: "name",
  //   });
  //   const tokenBProvider = await ftoPairContract.tokenBProvider();
  //   const tokenAAddress = await ftoPairContract.tokenAAddress();
  //   const { refetch: refetchTokenABalance, data: tokenAbalanceData } =
  //     useBalance({
  //       token: tokenAAddress,
  //       address: address,
  //     });

  //   const { refetch: refetchTokenBBalance, data: tokenBbalanceData } =
  //     useBalance({
  //       token: tokenBAddress,
  //       address: address,
  //     });
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
    console.log(
      "args",
      provider as `0x${string}`,
      raisedToken as `0x${string}`,
      tokenName,
      tokenSymbol,
      BigInt(tokenAmount),
      poolHandler as `0x${string}`,
      BigInt(rasing_cycle)
    );
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
