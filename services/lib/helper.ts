import BigNumber from "bignumber.js";

export interface Pool {
    asset: string;
    share: string;
    assets: bigint;
    shares: bigint;
    virtualAssets: bigint;
    weightStart: bigint;
    weightEnd: bigint;
    saleStart: bigint;
    saleEnd: bigint;
    totalPurchased: bigint;
    maxSharePrice: bigint;
    maxTotalSharesOut: bigint;
    maxTotalAssetsIn: bigint;
    vestCliff: number;
    vestEnd: number;
    redemptionDelay: number;
    maxTotalAssetsInDeviation: bigint;
    sellingAllowed: boolean;
    whitelistMerkleRoot: string;
    minAssetsIn: bigint;
    minPercAssetsSeeding: bigint;
    minSharesSeeding: bigint;
}

const FieldsList = [
    "asset",
    "share",
    "assets",
    "shares",
    "virtualAssets",
    "weightStart",
    "weightEnd",
    "saleStart",
    "saleEnd",
    "totalPurchased",
    "maxSharePrice",
    "maxTotalSharesOut",
    "maxTotalAssetsIn",
    "vestCliff",
    "vestEnd",
    "redemptionDelay",
    "maxTotalAssetsInDeviation",
    "sellingAllowed",
    "whitelistMerkleRoot",
    "minAssetsIn",
    "minPercAssetsSeeding",
    "minSharesSeeding",
]
  

export const formatLBPPoolData = (data: any[]) => {
    const result : {[key: string] : any} = {}
    if(data.length === 0) return result as Pool;

    FieldsList.forEach((field, index) => {
        if (data[index]?.type === "BigNumber") {
            result[field] = BigNumber(data[index].hex).toString();
        }else{
            result[field] = data[index]
        }
    })

    return result as Pool;
}