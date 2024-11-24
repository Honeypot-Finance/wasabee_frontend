import { Address } from "viem";
import { Currency, ExtendedNative, WNATIVE } from "@cryptoalgebra/sdk";
import { ADDRESS_ZERO } from "@cryptoalgebra/sdk";
import { useAlgebraToken } from "./useAlgebraToken";
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_NATIVE_SYMBOL,
  DEFAULT_NATIVE_NAME,
} from "@/data/algebra/default-chain-id";
import { NATIVE_TOKEN_WRAPPED } from "@/data/algebra/addresses";

export function useCurrency(
  address: Address | undefined,
  withNative?: boolean
): Currency | ExtendedNative | undefined {
  const isWNative =
    address?.toLowerCase() === WNATIVE[DEFAULT_CHAIN_ID].address.toLowerCase();

  const isNative = address === ADDRESS_ZERO;

  const token = useAlgebraToken(
    isNative || isWNative ? NATIVE_TOKEN_WRAPPED : address
  );

  const extendedEther = ExtendedNative.onChain(
    DEFAULT_CHAIN_ID,
    DEFAULT_NATIVE_SYMBOL,
    DEFAULT_NATIVE_NAME
  );

  return token;
}
