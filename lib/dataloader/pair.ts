import DataLoader from "dataloader";
import { kv } from "@vercel/kv";
import { getContract } from "viem";
import factoryABI from "~/static/abis/factory.json";
import ERC20ABI from "~/static/abis/erc20.json";
import { ethers } from "ethers";
import { createPublicClientByChain } from "../client";
import { getCacheKey } from "../cache";
import { networksMap } from "@/services/chain";

// 2. Set up your client with desired chain & transport.

export const tokenLoader = new DataLoader<
  string,
  {
    address: `0x${string}`;
    name: string;
    symbol: string;
    decimals: string;
  }
>(async (addresses) => {
  const chainId = addresses[0].split("_")[0];
  const currentNetwork = networksMap[chainId];
  const tokensMap = (await kv.get<Record<string, any>>(getCacheKey(chainId, "tokens"))) || {};
  const res = await Promise.all(
    addresses.map(async (addressChainId) => {
      const [chainId, address] =  addressChainId.split("_")
      const lowerAddress = address.toLowerCase();
      let token = tokensMap?.[lowerAddress];
      if (!token) {
        const tokenContract = getContract({ address: address as `0x${string}`, abi: ERC20ABI, client: {
          public: createPublicClientByChain(currentNetwork.chain)
        } });
        const [name, symbol, decimals] = await Promise.all([
          tokenContract.read.name().catch(),
          tokenContract.read.symbol().catch(),
          tokenContract.read.decimals().catch(),
        ]);
        // @ts-ignore
        token = { address, name, symbol, decimals: decimals.toString() };
        //   console.log('token', token)\
        if ((token.name || token.symbol) && token.decimals !== undefined) {
          tokensMap[address] = token;
        }
      }
      return token;
    })
  );
  await kv.set("tokens", tokensMap);
  return res;
});

export const pairByTokensLoader = new DataLoader<string, any>(
  async (tokens) => {
    const chainId = tokens[0].split("_")[0];
    const pairsMap =
      (await kv.get<Record<string, any>>(
        getCacheKey(chainId, "pairsByTokens")
      )) || {};
    const currentNetwork = networksMap[chainId];
    const factoryContract = getContract({
      address: currentNetwork.contracts.factory as `0x${string}`,
      abi: factoryABI,
      // 1a. Insert a single client
      client: {
        public: createPublicClientByChain(currentNetwork.chain),
      },
    });
    const pairs = await Promise.all(
      tokens.map(async (t) => {
        let pair = pairsMap?.[t];
        if (!pair) {
          const [token0Address, token1Address] = t.split("_")[1].split("-");
          const pairAddress = await factoryContract.read.getPair([
            token0Address,
            token1Address,
          ]);
          if (pairAddress === ethers.constants.AddressZero) {
            return null;
          }
          // const pairContract = getContract({ address: pairAddress as `0x${string}`, abi: IUniswapV2Pair.abi, client });
          const [token0, token1] = await tokenLoader.loadMany([
            token0Address as `0x${string}`,
            token1Address as `0x${string}`,
          ]);
          pair = {
            address: pairAddress,
            token0,
            token1,
          };
          pairsMap[t] = pair;
        }
        return pair;
      })
    );
    await kv.set("pairsByTokens", pairsMap);
    return pairs;
  }
);

// export const pairByIndexLoader = new DataLoader(async () => {
//     const pairs = await contract.read.allPairsLength();
// });
