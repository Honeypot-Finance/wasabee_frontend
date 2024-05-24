import { Chain, berachainTestnet as viemBerachainTestnet, polygonMumbai, sepolia as viewSepolia } from "viem/chains";
export const polygonMumbaiChain: Chain = {
  ...polygonMumbai,
  rpcUrls: {
    default: {
      http: ["https://polygon-mumbai-pokt.nodies.app"],
    },
  },
};

export const berachainTestnet: Chain = {
  ...viemBerachainTestnet,
  contracts: {
    ...viemBerachainTestnet.contracts,
     multicall3: {
      address: "0x360B0e3F6b3A1359Db0d680cDc119E695c1637B4",
      blockCreated: 1938031
     }
  }

}

export const sepolia:Chain = {
  ...viewSepolia,
  rpcUrls: {
    default: {
      http: [" https://ethereum-sepolia.blockpi.network/v1/rpc/public"],
    },
  },
  
}


export const chains = [
  sepolia, berachainTestnet, polygonMumbaiChain
]

export const chainsMap = chains.reduce((acc, chain) => {
  acc[chain.id] = chain
  return acc
}
, {} as Record<number | string, Chain>)