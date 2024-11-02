import { Token } from "@cryptoalgebra/custom-pools-sdk";
import { DEFAULT_CHAIN_ID } from "./default-chain-id";

export const STABLECOINS = {
  USDT: new Token(
    DEFAULT_CHAIN_ID,
    "0x05d0dd5135e3ef3ade32a9ef9cb06e8d37a6795d",
    6,
    "USDT",
    "USDT"
  ),
};
