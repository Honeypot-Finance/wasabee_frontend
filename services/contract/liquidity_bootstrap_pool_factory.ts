import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { makeAutoObservable } from "mobx";
import { ContractWrite } from "../utils";
import { LiquidityBootstrapPoolFactoryABI } from "@/lib/abis/LiquidityBootstrapPoolFactory";

export class LiquidityBootstrapPoolFactoryContract implements BaseContract {
    address = "";
    name: string = "";
    abi =  LiquidityBootstrapPoolFactoryABI;

    constructor(args: Partial<LiquidityBootstrapPoolFactoryContract>) {
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

    get createLiquidityBootstrapPool() {
        return new ContractWrite(this.contract.write.createLiquidityBootstrapPool, {
          action: "Create Liquidity Bootstrap Pool",
          isSuccessEffect: true,
        });
    }

    
}