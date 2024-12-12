import { BaseContract } from "./..";
import { wallet } from "@/services/wallet";
import { makeAutoObservable } from "mobx";
import { getContract, zeroAddress } from "viem";
import { ICHIVaultABI } from "@/lib/abis/aquabera/ICHIVault";

export class ICHIVaultContract implements BaseContract {
  address = zeroAddress;
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
    return await this.contract.write.deposit(
      [deposit0, deposit1, to as `0x${string}`],
      {
        account: wallet.walletClient.account,
        chain: wallet.publicClient.chain,
      }
    );
  }

  async withdraw(shares: bigint, to: string) {
    if (!wallet.walletClient?.account) {
      return;
    }
    return await this.contract.write.withdraw([shares, to as `0x${string}`], {
      account: wallet.walletClient.account,
      chain: wallet.publicClient.chain,
    });
  }
}
