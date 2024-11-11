import { parseEventLogs } from "viem";
import { AsyncState } from "./utils";
import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { LiquidityBootstrapPoolFactoryABI } from "@/lib/abis/LiquidityBootstrapPoolFactory";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";

 
export interface PoolSettings {
    asset: `0x${string}`;
    share: `0x${string}`;
    creator: `0x${string}`;
    virtualAssets: bigint;
    maxSharePrice: bigint;
    maxSharesOut: bigint;
    maxTotalAssetsIn: bigint;
    maxTotalAssetsInDeviation: number;
    weightStart: bigint;
    weightEnd: bigint;
    saleStart: number;
    saleEnd: number;
    vestCliff: number;
    vestEnd: number;
    redemptionDelay: number;
    sellingAllowed: boolean;
    whitelistMerkleRoot: `0x${string}`;
    minAssetsIn: bigint;
    minPercAssetsSeeding: number;
    minSharesSeeding: bigint;
}

// Parameters for createLiquidityBootstrapPool function
interface CreateLiquidityBootstrapPoolParams {
    args: PoolSettings;
    shares: bigint;
    assets: bigint;
    salt: `0x${string}`;
}

class LaunchPadLbp {

    createLiquidityBootstrapPool = new AsyncState<({ args, shares, assets, salt }: CreateLiquidityBootstrapPoolParams) => Promise<string>>(
        async ({ args, shares, assets, salt }: CreateLiquidityBootstrapPoolParams): Promise<string> => {
            const res = await this.liquidityBootstrapPoolFactoryContract.createLiquidityBootstrapPool.call([{
                ...args,
            }, shares, assets, salt])

            const logs = parseEventLogs({
                logs: res.logs,
                abi: LiquidityBootstrapPoolFactoryABI,
            })

            return logs?.[0]?.address
        }
    )

    swapAssetsForExactShares = new AsyncState<({ }: any) => Promise<bigint>>(
        async ({ sharesOut, maxAssetsIn, recipient }: { sharesOut: bigint, maxAssetsIn: bigint, recipient: `0x${string}` }): Promise<bigint> => {
            const res = await this.liquidityBootstrapPoolContract.swapAssetsForExactShares.call([sharesOut, maxAssetsIn, recipient])

            const logs = parseEventLogs({
                logs: res.logs,
                abi: LiquidityBootstrapPoolABI,
            })

            if (logs[0]) {
                if (logs[0].eventName = "Buy") {
                    return (logs[0].args as {
                        caller: `0x${string}`;
                        recipient: `0x${string}`;
                        assets: bigint;
                        shares: bigint;
                        swapFee: bigint;
                    }).shares;
                }
            }

            return BigInt(0)
        }
    )

    swapExactAssetsForShares = new AsyncState<({ }: any) => Promise<bigint>>(
        async ({ assetsIn, minSharesOut, recipient }: { assetsIn: bigint, minSharesOut: bigint, recipient: `0x${string}` }): Promise<bigint> => {
            const res = await this.liquidityBootstrapPoolContract.swapExactAssetsForShares.call([assetsIn, minSharesOut, recipient])

            const logs = parseEventLogs({
                logs: res.logs,
                abi: LiquidityBootstrapPoolABI,
            })

            if (logs[0]) {
                if (logs[0].eventName = "Buy") {
                    return (logs[0].args as {
                        caller: `0x${string}`;
                        recipient: `0x${string}`;
                        assets: bigint;
                        shares: bigint;
                        swapFee: bigint;
                    }).shares;
                }
            }

            return BigInt(0)
        }
    )

    swapExactSharesForAssets = new AsyncState<({ }: any) => Promise<bigint>>(
        async ({ sharesIn, minAssetsOut, recipient }: { sharesIn: bigint, minAssetsOut: bigint, recipient: `0x${string}` }): Promise<bigint> => {
            const res = await this.liquidityBootstrapPoolContract.swapExactSharesForAssets.call([sharesIn, minAssetsOut, recipient])

            const logs = parseEventLogs({
                logs: res.logs,
                abi: LiquidityBootstrapPoolABI,
            })

            if (logs[0]) {
                if (logs[0].eventName = "Sell") {
                    return (logs[0].args as {
                        caller: `0x${string}`;
                        recipient: `0x${string}`;
                        assets: bigint;
                        shares: bigint;
                        swapFee: bigint;
                    }).assets;
                }
            }

            return BigInt(0)
        }
    )

    swapSharesForExactAssets = new AsyncState<({ }: any) => Promise<bigint>>(
        async ({ sharesIn, minAssetsOut, recipient }: { sharesIn: bigint, minAssetsOut: bigint, recipient: `0x${string}` }): Promise<bigint> => {
            const res = await this.liquidityBootstrapPoolContract.swapSharesForExactAssets.call([sharesIn, minAssetsOut, recipient])

            const logs = parseEventLogs({
                logs: res.logs,
                abi: LiquidityBootstrapPoolABI,
            })

            if (logs[0]) {
                if (logs[0].eventName = "Sell") {
                    return (logs[0].args as {
                        caller: `0x${string}`;
                        recipient: `0x${string}`;
                        assets: bigint;
                        shares: bigint;
                        swapFee: bigint;
                    }).assets;
                }
            }

            return BigInt(0)
        }
    )

    args = new AsyncState<({ }: any) => Promise<any>>(
        async (): Promise<any> => {
            return this.liquidityBootstrapPoolContract.args
        }
    )

    reservesAndWeights = new AsyncState<({ }: any) => Promise<any>>(
        async (): Promise<any> => {
            return this.liquidityBootstrapPoolContract.reservesAndWeights
        }
    )

    previewAssetsIn = new AsyncState<({ }: any) => Promise<any>>(
        async (shareOut: bigint): Promise<any> => {
            return this.liquidityBootstrapPoolContract.previewAssetsIn(shareOut)
        }
    )

    previewAssetsOut = new AsyncState<({ }: any) => Promise<any>>(
        async (shareIn: bigint): Promise<any> => {
            return this.liquidityBootstrapPoolContract.previewAssetsOut(shareIn)
        }
    )

    previewSharesIn = new AsyncState<({ }: any) => Promise<any>>(
        async (assetsOut: bigint): Promise<any> => {
            return this.liquidityBootstrapPoolContract.previewSharesIn(assetsOut)
        }
    )

    previewSharesOut = new AsyncState<({ }: any) => Promise<any>>(
        async (assetIn: bigint): Promise<any> => {
            return this.liquidityBootstrapPoolContract.previewSharesOut(assetIn)
        }
    )

    get liquidityBootstrapPoolFactoryContract () {
        return wallet.contracts.lbpFactory;
    }

    get liquidityBootstrapPoolContract () {
        return wallet.contracts.lbp;
    }

}

const launchPadLbp = new LaunchPadLbp();

export default launchPadLbp