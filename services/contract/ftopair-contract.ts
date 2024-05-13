import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { AsyncState } from "../utils";
import { makeAutoObservable } from "mobx";
import { MUBAI_FTO_PAIR_ABI } from "@/lib/abis/ftoPair";

export class FtoPairContract implements BaseContract {
  address = "";
  name: string = "";
  abi = MUBAI_FTO_PAIR_ABI;
  constructor(args: Partial<FtoPairContract>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: { public: wallet.publicClient, wallet: wallet.walletClient },
    });
  }

  async raisedTokenAddress() {
    return (await this.contract.read.raisedToken()) as `0x${string}`;
  }

  async launchedTokenAddress() {
    return (await this.contract.read.launchedToken()) as `0x${string}`;
  }

  async depositedRaisedToken() {
    return (await this.contract.read.depositedRaisedToken()) as bigint;
  }

  async depositedLaunchedToken() {
    return (await this.contract.read.depositedLaunchedToken()) as bigint;
  }

  async startTime() {
    return await this.contract.read.startTime();
  }

  async endTime() {
    return (await this.contract.read.endTime()) as bigint;
  }

  async tokenBProvider() {
    return await this.contract.read.tokenB_provider();
  }

  async totalSupply() {
    return (await this.contract.read.totalSupply()) as bigint;
  }
}
