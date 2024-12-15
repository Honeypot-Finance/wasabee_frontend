import { makeAutoObservable, reaction } from "mobx";
import { Token } from "./contract/token";
import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { AsyncState } from "./utils";

class Portfolio {
  tokens: Token[] = [];
  isInit = false;
  totalBalance = new BigNumber(0);
  isLoading = true;

  constructor() {
    makeAutoObservable(this);

    // React to wallet changes
    reaction(
      () => wallet.isInit,
      (isInit) => {
        if (isInit) {
          this.initPortfolio();
        }
      }
    );
  }

  async initPortfolio() {
    if (this.isInit) return;

    this.isLoading = true;

    try {
      // Get validated tokens from current chain
      const validatedTokens = wallet.currentChain?.validatedTokens || [];

      // Initialize tokens
      await Promise.all(
        validatedTokens.map(async (token) => {
          await token.init(true, {
            loadBalance: true,
            loadIndexerTokenData: true,
          });
        })
      );

      // Filter tokens with balance
      this.tokens = validatedTokens.filter(
        (token) => token.balance.toNumber() > 0
      );

      // Calculate total balance in USD
      this.calculateTotalBalance();
    } catch (error) {
      console.error("Portfolio initialization error:", error);
    } finally {
      this.isLoading = false;
      this.isInit = true;
    }
  }

  calculateTotalBalance() {
    this.totalBalance = this.tokens.reduce((total, token) => {
      const tokenUSDValue = new BigNumber(token.derivedUSD || 0).multipliedBy(
        token.balance
      );
      return total.plus(tokenUSDValue);
    }, new BigNumber(0));
  }

  // Refresh token balances
  refreshBalances = new AsyncState(async () => {
    this.isLoading = true;

    try {
      await Promise.all(
        this.tokens.map(async (token) => {
          await token.getBalance();
          await token.getIndexerTokenData({ force: true });
        })
      );

      this.calculateTotalBalance();
    } finally {
      this.isLoading = false;
    }
  });

  get sortedTokens() {
    return [...this.tokens].sort((a, b) => {
      const aValue = new BigNumber(a.derivedUSD || 0).multipliedBy(a.balance);
      const bValue = new BigNumber(b.derivedUSD || 0).multipliedBy(b.balance);
      return bValue.minus(aValue).toNumber();
    });
  }

  get totalBalanceFormatted() {
    return this.totalBalance.toFixed(2);
  }
}

export const portfolio = new Portfolio();
