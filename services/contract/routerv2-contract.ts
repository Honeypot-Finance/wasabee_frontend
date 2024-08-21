import { routerV2ABI } from "@/lib/abis/routerv2";
import { BaseContract } from ".";

import { wallet } from "../wallet";
import { getContract } from "viem";
import { ContractWrite } from "../utils";

export class RouterV2Contract implements BaseContract {
  address = "";
  name: string = "";
  abi = routerV2ABI;
  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: {
        wallet: wallet.walletClient,
        public: wallet.publicClient,
      },
    });
  }
  constructor(args: Partial<RouterV2Contract>) {
    Object.assign(this, args);
  }

  get addLiquidity() {
    return new ContractWrite(this.contract.write.addLiquidity, {
      action: "Add Liquidity",
    });
  }

  get addLiquidityETH() {
    return new ContractWrite(this.contract.write.addLiquidityETH, {
      action: "Add Liquidity",
    });
  }

  get removeLiquidity() {
    return new ContractWrite(this.contract.write.removeLiquidity, {
      action: "Remove Liquidity",
    });
  }

  get removeLiquidityETH() {
    return new ContractWrite(this.contract.write.removeLiquidityETH, {
      action: "Remove Liquidity",
    });
  }

  get swapExactTokensForTokens() {
    return new ContractWrite(this.contract.write.swapExactTokensForTokens, {
      action: "Swap",
    });
  }

  get swapExactTokensForETH() {
    return new ContractWrite(this.contract.write.swapExactTokensForETH, {
      action: "Swap",
    });
  }
  get swapExactETHForTokens() {
    return new ContractWrite(this.contract.write.swapExactETHForTokens, {
      action: "Swap",
    });
  }

  get swapExactTokensForTokensSupportingFeeOnTransferTokens() {
    return new ContractWrite(
      this.contract.write.swapExactTokensForTokensSupportingFeeOnTransferTokens,
      {
        action: "Swap",
      }
    );
  }
}
