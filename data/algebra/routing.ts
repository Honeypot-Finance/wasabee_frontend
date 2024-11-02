import { Token } from "@cryptoalgebra/custom-pools-sdk";
import { STABLECOINS } from "./tokens";
import { DEFAULT_CHAIN_ID } from "./default-chain-id";

type ChainTokenList = {
  readonly [chainId: number]: Token[];
};

export const WNATIVE_EXTENDED: { [chainId: number]: Token } = {
  [DEFAULT_CHAIN_ID]: new Token(
    DEFAULT_CHAIN_ID,
    "0x7507c1dc16935b82698e4c63f2746a2fcf994df8",
    18,
    "WBERA",
    "Wrapped Bera"
  ),
};

const WNATIVE_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WNATIVE_EXTENDED).map(([key, value]) => [key, [value]])
);

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WNATIVE_ONLY,
  [DEFAULT_CHAIN_ID]: [...WNATIVE_ONLY[DEFAULT_CHAIN_ID], STABLECOINS.USDT],
};
