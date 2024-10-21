import { parseGwei } from "viem";
import {
  Chain,
  berachainTestnet as viemBerachainTestnet,
  polygonMumbai,
  sepolia as viewSepolia,
} from "viem/chains";
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
      blockCreated: 1938031,
    },
  },
};

export const berachainBartioTestnet: Chain = {
  id: 80084,
  name: "Berachain Bartio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA",
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] },
  },
  blockExplorers: {
    default: {
      name: "Berachain",
      url: "https://bartio.beratrail.io/",
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x2f5e86C01B1Ab053747fbdb55FfECa65B07D0E53",
      blockCreated: 258000,
    },
  },
  fees: {
    defaultPriorityFee: parseGwei("50"),
  }
};

// export const sepolia:Chain = {
//   ...viewSepolia,
//   rpcUrls: {
//     default: {
//       http: [" https://ethereum-sepolia.blockpi.network/v1/rpc/public"],
//     },
//   },

// }

export const chains = [
  //sepolia,
  berachainTestnet,
  berachainBartioTestnet,
  polygonMumbaiChain,
];

export const chainsMap = chains.reduce((acc, chain) => {
  acc[chain.id] = chain;
  return acc;
}, {} as Record<number | string, Chain>);
