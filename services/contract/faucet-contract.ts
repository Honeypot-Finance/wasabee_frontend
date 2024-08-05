import { exec } from "~/lib/contract";
import { BaseContract } from ".";
import { wallet } from "../wallet";
import { Signer, ethers } from "ethers";
import { Contract } from "ethcall";
import BigNumber from "bignumber.js";
import { makeAutoObservable } from "mobx";
import { get } from "http";
import { getContract } from "viem";
import { faucetABI } from "@/lib/abis/faucet";
import { ContractWrite } from "../utils";
import { berachainBartioTestnetNetwork, networksMap } from "../chain";
import { DailyFaucetABI } from "@/lib/abis/faucet/daily-faucet";

export class NativeFaucetContract implements BaseContract {
  address = "";
  name: string = "";
  canclaim = false;
  abi = DailyFaucetABI;

  constructor(args: Partial<NativeFaucetContract>) {
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

  async isClaimable(): Promise<boolean> {
    const faucetable = await this.contract.read.faucetable([
      wallet.account as `0x${string}`,
    ]);

    this.canclaim = faucetable;

    return faucetable;
  }

  get Claim(): ContractWrite<any> {
    return new ContractWrite(this.contract.write?.faucet, {
      action: "Get Faucet",
    });
  }
}
