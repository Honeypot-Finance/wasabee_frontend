// import scrollTokens from '~/static/tokens/scroll_tokens.json'
// import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
import { wallet } from "./wallet";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import BigNumber from "bignumber.js";
import { exec } from "~/lib/contract";
import { trpcClient } from "@/lib/trpc";
import { makeAutoObservable, reaction, when } from "mobx";
import { AsyncState, ValueState } from "./utils";

class Liquidity {
  pairs: PairContract[] = [];
  pairsByToken: Record<string, PairContract> = {};
  tokensMap: Record<string, Token> = {};

  get tokens() {
    return Object.values(this.tokensMap);
  }

  fromToken: Token | null = null;
  toToken: Token | null = null;
  fromAmount = "";
  toAmount = "";
  deadline = 0;
  isInit = false;

  currentRemovePair: PairContract | null = null;

  currentPair = new AsyncState<PairContract | undefined>(async () => {
    if (this.fromToken && this.toToken) {
      const res = await liquidity.getPairByTokens(
        this.fromToken.address,
        this.toToken.address
      );
      return res;
    }
  });

  //whether the sort of from and to token is consistent with the current pair's token0 and token1
  get isTokenPairSortMatch() {
    return (
      this.fromToken?.address === this.currentPair.value?.token0.address &&
      this.toToken?.address === this.currentPair.value?.token1.address
    );
  }

  get price() {
    if (this.currentPair.value?.price) {
      return this.isTokenPairSortMatch
        ? this.currentPair.value.price
        : new BigNumber(1).div(this.currentPair.value.price);
    }
  }

  get routerV2Contract() {
    return wallet.contracts.routerV2;
  }

  get factoryContract() {
    return wallet.contracts.factory;
  }

  get myPairs() {
    return this.pairs.filter(
      (pair) => pair.token0LpBalance.gt(0) || pair.token1LpBalance.gt(0)
    );
  }

  get isDisabled() {
    return (
      !this.fromToken || !this.toToken || !this.fromAmount || !this.toAmount
    );
  }

  get buttonContent() {
    if (!this.fromToken || !this.toToken) {
      return "Select Tokens";
    }
    if (this.currentPair.loading) {
      return "Loading Pair";
    }
    if (!this.fromAmount || !this.toAmount) {
      return "Enter Amount";
    }
    return "Create LP";
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

  setCurrentRemovePair(pair: PairContract | null) {
    this.currentRemovePair = pair;
  }

  setFromToken(token: Token) {
    if (this.fromToken?.address !== token.address) {
      this.fromToken = token;
      this.fromToken.init();
      this.fromAmount = "";
    }
  }

  setFromAmount(amount: string) {
    this.fromAmount = amount;
  }

  setToToken(token: Token) {
    if (this.toToken?.address !== token.address) {
      this.toToken = token;
      this.toToken.init();
      this.toAmount = "";
    }
  }

  setToAmount(amount: string) {
    this.toAmount = amount;
  }

  switchTokens() {
    const fromToken = this.fromToken;
    this.fromToken = this.toToken;
    this.toToken = fromToken;
  }

  addLiquidity = new AsyncState(async () => {
    if (
      !this.fromToken ||
      !this.toToken ||
      !this.fromAmount ||
      !this.toAmount
    ) {
      return;
    }
    const token0AmountWithDec = new BigNumber(this.fromAmount)
      .multipliedBy(new BigNumber(10).pow(this.fromToken.decimals))
      .toFixed(0);
    const token1AmountWithDec = new BigNumber(this.toAmount)
      .multipliedBy(new BigNumber(10).pow(this.toToken.decimals))
      .toFixed(0);
    const deadline = this.deadline || Math.floor(Date.now() / 1000) + 60 * 20; // 20 mins time
    console.log("liqidity agrs", [
      this.fromToken.address as `0x${string}`,
      this.toToken.address as `0x${string}`,
      token0AmountWithDec,
      token1AmountWithDec,
      0,
      0,
      wallet.account as `0x${string}`,
      deadline,
    ]);

    await Promise.all([
      this.fromToken.approveIfNoAllowance({
        amount: token0AmountWithDec,
        spender: this.routerV2Contract.address,
      }),
      this.toToken.approveIfNoAllowance({
        amount: token1AmountWithDec,
        spender: this.routerV2Contract.address,
      }),
    ]);
    await this.routerV2Contract.addLiquidity.call([
      this.fromToken.address as `0x${string}`,
      this.toToken.address as `0x${string}`,
      BigInt(token0AmountWithDec),
      BigInt(token1AmountWithDec),
      BigInt(0),
      BigInt(0),
      wallet.account as `0x${string}`,
      BigInt(deadline),
    ]);
    Promise.all([this.fromToken.getBalance(), this.toToken.getBalance()]);
  });

  initPool(
    pairs: {
      address: string;
      token0: {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
      };
      token1: {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
      };
    }[]
  ) {
    this.pairs = pairs.map((pair) => {
      const token0 = new Token(pair.token0);
      const token1 = new Token(pair.token1);
      const pairContract = new PairContract({
        address: pair.address,
        token0,
        token1,
      });
      if (!this.tokensMap[token0.address]) {
        this.tokensMap[token0.address] = token0;
        token0.init();
      }
      if (!this.tokensMap[token1.address]) {
        this.tokensMap[token1.address] = token1;
        token1.init();
      }
      this.pairsByToken[`${token0.address}-${token1.address}`] = pairContract;
      pairContract.init();
      return pairContract;
    });
    this.isInit = true;
  }

  async getPairByTokens(token0Address: string, token1Address: string) {
    const memoryPair =
      this.pairsByToken[`${token0Address}-${token1Address}`] ||
      this.pairsByToken[`${token1Address}-${token0Address}`];
    if (memoryPair) {
      memoryPair.init();
      return memoryPair;
    }
    const pair = await trpcClient.pair.getPairByTokens.query({
      chainId: wallet.currentChainId,
      token0Address,
      token1Address,
    });
    if (pair) {
      const pairContract = new PairContract({ ...pair });
      pairContract.init();

      this.pairsByToken[`${token0Address}-${token1Address}`] = pairContract;
      return pairContract;
    }
  }
}

export const liquidity = new Liquidity();
