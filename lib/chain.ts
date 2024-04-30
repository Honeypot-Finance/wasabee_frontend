import { Chain, berachainTestnet, polygonMumbai, sepolia } from "viem/chains";
export const polygonMumbaiChain = {
  ...polygonMumbai,
  rpcUrls: {
    default: {
      http: ["https://polygon-mumbai-pokt.nodies.app"],
    },
  },
};


export const chains = [
  sepolia, berachainTestnet, polygonMumbaiChain
]

export const chainsMap = chains.reduce((acc, chain) => {
  acc[chain.id] = chain
  return acc
}
, {} as Record<number | string, Chain>)