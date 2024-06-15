import { Token } from "./contract/token";
import { createPublicClientByChain } from "@/lib/client";
import { Chain} from "viem/chains";
import { berachainBartioTestnet, berachainTestnet, polygonMumbaiChain, sepolia } from "@/lib/chain";

export class Network {
  get chainId() {
    return this.chain.id;
  }
  contracts!: {
    routerV2: string;
    factory: string;
    ftoFactory: string;
    ftoFacade: string;
    ftoTokens: Partial<Token>[];
  };
  faucetTokens: Token[] = [];
  chain!: Chain;
  faucets?: {
    url: string,
    name: string,
  }[]
  constructor(
    args: Omit<Partial<Network>, "faucetTokens"> & {
      faucetTokens: Partial<Token>[];
    }
  ) {
    Object.assign(this, args);
  }
}
// export const polygonTestNetwork = new Network({
//   chain: polygonMumbaiChain,
//   contracts: {
//     routerV2: "0x2ef225538c9FcE4641e038Fd6FA64cA5519cF971",
//     factory: "0x333bB9e7Aa8E02017E92cBAe2A8D500be7c0B95F",
//     ftoFactory: "0x5AD84056574066c774C5e58BC4a0652b6c171253",
//     ftoFacade: "0xe67a15AeBD845C779BF6672442567b1C66de34C2",
//     ftoTokens: ["0x878fd3Ccf564Cc2e38EEdDd798F88D8f8a51a1dD"],

//   },
//   faucetTokens: [
//     {
//       name: "AORI",
//       symbol: "AORI",
//       decimals: 18,
//       address: "0x41ffb8e98174e84faaa7133b2e6ff30537c64d66",
//     },
//     {
//       name: "YEET",
//       symbol: "YEET",
//       decimals: 18,
//       address: "0x2E985184792faDDc8AB9a0E855F289576a1e5dD2",
//     },
//     {
//       name: "HONEY",
//       symbol: "HONEY",
//       decimals: 18,
//       address: "0xEEAeA06afd271F665ba005AAaDdDBF4ADCeB330a",
//     },
//     {
//       name: "HPOT",
//       symbol: "HPOT",
//       decimals: 18,
//       address: "0xa3C79E1Ec388f5FaAaC993DeeaF3Bc4EbD10568B",
//     },
//   ],
// });

export const berachainBartioTestnetNetwork = new Network({
  chain: berachainBartioTestnet,
  faucets: [{
    url: "https://bartio.faucet.berachain.com",
    name: "Official Faucet",
  }],
  contracts: {
    routerV2: "0x482270069fF98a0dF528955B651494759b3B2F8C",
    factory: "0x2f795195bae7E61E848ffC87ba7f6ae1A06c0527",
    ftoFactory: "0x5C4cDd0160c0CB4C606365dD98783064335A9ce0",
    ftoFacade: "0x51e4fF69060CD62dE1a9374799a0BddeB55cb1E4",
    ftoTokens: [
      {
        address: "0x2A108225249CB5B3E1E33943F5FEfAec33b1D452",
        name: "USDT",
        symbol: "USDT",
        decimals: 18,
      },
      // {
      //   address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
      //   name: "Wrapped BERA",
      //   symbol: "WBERA",
      //   decimals: 18,
      // },
    ],
  },
  faucetTokens: [
    {
      address: "0x2A108225249CB5B3E1E33943F5FEfAec33b1D452",
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
    },
    // {
    //   address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
    //   name: "Wrapped BERA",
    //   symbol: "WBERA",
    //   decimals: 18,
    // },
  ],
});

export const berachainTestNetwork = new Network({
  chain: berachainTestnet,
  faucets: [{
    url: "https://artio.faucet.berachain.com",
    name: "Official Faucet",
  }],
  contracts: {
    routerV2: "0xB192af2225791c439CB2024290158d3202DbcD95",
    factory: "0xE0D1F1cE03A7598EE7FdF7E5DB837d9726C0Ea5c",
    ftoFactory: "0xEd6a0A29A962B4296bCeEC4e1E55F5Ec0474EAC7",
    ftoFacade: "0x3aCCC3dD26EeC5F6e254060906b7FA24D98E6722",
    ftoTokens: [
      {
        address: "0xebF244521CCAc3C5a18FeAE79b4BaFBFc8926B46",
        name: "USDT",
        symbol: "USDT",
        decimals: 18,
      },
      {
        address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
        name: "Wrapped BERA",
        symbol: "WBERA",
        decimals: 18,
      },
    ],
  },
  faucetTokens: [
    {
      address: "0xebF244521CCAc3C5a18FeAE79b4BaFBFc8926B46",
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
    },
    // {
    //   address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
    //   name: "Wrapped BERA",
    //   symbol: "WBERA",
    //   decimals: 18,
    // },
    {
      name: "AORI",
      symbol: "AORI",
      decimals: 18,
      address: "0x388e116A5FE443dfc1A7338AED7D22be925E31f2",
    },
    {
      name: "YEET",
      symbol: "YEET",
      decimals: 18,
      address: "0x265277a6c3C8e15DdC3Ee837fc88aeD8092E3de1",
    },
    {
      name: "HONEY",
      symbol: "HONEY",
      decimals: 18,
      address: "0xB2a1216856880D07eee9C4f71756FA8f72036e1E",
    },
    {
      name: "HPOT",
      symbol: "HPOT",
      decimals: 18,
      address: "0x46bf2B606A217dBD8724B2AC9Cd7e9d1bc71D78A",
    },
  ],
});

export const sepoliaNetwork = new Network({
  chain: sepolia,
  faucets: [
    {
      url: "https://www.alchemy.com/faucets/ethereum-sepolia",
      name: "Alchemy",
    },
    {
      url: "https://www.infura.io/faucet/sepolia",
      name: "Infura",
    },
    {
      url: "https://sepolia-faucet.pk910.de/",
      name: "PowFaucet",
    },
    {
      url: "https://faucet.quicknode.com/ethereum/sepolia",
      name: "QuickNode",
    },
    {
      url: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
      name: "Google",
    },
  ],
  contracts: {
    routerV2: "0xBF5BB6e4189877bA03168035a56CBC452f59c0d2",
    factory: "0x51089092b3c40c15698818592f9487340C2379B5",
    ftoFactory: "0x13Db24fF75a7FB3Cc22Fa938c3a07C5938A7d0cD",
    ftoFacade: "0x27bAceFAA89c00d29B4F7a3424c648f34e092009",
    ftoTokens: [{
      address: "0x5d116b0032188519e62858dFd3b7917ccEcad170",
      name:"USDT",
      symbol: "USDT",
      decimals: 18,
    }],
  },
  faucetTokens: [{
    address: "0x5d116b0032188519e62858dFd3b7917ccEcad170",
    name:"USDT",
    symbol: "USDT",
    decimals: 18,
  }],
});

export const networks = [
  berachainTestNetwork,
  berachainBartioTestnetNetwork,
  sepoliaNetwork,
  // polygonTestNetwork,
];
export const networksMap = networks.reduce((acc, network) => {
  acc[network.chainId] = network;
  return acc;
}, {} as Record<number | string, Network>);
