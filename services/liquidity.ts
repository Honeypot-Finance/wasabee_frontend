// import scrollTokens from '~/static/tokens/scroll_tokens.json'
// import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
import { wallet } from "./wallet";
import { Token } from "./contract/token";
import { PairContract } from "./contract/pair-contract";
import BigNumber from "bignumber.js";
import { trpcClient } from "@/lib/trpc";
import { makeAutoObservable, reaction, toJS, when } from "mobx";
import {
  AsyncState,
  IndexerPaginationState,
  StorageState,
  ValueState,
} from "./utils";
import { add, debounce } from "lodash";
import dayjs from "dayjs";
import { PageRequest, PairFilter } from "./indexer/indexerTypes";

class Liquidity {
  pairPage = new IndexerPaginationState<PairFilter, PairContract>({
    LoadNextPageFunction: async (
      filter: PairFilter,
      pageRequest: PageRequest
    ) => {
      const pairs = await trpcClient.indexerFeedRouter.getFilteredPairs.query({
        filter: filter,
        chainId: String(wallet.currentChainId),
        pageRequest: pageRequest,
      });

      if (pairs.status === "success") {
        const pariContracts = pairs.data.pairs.map((pair) => {
          const token0 = Token.getToken({
            ...pair.token0,
            address: pair.token0.id,
          });
          const token1 = Token.getToken({
            ...pair.token1,
            address: pair.token1.id,
          });
          const pairContract = new PairContract({
            token0,
            token1,
            address: pair.id,
          });

          if (!this.tokensMap[token0.address]) {
            this.tokensMap[token0.address] = token0;

            token0.init();
          }
          if (!this.tokensMap[token1.address]) {
            this.tokensMap[token1.address] = token1;

            token1.init();
          }
          this.pairsByToken[`${token0.address}-${token1.address}`] =
            pairContract;
          pairContract.init();
          return pairContract;
        });

        return {
          items: pariContracts,
          pageInfo: pairs.data.pageInfo,
        };
      } else {
        return {
          items: [],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: "",
          },
        };
      }
    },
    filter: {
      searchString: "",
      limit: 10,
    },
  });

  pairs: PairContract[] = [];
  pairsByToken: Record<string, PairContract> = {};
  tokensMap: Record<string, Token> = {};

  slippage = 10;
  // localTokensMap = new StorageState<Record<string, Token>>({
  //   key: "localTokens_v2",
  //   value: {} as Record<string, Token>,
  //   serialize: (value) => {
  //     const val = value
  //       ? Object.values(value).reduce((acc, token) => {
  //           acc[token.address.toLowerCase()] = token.serialize();
  //           return acc;
  //         }, {} as Record<string, Pick<Token, "address" | "name" | "symbol" | "decimals">>)
  //       : null;
  //     return val;
  //   },
  //   deserialize: (
  //     value: Record<
  //       string,
  //       Pick<Token, "address" | "name" | "symbol" | "decimals">
  //     >
  //   ) => {
  //     const res = Object.values(value).reduce((acc, t) => {
  //       const token = Token.getToken({
  //         ...t,
  //       })
  //       console.log('token', token)
  //       token.priority = 3;
  //       acc[token.address] = token;
  //       return acc;
  //     }, {} as Record<string, Token>);
  //     console.log("deserialize", res);
  //     return res;
  //   },
  //   transform(value: Token) {
  //     this.value![value.address] = value;
  //     return {
  //       ...this.value,
  //     };
  //   },
  // });

  get tokens() {
    const tokensMap = {
      ...wallet.currentChain.validatedTokensInfo,
    };
    const tokens = Object.values(tokensMap);
    tokens.push(wallet.currentChain.nativeToken);
    const sortedTokens = tokens.sort((a, b) => {
      const diff = b.priority - a.priority;
      if (diff === 0) {
        return a.logoURI ? -1 : b.logoURI ? 1 : 0;
      }
      return diff;
    });
    return sortedTokens;
  }

  fromToken: Token | null = null;
  toToken: Token | null = null;
  fromAmount = "";
  toAmount = "";
  deadline = 0;
  isInit = false;

  currentRemovePair: PairContract | null = null;

  currentPair = new AsyncState(async () => {
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

  get routerV2Contract() {
    return wallet.contracts.routerV2;
  }

  get factoryContract() {
    return wallet.contracts.factory;
  }

  get myPairs() {
    console.log("pairs", this.pairs);
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
    return "Add LP";
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
  }

  onFromAmountInputChange = debounce(async () => {
    if (!this.currentPair.value) {
      return;
    }
    if (this.fromAmount) {
      const [toAmount] = await this.currentPair.value.getAmountOut.call(
        this.fromAmount,
        this.fromToken as Token
      );
      //@ts-ignore
      this.toAmount = toAmount?.toFixed();
    } else {
      this.toAmount = "";
    }
  }, 300);

  onToAmountInputChange = debounce(async () => {
    if (!this.currentPair.value) {
      return;
    }
    if (this.toAmount) {
      const [fromAmount] = await this.currentPair.value.getAmountOut.call(
        this.toAmount,
        this.toToken as Token
      );
      //@ts-ignore
      this.fromAmount = fromAmount.toFixed();
    } else {
      this.fromAmount = "";
    }
  }, 300);

  setCurrentRemovePair(pair: PairContract | null) {
    this.currentRemovePair = pair;
  }

  setFromToken(token: Token) {
    if (this.fromToken?.address !== token.address) {
      if (this.toToken?.address === token.address) {
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
    if (this.toToken?.address !== token.address) {
      if (this.fromToken?.address === token.address) {
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
    // const token1MinAmountWithDec = new BigNumber(token1AmountWithDec).multipliedBy(1 - this.slippage / 100).toFixed(0);
    const token1MinAmountWithDec = 0;
    // const token0MinAmountWithDec = new BigNumber(token0AmountWithDec).multipliedBy(1 - this.slippage / 100).toFixed(0);
    const token0MinAmountWithDec = 0;
    const deadline = dayjs().unix() + 60 * (this.deadline || 20);
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
    if (this.fromToken.isNative) {
      console.log("addLiquidityETH", [
        this.toToken.address as `0x${string}`,
        BigInt(token1AmountWithDec),
        BigInt(token1MinAmountWithDec),
        BigInt(token0MinAmountWithDec),
        wallet.account as `0x${string}`,
        BigInt(deadline),
      ]);
      await this.routerV2Contract.addLiquidityETH.call(
        [
          this.toToken.address as `0x${string}`,
          BigInt(token1AmountWithDec),
          BigInt(token1MinAmountWithDec),
          BigInt(token0MinAmountWithDec),
          wallet.account as `0x${string}`,
          BigInt(deadline),
        ],
        {
          value: BigInt(token0AmountWithDec),
        }
      );
    } else if (this.toToken.isNative) {
      await this.routerV2Contract.addLiquidityETH.call([
        this.fromToken.address as `0x${string}`,
        BigInt(token0AmountWithDec),
        BigInt(token0MinAmountWithDec),
        BigInt(token1MinAmountWithDec),
        wallet.account as `0x${string}`,
        BigInt(deadline),
      ]),
        {
          value: BigInt(token1AmountWithDec),
        };
    } else {
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
    }

    this.fromAmount = "";
    this.toAmount = "";
    Promise.all([this.fromToken.getBalance(), this.toToken.getBalance()]);
  });

  async initPool() {
    if (this.isInit || !wallet.currentChain) {
      return;
    }

    const pairs = await trpcClient.indexerFeedRouter.getAllPairs.query();

    if (pairs.status === "success") {
      this.pairs = pairs.data.pairs.map((pair) => {
        const token0 = Token.getToken({
          ...pair.token0,
          address: pair.token0.id,
        });
        const token1 = Token.getToken({
          ...pair.token1,
          address: pair.token1.id,
        });
        const pairContract = new PairContract({
          token0,
          token1,

          address: pair.id,
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
    }
    this.isInit = true;
  }

  async getPairByTokens(token0Address: string, token1Address: string) {
    const memoryPair = this.getMemoryPair(token0Address, token1Address);
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
      const pairContract = new PairContract({
        address: pair.address,
        token0: Token.getToken(pair.token0),
        token1: Token.getToken(pair.token1),
      });
      pairContract.init();

      this.pairsByToken[`${token0Address}-${token1Address}`] = pairContract;
      return pairContract;
    }
  }

  isFtoRaiseToken(tokenAddress: string): boolean {
    return wallet.currentChain.contracts.ftoTokens.some(
      (ftoToken) =>
        ftoToken.address?.toLowerCase() === tokenAddress.toLowerCase()
    );
  }

  isValidatedToken(tokenAddress: string): boolean {
    return (
      wallet.currentChain.validatedTokensInfo[tokenAddress.toLowerCase()] !==
      undefined
    );
  }

  getTokenToValidatedTokenPairs(tokenAddress: string): string[] {
    const pairTokens: string[] = [];

    Object.keys(wallet.currentChain.validatedTokensInfo).forEach(
      (token, idx) => {
        const memoryPair = this.getMemoryPair(
          tokenAddress.toLowerCase(),
          token.toLowerCase()
        );

        if (memoryPair) {
          pairTokens.push(token);
        }
      }
    );

    return pairTokens;
  }

  getTokenToRaisedTokenPairs(tokenAddress: string): string[] {
    const pairTokens: string[] = [];

    wallet.currentChain.contracts.ftoTokens.forEach((ftoToken) => {
      const memoryPair = this.getMemoryPair(
        tokenAddress.toLowerCase(),
        ftoToken.address?.toLowerCase() ?? ""
      );

      if (memoryPair) {
        pairTokens.push(ftoToken.address!);
      }
    });

    return pairTokens;
  }

  getMemoryPair(token0: string, token1: string) {
    return (
      this.pairsByToken[`${token0}-${token1}`] ||
      this.pairsByToken[`${token1}-${token0}`]
    );
  }
}

export const liquidity = new Liquidity();
