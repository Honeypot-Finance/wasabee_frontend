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
import { debounce } from "lodash";
import dayjs from "dayjs";
import { chart } from "./chart";
import { zeroAddress } from "viem";

class Swap {
  fromToken: Token | null = null;
  toToken: Token | null = null;

  fromAmount: string = "";
  toAmount: string = "";
  slippage: number = 1;
  deadline: number = 20;
  price: BigNumber | null = null;

  routerToken: Token[] | undefined = undefined;

  getRouterToken = () => {
    this.setRouterToken(undefined);
    if (!this.fromToken || !this.toToken) {
      return undefined;
    }

    //if from or to token is fto token, route them by from -> router token -> to
    if (
      liquidity.isFtoRaiseToken(this.fromToken.address.toLowerCase()) ||
      liquidity.isFtoRaiseToken(this.toToken.address.toLowerCase())
    ) {
      if (liquidity.isFtoRaiseToken(this.fromToken.address.toLowerCase())) {
        const toTokenRouterTokens = liquidity.getTokenFtoPairs(
          this.toToken.address.toLowerCase()
        );
        if (toTokenRouterTokens.length === 0) {
          this.setRouterToken(undefined);
          return;
        }

        for (let i = 0; i < toTokenRouterTokens.length; i++) {
          const RT = new Token({
            address: toTokenRouterTokens[i].toLowerCase(),
          });
          if (
            liquidity.getMemoryPair(
              this.fromToken.address.toLowerCase(),
              RT.address.toLowerCase()
            )
          ) {
            RT.init();
            this.setRouterToken([RT]);
            return [RT];
          }
        }
      } else {
        const fromTokenRouterTokens = liquidity.getTokenFtoPairs(
          this.fromToken.address.toLowerCase()
        );
        if (fromTokenRouterTokens.length === 0) {
          this.setRouterToken(undefined);
          return;
        }

        for (let i = 0; i < fromTokenRouterTokens.length; i++) {
          const RT = new Token({
            address: fromTokenRouterTokens[i].toLowerCase(),
          });
          if (
            liquidity.getMemoryPair(
              RT.address.toLowerCase(),
              this.toToken.address.toLowerCase()
            )
          ) {
            RT.init();
            this.setRouterToken([RT]);
            return [RT];
          }
        }
      }
    }

    //try to get 1 token in fto tokens for both from and to
    //route them by from -> router token -> to
    const fromTokenRouterTokens = liquidity.getTokenFtoPairs(
      this.fromToken.address.toLowerCase()
    );

    if (fromTokenRouterTokens.length === 0) {
      this.setRouterToken(undefined);
      return;
    }

    fromTokenRouterTokens.forEach((rtoken) => {
      if (
        liquidity.getMemoryPair(
          this.toToken!.address.toLowerCase(),
          rtoken.toLowerCase()
        )
      ) {
        const RT = new Token({ address: rtoken.toLowerCase() });
        RT.init();
        this.setRouterToken([RT]);
      }
    });

    if (this.routerToken) {
      return this.routerToken;
    }

    // if there is not one token for both,
    // get fto tokens for from and to separately
    // and route them by from -> router token 1 -> router token 2 -> to
    const toTokenRouterTokens = liquidity.getTokenFtoPairs(
      this.toToken.address.toLowerCase()
    );

    if (toTokenRouterTokens.length === 0) {
      this.setRouterToken(undefined);
      return;
    }

    for (let i = 0; i < fromTokenRouterTokens.length; i++) {
      for (let j = 0; j < toTokenRouterTokens.length; j++) {
        if (
          liquidity.getMemoryPair(
            fromTokenRouterTokens[i].toLowerCase(),
            toTokenRouterTokens[j].toLowerCase()
          )
        ) {
          const RT1 = new Token({
            address: fromTokenRouterTokens[i].toLowerCase(),
          });
          RT1.init();
          const RT2 = new Token({
            address: toTokenRouterTokens[j].toLowerCase(),
          });
          RT2.init();
          this.setRouterToken([RT1, RT2]);
          return [RT1, RT2];
        }
      }
    }

    this.setRouterToken(undefined);
    return undefined;
  };

