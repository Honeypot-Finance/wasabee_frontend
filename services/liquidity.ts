// import scrollTokens from '~/static/tokens/scroll_tokens.json'
// import scrollSepoliaTokens from '~/static/tokens/scroll_alpha_tokens.json'
import { wallet } from './wallet'
import { Token } from './contract/token'
import { PairContract } from './contract/pair-contract'
import BigNumber from 'bignumber.js'
import { exec } from '~/lib/contract'
import { trpcClient } from '@/lib/trpc'
import { makeAutoObservable } from 'mobx'
import { ValueState } from './utils'

class Liquidity {
  pairs: PairContract[] = []
  pairsByToken: Record<string, PairContract> = {}
  tokensMap: Record<string, Token> = {}

  get tokens () {
    return Object.values(this.tokensMap)
  }

  fromToken: Token | null  =  null
  toToken: Token | null  =  null
  deadline = new ValueState<number>({
    value: 0
  })
  fromTokenAmount = new ValueState<number>({
    value:0
  })
  toTokenAmount = new ValueState<number>({
    value: 0
  })


  liquidityLoading = false

  currentRemovePair: PairContract | null  =  null


  get routerV2Contract() {
    return wallet.contracts.routerV2
  }

  get factoryContract() {
    return wallet.contracts.factory
  }

  get myPairs() {
    return this.pairs.filter((pair) => pair.token0LpBalance.gt(0) || pair.token1LpBalance.gt(0))
  }

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentRemovePair(pair: PairContract) {
    this.currentRemovePair = new PairContract(pair)
  }



  switchTokens() {
    const fromToken = this.fromToken
    this.fromToken = this.toToken
    this.toToken = fromToken
  }

  async addLiquidity(
    token0Amount: string,
    token1Amount: string
  ) {
    if (!this.fromToken || !this.toToken) {
        return
    }
    const token0AmountWithDec = new BigNumber(token0Amount)
      .multipliedBy(new BigNumber(10).pow(this.fromToken.decimals))
      .toFixed()
    const token1AmountWithDec = new BigNumber(token1Amount)
      .multipliedBy(new BigNumber(10).pow(this.toToken.decimals))
      .toFixed()
    await Promise.all([
      this.fromToken.approve(token0AmountWithDec, this.routerV2Contract.address as string),
      this.toToken.approve(token1AmountWithDec, this.routerV2Contract.address as string),
    ])
    const deadline = this.deadline || Math.floor(Date.now() / 1000) + 60 * 20 // 20 mins time
    const args: any [] = [
      this.fromToken.address,
      this.toToken.address,
      token0AmountWithDec,
      token1AmountWithDec,
      0,
      0,
      wallet.account,
      deadline,
    ]
    // @ts-ignore
    await this.routerV2Contract.contract.write.addLiquidity(args)
    await Promise.all([this.fromToken.getBalance(), this.toToken.getBalance()])
  }

  initPool (pairs: {
    address: string
    token0: {
      address: string
      name: string
      symbol: string
      decimals: number
    },
    token1: {
      address: string
      name: string
      symbol: string
      decimals: number
    }
  }[]) {
    this.pairs = pairs.map((pair) => {
      const token0 = new Token(pair.token0)
      const token1 = new Token(pair.token1)
      const pairContract = new PairContract({
        address: pair.address,
        token0,
        token1
      })
      this.tokensMap[token0.address] = token0
      this.tokensMap[token1.address] = token1
      this.pairsByToken[`${token0.address}-${token1.address}`] = pairContract
      pairContract.init()
      return pairContract
    })
  }

  async getPairByTokens(token0Address: string, token1Address: string) {
    const memoryPair = this.pairsByToken[`${token0Address}-${token1Address}`] || this.pairsByToken[`${token1Address}-${token0Address}`]
     if (memoryPair) {
        memoryPair.init()
        return memoryPair
     }
    const pair = await trpcClient.pair.getPairByTokens.query({chainId: wallet.currentChainId,token0Address, token1Address})
    if (pair) {
       const pairContract =  new PairContract({...pair})
       pairContract.init()
       this.pairsByToken[`${token0Address}-${token1Address}`] = pairContract
       return pairContract
    }
  }

}

export const liquidity = new Liquidity()
