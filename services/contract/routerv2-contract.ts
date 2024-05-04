


import { routerV2ABI } from "@/lib/abis/routerv2";
import { BaseContract } from ".";

import { wallet } from '../wallet';
import { getContract } from 'viem';
import { ContractWrite } from '../utils';

export class RouterV2Contract implements BaseContract {
  address = ''
  name: string = ''
  abi = routerV2ABI
  get contract () {
    return  getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: {
        wallet: wallet.walletClient,
        public: wallet.publicClient
      }
    })
  }
  constructor(args: Partial<RouterV2Contract>) {
    Object.assign(this, args)
  }

  get removeLiquidity () {
    return new ContractWrite(this.contract.write.removeLiquidity)
  }

  get swapExactTokensForTokens () {
    return new ContractWrite(this.contract.write.swapExactTokensForTokens)
  }
}

