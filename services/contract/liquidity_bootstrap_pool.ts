import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { makeAutoObservable } from "mobx";
import { ContractWrite } from "../utils";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";

export class LiquidityBootstrapPoolContract implements BaseContract {
    address = "";
    name: string = "";
    abi =  LiquidityBootstrapPoolABI;

    constructor(args: Partial<LiquidityBootstrapPoolContract>) {
        Object.assign(this, args);
        makeAutoObservable(this);
    }

    get contract () {
        return getContract({
            address: this.address as `0x${string}`,
            abi: this.abi,
            client: { public: wallet.publicClient, wallet: wallet.walletClient },
        });
    }

    get swapAssetsForExactShares() {
        return new ContractWrite(this.contract.write.swapAssetsForExactShares, {
          action: "Create Liquidity Bootstrap Pool",
          isSuccessEffect: true,
        });
    }

    get swapExactAssetsForShares () {
        return new ContractWrite(this.contract.write.swapExactAssetsForShares, {
            action: "Swap Exact Assets For Shares",
            isSuccessEffect: true,
        });
    }

    get swapSharesForExactAssets () {
        return new ContractWrite(this.contract.write.swapSharesForExactAssets, {
            action: "Swap Shares For Exact Assets",
            isSuccessEffect: true,
        });
    }

    get swapExactSharesForAssets () {
        return new ContractWrite(this.contract.write.swapExactSharesForAssets, {
            action: "Swap Exact Shares For Assets",
            isSuccessEffect: true,
        });
    }

    get redeem () {
        return new ContractWrite(this.contract.write.redeem, {
            action: "Redeem",
            isSuccessEffect: true,
        })
    }

    get close () {
        return new ContractWrite(this.contract.write.close, {
            action: "Close",
            isSuccessEffect: true,
        })
    }

    get cancelLBP() {
        return new ContractWrite(this.contract.write.cancelLBP, {
            action: "CancelLBP",
            isSuccessEffect: true,
        })
    }

    get args () {
        return this.contract.read.args()
    }

    get reservesAndWeights () {
        return this.contract.read.reservesAndWeights();
    }
    
    previewAssetsIn (shareOut: bigint) {
        return this.contract.read.previewAssetsIn([shareOut])
    }

    previewAssetsOut (shareIn: bigint) {
        return this.contract.read.previewAssetsOut([shareIn])
    }

    previewSharesOut (assetIn: bigint) {
        return this.contract.read.previewSharesOut([assetIn])
    }

    previewSharesIn (assetsOut: bigint) {
        return this.contract.read.previewSharesIn([assetsOut])
    }
}