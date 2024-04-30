import ERC20ABI from '~/static/abis/erc20.json'
import BigNumber from 'bignumber.js'
import { BaseContract } from '.'
import faucetABI from '~/static/abis/faucet.json'
import { wallet } from '../wallet'
import { makeAutoObservable } from 'mobx'
import { getContract } from 'viem';
import { ContractWrite } from '../utils'

export class Token implements BaseContract {
  address: string = ''
  name: string = ''
  balance = new BigNumber(0)
  symbol: string = ''
  decimals: number = 0
  logoURI = ''
  abi = ERC20ABI
  faucetLoading = false
  get displayName () {
    return this.symbol || this.name
  }
  get faucetContract () {
    return  getContract({
      address: this.address as `0x${string}`,
      abi: faucetABI,
      client: { public: wallet.currentChain.publicClient, wallet: wallet.walletClient }
    })
  }
  get contract () {
    return getContract({
      // @ts-ignore
      address: this.address,
      abi: this.abi,
      client: { public: wallet.currentChain.publicClient, wallet: wallet.walletClient }
    })
  }

  constructor({ balance, ...args }: Partial<Token>) {
    Object.assign(this, args)
    if (balance) {
      this.balance = new BigNumber(balance)
    }
    makeAutoObservable(this)
  }

  faucet = new ContractWrite(async () => {
    return this.faucetContract?.write.faucet([], {
      account: wallet.account
    })
  })

  async approve(amount: string, spender: string) {
    const allowance = await this.contract?.read.allowance([wallet.account, spender])
    if (new BigNumber((allowance as any).toString()).gte(new BigNumber(amount))) {
      return
    }
    const args = [spender, amount]
    await this.contract?.write.approve(args)
  }


  async getBalance() {
    const balance = await this.contract?.read.balanceOf([wallet.account])
    this.balance = balance
      ? new BigNumber(balance.toString()).div(
          new BigNumber(10).pow(this.decimals)
        )
      : new BigNumber(0)
      // console.log('balance', this.address, this.balance.toString())
    return this.balance
  }
}
