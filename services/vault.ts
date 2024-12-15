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
  slippage: number = 0.5; // Default slippage 0.5%
  deadline: number = 20; // Default deadline 20 minutes
  vaultContract?: ICHIVaultContract;

  constructor() {
    makeAutoObservable(this);

    // Only react to amount changes
    reaction(
      () => [this.amountA, this.amountB],
      () => {
        this.onAmountChange();
      }
    );
  }

  // Getters
  get isDisabled() {
    return (
      !this.tokenA ||
      !this.tokenB ||
      !this.vaultContract ||
      (!this.amountA && !this.amountB) ||
      (this.allowTokenA && !this.amountA) ||
      (this.allowTokenB && !this.amountB) ||
      (this.amountA && this.tokenA.balance.toNumber() < Number(this.amountA)) ||
      (this.amountB && this.tokenB.balance.toNumber() < Number(this.amountB))
    );
  }

  get buttonContent() {
    if (!this.tokenA || !this.tokenB) {
      return "Select Tokens";
    }

    if (
      (!this.amountA && this.allowTokenA) ||
      (!this.amountB && this.allowTokenB)
    ) {
      return "Enter Amount";
    }

    if (
      (this.amountA && this.tokenA.balance.toNumber() < Number(this.amountA)) ||
      (this.amountB && this.tokenB.balance.toNumber() < Number(this.amountB))
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
    this.amountA = amount;
  }

  setAmountB(amount: string) {
    this.amountB = amount;
  }

  async setVaultContract(contract: ICHIVaultContract) {
    this.vaultContract = contract;

    // Reset state
    this.amountA = "";
    this.amountB = "";
    this.needApproveA = false;
    this.needApproveB = false;

    if (contract) {
      // Get pool tokens
      const [token0, token1, allowToken0, allowToken1] = await Promise.all([
        contract.contract.read.token0(),
        contract.contract.read.token1(),
        contract.contract.read.allowToken0(),
        contract.contract.read.allowToken1(),
      ]);

      // Initialize tokens
      this.tokenA = new Token({ address: token0 });
      this.tokenB = new Token({ address: token1 });

      this.allowTokenA = allowToken0;
      this.allowTokenB = allowToken1;

      // Initialize tokens
      await Promise.all([this.tokenA.init(), this.tokenB.init()]);
    } else {
      this.tokenA = undefined;
      this.tokenB = undefined;
      this.allowTokenA = false;
      this.allowTokenB = false;
    }
  }

  // Actions
  deposit = new AsyncState(async () => {
    if (!this.tokenA || !this.tokenB || !this.vaultContract) {
      return;
    }

    const deposit0 = this.allowTokenA
      ? new BigNumber(this.amountA)
          .multipliedBy(new BigNumber(10).pow(this.tokenA.decimals))
          .toFixed(0)
      : "0";

    const deposit1 = this.allowTokenB
      ? new BigNumber(this.amountB)
          .multipliedBy(new BigNumber(10).pow(this.tokenB.decimals))
          .toFixed(0)
      : "0";

    // Only approve tokens that are allowed and have amounts
    const approvalPromises = [];
    if (this.allowTokenA && this.amountA) {
      approvalPromises.push(
        this.tokenA.approveIfNoAllowance({
          amount: deposit0,
          spender: this.vaultContract.address,
        })
      );
    }
    if (this.allowTokenB && this.amountB) {
      approvalPromises.push(
        this.tokenB.approveIfNoAllowance({
          amount: deposit1,
          spender: this.vaultContract.address,
        })
      );
    }
    await Promise.all(approvalPromises);

    await this.vaultContract.deposit(
      BigInt(deposit0),
      BigInt(deposit1),
      wallet.account as `0x${string}`
    );

    // Reset amounts after deposit
    this.amountA = "";
    this.amountB = "";
    // Refresh balances
    await Promise.all([this.tokenA.getBalance(), this.tokenB.getBalance()]);
  });

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

  collectFees = new AsyncState(async () => {
    if (!this.vaultContract) {
      return;
    }

    await this.vaultContract.collectFees();
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
