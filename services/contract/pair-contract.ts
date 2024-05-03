import { Token } from "./token";
import BigNumber from "bignumber.js";
import { BaseContract } from ".";
import { wallet } from "../wallet";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { makeAutoObservable } from "mobx";
import { getContract } from "viem";

// const totalSupply = await pairContract.methods.totalSupply().call()
// const LPTokenBalance = await this.balanceOf(pairAddress)
// const LPtoken0Balance = reserve0 * LPTokenBalance / totalSupply
// const LPtoken1Balance = reserve1 * LPTokenBalance / totalSxupply

export class PairContract implements BaseContract {
  address: string = "";
  name: string = "";
  abi = IUniswapV2Pair.abi;
  token!: Token;
  totalSupply: BigNumber = new BigNumber(0);

  reserves: any = null;
  token0: Token = new Token({}) // fixed
  token1: Token = new Token({})  // fixed
  midPrice0: BigNumber | null = null
  midPrice1: BigNumber | null = null
  isInit = false;
  isLoading = false

  get token0LpBalance() {
    return !new BigNumber(this.totalSupply || 0).eq(0)
      ? new BigNumber(this.reserves?.reserve0.toString() || 0)
          .multipliedBy(this.token.balance || 0)
          .div(this.totalSupply || 0)
      : new BigNumber(0);
  }

  get token1LpBalance() {
    return !new BigNumber(this.totalSupply || 0).eq(0)
      ? new BigNumber(this.reserves?.reserve1.toString() || 0)
          .multipliedBy(this.token.balance || 0)
          .div(this.totalSupply || 0)
      : new BigNumber(0);
  }
  get liquidityDisplay() {
    return `${this.token0LpBalance.toFixed(3)} ${
      this.token0.displayName
    } - ${this.token1LpBalance.toFixed(3)} ${this.token1.displayName}`;
  }

  get poolName() {
    return this.token0.displayName + "-" + this.token1.displayName;
  }

  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: {
        public: wallet.publicClient,
        wallet: wallet.walletClient,
      },
    })
  }

  get routerV2Contract() {
    return wallet.contracts.routerV2
  }

  constructor(args: Partial<PairContract>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }


  async getReserves() {
    const reserves = await this.contract?.read.getReserves([]);
    this.reserves = reserves;
    if (this.reserves?.reverse0 && this.reserves.reserve1) {
      const [midPrice0, midPrice1] = await Promise.all([
        this.routerV2Contract.contract.read.getAmountOut([
          BigInt(new BigNumber(1)
            .multipliedBy(new BigNumber(10).pow(this.token0.decimals))
            .toFixed()),
          this.reserves.reserve0,
          this.reserves.reserve1,
        ]),
        this.routerV2Contract.contract.read.getAmountOut([
          BigInt(new BigNumber(1)
            .multipliedBy(new BigNumber(10).pow(this.token1.decimals))
            .toFixed()),
          this.reserves.reserve1,
          this.reserves.reserve0,
        ]),
      ]);
      if (midPrice0) {
        this.midPrice0 = new BigNumber(midPrice0.toString()).div(
          new BigNumber(10).pow(this.token1.decimals)
        );
      }
      if (midPrice1) {
        this.midPrice1 = new BigNumber(midPrice1.toString()).div(
          new BigNumber(10).pow(this.token0.decimals)
        );
      }
   
      
    }
  }

  async getTotalSupply() {
    const totalSupply = await this.contract?.read.totalSupply([]);
    this.totalSupply = new BigNumber(totalSupply?.toString() || 0);
  }

  async init(force = false) {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    if (force || !this.isInit) {
      try {
        await this.getReserves()
      } catch (error) {
        throw error
      }finally {
        this.isLoading = false
      }
    }
  }
  async removeLiquidity(percent: number) {
    const liquidity = this.token.balance
      .multipliedBy(percent)
      .div(100)
      .multipliedBy(new BigNumber(10).pow(this.token.decimals));
    if (liquidity.gt(0)) {
      await this.token.approveIfNoAllowance(
        liquidity.toFixed(0),
        this.routerV2Contract.address
      );
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
      await this.routerV2Contract.removeLiquidity.call([
        this.token0.address as `0x${string}`,
        this.token1.address as `0x${string}`,
        BigInt(liquidity.toFixed(0)),
        BigInt(0),
        BigInt(0),
        wallet.account  as `0x${string}`,
        BigInt(deadline),
      ]);
      await this.init();
    }
  }
}
