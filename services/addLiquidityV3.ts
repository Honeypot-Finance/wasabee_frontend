import { makeAutoObservable } from "mobx";
import { Token } from "./contract/token";
import { AsyncState } from "./utils";
import { AlgebraPoolContract } from "./contract/algebra/algebra-pool-contract";
import { wallet } from "./wallet";
import { zeroAddress } from "viem";
import { chains } from "@/lib/chain";

class LiquidityV3 {
  token1: null | Token = null;
  token2: null | Token = null;

  constructor() {
    makeAutoObservable(this);
  }

  currentPool = new AsyncState<() => Promise<AlgebraPoolContract | null>>(
    async () => {
      wallet.contracts.algebraFactory.contract.read.poolByPair;
      return null;
    }
  );

  createPool = new AsyncState<() => Promise<`0x${string}` | null>>(async () => {
    if (!this.token1 || !this.token2) return null;
    const newPool = await wallet.contracts.algebraFactory.createPool.call([
      wallet.currentChain.contracts.pluginFactory as `0x${string}`,
      this.token1?.address as `0x${string}`,
      this.token2?.address as `0x${string}`,
    ]);
    return null;
  });

  setToken1(token: Token) {
    this.token1 = token;
  }

  setToken2(token: Token) {
    this.token2 = token;
  }
}

export const liquidityV3 = new LiquidityV3();
