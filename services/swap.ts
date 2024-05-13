// import scrollTokens from '~/static/tokens/scroll_tokens.json'
// import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import BigNumber from "bignumber.js";
import { wallet } from "./wallet";
import { liquidity } from "./liquidity";
import { exec } from "~/lib/contract";
import { makeAutoObservable, reaction, when } from "mobx";
import { AsyncState } from "./utils";

class Swap {
  fromToken: Token | null = null;
  toToken: Token | null = null;

  fromAmount: string = "";
  toAmount: string = "";
  slippage: number = 0;
  deadline: number = 0;

  currentPair = new AsyncState<PairContract | undefined>(async () => {
    if (this.fromToken && this.toToken) {
      const res = await liquidity.getPairByTokens(
        this.fromToken.address,
        this.toToken.address
      );
      return res
    }
  });

  //whether the sort of from and to token is consistent with the current pair's token0 and token1
  get isTokenPairSortMatch() {
    return (
      this.fromToken?.address === this.currentPair.value?.token0.address &&
      this.toToken?.address === this.currentPair.value?.token1.address
    );
  }

  get isDisabled() {
    return !this.fromToken || !this.toToken || !this.fromAmount || !this.toAmount || !this.currentPair.value;
  }

  get buttonContent () {

    if (!this.fromToken || !this.toToken) {
      return 'Select Tokens'
    }
    if (this.currentPair.loading) {
      return 'Loading Pair'
    }

    if (!this.currentPair.value) {
      return 'Insufficient Liquidity'
    }
    if (!this.fromAmount || !this.toAmount) {
      return 'Enter Amount'
    }
    return  'Swap'
  }

  get factoryContract() {
    return wallet.contracts.factory;
  }

  get routerV2Contract() {
    return wallet.contracts.routerV2;
  }

  // each from token amount can be swapped to how many to token
  get price () {
    if (this.currentPair.value?.price) {
       return this.isTokenPairSortMatch ? this.currentPair.value.price : new BigNumber(1).div(this.currentPair.value.price)
    }
  }

  get minToAmount () {
    return new BigNumber(this.toAmount || 0)
    .minus(new BigNumber(this.toAmount || 0).multipliedBy(this.slippage))
  }

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.fromToken?.address,
      () => {
        this.currentPair.setValue(undefined);
        if (this.fromToken && this.toToken) {
          this.currentPair.call();
        }
      }
    );
    reaction(
      () => this.toToken?.address,
      () => {
        this.currentPair.setValue(undefined);
        if (this.fromToken && this.toToken) {
          this.currentPair.call();
        }
      }
    );
    reaction(
      () => this.price?.multipliedBy(this.fromAmount || 0).toFixed(),
      () => {
        if (this.fromAmount && this.price) {
          this.toAmount = this.price.multipliedBy(this.fromAmount).toFixed();
        }
      }
    );
  }

  setDeadline(deadline: number) {
    this.deadline = deadline;
  }
  setSlippage(slippage: number) {
    this.slippage = slippage;
  }

  switchTokens() {
    const fromToken = this.fromToken;
    this.fromToken = this.toToken;
    this.toToken = fromToken;
    this.fromAmount = ''
    this.toAmount = ''
  }

  setFromToken(token: Token) {
    if (this.fromToken?.address !== token.address) {
      this.fromToken = token;
      this.fromToken.init()
      this.fromAmount = "";
    }

  }

  setFromAmount(amount: string) {
    this.fromAmount = amount;
  }

  setToToken(token: Token) {
    if (this.toToken?.address !== token.address) {
      this.toToken = token;
      this.toToken.init()
      this.toAmount = "";
    }
  }

  setToAmount(amount: string) {
    this.toAmount = amount;
  }

  swapExactTokensForTokens = new AsyncState(async () => {
    if (!this.fromToken || !this.toToken || !this.fromAmount || !this.toAmount || !this.currentPair.value) {
      return;
    }
    const fromAmountDecimals =  new BigNumber(this.fromAmount)
    .multipliedBy(new BigNumber(10).pow(this.fromToken.decimals))
    .toFixed(0)
    const toAmountDecimals = new BigNumber(this.minToAmount).multipliedBy(
      new BigNumber(10).pow(this.toToken.decimals)
    ).toFixed(0)
    const deadline = this.deadline || Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
    const path = [this.fromToken.address, this.toToken.address] as readonly `0x${string}`[];
    await Promise.all([this.fromToken.approveIfNoAllowance(
      fromAmountDecimals,
      this.routerV2Contract?.address as string
    ),  this.routerV2Contract.swapExactTokensForTokens.call([
      BigInt(fromAmountDecimals),
      BigInt(toAmountDecimals),
      path,
      wallet.account as `0x${string}`,
      BigInt(deadline),
    ])])

    console.log('fromAmountDecimals', fromAmountDecimals, toAmountDecimals, path, wallet.account as `0x${string}`, deadline)
    Promise.all([
      this.currentPair.value.init(true),
      this.fromToken.getBalance(),
      this.toToken.getBalance(),
    ]);
  })
}

export const swap = new Swap();
