import { exec } from "~/lib/contract";
import { BaseContract } from "..";
import { wallet } from "@/services/wallet";
import { Signer, ethers } from "ethers";
import { Contract } from "ethcall";
import BigNumber from "bignumber.js";
import { makeAutoObservable } from "mobx";
import { get } from "http";
import { getContract } from "viem";
import { algebraPoolABI } from "@/lib/abis/algebra-contracts/ABIs";
import { ContractWrite } from "@/services/utils";

export class AlgebraPoolContract implements BaseContract {
  address = "";
  name: string = "";
  abi = algebraPoolABI;

  constructor(args: Partial<AlgebraPoolContract>) {
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
