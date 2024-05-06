import { Network, networks } from "./chain";
import BigNumber from "bignumber.js";
import { PublicClient, WalletClient } from "viem";
import { RouterV2Contract } from "./contract/routerv2-contract";
import { FactoryContract } from "./contract/factory-contract";
import { FtoFactoryContract } from "./contract/ftofactory-contract";
import { makeAutoObservable } from "mobx";
import { Token } from "./contract/token";
import { createPublicClientByChain } from "@/lib/client";

export class Wallet {
  account: string = "";
  accountShort = "";
  networks: Network[] = [];
  balance: BigNumber = new BigNumber(0);
  walletClient!: WalletClient;
  currentChainId: number = -1;
  contracts: {
    routerV2: RouterV2Contract;
    factory: FactoryContract;
    ftofactory: FtoFactoryContract;
  } = {} as any
  publicClient!: PublicClient;
  get networksMap() {
    return this.networks.reduce((acc, network) => {
      acc[network.chainId] = network;
      return acc;
    }, {} as Record<number, Network>);
  }

  get currentChain() {
    return this.networksMap[this.currentChainId];
  }

  constructor(args: Partial<Wallet>) {
    this.networks = networks;
    makeAutoObservable(this);
  }

  initWallet(walletClient: WalletClient) {
    if (
      !walletClient.chain?.id ||
      !this.networksMap[walletClient.chain.id] ||
      !walletClient.account?.address
    ) {
      return;
    }
    this.currentChainId = walletClient.chain.id;
    this.account = walletClient.account.address;
    console.log("this.currentChainId", this.currentChainId);
    this.currentChain.faucetTokens = this.currentChain.faucetTokens.map(
      (token) => new Token(token)
    );
    this.contracts = {
      routerV2: new RouterV2Contract({
        address: this.currentChain.contracts.routerV2,
      }),
      factory: new FactoryContract({
        address: this.currentChain.contracts.factory,
      }),
      ftofactory: new FtoFactoryContract({
        address: this.currentChain.contracts.ftoFactory,
      }),
    };
    this.publicClient = createPublicClientByChain(this.currentChain.chain);
    this.walletClient = walletClient;
  }
}

export const wallet = new Wallet({});
