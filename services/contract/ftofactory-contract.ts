import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { ContractWrite } from "../utils";
import { makeAutoObservable } from "mobx";
import { ftoFactoryABI } from "@/lib/abis/ftoFactory";

export class FtoFactoryContract implements BaseContract {
  address = "";
  name: string = "";
  abi = ftoFactoryABI;
  constructor(args: Partial<FtoFactoryContract>) {
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

  get createFTO() {
    return this.contract.write.createFTO;
  }
}
