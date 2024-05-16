import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { makeAutoObservable } from "mobx";
import { ContractWrite, AsyncState } from "../utils";
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
    return new ContractWrite(this.contract.write.createFTO);
  }

  get allPairsLength() {
    return new AsyncState(this.contract.read.allPairsLength);
  }

  get allPairs() {
    return new AsyncState(this.contract.read.allPairs);
  }

  get resume () {
    return new ContractWrite(this.contract.write.resume, {
      successMsg: "Resume success"
    });
  } 
  get pause () {
    return new ContractWrite(this.contract.write.pause, {
      successMsg: "Pause success"
    });
  } 
}
