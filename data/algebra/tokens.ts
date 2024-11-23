import { Token } from "@cryptoalgebra/sdk";
import { DEFAULT_CHAIN_ID } from "./default-chain-id";

export const STABLECOINS = {
  USDT: new Token(
    DEFAULT_CHAIN_ID,
    "0x05d0dd5135e3ef3ade32a9ef9cb06e8d37a6795d",
    6,
    "USDT",
    "USDT"
  ),
  THPOT: new Token(
    DEFAULT_CHAIN_ID,
    "0xfc5e3743E9FAC8BB60408797607352E24Db7d65E",
    18,
    "Test Honeypot Finance",
    "tHPOT"
  ),
};
