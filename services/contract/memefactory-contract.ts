import { BaseContract } from ".";
import { wallet } from "../wallet";
import { Address, getContract } from "viem";
import { makeAutoObservable } from "mobx";
import { ContractWrite, AsyncState } from "../utils";
import { MemeFactoryABI } from "@/lib/abis/MemeFactory";

export class MemeFactoryContract implements BaseContract {
  address = "";
  name: string = "";
  abi = MemeFactoryABI.abi;
  constructor(args: Partial<MemeFactoryContract>) {
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

  async events(depositerAddress: Address): Promise<readonly Address[]> {
    const res = await this.contract.read.events([depositerAddress]);
    return res;
  }

  get createPair() {
    return new ContractWrite(this.contract.write.createPair, {
      action: "Create MEME Project",
      isSuccessEffect: true,
    });
  }

  get allPairsLength(): AsyncState {
    return new AsyncState(this.contract.read.allPairsLength);
  }

  get allPairs() {
    return new AsyncState(this.contract.read.allPairs);
  }

  get resume() {
    return new ContractWrite(this.contract.write.resume, {
      action: "Resume",
    });
  }
  get pause() {
    return new ContractWrite(this.contract.write.pause, {
      action: "Pause",
    });
  }
}
