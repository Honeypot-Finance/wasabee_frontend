import { Address } from "viem";
import { Currency, ExtendedNative, WNATIVE } from "@cryptoalgebra/integral-sdk";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_NATIVE_NAME,
  DEFAULT_NATIVE_SYMBOL,
} from "@/data/algebra/default-chain-id";
import { useAlgebraToken } from "./useAlgebraToken";
import { berachainBartioTestnetNetwork, networksMap } from "@/services/chain";

export function useCurrency(
  address: Address | undefined,
  withNative?: boolean
): Currency | ExtendedNative | undefined {
  const isWNative = address
    ? address.toLowerCase() ===
      berachainBartioTestnetNetwork.nativeToken.address.toLowerCase()
    : false;

  const isNative = address === ADDRESS_ZERO;

  const token = useAlgebraToken(isNative || isWNative ? ADDRESS_ZERO : address);

  const extendedEther = ExtendedNative.onChain(
    DEFAULT_CHAIN_ID,
    DEFAULT_NATIVE_SYMBOL,
    DEFAULT_NATIVE_NAME
  );

  if (withNative) return isNative || isWNative ? extendedEther : token;

  if (isWNative) return extendedEther.wrapped;

  return isNative ? extendedEther : token;
}
