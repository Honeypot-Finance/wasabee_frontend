
import BigNumber from 'bignumber.js'
import { BaseContract } from '.'
import { wallet } from '../wallet'
import { makeAutoObservable } from 'mobx'
import { getContract } from 'viem';
import { ContractWrite } from '../utils'
import { amountFormatted } from '@/lib/format'
import { ERC20ABI } from '@/lib/abis/erc20';
import { faucetABI } from '@/lib/abis/faucet';

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
      client: { public: wallet.publicClient, wallet: wallet.walletClient }
    })
  }
  get contract () {
    return getContract({
      address: this.address  as `0x${string}`,
      abi: this.abi,
      client: { public: wallet.publicClient, wallet: wallet.walletClient }
    })
  }

  constructor({ balance, ...args }: Partial<Token>) {
    Object.assign(this, args)
    if (balance) {
      this.balance = new BigNumber(balance)
    }
    makeAutoObservable(this)
  }

  get faucet () {
    return new ContractWrite(this.faucetContract.write?.faucet)
  } 
  get approve () {
    return  new ContractWrite(this.contract.write?.approve)
  }

  async approveIfNoAllowance(amount: string, spender: string) {
    const allowance = await this.contract.read.allowance([wallet.account as `0x${string}`, spender as `0x${string}`])
    if (new BigNumber((allowance as any).toString()).gte(new BigNumber(amount))) {
      console.log('allowance', allowance)
      return
    }
    await this.approve.call([spender as `0x${string}`, BigInt(amount)])
  }


  async getBalance() {
    const balance = await this.contract.read.balanceOf([wallet.account as `0x${string}`])
    this.balance = balance
      ? new BigNumber(balance.toString()).div(
          new BigNumber(10).pow(this.decimals)
        )
      : new BigNumber(0)
      // console.log('balance', this.address, this.balance.toString())
    return this.balance
  }

  get balanceFormatted() {
    return amountFormatted(this.balance,  {
      decimals: 0,
      fixed: 3
    })
  }
}
