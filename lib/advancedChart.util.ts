import { Token } from "@/services/contract/token";
import { networksMap } from "@/services/chain";
import { PairContract } from "@/services/contract/pair-contract";

export const tokenToSymbol = (token: Token) => {
  return token.symbol;
};

export const tokenToAddress = (token: Token) => {
  return token.address;
};

export const tokenToTicker = (token: Token, chainId: number) => {
  return (
    token.name +
    ":" +
    networksMap[chainId as number].chain.id +
    ":" +
    token.address
  );
};

export const pairToTicker = (pair: PairContract, chainId: number) => {
  return (
    pair.token0.name +
    "/" +
    pair.token1.name +
    ":" +
    networksMap[chainId].chain.id +
    ":" +
    pair.address
  );
};

export const tickerToToken = (ticker: string) => {
  const [name, chainId, address] = ticker.split(":");
  return new Token({
    name,
    address,
  });
};