  currentPair = new AsyncState<PairContract | undefined>(async () => {
    if (this.fromToken && this.toToken) {
      try {
        const res = await liquidity.getPairByTokens(
          this.fromToken.address,
          this.toToken.address
        );

        await res?.init();
        return res;
      } catch (err) {
        this.getRouterToken();
        //console.error(err);
      }
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
    return (
      !this.fromToken ||
      !this.toToken ||
      !this.fromAmount ||
      !this.toAmount ||
      (!this.currentPair.value && !this.routerToken) ||
      this.fromToken.balance.toNumber() < Number(this.fromAmount)
    );
  }

  get buttonContent() {
    if (!this.fromToken || !this.toToken) {
      return "Select Tokens";
    }
    if (this.currentPair.loading) {
      return "Loading Pair";
    }

    if (!this.currentPair.value && !this.routerToken) {
      return "Insufficient Liquidity";
    }
    if (!this.fromAmount || !this.toAmount) {
      return "Enter Amount";
    }
    if (this.fromToken.balance.toNumber() < Number(this.fromAmount)) {
      return "Insufficient Balance";
    }
    return "Swap";
  }

  get factoryContract() {
    return wallet.contracts.factory;
  }

  get routerV2Contract() {
    return wallet.contracts.routerV2;
  }

  get minToAmount() {
    return new BigNumber(this.toAmount || 0).minus(
      new BigNumber(this.toAmount || 0).multipliedBy(this.slippage).div(100)
    );
  }

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.fromToken?.address,
      async () => {
        this.setRouterToken(undefined);
        this.currentPair.setValue(undefined);
        await this.toToken?.init();
        chart.setChartTarget(this.fromToken as Token);
        if (this.fromToken && this.toToken) {
          await this.currentPair.call();
          chart.setChartTarget(this.currentPair.value as PairContract);
        }
      }
    );
    reaction(
      () => this.toToken?.address,
      async () => {
        this.setRouterToken(undefined);
        this.currentPair.setValue(undefined);
        await this.toToken?.init();
        chart.setChartTarget(this.toToken);
        if (this.fromToken && this.toToken) {
          await this.currentPair.call();
          chart.setChartTarget(this.currentPair.value as PairContract);
        }
      }
    );
    reaction(
      () => this.fromAmount,
      debounce(async () => {
        if (!this.currentPair.value && !this.routerToken) {
          return;
        }
        if (
          this.fromAmount &&
          Number(this.fromAmount) > 0 &&
          this.fromToken &&
          this.toToken
        ) {
          if (this.routerToken) {
            const finalAmountOut = await this.getFinalAmountOut();

            this.toAmount = finalAmountOut.toFixed();
            this.price = new BigNumber(this.toAmount).div(this.fromAmount);
          } else {
            const [toAmount] = await this.currentPair.value!.getAmountOut.call(
              this.fromAmount,
              this.fromToken as Token
            );
            //@ts-ignore
            this.toAmount = toAmount?.toFixed();
            this.price = new BigNumber(this.toAmount).div(this.fromAmount);
          }
        } else {
          this.toAmount = "";
          this.price = null;
        }
      }, 300)
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
    this.fromAmount = "";
    this.toAmount = "";
  }

  setFromToken(token: Token) {
    if (this.fromToken?.address !== token?.address) {
      if (this.toToken?.address === token?.address) {
        this.toToken = this.fromToken;
        this.toAmount = "";
      }
      this.fromToken = token;
      this.fromToken.init();
      this.fromAmount = "";
    }
  }

  setFromAmount(amount: string) {
    this.fromAmount = amount;
  }

  setToToken(token: Token) {
    if (this.toToken?.address !== token?.address) {
      if (this.fromToken?.address === token?.address) {
        this.fromToken = this.toToken;
        this.fromAmount = "";
      }
      this.toToken = token;
      this.toToken.init();
      this.toAmount = "";
    }
  }

  setToAmount(amount: string) {
    this.toAmount = amount;
  }

  swapExactTokensForTokens = new AsyncState(async () => {
    if (
      !this.fromToken ||
      !this.toToken ||
      !this.fromAmount ||
      !this.toAmount ||
      (!this.currentPair.value && !this.routerToken)
    ) {
      return;
    }
    const fromAmountDecimals = new BigNumber(this.fromAmount)
      .multipliedBy(new BigNumber(10).pow(this.fromToken.decimals))
      .toFixed(0);

    const deadline = dayjs().unix() + 60 * (this.deadline || 20);

    await Promise.all([
      this.fromToken.approveIfNoAllowance({
        amount: fromAmountDecimals,
        spender: this.routerV2Contract.address,
      }),
    ]);

    const path = this.getSwapPath();

    const finalAmountOut = await this.getFinalAmountOut();

    const minAmountOutDecimals = new BigNumber(finalAmountOut)
      .multipliedBy(1 - this.slippage / 100)
      .multipliedBy(new BigNumber(10).pow(this.toToken.decimals))
      .toFixed(0);
    if (this.fromToken.isNative) {
      await this.routerV2Contract.swapExactETHForTokens.call([
        BigInt(minAmountOutDecimals),
        path,
        wallet.account as `0x${string}`,
        BigInt(deadline),
      ], {
        value: BigInt(fromAmountDecimals),
      })
    } else if (this.toToken.isNative) {
      await this.routerV2Contract.swapExactTokensForETH.call([
        BigInt(fromAmountDecimals),
        BigInt(minAmountOutDecimals),
        path,
        wallet.account as `0x${string}`,
        BigInt(deadline),
      ])
    } else {
      await this.routerV2Contract.swapExactTokensForTokens.call([
        BigInt(fromAmountDecimals),
        BigInt(minAmountOutDecimals),
        path,
        wallet.account as `0x${string}`,
        BigInt(deadline),
      ]);
    }
  
  

    this.fromAmount = "";

    Promise.all([
      this.currentPair.value?.init(true),
      this.fromToken.getBalance(),
      this.toToken.getBalance(),
    ]);
  });

  setRouterToken(value: Token[] | undefined) {
    this.routerToken = value;
  }

  getSwapPath = (): readonly `0x${string}`[] => {
    if (this.routerToken) {
      if (this.routerToken.length === 1) {
        return [
          this.fromToken!.address,
          this.routerToken[0].address,
          this.toToken!.address,
        ] as readonly `0x${string}`[];
      } else if (this.routerToken.length === 2) {
        return [
          this.fromToken!.address,
          this.routerToken[0].address,
          this.routerToken[1].address,
          this.toToken!.address,
        ] as readonly `0x${string}`[];
      }
    }

    return [
      this.fromToken!.address,
      this.toToken!.address,
    ] as readonly `0x${string}`[];
  };

  getFinalAmountOut = async () => {
    const path = this.getSwapPath();

    let finalAmountOut = new BigNumber(this.fromAmount);

    for (let i = 0; i < path.length - 1; i++) {
      const pair = liquidity.getMemoryPair(
        path[i].toLowerCase(),
        path[i + 1].toLowerCase()
      );

      console.log("pair", pair);

      await pair?.init();

      const [toAmount] = await pair.getAmountOut.call(
        finalAmountOut.toFixed(),
        pair.token0.address === path[i] ? pair.token0 : pair.token1
      );

      finalAmountOut = toAmount as BigNumber;
    }

    return finalAmountOut;
  };
}

export const swap = new Swap();
