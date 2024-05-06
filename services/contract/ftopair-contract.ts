import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
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

  async endTime() {
    const data = await this.contract.read.end_time();
    console.log(data);

    return data;
  }
}
