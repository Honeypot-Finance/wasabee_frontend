import { BaseContract } from "./..";
import { wallet } from "@/services/wallet";
import { makeAutoObservable } from "mobx";
import { Address, getContract, zeroAddress } from "viem";
import { ICHIVaultABI } from "@/lib/abis/aquabera/ICHIVault";
import { writeContract } from "viem/actions";
import { ContractWrite } from "@/services/utils";

export class ICHIVaultContract implements BaseContract {
  address: Address = zeroAddress;
  name: string = "ICHIVault";
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

  // Example function using ABI
  async getBalanceOf(account: string) {
    return await this.contract.read.balanceOf([account as `0x${string}`]);
  }

  async deposit(deposit0: bigint, deposit1: bigint, to: string) {
    if (!wallet.walletClient?.account) {
      return;
    }
    return await new ContractWrite(this.contract.write.deposit, {
      action: "deposit",
    }).call([deposit0, deposit1, to as `0x${string}`]);
  }

  async withdraw(shares: bigint, to: string) {
    if (!wallet.walletClient?.account) {
      return;
    }
    return await new ContractWrite(this.contract.write.withdraw, {
      action: "withdraw",
    }).call([shares, to as `0x${string}`]);
  }
}
