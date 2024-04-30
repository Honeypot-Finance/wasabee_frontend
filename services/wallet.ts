import { Network, networks } from './chain'
import BigNumber from 'bignumber.js'
import { WalletClient } from 'viem';
import { RouterV2Contract } from './contract/routerv2-contract'
import { FactoryContract } from './contract/factory-contract'
import { makeAutoObservable } from 'mobx'
import { Token } from './contract/token';

export class Wallet {
  account: string = ''
  accountShort = ''
  networks: Network [] = []
  balance: BigNumber = new BigNumber(0)
  walletClient!: WalletClient
  currentChainId: number = -1

  get networksMap() {
    return this.networks.reduce((acc, network) => {
      acc[network.chainId] = network
      return acc
    }, {} as Record<number, Network>)
  }

  get currentChain() {
    return this.networksMap[this.currentChainId]
  }

  get contracts () {
    return {
      routerV2: new RouterV2Contract({
        address: this.currentChain.contracts.routerV2
      }),
      factory: new FactoryContract({
        address: this.currentChain.contracts.factory
      })
    }
  }


  // get routerV2Contract () {
  //   return new RouterV2Contract
  // }


  constructor(args: Partial<Wallet>) {
    this.networks = networks
    makeAutoObservable(this)
  }

  initWallet ({account, chainId }: {
    account: `0x${string}`,
    chainId: number,
  }) {
    this.currentChainId = chainId
    this.account = account
    console.log('this.currentChainId', this.currentChainId)
    this.currentChain.faucetTokens = this.currentChain.faucetTokens.map((token) => new Token(token));
  }

  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient
  }
}

export const wallet = new Wallet({})