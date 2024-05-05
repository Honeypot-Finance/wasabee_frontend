import { Token } from "./contract/token";
import { createPublicClientByChain } from "@/lib/client";
import { Chain, sepolia } from "viem/chains";
import { berachainTestnet, polygonMumbaiChain } from "@/lib/chain";

export class Network {
  get chainId() {
    return this.chain.id;
  }
  contracts!: {
    routerV2: string;
    factory: string;
    ftoFactory: string;
    ftoFacade: string;
    ftoToken: string;
  };
  faucetTokens: Token [] = [];
  chain!: Chain;
  constructor(args: Omit<Partial<Network>, "faucetTokens"> & {
    faucetTokens: Partial<Token>[];
  }) {
    Object.assign(this, args);
  }
}
export const polygonTestNetwork = new Network({
  chain: polygonMumbaiChain,
  contracts: {
    routerV2: "0x2ef225538c9FcE4641e038Fd6FA64cA5519cF971",
    factory: "0x333bB9e7Aa8E02017E92cBAe2A8D500be7c0B95F",
    ftoFactory: "0x5AD84056574066c774C5e58BC4a0652b6c171253",
    ftoFacade: "0xe67a15AeBD845C779BF6672442567b1C66de34C2",
    ftoToken: "0x878fd3Ccf564Cc2e38EEdDd798F88D8f8a51a1dD",

  },
  faucetTokens: [
    {
      name: "AORI",
      symbol: "AORI",
      decimals: 18,
      address: "0x41ffb8e98174e84faaa7133b2e6ff30537c64d66",
    },
    {
      name: "YEET",
      symbol: "YEET",
      decimals: 18,
      address: "0x2E985184792faDDc8AB9a0E855F289576a1e5dD2",
    },
    {
      name: "HONEY",
      symbol: "HONEY",
      decimals: 18,
      address: "0xEEAeA06afd271F665ba005AAaDdDBF4ADCeB330a",
    },
    {
      name: "HPOT",
      symbol: "HPOT",
      decimals: 18,
      address: "0xa3C79E1Ec388f5FaAaC993DeeaF3Bc4EbD10568B",
    },
  ],
});

export const berachainTestNetwork = new Network({
  chain: berachainTestnet,
  contracts: {
    routerV2: "0x51e4fF69060CD62dE1a9374799a0BddeB55cb1E4",
    factory: "0x5C4cDd0160c0CB4C606365dD98783064335A9ce0",
    ftoFactory: "",
    ftoFacade: "",
    ftoToken: "",
  },
  faucetTokens: [
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
  contracts: {
    routerV2: "0xC3e9D297e622dDBd74bD0784FcFb46Ee9552C7D6",
    factory: "0x51089092b3c40c15698818592f9487340C2379B5",
    ftoFactory: "0x16b7e526cE35061de7c26E6D943687460637BB6D",
    ftoFacade: "0xf7D56579e12e43984f1Ff90Cd9E9fc8c93c1ACF2",
    ftoToken: "0x5d116b0032188519e62858dFd3b7917ccEcad170",
  },
  faucetTokens: [],
});

export const networks = [
  berachainTestNetwork,
  sepoliaNetwork,
  polygonTestNetwork,

];
export const networksMap = networks.reduce((acc, network) => {
  acc[network.chainId] = network;
  return acc;
}
, {} as Record<number | string, Network>);