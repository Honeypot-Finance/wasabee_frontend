import BigNumber from "bignumber.js";
import { BaseContract } from ".";
import { wallet } from "../wallet";
import { makeAutoObservable } from "mobx";
import { getContract } from "viem";
import { ContractWrite } from "../utils";
import { amountFormatted } from "@/lib/format";
import { ERC20ABI } from "@/lib/abis/erc20";
import { faucetABI } from "@/lib/abis/faucet";
import { networksMap } from "../chain";

export class Token implements BaseContract {
  address: string = "";
  name: string = "";
  balanceWithoutDecimals = new BigNumber(0);
  totalSupplyWithoutDecimals = new BigNumber(0);
  symbol: string = "";
  decimals: number = 0;
  logoURI = "";
  abi = ERC20ABI;
  faucetLoading = false;
  claimed = false;
  isInit = false;

  get displayName() {
    return this.symbol || this.name;
  }
  get faucetContract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: faucetABI,
      client: { public: wallet.publicClient, wallet: wallet.walletClient },
    });
  }
  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: { public: wallet.publicClient, wallet: wallet.walletClient },
    });
  }

  constructor({ balance, ...args }: Partial<Token>) {
    Object.assign(this, args);
    if (balance) {
      this.balanceWithoutDecimals = new BigNumber(balance);
    }

    this.logoURI =
      networksMap[wallet.currentChainId]?.validatedTokensInfo[this.address]
        ?.logoURI ?? "/images/icons/tokens/unknown-token-icon.png";

    makeAutoObservable(this);
  }

  get faucet() {
    return new ContractWrite(this.faucetContract.write?.faucet, {
      action: "Get Faucet",
    });
  }
  get approve() {
    return new ContractWrite(this.contract.write?.approve, {
      action: "Approve",
    });
  }

  async init(options?: {
    loadName?: boolean;
    loadSymbol?: boolean;
    loadDecimals?: boolean;
    loadBalance?: boolean;
    loadTotalSupply?: boolean;
    loadClaimed?: boolean;
  }) {
    const cachedData = await fetch(
      `/api/server-cache/get-server-cache?key=token:${this.address}:${wallet.currentChainId}`
    ).then((res) => res.json());

    if (cachedData.status === "success") {
      const data = JSON.parse(cachedData.data);
      Object.assign(this, {
        ...data,
        balanceWithoutDecimals: new BigNumber(data.balanceWithoutDecimals),
        totalSupplyWithoutDecimals: new BigNumber(
          data.totalSupplyWithoutDecimals
        ),
        isInit: true,
      });
      return;
    }

    const loadName = options?.loadName ?? true;
    const loadSymbol = options?.loadSymbol ?? true;
    const loadDecimals = options?.loadDecimals ?? true;
    const loadBalance = options?.loadBalance ?? true;
    const loadTotalSupply = options?.loadTotalSupply ?? false;
    const loadClaimed = options?.loadClaimed ?? false;

    await Promise.all([
      loadName && !this.name
        ? this.contract.read.name().then((name) => {
            this.name = name;
          })
        : Promise.resolve(),
      loadSymbol && !this.symbol
        ? this.contract.read.symbol().then((symbol) => {
            this.symbol = symbol;
          })
        : Promise.resolve(),
      loadDecimals && !this.decimals
        ? this.contract.read.decimals().then((decimals) => {
            this.decimals = decimals;
          })
        : Promise.resolve(),
      loadBalance ? this.getBalance() : Promise.resolve(),
      loadTotalSupply ? this.getTotalSupply() : Promise.resolve(),
      loadClaimed
        ? this.getClaimed().then((claimed) => {
            this.claimed = claimed;
          })
        : Promise.resolve(),
    ]);

    const setData = await fetch(`/api/server-cache/set-server-cache`, {
      method: "POST",
      body: JSON.stringify({
        key: `token:${this.address}:${wallet.currentChainId}`,
        data: JSON.stringify(this),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.isInit = true;
  }

  async approveIfNoAllowance({
    amount,
    spender,
  }: {
    amount: string;
    spender: string;
  }) {
    const allowance = await this.contract.read.allowance([
      wallet.account as `0x${string}`,
      spender as `0x${string}`,
    ]);
    if (
      new BigNumber(allowance.toString()).isGreaterThanOrEqualTo(
        new BigNumber(amount)
      )
    ) {
      return;
    }
    await this.approve.call([spender as `0x${string}`, BigInt(amount)]);
  }

  async getClaimed(): Promise<boolean> {
    const claimed = await this.faucetContract.read.faucetClaimer([
      wallet.account as `0x${string}`,
    ]);

    return claimed;
  }

  async getBalance() {
    const balance = await this.contract.read.balanceOf([
      wallet.account as `0x${string}`,
    ]);
    this.balanceWithoutDecimals = new BigNumber(balance.toString());
    return this.balanceWithoutDecimals;
  }
  async getTotalSupply() {
    const totalSupply = await this.contract.read.totalSupply();
    this.totalSupplyWithoutDecimals = new BigNumber(totalSupply.toString());
    return this.totalSupplyWithoutDecimals;
  }

  get balance() {
    return this.balanceWithoutDecimals.div(
      new BigNumber(10).pow(this.decimals)
    );
  }

  get balanceFormatted() {
    return amountFormatted(this.balanceWithoutDecimals, {
      decimals: this.decimals,
      fixed: 3,
    });
  }
}
