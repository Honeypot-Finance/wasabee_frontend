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
import { AsyncState, ContractWrite } from "@/services/utils";
import { Token } from "../token";

export class AlgebraPoolContract implements BaseContract {
  static poolMap: Record<string, AlgebraPoolContract> = {};
  static getPool({
    address,
    force,
    ...args
  }: {
    address: string;
    force?: boolean;
  } & Partial<AlgebraPoolContract>) {
    const lowerAddress = address.toLowerCase();
    const key = `${lowerAddress}`;
    const pool = AlgebraPoolContract.poolMap[key];
    if (!pool) {
      AlgebraPoolContract.poolMap[key] = new AlgebraPoolContract({
        address: lowerAddress,
        ...args,
      });
    } else {
      AlgebraPoolContract.poolMap[key].setData(args);
    }
    return AlgebraPoolContract.poolMap[key];
  }

  address = "";
  name: string = "";
  abi = algebraPoolABI;
  isInit = false;
  token0 = new AsyncState<
    (options?: { force?: boolean }) => Promise<Token | undefined>
  >(async (options) => {
    if (this.token0.value && !options?.force) return;

    const token0Address = await this.contract.read.token0();
    return Token.getToken({ address: token0Address });
  });
  token1 = new AsyncState<
    (options?: { force?: boolean }) => Promise<Token | undefined>
  >(async (options) => {
    if (this.token1.value && !options?.force) return;

    const token1Address = await this.contract.read.token1();
    return Token.getToken({ address: token1Address });
  });

  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: { public: wallet.publicClient, wallet: wallet.walletClient },
    });
  }

  constructor(args: Partial<AlgebraPoolContract>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  init(options?: { force?: boolean }) {
    if (this.isInit && !options?.force) return;

    this.isInit = false;
    this.token0.call();
    this.token1.call();
    this.isInit = true;
  }

  setData({ ...args }: Partial<AlgebraPoolContract>) {
    Object.assign(this, args);
  }
}
