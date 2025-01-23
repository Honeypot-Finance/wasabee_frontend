import { makeAutoObservable, reaction } from "mobx";
import { AsyncState } from "./utils";
import { wallet } from "./wallet";
import { Token } from "./contract/token";
import BigNumber from "bignumber.js";
import { ICHIVaultContract } from "./contract/aquabera/ICHIVault-contract";
import dayjs from "dayjs";

class Vault {
  tokenA?: Token;
  tokenB?: Token;
  amountA: string = "";
  amountB: string = "";
  allowTokenA: boolean = false;
  allowTokenB: boolean = false;
  needApproveA: boolean = false;
  needApproveB: boolean = false;
  vaultContract?: ICHIVaultContract;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => [this.amountA, this.amountB],
      () => {
        this.onAmountChange();
      }
    );
  }

  // Getters
  get displayTokenA() {
    return this.allowTokenA ? this.tokenA : undefined;
  }

  get displayTokenB() {
    return this.allowTokenB ? this.tokenB : undefined;
  }

  get isDisabled() {
    const hasValidAmounts =
      (this.allowTokenA && this.amountA) || (this.allowTokenB && this.amountB);

    const hasInsufficientBalance =
      (this.amountA &&
        (this.tokenA?.balance?.toNumber() ?? 0) < Number(this.amountA)) ||
      (this.amountB &&
        (this.tokenB?.balance?.toNumber() ?? 0) < Number(this.amountB));

    return (
      !this.vaultContract || !!!hasValidAmounts || !!hasInsufficientBalance
    );
  }

  get buttonContent() {
    if (!this.vaultContract) {
      return "Connect Wallet";
    }

    if (
      this.allowTokenA &&
      !this.amountA &&
      this.allowTokenB &&
      !this.amountB
    ) {
      return "Enter Amount";
    }

    if (
      (this.amountA &&
        (this.tokenA?.balance?.toNumber() ?? 0) < Number(this.amountA)) ||
      (this.amountB &&
        (this.tokenB?.balance?.toNumber() ?? 0) < Number(this.amountB))
    ) {
      return "Insufficient Balance";
    }

    if (this.needApproveA || this.needApproveB) {
      return "Approve";
    }

    return "Deposit";
  }

  // Setters
  setAmountA(amount: string) {
    if (this.allowTokenA) {
      this.amountA = amount;
    }
  }

  setAmountB(amount: string) {
    if (this.allowTokenB) {
      this.amountB = amount;
    }
  }

  async setVaultContract(contract: ICHIVaultContract) {
    this.vaultContract = contract;
    this.resetState();

    if (contract) {
      await this.initializeTokens(contract);
    }
  }

  private resetState() {
    this.amountA = "";
    this.amountB = "";
    this.needApproveA = false;
    this.needApproveB = false;
    this.tokenA = undefined;
    this.tokenB = undefined;
    this.allowTokenA = false;
    this.allowTokenB = false;
  }

  private async initializeTokens(contract: ICHIVaultContract) {
    const [token0, token1, allowToken0, allowToken1] = await Promise.all([
      contract.contract.read.token0(),
      contract.contract.read.token1(),
      contract.contract.read.allowToken0(),
      contract.contract.read.allowToken1(),
    ]);

    this.tokenA = new Token({ address: token0 });
    this.tokenB = new Token({ address: token1 });
    this.allowTokenA = allowToken0;
    this.allowTokenB = allowToken1;

    await Promise.all([
      this.tokenA.init(false, {
        loadIndexerTokenData: true,
        loadLogoURI: true,
      }),
      this.tokenB.init(false, {
        loadIndexerTokenData: true,
        loadLogoURI: true,
      }),
    ]);
  }

  // Actions
  deposit = new AsyncState(async () => {
    if (!this.vaultContract) return;

    const deposit0 =
      this.allowTokenA && this.amountA
        ? new BigNumber(this.amountA)
            .multipliedBy(new BigNumber(10).pow(this.tokenA!.decimals))
            .toFixed(0)
        : "0";

    const deposit1 =
      this.allowTokenB && this.amountB
        ? new BigNumber(this.amountB)
            .multipliedBy(new BigNumber(10).pow(this.tokenB!.decimals))
            .toFixed(0)
        : "0";

    await this.handleApprovals(deposit0, deposit1);
    await this.executeDeposit(deposit0, deposit1);
    await this.refreshBalances();

    //redirect to /vault/[address]
    window.location.href = `/vault/${this.vaultContract.address}`;
  });

  private async handleApprovals(deposit0: string, deposit1: string) {
    const approvalPromises = [];

    if (this.allowTokenA && this.amountA) {
      approvalPromises.push(
        this.tokenA!.approveIfNoAllowance({
          amount: deposit0,
          spender: this.vaultContract!.address,
        })
      );
    }

    if (this.allowTokenB && this.amountB) {
      approvalPromises.push(
        this.tokenB!.approveIfNoAllowance({
          amount: deposit1,
          spender: this.vaultContract!.address,
        })
      );
    }

    await Promise.all(approvalPromises);
  }

  private async executeDeposit(deposit0: string, deposit1: string) {
    if (!this.vaultContract) return;

    await this.vaultContract.deposit(
      BigInt(deposit0),
      BigInt(deposit1),
      wallet.account as `0x${string}`
    );

    this.amountA = "";
    this.amountB = "";
  }

  private async refreshBalances() {
    if (!this.vaultContract) return;

    await Promise.all([this.tokenA?.getBalance(), this.tokenB?.getBalance()]);
  }

  withdraw = new AsyncState(async (shares: string) => {
    if (!this.vaultContract || !shares) {
      return;
    }

    const sharesAmount = new BigNumber(shares)
      .multipliedBy(new BigNumber(10).pow(18)) // Vault shares typically have 18 decimals
      .toFixed(0);

    await this.vaultContract.withdraw(
      BigInt(sharesAmount),
      wallet.account as `0x${string}`
    );

    // Refresh balances after withdrawal
    await Promise.all([this.tokenA?.getBalance(), this.tokenB?.getBalance()]);
  });

  // Helper methods
  private onAmountChange = async () => {
    this.getNeedApprove("A");
    this.getNeedApprove("B");
  };

  getNeedApprove = async (token: "A" | "B") => {
    if (
      (!this.tokenA && token === "A") ||
      (!this.tokenB && token === "B") ||
      !this.vaultContract
    ) {
      return;
    }

    const currentToken = token === "A" ? this.tokenA : this.tokenB;
    const currentAmount = token === "A" ? this.amountA : this.amountB;
    const isAllowed = token === "A" ? this.allowTokenA : this.allowTokenB;

    if (!currentToken || !currentAmount || !isAllowed) {
      if (token === "A") {
        this.needApproveA = false;
      } else {
        this.needApproveB = false;
      }
      return;
    }

    const amountDecimals = new BigNumber(currentAmount)
      .multipliedBy(new BigNumber(10).pow(currentToken.decimals))
      .toFixed(0);

    const allowance = await currentToken.contract.read.allowance([
      wallet.account,
      this.vaultContract.address,
    ] as [`0x${string}`, `0x${string}`]);

    if (token === "A") {
      this.needApproveA = new BigNumber(allowance.toString()).isLessThan(
        amountDecimals
      );
    } else {
      this.needApproveB = new BigNumber(allowance.toString()).isLessThan(
        amountDecimals
      );
    }
  };
}

export const vault = new Vault();
