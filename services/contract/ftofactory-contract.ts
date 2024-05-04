import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { ContractWrite } from "../utils";
import { makeAutoObservable } from "mobx";
import { MUBAI_FTO_FACTORY_ABI } from "@/lib/abis/ftoFactory/abis";

export class FtoFactoryContract implements BaseContract {
  address = "";
  name: string = "";
  abi = MUBAI_FTO_FACTORY_ABI;
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
    return new ContractWrite(this.contract.write.createFTO);
  }
}
