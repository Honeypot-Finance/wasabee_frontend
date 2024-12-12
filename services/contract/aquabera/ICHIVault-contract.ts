import { BaseContract } from "./..";
import { wallet } from "@/services/wallet";
import { makeAutoObservable } from "mobx";
import { getContract } from "viem";
import { ICHIVaultABI } from "@/lib/abis/aquabera/ICHIVault";

export class ICHIVaultContract implements BaseContract {
  address = "";
  name: string = "";
  abi = ICHIVaultABI;

  constructor(args: Partial<ICHIVaultContract>) {
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
}
