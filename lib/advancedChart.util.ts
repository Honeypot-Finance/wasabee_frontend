import { Token } from "@/services/contract/token";
import { networksMap } from "@/services/chain";

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

export const tickerToToken = (ticker: string) => {
  const [name, chainId, address] = ticker.split(":");
  return new Token({
    name,
    address,
  });
};
